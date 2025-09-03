'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  GitBranch, 
  Play, 
  CheckCircle, 
  XCircle,
  Clock,
  Settings,
  Shield,
  Zap,
  Code,
  Package,
  Upload,
  Download,
  Server,
  Database,
  Globe,
  AlertCircle
} from 'lucide-react';
import { DemoCard } from '@/components/DemoCard';
import { DemoCardStatic } from '@/components/DemoCardStatic';
import { DemoSection } from '@/components/DemoSection';
import { CodeBlock } from '@/components/CodeBlock';

const githubActionsFeatures = [
  {
    title: 'CI/CD Integrado',
    description: 'Integração e deploy contínuo nativo do GitHub',
    icon: GitBranch,
    color: 'text-blue-500',
    benefits: ['Native Integration', 'Auto Triggers', 'Branch Protection', 'Status Checks']
  },
  {
    title: 'Matrix Builds',
    description: 'Teste em múltiplas versões e ambientes',
    icon: Package,
    color: 'text-green-500',
    benefits: ['Multiple OS', 'Multiple Versions', 'Parallel Execution', 'Cross Platform']
  },
  {
    title: 'Secrets Management',
    description: 'Gerenciamento seguro de credenciais',
    icon: Shield,
    color: 'text-red-500',
    benefits: ['Encrypted Storage', 'Environment Scoped', 'Audit Logs', 'Fine-grained Access']
  },
  {
    title: 'Marketplace',
    description: 'Milhares de actions prontas para usar',
    icon: Globe,
    color: 'text-purple-500',
    benefits: ['Pre-built Actions', 'Community Driven', 'Easy Integration', 'Custom Actions']
  }
];

const workflowTriggers = [
  {
    name: 'push',
    description: 'Executar quando código é enviado',
    example: 'on: push',
    useCase: 'CI builds, testes automáticos'
  },
  {
    name: 'pull_request',
    description: 'Executar em pull requests',
    example: 'on: pull_request',
    useCase: 'Validação de PRs, preview builds'
  },
  {
    name: 'schedule',
    description: 'Executar em horários específicos',
    example: 'on: schedule: - cron: "0 2 * * *"',
    useCase: 'Backups, limpeza, relatórios'
  },
  {
    name: 'workflow_dispatch',
    description: 'Executar manualmente',
    example: 'on: workflow_dispatch',
    useCase: 'Deploy manual, manutenção'
  },
  {
    name: 'release',
    description: 'Executar quando release é criado',
    example: 'on: release: types: [published]',
    useCase: 'Deploy de produção, publicação'
  },
  {
    name: 'repository_dispatch',
    description: 'Executar via webhook externo',
    example: 'on: repository_dispatch',
    useCase: 'Integração com sistemas externos'
  }
];

