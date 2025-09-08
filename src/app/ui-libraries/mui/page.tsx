'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Download, 
  Copy, 
  Check, 
  Settings, 
  User, 
  Bell, 
  Search,
  Plus,
  X,
  ChevronDown,
  Star,
  Heart,
  Share,
  MoreHorizontal,
  Calendar,
  BarChart3,
  Table,
  Palette
} from 'lucide-react';
import { DemoCard } from '@/components/DemoCard';
import { DemoCardStatic } from '@/components/DemoCardStatic';
import { DemoSection } from '@/components/DemoSection';
import { CodeBlock } from '@/components/CodeBlock';

// Mock MUI components (simplified versions)
const MuiButton = ({ 
  children, 
  variant = 'contained', 
  color = 'primary', 
  size = 'medium',
  className = '', 
  ...props 
}: {
  children: React.ReactNode;
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  [key: string]: any;
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    contained: {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
      secondary: 'bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500',
      error: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
      warning: 'bg-orange-600 text-white hover:bg-orange-700 focus:ring-orange-500',
      info: 'bg-cyan-600 text-white hover:bg-cyan-700 focus:ring-cyan-500',
      success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500'
    },
    outlined: {
      primary: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
      secondary: 'border-2 border-purple-600 text-purple-600 hover:bg-purple-50 focus:ring-purple-500',
      error: 'border-2 border-red-600 text-red-600 hover:bg-red-50 focus:ring-red-500',
      warning: 'border-2 border-orange-600 text-orange-600 hover:bg-orange-50 focus:ring-orange-500',
      info: 'border-2 border-cyan-600 text-cyan-600 hover:bg-cyan-50 focus:ring-cyan-500',
      success: 'border-2 border-green-600 text-green-600 hover:bg-green-50 focus:ring-green-500'
    },
    text: {
      primary: 'text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
      secondary: 'text-purple-600 hover:bg-purple-50 focus:ring-purple-500',
      error: 'text-red-600 hover:bg-red-50 focus:ring-red-500',
      warning: 'text-orange-600 hover:bg-orange-50 focus:ring-orange-500',
      info: 'text-cyan-600 hover:bg-cyan-50 focus:ring-cyan-500',
      success: 'text-green-600 hover:bg-green-50 focus:ring-green-500'
    }
  };
  
  const sizes = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg'
  };
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant][color]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const MuiCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden ${className}`}>
    {children}
  </div>
);

const MuiCardContent = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-4 ${className}`}>
    {children}
  </div>
);

const MuiTextField = ({ 
  label, 
  variant = 'outlined', 
  className = '', 
  ...props 
}: { 
  label?: string;
  variant?: 'outlined' | 'filled' | 'standard';
  className?: string;
  [key: string]: any;
}) => {
  const variants = {
    outlined: 'border-2 border-gray-300 rounded focus:border-blue-500',
    filled: 'bg-gray-100 border-b-2 border-gray-300 rounded-t focus:border-blue-500',
    standard: 'border-b-2 border-gray-300 focus:border-blue-500'
  };
  
  return (
    <div className="flex flex-col space-y-1">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <input
        className={`px-3 py-2 text-base transition-colors focus:outline-none ${variants[variant]} ${className}`}
        {...props}
      />
    </div>
  );
};

