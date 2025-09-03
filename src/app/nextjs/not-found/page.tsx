'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CodeBlock from '@/components/CodeBlock';
import DemoSection from '@/components/DemoSection';
import { 
  HomeIcon, 
  MagnifyingGlassIcon, 
  ExclamationTriangleIcon,
  ArrowLeftIcon,
  DocumentMagnifyingGlassIcon
} from '@heroicons/react/24/outline';

const codeExamples = {
  basicNotFound: `// app/not-found.tsx - Global Not Found
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Página não encontrada
      </h2>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        A página que você está procurando não existe ou foi movida.
      </p>
      <Link 
        href="/"
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Voltar ao início
      </Link>
    </div>
  );
}`,

  segmentNotFound: `// app/blog/not-found.tsx - Seção específica
export default function BlogNotFound() {
  return (
    <div className="blog-not-found">
      <div className="container">
        <h1>Post não encontrado</h1>
        <p>
          O post que você está procurando não existe ou foi removido.
        </p>
        
        <div className="actions">
          <Link href="/blog" className="btn-primary">
            Ver todos os posts
          </Link>
          
          <Link href="/blog/search" className="btn-secondary">
            Buscar posts
          </Link>
        </div>
        
        <div className="suggestions">
          <h3>Posts populares:</h3>
          <ul>
            <li><Link href="/blog/getting-started">Getting Started</Link></li>
            <li><Link href="/blog/best-practices">Best Practices</Link></li>
            <li><Link href="/blog/advanced-tips">Advanced Tips</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}`,

  dynamicNotFound: `// app/blog/[slug]/page.tsx - Trigger notFound()
import { notFound } from 'next/navigation';

interface Post {
  id: string;
  title: string;
  content: string;
  published: boolean;
}

async function getPost(slug: string): Promise<Post | null> {
  try {
    const res = await fetch(\`https://api.example.com/posts/\${slug}\`);
    
    if (!res.ok) {
      return null;
    }
    
    const post = await res.json();
    
    // Verifica se o post está publicado
    if (!post.published) {
      return null;
    }
    
    return post;
  } catch (error) {
    return null;
  }
}

export default async function BlogPost({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const post = await getPost(params.slug);
  
  // Trigger not-found.tsx
  if (!post) {
    notFound();
  }
  
  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}`,

  customNotFound: `// app/products/not-found.tsx - Not Found customizado
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProductNotFound() {
  const [countdown, setCountdown] = useState(10);
  const router = useRouter();
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          router.push('/products');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [router]);
  
  return (
    <div className="product-not-found">
      <div className="error-animation">
        <div className="floating-product">📦</div>
      </div>
      
      <h1>Produto não encontrado</h1>
      <p>
        O produto que você está procurando não está disponível.
      </p>
      
      <div className="countdown">
        <p>Redirecionando em {countdown} segundos...</p>
        <div className="progress-bar">
          <div 
            className="progress" 
            style={{ width: \`\${(10 - countdown) * 10}%\` }}
          />
        </div>
      </div>
      
      <div className="actions">
        <Link href="/products" className="btn-primary">
          Ver produtos
        </Link>
        
        <button 
          onClick={() => router.back()}
          className="btn-secondary"
        >
          Voltar
        </button>
      </div>
    </div>
  );
}`,

  searchNotFound: `// app/search/not-found.tsx - Not Found com busca
'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchNotFound() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(\`/search?q=\${encodeURIComponent(searchTerm)}\`);
    }
  };
  
  return (
    <div className="search-not-found">
      <h1>Nenhum resultado encontrado</h1>
      
      {query && (
        <p>
          Não encontramos resultados para <strong>"{query}"</strong>
        </p>
      )}
      
      <div className="search-suggestions">
        <h3>Tente:</h3>
        <ul>
          <li>Verificar a ortografia</li>
          <li>Usar termos mais gerais</li>
          <li>Usar sinônimos</li>
          <li>Remover filtros</li>
        </ul>
      </div>
      
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tente uma nova busca..."
          className="search-input"
        />
        <button type="submit" className="search-button">
          Buscar
        </button>
      </form>
      
      <div className="popular-searches">
        <h3>Buscas populares:</h3>
        <div className="tags">
          <Link href="/search?q=react" className="tag">React</Link>
          <Link href="/search?q=nextjs" className="tag">Next.js</Link>
          <Link href="/search?q=typescript" className="tag">TypeScript</Link>
          <Link href="/search?q=javascript" className="tag">JavaScript</Link>
        </div>
      </div>
    </div>
  );
}`,

  nestedNotFound: `// Estrutura de Not Found aninhado:
// app/
//   not-found.tsx              // Global 404
//   blog/
//     not-found.tsx            // Blog 404
//     [slug]/
//       page.tsx               // Pode chamar notFound()
//   products/
//     not-found.tsx            // Products 404
//     [category]/
//       not-found.tsx          // Category 404
//       [id]/
//         page.tsx             // Pode chamar notFound()
//   admin/
//     not-found.tsx            // Admin 404 (com autenticação)

// app/admin/not-found.tsx
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';

export default async function AdminNotFound() {
  const user = await getCurrentUser();
  
  // Redireciona se não estiver autenticado
  if (!user || user.role !== 'admin') {
    redirect('/login');
  }
  
  return (
    <div className="admin-not-found">
      <h1>Página administrativa não encontrada</h1>
      <p>A página que você está procurando não existe no painel admin.</p>
      
      <div className="admin-actions">
        <Link href="/admin" className="btn-primary">
          Dashboard Admin
        </Link>
        
        <Link href="/admin/users" className="btn-secondary">
          Gerenciar Usuários
        </Link>
      </div>
    </div>
  );
}`,

  notFoundWithAnalytics: `// app/not-found.tsx - Com analytics
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function NotFound() {
  const pathname = usePathname();
  
  useEffect(() => {
    // Registra 404 no analytics
    if (typeof window !== 'undefined') {
      // Google Analytics
      gtag('event', 'page_not_found', {
        page_path: pathname,
        page_title: '404 - Page Not Found'
      });
      
      // Ou outro serviço de analytics
      analytics.track('404 Error', {
        path: pathname,
        timestamp: new Date().toISOString()
      });
    }
  }, [pathname]);
  
  return (
    <div className="not-found-page">
      <h1>404 - Página não encontrada</h1>
      <p>URL tentada: {pathname}</p>
      
      <div className="error-report">
        <p>Este erro foi registrado automaticamente.</p>
        <button 
          onClick={() => {
            // Enviar feedback adicional
            const feedback = prompt('Descreva o que você estava tentando fazer:');
            if (feedback) {
              analytics.track('404 Feedback', {
                path: pathname,
                feedback: feedback
              });
            }
          }}
        >
          Reportar problema
        </button>
      </div>
    </div>
  );
}`,

  notFoundMiddleware: `// middleware.ts - Redirect antes do 404
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const redirects = {
  '/old-blog': '/blog',
  '/old-products': '/products',
  '/contact-us': '/contact',
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Verifica redirects personalizados
  if (pathname in redirects) {
    return NextResponse.redirect(
      new URL(redirects[pathname as keyof typeof redirects], request.url)
    );
  }
  
  // Redirect de URLs com trailing slash
  if (pathname.endsWith('/') && pathname !== '/') {
    return NextResponse.redirect(
      new URL(pathname.slice(0, -1), request.url)
    );
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};`,

  generateStaticParams404: `// app/blog/[slug]/page.tsx - 404 com generateStaticParams
export async function generateStaticParams() {
  const posts = await fetch('https://api.example.com/posts')
    .then(res => res.json());
  
  return posts.map((post: any) => ({
    slug: post.slug,
  }));
}

// Esta função determina o comportamento para slugs não gerados
export const dynamicParams = false; // 404 para slugs não listados
// export const dynamicParams = true; // Permite slugs dinâmicos

export default async function BlogPost({ 
  params 
}: { 
  params: { slug: string } 
}) {
  // Com dynamicParams = false, esta página só será renderizada
  // para slugs retornados por generateStaticParams
  
  const post = await getPost(params.slug);
  
  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}`
};