const workflowExamples = [
  {
    name: 'Basic CI',
    description: 'Workflow básico de CI para Node.js',
    workflow: `name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [16.x, 18.x, 20.x]
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
    
    - name: Setup Node.js \${{ matrix.node-version }}
      uses: actions/setup-node@v4
      with:
        node-version: \${{ matrix.node-version }}
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run linter
      run: npm run lint
    
    - name: Run tests
      run: npm run test:coverage
    
    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v3
      with:
        file: ./coverage/lcov.info
        flags: unittests
        name: codecov-umbrella
    
    - name: Build project
      run: npm run build`
  },
  {
    name: 'Deploy to Vercel',
    description: 'Deploy automático para Vercel',
    workflow: `name: Deploy to Vercel

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build project
      run: npm run build
      env:
        NEXT_PUBLIC_API_URL: \${{ secrets.API_URL }}
    
    - name: Deploy to Vercel (Preview)
      if: github.event_name == 'pull_request'
      uses: amondnet/vercel-action@v25
      with:
        vercel-token: \${{ secrets.VERCEL_TOKEN }}
        github-token: \${{ secrets.GITHUB_TOKEN }}
        vercel-org-id: \${{ secrets.ORG_ID }}
        vercel-project-id: \${{ secrets.PROJECT_ID }}
        working-directory: ./
    
    - name: Deploy to Vercel (Production)
      if: github.ref == 'refs/heads/main'
      uses: amondnet/vercel-action@v25
      with:
        vercel-token: \${{ secrets.VERCEL_TOKEN }}
        github-token: \${{ secrets.GITHUB_TOKEN }}
        vercel-org-id: \${{ secrets.ORG_ID }}
        vercel-project-id: \${{ secrets.PROJECT_ID }}
        vercel-args: '--prod'
        working-directory: ./`
  },
  {
    name: 'Docker Build & Push',
    description: 'Build e push de imagem Docker',
    workflow: `name: Docker Build and Push

on:
  push:
    branches: [ main ]
    tags: [ 'v*' ]
  pull_request:
    branches: [ main ]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: \${{ github.repository }}

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
    
    - name: Setup Docker Buildx
      uses: docker/setup-buildx-action@v3
    
    - name: Login to Container Registry
      if: github.event_name != 'pull_request'
      uses: docker/login-action@v3
      with:
        registry: \${{ env.REGISTRY }}
        username: \${{ github.actor }}
        password: \${{ secrets.GITHUB_TOKEN }}
    
    - name: Extract metadata
      id: meta
      uses: docker/metadata-action@v5
      with:
        images: \${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}
        tags: |
          type=ref,event=branch
          type=ref,event=pr
          type=semver,pattern={{version}}
          type=semver,pattern={{major}}.{{minor}}
    
    - name: Build and push Docker image
      uses: docker/build-push-action@v5
      with:
        context: .
        platforms: linux/amd64,linux/arm64
        push: \${{ github.event_name != 'pull_request' }}
        tags: \${{ steps.meta.outputs.tags }}
        labels: \${{ steps.meta.outputs.labels }}
        cache-from: type=gha
        cache-to: type=gha,mode=max`
  },
  {
    name: 'Release Automation',
    description: 'Automação de releases com changelog',
    workflow: `name: Release

on:
  push:
    branches: [ main ]

jobs:
  release:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      with:
        fetch-depth: 0
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm run test
    
    - name: Build project
      run: npm run build
    
    - name: Semantic Release
      uses: cycjimmy/semantic-release-action@v4
      with:
        semantic_version: 19
        extra_plugins: |
          @semantic-release/changelog@6.0.0
          @semantic-release/git@10.0.0
      env:
        GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
        NPM_TOKEN: \${{ secrets.NPM_TOKEN }}
    
    - name: Deploy to production
      if: steps.semantic.outputs.new_release_published == 'true'
      run: |
        echo "Deploying version \${{ steps.semantic.outputs.new_release_version }}"
        # Add your deployment commands here`
  }
];

const actionCategories = [
  {
    category: 'Setup & Configuration',
    actions: [
      { name: 'actions/checkout', description: 'Checkout repository code', usage: 'uses: actions/checkout@v4' },
      { name: 'actions/setup-node', description: 'Setup Node.js environment', usage: 'uses: actions/setup-node@v4' },
      { name: 'actions/setup-python', description: 'Setup Python environment', usage: 'uses: actions/setup-python@v4' },
      { name: 'actions/cache', description: 'Cache dependencies', usage: 'uses: actions/cache@v3' }
    ]
  },
  {
    category: 'Testing & Quality',
    actions: [
      { name: 'codecov/codecov-action', description: 'Upload coverage reports', usage: 'uses: codecov/codecov-action@v3' },
      { name: 'github/super-linter', description: 'Lint multiple languages', usage: 'uses: github/super-linter@v4' },
      { name: 'sonarqube-quality-gate-action', description: 'SonarQube quality gate', usage: 'uses: sonarqube-quality-gate-action@master' }
    ]
  },
  {
    category: 'Deployment',
    actions: [
      { name: 'peaceiris/actions-gh-pages', description: 'Deploy to GitHub Pages', usage: 'uses: peaceiris/actions-gh-pages@v3' },
      { name: 'amondnet/vercel-action', description: 'Deploy to Vercel', usage: 'uses: amondnet/vercel-action@v25' },
      { name: 'aws-actions/configure-aws-credentials', description: 'Configure AWS credentials', usage: 'uses: aws-actions/configure-aws-credentials@v4' }
    ]
  },
  {
    category: 'Docker & Containers',
    actions: [
      { name: 'docker/setup-buildx-action', description: 'Setup Docker Buildx', usage: 'uses: docker/setup-buildx-action@v3' },
      { name: 'docker/build-push-action', description: 'Build and push Docker images', usage: 'uses: docker/build-push-action@v5' },
      { name: 'docker/login-action', description: 'Login to Docker registry', usage: 'uses: docker/login-action@v3' }
    ]
  }
];

