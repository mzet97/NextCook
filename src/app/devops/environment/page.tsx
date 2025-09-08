'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Key, 
  Shield, 
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Database,
  Server,
  Globe,
  Code,
  AlertTriangle,
  CheckCircle,
  Copy,
  FileText,
  Layers,
  Users
} from 'lucide-react';
import { DemoCard } from '@/components/DemoCard';
import { DemoCardStatic } from '@/components/DemoCardStatic';
import { DemoSection } from '@/components/DemoSection';
import { CodeBlock } from '@/components/CodeBlock';

const environmentFeatures = [
  {
    title: 'Environment Variables',
    description: 'Configurações dinâmicas por ambiente',
    icon: Settings,
    color: 'text-blue-500',
    benefits: ['Dynamic Config', 'Environment Specific', 'Runtime Changes', 'Easy Management']
  },
  {
    title: 'Secrets Management',
    description: 'Armazenamento seguro de credenciais',
    icon: Key,
    color: 'text-red-500',
    benefits: ['Encrypted Storage', 'Access Control', 'Audit Logs', 'Rotation Support']
  },
  {
    title: 'Configuration Files',
    description: 'Arquivos de configuração estruturados',
    icon: FileText,
    color: 'text-green-500',
    benefits: ['Version Control', 'Structured Data', 'Validation', 'Documentation']
  },
  {
    title: 'Multi-Environment',
    description: 'Suporte para múltiplos ambientes',
    icon: Layers,
    color: 'text-purple-500',
    benefits: ['Dev/Staging/Prod', 'Isolation', 'Promotion', 'Consistency']
  }
];

const environmentTypes = [
  {
    name: 'Development',
    description: 'Ambiente local de desenvolvimento',
    icon: '💻',
    characteristics: [
      'Dados de teste',
      'Debug habilitado',
      'Hot reload',
      'Logs verbosos',
      'Sem cache agressivo'
    ],
    variables: [
      { key: 'NODE_ENV', value: 'development' },
      { key: 'DEBUG', value: 'true' },
      { key: 'API_URL', value: 'http://localhost:3001' },
      { key: 'DB_URL', value: 'postgresql://localhost:5432/dev' }
    ]
  },
  {
    name: 'Staging',
    description: 'Ambiente de homologação',
    icon: '🧪',
    characteristics: [
      'Dados similares à produção',
      'Testes de integração',
      'Performance testing',
      'UAT (User Acceptance Testing)',
      'Configuração próxima à produção'
    ],
    variables: [
      { key: 'NODE_ENV', value: 'production' },
      { key: 'DEBUG', value: 'false' },
      { key: 'API_URL', value: 'https://api-staging.example.com' },
      { key: 'DB_URL', value: 'postgresql://staging-db:5432/staging' }
    ]
  },
  {
    name: 'Production',
    description: 'Ambiente de produção',
    icon: '🚀',
    characteristics: [
      'Dados reais',
      'Máxima performance',
      'Monitoramento completo',
      'Backup e recovery',
      'Alta disponibilidade'
    ],
    variables: [
      { key: 'NODE_ENV', value: 'production' },
      { key: 'DEBUG', value: 'false' },
      { key: 'API_URL', value: 'https://api.example.com' },
      { key: 'DB_URL', value: 'process.env.DATABASE_URL' }
    ]
  }
];

const configurationExamples = [
  {
    name: 'Environment Files',
    description: 'Arquivos .env para diferentes ambientes',
    files: [
      {
        name: '.env.local',
        content: `# Local development environment
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3001

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/myapp_dev
REDIS_URL=redis://localhost:6379

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=local-development-secret

# OAuth Providers
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# External APIs
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# Email
EMAIL_SERVER_HOST=localhost
EMAIL_SERVER_PORT=1025
EMAIL_FROM=noreply@localhost`
      },
      {
        name: '.env.production',
        content: `# Production environment
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://example.com
NEXT_PUBLIC_API_URL=https://api.example.com

# Database (use secrets management)
DATABASE_URL=\${DATABASE_URL}
REDIS_URL=\${REDIS_URL}

# Authentication
NEXTAUTH_URL=https://example.com
NEXTAUTH_SECRET=\${NEXTAUTH_SECRET}

# OAuth Providers
GOOGLE_CLIENT_ID=\${GOOGLE_CLIENT_ID}
GOOGLE_CLIENT_SECRET=\${GOOGLE_CLIENT_SECRET}

# External APIs
STRIPE_PUBLISHABLE_KEY=\${STRIPE_PUBLISHABLE_KEY}
STRIPE_SECRET_KEY=\${STRIPE_SECRET_KEY}

# Email
EMAIL_SERVER_HOST=\${EMAIL_SERVER_HOST}
EMAIL_SERVER_PORT=\${EMAIL_SERVER_PORT}
EMAIL_FROM=\${EMAIL_FROM}`
      }
    ]
  }
];

