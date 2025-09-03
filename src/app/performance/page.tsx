'use client';

import { useState, useMemo, useCallback, memo, Suspense, lazy, startTransition } from 'react';
import CodeBlock from '@/components/CodeBlock';
import DemoSection from '@/components/DemoSection';
import dynamic from 'next/dynamic';

// Componente pesado para demonstrar otimizações
const ExpensiveComponent = memo(({ data, onUpdate }: { data: number[]; onUpdate: (id: number) => void }) => {
  console.log('ExpensiveComponent renderizou');
  
  // Simulação de cálculo custoso
  const expensiveCalculation = useMemo(() => {
    console.log('Executando cálculo custoso...');
    let result = 0;
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < 1000; j++) {
        result += data[i] * Math.random();
      }
    }
    return result.toFixed(2);
  }, [data]);

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
      <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Expensive Component</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
        Resultado do cálculo custoso: <span className="font-mono" suppressHydrationWarning>{expensiveCalculation}</span>
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-500">
        Este componente só re-renderiza quando os dados mudam (memo + useMemo)
      </p>
      <div className="mt-3 flex gap-2">
        {data.slice(0, 5).map((item, index) => (
          <button
            key={index}
            onClick={() => onUpdate(index)}
            className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 transition-colors"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
});

ExpensiveComponent.displayName = 'ExpensiveComponent';

// Componente com lazy loading
const LazyComponent = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        default: () => (
          <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-lg border border-green-300 dark:border-green-700">
            <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">Lazy Loaded Component</h3>
            <p className="text-green-700 dark:text-green-300 text-sm">
              Este componente foi carregado dinamicamente após 2 segundos.
            </p>
          </div>
        )
      });
    }, 2000);
  });
});

// Componente com dynamic import
const DynamicComponent = dynamic(
  () => import('@/components/DynamicDemo'),
  {
    loading: () => (
      <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg animate-pulse">
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
      </div>
    ),
    ssr: false
  }
);

// Demonstração de React.memo e useMemo
function MemoDemo() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(() => Array.from({ length: 100 }, (_, i) => i + 1));
  const [otherState, setOtherState] = useState(0);

  // useCallback para evitar re-criação da função
  const handleUpdate = useCallback((id: number) => {
    setData(prev => prev.map((item, index) => index === id ? item + 1 : item));
  }, []);

  // Função que não usa useCallback (para comparação)
  const handleUpdateWithoutCallback = (id: number) => {
    setData(prev => prev.map((item, index) => index === id ? item + 1 : item));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{count}</div>
          <div className="text-sm text-blue-700 dark:text-blue-300 mb-2">Counter</div>
          <button
            onClick={() => setCount(prev => prev + 1)}
            className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
          >
            Increment
          </button>
        </div>
        
        <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-center">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{otherState}</div>
          <div className="text-sm text-purple-700 dark:text-purple-300 mb-2">Other State</div>
          <button
            onClick={() => setOtherState(prev => prev + 1)}
            className="px-3 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600 transition-colors"
          >
            Update
          </button>
        </div>
        
        <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">{data.length}</div>
          <div className="text-sm text-green-700 dark:text-green-300 mb-2">Data Items</div>
          <button
            onClick={() => setData(prev => [...prev, prev.length + 1])}
            className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition-colors"
          >
            Add Item
          </button>
        </div>
      </div>

      <ExpensiveComponent data={data} onUpdate={handleUpdate} />

      <div className="p-4 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg border border-yellow-300 dark:border-yellow-700">
        <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">🚀 Otimizações Aplicadas:</h4>
        <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
          <li>• <strong>React.memo:</strong> Componente só re-renderiza quando props mudam</li>
          <li>• <strong>useMemo:</strong> Cálculo custoso só executa quando dados mudam</li>
          <li>• <strong>useCallback:</strong> Função handleUpdate não é re-criada</li>
          <li>• <strong>Console:</strong> Abra o DevTools para ver quando o componente renderiza</li>
        </ul>
      </div>
    </div>
  );
}

