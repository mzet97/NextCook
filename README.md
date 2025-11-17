# NextCook 🍳

**Cookbook abrangente para desenvolvedores Next.js**

NextCook é um guia prático e organizado com as principais bibliotecas e funcionalidades essenciais para desenvolvedores Next.js em seu dia a dia profissional. O material é estruturado por tópicos e níveis de complexidade, oferecendo exemplos de código aplicáveis imediatamente.

[![Next.js](https://img.shields.io/badge/Next.js-15.5-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.1-61dafb)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Características

- 🍳 **Prático** - Exemplos de código prontos para uso
- 📚 **Organizado** - Estruturado por tópicos e níveis de complexidade
- 🔍 **Fácil consulta** - Sistema de busca e navegação intuitiva
- 🌟 **Abrangente** - Desde configurações iniciais até técnicas avançadas
- ⚡ **Atualizado** - Melhores práticas e versões recentes
- 🌍 **Internacionalizado** - Suporte a múltiplos idiomas (PT/EN)
- 🎨 **Tema Dark/Light** - Interface moderna e responsiva
- ✅ **100% TypeScript** - Type-safe em todo o código

## 📋 Conteúdo

### 🌱 Nível Básico
- **Next.js Fundamentos** - App Router, Server Components, Routing
- **React Hooks** - useState, useEffect, useCallback, useMemo e hooks customizados
- **Tailwind CSS** - Estilização utilitária e design responsivo
- **Snippets Práticos** - Biblioteca de código pronto para usar

### ⚡ Nível Intermediário
- **Gerenciamento de Estado** - Zustand, Redux Toolkit, Jotai, Valtio, TanStack Query
- **Formulários** - React Hook Form com validação Zod
- **API Development** - Route Handlers, Server Actions, Middleware
- **Testes** - Jest, Testing Library, Playwright E2E

### 🚀 Nível Avançado
- **Backend & Database** - Prisma, NextAuth.js, tRPC
- **Performance** - Code Splitting, Lazy Loading, Image Optimization
- **DevOps** - Docker, CI/CD, Deploy, Monitoramento
- **E-commerce** - Stripe, PayPal, Shopping Cart, Checkout
- **Real-time** - WebSockets, Server-Sent Events

## 🚀 Getting Started

### Pré-requisitos

- **Node.js** 20.x ou superior
- **pnpm** 10.x (recomendado) ou npm/yarn
- **Git**

### Instalação

1. **Clone o repositório:**
```bash
git clone https://github.com/your-username/nextcook.git
cd nextcook
```

2. **Instale as dependências:**
```bash
pnpm install
```

3. **Configure as variáveis de ambiente:**
```bash
cp .env.example .env.local
```

Edite o arquivo `.env.local` com suas credenciais (opcional para desenvolvimento):
```env
DATABASE_URL="postgresql://user:password@localhost:5432/nextcook"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="seu-secret-aqui"
```

4. **Configure o banco de dados (opcional):**
```bash
# Gerar Prisma Client
pnpm prisma:generate

# Executar migrations
pnpm prisma:migrate
```

5. **Inicie o servidor de desenvolvimento:**
```bash
pnpm dev
```

6. **Acesse a aplicação:**

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📁 Estrutura do Projeto

```
nextcook/
├── src/
│   ├── app/                    # App Router (Next.js 15)
│   │   ├── (routes)/          # Páginas e layouts
│   │   ├── api/               # API Routes
│   │   └── layout.tsx         # Layout raiz
│   ├── components/            # Componentes reutilizáveis
│   ├── hooks/                 # Custom hooks
│   ├── lib/                   # Utilitários e helpers
│   ├── stores/                # State management (Zustand, etc)
│   ├── types/                 # TypeScript types
│   └── utils/                 # Funções utilitárias
├── prisma/                    # Schema do Prisma
├── tests/                     # Testes E2E (Playwright)
├── public/                    # Assets estáticos
└── messages/                  # Traduções (i18n)
```

## 🛠️ Stack Tecnológico

### Core
- **Next.js 15.5** - Framework React com App Router
- **React 19.1** - Biblioteca UI
- **TypeScript 5** - Type safety
- **Tailwind CSS 3.4** - Estilização

### State Management
- **Zustand** - State management leve
- **Redux Toolkit** - State management complexo
- **Jotai** - Atomic state management
- **Valtio** - Proxy-based state
- **TanStack Query** - Server state management

### UI Components
- **Radix UI** - Componentes acessíveis
- **Lucide Icons** - Ícones modernos
- **Framer Motion** - Animações
- **Sonner** - Toast notifications

### Forms & Validation
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Schema validation

### Backend & Database
- **Prisma** - ORM moderno
- **NextAuth.js** - Autenticação
- **PostgreSQL** - Banco de dados

### Testing
- **Jest** - Testes unitários
- **Testing Library** - Testes de componentes
- **Playwright** - Testes E2E

### DevOps & Tools
- **ESLint** - Linting
- **Prettier** - Code formatting
- **GitHub Actions** - CI/CD

## 🔍 Recursos Principais

## 📜 Scripts Disponíveis

### Desenvolvimento
```bash
pnpm dev              # Inicia servidor de desenvolvimento com Turbopack
pnpm dev:clean        # Limpa cache e inicia servidor
pnpm build            # Build de produção com Turbopack
pnpm build:prod       # Build de produção (sem Turbopack)
pnpm start            # Inicia servidor de produção
pnpm preview          # Build + start (preview local)
```

### Qualidade de Código
```bash
pnpm lint             # Executa ESLint
pnpm lint:fix         # Corrige problemas do ESLint automaticamente
pnpm format           # Formata código com Prettier
pnpm format:check     # Verifica formatação
pnpm type-check       # Verificação TypeScript sem build
pnpm validate         # Executa lint + type-check + tests
pnpm check            # Alias para validate
```

### Testes
```bash
pnpm test             # Testes unitários com Jest
pnpm test:watch       # Testes em modo watch
pnpm test:coverage    # Testes com cobertura
pnpm test:e2e         # Testes E2E com Playwright
pnpm test:e2e:ui      # Testes E2E com interface
pnpm test:e2e:headed  # Testes E2E com navegador visível
pnpm test:all         # Executa todos os testes
```

### Banco de Dados (Prisma)
```bash
pnpm prisma:generate  # Gera Prisma Client
pnpm prisma:migrate   # Executa migrations
pnpm prisma:studio    # Abre Prisma Studio
```

### Utilitários
```bash
pnpm clean            # Limpa arquivos de build e cache
pnpm build:analyze    # Build com análise de bundle
pnpm ci               # Pipeline completo de CI (lint + type-check + test + build)
```

### Storybook
```bash
pnpm storybook        # Inicia Storybook dev server
pnpm build-storybook  # Build do Storybook
```

## 🧪 Testando o Projeto

### Testes Unitários
```bash
# Executar todos os testes
pnpm test

# Testes em modo watch
pnpm test:watch

# Com cobertura
pnpm test:coverage
```

### Testes E2E
```bash
# Executar testes E2E
pnpm test:e2e

# Com interface UI
pnpm test:e2e:ui

# Com navegador visível
pnpm test:e2e:headed
```

## 🔒 Segurança

Este projeto implementa várias práticas de segurança:

- Headers de segurança configurados (CSP, X-Frame-Options, etc)
- Validação de entrada com Zod
- Proteção CSRF
- Rate limiting em APIs
- Sanitização de dados

## 🌍 Internacionalização

O projeto suporta múltiplos idiomas usando `next-intl`:

- Português (pt)
- English (en)

Para adicionar um novo idioma, crie arquivos em `messages/[locale].json`.

## 🎨 Personalização

### Tema
Edite `tailwind.config.js` para personalizar cores, tipografia e espaçamentos.

### Componentes
Componentes reutilizáveis estão em `src/components/`. Modifique conforme necessário.

### Layouts
O layout principal está em `src/app/layout.tsx`.

## 🐛 Troubleshooting

### Problema: Build falha com erro de fonts
**Solução:** O projeto já está configurado com fallbacks. Se persistir, verifique sua conexão com a internet.

### Problema: Testes falham
**Solução:** Execute `pnpm install` novamente e certifique-se de que todas as dependências estão instaladas.

### Problema: Erro de TypeScript
**Solução:** Execute `pnpm type-check` para ver os erros específicos.

### Problema: Prisma não funciona
**Solução:** Configure a `DATABASE_URL` no `.env.local` e execute `pnpm prisma:generate`.

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

Leia [CONTRIBUTING.md](CONTRIBUTING.md) para mais detalhes.

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autores

- **Seu Nome** - *Trabalho Inicial* - [YourGitHub](https://github.com/yourusername)

## 🙏 Agradecimentos

- Next.js Team
- Vercel
- Comunidade Open Source

## 📞 Suporte

- 📧 Email: support@nextcook.dev
- 💬 Discord: [NextCook Community](https://discord.gg/nextcook)
- 📖 Documentação: [docs.nextcook.dev](https://docs.nextcook.dev)

---

**Desenvolvido com ❤️ usando Next.js**

## CI/CD e Deploy

### Configuração Automática

O projeto está configurado com GitHub Actions para CI/CD automático:

- **Pull Requests**: Deploy de preview automático
- **Branch main**: Deploy de produção automático
- **Testes**: Execução automática de lint, testes unitários e E2E
- **Segurança**: Scan de vulnerabilidades com Trivy
- **Performance**: Auditoria Lighthouse automática

### Variáveis de Ambiente Necessárias

Configure as seguintes secrets no GitHub:

```bash
# Vercel (obrigatório)
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id

# Opcionais
CODECOV_TOKEN=your_codecov_token
LHCI_GITHUB_APP_TOKEN=your_lighthouse_token
```

### Como Obter as Credenciais Vercel

1. **VERCEL_TOKEN**:
   ```bash
   npx vercel login
   npx vercel --token
   ```

2. **VERCEL_ORG_ID e VERCEL_PROJECT_ID**:
   ```bash
   npx vercel link
   # Os IDs estarão em .vercel/project.json
   ```

### Deploy Manual

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy de preview
vercel

# Deploy de produção
vercel --prod
```

### Configuração do Projeto Vercel

O arquivo `vercel.json` inclui:

- ✅ Headers de segurança
- ✅ Cache otimizado para assets
- ✅ Redirects e rewrites
- ✅ Configurações de build
- ✅ Cron jobs

### Monitoramento

- **Performance**: Lighthouse CI em cada PR
- **Segurança**: Trivy security scan
- **Cobertura**: Codecov integration
- **E2E**: Playwright tests automáticos

## Estrutura do Workflow

```mermaid
graph TD
    A[Push/PR] --> B[Lint & Test]
    B --> C[Build]
    C --> D[E2E Tests]
    B --> E[Security Scan]
    C --> F{Branch?}
    F -->|PR| G[Deploy Preview]
    F -->|main| H[Deploy Production]
    G --> I[Lighthouse Audit]
```

## Deploy on Vercel

O deploy é automatizado via GitHub Actions, mas você também pode usar:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/nextcook)

Para deploy manual, consulte a [documentação do Next.js](https://nextjs.org/docs/app/building-your-application/deploying).
