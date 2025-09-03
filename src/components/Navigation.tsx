'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bars3Icon, 
  XMarkIcon, 
  ChevronDownIcon,
  MagnifyingGlassIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import { 
  Code2, 
  Zap, 
  Database, 
  Palette, 
  TestTube, 
  Server, 
  Rocket, 
  FileText, 
  Sparkles, 
  ShoppingCart,
  Brain,
  Settings
} from 'lucide-react';
import { NavItem, MegaMenuCategory } from '@/types';

import { ThemeToggle } from '@/components/ThemeToggle';
import SearchBar from '@/components/SearchBar';
import { useFavorites } from '@/hooks/useFavorites';

// Mega Menu Structure - Organized by Categories
const megaMenuCategories: MegaMenuCategory[] = [
  {
    id: 'framework',
    name: 'Framework',
    description: 'Next.js & React fundamentals',
    icon: Zap,
    color: 'from-blue-500 to-cyan-500',
    items: [
      { name: 'Next.js Overview', href: '/nextjs', description: 'Framework overview' },
      { name: 'App Router', href: '/nextjs/app-router', description: 'Navegação e layouts' },
      { name: 'Server Components', href: '/nextjs/server-components', description: 'Componentes do servidor' },
      { name: 'Data Fetching', href: '/nextjs/data-fetching', description: 'Estratégias de busca' },
      { name: 'Dynamic Routes', href: '/nextjs/dynamic-routes', description: 'Rotas dinâmicas' },
      { name: 'Route Handlers', href: '/nextjs/route-handlers', description: 'API Routes' },
      { name: 'Middleware', href: '/nextjs/middleware', description: 'Middleware' },
      { name: 'Error Handling', href: '/nextjs/error-handling', description: 'Tratamento de erros' },
      { name: 'Caching', href: '/nextjs/caching', description: 'Estratégias de cache' },
      { name: 'Images', href: '/nextjs/images', description: 'Otimização de imagens' },
      { name: 'Font Optimization', href: '/nextjs/font-optimization', description: 'Otimização de fontes' },
      { name: 'Metadata', href: '/nextjs/metadata', description: 'SEO e metadados' },
      { name: 'Loading UI', href: '/nextjs/loading-ui', description: 'Estados de carregamento' },
      { name: 'Not Found', href: '/nextjs/not-found', description: 'Páginas 404' },
      { name: 'Parallel Routes', href: '/nextjs/parallel-routes', description: 'Rotas paralelas' },
      { name: 'Intercepting Routes', href: '/nextjs/intercepting-routes', description: 'Interceptação de rotas' },
      { name: 'Route Groups', href: '/nextjs/route-groups', description: 'Agrupamento de rotas' },
      { name: 'Rendering', href: '/nextjs/rendering', description: 'Estratégias de renderização' },
      { name: 'Server Actions', href: '/nextjs/server-actions', description: 'Ações do servidor' },
      { name: 'Streaming', href: '/nextjs/streaming', description: 'Streaming de dados' }
    ]
  },
  {
    id: 'development',
    name: 'Development',
    description: 'Hooks, TypeScript & Code Snippets',
    icon: Code2,
    color: 'from-purple-500 to-pink-500',
    items: [
      { name: 'React Hooks', href: '/hooks', description: 'React Hooks overview' },
      { name: 'useState', href: '/hooks/use-state', description: 'Gerenciamento de estado' },
      { name: 'useEffect', href: '/hooks/use-effect', description: 'Efeitos colaterais' },
      { name: 'useContext', href: '/hooks/use-context', description: 'Contexto React' },
      { name: 'useReducer', href: '/hooks/use-reducer', description: 'Estado complexo' },
      { name: 'useCallback', href: '/hooks/use-callback', description: 'Memoização de funções' },
      { name: 'useMemo', href: '/hooks/use-memo', description: 'Memoização de valores' },
      { name: 'useRef', href: '/hooks/use-ref', description: 'Referências' },
      { name: 'Custom Hooks', href: '/hooks/custom', description: 'Hooks personalizados' },
      { name: 'TypeScript', href: '/typescript', description: 'Type safety' },
      { name: 'TS Patterns', href: '/typescript/patterns', description: 'Padrões TypeScript' },
      { name: 'TS Types', href: '/typescript/types', description: 'Tipos avançados' },
      { name: 'Code Snippets', href: '/snippets', description: 'Biblioteca de código' }
    ]
  },
  {
    id: 'backend',
    name: 'Backend & APIs',
    description: 'Server-side development',
    icon: Server,
    color: 'from-green-500 to-emerald-500',
    items: [
      { name: 'API Development', href: '/api-development', description: 'APIs REST em Next.js' },
      { name: 'Route Handlers', href: '/api-development/route-handlers', description: 'Criação de rotas de API' },
      { name: 'HTTP Methods', href: '/api-development/http-methods', description: 'GET, POST, PUT, DELETE, PATCH' },
      { name: 'Middleware', href: '/api-development/middleware', description: 'Autenticação, CORS, rate limiting' },
      { name: 'Validation', href: '/api-development/validation', description: 'Validação de dados com Zod' },
      { name: 'Authentication', href: '/api-development/authentication', description: 'JWT, sessions, OAuth' },
      { name: 'Backend Overview', href: '/backend', description: 'Backend & APIs' },
      { name: 'Prisma', href: '/backend/prisma', description: 'ORM' },
      { name: 'Supabase', href: '/backend/supabase', description: 'BaaS' },
      { name: 'tRPC', href: '/backend/trpc', description: 'Type-safe APIs' },
      { name: 'Auth.js', href: '/backend/nextauth', description: 'Auth' }
    ]
  },
  {
    id: 'database',
    name: 'Database',
    description: 'Database design & optimization',
    icon: Database,
    color: 'from-orange-500 to-red-500',
    items: [
      { name: 'Database Overview', href: '/database', description: 'Database fundamentals' },
      { name: 'Prisma Advanced', href: '/database/prisma', description: 'Advanced Prisma usage' },
      { name: 'Migrations', href: '/database/migrations', description: 'Database migrations' },
      { name: 'Design Patterns', href: '/database/design-patterns', description: 'Database design patterns' },
      { name: 'Optimization', href: '/database/optimization', description: 'Query optimization' }
    ]
  },
  {
    id: 'frontend',
    name: 'Frontend & UI',
    description: 'User interface & design systems',
    icon: Palette,
    color: 'from-pink-500 to-rose-500',
    items: [
      { name: 'UI Libraries', href: '/ui-libraries', description: 'Interface e design' },
      { name: 'Tailwind CSS', href: '/tailwind', description: 'CSS utility-first' },
      { name: 'Responsive Design', href: '/tailwind/responsive', description: 'Design responsivo' },
      { name: 'Themes', href: '/tailwind/themes', description: 'Temas e cores' },
      { name: 'Utilities', href: '/tailwind/utilities', description: 'Classes utilitárias' },
      { name: 'Shadcn/ui', href: '/ui-libraries/shadcn-ui', description: 'Sistema de design' },
      { name: 'Radix UI', href: '/ui-libraries/radix-ui', description: 'Primitivos acessíveis' },
      { name: 'Framer Motion', href: '/ui-libraries/framer-motion', description: 'Animações' },
      { name: 'Lucide Icons', href: '/ui-libraries/lucide-icons', description: 'Ícones SVG' },
      { name: 'Forms', href: '/forms', description: 'React Hook Form + Zod' },
      { name: 'State Management', href: '/state-management', description: 'Gerenciamento de estado' },
      { name: 'Zustand', href: '/zustand', description: 'State simples' }
    ]
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    description: 'Payment systems & shopping features',
    icon: ShoppingCart,
    color: 'from-yellow-500 to-orange-500',
    items: [
      { name: 'E-commerce Overview', href: '/e-commerce', description: 'E-commerce fundamentals' },
      { name: 'Stripe Integration', href: '/e-commerce/stripe', description: 'Payment processing' },
      { name: 'Shopping Cart', href: '/e-commerce/shopping-cart', description: 'Cart functionality' }
    ]
  },
  {
    id: 'ai-ml',
    name: 'AI & ML',
    description: 'Artificial Intelligence & Machine Learning',
    icon: Brain,
    color: 'from-indigo-500 to-purple-500',
    items: [
      { name: 'AI/ML Overview', href: '/ai-ml', description: 'AI & Machine Learning' }
    ]
  },
  {
    id: 'cms',
    name: 'CMS',
    description: 'Content Management Systems',
    icon: FileText,
    color: 'from-teal-500 to-cyan-500',
    items: [
      { name: 'CMS Overview', href: '/cms', description: 'Content Management' },
      { name: 'Sanity', href: '/cms/sanity', description: 'Sanity CMS integration' },
      { name: 'MDX', href: '/cms/mdx', description: 'Markdown + JSX' }
    ]
  },
  {
    id: 'quality',
    name: 'Quality & Testing',
    description: 'Testing, performance & security',
    icon: TestTube,
    color: 'from-emerald-500 to-teal-500',
    items: [
      { name: 'Testing Overview', href: '/testing', description: 'Testes e qualidade' },
      { name: 'Jest', href: '/testing/jest', description: 'Unit tests' },
      { name: 'React Testing Library', href: '/testing/react-testing-library', description: 'Testes de componentes' },
      { name: 'Playwright', href: '/testing/playwright', description: 'E2E tests' },
      { name: 'Performance', href: '/performance', description: 'Otimização' },
      { name: 'Security', href: '/security', description: 'Segurança' },
      { name: 'CSRF Protection', href: '/security/csrf', description: 'Proteção CSRF' },
      { name: 'Security Headers', href: '/security/headers', description: 'Cabeçalhos de segurança' },
      { name: 'Accessibility', href: '/accessibility', description: 'Acessibilidade' }
    ]
  },
  {
    id: 'deploy',
    name: 'Deploy & DevOps',
    description: 'Deployment & monitoring',
    icon: Rocket,
    color: 'from-violet-500 to-purple-500',
    items: [
      { name: 'DevOps Overview', href: '/devops', description: 'DevOps & Deploy' },
      { name: 'Docker', href: '/devops/docker', description: 'Containers' },
      { name: 'Vercel', href: '/devops/vercel', description: 'Deploy' },
      { name: 'GitHub Actions', href: '/devops/github-actions', description: 'CI/CD' },
      { name: 'Environment', href: '/devops/environment', description: 'Variáveis de ambiente' },
      { name: 'Monitoring', href: '/monitoring', description: 'Analytics' },
      { name: 'Analytics', href: '/monitoring/analytics', description: 'Análise de dados' },
      { name: 'Performance Monitor', href: '/monitoring/performance', description: 'Monitoramento de performance' },
      { name: 'Sentry', href: '/monitoring/sentry', description: 'Error tracking' }
    ]
  },
  {
    id: 'advanced',
    name: 'Advanced',
    description: 'Advanced features & integrations',
    icon: Sparkles,
    color: 'from-slate-500 to-gray-500',
    items: [
      { name: 'Advanced Overview', href: '/advanced', description: 'Recursos avançados' },
      { name: 'i18n', href: '/advanced/i18n', description: 'Internacionalização' },
      { name: 'PWA', href: '/advanced/pwa', description: 'Progressive Web App' },
      { name: 'Real-time', href: '/advanced/real-time', description: 'WebSockets' },
      { name: 'File Upload', href: '/advanced/file-upload', description: 'Upload de arquivos' }
    ]
  },
  {
    id: 'tools',
    name: 'Tools & Help',
    description: 'Utilities & troubleshooting',
    icon: Settings,
    color: 'from-gray-500 to-slate-500',
    items: [
      { name: 'Favoritos', href: '/favorites', description: 'Meus favoritos' },
      { name: 'Troubleshooting', href: '/troubleshooting', description: 'Resolução de problemas' }
    ]
  }
];

