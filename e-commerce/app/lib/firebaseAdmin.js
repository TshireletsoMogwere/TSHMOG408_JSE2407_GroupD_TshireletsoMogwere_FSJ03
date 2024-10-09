/**
 * This file contains the initialization of Firebase Admin SDK and exports the auth and firestore instances.
 * 
 * @file firebaseAdmin.js
 * @author Software.Engineer39
 * @since 1.0.0
 */
import admin from "firebase-admin";

/**
 * Firebase Admin SDK service account credentials.
 * This should be set in the .env.local file as FIREBASE_ADMIN_SDK.
 * 
 * @type {Object}
 */
const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK);

/**
 * Initializes Firebase Admin SDK if it's not already initialized.
 * 
 * @returns {void}
 */
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

/**
 * Firebase Authentication service instance.
 * 
 * @type {admin.auth.Auth}
 */
export const auth = admin.auth();

/**
 * Firebase Firestore database instance.
 * 
 * @type {admin.firestore.Firestore}
 */
export const firestore = admin.firestore();

