'use client';

import { useState } from 'react';
import CodeBlock from '@/components/CodeBlock';
import DemoSection from '@/components/DemoSection';
import {
  useCounterStore,
  useUserStore,
  useTodoStore,
  useNotificationStore
} from '@/store/simple';

// Demonstração básica do Counter Store
function CounterDemo() {
  const { count, increment, decrement, reset } = useCounterStore();

  const codeExample = `import { useCounterStore } from '@/store/simple';

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
}`;

  return (
    <DemoSection title="Counter Store" description="Store básica com persist e devtools">
      <div className="space-y-4">
        <div className="text-center">
          <div className="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-4">
            {count}
          </div>
          <div className="flex gap-2 justify-center">
            <button
              onClick={decrement}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              -1
            </button>
            <button
              onClick={increment}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              +1
            </button>
            <button
              onClick={reset}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
        <CodeBlock code={codeExample} language="typescript" />
      </div>
    </DemoSection>
  );
}

// Demonstração básica do User Store
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

  const codeExample = `import { useUserStore } from '@/store/simple';

function UserAuth() {
  const { user, isAuthenticated, login, logout } = useUserStore();

  const handleLogin = () => {
    login({ id: '1', name: 'João', email: 'joao@example.com' });
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Bem-vindo, {user?.name}!</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}`;

  return (
    <DemoSection title="User Store" description="Autenticação simples com persist">
      <div className="space-y-4">
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
          {isAuthenticated && user ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <div className="font-medium text-gray-800 dark:text-white">{user.name}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{user.email}</div>
                </div>
              </div>
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-gray-600 dark:text-gray-400">Não está logado</p>
              <button
                onClick={handleLogin}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Login
              </button>
            </div>
          )}
        </div>
        <CodeBlock code={codeExample} language="typescript" />
      </div>
    </DemoSection>
  );
}

// Demonstração básica do Todo Store
function TodoDemo() {
  const { todos, addTodo, toggleTodo, deleteTodo, clearCompleted } = useTodoStore();
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      addTodo(newTodo.trim());
      setNewTodo('');
    }
  };

  const codeExample = `import { useTodoStore } from '@/store/simple';

function TodoList() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodoStore();
  const [newTodo, setNewTodo] = useState('');

  const handleAdd = () => {
    if (newTodo.trim()) {
      addTodo(newTodo.trim());
      setNewTodo('');
    }
  };

  return (
    <div>
      <input
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Nova tarefa..."
      />
      <button onClick={handleAdd}>Adicionar</button>
      
      {todos.map(todo => (
        <div key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />
          <span>{todo.text}</span>
          <button onClick={() => deleteTodo(todo.id)}>Deletar</button>
        </div>
      ))}
    </div>
  );
}`;

  return (
    <DemoSection title="Todo Store" description="Lista de tarefas com persist">
      <div className="space-y-4">
        {/* Add Todo */}
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
          <div className="flex gap-2">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
              placeholder="Digite uma nova tarefa..."
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <button
              onClick={handleAddTodo}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Adicionar
            </button>
          </div>
        </div>

        {/* Todo List */}
        <div className="space-y-2">
          {todos.length === 0 ? (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              Nenhuma tarefa ainda. Adicione uma acima!
            </div>
          ) : (
            todos.map((todo) => (
              <div
                key={todo.id}
                className={`p-4 bg-white dark:bg-gray-800 rounded-lg border transition-opacity ${
                  todo.completed ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-center gap-3">
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
                    className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
                  >
                    Deletar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Actions */}
        {todos.length > 0 && (
          <div className="flex gap-2">
            <button
              onClick={clearCompleted}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Limpar Concluídas ({todos.filter(t => t.completed).length})
            </button>
          </div>
        )}

        <CodeBlock code={codeExample} language="typescript" />
      </div>
    </DemoSection>
  );
}

// Demonstração básica do Notification Store
function NotificationDemo() {
  const { notifications, addNotification, removeNotification, clearAll } = useNotificationStore();

  const codeExample = `import { useNotificationStore } from '@/store/simple';

function Notifications() {
  const { notifications, addNotification, removeNotification } = useNotificationStore();

  return (
    <div>
      <button onClick={() => addNotification('success', 'Sucesso!')}>Success</button>
      <button onClick={() => addNotification('error', 'Erro!')}>Error</button>
      
      {notifications.map(notification => (
        <div key={notification.id} className={notification.type}>
          {notification.message}
          <button onClick={() => removeNotification(notification.id)}>×</button>
        </div>
      ))}
    </div>
  );
}`;

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success': return 'border-green-300 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200';
      case 'error': return 'border-red-300 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200';
      case 'warning': return 'border-yellow-300 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200';
      case 'info': return 'border-blue-300 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200';
      default: return 'border-gray-300 bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-200';
    }
  };

  return (
    <DemoSection title="Notification Store" description="Sistema de notificações com auto-remove">
      <div className="space-y-4">
        {/* Actions */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => addNotification('success', 'Operação realizada com sucesso!')}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            Success
          </button>
          <button
            onClick={() => addNotification('error', 'Ocorreu um erro!')}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Error
          </button>
          <button
            onClick={() => addNotification('warning', 'Atenção: verifique os dados!')}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
          >
            Warning
          </button>
          <button
            onClick={() => addNotification('info', 'Informação importante!')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Info
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

        {/* Notifications */}
        <div className="space-y-2">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              Nenhuma notificação. Clique nos botões acima para testar!
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border rounded-lg flex items-center justify-between ${getNotificationColor(notification.type)}`}
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
            ))
          )}
        </div>

        <CodeBlock code={codeExample} language="typescript" />
      </div>
    </DemoSection>
  );
}

export default function ZustandBasicPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🐻 Zustand Básico
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Demonstrações básicas do Zustand com stores simples, persist e devtools
          </p>
        </div>

        <div className="grid gap-8 max-w-6xl mx-auto">
          <CounterDemo />
          <UserDemo />
          <TodoDemo />
          <NotificationDemo />
        </div>
      </div>
    </div>
  );
}