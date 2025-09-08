'use client';

import { useState } from 'react';
import Link from 'next/link';
import CodeBlock from '@/components/CodeBlock';
import DemoSection from '@/components/DemoSection';
import { 
  FolderIcon,
  RectangleGroupIcon,
  TagIcon,
  CubeTransparentIcon,
  AdjustmentsHorizontalIcon,
  Square3Stack3DIcon
} from '@heroicons/react/24/outline';

const codeExamples = {
  basicRouteGroups: `// Estrutura básica de Route Groups:
// app/
//   (marketing)/
//     about/
//       page.tsx           // URL: /about
//     contact/
//       page.tsx           // URL: /contact
//     layout.tsx          // Layout para marketing
//   (shop)/
//     products/
//       page.tsx           // URL: /products
//     cart/
//       page.tsx           // URL: /cart
//     layout.tsx          // Layout para shop
//   (auth)/
//     login/
//       page.tsx           // URL: /login
//     register/
//       page.tsx           // URL: /register
//     layout.tsx          // Layout para auth
//   layout.tsx            // Root layout
//   page.tsx              // URL: /`,

  marketingLayout: `// app/(marketing)/layout.tsx
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="marketing-layout">
      <header className="marketing-header">
        <nav>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/products">Shop</Link>
        </nav>
      </header>
      
      <main className="marketing-content">
        {children}
      </main>
      
      <footer className="marketing-footer">
        <p>&copy; 2024 Marketing Site</p>
      </footer>
    </div>
  );
}`,

  shopLayout: `// app/(shop)/layout.tsx
export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="shop-layout">
      <header className="shop-header">
        <div className="shop-nav">
          <Link href="/products">Products</Link>
          <Link href="/categories">Categories</Link>
          <Link href="/cart">Cart (2)</Link>
          <Link href="/account">Account</Link>
        </div>
        
        <div className="search-bar">
          <input 
            type="search" 
            placeholder="Search products..." 
          />
        </div>
      </header>
      
      <div className="shop-container">
        <aside className="shop-sidebar">
          <div className="filters">
            <h3>Filters</h3>
            <div className="filter-group">
              <h4>Category</h4>
              <label><input type="checkbox" /> Electronics</label>
              <label><input type="checkbox" /> Clothing</label>
              <label><input type="checkbox" /> Books</label>
            </div>
          </div>
        </aside>
        
        <main className="shop-content">
          {children}
        </main>
      </div>
    </div>
  );
}`,

  authLayout: `// app/(auth)/layout.tsx
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="auth-layout">
      <div className="auth-container">
        <div className="auth-brand">
          <h1>MyApp</h1>
          <p>Welcome back!</p>
        </div>
        
        <div className="auth-form">
          {children}
        </div>
        
        <div className="auth-links">
          <Link href="/login">Login</Link>
          <span>•</span>
          <Link href="/register">Register</Link>
          <span>•</span>
          <Link href="/forgot-password">Forgot Password?</Link>
        </div>
      </div>
      
      <div className="auth-background">
        <div className="auth-pattern"></div>
      </div>
    </div>
  );
}`,

  nestedRouteGroups: `// Estrutura com Route Groups aninhados:
// app/
//   (dashboard)/
//     (analytics)/
//       reports/
//         page.tsx         // URL: /reports
//       metrics/
//         page.tsx         // URL: /metrics
//       layout.tsx         // Layout para analytics
//     (management)/
//       users/
//         page.tsx         // URL: /users
//       settings/
//         page.tsx         // URL: /settings
//       layout.tsx         // Layout para management
//     layout.tsx           // Layout geral do dashboard
//   (public)/
//     blog/
//       page.tsx           // URL: /blog
//     docs/
//       page.tsx           // URL: /docs
//     layout.tsx           // Layout público`,

  dashboardLayout: `// app/(dashboard)/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <h2>Dashboard</h2>
        </div>
        
        <nav className="sidebar-nav">
          <div className="nav-group">
            <h3>Analytics</h3>
            <Link href="/reports">Reports</Link>
            <Link href="/metrics">Metrics</Link>
          </div>
          
          <div className="nav-group">
            <h3>Management</h3>
            <Link href="/users">Users</Link>
            <Link href="/settings">Settings</Link>
          </div>
        </nav>
      </aside>
      
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>Dashboard</h1>
          <div className="user-menu">
            <span>John Doe</span>
            <button>Logout</button>
          </div>
        </header>
        
        <div className="dashboard-content">
          {children}
        </div>
      </main>
    </div>
  );
}`,

  analyticsLayout: `// app/(dashboard)/(analytics)/layout.tsx
export default function AnalyticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="analytics-layout">
      <div className="analytics-header">
        <h2>Analytics</h2>
        
        <div className="analytics-tabs">
          <Link 
            href="/reports" 
            className="tab"
          >
            Reports
          </Link>
          <Link 
            href="/metrics" 
            className="tab"
          >
            Metrics
          </Link>
        </div>
      </div>
      
      <div className="analytics-content">
        {children}
      </div>
    </div>
  );
}`,

  multipleRootLayouts: `// Múltiplos Root Layouts com Route Groups:
// app/
//   (app)/
//     layout.tsx           // Root layout para app
//     dashboard/
//       page.tsx           // URL: /dashboard
//     profile/
//       page.tsx           // URL: /profile
//   (marketing)/
//     layout.tsx           // Root layout para marketing
//     page.tsx             // URL: /
//     about/
//       page.tsx           // URL: /about
//   global-error.tsx       // Error boundary global

// app/(app)/layout.tsx - App Root Layout
export default function AppRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="app-theme">
        <div className="app-container">
          <nav className="app-nav">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/profile">Profile</Link>
          </nav>
          {children}
        </div>
      </body>
    </html>
  );
}

// app/(marketing)/layout.tsx - Marketing Root Layout
export default function MarketingRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="marketing-theme">
        <div className="marketing-container">
          <nav className="marketing-nav">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
          </nav>
          {children}
        </div>
      </body>
    </html>
  );
}`,

  conditionalLayouts: `// app/(dashboard)/layout.tsx - Layout condicional
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  
  // Redireciona se não autenticado
  if (!user) {
    redirect('/login');
  }
  
  // Layout diferente baseado no role
  if (user.role === 'admin') {
    return (
      <div className="admin-dashboard">
        <AdminSidebar />
        <main className="admin-content">
          {children}
        </main>
      </div>
    );
  }
  
  return (
    <div className="user-dashboard">
      <UserSidebar />
      <main className="user-content">
        {children}
      </main>
    </div>
  );
}`,

  routeGroupsWithParallel: `// Combinando Route Groups com Parallel Routes:
// app/
//   (dashboard)/
//     layout.tsx
//     analytics/
//       layout.tsx
//       @charts/
//         page.tsx          // Slot para gráficos
//       @tables/
//         page.tsx          // Slot para tabelas
//       page.tsx            // Conteúdo principal

// app/(dashboard)/analytics/layout.tsx
export default function AnalyticsLayout({
  children,
  charts,
  tables,
}: {
  children: React.ReactNode;
  charts: React.ReactNode;
  tables: React.ReactNode;
}) {
  return (
    <div className="analytics-layout">
      <div className="analytics-header">
        <h1>Analytics Dashboard</h1>
      </div>
      
      <div className="analytics-grid">
        <div className="main-content">
          {children}
        </div>
        
        <div className="charts-section">
          {charts}
        </div>
        
        <div className="tables-section">
          {tables}
        </div>
      </div>
    </div>
  );
}`,

  routeGroupsWithIntercepting: `// Route Groups com Intercepting Routes:
// app/
//   (shop)/
//     layout.tsx
//     products/
//       page.tsx           // Lista de produtos
//       [id]/
//         page.tsx         // Página do produto
//     (..)products/
//       [id]/
//         page.tsx         // Modal interceptado

// app/(shop)/(..)products/[id]/page.tsx
import Modal from '@/components/Modal';
import ProductDetails from '@/components/ProductDetails';

export default function ProductModal({ 
  params 
}: { 
  params: { id: string } 
}) {
  return (
    <Modal>
      <ProductDetails productId={params.id} />
    </Modal>
  );
}`,

  organizationPatterns: `// Padrões de organização com Route Groups:

// 1. Por funcionalidade
// app/
//   (auth)/           // Autenticação
//   (shop)/           // E-commerce
//   (blog)/           // Blog
//   (admin)/          // Administração

// 2. Por audiência
// app/
//   (public)/         // Visitantes
//   (members)/        // Membros
//   (staff)/          // Funcionários

// 3. Por versão de API
// app/
//   api/
//     (v1)/
//       users/
//         route.ts    // /api/users (v1)
//     (v2)/
//       users/
//         route.ts    // /api/users (v2)

// 4. Por plataforma
// app/
//   (web)/            // Interface web
//   (mobile)/         // Interface mobile
//   (desktop)/        // App desktop

// 5. Por idioma
// app/
//   (en)/
//     about/
//       page.tsx      // /about (inglês)
//   (pt)/
//     about/
//       page.tsx      // /about (português)`
};

