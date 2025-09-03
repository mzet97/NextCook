'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRightIcon, ClockIcon, ServerIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';
import CodeBlock from '@/components/CodeBlock';

const renderingTypes = [
  {
    title: 'Static Site Generation (SSG)',
    description: 'Páginas são geradas em build time e servidas como arquivos estáticos.',
    icon: <ServerIcon className="h-8 w-8" />,
    color: 'green',
    pros: [
      'Performance máxima',
      'SEO otimizado',
      'Cache eficiente',
      'Baixo custo de hosting'
    ],
    cons: [
      'Dados podem ficar desatualizados',
      'Build time pode ser longo',
      'Não adequado para conteúdo dinâmico'
    ],
    useCase: 'Blogs, documentação, landing pages'
  },
  {
    title: 'Server-Side Rendering (SSR)',
    description: 'Páginas são renderizadas no servidor a cada requisição.',
    icon: <ComputerDesktopIcon className="h-8 w-8" />,
    color: 'blue',
    pros: [
      'Dados sempre atualizados',
      'SEO otimizado',
      'Primeira renderização rápida',
      'Funciona sem JavaScript'
    ],
    cons: [
      'Latência do servidor',
      'Maior carga no servidor',
      'TTFB (Time to First Byte) maior'
    ],
    useCase: 'E-commerce, dashboards, conteúdo personalizado'
  },
  {
    title: 'Client-Side Rendering (CSR)',
    description: 'Páginas são renderizadas no navegador usando JavaScript.',
    icon: <ClockIcon className="h-8 w-8" />,
    color: 'purple',
    pros: [
      'Interatividade rica',
      'Navegação rápida',
      'Menor carga no servidor',
      'Experiência SPA'
    ],
    cons: [
      'SEO limitado',
      'Loading inicial mais lento',
      'Requer JavaScript',
      'Pode ter layout shift'
    ],
    useCase: 'Aplicações interativas, dashboards privados'
  }
];

const codeExamples = {
  ssg: `// Static Site Generation (SSG)
// app/blog/[slug]/page.tsx

interface Post {
  id: string;
  title: string;
  content: string;
  publishedAt: string;
}

interface PageProps {
  params: { slug: string };
}

// Esta função roda em build time
export async function generateStaticParams() {
  const posts = await fetch('https://api.example.com/posts').then(res => res.json());
  
  return posts.map((post: Post) => ({
    slug: post.id,
  }));
}

// Esta função também roda em build time
async function getPost(slug: string): Promise<Post> {
  const post = await fetch(\`https://api.example.com/posts/\${slug}\`)
    .then(res => res.json());
  return post;
}

export default async function BlogPost({ params }: PageProps) {
  const post = await getPost(params.slug);
  
  return (
    <article>
      <h1>{post.title}</h1>
      <time>{post.publishedAt}</time>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}

// Opcional: Revalidação incremental
export const revalidate = 3600; // Revalida a cada hora`,
  ssr: `// Server-Side Rendering (SSR)
// app/dashboard/page.tsx

interface User {
  id: string;
  name: string;
  email: string;
}

interface DashboardData {
  user: User;
  stats: {
    orders: number;
    revenue: number;
    customers: number;
  };
}

// Esta função roda a cada requisição no servidor
async function getDashboardData(userId: string): Promise<DashboardData> {
  const [user, stats] = await Promise.all([
    fetch(\`https://api.example.com/users/\${userId}\`, {
      // Não usar cache - sempre buscar dados frescos
      cache: 'no-store'
    }).then(res => res.json()),
    fetch(\`https://api.example.com/stats/\${userId}\`, {
      cache: 'no-store'
    }).then(res => res.json())
  ]);
  
  return { user, stats };
}

export default async function Dashboard() {
  // Simular obtenção do userId (normalmente viria de auth)
  const userId = 'user-123';
  const data = await getDashboardData(userId);
  
  return (
    <div>
      <h1>Bem-vindo, {data.user.name}!</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Pedidos</h3>
          <p>{data.stats.orders}</p>
        </div>
        <div className="stat-card">
          <h3>Receita</h3>
          <p>R$ {data.stats.revenue}</p>
        </div>
        <div className="stat-card">
          <h3>Clientes</h3>
          <p>{data.stats.customers}</p>
        </div>
      </div>
    </div>
  );
}`,
  csr: `// Client-Side Rendering (CSR)
// app/interactive/page.tsx
'use client';

import { useState, useEffect } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
}

export default function InteractiveCatalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price'>('name');
  
  // Buscar dados no cliente
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchProducts();
  }, []);
  
  // Filtrar e ordenar produtos
  const filteredProducts = products
    .filter(product => 
      product.name.toLowerCase().includes(filter.toLowerCase()) ||
      product.category.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return a.price - b.price;
    });
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div>
      <div className="filters">
        <input
          type="text"
          placeholder="Filtrar produtos..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'name' | 'price')}
          className="border rounded px-3 py-2 ml-2"
        >
          <option value="name">Ordenar por Nome</option>
          <option value="price">Ordenar por Preço</option>
        </select>
      </div>
      
      <div className="products-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p className="category">{product.category}</p>
            <p className="price">R$ {product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}`,
  hybrid: `// Renderização Híbrida
// Combinando diferentes estratégias

// app/product/[id]/page.tsx - SSG para informações básicas
export async function generateStaticParams() {
  const products = await fetch('https://api.example.com/products')
    .then(res => res.json());
  
  return products.map((product: any) => ({
    id: product.id,
  }));
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  // Dados estáticos (SSG)
  const product = await fetch(\`https://api.example.com/products/\${params.id}\`)
    .then(res => res.json());
  
  return (
    <div>
      {/* Conteúdo estático */}
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>R$ {product.price}</p>
      
      {/* Componente dinâmico (CSR) */}
      <ProductReviews productId={params.id} />
      <ProductRecommendations productId={params.id} />
    </div>
  );
}

// Componente separado para dados dinâmicos
'use client';
function ProductReviews({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState([]);
  
  useEffect(() => {
    // Buscar reviews em tempo real
    fetch(\`/api/products/\${productId}/reviews\`)
      .then(res => res.json())
      .then(setReviews);
  }, [productId]);
  
  return (
    <div>
      <h3>Avaliações</h3>
      {reviews.map((review: any) => (
        <div key={review.id}>
          <p>{review.comment}</p>
          <span>⭐ {review.rating}</span>
        </div>
      ))}
    </div>
  );
}`
};

