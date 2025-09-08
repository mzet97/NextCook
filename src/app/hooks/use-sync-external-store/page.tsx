'use client';

import { useSyncExternalStore, useState, useCallback, useEffect } from 'react';
import CodeBlock from '@/components/CodeBlock';
import DemoSection from '@/components/DemoSection';

// Store simples para demonstração
class SimpleStore {
  private listeners = new Set<() => void>();
  private data: any = { count: 0, message: 'Hello World' };

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  getSnapshot = () => {
    return this.data;
  };

  getServerSnapshot = () => {
    return this.data;
  };

  emit = () => {
    this.listeners.forEach(listener => listener());
  };

  updateCount = (newCount: number) => {
    this.data = { ...this.data, count: newCount };
    this.emit();
  };

  updateMessage = (newMessage: string) => {
    this.data = { ...this.data, message: newMessage };
    this.emit();
  };
}

const simpleStore = new SimpleStore();

// Store para tema
class ThemeStore {
  private listeners = new Set<() => void>();
  private theme: 'light' | 'dark' = 'light';

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  getSnapshot = () => {
    return this.theme;
  };

  getServerSnapshot = () => {
    return 'light'; // Default para SSR
  };

  emit = () => {
    this.listeners.forEach(listener => listener());
  };

  toggle = () => {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    this.emit();
  };

  setTheme = (theme: 'light' | 'dark') => {
    this.theme = theme;
    this.emit();
  };
}

const themeStore = new ThemeStore();

// Store para window size
class WindowSizeStore {
  private listeners = new Set<() => void>();
  private size = { width: 1024, height: 768 }; // Default values
  private serverSnapshot = { width: 1024, height: 768 };

  constructor() {
    if (typeof window !== 'undefined') {
      this.size = {
        width: window.innerWidth,
        height: window.innerHeight
      };
      
      window.addEventListener('resize', this.handleResize);
    }
  }

  private handleResize = () => {
    if (typeof window !== 'undefined') {
      this.size = {
        width: window.innerWidth,
        height: window.innerHeight
      };
      this.emit();
    }
  };

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  getSnapshot = () => {
    return this.size;
  };

  getServerSnapshot = () => {
    return this.serverSnapshot;
  };

  emit = () => {
    this.listeners.forEach(listener => listener());
  };
}

const windowSizeStore = new WindowSizeStore();

// Store para online status
class OnlineStore {
  private listeners = new Set<() => void>();
  private isOnline = true;

  constructor() {
    if (typeof window !== 'undefined') {
      this.isOnline = navigator.onLine;
      
      window.addEventListener('online', this.handleOnline);
      window.addEventListener('offline', this.handleOffline);
    }
  }

  private handleOnline = () => {
    this.isOnline = true;
    this.emit();
  };

  private handleOffline = () => {
    this.isOnline = false;
    this.emit();
  };

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  getSnapshot = () => {
    return this.isOnline;
  };

  getServerSnapshot = () => {
    return true; // Assume online no servidor
  };

  emit = () => {
    this.listeners.forEach(listener => listener());
  };
}

const onlineStore = new OnlineStore();

// Store para localStorage
class LocalStorageStore {
  private listeners = new Set<() => void>();
  private key: string;

  constructor(key: string) {
    this.key = key;
    
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', this.handleStorageChange);
    }
  }

  private handleStorageChange = (e: StorageEvent) => {
    if (e.key === this.key) {
      this.emit();
    }
  };

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  getSnapshot = () => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(this.key);
  };

  getServerSnapshot = () => {
    return null;
  };

  emit = () => {
    this.listeners.forEach(listener => listener());
  };

  setValue = (value: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.key, value);
      this.emit();
    }
  };

  removeValue = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.key);
      this.emit();
    }
  };
}