const securityBestPractices = [
  {
    title: 'Secrets Management',
    description: 'Como gerenciar secrets de forma segura',
    practices: [
      'Use GitHub Secrets para dados sensíveis',
      'Nunca hardcode secrets no código',
      'Use environment-specific secrets',
      'Rotacione secrets regularmente',
      'Use OIDC quando possível'
    ],
    example: `# ✅ Correto
steps:
  - name: Deploy
    env:
      API_KEY: \${{ secrets.API_KEY }}
        DB_PASSWORD: \${{ secrets.DB_PASSWORD }}
    run: deploy.sh

# ❌ Incorreto
steps:
  - name: Deploy
    env:
      API_KEY: "sk-1234567890abcdef"
    run: deploy.sh`
  },
  {
    title: 'Permissions',
    description: 'Configurar permissões mínimas necessárias',
    practices: [
      'Use permissions específicas por job',
      'Evite permissions: write-all',
      'Use GITHUB_TOKEN quando possível',
      'Revise permissions de third-party actions',
      'Use dependabot para updates'
    ],
    example: `# ✅ Correto
jobs:
  deploy:
    permissions:
      contents: read
      packages: write
      id-token: write
    steps:
      # ...

# ❌ Incorreto
jobs:
  deploy:
    permissions: write-all
    steps:
      # ...`
  },
  {
    title: 'Action Security',
    description: 'Usar actions de forma segura',
    practices: [
      'Pin actions para versões específicas',
      'Use actions de publishers confiáveis',
      'Revise código de custom actions',
      'Use SHA commits para máxima segurança',
      'Monitore security advisories'
    ],
    example: `# ✅ Mais seguro (SHA)
uses: actions/checkout@8e5e7e5ab8b370d6c329ec480221332ada57f0ab

# ✅ Seguro (tag)
uses: actions/checkout@v4

# ❌ Menos seguro (branch)
uses: actions/checkout@main`
  }
];

