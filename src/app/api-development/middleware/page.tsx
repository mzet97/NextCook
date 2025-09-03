'use client';

import { motion } from 'framer-motion';
import { 
  Shield, 
  Clock, 
  Globe, 
  Key, 
  FileText, 
  AlertTriangle,
  CheckCircle,
  Zap,
  Lock,
  Activity
} from 'lucide-react';
import { DemoSection } from '@/components/DemoSection';
import { CodeBlock } from '@/components/CodeBlock';
import Breadcrumbs from '@/components/Breadcrumbs';
import { DemoCardStatic } from '@/components/DemoCardStatic';

const middlewareTypes = [
  {
    title: 'Autenticação',
    description: 'Verificar tokens JWT e sessões',
    icon: Key,
    color: 'blue'
  },
  {
    title: 'CORS',
    description: 'Configurar Cross-Origin Resource Sharing',
    icon: Globe,
    color: 'green'
  },
  {
    title: 'Rate Limiting',
    description: 'Limitar requisições por IP/usuário',
    icon: Clock,
    color: 'orange'
  },
  {
    title: 'Logging',
    description: 'Registrar requisições e respostas',
    icon: FileText,
    color: 'purple'
  },
  {
    title: 'Validação',
    description: 'Validar headers e dados de entrada',
    icon: CheckCircle,
    color: 'indigo'
  },
  {
    title: 'Segurança',
    description: 'Headers de segurança e proteções',
    icon: Shield,
    color: 'red'
  }
];

const securityHeaders = [
  {
    header: 'X-Content-Type-Options',
    value: 'nosniff',
    description: 'Previne MIME type sniffing'
  },
  {
    header: 'X-Frame-Options',
    value: 'DENY',
    description: 'Previne clickjacking'
  },
  {
    header: 'X-XSS-Protection',
    value: '1; mode=block',
    description: 'Ativa proteção XSS do browser'
  },
  {
    header: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains',
    description: 'Força HTTPS'
  }
];

