// Types para demonstração (não há banco de dados real)

export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  createdAt: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  published: boolean;
}

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: number;
  content: string;
  postId: number;
  authorId: number;
  createdAt: string;
}

export interface Counter {
  id: string;
  value: number;
  lastUpdated: string;
}

export interface AppStats {
  totalUsers: number;
  totalPosts: number;
  activeUsers: number;
  totalTodos: number;
  completedTodos: number;
}

// Zustand Store Types
export interface CounterStore {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

export interface TodoStore {
  todos: Todo[];
  addTodo: (text: string, priority: Todo['priority']) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  updateTodo: (id: number, updates: Partial<Todo>) => void;
}

export interface ThemeStore {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  updateUser: (updates: Partial<User>) => void;
}

// Navigation Types
export interface NavItem {
  name: string;
  href: string;
  icon?: string;
  description?: string;
  children?: NavItem[];
}

export interface MegaMenuCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  items: NavItem[];
}

export interface MegaMenuSection {
  title: string;
  categories: MegaMenuCategory[];
}

// Demo Data Types
export interface DemoResponse {
  users: User[];
  posts: Post[];
  stats: AppStats;
}

// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ValidationResponse {
  valid: boolean;
  errors: string[];
}

export interface CounterResponse {
  count: number;
  timestamp: string;
}

// Hook Types
export interface UseLocalStorageReturn<T> {
  value: T;
  setValue: (value: T | ((prev: T) => T)) => void;
  removeValue: () => void;
}

export interface UseFetchReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

// Component Props Types
export interface CodeBlockProps {
  code?: string;
  language: string;
  title?: string;
  showLineNumbers?: boolean;
}

export interface DemoCardProps {
  title: string;
  description: string;
  icon: string;
  href: string;
  color: string;
}

export interface StatsCardProps {
  title: string;
  value: number | string;
  icon: string;
  color: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}