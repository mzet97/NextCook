'use client';

import { useRef, useState, useEffect } from 'react';
import CodeBlock from '@/components/CodeBlock';
import DemoSection from '@/components/DemoSection';

// Demonstração básica do useRef
function BasicRefDemo() {
  const inputRef = useRef<HTMLInputElement>(null);
  const countRef = useRef(0);
  const [renderCount, setRenderCount] = useState(0);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const incrementCount = () => {
    countRef.current += 1;
    console.log('Count (não causa re-render):', countRef.current);
  };

  const forceRerender = () => {
    setRenderCount(prev => prev + 1);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
          <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Referência DOM</h3>
          <div className="space-y-3">
            <input
              ref={inputRef}
              type="text"
              placeholder="Clique no botão para focar aqui"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <button
              onClick={focusInput}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Focar Input
            </button>
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
          <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Valor Mutável</h3>
          <div className="space-y-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                Ref Count: {countRef.current}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Renders: {renderCount}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={incrementCount}
                className="flex-1 px-3 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
              >
                +1 (Sem Re-render)
              </button>
              <button
                onClick={forceRerender}
                className="flex-1 px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
              >
                Force Re-render
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Demonstração de timer com useRef
function TimerDemo() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      startTimeRef.current = Date.now() - time;
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTimeRef.current);
      }, 10);
    }
  };

  const stopTimer = () => {
    if (isRunning && intervalRef.current) {
      setIsRunning(false);
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const resetTimer = () => {
    stopTimer();
    setTime(0);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="text-center space-y-6">
      <div className="text-6xl font-mono font-bold text-blue-600 dark:text-blue-400">
        {formatTime(time)}
      </div>
      
      <div className="flex gap-3 justify-center">
        <button
          onClick={startTimer}
          disabled={isRunning}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Start
        </button>
        <button
          onClick={stopTimer}
          disabled={!isRunning}
          className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Stop
        </button>
        <button
          onClick={resetTimer}
          className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          Reset
        </button>
      </div>
      
      <div className="text-sm text-gray-600 dark:text-gray-400">
        Status: {isRunning ? '🟢 Rodando' : '🔴 Parado'}
      </div>
    </div>
  );
}

// Demonstração de scroll tracking
function ScrollTrackingDemo() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      const position = (scrollTop / (scrollHeight - clientHeight)) * 100;
      
      setScrollPosition(position);
      setIsAtTop(scrollTop === 0);
      setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 1);
    }
  };

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ 
        top: scrollRef.current.scrollHeight, 
        behavior: 'smooth' 
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Posição: {scrollPosition.toFixed(1)}%
        </div>
        <div className="flex gap-2">
          <span className={`px-2 py-1 rounded text-xs ${
            isAtTop ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
          }`}>
            Topo
          </span>
          <span className={`px-2 py-1 rounded text-xs ${
            isAtBottom ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
          }`}>
            Fundo
          </span>
        </div>
      </div>
      
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
        <div 
          className="bg-blue-500 h-2 rounded-full transition-all duration-150"
          style={{ width: `${scrollPosition}%` }}
        ></div>
      </div>
      
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="h-64 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-white dark:bg-gray-800"
      >
        <div className="space-y-4">
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                Item {i + 1}
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Este é o conteúdo do item {i + 1}. Role para ver mais itens e observe como a posição do scroll é rastreada usando useRef.
              </p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={scrollToTop}
          className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          ↑ Ir para o Topo
        </button>
        <button
          onClick={scrollToBottom}
          className="flex-1 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
        >
          ↓ Ir para o Fundo
        </button>
      </div>
    </div>
  );
}