export default function MiddlewarePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <Breadcrumbs />
        
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🛡️ Middleware para APIs
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Aprenda a implementar middleware para autenticação, CORS, rate limiting,
            logging e segurança em suas APIs Next.js.
          </p>
        </motion.div>

        <DemoSection title="Tipos de Middleware">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {middlewareTypes.map((middleware, index) => {
              const IconComponent = middleware.icon;
              return (
                <motion.div
                  key={middleware.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <DemoCardStatic
                    title={middleware.title}
                    description={middleware.description}
                    icon={<IconComponent className="w-6 h-6" />}
                    color={middleware.color}
                  />
                </motion.div>
              );
            })}
          </div>
        </DemoSection>

        <DemoSection title="Middleware Global - middleware.ts">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Configuração Básica</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                O arquivo <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">middleware.ts</code> na raiz do projeto executa antes de todas as requisições.
              </p>
              <CodeBlock
                language="typescript"
                code={`// middleware.ts (na raiz do projeto)
import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from './lib/auth';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Adicionar headers de segurança
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  
  // CORS para APIs
  if (request.nextUrl.pathname.startsWith('/api/')) {
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS'
    );
    response.headers.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization'
    );
    
    // Responder a requisições OPTIONS
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 200, headers: response.headers });
    }
  }
  
  // Autenticação para rotas protegidas
  if (request.nextUrl.pathname.startsWith('/api/protected/')) {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json(
        { error: 'Token de autorização necessário' },
        { status: 401 }
      );
    }
    
    try {
      const payload = await verifyJWT(token);
      // Adicionar dados do usuário aos headers para uso nas rotas
      response.headers.set('x-user-id', payload.userId.toString());
      response.headers.set('x-user-role', payload.role);
    } catch (error) {
      return NextResponse.json(
        { error: 'Token inválido' },
        { status: 401 }
      );
    }
  }
  
  return response;
}

// Configurar quais rotas o middleware deve executar
export const config = {
  matcher: [
    '/api/:path*',
    '/dashboard/:path*',
    '/admin/:path*'
  ]
};`}
              />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Matcher Avançado</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Use matchers para controlar exatamente onde o middleware executa.
              </p>
              <CodeBlock
                language="typescript"
                code={`// Configurações avançadas de matcher
export const config = {
  matcher: [
    // Executar em todas as rotas de API exceto auth
    '/((?!api/auth|_next/static|_next/image|favicon.ico).*)',
    
    // Executar apenas em rotas específicas
    '/api/users/:path*',
    '/api/posts/:path*',
    
    // Executar em rotas que começam com /dashboard
    '/dashboard/:path*',
    
    // Executar em rotas admin (exceto login)
    '/admin/((?!login).*)',
    
    // Usar regex para padrões complexos
    {
      source: '/api/(.*)',
      has: [
        {
          type: 'header',
          key: 'authorization'
        }
      ]
    }
  ]
};

// Middleware condicional
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Diferentes lógicas para diferentes rotas
  if (pathname.startsWith('/api/public/')) {
    return handlePublicAPI(request);
  }
  
  if (pathname.startsWith('/api/admin/')) {
    return handleAdminAPI(request);
  }
  
  if (pathname.startsWith('/api/')) {
    return handleProtectedAPI(request);
  }
  
  return NextResponse.next();
}`}
              />
            </div>
          </div>
        </DemoSection>

        <DemoSection title="Middleware de Autenticação">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">JWT Authentication</h3>
              <CodeBlock
                language="typescript"
                code={`// lib/auth-middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

interface JWTPayload {
  userId: number;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export async function authMiddleware(
  request: NextRequest,
  requiredRole?: string
) {
  try {
    // Extrair token do header Authorization
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Token de autorização necessário' },
        { status: 401 }
      );
    }
    
    const token = authHeader.substring(7); // Remove 'Bearer '
    
    // Verificar e decodificar token
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JWTPayload;
    
    // Verificar se token não expirou
    if (payload.exp < Date.now() / 1000) {
      return NextResponse.json(
        { error: 'Token expirado' },
        { status: 401 }
      );
    }
    
    // Verificar role se necessário
    if (requiredRole && payload.role !== requiredRole) {
      return NextResponse.json(
        { error: 'Permissão insuficiente' },
        { status: 403 }
      );
    }
    
    // Adicionar dados do usuário aos headers
    const response = NextResponse.next();
    response.headers.set('x-user-id', payload.userId.toString());
    response.headers.set('x-user-email', payload.email);
    response.headers.set('x-user-role', payload.role);
    
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: 'Token inválido' },
      { status: 401 }
    );
  }
}

// Uso em route handlers
// app/api/protected/users/route.ts
export async function GET(request: NextRequest) {
  // Dados do usuário já estão nos headers
  const userId = request.headers.get('x-user-id');
  const userRole = request.headers.get('x-user-role');
  
  // Lógica da rota...
}`}
              />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Session-based Auth</h3>
              <CodeBlock
                language="typescript"
                code={`// lib/session-middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from './session';

export async function sessionMiddleware(request: NextRequest) {
  try {
    // Extrair session ID do cookie
    const sessionId = request.cookies.get('session-id')?.value;
    
    if (!sessionId) {
      return NextResponse.json(
        { error: 'Sessão não encontrada' },
        { status: 401 }
      );
    }
    
    // Buscar sessão no banco/cache
    const session = await getSession(sessionId);
    
    if (!session || session.expiresAt < new Date()) {
      return NextResponse.json(
        { error: 'Sessão expirada' },
        { status: 401 }
      );
    }
    
    // Renovar sessão se próxima do vencimento
    const now = new Date();
    const timeUntilExpiry = session.expiresAt.getTime() - now.getTime();
    const oneHour = 60 * 60 * 1000;
    
    if (timeUntilExpiry < oneHour) {
      await renewSession(sessionId);
    }
    
    // Adicionar dados da sessão aos headers
    const response = NextResponse.next();
    response.headers.set('x-user-id', session.userId.toString());
    response.headers.set('x-session-id', sessionId);
    
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro de autenticação' },
      { status: 500 }
    );
  }
}

// Função para renovar sessão
async function renewSession(sessionId: string) {
  const newExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h
  await updateSessionExpiry(sessionId, newExpiresAt);
}`}
              />
            </div>
          </div>
        </DemoSection>

        <DemoSection title="CORS Middleware">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Configuração Básica</h3>
              <CodeBlock
                language="typescript"
                code={`// lib/cors-middleware.ts
import { NextRequest, NextResponse } from 'next/server';

interface CORSOptions {
  origin?: string | string[] | boolean;
  methods?: string[];
  allowedHeaders?: string[];
  credentials?: boolean;
  maxAge?: number;
}

export function corsMiddleware(options: CORSOptions = {}) {
  return (request: NextRequest) => {
    const {
      origin = '*',
      methods = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders = ['Content-Type', 'Authorization'],
      credentials = false,
      maxAge = 86400 // 24 horas
    } = options;
    
    const response = NextResponse.next();
    
    // Verificar origem
    const requestOrigin = request.headers.get('origin');
    
    if (origin === '*') {
      response.headers.set('Access-Control-Allow-Origin', '*');
    } else if (typeof origin === 'string') {
      if (requestOrigin === origin) {
        response.headers.set('Access-Control-Allow-Origin', origin);
      }
    } else if (Array.isArray(origin)) {
      if (requestOrigin && origin.includes(requestOrigin)) {
        response.headers.set('Access-Control-Allow-Origin', requestOrigin);
      }
    }
    
    // Configurar outros headers CORS
    response.headers.set('Access-Control-Allow-Methods', methods.join(', '));
    response.headers.set('Access-Control-Allow-Headers', allowedHeaders.join(', '));
    response.headers.set('Access-Control-Max-Age', maxAge.toString());
    
    if (credentials) {
      response.headers.set('Access-Control-Allow-Credentials', 'true');
    }
    
    // Responder a requisições OPTIONS (preflight)
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: response.headers
      });
    }
    
    return response;
  };
}`}
              />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Configuração Avançada</h3>
              <CodeBlock
                language="typescript"
                code={`// middleware.ts
import { corsMiddleware } from './lib/cors-middleware';

// Configuração específica por ambiente
const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? ['https://meusite.com', 'https://app.meusite.com']
    : ['http://localhost:3000', 'http://localhost:3001'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'X-API-Key'
  ],
  credentials: true,
  maxAge: 86400
};

export async function middleware(request: NextRequest) {
  // Aplicar CORS apenas para rotas de API
  if (request.nextUrl.pathname.startsWith('/api/')) {
    return corsMiddleware(corsOptions)(request);
  }
  
  return NextResponse.next();
}

// Configuração dinâmica baseada na rota
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  if (pathname.startsWith('/api/public/')) {
    // CORS mais permissivo para APIs públicas
    return corsMiddleware({
      origin: '*',
      methods: ['GET', 'POST'],
      credentials: false
    })(request);
  }
  
  if (pathname.startsWith('/api/admin/')) {
    // CORS restritivo para APIs admin
    return corsMiddleware({
      origin: ['https://admin.meusite.com'],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true
    })(request);
  }
  
  return NextResponse.next();
}`}
              />
            </div>
          </div>
        </DemoSection>

        <DemoSection title="Rate Limiting">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Rate Limiting Simples</h3>
              <CodeBlock
                language="typescript"
                code={`// lib/rate-limit.ts
import { NextRequest, NextResponse } from 'next/server';

// Armazenar contadores em memória (use Redis em produção)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

interface RateLimitOptions {
  maxRequests: number;
  windowMs: number;
  keyGenerator?: (request: NextRequest) => string;
}

export function rateLimit(options: RateLimitOptions) {
  const {
    maxRequests,
    windowMs,
    keyGenerator = (req) => getClientIP(req)
  } = options;
  
  return (request: NextRequest) => {
    const key = keyGenerator(request);
    const now = Date.now();
    const windowStart = now - windowMs;
    
    // Limpar entradas expiradas
    for (const [k, v] of rateLimitMap.entries()) {
      if (v.resetTime < now) {
        rateLimitMap.delete(k);
      }
    }
    
    // Obter ou criar entrada para a chave
    let entry = rateLimitMap.get(key);
    
    if (!entry || entry.resetTime < now) {
      entry = {
        count: 1,
        resetTime: now + windowMs
      };
      rateLimitMap.set(key, entry);
    } else {
      entry.count++;
    }
    
    // Verificar se excedeu o limite
    if (entry.count > maxRequests) {
      const resetTime = Math.ceil((entry.resetTime - now) / 1000);
      
      return NextResponse.json(
        {
          error: 'Muitas requisições',
          retryAfter: resetTime
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': maxRequests.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': entry.resetTime.toString(),
            'Retry-After': resetTime.toString()
          }
        }
      );
    }
    
    // Adicionar headers informativos
    const response = NextResponse.next();
    response.headers.set('X-RateLimit-Limit', maxRequests.toString());
    response.headers.set('X-RateLimit-Remaining', (maxRequests - entry.count).toString());
    response.headers.set('X-RateLimit-Reset', entry.resetTime.toString());
    
    return response;
  };
}

function getClientIP(request: NextRequest): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0] ||
         request.headers.get('x-real-ip') ||
         request.ip ||
         'unknown';
}`}
              />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Rate Limiting com Redis</h3>
              <CodeBlock
                language="typescript"
                code={`// lib/redis-rate-limit.ts
import { NextRequest, NextResponse } from 'next/server';
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL!);

export async function redisRateLimit(
  request: NextRequest,
  options: {
    maxRequests: number;
    windowMs: number;
    keyPrefix?: string;
  }
) {
  const { maxRequests, windowMs, keyPrefix = 'rate_limit' } = options;
  const clientIP = getClientIP(request);
  const key = \`\${keyPrefix}:\${clientIP}\`;
  
  try {
    // Usar pipeline para operações atômicas
    const pipeline = redis.pipeline();
    pipeline.incr(key);
    pipeline.expire(key, Math.ceil(windowMs / 1000));
    
    const results = await pipeline.exec();
    const count = results?.[0]?.[1] as number;
    
    if (count > maxRequests) {
      const ttl = await redis.ttl(key);
      
      return NextResponse.json(
        {
          error: 'Rate limit exceeded',
          retryAfter: ttl
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': maxRequests.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': (Date.now() + ttl * 1000).toString(),
            'Retry-After': ttl.toString()
          }
        }
      );
    }
    
    const response = NextResponse.next();
    response.headers.set('X-RateLimit-Limit', maxRequests.toString());
    response.headers.set('X-RateLimit-Remaining', (maxRequests - count).toString());
    
    return response;
  } catch (error) {
    console.error('Redis rate limit error:', error);
    // Falhar de forma segura - permitir requisição
    return NextResponse.next();
  }
}

// Uso no middleware
export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/')) {
    return await redisRateLimit(request, {
      maxRequests: 100,
      windowMs: 15 * 60 * 1000 // 15 minutos
    });
  }
  
  return NextResponse.next();
}`}
              />
            </div>
          </div>
        </DemoSection>

        <DemoSection title="Logging Middleware">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Request Logging</h3>
              <CodeBlock
                language="typescript"
                code={`// lib/logging-middleware.ts
import { NextRequest, NextResponse } from 'next/server';

interface LogEntry {
  timestamp: string;
  method: string;
  url: string;
  userAgent?: string;
  ip: string;
  duration: number;
  status: number;
  userId?: string;
}

export function loggingMiddleware(request: NextRequest) {
  const startTime = Date.now();
  
  // Interceptar a resposta para capturar o status
  const originalNext = NextResponse.next;
  
  return new Promise<NextResponse>((resolve) => {
    const response = originalNext();
    
    // Log da requisição
    const logEntry: LogEntry = {
      timestamp: new Date().toISOString(),
      method: request.method,
      url: request.url,
      userAgent: request.headers.get('user-agent') || undefined,
      ip: getClientIP(request),
      duration: Date.now() - startTime,
      status: response.status,
      userId: request.headers.get('x-user-id') || undefined
    };
    
    // Enviar log (async, não bloquear resposta)
    logRequest(logEntry).catch(console.error);
    
    resolve(response);
  });
}

async function logRequest(entry: LogEntry) {
  // Salvar no banco de dados
  await saveLogToDB(entry);
  
  // Ou enviar para serviço de logging
  if (process.env.LOG_SERVICE_URL) {
    await fetch(process.env.LOG_SERVICE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry)
    });
  }
  
  // Log estruturado no console
  console.log(JSON.stringify({
    level: 'info',
    message: 'API Request',
    ...entry
  }));
}`}
              />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Error Logging</h3>
              <CodeBlock
                language="typescript"
                code={`// lib/error-logging.ts
import { NextRequest, NextResponse } from 'next/server';

export function errorLoggingMiddleware(request: NextRequest) {
  try {
    const response = NextResponse.next();
    
    // Interceptar erros 4xx e 5xx
    if (response.status >= 400) {
      logError({
        timestamp: new Date().toISOString(),
        method: request.method,
        url: request.url,
        status: response.status,
        ip: getClientIP(request),
        userAgent: request.headers.get('user-agent'),
        userId: request.headers.get('x-user-id')
      });
    }
    
    return response;
  } catch (error) {
    // Log de erros não capturados
    logError({
      timestamp: new Date().toISOString(),
      method: request.method,
      url: request.url,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      ip: getClientIP(request)
    });
    
    // Retornar erro genérico
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function logError(errorData: any) {
  // Log estruturado
  console.error(JSON.stringify({
    level: 'error',
    message: 'API Error',
    ...errorData
  }));
  
  // Enviar para serviço de monitoramento
  if (process.env.ERROR_TRACKING_URL) {
    try {
      await fetch(process.env.ERROR_TRACKING_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(errorData)
      });
    } catch (err) {
      console.error('Failed to send error to tracking service:', err);
    }
  }
}`}
              />
            </div>
          </div>
        </DemoSection>

        <DemoSection title="Headers de Segurança">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Headers Essenciais</h3>
              <div className="space-y-4">
                {securityHeaders.map((header, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{header.header}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{header.description}</p>
                    <code className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      {header.value}
                    </code>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Implementação</h3>
              <CodeBlock
                language="typescript"
                code={`// lib/security-headers.ts
import { NextResponse } from 'next/server';

export function addSecurityHeaders(response: NextResponse) {
  // Prevenir MIME type sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff');
  
  // Prevenir clickjacking
  response.headers.set('X-Frame-Options', 'DENY');
  
  // Ativar proteção XSS do browser
  response.headers.set('X-XSS-Protection', '1; mode=block');
  
  // Forçar HTTPS
  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload'
    );
  }
  
  // Content Security Policy
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"
  );
  
  // Referrer Policy
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Permissions Policy
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()'
  );
  
  return response;
}

// middleware.ts
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  return addSecurityHeaders(response);
}`}
              />
            </div>
          </div>
        </DemoSection>

        <DemoSection title="Middleware Composto">
          <CodeBlock
            language="typescript"
            code={`// middleware.ts - Combinando múltiplos middlewares
import { NextRequest, NextResponse } from 'next/server';
import { authMiddleware } from './lib/auth-middleware';
import { corsMiddleware } from './lib/cors-middleware';
import { rateLimit } from './lib/rate-limit';
import { loggingMiddleware } from './lib/logging-middleware';
import { addSecurityHeaders } from './lib/security-headers';

// Função para compor middlewares
function compose(...middlewares: Array<(req: NextRequest) => NextResponse | Promise<NextResponse>>) {
  return async (request: NextRequest) => {
    let response = NextResponse.next();
    
    for (const middleware of middlewares) {
      const result = await middleware(request);
      if (result.status !== 200 && result.status !== 204) {
        return result; // Parar na primeira falha
      }
      response = result;
    }
    
    return response;
  };
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Aplicar logging a todas as requisições
  const loggedResponse = await loggingMiddleware(request);
  if (loggedResponse.status >= 400) return loggedResponse;
  
  // Headers de segurança para todas as rotas
  const secureResponse = addSecurityHeaders(NextResponse.next());
  
  // Middleware específico para APIs
  if (pathname.startsWith('/api/')) {
    // CORS para todas as APIs
    const corsResponse = corsMiddleware({
      origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
      credentials: true
    })(request);
    
    if (corsResponse.status !== 200) return corsResponse;
    
    // Rate limiting para APIs públicas
    if (pathname.startsWith('/api/public/')) {
      return rateLimit({
        maxRequests: 100,
        windowMs: 15 * 60 * 1000 // 15 minutos
      })(request);
    }
    
    // Autenticação para APIs protegidas
    if (pathname.startsWith('/api/protected/')) {
      return authMiddleware(request);
    }
    
    // Autenticação admin para APIs admin
    if (pathname.startsWith('/api/admin/')) {
      return authMiddleware(request, 'admin');
    }
  }
  
  return secureResponse;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ]
};

// Alternativa usando compose
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  if (pathname.startsWith('/api/protected/')) {
    return compose(
      loggingMiddleware,
      (req) => corsMiddleware({ credentials: true })(req),
      (req) => rateLimit({ maxRequests: 50, windowMs: 60000 })(req),
      authMiddleware,
      (req) => addSecurityHeaders(NextResponse.next())
    )(request);
  }
  
  if (pathname.startsWith('/api/')) {
    return compose(
      loggingMiddleware,
      (req) => corsMiddleware({})(req),
      (req) => rateLimit({ maxRequests: 100, windowMs: 60000 })(req),
      (req) => addSecurityHeaders(NextResponse.next())
    )(request);
  }
  
  return addSecurityHeaders(NextResponse.next());
}`}
          />
        </DemoSection>

        <DemoSection title="Melhores Práticas">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4">💡 Dicas Importantes</h3>
            <ul className="space-y-2 text-blue-700 dark:text-blue-300">
              <li>• <strong>Performance:</strong> Middleware executa em todas as requisições - mantenha-o leve</li>
              <li>• <strong>Ordem:</strong> A ordem dos middlewares importa - autenticação antes de autorização</li>
              <li>• <strong>Caching:</strong> Use Redis ou similar para rate limiting em produção</li>
              <li>• <strong>Logging:</strong> Não bloqueie requisições com logging síncrono</li>
              <li>• <strong>Segurança:</strong> Sempre adicione headers de segurança</li>
              <li>• <strong>CORS:</strong> Configure origins específicos em produção</li>
              <li>• <strong>Rate Limiting:</strong> Implemente limites diferentes por tipo de usuário</li>
              <li>• <strong>Monitoramento:</strong> Monitore performance e erros do middleware</li>
              <li>• <strong>Fallback:</strong> Tenha estratégias de fallback para falhas de middleware</li>
              <li>• <strong>Testing:</strong> Teste middleware isoladamente e em conjunto</li>
            </ul>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}