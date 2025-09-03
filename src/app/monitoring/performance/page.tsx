'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Clock, 
  Activity, 
  TrendingUp,
  Monitor,
  Smartphone,
  Wifi,
  Database,
  Server,
  Globe,
  Eye,
  Target,
  AlertTriangle,
  CheckCircle,
  Settings,
  BarChart3,
  LineChart,
  PieChart,
  RefreshCw,
  Download,
  ArrowUp,
  ArrowDown,
  Gauge
} from 'lucide-react';
import { DemoCard } from '@/components/DemoCard';
import { DemoCardStatic } from '@/components/DemoCardStatic';
import { DemoSection } from '@/components/DemoSection';
import { CodeBlock } from '@/components/CodeBlock';

const performanceFeatures = [
  {
    title: 'Core Web Vitals',
    description: 'Métricas essenciais de experiência do usuário',
    icon: Gauge,
    color: 'text-green-500',
    benefits: ['LCP', 'FID', 'CLS', 'User Experience']
  },
  {
    title: 'Real User Monitoring',
    description: 'Dados reais de performance dos usuários',
    icon: Eye,
    color: 'text-blue-500',
    benefits: ['Real Data', 'User Context', 'Geographic Insights', 'Device Analysis']
  },
  {
    title: 'Synthetic Monitoring',
    description: 'Testes automatizados de performance',
    icon: Activity,
    color: 'text-purple-500',
    benefits: ['Lighthouse', 'Automated Tests', 'CI/CD Integration', 'Trend Analysis']
  },
  {
    title: 'Resource Monitoring',
    description: 'Análise de recursos e otimizações',
    icon: Database,
    color: 'text-orange-500',
    benefits: ['Bundle Analysis', 'Image Optimization', 'Cache Performance', 'Network Usage']
  }
];

const coreWebVitals = [
  {
    name: 'Largest Contentful Paint (LCP)',
    description: 'Tempo para carregar o maior elemento visível',
    good: '≤ 2.5s',
    needsImprovement: '2.5s - 4.0s',
    poor: '> 4.0s',
    currentValue: 2.1,
    status: 'good',
    tips: [
      'Otimize imagens e vídeos',
      'Use CDN para recursos estáticos',
      'Implemente lazy loading',
      'Minimize CSS e JavaScript'
    ]
  },
  {
    name: 'First Input Delay (FID)',
    description: 'Tempo de resposta à primeira interação',
    good: '≤ 100ms',
    needsImprovement: '100ms - 300ms',
    poor: '> 300ms',
    currentValue: 85,
    status: 'good',
    tips: [
      'Reduza JavaScript desnecessário',
      'Use code splitting',
      'Otimize third-party scripts',
      'Implemente service workers'
    ]
  },
  {
    name: 'Cumulative Layout Shift (CLS)',
    description: 'Estabilidade visual da página',
    good: '≤ 0.1',
    needsImprovement: '0.1 - 0.25',
    poor: '> 0.25',
    currentValue: 0.08,
    status: 'good',
    tips: [
      'Defina dimensões para imagens',
      'Reserve espaço para ads',
      'Use font-display: swap',
      'Evite inserir conteúdo dinamicamente'
    ]
  }
];

const performanceMetrics = [
  {
    category: 'Loading',
    metrics: [
      { name: 'First Contentful Paint', value: '1.2s', target: '< 1.8s', status: 'good' },
      { name: 'Speed Index', value: '2.1s', target: '< 3.4s', status: 'good' },
      { name: 'Time to Interactive', value: '3.8s', target: '< 5.2s', status: 'good' },
      { name: 'Total Blocking Time', value: '180ms', target: '< 300ms', status: 'good' }
    ]
  },
  {
    category: 'Network',
    metrics: [
      { name: 'DNS Lookup', value: '45ms', target: '< 100ms', status: 'good' },
      { name: 'TCP Connection', value: '78ms', target: '< 150ms', status: 'good' },
      { name: 'SSL Handshake', value: '123ms', target: '< 200ms', status: 'good' },
      { name: 'TTFB', value: '234ms', target: '< 600ms', status: 'good' }
    ]
  },
  {
    category: 'Resources',
    metrics: [
      { name: 'Bundle Size', value: '245KB', target: '< 500KB', status: 'good' },
      { name: 'Image Size', value: '1.2MB', target: '< 2MB', status: 'good' },
      { name: 'Font Loading', value: '156ms', target: '< 300ms', status: 'good' },
      { name: 'Third-party Scripts', value: '89KB', target: '< 150KB', status: 'good' }
    ]
  }
];

