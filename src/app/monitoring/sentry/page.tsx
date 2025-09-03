'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bug, 
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
  X,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';
import { DemoCard } from '@/components/DemoCard';
import { DemoCardStatic } from '@/components/DemoCardStatic';
import { DemoSection } from '@/components/DemoSection';
import { CodeBlock } from '@/components/CodeBlock';

const sentryFeatures = [
  {
    title: 'Error Tracking',
    description: 'Captura automática de erros e exceções',
    icon: Bug,
    color: 'text-red-500',
    benefits: ['Real-time Capture', 'Stack Traces', 'Error Grouping', 'Release Tracking']
  },
  {
    title: 'Performance Monitoring',
    description: 'Monitoramento de performance de aplicações',
    icon: Zap,
    color: 'text-yellow-500',
    benefits: ['Transaction Tracing', 'Database Queries', 'API Calls', 'User Experience']
  },
  {
    title: 'Release Health',
    description: 'Acompanhamento da saúde de releases',
    icon: Activity,
    color: 'text-green-500',
    benefits: ['Crash Rate', 'Adoption Rate', 'Session Data', 'User Impact']
  },
  {
    title: 'Alerts & Notifications',
    description: 'Sistema de alertas inteligentes',
    icon: AlertTriangle,
    color: 'text-orange-500',
    benefits: ['Smart Alerts', 'Custom Rules', 'Multiple Channels', 'Escalation']
  }
];

const errorTypes = [
  {
    type: 'JavaScript Errors',
    description: 'Erros de runtime no frontend',
    examples: ['TypeError', 'ReferenceError', 'SyntaxError', 'RangeError'],
    color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
  },
  {
    type: 'Network Errors',
    description: 'Falhas de comunicação com APIs',
    examples: ['404 Not Found', '500 Server Error', 'Timeout', 'CORS'],
    color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
  },
  {
    type: 'Performance Issues',
    description: 'Problemas de performance detectados',
    examples: ['Slow DB Query', 'Large Bundle', 'Memory Leak', 'Long Task'],
    color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
  },
  {
    type: 'User Experience',
    description: 'Problemas que afetam a experiência',
    examples: ['Rage Clicks', 'Dead Clicks', 'Slow Loading', 'Layout Shift'],
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
  }
];

