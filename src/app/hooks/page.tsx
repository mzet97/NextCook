'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Search, Code, Zap, Brain, Clock, Eye, Layers, Database, Cpu, Palette } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProgressIndicator from '@/components/ProgressIndicator';

interface Hook {
  name: string;
  path: string;
  description: string;
  category: 'basic' | 'advanced' | 'performance' | 'utility';
  icon: React.ReactNode;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  version: string;
}

const hooks: Hook[] = [
  {
    name: 'useState',
    path: '/hooks/use-state',
    description: 'Gerencia estado local em componentes funcionais',
    category: 'basic',
    icon: <Database className="w-6 h-6" />,
    difficulty: 'beginner',
    version: 'React 16.8+'
  },
  {
    name: 'useEffect',
    path: '/hooks/use-effect',
    description: 'Executa efeitos colaterais em componentes funcionais',
    category: 'basic',
    icon: <Zap className="w-6 h-6" />,
    difficulty: 'beginner',
    version: 'React 16.8+'
  },
  {
    name: 'useContext',
    path: '/hooks/use-context',
    description: 'Consome valores de contexto React',
    category: 'basic',
    icon: <Layers className="w-6 h-6" />,
    difficulty: 'intermediate',
    version: 'React 16.8+'
  },
  {
    name: 'useReducer',
    path: '/hooks/use-reducer',
    description: 'Gerencia estado complexo com padrão reducer',
    category: 'advanced',
    icon: <Cpu className="w-6 h-6" />,
    difficulty: 'intermediate',
    version: 'React 16.8+'
  },
  {
    name: 'useMemo',
    path: '/hooks/use-memo',
    description: 'Memoriza valores computados para otimização',
    category: 'performance',
    icon: <Brain className="w-6 h-6" />,
    difficulty: 'intermediate',
    version: 'React 16.8+'
  },
  {
    name: 'useCallback',
    path: '/hooks/use-callback',
    description: 'Memoriza funções para evitar re-criações',
    category: 'performance',
    icon: <Code className="w-6 h-6" />,
    difficulty: 'intermediate',
    version: 'React 16.8+'
  },
  {
    name: 'useRef',
    path: '/hooks/use-ref',
    description: 'Cria referências mutáveis que persistem entre renders',
    category: 'utility',
    icon: <Eye className="w-6 h-6" />,
    difficulty: 'beginner',
    version: 'React 16.8+'
  },
  {
    name: 'useImperativeHandle',
    path: '/hooks/use-imperative-handle',
    description: 'Customiza a instância exposta por ref',
    category: 'advanced',
    icon: <Layers className="w-6 h-6" />,
    difficulty: 'advanced',
    version: 'React 16.8+'
  },
  {
    name: 'useLayoutEffect',
    path: '/hooks/use-layout-effect',
    description: 'Executa efeitos sincronamente após mutações DOM',
    category: 'advanced',
    icon: <Palette className="w-6 h-6" />,
    difficulty: 'advanced',
    version: 'React 16.8+'
  },
  {
    name: 'useDebugValue',
    path: '/hooks/use-debug-value',
    description: 'Exibe labels para hooks customizados no DevTools',
    category: 'utility',
    icon: <Search className="w-6 h-6" />,
    difficulty: 'advanced',
    version: 'React 16.8+'
  },
  {
    name: 'useDeferredValue',
    path: '/hooks/use-deferred-value',
    description: 'Adia atualizações de valores para melhor performance',
    category: 'performance',
    icon: <Clock className="w-6 h-6" />,
    difficulty: 'advanced',
    version: 'React 18+'
  },
  {
    name: 'useTransition',
    path: '/hooks/use-transition',
    description: 'Marca atualizações como transições não urgentes',
    category: 'performance',
    icon: <Zap className="w-6 h-6" />,
    difficulty: 'advanced',
    version: 'React 18+'
  },
  {
    name: 'useId',
    path: '/hooks/use-id',
    description: 'Gera IDs únicos para acessibilidade',
    category: 'utility',
    icon: <Eye className="w-6 h-6" />,
    difficulty: 'beginner',
    version: 'React 18+'
  },
  {
    name: 'useSyncExternalStore',
    path: '/hooks/use-sync-external-store',
    description: 'Sincroniza com stores externos',
    category: 'advanced',
    icon: <Database className="w-6 h-6" />,
    difficulty: 'advanced',
    version: 'React 18+'
  },
  {
    name: 'useInsertionEffect',
    path: '/hooks/use-insertion-effect',
    description: 'Executa efeitos antes de mutações DOM',
    category: 'advanced',
    icon: <Cpu className="w-6 h-6" />,
    difficulty: 'advanced',
    version: 'React 18+'
  },
  {
    name: 'useActionState',
    path: '/hooks/use-action-state',
    description: 'Gerencia estado de ações de formulário com pending states',
    category: 'advanced',
    icon: <Code className="w-6 h-6" />,
    difficulty: 'intermediate',
    version: 'React 19+'
  },
  {
    name: 'useFormStatus',
    path: '/hooks/use-form-status',
    description: 'Obtém informações sobre o status de submissão de formulários',
    category: 'advanced',
    icon: <Clock className="w-6 h-6" />,
    difficulty: 'intermediate',
    version: 'React 19+'
  },
  {
    name: 'useOptimistic',
    path: '/hooks/use-optimistic',
    description: 'Implementa atualizações otimistas para melhor UX',
    category: 'performance',
    icon: <Zap className="w-6 h-6" />,
    difficulty: 'advanced',
    version: 'React 19+'
  },
  {
    name: 'use',
    path: '/hooks/use',
    description: 'Hook universal para consumir Promises e Context',
    category: 'advanced',
    icon: <Brain className="w-6 h-6" />,
    difficulty: 'advanced',
    version: 'React 19+'
  }
];

