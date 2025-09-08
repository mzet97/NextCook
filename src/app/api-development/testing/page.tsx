'use client';

import { motion } from 'framer-motion';
import { 
  TestTube, 
  CheckCircle, 
  Play, 
  Code, 
  Database, 
  Shield,
  Zap,
  Settings,
  FileText,
  Clock,
  Users,
  Activity
} from 'lucide-react';
import { DemoSection } from '@/components/DemoSection';
import { CodeBlock } from '@/components/CodeBlock';
import Breadcrumbs from '@/components/Breadcrumbs';
import { DemoCardStatic } from '@/components/DemoCardStatic';

const testingTypes = [
  {
    title: 'Unit Tests',
    description: 'Testes de funções e componentes isolados',
    icon: TestTube,
    color: 'blue',
    tools: ['Jest', 'Vitest']
  },
  {
    title: 'Integration Tests',
    description: 'Testes de integração entre módulos',
    icon: Settings,
    color: 'green',
    tools: ['Supertest', 'MSW']
  },
  {
    title: 'E2E Tests',
    description: 'Testes end-to-end completos',
    icon: Play,
    color: 'purple',
    tools: ['Playwright', 'Cypress']
  },
  {
    title: 'Load Tests',
    description: 'Testes de carga e performance',
    icon: Activity,
    color: 'orange',
    tools: ['Artillery', 'K6']
  }
];

const testingTools = [
  {
    title: 'Jest',
    description: 'Framework de testes JavaScript',
    icon: TestTube,
    color: 'red'
  },
  {
    title: 'Supertest',
    description: 'Testes de APIs HTTP',
    icon: Zap,
    color: 'blue'
  },
  {
    title: 'MSW',
    description: 'Mock Service Worker',
    icon: Shield,
    color: 'green'
  },
  {
    title: 'Playwright',
    description: 'Testes E2E modernos',
    icon: Play,
    color: 'purple'
  }
];

