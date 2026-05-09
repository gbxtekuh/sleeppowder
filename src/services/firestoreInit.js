import { db } from '../firebase';
import { collection, doc, setDoc, serverTimestamp, getDocs } from 'firebase/firestore';
import { sounds } from '../data/sounds';

export async function populateSoundsInFirestore() {
  try {
    console.log('Iniciando população dos sons no Firestore...');

    for (let i = 0; i < sounds.length; i++) {
      const sound = sounds[i];
      await setDoc(doc(db, 'sounds', sound.id), {
        ...sound,
        order: i + 1,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      console.log(`✅ Som "${sound.title}" salvo com ID: ${sound.id}`);
    }

    console.log('🎉 Todos os sons foram populados no Firestore!');
    return true;
  } catch (error) {
    console.error('❌ Erro ao popular sons no Firestore:', error);
    return false;
  }
}

// Função para executar apenas uma vez (durante desenvolvimento)
export async function initializeFirestoreData() {
  try {
    // Verificar se já existem sons no Firestore
    const soundsCollection = collection(db, 'sounds');
    const snapshot = await getDocs(soundsCollection);

    if (snapshot.empty) {
      console.log('🔄 Firestore vazio, populando dados iniciais...');
      await populateSoundsInFirestore();
    } else {
      console.log('✅ Firestore já contém dados, pulando inicialização.');
    }
  } catch (error) {
    console.error('Erro ao inicializar dados do Firestore:', error);
  }
}