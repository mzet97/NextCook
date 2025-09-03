'use client';

import { motion } from 'framer-motion';
import { 
  Code, 
  Server, 
  Shield, 
  CheckCircle, 
  Zap, 
  Database,
  Lock,
  AlertTriangle,
  TestTube,
  BookOpen
} from 'lucide-react';
import { DemoCard } from '@/components/DemoCard';
import { DemoSection } from '@/components/DemoSection';
import { CodeBlock } from '@/components/CodeBlock';
import Breadcrumbs from '@/components/Breadcrumbs';

const apiFeatures = [
  {
    title: 'Route Handlers',
    description: 'Criação de rotas de API com App Router',
    icon: Code,
    color: 'blue',
    href: '/api-development/route-handlers'
  },
  {
    title: 'Métodos HTTP',
    description: 'GET, POST, PUT, DELETE, PATCH',
    icon: Server,
    color: 'green',
    href: '/api-development/http-methods'
  },
  {
    title: 'Middleware',
    description: 'Autenticação, CORS, rate limiting',
    icon: Shield,
    color: 'purple',
    href: '/api-development/middleware'
  },
  {
    title: 'Validação',
    description: 'Validação de dados com Zod',
    icon: CheckCircle,
    color: 'orange',
    href: '/api-development/validation'
  },
  {
    title: 'Autenticação',
    description: 'JWT, sessions, OAuth',
    icon: Lock,
    color: 'red',
    href: '/api-development/authentication'
  },
  {
    title: 'Tratamento de Erros',
    description: 'Error handling consistente',
    icon: AlertTriangle,
    color: 'yellow',
    href: '/api-development/error-handling'
  },
  {
    title: 'Testes de API',
    description: 'Testes unitários e de integração',
    icon: TestTube,
    color: 'indigo',
    href: '/api-development/testing'
  },
  {
    title: 'Melhores Práticas',
    description: 'Padrões REST e documentação',
    icon: BookOpen,
    color: 'pink',
    href: '/api-development/best-practices'
  }
];

const quickStartSteps = [
  {
    step: '1',
    title: 'Criar Route Handler',
    description: 'Crie um arquivo route.ts na pasta app/api'
  },
  {
    step: '2',
    title: 'Implementar Métodos',
    description: 'Exporte funções GET, POST, PUT, DELETE'
  },
  {
    step: '3',
    title: 'Adicionar Validação',
    description: 'Use Zod para validar dados de entrada'
  },
  {
    step: '4',
    title: 'Testar API',
    description: 'Teste com ferramentas como Postman ou curl'
  }
];

export default function APIRestPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <Breadcrumbs />
        
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🚀 API REST em Next.js
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Guia completo para desenvolvimento de APIs REST modernas com Next.js App Router.
            Aprenda desde conceitos básicos até técnicas avançadas.
          </p>
        </motion.div>

        <DemoSection title="Características Principais">
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg text-center">
              <Zap className="h-8 w-8 text-blue-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">App Router</h3>
              <p className="text-blue-800 dark:text-blue-200 text-sm">
                Route Handlers modernos com suporte completo a TypeScript.
              </p>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg text-center">
              <Database className="h-8 w-8 text-green-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">Type-Safe</h3>
              <p className="text-green-800 dark:text-green-200 text-sm">
                APIs totalmente tipadas com validação automática de dados.
              </p>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg text-center">
              <Shield className="h-8 w-8 text-purple-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2">Seguro</h3>
              <p className="text-purple-800 dark:text-purple-200 text-sm">
                Autenticação, autorização e proteção contra ataques.
              </p>
            </div>
            
            <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg text-center">
              <CheckCircle className="h-8 w-8 text-orange-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-2">Testável</h3>
              <p className="text-orange-800 dark:text-orange-200 text-sm">
                Testes automatizados para garantir qualidade e confiabilidade.
              </p>
            </div>
          </div>
        </DemoSection>

        <DemoSection title="Tópicos de API Development">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {apiFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <DemoCard
                    title={feature.title}
                    description={feature.description}
                    icon={<IconComponent className="w-6 h-6" />}
                    color={feature.color}
                    href={feature.href}
                  />
                </motion.div>
              );
            })}
          </div>
        </DemoSection>

        <DemoSection title="Quick Start">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Passos Rápidos</h3>
              <div className="space-y-4">
                {quickStartSteps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{step.title}</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Exemplo Básico</h3>
              <CodeBlock
                language="typescript"
                code={`// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';

// GET /api/users
export async function GET() {
  const users = await getUsers();
  return NextResponse.json(users);
}

// POST /api/users
export async function POST(request: NextRequest) {
  const body = await request.json();
  const user = await createUser(body);
  return NextResponse.json(user, { status: 201 });
}

// PUT /api/users
export async function PUT(request: NextRequest) {
  const body = await request.json();
  const user = await updateUser(body);
  return NextResponse.json(user);
}

// DELETE /api/users
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  await deleteUser(id);
  return NextResponse.json({ success: true });
}`}
              />
            </div>
          </div>
        </DemoSection>

        <DemoSection title="Estrutura Recomendada">
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Organização de Arquivos</h3>
            <CodeBlock
              language="bash"
              code={`app/
├── api/
│   ├── auth/
│   │   ├── login/
│   │   │   └── route.ts
│   │   ├── register/
│   │   │   └── route.ts
│   │   └── logout/
│   │       └── route.ts
│   ├── users/
│   │   ├── route.ts          # /api/users
│   │   └── [id]/
│   │       └── route.ts      # /api/users/[id]
│   ├── posts/
│   │   ├── route.ts
│   │   └── [id]/
│   │       ├── route.ts
│   │       └── comments/
│   │           └── route.ts
│   └── middleware.ts
lib/
├── auth.ts
├── db.ts
├── validations.ts
└── utils.ts`}
            />
          </div>
        </DemoSection>

        <DemoSection title="Próximos Passos">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">🚀 Começar</h3>
              <p className="text-blue-800 dark:text-blue-200 mb-4">
                Comece com Route Handlers básicos e métodos HTTP.
              </p>
              <DemoCard
                title="Route Handlers"
                description="Aprenda a criar suas primeiras rotas"
                icon={<Code className="w-6 h-6" />}
                color="blue"
                href="/api-development/route-handlers"
              />
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">🔒 Segurança</h3>
              <p className="text-green-800 dark:text-green-200 mb-4">
                Implemente autenticação e middleware de segurança.
              </p>
              <DemoCard
                title="Autenticação"
                description="JWT, sessions e OAuth"
                icon={<Lock className="w-6 h-6" />}
                color="green"
                href="/api-development/authentication"
              />
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2">✅ Qualidade</h3>
              <p className="text-purple-800 dark:text-purple-200 mb-4">
                Adicione validação, testes e melhores práticas.
              </p>
              <DemoCard
                title="Melhores Práticas"
                description="Padrões e convenções REST"
                icon={<BookOpen className="w-6 h-6" />}
                color="purple"
                href="/api-development/best-practices"
              />
            </div>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}