// Demonstração de Lazy Loading
function LazyLoadingDemo() {
  const [showLazy, setShowLazy] = useState(false);
  const [showDynamic, setShowDynamic] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex gap-4 justify-center">
        <button
          onClick={() => setShowLazy(!showLazy)}
          className={`px-4 py-2 rounded transition-colors ${
            showLazy
              ? 'bg-green-500 text-white hover:bg-green-600'
              : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-500'
          }`}
        >
          {showLazy ? 'Hide' : 'Show'} Lazy Component
        </button>
        
        <button
          onClick={() => setShowDynamic(!showDynamic)}
          className={`px-4 py-2 rounded transition-colors ${
            showDynamic
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-500'
          }`}
        >
          {showDynamic ? 'Hide' : 'Show'} Dynamic Component
        </button>
      </div>

      {showLazy && (
        <Suspense fallback={
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg animate-pulse">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3 mb-2"></div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Carregando componente lazy...</div>
          </div>
        }>
          <LazyComponent />
        </Suspense>
      )}

      {showDynamic && <DynamicComponent />}

      <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg border border-blue-300 dark:border-blue-700">
        <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">📦 Code Splitting:</h4>
        <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1">
          <li>• <strong>React.lazy:</strong> Carregamento sob demanda com Suspense</li>
          <li>• <strong>Dynamic Import:</strong> Next.js dynamic imports com loading state</li>
          <li>• <strong>Bundle Splitting:</strong> Código é dividido automaticamente</li>
          <li>• <strong>Performance:</strong> Reduz o bundle inicial da aplicação</li>
        </ul>
      </div>
    </div>
  );
}

