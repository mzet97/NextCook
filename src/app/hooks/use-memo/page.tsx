'use client';

import { useState, useMemo, useCallback } from 'react';
import CodeBlock from '@/components/CodeBlock';
import DemoSection from '@/components/DemoSection';

// Função custosa para demonstrar useMemo
function expensiveCalculation(num: number): number {
  console.log('Executando cálculo custoso...');
  let result = 0;
  for (let i = 0; i < num * 1000000; i++) {
    result += i;
  }
  return result;
}

// Função para filtrar e ordenar lista
function processItems(items: string[], filter: string, sortOrder: 'asc' | 'desc'): string[] {
  console.log('Processando lista...');
  
  const filtered = items.filter(item => 
    item.toLowerCase().includes(filter.toLowerCase())
  );
  
  return filtered.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.localeCompare(b);
    } else {
      return b.localeCompare(a);
    }
  });
}

// Componente filho para demonstrar re-renderização
interface ChildComponentProps {
  items: string[];
  onItemClick: (item: string) => void;
}

function ChildComponent({ items, onItemClick }: ChildComponentProps) {
  console.log('ChildComponent renderizado');
  
  return (
    <div className="space-y-2">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Componente filho renderizado (verifique o console)
      </p>
      {items.map((item, index) => (
        <button
          key={index}
          onClick={() => onItemClick(item)}
          className="block w-full text-left px-3 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
        >
          {item}
        </button>
      ))}
    </div>
  );
}

// Função para calcular estatísticas
function calculateStats(numbers: number[]) {
  console.log('Calculando estatísticas...');
  
  if (numbers.length === 0) {
    return { sum: 0, average: 0, min: 0, max: 0 };
  }
  
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  const average = sum / numbers.length;
  const min = Math.min(...numbers);
  const max = Math.max(...numbers);
  
  return { sum, average, min, max };
}

