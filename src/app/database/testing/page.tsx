'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TestTube, 
  Database, 
  CheckCircle, 
  Play,
  RotateCcw,
  AlertTriangle,
  Clock,
  Users,
  Code,
  Settings,
  Zap,
  Target
} from 'lucide-react';
import { DemoCardStatic } from '@/components/DemoCardStatic';
import { DemoSection } from '@/components/DemoSection';
import Breadcrumbs from '@/components/Breadcrumbs';

const testingTypes = [
  {
    title: 'Testes Unitários',
    description: 'Testes de funções e procedimentos isolados',
    icon: TestTube,
    color: 'text-blue-500',
    benefits: ['Isolamento', 'Rapidez', 'Feedback Imediato', 'Cobertura Granular']
  },
  {
    title: 'Testes de Integração',
    description: 'Testes de interação entre componentes',
    icon: Database,
    color: 'text-green-500',
    benefits: ['Fluxo Completo', 'Dados Reais', 'Cenários Complexos', 'Validação E2E']
  },
  {
    title: 'Testes de Performance',
    description: 'Testes de carga e performance',
    icon: Zap,
    color: 'text-yellow-500',
    benefits: ['Load Testing', 'Stress Testing', 'Benchmarking', 'Otimização']
  },
  {
    title: 'Testes de Dados',
    description: 'Validação de qualidade e integridade',
    icon: Target,
    color: 'text-purple-500',
    benefits: ['Data Quality', 'Consistency', 'Validation', 'Migration Testing']
  }
];

