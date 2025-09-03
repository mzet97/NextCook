'use client';

import { useState } from 'react';
import CodeSnippet from '@/components/CodeSnippet';
import { Search, Filter, Code, Zap, BookOpen } from 'lucide-react';

const snippets = [
  {
    id: 'use-local-storage',
    title: 'useLocalStorage Hook',
    description: 'Hook personalizado para gerenciar localStorage com TypeScript',
    category: 'hooks',
    difficulty: 'intermediario',
    language: 'typescript',
    tags: ['react', 'hooks', 'localStorage', 'typescript'],
    code: `import { useState, useEffect } from 'react';

function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading localStorage key "' + key + '":', error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error setting localStorage key "' + key + '":', error);
    }
  };

  return [storedValue, setValue] as const;
}`,
    usage: `// Uso do hook
const [name, setName] = useLocalStorage('name', '');
const [user, setUser] = useLocalStorage('user', { id: 0, email: '' });

// Atualizar valores
setName('João');
setUser(prev => ({ ...prev, email: 'joao@email.com' }));`,
    tips: [
      'Sempre trate erros ao acessar localStorage',
      'Use TypeScript para type safety',
      'Considere usar um debounce para muitas atualizações'
    ]
  },
  {
    id: 'use-fetch',
    title: 'useFetch Hook',
    description: 'Hook para requisições HTTP com loading e error states',
    category: 'hooks',
    difficulty: 'intermediario',
    language: 'typescript',
    tags: ['react', 'hooks', 'fetch', 'api'],
    code: `import { useState, useEffect } from 'react';

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

function useFetch<T>(url: string): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }
      
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, error, refetch: fetchData };
}`,
    usage: `// Uso do hook
const { data, loading, error, refetch } = useFetch<User[]>('/api/users');

if (loading) return <div>Carregando...</div>;
if (error) return <div>Erro: {error}</div>;

return (
  <div>
    {data?.map(user => <div key={user.id}>{user.name}</div>)}
    <button onClick={refetch}>Recarregar</button>
  </div>
);`,
    tips: [
      'Sempre trate estados de loading e error',
      'Use TypeScript para tipar a resposta da API',
      'Considere usar bibliotecas como TanStack Query para casos complexos'
    ]
  },
  {
    title: 'API Route com Validação',
    description: 'API route do Next.js com validação de dados usando Zod',
    code: `import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Schema de validação
const createUserSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  age: z.number().min(18, 'Idade mínima é 18 anos').max(120, 'Idade máxima é 120 anos'),
  preferences: z.object({
    newsletter: z.boolean().default(false),
    theme: z.enum(['light', 'dark']).default('light')
  }).optional()
});

type CreateUserRequest = z.infer<typeof createUserSchema>;

export async function POST(request: NextRequest) {
  try {
    // Parse do body da requisição
    const body = await request.json();
    
    // Validação com Zod
    const validatedData = createUserSchema.parse(body);
    
    // Simular criação do usuário
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      ...validatedData,
      createdAt: new Date().toISOString()
    };
    
    // Aqui você salvaria no banco de dados
    // await db.user.create({ data: newUser });
    
    return NextResponse.json(
      { 
        success: true, 
        data: newUser,
        message: 'Usuário criado com sucesso'
      },
      { status: 201 }
    );
    
  } catch (error) {
    // Erro de validação do Zod
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Dados inválidos',
          details: error.errors
        },
        { status: 400 }
      );
    }
    
    // Outros erros
    console.error('Erro na API:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Erro interno do servidor'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Simular busca de usuários
  const users = [
    { id: '1', name: 'João', email: 'joao@example.com', age: 25 },
    { id: '2', name: 'Maria', email: 'maria@example.com', age: 30 }
  ];
  
  return NextResponse.json({
    success: true,
    data: users
  });
}`,
    language: 'typescript',
    category: 'API Routes',
    difficulty: 'Avançado' as const,
    tags: ['api', 'validation', 'zod', 'nextjs'],
    docsUrl: 'https://nextjs.org/docs/app/building-your-application/routing/route-handlers',
    usageExample: `// Cliente - Como fazer requisições para esta API

// POST - Criar usuário
const createUser = async (userData: {
  name: string;
  email: string;
  age: number;
  preferences?: { newsletter: boolean; theme: 'light' | 'dark' };
}) => {
  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error);
    }
    
    return result.data;
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    throw error;
  }
};

// GET - Buscar usuários
const getUsers = async () => {
  try {
    const response = await fetch('/api/users');
    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error);
    }
    
    return result.data;
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    throw error;
  }
};

// Uso em um componente
function UserForm() {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const newUser = await createUser({
        name: 'João Silva',
        email: 'joao@example.com',
        age: 25,
        preferences: {
          newsletter: true,
          theme: 'dark'
        }
      });
      
      console.log('Usuário criado:', newUser);
    } catch (error) {
      console.error('Erro:', error);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Seus campos do formulário */}
    </form>
  );
}`,
    tips: [
      'Sempre valide dados de entrada em APIs públicas',
      'Use schemas Zod para type safety automática',
      'Retorne códigos de status HTTP apropriados',
      'Implemente logging adequado para debugging',
      'Considere rate limiting para APIs de produção'
    ],
    relatedSnippets: ['Middleware de Autenticação', 'Error Boundary', 'React Query Integration']
  },
  {
    id: 'loading-skeleton',
    title: 'Componente de Loading Skeleton',
    description: 'Componente reutilizável para estados de carregamento com animação',
    category: 'componentes',
    difficulty: 'basico',
    language: 'typescript',
    tags: ['loading', 'skeleton', 'ui', 'animation'],
    code: `import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  lines?: number;
  animation?: 'pulse' | 'wave' | 'none';
}

export function Skeleton({
  className,
  variant = 'rectangular',
  width,
  height,
  lines = 1,
  animation = 'pulse',
  ...props
}: SkeletonProps) {
  const baseClasses = 'bg-gray-200 dark:bg-gray-700';
  
  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-shimmer bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700',
    none: ''
  };
  
  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-md'
  };
  
  const style = {
    width: width || (variant === 'circular' ? height : undefined),
    height: height || (variant === 'text' ? '1rem' : undefined)
  };
  
  if (variant === 'text' && lines > 1) {
    return (
      <div className={cn('space-y-2', className)} {...props}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={cn(
              baseClasses,
              variantClasses.text,
              animationClasses[animation],
              index === lines - 1 ? 'w-3/4' : 'w-full'
            )}
            style={{
              height: height || '1rem',
              width: index === lines - 1 ? '75%' : width || '100%'
            }}
          />
        ))}
      </div>
    );
  }
  
  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        animationClasses[animation],
        className
      )}
      style={style}
      {...props}
    />
  );
}`,
    usage: `// Componentes pré-configurados para casos comuns
export function CardSkeleton() {
  return (
    <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg space-y-4">
      <Skeleton variant="circular" width={40} height={40} />
      <div className="space-y-2">
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" lines={2} />
      </div>
      <Skeleton variant="rectangular" height={200} />
      <div className="flex space-x-2">
        <Skeleton variant="rectangular" width={80} height={32} />
        <Skeleton variant="rectangular" width={80} height={32} />
      </div>
    </div>
  );
}`,
    tips: [
      'Use skeletons que correspondem ao layout final',
      'Mantenha a animação sutil para não distrair',
      'Considere usar diferentes variantes para diferentes tipos de conteúdo',
      'Combine com Suspense para melhor UX',
      'Teste em diferentes tamanhos de tela'
    ]
  },
  {
    id: 'form-validation',
    title: 'Formulário com Validação',
    description: 'Formulário usando React Hook Form e Zod para validação',
    category: 'formularios',
    difficulty: 'intermediario',
    language: 'typescript',
    tags: ['forms', 'validation', 'zod', 'react-hook-form'],
    code: `import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const userSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  age: z.number().min(18, 'Deve ser maior de idade'),
  password: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres')
});

type UserFormData = z.infer<typeof userSchema>;

export function UserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema)
  });

  const onSubmit = async (data: UserFormData) => {
    try {
      await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      alert('Usuário criado com sucesso!');
    } catch (error) {
      alert('Erro ao criar usuário');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input
          {...register('name')}
          placeholder="Nome"
          className="w-full p-2 border rounded"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>
      
      <div>
        <input
          {...register('email')}
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full p-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        {isSubmitting ? 'Enviando...' : 'Enviar'}
      </button>
    </form>
  );
}`,
    usage: `// Uso do componente
import { UserForm } from './components/UserForm';

function App() {
  return (
    <div className="max-w-md mx-auto p-4">
      <h1>Cadastro de Usuário</h1>
      <UserForm />
    </div>
  );
}`,
    tips: [
      'Use Zod para validação type-safe',
      'React Hook Form oferece ótima performance',
      'Sempre trate estados de loading nos formulários'
    ]
  },
  {
    id: 'error-boundary',
    title: 'Error Boundary',
    description: 'Componente para capturar e tratar erros em React',
    category: 'componentes',
    difficulty: 'avancado',
    language: 'typescript',
    tags: ['error-handling', 'react', 'typescript'],
    code: `import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Aqui você pode enviar o erro para um serviço de monitoramento
    // como Sentry, LogRocket, etc.
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="p-4 border border-red-300 rounded-lg bg-red-50">
          <h2 className="text-lg font-semibold text-red-800 mb-2">
            Oops! Algo deu errado
          </h2>
          <p className="text-red-600 mb-4">
            Ocorreu um erro inesperado. Por favor, recarregue a página.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Recarregar Página
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}`,
    usage: `// Uso do Error Boundary
import { ErrorBoundary } from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Header />
      <main>
        <ErrorBoundary fallback={<div>Erro na seção principal</div>}>
          <MainContent />
        </ErrorBoundary>
      </main>
      <Footer />
    </ErrorBoundary>
  );
}`,
    tips: [
        'Use Error Boundaries para isolar erros em partes específicas da UI',
        'Integre com serviços de monitoramento para tracking de erros',
        'Forneça fallbacks úteis para melhor UX'
      ]
    },
    {
      id: 'zustand-modern-store',
      title: 'Zustand Store Moderno',
      description: 'Store com TypeScript, immer e melhores práticas 2024',
      category: 'estado',
      difficulty: 'intermediario',
      language: 'typescript',
      tags: ['zustand', 'typescript', 'immer', 'state'],
      code: `import { create } from 'zustand';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { StateCreator } from 'zustand';

// Tipos bem definidos
interface User {
  id: string;
  name: string;
  email: string;
  preferences: {
    theme: 'light' | 'dark';
    language: string;
  };
}

interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  // Actions
  setUser: (user: User) => void;
  updatePreferences: (preferences: Partial<User['preferences']>) => void;
  clearUser: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

// Store creator separado para melhor organização
const userStore: StateCreator<UserState, [], [], UserState> = (set, get) => ({
  user: null,
  isLoading: false,
  error: null,
  
  setUser: (user) => set({ user, error: null }),
  
  updatePreferences: (preferences) => set((state) => {
    if (!state.user) return state;
    return {
      user: {
        ...state.user,
        preferences: { ...state.user.preferences, ...preferences }
      }
    };
  }),
  
  clearUser: () => set({ user: null, error: null }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error, isLoading: false })
});

// Store com todos os middlewares modernos
export const useUserStore = create<UserState>()(
  devtools(
    persist(
      subscribeWithSelector(
        immer(userStore)
      ),
      {
        name: 'user-storage',
        version: 1,
        // Migração para versões futuras
        migrate: (persistedState: unknown, version: number) => {
          if (version === 0) {
            // Migrar da versão 0 para 1
            return { ...persistedState, error: null };
          }
          return persistedState;
        }
      }
    ),
    { name: 'user-store' }
  )
);`,
      usage: `// Uso do store moderno
import { useUserStore } from './stores/userStore';

function UserProfile() {
  const { user, isLoading, updatePreferences } = useUserStore();
  
  // Seletor específico para evitar re-renders desnecessários
  const theme = useUserStore(state => state.user?.preferences.theme);
  
  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    updatePreferences({ theme: newTheme });
  };
  
  if (isLoading) return <div>Carregando...</div>;
  
  return (
    <div>
      <h1>{user?.name}</h1>
      <button onClick={() => handleThemeChange(theme === 'light' ? 'dark' : 'light')}>
        Tema: {theme}
      </button>
    </div>
  );
}

// Hook customizado para lógica complexa
function useUserActions() {
  const { setUser, setLoading, setError } = useUserStore();
  
  const loginUser = async (credentials: LoginCredentials) => {
    setLoading(true);
    try {
      const user = await authAPI.login(credentials);
      setUser(user);
    } catch (error) {
      setError(error.message);
    }
  };
  
  return { loginUser };
}`,
      tips: [
        'Use TypeScript para type safety completo',
        'Separe o store creator para melhor organização',
        'Use seletores específicos para otimizar performance',
        'Implemente versionamento para migrations futuras',
        'Combine com hooks customizados para lógica complexa'
      ]
    }
  ];

