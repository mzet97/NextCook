'use client';

import { useState, useDeferredValue, useMemo, useTransition } from 'react';
import CodeBlock from '@/components/CodeBlock';
import DemoSection from '@/components/DemoSection';

// Componente de lista pesada para demonstrar o efeito
function HeavyList({ items, filter }: { items: string[]; filter: string }) {
  const filteredItems = useMemo(() => {
    console.log('Filtrando lista pesada...');
    // Simular processamento pesado
    const start = performance.now();
    while (performance.now() - start < 50) {
      // Simular trabalho pesado
    }
    
    return items.filter(item => 
      item.toLowerCase().includes(filter.toLowerCase())
    );
  }, [items, filter]);

  return (
    <div className="space-y-2 max-h-60 overflow-y-auto">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Mostrando {filteredItems.length} de {items.length} itens
      </p>
      {filteredItems.map((item, index) => (
        <div
          key={index}
          className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-gray-200"
        >
          {item}
        </div>
      ))}
    </div>
  );
}

// Componente de busca com useTransition
function SearchWithTransition({ items }: { items: string[] }) {
  const [query, setQuery] = useState('');
  const [isPending, startTransition] = useTransition();
  const [results, setResults] = useState<string[]>([]);

  const handleSearch = (value: string) => {
    setQuery(value);
    
    startTransition(() => {
      // Simular busca pesada
      const filtered = items.filter(item => 
        item.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
    });
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Buscar com useTransition..."
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        {isPending && (
          <div className="absolute right-3 top-3">
            <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
          </div>
        )}
      </div>
      
      <div className={`transition-opacity duration-200 ${isPending ? 'opacity-50' : 'opacity-100'}`}>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          Resultados: {results.length} itens
        </p>
        <div className="space-y-1 max-h-40 overflow-y-auto">
          {results.slice(0, 10).map((item, index) => (
            <div
              key={index}
              className="p-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Componente de input com feedback visual
function ResponsiveInput() {
  const [input, setInput] = useState('');
  const deferredInput = useDeferredValue(input);
  const isStale = input !== deferredInput;

  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite algo..."
          className={`w-full px-3 py-2 border rounded-lg transition-colors ${
            isStale 
              ? 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20' 
              : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
          } text-gray-900 dark:text-white`}
        />
        {isStale && (
          <div className="absolute right-3 top-3">
            <div className="h-2 w-2 bg-yellow-400 rounded-full animate-pulse"></div>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Valor atual:</p>
          <p className="font-mono text-gray-800 dark:text-gray-200">
            "{input}"
          </p>
        </div>
        <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Valor diferido:</p>
          <p className="font-mono text-gray-800 dark:text-gray-200">
            "{deferredInput}"
          </p>
        </div>
      </div>
      
      <div className={`p-3 rounded-lg transition-colors ${
        isStale 
          ? 'bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-700'
          : 'bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700'
      }`}>
        <p className={`text-sm ${
          isStale 
            ? 'text-yellow-800 dark:text-yellow-200'
            : 'text-green-800 dark:text-green-200'
        }`}>
          {isStale ? '⏳ Processando mudanças...' : '✅ Sincronizado'}
        </p>
      </div>
    </div>
  );
}

export default function UseDeferredValuePage() {
  const [filter, setFilter] = useState('');
  const deferredFilter = useDeferredValue(filter);
  
  // Lista grande para demonstrar o efeito
  const items = useMemo(() => {
    const list = [];
    for (let i = 0; i < 1000; i++) {
      list.push(`Item ${i + 1} - ${['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'][i % 5]}`);
    }
    return list;
  }, []);

  const codeExample = `import { useState, useDeferredValue, useMemo } from 'react';

function SearchResults({ query }) {
  // O valor diferido será atualizado com menor prioridade
  const deferredQuery = useDeferredValue(query);
  
  // Cálculo pesado usando o valor diferido
  const results = useMemo(() => {
    return heavySearch(deferredQuery);
  }, [deferredQuery]);
  
  // Mostrar estado de carregamento quando valores diferem
  const isStale = query !== deferredQuery;
  
  return (
    <div className={isStale ? 'opacity-50' : 'opacity-100'}>
      {results.map(result => (
        <div key={result.id}>{result.name}</div>
      ))}
    </div>
  );
}

function App() {
  const [query, setQuery] = useState('');
  
  return (
    <div>
      <input 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar..."
      />
      <SearchResults query={query} />
    </div>
  );
}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
            useDeferredValue Hook
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Hook do React 18 que permite diferir atualizações de valores, mantendo a interface responsiva durante operações pesadas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-1.5 mb-12">
          <DemoSection title="Filtro com Lista Pesada">
            <div className="space-y-4">
              <input
                type="text"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Filtrar lista pesada..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <p>Valor atual: "{filter}"</p>
                <p>Valor diferido: "{deferredFilter}"</p>
                {filter !== deferredFilter && (
                  <p className="text-yellow-600 dark:text-yellow-400">⏳ Atualizando...</p>
                )}
              </div>
              
              <HeavyList items={items} filter={deferredFilter} />
            </div>
          </DemoSection>

          <DemoSection title="Input Responsivo">
            <ResponsiveInput />
          </DemoSection>
        </div>

        <div className="mb-12">
          <DemoSection title="Busca com useTransition">
            <SearchWithTransition items={items} />
          </DemoSection>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Exemplo de Código</h2>
          <CodeBlock code={codeExample} language="tsx" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">useDeferredValue</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Como funciona:</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Retorna uma versão "atrasada" do valor</li>
                  <li>• Atualiza com menor prioridade</li>
                  <li>• Mantém a UI responsiva</li>
                  <li>• Ideal para operações pesadas</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Casos de uso:</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Filtros de busca em listas grandes</li>
                  <li>• Visualizações de dados complexas</li>
                  <li>• Renderização de gráficos</li>
                  <li>• Processamento de texto</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">useTransition</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Diferenças:</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• <strong>useDeferredValue:</strong> Para valores</li>
                  <li>• <strong>useTransition:</strong> Para ações</li>
                  <li>• Ambos mantêm UI responsiva</li>
                  <li>• Trabalham bem juntos</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Benefícios:</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Melhor experiência do usuário</li>
                  <li>• Interface mais fluida</li>
                  <li>• Feedback visual de carregamento</li>
                  <li>• Priorização automática</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">💡 Dica de Performance</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Use <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">useDeferredValue</code> quando você tem um valor que muda frequentemente e causa renderizações pesadas. 
            O React irá priorizar outras atualizações mais importantes primeiro.
          </p>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Exemplo prático:</strong> Em um campo de busca que filtra uma lista de 10.000 itens, 
              use useDeferredValue para o termo de busca. Isso permite que o usuário continue digitando 
              suavemente enquanto a filtragem acontece em segundo plano.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}