// Quick access navigation items
const quickNavItems: NavItem[] = [
  { name: 'home', href: '/', description: 'Página inicial' },
  { name: 'snippets', href: '/snippets', description: 'Biblioteca de código' },
  { name: 'favorites', href: '/favorites', description: 'Meus favoritos' }
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [openMegaMenu, setOpenMegaMenu] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations('navigation');
  const { favorites } = useFavorites();
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Prepare search data from mega menu categories
  const searchData = megaMenuCategories.flatMap(category => 
    category.items.map(item => ({
      name: item.name,
      href: item.href,
      description: item.description,
      category: category.name
    }))
  );



  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target as Node)) {
        setOpenMegaMenu(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl+K para abrir busca
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        setIsSearchOpen(true);
      }
      
      // Escape para fechar mega menu
      if (event.key === 'Escape') {
        setOpenMegaMenu(false);
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleMegaMenuEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setOpenMegaMenu(true);
  };

  const handleMegaMenuLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenMegaMenu(false);
    }, 150);
  };

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">NC</span>
                </div>
                <span className="font-bold text-xl text-gray-900 dark:text-white">
                  NextCook
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {/* Quick Navigation Items */}
              {quickNavItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  {t(item.name)}
                </Link>
              ))}

              {/* Mega Menu Trigger */}
              <div 
                ref={megaMenuRef}
                className="relative"
                onMouseEnter={handleMegaMenuEnter}
                onMouseLeave={handleMegaMenuLeave}
              >
                <button
                  className="flex items-center px-4 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                  aria-expanded={openMegaMenu}
                   aria-haspopup="menu"
                   aria-label={t('exploreAllSections')}
                >
                  <span>{t('explore')}</span>
                  <ChevronDownIcon className="ml-1 h-4 w-4" />
                </button>

                {/* Mega Menu Dropdown */}
                <AnimatePresence>
                  {openMegaMenu && (
                    <motion.div
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                       exit={{ opacity: 0, y: 10 }}
                       transition={{ duration: 0.2 }}
                       className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-screen max-w-6xl bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden max-h-[80vh]"
                       style={{ left: '50%', marginLeft: '-48rem' }}
                       role="menu"
                       aria-label={t('menuLabel')}
                     >
                      <div className="p-6 overflow-y-auto max-h-[75vh] scroll-smooth scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800 hover:scrollbar-thumb-gray-400 dark:hover:scrollbar-thumb-gray-500">
                        {/* Search Bar in Mega Menu */}
                        <div className="mb-6">
                          <button
                             onClick={() => setIsSearchOpen(true)}
                             className="w-full flex items-center px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-left text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                             aria-label={t('openSearch')}
                           >
                             <MagnifyingGlassIcon className="w-5 h-5 mr-3" />
                             <span>{t('searchPlaceholder')}</span>
                             <kbd className="ml-auto px-2 py-1 bg-white dark:bg-gray-900 rounded text-xs border border-gray-200 dark:border-gray-600">
                               {t('searchShortcut')}
                             </kbd>
                           </button>
                        </div>

                        {/* Categories Grid */}
                        <div className="grid grid-cols-4 gap-6">
                             {megaMenuCategories.map((category, categoryIndex) => {
                               const IconComponent = category.icon;
                               return (
                                 <motion.div 
                                   key={category.id} 
                                   className="space-y-3 p-4 rounded-xl hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-all duration-300 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-lg" 
                                   role="group" 
                                   aria-labelledby={`category-${category.id}`}
                                   initial={{ opacity: 0, y: 20 }}
                                   animate={{ opacity: 1, y: 0 }}
                                   transition={{ delay: categoryIndex * 0.1, duration: 0.4 }}
                                   whileHover={{ y: -2 }}
                                 >
                                 {/* Category Header */}
                                 <motion.div 
                                    className="flex items-center space-x-2 mb-3 group cursor-pointer"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <div className={`p-2 rounded-lg bg-gradient-to-r ${category.color} shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                                      <IconComponent className="w-4 h-4 text-white" aria-hidden="true" />
                                    </div>
                                    <div>
                                      <h3 id={`category-${category.id}`} className="font-semibold text-gray-900 dark:text-white text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                                        {category.name}
                                      </h3>
                                      <p className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200">
                                        {category.description}
                                      </p>
                                    </div>
                                  </motion.div>

                                {/* Category Items */}
                                <div className="space-y-1">
                                  {category.items.slice(0, 6).map((item, index) => (
                                     <motion.div
                                       key={item.href}
                                       initial={{ opacity: 0, x: -10 }}
                                       animate={{ opacity: 1, x: 0 }}
                                       transition={{ delay: index * 0.05, duration: 0.3 }}
                                     >
                                       <Link
                                         href={item.href}
                                         onClick={() => setOpenMegaMenu(false)}
                                         className="group block px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/20 dark:hover:to-indigo-900/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transform hover:scale-[1.02]"
                                         role="menuitem"
                                         aria-describedby={`desc-${item.href.replace(/\//g, '-')}`}
                                       >
                                         <div className="font-medium group-hover:font-semibold transition-all duration-200">{item.name}</div>
                                         <div id={`desc-${item.href.replace(/\//g, '-')}`} className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200">
                                           {item.description}
                                         </div>
                                       </Link>
                                     </motion.div>
                                   ))}
                                  {category.items.length > 6 && (
                                    <div className="text-xs text-gray-500 dark:text-gray-400 px-3 py-1">
                                      +{category.items.length - 6} mais...
                                    </div>
                                  )}
                                </div>
                               </motion.div>
                            );
                          })}
                        </div>

                        {/* Quick Actions */}
                         <motion.div 
                           className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                           transition={{ delay: 0.6, duration: 0.4 }}
                         >
                           <div className="flex items-center justify-between">
                             <div className="flex items-center space-x-4">
                               <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                 <Link
                                   href="/favorites"
                                   onClick={() => setOpenMegaMenu(false)}
                                   className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 px-3 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                 >
                                   <HeartIcon className="w-4 h-4" />
                                   <span>{t('favorites')} ({favorites.length})</span>
                                 </Link>
                               </motion.div>
                               <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                 <Link
                                   href="/troubleshooting"
                                   onClick={() => setOpenMegaMenu(false)}
                                   className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 px-3 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                 >
                                   <Settings className="w-4 h-4" />
                                   <span>{t('help')}</span>
                                 </Link>
                               </motion.div>
                             </div>
                             <motion.div 
                               className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full"
                               whileHover={{ scale: 1.05 }}
                             >
                               {t('pagesAvailable', { count: megaMenuCategories.reduce((acc, cat) => acc + cat.items.length, 0) })}
                             </motion.div>
                           </div>
                         </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Search Button */}
              <button
                 onClick={() => setIsSearchOpen(true)}
                 className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                 aria-label={t('searchLabel')}
                  title={t('searchLabel')}
               >
                 <MagnifyingGlassIcon className="w-5 h-5" />
               </button>

              {/* Theme Toggle Button */}
              <ThemeToggle size="md" />

              {/* Favorites Button */}
              <Link
                 href="/favorites"
                 className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors relative focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                 aria-label={t('favoritesLabel', { count: favorites.length })}
                  title={t('favoritesLabel', { count: favorites.length })}
               >
                 <HeartIcon className="w-5 h-5" />
                 {favorites.length > 0 && (
                   <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center" aria-hidden="true">
                     {favorites.length}
                   </span>
                 )}
               </Link>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center space-x-2">
              <button
                 onClick={() => setIsSearchOpen(true)}
                 className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 rounded-md"
                 aria-label={t('searchLabel')}
                  title={t('searchLabel')}
               >
                 <MagnifyingGlassIcon className="w-5 h-5" />
               </button>
               
               {/* Theme Toggle Button - Mobile */}
               <ThemeToggle size="md" />
               <button
                 onClick={() => setIsOpen(!isOpen)}
                 className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-colors rounded-md"
                 aria-expanded={isOpen}
                  aria-label={isOpen ? t('closeMenu') : t('openMenu')}
               >
                 {isOpen ? (
                   <XMarkIcon className="h-6 w-6" />
                 ) : (
                   <Bars3Icon className="h-6 w-6" />
                 )}
               </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 overflow-hidden max-h-[70vh]"
            >
              <div className="px-4 py-4 space-y-4 overflow-y-auto max-h-[65vh] scroll-smooth scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800 hover:scrollbar-thumb-gray-400 dark:hover:scrollbar-thumb-gray-500">
                {/* Quick Nav Items */}
                {quickNavItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    {t(item.name)}
                  </Link>
                ))}

                {/* Categories */}
                {megaMenuCategories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <div key={category.id} className="space-y-2">
                      <div className="flex items-center space-x-2 px-3 py-2">
                        <div className={`p-1.5 rounded-md bg-gradient-to-r ${category.color}`}>
                          <IconComponent className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                            {category.name}
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {category.description}
                          </p>
                        </div>
                      </div>
                      <div className="ml-6 space-y-1">
                        {category.items.slice(0, 4).map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="block px-3 py-2 rounded-md text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                          >
                            {item.name}
                          </Link>
                        ))}
                        {category.items.length > 4 && (
                          <div className="text-xs text-gray-500 dark:text-gray-400 px-3 py-1">
                            +{category.items.length - 4} mais...
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Search Modal */}
      <SearchBar 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        searchData={searchData}
      />
    </>
  );
}