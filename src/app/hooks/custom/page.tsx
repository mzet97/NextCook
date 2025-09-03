'use client';

import { useState } from 'react';
import CodeBlock from '@/components/CodeBlock';
import DemoSection from '@/components/DemoSection';
import { useLocalStorage, useFetch, useTheme, useCounter, useToggle, useDebounce } from '@/hooks';

// Demonstração do useLocalStorage
function UseLocalStorageDemo() {
  const [name, setName] = useLocalStorage('demo-name', '');
  const [preferences, setPreferences] = useLocalStorage('demo-preferences', {
    theme: 'light',
    notifications: true,
  });

  const codeExample = `import { useLocalStorage } from '@/hooks';

function Component() {
  const [name, setName] = useLocalStorage('demo-name', '');
  const [preferences, setPreferences] = useLocalStorage('demo-preferences', {
    theme: 'light',
    notifications: true,
  });

  return (
    <div>
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
    </div>
  );
}`;

  return (
    <DemoSection title="useLocalStorage" description="Persistência automática no localStorage">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Nome (persistido):</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite seu nome"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Preferências:</label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={preferences.notifications}
                onChange={(e) => setPreferences({
                  ...preferences,
                  notifications: e.target.checked
                })}
                className="mr-2"
              />
              Notificações
            </label>
            <select
              value={preferences.theme}
              onChange={(e) => setPreferences({
                ...preferences,
                theme: e.target.value
              })}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="light">Claro</option>
              <option value="dark">Escuro</option>
            </select>
          </div>
        </div>
        <div className="text-sm text-gray-600">
          <strong>Dados salvos:</strong> {JSON.stringify({ name, preferences }, null, 2)}
        </div>
        <CodeBlock code={codeExample} language="typescript" />
      </div>
    </DemoSection>
  );
}

