'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, 
  Shield, 
  Lock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
  Copy,
  RefreshCw,
  Settings,
  Code,
  Server,
  Database,
  FileText,
  Zap,
  Activity,
  Target,
  Filter,
  Key,
  Users
} from 'lucide-react';
import { DemoCard } from '@/components/DemoCard';
import { DemoCardStatic } from '@/components/DemoCardStatic';
import { DemoSection } from '@/components/DemoSection';

const securityHeaders = [
  {
    name: 'Content-Security-Policy (CSP)',
    description: 'Controla quais recursos podem ser carregados pela página',
    importance: 'Critical',
    protection: ['XSS', 'Data Injection', 'Code Injection'],
    example: "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'",
    directives: [
      'default-src: Define política padrão para todos os tipos de recursos',
      'script-src: Controla fontes de JavaScript',
      'style-src: Controla fontes de CSS',
      'img-src: Controla fontes de imagens',
      'connect-src: Controla conexões AJAX, WebSocket, etc.',
      'font-src: Controla fontes de fonts',
      'object-src: Controla plugins como Flash',
      'media-src: Controla fontes de áudio e vídeo'
    ]
  },
  {
    name: 'Strict-Transport-Security (HSTS)',
    description: 'Força o uso de HTTPS e previne downgrade attacks',
    importance: 'High',
    protection: ['Man-in-the-Middle', 'Protocol Downgrade', 'Cookie Hijacking'],
    example: 'max-age=31536000; includeSubDomains; preload',
    directives: [
      'max-age: Tempo em segundos para lembrar da política',
      'includeSubDomains: Aplica a política a todos os subdomínios',
      'preload: Permite inclusão na lista de preload dos browsers'
    ]
  },
  {
    name: 'X-Frame-Options',
    description: 'Previne que a página seja incorporada em frames',
    importance: 'High',
    protection: ['Clickjacking', 'UI Redressing'],
    example: 'DENY',
    directives: [
      'DENY: Impede completamente o uso em frames',
      'SAMEORIGIN: Permite frames apenas do mesmo domínio',
      'ALLOW-FROM uri: Permite frames apenas de URIs específicas'
    ]
  },
  {
    name: 'X-Content-Type-Options',
    description: 'Previne MIME type sniffing pelos browsers',
    importance: 'Medium',
    protection: ['MIME Confusion', 'Content Sniffing'],
    example: 'nosniff',
    directives: [
      'nosniff: Impede que o browser "adivinhe" o tipo de conteúdo'
    ]
  },
  {
    name: 'Referrer-Policy',
    description: 'Controla quais informações de referrer são enviadas',
    importance: 'Medium',
    protection: ['Information Leakage', 'Privacy'],
    example: 'strict-origin-when-cross-origin',
    directives: [
      'no-referrer: Nunca envia referrer',
      'same-origin: Envia referrer apenas para mesmo domínio',
      'strict-origin: Envia apenas origem para HTTPS',
      'strict-origin-when-cross-origin: Política mais restritiva'
    ]
  },
  {
    name: 'Permissions-Policy',
    description: 'Controla quais APIs e recursos podem ser usados',
    importance: 'Medium',
    protection: ['Feature Abuse', 'Privacy'],
    example: 'camera=(), microphone=(), geolocation=()',
    directives: [
      'camera: Controla acesso à câmera',
      'microphone: Controla acesso ao microfone',
      'geolocation: Controla acesso à localização',
      'payment: Controla API de pagamentos'
    ]
  }
];

