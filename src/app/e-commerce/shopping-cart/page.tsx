'use client';

import { useState } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, Package, Zap, Shield, Users, CheckCircle, AlertTriangle, Code } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import DemoCardStatic from '@/components/DemoCardStatic';

const bestPractices = [
  {
    title: 'Performance',
    description: 'Otimizações de performance',
    icon: <Zap className="w-5 h-5 text-blue-600" />,
    practices: [
      'Use localStorage para persistência',
      'Implemente debounce para atualizações',
      'Otimize re-renders com useMemo',
      'Lazy load componentes pesados'
    ]
  },
  {
    title: 'UX/UI',
    description: 'Experiência do usuário',
    icon: <Users className="w-5 h-5 text-green-600" />,
    practices: [
      'Feedback visual imediato',
      'Estados de loading claros',
      'Validação em tempo real',
      'Acessibilidade completa'
    ]
  },
  {
    title: 'Segurança',
    description: 'Práticas de segurança',
    icon: <Shield className="w-5 h-5 text-red-600" />,
    practices: [
      'Validação no frontend e backend',
      'Sanitização de dados',
      'Rate limiting para APIs',
      'Criptografia de dados sensíveis'
    ]
  },
  {
    title: 'Manutenibilidade',
    description: 'Código sustentável',
    icon: <Code className="w-5 h-5 text-purple-600" />,
    practices: [
      'Separação de responsabilidades',
      'Testes unitários e integração',
      'Documentação clara',
      'Padrões de código consistentes'
    ]
  }
];

const cartFeatures = [
  {
    title: 'Estado Persistente',
    description: 'Carrinho mantém itens entre sessões',
    icon: <Package className="w-5 h-5" />,
    benefits: ['LocalStorage', 'Session Recovery', 'Cross-device', 'Auto-save']
  },
  {
    title: 'Gestão Inteligente',
    description: 'Lógica avançada de carrinho',
    icon: <Zap className="w-5 h-5" />,
    benefits: ['Quantity Control', 'Price Calculation', 'Discounts', 'Validation']
  },
  {
    title: 'UX Otimizada',
    description: 'Interface intuitiva e responsiva',
    icon: <Users className="w-5 h-5" />,
    benefits: ['Mobile First', 'Quick Actions', 'Visual Feedback', 'Accessibility']
  },
  {
    title: 'Integração Segura',
    description: 'Conecta com sistemas de pagamento',
    icon: <Shield className="w-5 h-5" />,
    benefits: ['Stripe Ready', 'PayPal Support', 'Secure Data', 'API Integration']
  }
];