const MuiChip = ({ 
  label, 
  color = 'default', 
  variant = 'filled',
  onDelete,
  className = '' 
}: { 
  label: string;
  color?: 'default' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  variant?: 'filled' | 'outlined';
  onDelete?: () => void;
  className?: string;
}) => {
  const colors = {
    filled: {
      default: 'bg-gray-200 text-gray-800',
      primary: 'bg-blue-100 text-blue-800',
      secondary: 'bg-purple-100 text-purple-800',
      error: 'bg-red-100 text-red-800',
      warning: 'bg-orange-100 text-orange-800',
      info: 'bg-cyan-100 text-cyan-800',
      success: 'bg-green-100 text-green-800'
    },
    outlined: {
      default: 'border border-gray-300 text-gray-800',
      primary: 'border border-blue-300 text-blue-800',
      secondary: 'border border-purple-300 text-purple-800',
      error: 'border border-red-300 text-red-800',
      warning: 'border border-orange-300 text-orange-800',
      info: 'border border-cyan-300 text-cyan-800',
      success: 'border border-green-300 text-green-800'
    }
  };
  
  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${colors[variant][color]} ${className}`}>
      {label}
      {onDelete && (
        <button onClick={onDelete} className="ml-2 hover:bg-black hover:bg-opacity-10 rounded-full p-0.5">
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  );
};

const MuiAvatar = ({ children, src, alt, className = '' }: { 
  children?: React.ReactNode;
  src?: string;
  alt?: string;
  className?: string;
}) => (
  <div className={`w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden ${className}`}>
    {src ? (
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    ) : (
      <span className="text-gray-600 font-medium">{children}</span>
    )}
  </div>
);

// Demo Components
function ButtonShowcase() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900 dark:text-white">Variantes</h4>
        <div className="flex flex-wrap gap-3">
          <MuiButton variant="contained">Contained</MuiButton>
          <MuiButton variant="outlined">Outlined</MuiButton>
          <MuiButton variant="text">Text</MuiButton>
        </div>
      </div>
      
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900 dark:text-white">Cores</h4>
        <div className="flex flex-wrap gap-3">
          <MuiButton color="primary">Primary</MuiButton>
          <MuiButton color="secondary">Secondary</MuiButton>
          <MuiButton color="error">Error</MuiButton>
          <MuiButton color="warning">Warning</MuiButton>
          <MuiButton color="info">Info</MuiButton>
          <MuiButton color="success">Success</MuiButton>
        </div>
      </div>
      
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900 dark:text-white">Tamanhos</h4>
        <div className="flex items-center gap-3">
          <MuiButton size="small">Small</MuiButton>
          <MuiButton size="medium">Medium</MuiButton>
          <MuiButton size="large">Large</MuiButton>
        </div>
      </div>
    </div>
  );
}

function FormShowcase() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  return (
    <div className="space-y-4 max-w-md">
      <MuiTextField
        label="Nome"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Digite seu nome"
      />
      <MuiTextField
        label="Email"
        variant="filled"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Digite seu email"
      />
      <MuiTextField
        label="Mensagem"
        variant="standard"
        placeholder="Digite sua mensagem"
      />
      <MuiButton variant="contained" color="primary">
        Enviar
      </MuiButton>
    </div>
  );
}

function CardShowcase() {
  return (
    <div className="grid md:grid-cols-2 gap-1.5">
      <MuiCard>
        <MuiCardContent>
          <div className="flex items-center space-x-3 mb-3">
            <MuiAvatar>JD</MuiAvatar>
            <div>
              <h3 className="font-semibold text-gray-900">João Silva</h3>
              <p className="text-sm text-gray-500">Desenvolvedor Frontend</p>
            </div>
          </div>
          <p className="text-gray-700 mb-4">
            Especialista em React e Material-UI com 5 anos de experiência.
          </p>
          <div className="flex space-x-2">
            <MuiChip label="React" color="primary" />
            <MuiChip label="MUI" color="secondary" />
          </div>
        </MuiCardContent>
      </MuiCard>
      
      <MuiCard>
        <MuiCardContent>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">Projeto Dashboard</h3>
            <MuiChip label="Em Progresso" color="warning" variant="outlined" />
          </div>
          <p className="text-gray-700 mb-4">
            Dashboard administrativo com componentes Material-UI.
          </p>
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <MuiChip label="TypeScript" color="info" />
              <MuiChip label="Next.js" color="success" />
            </div>
            <MuiButton variant="outlined" size="small">
              Ver Detalhes
            </MuiButton>
          </div>
        </MuiCardContent>
      </MuiCard>
    </div>
  );
}

function DataGridDemo() {
  const data = [
    { id: 1, name: 'João Silva', email: 'joao@email.com', role: 'Admin' },
    { id: 2, name: 'Maria Santos', email: 'maria@email.com', role: 'User' },
    { id: 3, name: 'Pedro Costa', email: 'pedro@email.com', role: 'Editor' },
  ];
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
        <h4 className="font-semibold text-gray-900">DataGrid Exemplo</h4>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">ID</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Nome</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Email</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Função</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900">{row.id}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{row.name}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{row.email}</td>
                <td className="px-4 py-3">
                  <MuiChip 
                    label={row.role} 
                    color={row.role === 'Admin' ? 'error' : row.role === 'Editor' ? 'warning' : 'default'}
                    variant="outlined"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ThemeShowcase() {
  const [darkMode, setDarkMode] = useState(false);
  
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-3">
        <Palette className="h-5 w-5 text-blue-600" />
        <h4 className="font-semibold text-gray-900 dark:text-white">Personalização de Tema</h4>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h5 className="font-medium text-blue-900 mb-2">Tema Claro</h5>
          <div className="space-y-2">
            <div className="w-full h-2 bg-blue-200 rounded"></div>
            <div className="w-3/4 h-2 bg-blue-300 rounded"></div>
            <div className="w-1/2 h-2 bg-blue-400 rounded"></div>
          </div>
        </div>
        
        <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
          <h5 className="font-medium text-gray-100 mb-2">Tema Escuro</h5>
          <div className="space-y-2">
            <div className="w-full h-2 bg-gray-600 rounded"></div>
            <div className="w-3/4 h-2 bg-gray-500 rounded"></div>
            <div className="w-1/2 h-2 bg-gray-400 rounded"></div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <MuiChip label="Primary: #1976d2" color="primary" />
        <MuiChip label="Secondary: #dc004e" color="secondary" />
        <MuiChip label="Error: #f44336" color="error" />
        <MuiChip label="Warning: #ff9800" color="warning" />
        <MuiChip label="Info: #2196f3" color="info" />
        <MuiChip label="Success: #4caf50" color="success" />
      </div>
    </div>
  );
}

export default function MUIPage() {
  const installationCode = `# Instalação do Material-UI
npm install @mui/material @emotion/react @emotion/styled

# Para usar ícones
npm install @mui/icons-material

# Para componentes avançados (MUI X)
npm install @mui/x-data-grid @mui/x-date-pickers @mui/x-charts`;

  const basicUsageCode = `import { Button, TextField, Card, CardContent } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

function MyComponent() {
  return (
    <Card>
      <CardContent>
        <TextField label="Nome" variant="outlined" />
        <Button variant="contained" color="primary">
          Enviar
        </Button>
      </CardContent>
    </Card>
  );
}`;

  const themeCode = `import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* Sua aplicação */}
    </ThemeProvider>
  );
}`;

  const dataGridCode = `import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'firstName', headerName: 'Nome', width: 150 },
  { field: 'lastName', headerName: 'Sobrenome', width: 150 },
  { field: 'email', headerName: 'Email', width: 200 },
];

