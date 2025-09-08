'use client';

import { useState } from 'react';
import Link from 'next/link';
import CodeBlock from '@/components/CodeBlock';
import DemoSection from '@/components/DemoSection';
import {
  useCounterStore,
  useUserStore,
  useTodoStore,
  useNotificationStore
} from '@/store/simple';

// Demonstração de Persist Middleware
function PersistDemo() {
  const { count, increment, decrement, reset } = useCounterStore();

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border">
      <h3 className="text-xl font-semibold mb-4">💾 Persist Middleware</h3>
      <div className="space-y-4">
        <p className="text-gray-600 dark:text-gray-400">
          O estado é automaticamente salvo no localStorage e restaurado ao recarregar a página.
        </p>
        
        <div className="text-center">
          <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4">
            {count}
          </div>
          <div className="flex gap-2 justify-center">
            <button
              onClick={decrement}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              -1
            </button>
            <button
              onClick={increment}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              +1
            </button>
            <button
              onClick={reset}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
        
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            💡 Experimente: Altere o valor, recarregue a página e veja que o estado persiste!
          </p>
        </div>
      </div>
    </div>
  );
}

// Demonstração de DevTools
function DevToolsDemo() {
  const { user, isAuthenticated, login, logout } = useUserStore();

  const handleLogin = () => {
    const mockUser = {
      id: '1',
      name: 'João Silva',
      email: 'joao@example.com'
    };
    login(mockUser);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border">
      <h3 className="text-xl font-semibold mb-4">🔧 DevTools Integration</h3>
      <div className="space-y-4">
        <p className="text-gray-600 dark:text-gray-400">
          Abra o Redux DevTools para ver as ações sendo disparadas em tempo real.
        </p>
        
        {isAuthenticated && user ? (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                {user.name.charAt(0)}
              </div>
              <div>
                <div className="font-medium">{user.name}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{user.email}</div>
              </div>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-gray-600 dark:text-gray-400">Não está logado</p>
            <button
              onClick={handleLogin}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              Login
            </button>
          </div>
        )}
        
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            🔍 Abra o DevTools (F12) → Redux tab para monitorar as ações
          </p>
        </div>
      </div>
    </div>
  );
}

// Demonstração de Auto-Remove (Notification)
function AutoRemoveDemo() {
  const { notifications, addNotification, removeNotification, clearAll } = useNotificationStore();

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border">
      <h3 className="text-xl font-semibold mb-4">⏰ Auto-Remove Notifications</h3>
      <div className="space-y-4">
        <p className="text-gray-600 dark:text-gray-400">
          Notificações são automaticamente removidas após 5 segundos.
        </p>
        
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => addNotification('success', 'Operação realizada com sucesso!')}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            Success (5s)
          </button>
          <button
            onClick={() => addNotification('error', 'Ocorreu um erro!')}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Error (5s)
          </button>
          <button
            onClick={() => addNotification('warning', 'Atenção: verifique os dados!')}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
          >
            Warning (5s)
          </button>
          {notifications.length > 0 && (
            <button
              onClick={clearAll}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
            >
              Limpar Todas
            </button>
          )}
        </div>
        
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              Nenhuma notificação. Clique nos botões acima!
            </div>
          ) : (
            notifications.map((notification) => {
              const getColor = (type: string) => {
                switch (type) {
                  case 'success': return 'border-green-300 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200';
                  case 'error': return 'border-red-300 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200';
                  case 'warning': return 'border-yellow-300 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200';
                  default: return 'border-blue-300 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200';
                }
              };
              
              return (
                <div
                  key={notification.id}
                  className={`p-3 border rounded-lg flex items-center justify-between ${getColor(notification.type)}`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium capitalize">{notification.type}:</span>
                    <span>{notification.message}</span>
                  </div>
                  <button
                    onClick={() => removeNotification(notification.id)}
                    className="text-lg font-bold hover:opacity-70 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              );
            })
          )}
        </div>
        
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            ⏱️ As notificações desaparecem automaticamente em 5 segundos
          </p>
        </div>
      </div>
    </div>
  );
}

