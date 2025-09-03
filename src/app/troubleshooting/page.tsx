'use client';

import { useState } from 'react';
import { Search, AlertTriangle, CheckCircle, Code, ExternalLink, Copy, ChevronDown, ChevronRight } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import CodeBlock from '@/components/CodeBlock';

interface TroubleshootingItem {
  id: string;
  title: string;
  category: 'build' | 'runtime' | 'performance' | 'deployment' | 'development';
  severity: 'low' | 'medium' | 'high' | 'critical';
  problem: string;
  symptoms: string[];
  solution: string;
  code?: string;
  links?: { title: string; url: string }[];
  tags: string[];
}

const troubleshootingItems: TroubleshootingItem[] = [
  {
    id: 'hydration-mismatch',
    title: 'Hydration Mismatch Error',
    category: 'runtime',
    severity: 'high',
    problem: 'Erro de hidratação quando o HTML renderizado no servidor não corresponde ao cliente',
    symptoms: [
      'Warning: Text content did not match',
      'Warning: Expected server HTML to contain',
      'Conteúdo diferente entre servidor e cliente'
    ],
    solution: 'Garantir que o conteúdo renderizado seja idêntico entre servidor e cliente',
    code: `// ❌ Problemático - Date() gera valores diferentes
function MyComponent() {
  return <div>Hoje é {new Date().toLocaleDateString()}</div>;
}

// ✅ Solução - usar useEffect para conteúdo dinâmico
import { useState, useEffect } from 'react';

function MyComponent() {
  const [date, setDate] = useState('');
  
  useEffect(() => {
    setDate(new Date().toLocaleDateString());
  }, []);
  
  return <div>Hoje é {date || 'Carregando...'}</div>;
}

// ✅ Ou usar suppressHydrationWarning para casos específicos
function MyComponent() {
  return (
    <div suppressHydrationWarning>
      Hoje é {new Date().toLocaleDateString()}
    </div>
  );
}`,
    links: [
      { title: 'Next.js Hydration Docs', url: 'https://nextjs.org/docs/messages/react-hydration-error' }
    ],
    tags: ['hydration', 'ssr', 'client-server']
  },
  {
    id: 'module-not-found',
    title: 'Module Not Found Error',
    category: 'build',
    severity: 'medium',
    problem: 'Erro ao importar módulos ou arquivos não encontrados',
    symptoms: [
      'Module not found: Can\'t resolve',
      'Cannot find module',
      'Failed to compile'
    ],
    solution: 'Verificar caminhos de importação e configuração de aliases',
    code: `// ❌ Caminho incorreto
import Component from '../components/MyComponent';

// ✅ Caminho correto
import Component from '../components/MyComponent';

// ✅ Usando alias configurado no tsconfig.json
import Component from '@/components/MyComponent';

// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}`,
    links: [
      { title: 'Next.js Import Paths', url: 'https://nextjs.org/docs/advanced-features/module-path-aliases' }
    ],
    tags: ['imports', 'paths', 'typescript']
  },
  {
    id: 'slow-build-times',
    title: 'Build Times Lentos',
    category: 'performance',
    severity: 'medium',
    problem: 'Tempo de build excessivamente longo em desenvolvimento ou produção',
    symptoms: [
      'npm run build demora muito',
      'Hot reload lento',
      'Compilação demorada'
    ],
    solution: 'Otimizar configurações e dependências',
    code: `// next.config.js - Otimizações
module.exports = {
  // Usar Turbopack (experimental)
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  
  // Otimizar webpack
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      // Reduzir verificações em desenvolvimento
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    
    // Otimizar bundle splitting
    config.optimization.splitChunks = {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    };
    
    return config;
  },
  
  // Usar SWC minifier
  swcMinify: true,
};`,
    links: [
      { title: 'Next.js Performance', url: 'https://nextjs.org/docs/advanced-features/compiler' }
    ],
    tags: ['performance', 'build', 'webpack', 'turbopack']
  },
  {
    id: 'vercel-deployment-failed',
    title: 'Falha no Deploy Vercel',
    category: 'deployment',
    severity: 'high',
    problem: 'Deploy falha na Vercel com erros de build ou runtime',
    symptoms: [
      'Build failed',
      'Function timeout',
      'Memory limit exceeded'
    ],
    solution: 'Configurar corretamente variáveis de ambiente e otimizar bundle',
    code: `// vercel.json - Configurações de deploy
{
  "functions": {
    "app/api/**/*.js": {
      "maxDuration": 30
    }
  },
  "regions": ["iad1"],
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm ci"
}

// .env.local (não committar)
DATABASE_URL=your_database_url
NEXTAUTH_SECRET=your_secret

// .env.example (committar como template)
DATABASE_URL=
NEXTAUTH_SECRET=

// next.config.js - Otimizar para produção
module.exports = {
  output: 'standalone', // Para Docker
  images: {
    domains: ['example.com'],
    formats: ['image/webp', 'image/avif'],
  },
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },
};`,
    links: [
      { title: 'Vercel Deployment Guide', url: 'https://vercel.com/docs/concepts/deployments/overview' }
    ],
    tags: ['deployment', 'vercel', 'environment', 'production']
  },
  {
    id: 'api-cors-error',
    title: 'CORS Error em API Routes',
    category: 'runtime',
    severity: 'medium',
    problem: 'Erro de CORS ao fazer requisições para API routes',
    symptoms: [
      'Access to fetch blocked by CORS policy',
      'No Access-Control-Allow-Origin header',
      'CORS error in browser console'
    ],
    solution: 'Configurar headers CORS corretamente nas API routes',
    code: `// app/api/example/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Configurar CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, { status: 200, headers: corsHeaders });
}

export async function GET(request: NextRequest) {
  try {
    const data = { message: 'Hello World' };
    
    return NextResponse.json(data, {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500, headers: corsHeaders }
    );
  }
}

// Middleware alternativo para CORS global
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Handle CORS
  const response = NextResponse.next();
  
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  return response;
}

export const config = {
  matcher: '/api/:path*',
};`,
    links: [
      { title: 'Next.js API Routes', url: 'https://nextjs.org/docs/api-routes/introduction' }
    ],
    tags: ['cors', 'api', 'headers', 'middleware']
  },
  {
    id: 'memory-leak',
    title: 'Memory Leak em useEffect',
    category: 'runtime',
    severity: 'high',
    problem: 'Vazamentos de memória causados por useEffect mal implementado',
    symptoms: [
      'Aplicação fica lenta com o tempo',
      'Warning: Can&apos;t perform a React state update',
      'Memory usage crescente'
    ],
    solution: 'Limpar adequadamente efeitos e cancelar operações assíncronas',
    code: `// ❌ Problemático - não cancela requisição
function MyComponent() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(setData); // Pode executar após unmount
  }, []);
  
  return <div>{data?.title}</div>;
}

// ✅ Solução - usar AbortController
function MyComponent() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    const controller = new AbortController();
    
    fetch('/api/data', { signal: controller.signal })
      .then(res => res.json())
      .then(setData)
      .catch(err => {
        if (err.name !== 'AbortError') {
          console.error('Fetch error:', err);
        }
      });
    
    return () => {
      controller.abort();
    };
  }, []);
  
  return <div>{data?.title}</div>;
}

// ✅ Para timers e intervalos
function TimerComponent() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  return <div>Count: {count}</div>;
}`,
    links: [
      { title: 'React useEffect Guide', url: 'https://react.dev/reference/react/useEffect' }
    ],
    tags: ['memory-leak', 'useEffect', 'cleanup', 'abort-controller']
  }
];

