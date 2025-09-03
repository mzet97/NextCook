'use client';

import { useActionState, useTransition } from 'react';
import { useState } from 'react';
import CodeBlock from '@/components/CodeBlock';
import DemoSection from '@/components/DemoSection';

interface LoginState {
  success: boolean;
  message: string;
  user: { username: string; id: number } | null;
}

interface FormState {
  success: boolean;
  message: string;
  data?: { name: string; email: string } | null;
  errors?: { name?: string; email?: string };
}

// Simulated async actions
async function loginAction(prevState: LoginState, formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (username === 'admin' && password === 'password') {
    return {
      success: true,
      message: 'Login successful!',
      user: { username, id: 1 }
    };
  } else {
    return {
      success: false,
      message: 'Invalid credentials. Try admin/password',
      user: null
    };
  }
}

async function submitFormAction(prevState: FormState, formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  
  // Simulate validation and API call
  await new Promise(resolve => setTimeout(resolve, 800));
  
  if (!name || !email) {
    return {
      success: false,
      message: 'Name and email are required',
      errors: {
        name: !name ? 'Name is required' : '',
        email: !email ? 'Email is required' : ''
      }
    };
  }
  
  if (!email.includes('@')) {
    return {
      success: false,
      message: 'Invalid email format',
      errors: {
        email: 'Please enter a valid email'
      }
    };
  }
  
  return {
    success: true,
    message: `Form submitted successfully for ${name}!`,
    data: { name, email },
    errors: {}
  };
}

