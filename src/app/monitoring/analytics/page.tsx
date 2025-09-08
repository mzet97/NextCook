'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye,
  Clock,
  MousePointer,
  Smartphone,
  Monitor,
  Globe,
  Target,
  Activity,
  PieChart,
  LineChart,
  Settings,
  Filter,
  Calendar,
  Download,
  Share,
  RefreshCw,
  CheckCircle,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { DemoCard } from '@/components/DemoCard';
import { DemoCardStatic } from '@/components/DemoCardStatic';
import { DemoSection } from '@/components/DemoSection';
import { CodeBlock } from '@/components/CodeBlock';

const analyticsFeatures = [
  {
    title: 'Google Analytics 4',
    description: 'Analytics completo com machine learning',
    icon: BarChart3,
    color: 'text-blue-500',
    benefits: ['Event-based Tracking', 'Cross-platform', 'Predictive Insights', 'Custom Reports']
  },
  {
    title: 'Vercel Analytics',
    description: 'Analytics otimizado para Next.js',
    icon: TrendingUp,
    color: 'text-green-500',
    benefits: ['Real Web Vitals', 'Zero Config', 'Privacy-focused', 'Fast Performance']
  },
  {
    title: 'Custom Events',
    description: 'Rastreamento de eventos personalizados',
    icon: Target,
    color: 'text-purple-500',
    benefits: ['Business Goals', 'User Actions', 'Conversion Tracking', 'Funnel Analysis']
  },
  {
    title: 'Real-time Data',
    description: 'Dados em tempo real e dashboards',
    icon: Activity,
    color: 'text-orange-500',
    benefits: ['Live Monitoring', 'Instant Insights', 'Alert Systems', 'Performance Tracking']
  }
];

const analyticsMetrics = [
  {
    category: 'Audience',
    metrics: [
      { name: 'Total Users', value: '12,543', change: '+12.5%', trend: 'up' },
      { name: 'New Users', value: '8,234', change: '+8.2%', trend: 'up' },
      { name: 'Returning Users', value: '4,309', change: '+18.7%', trend: 'up' },
      { name: 'Sessions', value: '18,765', change: '+15.3%', trend: 'up' }
    ]
  },
  {
    category: 'Behavior',
    metrics: [
      { name: 'Page Views', value: '45,678', change: '+9.8%', trend: 'up' },
      { name: 'Avg. Session Duration', value: '3m 24s', change: '+5.2%', trend: 'up' },
      { name: 'Bounce Rate', value: '42.3%', change: '-3.1%', trend: 'down' },
      { name: 'Pages per Session', value: '2.8', change: '+7.4%', trend: 'up' }
    ]
  },
  {
    category: 'Acquisition',
    metrics: [
      { name: 'Organic Search', value: '8,456', change: '+14.2%', trend: 'up' },
      { name: 'Direct Traffic', value: '5,234', change: '+6.8%', trend: 'up' },
      { name: 'Social Media', value: '2,876', change: '+22.1%', trend: 'up' },
      { name: 'Referral', value: '1,543', change: '-2.3%', trend: 'down' }
    ]
  },
  {
    category: 'Conversion',
    metrics: [
      { name: 'Goal Completions', value: '1,234', change: '+18.9%', trend: 'up' },
      { name: 'Conversion Rate', value: '6.58%', change: '+1.2%', trend: 'up' },
      { name: 'Revenue', value: '$12,456', change: '+25.3%', trend: 'up' },
      { name: 'AOV', value: '$89.34', change: '+4.7%', trend: 'up' }
    ]
  }
];

const deviceData = [
  { device: 'Desktop', users: 7234, percentage: 57.6, color: 'bg-blue-500' },
  { device: 'Mobile', users: 4123, percentage: 32.8, color: 'bg-green-500' },
  { device: 'Tablet', users: 1186, percentage: 9.6, color: 'bg-purple-500' }
];