const categories = {
  build: { name: 'Build', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300', icon: '🔨' },
  runtime: { name: 'Runtime', color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300', icon: '⚡' },
  performance: { name: 'Performance', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300', icon: '🚀' },
  deployment: { name: 'Deploy', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300', icon: '🌐' },
  development: { name: 'Development', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300', icon: '💻' }
};

const severities = {
  low: { name: 'Baixa', color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' },
  medium: { name: 'Média', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' },
  high: { name: 'Alta', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' },
  critical: { name: 'Crítica', color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' }
};

export default function TroubleshootingPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const filteredItems = troubleshootingItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.problem.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSeverity = selectedSeverity === 'all' || item.severity === selectedSeverity;
    
    return matchesSearch && matchesCategory && matchesSeverity;
  });

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <Breadcrumbs />
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-4">
            🔧 Troubleshooting Guide
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Soluções para problemas comuns em Next.js, React e desenvolvimento web moderno.
          </p>
        </div>

        {/* Filtros */}
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Buscar Problemas
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Digite palavras-chave..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Categoria
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="all">Todas as categorias</option>
                {Object.entries(categories).map(([key, category]) => (
                  <option key={key} value={key}>{category.icon} {category.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Severidade
              </label>
              <select
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="all">Todas as severidades</option>
                {Object.entries(severities).map(([key, severity]) => (
                  <option key={key} value={key}>{severity.name}</option>
                ))}
              </select>
            </div>
          </div>
          
          {filteredItems.length > 0 && (
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              {filteredItems.length} problema(s) encontrado(s)
            </div>
          )}
        </div>

        {/* Lista de Problemas */}
        <div className="space-y-4">
          {filteredItems.map((item) => {
            const isExpanded = expandedItems.has(item.id);
            const category = categories[item.category];
            const severity = severities[item.severity];
            
            return (
              <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                {/* Header */}
                <div 
                  className="p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  onClick={() => toggleExpanded(item.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          {isExpanded ? (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                          )}
                          <AlertTriangle className="w-5 h-5 text-red-500" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {item.title}
                        </h3>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-3">
                        {item.problem}
                      </p>
                      
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${category.color}`}>
                          {category.icon} {category.name}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${severity.color}`}>
                          {severity.name}
                        </span>
                        {item.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Conteúdo expandido */}
                {isExpanded && (
                  <div className="px-6 pb-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="pt-6 space-y-6">
                      {/* Sintomas */}
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-yellow-500" />
                          Sintomas
                        </h4>
                        <ul className="space-y-1">
                          {item.symptoms.map((symptom, index) => (
                            <li key={index} className="text-gray-600 dark:text-gray-300 text-sm flex items-start gap-2">
                              <span className="text-red-500 mt-1">•</span>
                              <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded text-xs">{symptom}</code>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Solução */}
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          Solução
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          {item.solution}
                        </p>
                        
                        {/* Código */}
                        {item.code && (
                          <div className="relative">
                            <button
                              onClick={() => copyToClipboard(item.code!)}
                              className="absolute top-2 right-2 p-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors z-10"
                              title="Copiar código"
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                            <CodeBlock code={item.code} language="typescript" />
                          </div>
                        )}
                      </div>
                      
                      {/* Links úteis */}
                      {item.links && item.links.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                            <ExternalLink className="w-4 h-4 text-blue-500" />
                            Links Úteis
                          </h4>
                          <div className="space-y-2">
                            {item.links.map((link, index) => (
                              <a
                                key={index}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline text-sm"
                              >
                                <ExternalLink className="w-3 h-3" />
                                {link.title}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              Nenhum problema encontrado
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Tente ajustar os filtros ou termo de busca
            </p>
          </div>
        )}

        {/* Footer com dicas */}
        <div className="mt-12 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            💡 Dicas Gerais de Troubleshooting
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-300">
            <div>
              <h4 className="font-medium mb-2">🔍 Debugging</h4>
              <ul className="space-y-1">
                <li>• Use console.log estrategicamente</li>
                <li>• Verifique o Network tab no DevTools</li>
                <li>• Analise o Console para warnings</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">📚 Recursos</h4>
              <ul className="space-y-1">
                <li>• Documentação oficial do Next.js</li>
                <li>• Stack Overflow para problemas específicos</li>
                <li>• GitHub Issues do projeto</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}