'use client';

import { useState } from 'react';
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import CodeBlock from '@/components/CodeBlock';
import DemoSection from '@/components/DemoSection';

// Slice para autenticação
interface AuthSlice {
  user: { id: string; name: string; email: string } | null;
  isAuthenticated: boolean;
  login: (user: AuthSlice['user']) => void;
  logout: () => void;
}

const createAuthSlice = (set: (partial: Partial<AuthSlice>, replace?: boolean, action?: string) => void): AuthSlice => ({
  user: null,
  isAuthenticated: false,
  login: (user) => set({ user, isAuthenticated: true }, false, 'auth/login'),
  logout: () => set({ user: null, isAuthenticated: false }, false, 'auth/logout'),
});

// Slice para carrinho de compras
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartSlice {
  items: CartItem[];
  total: number;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  calculateTotal: () => void;
}

const createCartSlice = (
  set: (partial: Partial<CartSlice>, replace?: boolean, action?: string) => void,
  get: () => CartSlice
): CartSlice => ({
  items: [],
  total: 0,
  addItem: (item) => {
    const items = get().items;
    const existingItem = items.find((i: CartItem) => i.id === item.id);
    
    if (existingItem) {
      set({
        items: items.map((i: CartItem) => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      }, false, 'cart/addItem');
    } else {
      set({
        items: [...items, { ...item, quantity: 1 }]
      }, false, 'cart/addItem');
    }
    
    get().calculateTotal();
  },
  removeItem: (id) => {
    set({
      items: get().items.filter((item: CartItem) => item.id !== id)
    }, false, 'cart/removeItem');
    get().calculateTotal();
  },
  updateQuantity: (id, quantity) => {
    if (quantity <= 0) {
      get().removeItem(id);
      return;
    }
    
    set({
      items: get().items.map((item: CartItem) => 
        item.id === id ? { ...item, quantity } : item
      )
    }, false, 'cart/updateQuantity');
    get().calculateTotal();
  },
  clearCart: () => {
    set({ items: [], total: 0 }, false, 'cart/clear');
  },
  calculateTotal: () => {
    const total = get().items.reduce(
      (sum: number, item: CartItem) => sum + (item.price * item.quantity), 
      0
    );
    set({ total }, false, 'cart/calculateTotal');
  },
});

// Slice para notificações
interface Notification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
  timestamp: number;
}

