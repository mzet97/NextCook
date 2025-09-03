'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Globe,
  Server,
  Wifi,
  WifiOff,
  Monitor,
  Smartphone,
  Database,
  Cloud,
  MapPin,
  Bell,
  Settings,
  TrendingUp,
  TrendingDown,
  Eye,
  Shield,
  Zap,
  RefreshCw,
  Calendar,
  BarChart3,
  LineChart
} from 'lucide-react';
import { DemoCard } from '@/components/DemoCard';
import { DemoCardStatic } from '@/components/DemoCardStatic';
import { DemoSection } from '@/components/DemoSection';
import { CodeBlock } from '@/components/CodeBlock';

const uptimeFeatures = [
  {
    title: '24/7 Monitoring',
    description: 'Monitoramento contínuo de disponibilidade',
    icon: Activity,
    color: 'text-green-500',
    benefits: ['Real-time Checks', 'Global Monitoring', 'Instant Alerts', 'Historical Data']
  },
  {
    title: 'Multi-location Testing',
    description: 'Testes de múltiplas localizações geográficas',
    icon: Globe,
    color: 'text-blue-500',
    benefits: ['Global Coverage', 'Regional Performance', 'CDN Validation', 'Latency Analysis']
  },
  {
    title: 'Smart Alerts',
    description: 'Sistema inteligente de notificações',
    icon: Bell,
    color: 'text-orange-500',
    benefits: ['Multiple Channels', 'Escalation Rules', 'Smart Filtering', 'Team Coordination']
  },
  {
    title: 'Status Pages',
    description: 'Páginas públicas de status do serviço',
    icon: Monitor,
    color: 'text-purple-500',
    benefits: ['Public Transparency', 'Incident Updates', 'Maintenance Windows', 'Subscriber Notifications']
  }
];

const monitoringLocations = [
  { name: 'São Paulo', country: 'Brazil', flag: '🇧🇷', status: 'online', latency: 45, uptime: 99.98 },
  { name: 'Virginia', country: 'USA', flag: '🇺🇸', status: 'online', latency: 123, uptime: 99.95 },
  { name: 'London', country: 'UK', flag: '🇬🇧', status: 'online', latency: 89, uptime: 99.97 },
  { name: 'Frankfurt', country: 'Germany', flag: '🇩🇪', status: 'online', latency: 67, uptime: 99.99 },
  { name: 'Singapore', country: 'Singapore', flag: '🇸🇬', status: 'online', latency: 156, uptime: 99.94 },
  { name: 'Tokyo', country: 'Japan', flag: '🇯🇵', status: 'degraded', latency: 234, uptime: 99.89 },
  { name: 'Sydney', country: 'Australia', flag: '🇦🇺', status: 'online', latency: 198, uptime: 99.96 },
  { name: 'Mumbai', country: 'India', flag: '🇮🇳', status: 'online', latency: 178, uptime: 99.93 }
];

const services = [
  {
    name: 'Main Website',
    url: 'https://example.com',
    status: 'online',
    uptime: 99.98,
    responseTime: 245,
    lastCheck: '2 min ago',
    incidents: 0
  },
  {
    name: 'API Gateway',
    url: 'https://api.example.com',
    status: 'online',
    uptime: 99.95,
    responseTime: 156,
    lastCheck: '1 min ago',
    incidents: 1
  },
  {
    name: 'Admin Dashboard',
    url: 'https://admin.example.com',
    status: 'degraded',
    uptime: 99.87,
    responseTime: 1234,
    lastCheck: '3 min ago',
    incidents: 2
  },
  {
    name: 'CDN Assets',
    url: 'https://cdn.example.com',
    status: 'online',
    uptime: 99.99,
    responseTime: 89,
    lastCheck: '1 min ago',
    incidents: 0
  },
  {
    name: 'Database',
    url: 'db.example.com:5432',
    status: 'online',
    uptime: 99.96,
    responseTime: 23,
    lastCheck: '30 sec ago',
    incidents: 0
  }
];