const rows = [
  { id: 1, lastName: 'Silva', firstName: 'João', email: 'joao@email.com' },
  { id: 2, lastName: 'Santos', firstName: 'Maria', email: 'maria@email.com' },
];

function DataTable() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
      />
    </div>
  );
}`;

  const features = [
    {
      title: 'Componentes Prontos',
      description: 'Mais de 50 componentes React prontos para uso',
      icon: '🧩',
      color: 'text-blue-600'
    },
    {
      title: 'Design System',
      description: 'Baseado no Material Design do Google',
      icon: '🎨',
      color: 'text-purple-600'
    },
    {
      title: 'Acessibilidade',
      description: 'Componentes acessíveis por padrão',
      icon: '♿',
      color: 'text-green-600'
    },
    {
      title: 'Customização',
      description: 'Sistema de temas flexível e poderoso',
      icon: '⚙️',
      color: 'text-orange-600'
    }
  ];

  const muiXFeatures = [
    {
      title: 'DataGrid',
      description: 'Tabelas avançadas com filtros, ordenação e paginação',
      icon: <Table className="h-8 w-8" />,
      color: 'text-blue-600'
    },
    {
      title: 'Date Pickers',
      description: 'Seletores de data e hora completos',
      icon: <Calendar className="h-8 w-8" />,
      color: 'text-green-600'
    },
    {
      title: 'Charts',
      description: 'Gráficos interativos e responsivos',
      icon: <BarChart3 className="h-8 w-8" />,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-4">
            Material-UI (MUI)
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A biblioteca de componentes React mais popular do mundo, baseada no Material Design do Google.
            Construa interfaces bonitas e funcionais rapidamente.
          </p>
        </motion.div>

        {/* Features Overview */}
        <DemoSection title="Por que escolher Material-UI?">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-1.5 mb-8">
            {features.map((feature, index) => {
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <DemoCardStatic title={feature.title} description={feature.description}>
                    <div className="text-center">
                      <div className="text-4xl mb-3">{feature.icon}</div>
                      <div className={`text-sm font-medium ${feature.color}`}>
                        Pronto para usar
                      </div>
                    </div>
                  </DemoCardStatic>
                </motion.div>
              );
            })}
          </div>
        </DemoSection>

        {/* Installation */}
        <DemoSection title="Instalação e Configuração">
          <div className="grid md:grid-cols-2 gap-1.5">
            <DemoCardStatic title="📦 Instalação" description="Como instalar o Material-UI no seu projeto">
              <CodeBlock 
                code={installationCode}
                language="bash"
                showLineNumbers={false}
              />
            </DemoCardStatic>
            
            <DemoCardStatic title="🚀 Uso Básico" description="Exemplo simples de como usar os componentes">
              <CodeBlock 
                code={basicUsageCode}
                language="tsx"
                showLineNumbers={false}
              />
            </DemoCardStatic>
          </div>
        </DemoSection>

        {/* Components Showcase */}
        <DemoSection title="Componentes Principais">
          <div className="grid md:grid-cols-2 gap-1.5">
            <DemoCardStatic title="🔘 Buttons" description="Botões com diferentes variantes, cores e tamanhos">
              <ButtonShowcase />
            </DemoCardStatic>
            
            <DemoCardStatic title="📝 Forms" description="Campos de formulário com validação e estilos">
              <FormShowcase />
            </DemoCardStatic>
          </div>
        </DemoSection>

        <DemoSection title="Cards e Layout">
          <DemoCardStatic title="🃏 Cards" description="Componentes de card para organizar conteúdo">
            <CardShowcase />
          </DemoCardStatic>
        </DemoSection>

        {/* MUI X Components */}
        <DemoSection title="MUI X - Componentes Avançados">
          <div className="grid md:grid-cols-3 gap-1.5 mb-8">
            {muiXFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <DemoCardStatic title={feature.title} description={feature.description}>
                  <div className="text-center">
                    <div className={`mx-auto mb-3 ${feature.color}`}>
                      {feature.icon}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      Componente premium
                    </div>
                  </div>
                </DemoCardStatic>
              </motion.div>
            ))}
          </div>
          
          <DemoCardStatic title="📊 DataGrid Exemplo" description="Tabela avançada com recursos profissionais">
            <DataGridDemo />
            <div className="mt-4">
              <CodeBlock 
                code={dataGridCode}
                language="tsx"
                showLineNumbers={false}
                maxHeight="300px"
              />
            </div>
          </DemoCardStatic>
        </DemoSection>

        {/* Theming */}
        <DemoSection title="Sistema de Temas">
          <div className="grid md:grid-cols-2 gap-1.5">
            <DemoCardStatic title="🎨 Personalização" description="Customize cores, tipografia e espaçamentos">
              <ThemeShowcase />
            </DemoCardStatic>
            
            <DemoCardStatic title="⚙️ Configuração de Tema" description="Como criar e aplicar temas customizados">
              <CodeBlock 
                code={themeCode}
                language="tsx"
                showLineNumbers={false}
                maxHeight="300px"
              />
            </DemoCardStatic>
          </div>
        </DemoSection>

        {/* Best Practices */}
        <DemoSection title="Melhores Práticas">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-1.5">
            <DemoCardStatic title="🏗️ Estrutura" description="Organização de componentes">
              <div className="space-y-3">
                {[
                  'Use ThemeProvider no root da aplicação',
                  'Importe apenas os componentes necessários',
                  'Utilize o sistema de breakpoints',
                  'Aproveite os tokens de design',
                  'Mantenha consistência visual'
                ].map((practice, index) => (
                  <div key={index} className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{practice}</span>
                  </div>
                ))}
              </div>
            </DemoCardStatic>
            
            <DemoCardStatic title="⚡ Performance" description="Otimizações importantes">
              <div className="space-y-3">
                {[
                  'Use tree shaking para reduzir bundle',
                  'Implemente lazy loading quando necessário',
                  'Otimize re-renders com memo',
                  'Use sx prop com moderação',
                  'Configure CSP para emotion'
                ].map((tip, index) => (
                  <div key={index} className="flex items-start">
                    <Star className="h-4 w-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{tip}</span>
                  </div>
                ))}
              </div>
            </DemoCardStatic>
            
            <DemoCardStatic title="🔧 Desenvolvimento" description="Dicas para desenvolvimento">
              <div className="space-y-3">
                {[
                  'Use TypeScript para melhor DX',
                  'Configure ESLint com regras MUI',
                  'Utilize Storybook para documentação',
                  'Teste componentes com Testing Library',
                  'Monitore bundle size regularmente'
                ].map((tip, index) => (
                  <div key={index} className="flex items-start">
                    <Settings className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{tip}</span>
                  </div>
                ))}
              </div>
            </DemoCardStatic>
          </div>
        </DemoSection>

        {/* Resources */}
        <DemoSection title="Recursos e Links">
          <div className="grid md:grid-cols-2 gap-1.5">
            <DemoCardStatic title="📚 Documentação" description="Links úteis para aprender mais">
              <div className="space-y-3">
                <a href="https://mui.com/" target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                  <Download className="h-4 w-4 mr-2" />
                  Documentação Oficial
                </a>
                <a href="https://mui.com/x/" target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                  <Download className="h-4 w-4 mr-2" />
                  MUI X Components
                </a>
                <a href="https://mui.com/material-ui/getting-started/" target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                  <Download className="h-4 w-4 mr-2" />
                  Guia de Início
                </a>
                <a href="https://mui.com/material-ui/customization/theming/" target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                  <Download className="h-4 w-4 mr-2" />
                  Sistema de Temas
                </a>
              </div>
            </DemoCardStatic>
            
            <DemoCardStatic title="🛠️ Ferramentas" description="Ferramentas complementares">
              <div className="space-y-3">
                <div className="flex items-center">
                  <Palette className="h-4 w-4 mr-2 text-purple-600" />
                  <span className="text-sm">Material-UI Theme Creator</span>
                </div>
                <div className="flex items-center">
                  <Settings className="h-4 w-4 mr-2 text-blue-600" />
                  <span className="text-sm">MUI System</span>
                </div>
                <div className="flex items-center">
                  <BarChart3 className="h-4 w-4 mr-2 text-green-600" />
                  <span className="text-sm">MUI X Data Grid</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-orange-600" />
                  <span className="text-sm">MUI X Date Pickers</span>
                </div>
              </div>
            </DemoCardStatic>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}