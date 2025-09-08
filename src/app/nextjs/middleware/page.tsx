'use client';

import { useState } from 'react';
import CodeBlock from '@/components/CodeBlock';
import DemoSection from '@/components/DemoSection';

// Simulação de diferentes cenários de middleware
function MiddlewareSimulator() {
  const [selectedScenario, setSelectedScenario] = useState('auth');
  const [simulationResult, setSimulationResult] = useState<any>(null);

  const scenarios = {
    auth: {
      name: 'Autenticação',
      description: 'Verificar se usuário está logado antes de acessar páginas protegidas',
      paths: ['/dashboard', '/profile', '/admin'],
      action: 'Redirect para /login se não autenticado'
    },
    geolocation: {
      name: 'Geolocalização',
      description: 'Redirecionar usuários baseado na localização geográfica',
      paths: ['/'],
      action: 'Redirect para /pt-br ou /en-us baseado no país'
    },
    ratelimit: {
      name: 'Rate Limiting',
      description: 'Limitar número de requisições por IP',
      paths: ['/api/*'],
      action: 'Retornar 429 se exceder limite'
    },
    maintenance: {
      name: 'Manutenção',
      description: 'Mostrar página de manutenção quando necessário',
      paths: ['/*'],
      action: 'Redirect para /maintenance se ativo'
    },
    abtest: {
      name: 'A/B Testing',
      description: 'Dividir tráfego entre diferentes versões',
      paths: ['/landing'],
      action: 'Rewrite para /landing-a ou /landing-b'
    },
    bot: {
      name: 'Bot Detection',
      description: 'Detectar e tratar requisições de bots',
      paths: ['/*'],
      action: 'Servir versão otimizada para bots'
    }
  };

  const simulateMiddleware = (scenario: string) => {
    const config = scenarios[scenario as keyof typeof scenarios];
    
    // Simular diferentes resultados baseado no cenário
    let result;
    
    switch (scenario) {
      case 'auth':
        const isAuthenticated = Math.random() > 0.5;
        result = {
          status: isAuthenticated ? 'allowed' : 'redirect',
          message: isAuthenticated ? 'Usuário autenticado - acesso permitido' : 'Usuário não autenticado - redirecionando para /login',
          headers: isAuthenticated ? { 'x-user-id': '123' } : {},
          redirect: isAuthenticated ? null : '/login'
        };
        break;
        
      case 'geolocation':
        const countries = ['BR', 'US', 'UK', 'FR'];
        const country = countries[Math.floor(Math.random() * countries.length)];
        const locale = country === 'BR' ? 'pt-br' : 'en-us';
        result = {
          status: 'rewrite',
          message: `Usuário do ${country} - redirecionando para versão ${locale}`,
          headers: { 'x-country': country, 'x-locale': locale },
          rewrite: `/${locale}`
        };
        break;
        
      case 'ratelimit':
        const requestCount = Math.floor(Math.random() * 150);
        const limit = 100;
        result = {
          status: requestCount > limit ? 'blocked' : 'allowed',
          message: requestCount > limit ? `Rate limit excedido (${requestCount}/${limit})` : `Requisição permitida (${requestCount}/${limit})`,
          headers: {
            'x-ratelimit-limit': limit.toString(),
            'x-ratelimit-remaining': Math.max(0, limit - requestCount).toString()
          }
        };
        break;
        
      case 'maintenance':
        const isMaintenanceMode = Math.random() > 0.7;
        result = {
          status: isMaintenanceMode ? 'maintenance' : 'allowed',
          message: isMaintenanceMode ? 'Modo manutenção ativo - mostrando página de manutenção' : 'Sistema operando normalmente',
          headers: { 'x-maintenance': isMaintenanceMode.toString() },
          redirect: isMaintenanceMode ? '/maintenance' : null
        };
        break;
        
      case 'abtest':
        const variant = Math.random() > 0.5 ? 'A' : 'B';
        result = {
          status: 'rewrite',
          message: `Usuário direcionado para variante ${variant}`,
          headers: { 'x-variant': variant },
          rewrite: `/landing-${variant.toLowerCase()}`
        };
        break;
        
      case 'bot':
        const isBot = Math.random() > 0.8;
        result = {
          status: isBot ? 'bot' : 'human',
          message: isBot ? 'Bot detectado - servindo versão otimizada' : 'Usuário humano - versão normal',
          headers: { 'x-is-bot': isBot.toString() },
          rewrite: isBot ? '/bot-optimized' : null
        };
        break;
        
      default:
        result = { status: 'unknown', message: 'Cenário não reconhecido' };
    }
    
    setSimulationResult(result);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Cenários de Middleware</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {Object.entries(scenarios).map(([key, scenario]) => (
            <button
              key={key}
              onClick={() => setSelectedScenario(key)}
              className={`p-3 rounded-lg text-sm transition-colors ${
                selectedScenario === key
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {scenario.name}
            </button>
          ))}
        </div>
      </div>
      
      <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg border border-blue-300 dark:border-blue-700">
        <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
          {scenarios[selectedScenario as keyof typeof scenarios].name}
        </h4>
        <p className="text-blue-700 dark:text-blue-300 text-sm mb-3">
          {scenarios[selectedScenario as keyof typeof scenarios].description}
        </p>
        <div className="space-y-2 text-sm">
          <p className="text-blue-600 dark:text-blue-400">
            <strong>Paths:</strong> {scenarios[selectedScenario as keyof typeof scenarios].paths.join(', ')}
          </p>
          <p className="text-blue-600 dark:text-blue-400">
            <strong>Ação:</strong> {scenarios[selectedScenario as keyof typeof scenarios].action}
          </p>
        </div>
        
        <button
          onClick={() => simulateMiddleware(selectedScenario)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Simular Middleware
        </button>
      </div>
      
      {simulationResult && (
        <div className={`p-4 rounded-lg border ${
          simulationResult.status === 'allowed' || simulationResult.status === 'rewrite'
            ? 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700'
            : simulationResult.status === 'redirect' || simulationResult.status === 'maintenance'
            ? 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-300 dark:border-yellow-700'
            : 'bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700'
        }`}>
          <h4 className={`font-semibold mb-2 ${
            simulationResult.status === 'allowed' || simulationResult.status === 'rewrite'
              ? 'text-green-800 dark:text-green-200'
              : simulationResult.status === 'redirect' || simulationResult.status === 'maintenance'
              ? 'text-yellow-800 dark:text-yellow-200'
              : 'text-red-800 dark:text-red-200'
          }`}>
            Resultado da Simulação
          </h4>
          <p className={`mb-3 ${
            simulationResult.status === 'allowed' || simulationResult.status === 'rewrite'
              ? 'text-green-700 dark:text-green-300'
              : simulationResult.status === 'redirect' || simulationResult.status === 'maintenance'
              ? 'text-yellow-700 dark:text-yellow-300'
              : 'text-red-700 dark:text-red-300'
          }`}>
            {simulationResult.message}
          </p>
          
          {Object.keys(simulationResult.headers || {}).length > 0 && (
            <div className="mb-3">
              <p className="font-medium text-sm mb-1">Headers adicionados:</p>
              <pre className="text-xs bg-gray-800 text-gray-200 p-2 rounded overflow-x-auto">
                {JSON.stringify(simulationResult.headers, null, 2)}
              </pre>
            </div>
          )}
          
          {simulationResult.redirect && (
            <p className="text-sm">
              <strong>Redirect para:</strong> {simulationResult.redirect}
            </p>
          )}
          
          {simulationResult.rewrite && (
            <p className="text-sm">
              <strong>Rewrite para:</strong> {simulationResult.rewrite}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default function MiddlewarePage() {
  const basicMiddlewareCode = `// middleware.ts (na raiz do projeto)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Verificar autenticação
  const token = request.cookies.get('auth-token')?.value;
  
  // Páginas protegidas
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  // Adicionar headers customizados
  const response = NextResponse.next();
  response.headers.set('x-middleware', 'active');
  response.headers.set('x-pathname', request.nextUrl.pathname);
  
  return response;
}

// Configurar quais rotas o middleware deve executar
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    '/dashboard/:path*',
    '/admin/:path*'
  ]
};`;

  const advancedMiddlewareCode = `// middleware.ts - Middleware avançado
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rate limiting simples
const rateLimit = new Map();

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const userAgent = request.headers.get('user-agent') || '';
  const ip = request.ip || 'unknown';
  
  // 1. Rate Limiting
  if (pathname.startsWith('/api/')) {
    const key = \`\${ip}:\${pathname}\`;
    const now = Date.now();
    const windowMs = 60 * 1000; // 1 minuto
    const maxRequests = 100;
    
    const requests = rateLimit.get(key) || [];
    const validRequests = requests.filter((time: number) => now - time < windowMs);
    
    if (validRequests.length >= maxRequests) {
      return new NextResponse('Rate limit exceeded', { status: 429 });
    }
    
    validRequests.push(now);
    rateLimit.set(key, validRequests);
  }
  
  // 2. Geolocalização
  const country = request.geo?.country || 'US';
  const locale = country === 'BR' ? 'pt-br' : 'en-us';
  
  if (pathname === '/' && !pathname.includes(locale)) {
    return NextResponse.rewrite(new URL(\`/\${locale}\`, request.url));
  }
  
  // 3. A/B Testing
  if (pathname === '/landing') {
    const variant = request.cookies.get('ab-test')?.value || 
                   (Math.random() > 0.5 ? 'a' : 'b');
    
    const response = NextResponse.rewrite(
      new URL(\`/landing-\${variant}\`, request.url)
    );
    
    if (!request.cookies.get('ab-test')) {
      response.cookies.set('ab-test', variant, { maxAge: 60 * 60 * 24 * 30 });
    }
    
    return response;
  }
  
  // 4. Bot Detection
  const isBot = /bot|crawler|spider/i.test(userAgent);
  if (isBot && !pathname.startsWith('/api')) {
    return NextResponse.rewrite(new URL(\`/seo\${pathname}\`, request.url));
  }
  
  // 5. Maintenance Mode
  const isMaintenanceMode = process.env.MAINTENANCE_MODE === 'true';
  if (isMaintenanceMode && pathname !== '/maintenance') {
    return NextResponse.rewrite(new URL('/maintenance', request.url));
  }
  
  // 6. Headers customizados
  const response = NextResponse.next();
  response.headers.set('x-country', country);
  response.headers.set('x-locale', locale);
  response.headers.set('x-is-bot', isBot.toString());
  response.headers.set('x-ip', ip);
  
  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ]
};`;

  const authMiddlewareCode = `// middleware.ts - Autenticação
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Rotas públicas
  const publicPaths = ['/login', '/register', '/forgot-password'];
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }
  
  // Verificar token
  const token = request.cookies.get('auth-token')?.value;
  
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  const payload = await verifyToken(token);
  
  if (!payload) {
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('auth-token');
    return response;
  }
  
  // Verificar permissões
  if (pathname.startsWith('/admin') && payload.role !== 'admin') {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }
  
  // Adicionar informações do usuário aos headers
  const response = NextResponse.next();
  response.headers.set('x-user-id', payload.sub as string);
  response.headers.set('x-user-role', payload.role as string);
  
  return response;
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/admin/:path*',
    '/api/protected/:path*'
  ]
};`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 dark:from-gray-900 dark:to-gray-800 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-6">
            Middleware
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Demonstração do Middleware do Next.js 15.5.2 - código que executa antes das requisições chegarem às suas páginas e APIs.
          </p>
        </div>

        <div className="mb-12">
          <DemoSection title="Simulador de Middleware">
            <MiddlewareSimulator />
          </DemoSection>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">🛡️ Casos de Uso</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Segurança:</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Autenticação e autorização</li>
                  <li>• Rate limiting</li>
                  <li>• CSRF protection</li>
                  <li>• Bot detection</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">UX:</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Geolocalização</li>
                  <li>• A/B testing</li>
                  <li>• Feature flags</li>
                  <li>• Maintenance mode</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">⚡ Funcionalidades</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Ações:</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• <code>NextResponse.redirect()</code></li>
                  <li>• <code>NextResponse.rewrite()</code></li>
                  <li>• <code>NextResponse.next()</code></li>
                  <li>• <code>new NextResponse()</code></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Acesso:</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Headers da requisição</li>
                  <li>• Cookies</li>
                  <li>• Geolocalização</li>
                  <li>• User Agent</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Exemplo: Middleware Básico</h2>
          <CodeBlock code={basicMiddlewareCode} language="tsx" />
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Exemplo: Middleware Avançado</h2>
          <CodeBlock code={advancedMiddlewareCode} language="tsx" />
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Exemplo: Autenticação</h2>
          <CodeBlock code={authMiddlewareCode} language="tsx" />
        </div>

        <div className="bg-gradient-to-r from-teal-100 to-cyan-100 dark:from-teal-900/30 dark:to-cyan-900/30 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">🎯 Melhores Práticas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1.5">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Performance</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Mantenha o código leve</li>
                <li>• Evite operações custosas</li>
                <li>• Use cache quando possível</li>
                <li>• Limite o escopo com matcher</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Segurança</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Valide sempre os inputs</li>
                <li>• Use HTTPS em produção</li>
                <li>• Implemente rate limiting</li>
                <li>• Log atividades suspeitas</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Debugging</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Use console.log com cuidado</li>
                <li>• Adicione headers de debug</li>
                <li>• Teste em diferentes ambientes</li>
                <li>• Monitor performance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}