const incidents = [
  {
    id: 1,
    title: 'API Gateway Slow Response',
    status: 'investigating',
    severity: 'minor',
    startTime: '2024-01-15 14:30:00',
    duration: '45 min',
    affectedServices: ['API Gateway'],
    updates: [
      { time: '14:30', message: 'Investigating reports of slow API responses' },
      { time: '14:45', message: 'Identified database connection pool issue' },
      { time: '15:00', message: 'Implementing fix for connection pool' }
    ]
  },
  {
    id: 2,
    title: 'Admin Dashboard Intermittent Errors',
    status: 'monitoring',
    severity: 'minor',
    startTime: '2024-01-15 12:15:00',
    duration: '2h 30min',
    affectedServices: ['Admin Dashboard'],
    updates: [
      { time: '12:15', message: 'Reports of 500 errors on admin dashboard' },
      { time: '12:30', message: 'Fix deployed, monitoring for stability' },
      { time: '14:45', message: 'Issue appears resolved, continuing to monitor' }
    ]
  }
];

const configurationExamples = [
  {
    name: 'Health Check API',
    description: 'Implementação de endpoints de health check',
    files: [
      {
        name: 'api/health/route.ts',
        content: `import { NextRequest, NextResponse } from 'next/server'

interface HealthCheck {
  status: 'healthy' | 'degraded' | 'unhealthy'
  timestamp: string
  version: string
  uptime: number
  checks: {
    database: HealthStatus
    redis: HealthStatus
    external_api: HealthStatus
    disk_space: HealthStatus
    memory: HealthStatus
  }
}

interface HealthStatus {
  status: 'pass' | 'warn' | 'fail'
  responseTime?: number
  message?: string
  details?: any
}

// Função para verificar conexão com banco de dados
async function checkDatabase(): Promise<HealthStatus> {
  try {
    const start = Date.now()
    // Simular verificação de banco de dados
    // await db.raw('SELECT 1')
    const responseTime = Date.now() - start
    
    return {
      status: responseTime < 100 ? 'pass' : responseTime < 500 ? 'warn' : 'fail',
      responseTime,
      message: responseTime < 500 ? 'Database connection healthy' : 'Database response slow'
    }
  } catch (error) {
    return {
      status: 'fail',
      message: 'Database connection failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

// Função para verificar Redis
async function checkRedis(): Promise<HealthStatus> {
  try {
    const start = Date.now()
    // Simular verificação do Redis
    // await redis.ping()
    const responseTime = Date.now() - start
    
    return {
      status: 'pass',
      responseTime,
      message: 'Redis connection healthy'
    }
  } catch (error) {
    return {
      status: 'fail',
      message: 'Redis connection failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

// Função para verificar API externa
async function checkExternalAPI(): Promise<HealthStatus> {
  try {
    const start = Date.now()
    const response = await fetch('https://api.external-service.com/health', {
      method: 'GET',
      timeout: 5000
    })
    const responseTime = Date.now() - start
    
    if (response.ok) {
      return {
        status: responseTime < 1000 ? 'pass' : 'warn',
        responseTime,
        message: 'External API healthy'
      }
    } else {
      return {
        status: 'fail',
        responseTime,
        message: \`External API returned \${response.status}\`
      }
    }
  } catch (error) {
    return {
      status: 'fail',
      message: 'External API unreachable',
      details: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

// Função para verificar espaço em disco
function checkDiskSpace(): HealthStatus {
  try {
    // Simular verificação de espaço em disco
    const freeSpacePercent = 75 // Simulado
    
    return {
      status: freeSpacePercent > 20 ? 'pass' : freeSpacePercent > 10 ? 'warn' : 'fail',
      message: \`\${freeSpacePercent}% disk space available\`,
      details: { freeSpacePercent }
    }
  } catch (error) {
    return {
      status: 'fail',
      message: 'Could not check disk space'
    }
  }
}

// Função para verificar uso de memória
function checkMemory(): HealthStatus {
  try {
    const memoryUsage = process.memoryUsage()
    const usedMB = Math.round(memoryUsage.heapUsed / 1024 / 1024)
    const totalMB = Math.round(memoryUsage.heapTotal / 1024 / 1024)
    const usagePercent = Math.round((usedMB / totalMB) * 100)
    
    return {
      status: usagePercent < 80 ? 'pass' : usagePercent < 90 ? 'warn' : 'fail',
      message: \`Memory usage: \${usedMB}MB / \${totalMB}MB (\${usagePercent}%)\`,
      details: { usedMB, totalMB, usagePercent }
    }
  } catch (error) {
    return {
      status: 'fail',
      message: 'Could not check memory usage'
    }
  }
}

export async function GET(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    // Executar todas as verificações em paralelo
    const [database, redis, externalAPI] = await Promise.all([
      checkDatabase(),
      checkRedis(),
      checkExternalAPI()
    ])
    
    const diskSpace = checkDiskSpace()
    const memory = checkMemory()
    
    const checks = {
      database,
      redis,
      external_api: externalAPI,
      disk_space: diskSpace,
      memory
    }
    
    // Determinar status geral
    const hasFailures = Object.values(checks).some(check => check.status === 'fail')
    const hasWarnings = Object.values(checks).some(check => check.status === 'warn')
    
    const overallStatus: 'healthy' | 'degraded' | 'unhealthy' = 
      hasFailures ? 'unhealthy' : hasWarnings ? 'degraded' : 'healthy'
    
    const healthCheck: HealthCheck = {
      status: overallStatus,
      timestamp: new Date().toISOString(),
      version: process.env.APP_VERSION || '1.0.0',
      uptime: process.uptime(),
      checks
    }
    
    const responseTime = Date.now() - startTime
    
    // Definir status HTTP baseado na saúde
    const httpStatus = overallStatus === 'healthy' ? 200 : 
                      overallStatus === 'degraded' ? 200 : 503
    
    return NextResponse.json(healthCheck, { 
      status: httpStatus,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'X-Response-Time': \`\${responseTime}ms\`
      }
    })
  } catch (error) {
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      version: process.env.APP_VERSION || '1.0.0',
      uptime: process.uptime(),
      error: error instanceof Error ? error.message : 'Unknown error',
      checks: {}
    }, { status: 503 })
  }
}`
      },
      {
        name: 'lib/uptime-monitor.ts',
        content: `interface MonitorConfig {
  url: string
  method: 'GET' | 'POST' | 'HEAD'
  timeout: number
  interval: number
  expectedStatus: number[]
  expectedContent?: string
  headers?: Record<string, string>
  body?: string
}

interface MonitorResult {
  timestamp: number
  url: string
  status: 'up' | 'down' | 'degraded'
  responseTime: number
  statusCode?: number
  error?: string
  location?: string
}

class UptimeMonitor {
  private monitors: Map<string, MonitorConfig> = new Map()
  private results: Map<string, MonitorResult[]> = new Map()
  private intervals: Map<string, NodeJS.Timeout> = new Map()
  private callbacks: Map<string, (result: MonitorResult) => void> = new Map()

  // Adicionar monitor
  addMonitor(id: string, config: MonitorConfig, callback?: (result: MonitorResult) => void) {
    this.monitors.set(id, config)
    this.results.set(id, [])
    
    if (callback) {
      this.callbacks.set(id, callback)
    }
    
    // Iniciar monitoramento
    this.startMonitoring(id)
  }

  // Remover monitor
  removeMonitor(id: string) {
    const interval = this.intervals.get(id)
    if (interval) {
      clearInterval(interval)
      this.intervals.delete(id)
    }
    
    this.monitors.delete(id)
    this.results.delete(id)
    this.callbacks.delete(id)
  }

  // Iniciar monitoramento
  private startMonitoring(id: string) {
    const config = this.monitors.get(id)
    if (!config) return

    // Executar verificação inicial
    this.checkEndpoint(id)

    // Configurar intervalo
    const interval = setInterval(() => {
      this.checkEndpoint(id)
    }, config.interval)

    this.intervals.set(id, interval)
  }

  // Verificar endpoint
  private async checkEndpoint(id: string) {
    const config = this.monitors.get(id)
    if (!config) return

    const startTime = Date.now()
    let result: MonitorResult

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), config.timeout)

      const response = await fetch(config.url, {
        method: config.method,
        headers: config.headers,
        body: config.body,
        signal: controller.signal
      })

      clearTimeout(timeoutId)
      const responseTime = Date.now() - startTime

      // Verificar status code
      const isValidStatus = config.expectedStatus.includes(response.status)
      
      // Verificar conteúdo se especificado
      let isValidContent = true
      if (config.expectedContent) {
        const text = await response.text()
        isValidContent = text.includes(config.expectedContent)
      }

      const isUp = isValidStatus && isValidContent
      const isDegraded = responseTime > 5000 // > 5s considerado degradado

      result = {
        timestamp: Date.now(),
        url: config.url,
        status: isUp ? (isDegraded ? 'degraded' : 'up') : 'down',
        responseTime,
        statusCode: response.status
      }
    } catch (error) {
      result = {
        timestamp: Date.now(),
        url: config.url,
        status: 'down',
        responseTime: Date.now() - startTime,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }

    // Armazenar resultado
    this.storeResult(id, result)

    // Executar callback
    const callback = this.callbacks.get(id)
    if (callback) {
      callback(result)
    }
  }

  // Armazenar resultado
  private storeResult(id: string, result: MonitorResult) {
    const results = this.results.get(id) || []
    results.push(result)
    
    // Manter apenas os últimos 1000 resultados
    if (results.length > 1000) {
      results.splice(0, results.length - 1000)
    }
    
    this.results.set(id, results)
  }

  // Obter resultados
  getResults(id: string, limit?: number): MonitorResult[] {
    const results = this.results.get(id) || []
    return limit ? results.slice(-limit) : results
  }

  // Calcular uptime
  getUptime(id: string, hours: number = 24): number {
    const results = this.getResults(id)
    const cutoff = Date.now() - (hours * 60 * 60 * 1000)
    const recentResults = results.filter(r => r.timestamp > cutoff)
    
    if (recentResults.length === 0) return 0
    
    const upResults = recentResults.filter(r => r.status === 'up')
    return (upResults.length / recentResults.length) * 100
  }

  // Obter estatísticas
  getStats(id: string) {
    const results = this.getResults(id)
    if (results.length === 0) {
      return {
        totalChecks: 0,
        uptime24h: 0,
        uptime7d: 0,
        uptime30d: 0,
        avgResponseTime: 0,
        lastCheck: null,
        currentStatus: 'unknown'
      }
    }

    const responseTimes = results
      .filter(r => r.status !== 'down')
      .map(r => r.responseTime)
    
    const avgResponseTime = responseTimes.length > 0 
      ? responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length
      : 0

    return {
      totalChecks: results.length,
      uptime24h: this.getUptime(id, 24),
      uptime7d: this.getUptime(id, 24 * 7),
      uptime30d: this.getUptime(id, 24 * 30),
      avgResponseTime: Math.round(avgResponseTime),
      lastCheck: results[results.length - 1],
      currentStatus: results[results.length - 1]?.status || 'unknown'
    }
  }

  // Parar todos os monitores
  stopAll() {
    this.intervals.forEach(interval => clearInterval(interval))
    this.intervals.clear()
  }
}

// Instância global
let uptimeMonitor: UptimeMonitor | null = null

export function getUptimeMonitor(): UptimeMonitor {
  if (!uptimeMonitor) {
    uptimeMonitor = new UptimeMonitor()
  }
  return uptimeMonitor
}

// Configurações padrão
export const defaultMonitorConfigs = {
  website: {
    url: 'https://example.com',
    method: 'GET' as const,
    timeout: 10000,
    interval: 60000, // 1 minuto
    expectedStatus: [200],
    expectedContent: '<title>'
  },
  api: {
    url: 'https://api.example.com/health',
    method: 'GET' as const,
    timeout: 5000,
    interval: 30000, // 30 segundos
    expectedStatus: [200],
    headers: {
      'User-Agent': 'UptimeMonitor/1.0'
    }
  },
  database: {
    url: 'https://example.com/api/health/db',
    method: 'GET' as const,
    timeout: 5000,
    interval: 60000, // 1 minuto
    expectedStatus: [200]
  }
}`
      },
      {
        name: 'components/StatusPage.tsx',
        content: `'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, AlertTriangle, XCircle, Clock, Activity } from 'lucide-react'

interface Service {
  id: string
  name: string
  status: 'operational' | 'degraded' | 'outage' | 'maintenance'
  description?: string
}

interface Incident {
  id: string
  title: string
  status: 'investigating' | 'identified' | 'monitoring' | 'resolved'
  severity: 'minor' | 'major' | 'critical'
  startTime: string
  updates: {
    time: string
    message: string
    status: string
  }[]
}

interface StatusPageProps {
  services: Service[]
  incidents: Incident[]
  overallStatus: 'operational' | 'degraded' | 'outage'
}

export function StatusPage({ services, incidents, overallStatus }: StatusPageProps) {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'degraded':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case 'outage':
        return <XCircle className="h-5 w-5 text-red-500" />
      case 'maintenance':
        return <Clock className="h-5 w-5 text-blue-500" />
      default:
        return <Activity className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300'
      case 'degraded':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300'
      case 'outage':
        return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300'
      case 'maintenance':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300'
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300'
      case 'major':
        return 'text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-300'
      case 'minor':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300'
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  const activeIncidents = incidents.filter(incident => incident.status !== 'resolved')

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          System Status
        </h1>
        <div className="flex items-center justify-center space-x-2">
          {getStatusIcon(overallStatus)}
          <span className={\`px-3 py-1 rounded-full text-sm font-medium \${getStatusColor(overallStatus)}\`}>
            {overallStatus === 'operational' ? 'All Systems Operational' :
             overallStatus === 'degraded' ? 'Some Systems Degraded' :
             'System Outage'}
          </span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Last updated: {currentTime.toLocaleString()}
        </p>
      </div>

      {/* Active Incidents */}
      {activeIncidents.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Active Incidents
          </h2>
          <div className="space-y-4">
            {activeIncidents.map((incident) => (
              <div key={incident.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {incident.title}
                    </h3>
                    <div className="flex items-center space-x-3 mt-2">
                      <span className={\`px-2 py-1 rounded text-xs font-medium \${getSeverityColor(incident.severity)}\`}>
                        {incident.severity.toUpperCase()}
                      </span>
                      <span className={\`px-2 py-1 rounded text-xs font-medium \${getStatusColor(incident.status)}\`}>
                        {incident.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Started: {new Date(incident.startTime).toLocaleString()}
                  </span>
                </div>
                
                <div className="space-y-3">
                  {incident.updates.map((update, index) => (
                    <div key={index} className="flex space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {update.time}
                          </span>
                          <span className={\`px-2 py-1 rounded text-xs font-medium \${getStatusColor(update.status)}\`}>
                            {update.status.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                          {update.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Services Status */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Services
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700">
          {services.map((service) => (
            <div key={service.id} className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getStatusIcon(service.status)}
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {service.name}
                  </h3>
                  {service.description && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {service.description}
                    </p>
                  )}
                </div>
              </div>
              <span className={\`px-3 py-1 rounded-full text-sm font-medium \${getStatusColor(service.status)}\`}>
                {service.status === 'operational' ? 'Operational' :
                 service.status === 'degraded' ? 'Degraded Performance' :
                 service.status === 'outage' ? 'Outage' :
                 'Under Maintenance'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        <p>Subscribe to updates • Powered by Status Monitor</p>
      </div>
    </div>
  )
}`
      }
    ]
  }
];

