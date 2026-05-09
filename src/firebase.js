import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC8kOC-eO7vpCh7JGvVkwVBDaTYADRgZkI',
  authDomain: 'sleepsync-2a61f.firebaseapp.com',
  projectId: 'sleepsync-2a61f',
  storageBucket: 'sleepsync-2a61f.firebasestorage.app',
  messagingSenderId: '691659587146',
  appId: '1:691659587146:web:e9c4b2929b88deabb6b0b3',
  measurementId: 'G-3561DNGCZK',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
