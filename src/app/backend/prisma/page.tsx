'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Database, 
  Code, 
  Zap, 
  Shield,
  RefreshCw,
  FileText,
  Settings,
  Users,
  Search,
  Plus,
  Edit,
  Trash2
} from 'lucide-react';
import { DemoCard } from '@/components/DemoCard';
import { DemoCardStatic } from '@/components/DemoCardStatic';
import { DemoSection } from '@/components/DemoSection';
import { CodeBlock } from '@/components/CodeBlock';

const prismaFeatures = [
  {
    title: 'Type Safety',
    description: 'Cliente auto-gerado com tipos TypeScript',
    icon: Shield,
    color: 'text-green-500'
  },
  {
    title: 'Database Migrations',
    description: 'Versionamento e evolução do schema',
    icon: RefreshCw,
    color: 'text-blue-500'
  },
  {
    title: 'Query Builder',
    description: 'API intuitiva para consultas complexas',
    icon: Search,
    color: 'text-purple-500'
  },
  {
    title: 'Multi-Database',
    description: 'Suporte para PostgreSQL, MySQL, SQLite, MongoDB',
    icon: Database,
    color: 'text-orange-500'
  }
];

const databaseProviders = [
  {
    name: 'PostgreSQL',
    description: 'Banco relacional avançado com JSON support',
    features: ['ACID Compliance', 'JSON/JSONB', 'Full-text Search', 'Extensions'],
    useCase: 'Aplicações complexas, analytics'
  },
  {
    name: 'MySQL',
    description: 'Banco relacional popular e confiável',
    features: ['High Performance', 'Replication', 'Partitioning', 'Clustering'],
    useCase: 'Web applications, e-commerce'
  },
  {
    name: 'SQLite',
    description: 'Banco embarcado leve e rápido',
    features: ['Zero Configuration', 'Serverless', 'Self-contained', 'Cross-platform'],
    useCase: 'Desenvolvimento, aplicações móveis'
  },
  {
    name: 'MongoDB',
    description: 'Banco NoSQL orientado a documentos',
    features: ['Document Store', 'Flexible Schema', 'Horizontal Scaling', 'Aggregation'],
    useCase: 'Dados não estruturados, real-time'
  }
];

// Mock data for examples
const mockUsers = [
  { id: 1, name: 'João Silva', email: 'joao@example.com', role: 'USER', createdAt: '2024-01-15' },
  { id: 2, name: 'Maria Santos', email: 'maria@example.com', role: 'ADMIN', createdAt: '2024-01-16' },
  { id: 3, name: 'Pedro Costa', email: 'pedro@example.com', role: 'USER', createdAt: '2024-01-17' }
];

const mockPosts = [
  { id: 1, title: 'Introdução ao Prisma', content: 'Aprenda os conceitos básicos...', authorId: 1, published: true },
  { id: 2, title: 'Database Migrations', content: 'Como gerenciar mudanças no schema...', authorId: 2, published: true },
  { id: 3, title: 'Query Optimization', content: 'Técnicas para otimizar consultas...', authorId: 1, published: false }
];

