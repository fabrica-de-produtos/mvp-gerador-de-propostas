# 🔧 Modo de Desenvolvimento - Sem Supabase

O projeto agora pode rodar **sem configurar o Supabase**!

## 🎯 Modo Desenvolvimento Ativo

O sistema detecta automaticamente se as variáveis de ambiente do Supabase estão configuradas:

- ✅ **Com Supabase configurado** → Usa banco real
- ✅ **Sem Supabase configurado** → Usa dados mock

## 🚀 Como Usar

### 1. Rode o projeto normalmente

```bash
npm install
npm run dev
```

**Não precisa configurar `.env.local`!** ✨

### 2. Acesse o sistema

Abra [http://localhost:3000](http://localhost:3000)

### 3. Faça login com credenciais demo

```
Email:    demo@teste.com
Senha:    123456
```

## 📊 Dados Mock Disponíveis

### Usuário Demo
- **Email:** demo@teste.com
- **Senha:** 123456
- **ID:** mock-user-id-123

### Propostas Demo (6 propostas)
1. **DEMO001** - Proposta Demo - Sistema Web
2. **DEMO002** - Proposta Demo - App Mobile
3. **DEMO003** - Proposta Demo - Dashboard
4. **DEMO004** - Proposta Demo - E-commerce
5. **DEMO005** - Proposta Demo - Landing Page
6. **DEMO006** - Proposta Demo - Sistema ERP

## ✨ Funcionalidades Disponíveis no Modo Dev

✅ **Login/Logout** - Com credenciais mock  
✅ **Listagem de propostas** - 6 propostas demo  
✅ **Busca** - Funciona nos dados mock  
✅ **Ordenação** - A-Z e Z-A  
✅ **Visualização** - Modal com iframe (URLs de exemplo)  
✅ **Dark Mode** - Totalmente funcional  
✅ **Responsivo** - Todas as breakpoints  

## 🔄 Como Voltar para o Modo Real

### Quando quiser usar o Supabase real:

1. **Configure as variáveis de ambiente:**

```bash
# Crie o arquivo .env.local
cp .env.local.example .env.local
```

2. **Adicione suas credenciais reais:**

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-real-aqui
```

3. **Reinicie o servidor:**

```bash
# Pare o servidor (Ctrl+C) e rode novamente
npm run dev
```

4. **Configure o banco de dados:**

Execute o script SQL: [supabase-setup.sql](./supabase-setup.sql)

5. **Crie usuários reais no Supabase Dashboard**

---

## 🧪 Diferenças entre Modos

| Feature | Modo Dev (Mock) | Modo Real (Supabase) |
|---------|----------------|---------------------|
| Login | `demo@teste.com` / `123456` | Usuários do Supabase |
| Propostas | 6 propostas fixas | Banco de dados real |
| Persistência | localStorage | Supabase Database |
| Sessão | localStorage | JWT + Cookies |
| Segurança | Apenas local | RLS + Auth real |

## 📝 Logs no Console

No modo desenvolvimento, você verá logs úteis no console:

```
🔧 MODO DESENVOLVIMENTO: Usando autenticação mock
🔧 MODO DESENVOLVIMENTO: Usando propostas mock
🔧 MODO DESENVOLVIMENTO: Logout mock
```

## 🎨 Indicador Visual

Na página de login, você verá um banner azul:

```
ℹ️ Modo Desenvolvimento: Use demo@teste.com / 123456 para login. 
   Dados mock sendo usados.
```

## ⚠️ Limitações do Modo Dev

❌ **Não persistente** - Ao recarregar a página, perde o login  
❌ **Dados fixos** - Não pode adicionar/editar/deletar propostas  
❌ **Sem segurança real** - Qualquer um pode logar com as credenciais mock  
❌ **localStorage** - Sessão só no navegador atual  

## 🔐 Segurança

> ⚠️ **IMPORTANTE:** O modo desenvolvimento é **APENAS para desenvolvimento local**.  
> **NÃO use em produção!** Configure o Supabase para deploy.

## 🚢 Para Deploy/Produção

**Você DEVE configurar o Supabase antes de fazer deploy:**

1. Configure as variáveis de ambiente no Vercel/Netlify
2. Execute o script SQL no Supabase
3. Crie usuários reais
4. Teste a conexão

## 💡 Dicas

### Testar Login Mock

```typescript
// Único usuário que funciona no modo mock:
Email: demo@teste.com
Senha: 123456

// Outros emails/senhas darão erro
```

### Ver Modo Ativo

Abra o console do navegador (F12) e faça login. Você verá:

```
🔧 MODO DESENVOLVIMENTO: Usando autenticação mock
```

### Adicionar Mais Propostas Mock

Edite o arquivo:  
`src/infrastructure/supabase/repositories/proposal.repository.impl.ts`

Adicione mais objetos no array `mockProposals`:

```typescript
const mockProposals: Proposal[] = [
  // ... propostas existentes
  {
    flow_id: 'DEMO007',
    name: 'Sua Nova Proposta',
    url: 'https://example.com/nova-proposta',
  },
];
```

---

## 📚 Documentação Relacionada

- [QUICK_START.md](./QUICK_START.md) - Setup completo com Supabase
- [SETUP.md](./SETUP.md) - Guia detalhado
- [README.md](./README.md) - Visão geral do projeto

---

## ✅ Checklist para Desenvolvimento

### Desenvolvimento Local
- [x] Rodar sem variáveis de ambiente
- [x] Login com credenciais mock
- [x] Ver propostas demo
- [x] Testar busca e filtros
- [x] Testar dark mode
- [x] Testar responsividade

### Preparar para Produção
- [ ] Configurar Supabase
- [ ] Adicionar variáveis de ambiente
- [ ] Executar script SQL
- [ ] Criar usuários reais
- [ ] Testar com dados reais
- [ ] Deploy

---

**Happy Development!** 🚀

*Desenvolvendo sem barreiras* ✨