const configurationExamples = [
  {
    name: 'Next.js Setup',
    description: 'Configuração do Sentry para Next.js',
    files: [
      {
        name: 'sentry.client.config.ts',
        content: `import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  
  // Configurações de performance
  tracesSampleRate: 1.0,
  
  // Configurações de replay de sessão
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  
  // Configurações de debug
  debug: process.env.NODE_ENV === 'development',
  
  // Configurações de environment
  environment: process.env.NODE_ENV,
  
  // Configurações de release
  release: process.env.NEXT_PUBLIC_APP_VERSION,
  
  // Filtros de erro
  beforeSend(event, hint) {
    // Filtrar erros conhecidos ou irrelevantes
    if (event.exception) {
      const error = hint.originalException
      
      // Ignorar erros de extensões do browser
      if (error && error.stack && error.stack.includes('extension://')) {
        return null
      }
      
      // Ignorar erros de scripts externos
      if (event.exception.values?.[0]?.stacktrace?.frames?.some(
        frame => frame.filename && !frame.filename.includes(window.location.origin)
      )) {
        return null
      }
    }
    
    return event
  },
  
  // Configurações de integração
  integrations: [
    new Sentry.Replay({
      maskAllText: false,
      blockAllMedia: false,
    }),
    new Sentry.BrowserTracing({
      // Configurar roteamento para SPAs
      routingInstrumentation: Sentry.nextRouterInstrumentation({
        router: undefined // será definido automaticamente
      }),
    }),
  ],
  
  // Tags globais
  initialScope: {
    tags: {
      component: 'frontend',
      framework: 'nextjs'
    }
  }
})`
      },
      {
        name: 'sentry.server.config.ts',
        content: `import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  
  // Configurações de performance
  tracesSampleRate: 1.0,
  
  // Configurações de debug
  debug: process.env.NODE_ENV === 'development',
  
  // Configurações de environment
  environment: process.env.NODE_ENV,
  
  // Configurações de release
  release: process.env.APP_VERSION,
  
  // Filtros de erro
  beforeSend(event, hint) {
    // Log do erro no servidor
    console.error('Sentry Error:', hint.originalException)
    
    // Filtrar erros sensíveis
    if (event.exception) {
      const error = hint.originalException
      
      // Não enviar erros com informações sensíveis
      if (error && error.message && error.message.includes('password')) {
        return null
      }
    }
    
    return event
  },
  
  // Configurações de integração
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.Express({ app: undefined }),
  ],
  
  // Tags globais
  initialScope: {
    tags: {
      component: 'backend',
      framework: 'nextjs'
    }
  }
})`
      },
      {
        name: 'next.config.js',
        content: `const { withSentryConfig } = require('@sentry/nextjs')

const nextConfig = {
  // Suas configurações do Next.js
  reactStrictMode: true,
  swcMinify: true,
  
  // Configurações específicas do Sentry
  sentry: {
    // Suprimir logs de source maps durante build
    hideSourceMaps: true,
    
    // Desabilitar Sentry durante desenvolvimento
    disableServerWebpackPlugin: process.env.NODE_ENV === 'development',
    disableClientWebpackPlugin: process.env.NODE_ENV === 'development',
  }
}

const sentryWebpackPluginOptions = {
  // Configurações adicionais do webpack plugin
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  
  // Auth token para upload de source maps
  authToken: process.env.SENTRY_AUTH_TOKEN,
  
  // Configurações de source maps
  include: '.next',
  ignore: ['node_modules', 'cypress', 'test'],
  
  // Configurações de upload
  silent: true,
  widenClientFileUpload: true,
  
  // Configurações de release
  setCommits: {
    auto: true,
    ignoreMissing: true,
    ignoreEmpty: true,
  },
  
  // Configurações de deploy
  deploy: {
    env: process.env.NODE_ENV,
  }
}

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions)`
      }
    ]
  },
  {
    name: 'Error Handling',
    description: 'Como capturar e tratar erros',
    files: [
      {
        name: 'utils/errorHandler.ts',
        content: `import * as Sentry from '@sentry/nextjs'

// Tipos de erro customizados
export class APIError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code?: string
  ) {
    super(message)
    this.name = 'APIError'
  }
}

export class ValidationError extends Error {
  constructor(
    message: string,
    public field: string
  ) {
    super(message)
    this.name = 'ValidationError'
  }
}

// Função para capturar erros manualmente
export function captureError(
  error: Error,
  context?: Record<string, any>,
  level: Sentry.SeverityLevel = 'error'
) {
  Sentry.withScope((scope) => {
    // Adicionar contexto
    if (context) {
      Object.keys(context).forEach(key => {
        scope.setContext(key, context[key])
      })
    }
    
    // Definir nível de severidade
    scope.setLevel(level)
    
    // Adicionar tags baseadas no tipo de erro
    if (error instanceof APIError) {
      scope.setTag('error_type', 'api_error')
      scope.setTag('status_code', error.statusCode)
      scope.setContext('api_error', {
        statusCode: error.statusCode,
        code: error.code
      })
    } else if (error instanceof ValidationError) {
      scope.setTag('error_type', 'validation_error')
      scope.setTag('field', error.field)
      scope.setContext('validation_error', {
        field: error.field
      })
    }
    
    // Capturar o erro
    Sentry.captureException(error)
  })
}

// Função para capturar mensagens customizadas
export function captureMessage(
  message: string,
  level: Sentry.SeverityLevel = 'info',
  extra?: Record<string, any>
) {
  Sentry.withScope((scope) => {
    if (extra) {
      scope.setContext('extra', extra)
    }
    scope.setLevel(level)
    Sentry.captureMessage(message)
  })
}

// Hook para React Error Boundary
export function useSentryErrorBoundary() {
  return {
    onError: (error: Error, errorInfo: any) => {
      Sentry.withScope((scope) => {
        scope.setContext('react_error_boundary', errorInfo)
        scope.setTag('error_boundary', true)
        Sentry.captureException(error)
      })
    }
  }
}

// Middleware para API routes
export function withSentryAPI<T extends any[], R>(
  handler: (...args: T) => Promise<R>
) {
  return async (...args: T): Promise<R> => {
    try {
      return await handler(...args)
    } catch (error) {
      // Capturar erro da API
      captureError(error as Error, {
        api_route: true,
        args: args.length > 0 ? args[0] : undefined
      })
      throw error
    }
  }
}

// Função para adicionar breadcrumbs
export function addBreadcrumb(
  message: string,
  category: string = 'custom',
  level: Sentry.SeverityLevel = 'info',
  data?: Record<string, any>
) {
  Sentry.addBreadcrumb({
    message,
    category,
    level,
    data,
    timestamp: Date.now() / 1000
  })
}

// Função para definir contexto do usuário
export function setUserContext(user: {
  id: string
  email?: string
  username?: string
  [key: string]: any
}) {
  Sentry.setUser(user)
}

// Função para definir tags globais
export function setGlobalTags(tags: Record<string, string>) {
  Sentry.setTags(tags)
}`
      },
      {
        name: 'components/ErrorBoundary.tsx',
        content: `'use client'

import React, { Component, ReactNode } from 'react'
import * as Sentry from '@sentry/nextjs'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: any) => void
}

interface State {
  hasError: boolean
  error?: Error
  errorId?: string
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // Capturar erro no Sentry
    const errorId = Sentry.captureException(error, {
      contexts: {
        react: {
          componentStack: errorInfo.componentStack
        }
      },
      tags: {
        component: 'error_boundary'
      }
    })

    this.setState({ errorId })

    // Callback customizado
    this.props.onError?.(error, errorInfo)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorId: undefined })
  }

  handleReportFeedback = () => {
    if (this.state.errorId) {
      Sentry.showReportDialog({ eventId: this.state.errorId })
    }
  }

  render() {
    if (this.state.hasError) {
      // Renderizar fallback customizado se fornecido
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Fallback padrão
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
            <div className="mb-6">
              <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Oops! Algo deu errado
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Ocorreu um erro inesperado. Nossa equipe foi notificada automaticamente.
              </p>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-left">
                <h3 className="font-medium text-red-800 dark:text-red-300 mb-2">
                  Detalhes do Erro (Desenvolvimento):
                </h3>
                <pre className="text-xs text-red-700 dark:text-red-400 overflow-auto">
                  {this.state.error.message}
                </pre>
              </div>
            )}

            <div className="space-y-3">
              <button
                onClick={this.handleRetry}
                className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Tentar Novamente
              </button>
              
              <button
                onClick={() => window.location.href = '/'}
                className="w-full flex items-center justify-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Home className="h-4 w-4 mr-2" />
                Voltar ao Início
              </button>
              
              {this.state.errorId && (
                <button
                  onClick={this.handleReportFeedback}
                  className="w-full px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors"
                >
                  Reportar Problema
                </button>
              )}
            </div>

            {this.state.errorId && (
              <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                <span className="text-gray-500 dark:text-gray-400">
                  ID do Erro: {this.state.errorId}
                </span>
              </div>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}`
      },
      {
        name: 'hooks/useSentryUser.ts',
        content: `import { useEffect } from 'react'
import * as Sentry from '@sentry/nextjs'

interface User {
  id: string
  email?: string
  username?: string
  name?: string
  avatar?: string
  subscription?: string
  [key: string]: any
}

export function useSentryUser(user: User | null) {
  useEffect(() => {
    if (user) {
      // Definir contexto do usuário no Sentry
      Sentry.setUser({
        id: user.id,
        email: user.email,
        username: user.username || user.name,
        avatar: user.avatar,
        subscription: user.subscription
      })
      
      // Adicionar tags relacionadas ao usuário
      Sentry.setTags({
        user_type: user.subscription || 'free',
        user_authenticated: 'true'
      })
      
      // Adicionar breadcrumb de login
      Sentry.addBreadcrumb({
        message: 'User logged in',
        category: 'auth',
        level: 'info',
        data: {
          userId: user.id,
          userType: user.subscription || 'free'
        }
      })
    } else {
      // Limpar contexto do usuário
      Sentry.setUser(null)
      
      // Atualizar tags
      Sentry.setTags({
        user_authenticated: 'false'
      })
      
      // Adicionar breadcrumb de logout
      Sentry.addBreadcrumb({
        message: 'User logged out',
        category: 'auth',
        level: 'info'
      })
    }
  }, [user])
}

// Hook para rastrear ações do usuário
export function useSentryBreadcrumbs() {
  const addBreadcrumb = (message: string, category: string, data?: any) => {
    Sentry.addBreadcrumb({
      message,
      category,
      level: 'info',
      data,
      timestamp: Date.now() / 1000
    })
  }

  const trackPageView = (page: string) => {
    addBreadcrumb(\`Page view: \${page}\`, 'navigation', { page })
  }

  const trackUserAction = (action: string, target?: string, data?: any) => {
    addBreadcrumb(\`User action: \${action}\`, 'user', {
      action,
      target,
      ...data
    })
  }

  const trackAPICall = (url: string, method: string, status?: number) => {
    addBreadcrumb(\`API call: \${method} \${url}\`, 'http', {
      url,
      method,
      status
    })
  }

  return {
    addBreadcrumb,
    trackPageView,
    trackUserAction,
    trackAPICall
  }
}`
      }
    ]
  }
];

