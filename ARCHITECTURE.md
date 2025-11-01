# 🏗️ Arquitetura do Projeto

## Visão Geral

O projeto segue uma **arquitetura em camadas (Layered Architecture)** com separação clara de responsabilidades, garantindo escalabilidade, manutenibilidade e testabilidade.

## 📐 Camadas

```
┌─────────────────────────────────────────────────────────┐
│                    PRESENTATION                         │
│  (Components, Hooks, UI - React/Next.js)               │
└────────────────────┬────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────┐
│                    APPLICATION                          │
│         (Use Cases - Business Logic)                   │
└────────────────────┬────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────┐
│                      DOMAIN                             │
│     (Entities, Interfaces - Core Business)             │
└────────────────────┬────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────┐
│                  INFRASTRUCTURE                         │
│  (Supabase, External APIs - Implementation)            │
└─────────────────────────────────────────────────────────┘
```

---

## 🎯 Domain (Domínio)

**Responsabilidade:** Regras de negócio e entidades centrais

**Localização:** `src/domain/`

### Entidades

- **Proposal:** Representa uma proposta gerada
- **User:** Representa um usuário autenticado

```typescript
// src/domain/entities/proposal.ts
interface Proposal {
  flow_id: string;
  name: string;
  url: string;
}
```

### Repositories (Interfaces)

Define **contratos** para acesso a dados, sem implementação.

```typescript
// src/domain/repositories/auth.repository.ts
interface AuthRepository {
  login(credentials: LoginCredentials): Promise<User>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
}
```

**Princípio:** Inversão de Dependência (Dependency Inversion)

---

## 🔧 Infrastructure (Infraestrutura)

**Responsabilidade:** Implementações concretas de acesso a dados

**Localização:** `src/infrastructure/`

### Supabase Client

Configuração do cliente Supabase com variáveis de ambiente.

```typescript
// src/infrastructure/supabase/client.ts
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### Repository Implementations

Implementações concretas das interfaces do domínio.

```typescript
// src/infrastructure/supabase/repositories/auth.repository.impl.ts
export class SupabaseAuthRepository implements AuthRepository {
  async login(credentials: LoginCredentials): Promise<User> {
    const { data, error } = await supabase.auth.signInWithPassword(credentials);
    // ...
  }
}
```

**Vantagens:**
- ✅ Fácil troca de backend (Supabase → Firebase → Custom API)
- ✅ Testável com mocks
- ✅ Desacoplamento

---

## 💼 Application (Aplicação)

**Responsabilidade:** Orquestração de casos de uso (use cases)

**Localização:** `src/application/use-cases/`

### Use Cases

Cada use case representa uma **ação do usuário**.

```typescript
// src/application/use-cases/auth/login.use-case.ts
export class LoginUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(credentials: LoginCredentials): Promise<User> {
    // Validações
    if (!credentials.email) throw new Error('Email é obrigatório');
    
    // Delegação ao repository
    return await this.authRepository.login(credentials);
  }
}
```

**Responsabilidades:**
- ✅ Validação de entrada
- ✅ Orquestração de lógica de negócio
- ✅ Tratamento de erros
- ✅ Coordenação entre repositories

**Não deve:**
- ❌ Saber sobre React/Next.js
- ❌ Acessar diretamente Supabase
- ❌ Manipular DOM

---

## 🎨 Presentation (Apresentação)

**Responsabilidade:** Interface com o usuário

**Localização:** `src/presentation/`

### Components

#### UI Components (`components/ui/`)

Componentes **genéricos e reutilizáveis**:
- Button
- Input
- Badge
- Modal
- Alert
- Skeleton

```typescript
// src/presentation/components/ui/button.tsx
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  // ...
}) => {
  // Implementação puramente visual
};
```

**Características:**
- ✅ Sem lógica de negócio
- ✅ Altamente reutilizáveis
- ✅ Props bem tipadas
- ✅ Acessíveis (a11y)

#### Feature Components

Componentes **específicos de funcionalidade**:

- `auth/` - Login, formulários de autenticação
- `proposals/` - Cards, grid, modal de propostas
- `layout/` - Header, menu, navegação

```typescript
// src/presentation/components/proposals/proposal-card.tsx
export const ProposalCard: React.FC<ProposalCardProps> = ({ proposal }) => {
  // Lógica específica de exibição de propostas
};
```

### Hooks

Hooks customizados para **gerenciar estado e efeitos**.

```typescript
// src/presentation/hooks/use-auth.ts
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  
  const login = async (credentials: LoginCredentials) => {
    const loggedUser = await loginUseCase.execute(credentials);
    setUser(loggedUser);
  };
  
  return { user, login, logout };
}
```

**Responsabilidades:**
- ✅ Gerenciar estado local
- ✅ Chamar use cases
- ✅ Efeitos colaterais (useEffect)
- ✅ Simplificar componentes

---

## 🔄 Fluxo de Dados

### Exemplo: Login de Usuário

```
1. User digita email/senha
   ↓
2. LoginForm (Component)
   ↓
3. useAuth() hook
   ↓
4. LoginUseCase.execute()
   ↓
5. AuthRepository.login()
   ↓
6. SupabaseAuthRepository (implementação)
   ↓
7. Supabase API
   ↓
8. Retorno: User
   ↓
9. Hook atualiza estado
   ↓
10. Component re-renderiza
```

### Exemplo: Buscar Propostas

```
1. User acessa página home
   ↓
2. HomePage (Component)
   ↓
3. useProposals() hook
   ↓
4. GetProposalsUseCase.execute()
   ↓
5. ProposalRepository.getAll()
   ↓
