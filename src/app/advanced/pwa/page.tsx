'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Smartphone, 
  Wifi, 
  WifiOff, 
  Download, 
  Bell,
  Zap,
  Shield,
  Monitor,
  Globe,
  Settings,
  Code,
  FileText,
  CheckCircle,
  ArrowRight,
  RefreshCw,
  Database,
  Camera,
  MapPin,
  X
} from 'lucide-react';
import { DemoCard } from '@/components/DemoCard';
import { DemoCardStatic } from '@/components/DemoCardStatic';
import { DemoSection } from '@/components/DemoSection';
import { CodeBlock } from '@/components/CodeBlock';

const pwaFeatures = [
  {
    title: 'Installable',
    description: 'Pode ser instalado como app nativo',
    icon: Download,
    color: 'text-blue-500',
    benefits: ['Add to Home Screen', 'App-like Experience', 'No App Store', 'Cross-platform']
  },
  {
    title: 'Offline Support',
    description: 'Funciona sem conexão com internet',
    icon: WifiOff,
    color: 'text-green-500',
    benefits: ['Service Workers', 'Cache Strategies', 'Background Sync', 'Offline Pages']
  },
  {
    title: 'Push Notifications',
    description: 'Notificações em tempo real',
    icon: Bell,
    color: 'text-purple-500',
    benefits: ['Background Messages', 'User Engagement', 'Real-time Updates', 'Cross-platform']
  },
  {
    title: 'Performance',
    description: 'Carregamento rápido e eficiente',
    icon: Zap,
    color: 'text-orange-500',
    benefits: ['Fast Loading', 'Resource Caching', 'Lazy Loading', 'Optimized Assets']
  }
];

const cacheStrategies = [
  {
    name: 'Cache First',
    description: 'Busca no cache primeiro, depois na rede',
    useCase: 'Assets estáticos (CSS, JS, imagens)',
    pros: ['Muito rápido', 'Funciona offline'],
    cons: ['Pode servir conteúdo desatualizado']
  },
  {
    name: 'Network First',
    description: 'Busca na rede primeiro, fallback para cache',
    useCase: 'Conteúdo dinâmico (API, dados)',
    pros: ['Sempre atualizado quando online'],
    cons: ['Mais lento quando offline']
  },
  {
    name: 'Stale While Revalidate',
    description: 'Serve do cache e atualiza em background',
    useCase: 'Conteúdo que pode estar levemente desatualizado',
    pros: ['Rápido', 'Sempre atualiza'],
    cons: ['Complexidade adicional']
  },
  {
    name: 'Network Only',
    description: 'Sempre busca na rede',
    useCase: 'Dados críticos e sensíveis',
    pros: ['Sempre atualizado'],
    cons: ['Não funciona offline']
  },
  {
    name: 'Cache Only',
    description: 'Sempre busca no cache',
    useCase: 'Assets que nunca mudam',
    pros: ['Muito rápido', 'Previsível'],
    cons: ['Precisa ser pré-cacheado']
  }
];

