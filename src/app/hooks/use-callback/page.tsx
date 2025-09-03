'use client';

import React, { useState, useCallback, useMemo } from 'react';
import CodeBlock from '@/components/CodeBlock';
import DemoSection from '@/components/DemoSection';

// Componente filho que recebe uma função
interface ChildComponentProps {
  onClick: () => void;
  label: string;
}

function ChildComponent({ onClick, label }: ChildComponentProps) {
  console.log(`${label} component rendered`);
  
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
    >
      {label}
    </button>
  );
}

// Componente otimizado com React.memo
const OptimizedChild = React.memo(ChildComponent);

// Lista de itens para demonstração
interface Item {
  id: number;
  name: string;
  price: number;
}

const items: Item[] = [
  { id: 1, name: 'Produto A', price: 100 },
  { id: 2, name: 'Produto B', price: 200 },
  { id: 3, name: 'Produto C', price: 300 },
  { id: 4, name: 'Produto D', price: 400 },
];

export default function UseCallbackPage() {
  const [count, setCount] = useState(0);
  const [filter, setFilter] = useState('');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  // Sem useCallback - função é recriada a cada render
  const handleClickWithoutCallback = () => {
    console.log('Clicked without useCallback');
  };

  // Com useCallback - função é memoizada
  const handleClickWithCallback = useCallback(() => {
    console.log('Clicked with useCallback');
  }, []);

  // useCallback com dependências
  const handleIncrement = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  // useCallback para manipular lista
  const handleItemSelect = useCallback((itemId: number) => {
    setSelectedItems(prev => 
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  }, []);

  // Filtro com useMemo para comparação
  const filteredItems = useMemo(() => {
    return items.filter(item => 
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [filter]);

  // Função complexa que se beneficia do useCallback
  const handleComplexOperation = useCallback((data: string) => {
    // Simula operação complexa
    console.log('Processing:', data);
    // Aqui poderia haver uma operação custosa
  }, []);

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            useCallback Hook
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Memoização de funções para otimização de performance em React
          </p>
        </div>

        {/* Conceito Básico */}
        <DemoSection title="Conceito Básico">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="card">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Demonstração de Re-renderização
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Abra o console para ver quando os componentes são renderizados.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <span className="text-lg font-semibold">Count: {count}</span>
                    <button
                      onClick={() => setCount(c => c + 1)}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      +1
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Sem useCallback (re-renderiza sempre):
                    </p>
                    <ChildComponent 
                      onClick={handleClickWithoutCallback} 
                      label="Sem useCallback" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Com useCallback + React.memo (otimizado):
                    </p>
                    <OptimizedChild 
                      onClick={handleClickWithCallback} 
                      label="Com useCallback" 
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <CodeBlock
                title="useCallback Básico"
                language="tsx"
                code={`// Sem useCallback - função recriada a cada render
const handleClick = () => {
  console.log('Clicked');
};

// Com useCallback - função memoizada
const handleClickMemo = useCallback(() => {
  console.log('Clicked');
}, []); // Array de dependências vazio

// Com dependências
const handleIncrement = useCallback(() => {
  setCount(prev => prev + 1);
}, []); // Não precisa de count como dependência`}
              />
              
              <CodeBlock
                title="React.memo + useCallback"
                language="tsx"
                code={`// Componente otimizado
const OptimizedChild = React.memo(({ onClick, label }) => {
  console.log(\`\${label} rendered\`);
  
  return (
    <button onClick={onClick}>
      {label}
    </button>
  );
});

// Uso com useCallback
const memoizedCallback = useCallback(() => {
  // função memoizada
}, []);

<OptimizedChild onClick={memoizedCallback} label="Otimizado" />`}
              />
            </div>
          </div>
        </DemoSection>

        {/* Exemplo Prático */}
        <DemoSection title="Exemplo Prático - Lista Interativa">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Lista de Produtos
              </h3>
              
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Filtrar produtos..."
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
                
                <div className="space-y-2">
                  {filteredItems.map(item => (
                    <div 
                      key={item.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedItems.includes(item.id)
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                      }`}
                      onClick={() => handleItemSelect(item.id)}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          {item.name}
                        </span>
                        <span className="text-gray-600 dark:text-gray-400">
                          R$ {item.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Selecionados: {selectedItems.length} item(s)
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <CodeBlock
                title="Lista com useCallback"
                language="tsx"
                code={`const [selectedItems, setSelectedItems] = useState<number[]>([]);
const [filter, setFilter] = useState('');

// useCallback para seleção de itens
const handleItemSelect = useCallback((itemId: number) => {
  setSelectedItems(prev => 
    prev.includes(itemId)
      ? prev.filter(id => id !== itemId)
      : [...prev, itemId]
  );
}, []); // Sem dependências - função estável

// useMemo para filtro
const filteredItems = useMemo(() => {
  return items.filter(item => 
    item.name.toLowerCase().includes(filter.toLowerCase())
  );
}, [filter]); // Recalcula apenas quando filter muda`}
              />
              
              <CodeBlock
                title="Renderização da Lista"
                language="tsx"
                code={`{filteredItems.map(item => (
  <div 
    key={item.id}
    onClick={() => handleItemSelect(item.id)}
    className={selectedItems.includes(item.id) ? 'selected' : ''}
  >
    <span>{item.name}</span>
    <span>R$ {item.price}</span>
  </div>
))}`}
              />
            </div>
          </div>
        </DemoSection>

        {/* Quando Usar */}
        <DemoSection title="Quando Usar useCallback">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                ✅ Use useCallback quando:
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Passando funções para componentes filhos otimizados (React.memo)</li>
                <li>• A função é dependência de outros hooks (useEffect, useMemo)</li>
                <li>• Criando event handlers para listas grandes</li>
                <li>• A função é custosa para criar</li>
                <li>• Evitando re-renderizações desnecessárias</li>
                <li>• Trabalhando com refs de funções</li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                ❌ Não use useCallback quando:
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• A função é simples e não causa problemas de performance</li>
                <li>• O componente filho não é otimizado com React.memo</li>
                <li>• As dependências mudam frequentemente</li>
                <li>• Não há benefício mensurável de performance</li>
                <li>• A função é usada apenas localmente</li>
                <li>• Premature optimization</li>
              </ul>
            </div>
          </div>
        </DemoSection>

        {/* Comparação com useMemo */}
        <DemoSection title="useCallback vs useMemo">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                useCallback
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Memoiza funções
              </p>
              <CodeBlock
                language="tsx"
                code={`// Memoiza a função
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b]
);

// Equivalente a:
const memoizedCallback = useMemo(
  () => () => {
    doSomething(a, b);
  },
  [a, b]
);`}
              />
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                useMemo
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Memoiza valores/resultados
              </p>
              <CodeBlock
                language="tsx"
                code={`// Memoiza o resultado
const memoizedValue = useMemo(
  () => computeExpensiveValue(a, b),
  [a, b]
);

// Para objetos/arrays
const memoizedObject = useMemo(
  () => ({ a, b }),
  [a, b]
);`}
              />
            </div>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}