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


// Demonstração do Counter
function CounterDemo() {
  const { count, increment, decrement, reset } = useCounterStore();

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border">
      <h3 className="text-xl font-semibold mb-4">🔢 Counter Store</h3>
      <div className="text-center space-y-4">
        <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
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
    </div>
  );
}

// Demonstração do User
function UserDemo() {
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
      <h3 className="text-xl font-semibold mb-4">👤 User Store</h3>
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
    </div>
  );
}

// Demonstração do Todo
function TodoDemo() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodoStore();
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      addTodo(newTodo.trim());
      setNewTodo('');
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border">
      <h3 className="text-xl font-semibold mb-4">📝 Todo Store</h3>
      <div className="space-y-4">
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
        
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {todos.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Nenhuma tarefa</p>
          ) : (
            todos.slice(0, 3).map((todo) => (
              <div key={todo.id} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700 rounded">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="w-4 h-4"
                />
                <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                  {todo.text}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ))
          )}
          {todos.length > 3 && (
            <p className="text-sm text-gray-500 text-center">... e mais {todos.length - 3} tarefas</p>
          )}
        </div>
      </div>
    </div>
  );
}

// Demonstração de Notificações
function NotificationDemo() {
  const { notifications, addNotification, removeNotification } = useNotificationStore();

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border">
      <h3 className="text-xl font-semibold mb-4">🔔 Notification Store</h3>
      <div className="space-y-4">
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => addNotification('success', 'Sucesso!')}
            className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
          >
            Success
          </button>
          <button
            onClick={() => addNotification('error', 'Erro!')}
            className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
          >
            Error
          </button>
          <button
            onClick={() => addNotification('warning', 'Aviso!')}
            className="px-3 py-1 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600"
          >
            Warning
          </button>
          <button
            onClick={() => addNotification('info', 'Info!')}
            className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
          >
            Info
          </button>
        </div>
        
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {notifications.length === 0 ? (
            <p className="text-gray-500 text-center py-2">Nenhuma notificação</p>
          ) : (
            notifications.slice(0, 2).map((notification) => (
              <div
                key={notification.id}
                className={`p-2 border rounded flex items-center justify-between text-sm ${
                  notification.type === 'success' ? 'border-green-300 bg-green-100 dark:bg-green-900/30' :
                  notification.type === 'error' ? 'border-red-300 bg-red-100 dark:bg-red-900/30' :
                  notification.type === 'warning' ? 'border-yellow-300 bg-yellow-100 dark:bg-yellow-900/30' :
                  'border-blue-300 bg-blue-100 dark:bg-blue-900/30'
                }`}
              >
                <span>{notification.message}</span>
                <button
                  onClick={() => removeNotification(notification.id)}
                  className="font-bold hover:opacity-70"
                >
                  ×
                </button>
              </div>
            ))
          )}
          {notifications.length > 2 && (
            <p className="text-sm text-gray-500 text-center">... e mais {notifications.length - 2} notificações</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ZustandPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🐻 Zustand State Management
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Gerenciamento de estado simples, escalável e eficiente para React
          </p>
          
          {/* Navigation */}
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/zustand/basic"
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              📚 Demonstrações Básicas
            </Link>
            <Link
              href="/zustand/middleware"
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              🔧 Middleware Avançado
            </Link>
            <Link
              href="/zustand/patterns"
              className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              🎨 Padrões e Slices
            </Link>
          </div>
        </div>

        {/* Quick Demo */}
        <DemoSection title="Demonstração Rápida" description="Teste as funcionalidades básicas do Zustand">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1.5">
            <CounterDemo />
            <UserDemo />
            <TodoDemo />
            <NotificationDemo />
          </div>
        </DemoSection>

        {/* Introduction */}
        <DemoSection title="Por que Zustand?" description="Vantagens sobre outras soluções">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1.5">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border">
              <div className="text-3xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold mb-2">Simples</h3>
              <p className="text-gray-600 dark:text-gray-400">
                API minimalista sem boilerplate. Apenas 2.9kb gzipped.
              </p>
            </div>
            
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">Performático</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Re-renders otimizados e seletores automáticos.
              </p>
            </div>
            
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border">
              <div className="text-3xl mb-4">🔧</div>
              <h3 className="text-xl font-semibold mb-2">Flexível</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Middleware, persist, devtools e muito mais.
              </p>
            </div>
          </div>
        </DemoSection>

        {/* Code Example */}
        <DemoSection title="Exemplo Básico" description="Como criar uma store simples">
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
      { name: 'counter-storage' }
    ),
    { name: 'counter-store' }
  )
);

// Uso no componente
function Counter() {
  const { count, increment, decrement, reset } = useCounterStore();
  
  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}`}
          />
        </DemoSection>

        {/* Features */}
        <DemoSection title="Recursos Principais" description="O que o Zustand oferece">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">✅ Características</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• TypeScript nativo</li>
                <li>• Sem providers necessários</li>
                <li>• Middleware extensível</li>
                <li>• DevTools integrado</li>
                <li>• Persist automático</li>
                <li>• Seletores otimizados</li>
                <li>• SSR friendly</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">🎯 Casos de Uso</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Estado global da aplicação</li>
                <li>• Cache de dados</li>
                <li>• Configurações do usuário</li>
                <li>• Estado de UI complexo</li>
                <li>• Comunicação entre componentes</li>
                <li>• Gerenciamento de formulários</li>
                <li>• Estado de autenticação</li>
              </ul>
            </div>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}