export default function GitHubActionsPage() {
  const [selectedTab, setSelectedTab] = useState('workflows');
  const [selectedWorkflow, setSelectedWorkflow] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedSecurity, setSelectedSecurity] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl text-white mr-4">
              <GitBranch className="h-8 w-8" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
              GitHub Actions
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Automatize workflows de CI/CD diretamente no GitHub. 
            Build, test e deploy com integração nativa.
          </p>
        </motion.div>

        {/* Features */}
        <DemoSection title="Por que GitHub Actions?" description="Vantagens da automação integrada">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {githubActionsFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <DemoCardStatic title={feature.title} description={feature.description}>
                    <div className="space-y-4">
                      <Icon className={`h-12 w-12 mx-auto ${feature.color}`} />
                      <div className="space-y-2">
                        {feature.benefits.map((benefit) => (
                          <div key={benefit} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                            <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                            {benefit}
                          </div>
                        ))}
                      </div>
                    </div>
                  </DemoCardStatic>
                </motion.div>
              );
            })}
          </div>
        </DemoSection>

        {/* Workflow Triggers */}
        <DemoSection title="Triggers de Workflow" description="Eventos que podem iniciar workflows">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {workflowTriggers.map((trigger, index) => (
              <motion.div
                key={trigger.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                    <Play className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {trigger.name}
                  </h3>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-3 text-sm">
                  {trigger.description}
                </p>
                
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-3">
                  <code className="text-xs text-purple-600 dark:text-purple-400">
                    {trigger.example}
                  </code>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                  <p className="text-blue-700 dark:text-blue-300 text-xs">
                    <strong>Uso:</strong> {trigger.useCase}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </DemoSection>

        {/* Workflow Examples */}
        <DemoSection title="Exemplos de Workflows" description="Workflows prontos para diferentes cenários">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8 px-6 overflow-x-auto">
                {workflowExamples.map((workflow, index) => (
                  <button
                    key={workflow.name}
                    onClick={() => setSelectedWorkflow(index)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                      selectedWorkflow === index
                        ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    {workflow.name}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {workflowExamples[selectedWorkflow].name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {workflowExamples[selectedWorkflow].description}
                </p>
              </div>
              
              <CodeBlock
                language="yaml"
                code={workflowExamples[selectedWorkflow].workflow}
              />
            </div>
          </div>
        </DemoSection>

        {/* Popular Actions */}
        <DemoSection title="Actions Populares" description="Actions mais utilizadas da comunidade">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8 px-6 overflow-x-auto">
                {actionCategories.map((category, index) => (
                  <button
                    key={category.category}
                    onClick={() => setSelectedCategory(index)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                      selectedCategory === index
                        ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    {category.category}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {actionCategories[selectedCategory].actions.map((action, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {action.name}
                      </h4>
                      <Package className="h-4 w-4 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      {action.description}
                    </p>
                    <code className="text-xs bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-purple-600 dark:text-purple-400">
                      {action.usage}
                    </code>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DemoSection>

        {/* Security Best Practices */}
        <DemoSection title="Melhores Práticas de Segurança" description="Como manter seus workflows seguros">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8 px-6">
                {securityBestPractices.map((practice, index) => (
                  <button
                    key={practice.title}
                    onClick={() => setSelectedSecurity(index)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      selectedSecurity === index
                        ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    {practice.title}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {securityBestPractices[selectedSecurity].title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {securityBestPractices[selectedSecurity].description}
                </p>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Práticas Recomendadas:</h4>
                  <ul className="space-y-2">
                    {securityBestPractices[selectedSecurity].practices.map((practice, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <Shield className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {practice}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Exemplo:</h4>
                  <CodeBlock
                    language="yaml"
                    code={securityBestPractices[selectedSecurity].example}
                  />
                </div>
              </div>
            </div>
          </div>
        </DemoSection>

        {/* Getting Started */}
        <DemoSection title="Como Começar" description="Primeiros passos com GitHub Actions">
          <div className="grid md:grid-cols-2 gap-6">
            <DemoCardStatic title="Criar Primeiro Workflow" description="Setup básico de um workflow">
              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 dark:text-blue-400 mb-2">📋 Passos</h4>
                  <ol className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                    <li>1. Crie pasta <code>.github/workflows/</code></li>
                    <li>2. Adicione arquivo <code>ci.yml</code></li>
                    <li>3. Configure triggers e jobs</li>
                    <li>4. Commit e push para ativar</li>
                    <li>5. Monitore na aba Actions</li>
                  </ol>
                </div>
                
                <CodeBlock
                  language="bash"
                  code={`# Criar estrutura
mkdir -p .github/workflows

# Criar workflow básico
cat > .github/workflows/ci.yml << 'EOF'
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test
EOF

# Commit e push
git add .
git commit -m "Add CI workflow"
git push`}
                />
              </div>
            </DemoCardStatic>

            <DemoCardStatic title="Configurar Secrets" description="Gerenciar credenciais seguramente">
              <div className="space-y-4">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h4 className="font-medium text-green-800 dark:text-green-400 mb-2">🔐 Configuração</h4>
                  <ol className="space-y-2 text-sm text-green-700 dark:text-green-300">
                    <li>1. Vá para Settings → Secrets and variables</li>
                    <li>2. Clique em "New repository secret"</li>
                    <li>3. Adicione nome e valor do secret</li>
                    <li>4. Use no workflow com <code>\$&#123;&#123; secrets.NAME &#125;&#125;</code></li>
                    <li>5. Configure environment secrets se necessário</li>
                  </ol>
                </div>
                
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                  <h4 className="font-medium text-red-800 dark:text-red-400 mb-2">⚠️ Cuidados</h4>
                  <ul className="space-y-1 text-sm text-red-700 dark:text-red-300">
                    <li>• Nunca commite secrets no código</li>
                    <li>• Use environment protection rules</li>
                    <li>• Rotacione secrets regularmente</li>
                    <li>• Monitore uso de secrets</li>
                  </ul>
                </div>
              </div>
            </DemoCardStatic>
          </div>
        </DemoSection>

        {/* Best Practices */}
        <DemoSection title="Melhores Práticas" description="Diretrizes para workflows eficientes">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-yellow-500" />
                  Performance
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Use cache para dependências</li>
                  <li>• Execute jobs em paralelo</li>
                  <li>• Use matrix builds eficientemente</li>
                  <li>• Otimize Docker builds</li>
                  <li>• Configure timeouts adequados</li>
                  <li>• Use self-hosted runners quando necessário</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-green-500" />
                  Segurança
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Pin actions para versões específicas</li>
                  <li>• Use permissions mínimas</li>
                  <li>• Valide inputs de usuário</li>
                  <li>• Use OIDC para cloud providers</li>
                  <li>• Monitore security advisories</li>
                  <li>• Configure branch protection</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Code className="h-5 w-5 mr-2 text-blue-500" />
                  Manutenibilidade
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Use nomes descritivos para workflows</li>
                  <li>• Documente workflows complexos</li>
                  <li>• Reutilize workflows com templates</li>
                  <li>• Use composite actions</li>
                  <li>• Monitore usage e custos</li>
                  <li>• Mantenha workflows atualizados</li>
                </ul>
              </div>
            </div>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}