const topPages = [
  { page: '/', views: 12543, bounce: '38.2%', duration: '4m 12s' },
  { page: '/products', views: 8765, bounce: '42.1%', duration: '3m 45s' },
  { page: '/about', views: 5432, bounce: '35.8%', duration: '2m 18s' },
  { page: '/contact', views: 3210, bounce: '28.9%', duration: '1m 56s' },
  { page: '/blog', views: 2876, bounce: '45.3%', duration: '5m 23s' }
];

const configurationExamples = [
  {
    name: 'Google Analytics 4',
    description: 'Configuração do GA4 para Next.js',
    files: [
      {
        name: 'lib/gtag.ts',
        content: `// Google Analytics configuration
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && GA_TRACKING_ID) {
    window.gtag('config', GA_TRACKING_ID, {
      page_location: url,
    })
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({
  action,
  category,
  label,
  value,
  custom_parameters = {}
}: {
  action: string
  category: string
  label?: string
  value?: number
  custom_parameters?: Record<string, any>
}) => {
  if (typeof window !== 'undefined' && GA_TRACKING_ID) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      ...custom_parameters
    })
  }
}

// Enhanced ecommerce events
export const purchase = ({
  transaction_id,
  value,
  currency = 'USD',
  items
}: {
  transaction_id: string
  value: number
  currency?: string
  items: Record<string, unknown>[]
}) => {
  if (typeof window !== 'undefined' && GA_TRACKING_ID) {
    window.gtag('event', 'purchase', {
      transaction_id,
      value,
      currency,
      items
    })
  }
}

export const addToCart = ({
  currency = 'USD',
  value,
  items
}: {
  currency?: string
  value: number
  items: Record<string, unknown>[]
}) => {
  if (typeof window !== 'undefined' && GA_TRACKING_ID) {
    window.gtag('event', 'add_to_cart', {
      currency,
      value,
      items
    })
  }
}

export const viewItem = ({
  currency = 'USD',
  value,
  items
}: {
  currency?: string
  value: number
  items: Record<string, unknown>[]
}) => {
  if (typeof window !== 'undefined' && GA_TRACKING_ID) {
    window.gtag('event', 'view_item', {
      currency,
      value,
      items
    })
  }
}

// Custom events
export const login = (method: string) => {
  event({
    action: 'login',
    category: 'engagement',
    label: method
  })
}

export const signup = (method: string) => {
  event({
    action: 'sign_up',
    category: 'engagement',
    label: method
  })
}

export const share = (content_type: string, item_id: string) => {
  event({
    action: 'share',
    category: 'engagement',
    custom_parameters: {
      content_type,
      item_id
    }
  })
}

export const search = (search_term: string) => {
  event({
    action: 'search',
    category: 'engagement',
    label: search_term
  })
}

// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, any>
    ) => void
  }
}`
      },
      {
        name: 'components/GoogleAnalytics.tsx',
        content: `'use client'

import Script from 'next/script'
import { GA_TRACKING_ID } from '@/lib/gtag'

export function GoogleAnalytics() {
  if (!GA_TRACKING_ID) {
    return null
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={\`https://www.googletagmanager.com/gtag/js?id=\${GA_TRACKING_ID}\`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: \`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '\${GA_TRACKING_ID}', {
              page_location: window.location.href,
              page_title: document.title,
              // Privacy settings
              anonymize_ip: true,
              allow_google_signals: false,
              allow_ad_personalization_signals: false
            });
          \`
        }}
      />
    </>
  )
}

// Hook para rastrear page views
export function usePageTracking() {
  const trackPageView = (url: string, title?: string) => {
    if (typeof window !== 'undefined' && GA_TRACKING_ID) {
      window.gtag('config', GA_TRACKING_ID, {
        page_location: url,
        page_title: title || document.title
      })
    }
  }

  return { trackPageView }
}`
      },
      {
        name: 'hooks/useAnalytics.ts',
        content: `import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import * as gtag from '@/lib/gtag'

// Hook principal para analytics
export function useAnalytics() {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url)
    }

    // Rastrear mudanças de rota
    // Note: Next.js 13+ app router não tem eventos de rota
    // Você pode usar um provider de contexto para rastrear navegação
    
    return () => {
      // Cleanup se necessário
    }
  }, [router])

  // Funções de rastreamento
  const trackEvent = ({
    action,
    category,
    label,
    value,
    custom_parameters
  }: {
    action: string
    category: string
    label?: string
    value?: number
    custom_parameters?: Record<string, any>
  }) => {
    gtag.event({ action, category, label, value, custom_parameters })
  }

  const trackPurchase = (data: {
    transaction_id: string
    value: number
    currency?: string
    items: Record<string, unknown>[]
  }) => {
    gtag.purchase(data)
  }

  const trackAddToCart = (data: {
    currency?: string
    value: number
    items: any[]
  }) => {
    gtag.addToCart(data)
  }

  const trackViewItem = (data: {
    currency?: string
    value: number
    items: any[]
  }) => {
    gtag.viewItem(data)
  }

  const trackLogin = (method: string) => {
    gtag.login(method)
  }

  const trackSignup = (method: string) => {
    gtag.signup(method)
  }

  const trackShare = (content_type: string, item_id: string) => {
    gtag.share(content_type, item_id)
  }

  const trackSearch = (search_term: string) => {
    gtag.search(search_term)
  }

  // Rastreamento de interações específicas
  const trackButtonClick = (button_name: string, location?: string) => {
    trackEvent({
      action: 'click',
      category: 'button',
      label: button_name,
      custom_parameters: { location }
    })
  }

  const trackFormSubmit = (form_name: string, success: boolean) => {
    trackEvent({
      action: success ? 'submit_success' : 'submit_error',
      category: 'form',
      label: form_name
    })
  }

  const trackDownload = (file_name: string, file_type: string) => {
    trackEvent({
      action: 'download',
      category: 'file',
      label: file_name,
      custom_parameters: { file_type }
    })
  }

  const trackVideoPlay = (video_title: string, video_duration?: number) => {
    trackEvent({
      action: 'play',
      category: 'video',
      label: video_title,
      value: video_duration
    })
  }

  const trackScroll = (scroll_depth: number) => {
    trackEvent({
      action: 'scroll',
      category: 'engagement',
      value: scroll_depth
    })
  }

  return {
    trackEvent,
    trackPurchase,
    trackAddToCart,
    trackViewItem,
    trackLogin,
    trackSignup,
    trackShare,
    trackSearch,
    trackButtonClick,
    trackFormSubmit,
    trackDownload,
    trackVideoPlay,
    trackScroll
  }
}`
      }
    ]
  },
  {
    name: 'Vercel Analytics',
    description: 'Configuração do Vercel Analytics',
    files: [
      {
        name: 'app/layout.tsx',
        content: `import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        {/* Vercel Analytics */}
        <Analytics />
        {/* Vercel Speed Insights */}
        <SpeedInsights />
      </body>
    </html>
  )
}`
      },
      {
        name: 'hooks/useVercelAnalytics.ts',
        content: `import { track } from '@vercel/analytics'

// Hook para Vercel Analytics
export function useVercelAnalytics() {
  // Rastrear eventos customizados
  const trackEvent = (name: string, properties?: Record<string, any>) => {
    track(name, properties)
  }

  // Eventos específicos
  const trackPageView = (page: string) => {
    track('page_view', { page })
  }

  const trackButtonClick = (button: string, location?: string) => {
    track('button_click', { button, location })
  }

  const trackFormSubmission = (form: string, success: boolean) => {
    track('form_submission', { form, success })
  }

  const trackPurchase = (value: number, currency: string, items: Record<string, unknown>[]) => {
    track('purchase', {
      value,
      currency,
      items: items.length,
      item_names: items.map(item => item.name).join(', ')
    })
  }

  const trackSignup = (method: string) => {
    track('signup', { method })
  }

  const trackLogin = (method: string) => {
    track('login', { method })
  }

  const trackSearch = (query: string, results: number) => {
    track('search', { query, results })
  }

  const trackDownload = (file: string, type: string) => {
    track('download', { file, type })
  }

  const trackShare = (content: string, platform: string) => {
    track('share', { content, platform })
  }

  const trackVideoPlay = (video: string, duration?: number) => {
    track('video_play', { video, duration })
  }

  const trackError = (error: string, page: string) => {
    track('error', { error, page })
  }

  const trackPerformance = (metric: string, value: number) => {
    track('performance', { metric, value })
  }

  return {
    trackEvent,
    trackPageView,
    trackButtonClick,
    trackFormSubmission,
    trackPurchase,
    trackSignup,
    trackLogin,
    trackSearch,
    trackDownload,
    trackShare,
    trackVideoPlay,
    trackError,
    trackPerformance
  }
}`
      },
      {
        name: 'components/AnalyticsProvider.tsx',
        content: `'use client'

import { createContext, useContext, useEffect, ReactNode } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useAnalytics } from '@/hooks/useAnalytics'
import { useVercelAnalytics } from '@/hooks/useVercelAnalytics'

interface AnalyticsContextType {
  ga: ReturnType<typeof useAnalytics>
  vercel: ReturnType<typeof useVercelAnalytics>
}

const AnalyticsContext = createContext<AnalyticsContextType | null>(null)

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const ga = useAnalytics()
  const vercel = useVercelAnalytics()

  useEffect(() => {
    // Rastrear page views automaticamente
    const url = pathname + searchParams.toString()
    
    // Google Analytics
    if (typeof window !== 'undefined') {
      window.gtag?.('config', process.env.NEXT_PUBLIC_GA_ID!, {
        page_location: window.location.href,
        page_title: document.title
      })
    }
    
    // Vercel Analytics
    vercel.trackPageView(pathname)
  }, [pathname, searchParams, vercel])

  const value = {
    ga,
    vercel
  }

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  )
}

export function useAnalyticsContext() {
  const context = useContext(AnalyticsContext)
  if (!context) {
    throw new Error('useAnalyticsContext must be used within AnalyticsProvider')
  }
  return context
}

// Hook combinado para facilitar o uso
export function useTracking() {
  const { ga, vercel } = useAnalyticsContext()

  const trackEvent = (name: string, data?: Record<string, any>) => {
    // Rastrear em ambas as plataformas
    ga.trackEvent({
      action: name,
      category: data?.category || 'general',
      label: data?.label,
      value: data?.value,
      custom_parameters: data
    })
    
    vercel.trackEvent(name, data)
  }

  const trackPurchase = (data: {
    transaction_id: string
    value: number
    currency?: string
    items: any[]
  }) => {
    ga.trackPurchase(data)
    vercel.trackPurchase(data.value, data.currency || 'USD', data.items)
  }

  const trackButtonClick = (button: string, location?: string) => {
    ga.trackButtonClick(button, location)
    vercel.trackButtonClick(button, location)
  }

  return {
    trackEvent,
    trackPurchase,
    trackButtonClick,
    ga,
    vercel
  }
}`
      }
    ]
  }
];

