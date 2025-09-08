'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, CreditCard, Webhook, Shield, Users, BarChart3, Settings, Zap, ArrowRight, CheckCircle, Star } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import DemoCardStatic from '@/components/DemoCardStatic';

const ecommerceTopics = [
  {
    title: 'Stripe Integration',
    description: 'Integração completa com Stripe para pagamentos',
    href: '/e-commerce/stripe',
    icon: <CreditCard className="w-6 h-6" />,
    level: 'Intermediário',
    topics: ['Payment Intents', 'Webhooks', 'Subscriptions', 'Connect']
  },
  {
    title: 'Shopping Cart',
    description: 'Carrinho de compras com estado persistente',
    href: '/e-commerce/shopping-cart',
    icon: <ShoppingCart className="w-6 h-6" />,
    level: 'Básico',
    topics: ['State Management', 'LocalStorage', 'Cart Logic', 'Persistence']
  },
  {
    title: 'Checkout Flow',
    description: 'Fluxo completo de checkout e finalização',
    href: '/e-commerce/checkout',
    icon: <Zap className="w-6 h-6" />,
    level: 'Intermediário',
    topics: ['Multi-step', 'Validation', 'Payment', 'Confirmation']
  },
  {
    title: 'PayPal Integration',
    description: 'Integração com PayPal e métodos alternativos',
    href: '/e-commerce/paypal',
    icon: <CreditCard className="w-6 h-6" />,
    level: 'Intermediário',
    topics: ['PayPal SDK', 'Express Checkout', 'Subscriptions', 'Webhooks']
  },
  {
    title: 'Subscription Management',
    description: 'Gerenciamento de assinaturas e pagamentos recorrentes',
    href: '/e-commerce/subscriptions',
    icon: <Users className="w-6 h-6" />,
    level: 'Avançado',
    topics: ['Billing Cycles', 'Upgrades', 'Cancellations', 'Prorations']
  },
  {
    title: 'Webhook Handling',
    description: 'Processamento seguro de webhooks de pagamento',
    href: '/e-commerce/webhooks',
    icon: <Webhook className="w-6 h-6" />,
    level: 'Avançado',
    topics: ['Signature Verification', 'Event Processing', 'Idempotency', 'Error Handling']
  },
  {
    title: 'Payment Security',
    description: 'Segurança em pagamentos e compliance PCI',
    href: '/e-commerce/security',
    icon: <Shield className="w-6 h-6" />,
    level: 'Avançado',
    topics: ['PCI Compliance', 'Tokenization', 'Fraud Detection', 'SSL/TLS']
  },
  {
    title: 'Analytics & Reports',
    description: 'Análise de vendas e relatórios financeiros',
    href: '/e-commerce/analytics',
    icon: <BarChart3 className="w-6 h-6" />,
    level: 'Intermediário',
    topics: ['Sales Analytics', 'Revenue Tracking', 'Customer Insights', 'Reports']
  },
  {
    title: 'Admin Dashboard',
    description: 'Painel administrativo para gestão de vendas',
    href: '/e-commerce/admin',
    icon: <Settings className="w-6 h-6" />,
    level: 'Avançado',
    topics: ['Order Management', 'Product Catalog', 'Customer Management', 'Settings']
  }
];