// Demonstração do useFetch
function UseFetchDemo() {
  const { data, loading, error, refetch } = useFetch('/api/demo-data');

  const codeExample = `import { useFetch } from '@/hooks';

function Component() {
  const { data, loading, error, refetch } = useFetch('/api/demo-data');

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button onClick={refetch}>Recarregar</button>
    </div>
  );
}`;

  return (
    <DemoSection title="useFetch" description="Hook para requisições HTTP">
      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            onClick={refetch}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Recarregar Dados
          </button>
        </div>
        
        {loading && (
          <div className="text-blue-600">🔄 Carregando...</div>
        )}
        
        {error && (
          <div className="text-red-600">❌ Erro: {error}</div>
        )}
        
        {data !== null && (
          <div>
            <strong>Dados recebidos:</strong>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}
        
        <CodeBlock code={codeExample} language="typescript" />
      </div>
    </DemoSection>
  );
}

// Demonstração do useTheme
function UseThemeDemo() {
  const { theme, isDark, toggleTheme, setTheme } = useTheme();

  const codeExample = `import { useTheme } from '@/hooks';

function Component() {
  const { theme, isDark, toggleTheme, setTheme } = useTheme();

  return (
    <div>
      <p>Tema atual: {theme}</p>
      <button onClick={toggleTheme}>
        {isDark ? '☀️' : '🌙'} Alternar Tema
      </button>
      <button onClick={() => setTheme('dark')}>Escuro</button>
      <button onClick={() => setTheme('light')}>Claro</button>
    </div>
  );
}`;

  return (
    <DemoSection title="useTheme" description="Gerenciamento de tema com persistência">
      <div className="space-y-4">
        <div>
          <strong>Tema atual:</strong> {theme} {isDark ? '🌙' : '☀️'}
        </div>
        <div className="flex gap-2">
          <button
            onClick={toggleTheme}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            {isDark ? '☀️' : '🌙'} Alternar
          </button>
          <button
            onClick={() => setTheme('light')}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            ☀️ Claro
          </button>
          <button
            onClick={() => setTheme('dark')}
            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
          >
            🌙 Escuro
          </button>
        </div>
        <CodeBlock code={codeExample} language="typescript" />
      </div>
    </DemoSection>
  );
}

// Demonstração do useCounter
function UseCounterDemo() {
  const { count, increment, decrement, reset, set, canIncrement, canDecrement } = useCounter(5, {
    min: 0,
    max: 10,
    step: 1
  });

  const codeExample = `import { useCounter } from '@/hooks';

function Component() {
  const { 
    count, 
    increment, 
    decrement, 
    reset, 
    set, 
    canIncrement, 
    canDecrement 
  } = useCounter(5, {
    min: 0,
    max: 10,
    step: 1
  });

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment} disabled={!canIncrement}>+</button>
      <button onClick={decrement} disabled={!canDecrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}`;

  return (
    <DemoSection title="useCounter" description="Contador com limites e validações">
      <div className="space-y-4">
        <div className="text-center">
          <div className="text-4xl font-bold text-blue-600 mb-4">{count}</div>
          <div className="text-sm text-gray-600 mb-4">
            Limites: 0 - 10 | Passo: 1
          </div>
        </div>
        <div className="flex gap-2 justify-center">
          <button
            onClick={decrement}
            disabled={!canDecrement}
            className={`px-4 py-2 rounded ${
              canDecrement 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            -1
          </button>
          <button
            onClick={reset}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Reset
          </button>
          <button
            onClick={increment}
            disabled={!canIncrement}
            className={`px-4 py-2 rounded ${
              canIncrement 
                ? 'bg-green-500 hover:bg-green-600 text-white' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            +1
          </button>
        </div>
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => set(0)}
            className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
          >
            Set 0
          </button>
          <button
            onClick={() => set(5)}
            className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
          >
            Set 5
          </button>
          <button
            onClick={() => set(10)}
            className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
          >
            Set 10
          </button>
        </div>
        <CodeBlock code={codeExample} language="typescript" />
      </div>
    </DemoSection>
  );
}

// Demonstração do useToggle
function UseToggleDemo() {
  const [isVisible, { toggle, setTrue, setFalse }] = useToggle(false);
  const [isEnabled, toggleActions] = useToggle(true);

  const codeExample = `import { useToggle } from '@/hooks';

function Component() {
  const [isVisible, { toggle, setTrue, setFalse }] = useToggle(false);
  const [isEnabled, { toggle: toggleEnabled }] = useToggle(true);

  return (
    <div>
      <button onClick={toggle}>Toggle Visibility</button>
      <button onClick={setTrue}>Show</button>
      <button onClick={setFalse}>Hide</button>
      {isVisible && <div>Conteúdo visível!</div>}
    </div>
  );
}`;

  return (
    <DemoSection title="useToggle" description="Gerenciamento de estados booleanos">
      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            onClick={toggle}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Toggle Visibilidade
          </button>
          <button
            onClick={setTrue}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Mostrar
          </button>
          <button
            onClick={setFalse}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Ocultar
          </button>
        </div>
        
        {isVisible && (
          <div className="p-4 bg-green-100 border border-green-300 rounded">
            🎉 Conteúdo visível! Estado: {isVisible.toString()}
          </div>
        )}
        
        <div className="flex gap-2 items-center">
          <button
            onClick={toggleActions.toggle}
            className={`px-4 py-2 rounded ${
              isEnabled 
                ? 'bg-green-500 hover:bg-green-600 text-white' 
                : 'bg-gray-500 hover:bg-gray-600 text-white'
            }`}
          >
            {isEnabled ? '✅ Habilitado' : '❌ Desabilitado'}
          </button>
        </div>
        
        <CodeBlock code={codeExample} language="typescript" />
      </div>
    </DemoSection>
  );
}

// Demonstração do useDebounce
function UseDebounceDemo() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [searchResults, setSearchResults] = useState<string[]>([]);

  // Simular busca quando o termo debounced mudar
  useState(() => {
    if (debouncedSearchTerm) {
      // Simular resultados de busca
      const results = [
        `Resultado 1 para &quot;${debouncedSearchTerm}&quot;`,
        `Resultado 2 para &quot;${debouncedSearchTerm}&quot;`,
        `Resultado 3 para &quot;${debouncedSearchTerm}&quot;`,
      ];
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  });

  const codeExample = `import { useDebounce } from '@/hooks';

function Component() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      // Fazer busca apenas quando o usuário parar de digitar
      searchAPI(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <input 
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Digite para buscar..."
    />
  );
}`;

  return (
    <DemoSection title="useDebounce" description="Otimização de performance com debounce">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Busca com debounce (500ms):</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Digite para buscar..."
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Valor atual:</strong> &quot;{searchTerm}&quot;
          </div>
          <div>
            <strong>Valor debounced:</strong> &quot;{debouncedSearchTerm}&quot;
          </div>
        </div>
        
        {searchResults.length > 0 && (
          <div>
            <strong>Resultados da busca:</strong>
            <ul className="list-disc list-inside mt-2">
              {searchResults.map((result, index) => (
                <li key={index} className="text-sm text-gray-600">{result}</li>
              ))}
            </ul>
          </div>
        )}
        
        <CodeBlock code={codeExample} language="typescript" />
      </div>
    </DemoSection>
  );
}

export default function CustomHooksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🎣 Hooks Personalizados
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Demonstrações práticas de hooks personalizados para funcionalidades comuns
          </p>
        </div>

        <div className="grid gap-8 max-w-6xl mx-auto">
          <UseLocalStorageDemo />
          <UseFetchDemo />
          <UseThemeDemo />
          <UseCounterDemo />
          <UseToggleDemo />
          <UseDebounceDemo />
        </div>
      </div>
    </div>
  );
}