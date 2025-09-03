import { User, Post, Todo, AppStats, DemoResponse } from '@/types';

// Dados mockados para demonstração
export const initialUsers: User[] = [
  {
    id: 1,
    name: "João Silva",
    email: "joao@example.com",
    avatar: "/avatars/joao.jpg",
    createdAt: "2024-01-15T10:00:00Z"
  },
  {
    id: 2,
    name: "Maria Santos",
    email: "maria@example.com",
    avatar: "/avatars/maria.jpg",
    createdAt: "2024-01-16T14:30:00Z"
  },
  {
    id: 3,
    name: "Pedro Costa",
    email: "pedro@example.com",
    avatar: "/avatars/pedro.jpg",
    createdAt: "2024-01-17T09:15:00Z"
  }
];

export const initialPosts: Post[] = [
  {
    id: 1,
    title: "Introdução ao Next.js 15",
    content: "Next.js 15 trouxe muitas novidades incríveis para o desenvolvimento React. Neste post, vamos explorar as principais funcionalidades como App Router, Server Components e muito mais.",
    excerpt: "Descubra as principais novidades do Next.js 15",
    authorId: 1,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
    published: true
  },
  {
    id: 2,
    title: "Gerenciamento de Estado com Zustand",
    content: "Zustand é uma biblioteca leve e poderosa para gerenciamento de estado em React. Vamos ver como usar suas funcionalidades avançadas.",
    excerpt: "Aprenda a usar Zustand para gerenciar estado",
    authorId: 2,
    createdAt: "2024-01-16T14:30:00Z",
    updatedAt: "2024-01-16T14:30:00Z",
    published: true
  },
  {
    id: 3,
    title: "Tailwind CSS: Utilitários Avançados",
    content: "Explore os recursos mais avançados do Tailwind CSS, incluindo custom themes, responsive design e muito mais.",
    excerpt: "Domine os recursos avançados do Tailwind CSS",
    authorId: 3,
    createdAt: "2024-01-17T09:15:00Z",
    updatedAt: "2024-01-17T09:15:00Z",
    published: true
  }
];

export const initialTodos: Todo[] = [
  {
    id: 1,
    text: "Estudar React Hooks",
    completed: false,
    priority: "high",
    userId: 1,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z"
  },
  {
    id: 2,
    text: "Implementar Zustand Store",
    completed: true,
    priority: "medium",
    userId: 1,
    createdAt: "2024-01-16T11:00:00Z",
    updatedAt: "2024-01-16T15:30:00Z"
  },
  {
    id: 3,
    text: "Configurar Tailwind CSS",
    completed: true,
    priority: "high",
    userId: 2,
    createdAt: "2024-01-17T08:00:00Z",
    updatedAt: "2024-01-17T10:00:00Z"
  },
  {
    id: 4,
    text: "Criar componentes reutilizáveis",
    completed: false,
    priority: "low",
    userId: 2,
    createdAt: "2024-01-18T09:00:00Z",
    updatedAt: "2024-01-18T09:00:00Z"
  }
];

export const initialStats: AppStats = {
  totalUsers: 150,
  totalPosts: 45,
  activeUsers: 23,
  totalTodos: 89,
  completedTodos: 67
};

export const mockDemoData: DemoResponse = {
  users: initialUsers,
  posts: initialPosts,
  stats: initialStats
};

// Função para simular delay de API
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Função para gerar IDs únicos
export const generateId = () => Date.now() + Math.random();

// Função para formatar datas
export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Função para calcular estatísticas em tempo real
export const calculateStats = (todos: Todo[]): Partial<AppStats> => {
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  
  return {
    totalTodos,
    completedTodos
  };
};