const quickExamples = [
  {
    title: 'Stripe Payment Intent',
    description: 'Criando um pagamento básico com Stripe',
    code: `// pages/api/create-payment-intent.ts
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { amount, currency = 'brl' } = req.body;

      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100, // Stripe usa centavos
        currency,
        metadata: {
          orderId: 'order_123',
          customerId: 'customer_456'
        }
      });

      res.status(200).json({
        clientSecret: paymentIntent.client_secret
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}

// components/CheckoutForm.tsx
import { useState } from 'react';
import {
  useStripe,
  useElements,
  CardElement,
  Elements
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function CheckoutForm({ amount }: { amount: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    try {
      // Criar Payment Intent
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount })
      });

      const { clientSecret } = await response.json();

      // Confirmar pagamento
      const { error: stripeError } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement)!,
            billing_details: {
              name: 'Cliente Teste'
            }
          }
        }
      );

      if (stripeError) {
        setError(stripeError.message || 'Erro no pagamento');
      } else {
        // Pagamento bem-sucedido
        alert('Pagamento realizado com sucesso!');
      }
    } catch (err) {
      setError('Erro ao processar pagamento');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
            },
          }}
        />
      </div>
      
      {error && (
        <div className="text-red-600 text-sm mb-4">{error}</div>
      )}
      
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50"
      >
        {loading ? 'Processando...' : \`Pagar R$ \${amount}\`}
      </button>
    </form>
  );
}

export default function PaymentPage() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm amount={99.90} />
    </Elements>
  );
}`,
    language: 'typescript'
  },
  {
    title: 'Shopping Cart Hook',
    description: 'Hook customizado para gerenciar carrinho de compras',
    code: `// hooks/useShoppingCart.ts
import { useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  variant?: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

const CART_STORAGE_KEY = 'shopping-cart';

export function useShoppingCart() {
  const [cart, setCart] = useState<Cart>({
    items: [],
    total: 0,
    itemCount: 0
  });

  // Carregar carrinho do localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(calculateCartTotals(parsedCart.items));
      } catch (error) {
        console.error('Erro ao carregar carrinho:', error);
      }
    }
  }, []);

  // Salvar carrinho no localStorage
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const calculateCartTotals = (items: CartItem[]): Cart => {
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    
    return { items, total, itemCount };
  };

  const addItem = (product: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
    setCart(currentCart => {
      const existingItem = currentCart.items.find(item => 
        item.id === product.id && item.variant === product.variant
      );

      let newItems: CartItem[];
      
      if (existingItem) {
        // Atualizar quantidade do item existente
        newItems = currentCart.items.map(item =>
          item.id === product.id && item.variant === product.variant
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Adicionar novo item
        newItems = [...currentCart.items, { ...product, quantity }];
      }

      return calculateCartTotals(newItems);
    });
  };

  const removeItem = (id: string, variant?: string) => {
    setCart(currentCart => {
      const newItems = currentCart.items.filter(item => 
        !(item.id === id && item.variant === variant)
      );
      return calculateCartTotals(newItems);
    });
  };

  const updateQuantity = (id: string, quantity: number, variant?: string) => {
    if (quantity <= 0) {
      removeItem(id, variant);
      return;
    }

    setCart(currentCart => {
      const newItems = currentCart.items.map(item =>
        item.id === id && item.variant === variant
          ? { ...item, quantity }
          : item
      );
      return calculateCartTotals(newItems);
    });
  };

  const clearCart = () => {
    setCart({ items: [], total: 0, itemCount: 0 });
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
    getItemQuantity
  };
}

// components/CartProvider.tsx
import { createContext, useContext, ReactNode } from 'react';
import { useShoppingCart, Cart, CartItem } from '../hooks/useShoppingCart';

interface CartContextType {
  cart: Cart;
  addItem: (product: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (id: string, variant?: string) => void;
  updateQuantity: (id: string, quantity: number, variant?: string) => void;
  clearCart: () => void;
  getItemQuantity: (id: string, variant?: string) => number;
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
}

// components/AddToCartButton.tsx
import { useState } from 'react';
import { useCart } from './CartProvider';
import { ShoppingCart, Plus, Minus } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
  variant?: string;
}

interface AddToCartButtonProps {
  product: Product;
  className?: string;
}

export function AddToCartButton({ product, className = '' }: AddToCartButtonProps) {
  const { addItem, getItemQuantity, updateQuantity } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  
  const quantity = getItemQuantity(product.id, product.variant);

  const handleAddToCart = async () => {
    setIsAdding(true);
    
    try {
      addItem(product, 1);
      
      // Feedback visual
      setTimeout(() => setIsAdding(false), 500);
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
      setIsAdding(false);
    }
  };

  if (quantity > 0) {
    return (
      <div className={\`flex items-center space-x-2 \${className}\`}>
        <button
          onClick={() => updateQuantity(product.id, quantity - 1, product.variant)}
          className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
        >
          <Minus className="w-4 h-4" />
        </button>
        
        <span className="font-medium min-w-[2rem] text-center">{quantity}</span>
        
        <button
          onClick={() => updateQuantity(product.id, quantity + 1, product.variant)}
          className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding}
      className={\`flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 \${className}\`}
    >
      <ShoppingCart className="w-4 h-4" />
      <span>{isAdding ? 'Adicionando...' : 'Adicionar ao Carrinho'}</span>
    </button>
  );
}`,
    language: 'typescript'
  }
];