const configurationExamples = [
  {
    name: 'Next.js PWA Setup',
    description: 'Configuração básica com next-pwa',
    files: [
      {
        name: 'next.config.js',
        content: `const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts-stylesheets',
        expiration: {
          maxEntries: 4,
          maxAgeSeconds: 365 * 24 * 60 * 60 // 365 days
        }
      }
    },
    {
      urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts-webfonts',
        expiration: {
          maxEntries: 4,
          maxAgeSeconds: 365 * 24 * 60 * 60 // 365 days
        }
      }
    },
    {
      urlPattern: /^\/api\/.*/i,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'apis',
        expiration: {
          maxEntries: 16,
          maxAgeSeconds: 24 * 60 * 60 // 24 hours
        },
        networkTimeoutSeconds: 10
      }
    },
    {
      urlPattern: /\.(png|jpg|jpeg|svg|gif|webp)$/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'images',
        expiration: {
          maxEntries: 64,
          maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
        }
      }
    }
  ],
  disable: process.env.NODE_ENV === 'development'
})

module.exports = withPWA({
  // Suas outras configurações do Next.js
  reactStrictMode: true,
  swcMinify: true
})`
      },
      {
        name: 'manifest.json',
        content: `{
  "name": "React Hook Next - PWA",
  "short_name": "RHN PWA",
  "description": "Progressive Web App com React e Next.js",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#3b82f6",
  "orientation": "portrait-primary",
  "scope": "/",
  "lang": "pt-BR",
  "categories": ["education", "productivity"],
  "icons": [
    {
      "src": "/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable any"
    }
  ],
  "shortcuts": [
    {
      "name": "State Management",
      "short_name": "State",
      "description": "Gerenciamento de estado avançado",
      "url": "/state-management",
      "icons": [
        {
          "src": "/icons/shortcut-state.png",
          "sizes": "96x96"
        }
      ]
    },
    {
      "name": "UI Libraries",
      "short_name": "UI",
      "description": "Bibliotecas de interface",
      "url": "/ui-libraries",
      "icons": [
        {
          "src": "/icons/shortcut-ui.png",
          "sizes": "96x96"
        }
      ]
    }
  ],
  "screenshots": [
    {
      "src": "/screenshots/desktop-1.png",
      "sizes": "1280x720",
      "type": "image/png",
      "form_factor": "wide",
      "label": "Desktop view of the application"
    },
    {
      "src": "/screenshots/mobile-1.png",
      "sizes": "375x667",
      "type": "image/png",
      "form_factor": "narrow",
      "label": "Mobile view of the application"
    }
  ]
}`
      }
    ]
  },
  {
    name: 'Service Worker',
    description: 'Service Worker customizado',
    files: [
      {
        name: 'public/sw.js',
        content: `const CACHE_NAME = 'react-hook-next-v1'
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json'
]

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache')
        return cache.addAll(urlsToCache)
      })
  )
})

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response
        }
        
        // Clone the request
        const fetchRequest = event.request.clone()
        
        return fetch(fetchRequest).then((response) => {
          // Check if valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response
          }
          
          // Clone the response
          const responseToCache = response.clone()
          
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache)
            })
          
          return response
        })
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})

// Background sync
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync())
  }
})

function doBackgroundSync() {
  // Sync data when connection is restored
  return fetch('/api/sync')
    .then((response) => response.json())
    .then((data) => {
      console.log('Background sync completed:', data)
    })
    .catch((error) => {
      console.error('Background sync failed:', error)
    })
}

// Push notifications
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Nova notificação!',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Ver detalhes',
        icon: '/icons/checkmark.png'
      },
      {
        action: 'close',
        title: 'Fechar',
        icon: '/icons/xmark.png'
      }
    ]
  }
  
  event.waitUntil(
    self.registration.showNotification('React Hook Next', options)
  )
})

// Notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  
  if (event.action === 'explore') {
    // Open the app
    event.waitUntil(
      clients.openWindow('/')
    )
  }
})`
      },
      {
        name: 'hooks/usePWA.ts',
        content: `import { useState, useEffect } from 'react'

interface PWAState {
  isInstallable: boolean
  isInstalled: boolean
  isOnline: boolean
  isUpdateAvailable: boolean
}

interface PWAActions {
  install: () => Promise<void>
  update: () => Promise<void>
  requestNotificationPermission: () => Promise<NotificationPermission>
  showNotification: (title: string, options?: NotificationOptions) => void
}

export function usePWA(): PWAState & PWAActions {
  const [isInstallable, setIsInstallable] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)

  useEffect(() => {
    // Check if app is installed
    const checkInstalled = () => {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        setIsInstalled(true)
      }
    }

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setIsInstallable(true)
    }

    // Listen for app installed
    const handleAppInstalled = () => {
      setIsInstalled(true)
      setIsInstallable(false)
      setDeferredPrompt(null)
    }

    // Listen for online/offline
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    // Service Worker update
    const handleSWUpdate = () => {
      setIsUpdateAvailable(true)
    }

    // Initial checks
    checkInstalled()
    setIsOnline(navigator.onLine)

    // Event listeners
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Service Worker registration
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          registration.addEventListener('updatefound', handleSWUpdate)
        })
        .catch((error) => {
          console.error('SW registration failed:', error)
        })
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const install = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    
    if (outcome === 'accepted') {
      setIsInstallable(false)
      setDeferredPrompt(null)
    }
  }

  const update = async () => {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.getRegistration()
      if (registration?.waiting) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' })
        window.location.reload()
      }
    }
  }

  const requestNotificationPermission = async (): Promise<NotificationPermission> => {
    if (!('Notification' in window)) {
      throw new Error('This browser does not support notifications')
    }

    return await Notification.requestPermission()
  }

  const showNotification = (title: string, options?: NotificationOptions) => {
    if (Notification.permission === 'granted') {
      new Notification(title, {
        icon: '/icons/icon-192x192.png',
        badge: '/icons/badge-72x72.png',
        ...options
      })
    }
  }

  return {
    isInstallable,
    isInstalled,
    isOnline,
    isUpdateAvailable,
    install,
    update,
    requestNotificationPermission,
    showNotification
  }
}`
      }
    ]
  },
  {
    name: 'PWA Components',
    description: 'Componentes para funcionalidades PWA',
    files: [
      {
        name: 'components/InstallPrompt.tsx',
        content: `'use client'

import { useState } from 'react'
import { Download, X } from 'lucide-react'
import { usePWA } from '@/hooks/usePWA'

export function InstallPrompt() {
  const { isInstallable, install } = usePWA()
  const [isVisible, setIsVisible] = useState(true)

  if (!isInstallable || !isVisible) {
    return null
  }

  const handleInstall = async () => {
    try {
      await install()
      setIsVisible(false)
    } catch (error) {
      console.error('Install failed:', error)
    }
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 z-50">
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg mr-3">
            <Download className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Instalar App
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Adicione à tela inicial para acesso rápido
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <div className="flex space-x-2 mt-4">
        <button
          onClick={handleInstall}
          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Instalar
        </button>
        <button
          onClick={() => setIsVisible(false)}
          className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
        >
          Agora não
        </button>
      </div>
    </div>
  )
}`
      },
      {
        name: 'components/OfflineIndicator.tsx',
        content: `'use client'

import { WifiOff, Wifi } from 'lucide-react'
import { usePWA } from '@/hooks/usePWA'

export function OfflineIndicator() {
  const { isOnline } = usePWA()

  if (isOnline) {
    return null
  }

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center space-x-2">
      <WifiOff className="h-4 w-4" />
      <span className="text-sm font-medium">Modo Offline</span>
    </div>
  )
}`
      },
      {
        name: 'components/UpdatePrompt.tsx',
        content: `'use client'

import { useState } from 'react'
import { RefreshCw, X } from 'lucide-react'
import { usePWA } from '@/hooks/usePWA'

export function UpdatePrompt() {
  const { isUpdateAvailable, update } = usePWA()
  const [isVisible, setIsVisible] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)

  if (!isUpdateAvailable || !isVisible) {
    return null
  }

  const handleUpdate = async () => {
    setIsUpdating(true)
    try {
      await update()
    } catch (error) {
      console.error('Update failed:', error)
      setIsUpdating(false)
    }
  }

  return (
    <div className="fixed top-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-green-50 dark:bg-green-900 rounded-lg shadow-lg border border-green-200 dark:border-green-700 p-4 z-50">
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <div className="p-2 bg-green-100 dark:bg-green-800 rounded-lg mr-3">
            <RefreshCw className={\`h-5 w-5 text-green-600 dark:text-green-400 \${isUpdating ? 'animate-spin' : ''}\`} />
          </div>
          <div>
            <h3 className="font-semibold text-green-900 dark:text-green-100">
              Atualização Disponível
            </h3>
            <p className="text-sm text-green-700 dark:text-green-300">
              Uma nova versão está disponível
            </p>
          </div>
        </div>
        {!isUpdating && (
          <button
            onClick={() => setIsVisible(false)}
            className="text-green-400 hover:text-green-600 dark:hover:text-green-300"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      
      <div className="flex space-x-2 mt-4">
        <button
          onClick={handleUpdate}
          disabled={isUpdating}
          className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isUpdating ? 'Atualizando...' : 'Atualizar'}
        </button>
        {!isUpdating && (
          <button
            onClick={() => setIsVisible(false)}
            className="px-4 py-2 text-green-600 dark:text-green-300 hover:text-green-800 dark:hover:text-green-100"
          >
            Depois
          </button>
        )}
      </div>
    </div>
  )
}`
      }
    ]
  }
];

