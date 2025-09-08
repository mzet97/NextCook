'use client';

import { useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { DemoCardStatic } from '@/components/DemoCardStatic';
import { DemoSection } from '@/components/DemoSection';
import { 
  BeakerIcon, 
  PlayIcon, 
  DocumentTextIcon,
  ChartBarIcon,
  CogIcon
} from '@heroicons/react/24/outline';

const jestFeatures = [
  {
    name: 'Unit Testing',
    description: 'Testes isolados de funções e componentes',
    icon: BeakerIcon,
    example: `// useCounter.test.ts
import { renderHook, act } from '@testing-library/react';
import { useCounter } from '@/hooks/useCounter';

describe('useCounter', () => {
  it('should increment count', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
  });
});`
  },
  {
    name: 'Mocking',
    description: 'Simulação de dependências externas',
    icon: CogIcon,
    example: `// Navigation.test.tsx
jest.mock('next/link', () => {
  return ({ children, href }) => {
    return <a href={href}>{children}</a>;
  };
});

jest.mock('next/navigation', () => ({
  usePathname: () => '/'
}));

// API mock
jest.mock('@/api/users', () => ({
  getUsers: jest.fn().mockResolvedValue([
    { id: 1, name: 'John' }
  ])
}));`
  },
  {
    name: 'Snapshot Testing',
    description: 'Captura e comparação de estruturas de componentes',
    icon: DocumentTextIcon,
    example: `// Component.test.tsx
import { render } from '@testing-library/react';
import Button from '@/components/Button';

describe('Button', () => {
  it('should match snapshot', () => {
    const { container } = render(
      <Button variant="primary">Click me</Button>
    );
    
    expect(container.firstChild).toMatchSnapshot();
  });
});`
  },
  {
    name: 'Coverage Reports',
    description: 'Análise de cobertura de código',
    icon: ChartBarIcon,
    example: `// jest.config.ts
const config = {
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}'
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  }
};`
  }
];

const testExamples = [
  {
    title: 'Teste de Hook Customizado',
    description: 'Testando lógica de estado e efeitos',
    code: `import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('useLocalStorage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return initial value when localStorage is empty', () => {
    localStorageMock.getItem.mockReturnValue(null);
    
    const { result } = renderHook(() => 
      useLocalStorage('test-key', 'default')
    );
    
    expect(result.current[0]).toBe('default');
  });

  it('should update localStorage when value changes', () => {
    const { result } = renderHook(() => 
      useLocalStorage('test-key', 'initial')
    );
    
    act(() => {
      result.current[1]('new value');
    });
    
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'test-key', 
      JSON.stringify('new value')
    );
  });
});`
  },
  {
    title: 'Teste de Componente React',
    description: 'Testando renderização e interações',
    code: `import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from '@/components/Counter';

describe('Counter Component', () => {
  it('should render initial count', () => {
    render(<Counter initialCount={5} />);
    
    expect(screen.getByText('Count: 5')).toBeInTheDocument();
  });

  it('should increment when button is clicked', async () => {
    const user = userEvent.setup();
    render(<Counter initialCount={0} />);
    
    const incrementButton = screen.getByRole('button', { 
      name: /increment/i 
    });
    
    await user.click(incrementButton);
    
    expect(screen.getByText('Count: 1')).toBeInTheDocument();
  });

  it('should call onCountChange when count updates', async () => {
    const mockOnCountChange = jest.fn();
    const user = userEvent.setup();
    
    render(
      <Counter 
        initialCount={0} 
        onCountChange={mockOnCountChange} 
      />
    );
    
    const incrementButton = screen.getByRole('button', { 
      name: /increment/i 
    });
    
    await user.click(incrementButton);
    
    expect(mockOnCountChange).toHaveBeenCalledWith(1);
  });
});`
  },
  {
    title: 'Teste de API/Service',
    description: 'Testando chamadas de API e serviços',
    code: `import { userService } from '@/services/userService';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

// Setup MSW server
const server = setupServer(
  http.get('/api/users', () => {
    return HttpResponse.json([
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
    ]);
  }),
  
  http.post('/api/users', async ({ request }) => {
    const newUser = await request.json();
    return HttpResponse.json(
      { id: 3, ...newUser },
      { status: 201 }
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('userService', () => {
  it('should fetch users successfully', async () => {
    const users = await userService.getUsers();
    
    expect(users).toHaveLength(2);
    expect(users[0]).toEqual({
      id: 1,
      name: 'John Doe',
      email: 'john@example.com'
    });
  });

  it('should create user successfully', async () => {
    const newUser = {
      name: 'Bob Wilson',
      email: 'bob@example.com'
    };
    
    const createdUser = await userService.createUser(newUser);
    
    expect(createdUser).toEqual({
      id: 3,
      ...newUser
    });
  });

  it('should handle API errors', async () => {
    server.use(
      http.get('/api/users', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );
    
    await expect(userService.getUsers()).rejects.toThrow(
      'Failed to fetch users'
    );
  });
});`
  }
];

export default function JestPage() {
  const [selectedExample, setSelectedExample] = useState(0);
  const [runningTest, setRunningTest] = useState(false);

  const runTestDemo = async () => {
    setRunningTest(true);
    // Simulate test execution
    await new Promise(resolve => setTimeout(resolve, 2000));
    setRunningTest(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <BeakerIcon className="h-12 w-12 text-green-600 dark:text-green-400 mr-4" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Jest Testing Framework
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Framework de testes JavaScript com foco em simplicidade, mocking poderoso e relatórios detalhados
          </p>
        </div>

        {/* Jest Features */}
        <DemoSection title="Recursos do Jest" description="Principais funcionalidades para testes eficazes">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-1.5 mb-8">
            {jestFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <DemoCardStatic key={feature.name} title={feature.name} description={feature.description}>
                  <div className="space-y-4">
                    <Icon className="h-8 w-8 text-green-600 dark:text-green-400" />
                    <CodeBlock
                      language="typescript"
                      code={feature.example}
                      maxHeight="200px"
                    />
                  </div>
                </DemoCardStatic>
              );
            })}
          </div>
        </DemoSection>

        {/* Configuration */}
        <DemoSection title="Configuração" description="Setup completo do Jest">
          <div className="grid md:grid-cols-2 gap-1.5">
            <DemoCardStatic title="jest.config.ts" description="Configuração principal">
              <CodeBlock
                language="typescript"
                code={`import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};

export default createJestConfig(config);`}
              />
            </DemoCardStatic>

            <DemoCardStatic title="jest.setup.ts" description="Configurações globais">
              <CodeBlock
                language="typescript"
                code={`import '@testing-library/jest-dom';

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() { return null; }
  disconnect() { return null; }
  unobserve() { return null; }
};

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  observe() { return null; }
  disconnect() { return null; }
  unobserve() { return null; }
};

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});`}
              />
            </DemoCardStatic>
          </div>
        </DemoSection>

        {/* Test Examples */}
        <DemoSection title="Exemplos Práticos" description="Casos de uso reais com Jest">
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {testExamples.map((example, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedExample(index)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedExample === index
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {example.title}
                </button>
              ))}
            </div>
            
            <DemoCardStatic 
              title={testExamples[selectedExample].title} 
              description={testExamples[selectedExample].description}
            >
              <CodeBlock
                language="typescript"
                code={testExamples[selectedExample].code}
              />
            </DemoCardStatic>
          </div>
        </DemoSection>

        {/* Test Runner Demo */}
        <DemoSection title="Executar Testes" description="Demonstração do Jest em ação">
          <DemoCardStatic title="Test Runner" description="Simule a execução de testes">
            <div className="space-y-4">
              <button
                onClick={runTestDemo}
                disabled={runningTest}
                className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <PlayIcon className="h-5 w-5 mr-2" />
                {runningTest ? 'Executando...' : 'Executar Testes'}
              </button>
              
              {runningTest && (
                <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm">
                  <div className="animate-pulse">
                    <div>PASS src/__tests__/hooks/useCounter.test.ts</div>
                    <div>PASS src/__tests__/components/Navigation.test.tsx</div>
                    <div>PASS src/__tests__/hooks/useDebounce.test.ts</div>
                    <div className="mt-2">Test Suites: 3 passed, 3 total</div>
                    <div>Tests: 12 passed, 12 total</div>
                    <div>Snapshots: 0 total</div>
                    <div>Time: 2.456s</div>
                  </div>
                </div>
              )}
              
              {!runningTest && (
                <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm">
                  <div>✓ All tests passed!</div>
                  <div className="mt-2">Test Suites: 3 passed, 3 total</div>
                  <div>Tests: 12 passed, 12 total</div>
                  <div>Snapshots: 0 total</div>
                  <div>Time: 2.456s</div>
                  <div className="mt-2 text-yellow-400">Coverage: 85.2% statements, 78.9% branches</div>
                </div>
              )}
            </div>
          </DemoCardStatic>
        </DemoSection>

        {/* Commands */}
        <DemoSection title="Comandos Úteis" description="Scripts para desenvolvimento">
          <div className="grid md:grid-cols-2 gap-1.5">
            <DemoCardStatic title="Comandos Básicos" description="Execução de testes">
              <CodeBlock
                language="bash"
                code={`# Executar todos os testes
npm run test

# Executar em modo watch
npm run test:watch

# Executar com coverage
npm run test:coverage

# Executar teste específico
npm test -- useCounter.test.ts

# Executar testes relacionados a arquivos alterados
npm test -- --onlyChanged`}
              />
            </DemoCardStatic>

            <DemoCardStatic title="Comandos Avançados" description="Debugging e análise">
              <CodeBlock
                language="bash"
                code={`# Executar com verbose output
npm test -- --verbose

# Atualizar snapshots
npm test -- --updateSnapshot

# Executar com debugging
npm test -- --detectOpenHandles

# Executar testes em paralelo
npm test -- --maxWorkers=4

# Executar com silent mode
npm test -- --silent`}
              />
            </DemoCardStatic>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}