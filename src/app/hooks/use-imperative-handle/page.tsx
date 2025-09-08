'use client';

import { useRef, useImperativeHandle, forwardRef, useState } from 'react';
import CodeBlock from '@/components/CodeBlock';
import DemoSection from '@/components/DemoSection';

// Interface para o componente Input customizado
interface CustomInputHandle {
  focus: () => void;
  clear: () => void;
  getValue: () => string;
  setValue: (value: string) => void;
  select: () => void;
}

// Componente Input customizado com useImperativeHandle
const CustomInput = forwardRef<CustomInputHandle, { placeholder?: string; className?: string }>(
  ({ placeholder, className }, ref) => {
    const [value, setValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current?.focus();
      },
      clear: () => {
        setValue('');
        inputRef.current?.focus();
      },
      getValue: () => {
        return value;
      },
      setValue: (newValue: string) => {
        setValue(newValue);
      },
      select: () => {
        inputRef.current?.select();
      }
    }), [value]);

    return (
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className={className || "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"}
      />
    );
  }
);

CustomInput.displayName = 'CustomInput';

// Interface para o componente Modal
interface ModalHandle {
  open: () => void;
  close: () => void;
  toggle: () => void;
  isOpen: () => boolean;
}

// Componente Modal com useImperativeHandle
const Modal = forwardRef<ModalHandle, { title: string; children: React.ReactNode }>(
  ({ title, children }, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    useImperativeHandle(ref, () => ({
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      toggle: () => setIsOpen(prev => !prev),
      isOpen: () => isOpen
    }));

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ✕
            </button>
          </div>
          <div className="text-gray-600 dark:text-gray-300">
            {children}
          </div>
        </div>
      </div>
    );
  }
);

Modal.displayName = 'Modal';

// Interface para o componente Counter
interface CounterHandle {
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  getValue: () => number;
  setValue: (value: number) => void;
}

// Componente Counter com useImperativeHandle
const Counter = forwardRef<CounterHandle, { initialValue?: number; step?: number }>(
  ({ initialValue = 0, step = 1 }, ref) => {
    const [count, setCount] = useState(initialValue);

    useImperativeHandle(ref, () => ({
      increment: () => setCount(prev => prev + step),
      decrement: () => setCount(prev => prev - step),
      reset: () => setCount(initialValue),
      getValue: () => count,
      setValue: (value: number) => setCount(value)
    }), [step, initialValue]);

    return (
      <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg border">
        <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4">
          {count}
        </div>
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => setCount(prev => prev - step)}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            -{step}
          </button>
          <button
            onClick={() => setCount(prev => prev + step)}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            +{step}
          </button>
          <button
            onClick={() => setCount(initialValue)}
            className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    );
  }
);

Counter.displayName = 'Counter';

