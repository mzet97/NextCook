'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import CodeBlock from '@/components/CodeBlock';
import DemoSection from '@/components/DemoSection';
import { ArrowPathIcon, ExclamationTriangleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const codeExamples = {
  basicLoading: `// app/dashboard/loading.tsx
export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
    </div>
  );
}`,

  skeletonLoading: `// app/posts/loading.tsx
export default function PostsLoading() {
  return (
    <div className="space-y-4">
      <div className="animate-pulse">
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
        
        {[...Array(5)].map((_, i) => (
          <div key={i} className="border rounded-lg p-4 mb-4">
            <div className="h-6 bg-gray-300 rounded w-2/3 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-4/5"></div>
          </div>
        ))}
      </div>
    </div>
  );
}`,

  nestedLoading: `// Estrutura com Loading UI aninhado:
// app/
//   dashboard/
//     loading.tsx          // Loading para toda seção dashboard
//     page.tsx
//     analytics/
//       loading.tsx        // Loading específico para analytics
//       page.tsx
//     users/
//       loading.tsx        // Loading específico para users
//       page.tsx
//       [id]/
//         loading.tsx      // Loading para usuário específico
//         page.tsx`,

  basicError: `// app/dashboard/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Algo deu errado!</h2>
      <p className="text-gray-600 mb-4">{error.message}</p>
      <button
        onClick={reset}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Tentar novamente
      </button>
    </div>
  );
}`,

  customError: `// app/api/error.tsx
'use client';

import { useEffect } from 'react';

export default function ApiError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log do erro para serviços de monitoramento
    console.error('API Error:', error);
  }, [error]);

  return (
    <div className="error-container">
      <div className="error-icon">
        <ExclamationTriangleIcon className="h-16 w-16 text-red-500" />
      </div>
      
      <h2>Erro na API</h2>
      
      <div className="error-details">
        <p><strong>Mensagem:</strong> {error.message}</p>
        {error.digest && (
          <p><strong>ID do Erro:</strong> {error.digest}</p>
        )}
      </div>
      
      <div className="error-actions">
        <button onClick={reset} className="retry-button">
          Tentar Novamente
        </button>
        
        <button 
          onClick={() => window.location.href = '/'}
          className="home-button"
        >
          Ir para Home
        </button>
      </div>
    </div>
  );
}`,

  globalError: `// app/global-error.tsx
'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="global-error">
          <h1>Erro Crítico da Aplicação</h1>
          <p>Ocorreu um erro inesperado que afetou toda a aplicação.</p>
          
          <details className="error-details">
            <summary>Detalhes técnicos</summary>
            <pre>{error.message}</pre>
            {error.stack && (
              <pre className="stack-trace">{error.stack}</pre>
            )}
          </details>
          
          <div className="actions">
            <button onClick={reset}>Recarregar Aplicação</button>
            <a href="/">Ir para Home</a>
          </div>
        </div>
      </body>
    </html>
  );
}`,

  loadingWithSuspense: `// app/dashboard/page.tsx
import { Suspense } from 'react';
import Analytics from './Analytics';
import UserList from './UserList';
import RecentActivity from './RecentActivity';

// Loading components
function AnalyticsLoading() {
  return (
    <div className="analytics-skeleton">
      <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
      <div className="grid grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-24 bg-gray-300 rounded"></div>
        ))}
      </div>
    </div>
  );
}

function UserListLoading() {
  return (
    <div className="space-y-2">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center space-x-3">
          <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-300 rounded w-2/3 mb-1"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Suspense fallback={<AnalyticsLoading />}>
          <Analytics />
        </Suspense>
        
        <Suspense fallback={<UserListLoading />}>
          <UserList />
        </Suspense>
      </div>
      
      <Suspense fallback={<div>Carregando atividades...</div>}>
        <RecentActivity />
      </Suspense>
    </div>
  );
}`,

  errorBoundaryClass: `// components/ErrorBoundary.tsx
'use client';

import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Algo deu errado neste componente</h2>
          <details>
            <summary>Detalhes do erro</summary>
            <pre>{this.state.error?.message}</pre>
          </details>
          <button
            onClick={() => this.setState({ hasError: false })}
          >
            Tentar novamente
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}`,

  streamingWithSuspense: `// app/posts/page.tsx
import { Suspense } from 'react';

// Componente que faz fetch de dados
async function PostList() {
  // Simula delay de API
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const posts = await fetch('https://api.example.com/posts')
    .then(res => res.json());
  
  return (
    <div className="posts">
      {posts.map(post => (
        <article key={post.id} className="post">
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
}

// Loading component específico
function PostListSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-full mb-1"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
        </div>
      ))}
    </div>
  );
}

export default function PostsPage() {
  return (
    <div>
      <h1>Posts</h1>
      
      <Suspense fallback={<PostListSkeleton />}>
        <PostList />
      </Suspense>
    </div>
  );
}`,

  loadingStates: `// hooks/useLoadingStates.ts
import { useState } from 'react';

type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export function useLoadingStates() {
  const [state, setState] = useState<LoadingState>('idle');
  const [error, setError] = useState<string | null>(null);
  
  const setLoading = () => {
    setState('loading');
    setError(null);
  };
  
  const setSuccess = () => {
    setState('success');
    setError(null);
  };
  
  const setError = (errorMessage: string) => {
    setState('error');
    setError(errorMessage);
  };
  
  const reset = () => {
    setState('idle');
    setError(null);
  };
  
  return {
    state,
    error,
    isLoading: state === 'loading',
    isSuccess: state === 'success',
    isError: state === 'error',
    setLoading,
    setSuccess,
    setError,
    reset
  };
}`
};

const loadingTypes = [
  {
    type: 'Spinner',
    description: 'Indicador circular rotativo',
    useCase: 'Carregamentos rápidos e gerais',
    component: 'SpinnerDemo',
    color: 'blue'
  },
  {
    type: 'Skeleton',
    description: 'Placeholder que imita o layout final',
    useCase: 'Listas e cards com estrutura conhecida',
    component: 'SkeletonDemo',
    color: 'gray'
  },
  {
    type: 'Progress Bar',
    description: 'Barra de progresso com porcentagem',
    useCase: 'Uploads e downloads com progresso',
    component: 'ProgressDemo',
    color: 'green'
  },
  {
    type: 'Pulse',
    description: 'Animação de pulsação suave',
    useCase: 'Elementos que aguardam interação',
    component: 'PulseDemo',
    color: 'purple'
  }
];

const errorTypes = [
  {
    type: 'Network Error',
    description: 'Falha de conexão ou timeout',
    action: 'Tentar novamente',
    color: 'red',
    icon: '🌐'
  },
  {
    type: 'Validation Error',
    description: 'Dados inválidos ou incompletos',
    action: 'Corrigir dados',
    color: 'yellow',
    icon: '⚠️'
  },
  {
    type: 'Permission Error',
    description: 'Acesso negado ou não autorizado',
    action: 'Fazer login',
    color: 'orange',
    icon: '🔒'
  },
  {
    type: 'Server Error',
    description: 'Erro interno do servidor',
    action: 'Reportar problema',
    color: 'red',
    icon: '🔥'
  }
];

function LoadingDemo() {
  const [activeDemo, setActiveDemo] = useState('Spinner');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const startLoading = () => {
    setIsLoading(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLoading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const renderLoadingComponent = () => {
    switch (activeDemo) {
      case 'Spinner':
        return (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
          </div>
        );
        
      case 'Skeleton':
        return (
          <div className="space-y-4 animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex space-x-3">
                  <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
                  <div className="flex-1 space-y-1">
                    <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'Progress Bar':
        return (
          <div className="space-y-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-green-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="text-center text-sm text-gray-600">
              {progress}% completo
            </div>
          </div>
        );
        
      case 'Pulse':
        return (
          <div className="flex items-center justify-center h-32">
            <div className="animate-pulse">
              <div className="h-16 w-16 bg-purple-500 rounded-full"></div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {loadingTypes.map((type) => (
          <button
            key={type.type}
            onClick={() => setActiveDemo(type.type)}
            className={`p-4 rounded-lg border-2 text-left transition-all ${
              activeDemo === type.type
                ? `border-${type.color}-500 bg-${type.color}-50 dark:bg-${type.color}-900/20`
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
              {type.type}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {type.description}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              {type.useCase}
            </p>
          </button>
        ))}
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            {activeDemo} Demo
          </h3>
          <button
            onClick={startLoading}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Carregando...' : 'Iniciar'}
          </button>
        </div>
        
        <div className="min-h-[150px]">
          {isLoading || activeDemo === 'Skeleton' ? renderLoadingComponent() : (
            <div className="flex items-center justify-center h-32 text-gray-500 dark:text-gray-400">
              Clique em "Iniciar" para ver a demonstração
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ErrorDemo() {
  const [activeError, setActiveError] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const simulateError = (type: string) => {
    setActiveError(type);
    
    switch (type) {
      case 'Network Error':
        setErrorMessage('Falha ao conectar com o servidor. Verifique sua conexão.');
        break;
      case 'Validation Error':
        setErrorMessage('Os dados fornecidos são inválidos. Verifique os campos obrigatórios.');
        break;
      case 'Permission Error':
        setErrorMessage('Você não tem permissão para acessar este recurso.');
        break;
      case 'Server Error':
        setErrorMessage('Erro interno do servidor. Tente novamente mais tarde.');
        break;
    }
  };

  const clearError = () => {
    setActiveError(null);
    setErrorMessage('');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {errorTypes.map((error) => (
          <button
            key={error.type}
            onClick={() => simulateError(error.type)}
            className={`p-4 rounded-lg border-2 text-left transition-all ${
              activeError === error.type
                ? `border-${error.color}-500 bg-${error.color}-50 dark:bg-${error.color}-900/20`
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-xl">{error.icon}</span>
              <h3 className="font-semibold text-gray-800 dark:text-white">
                {error.type}
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {error.description}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              Ação: {error.action}
            </p>
          </button>
        ))}
      </div>
      
      {activeError && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-6 rounded-lg">
          <div className="flex items-start space-x-3">
            <ExclamationTriangleIcon className="h-6 w-6 text-red-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
                {activeError}
              </h3>
              <p className="text-red-700 dark:text-red-300 mb-4">
                {errorMessage}
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={clearError}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  {errorTypes.find(e => e.type === activeError)?.action}
                </button>
                <button
                  onClick={clearError}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StateDemo() {
  const [currentState, setCurrentState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [progress, setProgress] = useState(0);

  const simulateAsyncOperation = async () => {
    setCurrentState('loading');
    setProgress(0);
    
    try {
      // Simula progresso
      for (let i = 0; i <= 100; i += 20) {
        setProgress(i);
        await new Promise(resolve => setTimeout(resolve, 300));
      }
      
      // Simula sucesso ou erro aleatório
      if (Math.random() > 0.3) {
        setCurrentState('success');
      } else {
        throw new Error('Operação falhou');
      }
    } catch (error) {
      setCurrentState('error');
    }
  };

  const reset = () => {
    setCurrentState('idle');
    setProgress(0);
  };

  const getStateColor = () => {
    switch (currentState) {
      case 'loading': return 'blue';
      case 'success': return 'green';
      case 'error': return 'red';
      default: return 'gray';
    }
  };

  const getStateIcon = () => {
    switch (currentState) {
      case 'loading': return <ArrowPathIcon className="h-6 w-6 animate-spin" />;
      case 'success': return <CheckCircleIcon className="h-6 w-6" />;
      case 'error': return <ExclamationTriangleIcon className="h-6 w-6" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <button
          onClick={simulateAsyncOperation}
          disabled={currentState === 'loading'}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {currentState === 'loading' ? 'Processando...' : 'Iniciar Operação'}
        </button>
        
        {currentState !== 'idle' && (
          <button
            onClick={reset}
            className="ml-3 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Reset
          </button>
        )}
      </div>
      
      <div className={`bg-${getStateColor()}-50 dark:bg-${getStateColor()}-900/20 border border-${getStateColor()}-200 dark:border-${getStateColor()}-800 p-6 rounded-lg`}>
        <div className="flex items-center space-x-3 mb-4">
          <div className={`text-${getStateColor()}-500`}>
            {getStateIcon()}
          </div>
          <h3 className={`text-lg font-semibold text-${getStateColor()}-800 dark:text-${getStateColor()}-200 capitalize`}>
            Estado: {currentState}
          </h3>
        </div>
        
        {currentState === 'loading' && (
          <div className="space-y-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Progresso: {progress}%
            </p>
          </div>
        )}
        
        {currentState === 'success' && (
          <p className="text-green-700 dark:text-green-300">
            Operação concluída com sucesso!
          </p>
        )}
        
        {currentState === 'error' && (
          <p className="text-red-700 dark:text-red-300">
            Erro durante a operação. Tente novamente.
          </p>
        )}
        
        {currentState === 'idle' && (
          <p className="text-gray-600 dark:text-gray-400">
            Clique no botão para iniciar uma operação assíncrona.
          </p>
        )}
      </div>
    </div>
  );
}

export default function LoadingUIPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Loading UI & Error Boundaries
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Aprenda a implementar estados de carregamento e tratamento de erros no Next.js
          </p>
        </div>

        <div className="space-y-12">
          {/* Demo de Loading */}
          <DemoSection
            title="Tipos de Loading UI"
            description="Diferentes formas de mostrar estados de carregamento"
          >
            <LoadingDemo />
          </DemoSection>

          {/* Demo de Errors */}
          <DemoSection
            title="Tipos de Error Boundaries"
            description="Como tratar diferentes tipos de erros"
          >
            <ErrorDemo />
          </DemoSection>

          {/* Demo de Estados */}
          <DemoSection
            title="Gerenciamento de Estados"
            description="Ciclo completo: idle → loading → success/error"
          >
            <StateDemo />
          </DemoSection>

          {/* Loading Básico */}
          <DemoSection
            title="Loading UI Básico"
            description="Implementação simples de loading.tsx"
          >
            <CodeBlock
              code={codeExamples.basicLoading}
              language="typescript"
              filename="app/dashboard/loading.tsx"
            />
          </DemoSection>

          {/* Skeleton Loading */}
          <DemoSection
            title="Skeleton Loading"
            description="Loading que imita a estrutura final"
          >
            <CodeBlock
              code={codeExamples.skeletonLoading}
              language="typescript"
              filename="app/posts/loading.tsx"
            />
          </DemoSection>

          {/* Loading Aninhado */}
          <DemoSection
            title="Loading UI Aninhado"
            description="Estrutura hierárquica de loading states"
          >
            <CodeBlock
              code={codeExamples.nestedLoading}
              language="text"
              filename="Estrutura de Loading"
            />
          </DemoSection>

          {/* Error Básico */}
          <DemoSection
            title="Error Boundary Básico"
            description="Implementação simples de error.tsx"
          >
            <CodeBlock
              code={codeExamples.basicError}
              language="typescript"
              filename="app/dashboard/error.tsx"
            />
          </DemoSection>

          {/* Error Customizado */}
          <DemoSection
            title="Error Boundary Customizado"
            description="Error boundary com mais funcionalidades"
          >
            <CodeBlock
              code={codeExamples.customError}
              language="typescript"
              filename="app/api/error.tsx"
            />
          </DemoSection>

          {/* Global Error */}
          <DemoSection
            title="Global Error"
            description="Error boundary para erros críticos da aplicação"
          >
            <CodeBlock
              code={codeExamples.globalError}
              language="typescript"
              filename="app/global-error.tsx"
            />
          </DemoSection>

          {/* Loading com Suspense */}
          <DemoSection
            title="Loading com Suspense"
            description="Combine Suspense com loading components específicos"
          >
            <CodeBlock
              code={codeExamples.loadingWithSuspense}
              language="typescript"
              filename="app/dashboard/page.tsx"
            />
          </DemoSection>

          {/* Error Boundary Class */}
          <DemoSection
            title="Error Boundary Component"
            description="Componente reutilizável para error boundaries"
          >
            <CodeBlock
              code={codeExamples.errorBoundaryClass}
              language="typescript"
              filename="components/ErrorBoundary.tsx"
            />
          </DemoSection>

          {/* Streaming com Suspense */}
          <DemoSection
            title="Streaming com Suspense"
            description="Carregamento progressivo de componentes"
          >
            <CodeBlock
              code={codeExamples.streamingWithSuspense}
              language="typescript"
              filename="app/posts/page.tsx"
            />
          </DemoSection>

          {/* Hook de Loading States */}
          <DemoSection
            title="Hook para Loading States"
            description="Hook customizado para gerenciar estados de carregamento"
          >
            <CodeBlock
              code={codeExamples.loadingStates}
              language="typescript"
              filename="hooks/useLoadingStates.ts"
            />
          </DemoSection>

          {/* Links de Navegação */}
          <div className="flex justify-between items-center pt-8 border-t border-gray-200 dark:border-gray-700">
            <Link
              href="/nextjs/intercepting-routes"
              className="flex items-center space-x-2 text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-300 transition-colors"
            >
              <span>← Intercepting Routes</span>
            </Link>
            
            <Link
              href="/nextjs"
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Voltar ao Next.js
            </Link>
            
            <Link
              href="/nextjs/not-found"
              className="flex items-center space-x-2 text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-300 transition-colors"
            >
              <span>Not Found →</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}