const categories = {
  basic: { name: 'Básicos', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' },
  advanced: { name: 'Avançados', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' },
  performance: { name: 'Performance', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' },
  utility: { name: 'Utilitários', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' }
};

const difficulties = {
  beginner: { name: 'Iniciante', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300' },
  intermediate: { name: 'Intermediário', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' },
  advanced: { name: 'Avançado', color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' }
};

export default function HooksPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const filteredHooks = hooks.filter(hook => {
    const matchesSearch = hook.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hook.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || hook.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || hook.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const hooksByCategory = Object.entries(categories).map(([key, category]) => ({
    key,
    ...category,
    hooks: filteredHooks.filter(hook => hook.category === key)
  }));

  // Converter hooks para formato do ProgressIndicator
  const progressItems = hooks.map(hook => ({
    id: hook.name.toLowerCase().replace(/([A-Z])/g, '-$1').replace(/^-/, ''),
    title: hook.name,
    href: hook.path,
    difficulty: hook.difficulty === 'beginner' ? 'basico' as const : 
                hook.difficulty === 'intermediate' ? 'intermediario' as const : 'avancado' as const,
    category: hook.category
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <Breadcrumbs />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-1.5">
          {/* Conteúdo principal */}
          <div className="lg:col-span-3">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            React Hooks Complete Guide
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Explore todos os React Hooks com exemplos práticos, demonstrações interativas e explicações detalhadas.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-gray-600 dark:text-gray-400">{hooks.filter(h => h.category === 'basic').length} Hooks Básicos</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-gray-600 dark:text-gray-400">{hooks.filter(h => h.category === 'advanced').length} Hooks Avançados</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-600 dark:text-gray-400">{hooks.filter(h => h.category === 'performance').length} Performance</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-gray-600 dark:text-gray-400">{hooks.filter(h => h.category === 'utility').length} Utilitários</span>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="mb-12 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1.5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Buscar Hooks
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Digite o nome do hook..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Categoria
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Todas as categorias</option>
                {Object.entries(categories).map(([key, category]) => (
                  <option key={key} value={key}>{category.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Dificuldade
              </label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Todas as dificuldades</option>
                {Object.entries(difficulties).map(([key, difficulty]) => (
                  <option key={key} value={key}>{difficulty.name}</option>
                ))}
              </select>
            </div>
          </div>
          
          {(searchTerm || selectedCategory !== 'all' || selectedDifficulty !== 'all') && (
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {filteredHooks.length} hook(s) encontrado(s)
              </span>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedDifficulty('all');
                }}
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors"
              >
                Limpar filtros
              </button>
            </div>
          )}
        </div>

        {/* Lista de Hooks por Categoria */}
        {selectedCategory === 'all' ? (
          <div className="space-y-12">
            {hooksByCategory.map(category => (
              category.hooks.length > 0 && (
                <div key={category.key}>
                  <div className="flex items-center gap-3 mb-6">
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                      {category.name}
                    </h2>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${category.color}`}>
                      {category.hooks.length} hooks
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1.5">
                    {category.hooks.map(hook => (
                      <HookCard key={hook.name} hook={hook} />
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1.5">
            {filteredHooks.map(hook => (
              <HookCard key={hook.name} hook={hook} />
            ))}
          </div>
        )}

        {filteredHooks.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              Nenhum hook encontrado
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Tente ajustar os filtros ou termo de busca
            </p>
          </div>
        )}

        {/* Estatísticas */}
        <div className="mt-16 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
            📊 Estatísticas dos Hooks
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {hooks.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total de Hooks</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                {hooks.filter(h => h.version === 'React 16.8+').length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">React 16.8+</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                {hooks.filter(h => h.version === 'React 18+').length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">React 18+</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                {hooks.filter(h => h.version === 'React 19+').length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">React 19+</div>
            </div>
          </div>
            </div>
          </div>
          
          {/* Sidebar com indicador de progresso */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <ProgressIndicator 
                items={progressItems}
                currentPath={typeof window !== 'undefined' ? window.location.pathname : ''}
                className="mb-6"
              />
              
              {/* Links úteis */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                  🔗 Links Úteis
                </h3>
                <div className="space-y-2 text-sm">
                  <a 
                    href="https://react.dev/reference/react" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    📚 Documentação React
                  </a>
                  <a 
                    href="https://react.dev/learn/reusing-logic-with-custom-hooks" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    🎯 Custom Hooks Guide
                  </a>
                  <a 
                    href="https://react.dev/reference/react/hooks" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    🔧 Hooks API Reference
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HookCard({ hook }: { hook: Hook }) {
  return (
    <Link href={hook.path} className="group">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105 border border-gray-200 dark:border-gray-700">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
              {hook.icon}
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {hook.name}
              </h3>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {hook.version}
              </span>
            </div>
          </div>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {hook.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${categories[hook.category].color}`}>
              {categories[hook.category].name}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficulties[hook.difficulty].color}`}>
              {difficulties[hook.difficulty].name}
            </span>
          </div>
          
          <div className="text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
            →
          </div>
        </div>
      </div>
    </Link>
  );
}