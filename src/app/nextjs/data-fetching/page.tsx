'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import CodeBlock from '@/components/CodeBlock';
import DemoSection from '@/components/DemoSection';
import { 
  CloudArrowDownIcon,
  ClockIcon,
  ArrowPathIcon,
  ServerIcon,
  ComputerDesktopIcon,
  CpuChipIcon
} from '@heroicons/react/24/outline';

const codeExamples = {
  basicFetch: `// app/posts/page.tsx - Fetch básico
async function getPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }
  
  return res.json();
}

export default async function PostsPage() {
  const posts = await getPosts();
  
  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post: any) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </article>
      ))}
    </div>
  );
}`,

  cacheStrategies: `// Estratégias de Cache no Next.js 13+

// 1. Force Cache (padrão)
const res = await fetch('https://api.example.com/data', {
  cache: 'force-cache' // Cache indefinidamente
});

// 2. No Store (sempre fresh)
const res = await fetch('https://api.example.com/data', {
  cache: 'no-store' // Sempre busca dados frescos
});

// 3. Revalidate (ISR)
const res = await fetch('https://api.example.com/data', {
  next: { revalidate: 60 } // Revalida a cada 60 segundos
});

// 4. Tags para revalidação
const res = await fetch('https://api.example.com/data', {
  next: { 
    revalidate: 3600, // 1 hora
    tags: ['posts'] // Tag para revalidação manual
  }
});`,

  revalidateStrategies: `// lib/revalidate.ts - Estratégias de revalidação
import { revalidateTag, revalidatePath } from 'next/cache';

// Revalidar por tag
export async function revalidatePostsData() {
  revalidateTag('posts');
}

// Revalidar por path
export async function revalidatePostsPage() {
  revalidatePath('/posts');
}

// Revalidar múltiplas tags
export async function revalidateUserData(userId: string) {
  revalidateTag('users');
  revalidateTag(\`user-\${userId}\`);
  revalidatePath(\`/users/\${userId}\`);
}

// API Route para webhook de revalidação
// app/api/revalidate/route.ts
export async function POST(request: Request) {
  const { tag, path, secret } = await request.json();
  
  // Verificar secret para segurança
  if (secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ error: 'Invalid secret' }, { status: 401 });
  }
  
  try {
    if (tag) {
      revalidateTag(tag);
    }
    
    if (path) {
      revalidatePath(path);
    }
    
    return Response.json({ revalidated: true, now: Date.now() });
  } catch (error) {
    return Response.json({ error: 'Error revalidating' }, { status: 500 });
  }
}`,

  parallelFetching: `// app/dashboard/page.tsx - Fetch paralelo
async function getUser() {
  const res = await fetch('https://api.example.com/user', {
    next: { revalidate: 300 } // 5 minutos
  });
  return res.json();
}

async function getPosts() {
  const res = await fetch('https://api.example.com/posts', {
    next: { revalidate: 60 } // 1 minuto
  });
  return res.json();
}

async function getAnalytics() {
  const res = await fetch('https://api.example.com/analytics', {
    cache: 'no-store' // Sempre fresh
  });
  return res.json();
}

export default async function Dashboard() {
  // Fetch paralelo - mais rápido que sequencial
  const [user, posts, analytics] = await Promise.all([
    getUser(),
    getPosts(),
    getAnalytics()
  ]);
  
  return (
    <div className="dashboard">
      <UserProfile user={user} />
      <PostsList posts={posts} />
      <AnalyticsWidget analytics={analytics} />
    </div>
  );
}`,

  streamingData: `// app/posts/page.tsx - Streaming com Suspense
import { Suspense } from 'react';

// Componente que faz fetch lento
async function SlowPosts() {
  // Simula API lenta
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  const res = await fetch('https://api.example.com/posts');
  const posts = await res.json();
  
  return (
    <div>
      {posts.map((post: any) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </article>
      ))}
    </div>
  );
}

// Componente que faz fetch rápido
async function FastStats() {
  const res = await fetch('https://api.example.com/stats', {
    next: { revalidate: 60 }
  });
  const stats = await res.json();
  
  return (
    <div className="stats">
      <div>Total Posts: {stats.totalPosts}</div>
      <div>Total Users: {stats.totalUsers}</div>
    </div>
  );
}

export default function PostsPage() {
  return (
    <div>
      <h1>Posts Dashboard</h1>
      
      {/* Stats carregam rapidamente */}
      <Suspense fallback={<div>Loading stats...</div>}>
        <FastStats />
      </Suspense>
      
      {/* Posts carregam mais devagar */}
      <Suspense fallback={<div>Loading posts...</div>}>
        <SlowPosts />
      </Suspense>
    </div>
  );
}`,

  errorHandling: `// lib/api.ts - Tratamento de erros robusto
interface FetchOptions extends RequestInit {
  retries?: number;
  retryDelay?: number;
}

export async function fetchWithRetry(
  url: string, 
  options: FetchOptions = {}
): Promise<Response> {
  const { retries = 3, retryDelay = 1000, ...fetchOptions } = options;
  
  for (let i = 0; i <= retries; i++) {
    try {
      const response = await fetch(url, fetchOptions);
      
      if (!response.ok) {
        throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
      }
      
      return response;
    } catch (error) {
      if (i === retries) {
        throw error; // Última tentativa falhou
      }
      
      // Aguarda antes de tentar novamente
      await new Promise(resolve => setTimeout(resolve, retryDelay * (i + 1)));
    }
  }
  
  throw new Error('Max retries exceeded');
}

// Uso com diferentes estratégias
export async function getPostsWithFallback() {
  try {
    // Tenta API principal
    const response = await fetchWithRetry('https://api.example.com/posts', {
      next: { revalidate: 60 },
      retries: 2
    });
    return response.json();
  } catch (error) {
    console.error('Primary API failed:', error);
    
    try {
      // Fallback para API secundária
      const response = await fetchWithRetry('https://backup-api.example.com/posts');
      return response.json();
    } catch (backupError) {
      console.error('Backup API failed:', backupError);
      
      // Retorna dados estáticos como último recurso
      return [
        { id: 1, title: 'Fallback Post', body: 'Service temporarily unavailable' }
      ];
    }
  }
}`,

  clientSideFetching: `// hooks/usePosts.ts - Client-side fetching
'use client';

import { useState, useEffect } from 'react';

interface Post {
  id: number;
  title: string;
  body: string;
}

interface UsePostsResult {
  posts: Post[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function usePosts(): UsePostsResult {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/posts');
      
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchPosts();
  }, []);
  
  return {
    posts,
    loading,
    error,
    refetch: fetchPosts
  };
}

// Componente que usa o hook
export default function ClientPosts() {
  const { posts, loading, error, refetch } = usePosts();
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      <button onClick={refetch}>Refresh Posts</button>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </article>
      ))}
    </div>
  );
}`,

  incrementalStaticRegeneration: `// app/posts/[id]/page.tsx - ISR com generateStaticParams
interface Post {
  id: string;
  title: string;
  body: string;
  updatedAt: string;
}

// Gera páginas estáticas para posts populares
export async function generateStaticParams() {
  const res = await fetch('https://api.example.com/posts/popular');
  const posts = await res.json();
  
  return posts.map((post: Post) => ({
    id: post.id,
  }));
}

// Permite geração dinâmica para outros posts
export const dynamicParams = true;

async function getPost(id: string): Promise<Post> {
  const res = await fetch(\`https://api.example.com/posts/\${id}\`, {
    next: { 
      revalidate: 3600, // Revalida a cada hora
      tags: ['posts', \`post-\${id}\`] // Tags para revalidação manual
    }
  });
  
  if (!res.ok) {
    throw new Error('Post not found');
  }
  
  return res.json();
}

export default async function PostPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const post = await getPost(params.id);
  
  return (
    <article>
      <h1>{post.title}</h1>
      <p className="text-sm text-gray-500">
        Last updated: {new Date(post.updatedAt).toLocaleString()}
      </p>
      <div>{post.body}</div>
    </article>
  );
}`,

  dataFetchingPatterns: `// patterns/data-fetching.ts - Padrões de fetch

// 1. Fetch com timeout
export async function fetchWithTimeout(
  url: string, 
  options: RequestInit = {}, 
  timeout = 5000
) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

// 2. Fetch com cache personalizado
const cache = new Map();

export async function fetchWithCache(url: string, ttl = 60000) {
  const cached = cache.get(url);
  
  if (cached && Date.now() - cached.timestamp < ttl) {
    return cached.data;
  }
  
  const response = await fetch(url);
  const data = await response.json();
  
  cache.set(url, {
    data,
    timestamp: Date.now()
  });
  
  return data;
}

// 3. Fetch com debounce
export function createDebouncedFetch(delay = 300) {
  let timeoutId: NodeJS.Timeout;
  
  return function debouncedFetch(url: string, callback: (data: any) => void) {
    clearTimeout(timeoutId);
    
    timeoutId = setTimeout(async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        callback(data);
      } catch (error) {
        console.error('Debounced fetch error:', error);
      }
    }, delay);
  };
}

// 4. Fetch com polling
export function createPollingFetch(url: string, interval = 5000) {
  let intervalId: NodeJS.Timeout;
  
  const start = (callback: (data: any) => void) => {
    const poll = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        callback(data);
      } catch (error) {
        console.error('Polling fetch error:', error);
      }
    };
    
    poll(); // Primeira execução
    intervalId = setInterval(poll, interval);
  };
  
  const stop = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
  };
  
  return { start, stop };
}`,

  optimisticUpdates: `// hooks/useOptimisticPosts.ts - Updates otimistas
'use client';

import { useState, useOptimistic, useTransition } from 'react';

interface Post {
  id: string;
  title: string;
  body: string;
  likes: number;
}

export function useOptimisticPosts(initialPosts: Post[]) {
  const [posts, setPosts] = useState(initialPosts);
  const [optimisticPosts, addOptimisticPost] = useOptimistic(
    posts,
    (state, newPost: Post) => [...state, newPost]
  );
  const [isPending, startTransition] = useTransition();
  
  const addPost = async (title: string, body: string) => {
    const tempPost: Post = {
      id: \`temp-\${Date.now()}\`,
      title,
      body,
      likes: 0
    };
    
    startTransition(() => {
      addOptimisticPost(tempPost);
    });
    
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, body })
      });
      
      const newPost = await response.json();
      setPosts(prev => [...prev, newPost]);
    } catch (error) {
      console.error('Failed to add post:', error);
      // O estado otimista será revertido automaticamente
    }
  };
  
  const likePost = async (postId: string) => {
    // Update otimista
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
    
    try {
      await fetch(\`/api/posts/\${postId}/like\`, {
        method: 'POST'
      });
    } catch (error) {
      // Reverte o update otimista
      setPosts(prev => prev.map(post => 
        post.id === postId 
          ? { ...post, likes: post.likes - 1 }
          : post
      ));
    }
  };
  
  return {
    posts: optimisticPosts,
    addPost,
    likePost,
    isPending
  };
}`
};

