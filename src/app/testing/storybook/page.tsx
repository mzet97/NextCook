'use client';

import { useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { DemoCard } from '@/components/DemoCard';
import { DemoCardStatic } from '@/components/DemoCardStatic';
import { DemoSection } from '@/components/DemoSection';
import { 
  BookOpenIcon,
  PuzzlePieceIcon,
  EyeIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  SparklesIcon,
  CogIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

const storybookPrinciples = [
  {
    name: 'Component Isolation',
    description: 'Desenvolva componentes isoladamente',
    icon: PuzzlePieceIcon,
    example: `// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
};`
  },
  {
    name: 'Visual Testing',
    description: 'Teste visual de componentes',
    icon: EyeIcon,
    example: `// Visual regression testing
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="danger">Danger</Button>
      <Button disabled>Disabled</Button>
    </div>
  ),
};

// Chromatic para visual testing
export const ResponsiveButton: Story = {
  parameters: {
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '667px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
      },
    },
  },
};`
  },
  {
    name: 'Interactive Documentation',
    description: 'Documentação viva e interativa',
    icon: DocumentTextIcon,
    example: `// Documentação com controles
export const Interactive: Story = {
  args: {
    label: 'Button',
    primary: false,
    size: 'medium',
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Button label text',
    },
    primary: {
      control: 'boolean',
      description: 'Is this the principal call to action?',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
  },
};`
  },
  {
    name: 'Addon Ecosystem',
    description: 'Extensível com addons poderosos',
    icon: CogIcon,
    example: `// .storybook/main.ts
export default {
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-viewport',
    '@storybook/addon-docs',
    '@chromatic-com/storybook',
  ],
};

// Teste de acessibilidade automático
export const AccessibilityTest: Story = {
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
        ],
      },
    },
  },
};`
  }
];

const storyExamples = [
  {
    title: 'Story Básica',
    description: 'Estrutura fundamental de uma story',
    code: `// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente de botão reutilizável com múltiplas variantes.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger'],
      description: 'Visual variant of the button',
    },
    size: {
      control: { type: 'radio' },
      options: ['small', 'medium', 'large'],
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Story padrão
export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'medium',
  },
};

// Variantes
export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
};

export const Danger: Story = {
  args: {
    children: 'Danger Button',
    variant: 'danger',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};`
  },
  {
    title: 'Story com Estado',
    description: 'Componentes com estado interno',
    code: `// Counter.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Counter } from './Counter';
import { within, userEvent, expect } from '@storybook/test';

const meta: Meta<typeof Counter> = {
  title: 'Components/Counter',
  component: Counter,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initialValue: 0,
  },
};

export const WithInitialValue: Story = {
  args: {
    initialValue: 10,
  },
};

// Story com interação automática
export const InteractionTest: Story = {
  args: {
    initialValue: 0,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Encontrar botões
    const incrementButton = canvas.getByRole('button', { name: /increment/i });
    const decrementButton = canvas.getByRole('button', { name: /decrement/i });
    
    // Testar incremento
    await userEvent.click(incrementButton);
    await userEvent.click(incrementButton);
    
    // Verificar valor
    await expect(canvas.getByText('Count: 2')).toBeInTheDocument();
    
    // Testar decremento
    await userEvent.click(decrementButton);
    await expect(canvas.getByText('Count: 1')).toBeInTheDocument();
  },
};`
  },
  {
    title: 'Story com Mock',
    description: 'Mockando APIs e dependências',
    code: `// UserProfile.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { UserProfile } from './UserProfile';
import { http, HttpResponse } from 'msw';

const meta: Meta<typeof UserProfile> = {
  title: 'Features/UserProfile',
  component: UserProfile,
  parameters: {
    layout: 'centered',
    msw: {
      handlers: [
        // Mock da API de usuário
        http.get('/api/user/:id', ({ params }) => {
          return HttpResponse.json({
            id: params.id,
            name: 'John Doe',
            email: 'john@example.com',
            avatar: 'https://via.placeholder.com/150',
            role: 'Developer',
          });
        }),
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    userId: '1',
  },
};

// Mock de erro
export const ErrorState: Story = {
  args: {
    userId: '1',
  },
  parameters: {
    msw: {
      handlers: [
        http.get('/api/user/:id', () => {
          return new HttpResponse(null, { status: 404 });
        }),
      ],
    },
  },
};

// Mock de loading
export const LoadingState: Story = {
  args: {
    userId: '1',
  },
  parameters: {
    msw: {
      handlers: [
        http.get('/api/user/:id', async () => {
          await new Promise(resolve => setTimeout(resolve, 2000));
          return HttpResponse.json({
            id: '1',
            name: 'John Doe',
            email: 'john@example.com',
          });
        }),
      ],
    },
  },
};`
  },
  {
    title: 'Story Complexa',
    description: 'Cenários complexos com múltiplos componentes',
    code: `// Dashboard.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Dashboard } from './Dashboard';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

const meta: Meta<typeof Dashboard> = {
  title: 'Pages/Dashboard',
  component: Dashboard,
  decorators: [
    (Story) => {
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: { retry: false },
        },
      });
      
      return (
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <div className="min-h-screen bg-gray-50 p-8">
              <Story />
            </div>
          </QueryClientProvider>
        </BrowserRouter>
      );
    },
  ],
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithData: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('/api/dashboard/stats', () => {
          return HttpResponse.json({
            users: 1234,
            revenue: 45678,
            orders: 890,
            growth: 12.5,
          });
        }),
        http.get('/api/dashboard/charts', () => {
          return HttpResponse.json({
            sales: [100, 200, 150, 300, 250],
            users: [50, 75, 100, 125, 150],
          });
        }),
      ],
    },
  },
};

export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark">
        <Story />
      </div>
    ),
  ],
};`
  }
];

const storybookAddons = [
  {
    name: 'Essentials',
    description: 'Addons fundamentais do Storybook',
    features: ['Controls', 'Actions', 'Viewport', 'Backgrounds', 'Docs'],
    setup: `// .storybook/main.ts
export default {
  addons: [
    '@storybook/addon-essentials',
  ],
};`
  },
  {
    name: 'Accessibility',
    description: 'Teste de acessibilidade automático',
    features: ['WCAG Compliance', 'Color Contrast', 'Keyboard Navigation', 'Screen Reader'],
    setup: `// .storybook/main.ts
export default {
  addons: [
    '@storybook/addon-a11y',
  ],
};

// Em uma story
export const AccessibleButton: Story = {
  parameters: {
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'keyboard-navigation', enabled: true },
        ],
      },
    },
  },
};`
  },
  {
    name: 'Visual Testing',
    description: 'Teste visual com Chromatic',
    features: ['Visual Regression', 'Cross-browser', 'Responsive Testing', 'CI/CD Integration'],
    setup: `// .storybook/main.ts
export default {
  addons: [
    '@chromatic-com/storybook',
  ],
};

// package.json
{
  "scripts": {
    "chromatic": "chromatic --exit-zero-on-changes"
  }
}

// GitHub Actions
- name: Publish to Chromatic
  uses: chromaui/action@v1
  with:
    token: \${{ secrets.GITHUB_TOKEN }}
    projectToken: \${{ secrets.CHROMATIC_PROJECT_TOKEN }}`
  },
  {
    name: 'MSW (Mock Service Worker)',
    description: 'Mock de APIs para testes',
    features: ['API Mocking', 'Network Simulation', 'Error States', 'Loading States'],
    setup: `// .storybook/main.ts
export default {
  addons: [
    'msw-storybook-addon',
  ],
};

// .storybook/preview.ts
import { initialize, mswLoader } from 'msw-storybook-addon';

initialize();

export const loaders = [mswLoader];

// Em uma story
export const WithMockData: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('/api/users', () => {
          return HttpResponse.json([{ id: 1, name: 'John' }]);
        }),
      ],
    },
  },
};`
  }
];

export default function StorybookPage() {
  const [selectedExample, setSelectedExample] = useState(0);
  const [selectedAddon, setSelectedAddon] = useState(0);
  const [runningStorybook, setRunningStorybook] = useState(false);

  const runStorybookDemo = () => {
    setRunningStorybook(true);
    setTimeout(() => {
      setRunningStorybook(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl mb-6">
            <BookOpenIcon className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Storybook
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Ferramenta para desenvolvimento, teste e documentação de componentes UI isoladamente
          </p>
        </div>

        {/* Storybook Principles */}
        <DemoSection title="Conceitos Fundamentais" description="Princípios do desenvolvimento com Storybook">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-1.5 mb-8">
            {storybookPrinciples.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <DemoCard key={principle.name} title={principle.name} description={principle.description}>
                  <div className="space-y-4">
                    <Icon className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                    <CodeBlock
                      language="typescript"
                      code={principle.example}
                    />
                  </div>
                </DemoCard>
              );
            })}
          </div>
        </DemoSection>

        {/* Story Structure */}
        <DemoSection title="Anatomia de uma Story" description="Estrutura e organização de stories">
          <div className="grid md:grid-cols-3 gap-1.5">
            <DemoCardStatic title="📁 Organização" description="Estrutura de arquivos">
              <div className="space-y-3">
                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded font-mono text-sm">
                  <div>src/</div>
                  <div className="ml-2">components/</div>
                  <div className="ml-4">Button/</div>
                  <div className="ml-6 text-blue-600">Button.tsx</div>
                  <div className="ml-6 text-orange-600">Button.stories.tsx</div>
                  <div className="ml-6 text-green-600">Button.test.tsx</div>
                </div>
              </div>
            </DemoCardStatic>

            <DemoCardStatic title="⚙️ Configuração" description="Meta e configurações">
              <div className="space-y-3">
                {[
                  { prop: 'title', desc: 'Localização na sidebar' },
                  { prop: 'component', desc: 'Componente principal' },
                  { prop: 'parameters', desc: 'Configurações globais' },
                  { prop: 'argTypes', desc: 'Controles de propriedades' },
                  { prop: 'decorators', desc: 'Wrappers e contexto' }
                ].map((item) => (
                  <div key={item.prop} className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded">
                    <div className="font-mono text-sm font-semibold text-orange-700 dark:text-orange-400">
                      {item.prop}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>
            </DemoCardStatic>

            <DemoCardStatic title="📖 Stories" description="Variações do componente">
              <div className="space-y-3">
                {[
                  { story: 'Default', desc: 'Estado padrão' },
                  { story: 'Primary', desc: 'Variante principal' },
                  { story: 'Disabled', desc: 'Estado desabilitado' },
                  { story: 'Loading', desc: 'Estado de carregamento' },
                  { story: 'Error', desc: 'Estado de erro' }
                ].map((item) => (
                  <div key={item.story} className="p-2 bg-red-50 dark:bg-red-900/20 rounded">
                    <div className="font-mono text-sm font-semibold text-red-700 dark:text-red-400">
                      {item.story}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>
            </DemoCardStatic>
          </div>
        </DemoSection>

        {/* Story Examples */}
        <DemoSection title="Exemplos de Stories" description="Casos de uso práticos com Storybook">
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {storyExamples.map((example, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedExample(index)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedExample === index
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {example.title}
                </button>
              ))}
            </div>
            
            <DemoCard 
              title={storyExamples[selectedExample].title} 
              description={storyExamples[selectedExample].description}
            >
              <CodeBlock
                language="typescript"
                code={storyExamples[selectedExample].code}
              />
            </DemoCard>
          </div>
        </DemoSection>

        {/* Addons */}
        <DemoSection title="Addons Essenciais" description="Extensões que potencializam o Storybook">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8 px-6 overflow-x-auto">
                {storybookAddons.map((addon, index) => (
                  <button
                    key={addon.name}
                    onClick={() => setSelectedAddon(index)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                      selectedAddon === index
                        ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    {addon.name}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {storybookAddons[selectedAddon].name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {storybookAddons[selectedAddon].description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {storybookAddons[selectedAddon].features.map((feature) => (
                    <span key={feature} className="px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-full text-sm">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              
              <CodeBlock
                language="typescript"
                code={storybookAddons[selectedAddon].setup}
              />
            </div>
          </div>
        </DemoSection>

        {/* Storybook Demo */}
        <DemoSection title="Executar Storybook" description="Demonstração do ambiente de desenvolvimento">
          <DemoCardStatic title="Storybook Dev Server" description="Simule a execução do Storybook">
            <div className="space-y-4">
              <button
                onClick={runStorybookDemo}
                disabled={runningStorybook}
                className="flex items-center px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <BookOpenIcon className="h-5 w-5 mr-2" />
                {runningStorybook ? 'Iniciando...' : 'Iniciar Storybook'}
              </button>
              
              {runningStorybook && (
                <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm">
                  <div className="animate-pulse">
                    <div>info =&gt; Starting Storybook 7.6.0...</div>
                    <div>info =&gt; Loading presets</div>
                    <div>info =&gt; Building manager...</div>
                    <div>info =&gt; Building preview...</div>
                    <div>info =&gt; webpack built preview in 2.1s</div>
                    <div className="text-orange-400">╭─────────────────────────────────────────────────╮</div>
                    <div className="text-orange-400">│                                                 │</div>
                    <div className="text-orange-400">│   Storybook 7.6.0 for React started           │</div>
                    <div className="text-orange-400">│   http://localhost:6006                        │</div>
                    <div className="text-orange-400">│                                                 │</div>
                    <div className="text-orange-400">╰─────────────────────────────────────────────────╯</div>
                  </div>
                </div>
              )}
              
              {!runningStorybook && (
                <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm">
                  <div>✓ Storybook started successfully!</div>
                  <div className="mt-2">
                    <div>📚 Stories: 47 stories loaded</div>
                    <div>🎨 Components: 23 components documented</div>
                    <div>🧪 Tests: 15 interaction tests</div>
                    <div>♿ A11y: All accessibility checks passed</div>
                  </div>
                  <div className="mt-2 text-orange-400">Local: http://localhost:6006</div>
                  <div className="text-blue-400">Network: http://192.168.1.100:6006</div>
                </div>
              )}
            </div>
          </DemoCardStatic>
        </DemoSection>

        {/* Best Practices */}
        <DemoSection title="Melhores Práticas" description="Diretrizes para usar Storybook efetivamente">
          <div className="grid md:grid-cols-2 gap-1.5">
            <DemoCardStatic title="✅ Faça" description="Práticas recomendadas">
              <div className="space-y-3">
                {[
                  'Crie stories para todos os estados',
                  'Use controles para propriedades',
                  'Documente comportamentos complexos',
                  'Teste acessibilidade com addon-a11y',
                  'Use decorators para contexto',
                  'Organize stories por funcionalidade',
                  'Implemente visual regression testing',
                  'Mock APIs com MSW'
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
                  'Stories muito complexas',
                  'Dependências externas não mockadas',
                  'Stories sem documentação',
                  'Ignorar estados de erro',
                  'Não testar responsividade',
                  'Stories que dependem de roteamento',
                  'Não usar TypeScript',
                  'Misturar lógica de negócio'
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

        {/* Getting Started */}
        <DemoSection title="Como Começar" description="Setup inicial do Storybook">
          <div className="grid md:grid-cols-2 gap-1.5">
            <DemoCardStatic title="Instalação" description="Setup inicial do projeto">
              <CodeBlock
                language="bash"
                code={`# Instalar Storybook
npx storybook@latest init

# Ou com pnpm
pnpm dlx storybook@latest init

# Iniciar Storybook
npm run storybook

# Build para produção
npm run build-storybook

# Instalar addons essenciais
npm install --save-dev @storybook/addon-a11y
npm install --save-dev @chromatic-com/storybook
npm install --save-dev msw-storybook-addon`}
              />
            </DemoCardStatic>

            <DemoCardStatic title="Configuração" description="Configuração básica">
              <CodeBlock
                language="typescript"
                code={`// .storybook/main.ts
export default {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@chromatic-com/storybook',
    'msw-storybook-addon',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
  },
};

// .storybook/preview.ts
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};`}
              />
            </DemoCardStatic>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}