const notFoundTypes = [
  {
    type: 'Global',
    file: 'app/not-found.tsx',
    description: 'Página 404 padrão para toda a aplicação',
    useCase: 'URLs que não correspondem a nenhuma rota',
    color: 'blue',
    icon: '🌐'
  },
  {
    type: 'Segmento',
    file: 'app/blog/not-found.tsx',
    description: '404 específico para uma seção',
    useCase: 'Contexto específico com ações relevantes',
    color: 'green',
    icon: '📁'
  },
  {
    type: 'Dinâmico',
    file: 'notFound() function',
    description: 'Triggered programaticamente',
    useCase: 'Recursos que não existem ou não estão disponíveis',
    color: 'purple',
    icon: '⚡'
  },
  {
    type: 'Condicional',
    file: 'app/admin/not-found.tsx',
    description: '404 com lógica de autenticação',
    useCase: 'Áreas restritas ou condicionais',
    color: 'orange',
    icon: '🔒'
  }
];

function NotFoundDemo() {
  const [selectedType, setSelectedType] = useState('Global');
  const [showDemo, setShowDemo] = useState(false);
  const router = useRouter();

  const renderNotFoundDemo = () => {
    switch (selectedType) {
      case 'Global':
        return (
          <div className="text-center py-12">
            <div className="text-6xl font-bold text-gray-400 mb-4">404</div>
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
              Página não encontrada
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              A página que você está procurando não existe ou foi movida.
            </p>
            <div className="space-x-4">
              <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Voltar ao início
              </button>
            </div>
          </div>
        );
        
      case 'Segmento':
        return (
          <div className="py-12">
            <div className="text-center mb-8">
              <DocumentMagnifyingGlassIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
                Post não encontrado
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                O post que você está procurando não existe ou foi removido.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Ações:</h3>
                <div className="space-y-2">
                  <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                    Ver todos os posts
                  </button>
                  <button className="w-full px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                    Buscar posts
                  </button>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Posts populares:</h3>
                <div className="space-y-1 text-sm">
                  <div className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">Getting Started</div>
                  <div className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">Best Practices</div>
                  <div className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">Advanced Tips</div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'Dinâmico':
        return (
          <div className="text-center py-12">
            <ExclamationTriangleIcon className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
              Recurso não encontrado
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Este recurso foi chamado programaticamente via notFound()
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-6">
              <code className="text-sm">
                if (!resource) &#123; notFound(); &#125;
              </code>
            </div>
            <button className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
              Tentar novamente
            </button>
          </div>
        );
        
      case 'Condicional':
        return (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🔒</div>
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
              Acesso restrito
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Esta página não existe ou você não tem permissão para acessá-la.
            </p>
            <div className="space-x-4">
              <button className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                Fazer login
              </button>
              <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                Voltar
              </button>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {notFoundTypes.map((type) => (
          <button
            key={type.type}
            onClick={() => setSelectedType(type.type)}
            className={`p-4 rounded-lg border-2 text-left transition-all ${
              selectedType === type.type
                ? `border-${type.color}-500 bg-${type.color}-50 dark:bg-${type.color}-900/20`
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-xl">{type.icon}</span>
              <h3 className="font-semibold text-gray-800 dark:text-white">
                {type.type}
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {type.description}
            </p>
            <code className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded block mb-2">
              {type.file}
            </code>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              {type.useCase}
            </p>
          </button>
        ))}
      </div>
      
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 border-b border-gray-200 dark:border-gray-600">
          <h3 className="font-semibold text-gray-800 dark:text-white">
            {selectedType} Not Found Demo
          </h3>
        </div>
        
        <div className="min-h-[400px]">
          {renderNotFoundDemo()}
        </div>
      </div>
    </div>
  );
}

function NotFoundFeatures() {
  const features = [
    {
      title: 'Hierarquia de Not Found',
      description: 'Next.js procura not-found.tsx do mais específico para o mais geral',
      example: 'app/blog/[slug]/not-found.tsx → app/blog/not-found.tsx → app/not-found.tsx',
      icon: '📂'
    },
    {
      title: 'notFound() Function',
      description: 'Trigger programático para mostrar a página not-found mais próxima',
      example: 'if (!post) { notFound(); }',
      icon: '⚡'
    },
    {
      title: 'SEO Friendly',
      description: 'Retorna status HTTP 404 correto para mecanismos de busca',
      example: 'Status: 404 Not Found',
      icon: '🔍'
    },
    {
      title: 'Customização por Contexto',
      description: 'Diferentes layouts e ações baseados na seção da aplicação',
      example: 'Blog: "Ver posts" | Produtos: "Ver catálogo"',
      icon: '🎨'
    }
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {features.map((feature, index) => (
        <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
          <div className="flex items-center space-x-3 mb-4">
            <span className="text-2xl">{feature.icon}</span>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              {feature.title}
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-3">
            {feature.description}
          </p>
          <code className="text-sm bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded block">
            {feature.example}
          </code>
        </div>
      ))}
    </div>
  );
}

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Not Found Pages
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Crie páginas 404 customizadas e contextuais no Next.js
          </p>
        </div>

        <div className="space-y-12">
          {/* Features */}
          <DemoSection
            title="Recursos do Not Found"
            description="Entenda como o Next.js gerencia páginas não encontradas"
          >
            <NotFoundFeatures />
          </DemoSection>

          {/* Demo Interativo */}
          <DemoSection
            title="Tipos de Not Found"
            description="Explore diferentes implementações de páginas 404"
          >
            <NotFoundDemo />
          </DemoSection>

          {/* Not Found Básico */}
          <DemoSection
            title="Not Found Global"
            description="Página 404 padrão para toda a aplicação"
          >
            <CodeBlock
              code={codeExamples.basicNotFound}
              language="typescript"
              filename="app/not-found.tsx"
            />
          </DemoSection>

          {/* Not Found de Segmento */}
          <DemoSection
            title="Not Found por Seção"
            description="404 específico para uma seção da aplicação"
          >
            <CodeBlock
              code={codeExamples.segmentNotFound}
              language="typescript"
              filename="app/blog/not-found.tsx"
            />
          </DemoSection>

          {/* Not Found Dinâmico */}
          <DemoSection
            title="Not Found Dinâmico"
            description="Trigger programático com notFound()"
          >
            <CodeBlock
              code={codeExamples.dynamicNotFound}
              language="typescript"
              filename="app/blog/[slug]/page.tsx"
            />
          </DemoSection>

          {/* Not Found Customizado */}
          <DemoSection
            title="Not Found Customizado"
            description="404 com funcionalidades avançadas"
          >
            <CodeBlock
              code={codeExamples.customNotFound}
              language="typescript"
              filename="app/products/not-found.tsx"
            />
          </DemoSection>

          {/* Not Found com Busca */}
          <DemoSection
            title="Not Found com Busca"
            description="404 para resultados de busca"
          >
            <CodeBlock
              code={codeExamples.searchNotFound}
              language="typescript"
              filename="app/search/not-found.tsx"
            />
          </DemoSection>

          {/* Not Found Aninhado */}
          <DemoSection
            title="Estrutura Aninhada"
            description="Hierarquia de páginas not-found"
          >
            <CodeBlock
              code={codeExamples.nestedNotFound}
              language="typescript"
              filename="Estrutura Hierárquica"
            />
          </DemoSection>

          {/* Not Found com Analytics */}
          <DemoSection
            title="Not Found com Analytics"
            description="Rastreamento de erros 404"
          >
            <CodeBlock
              code={codeExamples.notFoundWithAnalytics}
              language="typescript"
              filename="app/not-found.tsx"
            />
          </DemoSection>

          {/* Middleware para Redirects */}
          <DemoSection
            title="Middleware para Redirects"
            description="Previna 404s com redirects automáticos"
          >
            <CodeBlock
              code={codeExamples.notFoundMiddleware}
              language="typescript"
              filename="middleware.ts"
            />
          </DemoSection>

          {/* generateStaticParams */}
          <DemoSection
            title="404 com generateStaticParams"
            description="Controle de 404 em páginas estáticas"
          >
            <CodeBlock
              code={codeExamples.generateStaticParams404}
              language="typescript"
              filename="app/blog/[slug]/page.tsx"
            />
          </DemoSection>

          {/* Links de Navegação */}
          <div className="flex justify-between items-center pt-8 border-t border-gray-200 dark:border-gray-700">
            <Link
              href="/nextjs/loading-ui"
              className="flex items-center space-x-2 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors"
            >
              <span>← Loading UI</span>
            </Link>
            
            <Link
              href="/nextjs"
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Voltar ao Next.js
            </Link>
            
            <Link
              href="/nextjs/font-optimization"
              className="flex items-center space-x-2 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors"
            >
              <span>Font Optimization →</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}