const testingFrameworks = [
  {
    name: 'Jest + Prisma',
    description: 'Testes unitários com Prisma ORM',
    type: 'Unit Testing',
    features: ['Mocking', 'Snapshots', 'Coverage', 'Async Testing'],
    example: `// tests/user.service.test.ts
import { PrismaClient } from '@prisma/client'
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended'
import { UserService } from '../src/services/user.service'

// Mock do Prisma
const prismaMock = mockDeep<PrismaClient>()
const userService = new UserService(prismaMock)

beforeEach(() => {
  mockReset(prismaMock)
})

describe('UserService', () => {
  test('should create user successfully', async () => {
    // Arrange
    const userData = {
      email: 'test@example.com',
      name: 'Test User'
    }
    
    const expectedUser = {
      id: 1,
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    prismaMock.user.create.mockResolvedValue(expectedUser)
    
    // Act
    const result = await userService.createUser(userData)
    
    // Assert
    expect(result).toEqual(expectedUser)
    expect(prismaMock.user.create).toHaveBeenCalledWith({
      data: userData
    })
  })
  
  test('should handle duplicate email error', async () => {
    // Arrange
    const userData = {
      email: 'existing@example.com',
      name: 'Test User'
    }
    
    prismaMock.user.create.mockRejectedValue(
      new Error('Unique constraint failed')
    )
    
    // Act & Assert
    await expect(userService.createUser(userData))
      .rejects.toThrow('Unique constraint failed')
  })
  
  test('should find user by email', async () => {
    // Arrange
    const email = 'test@example.com'
    const expectedUser = {
      id: 1,
      email,
      name: 'Test User',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    prismaMock.user.findUnique.mockResolvedValue(expectedUser)
    
    // Act
    const result = await userService.findByEmail(email)
    
    // Assert
    expect(result).toEqual(expectedUser)
    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
      where: { email }
    })
  })
})`
  },
  {
    name: 'Testcontainers',
    description: 'Testes de integração com containers',
    type: 'Integration Testing',
    features: ['Real Database', 'Isolation', 'Docker', 'Cleanup'],
    example: `// tests/integration/user.integration.test.ts
import { GenericContainer, StartedTestContainer } from 'testcontainers'
import { PrismaClient } from '@prisma/client'
import { UserService } from '../../src/services/user.service'

describe('User Integration Tests', () => {
  let container: StartedTestContainer
  let prisma: PrismaClient
  let userService: UserService
  
  beforeAll(async () => {
    // Iniciar container PostgreSQL
    container = await new GenericContainer('postgres:14')
      .withEnvironment({
        POSTGRES_DB: 'testdb',
        POSTGRES_USER: 'testuser',
        POSTGRES_PASSWORD: 'testpass'
      })
      .withExposedPorts(5432)
      .start()
    
    // Configurar Prisma com banco de teste
    const databaseUrl = \`postgresql://testuser:testpass@localhost:\${container.getMappedPort(5432)}/testdb\`
    
    prisma = new PrismaClient({
      datasources: {
        db: { url: databaseUrl }
      }
    })
    
    // Executar migrations
    await prisma.$executeRaw\`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"\`
    // Aqui você executaria suas migrations
    
    userService = new UserService(prisma)
  })
  
  afterAll(async () => {
    await prisma.$disconnect()
    await container.stop()
  })
  
  beforeEach(async () => {
    // Limpar dados entre testes
    await prisma.user.deleteMany()
  })
  
  test('should create and retrieve user', async () => {
    // Arrange
    const userData = {
      email: 'integration@example.com',
      name: 'Integration Test User'
    }
    
    // Act
    const createdUser = await userService.createUser(userData)
    const foundUser = await userService.findByEmail(userData.email)
    
    // Assert
    expect(createdUser.email).toBe(userData.email)
    expect(createdUser.name).toBe(userData.name)
    expect(foundUser).toEqual(createdUser)
  })
  
  test('should handle concurrent user creation', async () => {
    // Arrange
    const userData = {
      email: 'concurrent@example.com',
      name: 'Concurrent Test'
    }
    
    // Act
    const promises = Array(5).fill(null).map(() => 
      userService.createUser({
        ...userData,
        email: \`\${Math.random()}@example.com\`
      })
    )
    
    const results = await Promise.all(promises)
    
    // Assert
    expect(results).toHaveLength(5)
    results.forEach(user => {
      expect(user.id).toBeDefined()
      expect(user.createdAt).toBeDefined()
    })
  })
})`
  },
  {
    name: 'Artillery + SQL',
    description: 'Testes de performance de banco',
    type: 'Performance Testing',
    features: ['Load Testing', 'Stress Testing', 'Metrics', 'Reporting'],
    example: `# artillery-db-test.yml
config:
  target: 'http://localhost:3000'
  phases:
    - duration: 60
      arrivalRate: 10
      name: "Warm up"
    - duration: 120
      arrivalRate: 50
      name: "Load test"
    - duration: 60
      arrivalRate: 100
      name: "Stress test"
  
  processor: "./test-functions.js"
  
scenarios:
  - name: "Database operations"
    weight: 100
    flow:
      - post:
          url: "/api/users"
          json:
            email: "{{ $randomEmail() }}"
            name: "{{ $randomFullName() }}"
          capture:
            - json: "$.id"
              as: "userId"
      
      - get:
          url: "/api/users/{{ userId }}"
      
      - put:
          url: "/api/users/{{ userId }}"
          json:
            name: "{{ $randomFullName() }} Updated"
      
      - delete:
          url: "/api/users/{{ userId }}"

# test-functions.js
module.exports = {
  $randomEmail: () => {
    return \`test\${Math.random().toString(36).substr(2, 9)}@example.com\`
  },
  
  $randomFullName: () => {
    const firstNames = ['João', 'Maria', 'Pedro', 'Ana', 'Carlos']
    const lastNames = ['Silva', 'Santos', 'Oliveira', 'Souza', 'Lima']
    
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
    
    return \`\${firstName} \${lastName}\`
  }
}

# Executar teste
# artillery run artillery-db-test.yml

# Exemplo de teste SQL direto
-- performance-test.sql
-- Teste de performance de consultas

-- Criar dados de teste
INSERT INTO users (email, name, created_at)
SELECT 
  'user' || generate_series(1, 100000) || '@example.com',
  'User ' || generate_series(1, 100000),
  NOW() - (random() * interval '365 days')
;

-- Teste de consulta simples
EXPLAIN ANALYZE
SELECT * FROM users WHERE email = 'user50000@example.com';

-- Teste de consulta com JOIN
EXPLAIN ANALYZE
SELECT u.*, COUNT(p.id) as post_count
FROM users u
LEFT JOIN posts p ON u.id = p.author_id
WHERE u.created_at >= NOW() - interval '30 days'
GROUP BY u.id
ORDER BY post_count DESC
LIMIT 100;

-- Teste de inserção em lote
EXPLAIN ANALYZE
INSERT INTO posts (title, content, author_id, created_at)
SELECT 
  'Post ' || generate_series(1, 10000),
  'Content for post ' || generate_series(1, 10000),
  (random() * 100000)::int + 1,
  NOW() - (random() * interval '30 days')
;`
  }
];

