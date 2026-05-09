import { db } from '../firebase';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  serverTimestamp,
  updateDoc,
  onSnapshot,
  where
} from 'firebase/firestore';

// ========== SONS ==========

export async function getSounds() {
  try {
    const q = query(collection(db, 'sounds'), orderBy('order', 'asc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((docItem) => ({ id: docItem.id, ...docItem.data() }));
  } catch (error) {
    console.error('Erro ao buscar sons:', error);
    return [];
  }
}

export async function saveSound(sound) {
  try {
    await setDoc(doc(db, 'sounds', sound.id), {
      ...sound,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Erro ao salvar som:', error);
  }
}

export async function updateSound(soundId, updates) {
  try {
    await updateDoc(doc(db, 'sounds', soundId), {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Erro ao atualizar som:', error);
  }
}

// ========== HISTÓRICO ==========

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

export async function updateSession(uid, sessionId, updates) {
  try {
    await updateDoc(doc(db, `users/${uid}/sleepHistory`, sessionId), {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Erro ao atualizar sessão:', error);
  }
}

// ========== FAVORITOS ==========

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
    await setDoc(doc(db, `users/${uid}/favorites`, 'all'), {
      ids,
      updatedAt: serverTimestamp(),
    }, { merge: true });
  } catch (error) {
    console.error('Erro ao salvar favoritos:', error);
  }
}

// ========== PLAYLISTS ==========

export async function getPlaylists(uid) {
  try {
    const q = query(collection(db, `users/${uid}/playlists`), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((docItem) => ({ id: docItem.id, ...docItem.data() }));
  } catch (error) {
    console.error('Erro ao buscar playlists:', error);
    return [];
  }
}

export async function createPlaylist(uid, playlist) {
  try {
    const docRef = await addDoc(collection(db, `users/${uid}/playlists`), {
      ...playlist,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Erro ao criar playlist:', error);
    return null;
  }
}

export async function updatePlaylist(uid, playlistId, updates) {
  try {
    await updateDoc(doc(db, `users/${uid}/playlists`, playlistId), {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Erro ao atualizar playlist:', error);
  }
}

export async function deletePlaylist(uid, playlistId) {
  try {
    await updateDoc(doc(db, `users/${uid}/playlists`, playlistId), {
      deleted: true,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Erro ao deletar playlist:', error);
  }
}

// ========== CONFIGURAÇÕES DO USUÁRIO ==========

export async function getUserSettings(uid) {
  try {
    const settingsDoc = await getDoc(doc(db, `users/${uid}/settings`, 'preferences'));
    if (!settingsDoc.exists()) {
      return {
        volume: 1.0,
        theme: 'dark',
        notifications: true,
        autoPlay: false,
        sleepTimer: 30,
      };
    }
    return settingsDoc.data();
  } catch (error) {
    console.error('Erro ao buscar configurações:', error);
    return {
      volume: 1.0,
      theme: 'dark',
      notifications: true,
      autoPlay: false,
      sleepTimer: 30,
    };
  }
}

export async function saveUserSettings(uid, settings) {
  try {
    await setDoc(doc(db, `users/${uid}/settings`, 'preferences'), {
      ...settings,
      updatedAt: serverTimestamp(),
    }, { merge: true });
  } catch (error) {
    console.error('Erro ao salvar configurações:', error);
  }
}

// ========== ESTATÍSTICAS ==========

export async function getUserStats(uid) {
  try {
    const history = await getHistory(uid);
    const totalSessions = history.length;
    const totalTime = history.reduce((sum, item) => sum + (item.duration || 0), 0);
    const avgScore = totalSessions > 0 ? Math.round(history.reduce((sum, item) => sum + (item.score || 0), 0) / totalSessions) : 0;

    // Estatísticas por categoria
    const categoryStats = {};
    history.forEach((session) => {
      const category = session.category || 'Outros';
      if (!categoryStats[category]) {
        categoryStats[category] = { sessions: 0, totalTime: 0, avgScore: 0 };
      }
      categoryStats[category].sessions += 1;
      categoryStats[category].totalTime += session.duration || 0;
    });

    Object.keys(categoryStats).forEach((category) => {
      const stats = categoryStats[category];
      stats.avgScore = Math.round(history
        .filter((s) => (s.category || 'Outros') === category)
        .reduce((sum, s) => sum + (s.score || 0), 0) / stats.sessions);
    });

    return {
      totalSessions,
      totalTime,
      avgScore,
      categoryStats,
      lastSession: history[0] || null,
    };
  } catch (error) {
    console.error('Erro ao calcular estatísticas:', error);
    return {
      totalSessions: 0,
      totalTime: 0,
      avgScore: 0,
      categoryStats: {},
      lastSession: null,
    };
  }
}

// ========== LISTENERS EM TEMPO REAL ==========

export function subscribeToHistory(uid, callback) {
  const q = query(collection(db, `users/${uid}/sleepHistory`), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((docItem) => ({ id: docItem.id, ...docItem.data() }));
    callback(data);
  });
}

export function subscribeToFavorites(uid, callback) {
  const docRef = doc(db, `users/${uid}/favorites`, 'all');
  return onSnapshot(docRef, (docSnap) => {
    const data = docSnap.exists() ? docSnap.data().ids || [] : [];
    callback(data);
  });
}

export function subscribeToPlaylists(uid, callback) {
  const q = query(collection(db, `users/${uid}/playlists`), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((docItem) => ({ id: docItem.id, ...docItem.data() }));
    callback(data);
  });
}