const codeExamples = [
  {
    title: 'Hook useShoppingCart',
    description: 'Hook customizado para gerenciar estado do carrinho',
    code: `// hooks/useShoppingCart.ts
import { useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  variant?: string;
  maxQuantity?: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  itemCount: number;
}

const CART_STORAGE_KEY = 'shopping-cart';
const TAX_RATE = 0.1; // 10%
const FREE_SHIPPING_THRESHOLD = 100;
const SHIPPING_COST = 15;

export function useShoppingCart() {
  const [cart, setCart] = useState<Cart>({
    items: [],
    total: 0,
    subtotal: 0,
    tax: 0,
    shipping: 0,
    discount: 0,
    itemCount: 0
  });

  // Carregar do localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(calculateCartTotals(parsedCart.items, parsedCart.discount));
      } catch (error) {
        console.error('Erro ao carregar carrinho:', error);
      }
    }
  }, []);

  // Salvar no localStorage
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const calculateCartTotals = (items: CartItem[], discount: number = 0): Cart => {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    
    // Calcular frete
    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    
    // Calcular impostos
    const tax = subtotal * TAX_RATE;
    
    // Total final
    const total = subtotal + tax + shipping - discount;
    
    return {
      items,
      subtotal,
      tax,
      shipping,
      discount,
      total: Math.max(0, total),
      itemCount
    };
  };

  const addItem = (product: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
    setCart(currentCart => {
      const existingItem = currentCart.items.find(item => 
        item.id === product.id && item.variant === product.variant
      );

      let newItems: CartItem[];
      
      if (existingItem) {
        // Verificar limite máximo
        const newQuantity = existingItem.quantity + quantity;
        const maxQty = product.maxQuantity || 99;
        
        if (newQuantity > maxQty) {
          throw new Error(\`Quantidade máxima é \${maxQty}\`);
        }

        newItems = currentCart.items.map(item =>
          item.id === product.id && item.variant === product.variant
            ? { ...item, quantity: newQuantity }
            : item
        );
      } else {
        newItems = [...currentCart.items, { ...product, quantity }];
      }

      return calculateCartTotals(newItems, currentCart.discount);
    });
  };

  const removeItem = (id: string, variant?: string) => {
    setCart(currentCart => {
      const newItems = currentCart.items.filter(item => 
        !(item.id === id && item.variant === variant)
      );
      return calculateCartTotals(newItems, currentCart.discount);
    });
  };

  const updateQuantity = (id: string, quantity: number, variant?: string) => {
    if (quantity <= 0) {
      removeItem(id, variant);
      return;
    }

    setCart(currentCart => {
      const newItems = currentCart.items.map(item => {
        if (item.id === id && item.variant === variant) {
          const maxQty = item.maxQuantity || 99;
          return { ...item, quantity: Math.min(quantity, maxQty) };
        }
        return item;
      });
      return calculateCartTotals(newItems, currentCart.discount);
    });
  };

  const clearCart = () => {
    setCart({
      items: [],
      total: 0,
      subtotal: 0,
      tax: 0,
      shipping: 0,
      discount: 0,
      itemCount: 0
    });
  };

  const applyDiscount = (discountAmount: number) => {
    setCart(currentCart => 
      calculateCartTotals(currentCart.items, discountAmount)
    );
  };

  const getItemQuantity = (id: string, variant?: string): number => {
    const item = cart.items.find(item => 
      item.id === id && item.variant === variant
    );
    return item?.quantity || 0;
  };

  return {
    cart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    applyDiscount,
    getItemQuantity,
    isEmpty: cart.items.length === 0,
    hasItems: cart.items.length > 0
  };
}`,
    language: 'typescript'
   },
   {
     title: 'Cart Provider Context',
     description: 'Context Provider para compartilhar estado do carrinho',
     code: `// contexts/CartContext.tsx
import { createContext, useContext, ReactNode } from 'react';
import { useShoppingCart, Cart, CartItem } from '../hooks/useShoppingCart';

interface CartContextType {
  cart: Cart;
  addItem: (product: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (id: string, variant?: string) => void;
  updateQuantity: (id: string, quantity: number, variant?: string) => void;
  clearCart: () => void;
  applyDiscount: (amount: number) => void;
  getItemQuantity: (id: string, variant?: string) => number;
  isEmpty: boolean;
  hasItems: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const cart = useShoppingCart();

  return (
    <CartContext.Provider value={cart}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}`,
     language: 'typescript'
   },
   {
     title: 'Cart Components',
     description: 'Componentes de interface para o carrinho',
     code: `// components/cart/CartItem.tsx
import { useState } from 'react';
import { Plus, Minus, Trash2, AlertTriangle } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { CartItem as CartItemType } from '@/hooks/useShoppingCart';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleQuantityChange = async (newQuantity: number) => {
    setIsUpdating(true);
    setError(null);
    
    try {
      updateQuantity(item.id, newQuantity, item.variant);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemove = () => {
    removeItem(item.id, item.variant);
  };

  return (
    <div className="flex items-center space-x-4 py-4 border-b border-gray-200">
      {/* Product Image */}
      <div className="flex-shrink-0">
        <img
          src={item.image || '/placeholder-product.jpg'}
          alt={item.name}
          className="w-16 h-16 object-cover rounded-lg"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-gray-900 truncate">
          {item.name}
        </h3>
        {item.variant && (
          <p className="text-sm text-gray-500">{item.variant}</p>
        )}
        <p className="text-sm font-medium text-gray-900">
          R$ {item.price.toFixed(2)}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          disabled={isUpdating || item.quantity <= 1}
          className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          <Minus className="w-4 h-4" />
        </button>
        
        <span className="font-medium min-w-[2rem] text-center">
          {item.quantity}
        </span>
        
        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          disabled={isUpdating || item.quantity >= (item.maxQuantity || 99)}
          className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Total Price */}
      <div className="text-right">
        <p className="text-sm font-medium text-gray-900">
          R$ {(item.price * item.quantity).toFixed(2)}
        </p>
      </div>

      {/* Remove Button */}
      <button
        onClick={handleRemove}
        className="p-2 text-red-600 hover:text-red-800"
        title="Remover item"
      >
        <Trash2 className="w-4 h-4" />
      </button>

      {/* Error Message */}
      {error && (
        <div className="absolute mt-16 flex items-center text-red-600 text-xs">
          <AlertTriangle className="w-3 h-3 mr-1" />
          {error}
        </div>
      )}
    </div>
  );
}

// components/cart/CartSummary.tsx
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart, Truck } from 'lucide-react';

export function CartSummary() {
  const { cart } = useCart();

  if (cart.isEmpty) {
    return (
      <div className="text-center py-8">
        <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Seu carrinho está vazio
        </h3>
        <p className="text-gray-500">
          Adicione alguns produtos para começar suas compras
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Resumo do Pedido
      </h3>
      
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal ({cart.itemCount} itens)</span>
          <span className="font-medium">R$ {cart.subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Impostos</span>
          <span className="font-medium">R$ {cart.tax.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <div className="flex items-center text-gray-600">
            <Truck className="w-4 h-4 mr-1" />
            <span>Frete</span>
          </div>
          <span className="font-medium">
            {cart.shipping === 0 ? 'Grátis' : 'R$ ' + cart.shipping.toFixed(2)}
          </span>
        </div>
        
        {cart.discount > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Desconto</span>
            <span className="font-medium">-R$ {cart.discount.toFixed(2)}</span>
          </div>
        )}
        
        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between text-lg font-medium">
            <span className="text-gray-900">Total</span>
            <span className="text-gray-900">R$ {cart.total.toFixed(2)}</span>
          </div>
        </div>
        
        {cart.subtotal < 100 && (
          <div className="text-xs text-gray-500 text-center">
            Frete grátis para compras acima de R$ 100,00
          </div>
        )}
      </div>
      
      <button className="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
        Finalizar Compra
      </button>
    </div>
  );
}`,
     language: 'typescript'
   }
 ];

