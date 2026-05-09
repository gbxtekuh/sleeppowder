import { db } from '../firebase';
import { addDoc, collection, doc, getDoc, getDocs, orderBy, query, setDoc, serverTimestamp } from 'firebase/firestore';

export async function getHistory(uid) {
  try {
    const q = query(collection(db, `users/${uid}/sleepHistory`), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((docItem) => ({ id: docItem.id, ...docItem.data() }));
  } catch (error) {
    console.error('Erro ao buscar histórico:', error);
    return [];
  }
}

export async function saveSession(uid, session) {
  try {
    await addDoc(collection(db, `users/${uid}/sleepHistory`), {
      ...session,
      date: new Date().toLocaleDateString('pt-BR'),
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Erro ao salvar sessão:', error);
  }
}

export async function loadFavorites(uid) {
  try {
    const favoriteDoc = await getDoc(doc(db, `users/${uid}/favorites`, 'all'));
    if (!favoriteDoc.exists()) return [];
    return favoriteDoc.data().ids || [];
  } catch (error) {
    console.error('Erro ao carregar favoritos:', error);
    return [];
  }
}

export async function saveFavorites(uid, ids) {
  try {
    await setDoc(doc(db, `users/${uid}/favorites`, 'all'), { ids }, { merge: true });
  } catch (error) {
    console.error('Erro ao salvar favoritos:', error);
  }
}