const routeGroupPatterns = [
  {
    pattern: 'Por Funcionalidade',
    description: 'Agrupa rotas por área funcional da aplicação',
    example: '(auth), (shop), (blog), (admin)',
    useCase: 'Diferentes seções com layouts específicos',
    color: 'blue',
    icon: '🎯'
  },
  {
    pattern: 'Por Audiência',
    description: 'Organiza por tipo de usuário ou permissão',
    example: '(public), (members), (staff)',
    useCase: 'Controle de acesso e experiências personalizadas',
    color: 'green',
    icon: '👥'
  },
  {
    pattern: 'Por Versão',
    description: 'Separa diferentes versões da API ou interface',
    example: '(v1), (v2), (beta)',
    useCase: 'Versionamento de APIs e features experimentais',
    color: 'purple',
    icon: '🔄'
  },
  {
    pattern: 'Por Plataforma',
    description: 'Layouts específicos para diferentes dispositivos',
    example: '(web), (mobile), (desktop)',
    useCase: 'Experiências otimizadas por plataforma',
    color: 'orange',
    icon: '📱'
  }
];

const routeGroupBenefits = [
  {
    benefit: 'Organização Lógica',
    description: 'Agrupe rotas relacionadas sem afetar URLs',
    icon: '📁',
    color: 'blue'
  },
  {
    benefit: 'Layouts Específicos',
    description: 'Diferentes layouts para diferentes seções',
    icon: '🎨',
    color: 'green'
  },
  {
    benefit: 'Múltiplos Root Layouts',
    description: 'Diferentes estruturas HTML para diferentes seções',
    icon: '🌳',
    color: 'purple'
  },
  {
    benefit: 'Melhor Manutenibilidade',
    description: 'Código mais organizado e fácil de manter',
    icon: '🔧',
    color: 'orange'
  }
];