const fetchingStrategies = [
  {
    strategy: 'Server-Side Rendering (SSR)',
    description: 'Dados buscados no servidor a cada request',
    useCase: 'Dados dinâmicos, personalizados por usuário',
    cache: 'cache: "no-store"',
    color: 'blue',
    icon: '🖥️'
  },
  {
    strategy: 'Static Site Generation (SSG)',
    description: 'Dados buscados em build time',
    useCase: 'Conteúdo estático, blogs, documentação',
    cache: 'cache: "force-cache"',
    color: 'green',
    icon: '📄'
  },
  {
    strategy: 'Incremental Static Regeneration (ISR)',
    description: 'Combina SSG com revalidação periódica',
    useCase: 'Conteúdo semi-estático, e-commerce',
    cache: 'revalidate: 3600',
    color: 'purple',
    icon: '🔄'
  },
  {
    strategy: 'Client-Side Rendering (CSR)',
    description: 'Dados buscados no cliente após hidratação',
    useCase: 'Dashboards, dados em tempo real',
    cache: 'useEffect + fetch',
    color: 'orange',
    icon: '💻'
  }
];

const cacheStrategies = [
  {
    name: 'force-cache',
    description: 'Cache indefinidamente (padrão)',
    useCase: 'Dados que raramente mudam',
    example: "cache: 'force-cache'",
    color: 'blue'
  },
  {
    name: 'no-store',
    description: 'Sempre busca dados frescos',
    useCase: 'Dados em tempo real, personalizados',
    example: "cache: 'no-store'",
    color: 'red'
  },
  {
    name: 'revalidate',
    description: 'Cache com tempo de vida',
    useCase: 'Dados que mudam periodicamente',
    example: 'revalidate: 60',
    color: 'green'
  },
  {
    name: 'tags',
    description: 'Cache com revalidação manual',
    useCase: 'Invalidação baseada em eventos',
    example: "tags: ['posts']",
    color: 'purple'
  }
];