// Demonstração de useTransition
function TransitionDemo() {
  const [isPending, startTransition] = useState(false);
  const [input, setInput] = useState('');
  const [list, setList] = useState<string[]>([]);
  const [filter, setFilter] = useState('');

  // Simulação de operação custosa
  const generateLargeList = (query: string) => {
    const items = [];
    for (let i = 0; i < 10000; i++) {
      items.push(`${query} - Item ${i + 1}`);
    }
    return items;
  };

  const filteredList = useMemo(() => {
    if (!filter) return list;
    return list.filter(item => 
      item.toLowerCase().includes(filter.toLowerCase())
    );
  }, [list, filter]);

  const handleGenerateList = () => {
    if (!input.trim()) return;
    
    startTransition(() => {
      const newList = generateLargeList(input);
      setList(newList);
    });
  };

  const handleFilterChange = (value: string) => {
    startTransition(() => {
      setFilter(value);
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Gerar Lista (10,000 items)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite um prefixo..."
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <button
              onClick={handleGenerateList}
              disabled={isPending || !input.trim()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isPending ? 'Gerando...' : 'Gerar'}
            </button>
          </div>
        </div>
        
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Filtrar Lista
          </label>
          <input
            type="text"
            value={filter}
            onChange={(e) => handleFilterChange(e.target.value)}
            placeholder="Filtrar items..."
            disabled={list.length === 0}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{list.length}</div>
          <div className="text-sm text-blue-700 dark:text-blue-300">Total Items</div>
        </div>
        <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">{filteredList.length}</div>
          <div className="text-sm text-green-700 dark:text-green-300">Filtered Items</div>
        </div>
        <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {isPending ? '🔄' : '✅'}
          </div>
          <div className="text-sm text-purple-700 dark:text-purple-300">
            {isPending ? 'Processing' : 'Ready'}
          </div>
        </div>
      </div>

      {list.length > 0 && (
        <div className="max-h-64 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-lg">
          <div className="p-4 bg-white dark:bg-gray-800">
            <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
              Lista Gerada ({filteredList.length} items)
            </h4>
            <div className="space-y-1 text-sm">
              {filteredList.slice(0, 50).map((item, index) => (
                <div key={index} className="text-gray-600 dark:text-gray-400">
                  {item}
                </div>
              ))}
              {filteredList.length > 50 && (
                <div className="text-gray-500 dark:text-gray-500 italic">
                  ... e mais {filteredList.length - 50} items
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="p-4 bg-orange-100 dark:bg-orange-900/30 rounded-lg border border-orange-300 dark:border-orange-700">
        <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">⚡ useTransition:</h4>
        <ul className="text-orange-700 dark:text-orange-300 text-sm space-y-1">
          <li>• <strong>Non-blocking:</strong> UI permanece responsiva durante operações custosas</li>
          <li>• <strong>Priority:</strong> Atualizações urgentes têm prioridade</li>
          <li>• <strong>Concurrent:</strong> React pode interromper e retomar o trabalho</li>
          <li>• <strong>UX:</strong> Melhor experiência do usuário em operações pesadas</li>
        </ul>
      </div>
    </div>
  );
}

// Demonstração de Virtual Scrolling
function VirtualScrollDemo() {
  const [itemCount, setItemCount] = useState(1000);
  const [itemHeight] = useState(50);
  const [containerHeight] = useState(300);
  const [scrollTop, setScrollTop] = useState(0);

  const visibleStart = Math.floor(scrollTop / itemHeight);
  const visibleEnd = Math.min(
    visibleStart + Math.ceil(containerHeight / itemHeight) + 1,
    itemCount
  );

  const items = useMemo(() => {
    const result = [];
    for (let i = visibleStart; i < visibleEnd; i++) {
      result.push({
        id: i,
        content: `Virtual Item ${i + 1} - ${Math.random().toString(36).substr(2, 8)}`
      });
    }
    return result;
  }, [visibleStart, visibleEnd]);

  const totalHeight = itemCount * itemHeight;
  const offsetY = visibleStart * itemHeight;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Total de Items:
        </label>
        <input
          type="number"
          value={itemCount}
          onChange={(e) => setItemCount(parseInt(e.target.value) || 1000)}
          min="100"
          max="100000"
          step="100"
          className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white w-24"
        />
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Renderizando apenas {items.length} items visíveis
        </span>
      </div>

      <div
        className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-auto bg-white dark:bg-gray-800"
        style={{ height: containerHeight }}
        onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
      >
        <div style={{ height: totalHeight, position: 'relative' }}>
          <div style={{ transform: `translateY(${offsetY}px)` }}>
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center px-4 py-3 border-b border-gray-200 dark:border-gray-700"
                style={{ height: itemHeight }}
              >
                <div className="flex-1">
                  <div className="font-medium text-gray-800 dark:text-white">
                    {item.content}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Index: {item.id} | Scroll: {scrollTop.toFixed(0)}px
                  </div>
                </div>
                <div className="text-xs text-gray-400 dark:text-gray-500">
                  #{item.id + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 text-center text-sm">
        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded">
          <div className="font-bold text-blue-600 dark:text-blue-400">{itemCount}</div>
          <div className="text-blue-700 dark:text-blue-300">Total Items</div>
        </div>
        <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded">
          <div className="font-bold text-green-600 dark:text-green-400">{items.length}</div>
          <div className="text-green-700 dark:text-green-300">Rendered</div>
        </div>
        <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded">
          <div className="font-bold text-purple-600 dark:text-purple-400">{visibleStart + 1}</div>
          <div className="text-purple-700 dark:text-purple-300">Start Index</div>
        </div>
        <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded">
          <div className="font-bold text-orange-600 dark:text-orange-400">{visibleEnd}</div>
          <div className="text-orange-700 dark:text-orange-300">End Index</div>
        </div>
      </div>

      <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-lg border border-green-300 dark:border-green-700">
        <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">📜 Virtual Scrolling:</h4>
        <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
          <li>• <strong>Performance:</strong> Renderiza apenas items visíveis</li>
          <li>• <strong>Memory:</strong> Uso de memória constante independente do total</li>
          <li>• <strong>Smooth:</strong> Scroll suave mesmo com milhares de items</li>
          <li>• <strong>Scalable:</strong> Funciona com listas de qualquer tamanho</li>
        </ul>
      </div>
    </div>
  );
}

export default function PerformancePage() {
  const memoCode = `// React.memo e useMemo
import { memo, useMemo, useCallback } from 'react';

const ExpensiveComponent = memo(({ data, onUpdate }) => {
  // Cálculo custoso só executa quando data muda
  const expensiveResult = useMemo(() => {
    console.log('Executando cálculo custoso...');
    return data.reduce((acc, item) => acc + item * Math.random(), 0);
  }, [data]);

  return (
    <div>
      <p>Resultado: {expensiveResult}</p>
      <button onClick={() => onUpdate(1)}>Update</button>
    </div>
  );
});

function Parent() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([1, 2, 3]);

  // useCallback evita re-criação da função
  const handleUpdate = useCallback((id) => {
    setData(prev => prev.map((item, i) => i === id ? item + 1 : item));
  }, []);

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
      <ExpensiveComponent data={data} onUpdate={handleUpdate} />
    </div>
  );
}`;

  const lazyCode = `// Lazy Loading e Code Splitting
import { lazy, Suspense } from 'react';
import dynamic from 'next/dynamic';

// React.lazy
const LazyComponent = lazy(() => import('./LazyComponent'));

// Next.js dynamic
const DynamicComponent = dynamic(
  () => import('./DynamicComponent'),
  {
    loading: () => <div>Loading...</div>,
    ssr: false // Desabilita SSR se necessário
  }
);

function App() {
  const [showLazy, setShowLazy] = useState(false);

  return (
    <div>
      <button onClick={() => setShowLazy(!showLazy)}>
        Toggle Lazy Component
      </button>
      
      {showLazy && (
        <Suspense fallback={<div>Loading lazy component...</div>}>
          <LazyComponent />
        </Suspense>
      )}
      
      <DynamicComponent />
    </div>
  );
}`;

  const transitionCode = `// useTransition para operações não-urgentes
import { useTransition, useState } from 'react';

function SearchComponent() {
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = (value) => {
    setQuery(value); // Atualização urgente
    
    // Atualização não-urgente
    startTransition(() => {
      const searchResults = performExpensiveSearch(value);
      setResults(searchResults);
    });
  };

  return (
    <div>
      <input 
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search..."
      />
      
      {isPending && <div>Searching...</div>}
      
      <div>
        {results.map(result => (
          <div key={result.id}>{result.title}</div>
        ))}
      </div>
    </div>
  );
}

function performExpensiveSearch(query) {
  // Simulação de busca custosa
  const results = [];
  for (let i = 0; i < 10000; i++) {
    if (\`Item \${i}\`.includes(query)) {
      results.push({ id: i, title: \`Item \${i}\` });
    }
  }
  return results;
}`;

  const virtualScrollCode = `// Virtual Scrolling
import { useMemo, useState } from 'react';

function VirtualList({ items, itemHeight = 50, containerHeight = 300 }) {
  const [scrollTop, setScrollTop] = useState(0);

  const visibleStart = Math.floor(scrollTop / itemHeight);
  const visibleEnd = Math.min(
    visibleStart + Math.ceil(containerHeight / itemHeight) + 1,
    items.length
  );

  const visibleItems = useMemo(() => {
    return items.slice(visibleStart, visibleEnd).map((item, index) => ({
      ...item,
      index: visibleStart + index
    }));
  }, [items, visibleStart, visibleEnd]);

  const totalHeight = items.length * itemHeight;
  const offsetY = visibleStart * itemHeight;

  return (
    <div
      style={{ height: containerHeight, overflow: 'auto' }}
      onScroll={(e) => setScrollTop(e.target.scrollTop)}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ transform: \`translateY(\${offsetY}px)\` }}>
          {visibleItems.map((item) => (
            <div
              key={item.index}
              style={{ height: itemHeight }}
              className="border-b p-2"
            >
              {item.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-cyan-100 dark:from-gray-900 dark:to-gray-800 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent mb-6">
            Performance Optimization
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Demonstrações de técnicas avançadas de otimização de performance no React e Next.js.
          </p>
        </div>

        <div className="space-y-12">
          <DemoSection title="React.memo & useMemo">
            <MemoDemo />
          </DemoSection>

          <DemoSection title="Lazy Loading & Code Splitting">
            <LazyLoadingDemo />
          </DemoSection>

          <DemoSection title="useTransition & Concurrent Features">
            <TransitionDemo />
          </DemoSection>

          <DemoSection title="Virtual Scrolling">
            <VirtualScrollDemo />
          </DemoSection>
        </div>

        <div className="mt-16 space-y-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Memoization</h2>
            <CodeBlock code={memoCode} language="tsx" />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Code Splitting</h2>
            <CodeBlock code={lazyCode} language="tsx" />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Concurrent Features</h2>
            <CodeBlock code={transitionCode} language="tsx" />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Virtual Scrolling</h2>
            <CodeBlock code={virtualScrollCode} language="tsx" />
          </div>
        </div>

        <div className="mt-16 bg-gradient-to-r from-emerald-100 to-cyan-100 dark:from-emerald-900/30 dark:to-cyan-900/30 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">🚀 Técnicas de Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">React Optimizations</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• React.memo para componentes puros</li>
                <li>• useMemo para cálculos custosos</li>
                <li>• useCallback para funções estáveis</li>
                <li>• useTransition para operações não-urgentes</li>
                <li>• useDeferredValue para valores derivados</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Next.js Features</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Dynamic imports para code splitting</li>
                <li>• Image optimization automática</li>
                <li>• Static generation (SSG)</li>
                <li>• Incremental Static Regeneration (ISR)</li>
                <li>• Edge runtime para APIs</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}