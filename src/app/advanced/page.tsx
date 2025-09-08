'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Globe, 
  Smartphone, 
  Zap, 
  Upload,
  Wifi,
  WifiOff,
  Bell,
  Download,
  Languages,
  Users,
  FileText,
  Image,
  Video,
  Music,
  Settings,
  Shield,
  Rocket
} from 'lucide-react';
import { DemoCard } from '@/components/DemoCard';
import { DemoCardStatic } from '@/components/DemoCardStatic';
import { DemoSection } from '@/components/DemoSection';
import { CodeBlock } from '@/components/CodeBlock';

const advancedFeatures = [
  {
    name: 'Internationalization (i18n)',
    description: 'Suporte multi-idioma com next-intl',
    icon: Globe,
    href: '/advanced/i18n',
    features: ['Multi-language', 'Locale Detection', 'Dynamic Loading', 'SEO Friendly'],
    category: 'Localization',
    popularity: '⭐⭐⭐⭐⭐',
    difficulty: 'Medium',
    color: 'from-blue-500 to-blue-700'
  },
  {
    name: 'Progressive Web App (PWA)',
    description: 'Aplicações web com recursos nativos',
    icon: Smartphone,
    href: '/advanced/pwa',
    features: ['Offline Support', 'Push Notifications', 'App Install', 'Service Workers'],
    category: 'Mobile Experience',
    popularity: '⭐⭐⭐⭐⭐',
    difficulty: 'Hard',
    color: 'from-purple-500 to-purple-700'
  },
  {
    name: 'Real-time Features',
    description: 'WebSockets e Server-Sent Events',
    icon: Zap,
    href: '/advanced/realtime',
    features: ['WebSockets', 'Server-Sent Events', 'Live Updates', 'Collaboration'],
    category: 'Real-time Communication',
    popularity: '⭐⭐⭐⭐⭐',
    difficulty: 'Hard',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    name: 'File Upload',
    description: 'Upload para Cloudinary e AWS S3',
    icon: Upload,
    href: '/advanced/file-upload',
    features: ['Multiple Providers', 'Image Optimization', 'Progress Tracking', 'Drag & Drop'],
    category: 'File Management',
    popularity: '⭐⭐⭐⭐⭐',
    difficulty: 'Medium',
    color: 'from-green-500 to-green-700'
  }
];

const featureConcepts = [
  {
    title: 'Internationalization',
    description: 'Suporte a múltiplos idiomas e regiões',
    icon: '🌍',
    topics: [
      'Locale detection',
      'Message formatting',
      'Date/number formatting',
      'RTL support'
    ]
  },
  {
    title: 'Progressive Enhancement',
    description: 'Melhorar experiência progressivamente',
    icon: '📱',
    topics: [
      'Service Workers',
      'Offline functionality',
      'Background sync',
      'Push notifications'
    ]
  },
  {
    title: 'Real-time Communication',
    description: 'Comunicação bidirecional em tempo real',
    icon: '⚡',
    topics: [
      'WebSocket connections',
      'Event-driven architecture',
      'Presence indicators',
      'Live collaboration'
    ]
  },
  {
    title: 'Media Management',
    description: 'Upload e processamento de arquivos',
    icon: '📁',
    topics: [
      'File validation',
      'Image optimization',
      'Cloud storage',
      'CDN integration'
    ]
  }
];

const implementationStrategies = [
  {
    name: 'Client-Side Rendering (CSR)',
    description: 'Renderização no cliente',
    pros: ['Interatividade rica', 'Transições suaves', 'Menos carga no servidor'],
    cons: ['SEO limitado', 'Tempo de carregamento inicial', 'JavaScript obrigatório'],
    useCase: 'Dashboards, aplicações interativas'
  },
  {
    name: 'Server-Side Rendering (SSR)',
    description: 'Renderização no servidor',
    pros: ['SEO otimizado', 'Carregamento rápido', 'Funciona sem JavaScript'],
    cons: ['Mais carga no servidor', 'Hidratação complexa', 'Menos interatividade'],
    useCase: 'Sites de conteúdo, e-commerce'
  },
  {
    name: 'Static Site Generation (SSG)',
    description: 'Geração estática no build',
    pros: ['Performance máxima', 'SEO excelente', 'Escalabilidade'],
    cons: ['Conteúdo estático', 'Build times longos', 'Atualizações complexas'],
    useCase: 'Blogs, documentação, landing pages'
  },
  {
    name: 'Incremental Static Regeneration (ISR)',
    description: 'Regeneração estática incremental',
    pros: ['Performance + dinamismo', 'SEO otimizado', 'Escalável'],
    cons: ['Complexidade adicional', 'Cache invalidation', 'Debugging difícil'],
    useCase: 'E-commerce, CMS, aplicações híbridas'
  }
];

