'use client';

import { useReducer, useState } from 'react';
import CodeBlock from '@/components/CodeBlock';
import DemoSection from '@/components/DemoSection';

// Tipos para o contador
interface CounterState {
  count: number;
  step: number;
}

type CounterAction = 
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'reset' }
  | { type: 'set_step'; payload: number }
  | { type: 'set_count'; payload: number };

// Reducer para contador
function counterReducer(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + state.step };
    case 'decrement':
      return { ...state, count: state.count - state.step };
    case 'reset':
      return { ...state, count: 0 };
    case 'set_step':
      return { ...state, step: action.payload };
    case 'set_count':
      return { ...state, count: action.payload };
    default:
      return state;
  }
}

// Tipos para lista de tarefas
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
}

type TodoAction = 
  | { type: 'add_todo'; payload: string }
  | { type: 'toggle_todo'; payload: number }
  | { type: 'delete_todo'; payload: number }
  | { type: 'set_filter'; payload: 'all' | 'active' | 'completed' }
  | { type: 'clear_completed' };

// Reducer para lista de tarefas
function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case 'add_todo':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            text: action.payload,
            completed: false
          }
        ]
      };
    case 'toggle_todo':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    case 'delete_todo':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
    case 'set_filter':
      return {
        ...state,
        filter: action.payload
      };
    case 'clear_completed':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed)
      };
    default:
      return state;
  }
}

// Tipos para formulário complexo
interface FormState {
  name: string;
  email: string;
  age: number;
  interests: string[];
  errors: Record<string, string>;
  isSubmitting: boolean;
}

type FormAction = 
  | { type: 'set_field'; field: keyof FormState; value: any }
  | { type: 'set_error'; field: string; error: string }
  | { type: 'clear_errors' }
  | { type: 'set_submitting'; value: boolean }
  | { type: 'reset_form' };

// Reducer para formulário
function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'set_field':
      return {
        ...state,
        [action.field]: action.value,
        errors: { ...state.errors, [action.field]: '' }
      };
    case 'set_error':
      return {
        ...state,
        errors: { ...state.errors, [action.field]: action.error }
      };
    case 'clear_errors':
      return { ...state, errors: {} };
    case 'set_submitting':
      return { ...state, isSubmitting: action.value };
    case 'reset_form':
      return {
        name: '',
        email: '',
        age: 0,
        interests: [],
        errors: {},
        isSubmitting: false
      };
    default:
      return state;
  }
}

