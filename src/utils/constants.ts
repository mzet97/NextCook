/**
 * Constantes da aplicação
 */

// URLs e Endpoints
export const API_ENDPOINTS = {
  DEMO_DATA: '/api/demo-data',
  COUNTER: '/api/counter',
  TODOS: '/api/todos',
  VALIDATE: '/api/validate',
} as const;

// Configurações de tema
export const THEME = {
  COLORS: {
    PRIMARY: {
      BLUE: '#3B82F6',
      GREEN: '#10B981',
      PURPLE: '#8B5CF6',
    },
    SECONDARY: {
      GRAY: '#6B7280',
      WHITE: '#FFFFFF',
      BLACK: '#111827',
    },
    STATUS: {
      SUCCESS: '#10B981',
      ERROR: '#EF4444',
      WARNING: '#F59E0B',
      INFO: '#3B82F6',
    },
  },
  BREAKPOINTS: {
    SM: '640px',
    MD: '768px',
    LG: '1024px',
    XL: '1280px',
    '2XL': '1536px',
  },
  FONTS: {
    SANS: 'Inter, sans-serif',
    MONO: 'JetBrains Mono, monospace',
  },
} as const;

// Configurações de animação
export const ANIMATION = {
  DURATION: {
    FAST: '150ms',
    NORMAL: '300ms',
    SLOW: '500ms',
  },
  EASING: {
    EASE_IN: 'cubic-bezier(0.4, 0, 1, 1)',
    EASE_OUT: 'cubic-bezier(0, 0, 0.2, 1)',
    EASE_IN_OUT: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;

// Configurações de localStorage
export const STORAGE_KEYS = {
  THEME: 'app-theme',
  COUNTER: 'app-counter',
  USER_PREFERENCES: 'user-preferences',
  TODOS: 'app-todos',
} as const;

// Configurações de validação
export const VALIDATION = {
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 128,
    REQUIRE_UPPERCASE: true,
    REQUIRE_LOWERCASE: true,
    REQUIRE_NUMBER: true,
    REQUIRE_SPECIAL_CHAR: true,
  },
  EMAIL: {
    MAX_LENGTH: 254,
  },
  PHONE: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 11,
  },
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 50,
  },
} as const;

// Configurações de paginação
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50, 100],
} as const;

// Configurações de debounce/throttle
export const TIMING = {
  DEBOUNCE: {
    SEARCH: 300,
    INPUT: 500,
    RESIZE: 250,
  },
  THROTTLE: {
    SCROLL: 100,
    RESIZE: 250,
  },
} as const;

// Mensagens de erro padrão
export const ERROR_MESSAGES = {
  REQUIRED: 'Este campo é obrigatório',
  INVALID_EMAIL: 'Email inválido',
  INVALID_PASSWORD: 'Senha deve ter pelo menos 8 caracteres',
  INVALID_PHONE: 'Telefone inválido',
  INVALID_CPF: 'CPF inválido',
  INVALID_CNPJ: 'CNPJ inválido',
  INVALID_CEP: 'CEP inválido',
  NETWORK_ERROR: 'Erro de conexão. Tente novamente.',
  GENERIC_ERROR: 'Ocorreu um erro inesperado',
} as const;

// Mensagens de sucesso
export const SUCCESS_MESSAGES = {
  SAVED: 'Salvo com sucesso!',
  UPDATED: 'Atualizado com sucesso!',
  DELETED: 'Excluído com sucesso!',
  COPIED: 'Copiado para a área de transferência!',
  EMAIL_SENT: 'Email enviado com sucesso!',
} as const;

// Configurações de formato
export const FORMATS = {
  DATE: {
    SHORT: 'dd/MM/yyyy',
    LONG: 'dd/MM/yyyy HH:mm',
    TIME: 'HH:mm',
  },
  CURRENCY: {
    LOCALE: 'pt-BR',
    CURRENCY: 'BRL',
  },
  NUMBER: {
    LOCALE: 'pt-BR',
  },
} as const;

// Configurações de arquivo
export const FILE = {
  MAX_SIZE: {
    IMAGE: 5 * 1024 * 1024, // 5MB
    DOCUMENT: 10 * 1024 * 1024, // 10MB
    VIDEO: 100 * 1024 * 1024, // 100MB
  },
  ALLOWED_TYPES: {
    IMAGE: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    DOCUMENT: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    VIDEO: ['video/mp4', 'video/webm', 'video/ogg'],
  },
} as const;

// Configurações de SEO
export const SEO = {
  DEFAULT_TITLE: 'NextCook - Cookbook para Desenvolvedores Next.js',
  DEFAULT_DESCRIPTION: 'Cookbook abrangente com bibliotecas e funcionalidades essenciais para desenvolvedores Next.js profissionais',
  DEFAULT_KEYWORDS: 'Next.js, React, TypeScript, Zustand, Tailwind CSS, Hooks, Cookbook, Guia',
  SITE_NAME: 'NextCook',
  TWITTER_HANDLE: '@nextcook',
} as const;

// Configurações de desenvolvimento
export const DEV = {
  LOG_LEVEL: process.env.NODE_ENV === 'development' ? 'debug' : 'error',
  ENABLE_DEVTOOLS: process.env.NODE_ENV === 'development',
  API_DELAY: process.env.NODE_ENV === 'development' ? 1000 : 0, // Simular delay em dev
} as const;

// Rotas da aplicação
export const ROUTES = {
  HOME: '/',
  NEXTJS: '/nextjs',
  NEXTJS_APP_ROUTER: '/nextjs/app-router',
  NEXTJS_RENDERING: '/nextjs/rendering',
  NEXTJS_IMAGES: '/nextjs/images',
  HOOKS: '/hooks',
  HOOKS_BASIC: '/hooks/basic',
  HOOKS_ADVANCED: '/hooks/advanced',
  HOOKS_CUSTOM: '/hooks/custom',
  ZUSTAND: '/zustand',
  ZUSTAND_BASIC: '/zustand/basic',
  ZUSTAND_MIDDLEWARE: '/zustand/middleware',
  ZUSTAND_COMPOSITION: '/zustand/composition',
  TAILWIND: '/tailwind',
  TAILWIND_UTILITIES: '/tailwind/utilities',
  TAILWIND_THEMES: '/tailwind/themes',
  TAILWIND_RESPONSIVE: '/tailwind/responsive',
  TYPESCRIPT: '/typescript',
  TYPESCRIPT_TYPES: '/typescript/types',
  TYPESCRIPT_PATTERNS: '/typescript/patterns',
} as const;

// Configurações de tecnologias demonstradas
export const TECHNOLOGIES = {
  NEXTJS: {
    name: 'Next.js',
    version: '15.5.2',
    icon: '⚡',
    description: 'Framework React para produção',
    color: '#000000',
  },
  REACT: {
    name: 'React',
    version: '18',
    icon: '⚛️',
    description: 'Biblioteca para interfaces de usuário',
    color: '#61DAFB',
  },
  TYPESCRIPT: {
    name: 'TypeScript',
    version: '5',
    icon: '📘',
    description: 'JavaScript com tipagem estática',
    color: '#3178C6',
  },
  ZUSTAND: {
    name: 'Zustand',
    version: '4',
    icon: '🐻',
    description: 'Gerenciamento de estado simples',
    color: '#FF6B6B',
  },
  TAILWIND: {
    name: 'Tailwind CSS',
    version: '3',
    icon: '🎨',
    description: 'Framework CSS utility-first',
    color: '#06B6D4',
  },
} as const;