const headerExamples = {
  nextjs: `// next.config.js
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: \`
              default-src 'self';
              script-src 'self' 'unsafe-eval' 'unsafe-inline';
              style-src 'self' 'unsafe-inline';
              img-src 'self' blob: data: https:;
              font-src 'self';
              object-src 'none';
              base-uri 'self';
              form-action 'self';
              frame-ancestors 'none';
              upgrade-insecure-requests;
            \`.replace(/\n/g, ' ').replace(/\s{2,}/g, ' ').trim()
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'off'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig;`,
  middleware: `// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Content Security Policy
  const csp = \`
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https:;
    font-src 'self' data:;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  \`.replace(/\n/g, ' ').replace(/\s{2,}/g, ' ').trim();
  
  response.headers.set('Content-Security-Policy', csp);
  
  // HSTS
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload'
  );
  
  // Clickjacking protection
  response.headers.set('X-Frame-Options', 'DENY');
  
  // MIME type sniffing protection
  response.headers.set('X-Content-Type-Options', 'nosniff');
  
  // XSS protection (legacy)
  response.headers.set('X-XSS-Protection', '1; mode=block');
  
  // Referrer policy
  response.headers.set(
    'Referrer-Policy',
    'strict-origin-when-cross-origin'
  );
  
  // Permissions policy
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  );
  
  // DNS prefetch control
  response.headers.set('X-DNS-Prefetch-Control', 'off');
  
  // Download options (IE)
  response.headers.set('X-Download-Options', 'noopen');
  
  // Content type options
  response.headers.set('X-Permitted-Cross-Domain-Policies', 'none');
  
  return response;
}

export const config = {
  matcher: [
    '/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)',
  ],
};`,
  helmet: `// lib/helmet.ts
import helmet from 'helmet';
import { NextApiRequest, NextApiResponse } from 'next';

// Helmet configuration for Express-like middleware
export const helmetConfig = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        "'unsafe-inline'",
        "'unsafe-eval'",
        'https://vercel.live',
        'https://va.vercel-scripts.com'
      ],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'blob:', 'data:', 'https:'],
      fontSrc: ["'self'", 'data:'],
      objectSrc: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'"],
      frameAncestors: ["'none'"],
      upgradeInsecureRequests: []
    }
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  },
  frameguard: {
    action: 'deny'
  },
  noSniff: true,
  xssFilter: true,
  referrerPolicy: {
    policy: 'strict-origin-when-cross-origin'
  },
  permissionsPolicy: {
    camera: [],
    microphone: [],
    geolocation: [],
    interestCohort: []
  }
});

// Custom middleware wrapper for Next.js API routes
export function withSecurityHeaders(
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    // Apply security headers
    res.setHeader(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'"
    );
    res.setHeader(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload'
    );
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    return handler(req, res);
  };
}`,
  vercel: `// vercel.json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data: https:; font-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests;"
        },
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains; preload"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=()"
        }
      ]
    }
  ]
}`
};

const securityTests = [
  {
    name: 'CSP Violation Test',
    description: 'Testa se o CSP está bloqueando scripts inline',
    test: () => {
      try {
        eval('console.log("CSP Test")');
        return { passed: false, message: 'CSP não está bloqueando eval()' };
      } catch (e) {
        return { passed: true, message: 'CSP está funcionando corretamente' };
      }
    }
  },
  {
    name: 'Frame Options Test',
    description: 'Verifica se a página pode ser incorporada em iframe',
    test: () => {
      try {
        if (window.self !== window.top) {
          return { passed: false, message: 'Página está sendo exibida em frame' };
        }
        return { passed: true, message: 'X-Frame-Options funcionando' };
      } catch (e) {
        return { passed: true, message: 'Frame access bloqueado' };
      }
    }
  },
  {
    name: 'HTTPS Test',
    description: 'Verifica se a conexão está usando HTTPS',
    test: () => {
      const isHTTPS = window.location.protocol === 'https:';
      return {
        passed: isHTTPS,
        message: isHTTPS ? 'Conexão segura HTTPS' : 'Conexão insegura HTTP'
      };
    }
  },
  {
    name: 'Mixed Content Test',
    description: 'Verifica se há conteúdo misto (HTTP em HTTPS)',
    test: () => {
      const images = Array.from(document.images);
      const insecureImages = images.filter(img => 
        img.src.startsWith('http:') && window.location.protocol === 'https:'
      );
      
      return {
        passed: insecureImages.length === 0,
        message: insecureImages.length === 0 
          ? 'Nenhum conteúdo misto detectado'
          : `${insecureImages.length} recursos inseguros encontrados`
      };
    }
  }
];

