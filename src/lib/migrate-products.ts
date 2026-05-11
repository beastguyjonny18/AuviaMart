import { adminDb } from './firebase-admin';
import { products } from './products';

async function migrate() {
  console.log('🚀 Starting product migration to Firestore...');

  const productsRef = adminDb.collection('products');

  try {
    for (const product of products) {
      console.log(`📦 Uploading: ${product.name}...`);
      
      // We use the 'slug' as the document ID for cleaner URLs later
      await productsRef.doc(product.slug).set({
        ...product,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }

    console.log('✅ Migration successful! All products are now in Firestore.');
  } catch (error) {
    console.error('❌ Migration failed:', error);
  } finally {
    process.exit();
  }
}

migrate();
