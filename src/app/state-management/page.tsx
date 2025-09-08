'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CodeBlock } from '@/components/CodeBlock';
import { DemoCard } from '@/components/DemoCard';
import { DemoCardStatic } from '@/components/DemoCardStatic';
import { DemoSection } from '@/components/DemoSection';
import {
  CubeIcon,
  AtSymbolIcon,
  CloudIcon,
  ServerIcon,
  ChartBarIcon,
  CogIcon
} from '@heroicons/react/24/outline';

const stateManagementTools = [
  {
    name: 'Redux Toolkit',
    description: 'State management robusto com DevTools e middleware',
    icon: CubeIcon,
    href: '/state-management/redux-toolkit',
    features: ['Global State', 'Time Travel', 'DevTools', 'Middleware'],
    useCase: 'Aplicações complexas com estado global compartilhado',
    complexity: 'Alto'
  },
  {
    name: 'Jotai',
    description: 'State management atômico e bottom-up',
    icon: AtSymbolIcon,
    href: '/state-management/jotai',
    features: ['Atomic State', 'Composable', 'TypeScript', 'Suspense'],
    useCase: 'Estado granular e componível',
    complexity: 'Médio'
  },
  {
    name: 'Valtio',
    description: 'State management com proxy para mutações diretas',
    icon: CloudIcon,
    href: '/state-management/valtio',
    features: ['Proxy-based', 'Mutable API', 'Auto-tracking', 'Simple'],
    useCase: 'Estado local com sintaxe simples',
    complexity: 'Baixo'
  },
  {
    name: 'TanStack Query',
    description: 'Gerenciamento de estado do servidor com cache',
    icon: ServerIcon,
    href: '/state-management/tanstack-query',
    features: ['Server State', 'Caching', 'Background Updates', 'Optimistic'],
    useCase: 'Estado do servidor e cache de dados',
    complexity: 'Médio'
  }
];

const stateTypes = [
  {
    type: 'Client State',
    description: 'Estado local da aplicação (UI, formulários, etc.)',
    examples: ['Tema atual', 'Modal aberto/fechado', 'Dados de formulário', 'Estado de loading'],
    tools: ['useState', 'useReducer', 'Zustand', 'Redux Toolkit'],
    color: 'bg-blue-500'
  },
  {
    type: 'Server State',
    description: 'Dados do servidor com cache e sincronização',
    examples: ['Lista de usuários', 'Dados de perfil', 'Posts do blog', 'Configurações'],
    tools: ['TanStack Query', 'SWR', 'Apollo Client', 'Relay'],
    color: 'bg-green-500'
  },
  {
    type: 'URL State',
    description: 'Estado sincronizado com a URL',
    examples: ['Página atual', 'Filtros de busca', 'Parâmetros de query', 'Hash fragments'],
    tools: ['Next.js Router', 'React Router', 'Reach Router'],
    color: 'bg-purple-500'
  },
  {
    type: 'Form State',
    description: 'Estado específico de formulários',
    examples: ['Valores dos campos', 'Validação', 'Erros', 'Estado de submissão'],
    tools: ['React Hook Form', 'Formik', 'Final Form', 'Unform'],
    color: 'bg-orange-500'
  }
];

const comparisonData = [
  {
    tool: 'Redux Toolkit',
    bundleSize: '~45kb',
    learningCurve: 'Alto',
    performance: 'Excelente',
    devtools: '✅',
    typescript: '✅',
    ssr: '✅'
  },
  {
    tool: 'Jotai',
    bundleSize: '~13kb',
    learningCurve: 'Médio',
    performance: 'Excelente',
    devtools: '✅',
    typescript: '✅',
    ssr: '✅'
  },
  {
    tool: 'Valtio',
    bundleSize: '~8kb',
    learningCurve: 'Baixo',
    performance: 'Muito Bom',
    devtools: '✅',
    typescript: '✅',
    ssr: '⚠️'
  },
  {
    tool: 'TanStack Query',
    bundleSize: '~39kb',
    learningCurve: 'Médio',
    performance: 'Excelente',
    devtools: '✅',
    typescript: '✅',
    ssr: '✅'
  },
  {
    tool: 'Zustand',
    bundleSize: '~2.5kb',
    learningCurve: 'Baixo',
    performance: 'Excelente',
    devtools: '✅',
    typescript: '✅',
    ssr: '✅'
  }
];

