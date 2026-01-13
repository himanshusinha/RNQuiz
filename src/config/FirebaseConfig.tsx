import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration object (replace with your own values)
const firebaseConfig = {
  apiKey: 'AIzaSyCScW5YSP2RBu7dU8nAbpj-GDqIx9BU5UE',
  authDomain: 'rnquizapp-98a71.firebaseapp.com',
  projectId: 'rnquizapp-98a71',
  storageBucket: 'rnquizapp-98a71.firebasestorage.app',
  messagingSenderId: '987643366374',
  appId: '1:987643366374:web:53a69a2359bbde07dee427',
  measurementId: 'G-2B612V59TW',
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Export the db (Firestore) to be used elsewhere in the app
export { db };