export default function SentryPage() {
  const [selectedConfig, setSelectedConfig] = useState(0);
  const [selectedFile, setSelectedFile] = useState(0);
  const [demoErrors, setDemoErrors] = useState<any[]>([]);
  const [isGeneratingError, setIsGeneratingError] = useState(false);

  // Demo error generation
  const generateDemoError = () => {
    setIsGeneratingError(true);
    
    const errorTypes = [
      {
        type: 'TypeError',
        message: 'Cannot read property \'map\' of undefined',
        stack: 'at Component.render (App.tsx:45:12)\nat ReactDOM.render (react-dom.js:123:45)',
        level: 'error',
        timestamp: new Date().toISOString()
      },
      {
        type: 'NetworkError',
        message: 'Failed to fetch data from API',
        stack: 'at fetch (api.ts:23:8)\nat async getData (hooks.ts:67:12)',
        level: 'warning',
        timestamp: new Date().toISOString()
      },
      {
        type: 'ValidationError',
        message: 'Email field is required',
        stack: 'at validateForm (form.ts:12:5)\nat onSubmit (ContactForm.tsx:89:23)',
        level: 'info',
        timestamp: new Date().toISOString()
      }
    ];
    
    const randomError = errorTypes[Math.floor(Math.random() * errorTypes.length)];
    
    setTimeout(() => {
      setDemoErrors(prev => [{
        id: Date.now(),
        ...randomError,
        count: Math.floor(Math.random() * 50) + 1,
        users: Math.floor(Math.random() * 20) + 1
      }, ...prev.slice(0, 4)]);
      setIsGeneratingError(false);
    }, 1000);
  };

  const clearDemoErrors = () => {
    setDemoErrors([]);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'error': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300';
      case 'warning': return 'text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-300';
      case 'info': return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl text-white mr-4">
              <Bug className="h-8 w-8" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
              Sentry Error Tracking
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Monitore, rastreie e corrija erros em tempo real. Sentry oferece 
            visibilidade completa sobre a saúde da sua aplicação.
          </p>
        </motion.div>

        {/* Features */}
        <DemoSection title="Recursos do Sentry" description="Funcionalidades principais para error tracking">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {sentryFeatures.map((feature, index) => {
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

        {/* Error Types */}
        <DemoSection title="Tipos de Erro" description="Diferentes categorias de erros que o Sentry pode capturar">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {errorTypes.map((errorType, index) => (
              <motion.div
                key={errorType.type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {errorType.type}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  {errorType.description}
                </p>
                <div className="space-y-2">
                  {errorType.examples.map((example) => (
                    <span
                      key={example}
                      className={`inline-block px-2 py-1 rounded text-xs font-medium ${errorType.color} mr-1 mb-1`}
                    >
                      {example}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </DemoSection>

        {/* Interactive Demo */}
        <DemoSection title="Demo Interativo" description="Simule captura de erros em tempo real">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Error Generator */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Bug className="h-5 w-5 mr-2 text-red-500" />
                  Gerador de Erros
                </h3>
                
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      Clique no botão abaixo para simular diferentes tipos de erros 
                      que seriam capturados pelo Sentry.
                    </p>
                    
                    <div className="flex space-x-3">
                      <button
                        onClick={generateDemoError}
                        disabled={isGeneratingError}
                        className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {isGeneratingError ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Gerando...
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Gerar Erro
                          </>
                        )}
                      </button>
                      
                      <button
                        onClick={clearDemoErrors}
                        className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Limpar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Error List */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-orange-500" />
                  Erros Capturados ({demoErrors.length})
                </h3>
                
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {demoErrors.length === 0 ? (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      <Bug className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>Nenhum erro capturado ainda</p>
                      <p className="text-sm">Gere alguns erros para ver como aparecem</p>
                    </div>
                  ) : (
                    demoErrors.map((error) => (
                      <div key={error.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border-l-4 border-red-500">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getLevelColor(error.level)}`}>
                              {error.level.toUpperCase()}
                            </span>
                            <span className="font-medium text-gray-900 dark:text-white">
                              {error.type}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(error.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                          {error.message}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                          <span>{error.count} ocorrências</span>
                          <span>{error.users} usuários afetados</span>
                        </div>
                        
                        <details className="mt-2">
                          <summary className="text-xs text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">
                            Ver Stack Trace
                          </summary>
                          <pre className="mt-2 text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-x-auto">
                            {error.stack}
                          </pre>
                        </details>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </DemoSection>

        {/* Configuration Examples */}
        <DemoSection title="Configuração" description="Como configurar Sentry no seu projeto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8 px-6 overflow-x-auto">
                {configurationExamples.map((config, index) => (
                  <button
                    key={config.name}
                    onClick={() => setSelectedConfig(index)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                      selectedConfig === index
                        ? 'border-red-500 text-red-600 dark:text-red-400'
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
                          ? 'border-red-500 text-red-600 dark:text-red-400'
                          : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                      }`}
                    >
                      {file.name}
                    </button>
                  ))}
                </nav>
              </div>
              
              <CodeBlock
                language="typescript"
                code={configurationExamples[selectedConfig].files[selectedFile].content}
              />
            </div>
          </div>
        </DemoSection>

        {/* Best Practices */}
        <DemoSection title="Melhores Práticas" description="Diretrizes para usar Sentry eficientemente">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Settings className="h-5 w-5 mr-2 text-blue-500" />
                  Configuração
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Configure filtros de erro adequados</li>
                  <li>• Use sampling para reduzir custos</li>
                  <li>• Defina environments corretamente</li>
                  <li>• Configure releases e deploys</li>
                  <li>• Use source maps para debugging</li>
                  <li>• Configure alertas inteligentes</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-green-500" />
                  Segurança
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Filtre dados sensíveis</li>
                  <li>• Use beforeSend para sanitização</li>
                  <li>• Configure data scrubbing</li>
                  <li>• Limite informações de usuário</li>
                  <li>• Use HTTPS sempre</li>
                  <li>• Gerencie permissões de equipe</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-purple-500" />
                  Otimização
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Monitore quota de eventos</li>
                  <li>• Use contexto relevante</li>
                  <li>• Implemente error boundaries</li>
                  <li>• Adicione breadcrumbs úteis</li>
                  <li>• Configure performance monitoring</li>
                  <li>• Analise trends de erro</li>
                </ul>
              </div>
            </div>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}