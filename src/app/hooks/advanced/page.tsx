'use client';

import { useReducer, useMemo, useCallback, useRef, useEffect, useState } from 'react';
import CodeBlock from '@/components/CodeBlock';
import DemoSection from '@/components/DemoSection';

// Reducer para demonstração do useReducer
interface CounterState {
  count: number;
  history: number[];
}

type CounterAction = 
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'reset' }
  | { type: 'set'; payload: number };

function counterReducer(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case 'increment':
      return {
        count: state.count + 1,
        history: [...state.history, state.count + 1]
      };
    case 'decrement':
      return {
        count: state.count - 1,
        history: [...state.history, state.count - 1]
      };
    case 'reset':
      return {
        count: 0,
        history: [0]
      };
    case 'set':
      return {
        count: action.payload,
        history: [...state.history, action.payload]
      };
    default:
      return state;
  }
}

// Componente para demonstrar useReducer
function UseReducerDemo() {
  const [state, dispatch] = useReducer(counterReducer, {
    count: 0,
    history: [0]
  });

  const codeExample = `const [state, dispatch] = useReducer(counterReducer, {
  count: 0,
  history: [0]
});

function counterReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {
        count: state.count + 1,
        history: [...state.history, state.count + 1]
      };
    case 'decrement':
      return {
        count: state.count - 1,
        history: [...state.history, state.count - 1]
      };
    case 'reset':
      return { count: 0, history: [0] };
    default:
      return state;
  }
}`;

  return (
    <DemoSection title="useReducer" description="Gerenciamento de estado complexo com reducer">
      <div className="space-y-4">
        <div className="text-center">
          <div className="text-4xl font-bold text-blue-600 mb-2">{state.count}</div>
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => dispatch({ type: 'increment' })}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              +1
            </button>
            <button
              onClick={() => dispatch({ type: 'decrement' })}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              -1
            </button>
            <button
              onClick={() => dispatch({ type: 'reset' })}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Reset
            </button>
          </div>
        </div>
        <div className="text-sm text-gray-600">
          <strong>Histórico:</strong> {state.history.join(' → ')}
        </div>
        <CodeBlock code={codeExample} language="javascript" />
      </div>
    </DemoSection>
  );
}

// Componente para demonstrar useMemo
function UseMemoDemo() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState<number[]>([]);

  // Cálculo custoso que só deve ser refeito quando items mudar
  const expensiveValue = useMemo(() => {
    console.log('Calculando valor custoso...');
    return items.reduce((sum, item) => sum + item * item, 0);
  }, [items]);

  const addItem = () => {
    setItems(prev => [...prev, Math.floor(Math.random() * 100)]);
  };

  const codeExample = `const expensiveValue = useMemo(() => {
  console.log('Calculando valor custoso...');
  return items.reduce((sum, item) => sum + item * item, 0);
}, [items]); // Só recalcula quando items mudar`;

  return (
    <DemoSection title="useMemo" description="Memoização de valores computados">
      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            onClick={() => setCount(c => c + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Count: {count}
          </button>
          <button
            onClick={addItem}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Adicionar Item
          </button>
        </div>
        <div>
          <strong>Items:</strong> [{items.join(', ')}]
        </div>
        <div>
          <strong>Soma dos quadrados (memoizada):</strong> {expensiveValue}
        </div>
        <div className="text-sm text-gray-600">
          Abra o console para ver quando o cálculo é executado
        </div>
        <CodeBlock code={codeExample} language="javascript" />
      </div>
    </DemoSection>
  );
}

// Componente para demonstrar useCallback
function UseCallbackDemo() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState<string[]>([]);

  // Função memoizada que só muda quando items mudar
  const addItem = useCallback(() => {
    setItems(prev => [...prev, `Item ${prev.length + 1}`]);
  }, []);

  // Função que depende de items
  const clearItems = useCallback(() => {
    setItems([]);
  }, []);

  const codeExample = `const addItem = useCallback(() => {
  setItems(prev => [...prev, \`Item \${prev.length + 1}\`]);
}, []); // Função estável

const clearItems = useCallback(() => {
  setItems([]);
}, []); // Função estável`;

  return (
    <DemoSection title="useCallback" description="Memoização de funções">
      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            onClick={() => setCount(c => c + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Count: {count}
          </button>
          <button
            onClick={addItem}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Adicionar Item
          </button>
          <button
            onClick={clearItems}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Limpar
          </button>
        </div>
        <div>
          <strong>Items:</strong>
          <ul className="list-disc list-inside">
            {items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <CodeBlock code={codeExample} language="javascript" />
      </div>
    </DemoSection>
  );
}

// Componente para demonstrar useRef
function UseRefDemo() {
  const inputRef = useRef<HTMLInputElement>(null);
  const countRef = useRef(0);
  const [renderCount, setRenderCount] = useState(0);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const incrementRef = () => {
    countRef.current += 1;
    console.log('Ref count:', countRef.current);
  };

  useEffect(() => {
    countRef.current += 1;
  });

  const codeExample = `const inputRef = useRef(null);
const countRef = useRef(0);

const focusInput = () => {
  inputRef.current?.focus();
};

const incrementRef = () => {
  countRef.current += 1;
  console.log('Ref count:', countRef.current);
};`;

  return (
    <DemoSection title="useRef" description="Referências mutáveis e acesso ao DOM">
      <div className="space-y-4">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            placeholder="Clique em 'Focar' para focar aqui"
            className="px-3 py-2 border rounded flex-1"
          />
          <button
            onClick={focusInput}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Focar
          </button>
        </div>
        <div className="flex gap-2">
          <button
            onClick={incrementRef}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Incrementar Ref (console)
          </button>
          <button
            onClick={() => setRenderCount(c => c + 1)}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Re-render: {renderCount}
          </button>
        </div>
        <div className="text-sm text-gray-600">
          Ref count (não causa re-render): {countRef.current}
        </div>
        <CodeBlock code={codeExample} language="javascript" />
      </div>
    </DemoSection>
  );
}

export default function AdvancedHooksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🔧 Hooks Avançados
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Demonstrações práticas dos hooks avançados do React: useReducer, useMemo, useCallback e useRef
          </p>
        </div>

        <div className="grid gap-8 max-w-6xl mx-auto">
          <UseReducerDemo />
          <UseMemoDemo />
          <UseCallbackDemo />
          <UseRefDemo />
        </div>
      </div>
    </div>
  );
}