'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  Shield, 
  Zap,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Activity,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Globe,
  Server,
  Database,
  Settings,
  Play,
  Pause,
  RefreshCw,
  Eye,
  Filter,
  Target,
  Code,
  Copy
} from 'lucide-react';
import { DemoCard } from '@/components/DemoCard';
import { DemoCardStatic } from '@/components/DemoCardStatic';
import { DemoSection } from '@/components/DemoSection';

const rateLimitingStrategies = [
  {
    name: 'Token Bucket',
    description: 'Permite rajadas de tráfego até um limite, reabastecendo tokens ao longo do tempo',
    algorithm: 'Bucket-based',
    complexity: 'Medium',
    performance: 'High',
    useCase: 'APIs com tráfego variável',
    pros: ['Permite rajadas', 'Flexível', 'Eficiente em memória'],
    cons: ['Complexidade de implementação', 'Requer sincronização']
  },
  {
    name: 'Fixed Window',
    description: 'Conta requisições em janelas de tempo fixas (ex: 100 req/min)',
    algorithm: 'Time-window',
    complexity: 'Low',
    performance: 'High',
    useCase: 'Controle simples de taxa',
    pros: ['Simples implementação', 'Baixo overhead', 'Previsível'],
    cons: ['Permite rajadas no início', 'Não suaviza tráfego']
  },
  {
    name: 'Sliding Window',
    description: 'Janela deslizante que suaviza o tráfego ao longo do tempo',
    algorithm: 'Rolling-window',
    complexity: 'High',
    performance: 'Medium',
    useCase: 'Controle preciso de taxa',
    pros: ['Suaviza tráfego', 'Mais justo', 'Preciso'],
    cons: ['Maior uso de memória', 'Complexidade alta']
  },
  {
    name: 'Leaky Bucket',
    description: 'Processa requisições a uma taxa constante, descartando excesso',
    algorithm: 'Queue-based',
    complexity: 'Medium',
    performance: 'Medium',
    useCase: 'Suavização de tráfego',
    pros: ['Taxa constante', 'Suaviza picos', 'Previsível'],
    cons: ['Pode descartar requisições', 'Latência adicional']
  }
];

const attackTypes = [
  {
    name: 'DDoS (Distributed Denial of Service)',
    description: 'Múltiplas fontes sobrecarregam o servidor simultaneamente',
    severity: 'Critical',
    impact: 'Service unavailability, revenue loss, reputation damage',
    mitigation: ['Rate limiting per IP', 'CDN protection', 'Load balancing', 'Traffic filtering'],
    indicators: ['Sudden traffic spike', 'Multiple IPs', 'Unusual patterns', 'High error rates']
  },
  {
    name: 'Brute Force Attack',
    description: 'Tentativas repetidas de login ou acesso não autorizado',
    severity: 'High',
    impact: 'Account compromise, data breach, unauthorized access',
    mitigation: ['Login rate limiting', 'Account lockout', 'CAPTCHA', 'IP blocking'],
    indicators: ['Failed login attempts', 'Same IP patterns', 'Dictionary attacks', 'Automated requests']
  },
  {
    name: 'API Abuse',
    description: 'Uso excessivo de APIs para extrair dados ou sobrecarregar sistema',
    severity: 'Medium',
    impact: 'Resource exhaustion, increased costs, service degradation',
    mitigation: ['API rate limiting', 'Authentication', 'Usage quotas', 'Monitoring'],
    indicators: ['High API usage', 'Automated patterns', 'Data scraping', 'Unusual endpoints']
  },
  {
    name: 'Resource Exhaustion',
    description: 'Esgotamento de recursos do servidor através de requisições custosas',
    severity: 'High',
    impact: 'Performance degradation, service instability, increased costs',
    mitigation: ['Request complexity limits', 'Resource monitoring', 'Queue management', 'Caching'],
    indicators: ['High CPU usage', 'Memory exhaustion', 'Slow responses', 'Database overload']
  }
];