// Constantes para getServerSnapshot para evitar recriação
const getSimpleStoreServerSnapshot = () => simpleStore.getServerSnapshot();
const getThemeStoreServerSnapshot = () => themeStore.getServerSnapshot();
const getWindowSizeStoreServerSnapshot = () => windowSizeStore.getServerSnapshot();
const getOnlineStoreServerSnapshot = () => onlineStore.getServerSnapshot();

// Hooks customizados
function useSimpleStore() {
  return useSyncExternalStore(
    simpleStore.subscribe,
    simpleStore.getSnapshot,
    getSimpleStoreServerSnapshot
  );
}

function useTheme() {
  return useSyncExternalStore(
    themeStore.subscribe,
    themeStore.getSnapshot,
    getThemeStoreServerSnapshot
  );
}

function useWindowSize() {
  return useSyncExternalStore(
    windowSizeStore.subscribe,
    windowSizeStore.getSnapshot,
    getWindowSizeStoreServerSnapshot
  );
}

function useOnlineStatus() {
  return useSyncExternalStore(
    onlineStore.subscribe,
    onlineStore.getSnapshot,
    getOnlineStoreServerSnapshot
  );
}

function useLocalStorage(key: string) {
  const store = useCallback(() => new LocalStorageStore(key), [key])();
  const getServerSnapshot = useCallback(() => null, []);
  
  const value = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    getServerSnapshot
  );
  
  return [value, store.setValue, store.removeValue] as const;
}

