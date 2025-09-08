'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Database, 
  Server, 
  Shield, 
  Zap,
  Code,
  Lock,
  Cloud,
  Users,
  FileText,
  Settings,
  Globe,
  Layers
} from 'lucide-react';
import { DemoCard } from '@/components/DemoCard';
import { DemoCardStatic } from '@/components/DemoCardStatic';
import { DemoSection } from '@/components/DemoSection';
import { CodeBlock } from '@/components/CodeBlock';

const backendTechnologies = [
  {
    name: 'Prisma',
    description: 'ORM moderno e type-safe para TypeScript e Node.js',
    icon: Database,
    href: '/backend/prisma',
    features: ['Type Safety', 'Auto-generated Client', 'Database Migrations', 'Query Builder'],
    category: 'ORM & Database',
    popularity: '⭐⭐⭐⭐⭐',
    difficulty: 'Medium',
    color: 'from-blue-500 to-blue-700'
  },
  {
    name: 'Supabase',
    description: 'Backend as a Service com PostgreSQL, Auth e Storage',
    icon: Cloud,
    href: '/backend/supabase',
    features: ['PostgreSQL', 'Authentication', 'Real-time', 'Storage'],
    category: 'Backend as a Service',
    popularity: '⭐⭐⭐⭐⭐',
    difficulty: 'Easy',
    color: 'from-green-500 to-green-700'
  },
  {
    name: 'tRPC',
    description: 'APIs type-safe end-to-end com TypeScript',
    icon: Zap,
    href: '/backend/trpc',
    features: ['Type Safety', 'Auto-completion', 'Runtime Validation', 'Code Generation'],
    category: 'API Framework',
    popularity: '⭐⭐⭐⭐⭐',
    difficulty: 'Medium',
    color: 'from-purple-500 to-purple-700'
  },
  {
    name: 'Auth.js',
    description: 'Autenticação completa para aplicações Next.js',
    icon: Shield,
    href: '/backend/nextauth',
    features: ['OAuth Providers', 'JWT/Session', 'Database Adapters', 'Security'],
    category: 'Authentication',
    popularity: '⭐⭐⭐⭐⭐',
    difficulty: 'Easy',
    color: 'from-red-500 to-red-700'
  }
];

const backendConcepts = [
  {
    title: 'Database Design',
    description: 'Modelagem de dados e relacionamentos',
    icon: '🗄️',
    topics: [
      'Normalização de dados',
      'Relacionamentos (1:1, 1:N, N:N)',
      'Índices e performance',
      'Migrations e versionamento'
    ]
  },
  {
    title: 'API Design',
    description: 'Criação de APIs RESTful e GraphQL',
    icon: '🔌',
    topics: [
      'REST vs GraphQL',
      'Versionamento de API',
      'Documentação (OpenAPI)',
      'Rate limiting e throttling'
    ]
  },
  {
    title: 'Authentication & Authorization',
    description: 'Segurança e controle de acesso',
    icon: '🔐',
    topics: [
      'JWT vs Sessions',
      'OAuth 2.0 / OpenID Connect',
      'Role-based access control',
      'Multi-factor authentication'
    ]
  },
  {
    title: 'Performance & Scaling',
    description: 'Otimização e escalabilidade',
    icon: '⚡',
    topics: [
      'Caching strategies',
      'Database optimization',
      'Load balancing',
      'Microservices architecture'
    ]
  }
];

