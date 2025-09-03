'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  className?: string;
}

// Mapeamento de rotas para labels mais amigáveis
const routeLabels: Record<string, string> = {
  '': 'Home',
  'hooks': 'React Hooks',
  'nextjs': 'Next.js',
  'snippets': 'Snippets',
  'zustand': 'Zustand',
  'tailwind': 'Tailwind CSS',
  'forms': 'Formulários',
  'testing': 'Testes',
  'backend': 'Backend',
  'advanced': 'Avançado',
  'ui-libraries': 'UI Libraries',
  'state-management': 'Gerenciamento de Estado',
  'devops': 'DevOps',
  'monitoring': 'Monitoramento',
  'performance': 'Performance',
  'security': 'Segurança',
  'accessibility': 'Acessibilidade',
  'typescript': 'TypeScript',
  'troubleshooting': 'Troubleshooting',
  // Next.js routes
  'app-router': 'App Router',
  'server-components': 'Server Components',
  'data-fetching': 'Data Fetching',
  'dynamic-routes': 'Dynamic Routes',
  'route-handlers': 'Route Handlers',
  'middleware': 'Middleware',
  'error-handling': 'Error Handling',
  'caching': 'Caching',
  'images': 'Images',
  'font-optimization': 'Font Optimization',
  'metadata': 'Metadata',
  'loading-ui': 'Loading UI',
  'not-found': 'Not Found',
  'parallel-routes': 'Parallel Routes',
  'intercepting-routes': 'Intercepting Routes',
  'route-groups': 'Route Groups',
  'rendering': 'Rendering',
  'server-actions': 'Server Actions',
  'streaming': 'Streaming',
  // Hooks routes
  'basic': 'Básico',
  'advanced': 'Avançado',
  'custom': 'Customizados',
  'use-state': 'useState',
  'use-effect': 'useEffect',
  'use-context': 'useContext',
  'use-reducer': 'useReducer',
  'use-callback': 'useCallback',
  'use-memo': 'useMemo',
  'use-ref': 'useRef',
  'use-layout-effect': 'useLayoutEffect',
  'use-imperative-handle': 'useImperativeHandle',
  'use-debug-value': 'useDebugValue',
  'use-deferred-value': 'useDeferredValue',
  'use-transition': 'useTransition',
  'use-id': 'useId',
  'use-sync-external-store': 'useSyncExternalStore',
  'use-insertion-effect': 'useInsertionEffect',
  'use-optimistic': 'useOptimistic',
  'use-action-state': 'useActionState',
  // State management
  'redux-toolkit': 'Redux Toolkit',
  'jotai': 'Jotai',
  'tanstack-query': 'TanStack Query',
  'valtio': 'Valtio',
  // UI Libraries
  'responsive': 'Responsive',
  'themes': 'Themes',
  'utilities': 'Utilities',
  'shadcn': 'Shadcn/ui',
  'shadcn-ui': 'Shadcn UI',
  'radix-ui': 'Radix UI',
  'framer-motion': 'Framer Motion',
  'lucide-icons': 'Lucide Icons',
  'react-hook-form': 'React Hook Form',
  'zod': 'Zod Validation',
  'integration': 'Form Integration',
  // Testing
  'jest': 'Jest',
  'react-testing-library': 'React Testing Library',
  'playwright': 'Playwright',
  'patterns': 'TS Patterns',
  'types': 'TS Types',
  // Backend
  'prisma': 'Prisma',
  'supabase': 'Supabase',
  'trpc': 'tRPC',
  'nextauth': 'Auth.js',
  // API Development
  'api-development': 'API Development',
  'route-handlers': 'Route Handlers',
  'http-methods': 'Métodos HTTP',
  'middleware': 'Middleware',
  'validation': 'Validação',
  'authentication': 'Autenticação',
  'error-handling': 'Tratamento de Erros',
  'testing': 'Testes',
  'best-practices': 'Melhores Práticas',
  // DevOps
  'docker': 'Docker',
  'vercel': 'Vercel',
  'github-actions': 'GitHub Actions',
  'environment': 'Environment',
  'analytics': 'Analytics',
  'sentry': 'Sentry',
  'uptime': 'Uptime',
  // Advanced
  'i18n': 'Internacionalização',
  'pwa': 'PWA',
  'real-time': 'Real-time',
  'file-upload': 'File Upload',
  // Security
  'csrf': 'CSRF Protection',
  'headers': 'Security Headers',
  'input-sanitization': 'Input Sanitization',
  'rate-limiting': 'Rate Limiting'
};

export default function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  const pathname = usePathname();
  
  // Se items customizados foram fornecidos, use-os
  if (items) {
    return (
      <nav className={`flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 ${className}`} aria-label="Breadcrumb">
        <Link 
          href="/" 
          className="flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <Home className="w-4 h-4" />
        </Link>
        {items.map((item, index) => (
          <div key={item.href} className="flex items-center space-x-2">
            <ChevronRight className="w-4 h-4 text-gray-400" />
            {index === items.length - 1 ? (
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {item.label}
              </span>
            ) : (
              <Link 
                href={item.href}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {item.label}
              </Link>
            )}
          </div>
        ))}
      </nav>
    );
  }
  
  // Gerar breadcrumbs automaticamente baseado na URL
  const pathSegments = pathname.split('/').filter(Boolean);
  
  if (pathSegments.length === 0) {
    return null; // Não mostrar breadcrumbs na home
  }
  
  const breadcrumbItems: BreadcrumbItem[] = [];
  let currentPath = '';
  
  pathSegments.forEach((segment) => {
    currentPath += `/${segment}`;
    const label = routeLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
    
    breadcrumbItems.push({
      label,
      href: currentPath
    });
  });
  
  return (
    <nav className={`flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 ${className}`} aria-label="Breadcrumb">
      <Link 
        href="/" 
        className="flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        title="Voltar para Home"
      >
        <Home className="w-4 h-4" />
      </Link>
      {breadcrumbItems.map((item, index) => (
        <div key={item.href} className="flex items-center space-x-2">
          <ChevronRight className="w-4 h-4 text-gray-400" />
          {index === breadcrumbItems.length - 1 ? (
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {item.label}
            </span>
          ) : (
            <Link 
              href={item.href}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              title={`Ir para ${item.label}`}
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}

// Hook para usar breadcrumbs customizados
export function useBreadcrumbs(items: BreadcrumbItem[]) {
  return { items };
}

// Componente de breadcrumb para páginas específicas
export function PageBreadcrumbs({ 
  title, 
  parentPath, 
  parentLabel,
  className 
}: { 
  title: string;
  parentPath?: string;
  parentLabel?: string;
  className?: string;
}) {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);
  
  const items: BreadcrumbItem[] = [];
  
  if (parentPath && parentLabel) {
    items.push({ label: parentLabel, href: parentPath });
  } else if (pathSegments.length > 1) {
    // Auto-gerar parent baseado na URL
    const parentSegment = pathSegments[pathSegments.length - 2];
    const parentHref = pathname.substring(0, pathname.lastIndexOf('/'));
    const parentLabelAuto = routeLabels[parentSegment] || parentSegment.charAt(0).toUpperCase() + parentSegment.slice(1);
    
    items.push({ label: parentLabelAuto, href: parentHref });
  }
  
  items.push({ label: title, href: pathname });
  
  return <Breadcrumbs items={items} className={className} />;
}