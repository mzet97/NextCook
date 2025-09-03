'use client';

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { subscribeWithSelector } from 'zustand/middleware';
import { useState } from 'react';
import CodeBlock from '@/components/CodeBlock';

// Singleton Pattern - Single instance store
interface SingletonState {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

const useSingletonStore = create<SingletonState>()((
  devtools(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 })),
      decrement: () => set((state) => ({ count: state.count - 1 })),
      reset: () => set({ count: 0 })
    }),
    { name: 'singleton-store' }
  )
));

// Observer Pattern - Multiple subscribers
interface ObserverState {
  notifications: string[];
  addNotification: (message: string) => void;
  clearNotifications: () => void;
}

const useObserverStore = create<ObserverState>()((
  subscribeWithSelector(
    devtools(
      (set) => ({
        notifications: [],
        addNotification: (message: string) => 
          set((state) => ({ 
            notifications: [...state.notifications, `${new Date().toLocaleTimeString()}: ${message}`] 
          })),
        clearNotifications: () => set({ notifications: [] })
      }),
      { name: 'observer-store' }
    )
  )
));

// Factory Pattern - Dynamic store creation
interface FactoryState {
  id: string;
  data: Record<string, unknown>;
  updateData: (newData: Record<string, unknown>) => void;
}

const createFactoryStore = (id: string, initialData: Record<string, unknown> = {}) => {
  return create<FactoryState>()((
    devtools(
      (set) => ({
        id,
        data: initialData,
        updateData: (newData: Record<string, unknown>) => set({ data: { ...newData } })
      }),
      { name: `factory-store-${id}` }
    )
  ));
};

// Strategy Pattern - Different behaviors
interface StrategyState {
  strategy: 'add' | 'multiply' | 'subtract';
  value: number;
  setStrategy: (strategy: 'add' | 'multiply' | 'subtract') => void;
  execute: (operand: number) => void;
  reset: () => void;
}

const useStrategyStore = create<StrategyState>()((
  immer(
    devtools(
      (set) => ({
        strategy: 'add',
        value: 0,
        setStrategy: (strategy) => set((state) => {
          state.strategy = strategy;
        }),
        execute: (operand: number) => set((state) => {
          switch (state.strategy) {
            case 'add':
              state.value += operand;
              break;
            case 'multiply':
              state.value *= operand;
              break;
            case 'subtract':
              state.value -= operand;
              break;
          }
        }),
        reset: () => set((state) => {
          state.value = 0;
        })
      }),
      { name: 'strategy-store' }
    )
  )
));

// Command Pattern - Action queue
interface Command {
  id: string;
  type: string;
  payload: string;
  timestamp: number;
}

interface CommandState {
  commands: Command[];
  history: Command[];
  addCommand: (type: string, payload: string) => void;
  executeCommand: (id: string) => void;
  undoLastCommand: () => void;
  clearCommands: () => void;
}

const useCommandStore = create<CommandState>()((
  persist(
    devtools(
      (set, get) => ({
        commands: [],
        history: [],
        addCommand: (type: string, payload: string) => {
          const command: Command = {
            id: Math.random().toString(36).substr(2, 9),
            type,
            payload,
            timestamp: Date.now()
          };
          set((state) => ({
            commands: [...state.commands, command]
          }));
        },
        executeCommand: (id: string) => {
          const state = get();
          const command = state.commands.find(cmd => cmd.id === id);
          if (command) {
            set((state) => ({
              commands: state.commands.filter(cmd => cmd.id !== id),
              history: [...state.history, command]
            }));
          }
        },
        undoLastCommand: () => {
          const state = get();
          const lastCommand = state.history[state.history.length - 1];
          if (lastCommand) {
            set((state) => ({
              history: state.history.slice(0, -1),
              commands: [...state.commands, lastCommand]
            }));
          }
        },
        clearCommands: () => set({ commands: [], history: [] })
      }),
      { name: 'command-store' }
    ),
    { name: 'command-pattern-storage' }
  )
));

