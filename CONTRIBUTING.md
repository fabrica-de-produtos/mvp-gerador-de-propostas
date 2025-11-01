# 🤝 Guia de Contribuição

Obrigado por considerar contribuir com o Gerador de Propostas! Este documento fornece diretrizes para contribuições.

## 🎯 Diretrizes Gerais

### Antes de Contribuir

1. ✅ Leia o [README.md](./README.md) para entender o projeto
2. ✅ Leia [ARCHITECTURE.md](./ARCHITECTURE.md) para entender a estrutura
3. ✅ Verifique se já existe uma issue relacionada
4. ✅ Para grandes mudanças, abra uma issue primeiro para discussão

### Código de Conduta

- 🤝 Seja respeitoso e inclusivo
- 💬 Forneça feedback construtivo
- 🎯 Mantenha o foco no objetivo
- 📝 Documente suas mudanças

---

## 🏗️ Estrutura de Branches

### Main Branches

- `main` - Produção estável
- `develop` - Desenvolvimento ativo

### Feature Branches

Crie branches a partir de `develop`:

```bash
git checkout develop
git pull origin develop
git checkout -b feature/nome-da-feature
```

**Padrão de nomes:**

- `feature/` - Nova funcionalidade
- `fix/` - Correção de bug
- `refactor/` - Refatoração de código
- `docs/` - Documentação
- `test/` - Testes
- `chore/` - Tarefas de manutenção

**Exemplos:**
```
feature/add-proposal-comments
fix/login-redirect-loop
refactor/proposal-repository
docs/update-readme
test/add-use-case-tests
chore/update-dependencies
```

---

## 📝 Processo de Contribuição

### 1. Fork e Clone

```bash
# Fork o repositório no GitHub
# Clone seu fork
git clone https://github.com/seu-usuario/gerador-de-propostas-2.git
cd gerador-de-propostas-2

# Adicione o repositório original como upstream
git remote add upstream https://github.com/original/gerador-de-propostas-2.git
```

### 2. Crie uma Branch

```bash
git checkout -b feature/minha-contribuicao
```

### 3. Desenvolva

