'use client';

import { useState, useEffect, useDebugValue, useMemo } from 'react';
import CodeBlock from '@/components/CodeBlock';
import DemoSection from '@/components/DemoSection';

// Hook customizado com useDebugValue básico
function useCounter(initialValue: number = 0) {
  const [count, setCount] = useState(initialValue);
  
  // useDebugValue mostra informações no React DevTools
  useDebugValue(count);
  
  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const reset = () => setCount(initialValue);
  
  return { count, increment, decrement, reset };
}

// Hook com useDebugValue formatado
function useTimer(autoStart: boolean = false) {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(autoStart);
  
  // useDebugValue com função de formatação
  useDebugValue(
    { seconds, isRunning },
    ({ seconds, isRunning }) => {
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      const timeString = `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
      return `${timeString} ${isRunning ? '▶️' : '⏸️'}`;
    }
  );
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);
  
  const start = () => setIsRunning(true);
  const stop = () => setIsRunning(false);
  const reset = () => {
    setSeconds(0);
    setIsRunning(false);
  };
  
  return { seconds, isRunning, start, stop, reset };
}

// Hook com estado complexo
function useUserProfile(userId: string) {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // useDebugValue com informações detalhadas
  useDebugValue(
    { profile, loading, error, userId },
    (state) => {
      if (state.loading) return '🔄 Loading...';
      if (state.error) return `❌ Error: ${state.error}`;
      if (state.profile) return `✅ ${state.profile.name} (${state.userId})`;
      return '⭕ No data';
    }
  );
  
  useEffect(() => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    
    // Simular fetch de dados
    const timer = setTimeout(() => {
      if (userId === 'error') {
        setError('User not found');
        setProfile(null);
      } else {
        setProfile({
          id: userId,
          name: `User ${userId}`,
          email: `user${userId}@example.com`,
          avatar: `https://via.placeholder.com/40?text=${userId}`
        });
        setError(null);
      }
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [userId]);
  
  const refetch = () => {
    if (userId) {
      setLoading(true);
      setError(null);
      // Trigger useEffect
      setProfile(null);
    }
  };
  
  return { profile, loading, error, refetch };
}

// Hook com cache e estatísticas
function useApiCache<T>(key: string, fetcher: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastFetch, setLastFetch] = useState<Date | null>(null);
  const [hitCount, setHitCount] = useState(0);
  
  // Cache simples em memória
  const cache = useMemo(() => new Map<string, { data: T; timestamp: number }>(), []);
  
  // useDebugValue com estatísticas do cache
  useDebugValue(
    { key, data, loading, error, hitCount, cacheSize: cache.size },
    (state) => {
      const status = state.loading ? '🔄' : state.error ? '❌' : state.data ? '✅' : '⭕';
      return `${status} ${state.key} | Hits: ${state.hitCount} | Cache: ${state.cacheSize}`;
    }
  );
  
  const fetchData = async (forceRefresh = false) => {
    const cacheKey = key;
    const cached = cache.get(cacheKey);
    const now = Date.now();
    const cacheExpiry = 30000; // 30 segundos
    
    // Verificar cache
    if (!forceRefresh && cached && (now - cached.timestamp) < cacheExpiry) {
      setData(cached.data);
      setHitCount(prev => prev + 1);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await fetcher();
      cache.set(cacheKey, { data: result, timestamp: now });
      setData(result);
      setLastFetch(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, [key]);
  
  const refresh = () => fetchData(true);
  const clearCache = () => {
    cache.clear();
    setHitCount(0);
  };
  
  return { data, loading, error, lastFetch, hitCount, refresh, clearCache };
}

// Demonstração do useCounter
function CounterDemo() {
  const counter1 = useCounter(0);
  const counter2 = useCounter(10);
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
          <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Counter 1</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">
              {counter1.count}
            </div>
            <div className="flex gap-2 justify-center">
              <button
                onClick={counter1.decrement}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                -1
              </button>
              <button
                onClick={counter1.increment}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
              >
                +1
              </button>
              <button
                onClick={counter1.reset}
                className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
          <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Counter 2</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-4">
              {counter2.count}
            </div>
            <div className="flex gap-2 justify-center">
              <button
                onClick={counter2.decrement}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                -1
              </button>
              <button
                onClick={counter2.increment}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
              >
                +1
              </button>
              <button
                onClick={counter2.reset}
                className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg border border-blue-300 dark:border-blue-700">
        <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">🔍 React DevTools:</h4>
        <p className="text-blue-700 dark:text-blue-300 text-sm">
          Abra o React DevTools e procure pelos hooks "useCounter". Você verá o valor atual de cada contador 
          exibido ao lado do nome do hook.
        </p>
      </div>
    </div>
  );
}