// Demonstração do Simple Store
function SimpleStoreDemo() {
  const data = useSimpleStore();
  const [newCount, setNewCount] = useState('');
  const [newMessage, setNewMessage] = useState('');

  const handleUpdateCount = () => {
    const count = parseInt(newCount);
    if (!isNaN(count)) {
      simpleStore.updateCount(count);
      setNewCount('');
    }
  };

  const handleUpdateMessage = () => {
    if (newMessage.trim()) {
      simpleStore.updateMessage(newMessage.trim());
      setNewMessage('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
        <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Store Data</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-gray-600 dark:text-gray-400">Count:</span>
            <span className="font-mono text-lg text-blue-600 dark:text-blue-400">{data.count}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 dark:text-gray-400">Message:</span>
            <span className="font-mono text-lg text-green-600 dark:text-green-400">"{data.message}"</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg border border-blue-300 dark:border-blue-700">
          <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">Update Count</h4>
          <div className="flex gap-2">
            <input
              type="number"
              value={newCount}
              onChange={(e) => setNewCount(e.target.value)}
              placeholder="New count"
              className="flex-1 px-3 py-2 border border-blue-300 dark:border-blue-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <button
              onClick={handleUpdateCount}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Update
            </button>
          </div>
        </div>

        <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-lg border border-green-300 dark:border-green-700">
          <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3">Update Message</h4>
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="New message"
              className="flex-1 px-3 py-2 border border-green-300 dark:border-green-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <button
              onClick={handleUpdateMessage}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              Update
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg border border-yellow-300 dark:border-yellow-700">
        <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">🔄 Sincronização:</h4>
        <p className="text-yellow-700 dark:text-yellow-300 text-sm">
          Abra esta página em múltiplas abas e veja como as mudanças são sincronizadas automaticamente 
          entre todos os componentes que usam o mesmo store.
        </p>
      </div>
    </div>
  );
}

// Demonstração do Theme Store
function ThemeStoreDemo() {
  const theme = useTheme();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className={`p-8 rounded-lg border-2 transition-all duration-300 ${
          theme === 'light' 
            ? 'bg-yellow-100 border-yellow-300 text-yellow-800' 
            : 'bg-gray-800 border-gray-600 text-gray-200'
        }`}>
          <div className="text-4xl mb-4">
            {theme === 'light' ? '☀️' : '🌙'}
          </div>
          <div className="text-xl font-semibold mb-2">
            Current Theme: {theme}
          </div>
          <p className="text-sm opacity-75">
            This theme is synchronized across all components
          </p>
        </div>
      </div>

      <div className="flex gap-3 justify-center">
        <button
          onClick={() => themeStore.setTheme('light')}
          className={`px-6 py-3 rounded-lg transition-colors ${
            theme === 'light'
              ? 'bg-yellow-500 text-white'
              : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
          }`}
        >
          ☀️ Light
        </button>
        <button
          onClick={() => themeStore.setTheme('dark')}
          className={`px-6 py-3 rounded-lg transition-colors ${
            theme === 'dark'
              ? 'bg-gray-800 text-white'
              : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
          }`}
        >
          🌙 Dark
        </button>
        <button
          onClick={() => themeStore.toggle()}
          className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
        >
          🔄 Toggle
        </button>
      </div>
    </div>
  );
}

// Demonstração do Window Size
function WindowSizeDemo() {
  const windowSize = useWindowSize();

  const getBreakpoint = (width: number) => {
    if (width < 640) return 'xs';
    if (width < 768) return 'sm';
    if (width < 1024) return 'md';
    if (width < 1280) return 'lg';
    return 'xl';
  };

  const breakpoint = getBreakpoint(windowSize.width);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {windowSize.width}px
          </div>
          <div className="text-sm text-blue-700 dark:text-blue-300">Width</div>
        </div>
        <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {windowSize.height}px
          </div>
          <div className="text-sm text-green-700 dark:text-green-300">Height</div>
        </div>
        <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-center">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {breakpoint.toUpperCase()}
          </div>
          <div className="text-sm text-purple-700 dark:text-purple-300">Breakpoint</div>
        </div>
      </div>

      <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
        <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Responsive Behavior</h4>
        <div className="grid grid-cols-1 gap-2 text-sm">
          <div className={`p-2 rounded ${breakpoint === 'xs' ? 'bg-red-200 dark:bg-red-900/30' : 'bg-gray-200 dark:bg-gray-600'}`}>
            XS (&lt; 640px): {breakpoint === 'xs' ? '✅ Active' : '❌ Inactive'}
          </div>
          <div className={`p-2 rounded ${breakpoint === 'sm' ? 'bg-orange-200 dark:bg-orange-900/30' : 'bg-gray-200 dark:bg-gray-600'}`}>
            SM (640px - 767px): {breakpoint === 'sm' ? '✅ Active' : '❌ Inactive'}
          </div>
          <div className={`p-2 rounded ${breakpoint === 'md' ? 'bg-yellow-200 dark:bg-yellow-900/30' : 'bg-gray-200 dark:bg-gray-600'}`}>
            MD (768px - 1023px): {breakpoint === 'md' ? '✅ Active' : '❌ Inactive'}
          </div>
          <div className={`p-2 rounded ${breakpoint === 'lg' ? 'bg-green-200 dark:bg-green-900/30' : 'bg-gray-200 dark:bg-gray-600'}`}>
            LG (1024px - 1279px): {breakpoint === 'lg' ? '✅ Active' : '❌ Inactive'}
          </div>
          <div className={`p-2 rounded ${breakpoint === 'xl' ? 'bg-blue-200 dark:bg-blue-900/30' : 'bg-gray-200 dark:bg-gray-600'}`}>
            XL (≥ 1280px): {breakpoint === 'xl' ? '✅ Active' : '❌ Inactive'}
          </div>
        </div>
      </div>

      <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg border border-blue-300 dark:border-blue-700">
        <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">📱 Teste:</h4>
        <p className="text-blue-700 dark:text-blue-300 text-sm">
          Redimensione a janela do browser para ver como os valores são atualizados em tempo real 
          usando useSyncExternalStore.
        </p>
      </div>
    </div>
  );
}