export default function AnalyticsPage() {
  const [selectedConfig, setSelectedConfig] = useState(0);
  const [selectedFile, setSelectedFile] = useState(0);
  const [selectedMetricCategory, setSelectedMetricCategory] = useState(0);
  const [timeRange, setTimeRange] = useState('7d');

  // Simular dados em tempo real
  const [liveData, setLiveData] = useState({
    activeUsers: 234,
    pageViews: 1456,
    events: 892
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(prev => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10) - 5,
        pageViews: prev.pageViews + Math.floor(Math.random() * 20),
        events: prev.events + Math.floor(Math.random() * 15)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl text-white mr-4">
              <BarChart3 className="h-8 w-8" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
              Analytics
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Analise comportamento dos usuários, meça performance e otimize conversões 
            com Google Analytics 4 e Vercel Analytics.
          </p>
        </motion.div>

        {/* Features */}
        <DemoSection title="Plataformas de Analytics" description="Ferramentas para análise de dados">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-1.5 mb-8">
            {analyticsFeatures.map((feature, index) => {
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

        {/* Live Dashboard */}
        <DemoSection title="Dashboard em Tempo Real" description="Métricas atualizadas automaticamente">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            {/* Controls */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Analytics Dashboard
                </h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">Ao vivo</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <select 
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="1d">Últimas 24h</option>
                  <option value="7d">Últimos 7 dias</option>
                  <option value="30d">Últimos 30 dias</option>
                  <option value="90d">Últimos 90 dias</option>
                </select>
                
                <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100">
                  <RefreshCw className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Live Metrics */}
            <div className="grid md:grid-cols-3 gap-1.5 mb-8">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">Usuários Ativos</p>
                    <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                      {liveData.activeUsers.toLocaleString()}
                    </p>
                  </div>
                  <Users className="h-8 w-8 text-blue-500" />
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-600 dark:text-green-400 font-medium">Page Views</p>
                    <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                      {liveData.pageViews.toLocaleString()}
                    </p>
                  </div>
                  <Eye className="h-8 w-8 text-green-500" />
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">Eventos</p>
                    <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                      {liveData.events.toLocaleString()}
                    </p>
                  </div>
                  <MousePointer className="h-8 w-8 text-purple-500" />
                </div>
              </div>
            </div>

            {/* Device Breakdown */}
            <div className="grid lg:grid-cols-2 gap-1.5">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Dispositivos
                </h4>
                <div className="space-y-3">
                  {deviceData.map((device) => (
                    <div key={device.device} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {device.device === 'Desktop' && <Monitor className="h-5 w-5 text-gray-600" />}
                        {device.device === 'Mobile' && <Smartphone className="h-5 w-5 text-gray-600" />}
                        {device.device === 'Tablet' && <Monitor className="h-5 w-5 text-gray-600" />}
                        <span className="font-medium text-gray-900 dark:text-white">
                          {device.device}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div 
                            className={`${device.color} h-2 rounded-full transition-all duration-500`}
                            style={{ width: `${device.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-300 w-12 text-right">
                          {device.percentage}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Páginas Mais Visitadas
                </h4>
                <div className="space-y-3">
                  {topPages.map((page, index) => (
                    <div key={page.page} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-xs font-bold">
                          {index + 1}
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {page.page}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {page.views.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {page.bounce} bounce
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </DemoSection>

        {/* Metrics Overview */}
        <DemoSection title="Métricas Principais" description="KPIs importantes para acompanhar">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8 px-6 overflow-x-auto">
                {analyticsMetrics.map((category, index) => (
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
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-1.5">
                {analyticsMetrics[selectedMetricCategory].metrics.map((metric) => (
                  <div key={metric.name} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900 dark:text-white text-sm">
                        {metric.name}
                      </h3>
                      <div className={`flex items-center text-xs ${
                        metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {metric.trend === 'up' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                        {metric.change}
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {metric.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DemoSection>

        {/* Configuration Examples */}
        <DemoSection title="Configuração" description="Como implementar analytics no seu projeto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8 px-6 overflow-x-auto">
                {configurationExamples.map((config, index) => (
                  <button
                    key={config.name}
                    onClick={() => setSelectedConfig(index)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                      selectedConfig === index
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
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
                          ? 'border-blue-500 text-blue-600 dark:text-blue-400'
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
        <DemoSection title="Melhores Práticas" description="Diretrizes para analytics eficazes">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <div className="grid md:grid-cols-3 gap-1.5">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Target className="h-5 w-5 mr-2 text-blue-500" />
                  Estratégia
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Defina objetivos claros</li>
                  <li>• Configure eventos relevantes</li>
                  <li>• Use funis de conversão</li>
                  <li>• Segmente audiências</li>
                  <li>• Monitore métricas-chave</li>
                  <li>• Analise comportamento</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Settings className="h-5 w-5 mr-2 text-green-500" />
                  Implementação
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Use GTM para gerenciar tags</li>
                  <li>• Implemente Enhanced Ecommerce</li>
                  <li>• Configure goals e conversões</li>
                  <li>• Use custom dimensions</li>
                  <li>• Teste implementação</li>
                  <li>• Documente eventos</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Eye className="h-5 w-5 mr-2 text-purple-500" />
                  Privacidade
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Respeite LGPD/GDPR</li>
                  <li>• Use consent management</li>
                  <li>• Anonimize IPs</li>
                  <li>• Configure data retention</li>
                  <li>• Informe sobre cookies</li>
                  <li>• Permita opt-out</li>
                </ul>
              </div>
            </div>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}