'use client';

import { useState, useEffect } from 'react';
import CodeBlock from '@/components/CodeBlock';
import DemoSection from '@/components/DemoSection';

export default function UseEffectPage() {
  const [count, setCount] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Effect sem dependências - executa após cada render
  useEffect(() => {
    document.title = `Contador: ${count}`;
  });

  // Effect com array de dependências vazio - executa apenas uma vez
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Effect com dependências específicas
  useEffect(() => {
    if (count > 0 && count % 5 === 0) {
      alert(`Contador atingiu múltiplo de 5: ${count}`);
    }
  }, [count]);

  // Effect para timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning]);

  // Effect para fetch de dados
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/demo-data');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const codeExample = `import { useState, useEffect } from 'react';

function Component() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);

  // Executa após cada render
  useEffect(() => {
    document.title = \`Count: \${count}\`;
  });

  // Executa apenas uma vez (componentDidMount)
  useEffect(() => {
    fetchData();
  }, []);

  // Executa quando count muda
  useEffect(() => {
    if (count > 10) {
      console.log('Count is high!');
    }
  }, [count]);

  // Cleanup function
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('Timer tick');
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return <div>Count: {count}</div>;
}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6">
            useEffect Hook
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Hook para executar efeitos colaterais em componentes funcionais, substituindo componentDidMount, componentDidUpdate e componentWillUnmount.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <DemoSection title="Effect sem Dependências">
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                O título da página muda a cada render:
              </p>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-4">
                  {count}
                </div>
                <button
                  onClick={() => setCount(count + 1)}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Incrementar
                </button>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Verifique o título da aba do navegador!
              </p>
            </div>
          </DemoSection>

          <DemoSection title="Effect com Cleanup">
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                Largura da janela (com event listener):
              </p>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {windowWidth}px
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Redimensione a janela para ver a mudança
                </p>
              </div>
            </div>
          </DemoSection>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <DemoSection title="Timer com useEffect">
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-4">
                  {timer}s
                </div>
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={() => setIsRunning(!isRunning)}
                    className={`px-4 py-2 text-white rounded-lg transition-colors ${
                      isRunning 
                        ? 'bg-red-500 hover:bg-red-600' 
                        : 'bg-green-500 hover:bg-green-600'
                    }`}
                  >
                    {isRunning ? 'Pausar' : 'Iniciar'}
                  </button>
                  <button
                    onClick={() => {
                      setTimer(0);
                      setIsRunning(false);
                    }}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </DemoSection>

          <DemoSection title="Fetch de Dados">
            <div className="space-y-4">
              <button
                onClick={fetchData}
                disabled={loading}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
              >
                {loading ? 'Carregando...' : 'Buscar Dados'}
              </button>
              {data && (
                <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    Dados recebidos:
                  </h4>
                  <pre className="text-sm text-gray-600 dark:text-gray-300 overflow-x-auto">
                    {JSON.stringify(data, null, 2)}
                  </pre>
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
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Tipos de useEffect</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Sem Dependências</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                <code>useEffect(() =&gt; {})</code>
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Executa após cada render
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Array Vazio</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                <code>useEffect(() =&gt; {}, [])</code>
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Executa apenas uma vez (mount)
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Com Dependências</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                <code>useEffect(() =&gt; {}, [dep])</code>
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Executa quando dependências mudam
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}