export default function UptimePage() {
  const [selectedConfig, setSelectedConfig] = useState(0);
  const [selectedFile, setSelectedFile] = useState(0);
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');

  // Simular dados de uptime em tempo real
  const [uptimeData, setUptimeData] = useState({
    overallUptime: 99.97,
    totalChecks: 1440,
    successfulChecks: 1436,
    avgResponseTime: 245
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setUptimeData(prev => ({
        overallUptime: Math.max(99.5, Math.min(100, prev.overallUptime + (Math.random() - 0.5) * 0.1)),
        totalChecks: prev.totalChecks + 1,
        successfulChecks: prev.successfulChecks + (Math.random() > 0.05 ? 1 : 0),
        avgResponseTime: Math.max(100, Math.min(500, prev.avgResponseTime + (Math.random() - 0.5) * 20))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
      case 'degraded': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300';
      case 'offline': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'degraded': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'offline': return <WifiOff className="h-4 w-4 text-red-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

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
            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl text-white mr-4">
              <Activity className="h-8 w-8" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
              Uptime Monitoring
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Monitore disponibilidade 24/7, receba alertas inteligentes e mantenha 
            transparência com páginas de status públicas.
          </p>
        </motion.div>

        {/* Features */}
        <DemoSection title="Recursos de Monitoramento" description="Funcionalidades para garantir alta disponibilidade">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {uptimeFeatures.map((feature, index) => {
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

        {/* Uptime Overview */}
        <DemoSection title="Visão Geral" description="Status atual dos serviços monitorados">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            {/* Overall Stats */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {uptimeData.overallUptime.toFixed(2)}%
                </div>
                <div className="text-sm text-green-700 dark:text-green-300">Overall Uptime</div>
              </div>
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {uptimeData.totalChecks.toLocaleString()}
                </div>
                <div className="text-sm text-blue-700 dark:text-blue-300">Total Checks</div>
              </div>
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {uptimeData.successfulChecks.toLocaleString()}
                </div>
                <div className="text-sm text-purple-700 dark:text-purple-300">Successful</div>
              </div>
              <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                  {Math.round(uptimeData.avgResponseTime)}ms
                </div>
                <div className="text-sm text-orange-700 dark:text-orange-300">Avg Response</div>
              </div>
            </div>

            {/* Time Range Selector */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Service Status
              </h3>
              <select 
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="1h">Last Hour</option>
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
              </select>
            </div>

            {/* Services List */}
            <div className="space-y-4">
              {services.map((service, index) => (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(service.status)}
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {service.name}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {service.url}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {service.uptime}% uptime
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {service.responseTime}ms avg
                      </div>
                    </div>
                    
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(service.status)}`}>
                      {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                    </span>
                    
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {service.lastCheck}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </DemoSection>

        {/* Global Monitoring Locations */}
        <DemoSection title="Localizações de Monitoramento" description="Rede global de pontos de verificação">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {monitoringLocations.map((location, index) => (
                <motion.div
                  key={location.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{location.flag}</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {location.name}
                      </span>
                    </div>
                    {getStatusIcon(location.status)}
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-300">Latency:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {location.latency}ms
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-300">Uptime:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {location.uptime}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-2 w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1">
                    <div 
                      className={`h-1 rounded-full transition-all duration-500 ${
                        location.status === 'online' ? 'bg-green-500' :
                        location.status === 'degraded' ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${location.uptime}%` }}
                    ></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </DemoSection>

        {/* Recent Incidents */}
        <DemoSection title="Incidentes Recentes" description="Histórico de problemas e resoluções">
          <div className="space-y-4">
            {incidents.map((incident, index) => (
              <motion.div
                key={incident.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {incident.title}
                    </h3>
                    <div className="flex items-center space-x-3 mt-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        incident.severity === 'critical' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
                        incident.severity === 'major' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300' :
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                      }`}>
                        {incident.severity.toUpperCase()}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        incident.status === 'resolved' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                        'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                      }`}>
                        {incident.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="text-right text-sm text-gray-500 dark:text-gray-400">
                    <div>Started: {incident.startTime}</div>
                    <div>Duration: {incident.duration}</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {incident.updates.map((update, updateIndex) => (
                    <div key={updateIndex} className="flex space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {update.time}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {update.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </DemoSection>

        {/* Configuration Examples */}
        <DemoSection title="Implementação" description="Como implementar monitoramento de uptime">
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
                language="typescript"
                code={configurationExamples[selectedConfig].files[selectedFile].content}
              />
            </div>
          </div>
        </DemoSection>

        {/* Best Practices */}
        <DemoSection title="Melhores Práticas" description="Diretrizes para monitoramento eficaz">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-green-500" />
                  Monitoramento
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Monitore endpoints críticos</li>
                  <li>• Use múltiplas localizações</li>
                  <li>• Configure intervalos adequados</li>
                  <li>• Monitore dependências externas</li>
                  <li>• Implemente health checks</li>
                  <li>• Teste cenários de falha</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Bell className="h-5 w-5 mr-2 text-orange-500" />
                  Alertas
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Configure múltiplos canais</li>
                  <li>• Use escalation rules</li>
                  <li>• Evite alert fatigue</li>
                  <li>• Defina SLAs claros</li>
                  <li>• Implemente auto-recovery</li>
                  <li>• Documente procedimentos</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Monitor className="h-5 w-5 mr-2 text-purple-500" />
                  Transparência
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Mantenha status page atualizada</li>
                  <li>• Comunique incidentes rapidamente</li>
                  <li>• Forneça ETAs realistas</li>
                  <li>• Documente post-mortems</li>
                  <li>• Permita inscrições</li>
                  <li>• Seja proativo na comunicação</li>
                </ul>
              </div>
            </div>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}