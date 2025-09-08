'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Cloud, 
  Zap, 
  Globe, 
  GitBranch,
  Settings,
  BarChart3,
  Shield,
  Database,
  Server,
  Code,
  Play,
  CheckCircle,
  AlertCircle,
  Monitor,
  Rocket,
  Users
} from 'lucide-react';
import { DemoCard } from '@/components/DemoCard';
import { DemoCardStatic } from '@/components/DemoCardStatic';
import { DemoSection } from '@/components/DemoSection';
import { CodeBlock } from '@/components/CodeBlock';

const vercelFeatures = [
  {
    title: 'Edge Network',
    description: 'CDN global com 100+ regiões',
    icon: Globe,
    color: 'text-blue-500',
    benefits: ['Baixa Latência', 'Cache Inteligente', 'Edge Functions', 'Global Distribution']
  },
  {
    title: 'Serverless Functions',
    description: 'APIs escaláveis sem gerenciar servidores',
    icon: Zap,
    color: 'text-yellow-500',
    benefits: ['Auto Scaling', 'Zero Config', 'Multiple Runtimes', 'Edge Runtime']
  },
  {
    title: 'Git Integration',
    description: 'Deploy automático a cada push',
    icon: GitBranch,
    color: 'text-green-500',
    benefits: ['Preview Deployments', 'Branch Deployments', 'Rollback', 'Collaboration']
  },
  {
    title: 'Analytics & Monitoring',
    description: 'Insights detalhados de performance',
    icon: BarChart3,
    color: 'text-purple-500',
    benefits: ['Web Vitals', 'Real User Monitoring', 'Error Tracking', 'Performance Insights']
  }
];

const deploymentFlow = [
  {
    step: '1',
    title: 'Connect Repository',
    description: 'Conecte seu repositório GitHub, GitLab ou Bitbucket',
    icon: GitBranch,
    color: 'bg-blue-500'
  },
  {
    step: '2',
    title: 'Configure Project',
    description: 'Defina configurações de build e variáveis de ambiente',
    icon: Settings,
    color: 'bg-green-500'
  },
  {
    step: '3',
    title: 'Deploy',
    description: 'Deploy automático com preview para cada branch',
    icon: Rocket,
    color: 'bg-purple-500'
  },
  {
    step: '4',
    title: 'Monitor',
    description: 'Monitore performance e analytics em tempo real',
    icon: Monitor,
    color: 'bg-orange-500'
  }
];

const vercelConfigs = [
  {
    name: 'Basic Configuration',
    description: 'Configuração básica para aplicações Next.js',
    config: `{
  "version": 2,
  "name": "my-nextjs-app",
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/"
    }
  ]
}`
  },
  {
    name: 'Custom API Routes',
    description: 'Configuração com rotas de API customizadas',
    config: `{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/"
    }
  ],
  "functions": {
    "app/api/*/route.ts": {
      "maxDuration": 30
    }
  }
}`
  },
  {
    name: 'Static Site with Redirects',
    description: 'Site estático com redirects e headers customizados',
    config: `{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/old-page",
      "status": 301,
      "headers": {
        "Location": "/new-page"
      }
    },
    {
      "src": "/api/(.*)",
      "headers": {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        "Access-Control-Allow-Headers": "Content-Type, Authorization"
      }
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}`
  },
  {
    name: 'Monorepo Configuration',
    description: 'Configuração para monorepos com múltiplas aplicações',
    config: `{
  "version": 2,
  "builds": [
    {
      "src": "apps/frontend/package.json",
      "use": "@vercel/next"
    },
    {
      "src": "apps/api/package.json",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/apps/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/apps/frontend/$1"
    }
  ],
  "buildCommand": "turbo run build --filter=frontend",
  "outputDirectory": "apps/frontend/.next",
  "installCommand": "npm install",
  "devCommand": "turbo run dev --filter=frontend"
}`
  }
];

