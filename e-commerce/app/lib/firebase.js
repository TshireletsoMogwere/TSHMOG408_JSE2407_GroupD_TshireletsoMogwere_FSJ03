import { initializeApp } from "firebase/app";
import { getFirestore, initializeFirestore } from "firebase/firestore"; // Updated import
import { getAuth } from "firebase/auth"; // Import Auth

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore with persistent cache
const db = initializeFirestore(app, {
  cache: 'persistent', // Use persistent cache
});

// Initialize Auth
const auth = getAuth(app);

/**
 * If you still want to use IndexedDB persistence (though it's deprecated), you can still use this.
 * This function catches potential errors related to multiple tabs open or browser compatibility.
 *
 * @param {Object} db - The Firestore instance to enable persistence for.
 * @returns {void}
 */
// Uncomment the following code if you still want to enable IndexedDB persistence
// enableIndexedDbPersistence(db).catch((err) => {
//   if (err.code === "failed-precondition") {
//     console.error("Multiple tabs open, offline data not available");
//   } else if (err.code === "unimplemented") {
//     console.error("Browser does not support offline persistence");
//   }
// });

export { db, auth };
