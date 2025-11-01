# Gerador de Propostas 2.0

Sistema moderno de geração e gerenciamento de propostas com autenticação via Supabase.

## 🎯 Características

- ✨ **Design Moderno**: Interface inspirada em Linear, Notion e Vercel
- 🔐 **Autenticação Segura**: Login via Supabase Auth
- 🎨 **Dark Mode**: Suporte automático a tema escuro
- 📱 **Responsivo**: Layout otimizado para mobile, tablet e desktop
- 🏗️ **Arquitetura Sólida**: Separação em camadas (Domain, Application, Infrastructure, Presentation)
- ⚡ **Performance**: Componentes otimizados com React 19 e Next.js 16
- ♿ **Acessível**: Seguindo padrões WCAG AA

## 🚀 Tecnologias

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19, Tailwind CSS 4
- **Backend**: Supabase (Auth + Database)
- **Ícones**: Lucide React
- **TypeScript**: Type-safe em toda a aplicação

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Conta no Supabase

## 🛠️ Instalação

### 1. Clone o repositório

```bash
git clone <seu-repositorio>
cd gerador-de-propostas-2
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o Supabase

#### 3.1. Crie um projeto no Supabase

Acesse [supabase.com](https://supabase.com) e crie um novo projeto.

#### 3.2. Crie a tabela `proposals`

Execute o seguinte SQL no SQL Editor do Supabase:

```sql
CREATE TABLE proposals (
  flow_id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar Row Level Security
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;

-- Política para permitir leitura autenticada
CREATE POLICY "Permitir leitura para usuários autenticados"
ON proposals FOR SELECT
TO authenticated
USING (true);

-- Índice para otimizar buscas
CREATE INDEX idx_proposals_name ON proposals(name);
```

#### 3.3. Insira dados de exemplo (opcional)

```sql
INSERT INTO proposals (flow_id, name, url) VALUES
  ('FLOW001', 'Proposta Cliente A', 'https://example.com/proposta-a'),
  ('FLOW002', 'Proposta Cliente B', 'https://example.com/proposta-b'),
  ('FLOW003', 'Proposta Cliente C', 'https://example.com/proposta-c');
```

### 4. Configure as variáveis de ambiente

Copie o arquivo de exemplo:

```bash
cp .env.local.example .env.local
```

Edite `.env.local` e adicione suas credenciais do Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon-key
```

**Como encontrar suas credenciais:**
1. Acesse seu projeto no Supabase
2. Vá em `Settings` > `API`
3. Copie a `Project URL` e a `anon public` key

### 5. Crie um usuário de teste

No Supabase Dashboard:
1. Vá em `Authentication` > `Users`
2. Clique em "Add user"
3. Crie um usuário com email e senha
4. Confirme o email (ou desative confirmação em `Authentication` > `Settings`)

### 6. Execute o projeto

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## 📁 Estrutura do Projeto

```
src/
├── domain/                    # Camada de Domínio
│   ├── entities/             # Entidades de negócio
│   │   ├── proposal.ts
│   │   └── user.ts
│   └── repositories/         # Interfaces de repositórios
│       ├── auth.repository.ts
│       └── proposal.repository.ts
├── infrastructure/           # Camada de Infraestrutura
│   └── supabase/
│       ├── client.ts        # Cliente Supabase
│       └── repositories/    # Implementações concretas
│           ├── auth.repository.impl.ts
│           └── proposal.repository.impl.ts
├── application/             # Camada de Aplicação
│   └── use-cases/          # Casos de uso
│       ├── auth/
│       │   ├── login.use-case.ts
│       │   └── logout.use-case.ts
│       └── proposals/
│           └── get-proposals.use-case.ts
├── presentation/           # Camada de Apresentação
│   ├── components/
│   │   ├── ui/            # Componentes genéricos
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── modal.tsx
│   │   │   ├── skeleton.tsx
│   │   │   └── alert.tsx
│   │   ├── auth/         # Componentes de autenticação
│   │   │   └── login-form.tsx
│   │   ├── proposals/    # Componentes de propostas
│   │   │   ├── proposal-card.tsx
│   │   │   ├── proposals-grid.tsx
│   │   │   └── proposal-modal.tsx
│   │   └── layout/       # Componentes de layout
│   │       ├── header.tsx
│   │       └── user-menu.tsx
│   └── hooks/            # Hooks customizados
│       ├── use-auth.ts
│       └── use-proposals.ts
└── app/                  # Rotas Next.js
    ├── login/           # Página de login
    ├── (protected)/     # Rotas protegidas
    └── ...
```

## 🎨 Design System

### Paleta de Cores

#### Light Mode
- Fundo: `#F8FAFC`
- Superfície: `#FFFFFF`
- Texto Primário: `#0F172A`
- Texto Secundário: `#475569`
- Borda: `#E2E8F0`
- Primária: `#2563EB`

#### Dark Mode
- Fundo: `#0B1220`
- Superfície: `#0F172A`
- Texto Primário: `#E2E8F0`
- Texto Secundário: `#94A3B8`
- Borda: `#1F2937`
- Primária: `#2563EB`

### Componentes

Todos os componentes seguem as diretrizes de design moderno com:
- Bordas arredondadas (`rounded-lg`, `rounded-xl`)
- Sombras suaves (`shadow-sm`, `shadow-md`)
- Transições suaves (`transition`, `duration-200`)
- Estados de hover e focus bem definidos
- Suporte a dark mode

## 🔐 Segurança

- ✅ Validação de entrada em todos os formulários
- ✅ Sanitização de dados
- ✅ Autenticação via Supabase Auth (JWT)
- ✅ Row Level Security no banco de dados
- ✅ Middleware de proteção de rotas
- ✅ Armazenamento seguro de tokens
- ✅ HTTPS em produção

## 🧪 Testes

```bash
# Executar testes (quando implementados)
npm test

# Executar linter
npm run lint
```

## 📦 Build para Produção

```bash
npm run build
npm start
```

## 🚢 Deploy

### Vercel (Recomendado)

1. Faça push para GitHub/GitLab/Bitbucket
2. Importe no [Vercel](https://vercel.com)
3. Configure as variáveis de ambiente
4. Deploy automático! ✨

### Outras Plataformas

O projeto é compatível com qualquer plataforma que suporte Next.js:
- Netlify
- Railway
- Render
- AWS Amplify

## 📝 Licença

MIT

## 👥 Contribuindo

Contribuições são bem-vindas! Por favor, abra uma issue ou PR.

## 📚 Documentação Adicional

Para mais detalhes sobre a implementação, consulte:
- [instrucao.md](./instrucao.md) - Especificações completas do projeto
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

Desenvolvido com ❤️ usando Next.js e Supabase
# mvp-gerador-de-propostas
