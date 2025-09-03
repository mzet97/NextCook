'use client';

import { useState, useTransition, useDeferredValue, startTransition } from 'react';
import CodeBlock from '@/components/CodeBlock';
import DemoSection from '@/components/DemoSection';

// Componente que simula uma operação pesada
function HeavyList({ filter }: { filter: string }) {
  const items = [];
  
  // Simula uma lista grande para demonstrar o bloqueio
  for (let i = 0; i < 10000; i++) {
    if (filter === '' || `Item ${i}`.toLowerCase().includes(filter.toLowerCase())) {
      items.push(
        <div key={i} className="p-2 border-b border-gray-200 dark:border-gray-700">
          Item {i} - {filter ? `Filtrado por: ${filter}` : 'Sem filtro'}
        </div>
      );
    }
    
    // Limita a exibição para não sobrecarregar o DOM
    if (items.length >= 100) break;
  }
  
  return (
    <div className="max-h-64 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded">
      {items.length > 0 ? items : (
        <div className="p-4 text-gray-500 dark:text-gray-400 text-center">
          Nenhum item encontrado
        </div>
      )}
    </div>
  );
}

// Componente de busca com diferentes estratégias
function SearchDemo() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  // Simula uma busca assíncrona
  const performSearch = async (searchQuery: string) => {
    setIsSearching(true);
    
    // Simula delay de API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simula resultados de busca
    const mockResults = searchQuery
      ? Array.from({ length: 5 }, (_, i) => `Resultado ${i + 1} para "${searchQuery}"`)
      : [];
    
    setResults(mockResults);
    setIsSearching(false);
  };
  
  const handleSearch = (value: string) => {
    setQuery(value);
    performSearch(value);
  };
  
  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Digite para buscar..."
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
      />
      
      {isSearching && (
        <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          <span>Buscando...</span>
        </div>
      )}
      
      <div className="space-y-2">
        {results.map((result, index) => (
          <div key={index} className="p-3 bg-gray-50 dark:bg-gray-800 rounded border">
            {result}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function UseTransitionPage() {
  const [filter, setFilter] = useState('');
  const [deferredFilter, setDeferredFilter] = useState('');
  const [isPending, startTransition] = useTransition();
  const [tab, setTab] = useState('basic');
  
  // Demonstração básica do useTransition
  const handleFilterChange = (value: string) => {
    setFilter(value);
    
    // Marca a atualização da lista como não urgente
    startTransition(() => {
      setDeferredFilter(value);
    });
  };
  
  // Demonstração de navegação com useTransition
  const [currentTab, setCurrentTab] = useState('tab1');
  const [isTabPending, startTabTransition] = useTransition();
  
  const handleTabChange = (newTab: string) => {
    startTabTransition(() => {
      setCurrentTab(newTab);
    });
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            useTransition Hook
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Marca atualizações como não urgentes para manter a interface responsiva
          </p>
        </div>

        {/* Conceito Básico */}
        <DemoSection title="Conceito Básico">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="card">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  O que é useTransition?
                </h3>
                <div className="space-y-4 text-gray-600 dark:text-gray-400">
                  <p>
                    O <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">useTransition</code> permite marcar atualizações de estado como "não urgentes", 
                    mantendo a interface responsiva durante operações pesadas.
                  </p>
                  <p>
                    Retorna um array com:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li><code>isPending</code> - boolean indicando se há transição pendente</li>
                    <li><code>startTransition</code> - função para iniciar uma transição</li>
                  </ul>
                </div>
              </div>
              
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Benefícios
                </h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Mantém a UI responsiva durante atualizações pesadas</li>
                  <li>• Permite interrupção de atualizações não urgentes</li>
                  <li>• Melhora a experiência do usuário</li>
                  <li>• Evita bloqueio da thread principal</li>
                  <li>• Funciona bem com Concurrent Features</li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <CodeBlock
                title="Sintaxe Básica"
                language="tsx"
                code={`import { useTransition } from 'react';

function MyComponent() {
  const [isPending, startTransition] = useTransition();
  const [filter, setFilter] = useState('');
  const [list, setList] = useState([]);
  
  const handleFilterChange = (value) => {
    // Atualização urgente - input responsivo
    setFilter(value);
    
    // Atualização não urgente - pode ser interrompida
    startTransition(() => {
      setList(filterLargeList(value));
    });
  };
  
  return (
    <div>
      <input 
        value={filter}
        onChange={(e) => handleFilterChange(e.target.value)}
      />
      {isPending && <div>Carregando...</div>}
      <List items={list} />
    </div>
  );
}`}
              />
              
              <CodeBlock
                title="startTransition (sem hook)"
                language="tsx"
                code={`import { startTransition } from 'react';

// Pode ser usado fora de componentes
function updateData(newData) {
  startTransition(() => {
    // Atualização não urgente
    setLargeDataSet(newData);
  });
}`}
              />
            </div>
          </div>
        </DemoSection>

        {/* Demonstração Prática */}
        <DemoSection title="Demonstração Prática - Filtro de Lista">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Lista com useTransition
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Digite no campo abaixo. O input permanece responsivo enquanto a lista é atualizada.
              </p>
              
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Filtrar lista grande..."
                    value={filter}
                    onChange={(e) => handleFilterChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                  {isPending && (
                    <div className="absolute right-3 top-2.5">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                    </div>
                  )}
                </div>
                
                {isPending && (
                  <div className="text-sm text-blue-600 dark:text-blue-400">
                    ⏳ Atualizando lista...
                  </div>
                )}
                
                <HeavyList filter={deferredFilter} />
              </div>
            </div>

            <div className="space-y-6">
              <CodeBlock
                title="Implementação do Filtro"
                language="tsx"
                code={`const [filter, setFilter] = useState('');
const [deferredFilter, setDeferredFilter] = useState('');
const [isPending, startTransition] = useTransition();

const handleFilterChange = (value: string) => {
  // Atualização urgente - input responsivo
  setFilter(value);
  
  // Atualização não urgente - lista pesada
  startTransition(() => {
    setDeferredFilter(value);
  });
};

return (
  <div>
    <input 
      value={filter}
      onChange={(e) => handleFilterChange(e.target.value)}
    />
    {isPending && <div>Atualizando...</div>}
    <HeavyList filter={deferredFilter} />
  </div>
);`}
              />
              
              <CodeBlock
                title="Lista Pesada"
                language="tsx"
                code={`function HeavyList({ filter }) {
  const items = [];
  
  // Simula processamento pesado
  for (let i = 0; i < 10000; i++) {
    if (filter === '' || \`Item \${i}\`.includes(filter)) {
      items.push(
        <div key={i}>Item {i}</div>
      );
    }
    if (items.length >= 100) break;
  }
  
  return <div>{items}</div>;
}`}
              />
            </div>
          </div>
        </DemoSection>

        {/* Navegação com Transições */}
        <DemoSection title="Navegação com Transições">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Tabs com useTransition
              </h3>
              
              <div className="space-y-4">
                <div className="flex space-x-2">
                  {['tab1', 'tab2', 'tab3'].map((tabId) => (
                    <button
                      key={tabId}
                      onClick={() => handleTabChange(tabId)}
                      className={`px-4 py-2 rounded transition-colors ${
                        currentTab === tabId
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                      }`}
                      disabled={isTabPending}
                    >
                      Tab {tabId.slice(-1)}
                      {isTabPending && currentTab === tabId && (
                        <span className="ml-2 animate-spin">⏳</span>
                      )}
                    </button>
                  ))}
                </div>
                
                <div className="p-4 border border-gray-300 dark:border-gray-600 rounded min-h-32">
                  {isTabPending ? (
                    <div className="flex items-center justify-center h-24">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                  ) : (
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        Conteúdo da {currentTab}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        Este é o conteúdo da {currentTab}. A transição mantém a interface responsiva 
                        mesmo durante carregamentos pesados.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <CodeBlock
                title="Navegação com Transição"
                language="tsx"
                code={`const [currentTab, setCurrentTab] = useState('tab1');
const [isTabPending, startTabTransition] = useTransition();

const handleTabChange = (newTab: string) => {
  startTabTransition(() => {
    setCurrentTab(newTab);
  });
};

return (
  <div>
    {tabs.map(tab => (
      <button
        key={tab}
        onClick={() => handleTabChange(tab)}
        disabled={isTabPending}
      >
        {tab}
        {isTabPending && <Spinner />}
      </button>
    ))}
    
    <div>
      {isTabPending ? (
        <LoadingSpinner />
      ) : (
        <TabContent tab={currentTab} />
      )}
    </div>
  </div>
);`}
              />
            </div>
          </div>
        </DemoSection>

        {/* Busca com Transição */}
        <DemoSection title="Busca com Transição">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Busca Assíncrona
              </h3>
              <SearchDemo />
            </div>

            <div className="space-y-6">
              <CodeBlock
                title="Busca com useTransition"
                language="tsx"
                code={`function SearchDemo() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();
  
  const handleSearch = async (value) => {
    setQuery(value); // Atualização urgente
    
    startTransition(async () => {
      const data = await searchAPI(value);
      setResults(data);
    });
  };
  
  return (
    <div>
      <input 
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
      />
      {isPending && <div>Buscando...</div>}
      <Results data={results} />
    </div>
  );
}`}
              />
            </div>
          </div>
        </DemoSection>

        {/* Melhores Práticas */}
        <DemoSection title="Melhores Práticas">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                ✅ Use useTransition para:
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Filtros de listas grandes</li>
                <li>• Navegação entre páginas/tabs</li>
                <li>• Atualizações de dados não críticas</li>
                <li>• Renderização de componentes pesados</li>
                <li>• Busca com debounce</li>
                <li>• Atualizações de gráficos/visualizações</li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                ❌ Não use para:
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Inputs de formulário (devem ser sempre responsivos)</li>
                <li>• Animações críticas</li>
                <li>• Atualizações de estado simples</li>
                <li>• Feedback imediato ao usuário</li>
                <li>• Estados de loading principais</li>
                <li>• Validação de formulários</li>
              </ul>
            </div>
          </div>
        </DemoSection>

        {/* Comparação */}
        <DemoSection title="useTransition vs useDeferredValue">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                useTransition
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Para controlar quando uma atualização acontece
              </p>
              <CodeBlock
                language="tsx"
                code={`const [isPending, startTransition] = useTransition();

const handleClick = () => {
  startTransition(() => {
    // Atualização não urgente
    setLargeList(newData);
  });
};

// Você controla quando a transição inicia`}
              />
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                useDeferredValue
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Para adiar a atualização de um valor
              </p>
              <CodeBlock
                language="tsx"
                code={`const [query, setQuery] = useState('');
const deferredQuery = useDeferredValue(query);

// query atualiza imediatamente
// deferredQuery atualiza com baixa prioridade

return (
  <div>
    <input value={query} onChange={setQuery} />
    <SearchResults query={deferredQuery} />
  </div>
);`}
              />
            </div>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}