function RouteGroupDemo() {
  const [selectedPattern, setSelectedPattern] = useState('Por Funcionalidade');
  const [showStructure, setShowStructure] = useState(true);

  const getStructureExample = () => {
    switch (selectedPattern) {
      case 'Por Funcionalidade':
        return {
          structure: [
            'app/',
            '  (marketing)/',
            '    about/page.tsx → /about',
            '    contact/page.tsx → /contact',
            '    layout.tsx',
            '  (shop)/',
            '    products/page.tsx → /products',
            '    cart/page.tsx → /cart',
            '    layout.tsx',
            '  (auth)/',
            '    login/page.tsx → /login',
            '    register/page.tsx → /register',
            '    layout.tsx'
          ],
          description: 'Cada grupo tem seu próprio layout e funcionalidades específicas'
        };
        
      case 'Por Audiência':
        return {
          structure: [
            'app/',
            '  (public)/',
            '    page.tsx → /',
            '    about/page.tsx → /about',
            '    layout.tsx',
            '  (members)/',
            '    dashboard/page.tsx → /dashboard',
            '    profile/page.tsx → /profile',
            '    layout.tsx',
            '  (staff)/',
            '    admin/page.tsx → /admin',
            '    reports/page.tsx → /reports',
            '    layout.tsx'
          ],
          description: 'Diferentes experiências baseadas no tipo de usuário'
        };
        
      case 'Por Versão':
        return {
          structure: [
            'app/',
            '  api/',
            '    (v1)/',
            '      users/route.ts → /api/users',
            '      posts/route.ts → /api/posts',
            '    (v2)/',
            '      users/route.ts → /api/users',
            '      posts/route.ts → /api/posts',
            '    (beta)/',
            '      features/route.ts → /api/features'
          ],
          description: 'Versionamento de APIs mantendo URLs consistentes'
        };
        
      case 'Por Plataforma':
        return {
          structure: [
            'app/',
            '  (web)/',
            '    dashboard/page.tsx → /dashboard',
            '    layout.tsx (web layout)',
            '  (mobile)/',
            '    dashboard/page.tsx → /dashboard',
            '    layout.tsx (mobile layout)',
            '  (desktop)/',
            '    dashboard/page.tsx → /dashboard',
            '    layout.tsx (desktop layout)'
          ],
          description: 'Layouts otimizados para diferentes plataformas'
        };
        
      default:
        return { structure: [], description: '' };
    }
  };

  const example = getStructureExample();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {routeGroupPatterns.map((pattern) => (
          <button
            key={pattern.pattern}
            onClick={() => setSelectedPattern(pattern.pattern)}
            className={`p-4 rounded-lg border-2 text-left transition-all ${
              selectedPattern === pattern.pattern
                ? `border-${pattern.color}-500 bg-${pattern.color}-50 dark:bg-${pattern.color}-900/20`
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-xl">{pattern.icon}</span>
              <h3 className="font-semibold text-gray-800 dark:text-white text-sm">
                {pattern.pattern}
              </h3>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
              {pattern.description}
            </p>
            <code className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded block mb-2">
              {pattern.example}
            </code>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              {pattern.useCase}
            </p>
          </button>
        ))}
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Padrão: {selectedPattern}
          </h3>
          <button
            onClick={() => setShowStructure(!showStructure)}
            className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
          >
            {showStructure ? 'Ocultar' : 'Mostrar'} Estrutura
          </button>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {example.description}
        </p>
        
        {showStructure && (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
            <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Estrutura de Arquivos:</h4>
            <pre className="text-sm text-gray-800 dark:text-gray-200 font-mono">
              {example.structure.join('\n')}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

function BenefitsDemo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1.5">
      {routeGroupBenefits.map((benefit, index) => (
        <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
          <div className="flex items-center space-x-3 mb-4">
            <span className="text-2xl">{benefit.icon}</span>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              {benefit.benefit}
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            {benefit.description}
          </p>
        </div>
      ))}
    </div>
  );
}

function StructureVisualizer() {
  const [selectedExample, setSelectedExample] = useState('basic');
  
  const examples = {
    basic: {
      name: 'Estrutura Básica',
      folders: [
        { name: 'app', level: 0, type: 'folder' },
        { name: '(marketing)', level: 1, type: 'group' },
        { name: 'about', level: 2, type: 'folder' },
        { name: 'page.tsx', level: 3, type: 'file', url: '/about' },
        { name: 'contact', level: 2, type: 'folder' },
        { name: 'page.tsx', level: 3, type: 'file', url: '/contact' },
        { name: 'layout.tsx', level: 2, type: 'file' },
        { name: '(shop)', level: 1, type: 'group' },
        { name: 'products', level: 2, type: 'folder' },
        { name: 'page.tsx', level: 3, type: 'file', url: '/products' },
        { name: 'layout.tsx', level: 2, type: 'file' }
      ]
    },
    nested: {
      name: 'Grupos Aninhados',
      folders: [
        { name: 'app', level: 0, type: 'folder' },
        { name: '(dashboard)', level: 1, type: 'group' },
        { name: '(analytics)', level: 2, type: 'group' },
        { name: 'reports', level: 3, type: 'folder' },
        { name: 'page.tsx', level: 4, type: 'file', url: '/reports' },
        { name: 'layout.tsx', level: 3, type: 'file' },
        { name: '(management)', level: 2, type: 'group' },
        { name: 'users', level: 3, type: 'folder' },
        { name: 'page.tsx', level: 4, type: 'file', url: '/users' },
        { name: 'layout.tsx', level: 3, type: 'file' },
        { name: 'layout.tsx', level: 2, type: 'file' }
      ]
    }
  };
  
  const getItemColor = (type: string) => {
    switch (type) {
      case 'group': return 'text-purple-600 dark:text-purple-400';
      case 'folder': return 'text-blue-600 dark:text-blue-400';
      case 'file': return 'text-gray-600 dark:text-gray-400';
      default: return 'text-gray-800 dark:text-gray-200';
    }
  };
  
  const getItemIcon = (type: string) => {
    switch (type) {
      case 'group': return '📦';
      case 'folder': return '📁';
      case 'file': return '📄';
      default: return '📄';
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex space-x-4">
        {Object.entries(examples).map(([key, example]) => (
          <button
            key={key}
            onClick={() => setSelectedExample(key)}
            className={`px-4 py-2 rounded transition-colors ${
              selectedExample === key
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {example.name}
          </button>
        ))}
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          {examples[selectedExample as keyof typeof examples].name}
        </h3>
        
        <div className="font-mono text-sm space-y-1">
          {examples[selectedExample as keyof typeof examples].folders.map((item, index) => (
            <div key={index} className="flex items-center">
              <span style={{ marginLeft: `${item.level * 20}px` }} className="flex items-center space-x-2">
                <span>{getItemIcon(item.type)}</span>
                <span className={getItemColor(item.type)}>
                  {item.name}
                  {item.type === 'group' && ' (Route Group)'}
                </span>
                {item.url && (
                  <span className="text-green-600 dark:text-green-400 text-xs">
                    → {item.url}
                  </span>
                )}
              </span>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded">
          <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Legenda:</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
            <div className="flex items-center space-x-2">
              <span>📦</span>
              <span className="text-purple-600 dark:text-purple-400">Route Group (não afeta URL)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>📁</span>
              <span className="text-blue-600 dark:text-blue-400">Pasta normal</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>📄</span>
              <span className="text-gray-600 dark:text-gray-400">Arquivo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RouteGroupsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Route Groups
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Organize rotas logicamente sem afetar a estrutura de URLs com (folder)
          </p>
        </div>

        <div className="space-y-12">
          {/* Benefícios */}
          <DemoSection
            title="Benefícios dos Route Groups"
            description="Entenda as vantagens de usar route groups"
          >
            <BenefitsDemo />
          </DemoSection>

          {/* Padrões de Organização */}
          <DemoSection
            title="Padrões de Organização"
            description="Diferentes estratégias para organizar suas rotas"
          >
            <RouteGroupDemo />
          </DemoSection>

          {/* Visualizador de Estrutura */}
          <DemoSection
            title="Visualizador de Estrutura"
            description="Veja como os route groups organizam seus arquivos"
          >
            <StructureVisualizer />
          </DemoSection>

          {/* Estrutura Básica */}
          <DemoSection
            title="Estrutura Básica"
            description="Como organizar arquivos com route groups"
          >
            <CodeBlock
              code={codeExamples.basicRouteGroups}
              language="text"
              filename="Estrutura de Route Groups"
            />
          </DemoSection>

          {/* Marketing Layout */}
          <DemoSection
            title="Layout de Marketing"
            description="Layout específico para páginas de marketing"
          >
            <CodeBlock
              code={codeExamples.marketingLayout}
              language="typescript"
              filename="app/(marketing)/layout.tsx"
            />
          </DemoSection>

          {/* Shop Layout */}
          <DemoSection
            title="Layout de E-commerce"
            description="Layout otimizado para seção de compras"
          >
            <CodeBlock
              code={codeExamples.shopLayout}
              language="typescript"
              filename="app/(shop)/layout.tsx"
            />
          </DemoSection>

          {/* Auth Layout */}
          <DemoSection
            title="Layout de Autenticação"
            description="Layout especializado para páginas de login"
          >
            <CodeBlock
              code={codeExamples.authLayout}
              language="typescript"
              filename="app/(auth)/layout.tsx"
            />
          </DemoSection>

          {/* Route Groups Aninhados */}
          <DemoSection
            title="Route Groups Aninhados"
            description="Organize com múltiplos níveis de agrupamento"
          >
            <CodeBlock
              code={codeExamples.nestedRouteGroups}
              language="text"
              filename="Estrutura Aninhada"
            />
          </DemoSection>

          {/* Dashboard Layout */}
          <DemoSection
            title="Layout de Dashboard"
            description="Layout principal para área administrativa"
          >
            <CodeBlock
              code={codeExamples.dashboardLayout}
              language="typescript"
              filename="app/(dashboard)/layout.tsx"
            />
          </DemoSection>

          {/* Analytics Layout */}
          <DemoSection
            title="Layout de Analytics"
            description="Layout aninhado para seção de analytics"
          >
            <CodeBlock
              code={codeExamples.analyticsLayout}
              language="typescript"
              filename="app/(dashboard)/(analytics)/layout.tsx"
            />
          </DemoSection>

          {/* Múltiplos Root Layouts */}
          <DemoSection
            title="Múltiplos Root Layouts"
            description="Diferentes estruturas HTML para diferentes seções"
          >
            <CodeBlock
              code={codeExamples.multipleRootLayouts}
              language="typescript"
              filename="Múltiplos Root Layouts"
            />
          </DemoSection>

          {/* Layouts Condicionais */}
          <DemoSection
            title="Layouts Condicionais"
            description="Layouts dinâmicos baseados em condições"
          >
            <CodeBlock
              code={codeExamples.conditionalLayouts}
              language="typescript"
              filename="app/(dashboard)/layout.tsx"
            />
          </DemoSection>

          {/* Route Groups com Parallel Routes */}
          <DemoSection
            title="Route Groups + Parallel Routes"
            description="Combine route groups com parallel routes"
          >
            <CodeBlock
              code={codeExamples.routeGroupsWithParallel}
              language="typescript"
              filename="Combinação Avançada"
            />
          </DemoSection>

          {/* Route Groups com Intercepting Routes */}
          <DemoSection
            title="Route Groups + Intercepting Routes"
            description="Use route groups com intercepting routes"
          >
            <CodeBlock
              code={codeExamples.routeGroupsWithIntercepting}
              language="typescript"
              filename="app/(shop)/(..)products/[id]/page.tsx"
            />
          </DemoSection>

          {/* Padrões de Organização */}
          <DemoSection
            title="Padrões de Organização"
            description="Diferentes estratégias para estruturar sua aplicação"
          >
            <CodeBlock
              code={codeExamples.organizationPatterns}
              language="text"
              filename="Padrões de Organização"
            />
          </DemoSection>

          {/* Links de Navegação */}
          <div className="flex justify-between items-center pt-8 border-t border-gray-200 dark:border-gray-700">
            <Link
              href="/nextjs/data-fetching"
              className="flex items-center space-x-2 text-violet-600 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-300 transition-colors"
            >
              <span>← Data Fetching</span>
            </Link>
            
            <Link
              href="/nextjs"
              className="px-4 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600 transition-colors"
            >
              Voltar ao Next.js
            </Link>
            
            <Link
              href="/nextjs/route-handlers"
              className="flex items-center space-x-2 text-violet-600 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-300 transition-colors"
            >
              <span>API Routes →</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}