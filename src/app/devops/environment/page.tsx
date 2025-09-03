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
      { key: 'DB_URL', value: '${DATABASE_URL}' }
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
        name: '.env.staging',
        content: `# Staging environment
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://staging.example.com
NEXT_PUBLIC_API_URL=https://api-staging.example.com

# Database
DATABASE_URL=postgresql://user:password@staging-db:5432/myapp_staging
REDIS_URL=redis://staging-redis:6379

# Authentication
NEXTAUTH_URL=https://staging.example.com
NEXTAUTH_SECRET=staging-secret-key

# OAuth Providers
GOOGLE_CLIENT_ID=staging-google-client-id
GOOGLE_CLIENT_SECRET=staging-google-client-secret

# External APIs
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# Email
EMAIL_SERVER_HOST=smtp.staging.example.com
EMAIL_SERVER_PORT=587
EMAIL_FROM=noreply@staging.example.com`
      },
      {
        name: '.env.production',
        content: `# Production environment
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://example.com
NEXT_PUBLIC_API_URL=https://api.example.com

# Database (use secrets management)
DATABASE_URL=${DATABASE_URL}
REDIS_URL=${REDIS_URL}

# Authentication
NEXTAUTH_URL=https://example.com
NEXTAUTH_SECRET=${NEXTAUTH_SECRET}

# OAuth Providers
GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID}
GOOGLE_CLIENT_SECRET=${GOOGLE_CLIENT_SECRET}

# External APIs
STRIPE_PUBLISHABLE_KEY=${STRIPE_PUBLISHABLE_KEY}
STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY}

# Email
EMAIL_SERVER_HOST=${EMAIL_SERVER_HOST}
EMAIL_SERVER_PORT=${EMAIL_SERVER_PORT}
EMAIL_FROM=${EMAIL_FROM}`
      }
    ]
  },
  {
    name: 'Configuration Objects',
    description: 'Configuração estruturada em TypeScript',
    files: [
      {
        name: 'config/index.ts',
        content: `import { z } from 'zod'

// Schema de validação
const configSchema = z.object({
  app: z.object({
    name: z.string(),
    version: z.string(),
    env: z.enum(['development', 'staging', 'production']),
    url: z.string().url(),
    port: z.number().int().positive(),
  }),
  database: z.object({
    url: z.string(),
    maxConnections: z.number().int().positive(),
    ssl: z.boolean(),
  }),
  auth: z.object({
    secret: z.string().min(32),
    sessionMaxAge: z.number().int().positive(),
    providers: z.object({
      google: z.object({
        clientId: z.string(),
        clientSecret: z.string(),
      }).optional(),
      github: z.object({
        clientId: z.string(),
        clientSecret: z.string(),
      }).optional(),
    }),
  }),
  external: z.object({
    stripe: z.object({
      publishableKey: z.string(),
      secretKey: z.string(),
      webhookSecret: z.string(),
    }),
    email: z.object({
      host: z.string(),
      port: z.number().int(),
      user: z.string(),
      password: z.string(),
      from: z.string().email(),
    }),
  }),
})

// Configuração base
const baseConfig = {
  app: {
    name: 'My App',
    version: process.env.npm_package_version || '1.0.0',
    env: process.env.NODE_ENV as 'development' | 'staging' | 'production',
    url: process.env.NEXT_PUBLIC_APP_URL!,
    port: parseInt(process.env.PORT || '3000'),
  },
  database: {
    url: process.env.DATABASE_URL!,
    maxConnections: parseInt(process.env.DB_MAX_CONNECTIONS || '10'),
    ssl: process.env.NODE_ENV === 'production',
  },
  auth: {
    secret: process.env.NEXTAUTH_SECRET!,
    sessionMaxAge: 30 * 24 * 60 * 60, // 30 days
    providers: {
      google: process.env.GOOGLE_CLIENT_ID ? {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      } : undefined,
      github: process.env.GITHUB_CLIENT_ID ? {
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      } : undefined,
    },
  },
  external: {
    stripe: {
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY!,
      secretKey: process.env.STRIPE_SECRET_KEY!,
      webhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
    },
    email: {
      host: process.env.EMAIL_SERVER_HOST!,
      port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
      user: process.env.EMAIL_SERVER_USER!,
      password: process.env.EMAIL_SERVER_PASSWORD!,
      from: process.env.EMAIL_FROM!,
    },
  },
}

// Validar e exportar configuração
export const config = configSchema.parse(baseConfig)

// Tipos TypeScript
export type Config = z.infer<typeof configSchema>`
      },
      {
        name: 'config/environments.ts',
        content: `import { config } from './index'

// Configurações específicas por ambiente
export const environmentConfigs = {
  development: {
    logging: {
      level: 'debug',
      pretty: true,
    },
    cache: {
      ttl: 60, // 1 minute
      enabled: false,
    },
    rateLimit: {
      enabled: false,
    },
  },
  staging: {
    logging: {
      level: 'info',
      pretty: false,
    },
    cache: {
      ttl: 300, // 5 minutes
      enabled: true,
    },
    rateLimit: {
      enabled: true,
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 1000, // requests per window
    },
  },
  production: {
    logging: {
      level: 'warn',
      pretty: false,
    },
    cache: {
      ttl: 3600, // 1 hour
      enabled: true,
    },
    rateLimit: {
      enabled: true,
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // requests per window
    },
  },
}

// Configuração atual baseada no ambiente
export const currentEnvConfig = environmentConfigs[config.app.env]

// Utilitários
export const isDevelopment = config.app.env === 'development'
export const isStaging = config.app.env === 'staging'
export const isProduction = config.app.env === 'production'
export const isServer = typeof window === 'undefined'`
      }
    ]
  },
  {
    name: 'Docker Configuration',
    description: 'Configuração com Docker e docker-compose',
    files: [
      {
        name: 'docker-compose.yml',
        content: `version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
      args:
        NODE_ENV: \${NODE_ENV:-development}
    ports:
      - "\${PORT:-3000}:3000"
    environment:
      - NODE_ENV=\${NODE_ENV:-development}
      - DATABASE_URL=\${DATABASE_URL}
      - REDIS_URL=\${REDIS_URL}
      - NEXTAUTH_SECRET=\${NEXTAUTH_SECRET}
    env_file:
      - .env.local
    depends_on:
      - postgres
      - redis
    volumes:
      - .:/app
      - /app/node_modules
      - /app/.next

  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=\${POSTGRES_DB:-myapp}
      - POSTGRES_USER=\${POSTGRES_USER:-user}
      - POSTGRES_PASSWORD=\${POSTGRES_PASSWORD:-password}
    ports:
      - "\${POSTGRES_PORT:-5432}:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql

  redis:
    image: redis:7-alpine
    ports:
      - "\${REDIS_PORT:-6379}:6379"
    volumes:
      - redis_data:/data
    command: redis-server --appendonly yes

volumes:
  postgres_data:
  redis_data:`
      },
      {
        name: '.env.docker',
        content: `# Docker environment variables
NODE_ENV=development
PORT=3000

# Database
POSTGRES_DB=myapp_dev
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_PORT=5432
DATABASE_URL=postgresql://user:password@postgres:5432/myapp_dev

# Redis
REDIS_PORT=6379
REDIS_URL=redis://redis:6379

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=docker-development-secret

# External services (use your own keys)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...`
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
      deploy.sh

# Secrets por environment
jobs:
  deploy:
    environment: production
    steps:
      - name: Deploy to prod
        env:
          PROD_API_KEY: \${{ secrets.PROD_API_KEY }}`
  },
  {
    platform: 'AWS Secrets Manager',
    description: 'Gerenciamento de secrets na AWS',
    features: ['Automatic rotation', 'Fine-grained access', 'Audit trail', 'Cross-service integration'],
    setup: `// Acessar secrets na aplicação
import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager'

const client = new SecretsManagerClient({ region: 'us-east-1' })

export async function getSecret(secretName: string) {
  try {
    const command = new GetSecretValueCommand({ SecretId: secretName })
    const response = await client.send(command)
    return JSON.parse(response.SecretString || '{}')
  } catch (error) {
    console.error('Error retrieving secret:', error)
    throw error
  }
}

// Usar na configuração
const dbCredentials = await getSecret('prod/database/credentials')
const DATABASE_URL = \`postgresql://\${dbCredentials.username}:\${dbCredentials.password}@\${dbCredentials.host}:5432/\${dbCredentials.database}\``
  },
  {
    platform: 'HashiCorp Vault',
    description: 'Secrets management enterprise',
    features: ['Dynamic secrets', 'Encryption as a service', 'Identity-based access', 'Audit logging'],
    setup: `// Cliente Vault para Node.js
import vault from 'node-vault'

const vaultClient = vault({
  apiVersion: 'v1',
  endpoint: process.env.VAULT_ADDR,
  token: process.env.VAULT_TOKEN,
})

export async function getVaultSecret(path: string) {
  try {
    const result = await vaultClient.read(path)
    return result.data
  } catch (error) {
    console.error('Error reading from Vault:', error)
    throw error
  }
}

// Usar secrets dinâmicos
const dbCreds = await getVaultSecret('database/creds/myapp-role')
const DATABASE_URL = \`postgresql://\${dbCreds.username}:\${dbCreds.password}@db:5432/myapp\``
  }
];

export default function EnvironmentPage() {
  const [selectedTab, setSelectedTab] = useState('types');
  const [selectedConfig, setSelectedConfig] = useState(0);
  const [selectedFile, setSelectedFile] = useState(0);
  const [selectedSecret, setSelectedSecret] = useState(0);
  const [showSecrets, setShowSecrets] = useState(false);

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
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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

        {/* Environment Types */}
        <DemoSection title="Tipos de Ambiente" description="Características e configurações por ambiente">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
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
                    className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                      selectedConfig === index
                        ? 'border-green-500 text-green-600 dark:text-green-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
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
                      className={`py-2 px-3 border-b-2 font-medium text-sm transition-colors ${
                        selectedFile === index
                          ? 'border-green-500 text-green-600 dark:text-green-400'
                          : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                      }`}
                    >
                      {file.name}
                    </button>
                  ))}
                </nav>
              </div>
              
              <CodeBlock
                language={configurationExamples[selectedConfig].files[selectedFile].name.endsWith('.ts') ? 'typescript' : 
                         configurationExamples[selectedConfig].files[selectedFile].name.endsWith('.yml') ? 'yaml' : 'bash'}
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
                    className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                      selectedSecret === index
                        ? 'border-green-500 text-green-600 dark:text-green-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
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
                language={selectedSecret === 1 ? 'yaml' : selectedSecret >= 2 ? 'typescript' : 'bash'}
                code={secretsManagement[selectedSecret].setup}
              />
            </div>
          </div>
        </DemoSection>

        {/* Best Practices */}
        <DemoSection title="Melhores Práticas" description="Diretrizes para gerenciar configurações seguramente">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <div className="grid md:grid-cols-3 gap-8">
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
          <div className="grid md:grid-cols-2 gap-6">
            <DemoCardStatic title="Setup Básico" description="Configuração inicial de variáveis">
              <CodeBlock
                language="bash"
                code={`# 1. Criar arquivo .env.example
cat > .env.example << 'EOF'
# Application
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
PORT=3000

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/myapp

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# External APIs
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
EOF

# 2. Copiar para .env.local
cp .env.example .env.local

# 3. Editar com valores reais
nano .env.local

# 4. Adicionar ao .gitignore
echo ".env.local" >> .gitignore
echo ".env.*.local" >> .gitignore`}
              />
            </DemoCardStatic>

            <DemoCardStatic title="Validação de Config" description="Validar configurações na inicialização">
              <CodeBlock
                language="typescript"
                code={`// lib/config.ts
import { z } from 'zod'

const configSchema = z.object({
  NODE_ENV: z.enum(['development', 'staging', 'production']),
  DATABASE_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32),
  STRIPE_SECRET_KEY: z.string().startsWith('sk_'),
})

function validateConfig() {
  try {
    return configSchema.parse(process.env)
  } catch (error) {
    console.error('❌ Invalid configuration:')
    console.error(error.errors)
    process.exit(1)
  }
}

export const config = validateConfig()

// Usar na aplicação
import { config } from '@/lib/config'

console.log('✅ Configuration validated')
console.log('Environment:', config.NODE_ENV)`}
              />
            </DemoCardStatic>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}