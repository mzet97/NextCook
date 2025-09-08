'use client';

import { useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { DemoCard } from '@/components/DemoCard';
import { DemoCardStatic } from '@/components/DemoCardStatic';
import { DemoSection } from '@/components/DemoSection';
import { 
  UserIcon, 
  EyeIcon, 
  CursorArrowRaysIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const rtlPrinciples = [
  {
    name: 'User-Centric Testing',
    description: 'Testa como o usuário interage com a aplicação',
    icon: UserIcon,
    example: `// ❌ Testando implementação
expect(component.state.count).toBe(1);

// ✅ Testando comportamento do usuário
expect(screen.getByText('Count: 1')).toBeInTheDocument();`
  },
  {
    name: 'Accessibility First',
    description: 'Prioriza seletores acessíveis',
    icon: EyeIcon,
    example: `// Ordem de prioridade dos seletores:
// 1. getByRole, getByLabelText
screen.getByRole('button', { name: /submit/i });
screen.getByLabelText('Email');

// 2. getByPlaceholderText, getByText
screen.getByPlaceholderText('Enter email');
screen.getByText('Welcome');

// 3. getByTestId (último recurso)
screen.getByTestId('submit-button');`
  },
  {
    name: 'Real User Interactions',
    description: 'Simula interações reais do usuário',
    icon: CursorArrowRaysIcon,
    example: `import userEvent from '@testing-library/user-event';

test('user interaction', async () => {
  const user = userEvent.setup();
  
  // Simula clique real
  await user.click(screen.getByRole('button'));
  
  // Simula digitação real
  await user.type(screen.getByLabelText('Name'), 'John Doe');
  
  // Simula navegação por teclado
  await user.tab();
  await user.keyboard('{Enter}');
});`
  },
  {
    name: 'Async Testing',
    description: 'Aguarda mudanças assíncronas',
    icon: SparklesIcon,
    example: `// Aguarda elemento aparecer
await screen.findByText('Data loaded');

// Aguarda elemento desaparecer
await waitForElementToBeRemoved(
  screen.getByText('Loading...')
);

// Aguarda mudança de estado
await waitFor(() => {
  expect(screen.getByText('Success')).toBeInTheDocument();
});`
  }
];

const testExamples = [
  {
    title: 'Teste de Componente Básico',
    description: 'Testando renderização e props',
    code: `import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '@/components/Button';

describe('Button Component', () => {
  it('should render with correct text', () => {
    render(<Button>Click me</Button>);
    
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('should handle click events', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();
    
    render(<Button onClick={handleClick}>Click me</Button>);
    
    await user.click(screen.getByRole('button'));
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should apply correct variant styles', () => {
    render(<Button variant="primary">Primary Button</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-blue-600');
  });

  it('should be accessible', () => {
    render(
      <Button 
        aria-label="Save document" 
        aria-describedby="save-help"
      >
        Save
      </Button>
    );
    
    const button = screen.getByRole('button', { name: 'Save document' });
    expect(button).toHaveAttribute('aria-describedby', 'save-help');
  });
});`
  },
  {
    title: 'Teste de Formulário',
    description: 'Testando validação e submissão',
    code: `import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from '@/components/ContactForm';

describe('ContactForm', () => {
  it('should validate required fields', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    
    // Tentar submeter formulário vazio
    await user.click(screen.getByRole('button', { name: /submit/i }));
    
    // Verificar mensagens de erro
    expect(screen.getByText('Name is required')).toBeInTheDocument();
    expect(screen.getByText('Email is required')).toBeInTheDocument();
  });

  it('should validate email format', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    
    const emailInput = screen.getByLabelText('Email');
    
    // Inserir email inválido
    await user.type(emailInput, 'invalid-email');
    await user.tab(); // Trigger blur event
    
    expect(screen.getByText('Please enter a valid email')).toBeInTheDocument();
  });

  it('should submit form with valid data', async () => {
    const mockSubmit = jest.fn();
    const user = userEvent.setup();
    
    render(<ContactForm onSubmit={mockSubmit} />);
    
    // Preencher formulário
    await user.type(screen.getByLabelText('Name'), 'John Doe');
    await user.type(screen.getByLabelText('Email'), 'john@example.com');
    await user.type(screen.getByLabelText('Message'), 'Hello world!');
    
    // Submeter formulário
    await user.click(screen.getByRole('button', { name: /submit/i }));
    
    // Verificar submissão
    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello world!'
      });
    });
  });

  it('should show loading state during submission', async () => {
    const user = userEvent.setup();
    
    // Mock API call que demora
    const mockSubmit = jest.fn(() => 
      new Promise(resolve => setTimeout(resolve, 1000))
    );
    
    render(<ContactForm onSubmit={mockSubmit} />);
    
    // Preencher e submeter
    await user.type(screen.getByLabelText('Name'), 'John Doe');
    await user.type(screen.getByLabelText('Email'), 'john@example.com');
    await user.click(screen.getByRole('button', { name: /submit/i }));
    
    // Verificar estado de loading
    expect(screen.getByText('Submitting...')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
    
    // Aguardar conclusão
    await waitFor(() => {
      expect(screen.getByText('Form submitted successfully!')).toBeInTheDocument();
    });
  });
});`
  },
  {
    title: 'Teste com Context e Providers',
    description: 'Testando componentes que usam Context',
    code: `import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { UserProvider } from '@/contexts/UserContext';
import Dashboard from '@/components/Dashboard';

// Helper para renderizar com providers
const renderWithProviders = (ui, options = {}) => {
  const {
    themeValue = 'light',
    userValue = { name: 'John Doe', role: 'admin' },
    ...renderOptions
  } = options;

  const Wrapper = ({ children }) => (
    <ThemeProvider value={themeValue}>
      <UserProvider value={userValue}>
        {children}
      </UserProvider>
    </ThemeProvider>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

describe('Dashboard with Context', () => {
  it('should display user information', () => {
    renderWithProviders(<Dashboard />);
    
    expect(screen.getByText('Welcome, John Doe')).toBeInTheDocument();
    expect(screen.getByText('Role: admin')).toBeInTheDocument();
  });

  it('should apply theme styles', () => {
    renderWithProviders(<Dashboard />, { themeValue: 'dark' });
    
    const dashboard = screen.getByTestId('dashboard');
    expect(dashboard).toHaveClass('dark-theme');
  });

  it('should show admin features for admin users', () => {
    renderWithProviders(<Dashboard />, {
      userValue: { name: 'Admin User', role: 'admin' }
    });
    
    expect(screen.getByText('Admin Panel')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Manage Users' })).toBeInTheDocument();
  });

  it('should hide admin features for regular users', () => {
    renderWithProviders(<Dashboard />, {
      userValue: { name: 'Regular User', role: 'user' }
    });
    
    expect(screen.queryByText('Admin Panel')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Manage Users' })).not.toBeInTheDocument();
  });

  it('should toggle theme when theme button is clicked', async () => {
    const user = userEvent.setup();
    
    renderWithProviders(<Dashboard />);
    
    const themeToggle = screen.getByRole('button', { name: /toggle theme/i });
    await user.click(themeToggle);
    
    // Verificar se o tema mudou
    const dashboard = screen.getByTestId('dashboard');
    expect(dashboard).toHaveClass('dark-theme');
  });
});`
  },
  {
    title: 'Teste de Hook Customizado',
    description: 'Testando hooks com renderHook',
    code: `import { renderHook, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useUserData } from '@/hooks/useUserData';

// Mock da API
jest.mock('@/api/users', () => ({
  fetchUser: jest.fn()
}));

import { fetchUser } from '@/api/users';
const mockFetchUser = fetchUser as jest.MockedFunction<typeof fetchUser>;

// Wrapper para React Query
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('useUserData Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return loading state initially', () => {
    mockFetchUser.mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve({ id: 1, name: 'John' }), 100))
    );
    
    const { result } = renderHook(() => useUserData(1), {
      wrapper: createWrapper()
    });
    
    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeNull();
  });

  it('should return user data when fetch succeeds', async () => {
    const userData = { id: 1, name: 'John Doe', email: 'john@example.com' };
    mockFetchUser.mockResolvedValue(userData);
    
    const { result } = renderHook(() => useUserData(1), {
      wrapper: createWrapper()
    });
    
    // Aguardar dados carregarem
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual(userData);
    expect(result.current.error).toBeNull();
  });

  it('should return error when fetch fails', async () => {
    const error = new Error('Failed to fetch user');
    mockFetchUser.mockRejectedValue(error);
    
    const { result } = renderHook(() => useUserData(1), {
      wrapper: createWrapper()
    });
    
    // Aguardar erro
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toEqual(error);
  });

  it('should refetch data when refetch is called', async () => {
    const userData = { id: 1, name: 'John Doe' };
    mockFetchUser.mockResolvedValue(userData);
    
    const { result } = renderHook(() => useUserData(1), {
      wrapper: createWrapper()
    });
    
    // Aguardar carregamento inicial
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    // Limpar mock e configurar nova resposta
    mockFetchUser.mockClear();
    const updatedData = { id: 1, name: 'John Smith' };
    mockFetchUser.mockResolvedValue(updatedData);
    
    // Chamar refetch
    await act(async () => {
      await result.current.refetch();
    });
    
    expect(mockFetchUser).toHaveBeenCalledTimes(1);
    expect(result.current.data).toEqual(updatedData);
  });
});`
  }
];

export default function ReactTestingLibraryPage() {
  const [selectedExample, setSelectedExample] = useState(0);
  const [runningTest, setRunningTest] = useState(false);

  const runTestDemo = async () => {
    setRunningTest(true);
    await new Promise(resolve => setTimeout(resolve, 2500));
    setRunningTest(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <CheckCircleIcon className="h-12 w-12 text-blue-600 dark:text-blue-400 mr-4" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              React Testing Library
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Biblioteca para testes focados no comportamento do usuário, promovendo acessibilidade e melhores práticas
          </p>
        </div>

        {/* RTL Principles */}
        <DemoSection title="Princípios Fundamentais" description="Filosofia do React Testing Library">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-1.5 mb-8">
            {rtlPrinciples.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <DemoCard key={principle.name} title={principle.name} description={principle.description}>
                  <div className="space-y-4">
                    <Icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    <CodeBlock
                      language="typescript"
                      code={principle.example}
                      maxHeight="200px"
                    />
                  </div>
                </DemoCard>
              );
            })}
          </div>
        </DemoSection>

        {/* Query Priority */}
        <DemoSection title="Prioridade de Seletores" description="Ordem recomendada para encontrar elementos">
          <div className="grid md:grid-cols-3 gap-1.5">
            <DemoCardStatic title="🥇 Prioridade Alta" description="Acessíveis para todos os usuários">
              <div className="space-y-3">
                {[
                  { method: 'getByRole', description: 'Elementos por role ARIA' },
                  { method: 'getByLabelText', description: 'Elementos por label' },
                  { method: 'getByPlaceholderText', description: 'Inputs por placeholder' },
                  { method: 'getByText', description: 'Elementos por texto' }
                ].map((query) => (
                  <div key={query.method} className="p-2 bg-green-50 dark:bg-green-900/20 rounded">
                    <div className="font-mono text-sm font-semibold text-green-700 dark:text-green-400">
                      {query.method}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {query.description}
                    </div>
                  </div>
                ))}
              </div>
            </DemoCardStatic>

            <DemoCardStatic title="🥈 Prioridade Média" description="Queries semânticas">
              <div className="space-y-3">
                {[
                  { method: 'getByDisplayValue', description: 'Inputs por valor atual' },
                  { method: 'getByAltText', description: 'Imagens por alt text' },
                  { method: 'getByTitle', description: 'Elementos por title' }
                ].map((query) => (
                  <div key={query.method} className="p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                    <div className="font-mono text-sm font-semibold text-yellow-700 dark:text-yellow-400">
                      {query.method}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {query.description}
                    </div>
                  </div>
                ))}
              </div>
            </DemoCardStatic>

            <DemoCardStatic title="🥉 Último Recurso" description="Use apenas quando necessário">
              <div className="space-y-3">
                {[
                  { method: 'getByTestId', description: 'Elementos por data-testid' }
                ].map((query) => (
                  <div key={query.method} className="p-2 bg-red-50 dark:bg-red-900/20 rounded">
                    <div className="font-mono text-sm font-semibold text-red-700 dark:text-red-400">
                      {query.method}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {query.description}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 p-2 bg-orange-50 dark:bg-orange-900/20 rounded">
                <ExclamationTriangleIcon className="h-4 w-4 text-orange-600 inline mr-1" />
                <span className="text-xs text-orange-700 dark:text-orange-400">
                  Use apenas quando os outros seletores não funcionam
                </span>
              </div>
            </DemoCardStatic>
          </div>
        </DemoSection>

        {/* Test Examples */}
        <DemoSection title="Exemplos Práticos" description="Casos de uso reais com React Testing Library">
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {testExamples.map((example, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedExample(index)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedExample === index
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {example.title}
                </button>
              ))}
            </div>
            
            <DemoCard 
              title={testExamples[selectedExample].title} 
              description={testExamples[selectedExample].description}
            >
              <CodeBlock
                language="typescript"
                code={testExamples[selectedExample].code}
              />
            </DemoCard>
          </div>
        </DemoSection>

        {/* Test Runner Demo */}
        <DemoSection title="Executar Testes" description="Demonstração do React Testing Library">
          <DemoCardStatic title="RTL Test Runner" description="Simule a execução de testes de componentes">
            <div className="space-y-4">
              <button
                onClick={runTestDemo}
                disabled={runningTest}
                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <CheckCircleIcon className="h-5 w-5 mr-2" />
                {runningTest ? 'Executando...' : 'Executar Testes RTL'}
              </button>
              
              {runningTest && (
                <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm">
                  <div className="animate-pulse">
                    <div>PASS src/__tests__/components/Button.test.tsx</div>
                    <div>  ✓ should render with correct text (23ms)</div>
                    <div>  ✓ should handle click events (45ms)</div>
                    <div>  ✓ should be disabled when disabled prop is true (12ms)</div>
                    <div>  ✓ should be accessible (18ms)</div>
                    <div className="mt-2">PASS src/__tests__/components/ContactForm.test.tsx</div>
                    <div>  ✓ should validate required fields (67ms)</div>
                    <div>  ✓ should submit form with valid data (89ms)</div>
                  </div>
                </div>
              )}
              
              {!runningTest && (
                <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm">
                  <div>✓ All component tests passed!</div>
                  <div className="mt-2">
                    <div>Test Suites: 4 passed, 4 total</div>
                    <div>Tests: 18 passed, 18 total</div>
                    <div>Snapshots: 2 passed, 2 total</div>
                    <div>Time: 3.247s</div>
                  </div>
                  <div className="mt-2 text-blue-400">All accessibility tests passed ✨</div>
                  <div className="text-yellow-400">Coverage: Components 92%, Hooks 88%</div>
                </div>
              )}
            </div>
          </DemoCardStatic>
        </DemoSection>

        {/* Best Practices */}
        <DemoSection title="Melhores Práticas" description="Diretrizes para testes eficazes com RTL">
          <div className="grid md:grid-cols-2 gap-1.5">
            <DemoCardStatic title="✅ Faça" description="Práticas recomendadas">
              <div className="space-y-3">
                {[
                  'Use queries por role e label',
                  'Teste comportamentos, não implementação',
                  'Use userEvent para interações',
                  'Aguarde mudanças assíncronas',
                  'Teste acessibilidade',
                  'Use screen para queries',
                  'Teste casos de erro',
                  'Mantenha testes independentes'
                ].map((practice, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{practice}</span>
                  </div>
                ))}
              </div>
            </DemoCardStatic>

            <DemoCardStatic title="❌ Evite" description="Práticas a evitar">
              <div className="space-y-3">
                {[
                  'Testar detalhes de implementação',
                  'Usar apenas getByTestId',
                  'Acessar state/props diretamente',
                  'Usar container.querySelector',
                  'Não aguardar mudanças async',
                  'Ignorar acessibilidade',
                  'Testes muito específicos',
                  'Mocks excessivos'
                ].map((practice, index) => (
                  <div key={index} className="flex items-start">
                    <ExclamationTriangleIcon className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{practice}</span>
                  </div>
                ))}
              </div>
            </DemoCardStatic>
          </div>
        </DemoSection>

        {/* Useful Utilities */}
        <DemoSection title="Utilitários Úteis" description="Helpers e configurações importantes">
          <div className="grid md:grid-cols-2 gap-1.5">
            <DemoCardStatic title="Custom Render" description="Helper para renderizar com providers">
              <CodeBlock
                language="typescript"
                code={`// test-utils.tsx
import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const AllTheProviders = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };`}
              />
            </DemoCardStatic>

            <DemoCardStatic title="Comandos Úteis" description="Scripts para desenvolvimento">
              <CodeBlock
                language="bash"
                code={`# Executar testes com RTL
npm test

# Executar com watch mode
npm run test:watch

# Executar com coverage
npm run test:coverage

# Executar testes específicos
npm test -- Button.test.tsx

# Debug com screen.debug()
# Adicione no teste:
screen.debug(); // Mostra DOM atual

# Verificar queries disponíveis
screen.logTestingPlaygroundURL();`}
              />
            </DemoCardStatic>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}