export default function APITestingPage() {
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
            🧪 Testes de API
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Aprenda a implementar testes robustos para suas APIs Next.js.
            Unit tests, integration tests, E2E e testes de carga.
          </p>
        </motion.div>

        <DemoSection title="Tipos de Testes">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-1.5 mb-8">
            {testingTypes.map((test, index) => {
              const IconComponent = test.icon;
              return (
                <motion.div
                  key={test.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center mb-4">
                    <div className={`p-3 rounded-lg bg-${test.color}-100 dark:bg-${test.color}-900/20 mr-4`}>
                      <IconComponent className={`h-6 w-6 text-${test.color}-600 dark:text-${test.color}-400`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">{test.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{test.description}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Ferramentas:</h4>
                    <div className="flex flex-wrap gap-1">
                      {test.tools.map((tool, i) => (
                        <span key={i} className={`px-2 py-1 rounded text-xs font-medium bg-${test.color}-100 text-${test.color}-800 dark:bg-${test.color}-900/20 dark:text-${test.color}-200`}>
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </DemoSection>

        <DemoSection title="Configuração do Jest">
          <div className="grid md:grid-cols-2 gap-1.5">
            <div>
              <h3 className="text-xl font-semibold mb-4">Instalação</h3>
              <CodeBlock
                language="bash"
                code={`# Instalar Jest e dependências
npm install --save-dev jest @types/jest
npm install --save-dev supertest @types/supertest
npm install --save-dev ts-jest typescript

# Para Next.js
npm install --save-dev @testing-library/jest-dom`}
              />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Configuração</h3>
              <CodeBlock
                language="javascript"
                code={`// jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Caminho para o app Next.js
  dir: './'
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'node',
  testMatch: [
    '**/__tests__/**/*.test.{js,ts}',
    '**/?(*.)+(spec|test).{js,ts}'
  ],
  collectCoverageFrom: [
    'app/api/**/*.{js,ts}',
    'lib/**/*.{js,ts}',
    '!**/*.d.ts',
    '!**/node_modules/**'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};

module.exports = createJestConfig(customJestConfig);`}
              />
            </div>
          </div>
        </DemoSection>

        <DemoSection title="Unit Tests - Testando Funções">
          <div className="grid md:grid-cols-2 gap-1.5">
            <div>
              <h3 className="text-xl font-semibold mb-4">Função a ser testada</h3>
              <CodeBlock
                language="typescript"
                code={`// lib/auth.ts
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function hashPassword(password: string): Promise<string> {
  if (!password || password.length < 8) {
    throw new Error('Password must be at least 8 characters');
  }
  
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(
  password: string, 
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export function generateToken(payload: any): string {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }
  
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
}

export function verifyToken(token: string): any {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }
  
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid token');
  }
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return emailRegex.test(email);
}

export function calculateAge(birthDate: string): number {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
}`}
              />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Testes Unit</h3>
              <CodeBlock
                language="typescript"
                code={`// __tests__/lib/auth.test.ts
import {
  hashPassword,
  verifyPassword,
  generateToken,
  verifyToken,
  validateEmail,
  calculateAge
} from '@/lib/auth';

// Mock do JWT_SECRET
process.env.JWT_SECRET = 'test-secret-key';

describe('Auth Utils', () => {
  describe('hashPassword', () => {
    it('should hash password correctly', async () => {
      const password = 'testpassword123';
      const hashed = await hashPassword(password);
      
      expect(hashed).toBeDefined();
      expect(hashed).not.toBe(password);
      expect(hashed.length).toBeGreaterThan(50);
    });
    
    it('should throw error for short password', async () => {
      await expect(hashPassword('123'))
        .rejects
        .toThrow('Password must be at least 8 characters');
    });
    
    it('should throw error for empty password', async () => {
      await expect(hashPassword(''))
        .rejects
        .toThrow('Password must be at least 8 characters');
    });
  });
  
  describe('verifyPassword', () => {
    it('should verify correct password', async () => {
      const password = 'testpassword123';
      const hashed = await hashPassword(password);
      
      const isValid = await verifyPassword(password, hashed);
      expect(isValid).toBe(true);
    });
    
    it('should reject incorrect password', async () => {
      const password = 'testpassword123';
      const wrongPassword = 'wrongpassword';
      const hashed = await hashPassword(password);
      
      const isValid = await verifyPassword(wrongPassword, hashed);
      expect(isValid).toBe(false);
    });
  });
  
  describe('generateToken', () => {
    it('should generate valid JWT token', () => {
      const payload = { userId: 1, email: 'test@example.com' };
      const token = generateToken(payload);
      
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.split('.')).toHaveLength(3); // JWT format
    });
  });
  
  describe('verifyToken', () => {
    it('should verify valid token', () => {
      const payload = { userId: 1, email: 'test@example.com' };
      const token = generateToken(payload);
      
      const decoded = verifyToken(token);
      expect(decoded.userId).toBe(payload.userId);
      expect(decoded.email).toBe(payload.email);
    });
    
    it('should throw error for invalid token', () => {
      expect(() => verifyToken('invalid-token'))
        .toThrow('Invalid token');
    });
  });
  
  describe('validateEmail', () => {
    it('should validate correct emails', () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.co.uk',
        'user+tag@example.org'
      ];
      
      validEmails.forEach(email => {
        expect(validateEmail(email)).toBe(true);
      });
    });
    
    it('should reject invalid emails', () => {
      const invalidEmails = [
        'invalid-email',
        '@example.com',
        'test@',
        'test.example.com'
      ];
      
      invalidEmails.forEach(email => {
        expect(validateEmail(email)).toBe(false);
      });
    });
  });
  
  describe('calculateAge', () => {
    it('should calculate age correctly', () => {
      const birthDate = '1990-01-01';
      const age = calculateAge(birthDate);
      
      expect(age).toBeGreaterThan(30);
      expect(age).toBeLessThan(40);
    });
  });
});`}
              />
            </div>
          </div>
        </DemoSection>

        <DemoSection title="Integration Tests - Testando APIs">
          <div className="grid md:grid-cols-2 gap-1.5">
            <div>
              <h3 className="text-xl font-semibold mb-4">Setup de Testes</h3>
              <CodeBlock
                language="typescript"
                code={`// __tests__/setup/test-db.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.TEST_DATABASE_URL
    }
  }
});

export async function setupTestDB() {
  // Limpar banco de dados
  await prisma.user.deleteMany();
  await prisma.post.deleteMany();
  
  // Criar dados de teste
  const testUser = await prisma.user.create({
    data: {
      name: 'Test User',
      email: 'test@example.com',
      password: 'hashedpassword123'
    }
  });
  
  return { testUser };
}

export async function cleanupTestDB() {
  await prisma.user.deleteMany();
  await prisma.post.deleteMany();
  await prisma.$disconnect();
}

export { prisma };

// __tests__/setup/test-server.ts
import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';

const app = next({ dev: false, dir: process.cwd() });
const handle = app.getRequestHandler();

export async function startTestServer() {
  await app.prepare();
  
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  });
  
  return new Promise<{ server: any; port: number }>((resolve) => {
    server.listen(0, () => {
      const address = server.address();
      const port = typeof address === 'object' ? address?.port : 3000;
      resolve({ server, port: port || 3000 });
    });
  });
}

export function stopTestServer(server: any) {
  return new Promise<void>((resolve) => {
    server.close(() => resolve());
  });
}`}
              />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Testes de API</h3>
              <CodeBlock
                language="typescript"
                code={`// __tests__/api/users.test.ts
import request from 'supertest';
import { setupTestDB, cleanupTestDB } from '../setup/test-db';
import { startTestServer, stopTestServer } from '../setup/test-server';

describe('/api/users', () => {
  let server: any;
  let port: number;
  let baseURL: string;
  
  beforeAll(async () => {
    const testServer = await startTestServer();
    server = testServer.server;
    port = testServer.port;
    baseURL = \`http://localhost:\${port}\`;
    
    await setupTestDB();
  });
  
  afterAll(async () => {
    await cleanupTestDB();
    await stopTestServer(server);
  });
  
  describe('GET /api/users', () => {
    it('should return list of users', async () => {
      const response = await request(baseURL)
        .get('/api/users')
        .expect(200);
      
      expect(response.body).toHaveProperty('users');
      expect(Array.isArray(response.body.users)).toBe(true);
      expect(response.body.users.length).toBeGreaterThan(0);
    });
    
    it('should support pagination', async () => {
      const response = await request(baseURL)
        .get('/api/users?page=1&limit=5')
        .expect(200);
      
      expect(response.body).toHaveProperty('pagination');
      expect(response.body.pagination.page).toBe(1);
      expect(response.body.pagination.limit).toBe(5);
    });
    
    it('should validate page parameter', async () => {
      await request(baseURL)
        .get('/api/users?page=0')
        .expect(400);
    });
  });
  
  describe('POST /api/users', () => {
    it('should create new user', async () => {
      const userData = {
        name: 'New User',
        email: 'newuser@example.com',
        password: 'password123',
        age: 25
      };
      
      const response = await request(baseURL)
        .post('/api/users')
        .send(userData)
        .expect(201);
      
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(userData.name);
      expect(response.body.email).toBe(userData.email);
      expect(response.body).not.toHaveProperty('password');
    });
    
    it('should validate required fields', async () => {
      const invalidData = {
        name: 'Test'
        // email e password faltando
      };
      
      const response = await request(baseURL)
        .post('/api/users')
        .send(invalidData)
        .expect(400);
      
      expect(response.body).toHaveProperty('error');
      expect(response.body).toHaveProperty('details');
    });
    
    it('should reject duplicate email', async () => {
      const userData = {
        name: 'Duplicate User',
        email: 'test@example.com', // Email já existe
        password: 'password123',
        age: 30
      };
      
      await request(baseURL)
        .post('/api/users')
        .send(userData)
        .expect(409);
    });
  });
  
  describe('GET /api/users/:id', () => {
    it('should return specific user', async () => {
      // Primeiro criar um usuário
      const createResponse = await request(baseURL)
        .post('/api/users')
        .send({
          name: 'Specific User',
          email: 'specific@example.com',
          password: 'password123',
          age: 28
        });
      
      const userId = createResponse.body.id;
      
      // Buscar o usuário
      const response = await request(baseURL)
        .get(\`/api/users/\${userId}\`)
        .expect(200);
      
      expect(response.body.id).toBe(userId);
      expect(response.body.name).toBe('Specific User');
    });
    
    it('should return 404 for non-existent user', async () => {
      await request(baseURL)
        .get('/api/users/99999')
        .expect(404);
    });
    
    it('should validate user ID format', async () => {
      await request(baseURL)
        .get('/api/users/invalid-id')
        .expect(400);
    });
  });
});`}
              />
            </div>
          </div>
        </DemoSection>

        <DemoSection title="Mocking com MSW">
          <div className="grid md:grid-cols-2 gap-1.5">
            <div>
              <h3 className="text-xl font-semibold mb-4">Configuração MSW</h3>
              <CodeBlock
                language="typescript"
                code={`// __tests__/mocks/handlers.ts
import { rest } from 'msw';

const baseURL = 'http://localhost:3000';

export const handlers = [
  // Mock para API externa
  rest.get('https://api.external-service.com/users', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        users: [
          { id: 1, name: 'External User 1' },
          { id: 2, name: 'External User 2' }
        ]
      })
    );
  }),
  
  // Mock para serviço de email
  rest.post('https://api.emailservice.com/send', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ messageId: 'mock-message-id' })
    );
  }),
  
  // Mock para upload de arquivos
  rest.post('https://api.storage.com/upload', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        url: 'https://storage.com/mock-file.jpg',
        size: 1024
      })
    );
  }),
  
  // Mock para API de pagamento
  rest.post('https://api.payment.com/charge', (req, res, ctx) => {
    const { amount } = req.body as any;
    
    if (amount > 10000) {
      return res(
        ctx.status(400),
        ctx.json({ error: 'Amount too high' })
      );
    }
    
    return res(
      ctx.status(200),
      ctx.json({
        id: 'mock-charge-id',
        status: 'succeeded',
        amount
      })
    );
  })
];

// __tests__/mocks/server.ts
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);

// jest.setup.js
import { server } from './__tests__/mocks/server';

// Configurar MSW
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());`}
              />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Testes com Mocks</h3>
              <CodeBlock
                language="typescript"
                code={`// __tests__/api/external-integration.test.ts
import request from 'supertest';
import { server } from '../mocks/server';
import { rest } from 'msw';

describe('/api/external-integration', () => {
  it('should handle external API success', async () => {
    const response = await request('http://localhost:3000')
      .get('/api/external-users')
      .expect(200);
    
    expect(response.body.users).toHaveLength(2);
    expect(response.body.users[0].name).toBe('External User 1');
  });
  
  it('should handle external API failure', async () => {
    // Override do mock para simular erro
    server.use(
      rest.get('https://api.external-service.com/users', (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({ error: 'Internal Server Error' })
        );
      })
    );
    
    const response = await request('http://localhost:3000')
      .get('/api/external-users')
      .expect(502);
    
    expect(response.body.error).toContain('External service error');
  });
  
  it('should handle email sending', async () => {
    const emailData = {
      to: 'test@example.com',
      subject: 'Test Email',
      body: 'Test message'
    };
    
    const response = await request('http://localhost:3000')
      .post('/api/send-email')
      .send(emailData)
      .expect(200);
    
    expect(response.body.messageId).toBe('mock-message-id');
  });
  
  it('should handle payment processing', async () => {
    const paymentData = {
      amount: 5000,
      currency: 'usd',
      source: 'tok_visa'
    };
    
    const response = await request('http://localhost:3000')
      .post('/api/process-payment')
      .send(paymentData)
      .expect(200);
    
    expect(response.body.status).toBe('succeeded');
    expect(response.body.amount).toBe(5000);
  });
  
  it('should reject high amount payments', async () => {
    const paymentData = {
      amount: 15000, // Valor muito alto
      currency: 'usd',
      source: 'tok_visa'
    };
    
    const response = await request('http://localhost:3000')
      .post('/api/process-payment')
      .send(paymentData)
      .expect(400);
    
    expect(response.body.error).toContain('Payment failed');
  });
});`}
              />
            </div>
          </div>
        </DemoSection>

        <DemoSection title="E2E Tests com Playwright">
          <div className="grid md:grid-cols-2 gap-1.5">
            <div>
              <h3 className="text-xl font-semibold mb-4">Configuração Playwright</h3>
              <CodeBlock
                language="typescript"
                code={`// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] }
    }
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI
  }
});

// e2e/fixtures/api-helpers.ts
import { test as base } from '@playwright/test';

type APIHelpers = {
  createUser: (userData: any) => Promise<any>;
  loginUser: (credentials: any) => Promise<string>;
  deleteUser: (userId: number) => Promise<void>;
};

export const test = base.extend<APIHelpers>({
  createUser: async ({ request }, use) => {
    const createUser = async (userData: any) => {
      const response = await request.post('/api/users', {
        data: userData
      });
      return response.json();
    };
    await use(createUser);
  },
  
  loginUser: async ({ request }, use) => {
    const loginUser = async (credentials: any) => {
      const response = await request.post('/api/auth/login', {
        data: credentials
      });
      const data = await response.json();
      return data.accessToken;
    };
    await use(loginUser);
  },
  
  deleteUser: async ({ request }, use) => {
    const deleteUser = async (userId: number) => {
      await request.delete(\`/api/users/\${userId}\`);
    };
    await use(deleteUser);
  }
});`}
              />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Testes E2E</h3>
              <CodeBlock
                language="typescript"
                code={`// e2e/user-management.spec.ts
import { expect } from '@playwright/test';
import { test } from './fixtures/api-helpers';

test.describe('User Management E2E', () => {
  let testUser: any;
  let authToken: string;
  
  test.beforeEach(async ({ createUser, loginUser }) => {
    // Criar usuário de teste
    testUser = await createUser({
      name: 'E2E Test User',
      email: 'e2e@example.com',
      password: 'password123',
      age: 25
    });
    
    // Fazer login
    authToken = await loginUser({
      email: 'e2e@example.com',
      password: 'password123'
    });
  });
  
  test.afterEach(async ({ deleteUser }) => {
    if (testUser?.id) {
      await deleteUser(testUser.id);
    }
  });
  
  test('should create user through UI', async ({ page }) => {
    await page.goto('/users/create');
    
    // Preencher formulário
    await page.fill('[data-testid="name-input"]', 'UI Test User');
    await page.fill('[data-testid="email-input"]', 'uitest@example.com');
    await page.fill('[data-testid="password-input"]', 'password123');
    await page.fill('[data-testid="age-input"]', '30');
    
    // Submeter formulário
    await page.click('[data-testid="submit-button"]');
    
    // Verificar redirecionamento e sucesso
    await expect(page).toHaveURL(/\/users\/\\d+/);
    await expect(page.locator('[data-testid="user-name"]'))
      .toHaveText('UI Test User');
  });
  
  test('should display validation errors', async ({ page }) => {
    await page.goto('/users/create');
    
    // Submeter formulário vazio
    await page.click('[data-testid="submit-button"]');
    
    // Verificar mensagens de erro
    await expect(page.locator('[data-testid="name-error"]'))
      .toBeVisible();
    await expect(page.locator('[data-testid="email-error"]'))
      .toBeVisible();
  });
  
  test('should edit user profile', async ({ page }) => {
    await page.goto(\`/users/\${testUser.id}/edit\`);
    
    // Editar nome
    await page.fill('[data-testid="name-input"]', 'Updated Name');
    await page.click('[data-testid="save-button"]');
    
    // Verificar atualização
    await expect(page.locator('[data-testid="success-message"]'))
      .toBeVisible();
    await expect(page.locator('[data-testid="user-name"]'))
      .toHaveText('Updated Name');
  });
  
  test('should handle API errors gracefully', async ({ page, request }) => {
    // Simular erro de rede interceptando requisições
    await page.route('/api/users', route => {
      route.fulfill({
        status: 500,
        body: JSON.stringify({ error: 'Internal Server Error' })
      });
    });
    
    await page.goto('/users');
    
    // Verificar exibição de erro
    await expect(page.locator('[data-testid="error-message"]'))
      .toBeVisible();
    await expect(page.locator('[data-testid="error-message"]'))
      .toContainText('Failed to load users');
  });
  
  test('should handle authentication', async ({ page, context }) => {
    // Definir token de autenticação
    await context.addCookies([{
      name: 'authToken',
      value: authToken,
      domain: 'localhost',
      path: '/'
    }]);
    
    await page.goto('/dashboard');
    
    // Verificar acesso autorizado
    await expect(page.locator('[data-testid="dashboard-title"]'))
      .toBeVisible();
    await expect(page.locator('[data-testid="user-menu"]'))
      .toContainText('E2E Test User');
  });
  
  test('should redirect unauthorized users', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Verificar redirecionamento para login
    await expect(page).toHaveURL('/login');
    await expect(page.locator('[data-testid="login-form"]'))
      .toBeVisible();
  });
});`}
              />
            </div>
          </div>
        </DemoSection>

        <DemoSection title="Load Testing com Artillery">
          <div className="grid md:grid-cols-2 gap-1.5">
            <div>
              <h3 className="text-xl font-semibold mb-4">Configuração Artillery</h3>
              <CodeBlock
                language="yaml"
                code={`# artillery-config.yml
config:
  target: 'http://localhost:3000'
  phases:
    - duration: 60
      arrivalRate: 10
      name: "Warm up"
    - duration: 120
      arrivalRate: 50
      name: "Ramp up load"
    - duration: 300
      arrivalRate: 100
      name: "Sustained load"
  payload:
    path: "./test-data.csv"
    fields:
      - "email"
      - "password"
  defaults:
    headers:
      Content-Type: "application/json"

scenarios:
  - name: "User Registration and Login"
    weight: 30
    flow:
      - post:
          url: "/api/auth/register"
          json:
            name: "Load Test User {{ $randomString() }}"
            email: "{{ email }}"
            password: "{{ password }}"
            age: 25
          capture:
            - json: "$.user.id"
              as: "userId"
      - post:
          url: "/api/auth/login"
          json:
            email: "{{ email }}"
            password: "{{ password }}"
          capture:
            - json: "$.accessToken"
              as: "token"
      - get:
          url: "/api/users/{{ userId }}"
          headers:
            Authorization: "Bearer {{ token }}"

  - name: "Browse Users"
    weight: 50
    flow:
      - get:
          url: "/api/users"
      - get:
          url: "/api/users?page={{ $randomInt(1, 10) }}"
      - get:
          url: "/api/users/{{ $randomInt(1, 100) }}"

  - name: "Create and Update Posts"
    weight: 20
    flow:
      - post:
          url: "/api/auth/login"
          json:
            email: "admin@example.com"
            password: "adminpassword"
          capture:
            - json: "$.accessToken"
              as: "adminToken"
      - post:
          url: "/api/posts"
          headers:
            Authorization: "Bearer {{ adminToken }}"
          json:
            title: "Load Test Post {{ $randomString() }}"
            content: "This is a test post created during load testing."
            published: true
          capture:
            - json: "$.id"
              as: "postId"
      - put:
          url: "/api/posts/{{ postId }}"
          headers:
            Authorization: "Bearer {{ adminToken }}"
          json:
            title: "Updated Load Test Post {{ $randomString() }}"
            content: "This post has been updated during load testing."
            published: true`}
              />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Scripts de Load Testing</h3>
              <CodeBlock
                language="bash"
                code={`#!/bin/bash
# scripts/load-test.sh

echo "Starting load tests..."

# Instalar Artillery se não estiver instalado
if ! command -v artillery &> /dev/null; then
    echo "Installing Artillery..."
    npm install -g artillery
fi

# Gerar dados de teste
echo "Generating test data..."
node scripts/generate-test-data.js

# Executar testes de carga
echo "Running load tests..."
artillery run artillery-config.yml --output load-test-results.json

# Gerar relatório
echo "Generating report..."
artillery report load-test-results.json --output load-test-report.html

echo "Load test completed. Report available at load-test-report.html"

# Limpar dados de teste
echo "Cleaning up test data..."
node scripts/cleanup-test-data.js

echo "Load test finished!"`}
              />
              
              <CodeBlock
                language="javascript"
                code={`// scripts/generate-test-data.js
const fs = require('fs');
const { faker } = require('@faker-js/faker');

function generateTestData(count = 1000) {
  const data = [];
  
  for (let i = 0; i < count; i++) {
    data.push({
      email: faker.internet.email(),
      password: 'testpassword123'
    });
  }
  
  const csv = 'email,password\\n' + 
    data.map(row => \`\${row.email},\${row.password}\`).join('\\n');
  
  fs.writeFileSync('test-data.csv', csv);
  console.log(\`Generated \${count} test records\`);
}

generateTestData();

// scripts/monitor-performance.js
const { performance } = require('perf_hooks');
const fetch = require('node-fetch');

async function monitorAPI() {
  const endpoints = [
    '/api/users',
    '/api/posts',
    '/api/auth/login'
  ];
  
  const results = [];
  
  for (const endpoint of endpoints) {
    const start = performance.now();
    
    try {
      const response = await fetch(\`http://localhost:3000\${endpoint}\`);
      const end = performance.now();
      
      results.push({
        endpoint,
        status: response.status,
        responseTime: end - start,
        success: response.ok
      });
    } catch (error) {
      results.push({
        endpoint,
        status: 'ERROR',
        responseTime: -1,
        success: false,
        error: error.message
      });
    }
  }
  
  console.table(results);
  
  // Alertar se algum endpoint estiver lento
  const slowEndpoints = results.filter(r => r.responseTime > 1000);
  if (slowEndpoints.length > 0) {
    console.warn('⚠️  Slow endpoints detected:', slowEndpoints);
  }
  
  return results;
}

// Executar monitoramento a cada 30 segundos
setInterval(monitorAPI, 30000);
monitorAPI(); // Executar imediatamente`}
              />
            </div>
          </div>
        </DemoSection>

        <DemoSection title="Ferramentas de Teste">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-1.5 mb-8">
            {testingTools.map((tool, index) => {
              const IconComponent = tool.icon;
              return (
                <motion.div
                  key={tool.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <DemoCardStatic
                    title={tool.title}
                    description={tool.description}
                    icon={<IconComponent className="w-6 h-6" />}
                    color={tool.color}
                  />
                </motion.div>
              );
            })}
          </div>
        </DemoSection>

        <DemoSection title="Scripts de Teste">
          <CodeBlock
            language="json"
            code={`// package.json - Scripts de teste
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:integration": "jest --testPathPattern=integration",
    "test:unit": "jest --testPathPattern=unit",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:load": "artillery run artillery-config.yml",
    "test:all": "npm run test && npm run test:e2e",
    "test:ci": "npm run test:coverage && npm run test:e2e"
  },
  "jest": {
    "testEnvironment": "node",
    "setupFilesAfterEnv": ["<rootDir>/jest.setup.js"],
    "testMatch": [
      "**/__tests__/**/*.test.{js,ts}",
      "**/?(*.)+(spec|test).{js,ts}"
    ],
    "collectCoverageFrom": [
      "app/api/**/*.{js,ts}",
      "lib/**/*.{js,ts}",
      "!**/*.d.ts",
      "!**/node_modules/**"
    ],
    "coverageReporters": ["text", "lcov", "html"],
    "coverageDirectory": "coverage"
  }
}`}
          />
        </DemoSection>

        <DemoSection title="Melhores Práticas">
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-4">🧪 Práticas Essenciais</h3>
            <ul className="space-y-2 text-green-700 dark:text-green-300">
              <li>• <strong>Pirâmide de Testes:</strong> Muitos unit tests, alguns integration, poucos E2E</li>
              <li>• <strong>Isolamento:</strong> Cada teste deve ser independente e determinístico</li>
              <li>• <strong>Dados de Teste:</strong> Use factories e fixtures para dados consistentes</li>
              <li>• <strong>Mocking:</strong> Mock dependências externas e serviços</li>
              <li>• <strong>Coverage:</strong> Mantenha cobertura de código acima de 80%</li>
              <li>• <strong>Performance:</strong> Testes devem ser rápidos (&lt; 10s para unit tests)</li>
              <li>• <strong>CI/CD:</strong> Execute testes automaticamente em cada commit</li>
              <li>• <strong>Documentação:</strong> Testes servem como documentação viva</li>
              <li>• <strong>Nomenclatura:</strong> Use nomes descritivos que expliquem o comportamento</li>
              <li>• <strong>Cleanup:</strong> Sempre limpe dados de teste após execução</li>
              <li>• <strong>Environment:</strong> Use ambiente de teste isolado</li>
              <li>• <strong>Monitoring:</strong> Monitore métricas de teste e performance</li>
            </ul>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}