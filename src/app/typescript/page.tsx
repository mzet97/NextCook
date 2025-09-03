'use client';

import { useState } from 'react';
import DemoCard from '@/components/DemoCard';
import CodeBlock from '@/components/CodeBlock';

const typescriptFeatures = [
  {
    title: 'Type Definitions',
    description: 'Interfaces, types, generics e definições avançadas de tipos.',
    icon: '📝',
    href: '/typescript/types',
    color: 'blue' as const
  },
  {
    title: 'Advanced Patterns',
    description: 'Utility types, conditional types, mapped types e padrões avançados.',
    icon: '🔧',
    href: '/typescript/patterns',
    color: 'purple' as const
  }
];

const codeExamples = {
  interfaces: `// Definição de interfaces
interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  createdAt: Date;
}

interface Post {
  id: number;
  title: string;
  content: string;
  author: User;
  tags: string[];
  published: boolean;
}`,
  generics: `// Generics avançados
type ApiResponse<T> = {
  data: T;
  status: 'success' | 'error';
  message?: string;
};

type PaginatedResponse<T> = ApiResponse<T> & {
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
};

// Uso dos generics
const userResponse: ApiResponse<User> = {
  data: { id: 1, name: 'João', email: 'joao@example.com', createdAt: new Date() },
  status: 'success'
};`,
  utilities: `// Utility Types
type PartialUser = Partial<User>;
type RequiredUser = Required<User>;
type UserEmail = Pick<User, 'email'>;
type UserWithoutId = Omit<User, 'id'>;

// Conditional Types
type NonNullable<T> = T extends null | undefined ? never : T;

// Mapped Types
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Optional<T, K extends keyof T> = {
  [P in K]?: T[P];
} & {
  [P in Exclude<keyof T, K>]: T[P];
};`
};

const typeFeatures = [
  {
    title: 'Type Safety',
    description: 'Prevenção de erros em tempo de compilação',
    icon: '🛡️',
    color: 'green'
  },
  {
    title: 'IntelliSense',
    description: 'Autocompletar e sugestões inteligentes',
    icon: '💡',
    color: 'yellow'
  },
  {
    title: 'Refactoring',
    description: 'Refatoração segura e automática',
    icon: '🔄',
    color: 'blue'
  },
  {
    title: 'Documentation',
    description: 'Código autodocumentado com tipos',
    icon: '📚',
    color: 'purple'
  }
];

export default function TypeScriptPage() {
  const [activeExample, setActiveExample] = useState<keyof typeof codeExamples>('interfaces');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 rounded-full text-blue-100 text-sm font-medium mb-6">
              <span className="mr-2">📘</span>
              TypeScript Advanced
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              TypeScript
              <span className="block text-yellow-300">Avançado</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Explore tipagem avançada, generics, utility types e padrões modernos de desenvolvimento TypeScript.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Benefícios do TypeScript
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Por que usar TypeScript em seus projetos
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {typeFeatures.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  feature.color === 'green' ? 'bg-green-100 dark:bg-green-900' :
                  feature.color === 'yellow' ? 'bg-yellow-100 dark:bg-yellow-900' :
                  feature.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900' :
                  'bg-purple-100 dark:bg-purple-900'
                }`}>
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Exemplos de Código
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Explore diferentes aspectos do TypeScript
            </p>
          </div>

          {/* Example Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              {Object.keys(codeExamples).map((example) => (
                <button
                  key={example}
                  onClick={() => setActiveExample(example as keyof typeof codeExamples)}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    activeExample === example
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                  }`}
                >
                  {example.charAt(0).toUpperCase() + example.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Code Display */}
          <div className="max-w-4xl mx-auto">
            <CodeBlock
              code={codeExamples[activeExample]}
              language="typescript"
              title={`${activeExample.charAt(0).toUpperCase() + activeExample.slice(1)} Example`}
            />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Recursos Avançados
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Explore conceitos avançados do TypeScript
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {typescriptFeatures.map((feature) => (
              <div key={feature.title} className="transform hover:scale-105 transition-transform duration-200">
                <DemoCard {...feature} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Melhores Práticas
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Dicas para usar TypeScript efetivamente
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-4">
                ✅ Faça
              </h3>
              <ul className="space-y-2 text-green-700 dark:text-green-300">
                <li>• Use strict mode no tsconfig.json</li>
                <li>• Prefira interfaces para objetos</li>
                <li>• Use union types para valores específicos</li>
                <li>• Aproveite type inference quando possível</li>
                <li>• Use utility types para transformações</li>
              </ul>
            </div>
            
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-4">
                ❌ Evite
              </h3>
              <ul className="space-y-2 text-red-700 dark:text-red-300">
                <li>• Usar &apos;any&apos; desnecessariamente</li>
                <li>• Ignorar erros do TypeScript</li>
                <li>• Tipos muito complexos e aninhados</li>
                <li>• Duplicação de definições de tipos</li>
                <li>• Usar &apos;as&apos; para forçar tipos incorretos</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}