const secretsManagement = [
  {
    platform: 'Vercel',
    description: 'Environment variables e secrets no Vercel',
    features: ['Environment-specific', 'Encrypted storage', 'CLI management', 'Git integration'],
    setup: `# Adicionar variável via CLI
vercel env add VARIABLE_NAME

# Listar variáveis
vercel env ls

# Puxar variáveis para arquivo local
vercel env pull .env.local

# Remover variável
vercel env rm VARIABLE_NAME`
  },
  {
    platform: 'GitHub Actions',
    description: 'Secrets para workflows de CI/CD',
    features: ['Repository secrets', 'Environment secrets', 'Organization secrets', 'Audit logs'],
    setup: `# Usar secrets no workflow
steps:
  - name: Deploy
    env:
      API_KEY: \${{ secrets.API_KEY }}
      DB_PASSWORD: \${{ secrets.DB_PASSWORD }}
    run: |
      echo "Deploying with API key"
      deploy.sh`
  }
];

export default function EnvironmentPage() {
  const [selectedConfig, setSelectedConfig] = useState(0);
  const [selectedFile, setSelectedFile] = useState(0);
  const [selectedSecret, setSelectedSecret] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-br from-green-500 to-green-700 rounded-xl text-white mr-4">
              <Settings className="h-8 w-8" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
              Environment Management
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Gerencie configurações, variáveis de ambiente e secrets de forma segura 
            e organizada para diferentes ambientes.
          </p>
        </motion.div>

        {/* Features */}
        <DemoSection title="Recursos Principais" description="Ferramentas para gerenciar configurações">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-1.5 mb-8">
            {environmentFeatures.map((feature, index) => {
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
                      <Icon className={"h-12 w-12 mx-auto " + feature.color} />
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

        {/* Environment Types */}
        <DemoSection title="Tipos de Ambiente" description="Características e configurações por ambiente">
          <div className="grid md:grid-cols-3 gap-1.5 mb-8">
            {environmentTypes.map((env, index) => (
              <motion.div
                key={env.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{env.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {env.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {env.description}
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Características:</h4>
                    <ul className="space-y-1">
                      {env.characteristics.map((char, idx) => (
                        <li key={idx} className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                          <span className="w-1 h-1 bg-green-500 rounded-full mr-2 flex-shrink-0" />
                          {char}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Variáveis Típicas:</h4>
                    <div className="space-y-2">
                      {env.variables.map((variable, idx) => (
                        <div key={idx} className="bg-gray-50 dark:bg-gray-700 rounded p-2">
                          <div className="flex items-center justify-between">
                            <code className="text-xs font-mono text-blue-600 dark:text-blue-400">
                              {variable.key}
                            </code>
                            <code className="text-xs text-gray-600 dark:text-gray-300">
                              {variable.value}
                            </code>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </DemoSection>

        {/* Configuration Examples */}
        <DemoSection title="Exemplos de Configuração" description="Diferentes abordagens para gerenciar configurações">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8 px-6 overflow-x-auto">
                {configurationExamples.map((config, index) => (
                  <button
                    key={config.name}
                    onClick={() => setSelectedConfig(index)}
                    className={"py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors " + (
                      selectedConfig === index
                        ? 'border-green-500 text-green-600 dark:text-green-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    )}
                  >
                    {config.name}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {configurationExamples[selectedConfig].name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {configurationExamples[selectedConfig].description}
                </p>
              </div>
              
              {/* File Tabs */}
              <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
                <nav className="flex space-x-4">
                  {configurationExamples[selectedConfig].files.map((file, index) => (
                    <button
                      key={file.name}
                      onClick={() => setSelectedFile(index)}
                      className={"py-2 px-3 border-b-2 font-medium text-sm transition-colors " + (
                        selectedFile === index
                          ? 'border-green-500 text-green-600 dark:text-green-400'
                          : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                      )}
                    >
                      {file.name}
                    </button>
                  ))}
                </nav>
              </div>
              
              <CodeBlock
                language="bash"
                code={configurationExamples[selectedConfig].files[selectedFile].content}
              />
            </div>
          </div>
        </DemoSection>

        {/* Secrets Management */}
        <DemoSection title="Gerenciamento de Secrets" description="Plataformas para armazenar credenciais seguramente">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8 px-6 overflow-x-auto">
                {secretsManagement.map((platform, index) => (
                  <button
                    key={platform.platform}
                    onClick={() => setSelectedSecret(index)}
                    className={"py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors " + (
                      selectedSecret === index
                        ? 'border-green-500 text-green-600 dark:text-green-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    )}
                  >
                    {platform.platform}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {secretsManagement[selectedSecret].platform}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {secretsManagement[selectedSecret].description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {secretsManagement[selectedSecret].features.map((feature) => (
                    <span key={feature} className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              
              <CodeBlock
                language={selectedSecret === 1 ? 'yaml' : 'bash'}
                code={secretsManagement[selectedSecret].setup}
              />
            </div>
          </div>
        </DemoSection>

        {/* Best Practices */}
        <DemoSection title="Melhores Práticas" description="Diretrizes para gerenciar configurações seguramente">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <div className="grid md:grid-cols-3 gap-1.5">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-green-500" />
                  Segurança
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Nunca commite secrets no código</li>
                  <li>• Use diferentes secrets por ambiente</li>
                  <li>• Rotacione secrets regularmente</li>
                  <li>• Implemente least privilege access</li>
                  <li>• Monitore acesso a secrets</li>
                  <li>• Use encryption at rest e in transit</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Settings className="h-5 w-5 mr-2 text-blue-500" />
                  Organização
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Use naming conventions consistentes</li>
                  <li>• Agrupe variáveis por funcionalidade</li>
                  <li>• Documente todas as variáveis</li>
                  <li>• Use validation schemas</li>
                  <li>• Mantenha .env.example atualizado</li>
                  <li>• Versione arquivos de configuração</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Users className="h-5 w-5 mr-2 text-purple-500" />
                  Colaboração
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Compartilhe configurações de dev</li>
                  <li>• Use ferramentas de team secrets</li>
                  <li>• Documente setup de ambiente</li>
                  <li>• Automatize configuração inicial</li>
                  <li>• Use scripts de setup</li>
                  <li>• Mantenha README atualizado</li>
                </ul>
              </div>
            </div>
          </div>
        </DemoSection>

        {/* Getting Started */}
        <DemoSection title="Como Começar" description="Setup inicial de environment management">
          <div className="grid md:grid-cols-2 gap-1.5">
            <DemoCardStatic title="Setup Básico" description="Configuração inicial de variáveis">
              <CodeBlock
                language="bash"
                code={"# 1. Criar arquivo .env.example\ncat > .env.example << 'EOF'\n# Application\nNODE_ENV=development\nNEXT_PUBLIC_APP_URL=http://localhost:3000\nPORT=3000\n\n# Database\nDATABASE_URL=postgresql://user:password@localhost:5432/myapp\n\n# Authentication\nNEXTAUTH_URL=http://localhost:3000\nNEXTAUTH_SECRET=your-secret-key\n\n# External APIs\nSTRIPE_PUBLISHABLE_KEY=pk_test_...\nSTRIPE_SECRET_KEY=sk_test_...\nEOF\n\n# 2. Copiar para .env.local\ncp .env.example .env.local\n\n# 3. Editar com valores reais\nnano .env.local\n\n# 4. Adicionar ao .gitignore\necho \".env.local\" >> .gitignore\necho \".env.*.local\" >> .gitignore"}
              />
            </DemoCardStatic>

            <DemoCardStatic title="Validação de Config" description="Validar configurações na inicialização">
              <CodeBlock
                language="typescript"
                code={"// lib/config.ts\nimport { z } from 'zod'\n\nconst configSchema = z.object({\n  NODE_ENV: z.enum(['development', 'staging', 'production']),\n  DATABASE_URL: z.string().url(),\n  NEXTAUTH_SECRET: z.string().min(32),\n  STRIPE_SECRET_KEY: z.string().startsWith('sk_'),\n})\n\nfunction validateConfig() {\n  try {\n    return configSchema.parse(process.env)\n  } catch (error) {\n    console.error('❌ Invalid configuration:')\n    console.error(error.errors)\n    process.exit(1)\n  }\n}\n\nexport const config = validateConfig()\n\n// Usar na aplicação\nimport { config } from '@/lib/config'\n\nconsole.log('✅ Configuration validated')\nconsole.log('Environment:', config.NODE_ENV)"}
              />
            </DemoCardStatic>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}