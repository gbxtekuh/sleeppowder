// js/auth.js
import { auth, googleProvider, signInWithPopup, signOut, onAuthStateChanged, db, doc, setDoc } from './firebase.js';

const Auth = {
    async login() {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            
            // Salva dados do usuário no Firestore
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                lastLogin: new Date(),
                createdAt: new Date()
            }, { merge: true });

            window.location.href = 'index.html';
        } catch (error) {
            console.error("Erro no login:", error);
        }
    },

    async logout() {
        await signOut(auth);
        window.location.href = 'login.html';
    },

    // Verifica se o usuário está logado e protege as rotas
    initAuth(callback) {
        onAuthStateChanged(auth, (user) => {
            const isLoginPage = window.location.pathname.includes('login.html');
            
            if (!user && !isLoginPage) {
                window.location.href = 'login.html';
            } else if (user && isLoginPage) {
                window.location.href = 'index.html';
            }
            
            if (callback) callback(user);
        });
    }
};

export default Auth;
