'use client';

import React from 'react';
import { proxy, useSnapshot, subscribe, ref } from 'valtio';
import { subscribeKey, watch } from 'valtio/utils';
import { DemoCard } from '@/components/DemoCard';
import { DemoCardStatic } from '@/components/DemoCardStatic';
import { DemoSection } from '@/components/DemoSection';
import { CodeBlock } from '@/components/CodeBlock';

// Basic proxy state
const counterState = proxy({ count: 0, step: 1 });

// User state with nested objects
const userState = proxy({
  profile: {
    name: 'João Silva',
    email: 'joao@example.com',
    avatar: '👤',
  },
  preferences: {
    theme: 'light',
    language: 'pt-BR',
    notifications: true,
  },
  isLoading: false,
});

// Todo state
const todoState = proxy({
  todos: [
    { id: 1, text: 'Aprender Valtio', completed: false, priority: 'high' },
    { id: 2, text: 'Criar aplicação', completed: true, priority: 'medium' },
  ],
  filter: 'all' as 'all' | 'active' | 'completed',
  newTodo: '',
});

// Shopping cart state
const cartState = proxy({
  items: [] as Array<{ id: number; name: string; price: number; quantity: number }>,
  discount: 0,
  isOpen: false,
});

// Actions for counter
const counterActions = {
  increment: () => {
    counterState.count += counterState.step;
  },
  decrement: () => {
    counterState.count -= counterState.step;
  },
  setStep: (step: number) => {
    counterState.step = step;
  },
  reset: () => {
    counterState.count = 0;
    counterState.step = 1;
  },
};

// Actions for user
const userActions = {
  updateProfile: (updates: Partial<typeof userState.profile>) => {
    Object.assign(userState.profile, updates);
  },
  updatePreferences: (updates: Partial<typeof userState.preferences>) => {
    Object.assign(userState.preferences, updates);
  },
  setLoading: (loading: boolean) => {
    userState.isLoading = loading;
  },
};

// Actions for todos
const todoActions = {
  addTodo: () => {
    if (todoState.newTodo.trim()) {
      todoState.todos.push({
        id: Date.now(),
        text: todoState.newTodo.trim(),
        completed: false,
        priority: 'medium',
      });
      todoState.newTodo = '';
    }
  },
  toggleTodo: (id: number) => {
    const todo = todoState.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  },
  deleteTodo: (id: number) => {
    const index = todoState.todos.findIndex(t => t.id === id);
    if (index !== -1) {
      todoState.todos.splice(index, 1);
    }
  },
  setFilter: (filter: typeof todoState.filter) => {
    todoState.filter = filter;
  },
  updateNewTodo: (text: string) => {
    todoState.newTodo = text;
  },
};

// Actions for cart
const cartActions = {
  addItem: (item: { id: number; name: string; price: number }) => {
    const existingItem = cartState.items.find(i => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartState.items.push({ ...item, quantity: 1 });
    }
  },
  removeItem: (id: number) => {
    const index = cartState.items.findIndex(i => i.id === id);
    if (index !== -1) {
      cartState.items.splice(index, 1);
    }
  },
  updateQuantity: (id: number, quantity: number) => {
    const item = cartState.items.find(i => i.id === id);
    if (item) {
      if (quantity <= 0) {
        cartActions.removeItem(id);
      } else {
        item.quantity = quantity;
      }
    }
  },
  setDiscount: (discount: number) => {
    cartState.discount = Math.max(0, Math.min(100, discount));
  },
  toggleCart: () => {
    cartState.isOpen = !cartState.isOpen;
  },
  clearCart: () => {
    cartState.items.length = 0;
    cartState.discount = 0;
  },
};

// Subscribe to changes
subscribe(counterState, () => {
  console.log('Counter state changed:', counterState);
});

subscribeKey(userState, 'isLoading', (loading) => {
  console.log('Loading state changed:', loading);
});

