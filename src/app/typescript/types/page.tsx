'use client';

import { useState } from 'react';
import CodeBlock from '@/components/CodeBlock';
import DemoSection from '@/components/DemoSection';

// Tipos básicos
type BasicTypes = {
  stringValue: string;
  numberValue: number;
  booleanValue: boolean;
  arrayValue: string[];
  objectValue: { name: string; age: number };
};

// Union Types
type Status = 'loading' | 'success' | 'error';
type ID = string | number;

// Intersection Types
type Person = {
  name: string;
  age: number;
};

type Employee = {
  employeeId: string;
  department: string;
};

type EmployeePerson = Person & Employee;

// Conditional Types
type NonNullable<T> = T extends null | undefined ? never : T;
type IsArray<T> = T extends any[] ? true : false;
type ArrayElement<T> = T extends (infer U)[] ? U : never;

// Mapped Types
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Partial<T> = {
  [P in keyof T]?: T[P];
};

type Required<T> = {
  [P in keyof T]-?: T[P];
};

// Template Literal Types
type EventName<T extends string> = `on${Capitalize<T>}`;
type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type APIEndpoint<T extends string> = `/api/${T}`;

// Utility Types Examples
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  isActive: boolean;
  roles: string[];
  createdAt: Date;
  updatedAt?: Date;
}

type UserPartial = Partial<User>;
type UserRequired = Required<User>;
type UserPick = Pick<User, 'id' | 'name' | 'email'>;
type UserOmit = Omit<User, 'createdAt' | 'updatedAt'>;
type UserRecord = Record<string, User>;

// Generic Types
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  timestamp: Date;
}

interface Repository<T, K = string> {
  findById(id: K): Promise<T | null>;
  findAll(): Promise<T[]>;
  create(entity: Omit<T, 'id'>): Promise<T>;
  update(id: K, entity: Partial<T>): Promise<T>;
  delete(id: K): Promise<boolean>;
}

// Advanced Generic Constraints
interface Identifiable {
  id: string | number;
}

interface Timestamped {
  createdAt: Date;
  updatedAt?: Date;
}

type Entity<T> = T & Identifiable & Timestamped;

// Function Types
type EventHandler<T = any> = (event: T) => void;
type AsyncFunction<T, R> = (arg: T) => Promise<R>;
type Predicate<T> = (value: T) => boolean;
type Transformer<T, R> = (input: T) => R;

// Recursive Types
type JSONValue = 
  | string 
  | number 
  | boolean 
  | null 
  | JSONValue[] 
  | { [key: string]: JSONValue };

interface TreeNode<T> {
  value: T;
  children?: TreeNode<T>[];
}

// Branded Types
type Brand<T, B> = T & { __brand: B };
type UserId = Brand<string, 'UserId'>;
type Email = Brand<string, 'Email'>;
type Password = Brand<string, 'Password'>;

// Type Guards
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function isUser(obj: unknown): obj is User {
  return obj !== null && 
    typeof obj === 'object' &&
    'id' in obj &&
    'name' in obj &&
    'email' in obj &&
    typeof (obj as Record<string, unknown>).id === 'number' &&
    typeof (obj as Record<string, unknown>).name === 'string' &&
    typeof (obj as Record<string, unknown>).email === 'string';
}

function isApiResponse<T>(obj: unknown): obj is ApiResponse<T> {
  return obj !== null &&
    typeof obj === 'object' &&
    'data' in obj &&
    'status' in obj &&
    'message' in obj &&
    typeof (obj as Record<string, unknown>).status === 'number' &&
    typeof (obj as Record<string, unknown>).message === 'string';
}

// Discriminated Unions
interface LoadingState {
  type: 'loading';
}

interface SuccessState {
  type: 'success';
  data: unknown;
}

interface ErrorState {
  type: 'error';
  error: string;
}

type AsyncState = LoadingState | SuccessState | ErrorState;