function FetchingDemo() {
  const [selectedStrategy, setSelectedStrategy] = useState('Server-Side Rendering (SSR)');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const simulateFetch = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simula diferentes tempos de carregamento baseado na estratégia
      const delay = selectedStrategy.includes('SSR') ? 500 : 
                   selectedStrategy.includes('SSG') ? 100 :
                   selectedStrategy.includes('ISR') ? 300 : 800;
      
      await new Promise(resolve => setTimeout(resolve, delay));
      
      // Simula dados diferentes baseado na estratégia
      const mockData = {
        strategy: selectedStrategy,
        timestamp: new Date().toISOString(),
        data: {
          posts: [
            { id: 1, title: 'Post 1', cached: selectedStrategy.includes('SSG') },
            { id: 2, title: 'Post 2', cached: selectedStrategy.includes('SSG') }
          ],
          meta: {
            total: 2,
            cached: selectedStrategy.includes('cache'),
            revalidated: selectedStrategy.includes('ISR')
          }
        }
      };
      
      setData(mockData);
    } catch (err) {
      setError('Erro ao buscar dados');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {fetchingStrategies.map((strategy) => (
          <button
            key={strategy.strategy}
            onClick={() => setSelectedStrategy(strategy.strategy)}
            className={`p-4 rounded-lg border-2 text-left transition-all ${
              selectedStrategy === strategy.strategy
                ? `border-${strategy.color}-500 bg-${strategy.color}-50 dark:bg-${strategy.color}-900/20`
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-xl">{strategy.icon}</span>
              <h3 className="font-semibold text-gray-800 dark:text-white text-sm">
                {strategy.strategy}
              </h3>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
              {strategy.description}
            </p>
            <code className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded block">
              {strategy.cache}
            </code>
          </button>
        ))}
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            {selectedStrategy} Demo
          </h3>
          <button
            onClick={simulateFetch}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Carregando...' : 'Buscar Dados'}
          </button>
        </div>
        
        <div className="min-h-[200px]">
          {isLoading && (
            <div className="flex items-center justify-center h-32">
              <ArrowPathIcon className="h-8 w-8 animate-spin text-blue-500" />
            </div>
          )}
          
          {error && (
            <div className="text-red-600 dark:text-red-400 p-4 bg-red-50 dark:bg-red-900/20 rounded">
              {error}
            </div>
          )}
          
          {data && !isLoading && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Estratégia:</h4>
                  <p className="text-gray-600 dark:text-gray-400">{data.strategy}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Timestamp:</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{data.timestamp}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Dados:</h4>
                <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded text-sm overflow-x-auto">
                  {JSON.stringify(data.data, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CacheDemo() {
  const [selectedCache, setSelectedCache] = useState('force-cache');
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cacheStrategies.map((cache) => (
          <button
            key={cache.name}
            onClick={() => setSelectedCache(cache.name)}
            className={`p-4 rounded-lg border-2 text-left transition-all ${
              selectedCache === cache.name
                ? `border-${cache.color}-500 bg-${cache.color}-50 dark:bg-${cache.color}-900/20`
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
              {cache.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {cache.description}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mb-2">
              {cache.useCase}
            </p>
            <code className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded block">
              {cache.example}
            </code>
          </button>
        ))}
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Estratégia: {selectedCache}
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Comportamento:</h4>
            <p className="text-gray-600 dark:text-gray-400">
              {cacheStrategies.find(c => c.name === selectedCache)?.description}
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Melhor para:</h4>
            <p className="text-gray-600 dark:text-gray-400">
              {cacheStrategies.find(c => c.name === selectedCache)?.useCase}
            </p>
          </div>
        </div>
        
        <div className="mt-4">
          <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Exemplo de uso:</h4>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
            <code className="text-sm text-gray-800 dark:text-gray-200">
              {`const res = await fetch('https://api.example.com/data', {
  ${cacheStrategies.find(c => c.name === selectedCache)?.example}
});`}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DataFetchingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Data Fetching
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Estratégias avançadas de busca de dados, cache e revalidação no Next.js
          </p>
        </div>

        <div className="space-y-12">
          {/* Estratégias de Fetching */}
          <DemoSection
            title="Estratégias de Data Fetching"
            description="Compare diferentes abordagens para buscar dados"
          >
            <FetchingDemo />
          </DemoSection>

          {/* Estratégias de Cache */}
          <DemoSection
            title="Estratégias de Cache"
            description="Entenda como controlar o cache de dados"
          >
            <CacheDemo />
          </DemoSection>

          {/* Fetch Básico */}
          <DemoSection
            title="Fetch Básico"
            description="Implementação simples de data fetching"
          >
            <CodeBlock
              code={codeExamples.basicFetch}
              language="typescript"
              filename="app/posts/page.tsx"
            />
          </DemoSection>

          {/* Cache Strategies */}
          <DemoSection
            title="Estratégias de Cache"
            description="Diferentes opções de cache no Next.js 13+"
          >
            <CodeBlock
              code={codeExamples.cacheStrategies}
              language="typescript"
              filename="Cache Options"
            />
          </DemoSection>

          {/* Revalidate Strategies */}
          <DemoSection
            title="Estratégias de Revalidação"
            description="Como e quando revalidar dados cached"
          >
            <CodeBlock
              code={codeExamples.revalidateStrategies}
              language="typescript"
              filename="lib/revalidate.ts"
            />
          </DemoSection>

          {/* Parallel Fetching */}
          <DemoSection
            title="Fetch Paralelo"
            description="Otimize performance com Promise.all"
          >
            <CodeBlock
              code={codeExamples.parallelFetching}
              language="typescript"
              filename="app/dashboard/page.tsx"
            />
          </DemoSection>

          {/* Streaming Data */}
          <DemoSection
            title="Streaming com Suspense"
            description="Carregamento progressivo de componentes"
          >
            <CodeBlock
              code={codeExamples.streamingData}
              language="typescript"
              filename="app/posts/page.tsx"
            />
          </DemoSection>

          {/* Error Handling */}
          <DemoSection
            title="Tratamento de Erros"
            description="Estratégias robustas para lidar com falhas"
          >
            <CodeBlock
              code={codeExamples.errorHandling}
              language="typescript"
              filename="lib/api.ts"
            />
          </DemoSection>

          {/* Client-side Fetching */}
          <DemoSection
            title="Client-side Fetching"
            description="Busca de dados no cliente com hooks"
          >
            <CodeBlock
              code={codeExamples.clientSideFetching}
              language="typescript"
              filename="hooks/usePosts.ts"
            />
          </DemoSection>

          {/* ISR */}
          <DemoSection
            title="Incremental Static Regeneration"
            description="Combine SSG com revalidação automática"
          >
            <CodeBlock
              code={codeExamples.incrementalStaticRegeneration}
              language="typescript"
              filename="app/posts/[id]/page.tsx"
            />
          </DemoSection>

          {/* Data Fetching Patterns */}
          <DemoSection
            title="Padrões Avançados"
            description="Técnicas avançadas para data fetching"
          >
            <CodeBlock
              code={codeExamples.dataFetchingPatterns}
              language="typescript"
              filename="patterns/data-fetching.ts"
            />
          </DemoSection>

          {/* Optimistic Updates */}
          <DemoSection
            title="Updates Otimistas"
            description="Melhore UX com atualizações otimistas"
          >
            <CodeBlock
              code={codeExamples.optimisticUpdates}
              language="typescript"
              filename="hooks/useOptimisticPosts.ts"
            />
          </DemoSection>

          {/* Links de Navegação */}
          <div className="flex justify-between items-center pt-8 border-t border-gray-200 dark:border-gray-700">
            <Link
              href="/nextjs/font-optimization"
              className="flex items-center space-x-2 text-cyan-600 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-300 transition-colors"
            >
              <span>← Font Optimization</span>
            </Link>
            
            <Link
              href="/nextjs"
              className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
            >
              Voltar ao Next.js
            </Link>
            
            <Link
              href="/nextjs/route-groups"
              className="flex items-center space-x-2 text-cyan-600 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-300 transition-colors"
            >
              <span>Route Groups →</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}