'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRightIcon, FolderIcon, DocumentIcon } from '@heroicons/react/24/outline';
import CodeBlock from '@/components/CodeBlock';

interface FileTreeItemType {
  name: string;
  type: 'file' | 'folder';
  description?: string;
  children?: FileTreeItemType[];
}

const routeStructure: FileTreeItemType[] = [
  {
    name: 'app/',
    type: 'folder' as const,
    children: [
      { name: 'layout.tsx', type: 'file' as const, description: 'Layout raiz da aplicação' },
      { name: 'page.tsx', type: 'file' as const, description: 'Página inicial (/)' },
      { name: 'globals.css', type: 'file' as const, description: 'Estilos globais' },
      {
        name: 'nextjs/',
        type: 'folder' as const,
        children: [
          { name: 'page.tsx', type: 'file' as const, description: 'Página /nextjs' },
          { name: 'layout.tsx', type: 'file' as const, description: 'Layout da seção Next.js' },
          {
            name: 'app-router/',
            type: 'folder' as const,
            children: [
              { name: 'page.tsx', type: 'file' as const, description: 'Esta página (/nextjs/app-router)' }
            ]
          }
        ]
      }
    ]
  }
];

const codeExamples = {
  layout: `// app/layout.tsx - Layout Raiz
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "React Hooks Next.js Demo",
  description: "Aplicação de demonstração didática",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}`,
  page: `// app/page.tsx - Página Inicial
export default function HomePage() {
  return (
    <div className="min-h-screen">
      <section className="hero-section">
        <h1>React Hooks Next.js Demo</h1>
        <p>Aplicação de demonstração didática</p>
      </section>
    </div>
  );
}`,
  nestedLayout: `// app/nextjs/layout.tsx - Layout Aninhado
export default function NextJSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="nextjs-section">
      <div className="sidebar">
        <nav>
          <Link href="/nextjs">Overview</Link>
          <Link href="/nextjs/app-router">App Router</Link>
          <Link href="/nextjs/rendering">Rendering</Link>
        </nav>
      </div>
      <div className="content">
        {children}
      </div>
    </div>
  );
}`,
  loading: `// app/nextjs/loading.tsx - Loading UI
export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
    </div>
  );
}`,
  error: `// app/nextjs/error.tsx - Error Boundary
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Algo deu errado!</h2>
      <p className="text-gray-600 mb-4">{error.message}</p>
      <button
        onClick={reset}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Tentar novamente
      </button>
    </div>
  );
}`
};

const appRouterFeatures = [
  {
    title: 'Roteamento baseado em arquivos',
    description: 'Crie rotas simplesmente adicionando arquivos na pasta app/',
    icon: '📁',
    color: 'blue'
  },
  {
    title: 'Layouts aninhados',
    description: 'Compartilhe UI entre rotas com layouts hierárquicos',
    icon: '🏗️',
    color: 'green'
  },
  {
    title: 'Loading States',
    description: 'Mostre loading UI automaticamente durante navegação',
    icon: '⏳',
    color: 'yellow'
  },
  {
    title: 'Error Boundaries',
    description: 'Trate erros graciosamente com error.tsx',
    icon: '🚨',
    color: 'red'
  },
  {
    title: 'Parallel Routes',
    description: 'Renderize múltiplas páginas simultaneamente',
    icon: '🔀',
    color: 'purple'
  },
  {
    title: 'Intercepting Routes',
    description: 'Intercepte rotas para modais e overlays',
    icon: '🎯',
    color: 'pink'
  }
];

function FileTreeItem({ item, level = 0 }: { item: FileTreeItemType; level?: number }) {
  const [isOpen, setIsOpen] = useState(level < 2);
  
  return (
    <div className="select-none">
      <div 
        className={`flex items-center py-1 px-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer`}
        style={{ paddingLeft: `${level * 20 + 8}px` }}
        onClick={() => item.children && setIsOpen(!isOpen)}
      >
        {item.type === 'folder' ? (
          <FolderIcon className={`h-4 w-4 mr-2 ${isOpen ? 'text-blue-500' : 'text-gray-500'}`} />
        ) : (
          <DocumentIcon className="h-4 w-4 mr-2 text-gray-400" />
        )}
        <span className={`text-sm ${item.type === 'folder' ? 'font-medium text-gray-900 dark:text-gray-100' : 'text-gray-700 dark:text-gray-300'}`}>
          {item.name}
        </span>
        {item.description && (
          <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
            - {item.description}
          </span>
        )}
      </div>
      {item.children && isOpen && (
        <div>
          {item.children.map((child: FileTreeItemType, index: number) => (
            <FileTreeItem key={index} item={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function AppRouterPage() {
  const [activeExample, setActiveExample] = useState<keyof typeof codeExamples>('layout');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative section-container">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 glass-effect rounded-full text-blue-100 text-sm font-medium mb-6">
              <span className="mr-2">🗂️</span>
              Next.js App Router
            </div>
            <h1 className="hero-title">
              App Router
              <span className="block text-yellow-300">Sistema de Roteamento</span>
            </h1>
            <p className="hero-subtitle">
              Explore o sistema de roteamento moderno do Next.js 13+ com layouts aninhados, loading states e error boundaries.
            </p>
          </div>
        </div>
      </section>

      {/* File Structure */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="section-title">
              Estrutura de Arquivos
            </h2>
            <p className="section-description">
              O App Router usa a estrutura de pastas para definir rotas
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
              <div className="font-mono text-sm">
                {routeStructure.map((item, index) => (
                  <FileTreeItem key={index} item={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="section-title">
              Recursos do App Router
            </h2>
            <p className="section-description">
              Funcionalidades avançadas para uma melhor experiência de desenvolvimento
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {appRouterFeatures.map((feature) => (
              <div key={feature.title} className="card text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  feature.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900' :
                  feature.color === 'green' ? 'bg-green-100 dark:bg-green-900' :
                  feature.color === 'yellow' ? 'bg-yellow-100 dark:bg-yellow-900' :
                  feature.color === 'red' ? 'bg-red-100 dark:bg-red-900' :
                  feature.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900' :
                  'bg-pink-100 dark:bg-pink-900'
                }`}>
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
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
              Exemplos de Código
            </h2>
            <p className="section-description">
              Veja como implementar diferentes aspectos do App Router
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
                  {example.charAt(0).toUpperCase() + example.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Code Display */}
          <div className="max-w-5xl mx-auto">
            <CodeBlock
              code={codeExamples[activeExample]}
              language="typescript"
              title={`${activeExample.charAt(0).toUpperCase() + activeExample.slice(1)} Example`}
            />
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="section-container">
          <div className="flex justify-between items-center">
            <Link
              href="/nextjs"
              className="inline-flex items-center px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              ← Voltar para Next.js
            </Link>
            <Link
              href="/nextjs/rendering"
              className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              Próximo: Rendering
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}