'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  AlertTriangle, 
  Activity, 
  Eye,
  TrendingUp,
  Users,
  Clock,
  Zap,
  Shield,
  Globe,
  Settings,
  Code,
  FileText,
  CheckCircle,
  ArrowRight,
  Monitor,
  Smartphone,
  Server,
  Database,
  Wifi,
  Bug
} from 'lucide-react';
import { DemoCard } from '@/components/DemoCard';
import { DemoCardStatic } from '@/components/DemoCardStatic';
import { DemoSection } from '@/components/DemoSection';
import Link from 'next/link';

const monitoringFeatures = [
  {
    title: 'Error Tracking',
    description: 'Rastreamento e análise de erros com Sentry',
    icon: Bug,
    color: 'text-red-500',
    href: '/monitoring/sentry',
    benefits: ['Real-time Alerts', 'Stack Traces', 'Performance Issues', 'Release Tracking']
  },
  {
    title: 'Analytics',
    description: 'Análise de comportamento e métricas',
    icon: BarChart3,
    color: 'text-blue-500',
    href: '/monitoring/analytics',
    benefits: ['User Behavior', 'Conversion Tracking', 'Custom Events', 'Real-time Data']
  },
  {
    title: 'Performance Monitoring',
    description: 'Monitoramento de performance e Core Web Vitals',
    icon: Zap,
    color: 'text-yellow-500',
    href: '/monitoring/performance',
    benefits: ['Core Web Vitals', 'Load Times', 'Resource Usage', 'User Experience']
  },
  {
    title: 'Uptime Monitoring',
    description: 'Monitoramento de disponibilidade e saúde',
    icon: Activity,
    color: 'text-green-500',
    href: '/monitoring/uptime',
    benefits: ['24/7 Monitoring', 'Multi-location', 'Alert Systems', 'Status Pages']
  }
];

const monitoringTools = [
  {
    category: 'Error Tracking',
    tools: [
      { name: 'Sentry', description: 'Error tracking e performance monitoring', popularity: 95 },
      { name: 'Bugsnag', description: 'Error monitoring para aplicações', popularity: 75 },
      { name: 'Rollbar', description: 'Real-time error tracking', popularity: 65 },
      { name: 'LogRocket', description: 'Session replay e error tracking', popularity: 70 }
    ]
  },
  {
    category: 'Analytics',
    tools: [
      { name: 'Google Analytics', description: 'Web analytics e insights', popularity: 90 },
      { name: 'Vercel Analytics', description: 'Analytics para aplicações Next.js', popularity: 80 },
      { name: 'Mixpanel', description: 'Product analytics avançado', popularity: 75 },
      { name: 'Amplitude', description: 'Digital analytics platform', popularity: 70 }
    ]
  },
  {
    category: 'Performance',
    tools: [
      { name: 'Web Vitals', description: 'Core Web Vitals do Google', popularity: 85 },
      { name: 'Lighthouse', description: 'Auditoria de performance', popularity: 90 },
      { name: 'New Relic', description: 'Application performance monitoring', popularity: 80 },
      { name: 'DataDog', description: 'Infrastructure e application monitoring', popularity: 75 }
    ]
  },
  {
    category: 'Uptime',
    tools: [
      { name: 'Pingdom', description: 'Website uptime monitoring', popularity: 85 },
      { name: 'UptimeRobot', description: 'Free uptime monitoring', popularity: 80 },
      { name: 'StatusPage', description: 'Status page e incident management', popularity: 75 },
      { name: 'Better Uptime', description: 'Modern uptime monitoring', popularity: 70 }
    ]
  }
];

const keyMetrics = [
  {
    category: 'Performance',
    metrics: [
      { name: 'First Contentful Paint (FCP)', target: '< 1.8s', description: 'Tempo para primeiro conteúdo visível' },
      { name: 'Largest Contentful Paint (LCP)', target: '< 2.5s', description: 'Tempo para maior elemento visível' },
      { name: 'First Input Delay (FID)', target: '< 100ms', description: 'Tempo de resposta à primeira interação' },
      { name: 'Cumulative Layout Shift (CLS)', target: '< 0.1', description: 'Estabilidade visual da página' }
    ]
  },
  {
    category: 'User Experience',
    metrics: [
      { name: 'Bounce Rate', target: '< 40%', description: 'Taxa de rejeição de páginas' },
      { name: 'Session Duration', target: '> 2min', description: 'Duração média das sessões' },
      { name: 'Page Views per Session', target: '> 3', description: 'Páginas visualizadas por sessão' },
      { name: 'Conversion Rate', target: '> 2%', description: 'Taxa de conversão de objetivos' }
    ]
  },
  {
    category: 'Technical',
    metrics: [
      { name: 'Error Rate', target: '< 1%', description: 'Taxa de erros JavaScript' },
      { name: 'API Response Time', target: '< 200ms', description: 'Tempo de resposta das APIs' },
      { name: 'Uptime', target: '> 99.9%', description: 'Disponibilidade do serviço' },
      { name: 'Memory Usage', target: '< 80%', description: 'Uso de memória do servidor' }
    ]
  }
];