6. SupabaseProposalRepository (implementação)
   ↓
7. Supabase Database
   ↓
8. Retorno: Proposal[]
   ↓
9. Hook atualiza estado
   ↓
10. ProposalsGrid renderiza cards
```

---

## 🧪 Testabilidade

A arquitetura facilita testes isolados:

### Testes de Domain

```typescript
// Testar entidades e validações
describe('Proposal', () => {
  it('deve validar proposta corretamente', () => {
    const proposal: Proposal = { ... };
    expect(isProposal(proposal)).toBe(true);
  });
});
```

### Testes de Use Cases

```typescript
// Testar lógica de negócio com mock repository
describe('LoginUseCase', () => {
  it('deve lançar erro se email for inválido', async () => {
    const mockRepo = { login: jest.fn() };
    const useCase = new LoginUseCase(mockRepo);
    
    await expect(
      useCase.execute({ email: 'invalid', password: '123456' })
    ).rejects.toThrow('Email inválido');
  });
});
```

### Testes de Components

```typescript
// Testar UI com mocks de hooks
jest.mock('@/presentation/hooks/use-auth');

describe('LoginForm', () => {
  it('deve chamar login ao submeter', () => {
    const mockLogin = jest.fn();
    (useAuth as jest.Mock).mockReturnValue({ login: mockLogin });
    
    render(<LoginForm />);
    // ... interagir com form ...
    expect(mockLogin).toHaveBeenCalled();
  });
});
```

---

## 🔐 Segurança

### Camada de Domain

- ✅ Validação de tipos com TypeScript
- ✅ Type guards para verificação em runtime

### Camada de Application

- ✅ Validação de entrada
- ✅ Sanitização de dados
- ✅ Tratamento de erros

### Camada de Infrastructure

- ✅ Row Level Security (RLS) no Supabase
- ✅ Tokens JWT para autenticação
- ✅ HTTPS em produção

### Camada de Presentation

- ✅ Proteção de rotas (middleware)
- ✅ Validação de formulários
- ✅ Escape de HTML (React faz automaticamente)

---

## 📊 Benefícios da Arquitetura

### Escalabilidade

- ✅ Adicionar novos casos de uso é simples
- ✅ Novas entidades não afetam UI
- ✅ Fácil adicionar novos backends

### Manutenibilidade

- ✅ Mudanças isoladas por camada
- ✅ Código organizado e previsível
- ✅ Fácil encontrar e consertar bugs

### Testabilidade

- ✅ Testes unitários por camada
- ✅ Mocks fáceis com interfaces
- ✅ Cobertura de código mais alta

### Colaboração

- ✅ Diferentes devs em diferentes camadas
- ✅ Menos conflitos de merge
- ✅ Onboarding mais rápido

---

## 🚀 Expandindo o Sistema

### Adicionar Nova Feature: "Comentários em Propostas"

#### 1. Domain Layer

```typescript
// src/domain/entities/comment.ts
export interface Comment {
  id: string;
  proposal_id: string;
  user_id: string;
  text: string;
  created_at: string;
}

// src/domain/repositories/comment.repository.ts
export interface CommentRepository {
  getByProposalId(proposalId: string): Promise<Comment[]>;
  create(comment: CreateCommentDto): Promise<Comment>;
}
```

#### 2. Infrastructure Layer

```typescript
// src/infrastructure/supabase/repositories/comment.repository.impl.ts
export class SupabaseCommentRepository implements CommentRepository {
  async getByProposalId(proposalId: string): Promise<Comment[]> {
    const { data } = await supabase
      .from('comments')
      .select('*')
      .eq('proposal_id', proposalId);
    return data || [];
  }
}
```

#### 3. Application Layer

```typescript
// src/application/use-cases/comments/get-comments.use-case.ts
export class GetCommentsUseCase {
  constructor(private commentRepository: CommentRepository) {}
  
  async execute(proposalId: string): Promise<Comment[]> {
    if (!proposalId) throw new Error('Proposal ID é obrigatório');
    return await this.commentRepository.getByProposalId(proposalId);
  }
}
```

#### 4. Presentation Layer

```typescript
// src/presentation/hooks/use-comments.ts
export function useComments(proposalId: string) {
  const [comments, setComments] = useState<Comment[]>([]);
  // ... lógica de busca
}

// src/presentation/components/comments/comment-list.tsx
export const CommentList: React.FC<{ proposalId: string }> = ({ proposalId }) => {
  const { comments, isLoading } = useComments(proposalId);
  // ... render
};
```

---

## 📚 Princípios Aplicados

### SOLID

- **S**ingle Responsibility: Cada camada tem uma responsabilidade
- **O**pen/Closed: Extensível sem modificar código existente
- **L**iskov Substitution: Repositories são intercambiáveis
- **I**nterface Segregation: Interfaces pequenas e específicas
- **D**ependency Inversion: Depende de abstrações, não implementações

### Clean Architecture

- ✅ Independência de frameworks
- ✅ Testabilidade
- ✅ Independência de UI
- ✅ Independência de banco de dados
- ✅ Regras de negócio isoladas

### DRY (Don't Repeat Yourself)

- ✅ Componentes UI reutilizáveis
- ✅ Hooks compartilhados
- ✅ Use cases bem definidos

---

## 🎓 Leitura Recomendada

- [Clean Architecture - Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Domain-Driven Design](https://martinfowler.com/bliki/DomainDrivenDesign.html)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
- [React Component Patterns](https://www.patterns.dev/posts/react-component-patterns)

---

**Mantido com:** ❤️ e boas práticas

**Última atualização:** Outubro 2025

