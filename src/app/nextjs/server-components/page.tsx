import { Suspense } from 'react';
import CodeBlock from '@/components/CodeBlock';
import DemoSection from '@/components/DemoSection';

// Server Component - executa no servidor
async function ServerDataComponent() {
  // Simular fetch de dados no servidor
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const serverData = {
    timestamp: new Date().toISOString(),
    serverInfo: 'Dados carregados no servidor',
    randomNumber: Math.floor(Math.random() * 1000)
  };

  return (
    <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-lg border border-green-300 dark:border-green-700">
      <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
        🖥️ Server Component
      </h3>
      <div className="space-y-2 text-green-700 dark:text-green-300">
        <p><strong>Timestamp:</strong> {serverData.timestamp}</p>
        <p><strong>Info:</strong> {serverData.serverInfo}</p>
        <p><strong>Random:</strong> {serverData.randomNumber}</p>
      </div>
      <p className="text-xs text-green-600 dark:text-green-400 mt-2">
        Este componente é renderizado no servidor e não pode usar hooks ou eventos
      </p>
    </div>
  );
}

// Outro Server Component com dados diferentes
async function DatabaseSimulation() {
  // Simular consulta ao banco de dados
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const users = [
    { id: 1, name: 'João Silva', role: 'Admin' },
    { id: 2, name: 'Maria Santos', role: 'User' },
    { id: 3, name: 'Pedro Costa', role: 'Moderator' }
  ];

  return (
    <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg border border-blue-300 dark:border-blue-700">
      <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
        🗄️ Database Simulation
      </h3>
      <div className="space-y-2">
        {users.map(user => (
          <div key={user.id} className="flex justify-between items-center p-2 bg-blue-50 dark:bg-blue-800/50 rounded">
            <span className="text-blue-800 dark:text-blue-200">{user.name}</span>
            <span className="text-xs px-2 py-1 bg-blue-200 dark:bg-blue-700 text-blue-800 dark:text-blue-200 rounded">
              {user.role}
            </span>
          </div>
        ))}
      </div>
      <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
        Dados carregados diretamente no servidor (sem JavaScript no cliente)
      </p>
    </div>
  );
}

// Loading component
function LoadingSpinner() {
  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600">
      <div className="flex items-center gap-3">
        <div className="animate-spin h-5 w-5 border-2 border-gray-400 border-t-transparent rounded-full"></div>
        <span className="text-gray-600 dark:text-gray-300">Carregando dados do servidor...</span>
      </div>
    </div>
  );
}

// Error Boundary para demonstração
function ErrorBoundaryDemo() {
  return (
    <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-lg border border-red-300 dark:border-red-700">
      <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
        ⚠️ Error Boundary
      </h3>
      <p className="text-red-700 dark:text-red-300">
        Este componente demonstra como lidar com erros em Server Components.
        Em caso de erro, uma página de erro personalizada seria exibida.
      </p>
    </div>
  );
}

export default function ServerComponentsPage() {
  const serverComponentCode = `// Server Component (padrão no App Router)
export default async function ServerComponent() {
  // Pode fazer fetch de dados diretamente
  const data = await fetch('https://api.example.com/data');
  const result = await data.json();
  
  // Pode acessar variáveis de ambiente do servidor
  const serverSecret = process.env.SERVER_SECRET;
  
  return (
    <div>
      <h1>Server Component</h1>
      <p>Dados: {result.message}</p>
      {/* Não pode usar useState, useEffect, onClick, etc. */}
    </div>
  );
}

// Client Component (quando necessário)
'use client';

import { useState } from 'react';

export function ClientComponent() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`;

  const suspenseCode = `import { Suspense } from 'react';

// Componente que carrega dados
async function DataComponent() {
  const data = await fetchData();
  return <div>{data.message}</div>;
}

// Loading component
function Loading() {
  return <div>Carregando...</div>;
}

// Página com Suspense
export default function Page() {
  return (
    <div>
      <h1>Minha Página</h1>
      
      {/* Suspense para componentes assíncronos */}
      <Suspense fallback={<Loading />}>
        <DataComponent />
      </Suspense>
      
      {/* Múltiplos Suspense boundaries */}
      <Suspense fallback={<div>Carregando seção 2...</div>}>
        <AnotherDataComponent />
      </Suspense>
    </div>
  );
}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-600 to-gray-600 bg-clip-text text-transparent mb-6">
            Server Components
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Demonstração dos Server Components do Next.js 15.5.2 - componentes que executam no servidor e enviam HTML renderizado para o cliente.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-1.5 mb-12">
          <DemoSection title="Server Component com Suspense">
            <Suspense fallback={<LoadingSpinner />}>
              <ServerDataComponent />
            </Suspense>
          </DemoSection>

          <DemoSection title="Simulação de Database">
            <Suspense fallback={<LoadingSpinner />}>
              <DatabaseSimulation />
            </Suspense>
          </DemoSection>
        </div>

        <div className="mb-12">
          <DemoSection title="Error Handling">
            <ErrorBoundaryDemo />
          </DemoSection>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">🖥️ Server Components</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Características:</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Executam no servidor</li>
                  <li>• Acesso direto ao banco de dados</li>
                  <li>• Não enviam JavaScript para o cliente</li>
                  <li>• Melhor performance e SEO</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Limitações:</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Não podem usar hooks (useState, useEffect)</li>
                  <li>• Não podem usar event handlers</li>
                  <li>• Não podem usar APIs do browser</li>
                  <li>• Não podem usar Context</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">💻 Client Components</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Quando usar:</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Interatividade (onClick, onChange)</li>
                  <li>• Hooks do React</li>
                  <li>• APIs do browser</li>
                  <li>• Context e estado local</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Como usar:</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Adicione 'use client' no topo</li>
                  <li>• Use com moderação</li>
                  <li>• Prefira Server Components quando possível</li>
                  <li>• Combine ambos estrategicamente</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Exemplo: Server Component</h2>
          <CodeBlock code={serverComponentCode} language="tsx" />
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Exemplo: Suspense</h2>
          <CodeBlock code={suspenseCode} language="tsx" />
        </div>

        <div className="bg-gradient-to-r from-slate-100 to-gray-100 dark:from-slate-900/30 dark:to-gray-900/30 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">🚀 Benefícios dos Server Components</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1.5">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Performance</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Menos JavaScript no cliente</li>
                <li>• Renderização mais rápida</li>
                <li>• Melhor Core Web Vitals</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Segurança</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Código sensível no servidor</li>
                <li>• API keys protegidas</li>
                <li>• Acesso direto ao banco</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">SEO</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• HTML renderizado no servidor</li>
                <li>• Melhor indexação</li>
                <li>• Meta tags dinâmicas</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}