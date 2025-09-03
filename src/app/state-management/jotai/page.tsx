'use client';

import React, { Suspense } from 'react';
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { atomWithStorage, atomWithReset, RESET } from 'jotai/utils';
import { DemoCardStatic } from '@/components/DemoCardStatic';
import { DemoSection } from '@/components/DemoSection';
import { CodeBlock } from '@/components/CodeBlock';

// Basic atoms
const countAtom = atom(0);
const nameAtom = atom('João');

// Derived atom
const doubleCountAtom = atom((get) => get(countAtom) * 2);

// Writable derived atom
const incrementAtom = atom(
  (get) => get(countAtom),
  (get, set, increment: number) => set(countAtom, get(countAtom) + increment)
);

// Atom with storage
const themeAtom = atomWithStorage('theme', 'light');

// Atom with reset
const resetableCountAtom = atomWithReset(0);

// Async atom
const userAtom = atom(async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { id: 1, name: 'Maria Silva', email: 'maria@example.com' };
});

// Todo atoms
const todosAtom = atom([
  { id: 1, text: 'Aprender Jotai', completed: false },
  { id: 2, text: 'Criar aplicação', completed: true },
]);

const addTodoAtom = atom(
  null,
  (get, set, text: string) => {
    const todos = get(todosAtom);
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };
    set(todosAtom, [...todos, newTodo]);
  }
);

