# PROMPT ÚNICO — Login + Home (Propostas) com Supabase e Layout Moderno (Tailwind)

Crie um arquivo instrucao.md com as instruções abaixo e implemente exatamente esta estrutura mínima com Tailwind e visual moderno (referências: Linear, Notion, Framer, Vercel dashboards).

## Objetivo

Implementar 2 telas:

1. `/login` (autenticação via Supabase Auth e-mail/senha)
2. `/` (Home) listando Propostas da tabela proposals (colunas: flow_id, name, url).

**Fluxo**: `/login` → sucesso → `/`. Rota `/` protegida: se não autenticado, redirecionar para `/login`.

## Infra (igual antes)

`.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

**Query Home**: `select flow_id, name, url from proposals order by name asc`

**Ações por card**: 
- Visualizar (modal com iframe) 
- Abrir em nova aba (`target="_blank" rel="noopener noreferrer"`).

## Diretrizes de Layout (Tailwind)

### Paleta & Tema

Light por padrão com Dark Mode automático (class strategy):

- **Fundo base**: `#F8FAFC` (light) / `#0B1220` (dark)
- **Superfície** (cards/header): `#FFFFFF` / `#0F172A`
- **Texto primário**: `#0F172A` / `#E2E8F0`
- **Texto secundário**: `#475569` / `#94A3B8`
- **Borda**: `#E2E8F0` / `#1F2937`
- **Primária** (acentos/botões): `#2563EB` (hover `#1D4ED8`)

**Tipografia**: `font-sans` (Inter/SF/Segoe).

**Bordas**: `rounded-lg` (8px), modal `rounded-xl`.

**Sombras**: `shadow-sm` / `shadow-md` em hover.

**Transições**: `transition`, `duration-200`, `ease-out`.

### Layout Base

**Container central**: `max-w-6xl mx-auto px-4 sm:px-6 lg:px-8`.

**Header fixo na Home**:
- **Wrapper**: `sticky top-0 z-20 backdrop-blur bg-white/70 dark:bg-slate-900/60 border-b`
- **Conteúdo**: título do app à esquerda, busca ao centro (ou abaixo no mobile), avatar/menu (Logout) à direita.

### Componentização (classes sugeridas)

#### Botões

**Primário**: 
```
inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60
```

**Secundário (ghost)**: 
```
inline-flex items-center rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800
```

#### Inputs

**Base**: 
```
w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500
```

#### Badge (flow_id)

```
inline-flex items-center rounded-md bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 px-2 py-1 text-xs font-medium
```

## Tela /login (moderna)

**Layout**: página centralizada, cartão `max-w-md w-full mx-auto p-6 sm:p-8 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm mt-20`.

**Topo**: logotipo tipográfico (texto do app) + subtítulo curto ("Acesse sua conta").

**Form**:
- Inputs: email, password (toggle mostrar/ocultar com ícone).
- Botão Entrar (primário) largura total.
- **Estados**: erro inline (`text-red-600 text-sm mt-1`), loading com spinner simples (`animate-spin`).

**Acessibilidade**: labels, `aria-invalid` em erro, foco visível.

**Exemplo de blocos Tailwind**:
- **Título**: `text-2xl font-semibold text-slate-900 dark:text-slate-100`
- **Sub**: `mt-1 text-sm text-slate-500 dark:text-slate-400`

**Card footer** discreto com "Gerador de Propostas — MVP".

## Tela / (Home — Propostas)

### Header

Barra superior com:
- **Título do app**: `text-lg font-semibold`
- **Busca**: input central com ícone (lupa SVG à esquerda) — placeholder "Buscar por nome ou flow_id…"
  - `relative w-full max-w-xl` com `pl-9` para ícone
- **Avatar/Menu**: círculo com iniciais; menu com Logout.

### Conteúdo

**Título da página**: "Propostas geradas"
- `text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100`

**Controles**: linha com Busca (se não estiver no header) + Ordenação (select "Nome (A–Z)/(Z–A)").

**Grid de cards**:
```
grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6
```

**Card**:
- **Wrapper**: `rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm hover:shadow-md transition`
- **Título (name)**: `text-base font-semibold`
- **Subtítulo (host do url)**: `text-sm text-slate-500 dark:text-slate-400 mt-1`
- **Badge flow_id** abaixo do subtítulo
- **Ações (rodapé)**: linha com
  - Botão Visualizar (primário)
  - Link Abrir em nova aba (ghost) com ícone external-link

### Estados

**Loading**: skeleton cards — `animate-pulse` com blocos `h-5 w-3/4`, `h-4 w-1/2`, `h-8 w-full mt-4`, etc.

**Vazio**: container central com ícone neutro, `text-slate-500`, texto "Nenhuma proposta encontrada".

**Erro**: banner `border-l-4 border-red-500 bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300 p-3 rounded`.

## Modal de Visualização (iframe)

**Backdrop**: `fixed inset-0 bg-black/60 backdrop-blur-sm`

**Conteúdo**: centro, `max-w-5xl w-[95vw] rounded-xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800`

**Header**: título da proposta + ações (Abrir em nova aba, Fechar)

**Body**: iframe com `class="w-full h-[75vh] bg-white"` e placeholder de loading (barra superior `h-1 bg-blue-600 animate-pulse`)

**Interações**: Esc fecha, clique fora fecha, foco inicial no botão Fechar.

## Acessibilidade & UX

- Contraste AA, foco visível (`focus:ring-2 focus:ring-blue-500`), navegação por teclado (Tab/Shift+Tab/Enter/Esc).
- `aria-live="polite"` para toasts/erros.
- Ícones Lucide/Feather (`stroke-1.5`) discretos.

---

## Estrutura de Implementação

### Arquitetura (Camadas)

```
src/
├── domain/              # Entidades e interfaces de negócio
│   ├── entities/
│   │   └── proposal.ts
│   └── repositories/
│       └── auth.repository.ts
│       └── proposal.repository.ts
├── infrastructure/      # Implementações concretas
│   ├── supabase/
│   │   ├── client.ts
│   │   └── repositories/
│       │   ├── auth.repository.impl.ts
│       │   └── proposal.repository.impl.ts
├── application/         # Casos de uso
│   ├── use-cases/
│   │   ├── auth/
│   │   │   ├── login.use-case.ts
│   │   │   └── logout.use-case.ts
│   │   └── proposals/
│   │       └── get-proposals.use-case.ts
└── presentation/        # UI e componentes
    ├── components/
    │   ├── ui/          # Componentes genéricos
    │   │   ├── button.tsx
    │   │   ├── input.tsx
    │   │   ├── badge.tsx
    │   │   └── modal.tsx
    │   ├── auth/
    │   │   └── login-form.tsx
    │   ├── proposals/
    │   │   ├── proposal-card.tsx
    │   │   ├── proposals-grid.tsx
    │   │   └── proposal-modal.tsx
    │   └── layout/
    │       ├── header.tsx
    │       └── user-menu.tsx
    └── hooks/
        ├── use-auth.ts
        └── use-proposals.ts
```

### Fluxo de Dados

1. **UI Component** → chama hook
2. **Hook** → chama use case
3. **Use Case** → chama repository
4. **Repository** → acessa Supabase
5. **Dados** retornam pela cadeia reversa

Esta arquitetura garante:
- **Separação de responsabilidades**
- **Testabilidade**
- **Manutenibilidade**
- **Escalabilidade**