const features = [
  {
    title: 'Pagamentos Seguros',
    description: 'Integração com Stripe e PayPal para pagamentos seguros',
    icon: <Shield className="w-8 h-8 text-green-600" />
  },
  {
    title: 'Carrinho Persistente',
    description: 'Carrinho que mantém itens entre sessões',
    icon: <ShoppingCart className="w-8 h-8 text-blue-600" />
  },
  {
    title: 'Checkout Otimizado',
    description: 'Fluxo de checkout rápido e intuitivo',
    icon: <Zap className="w-8 h-8 text-yellow-600" />
  },
  {
    title: 'Webhooks Confiáveis',
    description: 'Processamento seguro de eventos de pagamento',
    icon: <Webhook className="w-8 h-8 text-purple-600" />
  }
];

export default function EcommercePage() {
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedExample, setSelectedExample] = useState(0);

  const filteredTopics = selectedLevel === 'all' 
    ? ecommerceTopics 
    : ecommerceTopics.filter(topic => topic.level === selectedLevel);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs />
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-6">
            <ShoppingCart className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            E-commerce & Payments
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Construa lojas online completas com integração de pagamentos, carrinho de compras, checkout otimizado e gestão de assinaturas.
          </p>
        </div>

        {/* Features Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1.5 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Level Filter */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-lg p-1 shadow-sm border">
            {['all', 'Básico', 'Intermediário', 'Avançado'].map((level) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedLevel === level
                    ? 'bg-emerald-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {level === 'all' ? 'Todos os Níveis' : level}
              </button>
            ))}
          </div>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1.5 mb-12">
          {filteredTopics.map((topic, index) => (
            <Link key={index} href={topic.href}>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-emerald-200 transition-all duration-200 group h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-emerald-50 rounded-lg group-hover:bg-emerald-100 transition-colors">
                    {topic.icon}
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    topic.level === 'Básico' ? 'bg-green-100 text-green-700' :
                    topic.level === 'Intermediário' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {topic.level}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                  {topic.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4">
                  {topic.description}
                </p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {topic.topics.slice(0, 3).map((tag, tagIndex) => (
                    <span key={tagIndex} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                  {topic.topics.length > 3 && (
                    <span className="text-xs text-gray-400">+{topic.topics.length - 3}</span>
                  )}
                </div>
                
                <div className="flex items-center text-emerald-600 text-sm font-medium group-hover:text-emerald-700">
                  Explorar
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Examples */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Exemplos Rápidos</h2>
            <p className="text-gray-600">Veja implementações práticas de e-commerce</p>
          </div>
          
          <div className="flex border-b border-gray-100">
            {quickExamples.map((example, index) => (
              <button
                key={index}
                onClick={() => setSelectedExample(index)}
                className={`flex-1 p-4 text-left transition-colors ${
                  selectedExample === index
                    ? 'bg-emerald-50 border-b-2 border-emerald-600 text-emerald-700'
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
              title={quickExamples[selectedExample].title}
              description={quickExamples[selectedExample].description}
              code={quickExamples[selectedExample].code}
              language={quickExamples[selectedExample].language}
            />
          </div>
        </div>

        {/* Success Stories */}
        <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Por que escolher nossa stack?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1.5">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Segurança PCI</h3>
              <p className="text-gray-600 text-sm">Compliance total com padrões de segurança para pagamentos online</p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="text-2xl font-bold text-emerald-600">99.9%</div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Uptime</h3>
              <p className="text-gray-600 text-sm">Alta disponibilidade com infraestrutura robusta e confiável</p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="text-2xl font-bold text-blue-600">&lt;2s</div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Checkout</h3>
              <p className="text-gray-600 text-sm">Processo de checkout otimizado para máxima conversão</p>
            </div>
          </div>
        </div>

        {/* Getting Started */}
        <div className="mt-12 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Comece sua loja online hoje</h2>
            <p className="text-emerald-100 mb-6">
              Implemente pagamentos seguros e uma experiência de compra excepcional com nossa stack completa de e-commerce.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/e-commerce/stripe"
                className="inline-flex items-center px-6 py-3 bg-white text-emerald-600 rounded-lg font-medium hover:bg-emerald-50 transition-colors"
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Integrar Stripe
              </Link>
              <Link 
                href="/e-commerce/shopping-cart"
                className="inline-flex items-center px-6 py-3 bg-emerald-700 text-white rounded-lg font-medium hover:bg-emerald-800 transition-colors"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Criar Carrinho
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}