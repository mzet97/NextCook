'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import CodeBlock from '@/components/CodeBlock';
import DemoSection from '@/components/DemoSection';

// Definindo tipos para o contexto
interface User {
  id: number;
  name: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoggedIn: boolean;
}

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

// Criando contextos
const UserContext = createContext<UserContextType | undefined>(undefined);
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Hook personalizado para usar o UserContext
function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

// Hook personalizado para usar o ThemeContext
function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Provider do usuário
function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  
  const value = {
    user,
    setUser,
    isLoggedIn: user !== null
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

// Provider do tema
function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const value = {
    theme,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      <div className={theme === 'dark' ? 'dark' : ''}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

// Componente de login
function LoginForm() {
  const { setUser, isLoggedIn } = useUser();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleLogin = () => {
    if (name && email) {
      setUser({
        id: Date.now(),
        name,
        email
      });
      setName('');
      setEmail('');
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (isLoggedIn) {
    return (
      <div className="space-y-4">
        <p className="text-green-600 dark:text-green-400">Usuário logado com sucesso!</p>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nome"
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
      />
      <button
        onClick={handleLogin}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Login
      </button>
    </div>
  );
}

// Componente de perfil do usuário
function UserProfile() {
  const { user, isLoggedIn } = useUser();

  if (!isLoggedIn || !user) {
    return (
      <div className="text-center p-8 bg-gray-100 dark:bg-gray-700 rounded-lg">
        <p className="text-gray-500 dark:text-gray-400">Nenhum usuário logado</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-blue-100 dark:bg-blue-900 rounded-lg">
      <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
        Perfil do Usuário
      </h3>
      <p className="text-blue-700 dark:text-blue-300">ID: {user.id}</p>
      <p className="text-blue-700 dark:text-blue-300">Nome: {user.name}</p>
      <p className="text-blue-700 dark:text-blue-300">Email: {user.email}</p>
    </div>
  );
}

// Componente de controle de tema
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="text-center space-y-4">
      <p className="text-gray-600 dark:text-gray-300">
        Tema atual: <span className="font-semibold">{theme}</span>
      </p>
      <button
        onClick={toggleTheme}
        className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
      >
        Alternar Tema
      </button>
    </div>
  );
}

// Componente principal com providers
function ContextDemo() {
  return (
    <UserProvider>
      <ThemeProvider>
        <div className="bg-white dark:bg-gray-800 transition-colors duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-1.5 mb-12">
            <DemoSection title="Gerenciamento de Usuário">
              <LoginForm />
            </DemoSection>

            <DemoSection title="Perfil do Usuário">
              <UserProfile />
            </DemoSection>
          </div>

          <div className="mb-12">
            <DemoSection title="Controle de Tema">
              <ThemeToggle />
            </DemoSection>
          </div>
        </div>
      </ThemeProvider>
    </UserProvider>
  );
}

export default function UseContextPage() {
  const codeExample = `import { createContext, useContext, useState } from 'react';

// 1. Criar o contexto
const UserContext = createContext();

// 2. Criar o Provider
function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// 3. Hook personalizado
function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}

// 4. Usar o contexto
function Profile() {
  const { user, setUser } = useUser();
  
  return (
    <div>
      {user ? (
        <p>Olá, {user.name}!</p>
      ) : (
        <button onClick={() => setUser({ name: 'João' })}>
          Login
        </button>
      )}
    </div>
  );
}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            useContext Hook
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Hook para consumir valores de contexto React, permitindo compartilhar dados entre componentes sem prop drilling.
          </p>
        </div>

        <ContextDemo />

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Exemplo de Código</h2>
          <CodeBlock code={codeExample} language="tsx" />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Padrões do useContext</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Vantagens</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Evita prop drilling</li>
                <li>• Compartilhamento global de estado</li>
                <li>• Tipagem TypeScript forte</li>
                <li>• Hooks personalizados para validação</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Melhores Práticas</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Criar hooks personalizados</li>
                <li>• Validar se está dentro do Provider</li>
                <li>• Separar contextos por responsabilidade</li>
                <li>• Usar TypeScript para tipagem</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}