// Components
function SingletonDemo() {
  const { count, increment, decrement, reset } = useSingletonStore();

  return (
    <div className="p-6 border rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Singleton Pattern</h3>
      <p className="text-sm text-gray-600 mb-4">
        Uma única instância da store é compartilhada em toda a aplicação.
      </p>
      <div className="flex items-center gap-4 mb-4">
        <span className="text-2xl font-bold">{count}</span>
        <div className="flex gap-2">
          <button 
            onClick={increment}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            +
          </button>
          <button 
            onClick={decrement}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            -
          </button>
          <button 
            onClick={reset}
            className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

function ObserverDemo() {
  const { notifications, addNotification, clearNotifications } = useObserverStore();
  const [message, setMessage] = useState('');
  const handleAddNotification = () => {
    if (message.trim()) {
      addNotification(message);
      setMessage('');
    }
  };

  return (
    <div className="p-6 border rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Observer Pattern</h3>
      <p className="text-sm text-gray-600 mb-4">
        Múltiplos componentes podem observar e reagir a mudanças na store.
      </p>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Digite uma notificação"
          className="flex-1 px-3 py-2 border rounded"
          onKeyPress={(e) => e.key === 'Enter' && handleAddNotification()}
        />
        <button 
          onClick={handleAddNotification}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Adicionar
        </button>
        <button 
          onClick={clearNotifications}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Limpar
        </button>
      </div>
      <div className="max-h-32 overflow-y-auto">
        {notifications.map((notification, index) => (
          <div key={index} className="p-2 bg-gray-100 rounded mb-1 text-sm">
            {notification}
          </div>
        ))}
      </div>
    </div>
  );
}

function FactoryDemo() {
  const [stores] = useState(() => ({
    user: createFactoryStore('user', { name: 'João', age: 30 }),
    product: createFactoryStore('product', { title: 'Produto A', price: 100 })
  }));
  const userData = stores.user();
  const productData = stores.product();

  return (
    <div className="p-6 border rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Factory Pattern</h3>
      <p className="text-sm text-gray-600 mb-4">
        Criação dinâmica de stores com diferentes configurações.
      </p>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium mb-2">User Store</h4>
          <div className="text-sm mb-2">
            <strong>Nome:</strong> {userData.data.name}<br/>
            <strong>Idade:</strong> {userData.data.age}
          </div>
          <button 
            onClick={() => userData.updateData({ 
              name: 'Maria', 
              age: Math.floor(Math.random() * 50) + 20 
            })}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
          >
            Atualizar User
          </button>
        </div>
        <div>
          <h4 className="font-medium mb-2">Product Store</h4>
          <div className="text-sm mb-2">
            <strong>Título:</strong> {productData.data.title}<br/>
            <strong>Preço:</strong> R$ {productData.data.price}
          </div>
          <button 
            onClick={() => productData.updateData({ 
              title: 'Produto B', 
              price: Math.floor(Math.random() * 500) + 50 
            })}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
          >
            Atualizar Product
          </button>
        </div>
      </div>
    </div>
  );
}

function StrategyDemo() {
  const { strategy, value, setStrategy, execute, reset } = useStrategyStore();
  const [operand, setOperand] = useState(5);

  return (
    <div className="p-6 border rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Strategy Pattern</h3>
      <p className="text-sm text-gray-600 mb-4">
        Diferentes estratégias de cálculo podem ser aplicadas dinamicamente.
      </p>
      <div className="flex items-center gap-4 mb-4">
        <span className="text-2xl font-bold">Valor: {value}</span>
        <button 
          onClick={reset}
          className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Reset
        </button>
      </div>
      <div className="flex gap-2 mb-4">
        {(['add', 'multiply', 'subtract'] as const).map((strat) => (
          <button
            key={strat}
            onClick={() => setStrategy(strat)}
            className={`px-3 py-1 rounded ${
              strategy === strat 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {strat === 'add' ? 'Somar' : strat === 'multiply' ? 'Multiplicar' : 'Subtrair'}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={operand}
          onChange={(e) => setOperand(Number(e.target.value))}
          className="w-20 px-2 py-1 border rounded"
        />
        <button 
          onClick={() => execute(operand)}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Executar {strategy === 'add' ? 'Soma' : strategy === 'multiply' ? 'Multiplicação' : 'Subtração'}
        </button>
      </div>
    </div>
  );
}

function CommandDemo() {
  const { commands, history, addCommand, executeCommand, undoLastCommand, clearCommands } = useCommandStore();
  const [commandType, setCommandType] = useState('create');
  const [payload, setPayload] = useState('');


  const handleAddCommand = () => {
    if (payload.trim()) {
      addCommand(commandType, payload);
      setPayload('');
    }
  };

  return (
    <div className="p-6 border rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Command Pattern</h3>
      <p className="text-sm text-gray-600 mb-4">
        Encapsula ações como objetos, permitindo desfazer, enfileirar e registrar operações.
      </p>
      
      <div className="flex gap-2 mb-4">
        <select 
          value={commandType} 
          onChange={(e) => setCommandType(e.target.value)}
          className="px-3 py-2 border rounded"
        >
          <option value="create">Criar</option>
          <option value="update">Atualizar</option>
          <option value="delete">Deletar</option>
        </select>
        <input
          type="text"
          value={payload}
          onChange={(e) => setPayload(e.target.value)}
          placeholder="Dados do comando"
          className="flex-1 px-3 py-2 border rounded"
          onKeyPress={(e) => e.key === 'Enter' && handleAddCommand()}
        />
        <button 
          onClick={handleAddCommand}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Adicionar
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        <button 
          onClick={undoLastCommand}
          disabled={history.length === 0}
          className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:bg-gray-300"
        >
          Desfazer
        </button>
        <button 
          onClick={clearCommands}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Limpar Tudo
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium mb-2">Comandos Pendentes ({commands.length})</h4>
          <div className="max-h-32 overflow-y-auto">
            {commands.map((command) => (
              <div key={command.id} className="flex justify-between items-center p-2 bg-gray-100 rounded mb-1 text-sm">
                <span>{command.type}: {command.payload}</span>
                <button 
                  onClick={() => executeCommand(command.id)}
                  className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs"
                >
                  Executar
                </button>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-medium mb-2">Histórico ({history.length})</h4>
          <div className="max-h-32 overflow-y-auto">
            {history.map((command) => (
              <div key={command.id} className="p-2 bg-green-100 rounded mb-1 text-sm">
                ✓ {command.type}: {command.payload}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ZustandPatternsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Zustand Design Patterns</h1>
          <p className="text-gray-600 mb-6">
            Demonstrações de padrões de design clássicos implementados com Zustand.
            Cada padrão mostra como o Zustand pode ser usado para resolver problemas
            específicos de gerenciamento de estado.
          </p>
        </div>

        <div className="grid gap-8">
          <SingletonDemo />
          <ObserverDemo />
          <FactoryDemo />
          <StrategyDemo />
          <CommandDemo />
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Código dos Padrões</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">1. Singleton Pattern</h3>
              <CodeBlock code={`// Singleton Pattern - Single instance store
interface SingletonState {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

const useSingletonStore = create<SingletonState>()((
  devtools(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 })),
      decrement: () => set((state) => ({ count: state.count - 1 })),
      reset: () => set({ count: 0 })
    }),
    { name: 'singleton-store' }
  )
));`} />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">2. Observer Pattern</h3>
              <CodeBlock code={`// Observer Pattern - Multiple subscribers
const useObserverStore = create<ObserverState>()((
  subscribeWithSelector(
    devtools(
      (set) => ({
        notifications: [],
        addNotification: (message: string) => 
          set((state) => ({ 
            notifications: [...state.notifications, message] 
          })),
        clearNotifications: () => set({ notifications: [] })
      }),
      { name: 'observer-store' }
    )
  )
));`} />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">3. Factory Pattern</h3>
              <CodeBlock code={`// Factory Pattern - Dynamic store creation
const createFactoryStore = (id: string, initialData: Record<string, unknown> = {}) => {
  return create<FactoryState>()((
    devtools(
      (set) => ({
        id,
        data: initialData,
        updateData: (newData: Record<string, unknown>) => set({ data: { ...newData } })
      }),
      { name: \`factory-store-\${id}\` }
    )
  ));
};`} />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">4. Strategy Pattern</h3>
              <CodeBlock code={`// Strategy Pattern - Different behaviors
const useStrategyStore = create<StrategyState>()((
  immer(
    devtools(
      (set) => ({
        strategy: 'add',
        value: 0,
        setStrategy: (strategy) => set((state) => {
          state.strategy = strategy;
        }),
        execute: (operand: number) => set((state) => {
          switch (state.strategy) {
            case 'add':
              state.value += operand;
              break;
            case 'multiply':
              state.value *= operand;
              break;
            case 'subtract':
              state.value -= operand;
              break;
          }
        })
      }),
      { name: 'strategy-store' }
    )
  )
));`} />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">5. Command Pattern</h3>
              <CodeBlock code={`// Command Pattern - Action queue
const useCommandStore = create<CommandState>()((
  persist(
    devtools(
      (set, get) => ({
        commands: [],
        history: [],
        addCommand: (type: string, payload: string) => {
          const command = {
            id: Math.random().toString(36).substr(2, 9),
            type,
            payload,
            timestamp: Date.now()
          };
          set((state) => ({
            commands: [...state.commands, command]
          }));
        },
        executeCommand: (id: string) => {
          const state = get();
          const command = state.commands.find(cmd => cmd.id === id);
          if (command) {
            set((state) => ({
              commands: state.commands.filter(cmd => cmd.id !== id),
              history: [...state.history, command]
            }));
          }
        }
      }),
      { name: 'command-store' }
    ),
    { name: 'command-pattern-storage' }
  )
));`} />
            </div>
          </div>
        </div>

        <div className="mt-12 p-6 bg-blue-50 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Resumo dos Padrões</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-semibold mb-2">🔄 Singleton</h3>
              <p>Uma única instância compartilhada globalmente.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">👁️ Observer</h3>
              <p>Múltiplos observadores reagem a mudanças.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">🏭 Factory</h3>
              <p>Criação dinâmica de stores configuráveis.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">🎯 Strategy</h3>
              <p>Algoritmos intercambiáveis em runtime.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">⚡ Command</h3>
              <p>Encapsula ações como objetos executáveis.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}