// Demonstração do useTimer
function TimerDemo() {
  const timer1 = useTimer(false);
  const timer2 = useTimer(true);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
          <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Timer Manual</h3>
          <div className="text-center">
            <div className="text-4xl font-mono font-bold text-green-600 dark:text-green-400 mb-4">
              {formatTime(timer1.seconds)}
            </div>
            <div className="flex gap-2 justify-center">
              <button
                onClick={timer1.start}
                disabled={timer1.isRunning}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Start
              </button>
              <button
                onClick={timer1.stop}
                disabled={!timer1.isRunning}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Stop
              </button>
              <button
                onClick={timer1.reset}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
          <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Timer Auto-Start</h3>
          <div className="text-center">
            <div className="text-4xl font-mono font-bold text-blue-600 dark:text-blue-400 mb-4">
              {formatTime(timer2.seconds)}
            </div>
            <div className="flex gap-2 justify-center">
              <button
                onClick={timer2.start}
                disabled={timer2.isRunning}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Start
              </button>
              <button
                onClick={timer2.stop}
                disabled={!timer2.isRunning}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Stop
              </button>
              <button
                onClick={timer2.reset}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-lg border border-green-300 dark:border-green-700">
        <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">⏱️ Debug Info:</h4>
        <p className="text-green-700 dark:text-green-300 text-sm">
          No React DevTools, você verá o tempo formatado e o status (▶️/⏸️) para cada timer, 
          tornando muito mais fácil debuggar o estado dos timers.
        </p>
      </div>
    </div>
  );
}

