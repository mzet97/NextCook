'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Code, 
  Shield, 
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Server,
  Globe,
  Database,
  Users,
  Settings,
  Play,
  FileText,
  ArrowRight,
  Layers
} from 'lucide-react';
import { DemoCard } from '@/components/DemoCard';
import { DemoCardStatic } from '@/components/DemoCardStatic';
import { DemoSection } from '@/components/DemoSection';
import { CodeBlock } from '@/components/CodeBlock';

const trpcFeatures = [
  {
    title: 'Type Safety',
    description: 'End-to-end type safety do servidor ao cliente',
    icon: Shield,
    color: 'text-green-500',
    benefits: ['Auto-completion', 'Compile-time errors', 'Refactoring safety', 'IntelliSense']
  },
  {
    title: 'No Code Generation',
    description: 'Sem necessidade de gerar código ou schemas',
    icon: Zap,
    color: 'text-yellow-500',
    benefits: ['Zero config', 'Real-time sync', 'Developer experience', 'Fast iteration']
  },
  {
    title: 'Runtime Validation',
    description: 'Validação automática com Zod ou Yup',
    icon: CheckCircle,
    color: 'text-blue-500',
    benefits: ['Input validation', 'Type coercion', 'Error handling', 'Schema validation']
  },
  {
    title: 'Framework Agnostic',
    description: 'Funciona com qualquer framework JavaScript',
    icon: Globe,
    color: 'text-purple-500',
    benefits: ['React', 'Vue', 'Svelte', 'Vanilla JS']
  }
];

const procedureTypes = [
  {
    name: 'Query',
    description: 'Para operações de leitura (GET)',
    icon: '🔍',
    color: 'bg-blue-100 text-blue-800',
    example: 'getUserById, getPosts, getStats'
  },
  {
    name: 'Mutation',
    description: 'Para operações de escrita (POST/PUT/DELETE)',
    icon: '✏️',
    color: 'bg-green-100 text-green-800',
    example: 'createUser, updatePost, deleteComment'
  },
  {
    name: 'Subscription',
    description: 'Para dados em tempo real (WebSocket)',
    icon: '📡',
    color: 'bg-purple-100 text-purple-800',
    example: 'onUserJoin, onMessageReceived, onPostUpdate'
  }
];

const middlewareExamples = [
  {
    name: 'Authentication',
    description: 'Verificar se usuário está autenticado',
    code: `const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});`
  },
  {
    name: 'Rate Limiting',
    description: 'Limitar número de requests por usuário',
    code: `const rateLimit = t.middleware(async ({ ctx, next }) => {
  const identifier = ctx.session?.user?.id || ctx.req.ip;
  const { success } = await ratelimit.limit(identifier);
  
  if (!success) {
    throw new TRPCError({
      code: 'TOO_MANY_REQUESTS',
      message: 'Rate limit exceeded'
    });
  }
  
  return next();
});`
  },
  {
    name: 'Logging',
    description: 'Log de todas as operações',
    code: `const logger = t.middleware(async ({ path, type, next }) => {
  const start = Date.now();
  const result = await next();
  const durationMs = Date.now() - start;
  
  console.log('tRPC', {
    path,
    type,
    durationMs,
    ok: result.ok
  });
  
  return result;
});`
  }
];

// Mock data for examples
const mockUsers = [
  { id: '1', name: 'João Silva', email: 'joao@example.com', role: 'USER' },
  { id: '2', name: 'Maria Santos', email: 'maria@example.com', role: 'ADMIN' }
];

const mockPosts = [
  { id: 1, title: 'Introdução ao tRPC', content: 'tRPC é uma biblioteca...', authorId: '1' },
  { id: 2, title: 'Type Safety em APIs', content: 'A importância da type safety...', authorId: '2' }
];

