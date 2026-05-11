'use server';

import { adminAuth, adminDb } from '@/lib/firebase-admin';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { Product } from './products';

const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY;

export async function signInAction(data: { email: string; password: any }) {
  const { email, password } = data;

  if (!FIREBASE_API_KEY) {
    return { error: 'FIREBASE_API_KEY is not configured in environment variables.' };
  }

  try {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, returnSecureToken: true }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error?.message || 'Failed to sign in');
    }

    const cookieStore = await cookies();
    cookieStore.set('session', result.idToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 5,
      path: '/',
    });

    return { success: true, email: result.email };
  } catch (error: any) {
    console.error('Sign-in error:', error);
    return { error: error.message };
  }
}

export async function signInWithGoogleAction(idToken: string) {
  try {
    // Verify the token and set the session cookie
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    
    // Check if user exists in our 'users' collection, if not, create it
    const userDoc = await adminDb.collection('users').doc(decodedToken.uid).get();
    if (!userDoc.exists) {
      await adminDb.collection('users').doc(decodedToken.uid).set({
        fullName: decodedToken.name || 'Google User',
        email: decodedToken.email,
        createdAt: new Date().toISOString(),
      });
    }

    const cookieStore = await cookies();
    cookieStore.set('session', idToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 5,
      path: '/',
    });

    return { success: true, email: decodedToken.email };
  } catch (error: any) {
    console.error('Google sign-in action error:', error);
    return { error: error.message };
  }
}

export async function signUpAction(data: any) {
  const { email, password, fullName, phoneNumber } = data;

  try {
    const userRecord = await adminAuth.createUser({
      email,
      password,
      displayName: fullName,
    });

    await adminDb.collection('users').doc(userRecord.uid).set({
      fullName,
      email,
      phoneNumber,
      createdAt: new Date().toISOString(),
    });

    return signInAction({ email, password });
  } catch (error: any) {
    console.error('Sign-up error:', error);
    return { error: error.message };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
}

export async function getSessionAction() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session');
  
  if (!session) return null;
  
  try {
    const payloadBase64 = session.value.split('.')[1];
    const payload = JSON.parse(Buffer.from(payloadBase64, 'base64').toString());
    return payload;
  } catch (error) {
    return null;
  }
}

// Product Management Actions

export async function getProductsAction() {
  try {
    const snapshot = await adminDb.collection('products').orderBy('createdAt', 'desc').get();
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error: any) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function addProductAction(productData: any) {
  try {
    const slug = productData.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    const docRef = adminDb.collection('products').doc(slug);
    
    await docRef.set({
      ...productData,
      slug,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    revalidatePath('/dashboard/products');
    revalidatePath('/products');
    return { success: true };
  } catch (error: any) {
    console.error('Error adding product:', error);
    return { error: error.message };
  }
}

export async function updateProductAction(id: string, productData: any) {
  try {
    await adminDb.collection('products').doc(id).update({
      ...productData,
      updatedAt: new Date().toISOString(),
    });

    revalidatePath('/dashboard/products');
    revalidatePath(`/products/${id}`);
    revalidatePath('/products');
    return { success: true };
  } catch (error: any) {
    console.error('Error updating product:', error);
    return { error: error.message };
  }
}

export async function deleteProductAction(id: string) {
  try {
    await adminDb.collection('products').doc(id).delete();
    revalidatePath('/dashboard/products');
    revalidatePath('/products');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting product:', error);
    return { error: error.message };
  }
}

export async function getProductBySlugAction(slug: string) {
  try {
    const doc = await adminDb.collection('products').doc(slug).get();
    if (!doc.exists) return null;
    return {
      id: doc.id,
      ...(doc.data() as any)
    };
  } catch (error: any) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function getDashboardStatsAction() {
  try {
    const productsSnapshot = await adminDb.collection('products').count().get();
    const usersSnapshot = await adminDb.collection('users').count().get();
    const ordersSnapshot = await adminDb.collection('orders').get();
    
    let totalRevenue = 0;
    let ordersToday = 0;
    const today = new Date().toISOString().split('T')[0];

    ordersSnapshot.docs.forEach(doc => {
      const data = doc.data();
      if (data.totalPrice) totalRevenue += data.totalPrice;
      if (data.createdAt && data.createdAt.startsWith(today)) ordersToday++;
    });
    
    return {
      totalProducts: productsSnapshot.data().count,
      totalUsers: usersSnapshot.data().count,
      totalRevenue,
      ordersToday,
    };
  } catch (error: any) {
    console.error('Error fetching dashboard stats:', error);
    return {
      totalProducts: 0,
      totalUsers: 0,
      totalRevenue: 0,
      ordersToday: 0,
    };
  }
}

export async function getUsersAction() {
  try {
    const snapshot = await adminDb.collection('users').orderBy('createdAt', 'desc').get();
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error: any) {
    console.error('Error fetching users:', error);
    return [];
  }
}

export async function getSiteSettingsAction() {
  try {
    const doc = await adminDb.collection('settings').doc('site').get();
    if (!doc.exists) {
      // Return defaults if not exists
      return {
        ctaTitle: "Smart *Living*",
        ctaDescription: "Discover the future of home decor and appliances. From 3D DIY clocks to portable cooling solutions.",
        ctaButtonText: "Shop Now",
        ctaImage: "/products/1778482258100.jpeg",
        instagram: "https://instagram.com/auvia_org",
        facebook: "https://facebook.com/auvia_org",
        twitter: "https://twitter.com/auvia_org",
        linkedin: "https://linkedin.com/company/auvia_org",
        supportEmail: "support@auviamart.pk",
        footerText: "Pure. Curated. Delivered. The destination for high-end organic essentials in Pakistan."
      };
    }
    return doc.data();
  } catch (error: any) {
    console.error('Error fetching site settings:', error);
    return null;
  }
}

export async function updateSiteSettingsAction(data: any) {
  try {
    await adminDb.collection('settings').doc('site').set({
      ...data,
      updatedAt: new Date().toISOString()
    }, { merge: true });
    revalidatePath('/');
    return { success: true };
  } catch (error: any) {
    console.error('Error updating site settings:', error);
    return { error: error.message };
  }
}

// Order Management

export async function createOrderAction(orderData: { items: any[], totalPrice: number, userEmail?: string, userId?: string }) {
  try {
    const orderId = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    const orderRef = adminDb.collection('orders').doc(orderId);
    
    await orderRef.set({
      ...orderData,
      id: orderId,
      status: 'Pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    revalidatePath('/dashboard/orders');
    return { success: true, orderId };
  } catch (error: any) {
    console.error('Error creating order:', error);
    return { error: error.message };
  }
}

export async function getUserOrdersAction(userEmail: string) {
  try {
    const snapshot = await adminDb.collection('orders')
      .where('userEmail', '==', userEmail)
      .orderBy('createdAt', 'desc')
      .get();
      
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error: any) {
    console.error('Error fetching user orders:', error);
    return [];
  }
}

export async function getOrdersAction() {
  try {
    const snapshot = await adminDb.collection('orders').orderBy('createdAt', 'desc').get();
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error: any) {
    console.error('Error fetching all orders:', error);
    return [];
  }
}

export async function updateOrderStatusAction(orderId: string, status: string) {
  try {
    await adminDb.collection('orders').doc(orderId).update({
      status,
      updatedAt: new Date().toISOString()
    });
    revalidatePath('/dashboard/orders');
    return { success: true };
  } catch (error: any) {
    console.error('Error updating order status:', error);
    return { error: error.message };
  }
}