// Demonstração do useUserProfile
function UserProfileDemo() {
  const [userId, setUserId] = useState('1');
  const { profile, loading, error, refetch } = useUserProfile(userId);
  
  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <select
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option value="1">User 1</option>
          <option value="2">User 2</option>
          <option value="3">User 3</option>
          <option value="error">Error User</option>
        </select>
        <button
          onClick={refetch}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Refetch
        </button>
      </div>
      
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
        {loading && (
          <div className="text-center py-8">
            <div className="text-2xl mb-2">🔄</div>
            <div className="text-gray-600 dark:text-gray-400">Loading user profile...</div>
          </div>
        )}
        
        {error && (
          <div className="text-center py-8">
            <div className="text-2xl mb-2">❌</div>
            <div className="text-red-600 dark:text-red-400">{error}</div>
          </div>
        )}
        
        {profile && !loading && (
          <div className="flex items-center gap-4">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{profile.name}</h3>
              <p className="text-gray-600 dark:text-gray-400">{profile.email}</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">ID: {profile.id}</p>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-lg border border-purple-300 dark:border-purple-700">
        <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">👤 Profile Debug:</h4>
        <p className="text-purple-700 dark:text-purple-300 text-sm">
          O hook useUserProfile mostra o status atual (loading, error, success) e informações do usuário 
          no React DevTools, facilitando o debug de estados de carregamento.
        </p>
      </div>
    </div>
  );
}

// Demonstração do useApiCache
function ApiCacheDemo() {
  const [endpoint, setEndpoint] = useState('users');
  
  const mockFetcher = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const data = {
      users: [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }],
      posts: [{ id: 1, title: 'Post 1' }, { id: 2, title: 'Post 2' }],
      comments: [{ id: 1, text: 'Comment 1' }, { id: 2, text: 'Comment 2' }]
    };
    
    return data[endpoint as keyof typeof data];
  };
  
  const { data, loading, error, lastFetch, hitCount, refresh, clearCache } = useApiCache(endpoint, mockFetcher);
  
  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <select
          value={endpoint}
          onChange={(e) => setEndpoint(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option value="users">Users</option>
          <option value="posts">Posts</option>
          <option value="comments">Comments</option>
        </select>
        <button
          onClick={refresh}
          disabled={loading}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Refresh
        </button>
        <button
          onClick={clearCache}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Clear Cache
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{hitCount}</div>
          <div className="text-sm text-blue-700 dark:text-blue-300">Cache Hits</div>
        </div>
        <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {loading ? '🔄' : data ? '✅' : '⭕'}
          </div>
          <div className="text-sm text-green-700 dark:text-green-300">Status</div>
        </div>
        <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-center">
          <div className="text-sm font-bold text-purple-600 dark:text-purple-400">
            {lastFetch ? lastFetch.toLocaleTimeString() : 'Never'}
          </div>
          <div className="text-sm text-purple-700 dark:text-purple-300">Last Fetch</div>
        </div>
      </div>
      
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
        {loading && (
          <div className="text-center py-4">
            <div className="text-xl mb-2">🔄</div>
            <div className="text-gray-600 dark:text-gray-400">Loading {endpoint}...</div>
          </div>
        )}
        
        {error && (
          <div className="text-center py-4">
            <div className="text-xl mb-2">❌</div>
            <div className="text-red-600 dark:text-red-400">{error}</div>
          </div>
        )}
        
        {data && !loading && (
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Data ({endpoint}):</h3>
            <pre className="text-sm bg-gray-100 dark:bg-gray-700 p-3 rounded overflow-x-auto">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}
      </div>
      
      <div className="p-4 bg-orange-100 dark:bg-orange-900/30 rounded-lg border border-orange-300 dark:border-orange-700">
        <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">📊 Cache Debug:</h4>
        <p className="text-orange-700 dark:text-orange-300 text-sm">
          O hook useApiCache mostra estatísticas detalhadas no React DevTools: endpoint, status, 
          número de cache hits e tamanho do cache, facilitando o debug de performance.
        </p>
      </div>
    </div>
  );
}

export default function UseDebugValuePage() {
  const basicCode = `// useDebugValue básico
import { useState, useDebugValue } from 'react';

function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  // Mostra o valor no React DevTools
  useDebugValue(count);
  
  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  
  return { count, increment, decrement };
}

// Uso
function Component() {
  const counter = useCounter(0);
  
  return (
    <div>
      <p>Count: {counter.count}</p>
      <button onClick={counter.increment}>+</button>
      <button onClick={counter.decrement}>-</button>
    </div>
  );
}`;

  const formattedCode = `// useDebugValue com formatação
import { useState, useEffect, useDebugValue } from 'react';

function useTimer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  
  // useDebugValue com função de formatação
  useDebugValue(
    { seconds, isRunning },
    ({ seconds, isRunning }) => {
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      const timeString = \`\${minutes}:\${secs.toString().padStart(2, '0')}\`;
      return \`\${timeString} \${isRunning ? '▶️' : '⏸️'}\`;
    }
  );
  
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => setSeconds(s => s + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);
  
  return {
    seconds,
    isRunning,
    start: () => setIsRunning(true),
    stop: () => setIsRunning(false),
    reset: () => { setSeconds(0); setIsRunning(false); }
  };
}`;

  const complexCode = `// useDebugValue com estado complexo
import { useState, useEffect, useDebugValue } from 'react';

function useApiData(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Debug info detalhado
  useDebugValue(
    { data, loading, error, url },
    (state) => {
      if (state.loading) return '🔄 Loading...';
      if (state.error) return \`❌ Error: \${state.error}\`;
      if (state.data) return \`✅ Data loaded (\${state.url})\`;
      return '⭕ No data';
    }
  );
  
  useEffect(() => {
    if (!url) return;
    
    setLoading(true);
    setError(null);
    
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [url]);
  
  return { data, loading, error };
}`;

  const cacheCode = `// useDebugValue com cache e estatísticas
import { useState, useMemo, useDebugValue } from 'react';

function useCache(key, fetcher) {
  const [data, setData] = useState(null);
  const [hitCount, setHitCount] = useState(0);
  const cache = useMemo(() => new Map(), []);
  
  // Debug com estatísticas do cache
  useDebugValue(
    { key, data, hitCount, cacheSize: cache.size },
    (state) => {
      const status = state.data ? '✅' : '⭕';
      return \`\${status} \${state.key} | Hits: \${state.hitCount} | Size: \${state.cacheSize}\`;
    }
  );
  
  const fetchData = async () => {
    if (cache.has(key)) {
      setData(cache.get(key));
      setHitCount(prev => prev + 1);
      return;
    }
    
    const result = await fetcher();
    cache.set(key, result);
    setData(result);
  };
  
  return { data, fetchData, clearCache: () => cache.clear() };
}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 dark:from-gray-900 dark:to-gray-800 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-6">
            useDebugValue
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Demonstração do useDebugValue Hook - exibe labels customizados para hooks no React DevTools.
          </p>
        </div>

        <div className="space-y-12">
          <DemoSection title="Counter com Debug Value">
            <CounterDemo />
          </DemoSection>

          <DemoSection title="Timer com Formatação">
            <TimerDemo />
          </DemoSection>

          <DemoSection title="User Profile com Status">
            <UserProfileDemo />
          </DemoSection>

          <DemoSection title="API Cache com Estatísticas">
            <ApiCacheDemo />
          </DemoSection>
        </div>

        <div className="mt-16 space-y-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Debug Value Básico</h2>
            <CodeBlock code={basicCode} language="tsx" />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Debug Value Formatado</h2>
            <CodeBlock code={formattedCode} language="tsx" />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Estado Complexo</h2>
            <CodeBlock code={complexCode} language="tsx" />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Cache com Estatísticas</h2>
            <CodeBlock code={cacheCode} language="tsx" />
          </div>
        </div>

        <div className="mt-16 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">🔍 Como Usar useDebugValue</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Melhores Práticas</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Use apenas em hooks customizados</li>
                <li>• Formate valores complexos</li>
                <li>• Inclua informações úteis para debug</li>
                <li>• Evite computações custosas</li>
                <li>• Use função de formatação quando necessário</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Quando Usar</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Hooks com estado complexo</li>
                <li>• Debugging de performance</li>
                <li>• Monitoramento de cache</li>
                <li>• Estados de loading/error</li>
                <li>• Bibliotecas e hooks reutilizáveis</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg border border-yellow-300 dark:border-yellow-700">
            <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">⚠️ Importante:</h4>
            <p className="text-yellow-700 dark:text-yellow-300 text-sm">
              useDebugValue só funciona no React DevTools. Para ver os valores de debug, instale a extensão 
              React Developer Tools no seu browser e abra a aba "Components".
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}