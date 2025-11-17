# Guia de Contribuição - NextCook 🍳

Obrigado por considerar contribuir para o NextCook! Este documento fornece diretrizes para contribuir com o projeto.

## 📋 Índice

- [Código de Conduta](#código-de-conduta)
- [Como Posso Contribuir?](#como-posso-contribuir)
- [Processo de Desenvolvimento](#processo-de-desenvolvimento)
- [Padrões de Código](#padrões-de-código)
- [Commits e Pull Requests](#commits-e-pull-requests)
- [Reportando Bugs](#reportando-bugs)
- [Sugerindo Melhorias](#sugerindo-melhorias)

## 📜 Código de Conduta

Este projeto adere a um código de conduta. Ao participar, você concorda em manter um ambiente respeitoso e acolhedor para todos.

### Nossos Padrões

✅ **Comportamentos Esperados:**
- Uso de linguagem acolhedora e inclusiva
- Respeito por pontos de vista e experiências diferentes
- Aceitação de críticas construtivas
- Foco no que é melhor para a comunidade
- Empatia com outros membros da comunidade

❌ **Comportamentos Inaceitáveis:**
- Uso de linguagem ou imagens sexualizadas
- Trolling, comentários insultuosos ou ataques pessoais
- Assédio público ou privado
- Publicar informações privadas de outros sem permissão
- Outras condutas consideradas inadequadas em ambiente profissional

## 🤝 Como Posso Contribuir?

### 1. Adicionando Exemplos de Código

Se você tem um exemplo útil que gostaria de compartilhar:

```bash
# 1. Clone o repositório
git clone https://github.com/your-username/nextcook.git

# 2. Crie uma branch para seu exemplo
git checkout -b feature/exemplo-nome-da-feature

# 3. Adicione seu código em src/app/[categoria]/[subcategoria]/
# Siga a estrutura existente do projeto

# 4. Adicione testes se aplicável
# Em src/__tests__/

# 5. Commit e push
git commit -m "feat: adiciona exemplo de [descrição]"
git push origin feature/exemplo-nome-da-feature
```

### 2. Melhorando Documentação

Documentação clara é essencial:

- Corrija erros de digitação ou gramática
- Melhore explicações existentes
- Adicione exemplos práticos
- Traduza conteúdo para outros idiomas

### 3. Reportando Bugs

Veja seção [Reportando Bugs](#reportando-bugs) abaixo.

### 4. Sugerindo Novas Features

Veja seção [Sugerindo Melhorias](#sugerindo-melhorias) abaixo.

## 🔄 Processo de Desenvolvimento

### Setup Inicial

```bash
# 1. Fork o repositório no GitHub

# 2. Clone seu fork
git clone https://github.com/seu-usuario/nextcook.git
cd nextcook

# 3. Adicione o repositório original como upstream
git remote add upstream https://github.com/original-owner/nextcook.git

# 4. Instale as dependências
pnpm install

# 5. Configure o ambiente
cp .env.example .env.local

# 6. Inicie o servidor de desenvolvimento
pnpm dev
```

### Workflow de Desenvolvimento

1. **Crie uma Branch**
   ```bash
   git checkout -b tipo/descricao-curta
   ```

   Tipos de branch:
   - `feature/` - Nova funcionalidade
   - `fix/` - Correção de bug
   - `docs/` - Documentação
   - `refactor/` - Refatoração de código
   - `test/` - Adição ou correção de testes
   - `chore/` - Tarefas de manutenção

2. **Desenvolva**
   - Escreva código limpo e bem documentado
   - Siga os padrões de código do projeto
   - Adicione testes quando necessário
   - Mantenha commits atômicos e bem descritos

3. **Teste**
   ```bash
   # Linting
   pnpm lint

   # Type checking
   pnpm type-check

   # Testes unitários
   pnpm test

   # Testes E2E (se aplicável)
   pnpm test:e2e

   # Ou execute tudo de uma vez
   pnpm validate
   ```

4. **Commit**
   - Use commits semânticos (ver seção abaixo)
   - Mantenha mensagens claras e descritivas

5. **Push e Pull Request**
   ```bash
   git push origin sua-branch
   ```
   - Abra um Pull Request no GitHub
   - Preencha o template de PR completamente
   - Aguarde review

## 💻 Padrões de Código

### TypeScript

✅ **Boas Práticas:**
```typescript
// ✅ Use tipos explícitos
interface User {
  id: string;
  name: string;
  email: string;
}

// ✅ Use async/await ao invés de .then()
async function fetchUser(id: string): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}

// ✅ Use optional chaining
const userName = user?.name ?? 'Guest';

// ✅ Componentes tipados
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export function Button({ label, onClick, disabled = false }: ButtonProps) {
  return <button onClick={onClick} disabled={disabled}>{label}</button>;
}
```

❌ **Evite:**
```typescript
// ❌ Evite any
function process(data: any) { } // Ruim

// ❌ Evite código síncrono bloqueante
const data = syncFetch('/api/data'); // Ruim

// ❌ Evite componentes sem tipos
export function Button(props) { } // Ruim
```

### React & Next.js

✅ **Boas Práticas:**
```typescript
// ✅ Use Server Components quando possível
export default async function Page() {
  const data = await fetchData();
  return <div>{data.title}</div>;
}

// ✅ Use 'use client' apenas quando necessário
'use client';
import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}

// ✅ Use hooks customizados para lógica reutilizável
function useLocalStorage<T>(key: string, initialValue: T) {
  // implementação
}
```

### Estilização (Tailwind CSS)

✅ **Boas Práticas:**
```tsx
// ✅ Use classes utilitárias do Tailwind
<div className="flex items-center justify-between p-4 bg-white dark:bg-gray-900">
  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
    Título
  </h1>
</div>

// ✅ Use componentes reutilizáveis para padrões comuns
<Button variant="primary" size="lg">
  Clique aqui
</Button>
```

❌ **Evite:**
```tsx
// ❌ Evite estilos inline
<div style={{ padding: '16px', backgroundColor: 'white' }}>

// ❌ Evite CSS modules sem necessidade
import styles from './component.module.css';
```

### Nomenclatura

- **Componentes**: PascalCase (`UserProfile.tsx`)
- **Hooks**: camelCase começando com `use` (`useAuth.ts`)
- **Utilitários**: camelCase (`formatDate.ts`)
- **Constantes**: UPPER_SNAKE_CASE (`MAX_ITEMS = 100`)
- **Interfaces/Types**: PascalCase (`UserData`, `ApiResponse`)

### Estrutura de Arquivos

```
src/
├── app/                          # App Router
│   ├── [categoria]/
│   │   ├── page.tsx             # Página principal
│   │   ├── layout.tsx           # Layout específico
│   │   └── [subcategoria]/
│   │       └── page.tsx
│   └── api/                     # API Routes
│       └── [endpoint]/
│           └── route.ts
├── components/                   # Componentes reutilizáveis
│   ├── ui/                      # Componentes de UI básicos
│   └── [ComponentName].tsx
├── hooks/                        # Custom hooks
│   └── use[HookName].ts
├── lib/                          # Bibliotecas e configurações
├── stores/                       # State management
├── types/                        # TypeScript types globais
└── utils/                        # Funções utilitárias
```

## 📝 Commits e Pull Requests

### Conventional Commits

Use o padrão [Conventional Commits](https://www.conventionalcommits.org/):

```
tipo(escopo): descrição curta

Descrição mais detalhada (opcional)

Fixes #123
```

**Tipos:**
- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Documentação
- `style`: Formatação (não afeta código)
- `refactor`: Refatoração de código
- `test`: Testes
- `chore`: Tarefas de manutenção
- `perf`: Melhorias de performance
- `ci`: CI/CD

**Exemplos:**
```bash
feat(hooks): adiciona hook useDebounce
fix(api): corrige validação de email no endpoint de registro
docs(readme): atualiza instruções de instalação
refactor(components): simplifica lógica do Button
test(utils): adiciona testes para formatDate
chore(deps): atualiza dependências do projeto
```

### Pull Requests

**Template de PR:**

```markdown
## Descrição
Descrição clara do que foi implementado/corrigido.

## Tipo de Mudança
- [ ] Bug fix (mudança que corrige um problema)
- [ ] Nova feature (mudança que adiciona funcionalidade)
- [ ] Breaking change (correção ou feature que causa quebra de compatibilidade)
- [ ] Documentação

## Checklist
- [ ] Código segue os padrões do projeto
- [ ] Realizei self-review do código
- [ ] Comentei código em áreas complexas
- [ ] Atualizei documentação relevante
- [ ] Mudanças não geram novos warnings
- [ ] Adicionei testes que provam que a correção/feature funciona
- [ ] Testes unitários passam localmente
- [ ] Mudanças dependentes foram mergeadas

## Screenshots (se aplicável)
[Adicione screenshots aqui]

## Como Testar
1. Passo 1
2. Passo 2
3. Passo 3
```

## 🐛 Reportando Bugs

### Antes de Reportar

1. Verifique se o bug já foi reportado nas [Issues](https://github.com/owner/nextcook/issues)
2. Atualize para a versão mais recente
3. Verifique se o problema persiste

### Como Reportar

Use o template de issue para bugs:

```markdown
**Descrição do Bug**
Descrição clara e concisa do bug.

**Para Reproduzir**
Passos para reproduzir:
1. Vá para '...'
2. Clique em '...'
3. Role até '...'
4. Veja o erro

**Comportamento Esperado**
O que você esperava que acontecesse.

**Screenshots**
Se aplicável, adicione screenshots.

**Ambiente:**
- OS: [e.g. Windows 11, macOS 14]
- Browser: [e.g. Chrome 120, Firefox 121]
- Node.js: [e.g. 20.10.0]
- Next.js: [e.g. 15.5.2]

**Contexto Adicional**
Qualquer outra informação relevante.
```

## 💡 Sugerindo Melhorias

### Template para Sugestões

```markdown
**A Sugestão Está Relacionada a um Problema?**
Descrição clara do problema. Ex: Fico frustrado quando [...]

**Descreva a Solução Desejada**
Descrição clara do que você quer que aconteça.

**Descreva Alternativas Consideradas**
Descrição de soluções ou features alternativas.

**Contexto Adicional**
Screenshots, mockups, ou qualquer outra informação relevante.
```

## 🎯 Prioridades do Projeto

### Alta Prioridade
- Correções de bugs críticos
- Melhorias de performance
- Questões de segurança
- Atualização de documentação essencial

### Média Prioridade
- Novas features bem documentadas
- Melhorias de UX
- Refatorações importantes
- Testes adicionais

### Baixa Prioridade
- Pequenas melhorias de código
- Otimizações menores
- Documentação complementar

## 🔍 Code Review

### O Que Esperamos

- Código limpo e legível
- Testes adequados
- Documentação atualizada
- Seguir padrões do projeto
- Commits bem descritos

### O Que Revisamos

- Funcionalidade correta
- Qualidade do código
- Cobertura de testes
- Performance
- Segurança
- Compatibilidade

## 📞 Dúvidas?

- 💬 Discord: [NextCook Community](https://discord.gg/nextcook)
- 📧 Email: contribute@nextcook.dev
- 📖 Docs: [docs.nextcook.dev](https://docs.nextcook.dev)

---

**Obrigado por contribuir com NextCook! 🙏**