const architecturePatterns = [
  {
    name: 'Monolithic',
    description: 'Aplicação única e coesa',
    pros: ['Simples de desenvolver', 'Fácil de testar', 'Deploy simples'],
    cons: ['Difícil de escalar', 'Tecnologia única', 'Acoplamento alto'],
    useCase: 'Projetos pequenos a médios, equipes pequenas'
  },
  {
    name: 'Microservices',
    description: 'Serviços independentes e especializados',
    pros: ['Escalabilidade independente', 'Tecnologias diversas', 'Falhas isoladas'],
    cons: ['Complexidade de rede', 'Consistência de dados', 'Overhead operacional'],
    useCase: 'Aplicações grandes, equipes distribuídas'
  },
  {
    name: 'Serverless',
    description: 'Funções executadas sob demanda',
    pros: ['Auto-scaling', 'Pay-per-use', 'Zero manutenção'],
    cons: ['Cold starts', 'Vendor lock-in', 'Limitações de runtime'],
    useCase: 'APIs simples, processamento de eventos'
  },
  {
    name: 'JAMstack',
    description: 'JavaScript, APIs e Markup pré-construído',
    pros: ['Performance alta', 'Segurança', 'Escalabilidade'],
    cons: ['Limitações dinâmicas', 'Build times', 'Complexidade de dados'],
    useCase: 'Sites estáticos, blogs, e-commerce simples'
  }
];

