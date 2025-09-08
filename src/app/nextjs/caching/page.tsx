'use client';

import { useState } from 'react';
import CodeBlock from '@/components/CodeBlock';
import DemoSection from '@/components/DemoSection';

// Simulador de Cache e Revalidação
function CacheDemo() {
  const [cacheStatus, setCacheStatus] = useState<any>({
    '/products': { status: 'cached', lastUpdate: new Date(Date.now() - 300000), data: 'Product list cached' },
    '/users': { status: 'cached', lastUpdate: new Date(Date.now() - 600000), data: 'User list cached' },
    '/posts': { status: 'stale', lastUpdate: new Date(Date.now() - 900000), data: 'Post list stale' },
    '/categories': { status: 'fresh', lastUpdate: new Date(), data: 'Categories fresh' }
  });
  
  const [selectedAction, setSelectedAction] = useState('revalidatePath');
  const [targetPath, setTargetPath] = useState('/products');
  const [targetTag, setTargetTag] = useState('products');
  const [actionResult, setActionResult] = useState<any>(null);

  const cacheActions = {
    revalidatePath: {
      name: 'revalidatePath',
      description: 'Revalida uma rota específica',
      target: 'path'
    },
    revalidateTag: {
      name: 'revalidateTag',
      description: 'Revalida todas as rotas com uma tag específica',
      target: 'tag'
    },
    purgeCache: {
      name: 'Purge Cache',
      description: 'Limpa todo o cache',
      target: 'all'
    },
    refreshData: {
      name: 'Refresh Data',
      description: 'Força atualização dos dados',
      target: 'data'
    }
  };

  const simulateAction = () => {
    let result;
    const timestamp = new Date();

    switch (selectedAction) {
      case 'revalidatePath':
        setCacheStatus(prev => ({
          ...prev,
          [targetPath]: {
            status: 'fresh',
            lastUpdate: timestamp,
            data: `${targetPath} revalidated`
          }
        }));
        result = {
          action: 'revalidatePath',
          target: targetPath,
          success: true,
          message: `Path ${targetPath} foi revalidado com sucesso`,
          timestamp
        };
        break;

      case 'revalidateTag':
        // Simular revalidação de múltiplas rotas com a mesma tag
        const affectedPaths = Object.keys(cacheStatus).filter(path => 
          path.includes(targetTag) || targetTag === 'all'
        );
        
        const newStatus = { ...cacheStatus };
        affectedPaths.forEach(path => {
          newStatus[path] = {
            status: 'fresh',
            lastUpdate: timestamp,
            data: `${path} revalidated by tag`
          };
        });
        setCacheStatus(newStatus);
        
        result = {
          action: 'revalidateTag',
          target: targetTag,
          affectedPaths,
          success: true,
          message: `Tag "${targetTag}" revalidou ${affectedPaths.length} rotas`,
          timestamp
        };
        break;

      case 'purgeCache':
        const clearedStatus = Object.keys(cacheStatus).reduce((acc, path) => {
          acc[path] = {
            status: 'empty',
            lastUpdate: timestamp,
            data: 'Cache cleared'
          };
          return acc;
        }, {} as any);
        setCacheStatus(clearedStatus);
        
        result = {
          action: 'purgeCache',
          target: 'all',
          success: true,
          message: 'Todo o cache foi limpo',
          timestamp
        };
        break;

      case 'refreshData':
        const refreshedStatus = Object.keys(cacheStatus).reduce((acc, path) => {
          acc[path] = {
            status: 'fresh',
            lastUpdate: timestamp,
            data: `${path} data refreshed`
          };
          return acc;
        }, {} as any);
        setCacheStatus(refreshedStatus);
        
        result = {
          action: 'refreshData',
          target: 'all',
          success: true,
          message: 'Todos os dados foram atualizados',
          timestamp
        };
        break;

      default:
        result = {
          action: selectedAction,
          success: false,
          message: 'Ação não reconhecida'
        };
    }

    setActionResult(result);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'fresh': return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'cached': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30';
      case 'stale': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      case 'empty': return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Status do Cache</h3>
          <div className="space-y-3">
            {Object.entries(cacheStatus).map(([path, info]: [string, any]) => (
              <div key={path} className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-800 dark:text-white">{path}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(info.status)}`}>
                    {info.status}
                  </span>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <div>Última atualização: {info.lastUpdate.toLocaleTimeString()}</div>
                  <div>Dados: {info.data}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Ações de Cache</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Ação
              </label>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(cacheActions).map(([key, action]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedAction(key)}
                    className={`p-3 rounded-lg text-sm transition-colors ${
                      selectedAction === key
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    {action.name}
                  </button>
                ))}
              </div>
            </div>

            {cacheActions[selectedAction as keyof typeof cacheActions].target === 'path' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Path de destino
                </label>
                <select
                  value={targetPath}
                  onChange={(e) => setTargetPath(e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  {Object.keys(cacheStatus).map(path => (
                    <option key={path} value={path}>{path}</option>
                  ))}
                </select>
              </div>
            )}

            {cacheActions[selectedAction as keyof typeof cacheActions].target === 'tag' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tag de destino
                </label>
                <select
                  value={targetTag}
                  onChange={(e) => setTargetTag(e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="products">products</option>
                  <option value="users">users</option>
                  <option value="posts">posts</option>
                  <option value="all">all</option>
                </select>
              </div>
            )}

            <button
              onClick={simulateAction}
              className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              Executar {cacheActions[selectedAction as keyof typeof cacheActions].name}
            </button>
          </div>
        </div>
      </div>

      {actionResult && (
        <div className={`p-4 rounded-lg border ${
          actionResult.success
            ? 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700'
            : 'bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700'
        }`}>
          <h4 className={`font-semibold mb-2 ${
            actionResult.success
              ? 'text-green-800 dark:text-green-200'
              : 'text-red-800 dark:text-red-200'
          }`}>
            Resultado da Ação
          </h4>
          <p className={`mb-3 ${
            actionResult.success
              ? 'text-green-700 dark:text-green-300'
              : 'text-red-700 dark:text-red-300'
          }`}>
            {actionResult.message}
          </p>
          
          <div className="text-sm">
            <p><strong>Ação:</strong> {actionResult.action}</p>
            <p><strong>Alvo:</strong> {actionResult.target}</p>
            {actionResult.affectedPaths && (
              <p><strong>Rotas afetadas:</strong> {actionResult.affectedPaths.join(', ')}</p>
            )}
            <p><strong>Timestamp:</strong> {actionResult.timestamp?.toLocaleString()}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CachingPage() {
  const revalidatePathCode = `// app/actions.ts
import { revalidatePath } from 'next/cache';

export async function updateProduct(id: string, data: any) {
  // Atualizar produto no banco de dados
  await updateProductInDB(id, data);
  
  // Revalidar a página específica do produto
  revalidatePath(\`/products/\${id}\`);
  
  // Revalidar a lista de produtos
  revalidatePath('/products');
  
  // Revalidar layout (se necessário)
  revalidatePath('/products', 'layout');
}

// Server Action com revalidação
export async function createProduct(formData: FormData) {
  const product = {
    name: formData.get('name') as string,
    price: parseFloat(formData.get('price') as string)
  };
  
  await saveProductToDB(product);
  
  // Revalidar todas as páginas de produtos
  revalidatePath('/products');
  revalidatePath('/');
}`;

  const revalidateTagCode = `// app/lib/data.ts
import { unstable_cache } from 'next/cache';

// Cache com tags
export const getProducts = unstable_cache(
  async () => {
    const products = await fetch('/api/products').then(res => res.json());
    return products;
  },
  ['products'], // cache key
  {
    tags: ['products'], // tags para revalidação
    revalidate: 3600 // revalidar a cada hora
  }
);

export const getProductById = unstable_cache(
  async (id: string) => {
    const product = await fetch(\`/api/products/\${id}\`).then(res => res.json());
    return product;
  },
  ['product'], // cache key base
  {
    tags: ['products', 'product'], // múltiplas tags
    revalidate: 1800 // 30 minutos
  }
);

// app/actions.ts
import { revalidateTag } from 'next/cache';

export async function updateProduct(id: string, data: any) {
  await updateProductInDB(id, data);
  
  // Revalidar todas as funções com tag 'products'
  revalidateTag('products');
  
  // Revalidar tag específica do produto
  revalidateTag(\`product-\${id}\`);
}

export async function deleteProduct(id: string) {
  await deleteProductFromDB(id);
  
  // Revalidar múltiplas tags
  revalidateTag('products');
  revalidateTag('featured-products');
  revalidateTag('categories');
}`;

  const unstableCacheCode = `// app/lib/cache.ts
import { unstable_cache } from 'next/cache';

// Cache básico
export const getUsers = unstable_cache(
  async () => {
    console.log('Fetching users from database...');
    const users = await db.users.findMany();
    return users;
  },
  ['users'], // cache key
  {
    revalidate: 60, // revalidar a cada 60 segundos
    tags: ['users'] // tags para invalidação manual
  }
);

// Cache com parâmetros dinâmicos
export const getUserPosts = unstable_cache(
  async (userId: string, limit: number = 10) => {
    console.log(\`Fetching posts for user \${userId}...\`);
    const posts = await db.posts.findMany({
      where: { userId },
      take: limit,
      orderBy: { createdAt: 'desc' }
    });
    return posts;
  },
  ['user-posts'], // cache key base
  {
    revalidate: 300, // 5 minutos
    tags: ['posts', 'user-posts']
  }
);

// Cache condicional
export const getProductsWithCache = unstable_cache(
  async (category?: string, featured?: boolean) => {
    console.log('Fetching products with filters...');
    
    const where: any = {};
    if (category) where.category = category;
    if (featured) where.featured = true;
    
    const products = await db.products.findMany({ where });
    return products;
  },
  ['products-filtered'],
  {
    revalidate: 1800, // 30 minutos
    tags: ['products', 'categories']
  }
);

// Cache com diferentes estratégias
export const getCriticalData = unstable_cache(
  async () => {
    // Dados críticos que mudam raramente
    const data = await fetchCriticalData();
    return data;
  },
  ['critical-data'],
  {
    revalidate: false, // nunca revalidar automaticamente
    tags: ['critical']
  }
);

export const getRealtimeData = unstable_cache(
  async () => {
    // Dados que mudam frequentemente
    const data = await fetchRealtimeData();
    return data;
  },
  ['realtime-data'],
  {
    revalidate: 10, // revalidar a cada 10 segundos
    tags: ['realtime']
  }
);`;

  const isrCode = `// app/products/page.tsx - ISR com App Router
import { getProducts } from '@/lib/data';

// Esta página será estaticamente gerada e revalidada
export const revalidate = 3600; // revalidar a cada hora

export default async function ProductsPage() {
  const products = await getProducts();
  
  return (
    <div>
      <h1>Produtos</h1>
      <div className="grid grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product.id} className="border p-4 rounded">
            <h2>{product.name}</h2>
            <p>R$ {product.price}</p>
          </div>
        ))}
      </div>
      <p className="text-sm text-gray-500 mt-4">
        Última atualização: {new Date().toLocaleString()}
      </p>
    </div>
  );
}

// app/products/[id]/page.tsx - ISR dinâmico
interface Props {
  params: { id: string };
}

export async function generateStaticParams() {
  const products = await getProducts();
  
  // Gerar apenas os produtos mais populares estaticamente
  const popularProducts = products.slice(0, 10);
  
  return popularProducts.map(product => ({
    id: product.id.toString()
  }));
}

export const revalidate = 1800; // 30 minutos
export const dynamicParams = true; // permitir params não gerados

export default async function ProductPage({ params }: Props) {
  const product = await getProductById(params.id);
  
  if (!product) {
    notFound();
  }
  
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>R$ {product.price}</p>
    </div>
  );
}

// app/api/revalidate/route.ts - Revalidação sob demanda
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get('path');
  const tag = searchParams.get('tag');
  const secret = searchParams.get('secret');
  
  // Verificar secret para segurança
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json(
      { message: 'Invalid secret' },
      { status: 401 }
    );
  }
  
  try {
    if (path) {
      revalidatePath(path);
      return NextResponse.json({
        revalidated: true,
        path,
        timestamp: new Date().toISOString()
      });
    }
    
    if (tag) {
      revalidateTag(tag);
      return NextResponse.json({
        revalidated: true,
        tag,
        timestamp: new Date().toISOString()
      });
    }
    
    return NextResponse.json(
      { message: 'Missing path or tag parameter' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Error revalidating', error: error.message },
      { status: 500 }
    );
  }
}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-6">
            Caching & Revalidation
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Demonstração do sistema de cache e revalidação do Next.js 15.5.2 - performance e dados sempre atualizados.
          </p>
        </div>

        <div className="mb-12">
          <DemoSection title="Simulador de Cache">
            <CacheDemo />
          </DemoSection>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-1.5 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">🚀 Tipos de Cache</h2>
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-gray-700 dark:text-gray-300">Request Memoization</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Cache automático durante o render</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 dark:text-gray-300">Data Cache</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Cache persistente entre requests</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 dark:text-gray-300">Full Route Cache</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Cache de páginas completas</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 dark:text-gray-300">Router Cache</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Cache do lado do cliente</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">⚡ Estratégias</h2>
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-gray-700 dark:text-gray-300">Time-based</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Revalidação por tempo</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 dark:text-gray-300">On-demand</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Revalidação manual</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 dark:text-gray-300">Tag-based</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Revalidação por tags</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 dark:text-gray-300">Path-based</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Revalidação por rota</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">🎯 Benefícios</h2>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li>• Performance otimizada</li>
              <li>• Redução de requests</li>
              <li>• Melhor UX</li>
              <li>• Economia de recursos</li>
              <li>• Escalabilidade</li>
              <li>• SEO melhorado</li>
              <li>• Dados sempre frescos</li>
              <li>• Controle granular</li>
            </ul>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">revalidatePath</h2>
          <CodeBlock code={revalidatePathCode} language="tsx" />
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">revalidateTag</h2>
          <CodeBlock code={revalidateTagCode} language="tsx" />
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">unstable_cache</h2>
          <CodeBlock code={unstableCacheCode} language="tsx" />
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">ISR (Incremental Static Regeneration)</h2>
          <CodeBlock code={isrCode} language="tsx" />
        </div>

        <div className="bg-gradient-to-r from-indigo-100 to-blue-100 dark:from-indigo-900/30 dark:to-blue-900/30 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">🎯 Melhores Práticas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Cache Strategy</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Use tags para invalidação granular</li>
                <li>• Configure revalidate apropriadamente</li>
                <li>• Monitore hit rate do cache</li>
                <li>• Implemente fallbacks</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Performance</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Cache dados custosos</li>
                <li>• Use ISR para conteúdo dinâmico</li>
                <li>• Implemente cache warming</li>
                <li>• Monitore métricas de performance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}