- Siga as [Convenções de Código](#-convenções-de-código)
- Mantenha commits pequenos e focados
- Teste suas mudanças

### 4. Commit

Siga o padrão [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git commit -m "feat: adiciona comentários em propostas"
git commit -m "fix: corrige redirecionamento após login"
git commit -m "docs: atualiza instruções de setup"
```

**Tipos de commit:**
- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `refactor:` - Refatoração
- `docs:` - Documentação
- `test:` - Testes
- `chore:` - Manutenção
- `style:` - Formatação

### 5. Push

```bash
git push origin feature/minha-contribuicao
```

### 6. Pull Request

1. Vá ao GitHub e crie um Pull Request
2. Preencha o template de PR
3. Aguarde review

---

## 💻 Convenções de Código

### TypeScript

#### Nomenclatura

```typescript
// PascalCase para tipos, interfaces, classes, componentes
interface UserProfile { }
class UserService { }
export const LoginForm: React.FC = () => { };

// camelCase para variáveis, funções, métodos
const userName = 'João';
function getUserData() { }

// UPPER_SNAKE_CASE para constantes
const MAX_RETRY_ATTEMPTS = 3;
const API_BASE_URL = 'https://api.example.com';
```

#### Tipos vs Interfaces

```typescript
// Preferir interfaces para objetos
interface User {
  id: string;
  name: string;
}

// Usar types para unions, intersections, primitivos
type Status = 'active' | 'inactive';
type Id = string | number;
```

#### Arrow Functions

```typescript
// Preferir arrow functions para componentes
export const Button: React.FC<ButtonProps> = ({ children }) => {
  return <button>{children}</button>;
};

// Métodos de classe: function normal
class UserService {
  getUser(id: string) {
    return this.repository.findById(id);
  }
}
```

### React

#### Componentes

```typescript
// Sempre exportar como const com tipo explícito
export const MyComponent: React.FC<MyComponentProps> = ({ prop1, prop2 }) => {
  // Hooks no topo
  const [state, setState] = useState('');
  const ref = useRef(null);
  
  // Handlers
  const handleClick = () => { };
  
  // Early returns
  if (loading) return <Spinner />;
  
  // JSX
  return <div>...</div>;
};

// Props interface separada
export interface MyComponentProps {
  prop1: string;
  prop2?: number; // Opcional com ?
}
```

#### Hooks

```typescript
// Sempre começar com "use"
export function useAuth() { }
export function useProposals() { }

// Retornar objeto nomeado
return {
  user,
  login,
  logout,
  isLoading,
};
```

### Camadas

#### Domain

```typescript
// Entidades: interfaces puras, sem lógica
export interface Proposal {
  id: string;
  name: string;
}

// Repositories: apenas interfaces
export interface ProposalRepository {
  getAll(): Promise<Proposal[]>;
}
```

#### Infrastructure

```typescript
// Implementações concretas
export class SupabaseProposalRepository implements ProposalRepository {
  async getAll(): Promise<Proposal[]> {
    // Implementação
  }
}

// Export singleton
export const proposalRepository = new SupabaseProposalRepository();
```

#### Application

```typescript
// Use cases: classes com método execute
export class GetProposalsUseCase {
  constructor(private repository: ProposalRepository) {}
  
  async execute(filters?: Filters): Promise<Proposal[]> {
    // Validações
    // Lógica de negócio
    // Delegação ao repository
  }
}
```

#### Presentation

```typescript
// Componentes UI: genéricos e reutilizáveis
export const Button: React.FC<ButtonProps> = ({ ... }) => { };

// Componentes de feature: específicos
export const LoginForm: React.FC = () => { };

// Hooks: gerenciamento de estado
export function useAuth() { }
```

### Tailwind CSS

```typescript
// Classes em ordem: layout → visual → interação
<div className="
  flex items-center gap-4          {/* Layout */}
  rounded-lg bg-white p-4          {/* Visual */}
  hover:shadow-md transition       {/* Interação */}
">
```

**Preferir:**
- ✅ Classes utilitárias do Tailwind
- ✅ Componentes reutilizáveis para padrões comuns
- ❌ CSS customizado inline
- ❌ styled-components (não usado neste projeto)

### Comentários

```typescript
/**
 * Documentação JSDoc para exports públicos
 * @param userId - ID do usuário
 * @returns Dados do usuário
 */
export async function getUser(userId: string): Promise<User> {
  // Comentários inline para lógica complexa
  const cachedUser = cache.get(userId);
  if (cachedUser) return cachedUser;
  
  // ... resto da implementação
}

// Comentários simples para clareza
const isValid = email.includes('@'); // Validação básica
```

---

## 🧪 Testes

### Estrutura

```
src/
├── domain/
│   └── __tests__/
│       └── entities.test.ts
├── application/
│   └── __tests__/
│       └── login.use-case.test.ts
└── presentation/
    └── __tests__/
        └── button.test.tsx
```

### Executar Testes

```bash
# Todos os testes
npm test

# Watch mode
npm test -- --watch

# Coverage
npm test -- --coverage
```

### Exemplo de Teste

```typescript
import { describe, it, expect, jest } from '@jest/globals';
import { LoginUseCase } from './login.use-case';

describe('LoginUseCase', () => {
  it('deve validar email obrigatório', async () => {
    const mockRepo = { login: jest.fn() };
    const useCase = new LoginUseCase(mockRepo);
    
    await expect(
      useCase.execute({ email: '', password: '123456' })
    ).rejects.toThrow('Email é obrigatório');
  });
});
```

---

## 📋 Checklist de PR

Antes de submeter, verifique:

- [ ] Código segue as convenções do projeto
- [ ] Testes passam: `npm test`
- [ ] Linter passa: `npm run lint`
- [ ] Build funciona: `npm run build`
- [ ] Código está documentado (JSDoc para exports públicos)
- [ ] README atualizado se necessário
- [ ] Sem console.logs ou debuggers
- [ ] Commits seguem Conventional Commits
- [ ] Branch está atualizada com develop

---

## 🐛 Reportar Bugs

### Template de Issue

```markdown
**Descrição**
Descrição clara do bug.

**Reproduzir**
Passos para reproduzir:
1. Vá para '...'
2. Clique em '....'
3. Veja o erro

**Comportamento Esperado**
O que deveria acontecer.

**Screenshots**
Se aplicável, adicione screenshots.

**Ambiente**
- OS: [Windows 11]
- Browser: [Chrome 120]
- Node: [18.17.0]

**Informações Adicionais**
Qualquer contexto adicional.
```

---

## ✨ Sugerir Features

### Template de Issue

```markdown
**Problema**
Qual problema esta feature resolveria?

**Solução Proposta**
Descreva a solução que você imagina.

**Alternativas**
Outras abordagens que você considerou.

**Contexto Adicional**
Screenshots, mockups, exemplos.
```

---

## 📞 Dúvidas?

- Abra uma [Discussion](https://github.com/usuario/repo/discussions)
- Entre em contato com os mantenedores

---

## 🎉 Reconhecimento

Todos os contribuidores serão reconhecidos no README!

Obrigado por contribuir! 💙