const comparisonData = [
  {
    technology: 'Prisma',
    type: 'ORM',
    language: 'TypeScript',
    database: 'Multi-DB',
    learning: 'Medium',
    performance: 'High',
    ecosystem: 'Growing'
  },
  {
    technology: 'Supabase',
    type: 'BaaS',
    language: 'Any',
    database: 'PostgreSQL',
    learning: 'Easy',
    performance: 'High',
    ecosystem: 'Large'
  },
  {
    technology: 'tRPC',
    type: 'API Framework',
    language: 'TypeScript',
    database: 'Agnostic',
    learning: 'Medium',
    performance: 'Very High',
    ecosystem: 'Growing'
  },
  {
    technology: 'Auth.js',
    type: 'Auth Library',
    language: 'JavaScript/TS',
    database: 'Multi-DB',
    learning: 'Easy',
    performance: 'High',
    ecosystem: 'Large'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

export default function BackendPage() {
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
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Database & Backend Development
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore tecnologias modernas para construir backends robustos, escaláveis e seguros. 
            Desde ORMs até autenticação e APIs type-safe.
          </p>
        </motion.div>

        {/* Featured Technologies */}
        <DemoSection title="Tecnologias em Destaque" description="As principais ferramentas para desenvolvimento backend moderno">
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-1.5 mb-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {backendTechnologies.map((tech) => {
              const Icon = tech.icon;
              return (
                <motion.div key={tech.name} variants={itemVariants}>
                  <Link href={tech.href}>
                    <div className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer border border-gray-200 dark:border-gray-700 overflow-hidden relative">
                      {/* Background Gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                      
                      {/* Icon */}
                      <div className="flex items-center mb-4">
                        <div className={`p-3 rounded-lg bg-gradient-to-br ${tech.color} text-white mr-3`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {tech.name}
                          </h3>
                          <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                            {tech.category}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                        {tech.description}
                      </p>
                      
                      {/* Stats */}
                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500 dark:text-gray-400">Popularidade</span>
                          <span className="text-xs">{tech.popularity}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500 dark:text-gray-400">Dificuldade</span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            tech.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                            tech.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {tech.difficulty}
                          </span>
                        </div>
                      </div>
                      
                      {/* Features */}
                      <div className="flex flex-wrap gap-1">
                        {tech.features.map((feature) => (
                          <span key={feature} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                            {feature}
                          </span>
                        ))}
                      </div>
                      
                      {/* Hover Arrow */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">→</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </DemoSection>

        {/* Backend Concepts */}
        <DemoSection title="Conceitos Fundamentais" description="Princípios essenciais para desenvolvimento backend">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-1.5 mb-8">
            {backendConcepts.map((concept, index) => (
              <motion.div
                key={concept.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <DemoCardStatic title={concept.title} description={concept.description}>
                  <div className="space-y-4">
                    <div className="text-4xl text-center">{concept.icon}</div>
                    <ul className="space-y-2">
                      {concept.topics.map((topic, idx) => (
                        <li key={idx} className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                          <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2 flex-shrink-0" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                </DemoCardStatic>
              </motion.div>
            ))}
          </div>
        </DemoSection>

        {/* Architecture Patterns */}
        <DemoSection title="Padrões de Arquitetura" description="Diferentes abordagens para estruturar aplicações backend">
          <div className="grid md:grid-cols-2 gap-1.5 mb-8">
            {architecturePatterns.map((pattern, index) => (
              <motion.div
                key={pattern.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {pattern.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {pattern.description}
                </p>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-medium text-green-700 dark:text-green-400 mb-2">✅ Vantagens</h4>
                    <ul className="space-y-1">
                      {pattern.pros.map((pro, idx) => (
                        <li key={idx} className="text-sm text-gray-600 dark:text-gray-300">
                          • {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-red-700 dark:text-red-400 mb-2">❌ Desvantagens</h4>
                    <ul className="space-y-1">
                      {pattern.cons.map((con, idx) => (
                        <li key={idx} className="text-sm text-gray-600 dark:text-gray-300">
                          • {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                  <h4 className="font-medium text-blue-700 dark:text-blue-400 mb-1">💡 Quando usar</h4>
                  <p className="text-sm text-blue-600 dark:text-blue-300">
                    {pattern.useCase}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </DemoSection>

        {/* Comparison Table */}
        <DemoSection title="Comparação de Tecnologias" description="Análise detalhada das principais ferramentas">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Tecnologia
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Tipo
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Linguagem
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Database
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Aprendizado
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Performance
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Ecossistema
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {comparisonData.map((item, index) => (
                    <motion.tr 
                      key={item.technology} 
                      className={`${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700/50' : ''} hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {item.technology}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {item.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {item.language}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {item.database}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          item.learning === 'Easy' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                          item.learning === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                          'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                          {item.learning}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {item.performance}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {item.ecosystem}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </DemoSection>

        {/* Getting Started */}
        <DemoSection title="Como Começar" description="Guia rápido para desenvolvimento backend">
          <div className="grid md:grid-cols-2 gap-1.5">
            <DemoCardStatic title="Setup Inicial" description="Configuração básica do ambiente">
              <CodeBlock
                language="bash"
                code={`# Criar projeto Next.js
npx create-next-app@latest my-app --typescript
cd my-app

# Instalar dependências backend
npm install prisma @prisma/client
npm install next-auth @auth/prisma-adapter
npm install bcryptjs jsonwebtoken

# Instalar dependências de desenvolvimento
npm install -D @types/bcryptjs @types/jsonwebtoken

# Inicializar Prisma
npx prisma init`}
              />
            </DemoCardStatic>

            <DemoCardStatic title="Estrutura de Projeto" description="Organização recomendada">
              <CodeBlock
                language="text"
                code={`my-app/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   ├── users/
│   │   │   └── posts/
│   │   └── page.tsx
│   ├── lib/
│   │   ├── prisma.ts
│   │   ├── auth.ts
│   │   └── utils.ts
│   └── types/
│       └── index.ts
├── .env.local
└── package.json`}
              />
            </DemoCardStatic>
          </div>
        </DemoSection>

        {/* Best Practices */}
        <DemoSection title="Melhores Práticas" description="Diretrizes para desenvolvimento backend de qualidade">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <div className="grid md:grid-cols-2 gap-1.5">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-green-500" />
                  Segurança
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Sempre validar e sanitizar inputs</li>
                  <li>• Usar HTTPS em produção</li>
                  <li>• Implementar rate limiting</li>
                  <li>• Nunca expor informações sensíveis</li>
                  <li>• Usar variáveis de ambiente para secrets</li>
                  <li>• Implementar logging de segurança</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-blue-500" />
                  Performance
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Implementar caching estratégico</li>
                  <li>• Otimizar queries de database</li>
                  <li>• Usar paginação para listas grandes</li>
                  <li>• Implementar connection pooling</li>
                  <li>• Monitorar métricas de performance</li>
                  <li>• Usar CDN para assets estáticos</li>
                </ul>
              </div>
            </div>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}