// Demonstração do Online Status
function OnlineStatusDemo() {
  const isOnline = useOnlineStatus();
  const [currentTime, setCurrentTime] = useState('');

  // Atualizar o tempo apenas no cliente para evitar problemas de hidratação
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentTime(new Date().toLocaleTimeString());
      const interval = setInterval(() => {
        setCurrentTime(new Date().toLocaleTimeString());
      }, 1000);
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className={`p-8 rounded-lg border-2 transition-all duration-300 ${
          isOnline 
            ? 'bg-green-100 border-green-300 text-green-800 dark:bg-green-900/30 dark:border-green-700 dark:text-green-200' 
            : 'bg-red-100 border-red-300 text-red-800 dark:bg-red-900/30 dark:border-red-700 dark:text-red-200'
        }`}>
          <div className="text-6xl mb-4">
            {isOnline ? '🟢' : '🔴'}
          </div>
          <div className="text-2xl font-bold mb-2">
            {isOnline ? 'Online' : 'Offline'}
          </div>
          <p className="text-sm opacity-75">
            Connection status is automatically detected
          </p>
        </div>
      </div>

      <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
        <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Network Information</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Status:</span>
            <span className={`font-medium ${
              isOnline ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}>
              {isOnline ? 'Connected' : 'Disconnected'}
            </span>
          </div>
          {currentTime && (
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Last Check:</span>
              <span className="font-mono text-gray-800 dark:text-white">
                {currentTime}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 bg-orange-100 dark:bg-orange-900/30 rounded-lg border border-orange-300 dark:border-orange-700">
        <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">🧪 Teste:</h4>
        <p className="text-orange-700 dark:text-orange-300 text-sm">
          Para testar, desconecte sua internet ou use as ferramentas de desenvolvedor do browser 
          para simular uma conexão offline (Network tab → Offline).
        </p>
      </div>
    </div>
  );
}

// Demonstração do LocalStorage
function LocalStorageDemo() {
  const [value, setValue, removeValue] = useLocalStorage('demo-key');
  const [inputValue, setInputValue] = useState('');

  const handleSave = () => {
    if (inputValue.trim()) {
      setValue(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
        <h3 className="font-semibold text-gray-800 dark:text-white mb-3">LocalStorage Value</h3>
        <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded font-mono text-sm">
          {value ? `"${value}"` : 'null'}
        </div>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSave()}
          placeholder="Enter a value to save"
          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        <button
          onClick={handleSave}
          disabled={!inputValue.trim()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Save
        </button>
        <button
          onClick={removeValue}
          disabled={!value}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Remove
        </button>
      </div>

      <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-lg border border-purple-300 dark:border-purple-700">
        <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">🔄 Sincronização:</h4>
        <p className="text-purple-700 dark:text-purple-300 text-sm">
          Abra esta página em múltiplas abas e modifique o valor. Todas as abas serão automaticamente 
          sincronizadas quando o localStorage for alterado.
        </p>
      </div>
    </div>
  );
}

export default function UseSyncExternalStorePage() {
  const basicCode = `// Store básico
class SimpleStore {
  private listeners = new Set<() => void>();
  private data = { count: 0 };

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  getSnapshot = () => {
    return this.data;
  };

  getServerSnapshot = () => {
    return this.data; // Para SSR
  };

  updateCount = (newCount: number) => {
    this.data = { ...this.data, count: newCount };
    this.listeners.forEach(listener => listener());
  };
}

const store = new SimpleStore();

// Hook customizado
function useStore() {
  return useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot
  );
}

// Uso
function Component() {
  const data = useStore();
  
  return (
    <div>
      <p>Count: {data.count}</p>
      <button onClick={() => store.updateCount(data.count + 1)}>
        Increment
      </button>
    </div>
  );
}`;

  const windowSizeCode = `// Window size store
class WindowSizeStore {
  private listeners = new Set<() => void>();
  private size = { width: 0, height: 0 };

  constructor() {
    if (typeof window !== 'undefined') {
      this.size = {
        width: window.innerWidth,
        height: window.innerHeight
      };
      
      window.addEventListener('resize', this.handleResize);
    }
  }

  private handleResize = () => {
    this.size = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    this.emit();
  };

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  getSnapshot = () => this.size;
  getServerSnapshot = () => ({ width: 1024, height: 768 });

  emit = () => {
    this.listeners.forEach(listener => listener());
  };
}

const windowSizeStore = new WindowSizeStore();

function useWindowSize() {
  return useSyncExternalStore(
    windowSizeStore.subscribe,
    windowSizeStore.getSnapshot,
    windowSizeStore.getServerSnapshot
  );
}`;

  const localStorageCode = `// LocalStorage store
class LocalStorageStore {
  private listeners = new Set<() => void>();
  private key: string;

  constructor(key: string) {
    this.key = key;
    
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', this.handleStorageChange);
    }
  }

  private handleStorageChange = (e: StorageEvent) => {
    if (e.key === this.key) {
      this.emit();
    }
  };

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  getSnapshot = () => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(this.key);
  };

  getServerSnapshot = () => null;

  emit = () => {
    this.listeners.forEach(listener => listener());
  };

  setValue = (value: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.key, value);
      this.emit();
    }
  };
}