export default function ShoppingCartPage() {
  const [selectedExample, setSelectedExample] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs />
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-6">
            <ShoppingCart className="w-8 h-8 text-orange-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Shopping Cart
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Implemente um carrinho de compras robusto com estado persistente, cálculos automáticos e integração com sistemas de pagamento.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-lg p-1 shadow-sm border">
            {[
              { id: 'overview', label: 'Visão Geral' },
              { id: 'examples', label: 'Exemplos' },
              { id: 'practices', label: 'Boas Práticas' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-orange-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'overview' && (
          <>
            {/* Features Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {cartFeatures.map((feature, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-orange-50 rounded-lg mr-3">
                      {feature.icon}
                    </div>
                    <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{feature.description}</p>
                  <ul className="space-y-1">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center text-sm text-gray-500">
                        <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Cart Flow */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Fluxo do Carrinho</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {[
                  { step: '1', title: 'Adicionar Item', desc: 'Produto vai para o carrinho' },
                  { step: '2', title: 'Gerenciar Quantidade', desc: 'Ajustar quantidades' },
                  { step: '3', title: 'Calcular Totais', desc: 'Impostos, frete, descontos' },
                  { step: '4', title: 'Persistir Estado', desc: 'Salvar no localStorage' },
                  { step: '5', title: 'Checkout', desc: 'Finalizar compra' }
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-3">
                      <span className="text-orange-600 font-semibold">{item.step}</span>
                    </div>
                    <h3 className="text-sm font-medium text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'examples' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Exemplos Práticos</h2>
              <p className="text-gray-600">Implementações completas de carrinho de compras</p>
            </div>
            
            <div className="flex border-b border-gray-100 overflow-x-auto">
              {codeExamples.map((example, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedExample(index)}
                  className={`flex-shrink-0 p-4 text-left transition-colors min-w-[200px] ${
                    selectedExample === index
                      ? 'bg-orange-50 border-b-2 border-orange-600 text-orange-700'
                      : 'hover:bg-gray-50 text-gray-600'
                  }`}
                >
                  <div className="font-medium">{example.title}</div>
                  <div className="text-sm opacity-75">{example.description}</div>
                </button>
              ))}
            </div>
            
            <div className="p-6">
              <DemoCardStatic
                title={codeExamples[selectedExample].title}
                description={codeExamples[selectedExample].description}
                code={codeExamples[selectedExample].code}
                language={codeExamples[selectedExample].language}
              />
            </div>
          </div>
        )}

        {activeTab === 'practices' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {bestPractices.map((practice, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  {practice.icon}
                  <h3 className="text-lg font-semibold text-gray-900 ml-3">{practice.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{practice.description}</p>
                <ul className="space-y-2">
                  {practice.practices.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Implementation Guide */}
        <div className="mt-12 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Implemente seu carrinho hoje</h2>
            <p className="text-orange-100 mb-6">
              Crie uma experiência de compra excepcional com nosso sistema completo de carrinho de compras.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center px-6 py-3 bg-white text-orange-600 rounded-lg font-medium hover:bg-orange-50 transition-colors">
                <Code className="w-5 h-5 mr-2" />
                Ver Código Completo
              </button>
              <button className="inline-flex items-center px-6 py-3 bg-orange-700 text-white rounded-lg font-medium hover:bg-orange-800 transition-colors">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Demo Interativo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}