export default function TRPCPage() {
  const [selectedTab, setSelectedTab] = useState('setup');
  const [selectedMiddleware, setSelectedMiddleware] = useState(0);
  const [queryResult, setQueryResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const simulateQuery = async (operation: string) => {
    setIsLoading(true);
    setQueryResult(null);
    
    // Simulate API call
    setTimeout(() => {
      switch (operation) {
        case 'getUsers':
          setQueryResult(mockUsers);
          break;
        case 'getUser':
          setQueryResult(mockUsers[0]);
          break;
        case 'createUser':
          setQueryResult({ id: '3', name: 'Novo Usuário', email: 'novo@example.com', role: 'USER' });
          break;
        case 'getPosts':
          setQueryResult(mockPosts);
          break;
        case 'createPost':
          setQueryResult({ id: 3, title: 'Novo Post', content: 'Conteúdo...', authorId: '1' });
          break;
        default:
          setQueryResult({ error: 'Operação não encontrada' });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl text-white mr-4">
              <Zap className="h-8 w-8" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
              tRPC
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            End-to-end typesafe APIs made easy. Move fast and break nothing. 
            Experience the full power of TypeScript across your entire stack.
          </p>
        </motion.div>

        {/* Features */}
        <DemoSection title="Por que tRPC?" description="As vantagens de APIs type-safe">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-1.5 mb-8">
            {trpcFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <DemoCardStatic title={feature.title} description={feature.description}>
                    <div className="space-y-4">
                      <Icon className={`h-12 w-12 mx-auto ${feature.color}`} />
                      <div className="space-y-2">
                        {feature.benefits.map((benefit) => (
                          <div key={benefit} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                            <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                            {benefit}
                          </div>
                        ))}
                      </div>
                    </div>
                  </DemoCardStatic>
                </motion.div>
              );
            })}
          </div>
        </DemoSection>

        {/* Procedure Types */}
        <DemoSection title="Tipos de Procedures" description="Diferentes tipos de operações no tRPC">
          <div className="grid md:grid-cols-3 gap-1.5 mb-8">
            {procedureTypes.map((type, index) => (
              <motion.div
                key={type.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{type.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {type.name}
                  </h3>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-center">
                  {type.description}
                </p>
                
                <div className="text-center">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${type.color}`}>
                    {type.example}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </DemoSection>

        {/* Setup & Examples */}
        <DemoSection title="Setup e Exemplos" description="Como implementar tRPC em seu projeto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8 px-6">
                {['setup', 'router', 'client', 'middleware'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setSelectedTab(tab)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                      selectedTab === tab
                        ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    {tab === 'setup' ? 'Instalação' : 
                     tab === 'router' ? 'Router' :
                     tab === 'client' ? 'Cliente' : 'Middleware'}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="p-6">
              {selectedTab === 'setup' && (
                <div className="grid lg:grid-cols-2 gap-1.5">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Instalação</h3>
                    <CodeBlock
                      language="bash"
                      code={`# Instalar tRPC
npm install @trpc/server @trpc/client @trpc/react-query @trpc/next

# Instalar dependências
npm install @tanstack/react-query zod

# Para validação (opcional)
npm install superstruct yup joi`}
                    />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Estrutura do Projeto</h3>
                    <CodeBlock
                      language="text"
                      code={`src/
├── server/
│   ├── api/
│   │   ├── routers/
│   │   │   ├── user.ts
│   │   │   └── post.ts
│   │   ├── root.ts
│   │   └── trpc.ts
│   └── db.ts
├── utils/
│   └── api.ts
├── pages/
│   └── api/
│       └── trpc/
│           └── [...trpc].ts
└── app/
    └── _trpc/
        ├── Provider.tsx
        └── serverClient.ts`}
                    />
                  </div>
                </div>
              )}
              
              {selectedTab === 'router' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Definindo o Router</h3>
                    <CodeBlock
                      language="typescript"
                      code={`// server/api/trpc.ts
import { initTRPC, TRPCError } from '@trpc/server';
import { type CreateNextContextOptions } from '@trpc/server/adapters/next';
import { z } from 'zod';

// Context
export const createTRPCContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts;
  
  return {
    req,
    res,
    session: await getServerAuthSession({ req, res }),
    db: prisma,
  };
};

type Context = Awaited<ReturnType<typeof createTRPCContext>>;

// Initialize tRPC
const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;

// Protected procedure
const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);`}
                    />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Router de Usuários</h3>
                    <CodeBlock
                      language="typescript"
                      code={`// server/api/routers/user.ts
import { z } from 'zod';
import { createTRPCRouter, publicProcedure, protectedProcedure } from '../trpc';

export const userRouter = createTRPCRouter({
  // Query: Buscar todos os usuários
  getAll: publicProcedure
    .query(async ({ ctx }) => {
      return ctx.db.user.findMany({
        orderBy: { createdAt: 'desc' },
      });
    }),

  // Query: Buscar usuário por ID
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const user = await ctx.db.user.findUnique({
        where: { id: input.id },
        include: { posts: true },
      });
      
      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Usuário não encontrado',
        });
      }
      
      return user;
    }),

  // Mutation: Criar usuário
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
        bio: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.db.user.create({
        data: {
          name: input.name,
          email: input.email,
          bio: input.bio,
        },
      });
    }),

  // Mutation: Atualizar usuário
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).optional(),
        bio: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id, ...data } = input;
      
      return ctx.db.user.update({
        where: { id },
        data,
      });
    }),

  // Subscription: Usuários online
  onlineUsers: publicProcedure
    .subscription(() => {
      return observable<User[]>((emit) => {
        // Implementar lógica de subscription
        const interval = setInterval(() => {
          emit.next(getOnlineUsers());
        }, 1000);
        
        return () => {
          clearInterval(interval);
        };
      });
    }),
});`}
                    />
                  </div>
                </div>
              )}
              
              {selectedTab === 'client' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Configuração do Cliente</h3>
                    <CodeBlock
                      language="typescript"
                      code={`// utils/api.ts