export default function UseMemoPage() {
  const [count, setCount] = useState(1);
  const [multiplier, setMultiplier] = useState(1);
  const [items] = useState([
    'Apple', 'Banana', 'Cherry', 'Date', 'Elderberry',
    'Fig', 'Grape', 'Honeydew', 'Kiwi', 'Lemon'
  ]);
  const [filter, setFilter] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedItem, setSelectedItem] = useState('');
  const [numbers, setNumbers] = useState([1, 2, 3, 4, 5]);
  const [newNumber, setNewNumber] = useState('');
  const [renderCount, setRenderCount] = useState(0);

  // useMemo para cálculo custoso
  const expensiveValue = useMemo(() => {
    return expensiveCalculation(count);
  }, [count]);

  // useMemo para processamento de lista
  const processedItems = useMemo(() => {
    return processItems(items, filter, sortOrder);
  }, [items, filter, sortOrder]);

  // useMemo para cálculo de estatísticas
  const stats = useMemo(() => {
    return calculateStats(numbers);
  }, [numbers]);

  // useCallback para função que será passada para componente filho
  const handleItemClick = useCallback((item: string) => {
    setSelectedItem(item);
  }, []);

  // Função sem useCallback para comparação
  const handleItemClickWithoutCallback = (item: string) => {
    setSelectedItem(item);
  };

  // Adicionar número à lista
  const addNumber = () => {
    const num = parseInt(newNumber);
    if (!isNaN(num)) {
      setNumbers(prev => [...prev, num]);
      setNewNumber('');
    }
  };

  // Remover número da lista
  const removeNumber = (index: number) => {
    setNumbers(prev => prev.filter((_, i) => i !== index));
  };

  const codeExample = `import { useState, useMemo, useCallback } from 'react';

// Função custosa
function expensiveCalculation(num) {
  let result = 0;
  for (let i = 0; i < num * 1000000; i++) {
    result += i;
  }
  return result;
}

function Component() {
  const [count, setCount] = useState(1);
  const [other, setOther] = useState(0);

  // ❌ Sem useMemo - recalcula a cada render
  const expensiveValue = expensiveCalculation(count);

  // ✅ Com useMemo - só recalcula quando count muda
  const memoizedValue = useMemo(() => {
    return expensiveCalculation(count);
  }, [count]);

  // ✅ useCallback para funções
  const handleClick = useCallback(() => {
    console.log('Clicked!');
  }, []);

  return (
    <div>
      <p>Expensive: {memoizedValue}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setOther(other + 1)}>Other</button>
    </div>
  );
}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-6">
            useMemo Hook
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Hook para memoizar valores computados, evitando recálculos desnecessários e otimizando performance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <DemoSection title="Cálculo Custoso">
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                Abra o console para ver quando o cálculo é executado
              </p>
              <div className="flex items-center gap-4">
                <label className="text-gray-700 dark:text-gray-300">Valor:</label>
                <input
                  type="number"
                  value={count}
                  onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  min="1"
                  max="10"
                />
              </div>
              <div className="p-4 bg-cyan-100 dark:bg-cyan-900 rounded-lg">
                <p className="text-cyan-800 dark:text-cyan-200">
                  Resultado memoizado: <span className="font-mono">{expensiveValue}</span>
                </p>
              </div>
              <div className="flex items-center gap-4">
                <label className="text-gray-700 dark:text-gray-300">Multiplicador:</label>
                <input
                  type="number"
                  value={multiplier}
                  onChange={(e) => setMultiplier(parseInt(e.target.value) || 1)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Mudando o multiplicador não recalcula o valor custoso!
              </p>
            </div>
          </DemoSection>

          <DemoSection title="Processamento de Lista">
            <div className="space-y-4">
              <input
                type="text"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Filtrar itens..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => setSortOrder('asc')}
                  className={`px-3 py-1 rounded text-sm transition-colors ${
                    sortOrder === 'asc'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  A-Z
                </button>
                <button
                  onClick={() => setSortOrder('desc')}
                  className={`px-3 py-1 rounded text-sm transition-colors ${
                    sortOrder === 'desc'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Z-A
                </button>
              </div>
              <div className="space-y-1">
                {processedItems.map((item, index) => (
                  <div
                    key={index}
                    className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded text-gray-800 dark:text-gray-200"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Lista processada: {processedItems.length} itens
              </p>
            </div>
          </DemoSection>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <DemoSection title="Estatísticas Memoizadas">
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="number"
                  value={newNumber}
                  onChange={(e) => setNewNumber(e.target.value)}
                  placeholder="Novo número"
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  onKeyPress={(e) => e.key === 'Enter' && addNumber()}
                />
                <button
                  onClick={addNumber}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Adicionar
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {numbers.map((num, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded"
                  >
                    {num}
                    <button
                      onClick={() => removeNumber(index)}
                      className="text-red-500 hover:text-red-700 ml-1"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Soma:</p>
                  <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">{stats.sum}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Média:</p>
                  <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">{stats.average.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Mínimo:</p>
                  <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">{stats.min}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Máximo:</p>
                  <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">{stats.max}</p>
                </div>
              </div>
            </div>
          </DemoSection>

          <DemoSection title="useCallback Demonstration">
            <div className="space-y-4">
              <button
                onClick={() => setRenderCount(prev => prev + 1)}
                className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                Forçar Re-render ({renderCount})
              </button>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    Com useCallback:
                  </h4>
                  <ChildComponent 
                    items={['Item 1', 'Item 2', 'Item 3']} 
                    onItemClick={handleItemClick}
                  />
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    Sem useCallback:
                  </h4>
                  <ChildComponent 
                    items={['Item A', 'Item B', 'Item C']} 
                    onItemClick={handleItemClickWithoutCallback}
                  />
                </div>
              </div>
              
              {selectedItem && (
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                  <p className="text-green-800 dark:text-green-200">
                    Item selecionado: {selectedItem}
                  </p>
                </div>
              )}
            </div>
          </DemoSection>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Exemplo de Código</h2>
          <CodeBlock code={codeExample} language="tsx" />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Quando usar useMemo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">✅ Use quando:</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Cálculos custosos que dependem de props/state</li>
                <li>• Processamento de listas grandes</li>
                <li>• Criação de objetos complexos</li>
                <li>• Evitar re-renderização de componentes filhos</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">❌ Não use quando:</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Cálculos simples e rápidos</li>
                <li>• Valores que mudam frequentemente</li>
                <li>• Overhead da memoização é maior que o benefício</li>
                <li>• Dependências mudam a cada render</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}