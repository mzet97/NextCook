import { Suspense } from 'react';
import CodeBlock from '@/components/CodeBlock';
import DemoSection from '@/components/DemoSection';

// Componente que simula carregamento lento
async function SlowComponent({ delay, name }: { delay: number; name: string }) {
  await new Promise(resolve => setTimeout(resolve, delay));
  
  return (
    <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg border border-blue-300 dark:border-blue-700">
      <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
        {name}
      </h3>
      <p className="text-blue-700 dark:text-blue-300">
        Componente carregado após {delay}ms
      </p>
      <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
        Timestamp: {new Date().toLocaleTimeString()}
      </p>
    </div>
  );
}

// Componente de dados do usuário
async function UserProfile() {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const user = {
    name: 'João Silva',
    email: 'joao@example.com',
    avatar: '/avatars/joao.jpg',
    joinDate: '2023-01-15',
    posts: 42,
    followers: 128
  };

  return (
    <div className="p-6 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg border border-purple-300 dark:border-purple-700">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 bg-purple-300 dark:bg-purple-600 rounded-full flex items-center justify-center">
          <span className="text-2xl font-bold text-purple-800 dark:text-purple-200">
            {user.name.charAt(0)}
          </span>
        </div>
        <div>
          <h3 className="text-xl font-bold text-purple-800 dark:text-purple-200">{user.name}</h3>
          <p className="text-purple-600 dark:text-purple-300">{user.email}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{user.posts}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Posts</p>
        </div>
        <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{user.followers}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Seguidores</p>
        </div>
        <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
          <p className="text-sm font-bold text-purple-600 dark:text-purple-400">{user.joinDate}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Membro desde</p>
        </div>
      </div>
    </div>
  );
}

// Componente de posts recentes
async function RecentPosts() {
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const posts = [
    { id: 1, title: 'Introdução ao Next.js 15', excerpt: 'Descubra as novidades...', date: '2024-01-15' },
    { id: 2, title: 'Server Components na prática', excerpt: 'Como usar efetivamente...', date: '2024-01-12' },
    { id: 3, title: 'Streaming e Suspense', excerpt: 'Melhorando a UX...', date: '2024-01-10' }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Posts Recentes</h3>
      {posts.map(post => (
        <div key={post.id} className="p-4 bg-green-100 dark:bg-green-900/30 rounded-lg border border-green-300 dark:border-green-700">
          <h4 className="font-semibold text-green-800 dark:text-green-200 mb-1">{post.title}</h4>
          <p className="text-green-700 dark:text-green-300 text-sm mb-2">{post.excerpt}</p>
          <p className="text-xs text-green-600 dark:text-green-400">{post.date}</p>
        </div>
      ))}
    </div>
  );
}

// Componente de comentários
async function Comments() {
  await new Promise(resolve => setTimeout(resolve, 2500));
  
  const comments = [
    { id: 1, author: 'Maria', text: 'Excelente artigo!', time: '2h atrás' },
    { id: 2, author: 'Pedro', text: 'Muito útil, obrigado!', time: '4h atrás' },
    { id: 3, author: 'Ana', text: 'Quando sai a parte 2?', time: '6h atrás' }
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Comentários</h3>
      {comments.map(comment => (
        <div key={comment.id} className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg border border-yellow-300 dark:border-yellow-700">
          <div className="flex justify-between items-start mb-1">
            <span className="font-semibold text-yellow-800 dark:text-yellow-200">{comment.author}</span>
            <span className="text-xs text-yellow-600 dark:text-yellow-400">{comment.time}</span>
          </div>
          <p className="text-yellow-700 dark:text-yellow-300 text-sm">{comment.text}</p>
        </div>
      ))}
    </div>
  );
}

// Loading components
function ProfileSkeleton() {
  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 animate-pulse">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-32"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-48"></div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="p-3 bg-gray-200 dark:bg-gray-600 rounded-lg">
            <div className="h-6 bg-gray-300 dark:bg-gray-500 rounded mb-2"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-500 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PostsSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-32 mb-4"></div>
      {[1, 2, 3].map(i => (
        <div key={i} className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 animate-pulse">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-full mb-2"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
        </div>
      ))}
    </div>
  );
}

function CommentsSkeleton() {
  return (
    <div className="space-y-3">
      <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-24 mb-4"></div>
      {[1, 2, 3].map(i => (
        <div key={i} className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 animate-pulse">
          <div className="flex justify-between items-start mb-2">
            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-12"></div>
          </div>
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
        </div>
      ))}
    </div>
  );
}