const implementationSteps = [
  {
    step: 1,
    title: 'Setup Error Tracking',
    description: 'Configure Sentry para capturar erros e exceções',
    tasks: [
      'Criar conta no Sentry',
      'Instalar SDK do Sentry',
      'Configurar DSN e environment',
      'Testar captura de erros'
    ]
  },
  {
    step: 2,
    title: 'Implement Analytics',
    description: 'Adicionar Google Analytics e Vercel Analytics',
    tasks: [
      'Configurar Google Analytics 4',
      'Instalar Vercel Analytics',
      'Definir eventos customizados',
      'Configurar conversões'
    ]
  },
  {
    step: 3,
    title: 'Performance Monitoring',
    description: 'Monitorar Core Web Vitals e performance',
    tasks: [
      'Implementar Web Vitals',
      'Configurar Lighthouse CI',
      'Monitorar métricas de performance',
      'Otimizar baseado em dados'
    ]
  },
  {
    step: 4,
    title: 'Setup Alerts',
    description: 'Configurar alertas e notificações',
    tasks: [
      'Definir thresholds de alerta',
      'Configurar canais de notificação',
      'Criar dashboards de monitoramento',
      'Testar sistema de alertas'
    ]
  }
];

export default function MonitoringPage() {
  const [selectedMetricCategory, setSelectedMetricCategory] = useState(0);
  const [selectedToolCategory, setSelectedToolCategory] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl text-white mr-4">
              <BarChart3 className="h-8 w-8" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
              Monitoring & Analytics
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Monitore performance, rastreie erros e analise comportamento dos usuários. 
            Ferramentas essenciais para manter aplicações saudáveis e otimizadas.
          </p>
        </motion.div>

        {/* Main Features */}
        <DemoSection title="Recursos Principais" description="Ferramentas essenciais para monitoramento e análise">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {monitoringFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Link href={feature.href}>
                    <DemoCardStatic title={feature.title} description={feature.description}>
                      <div className="space-y-4 cursor-pointer group">
                        <Icon className={`h-12 w-12 mx-auto ${feature.color} group-hover:scale-110 transition-transform`} />
                        <div className="space-y-2">
                          {feature.benefits.map((benefit) => (
                            <div key={benefit} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                              <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                              {benefit}
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300">
                          <span className="text-sm font-medium mr-1">Explorar</span>
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                    </DemoCardStatic>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </DemoSection>

        {/* Key Metrics */}
        <DemoSection title="Métricas Importantes" description="KPIs essenciais para monitorar">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8 px-6 overflow-x-auto">
                {keyMetrics.map((category, index) => (
                  <button
                    key={category.category}
                    onClick={() => setSelectedMetricCategory(index)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                      selectedMetricCategory === index
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    {category.category}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {keyMetrics[selectedMetricCategory].metrics.map((metric, index) => (
                  <div key={metric.name} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {metric.name}
                      </h3>
                      <span className="text-sm font-mono text-green-600 dark:text-green-400">
                        {metric.target}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {metric.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DemoSection>

        {/* Tools Comparison */}
        <DemoSection title="Ferramentas Populares" description="Comparação de soluções de monitoramento">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8 px-6 overflow-x-auto">
                {monitoringTools.map((category, index) => (
                  <button
                    key={category.category}
                    onClick={() => setSelectedToolCategory(index)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                      selectedToolCategory === index
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
                {monitoringTools[selectedToolCategory].tools.map((tool, index) => (
                  <div key={tool.name} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                        {tool.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {tool.description}
                      </p>
                    </div>
                    <div className="ml-4 flex items-center space-x-3">
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {tool.popularity}%
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Popularidade
                        </div>
                      </div>
                      <div className="w-20 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div 
                          className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${tool.popularity}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DemoSection>

        {/* Implementation Guide */}
        <DemoSection title="Guia de Implementação" description="Passos para configurar monitoramento completo">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {implementationSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    {step.step}
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {step.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  {step.description}
                </p>
                <ul className="space-y-2">
                  {step.tasks.map((task, taskIndex) => (
                    <li key={taskIndex} className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                      <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                      {task}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </DemoSection>

        {/* Best Practices */}
        <DemoSection title="Melhores Práticas" description="Diretrizes para monitoramento eficaz">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Settings className="h-5 w-5 mr-2 text-blue-500" />
                  Configuração
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Configure alertas inteligentes</li>
                  <li>• Defina SLAs e SLOs claros</li>
                  <li>• Use sampling para reduzir custos</li>
                  <li>• Implemente health checks</li>
                  <li>• Configure dashboards relevantes</li>
                  <li>• Documente métricas importantes</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Eye className="h-5 w-5 mr-2 text-green-500" />
                  Observabilidade
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Monitore toda a stack</li>
                  <li>• Use distributed tracing</li>
                  <li>• Implemente logging estruturado</li>
                  <li>• Monitore user experience</li>
                  <li>• Rastreie business metrics</li>
                  <li>• Use correlation IDs</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-purple-500" />
                  Otimização
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Analise trends e padrões</li>
                  <li>• Otimize baseado em dados</li>
                  <li>• Implemente A/B testing</li>
                  <li>• Monitore após deployments</li>
                  <li>• Use feature flags</li>
                  <li>• Meça impacto de mudanças</li>
                </ul>
              </div>
            </div>
          </div>
        </DemoSection>

        {/* Quick Start */}
        <DemoSection title="Quick Start" description="Comece rapidamente com monitoramento básico">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Pronto para começar?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Explore nossas seções detalhadas para implementar monitoramento completo
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {monitoringFeatures.map((feature) => {
                const Icon = feature.icon;
                return (
                  <Link key={feature.title} href={feature.href}>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center hover:shadow-lg transition-shadow cursor-pointer group">
                      <Icon className={`h-8 w-8 mx-auto mb-2 ${feature.color} group-hover:scale-110 transition-transform`} />
                      <div className="font-medium text-gray-900 dark:text-white text-sm">
                        {feature.title}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}