// Demonstração de cache de valores
function CacheDemo() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const cacheRef = useRef<Map<string, string[]>>(new Map());
  const [cacheHits, setCacheHits] = useState(0);
  const [cacheMisses, setCacheMisses] = useState(0);

  const expensiveSearch = (query: string): string[] => {
    // Simular operação custosa
    const items = [
      'React', 'Vue', 'Angular', 'Svelte', 'Next.js', 'Nuxt.js',
      'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Tailwind',
      'Node.js', 'Express', 'Fastify', 'Nest.js', 'Deno'
    ];
    
    return items.filter(item => 
      item.toLowerCase().includes(query.toLowerCase())
    );
  };

  const handleSearch = (query: string) => {
    setInput(query);
    
    if (!query.trim()) {
      setResults([]);
      return;
    }

    // Verificar cache
    if (cacheRef.current.has(query)) {
      setResults(cacheRef.current.get(query)!);
      setCacheHits(prev => prev + 1);
    } else {
      const searchResults = expensiveSearch(query);
      cacheRef.current.set(query, searchResults);
      setResults(searchResults);
      setCacheMisses(prev => prev + 1);
    }
  };

  const clearCache = () => {
    cacheRef.current.clear();
    setCacheHits(0);
    setCacheMisses(0);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">{cacheHits}</div>
          <div className="text-sm text-green-700 dark:text-green-300">Cache Hits</div>
        </div>
        <div className="text-center p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">{cacheMisses}</div>
          <div className="text-sm text-red-700 dark:text-red-300">Cache Misses</div>
        </div>
        <div className="text-center p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{cacheRef.current.size}</div>
          <div className="text-sm text-blue-700 dark:text-blue-300">Cache Size</div>
        </div>
      </div>
      
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Digite para buscar (ex: react, vue, js)..."
          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        <button
          onClick={clearCache}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Limpar Cache
        </button>
      </div>
      
      {results.length > 0 && (
        <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-white dark:bg-gray-800">
          <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
            Resultados ({results.length}):
          </h4>
          <div className="flex flex-wrap gap-2">
            {results.map((result, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm"
              >
                {result}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function UseRefPage() {
  const basicRefCode = `// Referência DOM
import { useRef } from 'react';

function MyComponent() {
  const inputRef = useRef<HTMLInputElement>(null);
  
  const focusInput = () => {
    inputRef.current?.focus();
  };
  
  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}`;

  const mutableValueCode = `// Valor mutável que não causa re-render
import { useRef, useState } from 'react';

function Counter() {
  const countRef = useRef(0);
  const [renderCount, setRenderCount] = useState(0);
  
  const increment = () => {
    countRef.current += 1;
    console.log('Count:', countRef.current); // Não causa re-render
  };
  
  const forceRerender = () => {
    setRenderCount(prev => prev + 1);
  };
  
  return (
    <div>
      <p>Ref Count: {countRef.current}</p>
      <p>Renders: {renderCount}</p>
      <button onClick={increment}>Increment (No Re-render)</button>
      <button onClick={forceRerender}>Force Re-render</button>
    </div>
  );
}`;

  const timerCode = `// Timer com useRef
import { useRef, useState, useEffect } from 'react';

function Timer() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    }
  };
  
  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setIsRunning(false);
    }
  };
  
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  
  return (
    <div>
      <p>Time: {time}s</p>
      <button onClick={startTimer} disabled={isRunning}>Start</button>
      <button onClick={stopTimer} disabled={!isRunning}>Stop</button>
    </div>
  );
}`;

  const cacheCode = `// Cache com useRef
import { useRef, useState } from 'react';

function SearchWithCache() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const cacheRef = useRef(new Map());
  
  const search = (searchQuery: string) => {
    // Verificar cache
    if (cacheRef.current.has(searchQuery)) {
      setResults(cacheRef.current.get(searchQuery));
      return;
    }
    
    // Busca custosa
    const searchResults = expensiveSearch(searchQuery);
    
    // Salvar no cache
    cacheRef.current.set(searchQuery, searchResults);
    setResults(searchResults);
  };
  
  return (
    <div>
      <input 
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          search(e.target.value);
        }}
      />
      {/* Render results */}
    </div>
  );
}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            useRef
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Demonstração do useRef Hook - crie referências mutáveis que persistem entre renders sem causar re-renderizações.
          </p>
        </div>

        <div className="space-y-12">
          <DemoSection title="Demonstração Básica">
            <BasicRefDemo />
          </DemoSection>

          <DemoSection title="Timer com useRef">
            <TimerDemo />
          </DemoSection>

          <DemoSection title="Scroll Tracking">
            <ScrollTrackingDemo />
          </DemoSection>

          <DemoSection title="Cache com useRef">
            <CacheDemo />
          </DemoSection>
        </div>

        <div className="mt-16 space-y-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Referência DOM</h2>
            <CodeBlock code={basicRefCode} language="tsx" />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Valor Mutável</h2>
            <CodeBlock code={mutableValueCode} language="tsx" />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Timer</h2>
            <CodeBlock code={timerCode} language="tsx" />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Cache</h2>
            <CodeBlock code={cacheCode} language="tsx" />
          </div>
        </div>

        <div className="mt-16 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">🎯 Casos de Uso do useRef</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Referências DOM</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Focar inputs</li>
                <li>• Scroll programático</li>
                <li>• Medir dimensões</li>
                <li>• Integrar bibliotecas</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Valores Mutáveis</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• IDs de timers/intervals</li>
                <li>• Cache de dados</li>
                <li>• Valores anteriores</li>
                <li>• Flags de estado</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}