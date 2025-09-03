'use client';

import React, { useState } from 'react';
import CodeBlock from '@/components/CodeBlock';
import DemoSection from '@/components/DemoSection';

// Componente que pode gerar erro
function ErrorProneComponent({ shouldError }: { shouldError: boolean }) {
  if (shouldError) {
    throw new Error('Erro simulado para demonstração!');
  }
  
  return (
    <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-lg border border-green-300 dark:border-green-700">
      <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
        ✅ Componente funcionando
      </h3>
      <p className="text-green-700 dark:text-green-300">
        Este componente está funcionando normalmente!
      </p>
    </div>
  );
}

// Componente que simula erro de rede
function NetworkErrorComponent({ shouldError }: { shouldError: boolean }) {
  if (shouldError) {
    throw new Error('Falha na conexão com o servidor');
  }
  
  return (
    <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg border border-blue-300 dark:border-blue-700">
      <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
        🌐 Dados carregados
      </h3>
      <p className="text-blue-700 dark:text-blue-300">
        Conexão com o servidor estabelecida com sucesso!
      </p>
    </div>
  );
}

// Componente que simula erro de validação
function ValidationErrorComponent({ shouldError }: { shouldError: boolean }) {
  if (shouldError) {
    throw new Error('Dados inválidos fornecidos');
  }
  
  return (
    <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-lg border border-purple-300 dark:border-purple-700">
      <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-2">
        📝 Validação OK
      </h3>
      <p className="text-purple-700 dark:text-purple-300">
        Todos os dados foram validados com sucesso!
      </p>
    </div>
  );
}

// Error Boundary personalizado
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class CustomErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ComponentType<{ error: Error; reset: () => void }> },
  ErrorBoundaryState
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError && this.state.error) {
      const FallbackComponent = this.props.fallback;
      if (FallbackComponent) {
        return (
          <FallbackComponent 
            error={this.state.error} 
            reset={() => this.setState({ hasError: false, error: undefined })}
          />
        );
      }
      
      return (
        <div className="p-6 bg-red-100 dark:bg-red-900/30 rounded-lg border border-red-300 dark:border-red-700">
          <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
            ❌ Erro capturado
          </h3>
          <p className="text-red-700 dark:text-red-300 mb-4">
            {this.state.error.message}
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: undefined })}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Tentar novamente
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Componente de fallback customizado
function CustomErrorFallback({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="p-6 bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 rounded-lg border border-red-300 dark:border-red-700">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xl">⚠️</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">
            Oops! Algo deu errado
          </h3>
          <p className="text-red-600 dark:text-red-300 text-sm">
            Não se preocupe, você pode tentar novamente
          </p>
        </div>
      </div>
      
      <div className="p-3 bg-red-50 dark:bg-red-900/50 rounded border border-red-200 dark:border-red-800 mb-4">
        <p className="text-red-700 dark:text-red-300 text-sm font-mono">
          {error.message}
        </p>
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={reset}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Tentar Novamente
        </button>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          Recarregar Página
        </button>
      </div>
    </div>
  );
}

