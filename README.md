# SleepDev - Ritual de Sono

Aplicação React + Vite para rituais de sono com timer, playlist de sons relaxantes e histórico.

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

## 🚀 Deploy no Vercel

### Opção 1: Deploy automático (GitHub)
1. Faça push do código para um repositório GitHub
2. Conecte o repositório no Vercel
3. O deploy será automático

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