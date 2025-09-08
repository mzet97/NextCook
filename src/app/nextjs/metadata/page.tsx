import { Metadata } from 'next';
import CodeBlock from '@/components/CodeBlock';
import DemoSection from '@/components/DemoSection';

// Metadata estático para esta página
export const metadata: Metadata = {
  title: 'Metadata API - Next.js Demo',
  description: 'Demonstração completa da Metadata API do Next.js 15.5.2 com exemplos práticos de SEO e Open Graph.',
  keywords: ['Next.js', 'Metadata', 'SEO', 'Open Graph', 'Twitter Cards'],
  authors: [{ name: 'Next.js Demo Team' }],
  creator: 'Next.js Demo',
  publisher: 'Next.js Demo',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://nextjs-demo.com/nextjs/metadata',
    title: 'Metadata API - Next.js Demo',
    description: 'Aprenda a usar a Metadata API do Next.js 15.5.2 para otimizar SEO e compartilhamento social.',
    siteName: 'Next.js Demo',
    images: [
      {
        url: 'https://nextjs-demo.com/og-metadata.jpg',
        width: 1200,
        height: 630,
        alt: 'Metadata API do Next.js',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Metadata API - Next.js Demo',
    description: 'Demonstração completa da Metadata API do Next.js 15.5.2',
    creator: '@nextjsdemo',
    images: ['https://nextjs-demo.com/twitter-metadata.jpg'],
  },
  alternates: {
    canonical: 'https://nextjs-demo.com/nextjs/metadata',
    languages: {
      'en-US': 'https://nextjs-demo.com/en/nextjs/metadata',
      'pt-BR': 'https://nextjs-demo.com/pt/nextjs/metadata',
    },
  },
  category: 'technology',
};

export default function MetadataPage() {
  const staticMetadataCode = `// app/page.tsx - Metadata estático
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Minha Página',
  description: 'Descrição da minha página',
  keywords: ['Next.js', 'React', 'TypeScript'],
  authors: [{ name: 'João Silva', url: 'https://joao.dev' }],
  creator: 'João Silva',
  publisher: 'Minha Empresa',
  
  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://meusite.com',
    title: 'Minha Página',
    description: 'Descrição para redes sociais',
    siteName: 'Meu Site',
    images: [
      {
        url: 'https://meusite.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Imagem de compartilhamento',
      },
    ],
  },
  
  // Twitter Cards
  twitter: {
    card: 'summary_large_image',
    title: 'Minha Página',
    description: 'Descrição para Twitter',
    creator: '@meutwitter',
    images: ['https://meusite.com/twitter-image.jpg'],
  },
  
  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Alternates
  alternates: {
    canonical: 'https://meusite.com',
    languages: {
      'en-US': 'https://meusite.com/en',
      'pt-BR': 'https://meusite.com/pt',
    },
  },
};

export default function Page() {
  return <div>Conteúdo da página</div>;
}`;

  const dynamicMetadataCode = `// app/blog/[slug]/page.tsx - Metadata dinâmico
import { Metadata } from 'next';

interface Props {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

// Função para gerar metadata dinamicamente
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Buscar dados do post
  const post = await fetch(\`https://api.blog.com/posts/\${params.slug}\`)
    .then((res) => res.json());
  
  // Acessar metadata do pai
  const previousImages = (await parent).openGraph?.images || [];
  
  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: post.author.name }],
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
    
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: [post.featuredImage, ...previousImages],
    },
    
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.featuredImage],
    },
    
    alternates: {
      canonical: \`https://blog.com/\${params.slug}\`,
    },
  };
}

export default function BlogPost({ params }: Props) {
  return <div>Post: {params.slug}</div>;
}`;

  const layoutMetadataCode = `// app/layout.tsx - Metadata base
import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://meusite.com'),
  title: {
    template: '%s | Meu Site',
    default: 'Meu Site - Página Inicial',
  },
  description: 'Descrição padrão do site',
  applicationName: 'Meu App',
  referrer: 'origin-when-cross-origin',
  keywords: ['Next.js', 'React', 'JavaScript'],
  authors: [{ name: 'Equipe Dev' }],
  creator: 'Minha Empresa',
  publisher: 'Minha Empresa',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  
  // Ícones
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/apple-touch-icon-precomposed.png',
    },
  },
  
  // Manifest
  manifest: '/manifest.json',
  
  // Viewport
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  
  // Verificação
  verification: {
    google: 'google-verification-code',
    yandex: 'yandex-verification-code',
    yahoo: 'yahoo-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}`;

  const generateStaticParamsCode = `// app/blog/[slug]/page.tsx - Geração estática
export async function generateStaticParams() {
  const posts = await fetch('https://api.blog.com/posts')
    .then((res) => res.json());
  
  return posts.map((post: any) => ({
    slug: post.slug,
  }));
}

// app/products/[category]/[id]/page.tsx - Múltiplos parâmetros
export async function generateStaticParams() {
  const products = await fetch('https://api.store.com/products')
    .then((res) => res.json());
  
  return products.map((product: any) => ({
    category: product.category,
    id: product.id,
  }));
}

// Limitando geração estática
export const dynamicParams = false; // 404 para params não gerados

// Revalidação
export const revalidate = 3600; // Revalida a cada hora`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-cyan-100 dark:from-gray-900 dark:to-gray-800 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent mb-6">
            Metadata API
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Demonstração da Metadata API do Next.js 15.5.2 - geração de meta tags para SEO, Open Graph e Twitter Cards.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-1.5 mb-12">
          <DemoSection title="Meta Tags Atuais">
            <div className="space-y-4">
              <div className="p-4 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg border border-emerald-300 dark:border-emerald-700">
                <h3 className="text-lg font-semibold text-emerald-800 dark:text-emerald-200 mb-2">
                  📄 Meta Tags Básicas
                </h3>
                <div className="space-y-2 text-sm text-emerald-700 dark:text-emerald-300">
                  <p><strong>Title:</strong> Metadata API - Next.js Demo</p>
                  <p><strong>Description:</strong> Demonstração completa da Metadata API...</p>
                  <p><strong>Keywords:</strong> Next.js, Metadata, SEO, Open Graph</p>
                  <p><strong>Author:</strong> Next.js Demo Team</p>
                </div>
              </div>
              
              <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg border border-blue-300 dark:border-blue-700">
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  🌐 Open Graph
                </h3>
                <div className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                  <p><strong>Type:</strong> website</p>
                  <p><strong>Locale:</strong> pt_BR</p>
                  <p><strong>Site Name:</strong> Next.js Demo</p>
                  <p><strong>Image:</strong> 1200x630 px</p>
                </div>
              </div>
              
              <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-lg border border-purple-300 dark:border-purple-700">
                <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-2">
                  🐦 Twitter Cards
                </h3>
                <div className="space-y-2 text-sm text-purple-700 dark:text-purple-300">
                  <p><strong>Card:</strong> summary_large_image</p>
                  <p><strong>Creator:</strong> @nextjsdemo</p>
                  <p><strong>Image:</strong> Otimizada para Twitter</p>
                </div>
              </div>
            </div>
          </DemoSection>

          <DemoSection title="Robots & SEO">
            <div className="space-y-4">
              <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-lg border border-green-300 dark:border-green-700">
                <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
                  🤖 Robots Meta
                </h3>
                <div className="space-y-2 text-sm text-green-700 dark:text-green-300">
                  <p><strong>Index:</strong> ✅ Permitido</p>
                  <p><strong>Follow:</strong> ✅ Permitido</p>
                  <p><strong>Max Image Preview:</strong> Large</p>
                  <p><strong>Max Snippet:</strong> Unlimited</p>
                </div>
              </div>
              
              <div className="p-4 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg border border-yellow-300 dark:border-yellow-700">
                <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                  🔗 Alternates
                </h3>
                <div className="space-y-2 text-sm text-yellow-700 dark:text-yellow-300">
                  <p><strong>Canonical:</strong> URL principal</p>
                  <p><strong>Languages:</strong> pt-BR, en-US</p>
                  <p><strong>Hreflang:</strong> Configurado</p>
                </div>
              </div>
              
              <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-lg border border-red-300 dark:border-red-700">
                <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
                  📊 Structured Data
                </h3>
                <div className="space-y-2 text-sm text-red-700 dark:text-red-300">
                  <p><strong>Category:</strong> Technology</p>
                  <p><strong>Publisher:</strong> Next.js Demo</p>
                  <p><strong>Creator:</strong> Next.js Demo Team</p>
                </div>
              </div>
            </div>
          </DemoSection>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Exemplo: Metadata Estático</h2>
          <CodeBlock code={staticMetadataCode} language="tsx" />
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Exemplo: Metadata Dinâmico</h2>
          <CodeBlock code={dynamicMetadataCode} language="tsx" />
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Exemplo: Layout Base</h2>
          <CodeBlock code={layoutMetadataCode} language="tsx" />
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Exemplo: generateStaticParams</h2>
          <CodeBlock code={generateStaticParamsCode} language="tsx" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">🎯 Tipos de Metadata</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Básico:</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• title, description, keywords</li>
                  <li>• authors, creator, publisher</li>
                  <li>• category, classification</li>
                  <li>• robots, viewport</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Social:</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Open Graph (Facebook, LinkedIn)</li>
                  <li>• Twitter Cards</li>
                  <li>• Images otimizadas</li>
                  <li>• Structured data</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">⚡ Melhores Práticas</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">SEO:</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Títulos únicos e descritivos</li>
                  <li>• Descriptions de 150-160 caracteres</li>
                  <li>• Keywords relevantes</li>
                  <li>• URLs canônicas</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Performance:</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Imagens otimizadas (1200x630)</li>
                  <li>• Metadata base para URLs</li>
                  <li>• Geração estática quando possível</li>
                  <li>• Cache adequado</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-emerald-100 to-cyan-100 dark:from-emerald-900/30 dark:to-cyan-900/30 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">🚀 Benefícios da Metadata API</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1.5">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">SEO</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Melhor indexação</li>
                <li>• Rich snippets</li>
                <li>• Ranking melhorado</li>
                <li>• Structured data</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Social</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Cards atrativas</li>
                <li>• Compartilhamento otimizado</li>
                <li>• Branding consistente</li>
                <li>• Engajamento maior</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">DX</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Type-safe</li>
                <li>• Geração automática</li>
                <li>• Composição flexível</li>
                <li>• Herança de metadata</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}