// Login Form Component
function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, {
    success: false,
    message: '',
    user: null
  });

  return (
    <div className="p-6 border rounded-lg bg-gray-50">
      <h3 className="text-lg font-semibold mb-4">Login Form with useActionState</h3>
      
      <form action={formAction} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Try: admin"
            disabled={isPending}
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Try: password"
            disabled={isPending}
          />
        </div>
        
        <button
          type="submit"
          disabled={isPending}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? 'Logging in...' : 'Login'}
        </button>
      </form>
      
      {state.message && (
        <div className={`mt-4 p-3 rounded-md ${
          state.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {state.message}
        </div>
      )}
      
      {state.user && (
        <div className="mt-4 p-3 bg-blue-100 text-blue-800 rounded-md">
          Welcome, {state.user.username}! (ID: {state.user.id})
        </div>
      )}
    </div>
  );
}

// Contact Form Component
function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitFormAction, {
    success: false,
    message: '',
    data: null,
    errors: {}
  });

  return (
    <div className="p-6 border rounded-lg bg-gray-50">
      <h3 className="text-lg font-semibold mb-4">Contact Form with Validation</h3>
      
      <form action={formAction} className="space-y-4">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium mb-1">
            Name *
          </label>
          <input
            type="text"
            id="contact-name"
            name="name"
            className={`w-full px-3 py-2 border rounded-md ${
              state.errors?.name ? 'border-red-500' : 'border-gray-300'
            }`}
            disabled={isPending}
          />
          {state.errors?.name && (
            <p className="text-red-500 text-sm mt-1">{state.errors.name}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium mb-1">
            Email *
          </label>
          <input
            type="email"
            id="contact-email"
            name="email"
            className={`w-full px-3 py-2 border rounded-md ${
              state.errors?.email ? 'border-red-500' : 'border-gray-300'
            }`}
            disabled={isPending}
          />
          {state.errors?.email && (
            <p className="text-red-500 text-sm mt-1">{state.errors.email}</p>
          )}
        </div>
        
        <button
          type="submit"
          disabled={isPending}
          className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      
      {state.message && (
        <div className={`mt-4 p-3 rounded-md ${
          state.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {state.message}
        </div>
      )}
      
      {state.success && state.data && (
        <div className="mt-4 p-3 bg-blue-100 text-blue-800 rounded-md">
          <strong>Submitted Data:</strong>
          <pre className="mt-2 text-sm">{JSON.stringify(state.data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

// Counter with Action State
function CounterWithActionState() {
  async function incrementAction(prevState: number) {
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 300));
    return prevState + 1;
  }
  
  async function decrementAction(prevState: number) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return Math.max(0, prevState - 1);
  }
  
  async function resetAction() {
    await new Promise(resolve => setTimeout(resolve, 200));
    return 0;
  }
  
  const [count, incrementFormAction, isIncrementing] = useActionState(incrementAction, 0);
  const [, decrementFormAction, isDecrementing] = useActionState(decrementAction, count);
  const [, resetFormAction, isResetting] = useActionState(resetAction, 0);
  
  return (
    <div className="p-6 border rounded-lg bg-gray-50">
      <h3 className="text-lg font-semibold mb-4">Counter with useActionState</h3>
      
      <div className="text-center">
        <div className="text-4xl font-bold mb-6 text-blue-600">{count}</div>
        
        <div className="flex gap-4 justify-center">
          <form action={incrementFormAction}>
            <button
              type="submit"
              disabled={isIncrementing}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50"
            >
              {isIncrementing ? 'Adding...' : '+ Increment'}
            </button>
          </form>
          
          <form action={decrementFormAction}>
            <button
              type="submit"
              disabled={isDecrementing || count === 0}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50"
            >
              {isDecrementing ? 'Subtracting...' : '- Decrement'}
            </button>
          </form>
          
          <form action={resetFormAction}>
            <button
              type="submit"
              disabled={isResetting}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:opacity-50"
            >
              {isResetting ? 'Resetting...' : 'Reset'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// Todo List with Action State
function TodoListWithActionState() {
  interface Todo {
    id: number;
    text: string;
    completed: boolean;
  }
  
  interface TodoState {
    todos: Todo[];
    message: string;
  }
  
  async function addTodoAction(prevState: TodoState, formData: FormData): Promise<TodoState> {
    const text = formData.get('todo') as string;
    
    if (!text?.trim()) {
      return {
        ...prevState,
        message: 'Todo text cannot be empty'
      };
    }
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const newTodo: Todo = {
      id: Date.now(),
      text: text.trim(),
      completed: false
    };
    
    return {
      todos: [...prevState.todos, newTodo],
      message: 'Todo added successfully!'
    };
  }
  
  async function toggleTodoAction(prevState: TodoState, formData: FormData): Promise<TodoState> {
    const id = parseInt(formData.get('id') as string);
    
    await new Promise(resolve => setTimeout(resolve, 200));
    
    return {
      ...prevState,
      todos: prevState.todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
      message: 'Todo updated!'
    };
  }
  
  async function deleteTodoAction(prevState: TodoState, formData: FormData): Promise<TodoState> {
    const id = parseInt(formData.get('id') as string);
    
    await new Promise(resolve => setTimeout(resolve, 200));
    
    return {
      todos: prevState.todos.filter(todo => todo.id !== id),
      message: 'Todo deleted!'
    };
  }
  
  const [state, addFormAction, isAdding] = useActionState(addTodoAction, {
    todos: [],
    message: ''
  });
  
  const [, toggleFormAction, isToggling] = useActionState(toggleTodoAction, state);
  const [, deleteFormAction, isDeleting] = useActionState(deleteTodoAction, state);
  
  return (
    <div className="p-6 border rounded-lg bg-gray-50">
      <h3 className="text-lg font-semibold mb-4">Todo List with useActionState</h3>
      
      <form action={addFormAction} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            name="todo"
            placeholder="Enter a new todo..."
            className="flex-1 px-3 py-2 border rounded-md"
            disabled={isAdding}
          />
          <button
            type="submit"
            disabled={isAdding}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
          >
            {isAdding ? 'Adding...' : 'Add'}
          </button>
        </div>
      </form>
      
      {state.message && (
        <div className="mb-4 p-2 bg-blue-100 text-blue-800 rounded-md text-sm">
          {state.message}
        </div>
      )}
      
      <div className="space-y-2">
        {state.todos.map(todo => (
          <div key={todo.id} className="flex items-center gap-2 p-2 bg-white rounded-md">
            <form action={toggleFormAction} className="flex-shrink-0">
              <input type="hidden" name="id" value={todo.id} />
              <button
                type="submit"
                disabled={isToggling}
                className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                  todo.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'
                }`}
              >
                {todo.completed && (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </form>
            
            <span className={`flex-1 ${
              todo.completed ? 'line-through text-gray-500' : ''
            }`}>
              {todo.text}
            </span>
            
            <form action={deleteFormAction}>
              <input type="hidden" name="id" value={todo.id} />
              <button
                type="submit"
                disabled={isDeleting}
                className="px-2 py-1 text-red-500 hover:bg-red-50 rounded"
              >
                Delete
              </button>
            </form>
          </div>
        ))}
        
        {state.todos.length === 0 && (
          <p className="text-gray-500 text-center py-4">No todos yet. Add one above!</p>
        )}
      </div>
    </div>
  );
}

export default function UseActionStatePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">useActionState</h1>
          <p className="text-xl text-gray-600 mb-6">
            useActionState is a Hook that allows you to update state based on the result of a form action.
          </p>
        </div>

        <div className="space-y-8">
          <DemoSection title="Basic Syntax">
            <CodeBlock language="typescript">
{`import { useActionState } from 'react';

function MyComponent() {
  const [state, formAction, isPending] = useActionState(fn, initialState, permalink?);
  
  return (
    <form action={formAction}>
      {/* form content */}
    </form>
  );
}`}
            </CodeBlock>
            
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Parameters:</h4>
              <ul className="text-blue-800 space-y-1">
                <li><strong>fn:</strong> The function to be called when the form is submitted</li>
                <li><strong>initialState:</strong> The initial state value</li>
                <li><strong>permalink:</strong> (Optional) A URL for the form action</li>
              </ul>
              
              <h4 className="font-semibold text-blue-900 mb-2 mt-4">Returns:</h4>
              <ul className="text-blue-800 space-y-1">
                <li><strong>state:</strong> The current state</li>
                <li><strong>formAction:</strong> The action to pass to the form</li>
                <li><strong>isPending:</strong> Boolean indicating if the action is pending</li>
              </ul>
            </div>
          </DemoSection>

          <DemoSection title="Login Form Example">
            <LoginForm />
            
            <CodeBlock language="typescript">
{`async function loginAction(prevState: LoginState, formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (username === 'admin' && password === 'password') {
    return {
      success: true,
      message: 'Login successful!',
      user: { username, id: 1 }
    };
  } else {
    return {
      success: false,
      message: 'Invalid credentials',
      user: null
    };
  }
}

function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, {
    success: false,
    message: '',
    user: null
  });

  return (
    <form action={formAction}>
      <input name="username" disabled={isPending} />
      <input name="password" type="password" disabled={isPending} />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Logging in...' : 'Login'}
      </button>
      
      {state.message && <div>{state.message}</div>}
    </form>
  );
}`}
            </CodeBlock>
          </DemoSection>

          <DemoSection title="Form Validation Example">
            <ContactForm />
            
            <CodeBlock language="typescript">
{`async function submitFormAction(prevState: FormState, formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  
  // Simulate validation and API call
  await new Promise(resolve => setTimeout(resolve, 800));
  
  if (!name || !email) {
    return {
      success: false,
      message: 'Name and email are required',
      errors: {
        name: !name ? 'Name is required' : '',
        email: !email ? 'Email is required' : ''
      }
    };
  }
  
  if (!email.includes('@')) {
    return {
      success: false,
      message: 'Invalid email format',
      errors: { email: 'Please enter a valid email' }
    };
  }
  
  return {
    success: true,
    message: \`Form submitted successfully for \${name}!\`,
    data: { name, email },
    errors: {}
  };
}`}
            </CodeBlock>
          </DemoSection>

          <DemoSection title="Counter with Actions">
            <CounterWithActionState />
            
            <CodeBlock language="typescript">
{`function CounterWithActionState() {
  async function incrementAction(prevState: number) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return prevState + 1;
  }
  
  const [count, formAction, isPending] = useActionState(incrementAction, 0);
  
  return (
    <div>
      <div>Count: {count}</div>
      <form action={formAction}>
        <button type="submit" disabled={isPending}>
          {isPending ? 'Adding...' : 'Increment'}
        </button>
      </form>
    </div>
  );
}`}
            </CodeBlock>
          </DemoSection>

          <DemoSection title="Todo List with Actions">
            <TodoListWithActionState />
            
            <CodeBlock language="typescript">
{`interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  message: string;
}

async function addTodoAction(prevState: TodoState, formData: FormData): Promise<TodoState> {
  const text = formData.get('todo') as string;
  
  if (!text?.trim()) {
    return {
      ...prevState,
      message: 'Todo text cannot be empty'
    };
  }
  
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const newTodo: Todo = {
    id: Date.now(),
    text: text.trim(),
    completed: false
  };
  
  return {
    todos: [...prevState.todos, newTodo],
    message: 'Todo added successfully!'
  };
}

function TodoListWithActionState() {
  const [state, formAction, isPending] = useActionState(addTodoAction, {
    todos: [],
    message: ''
  });
  
  return (
    <form action={formAction}>
      <input name="todo" disabled={isPending} />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Adding...' : 'Add Todo'}
      </button>
      
      {state.todos.map(todo => (
        <div key={todo.id}>{todo.text}</div>
      ))}
    </form>
  );
}`}
            </CodeBlock>
          </DemoSection>

          <DemoSection title="Key Features">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">✅ Advantages</h4>
                <ul className="text-green-800 space-y-1">
                  <li>• Simplifies form state management</li>
                  <li>• Built-in pending state</li>
                  <li>• Works with Server Actions</li>
                  <li>• Automatic error handling</li>
                  <li>• Progressive enhancement</li>
                  <li>• Type-safe with TypeScript</li>
                </ul>
              </div>
              
              <div className="p-4 bg-yellow-50 rounded-lg">
                <h4 className="font-semibold text-yellow-900 mb-2">⚠️ Considerations</h4>
                <ul className="text-yellow-800 space-y-1">
                  <li>• Only works with form actions</li>
                  <li>• Requires React 19+</li>
                  <li>• Action functions must be async</li>
                  <li>• State updates are asynchronous</li>
                  <li>• Limited to form-based interactions</li>
                </ul>
              </div>
            </div>
          </DemoSection>

          <DemoSection title="Best Practices">
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">1. Error Handling</h4>
                <p className="text-blue-800">
                  Always include error states in your action return values and handle them in the UI.
                </p>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">2. Loading States</h4>
                <p className="text-blue-800">
                  Use the isPending flag to show loading indicators and disable form elements.
                </p>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">3. Validation</h4>
                <p className="text-blue-800">
                  Perform validation in your action functions and return detailed error information.
                </p>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">4. Type Safety</h4>
                <p className="text-blue-800">
                  Define proper TypeScript interfaces for your state and action return types.
                </p>
              </div>
            </div>
          </DemoSection>
        </div>
      </div>
    </div>
  );
}