export default function SnippetsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const categories = ['all', ...Array.from(new Set(snippets.map(s => s.category)))];
  const difficulties = ['all', 'Básico', 'Intermediário', 'Avançado'];

  const filteredSnippets = snippets.filter(snippet => {
    const matchesSearch = 
      snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      snippet.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      snippet.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || snippet.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || snippet.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium mb-6">
            <Code className="w-4 h-4 mr-2" />
            Snippets Práticos
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Biblioteca de Código
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Snippets prontos para uso em seus projetos Next.js. Copie, cole e adapte conforme necessário.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar snippets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Filtros:</span>
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'Todas as categorias' : category}
                </option>
              ))}
            </select>
            
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
            >
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>
                  {difficulty === 'all' ? 'Todas as dificuldades' : difficulty}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-center mb-8">
          <p className="text-gray-600 dark:text-gray-400">
            {filteredSnippets.length} snippet{filteredSnippets.length !== 1 ? 's' : ''} encontrado{filteredSnippets.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Snippets Grid */}
        <div className="space-y-8">
          {filteredSnippets.map((snippet, index) => (
            <CodeSnippet key={index} {...snippet} />
          ))}
        </div>

        {/* No Results */}
        {filteredSnippets.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Nenhum snippet encontrado
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Tente ajustar os filtros ou usar termos de busca diferentes.
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <Zap className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Contribua com a comunidade!</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Tem um snippet útil? Compartilhe com outros desenvolvedores e ajude a expandir nossa biblioteca.
            </p>
            <button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              Contribuir Snippet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

SnippetsPage.displayName = 'SnippetsPage';