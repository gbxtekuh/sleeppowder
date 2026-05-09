// Script para testar a integração com Firestore
// Execute este arquivo para popular dados de teste

import { initializeFirestoreData } from './services/firestoreInit.js';
import { db } from './firebase.js';
import { collection, getDocs } from 'firebase/firestore';

async function testFirestoreIntegration() {
  console.log('🚀 Iniciando teste de integração com Firestore...');

  try {
    // 1. Inicializar/popular dados
    console.log('📝 Populando dados iniciais...');
    await initializeFirestoreData();

    // 2. Verificar se os sons foram salvos
    console.log('🔍 Verificando sons salvos...');
    const soundsSnapshot = await getDocs(collection(db, 'sounds'));
    console.log(`✅ ${soundsSnapshot.size} sons encontrados no Firestore`);

    soundsSnapshot.forEach((doc) => {
      const sound = doc.data();
      console.log(`  - ${sound.title} (${sound.category})`);
    });

    console.log('🎉 Integração com Firestore funcionando perfeitamente!');
    console.log('');
    console.log('📋 Próximos passos:');
    console.log('1. Execute o aplicativo: npm run dev');
    console.log('2. Faça login com Google');
    console.log('3. Teste todas as funcionalidades:');
    console.log('   - Reproduzir sons');
    console.log('   - Adicionar aos favoritos');
    console.log('   - Iniciar timer');
    console.log('   - Ver histórico');
    console.log('   - Configurações');

  } catch (error) {
    console.error('❌ Erro durante o teste:', error);
  }
}

// Executar apenas se chamado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
  testFirestoreIntegration();
}

export { testFirestoreIntegration };