export default function ErrorHandlingPage() {
  const [error1, setError1] = useState(false);
  const [error2, setError2] = useState(false);
  const [error3, setError3] = useState(false);

  const errorBoundaryCode = `// app/error.tsx - Error UI para toda a aplicação
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
}

// app/dashboard/error.tsx - Error específico para /dashboard
'use client';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="p-8">
      <h2 className="text-xl font-bold text-red-600 mb-4">
        Erro no Dashboard
      </h2>
      <p className="text-gray-600 mb-4">
        Não foi possível carregar os dados do dashboard.
      </p>
      <button onClick={reset} className="btn-primary">
        Recarregar Dashboard
      </button>
    </div>
  );
}`;

  const globalErrorCode = `// app/global-error.tsx - Error global (layout raiz)
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
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h2 className="text-3xl font-bold text-red-600 mb-4">
            Erro Global
          </h2>
          <p className="text-gray-600 mb-4">
            Algo deu muito errado! Por favor, recarregue a página.
          </p>
          <button
            onClick={reset}
            className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Tentar Novamente
          </button>
        </div>
      </body>
    </html>
  );
}`;

  const notFoundCode = `// app/not-found.tsx - Página 404 personalizada
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-600 mb-4">
        Página não encontrada
      </h2>
      <p className="text-gray-500 mb-8 text-center max-w-md">
        A página que você está procurando não existe ou foi movida.
      </p>
      <Link 
        href="/" 
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Voltar ao Início
      </Link>
    </div>
  );
}

// app/dashboard/not-found.tsx - 404 específico para /dashboard
export default function DashboardNotFound() {
  return (
    <div className="p-8 text-center">
      <h2 className="text-xl font-bold mb-4">Recurso não encontrado</h2>
      <p className="text-gray-600 mb-4">
        O recurso do dashboard que você procura não existe.
      </p>
      <Link href="/dashboard" className="btn-primary">
        Voltar ao Dashboard
      </Link>
    </div>
  );
}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Error Handling
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Demonstração do sistema de tratamento de erros do Next.js 15.5.2 - Error Boundaries, páginas de erro personalizadas e recuperação de falhas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <DemoSection title="Error Boundary Simples">
            <div className="space-y-4">
              <button
                onClick={() => setError1(!error1)}
                className={`w-full px-4 py-2 rounded-lg transition-colors ${
                  error1 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                {error1 ? 'Corrigir Erro' : 'Gerar Erro'}
              </button>
              
              <CustomErrorBoundary>
                <ErrorProneComponent shouldError={error1} />
              </CustomErrorBoundary>
            </div>
          </DemoSection>

          <DemoSection title="Error com Fallback Customizado">
            <div className="space-y-4">
              <button
                onClick={() => setError2(!error2)}
                className={`w-full px-4 py-2 rounded-lg transition-colors ${
                  error2 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                {error2 ? 'Corrigir Erro' : 'Simular Erro de Rede'}
              </button>
              
              <CustomErrorBoundary fallback={CustomErrorFallback}>
                <NetworkErrorComponent shouldError={error2} />
              </CustomErrorBoundary>
            </div>
          </DemoSection>

          <DemoSection title="Error de Validação">
            <div className="space-y-4">
              <button
                onClick={() => setError3(!error3)}
                className={`w-full px-4 py-2 rounded-lg transition-colors ${
                  error3 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-purple-500 hover:bg-purple-600 text-white'
                }`}
              >
                {error3 ? 'Corrigir Dados' : 'Dados Inválidos'}
              </button>
              
              <CustomErrorBoundary>
                <ValidationErrorComponent shouldError={error3} />
              </CustomErrorBoundary>
            </div>
          </DemoSection>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Exemplo: Error Boundaries</h2>
          <CodeBlock code={errorBoundaryCode} language="tsx" />
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Exemplo: Global Error</h2>
          <CodeBlock code={globalErrorCode} language="tsx" />
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Exemplo: Not Found</h2>
          <CodeBlock code={notFoundCode} language="tsx" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">🛡️ Hierarquia de Erros</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Ordem de captura:</h3>
                <ol className="space-y-2 text-gray-600 dark:text-gray-400 list-decimal list-inside">
                  <li>Error Boundary mais próximo</li>
                  <li>error.tsx da rota atual</li>
                  <li>error.tsx da rota pai</li>
                  <li>global-error.tsx (raiz)</li>
                </ol>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Arquivos especiais:</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• <code>error.tsx</code> - Erro da rota</li>
                  <li>• <code>global-error.tsx</code> - Erro global</li>
                  <li>• <code>not-found.tsx</code> - Página 404</li>
                  <li>• <code>loading.tsx</code> - Estado de carregamento</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">🔧 Melhores Práticas</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Error Boundaries:</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Use granularidade adequada</li>
                  <li>• Forneça ações de recuperação</li>
                  <li>• Log erros para monitoramento</li>
                  <li>• Fallbacks informativos</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">UX de Erro:</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Mensagens claras e úteis</li>
                  <li>• Botões de ação (retry, home)</li>
                  <li>• Design consistente</li>
                  <li>• Evite jargão técnico</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">🎯 Estratégias de Recuperação</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Retry</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Tentar novamente automaticamente</li>
                <li>• Botão manual de retry</li>
                <li>• Exponential backoff</li>
                <li>• Limite de tentativas</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Fallback</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Dados em cache</li>
                <li>• Conteúdo estático</li>
                <li>• Funcionalidade reduzida</li>
                <li>• Modo offline</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Navegação</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Voltar à página anterior</li>
                <li>• Ir para página inicial</li>
                <li>• Sugerir páginas relacionadas</li>
                <li>• Contato com suporte</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}