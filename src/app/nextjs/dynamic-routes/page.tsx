'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CodeBlock from '@/components/CodeBlock';
import DemoSection from '@/components/DemoSection';

const codeExamples = {
  singleDynamic: `// app/blog/[slug]/page.tsx
export default function BlogPost({ params }: { params: { slug: string } }) {
  return (
    <div>
      <h1>Post: {params.slug}</h1>
      <p>Conteúdo do post...</p>
    </div>
  );
}

// Gera URLs como:
// /blog/primeiro-post
// /blog/segundo-post
// /blog/meu-artigo`,

  catchAll: `// app/docs/[...slug]/page.tsx
export default function DocsPage({ params }: { params: { slug: string[] } }) {
  const path = params.slug.join('/');
  
  return (
    <div>
      <h1>Documentação</h1>
      <p>Caminho: {path}</p>
      <nav>
        {params.slug.map((segment, index) => (
          <span key={index}>
            {segment}
            {index < params.slug.length - 1 && ' > '}
          </span>
        ))}
      </nav>
    </div>
  );
}

// Gera URLs como:
// /docs/getting-started
// /docs/api/authentication
// /docs/guides/deployment/vercel`,

  optionalCatchAll: `// app/shop/[[...category]]/page.tsx
export default function ShopPage({ params }: { params: { category?: string[] } }) {
  const categories = params.category || [];
  
  if (categories.length === 0) {
    return <h1>Todas as Categorias</h1>;
  }
  
  return (
    <div>
      <h1>Categoria: {categories.join(' > ')}</h1>
      <p>Produtos nesta categoria...</p>
    </div>
  );
}

// Gera URLs como:
// /shop (sem parâmetros)
// /shop/electronics
// /shop/electronics/phones
// /shop/electronics/phones/smartphones`,

  generateStaticParams: `// app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = await fetch('https://api.example.com/posts')
    .then(res => res.json());
  
  return posts.map((post: any) => ({
    slug: post.slug,
  }));
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  return <div>Post: {params.slug}</div>;
}`,

  dynamicMetadata: `// app/blog/[slug]/page.tsx
import type { Metadata } from 'next';

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const post = await fetch(\`https://api.example.com/posts/\${params.slug}\`)
    .then(res => res.json());
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}`,

  nestedDynamic: `// Estrutura de pastas:
// app/
//   user/
//     [userId]/
//       page.tsx          // /user/123
//       posts/
//         [postId]/
//           page.tsx      // /user/123/posts/456
//           comments/
//             [commentId]/
//               page.tsx  // /user/123/posts/456/comments/789

// app/user/[userId]/posts/[postId]/page.tsx
export default function UserPost({ 
  params 
}: { 
  params: { userId: string; postId: string } 
}) {
  return (
    <div>
      <h1>Post {params.postId}</h1>
      <p>Autor: {params.userId}</p>
    </div>
  );
}`
};

const routeTypes = [
  {
    type: '[slug]',
    name: 'Dynamic Route',
    description: 'Captura um único segmento dinâmico',
    example: '/blog/[slug]',
    matches: ['/blog/primeiro-post', '/blog/segundo-post'],
    notMatches: ['/blog', '/blog/post/comments'],
    color: 'blue'
  },
  {
    type: '[...slug]',
    name: 'Catch-all Route',
    description: 'Captura todos os segmentos restantes',
    example: '/docs/[...slug]',
    matches: ['/docs/getting-started', '/docs/api/auth', '/docs/guides/deploy/vercel'],
    notMatches: ['/docs'],
    color: 'green'
  },
  {
    type: '[[...slug]]',
    name: 'Optional Catch-all',
    description: 'Captura segmentos opcionalmente',
    example: '/shop/[[...category]]',
    matches: ['/shop', '/shop/electronics', '/shop/electronics/phones'],
    notMatches: [],
    color: 'purple'
  }
];