const toggleTodoAtom = atom(
  null,
  (get, set, id: number) => {
    const todos = get(todosAtom);
    set(todosAtom, todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }
);

// Components
function BasicCounter() {
  const [count, setCount] = useAtom(countAtom);
  const doubleCount = useAtomValue(doubleCountAtom);
  const increment = useSetAtom(incrementAtom);

  return (
    <div className="space-y-4">
      <div className="text-center">
        <p className="text-2xl font-bold">Count: {count}</p>
        <p className="text-lg text-gray-600">Double: {doubleCount}</p>
      </div>
      <div className="flex gap-2 justify-center">
        <button
          onClick={() => setCount(c => c + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          +1
        </button>
        <button
          onClick={() => increment(5)}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          +5
        </button>
        <button
          onClick={() => setCount(0)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

function NameEditor() {
  const [name, setName] = useAtom(nameAtom);

  return (
    <div className="space-y-4">
      <div className="text-center">
        <p className="text-xl">Olá, <span className="font-bold">{name}</span>!</p>
      </div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Digite seu nome"
      />
    </div>
  );
}

function ThemeToggle() {
  const [theme, setTheme] = useAtom(themeAtom);

  return (
    <div className="space-y-4">
      <div className="text-center">
        <p className="text-lg">Tema atual: <span className="font-bold capitalize">{theme}</span></p>
      </div>
      <div className="flex gap-2 justify-center">
        <button
          onClick={() => setTheme('light')}
          className={`px-4 py-2 rounded ${
            theme === 'light' 
              ? 'bg-yellow-500 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          ☀️ Light
        </button>
        <button
          onClick={() => setTheme('dark')}
          className={`px-4 py-2 rounded ${
            theme === 'dark' 
              ? 'bg-gray-800 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          🌙 Dark
        </button>
      </div>
    </div>
  );
}

function ResetableCounter() {
  const [count, setCount] = useAtom(resetableCountAtom);

  return (
    <div className="space-y-4">
      <div className="text-center">
        <p className="text-2xl font-bold">Resetable Count: {count}</p>
      </div>
      <div className="flex gap-2 justify-center">
        <button
          onClick={() => setCount(c => c + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Increment
        </button>
        <button
          onClick={() => setCount(RESET)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

function AsyncUser() {
  const user = useAtomValue(userAtom);

  return (
    <div className="text-center space-y-2">
      <h3 className="text-lg font-semibold">Usuário Carregado:</h3>
      <div className="bg-gray-50 p-4 rounded-lg">
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Nome:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
    </div>
  );
}

function TodoApp() {
  const todos = useAtomValue(todosAtom);
  const addTodo = useSetAtom(addTodoAtom);
  const toggleTodo = useSetAtom(toggleTodoAtom);
  const [newTodo, setNewTodo] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      addTodo(newTodo.trim());
      setNewTodo('');
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Nova tarefa..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Adicionar
        </button>
      </form>
      
      <div className="space-y-2">
        {todos.map(todo => (
          <div
            key={todo.id}
            className={`flex items-center gap-2 p-2 rounded ${
              todo.completed ? 'bg-green-50 text-green-800' : 'bg-gray-50'
            }`}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="w-4 h-4"
            />
            <span className={todo.completed ? 'line-through' : ''}>
              {todo.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function JotaiPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Jotai - Atomic State Management
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Jotai oferece gerenciamento de estado atômico e bottom-up para React. 
            Cada átomo é uma unidade independente de estado que pode ser composta para formar estados complexos.
          </p>
        </div>

        <DemoSection title="Conceitos Fundamentais">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <DemoCardStatic title="Atoms" description="Unidades básicas de estado">
              <CodeBlock
                language="typescript"
                code={`// Atom básico
const countAtom = atom(0);

// Atom derivado (read-only)
const doubleCountAtom = atom((get) => get(countAtom) * 2);

// Atom derivado (read-write)
const incrementAtom = atom(
  (get) => get(countAtom),
  (get, set, increment: number) => 
    set(countAtom, get(countAtom) + increment)
);`}
              />
            </DemoCardStatic>

            <DemoCardStatic title="Hooks" description="Interagindo com atoms">
              <CodeBlock
                language="typescript"
                code={`// Ler e escrever
const [count, setCount] = useAtom(countAtom);

// Apenas ler
const count = useAtomValue(countAtom);

// Apenas escrever
const setCount = useSetAtom(countAtom);`}
              />
            </DemoCardStatic>
          </div>
        </DemoSection>

        <DemoSection title="Exemplos Práticos">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <DemoCardStatic title="Contador Básico" description="Atom simples com derivação">
              <BasicCounter />
            </DemoCardStatic>

            <DemoCardStatic title="Editor de Nome" description="Atom de string">
              <NameEditor />
            </DemoCardStatic>

            <DemoCardStatic title="Tema Persistente" description="Atom com localStorage">
              <ThemeToggle />
            </DemoCardStatic>

            <DemoCardStatic title="Contador Resetável" description="Atom com reset utility">
              <ResetableCounter />
            </DemoCardStatic>
          </div>
        </DemoSection>

        <DemoSection title="Recursos Avançados">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <DemoCardStatic title="Async Atom" description="Carregamento assíncrono">
              <Suspense fallback={<div className="text-center py-4">Carregando usuário...</div>}>
                <AsyncUser />
              </Suspense>
            </DemoCardStatic>

            <DemoCardStatic title="Todo App" description="Múltiplos atoms trabalhando juntos">
              <TodoApp />
            </DemoCardStatic>
          </div>
        </DemoSection>

        <DemoSection title="Vantagens do Jotai">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">🔬 Atomic</h3>
              <p className="text-blue-800">
                Estado granular e composável. Cada atom é independente e pode ser usado isoladamente.
              </p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-green-900 mb-2">⚡ Performance</h3>
              <p className="text-green-800">
                Re-renders otimizados. Componentes só re-renderizam quando os atoms que usam mudam.
              </p>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">🧩 Composição</h3>
              <p className="text-purple-800">
                Atoms podem ser facilmente compostos para criar estados complexos sem boilerplate.
              </p>
            </div>
          </div>
        </DemoSection>

        <DemoSection title="Código dos Exemplos">
          <CodeBlock
            language="typescript"
            code={`// Atoms básicos
const countAtom = atom(0);
const nameAtom = atom('João');

// Atom derivado
const doubleCountAtom = atom((get) => get(countAtom) * 2);

// Atom com storage
const themeAtom = atomWithStorage('theme', 'light');

// Atom async
const userAtom = atom(async () => {
  const response = await fetch('/api/user');
  return response.json();
});

// Componente usando atoms
function Counter() {
  const [count, setCount] = useAtom(countAtom);
  const doubleCount = useAtomValue(doubleCountAtom);
  
  return (
    <div>
      <p>Count: {count}</p>
      <p>Double: {doubleCount}</p>
      <button onClick={() => setCount(c => c + 1)}>
        Increment
      </button>
    </div>
  );
}`}
          />
        </DemoSection>
      </div>
    </div>
  );
}