export default function StateManagementPage() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            State Management Avançado
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore diferentes abordagens para gerenciamento de estado em aplicações React modernas
          </p>
        </div>

        {/* State Types */}
        <DemoSection title="Tipos de Estado" description="Entenda os diferentes tipos de estado em aplicações React">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-1.5 mb-8">
            {stateTypes.map((stateType) => (
              <DemoCardStatic key={stateType.type} title={stateType.type} description={stateType.description}>
                <div className="space-y-4">
                  <div className={`h-16 ${stateType.color} rounded-lg flex items-center justify-center text-white font-bold`}>
                    {stateType.type}
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Exemplos:</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                      {stateType.examples.map((example, index) => (
                        <li key={index}>• {example}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Ferramentas:</h4>
                    <div className="flex flex-wrap gap-1">
                      {stateType.tools.map((tool) => (
                        <span key={tool} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </DemoCardStatic>
            ))}
          </div>
        </DemoSection>

        {/* State Management Tools */}
        <DemoSection title="Ferramentas de State Management" description="Compare e explore diferentes soluções">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-1.5 mb-8">
            {stateManagementTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link key={tool.name} href={tool.href}>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center mb-4">
                      <Icon className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mr-3" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {tool.name}
                      </h3>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                      {tool.description}
                    </p>
                    
                    <div className="space-y-3">
                      <div>
                        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                          Caso de Uso
                        </span>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                          {tool.useCase}
                        </p>
                      </div>
                      
                      <div>
                        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                          Complexidade
                        </span>
                        <div className="flex items-center mt-1">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            tool.complexity === 'Alto' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                            tool.complexity === 'Médio' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                            'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          }`}>
                            {tool.complexity}
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                          Features
                        </span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {tool.features.map((feature) => (
                            <span key={feature} className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded text-xs">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </DemoSection>

        {/* Comparison Table */}
        <DemoSection title="Comparação de Ferramentas" description="Análise detalhada das principais soluções">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Ferramenta
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Bundle Size
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Curva de Aprendizado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Performance
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      DevTools
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      TypeScript
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      SSR
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {comparisonData.map((item, index) => (
                    <tr key={item.tool} className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700/50' : ''}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {item.tool}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {item.bundleSize}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          item.learningCurve === 'Alto' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                          item.learningCurve === 'Médio' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                          'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        }`}>
                          {item.learningCurve}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {item.performance}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {item.devtools}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {item.typescript}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {item.ssr}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </DemoSection>

        {/* Decision Guide */}
        <DemoSection title="Guia de Decisão" description="Escolha a ferramenta certa para seu projeto">
          <div className="grid md:grid-cols-2 gap-1.5">
            <DemoCardStatic title="Quando usar Redux Toolkit" description="Cenários ideais para RTK">
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">✅ Use quando:</h4>
                  <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                    <li>• Estado global complexo</li>
                    <li>• Múltiplos componentes compartilham estado</li>
                    <li>• Necessita de time travel debugging</li>
                    <li>• Equipe grande com padrões estabelecidos</li>
                    <li>• Aplicação com muitas features</li>
                  </ul>
                </div>
                <CodeBlock
                  language="typescript"
                  code={`// Exemplo: E-commerce com carrinho global
const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    user: userSlice.reducer,
    products: productsSlice.reducer
  }
});`}
                />
              </div>
            </DemoCardStatic>

            <DemoCardStatic title="Quando usar Jotai" description="Cenários ideais para Jotai">
              <div className="space-y-3">
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded">
                  <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">✅ Use quando:</h4>
                  <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                    <li>• Estado granular e composível</li>
                    <li>• Quer evitar re-renders desnecessários</li>
                    <li>• Precisa de estado derivado complexo</li>
                    <li>• Aplicação com componentes independentes</li>
                    <li>• Quer sintaxe mais simples que Redux</li>
                  </ul>
                </div>
                <CodeBlock
                  language="typescript"
                  code={`// Exemplo: Dashboard com widgets independentes
const userAtom = atom({ name: 'John', role: 'admin' });
const themeAtom = atom('light');
const settingsAtom = atom((get) => ({
  user: get(userAtom),
  theme: get(themeAtom)
}));`}
                />
              </div>
            </DemoCardStatic>

            <DemoCardStatic title="Quando usar Valtio" description="Cenários ideais para Valtio">
              <div className="space-y-3">
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded">
                  <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">✅ Use quando:</h4>
                  <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                    <li>• Quer sintaxe de mutação direta</li>
                    <li>• Estado local de componente complexo</li>
                    <li>• Migração de class components</li>
                    <li>• Prototipagem rápida</li>
                    <li>• Equipe familiarizada com MobX</li>
                  </ul>
                </div>
                <CodeBlock
                  language="typescript"
                  code={`// Exemplo: Formulário complexo
const formState = proxy({
  user: { name: '', email: '' },
  settings: { theme: 'light', notifications: true }
});

// Mutação direta
formState.user.name = 'John Doe';`}
                />
              </div>
            </DemoCardStatic>

            <DemoCardStatic title="Quando usar TanStack Query" description="Cenários ideais para server state">
              <div className="space-y-3">
                <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded">
                  <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">✅ Use quando:</h4>
                  <ul className="text-sm text-orange-700 dark:text-orange-300 space-y-1">
                    <li>• Dados vêm de APIs</li>
                    <li>• Precisa de cache inteligente</li>
                    <li>• Quer background updates</li>
                    <li>• Necessita de optimistic updates</li>
                    <li>• Aplicação data-heavy</li>
                  </ul>
                </div>
                <CodeBlock
                  language="typescript"
                  code={`// Exemplo: Lista de posts com cache
const { data, isLoading, error } = useQuery({
  queryKey: ['posts'],
  queryFn: fetchPosts,
  staleTime: 5 * 60 * 1000, // 5 minutos
  refetchOnWindowFocus: true
});`}
                />
              </div>
            </DemoCardStatic>
          </div>
        </DemoSection>

        {/* Performance Tips */}
        <DemoSection title="Dicas de Performance" description="Otimizações para cada ferramenta">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="grid md:grid-cols-2 gap-1.5">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  🚀 Otimizações Gerais
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Use React.memo para componentes puros</li>
                  <li>• Implemente seletores específicos</li>
                  <li>• Evite criar objetos em renders</li>
                  <li>• Use useCallback para funções estáveis</li>
                  <li>• Normalize estruturas de dados</li>
                  <li>• Implemente code splitting</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  📊 Monitoramento
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Use React DevTools Profiler</li>
                  <li>• Monitore bundle size</li>
                  <li>• Analise re-renders desnecessários</li>
                  <li>• Meça tempo de hidratação</li>
                  <li>• Implemente error boundaries</li>
                  <li>• Use performance.mark() para métricas</li>
                </ul>
              </div>
            </div>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}