interface NotificationSlice {
  notifications: Notification[];
  addNotification: (message: string, type: Notification['type']) => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

const createNotificationSlice = (
  set: (partial: Partial<NotificationSlice>, replace?: boolean, action?: string) => void,
  get: () => NotificationSlice
): NotificationSlice => ({
  notifications: [],
  addNotification: (message, type) => {
    const id = Date.now().toString();
    const notification: Notification = {
      id,
      message,
      type,
      timestamp: Date.now(),
    };
    
    set({
      notifications: [...get().notifications, notification]
    }, false, 'notifications/add');
    
    // Auto-remove após 5 segundos
    setTimeout(() => {
      get().removeNotification(id);
    }, 5000);
  },
  removeNotification: (id) => {
    set({
      notifications: get().notifications.filter((n: Notification) => n.id !== id)
    }, false, 'notifications/remove');
  },
  clearAll: () => {
    set({ notifications: [] }, false, 'notifications/clearAll');
  },
});

// Store combinado usando slices - CORRIGIDO
type StoreState = AuthSlice & CartSlice & NotificationSlice;

// Criação da store corrigida
const useAppStore = create<StoreState>()(subscribeWithSelector(
  (set, get) => ({
    ...createAuthSlice(set as (partial: Partial<AuthSlice>, replace?: boolean, action?: string) => void),
    ...createCartSlice(
      set as (partial: Partial<CartSlice>, replace?: boolean, action?: string) => void,
      get as () => CartSlice
    ),
    ...createNotificationSlice(
      set as (partial: Partial<NotificationSlice>, replace?: boolean, action?: string) => void,
      get as () => NotificationSlice
    ),
  })
));

// Store separado para configurações (exemplo)
// interface SettingsState {
//   theme: 'light' | 'dark';
//   language: 'pt' | 'en' | 'es';
//   currency: 'BRL' | 'USD' | 'EUR';
//   setTheme: (theme: SettingsState['theme']) => void;
//   setLanguage: (language: SettingsState['language']) => void;
//   setCurrency: (currency: SettingsState['currency']) => void;
// }

// const useSettingsStore = create<SettingsState>((set) => ({
//   theme: 'light',
//   language: 'pt',
//   currency: 'BRL',
//   setTheme: (theme) => set({ theme }),
//   setLanguage: (language) => set({ language }),
//   setCurrency: (currency) => set({ currency }),
// }));

// Hook customizado que combina múltiplas stores (exemplo)
// function useAppData() {
//   const auth = useAppStore((state) => ({
//     user: state.user,
//     isAuthenticated: state.isAuthenticated,
//     login: state.login,
//     logout: state.logout,
//   }));
//   
//   const cart = useAppStore((state) => ({
//     items: state.items,
//     total: state.total,
//     addItem: state.addItem,
//     removeItem: state.removeItem,
//     updateQuantity: state.updateQuantity,
//     clearCart: state.clearCart,
//   }));
//   
//   const notifications = useAppStore((state) => ({
//     notifications: state.notifications,
//     addNotification: state.addNotification,
//     removeNotification: state.removeNotification,
//     clearAll: state.clearAll,
//   }));
//   
//   const settings = useSettingsStore();
//   
//   return { auth, cart, notifications, settings };
// }

// Componente de demonstração de autenticação
function AuthDemo() {
  const { user, isAuthenticated, login, logout } = useAppStore();
  const addNotification = useAppStore((state) => state.addNotification);
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleLogin = () => {
    if (formData.name && formData.email) {
      login({
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
      });
      addNotification(`Bem-vindo, ${formData.name}!`, 'success');
      setFormData({ name: '', email: '' });
    }
  };

  const handleLogout = () => {
    logout();
    addNotification('Logout realizado com sucesso', 'info');
  };

  return (
    <div className="card">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Autenticação (Auth Slice)
      </h3>
      
      {!isAuthenticated ? (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Nome"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
          <button onClick={handleLogin} className="btn-primary w-full">
            Fazer Login
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded">
            <p className="font-semibold text-green-800 dark:text-green-200">
              Logado como: {user?.name}
            </p>
            <p className="text-green-700 dark:text-green-300 text-sm">
              {user?.email}
            </p>
          </div>
          <button onClick={handleLogout} className="btn-secondary w-full">
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

// Componente de demonstração do carrinho
function CartDemo() {
  const { items, total, addItem, removeItem, updateQuantity, clearCart } = useAppStore();
  const addNotification = useAppStore((state) => state.addNotification);

  const products = [
    { id: '1', name: 'Produto A', price: 29.99 },
    { id: '2', name: 'Produto B', price: 49.99 },
    { id: '3', name: 'Produto C', price: 19.99 },
  ];

  const handleAddItem = (product: typeof products[0]) => {
    addItem(product);
    addNotification(`${product.name} adicionado ao carrinho`, 'success');
  };

  return (
    <div className="card">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Carrinho (Cart Slice)
      </h3>
      
      <div className="space-y-4">
        {/* Produtos disponíveis */}
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Produtos:</h4>
          <div className="space-y-2">
            {products.map((product) => (
              <div key={product.id} className="flex justify-between items-center p-2 border border-gray-200 dark:border-gray-700 rounded">
                <div>
                  <span className="font-medium">{product.name}</span>
                  <span className="text-gray-600 dark:text-gray-400 ml-2">
                    R$ {product.price.toFixed(2)}
                  </span>
                </div>
                <button 
                  onClick={() => handleAddItem(product)}
                  className="btn-primary text-sm"
                >
                  Adicionar
                </button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Itens no carrinho */}
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Carrinho ({items.length} itens):
          </h4>
          {items.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">
              Carrinho vazio
            </p>
          ) : (
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                  <div className="flex-1">
                    <span className="font-medium">{item.name}</span>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      R$ {item.price.toFixed(2)} x {item.quantity}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="btn-secondary text-sm px-2 py-1"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="btn-secondary text-sm px-2 py-1"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="btn-danger text-sm px-2 py-1"
                    >
                      Remover
                    </button>
                  </div>
                </div>
              ))}
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-lg">Total: R$ {total.toFixed(2)}</span>
                  <button onClick={clearCart} className="btn-danger">
                    Limpar Carrinho
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Componente de demonstração de notificações
function NotificationDemo() {
  const { notifications, addNotification, removeNotification, clearAll } = useAppStore();

  const handleAddNotification = (type: Notification['type']) => {
    const messages = {
      info: 'Esta é uma notificação informativa',
      success: 'Operação realizada com sucesso!',
      warning: 'Atenção: verifique os dados',
      error: 'Erro: algo deu errado'
    };
    
    addNotification(messages[type], type);
  };

  return (
    <div className="card">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Notificações (Notification Slice)
      </h3>
      
      <div className="space-y-4">
        {/* Botões para adicionar notificações */}
        <div className="grid grid-cols-2 gap-2">
          <button 
            onClick={() => handleAddNotification('info')}
            className="btn-secondary text-sm"
          >
            Info
          </button>
          <button 
            onClick={() => handleAddNotification('success')}
            className="btn-primary text-sm"
          >
            Sucesso
          </button>
          <button 
            onClick={() => handleAddNotification('warning')}
            className="btn-warning text-sm"
          >
            Aviso
          </button>
          <button 
            onClick={() => handleAddNotification('error')}
            className="btn-danger text-sm"
          >
            Erro
          </button>
        </div>
        
        {/* Lista de notificações */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold text-gray-900 dark:text-gray-100">
              Notificações ({notifications.length}):
            </h4>
            {notifications.length > 0 && (
              <button onClick={clearAll} className="btn-danger text-sm">
                Limpar Todas
              </button>
            )}
          </div>
          
          {notifications.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">
              Nenhuma notificação
            </p>
          ) : (
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-3 rounded border-l-4 ${
                    notification.type === 'info' ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-400' :
                    notification.type === 'success' ? 'bg-green-50 dark:bg-green-900/20 border-green-400' :
                    notification.type === 'warning' ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-400' :
                    'bg-red-50 dark:bg-red-900/20 border-red-400'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{notification.message}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {new Date(notification.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                    <button
                      onClick={() => removeNotification(notification.id)}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 ml-2"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Componente principal
export default function ZustandCompositionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Zustand - Composição de Stores
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Aprenda a compor múltiplas stores e slices para criar aplicações complexas e escaláveis
          </p>
        </div>

        {/* Demonstração Prática */}
        <DemoSection title="Demonstração Prática - App E-commerce">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <AuthDemo />
            <CartDemo />
            <NotificationDemo />
          </div>
        </DemoSection>

        {/* Implementação dos Slices */}
        <DemoSection title="Implementação dos Slices">
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <CodeBlock
                title="Auth Slice"
                language="tsx"
                code={`interface AuthSlice {
  user: { id: string; name: string; email: string } | null;
  isAuthenticated: boolean;
  login: (user: AuthSlice['user']) => void;
  logout: () => void;
}

const createAuthSlice = (set: any): AuthSlice => ({
  user: null,
  isAuthenticated: false,
  login: (user) => set({ 
    user, 
    isAuthenticated: true 
  }, false, 'auth/login'),
  logout: () => set({ 
    user: null, 
    isAuthenticated: false 
  }, false, 'auth/logout'),
});`}
              />
              
              <CodeBlock
                title="Cart Slice"
                language="tsx"
                code={`interface CartSlice {
  items: CartItem[];
  total: number;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  calculateTotal: () => void;
}

const createCartSlice = (set: any, get: any): CartSlice => ({
  items: [],
  total: 0,
  addItem: (item) => {
    const items = get().items;
    const existingItem = items.find(i => i.id === item.id);
    
    if (existingItem) {
      set({
        items: items.map(i => 
          i.id === item.id 
            ? { ...i, quantity: i.quantity + 1 } 
            : i
        )
      }, false, 'cart/addItem');
    } else {
      set({
        items: [...items, { ...item, quantity: 1 }]
      }, false, 'cart/addItem');
    }
    
    get().calculateTotal();
  },
  // ... outras ações
});`}
              />
            </div>
            
            <CodeBlock
              title="Store Combinada - CORRIGIDA"
              language="tsx"
              code={`type StoreState = AuthSlice & CartSlice & NotificationSlice;

// ✅ Sintaxe corrigida - sem violar regras dos hooks
const useAppStore = create<StoreState>()(subscribeWithSelector(
  (set, get) => ({
    ...createAuthSlice(set),
    ...createCartSlice(set, get),
    ...createNotificationSlice(set, get),
  })
));

// Hook customizado para facilitar o uso
function useAppData() {
  const auth = useAppStore((state) => ({
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    login: state.login,
    logout: state.logout,
  }));
  
  const cart = useAppStore((state) => ({
    items: state.items,
    total: state.total,
    addItem: state.addItem,
    removeItem: state.removeItem,
    updateQuantity: state.updateQuantity,
    clearCart: state.clearCart,
  }));
  
  return { auth, cart };
}`}
            />
          </div>
        </DemoSection>

        {/* Melhores Práticas */}
        <DemoSection title="Melhores Práticas de Composição">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                ✅ Boas Práticas
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Mantenha slices pequenos e focados</li>
                <li>• Use nomes consistentes para ações</li>
                <li>• Implemente ações com nomes descritivos</li>
                <li>• Separe lógica de negócio dos componentes</li>
                <li>• Use TypeScript para tipagem forte</li>
                <li>• Documente as responsabilidades de cada slice</li>
                <li>• Teste slices independentemente</li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                🔧 Dicas de Organização
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Organize slices por domínio/feature</li>
                <li>• Use prefixos nas ações (auth/, cart/)</li>
                <li>• Crie hooks customizados para facilitar uso</li>
                <li>• Considere stores separadas para contextos diferentes</li>
                <li>• Use seletores para otimizar re-renders</li>
                <li>• Implemente computed values quando necessário</li>
              </ul>
            </div>
          </div>
        </DemoSection>

        {/* Padrões Avançados */}
        <DemoSection title="Padrões Avançados">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Cross-Slice Communication
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Slices podem se comunicar através de ações que afetam múltiplas partes do estado.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <CodeBlock
                title="Comunicação entre Slices"
                language="tsx"
                code={`const createCartSlice = (set: any, get: any): CartSlice => ({
  // ... outras propriedades
  
  checkout: async () => {
    const { items, total } = get();
    const { user } = get(); // Acessa dados do AuthSlice
    
    if (!user) {
      // Dispara notificação
      get().addNotification('Faça login para continuar', 'warning');
      return;
    }
    
    try {
      await processPayment({ items, total, user });
      
      // Limpa carrinho e notifica sucesso
      set({ items: [], total: 0 });
      get().addNotification('Compra realizada com sucesso!', 'success');
    } catch (error) {
      get().addNotification('Erro no pagamento', 'error');
    }
  },
});`}
              />
            </div>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}