function useLocalStorage(key: string) {
  const store = new LocalStorageStore(key);
  
  const value = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot
  );
  
  return [value, store.setValue] as const;
}`;

  const onlineCode = `// Online status store
class OnlineStore {
  private listeners = new Set<() => void>();
  private isOnline = true;

  constructor() {
    if (typeof window !== 'undefined') {
      this.isOnline = navigator.onLine;
      
      window.addEventListener('online', this.handleOnline);
      window.addEventListener('offline', this.handleOffline);
    }
  }

  private handleOnline = () => {
    this.isOnline = true;
    this.emit();
  };

  private handleOffline = () => {
    this.isOnline = false;
    this.emit();
  };

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  getSnapshot = () => this.isOnline;
  getServerSnapshot = () => true;

  emit = () => {
    this.listeners.forEach(listener => listener());
  };
}

const onlineStore = new OnlineStore();

function useOnlineStatus() {
  return useSyncExternalStore(
    onlineStore.subscribe,
    onlineStore.getSnapshot,
    onlineStore.getServerSnapshot
  );
}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-6">
            useSyncExternalStore
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Demonstração do useSyncExternalStore Hook - sincronize com stores externos de forma segura e eficiente.
          </p>
        </div>

        <div className="space-y-12">
          <DemoSection title="Simple Store">
            <SimpleStoreDemo />
          </DemoSection>

          <DemoSection title="Theme Store">
            <ThemeStoreDemo />
          </DemoSection>

          <DemoSection title="Window Size">
            <WindowSizeDemo />
          </DemoSection>

          <DemoSection title="Online Status">
            <OnlineStatusDemo />
          </DemoSection>

          <DemoSection title="LocalStorage Sync">
            <LocalStorageDemo />
          </DemoSection>
        </div>

        <div className="mt-16 space-y-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Store Básico</h2>
            <CodeBlock code={basicCode} language="tsx" />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Window Size</h2>
            <CodeBlock code={windowSizeCode} language="tsx" />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">LocalStorage</h2>
            <CodeBlock code={localStorageCode} language="tsx" />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Online Status</h2>
            <CodeBlock code={onlineCode} language="tsx" />
          </div>
        </div>

        <div className="mt-16 bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">🔄 useSyncExternalStore</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Casos de Uso</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Integração com stores externos</li>
                <li>• APIs do browser (localStorage, etc.)</li>
                <li>• Bibliotecas de estado globais</li>
                <li>• Sincronização entre abas</li>
                <li>• Dados em tempo real</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Benefícios</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Seguro para Concurrent Features</li>
                <li>• Suporte a SSR/SSG</li>
                <li>• Performance otimizada</li>
                <li>• Tearing prevention</li>
                <li>• Compatibilidade com React 18+</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}