// Demonstração de Estado Complexo
function ComplexStateDemo() {
  const { todos, addTodo, toggleTodo, deleteTodo, clearCompleted } = useTodoStore();
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      addTodo(newTodo.trim());
      setNewTodo('');
    }
  };

  const stats = {
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    active: todos.filter(t => !t.completed).length
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border">
      <h3 className="text-xl font-semibold mb-4">📊 Complex State Management</h3>
      <div className="space-y-4">
        <p className="text-gray-600 dark:text-gray-400">
          Gerenciamento de estado complexo com múltiplas operações e estatísticas derivadas.
        </p>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.total}</div>
            <div className="text-sm text-blue-700 dark:text-blue-300">Total</div>
          </div>
          <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.completed}</div>
            <div className="text-sm text-green-700 dark:text-green-300">Concluídas</div>
          </div>
          <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded text-center">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.active}</div>
            <div className="text-sm text-yellow-700 dark:text-yellow-300">Ativas</div>
          </div>
        </div>
        
        {/* Add Todo */}
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
            placeholder="Nova tarefa..."
            className="flex-1 px-3 py-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <button
            onClick={handleAddTodo}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Adicionar
          </button>
        </div>
        
        {/* Todo List */}
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {todos.length === 0 ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              Nenhuma tarefa ainda. Adicione uma acima!
            </div>
          ) : (
            todos.map((todo) => (
              <div
                key={todo.id}
                className={`p-3 bg-gray-50 dark:bg-gray-700 rounded flex items-center gap-3 transition-opacity ${
                  todo.completed ? 'opacity-60' : ''
                }`}
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <div className="flex-1">
                  <div className={`font-medium ${
                    todo.completed 
                      ? 'line-through text-gray-500' 
                      : 'text-gray-800 dark:text-white'
                  }`}>
                    {todo.text}
                  </div>
                </div>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>
        
        {/* Actions */}
        {stats.completed > 0 && (
          <div className="flex gap-2">
            <button
              onClick={clearCompleted}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Limpar Concluídas ({stats.completed})
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ZustandMiddlewarePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🔧 Zustand Middleware
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Demonstrações avançadas de middleware: persist, devtools, auto-remove e estado complexo
          </p>
          
          {/* Navigation */}
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/zustand"
              className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              ← Voltar
            </Link>
            <Link
              href="/zustand/basic"
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              📚 Básico
            </Link>
            <Link
              href="/zustand/patterns"
              className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              🎨 Padrões
            </Link>
          </div>
        </div>

        {/* Middleware Demos */}
        <div className="grid gap-1.5 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-1.5">
            <PersistDemo />
            <DevToolsDemo />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-1.5">
            <AutoRemoveDemo />
            <ComplexStateDemo />
          </div>
        </div>

        {/* Code Examples */}
        <DemoSection title="Implementação dos Middlewares" description="Como implementar cada middleware">
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Persist Middleware</h3>
              <CodeBlock
                language="typescript"
                code={`import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

export const useCounterStore = create<CounterState>()(
  devtools(
    persist(
      (set) => ({
        count: 0,
        increment: () => set((state) => ({ count: state.count + 1 })),
        decrement: () => set((state) => ({ count: state.count - 1 })),
        reset: () => set({ count: 0 }),
      }),
      {
        name: 'counter-storage', // nome da chave no localStorage
      }
    ),
    {
      name: 'counter-store', // nome no Redux DevTools
    }
  )
);`}
              />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Auto-Remove com setTimeout</h3>
              <CodeBlock
                language="typescript"
                code={`export const useNotificationStore = create<NotificationState>()(
  devtools(
    (set) => ({
      notifications: [],
      addNotification: (type: Notification['type'], message: string) => {
        const notification: Notification = {
          id: crypto.randomUUID(),
          type,
          message,
        };
        set((state) => ({
          notifications: [...state.notifications, notification],
        }));
        
        // Auto remove após 5 segundos
        setTimeout(() => {
          set((state) => ({
            notifications: state.notifications.filter((n) => n.id !== notification.id),
          }));
        }, 5000);
      },
      removeNotification: (id: string) => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        }));
      },
      clearAll: () => {
        set({ notifications: [] });
      },
    }),
    {
      name: 'notification-store',
    }
  )
);`}
              />
            </div>
          </div>
        </DemoSection>

        {/* Features */}
        <DemoSection title="Recursos dos Middlewares" description="O que cada middleware oferece">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1.5">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border">
              <div className="text-3xl mb-4">💾</div>
              <h3 className="text-lg font-semibold mb-2">Persist</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• localStorage automático</li>
                <li>• Restauração no reload</li>
                <li>• Configuração flexível</li>
                <li>• Partialização de estado</li>
              </ul>
            </div>
            
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border">
              <div className="text-3xl mb-4">🔧</div>
              <h3 className="text-lg font-semibold mb-2">DevTools</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Redux DevTools</li>
                <li>• Time travel debugging</li>
                <li>• Action tracking</li>
                <li>• State inspection</li>
              </ul>
            </div>
            
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border">
              <div className="text-3xl mb-4">⏰</div>
              <h3 className="text-lg font-semibold mb-2">Auto-Remove</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• setTimeout integrado</li>
                <li>• Limpeza automática</li>
                <li>• Controle de tempo</li>
                <li>• Gestão de memória</li>
              </ul>
            </div>
            
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-lg font-semibold mb-2">Complex State</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Estados derivados</li>
                <li>• Múltiplas operações</li>
                <li>• Computed values</li>
                <li>• Performance otimizada</li>
              </ul>
            </div>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}