const environmentExamples = [
  {
    name: 'Development',
    description: 'Variáveis para ambiente de desenvolvimento',
    variables: [
      { key: 'NODE_ENV', value: 'development', description: 'Ambiente de execução' },
      { key: 'NEXT_PUBLIC_API_URL', value: 'http://localhost:3001', description: 'URL da API local' },
      { key: 'DATABASE_URL', value: 'postgresql://localhost:5432/dev', description: 'URL do banco de desenvolvimento' },
      { key: 'NEXTAUTH_SECRET', value: 'dev-secret-key', description: 'Chave secreta para desenvolvimento' }
    ]
  },
  {
    name: 'Preview',
    description: 'Variáveis para deploys de preview',
    variables: [
      { key: 'NODE_ENV', value: 'production', description: 'Ambiente de execução' },
      { key: 'NEXT_PUBLIC_API_URL', value: 'https://api-preview.example.com', description: 'URL da API de preview' },
      { key: 'DATABASE_URL', value: 'postgresql://preview-db.example.com:5432/preview', description: 'URL do banco de preview' },
      { key: 'NEXTAUTH_SECRET', value: '${NEXTAUTH_SECRET}', description: 'Chave secreta (do Vercel)' }
    ]
  },
  {
    name: 'Production',
    description: 'Variáveis para ambiente de produção',
    variables: [
      { key: 'NODE_ENV', value: 'production', description: 'Ambiente de execução' },
      { key: 'NEXT_PUBLIC_API_URL', value: 'https://api.example.com', description: 'URL da API de produção' },
      { key: 'DATABASE_URL', value: '${DATABASE_URL}', description: 'URL do banco (do Vercel)' },
      { key: 'NEXTAUTH_SECRET', value: '${NEXTAUTH_SECRET}', description: 'Chave secreta (do Vercel)' }
    ]
  }
];

const performanceOptimizations = [
  {
    title: 'Image Optimization',
    description: 'Otimização automática de imagens',
    code: `// next.config.js
module.exports = {
  images: {
    domains: ['example.com', 'cdn.example.com'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
}`
  },
  {
    title: 'Edge Functions',
    description: 'Funções executadas na edge para menor latência',
    code: `// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Geolocation
  const country = request.geo?.country || 'US'
  const city = request.geo?.city || 'Unknown'
  
  // A/B Testing
  const bucket = Math.random() < 0.5 ? 'A' : 'B'
  
  // Rewrite based on location
  if (country === 'BR') {
    return NextResponse.rewrite(new URL('/br', request.url))
  }
  
  // Add headers
  const response = NextResponse.next()
  response.headers.set('x-country', country)
  response.headers.set('x-city', city)
  response.headers.set('x-bucket', bucket)
  
  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}`
  },
  {
    title: 'ISR (Incremental Static Regeneration)',
    description: 'Regeneração estática incremental',
    code: `// pages/posts/[id].tsx
import { GetStaticProps, GetStaticPaths } from 'next'

export default function Post({ post }) {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>Last updated: {post.updatedAt}</p>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Gerar apenas os posts mais populares no build
  const popularPosts = await getPopularPosts()
  
  const paths = popularPosts.map((post) => ({
    params: { id: post.id }
  }))
  
  return {
    paths,
    fallback: 'blocking' // Gerar outras páginas sob demanda
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await getPost(params?.id)
  
  if (!post) {
    return { notFound: true }
  }
  
  return {
    props: { post },
    revalidate: 60 // Revalidar a cada 60 segundos
  }
}`
  }
];