import { createTRPCNext } from '@trpc/next';
import { httpBatchLink, loggerLink } from '@trpc/client';
import { type AppRouter } from '~/server/api/root';
import superjson from 'superjson';

const getBaseUrl = () => {
  if (typeof window !== 'undefined') return ''; // browser should use relative url
  if (process.env.VERCEL_URL) return \`https://\${process.env.VERCEL_URL}\`; // SSR should use vercel url
  return \`http://localhost:\${process.env.PORT ?? 3000}\`; // dev SSR should use localhost
};

export const api = createTRPCNext<AppRouter>({
  config() {
    return {
      transformer: superjson,
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === 'development' ||
            (opts.direction === 'down' && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: \`\${getBaseUrl()}/api/trpc\`,
        }),
      ],
    };
  },
  ssr: false,
});`}
                    />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Usando no Componente</h3>
                    <CodeBlock
                      language="typescript"
                      code={`// components/UserList.tsx
import { api } from '~/utils/api';

export function UserList() {
  // Query
  const { data: users, isLoading, error } = api.user.getAll.useQuery();
  
  // Mutation
  const createUser = api.user.create.useMutation({
    onSuccess: () => {
      // Invalidar cache para refetch
      utils.user.getAll.invalidate();
    },
  });
  
  // Utils para cache management
  const utils = api.useContext();
  
  const handleCreateUser = (data: { name: string; email: string }) => {
    createUser.mutate(data);
  };
  
  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error.message}</div>;
  
  return (
    <div>
      <h2>Usuários</h2>
      {users?.map((user) => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      ))}
      
      <button
        onClick={() => handleCreateUser({
          name: 'Novo Usuário',
          email: 'novo@example.com'
        })}
        disabled={createUser.isLoading}
      >
        {createUser.isLoading ? 'Criando...' : 'Criar Usuário'}
      </button>
    </div>
  );
}

// Hook personalizado
export function useUser(id: string) {
  return api.user.getById.useQuery(
    { id },
    {
      enabled: !!id, // Só executa se ID existir
      staleTime: 5 * 60 * 1000, // 5 minutos
      cacheTime: 10 * 60 * 1000, // 10 minutos
    }
  );
}`}
                    />
                  </div>
                </div>
              )}
              
              {selectedTab === 'middleware' && (
                <div className="space-y-6">
                  <div className="grid lg:grid-cols-3 gap-4 mb-6">
                    {middlewareExamples.map((middleware, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedMiddleware(index)}
                        className={`p-4 rounded-lg text-left transition-colors ${
                          selectedMiddleware === index
                            ? 'bg-purple-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        <h4 className="font-medium mb-2">{middleware.name}</h4>
                        <p className="text-sm opacity-90">{middleware.description}</p>
                      </button>
                    ))}
                  </div>
                  
                  <CodeBlock
                    language="typescript"
                    code={middlewareExamples[selectedMiddleware].code}
                  />
                </div>
              )}
            </div>
          </div>
        </DemoSection>

        {/* Interactive Demo */}
        <DemoSection title="Demo Interativo" description="Teste as operações tRPC">
          <div className="grid lg:grid-cols-2 gap-1.5">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Operações Disponíveis</h3>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => simulateQuery('getUsers')}
                    disabled={isLoading}
                    className="flex items-center justify-center p-3 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white rounded-lg transition-colors"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Get Users
                  </button>
                  
                  <button
                    onClick={() => simulateQuery('getUser')}
                    disabled={isLoading}
                    className="flex items-center justify-center p-3 bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white rounded-lg transition-colors"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Get User
                  </button>
                  
                  <button
                    onClick={() => simulateQuery('createUser')}
                    disabled={isLoading}
                    className="flex items-center justify-center p-3 bg-purple-500 hover:bg-purple-600 disabled:bg-purple-300 text-white rounded-lg transition-colors"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Create User
                  </button>
                  
                  <button
                    onClick={() => simulateQuery('getPosts')}
                    disabled={isLoading}
                    className="flex items-center justify-center p-3 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white rounded-lg transition-colors"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Get Posts
                  </button>
                </div>
                
                <button
                  onClick={() => simulateQuery('createPost')}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center p-3 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white rounded-lg transition-colors"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Create Post
                </button>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Exemplo de Uso:</h4>
                <CodeBlock
                  language="typescript"
                  code={`// Query
const { data, isLoading, error } = api.user.getAll.useQuery();

// Mutation
const createUser = api.user.create.useMutation({
  onSuccess: (data) => {
    console.log('Usuário criado:', data);
    // Invalidar cache
    utils.user.getAll.invalidate();
  },
  onError: (error) => {
    console.error('Erro:', error.message);
  }
});

// Executar mutation
createUser.mutate({
  name: 'João Silva',
  email: 'joao@example.com'
});`}
                />
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Resultado</h3>
              <div className="bg-gray-900 rounded-lg p-4 min-h-[400px]">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center text-gray-400">
                      <RefreshCw className="h-8 w-8 mx-auto mb-2 animate-spin" />
                      <p>Executando query...</p>
                    </div>
                  </div>
                ) : queryResult ? (
                  <motion.pre 
                    className="text-green-400 text-sm overflow-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {JSON.stringify(queryResult, null, 2)}
                  </motion.pre>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <div className="text-center">
                      <Play className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Execute uma operação para ver o resultado</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </DemoSection>

        {/* Advanced Features */}
        <DemoSection title="Recursos Avançados" description="Funcionalidades poderosas do tRPC">
          <div className="grid md:grid-cols-2 gap-1.5">
            <DemoCardStatic title="Error Handling" description="Tratamento de erros tipado">
              <CodeBlock
                language="typescript"
                code={`// Definir erros customizados
const TRPCError = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  VALIDATION_ERROR: 'BAD_REQUEST'
} as const;

// No servidor
if (!user) {
  throw new TRPCError({
    code: 'NOT_FOUND',
    message: 'Usuário não encontrado',
    cause: new Error('User ID invalid')
  });
}

// No cliente
const { data, error } = api.user.getById.useQuery({ id });

if (error) {
  switch (error.data?.code) {
    case 'NOT_FOUND':
      return <div>Usuário não encontrado</div>;
    case 'UNAUTHORIZED':
      return <div>Acesso negado</div>;
    default:
      return <div>Erro: {error.message}</div>;
  }
}`}
              />
            </DemoCardStatic>

            <DemoCardStatic title="Optimistic Updates" description="Atualizações otimistas para melhor UX">
              <CodeBlock
                language="typescript"
                code={`const utils = api.useContext();

const updateUser = api.user.update.useMutation({
  onMutate: async (newData) => {
    // Cancelar queries em andamento
    await utils.user.getById.cancel({ id: newData.id });
    
    // Snapshot do estado atual
    const previousUser = utils.user.getById.getData({ id: newData.id });
    
    // Atualização otimista
    utils.user.getById.setData(
      { id: newData.id },
      (old) => old ? { ...old, ...newData } : undefined
    );
    
    return { previousUser };
  },
  onError: (err, newData, context) => {
    // Reverter em caso de erro
    if (context?.previousUser) {
      utils.user.getById.setData(
        { id: newData.id },
        context.previousUser
      );
    }
  },
  onSettled: (data, error, variables) => {
    // Sempre refetch após mutation
    utils.user.getById.invalidate({ id: variables.id });
  }
});`}
              />
            </DemoCardStatic>

            <DemoCardStatic title="Subscriptions" description="Real-time com WebSockets">
              <CodeBlock
                language="typescript"
                code={`// No servidor
export const postRouter = createTRPCRouter({
  onAdd: publicProcedure
    .subscription(() => {
      return observable<Post>((emit) => {
        const onAdd = (data: Post) => {
          emit.next(data);
        };
        
        // Escutar eventos
        ee.on('add', onAdd);
        
        return () => {
          ee.off('add', onAdd);
        };
      });
    }),
});

// No cliente
function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  
  // Subscription
  api.post.onAdd.useSubscription(undefined, {
    onData(post) {
      setPosts((prev) => [post, ...prev]);
    },
    onError(err) {
      console.error('Subscription error:', err);
    },
  });
  
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}`}
              />
            </DemoCardStatic>

            <DemoCardStatic title="Server-Side Rendering" description="SSR com tRPC e Next.js">
              <CodeBlock
                language="typescript"
                code={`// pages/users/[id].tsx
import { createServerSideHelpers } from '@trpc/react-query/server';
import { GetServerSideProps } from 'next';
import { appRouter } from '~/server/api/root';

export default function UserPage({ id }: { id: string }) {
  const { data: user } = api.user.getById.useQuery({ id });
  
  return (
    <div>
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: await createTRPCContext(context),
    transformer: superjson,
  });
  
  const id = context.params?.id as string;
  
  // Prefetch data
  await helpers.user.getById.prefetch({ id });
  
  return {
    props: {
      trpcState: helpers.dehydrate(),
      id,
    },
  };
};`}
              />
            </DemoCardStatic>
          </div>
        </DemoSection>

        {/* Best Practices */}
        <DemoSection title="Melhores Práticas" description="Diretrizes para usar tRPC eficientemente">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <div className="grid md:grid-cols-3 gap-1.5">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Code className="h-5 w-5 mr-2 text-blue-500" />
                  Desenvolvimento
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Use Zod para validação de schemas</li>
                  <li>• Organize routers por domínio</li>
                  <li>• Implemente middleware para auth</li>
                  <li>• Use transformers (superjson)</li>
                  <li>• Configure error formatting</li>
                  <li>• Documente procedures complexas</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-yellow-500" />
                  Performance
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Use batching para múltiplas queries</li>
                  <li>• Configure cache adequadamente</li>
                  <li>• Implemente optimistic updates</li>
                  <li>• Use SSR para dados críticos</li>
                  <li>• Monitore bundle size</li>
                  <li>• Lazy load routers grandes</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-green-500" />
                  Segurança
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Sempre valide inputs no servidor</li>
                  <li>• Use middleware para autenticação</li>
                  <li>• Implemente rate limiting</li>
                  <li>• Sanitize dados de saída</li>
                  <li>• Configure CORS adequadamente</li>
                  <li>• Log operações sensíveis</li>
                </ul>
              </div>
            </div>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}