// Componentes de demonstração
function BasicTypesDemo() {
  const [data, setData] = useState<BasicTypes>({
    stringValue: 'Hello TypeScript',
    numberValue: 42,
    booleanValue: true,
    arrayValue: ['item1', 'item2', 'item3'],
    objectValue: { name: 'João', age: 30 }
  });

  return (
    <div className="card">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Tipos Básicos
      </h3>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              String:
            </label>
            <input
              type="text"
              value={data.stringValue}
              onChange={(e) => setData(prev => ({ ...prev, stringValue: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Number:
            </label>
            <input
              type="number"
              value={data.numberValue}
              onChange={(e) => setData(prev => ({ ...prev, numberValue: Number(e.target.value) }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={data.booleanValue}
            onChange={(e) => setData(prev => ({ ...prev, booleanValue: e.target.checked }))}
            className="rounded"
          />
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Boolean Value
          </label>
        </div>
        
        <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded">
          <pre className="text-sm">{JSON.stringify(data, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}

function UnionTypesDemo() {
  const [status, setStatus] = useState<Status>('loading');
  const [id, setId] = useState<ID>('user-123');

  return (
    <div className="card">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Union Types
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Status (loading | success | error):
          </label>
          <div className="flex space-x-2">
            {(['loading', 'success', 'error'] as Status[]).map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={`px-3 py-1 rounded text-sm ${
                  status === s 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Status atual: <strong>{status}</strong>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            ID (string | number):
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={id.toString()}
              onChange={(e) => {
                const value = e.target.value;
                setId(isNaN(Number(value)) ? value : Number(value));
              }}
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
            />
            <span className="px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded text-sm">
              Tipo: {typeof id}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function UtilityTypesDemo() {
  const [user] = useState<User>({
    id: 1,
    name: 'João Silva',
    email: 'joao@example.com',
    age: 30,
    isActive: true,
    roles: ['user', 'admin'],
    createdAt: new Date(),
    updatedAt: new Date()
  });

  const userPartial: UserPartial = { name: 'João' };
  const userPick: UserPick = { id: user.id, name: user.name, email: user.email };
  const userOmit: UserOmit = {
    id: user.id,
    name: user.name,
    email: user.email,
    age: user.age,
    isActive: user.isActive,
    roles: user.roles
  };

  return (
    <div className="card">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Utility Types
      </h3>
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">User Original:</h4>
          <pre className="text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-x-auto">
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Partial&lt;User&gt;:</h4>
            <pre className="text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded">
              {JSON.stringify(userPartial, null, 2)}
            </pre>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Pick&lt;User, 'id' | 'name' | 'email'&gt;:</h4>
            <pre className="text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded">
              {JSON.stringify(userPick, null, 2)}
            </pre>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Omit&lt;User, 'createdAt' | 'updatedAt'&gt;:</h4>
          <pre className="text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-x-auto">
            {JSON.stringify(userOmit, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}

function GenericTypesDemo() {
  const [apiResponse, setApiResponse] = useState<ApiResponse<User[]>>({
    data: [
      {
        id: 1,
        name: 'João',
        email: 'joao@example.com',
        age: 30,
        isActive: true,
        roles: ['user'],
        createdAt: new Date()
      }
    ],
    status: 200,
    message: 'Success',
    timestamp: new Date()
  });

  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    // Simula uma chamada de API
    setTimeout(() => {
      setApiResponse({
        data: [
          ...apiResponse.data,
          {
            id: Date.now(),
            name: `Usuário ${apiResponse.data.length + 1}`,
            email: `user${apiResponse.data.length + 1}@example.com`,
            age: Math.floor(Math.random() * 50) + 18,
            isActive: Math.random() > 0.5,
            roles: ['user'],
            createdAt: new Date()
          }
        ],
        status: 200,
        message: 'Success',
        timestamp: new Date()
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="card">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Generic Types - ApiResponse&lt;T&gt;
      </h3>
      <div className="space-y-4">
        <button 
          onClick={fetchData} 
          disabled={loading}
          className="btn-primary"
        >
          {loading ? 'Carregando...' : 'Adicionar Usuário'}
        </button>
        
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
            ApiResponse&lt;User[]&gt;:
          </h4>
          <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded max-h-60 overflow-y-auto">
            <div className="text-sm space-y-2">
              <div><strong>Status:</strong> {apiResponse.status}</div>
              <div><strong>Message:</strong> {apiResponse.message}</div>
              <div><strong>Timestamp:</strong> {apiResponse.timestamp.toLocaleString()}</div>
              <div><strong>Data ({apiResponse.data.length} usuários):</strong></div>
              <pre className="text-xs">
                {JSON.stringify(apiResponse.data, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TypeGuardsDemo() {
  const [input, setInput] = useState<unknown>('Hello World');
  const [testValue, setTestValue] = useState('');

  const testTypeGuard = () => {
    try {
      const parsed = JSON.parse(testValue);
      setInput(parsed);
    } catch {
      setInput(testValue);
    }
  };

  const getTypeInfo = (value: unknown) => {
    if (isString(value)) {
      return { type: 'string', length: value.length, value };
    }
    if (typeof value === 'number') {
      return { type: 'number', isInteger: Number.isInteger(value), value };
    }
    if (typeof value === 'boolean') {
      return { type: 'boolean', value };
    }
    if (Array.isArray(value)) {
      return { type: 'array', length: value.length, value };
    }
    if (value && typeof value === 'object') {
      return { type: 'object', keys: Object.keys(value), value };
    }
    return { type: typeof value, value };
  };

  const typeInfo = getTypeInfo(input);

  return (
    <div className="card">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Type Guards
      </h3>
      <div className="space-y-4">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder='Teste: "hello", 42, true, [1,2,3], {"name":"João"}'
            value={testValue}
            onChange={(e) => setTestValue(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
          />
          <button onClick={testTypeGuard} className="btn-primary">
            Testar
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Valor Atual:</h4>
            <pre className="text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded">
              {JSON.stringify(input, null, 2)}
            </pre>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Informações do Tipo:</h4>
            <pre className="text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded">
              {JSON.stringify(typeInfo, null, 2)}
            </pre>
          </div>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <span className={`w-3 h-3 rounded-full ${
              isString(input) ? 'bg-green-500' : 'bg-gray-300'
            }`}></span>
            <span>isString(input): {isString(input).toString()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`w-3 h-3 rounded-full ${
              typeof input === 'number' ? 'bg-green-500' : 'bg-gray-300'
            }`}></span>
            <span>typeof input === 'number': {(typeof input === 'number').toString()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`w-3 h-3 rounded-full ${
              Array.isArray(input) ? 'bg-green-500' : 'bg-gray-300'
            }`}></span>
            <span>Array.isArray(input): {Array.isArray(input).toString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function DiscriminatedUnionsDemo() {
  const [state, setState] = useState<AsyncState>({ type: 'loading' });

  const simulateAsync = (result: 'success' | 'error') => {
    setState({ type: 'loading' });
    
    setTimeout(() => {
      if (result === 'success') {
        setState({
          type: 'success',
          data: {
            id: 1,
            name: 'Dados carregados',
            timestamp: new Date().toISOString()
          }
        });
      } else {
        setState({
          type: 'error',
          error: 'Falha ao carregar os dados'
        });
      }
    }, 1500);
  };

  const renderState = () => {
    switch (state.type) {
      case 'loading':
        return (
          <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
            <div className="animate-spin w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
            <span>Carregando...</span>
          </div>
        );
      case 'success':
        return (
          <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded">
            <div className="text-green-800 dark:text-green-200 font-semibold mb-2">Sucesso!</div>
            <pre className="text-sm text-green-700 dark:text-green-300">
              {JSON.stringify(state.data, null, 2)}
            </pre>
          </div>
        );
      case 'error':
        return (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded">
            <div className="text-red-800 dark:text-red-200 font-semibold">Erro:</div>
            <div className="text-red-700 dark:text-red-300">{state.error}</div>
          </div>
        );
    }
  };

  return (
    <div className="card">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Discriminated Unions
      </h3>
      <div className="space-y-4">
        <div className="flex space-x-2">
          <button 
            onClick={() => simulateAsync('success')} 
            className="btn-primary"
            disabled={state.type === 'loading'}
          >
            Simular Sucesso
          </button>
          <button 
            onClick={() => simulateAsync('error')} 
            className="btn-secondary"
            disabled={state.type === 'loading'}
          >
            Simular Erro
          </button>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Estado Atual (type: "{state.type}"):
          </h4>
          {renderState()}
        </div>
        
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <strong>Tipo discriminante:</strong> A propriedade "type" permite ao TypeScript 
          determinar qual variante da union está sendo usada, fornecendo type safety completo.
        </div>
      </div>
    </div>
  );
}

export default function TypeScriptTypesPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            TypeScript - Sistema de Tipos
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Explore o poderoso sistema de tipos do TypeScript
          </p>
        </div>

        {/* Tipos Fundamentais */}
        <DemoSection title="Tipos Fundamentais">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-1.5">
            <BasicTypesDemo />
            <UnionTypesDemo />
          </div>
        </DemoSection>

        {/* Utility Types */}
        <DemoSection title="Utility Types">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-1.5">
            <UtilityTypesDemo />
            <div className="space-y-6">
              <CodeBlock
                title="Utility Types Principais"
                language="tsx"
                code={`// Partial - Torna todas as propriedades opcionais
type UserPartial = Partial<User>;
// { id?: number; name?: string; email?: string; ... }

// Required - Torna todas as propriedades obrigatórias
type UserRequired = Required<User>;
// Remove todos os ? das propriedades

// Pick - Seleciona propriedades específicas
type UserPick = Pick<User, 'id' | 'name' | 'email'>;
// { id: number; name: string; email: string; }

// Omit - Remove propriedades específicas
type UserOmit = Omit<User, 'createdAt' | 'updatedAt'>;
// User sem createdAt e updatedAt

// Record - Cria um tipo com chaves e valores específicos
type UserRecord = Record<string, User>;
// { [key: string]: User }

// Readonly - Torna todas as propriedades readonly
type UserReadonly = Readonly<User>;
// { readonly id: number; readonly name: string; ... }`}
              />
            </div>
          </div>
        </DemoSection>

        {/* Generic Types */}
        <DemoSection title="Generic Types">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-1.5">
            <GenericTypesDemo />
            <div className="space-y-6">
              <CodeBlock
                title="Definindo Generics"
                language="tsx"
                code={`// Generic básico
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  timestamp: Date;
}

// Generic com constraints
interface Repository<T extends Identifiable, K = string> {
  findById(id: K): Promise<T | null>;
  findAll(): Promise<T[]>;
  create(entity: Omit<T, 'id'>): Promise<T>;
  update(id: K, entity: Partial<T>): Promise<T>;
  delete(id: K): Promise<boolean>;
}

// Generic com múltiplos parâmetros
type Transformer<T, R> = (input: T) => R;
type AsyncFunction<T, R> = (arg: T) => Promise<R>;

// Generic condicional
type NonNullable<T> = T extends null | undefined ? never : T;
type ArrayElement<T> = T extends (infer U)[] ? U : never;`}
              />
            </div>
          </div>
        </DemoSection>

        {/* Type Guards */}
        <DemoSection title="Type Guards">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-1.5">
            <TypeGuardsDemo />
            <div className="space-y-6">
              <CodeBlock
                title="Implementando Type Guards"
                language="tsx"
                code={`// Type guard básico
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

// Type guard para objetos
function isUser(obj: unknown): obj is User {
  return obj !== null && 
    typeof obj === 'object' &&
    'id' in obj &&
    'name' in obj &&
    'email' in obj &&
    typeof (obj as Record<string, unknown>).id === 'number' &&
    typeof (obj as Record<string, unknown>).name === 'string' &&
    typeof (obj as Record<string, unknown>).email === 'string';
}

// Type guard genérico
function isApiResponse<T>(obj: unknown): obj is ApiResponse<T> {
  return obj !== null &&
    typeof obj === 'object' &&
    'data' in obj &&
    'status' in obj &&
    'message' in obj &&
    typeof (obj as Record<string, unknown>).status === 'number' &&
    typeof (obj as Record<string, unknown>).message === 'string';
}

// Uso dos type guards
function processValue(value: unknown) {
  if (isString(value)) {
    // TypeScript sabe que value é string
    console.log(value.toUpperCase());
  }
  
  if (isUser(value)) {
    // TypeScript sabe que value é User
    console.log(value.name);
  }
}`}
              />
            </div>
          </div>
        </DemoSection>

        {/* Discriminated Unions */}
        <DemoSection title="Discriminated Unions">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-1.5">
            <DiscriminatedUnionsDemo />
            <div className="space-y-6">
              <CodeBlock
                title="Discriminated Unions"
                language="tsx"
                code={`// Estados com discriminante
interface LoadingState {
  type: 'loading';
}

interface SuccessState {
  type: 'success';
  data: any;
}

interface ErrorState {
  type: 'error';
  error: string;
}

type AsyncState = LoadingState | SuccessState | ErrorState;

// TypeScript usa o discriminante para type narrowing
function handleState(state: AsyncState) {
  switch (state.type) {
    case 'loading':
      // state é LoadingState
      return 'Carregando...';
    case 'success':
      // state é SuccessState, tem acesso a 'data'
      return \`Dados: \${state.data}\`;
    case 'error':
      // state é ErrorState, tem acesso a 'error'
      return \`Erro: \${state.error}\`;
  }
}`}
              />
            </div>
          </div>
        </DemoSection>

        {/* Advanced Types */}
        <DemoSection title="Tipos Avançados">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-1.5">
            <div className="space-y-6">
              <CodeBlock
                title="Template Literal Types"
                language="tsx"
                code={`// Template literal types
type EventName<T extends string> = \`on\${Capitalize<T>}\`;
type ClickEvent = EventName<'click'>; // 'onClick'
type HoverEvent = EventName<'hover'>; // 'onHover'

// Combinações
type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type APIEndpoint<T extends string> = \`/api/\${T}\`;
type UserEndpoint = APIEndpoint<'users'>; // '/api/users'

// Padrões complexos
type CSSProperty = \`--\${string}\`;
type ValidCSS = CSSProperty; // '--primary-color', '--font-size', etc.`}
              />
              
              <CodeBlock
                title="Mapped Types"
                language="tsx"
                code={`// Mapped types customizados
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

type Stringify<T> = {
  [P in keyof T]: string;
};

// Conditional mapped types
type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;`}
              />
            </div>
            
            <div className="space-y-6">
              <CodeBlock
                title="Branded Types"
                language="tsx"
                code={`// Branded types para type safety
type Brand<T, B> = T & { __brand: B };

type UserId = Brand<string, 'UserId'>;
type Email = Brand<string, 'Email'>;
type Password = Brand<string, 'Password'>;

// Funções de criação
function createUserId(id: string): UserId {
  return id as UserId;
}

function createEmail(email: string): Email {
  if (!email.includes('@')) {
    throw new Error('Email inválido');
  }
  return email as Email;
}

// Uso
const userId = createUserId('user-123');
const email = createEmail('user@example.com');

// TypeScript previne mistura de tipos
// function sendEmail(to: Email, from: UserId) {} // Erro!`}
              />
              
              <CodeBlock
                title="Recursive Types"
                language="tsx"
                code={`// Tipos recursivos
type JSONValue = 
  | string 
  | number 
  | boolean 
  | null 
  | JSONValue[] 
  | { [key: string]: JSONValue };

// Estrutura de árvore
interface TreeNode<T> {
  value: T;
  children?: TreeNode<T>[];
}

// Nested object paths
type Paths<T> = T extends object ? {
  [K in keyof T]: K extends string
    ? T[K] extends object
      ? K | \`\${K}.\${Paths<T[K]>}\`
      : K
    : never;
}[keyof T] : never;

type UserPaths = Paths<User>;
// 'id' | 'name' | 'email' | 'profile.bio' | 'profile.avatar' | ...`}
              />
            </div>
          </div>
        </DemoSection>

        {/* Best Practices */}
        <DemoSection title="Melhores Práticas">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                ✅ Boas Práticas
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Use tipos específicos em vez de <code>any</code></li>
                <li>• Prefira union types a enums quando possível</li>
                <li>• Use type guards para narrowing seguro</li>
                <li>• Implemente discriminated unions para estados</li>
                <li>• Use utility types para transformações</li>
                <li>• Crie branded types para IDs e valores especiais</li>
                <li>• Use generics com constraints apropriados</li>
                <li>• Documente tipos complexos com comentários</li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                🚫 Evite
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Usar <code>any</code> sem necessidade</li>
                <li>• Type assertions desnecessárias (<code>as</code>)</li>
                <li>• Tipos muito complexos e difíceis de entender</li>
                <li>• Generics sem constraints quando necessário</li>
                <li>• Duplicação de definições de tipos</li>
                <li>• Ignorar erros do TypeScript</li>
                <li>• Usar <code>unknown</code> quando um tipo específico é conhecido</li>
                <li>• Tipos muito permissivos</li>
              </ul>
            </div>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}