const dataTestingExamples = [
  {
    title: 'Validação de Schema',
    description: 'Testes de estrutura e constraints',
    code: `-- tests/schema-validation.sql
-- Teste de constraints e estrutura

-- Verificar se tabelas existem
SELECT 
  table_name,
  table_type
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;

-- Verificar constraints de NOT NULL
SELECT 
  table_name,
  column_name,
  is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND is_nullable = 'NO'
ORDER BY table_name, column_name;

-- Verificar foreign keys
SELECT 
  tc.table_name,
  kcu.column_name,
  ccu.table_name AS foreign_table_name,
  ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY'
ORDER BY tc.table_name;

-- Teste de constraint violation
DO $$
BEGIN
  -- Tentar inserir email duplicado
  INSERT INTO users (email, name) VALUES ('test@example.com', 'Test');
  INSERT INTO users (email, name) VALUES ('test@example.com', 'Test 2');
  
  RAISE EXCEPTION 'Constraint test failed: duplicate email allowed';
EXCEPTION
  WHEN unique_violation THEN
    RAISE NOTICE 'SUCCESS: Unique constraint working correctly';
END $$;`
  },
  {
    title: 'Qualidade de Dados',
    description: 'Testes de integridade e qualidade',
    code: `-- tests/data-quality.sql
-- Testes de qualidade de dados

-- Verificar dados órfãos
SELECT 'Orphaned posts' as test_name, COUNT(*) as count
FROM posts p
LEFT JOIN users u ON p.author_id = u.id
WHERE u.id IS NULL;

-- Verificar emails inválidos
SELECT 'Invalid emails' as test_name, COUNT(*) as count
FROM users
WHERE email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$';

-- Verificar dados duplicados
SELECT 'Duplicate emails' as test_name, COUNT(*) as count
FROM (
  SELECT email, COUNT(*) as cnt
  FROM users
  GROUP BY email
  HAVING COUNT(*) > 1
) duplicates;

-- Verificar consistência de timestamps
SELECT 'Future timestamps' as test_name, COUNT(*) as count
FROM users
WHERE created_at > NOW();

-- Verificar valores nulos em campos obrigatórios
SELECT 'Null required fields' as test_name, COUNT(*) as count
FROM users
WHERE email IS NULL OR name IS NULL;

-- Verificar ranges de valores
SELECT 'Invalid age values' as test_name, COUNT(*) as count
FROM users
WHERE age < 0 OR age > 150;

-- Teste de integridade referencial
WITH integrity_check AS (
  SELECT 
    'posts_users' as relationship,
    COUNT(CASE WHEN u.id IS NULL THEN 1 END) as orphaned_records
  FROM posts p
  LEFT JOIN users u ON p.author_id = u.id
  
  UNION ALL
  
  SELECT 
    'comments_posts' as relationship,
    COUNT(CASE WHEN p.id IS NULL THEN 1 END) as orphaned_records
  FROM comments c
  LEFT JOIN posts p ON c.post_id = p.id
)
SELECT 
  relationship,
  orphaned_records,
  CASE 
    WHEN orphaned_records = 0 THEN 'PASS'
    ELSE 'FAIL'
  END as status
FROM integrity_check;`
  },
  {
    title: 'Testes de Migração',
    description: 'Validação de migrations e rollbacks',
    code: `// tests/migration.test.ts
import { PrismaClient } from '@prisma/client'
import { execSync } from 'child_process'

describe('Migration Tests', () => {
  let prisma: PrismaClient
  
  beforeAll(async () => {
    // Setup test database
    process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/migration_test'
    prisma = new PrismaClient()
  })
  
  afterAll(async () => {
    await prisma.$disconnect()
  })
  
  test('should run migrations successfully', async () => {
    // Reset database
    execSync('npx prisma migrate reset --force', { stdio: 'inherit' })
    
    // Run migrations
    execSync('npx prisma migrate deploy', { stdio: 'inherit' })
    
    // Verify schema
    const tables = await prisma.$queryRaw\`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    \`
    
    expect(tables).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ table_name: 'users' }),
        expect.objectContaining({ table_name: 'posts' }),
        expect.objectContaining({ table_name: 'comments' })
      ])
    )
  })
  
  test('should preserve data during migration', async () => {
    // Insert test data
    const user = await prisma.user.create({
      data: {
        email: 'migration@test.com',
        name: 'Migration Test User'
      }
    })
    
    // Run a new migration (simulate adding a column)
    // This would be a real migration file in practice
    await prisma.$executeRaw\`
      ALTER TABLE users ADD COLUMN IF NOT EXISTS phone VARCHAR(20)
    \`
    
    // Verify data is preserved
    const preservedUser = await prisma.user.findUnique({
      where: { id: user.id }
    })
    
    expect(preservedUser).toMatchObject({
      email: 'migration@test.com',
      name: 'Migration Test User'
    })
  })
  
  test('should handle migration rollback', async () => {
    // Create a migration that can be rolled back
    await prisma.$executeRaw\`
      CREATE TABLE IF NOT EXISTS temp_table (
        id SERIAL PRIMARY KEY,
        data TEXT
      )
    \`
    
    // Verify table exists
    const tableExists = await prisma.$queryRaw\`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public'
        AND table_name = 'temp_table'
      )
    \`
    
    expect(tableExists[0].exists).toBe(true)
    
    // Rollback (drop table)
    await prisma.$executeRaw\`DROP TABLE IF EXISTS temp_table\`
    
    // Verify table is gone
    const tableGone = await prisma.$queryRaw\`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public'
        AND table_name = 'temp_table'
      )
    \`
    
    expect(tableGone[0].exists).toBe(false)
  })
})`
  }
];