export default function PWAPage() {
  const [selectedTab, setSelectedTab] = useState('config');
  const [selectedConfig, setSelectedConfig] = useState(0);
  const [selectedFile, setSelectedFile] = useState(0);
  const [selectedStrategy, setSelectedStrategy] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl text-white mr-4">
              <Smartphone className="h-8 w-8" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
              Progressive Web Apps (PWA)
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Crie aplicações web que funcionam como apps nativos. Suporte offline, 
            instalação, notificações push e performance otimizada.
          </p>
        </motion.div>

        {/* Features */}
        <DemoSection title="Recursos Principais" description="Funcionalidades que tornam sua web app progressiva">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {pwaFeatures.map((feature, index) => {
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

        {/* Cache Strategies */}
        <DemoSection title="Estratégias de Cache" description="Diferentes abordagens para cache de recursos">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-4 px-6 overflow-x-auto">
                {cacheStrategies.map((strategy, index) => (
                  <button
                    key={strategy.name}
                    onClick={() => setSelectedStrategy(index)}
                    className={`py-4 px-3 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                      selectedStrategy === index
                        ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    {strategy.name}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="p-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    {cacheStrategies[selectedStrategy].name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {cacheStrategies[selectedStrategy].description}
                  </p>
                  
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-1">
                        Caso de Uso:
                      </div>
                      <div className="text-blue-700 dark:text-blue-400">
                        {cacheStrategies[selectedStrategy].useCase}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-green-700 dark:text-green-400 mb-2 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Vantagens
                    </h4>
                    <ul className="space-y-1">
                      {cacheStrategies[selectedStrategy].pros.map((pro, index) => (
                        <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                          <div className="w-1 h-1 bg-green-500 rounded-full mr-2" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-orange-700 dark:text-orange-400 mb-2 flex items-center">
                      <X className="h-4 w-4 mr-2" />
                      Desvantagens
                    </h4>
                    <ul className="space-y-1">
                      {cacheStrategies[selectedStrategy].cons.map((con, index) => (
                        <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                          <div className="w-1 h-1 bg-orange-500 rounded-full mr-2" />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DemoSection>

        {/* Configuration Examples */}
        <DemoSection title="Configuração e Implementação" description="Como implementar PWA com Next.js">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8 px-6 overflow-x-auto">
                {configurationExamples.map((config, index) => (
                  <button
                    key={config.name}
                    onClick={() => setSelectedConfig(index)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                      selectedConfig === index
                        ? 'border-purple-500 text-purple-600 dark:text-purple-400'
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
                          ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                          : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                      }`}
                    >
                      {file.name}
                    </button>
                  ))}
                </nav>
              </div>
              
              <CodeBlock
                language={configurationExamples[selectedConfig].files[selectedFile].name.endsWith('.json') ? 'json' : 'typescript'}
                code={configurationExamples[selectedConfig].files[selectedFile].content}
              />
            </div>
          </div>
        </DemoSection>

        {/* Best Practices */}
        <DemoSection title="Melhores Práticas" description="Diretrizes para criar PWAs eficientes">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-yellow-500" />
                  Performance
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Implemente cache estratégico</li>
                  <li>• Use lazy loading para recursos</li>
                  <li>• Otimize imagens e assets</li>
                  <li>• Minimize bundle size</li>
                  <li>• Use service workers eficientemente</li>
                  <li>• Monitore Core Web Vitals</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-green-500" />
                  Segurança
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Use HTTPS sempre</li>
                  <li>• Valide dados offline</li>
                  <li>• Implemente CSP adequado</li>
                  <li>• Proteja service workers</li>
                  <li>• Sanitize dados de cache</li>
                  <li>• Use tokens seguros</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Smartphone className="h-5 w-5 mr-2 text-blue-500" />
                  Experiência do Usuário
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Forneça feedback de status</li>
                  <li>• Implemente modo offline</li>
                  <li>• Use notificações relevantes</li>
                  <li>• Otimize para mobile</li>
                  <li>• Teste em dispositivos reais</li>
                  <li>• Monitore métricas de uso</li>
                </ul>
              </div>
            </div>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}