export default function UseReducerPage() {
  // Contador com useReducer
  const [counterState, counterDispatch] = useReducer(counterReducer, {
    count: 0,
    step: 1
  });

  // Lista de tarefas com useReducer
  const [todoState, todoDispatch] = useReducer(todoReducer, {
    todos: [],
    filter: 'all'
  });
  const [newTodo, setNewTodo] = useState('');

  // Formulário com useReducer
  const [formState, formDispatch] = useReducer(formReducer, {
    name: '',
    email: '',
    age: 0,
    interests: [],
    errors: {},
    isSubmitting: false
  });

  // Filtrar todos
  const filteredTodos = todoState.todos.filter(todo => {
    switch (todoState.filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  // Adicionar todo
  const addTodo = () => {
    if (newTodo.trim()) {
      todoDispatch({ type: 'add_todo', payload: newTodo.trim() });
      setNewTodo('');
    }
  };

  // Validar formulário
  const validateForm = () => {
    formDispatch({ type: 'clear_errors' });
    let isValid = true;

    if (!formState.name.trim()) {
      formDispatch({ type: 'set_error', field: 'name', error: 'Nome é obrigatório' });
      isValid = false;
    }

    if (!formState.email.includes('@')) {
      formDispatch({ type: 'set_error', field: 'email', error: 'Email inválido' });
      isValid = false;
    }

    if (formState.age < 18) {
      formDispatch({ type: 'set_error', field: 'age', error: 'Idade deve ser maior que 18' });
      isValid = false;
    }

    return isValid;
  };

  // Submeter formulário
  const submitForm = async () => {
    if (!validateForm()) return;

    formDispatch({ type: 'set_submitting', value: true });
    
    // Simular envio
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    formDispatch({ type: 'set_submitting', value: false });
    alert('Formulário enviado com sucesso!');
    formDispatch({ type: 'reset_form' });
  };

  const codeExample = `import { useReducer } from 'react';

// 1. Definir tipos
interface State {
  count: number;
  step: number;
}

type Action = 
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'set_step'; payload: number };

// 2. Criar reducer
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + state.step };
    case 'decrement':
      return { ...state, count: state.count - state.step };
    case 'set_step':
      return { ...state, step: action.payload };
    default:
      return state;
  }
}

// 3. Usar o hook
function Counter() {
  const [state, dispatch] = useReducer(reducer, {
    count: 0,
    step: 1
  });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>
        +{state.step}
      </button>
    </div>
  );
}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 dark:from-gray-900 dark:to-gray-800 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-6">
            useReducer Hook
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Hook para gerenciar estado complexo com lógica de atualização mais sofisticada, ideal para estados com múltiplas sub-valores ou quando a próxima atualização depende da anterior.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <DemoSection title="Contador Avançado">
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-4">
                  {counterState.count}
                </div>
                <div className="flex gap-2 justify-center mb-4">
                  <button
                    onClick={() => counterDispatch({ type: 'decrement' })}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    -{counterState.step}
                  </button>
                  <button
                    onClick={() => counterDispatch({ type: 'reset' })}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => counterDispatch({ type: 'increment' })}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    +{counterState.step}
                  </button>
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <label className="text-sm text-gray-600 dark:text-gray-300">Passo:</label>
                  <input
                    type="number"
                    value={counterState.step}
                    onChange={(e) => counterDispatch({ 
                      type: 'set_step', 
                      payload: parseInt(e.target.value) || 1 
                    })}
                    className="w-16 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    min="1"
                  />
                </div>
              </div>
            </div>
          </DemoSection>

          <DemoSection title="Lista de Tarefas">
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  placeholder="Nova tarefa"
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                />
                <button
                  onClick={addTodo}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Adicionar
                </button>
              </div>
              
              <div className="flex gap-2">
                {(['all', 'active', 'completed'] as const).map(filter => (
                  <button
                    key={filter}
                    onClick={() => todoDispatch({ type: 'set_filter', payload: filter })}
                    className={`px-3 py-1 rounded text-sm transition-colors ${
                      todoState.filter === filter
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'
                    }`}
                  >
                    {filter === 'all' ? 'Todas' : filter === 'active' ? 'Ativas' : 'Concluídas'}
                  </button>
                ))}
              </div>

              <div className="space-y-2 max-h-40 overflow-y-auto">
                {filteredTodos.map(todo => (
                  <div
                    key={todo.id}
                    className="flex items-center gap-2 p-2 bg-gray-100 dark:bg-gray-700 rounded"
                  >
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => todoDispatch({ type: 'toggle_todo', payload: todo.id })}
                      className="rounded"
                    />
                    <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800 dark:text-gray-200'}`}>
                      {todo.text}
                    </span>
                    <button
                      onClick={() => todoDispatch({ type: 'delete_todo', payload: todo.id })}
                      className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                ))}
                {filteredTodos.length === 0 && (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                    Nenhuma tarefa encontrada
                  </p>
                )}
              </div>

              {todoState.todos.some(todo => todo.completed) && (
                <button
                  onClick={() => todoDispatch({ type: 'clear_completed' })}
                  className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Limpar Concluídas
                </button>
              )}
            </div>
          </DemoSection>
        </div>

        <div className="mb-12">
          <DemoSection title="Formulário Complexo">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    value={formState.name}
                    onChange={(e) => formDispatch({ type: 'set_field', field: 'name', value: e.target.value })}
                    placeholder="Nome"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  {formState.errors.name && (
                    <p className="text-red-500 text-sm mt-1">{formState.errors.name}</p>
                  )}
                </div>
                
                <div>
                  <input
                    type="email"
                    value={formState.email}
                    onChange={(e) => formDispatch({ type: 'set_field', field: 'email', value: e.target.value })}
                    placeholder="Email"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  {formState.errors.email && (
                    <p className="text-red-500 text-sm mt-1">{formState.errors.email}</p>
                  )}
                </div>
                
                <div>
                  <input
                    type="number"
                    value={formState.age}
                    onChange={(e) => formDispatch({ type: 'set_field', field: 'age', value: parseInt(e.target.value) || 0 })}
                    placeholder="Idade"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  {formState.errors.age && (
                    <p className="text-red-500 text-sm mt-1">{formState.errors.age}</p>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={submitForm}
                    disabled={formState.isSubmitting}
                    className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
                  >
                    {formState.isSubmitting ? 'Enviando...' : 'Enviar'}
                  </button>
                  <button
                    onClick={() => formDispatch({ type: 'reset_form' })}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Limpar
                  </button>
                </div>
              </div>
              
              <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Estado do Formulário:</h4>
                <pre className="text-sm text-gray-600 dark:text-gray-300 overflow-x-auto">
                  {JSON.stringify(formState, null, 2)}
                </pre>
              </div>
            </div>
          </DemoSection>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Exemplo de Código</h2>
          <CodeBlock code={codeExample} language="tsx" />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">useReducer vs useState</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Use useReducer quando:</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Estado complexo com múltiplos sub-valores</li>
                <li>• Lógica de atualização complexa</li>
                <li>• Próximo estado depende do anterior</li>
                <li>• Múltiplas ações relacionadas</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Use useState quando:</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Estado simples (string, number, boolean)</li>
                <li>• Atualizações diretas</li>
                <li>• Poucos valores relacionados</li>
                <li>• Lógica simples de atualização</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}