export default function SecurityHeadersPage() {
  const [selectedHeader, setSelectedHeader] = useState(0);
  const [selectedCode, setSelectedCode] = useState<keyof typeof headerExamples>('nextjs');
  const [testResults, setTestResults] = useState<any[]>([]);
  const [isTestingHeaders, setIsTestingHeaders] = useState(false);
  const [currentHeaders, setCurrentHeaders] = useState<Record<string, string>>({});

  useEffect(() => {
    // Simulate getting current headers
    setCurrentHeaders({
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'",
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    });
  }, []);

  const runSecurityTests = () => {
    setIsTestingHeaders(true);
    
    setTimeout(() => {
      const results = securityTests.map(test => ({
        ...test,
        result: test.test()
      }));
      setTestResults(results);
      setIsTestingHeaders(false);
    }, 2000);
  };

  const getImportanceColor = (importance: string) => {
    switch (importance.toLowerCase()) {
      case 'critical': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300';
      case 'high': return 'text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-300';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300';
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl text-white mr-4">
              <Globe className="h-8 w-8" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
              Security Headers
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Configure headers HTTP de segurança para proteger sua aplicação contra 
            ataques comuns como XSS, clickjacking e man-in-the-middle.
          </p>
        </motion.div>

        {/* Header Testing Demo */}
        <DemoSection title="Teste de Headers" description="Verifique os headers de segurança da sua aplicação">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Headers Atuais
                </h3>
                
                <div className="space-y-3 mb-6">
                  {Object.entries(currentHeaders).map(([header, value]) => (
                    <div key={header} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="font-medium text-sm text-gray-900 dark:text-white mb-1">
                        {header}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-300 font-mono break-all">
                        {value}
                      </div>
                    </div>
                  ))}
                </div>
                
                <button
                  onClick={runSecurityTests}
                  disabled={isTestingHeaders}
                  className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors flex items-center justify-center"
                >
                  {isTestingHeaders ? (
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Shield className="h-4 w-4 mr-2" />
                  )}
                  {isTestingHeaders ? 'Testando...' : 'Executar Testes'}
                </button>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Resultados dos Testes
                </h3>
                
                {testResults.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    Execute os testes para ver os resultados
                  </div>
                ) : (
                  <div className="space-y-3">
                    {testResults.map((test, index) => (
                      <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-sm text-gray-900 dark:text-white">
                            {test.name}
                          </span>
                          {test.result.passed ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500" />
                          )}
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">
                          {test.description}
                        </p>
                        <p className={`text-xs font-medium ${
                          test.result.passed 
                            ? 'text-green-600 dark:text-green-400' 
                            : 'text-red-600 dark:text-red-400'
                        }`}>
                          {test.result.message}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
                
                {testResults.length > 0 && (
                  <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-blue-900 dark:text-blue-300">
                        Score de Segurança
                      </span>
                      <span className="text-blue-600 dark:text-blue-400 font-bold">
                        {Math.round((testResults.filter(t => t.result.passed).length / testResults.length) * 100)}%
                      </span>
                    </div>
                    <div className="mt-2 w-full bg-blue-200 dark:bg-blue-800 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ 
                          width: `${(testResults.filter(t => t.result.passed).length / testResults.length) * 100}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </DemoSection>

        {/* Security Headers Overview */}
        <DemoSection title="Headers de Segurança" description="Principais headers para proteger sua aplicação">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-4 px-6 overflow-x-auto">
                {securityHeaders.map((header, index) => (
                  <button
                    key={header.name}
                    onClick={() => setSelectedHeader(index)}
                    className={`py-4 px-3 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                      selectedHeader === index
                        ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    {header.name}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="p-6">
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {securityHeaders[selectedHeader].name}
                    </h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getImportanceColor(securityHeaders[selectedHeader].importance)}`}>
                      {securityHeaders[selectedHeader].importance.toUpperCase()}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {securityHeaders[selectedHeader].description}
                  </p>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <h4 className="font-medium text-green-900 dark:text-green-300 mb-2">
                        Proteção contra:
                      </h4>
                      <ul className="space-y-1">
                        {securityHeaders[selectedHeader].protection.map((threat, idx) => (
                          <li key={idx} className="text-green-700 dark:text-green-400 text-sm flex items-center">
                            <Shield className="h-3 w-3 mr-2 flex-shrink-0" />
                            {threat}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">
                        Exemplo:
                      </h4>
                      <div className="bg-gray-900 rounded p-2">
                        <code className="text-blue-400 text-xs break-all">
                          {securityHeaders[selectedHeader].example}
                        </code>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Diretivas Principais
                  </h4>
                  <div className="space-y-3">
                    {securityHeaders[selectedHeader].directives.map((directive, index) => (
                      <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          {directive}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DemoSection>

        {/* Implementation Examples */}
        <DemoSection title="Exemplos de Implementação" description="Como configurar headers de segurança">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8 px-6 overflow-x-auto">
                {Object.keys(headerExamples).map((key) => (
                  <button
                    key={key}
                    onClick={() => setSelectedCode(key as keyof typeof headerExamples)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                      selectedCode === key
                        ? 'border-purple-500 text-purple-600 dark:text-purple-400'
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
                  {selectedCode.charAt(0).toUpperCase() + selectedCode.slice(1)} Configuration
                </h3>
                <button
                  onClick={() => navigator.clipboard.writeText(headerExamples[selectedCode])}
                  className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 dark:text-purple-400"
                >
                  <Copy className="h-4 w-4" />
                  <span className="text-sm">Copiar</span>
                </button>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-gray-300">
                  <code>{headerExamples[selectedCode]}</code>
                </pre>
              </div>
            </div>
          </div>
        </DemoSection>

        {/* Security Checklist */}
        <DemoSection title="Checklist de Segurança" description="Verifique se sua aplicação está protegida">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-purple-500" />
                  Headers Essenciais
                </h3>
                <div className="space-y-3">
                  {[
                    'Content-Security-Policy configurado',
                    'Strict-Transport-Security ativo',
                    'X-Frame-Options definido',
                    'X-Content-Type-Options: nosniff',
                    'Referrer-Policy configurado',
                    'Permissions-Policy restritivo'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-green-700 dark:text-green-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Settings className="h-5 w-5 mr-2 text-blue-500" />
                  Configurações Avançadas
                </h3>
                <div className="space-y-3">
                  {[
                    'CSP com nonce para scripts',
                    'HSTS preload habilitado',
                    'Subresource Integrity (SRI)',
                    'Cross-Origin-Embedder-Policy',
                    'Cross-Origin-Opener-Policy',
                    'Headers customizados por rota'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <Target className="h-5 w-5 text-blue-500" />
                      <span className="text-blue-700 dark:text-blue-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </DemoSection>

        {/* Best Practices */}
        <DemoSection title="Melhores Práticas" description="Diretrizes para configuração segura">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Lock className="h-5 w-5 mr-2 text-purple-500" />
                  Configuração
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Configure CSP progressivamente</li>
                  <li>• Use HTTPS em produção sempre</li>
                  <li>• Teste headers em staging</li>
                  <li>• Monitore violações de CSP</li>
                  <li>• Use nonces para scripts inline</li>
                  <li>• Configure HSTS preload</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-green-500" />
                  Monitoramento
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Configure relatórios de CSP</li>
                  <li>• Monitore headers em produção</li>
                  <li>• Use ferramentas de auditoria</li>
                  <li>• Teste regularmente</li>
                  <li>• Analise logs de violação</li>
                  <li>• Mantenha headers atualizados</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Globe className="h-5 w-5 mr-2 text-blue-500" />
                  Compatibilidade
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Teste em diferentes browsers</li>
                  <li>• Considere fallbacks para IE</li>
                  <li>• Verifique suporte mobile</li>
                  <li>• Use feature detection</li>
                  <li>• Documente configurações</li>
                  <li>• Mantenha compatibilidade</li>
                </ul>
              </div>
            </div>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}