const performanceMetrics = [
  {
    metric: 'First Contentful Paint (FCP)',
    description: 'Tempo até o primeiro conteúdo aparecer',
    target: '< 1.8s',
    impact: 'Percepção de velocidade'
  },
  {
    metric: 'Largest Contentful Paint (LCP)',
    description: 'Tempo até o maior elemento carregar',
    target: '< 2.5s',
    impact: 'Experiência de carregamento'
  },
  {
    metric: 'First Input Delay (FID)',
    description: 'Tempo até a primeira interação',
    target: '< 100ms',
    impact: 'Responsividade'
  },
  {
    metric: 'Cumulative Layout Shift (CLS)',
    description: 'Estabilidade visual da página',
    target: '< 0.1',
    impact: 'Estabilidade visual'
  },
  {
    metric: 'Time to Interactive (TTI)',
    description: 'Tempo até a página ser interativa',
    target: '< 3.8s',
    impact: 'Usabilidade'
  },
  {
    metric: 'Total Blocking Time (TBT)',
    description: 'Tempo total de bloqueio',
    target: '< 200ms',
    impact: 'Responsividade'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

export default function AdvancedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Advanced Features
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Recursos avançados para criar aplicações modernas e robustas. 
            Internacionalização, PWA, real-time e upload de arquivos.
          </p>
        </motion.div>

        {/* Featured Technologies */}
        <DemoSection title="Recursos Avançados" description="Funcionalidades para aplicações de próximo nível">
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-1.5 mb-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {advancedFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div key={feature.name} variants={itemVariants}>
                  <Link href={feature.href}>
                    <div className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer border border-gray-200 dark:border-gray-700 overflow-hidden relative">
                      {/* Background Gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                      
                      {/* Icon */}
                      <div className="flex items-center mb-4">
                        <div className={`p-3 rounded-lg bg-gradient-to-br ${feature.color} text-white mr-3`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {feature.name}
                          </h3>
                          <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                            {feature.category}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                      
                      {/* Stats */}
                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500 dark:text-gray-400">Popularidade</span>
                          <span className="text-xs">{feature.popularity}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500 dark:text-gray-400">Dificuldade</span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            feature.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                            feature.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {feature.difficulty}
                          </span>
                        </div>
                      </div>
                      
                      {/* Features */}
                      <div className="flex flex-wrap gap-1">
                        {feature.features.map((feat) => (
                          <span key={feat} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                            {feat}
                          </span>
                        ))}
                      </div>
                      
                      {/* Hover Arrow */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">→</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </DemoSection>

        {/* Feature Concepts */}
        <DemoSection title="Conceitos Fundamentais" description="Princípios por trás dos recursos avançados">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-1.5 mb-8">
            {featureConcepts.map((concept, index) => (
              <motion.div
                key={concept.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <DemoCardStatic title={concept.title} description={concept.description}>
                  <div className="space-y-4">
                    <div className="text-4xl text-center">{concept.icon}</div>
                    <ul className="space-y-2">
                      {concept.topics.map((topic, idx) => (
                        <li key={idx} className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                          <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2 flex-shrink-0" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                </DemoCardStatic>
              </motion.div>
            ))}
          </div>
        </DemoSection>

        {/* Implementation Strategies */}
        <DemoSection title="Estratégias de Implementação" description="Diferentes abordagens para renderização e performance">
          <div className="grid md:grid-cols-2 gap-1.5 mb-8">
            {implementationStrategies.map((strategy, index) => (
              <motion.div
                key={strategy.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {strategy.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {strategy.description}
                </p>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-medium text-green-700 dark:text-green-400 mb-2">✅ Vantagens</h4>
                    <ul className="space-y-1">
                      {strategy.pros.map((pro, idx) => (
                        <li key={idx} className="text-sm text-gray-600 dark:text-gray-300">
                          • {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-red-700 dark:text-red-400 mb-2">❌ Desvantagens</h4>
                    <ul className="space-y-1">
                      {strategy.cons.map((con, idx) => (
                        <li key={idx} className="text-sm text-gray-600 dark:text-gray-300">
                          • {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                  <h4 className="font-medium text-blue-700 dark:text-blue-400 mb-1">💡 Quando usar</h4>
                  <p className="text-sm text-blue-600 dark:text-blue-300">
                    {strategy.useCase}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </DemoSection>

        {/* Performance Metrics */}
        <DemoSection title="Métricas de Performance" description="Core Web Vitals e outras métricas importantes">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Métrica
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Descrição
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Target
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Impacto
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {performanceMetrics.map((metric, index) => (
                    <motion.tr 
                      key={metric.metric} 
                      className={`${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700/50' : ''} hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {metric.metric}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                        {metric.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded text-xs font-medium">
                          {metric.target}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                        {metric.impact}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </DemoSection>

        {/* Getting Started */}
        <DemoSection title="Como Começar" description="Primeiros passos para implementar recursos avançados">
          <div className="grid md:grid-cols-2 gap-1.5">
            <DemoCardStatic title="Setup Inicial" description="Configuração básica para recursos avançados">
              <CodeBlock
                language="bash"
                code={`# Instalar dependências para i18n
npm install next-intl

# Instalar dependências para PWA
npm install next-pwa workbox-webpack-plugin

# Instalar dependências para real-time
npm install socket.io-client ws
npm install -D @types/ws

# Instalar dependências para upload
npm install cloudinary multer
npm install -D @types/multer

# Instalar dependências para performance
npm install web-vitals
npm install @vercel/analytics`}
              />
            </DemoCardStatic>

            <DemoCardStatic title="Estrutura de Projeto" description="Organização recomendada">
              <CodeBlock
                language="text"
                code={`src/
├── app/
│   ├── [locale]/          # i18n routes
│   ├── api/
│   │   ├── upload/        # File upload endpoints
│   │   └── socket/        # WebSocket handlers
│   └── globals.css
├── components/
│   ├── i18n/              # Internationalization
│   ├── pwa/               # PWA components
│   ├── realtime/          # Real-time features
│   └── upload/            # File upload
├── lib/
│   ├── i18n.ts           # i18n configuration
│   ├── socket.ts         # Socket.io client
│   └── upload.ts         # Upload utilities
├── public/
│   ├── sw.js             # Service Worker
│   ├── manifest.json     # PWA manifest
│   └── locales/          # Translation files
└── workers/
    └── sw.ts             # Service Worker source`}
              />
            </DemoCardStatic>
          </div>
        </DemoSection>

        {/* Best Practices */}
        <DemoSection title="Melhores Práticas" description="Diretrizes para implementar recursos avançados">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <div className="grid md:grid-cols-3 gap-1.5">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Rocket className="h-5 w-5 mr-2 text-blue-500" />
                  Performance
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Implemente lazy loading</li>
                  <li>• Use code splitting estratégico</li>
                  <li>• Otimize Core Web Vitals</li>
                  <li>• Configure caching adequado</li>
                  <li>• Monitore métricas em produção</li>
                  <li>• Use CDN para assets estáticos</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Users className="h-5 w-5 mr-2 text-green-500" />
                  Experiência do Usuário
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Implemente progressive enhancement</li>
                  <li>• Forneça feedback visual</li>
                  <li>• Suporte offline quando possível</li>
                  <li>• Use loading states apropriados</li>
                  <li>• Teste em diferentes dispositivos</li>
                  <li>• Considere acessibilidade</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-red-500" />
                  Segurança
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Valide uploads no servidor</li>
                  <li>• Sanitize dados de entrada</li>
                  <li>• Use HTTPS para WebSockets</li>
                  <li>• Implemente rate limiting</li>
                  <li>• Configure CSP adequadamente</li>
                  <li>• Monitore vulnerabilidades</li>
                </ul>
              </div>
            </div>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}