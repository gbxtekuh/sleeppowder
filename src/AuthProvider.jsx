import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { auth, db, googleProvider } from './firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { initializeFirestoreData } from './services/firestoreInit';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Inicializar dados do Firestore na primeira vez
        await initializeFirestoreData();
      }
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  async function loginWithGoogle() {
    const result = await signInWithPopup(auth, googleProvider);
    const { user: signedUser } = result;

    await setDoc(
      doc(db, 'users', signedUser.uid),
      {
        uid: signedUser.uid,
        name: signedUser.displayName,
        email: signedUser.email,
        photoURL: signedUser.photoURL,
        lastLogin: serverTimestamp(),
        createdAt: serverTimestamp(),
      },
      { merge: true }
    );

    setUser(signedUser);
    return signedUser;
  }

  async function logout() {
    await signOut(auth);
    setUser(null);
  }

  const value = useMemo(
    () => ({ user, loading, loginWithGoogle, logout }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