// Components
function BasicCounter() {
  const snap = useSnapshot(counterState);

  return (
    <div className="space-y-4">
      <div className="text-center">
        <p className="text-2xl font-bold">Count: {snap.count}</p>
        <p className="text-lg text-gray-600">Step: {snap.step}</p>
      </div>
      <div className="flex gap-2 justify-center flex-wrap">
        <button
          onClick={counterActions.increment}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          +{snap.step}
        </button>
        <button
          onClick={counterActions.decrement}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          -{snap.step}
        </button>
        <button
          onClick={() => counterActions.setStep(snap.step === 1 ? 5 : 1)}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Step: {snap.step === 1 ? '5' : '1'}
        </button>
        <button
          onClick={counterActions.reset}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

function UserProfile() {
  const snap = useSnapshot(userState);

  return (
    <div className="space-y-4">
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl">{snap.profile.avatar}</span>
          <div>
            <h3 className="font-semibold">{snap.profile.name}</h3>
            <p className="text-sm text-gray-600">{snap.profile.email}</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span>Tema:</span>
            <span className="font-medium capitalize">{snap.preferences.theme}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Idioma:</span>
            <span className="font-medium">{snap.preferences.language}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Notificações:</span>
            <span className="font-medium">{snap.preferences.notifications ? 'Ativadas' : 'Desativadas'}</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <input
          type="text"
          value={snap.profile.name}
          onChange={(e) => userActions.updateProfile({ name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Nome"
        />
        
        <div className="flex gap-2">
          <button
            onClick={() => userActions.updatePreferences({ 
              theme: snap.preferences.theme === 'light' ? 'dark' : 'light' 
            })}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
          >
            Toggle Theme
          </button>
          
          <button
            onClick={() => userActions.updatePreferences({ 
              notifications: !snap.preferences.notifications 
            })}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
          >
            Toggle Notifications
          </button>
        </div>
      </div>
    </div>
  );
}

function TodoApp() {
  const snap = useSnapshot(todoState);
  
  const filteredTodos = snap.todos.filter(todo => {
    if (snap.filter === 'active') return !todo.completed;
    if (snap.filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={snap.newTodo}
          onChange={(e) => todoActions.updateNewTodo(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && todoActions.addTodo()}
          placeholder="Nova tarefa..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={todoActions.addTodo}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Adicionar
        </button>
      </div>
      
      <div className="flex gap-2">
        {(['all', 'active', 'completed'] as const).map(filter => (
          <button
            key={filter}
            onClick={() => todoActions.setFilter(filter)}
            className={`px-3 py-1 rounded text-sm ${
              snap.filter === filter
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {filter === 'all' ? 'Todas' : filter === 'active' ? 'Ativas' : 'Concluídas'}
          </button>
        ))}
      </div>
      
      <div className="space-y-2">
        {filteredTodos.map(todo => (
          <div
            key={todo.id}
            className={`flex items-center gap-2 p-2 rounded ${
              todo.completed ? 'bg-green-50 text-green-800' : 'bg-gray-50'
            }`}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => todoActions.toggleTodo(todo.id)}
              className="w-4 h-4"
            />
            <span className={`flex-1 ${todo.completed ? 'line-through' : ''}`}>
              {todo.text}
            </span>
            <span className={`text-xs px-2 py-1 rounded ${
              todo.priority === 'high' ? 'bg-red-100 text-red-800' :
              todo.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-green-100 text-green-800'
            }`}>
              {todo.priority}
            </span>
            <button
              onClick={() => todoActions.deleteTodo(todo.id)}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      
      <div className="text-sm text-gray-600">
        Total: {snap.todos.length} | 
        Ativas: {snap.todos.filter(t => !t.completed).length} | 
        Concluídas: {snap.todos.filter(t => t.completed).length}
      </div>
    </div>
  );
}

function ShoppingCart() {
  const snap = useSnapshot(cartState);
  
  const products = [
    { id: 1, name: 'Notebook', price: 2500 },
    { id: 2, name: 'Mouse', price: 50 },
    { id: 3, name: 'Teclado', price: 150 },
    { id: 4, name: 'Monitor', price: 800 },
  ];
  
  const total = snap.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = total * (snap.discount / 100);
  const finalTotal = total - discountAmount;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        {products.map(product => (
          <button
            key={product.id}
            onClick={() => cartActions.addItem(product)}
            className="p-2 bg-blue-50 border border-blue-200 rounded hover:bg-blue-100 text-sm"
          >
            {product.name} - R$ {product.price}
          </button>
        ))}
      </div>
      
      <div className="border-t pt-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold">Carrinho ({snap.items.length} itens)</h3>
          <button
            onClick={cartActions.toggleCart}
            className="text-blue-500 hover:text-blue-700 text-sm"
          >
            {snap.isOpen ? 'Fechar' : 'Abrir'}
          </button>
        </div>
        
        {snap.isOpen && (
          <div className="space-y-2">
            {snap.items.map(item => (
              <div key={item.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                <span className="flex-1 text-sm">{item.name}</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => cartActions.updateQuantity(item.id, item.quantity - 1)}
                    className="w-6 h-6 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-sm">{item.quantity}</span>
                  <button
                    onClick={() => cartActions.updateQuantity(item.id, item.quantity + 1)}
                    className="w-6 h-6 bg-green-500 text-white rounded text-xs hover:bg-green-600"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm font-medium">R$ {item.price * item.quantity}</span>
                <button
                  onClick={() => cartActions.removeItem(item.id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  ✕
                </button>
              </div>
            ))}
            
            <div className="border-t pt-2">
              <div className="flex gap-2 mb-2">
                <input
                  type="number"
                  value={snap.discount}
                  onChange={(e) => cartActions.setDiscount(Number(e.target.value))}
                  placeholder="Desconto %"
                  className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                  min="0"
                  max="100"
                />
                <button
                  onClick={cartActions.clearCart}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                >
                  Limpar
                </button>
              </div>
              
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
                {snap.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Desconto ({snap.discount}%):</span>
                    <span>-R$ {discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold border-t pt-1">
                  <span>Total:</span>
                  <span>R$ {finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ValtioPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Valtio - Proxy-based State
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Valtio torna o estado mutável usando proxies JavaScript. 
            Você pode modificar o estado diretamente e os componentes re-renderizam automaticamente.
          </p>
        </div>

        <DemoSection title="Conceitos Fundamentais">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <DemoCardStatic title="Proxy State" description="Estado mutável com proxies">
              <CodeBlock
                language="typescript"
                code={`// Criar proxy state
const state = proxy({ count: 0, name: 'João' });

// Modificar diretamente
state.count++;
state.name = 'Maria';

// Objetos aninhados
const userState = proxy({
  profile: { name: 'João', email: 'joao@example.com' },
  preferences: { theme: 'light' }
});`}
              />
            </DemoCardStatic>

            <DemoCardStatic title="useSnapshot Hook" description="Ler estado reativo">
              <CodeBlock
                language="typescript"
                code={`function Component() {
  // Snapshot imutável para render
  const snap = useSnapshot(state);
  
  return (
    <div>
      <p>Count: {snap.count}</p>
      <button onClick={() => state.count++}>
        Increment
      </button>
    </div>
  );
}`}
              />
            </DemoCardStatic>
          </div>
        </DemoSection>

        <DemoSection title="Exemplos Práticos">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <DemoCardStatic title="Contador com Step" description="Estado simples com múltiplas propriedades">
              <BasicCounter />
            </DemoCardStatic>

            <DemoCardStatic title="Perfil de Usuário" description="Objetos aninhados e atualizações">
              <UserProfile />
            </DemoCardStatic>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <DemoCardStatic title="Todo App" description="Lista dinâmica com filtros">
              <TodoApp />
            </DemoCardStatic>

            <DemoCardStatic title="Carrinho de Compras" description="Estado complexo com cálculos">
              <ShoppingCart />
            </DemoCardStatic>
          </div>
        </DemoSection>

        <DemoSection title="Recursos Avançados">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">📡 Subscriptions</h3>
              <p className="text-blue-800 text-sm mb-3">
                Escute mudanças específicas no estado.
              </p>
              <CodeBlock
                language="typescript"
                code={`subscribe(state, () => {
  console.log('State changed');
});

subscribeKey(state, 'count', (count) => {
  console.log('Count:', count);
});`}
              />
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-green-900 mb-2">🔄 Derived State</h3>
              <p className="text-green-800 text-sm mb-3">
                Compute valores derivados automaticamente.
              </p>
              <CodeBlock
                language="typescript"
                code={`const derived = derive({
  doubled: (get) => get(state).count * 2,
  isEven: (get) => get(state).count % 2 === 0
});`}
              />
            </div>
            
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">🎯 Refs</h3>
              <p className="text-purple-800 text-sm mb-3">
                Objetos que não devem ser proxificados.
              </p>
              <CodeBlock
                language="typescript"
                code={`const state = proxy({
  dom: ref(document.createElement('div')),
  date: ref(new Date())
});`}
              />
            </div>
          </div>
        </DemoSection>

        <DemoSection title="Vantagens do Valtio">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-yellow-900 mb-2">🎯 Simplicidade</h3>
              <p className="text-yellow-800">
                Modifique o estado diretamente, sem reducers ou actions complexas.
              </p>
            </div>
            
            <div className="bg-red-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-red-900 mb-2">⚡ Performance</h3>
              <p className="text-red-800">
                Re-renders otimizados baseados em quais propriedades foram acessadas.
              </p>
            </div>
            
            <div className="bg-indigo-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-indigo-900 mb-2">🔧 Flexibilidade</h3>
              <p className="text-indigo-800">
                Funciona com qualquer estrutura de dados, incluindo classes e objetos complexos.
              </p>
            </div>
          </div>
        </DemoSection>

        <DemoSection title="Código dos Exemplos">
          <CodeBlock
            language="typescript"
            code={`// Criar proxy state
const counterState = proxy({ count: 0, step: 1 });

// Actions
const actions = {
  increment: () => counterState.count += counterState.step,
  decrement: () => counterState.count -= counterState.step,
  setStep: (step: number) => counterState.step = step,
};

// Componente
function Counter() {
  const snap = useSnapshot(counterState);
  
  return (
    <div>
      <p>Count: {snap.count}</p>
      <p>Step: {snap.step}</p>
      <button onClick={actions.increment}>+{snap.step}</button>
      <button onClick={actions.decrement}>-{snap.step}</button>
    </div>
  );
}

// Subscribe to changes
subscribe(counterState, () => {
  console.log('Counter changed:', counterState);
});`}
          />
        </DemoSection>
      </div>
    </div>
  );
}