// Demonstração do Custom Input
function CustomInputDemo() {
  const inputRef = useRef<CustomInputHandle>(null);
  const [log, setLog] = useState<string[]>([]);

  const addToLog = (message: string) => {
    setLog(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const handleFocus = () => {
    inputRef.current?.focus();
    addToLog('Input focado');
  };

  const handleClear = () => {
    inputRef.current?.clear();
    addToLog('Input limpo');
  };

  const handleGetValue = () => {
    const value = inputRef.current?.getValue();
    addToLog(`Valor obtido: "${value}"`);
  };

  const handleSetValue = () => {
    const newValue = `Valor definido em ${new Date().toLocaleTimeString()}`;
    inputRef.current?.setValue(newValue);
    addToLog(`Valor definido: "${newValue}"`);
  };

  const handleSelect = () => {
    inputRef.current?.select();
    addToLog('Texto selecionado');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <CustomInput
          ref={inputRef}
          placeholder="Digite algo aqui..."
        />
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          <button
            onClick={handleFocus}
            className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
          >
            Focus
          </button>
          <button
            onClick={handleClear}
            className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
          >
            Clear
          </button>
          <button
            onClick={handleGetValue}
            className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm"
          >
            Get Value
          </button>
          <button
            onClick={handleSetValue}
            className="px-3 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors text-sm"
          >
            Set Value
          </button>
          <button
            onClick={handleSelect}
            className="px-3 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors text-sm"
          >
            Select
          </button>
        </div>
      </div>

      {log.length > 0 && (
        <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Log de Ações:</h4>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {log.slice(-5).map((entry, index) => (
              <div key={index} className="text-sm text-gray-600 dark:text-gray-300 font-mono">
                {entry}
              </div>
            ))}
          </div>
          <button
            onClick={() => setLog([])}
            className="mt-2 px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors"
          >
            Limpar Log
          </button>
        </div>
      )}
    </div>
  );
}

// Demonstração do Modal
function ModalDemo() {
  const modalRef = useRef<ModalHandle>(null);
  const [status, setStatus] = useState('');

  const handleOpen = () => {
    modalRef.current?.open();
    setStatus('Modal aberto');
  };

  const handleClose = () => {
    modalRef.current?.close();
    setStatus('Modal fechado');
  };

  const handleToggle = () => {
    modalRef.current?.toggle();
    const isOpen = modalRef.current?.isOpen();
    setStatus(isOpen ? 'Modal aberto (toggle)' : 'Modal fechado (toggle)');
  };

  const checkStatus = () => {
    const isOpen = modalRef.current?.isOpen();
    setStatus(`Modal está ${isOpen ? 'aberto' : 'fechado'}`);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <button
          onClick={handleOpen}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Abrir Modal
        </button>
        <button
          onClick={handleClose}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Fechar Modal
        </button>
        <button
          onClick={handleToggle}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
        >
          Toggle Modal
        </button>
        <button
          onClick={checkStatus}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          Check Status
        </button>
      </div>

      {status && (
        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-lg">
          Status: {status}
        </div>
      )}

      <Modal ref={modalRef} title="Modal Controlado">
        <p className="mb-4">
          Este modal é controlado externamente usando useImperativeHandle.
          O componente pai pode abrir, fechar, alternar e verificar o status do modal.
        </p>
        <p>
          Isso demonstra como expor uma API customizada para componentes filhos.
        </p>
      </Modal>
    </div>
  );
}

// Demonstração de múltiplos contadores
function MultipleCountersDemo() {
  const counter1Ref = useRef<CounterHandle>(null);
  const counter2Ref = useRef<CounterHandle>(null);
  const counter3Ref = useRef<CounterHandle>(null);
  const [syncValue, setSyncValue] = useState(0);

  const syncAllCounters = () => {
    counter1Ref.current?.setValue(syncValue);
    counter2Ref.current?.setValue(syncValue);
    counter3Ref.current?.setValue(syncValue);
  };

  const resetAllCounters = () => {
    counter1Ref.current?.reset();
    counter2Ref.current?.reset();
    counter3Ref.current?.reset();
  };

  const incrementAllCounters = () => {
    counter1Ref.current?.increment();
    counter2Ref.current?.increment();
    counter3Ref.current?.increment();
  };

  const getSum = () => {
    const value1 = counter1Ref.current?.getValue() || 0;
    const value2 = counter2Ref.current?.getValue() || 0;
    const value3 = counter3Ref.current?.getValue() || 0;
    return value1 + value2 + value3;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Counter 1 (step: 1)</h4>
          <Counter ref={counter1Ref} initialValue={0} step={1} />
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Counter 2 (step: 5)</h4>
          <Counter ref={counter2Ref} initialValue={10} step={5} />
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Counter 3 (step: 10)</h4>
          <Counter ref={counter3Ref} initialValue={100} step={10} />
        </div>
      </div>

      <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
        <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Controles Globais</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={syncValue}
              onChange={(e) => setSyncValue(parseInt(e.target.value) || 0)}
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              placeholder="Valor para sincronizar"
            />
            <button
              onClick={syncAllCounters}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Sincronizar
            </button>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={incrementAllCounters}
              className="flex-1 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              +1 Todos
            </button>
            <button
              onClick={resetAllCounters}
              className="flex-1 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Reset Todos
            </button>
          </div>
        </div>
        
        <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
          <div className="text-lg font-semibold text-gray-800 dark:text-white">
            Soma Total: <span className="text-blue-600 dark:text-blue-400">{getSum()}</span>
          </div>
          <button
            onClick={() => alert(`Soma atual: ${getSum()}`)}
            className="mt-2 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
          >
            Mostrar Soma
          </button>
        </div>
      </div>
    </div>
  );
}

export default function UseImperativeHandlePage() {
  const basicCode = `// useImperativeHandle básico
import { useImperativeHandle, forwardRef, useRef, useState } from 'react';

interface CustomInputHandle {
  focus: () => void;
  clear: () => void;
  getValue: () => string;
}

const CustomInput = forwardRef<CustomInputHandle, {}>((props, ref) => {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    },
    clear: () => {
      setValue('');
    },
    getValue: () => {
      return value;
    }
  }), [value]);

  return (
    <input
      ref={inputRef}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
});

// Uso do componente
function Parent() {
  const inputRef = useRef<CustomInputHandle>(null);
  
  return (
    <div>
      <CustomInput ref={inputRef} />
      <button onClick={() => inputRef.current?.focus()}>Focus</button>
      <button onClick={() => inputRef.current?.clear()}>Clear</button>
    </div>
  );
}`;

  const modalCode = `// Modal com useImperativeHandle
interface ModalHandle {
  open: () => void;
  close: () => void;
  toggle: () => void;
  isOpen: () => boolean;
}

const Modal = forwardRef<ModalHandle, { children: React.ReactNode }>(
  ({ children }, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    useImperativeHandle(ref, () => ({
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      toggle: () => setIsOpen(prev => !prev),
      isOpen: () => isOpen
    }));

    if (!isOpen) return null;

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          {children}
          <button onClick={() => setIsOpen(false)}>Close</button>
        </div>
      </div>
    );
  }
);

// Uso
function App() {
  const modalRef = useRef<ModalHandle>(null);
  
  return (
    <div>
      <button onClick={() => modalRef.current?.open()}>Open Modal</button>
      <Modal ref={modalRef}>
        <p>Modal content</p>
      </Modal>
    </div>
  );
}`;

  const counterCode = `// Counter com API customizada
interface CounterHandle {
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  getValue: () => number;
  setValue: (value: number) => void;
}

const Counter = forwardRef<CounterHandle, { initialValue?: number }>(
  ({ initialValue = 0 }, ref) => {
    const [count, setCount] = useState(initialValue);

    useImperativeHandle(ref, () => ({
      increment: () => setCount(prev => prev + 1),
      decrement: () => setCount(prev => prev - 1),
      reset: () => setCount(initialValue),
      getValue: () => count,
      setValue: (value: number) => setCount(value)
    }), [initialValue]);

    return (
      <div>
        <p>Count: {count}</p>
        <button onClick={() => setCount(prev => prev + 1)}>+</button>
        <button onClick={() => setCount(prev => prev - 1)}>-</button>
      </div>
    );
  }
);

// Controle externo
function CounterController() {
  const counterRef = useRef<CounterHandle>(null);
  
  const syncCounters = () => {
    const value = counterRef.current?.getValue() || 0;
    // Sincronizar com outros contadores
  };
  
  return (
    <div>
      <Counter ref={counterRef} />
      <button onClick={() => counterRef.current?.reset()}>Reset</button>
      <button onClick={syncCounters}>Sync</button>
    </div>
  );
}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
            useImperativeHandle
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Demonstração do useImperativeHandle Hook - customize a instância exposta por ref para componentes filhos.
          </p>
        </div>

        <div className="space-y-12">
          <DemoSection title="Custom Input com API Personalizada">
            <CustomInputDemo />
          </DemoSection>

          <DemoSection title="Modal Controlado Externamente">
            <ModalDemo />
          </DemoSection>

          <DemoSection title="Múltiplos Contadores Sincronizados">
            <MultipleCountersDemo />
          </DemoSection>
        </div>

        <div className="mt-16 space-y-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Input Customizado</h2>
            <CodeBlock code={basicCode} language="tsx" />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Modal Controlado</h2>
            <CodeBlock code={modalCode} language="tsx" />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Counter com API</h2>
            <CodeBlock code={counterCode} language="tsx" />
          </div>
        </div>

        <div className="mt-16 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">🎯 Quando Usar useImperativeHandle</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Casos de Uso</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Expor métodos específicos</li>
                <li>• Controle imperativo de componentes</li>
                <li>• APIs de bibliotecas</li>
                <li>• Integração com código legado</li>
                <li>• Componentes de formulário avançados</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Melhores Práticas</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Use com moderação</li>
                <li>• Prefira props quando possível</li>
                <li>• Defina interfaces TypeScript</li>
                <li>• Documente a API exposta</li>
                <li>• Considere alternativas declarativas</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}