export default function StreamingPage() {
  const streamingCode = `// app/page.tsx
import { Suspense } from 'react';

// Componentes que carregam dados
async function UserProfile() {
  const user = await fetchUser();
  return <div>{user.name}</div>;
}

async function Posts() {
  const posts = await fetchPosts();
  return (
    <div>
      {posts.map(post => (
        <article key={post.id}>{post.title}</article>
      ))}
    </div>
  );
}

// Loading components
function ProfileSkeleton() {
  return <div className="animate-pulse">Carregando perfil...</div>;
}

function PostsSkeleton() {
  return <div className="animate-pulse">Carregando posts...</div>;
}

// Página com streaming
export default function Page() {
  return (
    <div>
      <h1>Dashboard</h1>
      
      {/* Cada Suspense boundary permite streaming independente */}
      <Suspense fallback={<ProfileSkeleton />}>
        <UserProfile />
      </Suspense>
      
      <Suspense fallback={<PostsSkeleton />}>
        <Posts />
      </Suspense>
    </div>
  );
}`;

  const loadingCode = `// app/loading.tsx - Loading UI para toda a página
export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
    </div>
  );
}

// app/dashboard/loading.tsx - Loading específico para /dashboard
export default function DashboardLoading() {
  return (
    <div className="p-8">
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-300 rounded w-1/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      </div>
    </div>
  );
}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            Streaming & Suspense
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Demonstração do Streaming do Next.js 15.5.2 - carregamento progressivo de componentes para melhor experiência do usuário.
          </p>
        </div>

        <div className="mb-12">
          <DemoSection title="Perfil do Usuário (Streaming)">
            <Suspense fallback={<ProfileSkeleton />}>
              <UserProfile />
            </Suspense>
          </DemoSection>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <DemoSection title="Posts Recentes">
            <Suspense fallback={<PostsSkeleton />}>
              <RecentPosts />
            </Suspense>
          </DemoSection>

          <DemoSection title="Comentários">
            <Suspense fallback={<CommentsSkeleton />}>
              <Comments />
            </Suspense>
          </DemoSection>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <DemoSection title="Componente Rápido">
            <Suspense fallback={<div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg animate-pulse">Carregando...</div>}>
              <SlowComponent delay={500} name="Componente Rápido" />
            </Suspense>
          </DemoSection>

          <DemoSection title="Componente Médio">
            <Suspense fallback={<div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg animate-pulse">Carregando...</div>}>
              <SlowComponent delay={1500} name="Componente Médio" />
            </Suspense>
          </DemoSection>

          <DemoSection title="Componente Lento">
            <Suspense fallback={<div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg animate-pulse">Carregando...</div>}>
              <SlowComponent delay={3000} name="Componente Lento" />
            </Suspense>
          </DemoSection>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Exemplo: Streaming com Suspense</h2>
          <CodeBlock code={streamingCode} language="tsx" />
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Exemplo: Loading UI</h2>
          <CodeBlock code={loadingCode} language="tsx" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">🌊 Como funciona o Streaming</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Processo:</h3>
                <ol className="space-y-2 text-gray-600 dark:text-gray-400 list-decimal list-inside">
                  <li>HTML inicial é enviado imediatamente</li>
                  <li>Componentes lentos mostram fallback</li>
                  <li>Dados são carregados em paralelo</li>
                  <li>HTML é atualizado progressivamente</li>
                </ol>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Benefícios:</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Primeira renderização mais rápida</li>
                  <li>• Melhor percepção de performance</li>
                  <li>• Carregamento não-bloqueante</li>
                  <li>• Melhor Core Web Vitals</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">⚡ Melhores Práticas</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Suspense Boundaries:</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Use múltiplos boundaries</li>
                  <li>• Granularidade adequada</li>
                  <li>• Fallbacks informativos</li>
                  <li>• Evite boundaries muito aninhados</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Loading States:</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Skeletons que imitam o conteúdo</li>
                  <li>• Animações suaves</li>
                  <li>• Feedback visual claro</li>
                  <li>• Consistência no design</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">🎯 Estratégias de Streaming</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Por Prioridade</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Conteúdo crítico primeiro</li>
                <li>• Dados secundários depois</li>
                <li>• Componentes opcionais por último</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Por Velocidade</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Cache primeiro</li>
                <li>• Dados rápidos em seguida</li>
                <li>• Consultas lentas por último</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Por Dependência</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Dados independentes em paralelo</li>
                <li>• Dependências em sequência</li>
                <li>• Fallbacks para falhas</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}