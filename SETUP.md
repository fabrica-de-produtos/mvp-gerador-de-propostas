# 🚀 Guia Rápido de Setup

Siga este guia passo a passo para ter o sistema funcionando em minutos.

## ✅ Checklist

- [ ] Node.js 18+ instalado
- [ ] Conta no Supabase criada
- [ ] Projeto Supabase criado
- [ ] Dependências instaladas
- [ ] Banco de dados configurado
- [ ] Variáveis de ambiente configuradas
- [ ] Usuário de teste criado

## 📋 Passo a Passo

### 1️⃣ Instalar Dependências

```bash
npm install
```

**Tempo estimado:** 1-2 minutos

---

### 2️⃣ Criar Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Clique em "New Project"
3. Preencha:
   - **Name:** gerador-propostas
   - **Database Password:** (escolha uma senha forte)
   - **Region:** South America (São Paulo) ou mais próximo
4. Clique em "Create new project"
5. Aguarde ~2 minutos para o projeto ser provisionado

**Tempo estimado:** 3-5 minutos

---

### 3️⃣ Configurar Banco de Dados

1. No dashboard do Supabase, vá em **SQL Editor** (ícone `</>` na sidebar)
2. Clique em **"New query"**
3. Copie TODO o conteúdo do arquivo `supabase-setup.sql`
4. Cole no editor
5. Clique em **"Run"** (ou pressione Ctrl/Cmd + Enter)
6. Verifique se apareceu "Success. No rows returned" ✅

**Dica:** Se quiser dados de exemplo, descomente a seção 7 do SQL antes de executar.

**Tempo estimado:** 1 minuto

---

### 4️⃣ Obter Credenciais do Supabase

1. No dashboard, vá em **Settings** (ícone ⚙️) → **API**
2. Copie os seguintes valores:
   - **Project URL** (algo como: `https://xxxxx.supabase.co`)
   - **anon public** key (na seção "Project API keys")

**Tempo estimado:** 30 segundos

---

### 5️⃣ Configurar Variáveis de Ambiente

1. Copie o arquivo de exemplo:

```bash
cp .env.local.example .env.local
```

2. Abra `.env.local` e cole suas credenciais:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto-xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon-publica-aqui
```

3. Salve o arquivo

**⚠️ IMPORTANTE:** Nunca commite o arquivo `.env.local` para o Git!

**Tempo estimado:** 1 minuto

---

### 6️⃣ Criar Usuário de Teste

1. No dashboard do Supabase, vá em **Authentication** (ícone 👤)
2. Clique em **"Add user"** → **"Create new user"**
3. Preencha:
   - **Email:** seu@email.com
   - **Password:** sua-senha-teste (mínimo 6 caracteres)
4. **Desmarque** "Send user a confirmation email" (para teste local)
5. Clique em **"Create user"**

**Dica:** Use um email real se quiser testar o fluxo de confirmação.

**Tempo estimado:** 1 minuto

---

### 7️⃣ Executar o Projeto

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

**Tempo estimado:** 30 segundos

---

### 8️⃣ Fazer Login

1. Você será redirecionado para `/login`
2. Digite o email e senha do usuário criado
3. Clique em **"Entrar"**
4. Você será redirecionado para a home com a listagem de propostas! 🎉

---

## 🎉 Pronto!

Se tudo correu bem, você deve estar vendo:
- Header com seu avatar (iniciais do email)
- Campo de busca
- Grid de propostas (se inseriu dados de exemplo)
- Dark mode funcionando ✨

---

## 🐛 Problemas Comuns

### "Missing Supabase environment variables"

**Solução:** Certifique-se de que o arquivo `.env.local` existe e está na raiz do projeto (mesmo nível do `package.json`).

---

### "Invalid login credentials"

**Soluções:**
1. Verifique se o email/senha estão corretos
2. No Supabase, vá em **Authentication** → **Users** e confirme que o usuário existe
3. Verifique se o usuário não está com status "Unconfirmed"
4. Tente criar um novo usuário

---

### "Failed to fetch proposals"

**Soluções:**
1. Certifique-se de que executou o SQL de setup
2. Verifique se a tabela `proposals` existe: vá em **Table Editor** no Supabase
3. Verifique as políticas RLS: vá em **Authentication** → **Policies**

---

### Página em branco ou loading infinito

**Soluções:**
1. Abra o Console do navegador (F12) e veja se há erros
2. Verifique se as variáveis de ambiente estão corretas
3. Tente limpar o cache: Ctrl+Shift+R (Windows/Linux) ou Cmd+Shift+R (Mac)
4. Faça logout de qualquer sessão antiga: limpe cookies em `localhost:3000`

---

### Dark mode não funciona

**Solução:** O dark mode é automático baseado nas preferências do sistema operacional. Para testar:

- **Windows:** Settings → Personalization → Colors → "Dark"
- **macOS:** System Preferences → General → Appearance → "Dark"
- **Linux:** Varia por distro, geralmente em Settings → Appearance

---

## 🆘 Ainda com problemas?

1. Verifique o console do navegador (F12 → Console)
2. Verifique o terminal onde está rodando `npm run dev`
3. Revise cada passo deste guia
4. Consulte a [documentação do Supabase](https://supabase.com/docs)

---

## 📚 Próximos Passos

Agora que está tudo funcionando:

1. ✅ Explore a interface
2. ✅ Teste a busca de propostas
3. ✅ Clique em "Visualizar" para ver o modal com iframe
4. ✅ Teste abrir em nova aba
5. ✅ Faça logout e login novamente
6. ✅ Insira mais propostas direto no Supabase (Table Editor)
7. ✅ Leia o README.md para entender a arquitetura
8. ✅ Explore o código em `src/`

---

## 🎨 Personalização

Quer customizar? Veja os arquivos:

- **Cores:** `src/app/globals.css` e componentes em `src/presentation/components/ui/`
- **Textos:** Busque por strings nos componentes
- **Logo:** Adicione em `public/` e importe nos componentes

---

## 🚀 Deploy

Quando estiver pronto para produção:

1. Faça push para GitHub
2. Importe no [Vercel](https://vercel.com)
3. Configure as variáveis de ambiente lá
4. Deploy automático! ✨

Não esqueça de atualizar as URLs permitidas no Supabase:
**Authentication** → **URL Configuration** → Adicione seu domínio de produção

---

**Tempo total estimado:** 10-15 minutos ⏱️

**Dificuldade:** Fácil 🟢

---

Bom desenvolvimento! 💙