const implementationExamples = {
  middleware: `// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { Redis } from 'ioredis';

const redis = new Redis(process.env.REDIS_URL!);

// Rate limiting configuration
const RATE_LIMITS = {
  api: { requests: 100, window: 60 }, // 100 req/min
  auth: { requests: 5, window: 300 }, // 5 req/5min
  upload: { requests: 10, window: 3600 } // 10 req/hour
};

export async function middleware(request: NextRequest) {
  const ip = request.ip || 'unknown';
  const pathname = request.nextUrl.pathname;
  
  // Determine rate limit based on path
  let limit = RATE_LIMITS.api;
  if (pathname.startsWith('/api/auth')) {
    limit = RATE_LIMITS.auth;
  } else if (pathname.startsWith('/api/upload')) {
    limit = RATE_LIMITS.upload;
  }
  
  const key = \`rate_limit:\${ip}:\${pathname}\`;
  const current = await redis.get(key);
  
  if (current === null) {
    // First request in window
    await redis.setex(key, limit.window, 1);
    return NextResponse.next();
  }
  
  const count = parseInt(current);
  if (count >= limit.requests) {
    // Rate limit exceeded
    return new NextResponse(
      JSON.stringify({
        error: 'Rate limit exceeded',
        retryAfter: await redis.ttl(key)
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'X-RateLimit-Limit': limit.requests.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': (Date.now() + (await redis.ttl(key)) * 1000).toString(),
          'Retry-After': (await redis.ttl(key)).toString()
        }
      }
    );
  }
  
  // Increment counter
  await redis.incr(key);
  
  // Add rate limit headers
  const response = NextResponse.next();
  response.headers.set('X-RateLimit-Limit', limit.requests.toString());
  response.headers.set('X-RateLimit-Remaining', (limit.requests - count - 1).toString());
  response.headers.set('X-RateLimit-Reset', (Date.now() + (await redis.ttl(key)) * 1000).toString());
  
  return response;
}

export const config = {
  matcher: '/api/:path*'
};`,
  tokenBucket: `// lib/rate-limiter.ts
interface TokenBucket {
  tokens: number;
  lastRefill: number;
  capacity: number;
  refillRate: number; // tokens per second
}

class TokenBucketRateLimiter {
  private buckets = new Map<string, TokenBucket>();
  
  constructor(
    private capacity: number,
    private refillRate: number
  ) {}
  
  async isAllowed(key: string, tokens: number = 1): Promise<boolean> {
    const now = Date.now();
    let bucket = this.buckets.get(key);
    
    if (!bucket) {
      bucket = {
        tokens: this.capacity,
        lastRefill: now,
        capacity: this.capacity,
        refillRate: this.refillRate
      };
      this.buckets.set(key, bucket);
    }
    
    // Calculate tokens to add based on time elapsed
    const timePassed = (now - bucket.lastRefill) / 1000;
    const tokensToAdd = Math.floor(timePassed * bucket.refillRate);
    
    if (tokensToAdd > 0) {
      bucket.tokens = Math.min(bucket.capacity, bucket.tokens + tokensToAdd);
      bucket.lastRefill = now;
    }
    
    // Check if enough tokens available
    if (bucket.tokens >= tokens) {
      bucket.tokens -= tokens;
      return true;
    }
    
    return false;
  }
  
  getRemainingTokens(key: string): number {
    const bucket = this.buckets.get(key);
    return bucket ? bucket.tokens : this.capacity;
  }
  
  getTimeToRefill(key: string): number {
    const bucket = this.buckets.get(key);
    if (!bucket || bucket.tokens >= bucket.capacity) return 0;
    
    const tokensNeeded = bucket.capacity - bucket.tokens;
    return Math.ceil(tokensNeeded / bucket.refillRate);
  }
}

// Usage example
const apiLimiter = new TokenBucketRateLimiter(100, 1.67); // 100 tokens, refill 1.67/sec (100/min)
const authLimiter = new TokenBucketRateLimiter(5, 0.017); // 5 tokens, refill 0.017/sec (1/min)

export { TokenBucketRateLimiter, apiLimiter, authLimiter };`,
  slidingWindow: `// lib/sliding-window.ts
interface WindowEntry {
  timestamp: number;
  count: number;
}

class SlidingWindowRateLimiter {
  private windows = new Map<string, WindowEntry[]>();
  
  constructor(
    private limit: number,
    private windowSizeMs: number,
    private subWindowCount: number = 10
  ) {}
  
  async isAllowed(key: string): Promise<boolean> {
    const now = Date.now();
    const subWindowSize = this.windowSizeMs / this.subWindowCount;
    const currentWindow = Math.floor(now / subWindowSize);
    
    let windows = this.windows.get(key) || [];
    
    // Remove old windows
    const cutoff = currentWindow - this.subWindowCount;
    windows = windows.filter(w => w.timestamp > cutoff);
    
    // Calculate current usage
    const totalRequests = windows.reduce((sum, w) => sum + w.count, 0);
    
    if (totalRequests >= this.limit) {
      this.windows.set(key, windows);
      return false;
    }
    
    // Add/update current window
    const existingWindow = windows.find(w => w.timestamp === currentWindow);
    if (existingWindow) {
      existingWindow.count++;
    } else {
      windows.push({ timestamp: currentWindow, count: 1 });
    }
    
    this.windows.set(key, windows);
    return true;
  }
  
  getCurrentUsage(key: string): number {
    const now = Date.now();
    const subWindowSize = this.windowSizeMs / this.subWindowCount;
    const currentWindow = Math.floor(now / subWindowSize);
    const cutoff = currentWindow - this.subWindowCount;
    
    const windows = this.windows.get(key) || [];
    return windows
      .filter(w => w.timestamp > cutoff)
      .reduce((sum, w) => sum + w.count, 0);
  }
  
  getTimeToReset(key: string): number {
    const now = Date.now();
    const subWindowSize = this.windowSizeMs / this.subWindowCount;
    const currentWindow = Math.floor(now / subWindowSize);
    const nextWindowStart = (currentWindow + 1) * subWindowSize;
    
    return Math.max(0, nextWindowStart - now);
  }
}

export { SlidingWindowRateLimiter };`,
  api: `// app/api/rate-limit/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { apiLimiter } from '@/lib/rate-limiter';

export async function POST(request: NextRequest) {
  const ip = request.ip || 'unknown';
  const userAgent = request.headers.get('user-agent') || 'unknown';
  const key = \`\${ip}:\${userAgent}\`;
  
  // Check rate limit
  const allowed = await apiLimiter.isAllowed(key);
  
  if (!allowed) {
    const timeToRefill = apiLimiter.getTimeToRefill(key);
    
    return NextResponse.json(
      {
        error: 'Rate limit exceeded',
        message: 'Too many requests. Please try again later.',
        retryAfter: timeToRefill
      },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit': '100',
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': (Date.now() + timeToRefill * 1000).toString(),
          'Retry-After': timeToRefill.toString()
        }
      }
    );
  }
  
  // Process request
  const body = await request.json();
  
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const remainingTokens = apiLimiter.getRemainingTokens(key);
  
  return NextResponse.json(
    {
      success: true,
      message: 'Request processed successfully',
      data: body,
      timestamp: new Date().toISOString()
    },
    {
      headers: {
        'X-RateLimit-Limit': '100',
        'X-RateLimit-Remaining': remainingTokens.toString(),
        'X-RateLimit-Reset': (Date.now() + 60000).toString()
      }
    }
  );
}

// Rate limit status endpoint
export async function GET(request: NextRequest) {
  const ip = request.ip || 'unknown';
  const userAgent = request.headers.get('user-agent') || 'unknown';
  const key = \`\${ip}:\${userAgent}\`;
  
  const remainingTokens = apiLimiter.getRemainingTokens(key);
  const timeToRefill = apiLimiter.getTimeToRefill(key);
  
  return NextResponse.json({
    limit: 100,
    remaining: remainingTokens,
    resetTime: Date.now() + timeToRefill * 1000,
    retryAfter: timeToRefill
  });
}`
};