const configurationExamples = [
  {
    name: 'Web Vitals Setup',
    description: 'Configuração de monitoramento de Web Vitals',
    files: [
      {
        name: 'lib/web-vitals.ts',
        content: `import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

// Tipos para métricas
interface Metric {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  delta: number
  id: string
  navigationType: string
}

// Função para enviar métricas para analytics
function sendToAnalytics(metric: Metric) {
  // Google Analytics 4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      custom_map: {
        metric_rating: metric.rating,
        metric_delta: metric.delta,
        navigation_type: metric.navigationType
      }
    })
  }

  // Vercel Analytics
  if (typeof window !== 'undefined' && window.va) {
    window.va('track', 'Web Vitals', {
      metric: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      id: metric.id,
      navigationType: metric.navigationType
    })
  }

  // Custom endpoint
  fetch('/api/web-vitals', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      metric: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      id: metric.id,
      navigationType: metric.navigationType,
      url: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: Date.now()
    })
  }).catch(console.error)
}

// Configurar coleta de métricas
export function initWebVitals() {
  // Core Web Vitals
  getCLS(sendToAnalytics)
  getFID(sendToAnalytics)
  getLCP(sendToAnalytics)
  
  // Outras métricas importantes
  getFCP(sendToAnalytics)
  getTTFB(sendToAnalytics)
}

// Hook para React
export function useWebVitals() {
  const [metrics, setMetrics] = React.useState<Record<string, Metric>>({})

  React.useEffect(() => {
    const handleMetric = (metric: Metric) => {
      setMetrics(prev => ({
        ...prev,
        [metric.name]: metric
      }))
      sendToAnalytics(metric)
    }

    getCLS(handleMetric)
    getFID(handleMetric)
    getLCP(handleMetric)
    getFCP(handleMetric)
    getTTFB(handleMetric)
  }, [])

  return metrics
}

// Função para obter rating baseado no valor
export function getMetricRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  switch (name) {
    case 'LCP':
      return value <= 2500 ? 'good' : value <= 4000 ? 'needs-improvement' : 'poor'
    case 'FID':
      return value <= 100 ? 'good' : value <= 300 ? 'needs-improvement' : 'poor'
    case 'CLS':
      return value <= 0.1 ? 'good' : value <= 0.25 ? 'needs-improvement' : 'poor'
    case 'FCP':
      return value <= 1800 ? 'good' : value <= 3000 ? 'needs-improvement' : 'poor'
    case 'TTFB':
      return value <= 800 ? 'good' : value <= 1800 ? 'needs-improvement' : 'poor'
    default:
      return 'good'
  }
}

// Função para formatar valores
export function formatMetricValue(name: string, value: number): string {
  switch (name) {
    case 'CLS':
      return value.toFixed(3)
    case 'LCP':
    case 'FID':
    case 'FCP':
    case 'TTFB':
      return value >= 1000 ? \`\${(value / 1000).toFixed(2)}s\` : \`\${Math.round(value)}ms\`
    default:
      return value.toString()
  }
}`
      },
      {
        name: 'api/web-vitals/route.ts',
        content: `import { NextRequest, NextResponse } from 'next/server'

interface WebVitalData {
  metric: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  delta: number
  id: string
  navigationType: string
  url: string
  userAgent: string
  timestamp: number
}

// Armazenar métricas (em produção, use um banco de dados)
const metricsStore: WebVitalData[] = []

export async function POST(request: NextRequest) {
  try {
    const data: WebVitalData = await request.json()
    
    // Validar dados
    if (!data.metric || typeof data.value !== 'number') {
      return NextResponse.json(
        { error: 'Invalid metric data' },
        { status: 400 }
      )
    }

    // Adicionar informações extras
    const enrichedData = {
      ...data,
      ip: request.ip || 'unknown',
      country: request.geo?.country || 'unknown',
      city: request.geo?.city || 'unknown',
      receivedAt: new Date().toISOString()
    }

    // Armazenar métrica
    metricsStore.push(enrichedData)
    
    // Manter apenas os últimos 1000 registros
    if (metricsStore.length > 1000) {
      metricsStore.splice(0, metricsStore.length - 1000)
    }

    // Log para debugging
    console.log('Web Vital received:', {
      metric: data.metric,
      value: data.value,
      rating: data.rating,
      url: data.url
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error processing web vital:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const metric = searchParams.get('metric')
    const limit = parseInt(searchParams.get('limit') || '100')
    
    let filteredMetrics = metricsStore
    
    // Filtrar por métrica específica
    if (metric) {
      filteredMetrics = metricsStore.filter(m => m.metric === metric)
    }
    
    // Limitar resultados
    const limitedMetrics = filteredMetrics
      .slice(-limit)
      .sort((a, b) => b.timestamp - a.timestamp)

    // Calcular estatísticas
    const stats = {
      total: filteredMetrics.length,
      good: filteredMetrics.filter(m => m.rating === 'good').length,
      needsImprovement: filteredMetrics.filter(m => m.rating === 'needs-improvement').length,
      poor: filteredMetrics.filter(m => m.rating === 'poor').length,
      averageValue: filteredMetrics.reduce((sum, m) => sum + m.value, 0) / filteredMetrics.length || 0
    }

    return NextResponse.json({
      metrics: limitedMetrics,
      stats
    })
  } catch (error) {
    console.error('Error fetching web vitals:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}`
      },
      {
        name: 'components/WebVitalsReporter.tsx',
        content: `'use client'

import { useEffect } from 'react'
import { useWebVitals } from '@/lib/web-vitals'

export function WebVitalsReporter() {
  const metrics = useWebVitals()

  useEffect(() => {
    // Inicializar coleta de métricas
    import('@/lib/web-vitals').then(({ initWebVitals }) => {
      initWebVitals()
    })
  }, [])

  // Componente não renderiza nada, apenas coleta métricas
  return null
}

// Componente para exibir métricas em desenvolvimento
export function WebVitalsDisplay() {
  const metrics = useWebVitals()

  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black bg-opacity-80 text-white p-4 rounded-lg text-xs font-mono z-50">
      <div className="font-bold mb-2">Web Vitals</div>
      {Object.entries(metrics).map(([name, metric]) => (
        <div key={name} className="flex justify-between space-x-4">
          <span>{name}:</span>
          <span className={\`\${
            metric.rating === 'good' ? 'text-green-400' :
            metric.rating === 'needs-improvement' ? 'text-yellow-400' :
            'text-red-400'
          }\`}>
            {formatMetricValue(name, metric.value)}
          </span>
        </div>
      ))}
    </div>
  )
}

function formatMetricValue(name: string, value: number): string {
  switch (name) {
    case 'CLS':
      return value.toFixed(3)
    case 'LCP':
    case 'FID':
    case 'FCP':
    case 'TTFB':
      return value >= 1000 ? \`\${(value / 1000).toFixed(2)}s\` : \`\${Math.round(value)}ms\`
    default:
      return value.toString()
  }
}`
      }
    ]
  },
  {
    name: 'Performance Monitoring',
    description: 'Monitoramento avançado de performance',
    files: [
      {
        name: 'lib/performance-monitor.ts',
        content: `// Performance Observer para monitoramento avançado
class PerformanceMonitor {
  private observers: PerformanceObserver[] = []
  private metrics: Map<string, any[]> = new Map()

  constructor() {
    this.initObservers()
  }

  private initObservers() {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
      return
    }

    // Observer para Navigation Timing
    this.createObserver('navigation', (entries) => {
      entries.forEach(entry => {
        this.recordMetric('navigation', {
          type: entry.entryType,
          name: entry.name,
          duration: entry.duration,
          startTime: entry.startTime,
          domContentLoaded: (entry as PerformanceNavigationTiming).domContentLoadedEventEnd,
          loadComplete: (entry as PerformanceNavigationTiming).loadEventEnd
        })
      })
    })

    // Observer para Resource Timing
    this.createObserver('resource', (entries) => {
      entries.forEach(entry => {
        const resource = entry as PerformanceResourceTiming
        this.recordMetric('resource', {
          name: resource.name,
          duration: resource.duration,
          size: resource.transferSize,
          type: this.getResourceType(resource.name),
          cached: resource.transferSize === 0 && resource.decodedBodySize > 0
        })
      })
    })

    // Observer para Paint Timing
    this.createObserver('paint', (entries) => {
      entries.forEach(entry => {
        this.recordMetric('paint', {
          name: entry.name,
          startTime: entry.startTime
        })
      })
    })

    // Observer para Long Tasks
    this.createObserver('longtask', (entries) => {
      entries.forEach(entry => {
        this.recordMetric('longtask', {
          duration: entry.duration,
          startTime: entry.startTime,
          attribution: (entry as any).attribution
        })
      })
    })

    // Observer para Layout Shift
    this.createObserver('layout-shift', (entries) => {
      entries.forEach(entry => {
        if (!(entry as any).hadRecentInput) {
          this.recordMetric('layout-shift', {
            value: (entry as any).value,
            startTime: entry.startTime,
            sources: (entry as any).sources
          })
        }
      })
    })
  }

  private createObserver(type: string, callback: (entries: PerformanceEntry[]) => void) {
    try {
      const observer = new PerformanceObserver((list) => {
        callback(list.getEntries())
      })
      
      observer.observe({ entryTypes: [type] })
      this.observers.push(observer)
    } catch (error) {
      console.warn(\`Failed to create observer for \${type}:\`, error)
    }
  }

  private recordMetric(category: string, data: any) {
    if (!this.metrics.has(category)) {
      this.metrics.set(category, [])
    }
    
    const metrics = this.metrics.get(category)!
    metrics.push({
      ...data,
      timestamp: Date.now()
    })
    
    // Manter apenas os últimos 100 registros por categoria
    if (metrics.length > 100) {
      metrics.splice(0, metrics.length - 100)
    }
  }

  private getResourceType(url: string): string {
    if (url.includes('.js')) return 'script'
    if (url.includes('.css')) return 'stylesheet'
    if (url.match(/\.(jpg|jpeg|png|gif|webp|svg)$/)) return 'image'
    if (url.match(/\.(woff|woff2|ttf|otf)$/)) return 'font'
    if (url.includes('/api/')) return 'api'
    return 'other'
  }

  // Métodos públicos para acessar métricas
  getMetrics(category?: string) {
    if (category) {
      return this.metrics.get(category) || []
    }
    return Object.fromEntries(this.metrics)
  }

  getResourceMetrics() {
    const resources = this.getMetrics('resource')
    const byType = resources.reduce((acc, resource) => {
      const type = resource.type
      if (!acc[type]) acc[type] = []
      acc[type].push(resource)
      return acc
    }, {} as Record<string, any[]>)

    return {
      total: resources.length,
      totalSize: resources.reduce((sum, r) => sum + (r.size || 0), 0),
      byType,
      slowest: resources.sort((a, b) => b.duration - a.duration).slice(0, 10)
    }
  }

  getLongTasks() {
    return this.getMetrics('longtask')
      .filter(task => task.duration > 50) // Tarefas > 50ms
      .sort((a, b) => b.duration - a.duration)
  }

  getLayoutShifts() {
    const shifts = this.getMetrics('layout-shift')
    const totalCLS = shifts.reduce((sum, shift) => sum + shift.value, 0)
    
    return {
      total: shifts.length,
      totalCLS,
      shifts: shifts.sort((a, b) => b.value - a.value)
    }
  }

  // Gerar relatório de performance
  generateReport() {
    return {
      timestamp: Date.now(),
      navigation: this.getMetrics('navigation')[0],
      paint: this.getMetrics('paint'),
      resources: this.getResourceMetrics(),
      longTasks: this.getLongTasks(),
      layoutShifts: this.getLayoutShifts(),
      memory: (performance as any).memory ? {
        used: (performance as any).memory.usedJSHeapSize,
        total: (performance as any).memory.totalJSHeapSize,
        limit: (performance as any).memory.jsHeapSizeLimit
      } : null
    }
  }

  // Limpar observers
  disconnect() {
    this.observers.forEach(observer => observer.disconnect())
    this.observers = []
    this.metrics.clear()
  }
}

// Instância global
let performanceMonitor: PerformanceMonitor | null = null

export function getPerformanceMonitor(): PerformanceMonitor {
  if (!performanceMonitor) {
    performanceMonitor = new PerformanceMonitor()
  }
  return performanceMonitor
}

// Hook para React
export function usePerformanceMonitor() {
  const [report, setReport] = React.useState<any>(null)
  
  React.useEffect(() => {
    const monitor = getPerformanceMonitor()
    
    // Gerar relatório inicial
    setReport(monitor.generateReport())
    
    // Atualizar relatório periodicamente
    const interval = setInterval(() => {
      setReport(monitor.generateReport())
    }, 5000)
    
    return () => {
      clearInterval(interval)
    }
  }, [])
  
  return report
}`
      },
      {
        name: 'hooks/usePerformanceMetrics.ts',
        content: `import { useState, useEffect } from 'react'

interface PerformanceMetrics {
  // Core Web Vitals
  lcp?: number
  fid?: number
  cls?: number
  fcp?: number
  ttfb?: number
  
  // Navigation Timing
  domContentLoaded?: number
  loadComplete?: number
  
  // Resource Timing
  resourceCount?: number
  totalResourceSize?: number
  
  // Memory (se disponível)
  memoryUsed?: number
  memoryTotal?: number
}

export function usePerformanceMetrics() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const collectMetrics = () => {
      const newMetrics: PerformanceMetrics = {}

      // Navigation Timing
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      if (navigation) {
        newMetrics.domContentLoaded = navigation.domContentLoadedEventEnd - navigation.navigationStart
        newMetrics.loadComplete = navigation.loadEventEnd - navigation.navigationStart
        newMetrics.ttfb = navigation.responseStart - navigation.navigationStart
      }

      // Paint Timing
      const paintEntries = performance.getEntriesByType('paint')
      const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint')
      if (fcp) {
        newMetrics.fcp = fcp.startTime
      }

      // Resource Timing
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[]
      newMetrics.resourceCount = resources.length
      newMetrics.totalResourceSize = resources.reduce((total, resource) => {
        return total + (resource.transferSize || 0)
      }, 0)

      // Memory (Chrome only)
      if ('memory' in performance) {
        const memory = (performance as any).memory
        newMetrics.memoryUsed = memory.usedJSHeapSize
        newMetrics.memoryTotal = memory.totalJSHeapSize
      }

      setMetrics(newMetrics)
      setLoading(false)
    }

    // Coletar métricas após o carregamento
    if (document.readyState === 'complete') {
      collectMetrics()
    } else {
      window.addEventListener('load', collectMetrics)
    }

    // Coletar Web Vitals
    import('web-vitals').then(({ getCLS, getFID, getLCP }) => {
      getCLS((metric) => {
        setMetrics(prev => ({ ...prev, cls: metric.value }))
      })
      
      getFID((metric) => {
        setMetrics(prev => ({ ...prev, fid: metric.value }))
      })
      
      getLCP((metric) => {
        setMetrics(prev => ({ ...prev, lcp: metric.value }))
      })
    }).catch(() => {
      // Web Vitals não disponível
    })

    return () => {
      window.removeEventListener('load', collectMetrics)
    }
  }, [])

  const formatMetric = (value: number | undefined, unit: string = 'ms'): string => {
    if (value === undefined) return 'N/A'
    
    if (unit === 'ms' && value >= 1000) {
      return \`\${(value / 1000).toFixed(2)}s\`
    }
    
    if (unit === 'bytes') {
      if (value >= 1024 * 1024) {
        return \`\${(value / (1024 * 1024)).toFixed(2)}MB\`
      } else if (value >= 1024) {
        return \`\${(value / 1024).toFixed(2)}KB\`
      }
      return \`\${value}B\`
    }
    
    return \`\${Math.round(value)}\${unit}\`
  }

  const getMetricStatus = (metric: string, value: number | undefined): 'good' | 'needs-improvement' | 'poor' => {
    if (value === undefined) return 'good'
    
    switch (metric) {
      case 'lcp':
        return value <= 2500 ? 'good' : value <= 4000 ? 'needs-improvement' : 'poor'
      case 'fid':
        return value <= 100 ? 'good' : value <= 300 ? 'needs-improvement' : 'poor'
      case 'cls':
        return value <= 0.1 ? 'good' : value <= 0.25 ? 'needs-improvement' : 'poor'
      case 'fcp':
        return value <= 1800 ? 'good' : value <= 3000 ? 'needs-improvement' : 'poor'
      case 'ttfb':
        return value <= 800 ? 'good' : value <= 1800 ? 'needs-improvement' : 'poor'
      default:
        return 'good'
    }
  }

  return {
    metrics,
    loading,
    formatMetric,
    getMetricStatus
  }
}`
      }
    ]
  }
];