export default function DatabaseTestingPage() {
  const [selectedFramework, setSelectedFramework] = useState(0);
  const [selectedDataTest, setSelectedDataTest] = useState(0);
  const [runningTest, setRunningTest] = useState(false);
  const [testResults, setTestResults] = useState<any>(null);

  const runTestDemo = async () => {
    setRunningTest(true);
    setTestResults(null);
    
    // Simulate test execution
    setTimeout(() => {
      setTestResults({
        total: 15,
        passed: 13,
        failed: 2,
        coverage: 87,
        duration: '2.34s'
      });
      setRunningTest(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-blue-100 dark:from-gray-900 dark:via-green-900 dark:to-blue-900">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs />
        
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl mb-6">
            <TestTube className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Testes de Banco de Dados
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Estratégias e ferramentas para testar aplicações com banco de dados de forma eficaz
          </p>
        </motion.div>

        {/* Testing Types */}
        <DemoSection title="Tipos de Teste" description="Diferentes abordagens para testar banco de dados">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-1.5 mb-8">
            {testingTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <motion.div
                  key={type.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <DemoCardStatic title={type.title} description={type.description}>
                    <div className="space-y-4">
                      <Icon className={`h-12 w-12 mx-auto ${type.color}`} />
                      <div className="space-y-2">
                        {type.benefits.map((benefit) => (
                          <div key={benefit} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
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

        {/* Testing Frameworks */}
        <DemoSection title="Frameworks de Teste" description="Ferramentas para diferentes tipos de teste">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8 px-6 overflow-x-auto">
                {testingFrameworks.map((framework, index) => (
                  <button
                    key={framework.name}
                    onClick={() => setSelectedFramework(index)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                      selectedFramework === index
                        ? 'border-green-500 text-green-600 dark:text-green-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    {framework.name}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {testingFrameworks[selectedFramework].name}
                  </h3>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                    {testingFrameworks[selectedFramework].type}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {testingFrameworks[selectedFramework].description}
                </p>
                
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Características:</h4>
                  <div className="flex flex-wrap gap-2">
                    {testingFrameworks[selectedFramework].features.map((feature) => (
                      <span key={feature} className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-green-400 text-sm">
                  <code>{testingFrameworks[selectedFramework].example}</code>
                </pre>
              </div>
            </div>
          </div>
        </DemoSection>

        {/* Data Testing */}
        <DemoSection title="Testes de Dados" description="Validação de qualidade e integridade de dados">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8 px-6 overflow-x-auto">
                {dataTestingExamples.map((example, index) => (
                  <button
                    key={example.title}
                    onClick={() => setSelectedDataTest(index)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                      selectedDataTest === index
                        ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    {example.title}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {dataTestingExamples[selectedDataTest].title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {dataTestingExamples[selectedDataTest].description}
                </p>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-blue-400 text-sm">
                  <code>{dataTestingExamples[selectedDataTest].code}</code>
                </pre>
              </div>
            </div>
          </div>
        </DemoSection>

        {/* Test Runner Demo */}
        <DemoSection title="Executar Testes" description="Demonstração de execução de testes">
          <DemoCardStatic title="Database Test Runner" description="Simule a execução de testes de banco de dados">
            <div className="space-y-4">
              <button
                onClick={runTestDemo}
                disabled={runningTest}
                className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Play className="h-5 w-5 mr-2" />
                {runningTest ? 'Executando...' : 'Executar Testes DB'}
              </button>
              
              {runningTest && (
                <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm">
                  <div className="animate-pulse">
                    <div>RUNNING Database Tests...</div>
                    <div>  ✓ User creation test (45ms)</div>
                    <div>  ✓ Email validation test (23ms)</div>
                    <div>  ✓ Foreign key constraint test (67ms)</div>
                    <div>  ✓ Data integrity test (89ms)</div>
                    <div>  ✗ Performance test (timeout)</div>
                    <div>  ✓ Migration test (156ms)</div>
                  </div>
                </div>
              )}
              
              {testResults && !runningTest && (
                <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm">
                  <div>✓ Database tests completed!</div>
                  <div className="mt-2">
                    <div>Tests: {testResults.passed} passed, {testResults.failed} failed, {testResults.total} total</div>
                    <div>Coverage: {testResults.coverage}%</div>
                    <div>Time: {testResults.duration}</div>
                  </div>
                  {testResults.failed > 0 && (
                    <div className="mt-2 text-red-400">
                      <div>Failed tests:</div>
                      <div>  - Performance test: Query timeout after 5s</div>
                      <div>  - Load test: Connection pool exhausted</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </DemoCardStatic>
        </DemoSection>

        {/* Best Practices */}
        <DemoSection title="Melhores Práticas" description="Diretrizes para testes eficazes de banco de dados">
          <div className="grid md:grid-cols-3 gap-1.5">
            <DemoCardStatic title="🧪 Isolamento" description="Práticas de isolamento de testes">
              <div className="space-y-3">
                {[
                  'Use bancos de teste separados',
                  'Limpe dados entre testes',
                  'Use transações para rollback',
                  'Evite dependências entre testes',
                  'Use containers para isolamento',
                  'Mantenha dados de teste pequenos'
                ].map((practice, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{practice}</span>
                  </div>
                ))}
              </div>
            </DemoCardStatic>

            <DemoCardStatic title="⚡ Performance" description="Práticas de teste de performance">
              <div className="space-y-3">
                {[
                  'Teste com dados realistas',
                  'Monitore tempos de resposta',
                  'Teste cenários de carga',
                  'Valide planos de execução',
                  'Teste com índices e sem índices',
                  'Monitore uso de recursos'
                ].map((practice, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{practice}</span>
                  </div>
                ))}
              </div>
            </DemoCardStatic>

            <DemoCardStatic title="🔍 Qualidade" description="Práticas de qualidade de dados">
              <div className="space-y-3">
                {[
                  'Valide constraints e regras',
                  'Teste integridade referencial',
                  'Verifique qualidade dos dados',
                  'Teste migrations e rollbacks',
                  'Valide backups e restore',
                  'Monitore consistência'
                ].map((practice, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{practice}</span>
                  </div>
                ))}
              </div>
            </DemoCardStatic>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}