function RouteSimulator() {
  const [selectedType, setSelectedType] = useState('[slug]');
  const [testUrl, setTestUrl] = useState('/blog/meu-post');
  const [result, setResult] = useState<any>(null);
  const router = useRouter();

  const simulateRoute = () => {
    const segments = testUrl.split('/').filter(Boolean);
    
    let params: any = {};
    let matches = false;
    
    switch (selectedType) {
      case '[slug]':
        if (segments.length === 2 && segments[0] === 'blog') {
          params = { slug: segments[1] };
          matches = true;
        }
        break;
        
      case '[...slug]':
        if (segments.length >= 2 && segments[0] === 'docs') {
          params = { slug: segments.slice(1) };
          matches = true;
        }
        break;
        
      case '[[...slug]]':
        if (segments[0] === 'shop') {
          params = { category: segments.slice(1) };
          matches = true;
        }
        break;
    }
    
    setResult({ matches, params, segments });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {routeTypes.map((route) => (
          <button
            key={route.type}
            onClick={() => setSelectedType(route.type)}
            className={`p-4 rounded-lg border-2 text-left transition-all ${
              selectedType === route.type
                ? `border-${route.color}-500 bg-${route.color}-50 dark:bg-${route.color}-900/20`
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <div className="font-mono text-sm font-bold text-gray-800 dark:text-white">
              {route.type}
            </div>
            <div className="font-semibold text-gray-700 dark:text-gray-200 mt-1">
              {route.name}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {route.description}
            </div>
          </button>
        ))}
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Simulador de Rotas
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              URL para testar:
            </label>
            <input
              type="text"
              value={testUrl}
              onChange={(e) => setTestUrl(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="/blog/meu-post"
            />
          </div>
          
          <button
            onClick={simulateRoute}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Testar Rota
          </button>
          
          {result && (
            <div className="mt-4 p-4 bg-white dark:bg-gray-700 rounded-lg border">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">Match:</span>
                  <span className={`px-2 py-1 rounded text-sm ${
                    result.matches 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {result.matches ? 'Sim' : 'Não'}
                  </span>
                </div>
                
                {result.matches && (
                  <div>
                    <span className="font-medium">Params:</span>
                    <pre className="mt-1 p-2 bg-gray-100 dark:bg-gray-600 rounded text-sm overflow-x-auto">
                      {JSON.stringify(result.params, null, 2)}
                    </pre>
                  </div>
                )}
                
                <div>
                  <span className="font-medium">Segmentos:</span>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {result.segments.map((segment: string, index: number) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-sm">
                        {segment}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function NavigationDemo() {
  const router = useRouter();
  const [currentPath, setCurrentPath] = useState('/blog/primeiro-post');
  
  const routes = [
    { path: '/blog/primeiro-post', label: 'Primeiro Post', type: 'Dynamic' },
    { path: '/docs/getting-started', label: 'Getting Started', type: 'Catch-all' },
    { path: '/docs/api/authentication', label: 'API Auth', type: 'Catch-all' },
    { path: '/shop', label: 'Shop Home', type: 'Optional Catch-all' },
    { path: '/shop/electronics', label: 'Electronics', type: 'Optional Catch-all' },
    { path: '/shop/electronics/phones', label: 'Phones', type: 'Optional Catch-all' }
  ];
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {routes.map((route) => (
          <button
            key={route.path}
            onClick={() => setCurrentPath(route.path)}
            className={`p-3 rounded-lg border text-left transition-colors ${
              currentPath === route.path
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <div className="font-medium text-gray-800 dark:text-white">
              {route.label}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {route.path}
            </div>
            <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
              {route.type}
            </div>
          </button>
        ))}
      </div>
      
      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Rota atual:</div>
        <div className="font-mono text-lg text-gray-800 dark:text-white">{currentPath}</div>
      </div>
    </div>
  );
}

export default function DynamicRoutesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Dynamic Routes
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Aprenda a criar rotas dinâmicas no Next.js com [slug], [...slug] e [[...slug]]
          </p>
        </div>

        <div className="space-y-12">
          {/* Tipos de Rotas */}
          <DemoSection
            title="Tipos de Rotas Dinâmicas"
            description="Entenda as diferenças entre os três tipos de rotas dinâmicas"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {routeTypes.map((route) => (
                <div key={route.type} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-3 h-3 rounded-full bg-${route.color}-500`}></div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      {route.name}
                    </h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Sintaxe:</div>
                      <code className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        {route.type}
                      </code>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Exemplo:</div>
                      <code className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        {route.example}
                      </code>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Corresponde a:</div>
                      <div className="space-y-1">
                        {route.matches.map((match, index) => (
                          <div key={index} className="text-sm text-green-600 dark:text-green-400">
                            ✓ {match}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {route.notMatches.length > 0 && (
                      <div>
                        <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Não corresponde a:</div>
                        <div className="space-y-1">
                          {route.notMatches.map((notMatch, index) => (
                            <div key={index} className="text-sm text-red-600 dark:text-red-400">
                              ✗ {notMatch}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </DemoSection>

          {/* Simulador */}
          <DemoSection
            title="Simulador de Rotas"
            description="Teste como diferentes URLs são processadas por cada tipo de rota"
          >
            <RouteSimulator />
          </DemoSection>

          {/* Navegação Demo */}
          <DemoSection
            title="Demonstração de Navegação"
            description="Veja exemplos de rotas dinâmicas em ação"
          >
            <NavigationDemo />
          </DemoSection>

          {/* Exemplos de Código */}
          <DemoSection
            title="Dynamic Route Simples"
            description="Captura um único segmento dinâmico"
          >
            <CodeBlock
              code={codeExamples.singleDynamic}
              language="typescript"
              filename="app/blog/[slug]/page.tsx"
            />
          </DemoSection>

          <DemoSection
            title="Catch-all Routes"
            description="Captura múltiplos segmentos de URL"
          >
            <CodeBlock
              code={codeExamples.catchAll}
              language="typescript"
              filename="app/docs/[...slug]/page.tsx"
            />
          </DemoSection>

          <DemoSection
            title="Optional Catch-all Routes"
            description="Captura segmentos opcionalmente, incluindo a rota base"
          >
            <CodeBlock
              code={codeExamples.optionalCatchAll}
              language="typescript"
              filename="app/shop/[[...category]]/page.tsx"
            />
          </DemoSection>

          <DemoSection
            title="generateStaticParams"
            description="Gere páginas estáticas para rotas dinâmicas"
          >
            <CodeBlock
              code={codeExamples.generateStaticParams}
              language="typescript"
              filename="app/blog/[slug]/page.tsx"
            />
          </DemoSection>

          <DemoSection
            title="Metadata Dinâmica"
            description="Gere metadata baseada nos parâmetros da rota"
          >
            <CodeBlock
              code={codeExamples.dynamicMetadata}
              language="typescript"
              filename="app/blog/[slug]/page.tsx"
            />
          </DemoSection>

          <DemoSection
            title="Rotas Dinâmicas Aninhadas"
            description="Combine múltiplos segmentos dinâmicos"
          >
            <CodeBlock
              code={codeExamples.nestedDynamic}
              language="typescript"
              filename="app/user/[userId]/posts/[postId]/page.tsx"
            />
          </DemoSection>

          {/* Links de Navegação */}
          <div className="flex justify-between items-center pt-8 border-t border-gray-200 dark:border-gray-700">
            <Link
              href="/nextjs/app-router"
              className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
            >
              <span>← App Router</span>
            </Link>
            
            <Link
              href="/nextjs"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Voltar ao Next.js
            </Link>
            
            <Link
              href="/nextjs/parallel-routes"
              className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
            >
              <span>Parallel Routes →</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}