export default function PerformancePage() {
  const [selectedConfig, setSelectedConfig] = useState(0);
  const [selectedFile, setSelectedFile] = useState(0);
  const [selectedMetricCategory, setSelectedMetricCategory] = useState(0);
  const [selectedVital, setSelectedVital] = useState(0);

  // Simular dados de performance em tempo real
  const [performanceData, setPerformanceData] = useState({
    score: 92,
    lcp: 2.1,
    fid: 85,
    cls: 0.08,
    fcp: 1.2,
    ttfb: 234
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setPerformanceData(prev => ({
        score: Math.max(85, Math.min(100, prev.score + (Math.random() - 0.5) * 2)),
        lcp: Math.max(1.5, Math.min(3.0, prev.lcp + (Math.random() - 0.5) * 0.2)),
        fid: Math.max(50, Math.min(150, prev.fid + (Math.random() - 0.5) * 10)),
        cls: Math.max(0.05, Math.min(0.15, prev.cls + (Math.random() - 0.5) * 0.02)),
        fcp: Math.max(0.8, Math.min(2.0, prev.fcp + (Math.random() - 0.5) * 0.1)),
        ttfb: Math.max(150, Math.min(400, prev.ttfb + (Math.random() - 0.5) * 20))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
      case 'needs-improvement': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300';
      case 'poor': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-yellow-50 to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl text-white mr-4">
              <Zap className="h-8 w-8" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
              Performance Monitoring
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Monitore Core Web Vitals, analise performance e otimize a experiência 
            do usuário com métricas detalhadas e insights acionáveis.
          </p>
        </motion.div>

        {/* Features */}
        <DemoSection title="Recursos de Monitoramento" description="Ferramentas para análise de performance">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {performanceFeatures.map((feature, index) => {
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

        {/* Performance Score */}
        <DemoSection title="Performance Score" description="Pontuação geral de performance">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="relative inline-flex items-center justify-center">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-gray-200 dark:text-gray-700"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 56}`}
                    strokeDashoffset={`${2 * Math.PI * 56 * (1 - performanceData.score / 100)}`}
                    className={`transition-all duration-1000 ${
                      performanceData.score >= 90 ? 'text-green-500' :
                      performanceData.score >= 70 ? 'text-yellow-500' :
                      'text-red-500'
                    }`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    {Math.round(performanceData.score)}
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-4">
                Performance Score
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Baseado em Core Web Vitals e outras métricas
              </p>
            </div>

            {/* Live Metrics */}
            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {performanceData.lcp.toFixed(1)}s
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">LCP</div>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {Math.round(performanceData.fid)}ms
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">FID</div>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {performanceData.cls.toFixed(3)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">CLS</div>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {performanceData.fcp.toFixed(1)}s
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">FCP</div>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {Math.round(performanceData.ttfb)}ms
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">TTFB</div>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full mx-auto mb-1 animate-pulse"></div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Live</div>
              </div>
            </div>
          </div>
        </DemoSection>

        {/* Core Web Vitals */}
        <DemoSection title="Core Web Vitals" description="Métricas essenciais de experiência do usuário">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8 px-6 overflow-x-auto">
                {coreWebVitals.map((vital, index) => (
                  <button
                    key={vital.name}
                    onClick={() => setSelectedVital(index)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                      selectedVital === index
                        ? 'border-yellow-500 text-yellow-600 dark:text-yellow-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    {vital.name.split(' ')[0]}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="p-6">
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {coreWebVitals[selectedVital].name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {coreWebVitals[selectedVital].description}
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <span className="text-green-700 dark:text-green-300 font-medium">Bom</span>
                      <span className="text-green-600 dark:text-green-400 font-mono">
                        {coreWebVitals[selectedVital].good}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <span className="text-yellow-700 dark:text-yellow-300 font-medium">Precisa Melhorar</span>
                      <span className="text-yellow-600 dark:text-yellow-400 font-mono">
                        {coreWebVitals[selectedVital].needsImprovement}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <span className="text-red-700 dark:text-red-300 font-medium">Ruim</span>
                      <span className="text-red-600 dark:text-red-400 font-mono">
                        {coreWebVitals[selectedVital].poor}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-blue-900 dark:text-blue-300">Valor Atual</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(coreWebVitals[selectedVital].status)}`}>
                        {coreWebVitals[selectedVital].status === 'good' ? 'BOM' : 
                         coreWebVitals[selectedVital].status === 'needs-improvement' ? 'MELHORAR' : 'RUIM'}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                      {coreWebVitals[selectedVital].name.includes('CLS') 
                        ? coreWebVitals[selectedVital].currentValue.toFixed(3)
                        : coreWebVitals[selectedVital].name.includes('FID')
                        ? `${coreWebVitals[selectedVital].currentValue}ms`
                        : `${coreWebVitals[selectedVital].currentValue}s`
                      }
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Dicas de Otimização
                  </h4>
                  <div className="space-y-3">
                    {coreWebVitals[selectedVital].tips.map((tip, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DemoSection>

        {/* Performance Metrics */}
        <DemoSection title="Métricas Detalhadas" description="Análise completa de performance">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8 px-6 overflow-x-auto">
                {performanceMetrics.map((category, index) => (
                  <button
                    key={category.category}
                    onClick={() => setSelectedMetricCategory(index)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                      selectedMetricCategory === index
                        ? 'border-orange-500 text-orange-600 dark:text-orange-400'
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
                {performanceMetrics[selectedMetricCategory].metrics.map((metric) => (
                  <div key={metric.name} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {metric.name}
                      </h3>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(metric.status)}`}>
                        {metric.status === 'good' ? 'BOM' : 'MELHORAR'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        {metric.value}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Target: {metric.target}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DemoSection>

        {/* Configuration Examples */}
        <DemoSection title="Implementação" description="Como implementar monitoramento de performance">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8 px-6 overflow-x-auto">
                {configurationExamples.map((config, index) => (
                  <button
                    key={config.name}
                    onClick={() => setSelectedConfig(index)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                      selectedConfig === index
                        ? 'border-yellow-500 text-yellow-600 dark:text-yellow-400'
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
                          ? 'border-yellow-500 text-yellow-600 dark:text-yellow-400'
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
        <DemoSection title="Melhores Práticas" description="Diretrizes para otimização de performance">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-yellow-500" />
                  Otimização
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Otimize imagens e vídeos</li>
                  <li>• Use lazy loading</li>
                  <li>• Implemente code splitting</li>
                  <li>• Minimize CSS e JavaScript</li>
                  <li>• Use CDN para assets</li>
                  <li>• Configure cache adequadamente</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Eye className="h-5 w-5 mr-2 text-blue-500" />
                  Monitoramento
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Monitore Core Web Vitals</li>
                  <li>• Use Real User Monitoring</li>
                  <li>• Implemente synthetic testing</li>
                  <li>• Configure alertas</li>
                  <li>• Analise trends</li>
                  <li>• Monitore diferentes dispositivos</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Target className="h-5 w-5 mr-2 text-green-500" />
                  Estratégia
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Defina budgets de performance</li>
                  <li>• Integre com CI/CD</li>
                  <li>• Teste em dispositivos reais</li>
                  <li>• Priorize métricas críticas</li>
                  <li>• Eduque a equipe</li>
                  <li>• Meça impacto no negócio</li>
                </ul>
              </div>
            </div>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}