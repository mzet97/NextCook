'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Database, Server, Layers, GitBranch, Zap, Shield, TestTube, BookOpen, ArrowRight, Code, Play } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import DemoCardStatic from '@/components/DemoCardStatic';

const databaseTopics = [
  {
    title: 'Prisma ORM',
    description: 'ORM moderno e type-safe para TypeScript',
    href: '/database/prisma',
    icon: <Database className="w-6 h-6" />,
    level: 'Intermediário',
    topics: ['Schema', 'Migrations', 'Client', 'Relations']
  },
  {
    title: 'Database Design',
    description: 'Padrões de design e modelagem de dados',
    href: '/database/design-patterns',
    icon: <Layers className="w-6 h-6" />,
    level: 'Avançado',
    topics: ['Normalization', 'Indexes', 'Relations', 'Performance']
  },
  {
    title: 'Migrations',
    description: 'Versionamento e evolução do schema',
    href: '/database/migrations',
    icon: <GitBranch className="w-6 h-6" />,
    level: 'Intermediário',
    topics: ['Schema Evolution', 'Rollbacks', 'Seeds', 'Deployment']
  },
  {
    title: 'Query Optimization',
    description: 'Otimização de consultas e performance',
    href: '/database/optimization',
    icon: <Zap className="w-6 h-6" />,
    level: 'Avançado',
    topics: ['Indexes', 'Query Plans', 'N+1 Problem', 'Caching']
  },
  {
    title: 'Connection Pooling',
    description: 'Gerenciamento eficiente de conexões',
    href: '/database/connection-pooling',
    icon: <Server className="w-6 h-6" />,
    level: 'Avançado',
    topics: ['Pool Configuration', 'Connection Limits', 'Monitoring', 'Best Practices']
  },
  {
    title: 'Database Security',
    description: 'Segurança e proteção de dados',
    href: '/database/security',
    icon: <Shield className="w-6 h-6" />,
    level: 'Avançado',
    topics: ['SQL Injection', 'Encryption', 'Access Control', 'Auditing']
  },
  {
    title: 'Testing Strategies',
    description: 'Testes de banco de dados e mocking',
    href: '/database/testing',
    icon: <TestTube className="w-6 h-6" />,
    level: 'Intermediário',
    topics: ['Unit Tests', 'Integration Tests', 'Test Databases', 'Mocking']
  },
  {
    title: 'Database Patterns',
    description: 'Padrões arquiteturais para dados',
    href: '/database/patterns',
    icon: <BookOpen className="w-6 h-6" />,
    level: 'Avançado',
    topics: ['Repository Pattern', 'Unit of Work', 'CQRS', 'Event Sourcing']
  }
];

const quickExamples = [
  {
    title: 'Prisma Schema Básico',
    description: 'Definindo modelos e relações',
    code: `// schema.prisma
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}

model Post {
  id       Int    @id @default(autoincrement())
  title    String
  content  String?
  author   User   @relation(fields: [authorId], references: [id])
  authorId Int
}`,
    language: 'prisma'
  },
  {
    title: 'Query com Prisma Client',
    description: 'Consultas type-safe com relacionamentos',
    code: `import { prisma } from '@/lib/prisma';

// Buscar usuário com posts
const userWithPosts = await prisma.user.findUnique({
  where: { id: 1 },
  include: {
    posts: {
      orderBy: { createdAt: 'desc' },
      take: 10
    }
  }
});

// Criar post com transação
const result = await prisma.$transaction(async (tx) => {
  const post = await tx.post.create({
    data: {
      title: 'Novo Post',
      content: 'Conteúdo do post',
      authorId: userId
    }
  });
  
  await tx.user.update({
    where: { id: userId },
    data: { postCount: { increment: 1 } }
  });
  
  return post;
});`,
    language: 'typescript'
  }
];

export default function DatabasePage() {
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedExample, setSelectedExample] = useState(0);

  const filteredTopics = selectedLevel === 'all' 
    ? databaseTopics 
    : databaseTopics.filter(topic => topic.level === selectedLevel);

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
            Database & ORM
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Domine bancos de dados modernos, Prisma ORM, otimização de queries e padrões arquiteturais para aplicações escaláveis.
          </p>
        </div>

        {/* Level Filter */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-lg p-1 shadow-sm border">
            {['all', 'Intermediário', 'Avançado'].map((level) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedLevel === level
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {level === 'all' ? 'Todos os Níveis' : level}
              </button>
            ))}
          </div>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredTopics.map((topic, index) => (
            <Link key={index} href={topic.href}>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all duration-200 group h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                    {topic.icon}
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    topic.level === 'Básico' ? 'bg-green-100 text-green-700' :
                    topic.level === 'Intermediário' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {topic.level}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {topic.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4">
                  {topic.description}
                </p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {topic.topics.slice(0, 3).map((tag, tagIndex) => (
                    <span key={tagIndex} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                  {topic.topics.length > 3 && (
                    <span className="text-xs text-gray-400">+{topic.topics.length - 3}</span>
                  )}
                </div>
                
                <div className="flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700">
                  Explorar
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Examples */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Exemplos Rápidos</h2>
            <p className="text-gray-600">Veja exemplos práticos de uso do Prisma ORM</p>
          </div>
          
          <div className="flex border-b border-gray-100">
            {quickExamples.map((example, index) => (
              <button
                key={index}
                onClick={() => setSelectedExample(index)}
                className={`flex-1 p-4 text-left transition-colors ${
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
              title={quickExamples[selectedExample].title}
              description={quickExamples[selectedExample].description}
              code={quickExamples[selectedExample].code}
              language={quickExamples[selectedExample].language}
            />
          </div>
        </div>

        {/* Getting Started */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Pronto para começar?</h2>
            <p className="text-blue-100 mb-6">
              Explore nossos guias detalhados sobre Prisma ORM, design de banco de dados e otimização de performance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/database/prisma"
                className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                <Database className="w-5 h-5 mr-2" />
                Começar com Prisma
              </Link>
              <Link 
                href="/database/design-patterns"
                className="inline-flex items-center px-6 py-3 bg-blue-700 text-white rounded-lg font-medium hover:bg-blue-800 transition-colors"
              >
                <Layers className="w-5 h-5 mr-2" />
                Design Patterns
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}