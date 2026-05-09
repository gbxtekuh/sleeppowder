# SleepDev - Ritual de Sono

Aplicação React + Vite para rituais de sono com timer, playlist de sons relaxantes e histórico. **Agora com dados reais salvos no Firestore!**

## ✨ Novidades - Integração Completa com Firestore

### 🎵 Dados Reais em Tempo Real
- **Sons carregados do Firestore**: Todos os sons são armazenados e carregados dinamicamente
- **Favoritos sincronizados**: Seus sons favoritos são salvos na nuvem e sincronizados em tempo real
- **Histórico completo**: Todas as sessões são salvas com detalhes completos (duração, score, categoria, etc.)
- **Configurações personalizadas**: Volume, tema, notificações e preferências salvas por usuário
- **Playlists personalizadas**: Crie e gerencie suas próprias playlists (futuro)

### 🔄 Sincronização em Tempo Real
- Atualizações automáticas quando dados mudam
- Interface responsiva que reflete mudanças instantaneamente
- Dados persistentes entre dispositivos

### 📊 Estatísticas Avançadas
- Score médio baseado em todas as sessões
- Tempo total de relaxamento
- Estatísticas por categoria de som
- Histórico detalhado com filtros

## 🚀 Como resolver o erro do Firebase

### Problema: "auth/unauthorized-domain"

O erro ocorre porque o domínio `sleeppowder.vercel.app` não está autorizado no Firebase Console.

### Solução:

1. **Acesse o Firebase Console**: https://console.firebase.google.com/
2. **Selecione seu projeto**: `sleeppowder-59444`
3. **Vá para Authentication**: No menu lateral esquerdo
4. **Clique em Settings** (ícone de engrenagem)
5. **Aba "Authorized domains"**
6. **Clique em "Add domain"**
7. **Adicione os domínios**:
   - `sleeppowder.vercel.app`
   - `localhost` (para desenvolvimento local)
   - `127.0.0.1` (opcional)

### Após adicionar o domínio:
- Aguarde alguns minutos para a propagação
- Recarregue a página da aplicação
- O erro deve ser resolvido

## 🛠️ Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## 🗄️ Estrutura do Firestore

### Collections Principais:
- **`sounds`**: Catálogo de sons relaxantes
- **`users/{uid}/sleepHistory`**: Histórico de sessões do usuário
- **`users/{uid}/favorites`**: Sons favoritos do usuário
- **`users/{uid}/settings`**: Configurações personalizadas
- **`users/{uid}/playlists`**: Playlists personalizadas (futuro)

### Exemplo de Documento de Sessão:
```json
{
  "duration": 25,
  "score": 87,
  "soundName": "Chuva Suave",
  "soundId": "rain",
  "category": "Chuva",
  "soundColor": "#6366f1",
  "soundIcon": "CloudRain",
  "completedAt": "2024-01-15T22:30:00.000Z",
  "date": "15/01/2024",
  "createdAt": {...}
}
```

## 🚀 Deploy no Vercel

### Opção 1: Deploy automático (GitHub)
1. Faça push do código para um repositório GitHub
2. Conecte o repositório no Vercel
3. O deploy será automático

### Opção 2: Deploy manual
1. Execute `npm run build`
2. Faça upload da pasta `dist` no Vercel
3. Configure as variáveis de ambiente no Vercel

## 🔧 Configuração do Firebase

### Variáveis de Ambiente (.env)
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=sleeppowder-59444.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=sleeppowder-59444
VITE_FIREBASE_STORAGE_BUCKET=sleeppowder-59444.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=8899723460
VITE_FIREBASE_APP_ID=1:8899723460:web:25e566820628c70d204991
```

### Regras de Segurança do Firestore
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir leitura/escrita apenas para usuários autenticados
    match /{document=**} {
      allow read, write: if request.auth != null;
    }

    // Regras específicas para sons (públicos)
    match /sounds/{soundId} {
      allow read: if true;
      allow write: if false; // Apenas admin pode modificar
    }
  }
}
```

## 🎯 Funcionalidades

- ✅ **Autenticação Google**: Login seguro e rápido
- ✅ **Player de Áudio**: Reprodução contínua de sons relaxantes
- ✅ **Timer Personalizável**: Sessões de 1-120 minutos
- ✅ **Sistema de Favoritos**: Marque seus sons preferidos
- ✅ **Histórico Completo**: Acompanhe seu progresso
- ✅ **Estatísticas Detalhadas**: Métricas de relaxamento
- ✅ **Configurações**: Personalize sua experiência
- ✅ **Interface Responsiva**: Funciona em desktop e mobile
- ✅ **Dados em Tempo Real**: Sincronização automática
- ✅ **Persistência na Nuvem**: Dados salvos no Firestore

## 🏗️ Arquitetura

- **Frontend**: React 18 + Vite
- **Roteamento**: React Router DOM v6
- **Estado**: Context API + Custom Hooks
- **Backend**: Firebase (Auth + Firestore)
- **Styling**: CSS Variables + Glassmorphism
- **Ícones**: Lucide React
- **Build**: Vite (ESM + Tree Shaking)

---

**SleepDev v1.0.0** - Transformando noites em experiências de relaxamento ✨

### Opção 2: Deploy manual
```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer login
vercel login

# Deploy
vercel

# Para produção
vercel --prod
```

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
├── pages/              # Páginas da aplicação
├── services/           # Serviços (Firebase, etc.)
├── data/               # Dados estáticos
├── styles.css          # Estilos globais
└── main.jsx           # Ponto de entrada

public/                 # Arquivos estáticos
.env                    # Variáveis de ambiente (desenvolvimento)
.env.production         # Variáveis de ambiente (produção)
```

## 🔧 Configuração do Firebase

As credenciais estão armazenadas em variáveis de ambiente:

- `.env` - Para desenvolvimento local
- `.env.production` - Para produção (Vercel)

**IMPORTANTE**: Nunca commite arquivos `.env` com credenciais reais!

## 🎵 Funcionalidades

- ✅ Autenticação com Google
- ✅ Timer de sono personalizável
- ✅ Playlist de sons relaxantes
- ✅ Histórico de sessões
- ✅ Player de áudio flutuante
- ✅ Interface responsiva
- ✅ Dados salvos no Firestore

## 🐛 Problemas Conhecidos

- Favicon pode demorar para aparecer no primeiro acesso
- Firebase pode bloquear domínios não autorizados (ver solução acima)

## 📝 Scripts Disponíveis

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run preview` - Preview do build