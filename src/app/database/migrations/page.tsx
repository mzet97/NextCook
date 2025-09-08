'use client';

import { useState } from 'react';
import { GitBranch, Database, ArrowRight, Play, RotateCcw, Upload, Download, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import DemoCardStatic from '@/components/DemoCardStatic';

const migrationTopics = [
  {
    title: 'Schema Evolution',
    description: 'Evolução controlada do schema do banco',
    icon: <GitBranch className="w-5 h-5" />,
    concepts: ['Versionamento', 'Mudanças incrementais', 'Compatibilidade', 'Rollback']
  },
  {
    title: 'Migration Files',
    description: 'Estrutura e organização de arquivos',
    icon: <Database className="w-5 h-5" />,
    concepts: ['Naming convention', 'Timestamps', 'Up/Down scripts', 'Dependencies']
  },
  {
    title: 'Deployment Strategies',
    description: 'Estratégias para deploy em produção',
    icon: <Upload className="w-5 h-5" />,
    concepts: ['Zero downtime', 'Blue-green', 'Rolling updates', 'Backup/Restore']
  },
  {
    title: 'Data Seeding',
    description: 'População inicial e dados de teste',
    icon: <Play className="w-5 h-5" />,
    concepts: ['Initial data', 'Test fixtures', 'Environment-specific', 'Idempotency']
  }
];

const codeExamples = [
  {
    title: 'Prisma Migrations Básicas',
    description: 'Comandos essenciais para gerenciar migrations',
    code: `# Inicializar Prisma em um projeto
npx prisma init

# Gerar migration a partir do schema
npx prisma migrate dev --name init

# Aplicar migrations em produção
npx prisma migrate deploy

# Reset do banco (desenvolvimento)
npx prisma migrate reset

# Verificar status das migrations
npx prisma migrate status

# Resolver conflitos de migration
npx prisma migrate resolve --applied "20240101000000_init"

# Gerar Prisma Client
npx prisma generate

# Visualizar banco no Prisma Studio
npx prisma studio`,
    language: 'bash'
  },
  {
    title: 'Schema Evolution',
    description: 'Exemplo de evolução do schema com migrations',
    code: `// schema.prisma - Versão inicial
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  
  @@map("users")
}

// Migration 1: 20240101000000_init.sql
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

// schema.prisma - Adicionando campos
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  avatar    String?  // Novo campo
  isActive  Boolean  @default(true) // Novo campo
  createdAt DateTime @default(now()) // Novo campo
  updatedAt DateTime @updatedAt // Novo campo
  
  // Novo relacionamento
  posts     Post[]
  
  @@map("users")
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  author    User     @relation(fields: [authorId], references: [id], onDelete: Cascade)
  authorId  Int
  
  @@map("posts")
}

// Migration 2: 20240102000000_add_user_fields_and_posts.sql
-- AlterTable
ALTER TABLE "users" ADD COLUMN "avatar" TEXT,
ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "posts" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_authorId_fkey" 
  FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

// schema.prisma - Mudança de tipo de campo (requer cuidado)
model User {
  id        String   @id @default(cuid()) // Mudança de Int para String
  email     String   @unique
  name      String?
  avatar    String?
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  posts     Post[]
  
  @@map("users")
}

// Migration 3: 20240103000000_change_user_id_to_string.sql
-- Esta migration é complexa e pode requerer downtime
-- Estratégia: criar nova tabela, migrar dados, renomear

-- CreateTable
CREATE TABLE "users_new" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "avatar" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_new_pkey" PRIMARY KEY ("id")
);

-- Migrar dados (exemplo simplificado)
INSERT INTO "users_new" ("id", "email", "name", "avatar", "isActive", "createdAt", "updatedAt")
SELECT 
  'user_' || "id"::text as "id",
  "email",
  "name",
  "avatar",
  "isActive",
  "createdAt",
  "updatedAt"
FROM "users";

-- Atualizar posts para usar novos IDs
UPDATE "posts" SET "authorId" = 'user_' || "authorId"::text;

-- Remover constraint antiga
ALTER TABLE "posts" DROP CONSTRAINT "posts_authorId_fkey";

-- Alterar tipo da coluna authorId
ALTER TABLE "posts" ALTER COLUMN "authorId" TYPE TEXT;

-- Dropar tabela antiga e renomear
DROP TABLE "users";
ALTER TABLE "users_new" RENAME TO "users";

-- Recriar índices e constraints
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
ALTER TABLE "posts" ADD CONSTRAINT "posts_authorId_fkey" 
  FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;`,
    language: 'sql'
  },
  {
    title: 'Data Seeding',
    description: 'Scripts para popular o banco com dados iniciais',
    code: `// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Limpar dados existentes (apenas em desenvolvimento)
  if (process.env.NODE_ENV === 'development') {
    await prisma.post.deleteMany();
    await prisma.user.deleteMany();
    console.log('🗑️  Dados existentes removidos');
  }

  // Criar usuários
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'admin@example.com',
        name: 'Admin User',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
        isActive: true,
      }
    }),
    prisma.user.create({
      data: {
        email: 'john@example.com',
        name: 'John Doe',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
        isActive: true,
      }
    }),
    prisma.user.create({
      data: {
        email: 'jane@example.com',
        name: 'Jane Smith',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
        isActive: true,
      }
    })
  ]);

  console.log('👥 Criados ' + users.length + ' usuários');

  // Criar posts
  const posts = [];
  for (const user of users) {
    const userPosts = await Promise.all([
      prisma.post.create({
        data: {
          title: 'Primeiro post de ' + user.name,
          content: 'Este é o primeiro post criado por ' + user.name + '. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          published: true,
          authorId: user.id,
        }
      }),
      prisma.post.create({
        data: {
          title: 'Tutorial sobre Next.js por ' + user.name,
          content: 'Neste tutorial, ' + user.name + ' explica como criar aplicações modernas com Next.js...',
          published: Math.random() > 0.3, // 70% chance de estar publicado
          authorId: user.id,
        }
      })
    ]);
    posts.push(...userPosts);
  }

  console.log('📝 Criados ' + posts.length + ' posts');

  // Criar categorias (se existirem no schema)
  try {
    const categories = await Promise.all([
      prisma.category.create({
        data: { name: 'Tecnologia' }
      }),
      prisma.category.create({
        data: { name: 'Tutorial' }
      }),
      prisma.category.create({
        data: { name: 'Notícias' }
      })
    ]);
    console.log('🏷️  Criadas ' + categories.length + ' categorias');
  } catch (error) {
    console.log('ℹ️  Categorias não criadas (modelo pode não existir)');
  }

  console.log('✅ Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// package.json - adicionar script
{
  "scripts": {
    "db:seed": "tsx prisma/seed.ts",
    "db:reset": "prisma migrate reset --force",
    "db:push": "prisma db push",
    "db:studio": "prisma studio"
  }
}

// Seed específico por ambiente
// prisma/seeds/development.ts
export async function developmentSeed(prisma: PrismaClient) {
  // Dados para desenvolvimento - mais volume
  const users = [];
  for (let i = 1; i <= 50; i++) {
    users.push({
      email: 'user' + i + '@example.com',
      name: 'User ' + i,
      avatar: 'https://i.pravatar.cc/100?img=' + i,
      isActive: Math.random() > 0.1 // 90% ativos
    });
  }
  
  await prisma.user.createMany({ data: users });
  console.log('👥 Criados ' + users.length + ' usuários de desenvolvimento');
}

// prisma/seeds/production.ts
export async function productionSeed(prisma: PrismaClient) {
  // Apenas dados essenciais para produção
  const adminUser = await prisma.user.create({
    data: {
      email: process.env.ADMIN_EMAIL || 'admin@company.com',
      name: 'System Administrator',
      isActive: true,
    }
  });
  
  console.log('👑 Usuário administrador criado');
  return adminUser;
}

// Seed condicional
// prisma/seed.ts (versão avançada)
import { developmentSeed } from './seeds/development';
import { productionSeed } from './seeds/production';

async function main() {
  console.log('🌱 Executando seed para ambiente: ' + process.env.NODE_ENV);
  
  switch (process.env.NODE_ENV) {
    case 'development':
      await developmentSeed(prisma);
      break;
    case 'production':
      await productionSeed(prisma);
      break;
    default:
      console.log('⚠️  Ambiente não reconhecido, executando seed básico');
      // Seed básico aqui
  }
}`,
    language: 'typescript'
  },
  {
    title: 'Migration Strategies',
    description: 'Estratégias avançadas para migrations em produção',
    code: `// Estratégia 1: Zero Downtime Migration
// Para mudanças que podem quebrar compatibilidade

// Passo 1: Adicionar nova coluna (compatível)
// Migration: 20240201000000_add_new_email_column.sql
ALTER TABLE "users" ADD COLUMN "email_new" TEXT;

// Passo 2: Aplicação passa a escrever em ambas as colunas
// Código da aplicação (versão intermediária)
const updateUser = async (id: string, data: any) => {
  return await prisma.user.update({
    where: { id },
    data: {
      ...data,
      email: data.email, // Coluna antiga
      email_new: data.email, // Coluna nova
    }
  });
};

// Passo 3: Migrar dados existentes
// Migration: 20240202000000_migrate_email_data.sql
UPDATE "users" SET "email_new" = "email" WHERE "email_new" IS NULL;

// Passo 4: Aplicação passa a ler da nova coluna
// Código da aplicação (nova versão)
const getUser = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email_new: true, // Lendo da nova coluna
      name: true,
    }
  });
  
  return {
    ...user,
    email: user.email_new // Mapeando para o nome esperado
  };
};

// Passo 5: Remover coluna antiga e renomear
// Migration: 20240203000000_finalize_email_migration.sql
ALTER TABLE "users" DROP COLUMN "email";
ALTER TABLE "users" RENAME COLUMN "email_new" TO "email";
ALTER TABLE "users" ALTER COLUMN "email" SET NOT NULL;
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

// Estratégia 2: Blue-Green Deployment
// docker-compose.yml
version: '3.8'
services:
  # Banco atual (blue)
  postgres-blue:
    image: postgres:15
    environment:
      POSTGRES_DB: myapp_blue
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_blue_data:/var/lib/postgresql/data

  # Banco novo (green)
  postgres-green:
    image: postgres:15
    environment:
      POSTGRES_DB: myapp_green
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    ports:
      - "5433:5432"
    volumes:
      - postgres_green_data:/var/lib/postgresql/data

volumes:
  postgres_blue_data:
  postgres_green_data:

// Script de migração blue-green
// scripts/blue-green-migration.sh
#!/bin/bash

set -e

echo "🔄 Iniciando migração Blue-Green"

# 1. Backup do banco blue
echo "📦 Criando backup do banco blue..."
pg_dump -h localhost -p 5432 -U postgres myapp_blue > backup_$(date +%Y%m%d_%H%M%S).sql

# 2. Restaurar backup no banco green
echo "🔄 Restaurando backup no banco green..."
psql -h localhost -p 5433 -U postgres myapp_green < backup_*.sql

# 3. Aplicar novas migrations no green
echo "🚀 Aplicando migrations no banco green..."
DATABASE_URL="postgresql://postgres:password@localhost:5433/myapp_green" npx prisma migrate deploy

# 4. Validar integridade dos dados
echo "✅ Validando integridade dos dados..."
node scripts/validate-migration.js

# 5. Switch de bancos (atualizar variáveis de ambiente)
echo "🔀 Fazendo switch para o banco green..."
# Aqui você atualizaria as variáveis de ambiente ou configuração
# para apontar para o banco green

echo "✅ Migração Blue-Green concluída!"

// Estratégia 3: Rolling Updates com Backward Compatibility
// Garantir que migrations sejam compatíveis com versão anterior

// ❌ EVITAR - Migration que quebra compatibilidade
ALTER TABLE "users" DROP COLUMN "old_field";

// ✅ FAZER - Migration compatível
// Passo 1: Marcar campo como deprecated (não remover ainda)
ALTER TABLE "users" ADD COLUMN "new_field" TEXT;
-- old_field ainda existe

// Passo 2: Aplicação atualizada para usar new_field
// mas ainda mantém old_field para compatibilidade

// Passo 3: Após todas as instâncias atualizadas, remover old_field
ALTER TABLE "users" DROP COLUMN "old_field";

// Estratégia 4: Feature Flags para Migrations
// Controlar rollout de mudanças de schema

// prisma/migrations/conditional-migration.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function conditionalMigration() {
  // Verificar feature flag
  const enableNewFeature = process.env.ENABLE_NEW_FEATURE === 'true';
  
  if (enableNewFeature) {
    console.log('🚀 Aplicando migration da nova feature...');
    
    // Aplicar migration apenas se feature estiver habilitada
    await prisma.$executeRaw(
      'ALTER TABLE "users" ADD COLUMN "new_feature_field" TEXT;'
    );
    
    console.log('✅ Migration da nova feature aplicada');
  } else {
    console.log('⏸️  Migration da nova feature pulada (feature flag desabilitada)');
  }
}

conditionalMigration()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

// Estratégia 5: Rollback Automático
// Sistema para reverter migrations automaticamente em caso de erro

// scripts/safe-migration.ts
import { PrismaClient } from '@prisma/client';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const prisma = new PrismaClient();

async function safeMigration() {
  // 1. Criar checkpoint
  console.log('📸 Criando checkpoint...');
  const checkpointName = 'checkpoint_' + Date.now();
  await execAsync('pg_dump ' + process.env.DATABASE_URL + ' > ' + checkpointName + '.sql');
  
  try {
    // 2. Aplicar migration
    console.log('🚀 Aplicando migration...');
    await execAsync('npx prisma migrate deploy');
    
    // 3. Executar testes de validação
    console.log('🧪 Executando testes de validação...');
    await runValidationTests();
    
    console.log('✅ Migration aplicada com sucesso!');
    
  } catch (error) {
    console.error('❌ Erro durante migration:', error);
    
    // 4. Rollback automático
    console.log('🔄 Executando rollback automático...');
    await execAsync('psql ' + process.env.DATABASE_URL + ' < ' + checkpointName + '.sql');
    
    console.log('↩️  Rollback concluído');
    throw error;
  } finally {
    // 5. Limpar checkpoint (opcional)
    // await execAsync('rm ' + checkpointName + '.sql');
  }
}

async function runValidationTests() {
  // Testes básicos de integridade
  const userCount = await prisma.user.count();
  const postCount = await prisma.post.count();
  
  console.log('📊 Validação: ' + userCount + ' usuários, ' + postCount + ' posts');
  
  // Verificar se queries críticas ainda funcionam
  await prisma.user.findFirst();
  await prisma.post.findFirst();
  
  console.log('✅ Testes de validação passaram');
}`,
    language: 'typescript'
  }
];

const bestPractices = [
  {
    title: 'Naming Conventions',
    description: 'Convenções para nomear migrations',
    icon: <Info className="w-5 h-5 text-blue-600" />,
    practices: [
      'Use timestamps: YYYYMMDDHHMMSS_description',
      'Seja descritivo: add_user_avatar_field',
      'Use verbos: create, add, remove, update',
      'Mantenha consistência no projeto'
    ]
  },
  {
    title: 'Safety First',
    description: 'Práticas de segurança',
    icon: <CheckCircle className="w-5 h-5 text-green-600" />,
    practices: [
      'Sempre faça backup antes de migrations',
      'Teste migrations em ambiente de staging',
      'Use transações quando possível',
      'Implemente rollback strategies'
    ]
  },
  {
    title: 'Performance',
    description: 'Otimizações de performance',
    icon: <AlertTriangle className="w-5 h-5 text-yellow-600" />,
    practices: [
      'Evite migrations longas em horário de pico',
      'Use CONCURRENTLY para índices grandes',
      'Monitore locks durante migrations',
      'Considere migrations em batches'
    ]
  },
  {
    title: 'Team Collaboration',
    description: 'Colaboração em equipe',
    icon: <GitBranch className="w-5 h-5 text-purple-600" />,
    practices: [
      'Resolva conflitos de migration rapidamente',
      'Comunique mudanças breaking',
      'Use feature flags para mudanças grandes',
      'Documente migrations complexas'
    ]
  }
];

export default function MigrationsPage() {
  const [selectedExample, setSelectedExample] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs />
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
            <GitBranch className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Database Migrations
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Gerencie a evolução do seu schema de banco de dados de forma segura e controlada com migrations, seeds e estratégias de deploy.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-lg p-1 shadow-sm border">
            {[
              { id: 'overview', label: 'Visão Geral' },
              { id: 'examples', label: 'Exemplos' },
              { id: 'practices', label: 'Boas Práticas' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-green-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'overview' && (
          <>
            {/* Topics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1.5 mb-12">
              {migrationTopics.map((topic, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-green-50 rounded-lg mr-3">
                      {topic.icon}
                    </div>
                    <h3 className="font-semibold text-gray-900">{topic.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{topic.description}</p>
                  <ul className="space-y-1">
                    {topic.concepts.map((concept, conceptIndex) => (
                      <li key={conceptIndex} className="flex items-center text-sm text-gray-500">
                        <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                        {concept}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Migration Workflow */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Fluxo de Trabalho com Migrations</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {[
                  { step: '1', title: 'Modificar Schema', desc: 'Alterar schema.prisma', icon: <Database className="w-5 h-5" /> },
                  { step: '2', title: 'Gerar Migration', desc: 'npx prisma migrate dev', icon: <GitBranch className="w-5 h-5" /> },
                  { step: '3', title: 'Revisar SQL', desc: 'Verificar arquivo gerado', icon: <Info className="w-5 h-5" /> },
                  { step: '4', title: 'Testar', desc: 'Validar em staging', icon: <Play className="w-5 h-5" /> },
                  { step: '5', title: 'Deploy', desc: 'Aplicar em produção', icon: <Upload className="w-5 h-5" /> }
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
                      {item.icon}
                    </div>
                    <div className="text-sm font-medium text-gray-900 mb-1">{item.step}. {item.title}</div>
                    <div className="text-xs text-gray-500">{item.desc}</div>
                    {index < 4 && (
                      <ArrowRight className="w-4 h-4 text-gray-400 mx-auto mt-2" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'examples' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Exemplos Práticos</h2>
              <p className="text-gray-600">Aprenda com exemplos reais de migrations e seeding</p>
            </div>
            
            <div className="flex border-b border-gray-100 overflow-x-auto">
              {codeExamples.map((example, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedExample(index)}
                  className={`flex-shrink-0 p-4 text-left transition-colors min-w-[200px] ${
                    selectedExample === index
                      ? 'bg-green-50 border-b-2 border-green-600 text-green-700'
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
                  <pre className="text-green-400 text-sm">
                    <code>{codeExamples[selectedExample].code}</code>
                  </pre>
                </div>
              </DemoCardStatic>
            </div>
          </div>
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
                  {practice.practices.map((tip, tipIndex) => (
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

        {/* Quick Commands */}
        <div className="mt-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-8 text-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Comandos Essenciais</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
              <div className="bg-black/20 rounded-lg p-4">
                <h3 className="font-semibold mb-2">🚀 Desenvolvimento</h3>
                <code className="text-sm block space-y-1">
                  <div>npx prisma migrate dev --name init</div>
                  <div>npx prisma migrate reset</div>
                  <div>npx prisma db seed</div>
                  <div>npx prisma studio</div>
                </code>
              </div>
              <div className="bg-black/20 rounded-lg p-4">
                <h3 className="font-semibold mb-2">🏭 Produção</h3>
                <code className="text-sm block space-y-1">
                  <div>npx prisma migrate deploy</div>
                  <div>npx prisma migrate status</div>
                  <div>npx prisma generate</div>
                  <div>npx prisma migrate resolve</div>
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}