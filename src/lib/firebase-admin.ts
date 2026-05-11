import * as admin from 'firebase-admin';

function formatPrivateKey(key: string | undefined) {
  if (!key) return undefined;
  
  // 1. Remove surrounding quotes if they exist
  let cleanedKey = key.trim();
  if (cleanedKey.startsWith('"') && cleanedKey.endsWith('"')) {
    cleanedKey = cleanedKey.substring(1, cleanedKey.length - 1);
  }
  if (cleanedKey.startsWith("'") && cleanedKey.endsWith("'")) {
    cleanedKey = cleanedKey.substring(1, cleanedKey.length - 1);
  }

  // 2. Handle escaped newlines (\n) vs literal newlines
  // We use a regex that handles both double-escaped \\n and single-escaped \n
  return cleanedKey.replace(/\\n/g, '\n');
}

if (!admin.apps.length) {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const rawKey = process.env.FIREBASE_PRIVATE_KEY;
  const privateKey = formatPrivateKey(rawKey);

  // Safe debugging (does not log the actual key)
  console.log('--- Firebase Admin Debug ---');
  console.log('Project ID exists:', !!projectId);
  console.log('Client Email exists:', !!clientEmail);
  console.log('Raw Key Length:', rawKey?.length || 0);
  console.log('Formatted Key Length:', privateKey?.length || 0);
  console.log('Key starts with BEGIN:', privateKey?.startsWith('-----BEGIN PRIVATE KEY-----'));
  console.log('Key ends with END:', privateKey?.trim().endsWith('-----END PRIVATE KEY-----'));
  console.log('---------------------------');

  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    });
    console.log('Firebase Admin initialized successfully');
  } catch (error: any) {
    console.error('Firebase admin initialization error:', error.message);
  }
}

export const adminDb = admin.firestore();
export const adminAuth = admin.auth();
export const adminStorage = admin.storage();
