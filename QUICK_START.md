# ⚡ Quick Start - 5 Minutos

Siga estes passos para ter o sistema rodando em **5 minutos**.

## 🎯 Pré-requisitos

- [ ] Node.js 18+ instalado
- [ ] Conta no Supabase (gratuita)

---

## 🚀 3 Comandos para Começar

### 1️⃣ Instalar

```bash
npm install
```

### 2️⃣ Configurar Supabase

Acesse [supabase.com](https://supabase.com) → New Project → Copie URL e Key

```bash
# Copie o exemplo
cp .env.local.example .env.local

# Edite .env.local com suas credenciais
```

### 3️⃣ Rodar

```bash
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

---

## 📊 Setup do Banco de Dados

### No Supabase Dashboard:

1. **SQL Editor** (ícone `</>`)
2. **New query**
3. Copie TODO o conteúdo de `supabase-setup.sql`
4. **Run** (Ctrl/Cmd + Enter)
5. ✅ Sucesso!

---

## 👤 Criar Usuário

### No Supabase Dashboard:

1. **Authentication** → **Users**
2. **Add user** → **Create new user**
3. Email: `teste@teste.com`
4. Password: `123456`
5. ⚠️ **Desmarque** "Send confirmation email"
6. **Create user** ✅

---

## 🎉 Pronto!

Agora é só:

1. Acessar [localhost:3000](http://localhost:3000)
2. Fazer login com `teste@teste.com` / `123456`
3. Ver as propostas! 🎊

---

## 🐛 Problemas?

### "Missing Supabase environment variables"

✅ Verifique se `.env.local` existe na **raiz** do projeto

### "Invalid login credentials"

✅ Verifique email/senha  
✅ Crie novo usuário no Supabase

### Mais problemas?

👉 Leia [SETUP.md](./SETUP.md) completo

---

## 📚 Próximos Passos

Agora que está funcionando:

1. ✅ Leia [README.md](./README.md) - Visão geral
2. ✅ Leia [ARCHITECTURE.md](./ARCHITECTURE.md) - Entenda o código
3. ✅ Insira mais propostas no Supabase
4. ✅ Explore os componentes em `src/presentation/components/`
5. ✅ Customize as cores em `src/app/globals.css`

---

## 🚢 Deploy Rápido

### Vercel (Recomendado)

1. Push para GitHub
2. [vercel.com/new](https://vercel.com/new)
3. Import repository
4. Add Environment Variables
5. Deploy! 🚀

**Não esqueça de configurar as URLs no Supabase:**

Supabase → **Authentication** → **URL Configuration** → Adicione sua URL de produção

---

## 💡 Dicas

### Dark Mode

Muda automaticamente com o tema do seu SO:

- **Windows:** Settings → Personalization → Colors → Dark
- **macOS:** System Preferences → Appearance → Dark

### Atalhos de Teclado

- `Tab` - Navegar entre campos
- `Enter` - Submeter form / Abrir modal
- `Esc` - Fechar modal
- `Ctrl/Cmd + R` - Recarregar

### DevTools

Abra o Console do navegador (F12) para:
- Ver logs
- Debug erros
- Inspecionar componentes

---

## ⏱️ Tempo Estimado

- **Instalar dependências:** 1-2 min
- **Criar projeto Supabase:** 2-3 min
- **Configurar banco:** 30 seg
- **Criar usuário:** 30 seg
- **Testar:** 1 min

**Total:** ~5 minutos ⚡

---

**Dúvidas?** Leia a documentação completa nos arquivos `.md` na raiz do projeto.

**Feliz desenvolvimento!** 🎉

