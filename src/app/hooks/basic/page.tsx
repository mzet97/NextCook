'use client';

import { useState, useEffect, useContext, createContext } from 'react';
import CodeBlock from '@/components/CodeBlock';

// Context para demonstração do useContext
const ThemeContext = createContext<{
  theme: string;
  toggleTheme: () => void;
}>({ theme: 'light', toggleTheme: () => {} });

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Componente para demonstrar useContext
function ThemedComponent() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  return (
    <div className={`p-4 rounded-lg transition-colors duration-200 ${
      theme === 'light' 
        ? 'bg-yellow-100 text-yellow-800 border border-yellow-300' 
        : 'bg-gray-800 text-gray-100 border border-gray-600'
    }`}>
      <p className="mb-3">Tema atual: <strong>{theme}</strong></p>
      <button
        onClick={toggleTheme}
        className={`px-4 py-2 rounded font-medium transition-colors duration-200 ${
          theme === 'light'
            ? 'bg-yellow-600 text-white hover:bg-yellow-700'
            : 'bg-gray-600 text-white hover:bg-gray-500'
        }`}
      >
        Alternar Tema
      </button>
    </div>
  );
}

export default function BasicHooksPage() {
  // useState examples
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [todos, setTodos] = useState<string[]>([]);
  const [newTodo, setNewTodo] = useState('');
  
  // useEffect examples
  const [seconds, setSeconds] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  
  // useEffect para timer
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  // useEffect para window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    // Set initial width
    setWindowWidth(window.innerWidth);
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // useEffect que depende de count
  useEffect(() => {
    document.title = `Contador: ${count}`;
  }, [count]);
  
  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos(prev => [...prev, newTodo.trim()]);
      setNewTodo('');
    }
  };
  
  const removeTodo = (index: number) => {
    setTodos(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Basic React Hooks
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Explore os hooks fundamentais do React: useState, useEffect e useContext
          </p>
        </div>

        <div className="space-y-16">
          {/* useState Section */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 flex items-center">
              <span className="text-blue-500 mr-3">🔧</span>
              useState Hook
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-1.5">
              {/* useState Examples */}
              <div className="space-y-6">
                {/* Counter Example */}
                <div className="card">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Contador Simples
                  </h3>
                  <div className="flex items-center space-x-4 mb-4">
                    <button
                      onClick={() => setCount(count - 1)}
                      className="btn-secondary"
                    >
                      -
                    </button>
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {count}
                    </span>
                    <button
                      onClick={() => setCount(count + 1)}
                      className="btn-secondary"
                    >
                      +
                    </button>
                    <button
                      onClick={() => setCount(0)}
                      className="btn-primary"
                    >
                      Reset
                    </button>
                  </div>
                </div>
                
                {/* Input Example */}
                <div className="card">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Input Controlado
                  </h3>
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Digite seu nome"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-gray-600 dark:text-gray-400">
                      Olá, <strong>{name || 'visitante'}</strong>!
                    </p>
                  </div>
                </div>
                
                {/* Todo List Example */}
                <div className="card">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Lista de Tarefas
                  </h3>
                  <div className="space-y-3">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                        placeholder="Nova tarefa"
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button onClick={addTodo} className="btn-primary">
                        Adicionar
                      </button>
                    </div>
                    <ul className="space-y-2">
                      {todos.map((todo, index) => (
                        <li key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                          <span className="text-gray-900 dark:text-gray-100">{todo}</span>
                          <button
                            onClick={() => removeTodo(index)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Remover
                          </button>
                        </li>
                      ))}
                    </ul>
                    {todos.length === 0 && (
                      <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                        Nenhuma tarefa adicionada
                      </p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* useState Code */}
              <div className="space-y-6">
                <CodeBlock
                  title="useState - Contador"
                  language="tsx"
                  code={`const [count, setCount] = useState(0);

return (
  <div>
    <button onClick={() => setCount(count - 1)}>-</button>
    <span>{count}</span>
    <button onClick={() => setCount(count + 1)}>+</button>
    <button onClick={() => setCount(0)}>Reset</button>
  </div>
);`}
                />
                
                <CodeBlock
                  title="useState - Input Controlado"
                  language="tsx"
                  code={`const [name, setName] = useState('');

return (
  <div>
    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Digite seu nome"
    />
    <p>Olá, {name || 'visitante'}!</p>
  </div>
);`}
                />
                
                <CodeBlock
                  title="useState - Array de Tarefas"
                  language="tsx"
                  code={`const [todos, setTodos] = useState<string[]>([]);
const [newTodo, setNewTodo] = useState('');

const addTodo = () => {
  if (newTodo.trim()) {
    setTodos(prev => [...prev, newTodo.trim()]);
    setNewTodo('');
  }
};

const removeTodo = (index: number) => {
  setTodos(prev => prev.filter((_, i) => i !== index));
};`}
                />
              </div>
            </div>
          </section>

          {/* useEffect Section */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 flex items-center">
              <span className="text-green-500 mr-3">⚡</span>
              useEffect Hook
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-1.5">
              {/* useEffect Examples */}
              <div className="space-y-6">
                <div className="card">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Timer (useEffect sem dependências)
                  </h3>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {seconds} segundos
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Este timer roda continuamente desde que o componente foi montado.
                  </p>
                </div>
                
                <div className="card">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Window Width (Event Listener)
                  </h3>
                  <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                    {windowWidth}px
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Redimensione a janela para ver o valor mudar.
                  </p>
                </div>
                
                <div className="card">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Document Title (useEffect com dependência)
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    O título da página muda conforme o contador: <strong>Contador: {count}</strong>
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Verifique o título da aba do navegador!
                  </p>
                </div>
              </div>
              
              {/* useEffect Code */}
              <div className="space-y-6">
                <CodeBlock
                  title="useEffect - Timer"
                  language="tsx"
                  code={`const [seconds, setSeconds] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setSeconds(prev => prev + 1);
  }, 1000);
  
  // Cleanup function
  return () => clearInterval(interval);
}, []); // Array vazio = executa apenas na montagem`}
                />
                
                <CodeBlock
                  title="useEffect - Event Listener"
                  language="tsx"
                  code={`const [windowWidth, setWindowWidth] = useState(0);

useEffect(() => {
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  
  // Set initial width
  setWindowWidth(window.innerWidth);
  
  window.addEventListener('resize', handleResize);
  
  // Cleanup
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);`}
                />
                
                <CodeBlock
                  title="useEffect - Com Dependência"
                  language="tsx"
                  code={`useEffect(() => {
  document.title = \`Contador: \${count}\`;
}, [count]); // Executa sempre que count mudar`}
                />
              </div>
            </div>
          </section>

          {/* useContext Section */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 flex items-center">
              <span className="text-purple-500 mr-3">🔗</span>
              useContext Hook
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-1.5">
              {/* useContext Example */}
              <div className="space-y-6">
                <div className="card">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Tema Compartilhado
                  </h3>
                  <ThemeProvider>
                    <ThemedComponent />
                  </ThemeProvider>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                    Este componente usa useContext para acessar o tema compartilhado.
                  </p>
                </div>
              </div>
              
              {/* useContext Code */}
              <div className="space-y-6">
                <CodeBlock
                  title="useContext - Criando o Context"
                  language="tsx"
                  code={`const ThemeContext = createContext<{
  theme: string;
  toggleTheme: () => void;
}>({ theme: 'light', toggleTheme: () => {} });

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}`}
                />
                
                <CodeBlock
                  title="useContext - Consumindo o Context"
                  language="tsx"
                  code={`function ThemedComponent() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  return (
    <div className={theme === 'light' ? 'light-theme' : 'dark-theme'}>
      <p>Tema atual: {theme}</p>
      <button onClick={toggleTheme}>
        Alternar Tema
      </button>
    </div>
  );
}`}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}