export default function VercelPage() {
  const [selectedTab, setSelectedTab] = useState('config');
  const [selectedConfig, setSelectedConfig] = useState(0);
  const [selectedEnv, setSelectedEnv] = useState(0);
  const [selectedOptimization, setSelectedOptimization] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-br from-black to-gray-800 rounded-xl text-white mr-4">
              <Cloud className="h-8 w-8" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
              Vercel
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Plataforma de deployment para frontend. Deploy instantâneo, 
            edge network global e analytics avançados.
          </p>
        </motion.div>

        {/* Features */}
        <DemoSection title="Por que Vercel?" description="Recursos que fazem a diferença">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-1.5 mb-8">
            {vercelFeatures.map((feature, index) => {
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

        {/* Deployment Flow */}
        <DemoSection title="Fluxo de Deploy" description="Como funciona o deploy no Vercel">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <div className="grid md:grid-cols-4 gap-1.5">
              {deploymentFlow.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.5 }}
                    className="relative text-center"
                  >
                    {/* Arrow */}
                    {index < deploymentFlow.length - 1 && (
                      <div className="hidden md:block absolute top-8 -right-3 z-10">
                        <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                          <span className="text-gray-600 dark:text-gray-300 text-xs">→</span>
                        </div>
                      </div>
                    )}
                    
                    <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {step.step}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </DemoSection>

        {/* Getting Started */}
        <DemoSection title="Como Começar" description="Primeiros passos com Vercel">
          <div className="grid md:grid-cols-2 gap-1.5 mb-8">
            <DemoCardStatic title="Instalação" description="Instalar Vercel CLI">
              <CodeBlock
                language="bash"
                code={`# Instalar Vercel CLI globalmente
npm install -g vercel

# Ou usar com npx (sem instalação global)
npx vercel

# Login na conta Vercel
vercel login

# Deploy do diretório atual
vercel

# Deploy para produção
vercel --prod

# Configurar projeto
vercel init

# Listar deployments
vercel ls

# Ver logs
vercel logs`}
              />
            </DemoCardStatic>

            <DemoCardStatic title="Deploy via Git" description="Conectar repositório GitHub">
              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 dark:text-blue-400 mb-2">📋 Passos</h4>
                  <ol className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                    <li>1. Acesse vercel.com e faça login</li>
                    <li>2. Clique em "New Project"</li>
                    <li>3. Conecte seu repositório GitHub</li>
                    <li>4. Configure build settings</li>
                    <li>5. Deploy automático!</li>
                  </ol>
                </div>
                
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h4 className="font-medium text-green-800 dark:text-green-400 mb-2">✨ Recursos Automáticos</h4>
                  <ul className="space-y-1 text-sm text-green-700 dark:text-green-300">
                    <li>• Preview deployments para PRs</li>
                    <li>• Deploy automático no merge</li>
                    <li>• Rollback com um clique</li>
                    <li>• Comentários automáticos no GitHub</li>
                  </ul>
                </div>
              </div>
            </DemoCardStatic>
          </div>
        </DemoSection>

        {/* Configuration Examples */}
        <DemoSection title="Configurações" description="Exemplos de vercel.json para diferentes cenários">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8 px-6 overflow-x-auto">
                {vercelConfigs.map((config, index) => (
                  <button
                    key={config.name}
                    onClick={() => setSelectedConfig(index)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                      selectedConfig === index
                        ? 'border-black text-black dark:border-white dark:text-white'
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
                  {vercelConfigs[selectedConfig].name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {vercelConfigs[selectedConfig].description}
                </p>
              </div>
              
              <CodeBlock
                language="json"
                code={vercelConfigs[selectedConfig].config}
              />
            </div>
          </div>
        </DemoSection>

        {/* Environment Variables */}
        <DemoSection title="Variáveis de Ambiente" description="Gerenciamento de configurações por ambiente">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8 px-6">
                {environmentExamples.map((env, index) => (
                  <button
                    key={env.name}
                    onClick={() => setSelectedEnv(index)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      selectedEnv === index
                        ? 'border-black text-black dark:border-white dark:text-white'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    {env.name}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {environmentExamples[selectedEnv].name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {environmentExamples[selectedEnv].description}
                </p>
              </div>
              
              <div className="space-y-4">
                {environmentExamples[selectedEnv].variables.map((variable, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <code className="text-sm font-mono bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-blue-600 dark:text-blue-400">
                        {variable.key}
                      </code>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {variable.description}
                      </span>
                    </div>
                    <code className="text-sm text-gray-700 dark:text-gray-300">
                      {variable.value}
                    </code>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Configuração via CLI:</h4>
                <CodeBlock
                  language="bash"
                  code={`# Adicionar variável de ambiente
vercel env add VARIABLE_NAME

# Listar variáveis
vercel env ls

# Remover variável
vercel env rm VARIABLE_NAME

# Puxar variáveis para .env.local
vercel env pull .env.local`}
                />
              </div>
            </div>
          </div>
        </DemoSection>

        {/* Performance Optimizations */}
        <DemoSection title="Otimizações de Performance" description="Técnicas para maximizar performance no Vercel">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8 px-6">
                {performanceOptimizations.map((optimization, index) => (
                  <button
                    key={optimization.title}
                    onClick={() => setSelectedOptimization(index)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      selectedOptimization === index
                        ? 'border-black text-black dark:border-white dark:text-white'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    {optimization.title}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {performanceOptimizations[selectedOptimization].title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {performanceOptimizations[selectedOptimization].description}
                </p>
              </div>
              
              <CodeBlock
                language="typescript"
                code={performanceOptimizations[selectedOptimization].code}
              />
            </div>
          </div>
        </DemoSection>

        {/* Best Practices */}
        <DemoSection title="Melhores Práticas" description="Diretrizes para usar Vercel eficientemente">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <div className="grid md:grid-cols-3 gap-1.5">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-yellow-500" />
                  Performance
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Use Next.js Image component</li>
                  <li>• Implemente ISR quando apropriado</li>
                  <li>• Configure Edge Functions</li>
                  <li>• Otimize bundle size</li>
                  <li>• Use static generation</li>
                  <li>• Configure cache headers</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-green-500" />
                  Segurança
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Configure security headers</li>
                  <li>• Use environment variables</li>
                  <li>• Implemente CSP</li>
                  <li>• Configure CORS adequadamente</li>
                  <li>• Use HTTPS sempre</li>
                  <li>• Monitore access logs</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Users className="h-5 w-5 mr-2 text-blue-500" />
                  Colaboração
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Use preview deployments</li>
                  <li>• Configure branch protection</li>
                  <li>• Documente configurações</li>
                  <li>• Use teams e permissions</li>
                  <li>• Configure notifications</li>
                  <li>• Monitore analytics</li>
                </ul>
              </div>
            </div>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}