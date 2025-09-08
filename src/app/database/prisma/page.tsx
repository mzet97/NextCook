'use client';

import { useState } from 'react';
import { Database, Code, Play, GitBranch, Zap, Shield, BookOpen, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import DemoCardStatic from '@/components/DemoCardStatic';

const prismaTopics = [
  {
    title: 'Schema Definition',
    description: 'Definindo modelos, campos e relacionamentos',
    icon: <Database className="w-5 h-5" />,
    examples: [
      'Tipos de dados',
      'Chaves primárias',
      'Relacionamentos',
      'Índices'
    ]
  },
  {
    title: 'Prisma Client',
    description: 'Cliente type-safe para consultas',
    icon: <Code className="w-5 h-5" />,
    examples: [
      'CRUD operations',
      'Filtering & sorting',
      'Relations',
      'Transactions'
    ]
  },
  {
    title: 'Migrations',
    description: 'Versionamento do schema',
    icon: <GitBranch className="w-5 h-5" />,
    examples: [
      'Generate migrations',
      'Deploy migrations',
      'Reset database',
      'Seed data'
    ]
  },
  {
    title: 'Advanced Features',
    description: 'Recursos avançados do Prisma',
    icon: <Zap className="w-5 h-5" />,
    examples: [
      'Raw queries',
      'Middleware',
      'Extensions',
      'Connection pooling'
    ]
  }
];

const codeExamples = [
  {
    title: 'Schema Básico',
    description: 'Definindo modelos User e Post com relacionamento',
    code: `// schema.prisma
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
  avatar    String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // Relacionamentos
  posts     Post[]
  profile   Profile?
  
  @@map("users")
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // Relacionamento com User
  author    User     @relation(fields: [authorId], references: [id], onDelete: Cascade)
  authorId  Int
  
  // Relacionamento com Category
  categories CategoriesOnPosts[]
  
  @@map("posts")
}

model Profile {
  id     Int     @id @default(autoincrement())
  bio    String?
  user   User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId Int     @unique
  
  @@map("profiles")
}

model Category {
  id    Int    @id @default(autoincrement())
  name  String @unique
  posts CategoriesOnPosts[]
  
  @@map("categories")
}

model CategoriesOnPosts {
  post       Post     @relation(fields: [postId], references: [id], onDelete: Cascade)
  postId     Int
  category   Category @relation(fields: [categoryId], references: [id], onDelete: Cascade)
  categoryId Int
  assignedAt DateTime @default(now())
  
  @@id([postId, categoryId])
  @@map("categories_on_posts")
}`,
    language: 'prisma'
  },
  {
    title: 'CRUD Operations',
    description: 'Operações básicas com Prisma Client',
    code: `import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// CREATE - Criar usuário com perfil
const createUser = async () => {
  const user = await prisma.user.create({
    data: {
      email: 'john@example.com',
      name: 'John Doe',
      profile: {
        create: {
          bio: 'Desenvolvedor apaixonado por tecnologia'
        }
      }
    },
    include: {
      profile: true
    }
  });
  return user;
};

// READ - Buscar usuários com posts
const getUsers = async () => {
  const users = await prisma.user.findMany({
    include: {
      posts: {
        where: { published: true },
        orderBy: { createdAt: 'desc' },
        take: 5
      },
      profile: true,
      _count: {
        select: { posts: true }
      }
    }
  });
  return users;
};

// UPDATE - Atualizar post
const updatePost = async (postId: number) => {
  const post = await prisma.post.update({
    where: { id: postId },
    data: {
      published: true,
      updatedAt: new Date()
    },
    include: {
      author: {
        select: {
          name: true,
          email: true
        }
      }
    }
  });
  return post;
};

// DELETE - Deletar usuário (cascade)
const deleteUser = async (userId: number) => {
  const deletedUser = await prisma.user.delete({
    where: { id: userId }
  });
  return deletedUser;
};`,
    language: 'typescript'
  },
  {
    title: 'Queries Avançadas',
    description: 'Filtros, agregações e consultas complexas',
    code: `import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Filtros complexos
const searchPosts = async (searchTerm: string) => {
  const posts = await prisma.post.findMany({
    where: {
      OR: [
        {
          title: {
            contains: searchTerm,
            mode: 'insensitive'
          }
        },
        {
          content: {
            contains: searchTerm,
            mode: 'insensitive'
          }
        }
      ],
      AND: {
        published: true,
        createdAt: {
          gte: new Date('2024-01-01')
        }
      }
    },
    include: {
      author: {
        select: {
          name: true,
          avatar: true
        }
      },
      categories: {
        include: {
          category: true
        }
      }
    },
    orderBy: [
      { createdAt: 'desc' },
      { title: 'asc' }
    ]
  });
  return posts;
};

// Agregações
const getStatistics = async () => {
  const stats = await prisma.user.aggregate({
    _count: {
      id: true
    },
    _avg: {
      id: true
    },
    _max: {
      createdAt: true
    },
    _min: {
      createdAt: true
    }
  });
  
  const postsByCategory = await prisma.category.findMany({
    include: {
      _count: {
        select: {
          posts: true
        }
      }
    },
    orderBy: {
      posts: {
        _count: 'desc'
      }
    }
  });
  
  return { userStats: stats, postsByCategory };
};

// Group By
const getPostsByMonth = async () => {
  const postsByMonth = await prisma.$queryRaw(
    'SELECT DATE_TRUNC(\'month\', "createdAt") as month, COUNT(*) as count FROM "posts" WHERE "published" = true GROUP BY DATE_TRUNC(\'month\', "createdAt") ORDER BY month DESC'
  );
  
  return postsByMonth;
};`,
    language: 'typescript'
  },
  {
    title: 'Transações',
    description: 'Operações atômicas com transações',
    code: `import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Transação simples
const transferData = async (fromUserId: number, toUserId: number, postId: number) => {
  const result = await prisma.$transaction(async (tx) => {
    // Verificar se o post pertence ao usuário
    const post = await tx.post.findFirst({
      where: {
        id: postId,
        authorId: fromUserId
      }
    });
    
    if (!post) {
      throw new Error('Post não encontrado ou não pertence ao usuário');
    }
    
    // Transferir o post
    const updatedPost = await tx.post.update({
      where: { id: postId },
      data: { authorId: toUserId }
    });
    
    // Atualizar contadores
    await tx.user.update({
      where: { id: fromUserId },
      data: {
        // Decrementar contador do usuário original
        // (assumindo que existe um campo postCount)
      }
    });
    
    await tx.user.update({
      where: { id: toUserId },
      data: {
        // Incrementar contador do novo usuário
      }
    });
    
    return updatedPost;
  });
  
  return result;
};

// Transação interativa
const createPostWithCategories = async (postData: any, categoryNames: string[]) => {
  const result = await prisma.$transaction(async (tx) => {
    // Criar ou encontrar categorias
    const categories = await Promise.all(
      categoryNames.map(async (name) => {
        return await tx.category.upsert({
          where: { name },
          update: {},
          create: { name }
        });
      })
    );
    
    // Criar o post
    const post = await tx.post.create({
      data: {
        title: postData.title,
        content: postData.content,
        authorId: postData.authorId,
        categories: {
          create: categories.map(category => ({
            categoryId: category.id
          }))
        }
      },
      include: {
        categories: {
          include: {
            category: true
          }
        }
      }
    });
    
    return post;
  }, {
    maxWait: 5000, // Tempo máximo de espera
    timeout: 10000, // Timeout da transação
  });
  
  return result;
};`,
    language: 'typescript'
  },
  {
    title: 'Middleware & Extensions',
    description: 'Interceptadores e extensões do Prisma',
    code: `import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Middleware para logging
prisma.$use(async (params, next) => {
  const before = Date.now();
  
  console.log('Query: ' + params.model + '.' + params.action);
  
  const result = await next(params);
  
  const after = Date.now();
  console.log('Query took ' + (after - before) + 'ms');
  
  return result;
});

// Middleware para soft delete
prisma.$use(async (params, next) => {
  // Interceptar operações de delete
  if (params.action === 'delete') {
    params.action = 'update';
    params.args['data'] = { deletedAt: new Date() };
  }
  
  if (params.action === 'deleteMany') {
    params.action = 'updateMany';
    if (params.args.data != undefined) {
      params.args.data['deletedAt'] = new Date();
    } else {
      params.args['data'] = { deletedAt: new Date() };
    }
  }
  
  return next(params);
});

// Middleware para auditoria
prisma.$use(async (params, next) => {
  if (params.action === 'create' || params.action === 'update') {
    const userId = getCurrentUserId(); // Função para obter ID do usuário atual
    
    if (params.action === 'create') {
      params.args.data.createdBy = userId;
    }
    
    if (params.action === 'update') {
      params.args.data.updatedBy = userId;
      params.args.data.updatedAt = new Date();
    }
  }
  
  return next(params);
});

// Extension para métodos customizados
const extendedPrisma = prisma.$extends({
  model: {
    user: {
      async findByEmail(email: string) {
        return await prisma.user.findUnique({
          where: { email },
          include: {
            profile: true,
            posts: {
              where: { published: true },
              orderBy: { createdAt: 'desc' },
              take: 5
            }
          }
        });
      },
      
      async getActiveUsers() {
        return await prisma.user.findMany({
          where: {
            posts: {
              some: {
                createdAt: {
                  gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Últimos 30 dias
                }
              }
            }
          },
          include: {
            _count: {
              select: { posts: true }
            }
          }
        });
      }
    },
    
    post: {
      async publish(id: number) {
        return await prisma.post.update({
          where: { id },
          data: { 
            published: true,
            publishedAt: new Date()
          }
        });
      },
      
      async getPopular(limit: number = 10) {
        return await prisma.post.findMany({
          where: { published: true },
          orderBy: {
            // Assumindo que existe um campo viewCount
            viewCount: 'desc'
          },
          take: limit,
          include: {
            author: {
              select: {
                name: true,
                avatar: true
              }
            }
          }
        });
      }
    }
  }
});

function getCurrentUserId(): number {
  // Implementar lógica para obter ID do usuário atual
  return 1;
}

export { extendedPrisma as prisma };`,
    language: 'typescript'
  }
];

const bestPractices = [
  {
    title: 'Connection Management',
    description: 'Gerencie conexões eficientemente',
    tips: [
      'Use uma única instância do PrismaClient',
      'Configure connection pooling adequadamente',
      'Feche conexões em ambientes serverless',
      'Use $disconnect() quando necessário'
    ],
    icon: <Database className="w-5 h-5 text-blue-600" />
  },
  {
    title: 'Query Optimization',
    description: 'Otimize suas consultas',
    tips: [
      'Use select para campos específicos',
      'Evite N+1 queries com include',
      'Implemente paginação adequada',
      'Use índices estrategicamente'
    ],
    icon: <Zap className="w-5 h-5 text-yellow-600" />
  },
  {
    title: 'Error Handling',
    description: 'Trate erros adequadamente',
    tips: [
      'Capture erros específicos do Prisma',
      'Implemente retry logic para falhas temporárias',
      'Use transações para operações críticas',
      'Log erros para debugging'
    ],
    icon: <AlertCircle className="w-5 h-5 text-red-600" />
  },
  {
    title: 'Security',
    description: 'Mantenha sua aplicação segura',
    tips: [
      'Valide inputs antes de queries',
      'Use prepared statements (automático)',
      'Implemente rate limiting',
      'Não exponha dados sensíveis'
    ],
    icon: <Shield className="w-5 h-5 text-green-600" />
  }
];

export default function PrismaPage() {
  const [selectedExample, setSelectedExample] = useState(0);
  const [activeTab, setActiveTab] = useState('examples');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs />
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <Database className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Prisma ORM
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ORM moderno e type-safe para TypeScript. Simplifique o acesso ao banco de dados com queries type-safe e migrações automáticas.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-lg p-1 shadow-sm border">
            {[
              { id: 'examples', label: 'Exemplos' },
              { id: 'practices', label: 'Boas Práticas' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'examples' && (
          <>
            {/* Topics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1.5 mb-12">
              {prismaTopics.map((topic, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-blue-50 rounded-lg mr-3">
                      {topic.icon}
                    </div>
                    <h3 className="font-semibold text-gray-900">{topic.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{topic.description}</p>
                  <ul className="space-y-1">
                    {topic.examples.map((example, exIndex) => (
                      <li key={exIndex} className="flex items-center text-sm text-gray-500">
                        <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Code Examples */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Exemplos Práticos</h2>
                <p className="text-gray-600">Explore exemplos detalhados do Prisma ORM</p>
              </div>
              
              <div className="flex border-b border-gray-100 overflow-x-auto">
                {codeExamples.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedExample(index)}
                    className={`flex-shrink-0 p-4 text-left transition-colors min-w-[200px] ${
                      selectedExample === index
                        ? 'bg-blue-50 border-b-2 border-blue-600 text-blue-700'
                        : 'hover:bg-gray-50 text-gray-600'
                    }`}
                  >
                    <div className="font-medium">{example.title}</div>
                    <div className="text-sm opacity-75">{example.description}</div>
                  </button>
                ))}
              </div>
              
              <div className="p-6">
                <DemoCardStatic
                  title={codeExamples[selectedExample].title}
                  description={codeExamples[selectedExample].description}
                >
                  <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-blue-400 text-sm">
                      <code>{codeExamples[selectedExample].code}</code>
                    </pre>
                  </div>
                </DemoCardStatic>
              </div>
            </div>
          </>
        )}

        {activeTab === 'practices' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
            {bestPractices.map((practice, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  {practice.icon}
                  <h3 className="text-lg font-semibold text-gray-900 ml-3">{practice.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{practice.description}</p>
                <ul className="space-y-2">
                  {practice.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Quick Start */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Comece agora com Prisma</h2>
            <p className="text-blue-100 mb-6">
              Instale o Prisma e configure seu primeiro projeto em minutos.
            </p>
            <div className="bg-black/20 rounded-lg p-4 text-left mb-6">
              <code className="text-sm">
                npm install prisma @prisma/client<br/>
                npx prisma init<br/>
                npx prisma migrate dev --name init<br/>
                npx prisma generate
              </code>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://www.prisma.io/docs/getting-started"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Documentação Oficial
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}