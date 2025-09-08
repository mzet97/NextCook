'use client';

import DemoCard from '@/components/DemoCard';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const nextjsFeatures = [
  {
    title: 'App Router',
    description: 'Sistema de roteamento moderno com layouts aninhados, loading states e error boundaries.',
    icon: '🗂️',
    href: '/nextjs/app-router',
    color: 'blue' as const,
    features: ['Layouts aninhados', 'Loading UI', 'Error boundaries', 'Parallel routes']
  },
  {
    title: 'Dynamic Routes',
    description: 'Rotas dinâmicas com parâmetros [slug], catch-all [...slug] e optional catch-all [[...slug]].',
    icon: '🔀',
    href: '/nextjs/dynamic-routes',
    color: 'indigo' as const,
    features: ['[slug] routes', '[...slug] catch-all', '[[...slug]] optional', 'generateStaticParams']
  },
  {
    title: 'Parallel Routes',
    description: 'Renderização simultânea de múltiplas páginas com @folder syntax e slots independentes.',
    icon: '⚡',
    href: '/nextjs/parallel-routes',
    color: 'yellow' as const,
    features: ['@folder syntax', 'Slots independentes', 'Loading states', 'Error boundaries']
  },
  {
    title: 'Intercepting Routes',
    description: 'Interceptação de rotas para modais e overlays com (.)folder syntax.',
    icon: '🎯',
    href: '/nextjs/intercepting-routes',
    color: 'red' as const,
    features: ['(.)folder syntax', 'Modal overlays', 'Galeria de fotos', 'Combinação com Parallel Routes']
  },
  {
    title: 'Loading UI & Error Boundaries',
    description: 'Estados de carregamento e tratamento de erros com loading.tsx e error.tsx.',
    icon: '⏳',
    href: '/nextjs/loading-ui',
    color: 'orange' as const,
    features: ['loading.tsx', 'error.tsx', 'global-error.tsx', 'Suspense boundaries']
  },
  {
    title: 'Not Found Pages',
    description: 'Páginas 404 customizadas globais, por segmento e dinâmicas com notFound().',
    icon: '❌',
    href: '/nextjs/not-found',
    color: 'gray' as const,
    features: ['not-found.tsx', 'notFound() function', 'Segmented 404s', 'Custom designs']
  },
  {
    title: 'Font Optimization',
    description: 'Otimização de fontes com next/font, Google Fonts e fontes locais.',
    icon: '🔤',
    href: '/nextjs/font-optimization',
    color: 'pink' as const,
    features: ['Google Fonts', 'Local fonts', 'Variable fonts', 'Tailwind integration']
  },
  {
    title: 'Data Fetching',
    description: 'Estratégias avançadas de fetch com cache, revalidação e streaming.',
    icon: '📊',
    href: '/nextjs/data-fetching',
    color: 'teal' as const,
    features: ['Cache strategies', 'Revalidation', 'Parallel fetching', 'Streaming']
  },
  {
    title: 'Route Groups',
    description: 'Organização de rotas com (folder) syntax e múltiplos layouts.',
    icon: '📁',
    href: '/nextjs/route-groups',
    color: 'cyan' as const,
    features: ['(folder) syntax', 'Multiple layouts', 'Organization', 'Conditional layouts']
  },
  {
    title: 'API Routes (Route Handlers)',
    description: 'APIs robustas com CRUD, autenticação, upload, webhooks e streaming.',
    icon: '🔌',
    href: '/nextjs/route-handlers',
    color: 'emerald' as const,
    features: ['CRUD operations', 'Authentication', 'File upload', 'Webhooks & Streaming']
  },
  {
    title: 'Rendering Types',
    description: 'Comparação entre Static Site Generation (SSG), Server-Side Rendering (SSR) e Client-Side Rendering (CSR).',
    icon: '⚡',
    href: '/nextjs/rendering',
    color: 'green' as const,
    features: ['Static Generation', 'Server-Side Rendering', 'Client-Side Rendering', 'Incremental Static Regeneration']
  },
  {
    title: 'Image Optimization',
    description: 'Otimização automática de imagens com lazy loading, responsive images e formatos modernos.',
    icon: '🖼️',
    href: '/nextjs/images',
    color: 'purple' as const,
    features: ['Lazy loading', 'Responsive images', 'WebP/AVIF support', 'Blur placeholder']
  }
];

const performanceMetrics = [
  { label: 'First Contentful Paint', value: '0.8s', color: 'green' },
  { label: 'Largest Contentful Paint', value: '1.2s', color: 'green' },
  { label: 'Cumulative Layout Shift', value: '0.05', color: 'green' },
  { label: 'Time to Interactive', value: '1.5s', color: 'yellow' }
];

export default function NextJSPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 rounded-full text-blue-100 text-sm font-medium mb-6">
              <span className="mr-2">⚡</span>
              Next.js 15.5.2 Features
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Recursos do
              <span className="block text-yellow-300">Next.js 15.5.2</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Explore os recursos mais avançados do Next.js, desde o App Router até otimizações de performance e renderização.
            </p>
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Performance Metrics
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Métricas de performance desta aplicação Next.js
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1.5">
            {performanceMetrics.map((metric) => (
              <div key={metric.label} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-center">
                <div className={`text-3xl font-bold mb-2 ${
                  metric.color === 'green' ? 'text-green-600 dark:text-green-400' :
                  metric.color === 'yellow' ? 'text-yellow-600 dark:text-yellow-400' :
                  'text-red-600 dark:text-red-400'
                }`}>
                  {metric.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Recursos Demonstrados
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Explore todas as features do Next.js 15.5.2 com exemplos práticos e interativos
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1.5">
            {nextjsFeatures.map((feature) => (
              <div key={feature.title} className="group">
                <DemoCard {...feature} />
                <div className="mt-4 space-y-2">
                  {feature.features.map((item, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <ArrowRightIcon className="h-4 w-4 mr-2 text-blue-500" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start Guide */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Guia Rápido
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Principais conceitos e features implementadas
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1.5">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                🗂️ Roteamento
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• App Router moderno</li>
                <li>• Dynamic Routes</li>
                <li>• Parallel Routes</li>
                <li>• Intercepting Routes</li>
                <li>• Route Groups</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                ⚡ Performance
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Image Optimization</li>
                <li>• Font Optimization</li>
                <li>• Data Fetching</li>
                <li>• Code Splitting</li>
                <li>• Streaming</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                🛠️ UX/DX
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Loading UI</li>
                <li>• Error Boundaries</li>
                <li>• Not Found Pages</li>
                <li>• TypeScript</li>
                <li>• Hot Reload</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                🔌 APIs
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Route Handlers</li>
                <li>• CRUD Operations</li>
                <li>• Authentication</li>
                <li>• File Upload</li>
                <li>• Webhooks</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}