const performanceMetrics = [
  { label: 'SSG', fcp: '0.8s', lcp: '1.2s', cls: '0.05', tti: '1.5s', color: 'green' },
  { label: 'SSR', fcp: '1.2s', lcp: '1.8s', cls: '0.08', tti: '2.1s', color: 'blue' },
  { label: 'CSR', fcp: '2.1s', lcp: '3.2s', cls: '0.15', tti: '3.8s', color: 'purple' }
];

export default function RenderingPage() {
  const [activeExample, setActiveExample] = useState<keyof typeof codeExamples>('ssg');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString('pt-BR'));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-600 via-blue-600 to-purple-700 py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative section-container">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 glass-effect rounded-full text-white text-sm font-medium mb-6">
              <span className="mr-2">⚡</span>
              Estratégias de Renderização
            </div>
            <h1 className="hero-title">
              Rendering Types
              <span className="block text-yellow-300">SSG • SSR • CSR</span>
            </h1>
            <p className="hero-subtitle">
              Compare diferentes estratégias de renderização e entenda quando usar cada uma.
            </p>
            <div className="glass-effect px-4 py-2 rounded-lg text-blue-100 text-sm mt-6">
              🕒 Hora atual (CSR): {currentTime}
            </div>
          </div>
        </div>
      </section>

      {/* Performance Comparison */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="section-title">
              Comparação de Performance
            </h2>
            <p className="section-description">
              Métricas de performance para cada estratégia de renderização
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden">
              <thead className="bg-gray-100 dark:bg-gray-600">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Estratégia
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    FCP
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    LCP
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    CLS
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    TTI
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                {performanceMetrics.map((metric) => (
                  <tr key={metric.label}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        metric.color === 'green' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        metric.color === 'blue' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                        'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                      }`}>
                        {metric.label}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {metric.fcp}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {metric.lcp}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {metric.cls}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {metric.tti}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Rendering Types */}
      <section className="py-20">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="section-title">
              Estratégias de Renderização
            </h2>
            <p className="section-description">
              Entenda as características de cada abordagem
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {renderingTypes.map((type) => (
              <div key={type.title} className="card">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  type.color === 'green' ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400' :
                  type.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' :
                  'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400'
                }`}>
                  {type.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 text-center">
                  {type.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-center">
                  {type.description}
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-green-700 dark:text-green-400 mb-2">✅ Vantagens</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      {type.pros.map((pro, index) => (
                        <li key={index}>• {pro}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-red-700 dark:text-red-400 mb-2">❌ Desvantagens</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      {type.cons.map((con, index) => (
                        <li key={index}>• {con}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pt-2 border-t border-gray-200 dark:border-gray-600">
                    <h4 className="font-medium text-blue-700 dark:text-blue-400 mb-1">💡 Casos de Uso</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{type.useCase}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="section-title">
              Exemplos de Implementação
            </h2>
            <p className="section-description">
              Veja como implementar cada estratégia na prática
            </p>
          </div>

          {/* Example Tabs */}
          <div className="flex justify-center mb-8 overflow-x-auto">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-1 flex space-x-1">
              {Object.keys(codeExamples).map((example) => (
                <button
                  key={example}
                  onClick={() => setActiveExample(example as keyof typeof codeExamples)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                    activeExample === example
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                  }`}
                >
                  {example.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Code Display */}
          <div className="max-w-5xl mx-auto">
            <CodeBlock
              code={codeExamples[activeExample]}
              language="typescript"
              title={`${activeExample.toUpperCase()} Implementation`}
            />
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="section-container">
          <div className="flex justify-between items-center">
            <Link
              href="/nextjs/app-router"
              className="inline-flex items-center px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              ← App Router
            </Link>
            <Link
              href="/nextjs/images"
              className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              Próximo: Images
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}