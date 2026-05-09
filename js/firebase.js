// js/firebase.js
// Configurações do Firebase via CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, deleteDoc, collection, addDoc, query, where, orderBy, getDocs, Timestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC8kOC-eO7vpCh7JGvVkwVBDaTYADRgZkI",
  authDomain: "sleepsync-2a61f.firebaseapp.com",
  projectId: "sleepsync-2a61f",
  storageBucket: "sleepsync-2a61f.firebasestorage.app",
  messagingSenderId: "691659587146",
  appId: "1:691659587146:web:e9c4b2929b88deabb6b0b3",
  measurementId: "G-3561DNGCZK"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider, signInWithPopup, signOut, onAuthStateChanged, doc, setDoc, getDoc, deleteDoc, collection, addDoc, query, where, orderBy, getDocs, Timestamp };