export default function PrismaPage() {
  const [selectedTab, setSelectedTab] = useState('schema');
  const [selectedUser, setSelectedUser] = useState(null);
  const [queryResult, setQueryResult] = useState(null);

  const executeQuery = (queryType: string) => {
    // Simulate query execution
    setTimeout(() => {
      switch (queryType) {
        case 'findMany':
          setQueryResult(mockUsers);
          break;
        case 'findUnique':
          setQueryResult(mockUsers[0]);
          break;
        case 'create':
          setQueryResult({ id: 4, name: 'Novo Usuário', email: 'novo@example.com', role: 'USER' });
          break;
        case 'update':
          setQueryResult({ ...mockUsers[0], name: 'João Silva Atualizado' });
          break;
        case 'delete':
          setQueryResult({ message: 'Usuário deletado com sucesso' });
          break;
        default:
          setQueryResult(null);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl text-white mr-4">
              <Database className="h-8 w-8" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
              Prisma ORM
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            ORM moderno e type-safe para TypeScript e Node.js. Simplifique o acesso ao banco de dados 
            com um cliente auto-gerado e migrations declarativas.
          </p>
        </motion.div>

        {/* Features */}
        <DemoSection title="Características Principais" description="Por que escolher Prisma para seu projeto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {prismaFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <DemoCardStatic title={feature.title} description={feature.description}>
                    <div className="text-center">
                      <Icon className={`h-12 w-12 mx-auto mb-4 ${feature.color}`} />
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {feature.description}
                      </p>
                    </div>
                  </DemoCardStatic>
                </motion.div>
              );
            })}
          </div>
        </DemoSection>

        {/* Installation & Setup */}
        <DemoSection title="Instalação e Configuração" description="Como começar com Prisma em seu projeto">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <DemoCardStatic title="Instalação" description="Instalar Prisma e dependências">
              <CodeBlock
                language="bash"
                code={`# Instalar Prisma CLI e Client
npm install prisma @prisma/client

# Instalar tipos para desenvolvimento
npm install -D @types/node

# Inicializar Prisma
npx prisma init

# Gerar cliente após mudanças no schema
npx prisma generate

# Executar migrations
npx prisma migrate dev --name init`}
              />
            </DemoCardStatic>

            <DemoCardStatic title="Configuração" description="Setup inicial do Prisma">
              <CodeBlock
                language="typescript"
                code={`// lib/prisma.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}`}
              />
            </DemoCardStatic>
          </div>
        </DemoSection>

        {/* Schema Definition */}
        <DemoSection title="Definição do Schema" description="Como modelar seus dados com Prisma">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8 px-6">
                {['schema', 'relations', 'enums'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setSelectedTab(tab)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                      selectedTab === tab
                        ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    {tab === 'schema' ? 'Schema Básico' : tab === 'relations' ? 'Relacionamentos' : 'Enums & Types'}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="p-6">
              {selectedTab === 'schema' && (
                <CodeBlock
                  language="prisma"
                  code={`// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  role      Role     @default(USER)
  posts     Post[]
  profile   Profile?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("users")
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
  tags      Tag[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("posts")
}`}
                />
              )}
              
              {selectedTab === 'relations' && (
                <CodeBlock
                  language="prisma"
                  code={`// Relacionamentos no Prisma

// One-to-One (1:1)
model User {
  id      Int      @id @default(autoincrement())
  email   String   @unique
  profile Profile? // Opcional
}

model Profile {
  id     Int    @id @default(autoincrement())
  bio    String?
  user   User   @relation(fields: [userId], references: [id])
  userId Int    @unique // Chave única para 1:1
}

// One-to-Many (1:N)
model User {
  id    Int    @id @default(autoincrement())
  posts Post[] // Array de posts
}

model Post {
  id       Int  @id @default(autoincrement())
  author   User @relation(fields: [authorId], references: [id])
  authorId Int  // Chave estrangeira
}

// Many-to-Many (N:N)
model Post {
  id   Int   @id @default(autoincrement())
  tags Tag[] // Relacionamento implícito
}

model Tag {
  id    Int    @id @default(autoincrement())
  posts Post[] // Relacionamento implícito
}`}
                />
              )}
              
              {selectedTab === 'enums' && (
                <CodeBlock
                  language="prisma"
                  code={`// Enums e Tipos Especiais

enum Role {
  USER
  ADMIN
  MODERATOR
}

enum PostStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}

model User {
  id       Int      @id @default(autoincrement())
  email    String   @unique
  role     Role     @default(USER)
  metadata Json?    // Campo JSON
  avatar   Bytes?   // Campo binário
  salary   Decimal? // Números decimais precisos
  
  // Índices
  @@index([email])
  @@index([role, createdAt])
}

model Post {
  id       Int        @id @default(autoincrement())
  title    String
  status   PostStatus @default(DRAFT)
  tags     String[]   // Array de strings
  views    BigInt     @default(0)
  
  // Índice composto
  @@index([status, createdAt])
  @@unique([title, authorId])
}`}
                />
              )}
            </div>
          </div>
        </DemoSection>

        {/* Database Providers */}
        <DemoSection title="Provedores de Banco de Dados" description="Suporte multi-database do Prisma">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {databaseProviders.map((provider, index) => (
              <motion.div
                key={provider.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {provider.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {provider.description}
                </p>
                
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Características:</h4>
                  <div className="flex flex-wrap gap-2">
                    {provider.features.map((feature) => (
                      <span key={feature} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1">Ideal para:</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {provider.useCase}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </DemoSection>

        {/* Interactive Query Examples */}
        <DemoSection title="Exemplos de Queries" description="Teste diferentes operações do Prisma Client">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Query Buttons */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Operações CRUD</h3>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => executeQuery('findMany')}
                  className="flex items-center justify-center p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Find Many
                </button>
                
                <button
                  onClick={() => executeQuery('findUnique')}
                  className="flex items-center justify-center p-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Find Unique
                </button>
                
                <button
                  onClick={() => executeQuery('create')}
                  className="flex items-center justify-center p-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create
                </button>
                
                <button
                  onClick={() => executeQuery('update')}
                  className="flex items-center justify-center p-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Update
                </button>
              </div>
              
              <button
                onClick={() => executeQuery('delete')}
                className="w-full flex items-center justify-center p-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </button>
              
              {/* Query Examples */}
              <div className="mt-6">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Exemplos de Código:</h4>
                <CodeBlock
                  language="typescript"
                  code={`// Find Many - Buscar múltiplos registros
const users = await prisma.user.findMany({
  where: {
    role: 'USER'
  },
  include: {
    posts: true,
    profile: true
  },
  orderBy: {
    createdAt: 'desc'
  }
})

// Find Unique - Buscar registro único
const user = await prisma.user.findUnique({
  where: {
    email: 'joao@example.com'
  },
  include: {
    posts: {
      where: {
        published: true
      }
    }
  }
})

// Create - Criar novo registro
const newUser = await prisma.user.create({
  data: {
    email: 'novo@example.com',
    name: 'Novo Usuário',
    role: 'USER',
    profile: {
      create: {
        bio: 'Biografia do usuário'
      }
    }
  }
})`}
                />
              </div>
            </div>
            
            {/* Query Results */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Resultado da Query</h3>
              <div className="bg-gray-900 rounded-lg p-4 min-h-[400px]">
                {queryResult ? (
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
                      <Database className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Clique em uma operação para ver o resultado</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </DemoSection>

        {/* Advanced Features */}
        <DemoSection title="Recursos Avançados" description="Funcionalidades poderosas do Prisma">
          <div className="grid md:grid-cols-2 gap-6">
            <DemoCardStatic title="Transactions" description="Operações atômicas e consistentes">
              <CodeBlock
                language="typescript"
                code={`// Transaction interativa
const result = await prisma.$transaction(async (tx) => {
  // Criar usuário
  const user = await tx.user.create({
    data: {
      email: 'user@example.com',
      name: 'Novo Usuário'
    }
  })
  
  // Criar perfil
  const profile = await tx.profile.create({
    data: {
      userId: user.id,
      bio: 'Biografia'
    }
  })
  
  return { user, profile }
})

// Transaction em lote
const [userCount, postCount] = await prisma.$transaction([
  prisma.user.count(),
  prisma.post.count()
])`}
              />
            </DemoCardStatic>

             <DemoCardStatic title="Raw Queries" description="SQL customizado quando necessário">
              <CodeBlock
                language="typescript"
                code={`// Query SQL bruta
const users = await prisma.$queryRaw\`
  SELECT u.*, COUNT(p.id) as post_count
  FROM users u
  LEFT JOIN posts p ON u.id = p.author_id
  WHERE u.created_at > \${new Date('2024-01-01')}
  GROUP BY u.id
  ORDER BY post_count DESC
\`

// Execute SQL
const result = await prisma.$executeRaw\`
  UPDATE users 
  SET last_login = \${new Date()}
  WHERE id = \${userId}
\`

// Query tipada
interface UserWithPostCount {
  id: number
  email: string
  post_count: bigint
}

const users: UserWithPostCount[] = await prisma.$queryRaw\`...\``}
              />
            </DemoCardStatic>

             <DemoCardStatic title="Middleware" description="Interceptar e modificar queries">
              <CodeBlock
                language="typescript"
                code={`// Middleware para logging
prisma.$use(async (params, next) => {
  const before = Date.now()
  const result = await next(params)
  const after = Date.now()
  
  console.log(\`Query \${params.model}.\${params.action} took \${after - before}ms\`)
  return result
})

// Middleware para soft delete
prisma.$use(async (params, next) => {
  if (params.action === 'delete') {
    params.action = 'update'
    params.args['data'] = { deleted: true }
  }
  
  if (params.action === 'findMany' || params.action === 'findFirst') {
    if (params.args.where) {
      if (params.args.where.deleted == undefined) {
        params.args.where['deleted'] = false
      }
    } else {
      params.args['where'] = { deleted: false }
    }
  }
  
  return next(params)
})`}
              />
            </DemoCardStatic>

             <DemoCardStatic title="Prisma Studio" description="Interface visual para dados">
              <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Prisma Studio é uma interface visual para visualizar e editar dados do seu banco.
                </p>
                <CodeBlock
                  language="bash"
                  code={`# Abrir Prisma Studio
npx prisma studio

# Acessar em http://localhost:5555
# - Visualizar tabelas e dados
# - Editar registros
# - Executar queries
# - Explorar relacionamentos`}
                />
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                  <p className="text-blue-700 dark:text-blue-300 text-sm">
                    💡 <strong>Dica:</strong> Use Prisma Studio durante o desenvolvimento para 
                    visualizar e debuggar seus dados facilmente.
                  </p>
                </div>
              </div>
            </DemoCardStatic>
          </div>
        </DemoSection>

        {/* Best Practices */}
        <DemoSection title="Melhores Práticas" description="Diretrizes para usar Prisma eficientemente">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-yellow-500" />
                  Performance
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Use \`select\` para buscar apenas campos necessários</li>
                  <li>• Implemente paginação com \`take\` e \`skip\`</li>
                  <li>• Use \`include\` com cuidado para evitar N+1</li>
                  <li>• Configure connection pooling adequadamente</li>
                  <li>• Use índices para queries frequentes</li>
                  <li>• Monitore queries com middleware</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-green-500" />
                  Segurança
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Sempre valide dados de entrada</li>
                  <li>• Use variáveis de ambiente para DATABASE_URL</li>
                  <li>• Implemente rate limiting em APIs</li>
                  <li>• Use transactions para operações críticas</li>
                  <li>• Configure logs adequadamente</li>
                  <li>• Mantenha Prisma sempre atualizado</li>
                </ul>
              </div>
            </div>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}