export default function RateLimitingPage() {
  const [selectedStrategy, setSelectedStrategy] = useState(0);
  const [selectedAttack, setSelectedAttack] = useState(0);
  const [selectedCode, setSelectedCode] = useState<keyof typeof implementationExamples>('middleware');
  const [isSimulating, setIsSimulating] = useState(false);
  const [requestCount, setRequestCount] = useState(0);
  const [blockedCount, setBlockedCount] = useState(0);
  const [currentRate, setCurrentRate] = useState(0);
  const [tokens, setTokens] = useState(100);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isSimulating) {
      interval = setInterval(() => {
        // Simulate incoming requests
        const newRequests = Math.floor(Math.random() * 10) + 1;
        setRequestCount(prev => prev + newRequests);
        setCurrentRate(newRequests * 6); // requests per minute
        
        // Simulate token bucket
        setTokens(prev => {
          const newTokens = Math.min(100, prev + 2); // refill 2 tokens
          if (newRequests > newTokens) {
            setBlockedCount(prevBlocked => prevBlocked + (newRequests - newTokens));
            return 0;
          }
          return newTokens - newRequests;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSimulating]);

  const resetSimulation = () => {
    setRequestCount(0);
    setBlockedCount(0);
    setCurrentRate(0);
    setTokens(100);
    setIsSimulating(false);
  };

  const getComplexityColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300';
      case 'high': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getPerformanceColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300';
      case 'low': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300';
      case 'high': return 'text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-300';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300';
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
    }
  };

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
              <Clock className="h-8 w-8" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
              Rate Limiting
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Proteja sua aplicação contra ataques DDoS e abuso de recursos com 
            implementações inteligentes de controle de taxa de requisições.
          </p>
        </motion.div>

        {/* Rate Limiting Demo */}
        <DemoSection title="Simulação em Tempo Real" description="Visualize como o rate limiting funciona na prática">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="grid lg:grid-cols-3 gap-1.5">
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Token Bucket Simulator
                  </h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setIsSimulating(!isSimulating)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        isSimulating 
                          ? 'bg-red-600 text-white hover:bg-red-700' 
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {isSimulating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      <span>{isSimulating ? 'Pausar' : 'Iniciar'}</span>
                    </button>
                    <button
                      onClick={resetSimulation}
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <RefreshCw className="h-4 w-4" />
                      <span>Reset</span>
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {requestCount}
                    </div>
                    <div className="text-sm text-blue-700 dark:text-blue-300">
                      Total Requests
                    </div>
                  </div>
                  
                  <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                      {blockedCount}
                    </div>
                    <div className="text-sm text-red-700 dark:text-red-300">
                      Blocked
                    </div>
                  </div>
                  
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {currentRate}
                    </div>
                    <div className="text-sm text-green-700 dark:text-green-300">
                      Req/Min
                    </div>
                  </div>
                  
                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {tokens}
                    </div>
                    <div className="text-sm text-purple-700 dark:text-purple-300">
                      Tokens
                    </div>
                  </div>
                </div>
                
                {/* Token Bucket Visualization */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                    Token Bucket (Capacity: 100)
                  </h4>
                  <div className="relative">
                    <div className="w-full h-8 bg-gray-200 dark:bg-gray-600 rounded-lg overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500 ease-out"
                        style={{ width: `${tokens}%` }}
                      ></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center text-sm font-medium text-gray-700 dark:text-gray-300">
                      {tokens}/100 tokens
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                    Refill Rate: 2 tokens/second • Bucket refills automatically
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-4">
                  Rate Limit Status
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-green-700 dark:text-green-300">Rate Limiting</span>
                    </div>
                    <span className="text-green-600 dark:text-green-400 text-sm font-medium">
                      {isSimulating ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-center">
                      <Activity className="h-5 w-5 text-blue-500 mr-2" />
                      <span className="text-blue-700 dark:text-blue-300">Algorithm</span>
                    </div>
                    <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                      Token Bucket
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="flex items-center">
                      <Target className="h-5 w-5 text-purple-500 mr-2" />
                      <span className="text-purple-700 dark:text-purple-300">Success Rate</span>
                    </div>
                    <span className="text-purple-600 dark:text-purple-400 text-sm font-medium">
                      {requestCount > 0 ? Math.round(((requestCount - blockedCount) / requestCount) * 100) : 100}%
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 text-yellow-500 mr-2" />
                      <span className="text-yellow-700 dark:text-yellow-300">Protection</span>
                    </div>
                    <span className="text-yellow-600 dark:text-yellow-400 text-sm font-medium">
                      {blockedCount > 0 ? 'Blocking' : 'Monitoring'}
                    </span>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Current Configuration:
                  </div>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Limit: 100 requests/minute</li>
                    <li>• Bucket capacity: 100 tokens</li>
                    <li>• Refill rate: 2 tokens/second</li>
                    <li>• Algorithm: Token bucket</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </DemoSection>

        {/* Rate Limiting Strategies */}
        <DemoSection title="Estratégias de Rate Limiting" description="Diferentes algoritmos e suas características">
          <div className="grid md:grid-cols-2 gap-1.5">
            {rateLimitingStrategies.map((strategy, index) => (
              <motion.div
                key={strategy.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {strategy.name}
                  </h3>
                  <div className="flex space-x-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getComplexityColor(strategy.complexity)}`}>
                      {strategy.complexity}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getPerformanceColor(strategy.performance)}`}>
                      {strategy.performance}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {strategy.description}
                </p>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Algorithm:
                    </span>
                    <span className="text-sm text-blue-600 dark:text-blue-400">
                      {strategy.algorithm}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Use Case:
                    </span>
                    <span className="text-sm text-purple-600 dark:text-purple-400">
                      {strategy.useCase}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-green-700 dark:text-green-300 mb-2">
                      Vantagens:
                    </h4>
                    <ul className="space-y-1">
                      {strategy.pros.map((pro, idx) => (
                        <li key={idx} className="text-xs text-green-600 dark:text-green-400 flex items-center">
                          <CheckCircle className="h-3 w-3 mr-1 flex-shrink-0" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-red-700 dark:text-red-300 mb-2">
                      Desvantagens:
                    </h4>
                    <ul className="space-y-1">
                      {strategy.cons.map((con, idx) => (
                        <li key={idx} className="text-xs text-red-600 dark:text-red-400 flex items-center">
                          <XCircle className="h-3 w-3 mr-1 flex-shrink-0" />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </DemoSection>

        {/* Attack Types */}
        <DemoSection title="Tipos de Ataques" description="Ameaças que o rate limiting pode prevenir">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8 px-6 overflow-x-auto">
                {attackTypes.map((attack, index) => (
                  <button
                    key={attack.name}
                    onClick={() => setSelectedAttack(index)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                      selectedAttack === index
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    {attack.name}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="p-6">
              <div className="grid lg:grid-cols-2 gap-1.5">
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {attackTypes[selectedAttack].name}
                    </h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(attackTypes[selectedAttack].severity)}`}>
                      {attackTypes[selectedAttack].severity.toUpperCase()}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {attackTypes[selectedAttack].description}
                  </p>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <h4 className="font-medium text-red-900 dark:text-red-300 mb-2">
                        Impacto:
                      </h4>
                      <p className="text-red-700 dark:text-red-400 text-sm">
                        {attackTypes[selectedAttack].impact}
                      </p>
                    </div>
                    
                    <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <h4 className="font-medium text-yellow-900 dark:text-yellow-300 mb-2">
                        Indicadores:
                      </h4>
                      <ul className="space-y-1">
                        {attackTypes[selectedAttack].indicators.map((indicator, idx) => (
                          <li key={idx} className="text-yellow-700 dark:text-yellow-400 text-sm flex items-center">
                            <AlertTriangle className="h-3 w-3 mr-2 flex-shrink-0" />
                            {indicator}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Estratégias de Mitigação
                  </h4>
                  <div className="space-y-3">
                    {attackTypes[selectedAttack].mitigation.map((strategy, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <Shield className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-green-700 dark:text-green-300">{strategy}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DemoSection>

        {/* Implementation Examples */}
        <DemoSection title="Exemplos de Implementação" description="Código prático para implementar rate limiting">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8 px-6 overflow-x-auto">
                {Object.keys(implementationExamples).map((key) => (
                  <button
                    key={key}
                    onClick={() => setSelectedCode(key as keyof typeof implementationExamples)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                      selectedCode === key
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {selectedCode.charAt(0).toUpperCase() + selectedCode.slice(1)} Implementation
                </h3>
                <button
                  onClick={() => navigator.clipboard.writeText(implementationExamples[selectedCode])}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 dark:text-blue-400"
                >
                  <Copy className="h-4 w-4" />
                  <span className="text-sm">Copiar</span>
                </button>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-gray-300">
                  <code>{implementationExamples[selectedCode]}</code>
                </pre>
              </div>
            </div>
          </div>
        </DemoSection>

        {/* Best Practices */}
        <DemoSection title="Melhores Práticas" description="Diretrizes para implementação efetiva">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <div className="grid md:grid-cols-3 gap-1.5">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Settings className="h-5 w-5 mr-2 text-blue-500" />
                  Configuração
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Defina limites apropriados por endpoint</li>
                  <li>• Use diferentes limites para usuários autenticados</li>
                  <li>• Implemente whitelist para IPs confiáveis</li>
                  <li>• Configure headers informativos</li>
                  <li>• Use Redis para estado distribuído</li>
                  <li>• Monitore métricas de performance</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-green-500" />
                  Segurança
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Combine múltiplas estratégias</li>
                  <li>• Implemente rate limiting por usuário</li>
                  <li>• Use CAPTCHA para casos suspeitos</li>
                  <li>• Configure alertas automáticos</li>
                  <li>• Mantenha logs detalhados</li>
                  <li>• Teste regularmente a efetividade</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-purple-500" />
                  Performance
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Otimize algoritmos para baixa latência</li>
                  <li>• Use cache para contadores</li>
                  <li>• Implemente cleanup automático</li>
                  <li>• Configure TTL apropriado</li>
                  <li>• Monitore uso de memória</li>
                  <li>• Teste sob carga alta</li>
                </ul>
              </div>
            </div>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}