'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  CreditCard, 
  Shield, 
  CheckCircle,
  AlertTriangle,
  Clock,
  Users,
  Package,
  Truck,
  Lock,
  Zap,
  Target
} from 'lucide-react';
import { DemoCardStatic } from '@/components/DemoCardStatic';
import { DemoSection } from '@/components/DemoSection';
import Breadcrumbs from '@/components/Breadcrumbs';

const checkoutSteps = [
  {
    title: 'Validação do Carrinho',
    description: 'Verificação de produtos e disponibilidade',
    icon: ShoppingCart,
    color: 'text-blue-500',
    benefits: ['Validação de Estoque', 'Preços Atualizados', 'Produtos Ativos', 'Limites de Quantidade']
  },
  {
    title: 'Informações do Cliente',
    description: 'Coleta de dados pessoais e de entrega',
    icon: Users,
    color: 'text-green-500',
    benefits: ['Dados Pessoais', 'Endereço de Entrega', 'Preferências', 'Histórico']
  },
  {
    title: 'Método de Pagamento',
    description: 'Seleção e processamento do pagamento',
    icon: CreditCard,
    color: 'text-purple-500',
    benefits: ['Múltiplos Métodos', 'Segurança PCI', 'Tokenização', 'Validação']
  },
  {
    title: 'Confirmação',
    description: 'Finalização e criação do pedido',
    icon: CheckCircle,
    color: 'text-orange-500',
    benefits: ['Criação do Pedido', 'Notificações', 'Confirmação', 'Redirecionamento']
  }
];

const checkoutExamples = [
  {
    name: 'Validação de Carrinho',
    description: 'Implementação de validação completa do carrinho',
    type: 'Cart Validation',
    features: ['Stock Check', 'Price Validation', 'Product Status', 'Quantity Limits'],
    example: `// services/CartValidationService.ts
import { PrismaClient } from '@prisma/client';

export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  updatedItems: CartItem[];
}

export interface ValidationError {
  type: 'OUT_OF_STOCK' | 'PRODUCT_INACTIVE' | 'PRICE_CHANGED' | 'QUANTITY_EXCEEDED';
  productId: string;
  message: string;
  currentValue?: any;
  expectedValue?: any;
}

export interface ValidationWarning {
  type: 'LOW_STOCK' | 'PRICE_INCREASE' | 'LIMITED_TIME';
  productId: string;
  message: string;
}

export class CartValidationService {
  constructor(private prisma: PrismaClient) {}

  async validateCart(items: CartItem[]): Promise<ValidationResult> {
    const result: ValidationResult = {
      isValid: true,
      errors: [],
      warnings: [],
      updatedItems: []
    };

    // Buscar produtos do banco
    const productIds = items.map(item => item.productId);
    const products = await this.prisma.product.findMany({
      where: {
        id: { in: productIds },
      },
      include: {
        inventory: true,
        pricing: true
      }
    });

    // Validar cada item
    for (const item of items) {
      const product = products.find(p => p.id === item.productId);
      
      if (!product) {
        result.errors.push({
          type: 'PRODUCT_INACTIVE',
          productId: item.productId,
          message: 'Produto não encontrado ou inativo'
        });
        result.isValid = false;
        continue;
      }

      // Validar status do produto
      if (!product.isActive) {
        result.errors.push({
          type: 'PRODUCT_INACTIVE',
          productId: item.productId,
          message: 'Produto não está mais disponível'
        });
        result.isValid = false;
        continue;
      }

      // Validar estoque
      const availableStock = product.inventory?.quantity || 0;
      if (item.quantity > availableStock) {
        if (availableStock === 0) {
          result.errors.push({
            type: 'OUT_OF_STOCK',
            productId: item.productId,
            message: 'Produto fora de estoque',
            currentValue: 0,
            expectedValue: item.quantity
          });
          result.isValid = false;
        } else {
          result.errors.push({
            type: 'QUANTITY_EXCEEDED',
            productId: item.productId,
            message: \`Apenas \${availableStock} unidades disponíveis\`,
            currentValue: availableStock,
            expectedValue: item.quantity
          });
          result.isValid = false;
        }
        continue;
      }

      // Validar preço
      const currentPrice = product.pricing?.price || product.price;
      if (Math.abs(item.price - currentPrice) > 0.01) {
        result.errors.push({
          type: 'PRICE_CHANGED',
          productId: item.productId,
          message: 'Preço do produto foi alterado',
          currentValue: currentPrice,
          expectedValue: item.price
        });
        result.isValid = false;
        continue;
      }

      // Warnings para estoque baixo
      if (availableStock <= 5 && availableStock > item.quantity) {
        result.warnings.push({
          type: 'LOW_STOCK',
          productId: item.productId,
          message: \`Apenas \${availableStock} unidades restantes\`
        });
      }

      // Item válido
      result.updatedItems.push({
        productId: item.productId,
        quantity: item.quantity,
        price: currentPrice
      });
    }

    return result;
  }

  async reserveStock(items: CartItem[], reservationId: string): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      for (const item of items) {
        // Verificar estoque novamente
        const inventory = await tx.inventory.findUnique({
          where: { productId: item.productId }
        });

        if (!inventory || inventory.quantity < item.quantity) {
          throw new Error(\`Estoque insuficiente para produto \${item.productId}\`);
        }

        // Reservar estoque
        await tx.stockReservation.create({
          data: {
            productId: item.productId,
            quantity: item.quantity,
            reservationId,
            expiresAt: new Date(Date.now() + 15 * 60 * 1000) // 15 minutos
          }
        });

        // Atualizar estoque disponível
        await tx.inventory.update({
          where: { productId: item.productId },
          data: {
            quantity: { decrement: item.quantity },
            reserved: { increment: item.quantity }
          }
        });
      }
    });
  }

  async releaseReservation(reservationId: string): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      const reservations = await tx.stockReservation.findMany({
        where: { reservationId }
      });

      for (const reservation of reservations) {
        // Liberar estoque
        await tx.inventory.update({
          where: { productId: reservation.productId },
          data: {
            quantity: { increment: reservation.quantity },
            reserved: { decrement: reservation.quantity }
          }
        });
      }

      // Remover reservas
      await tx.stockReservation.deleteMany({
        where: { reservationId }
      });
    });
  }
}

// hooks/useCartValidation.ts
import { useState, useEffect } from 'react';
import { CartValidationService, CartItem, ValidationResult } from '../services/CartValidationService';

export function useCartValidation(items: CartItem[]) {
  const [validation, setValidation] = useState<ValidationResult | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [reservationId, setReservationId] = useState<string | null>(null);

  const validateCart = async () => {
    if (items.length === 0) return;
    
    setIsValidating(true);
    try {
      const response = await fetch('/api/cart/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items })
      });
      
      const result = await response.json();
      setValidation(result);
      
      // Se válido, reservar estoque
      if (result.isValid) {
        const reserveResponse = await fetch('/api/cart/reserve', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items: result.updatedItems })
        });
        
        const { reservationId } = await reserveResponse.json();
        setReservationId(reservationId);
      }
    } catch (error) {
      console.error('Erro na validação:', error);
    } finally {
      setIsValidating(false);
    }
  };

  const releaseReservation = async () => {
    if (!reservationId) return;
    
    try {
      await fetch('/api/cart/release', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reservationId })
      });
      
      setReservationId(null);
    } catch (error) {
      console.error('Erro ao liberar reserva:', error);
    }
  };

  useEffect(() => {
    validateCart();
    
    // Cleanup: liberar reserva se componente for desmontado
    return () => {
      if (reservationId) {
        releaseReservation();
      }
    };
  }, [items]);

  return {
    validation,
    isValidating,
    reservationId,
    validateCart,
    releaseReservation
  };
}`
  },
  {
    name: 'Processamento de Pagamento',
    description: 'Integração com gateways de pagamento',
    type: 'Payment Processing',
    features: ['Multiple Gateways', 'Tokenization', 'Fraud Detection', 'Webhooks'],
    example: `// services/PaymentService.ts
import Stripe from 'stripe';
import { PrismaClient } from '@prisma/client';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
});

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: string;
  clientSecret: string;
}

export interface PaymentMethod {
  type: 'card' | 'pix' | 'boleto' | 'bank_transfer';
  card?: {
    token: string;
    last4: string;
    brand: string;
  };
  pix?: {
    qrCode: string;
    qrCodeUrl: string;
  };
}

export class PaymentService {
  constructor(private prisma: PrismaClient) {}

  async createPaymentIntent(data: {
    amount: number;
    currency: string;
    customerId?: string;
    orderId: string;
    metadata?: Record<string, string>;
  }): Promise<PaymentIntent> {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(data.amount * 100), // Stripe usa centavos
        currency: data.currency,
        customer: data.customerId,
        metadata: {
          orderId: data.orderId,
          ...data.metadata
        },
        automatic_payment_methods: {
          enabled: true
        }
      });

      // Salvar no banco
      await this.prisma.payment.create({
        data: {
          id: paymentIntent.id,
          orderId: data.orderId,
          amount: data.amount,
          currency: data.currency,
          status: paymentIntent.status,
          gateway: 'stripe',
          gatewayPaymentId: paymentIntent.id,
          metadata: data.metadata || {}
        }
      });

      return {
        id: paymentIntent.id,
        amount: data.amount,
        currency: data.currency,
        status: paymentIntent.status,
        clientSecret: paymentIntent.client_secret!
      };
    } catch (error) {
      console.error('Erro ao criar payment intent:', error);
      throw new Error('Falha ao processar pagamento');
    }
  }

  async confirmPayment(paymentIntentId: string): Promise<{
    success: boolean;
    status: string;
    error?: string;
  }> {
    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      
      // Atualizar status no banco
      await this.prisma.payment.update({
        where: { id: paymentIntentId },
        data: {
          status: paymentIntent.status,
          confirmedAt: paymentIntent.status === 'succeeded' ? new Date() : null
        }
      });

      return {
        success: paymentIntent.status === 'succeeded',
        status: paymentIntent.status
      };
    } catch (error) {
      console.error('Erro ao confirmar pagamento:', error);
      return {
        success: false,
        status: 'failed',
        error: 'Falha na confirmação do pagamento'
      };
    }
  }

  async processRefund(paymentIntentId: string, amount?: number): Promise<{
    success: boolean;
    refundId?: string;
    error?: string;
  }> {
    try {
      const refund = await stripe.refunds.create({
        payment_intent: paymentIntentId,
        amount: amount ? Math.round(amount * 100) : undefined
      });

      // Registrar reembolso
      await this.prisma.refund.create({
        data: {
          id: refund.id,
          paymentId: paymentIntentId,
          amount: refund.amount / 100,
          status: refund.status,
          reason: 'requested_by_customer'
        }
      });

      return {
        success: true,
        refundId: refund.id
      };
    } catch (error) {
      console.error('Erro ao processar reembolso:', error);
      return {
        success: false,
        error: 'Falha ao processar reembolso'
      };
    }
  }

  async handleWebhook(event: any): Promise<void> {
    switch (event.type) {
      case 'payment_intent.succeeded':
        await this.handlePaymentSuccess(event.data.object);
        break;
      case 'payment_intent.payment_failed':
        await this.handlePaymentFailure(event.data.object);
        break;
      case 'charge.dispute.created':
        await this.handleChargeback(event.data.object);
        break;
    }
  }

  private async handlePaymentSuccess(paymentIntent: any): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      // Atualizar pagamento
      await tx.payment.update({
        where: { id: paymentIntent.id },
        data: {
          status: 'succeeded',
          confirmedAt: new Date()
        }
      });

      // Atualizar pedido
      const payment = await tx.payment.findUnique({
        where: { id: paymentIntent.id }
      });

      if (payment) {
        await tx.order.update({
          where: { id: payment.orderId },
          data: {
            status: 'paid',
            paidAt: new Date()
          }
        });

        // Confirmar estoque
        await this.confirmStockReservation(payment.orderId);
        
        // Enviar email de confirmação
        await this.sendOrderConfirmation(payment.orderId);
      }
    });
  }

  private async handlePaymentFailure(paymentIntent: any): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      // Atualizar pagamento
      await tx.payment.update({
        where: { id: paymentIntent.id },
        data: {
          status: 'failed',
          failedAt: new Date()
        }
      });

      // Atualizar pedido
      const payment = await tx.payment.findUnique({
        where: { id: paymentIntent.id }
      });

      if (payment) {
        await tx.order.update({
          where: { id: payment.orderId },
          data: {
            status: 'payment_failed'
          }
        });

        // Liberar reserva de estoque
        await this.releaseStockReservation(payment.orderId);
      }
    });
  }

  private async confirmStockReservation(orderId: string): Promise<void> {
    // Implementar confirmação de estoque
  }

  private async releaseStockReservation(orderId: string): Promise<void> {
    // Implementar liberação de estoque
  }

  private async sendOrderConfirmation(orderId: string): Promise<void> {
    // Implementar envio de email
  }
}

// components/CheckoutForm.tsx
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface CheckoutFormProps {
  clientSecret: string;
  amount: number;
  onSuccess: (paymentIntent: any) => void;
  onError: (error: string) => void;
}

function CheckoutForm({ clientSecret, amount, onSuccess, onError }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setIsProcessing(false);
      return;
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: 'Cliente Teste'
        }
      }
    });

    setIsProcessing(false);

    if (error) {
      onError(error.message || 'Erro no pagamento');
    } else if (paymentIntent.status === 'succeeded') {
      onSuccess(paymentIntent);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 border rounded-lg">
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
      
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {isProcessing ? 'Processando...' : \`Pagar R$ \${amount.toFixed(2)}\`}
      </button>
    </form>
  );
}

export function PaymentForm(props: CheckoutFormProps) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm {...props} />
    </Elements>
  );
}`
  },
  {
    name: 'Gestão de Pedidos',
    description: 'Criação e gerenciamento de pedidos',
    type: 'Order Management',
    features: ['Order Creation', 'Status Tracking', 'Inventory Management', 'Notifications'],
    example: `// services/OrderService.ts
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

export interface CreateOrderData {
  customerId: string;
  items: OrderItem[];
  shippingAddress: Address;
  billingAddress?: Address;
  paymentMethod: string;
  shippingMethod: string;
  couponCode?: string;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
  productName: string;
  productSku: string;
}

export interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PAID = 'paid',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded'
}

export class OrderService {
  constructor(private prisma: PrismaClient) {}

  async createOrder(data: CreateOrderData): Promise<Order> {
    return await this.prisma.$transaction(async (tx) => {
      // Gerar número do pedido
      const orderNumber = await this.generateOrderNumber();
      
      // Calcular totais
      const subtotal = data.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const shipping = await this.calculateShipping(data.shippingAddress, data.items);
      const tax = await this.calculateTax(data.shippingAddress, subtotal);
      const discount = data.couponCode ? await this.calculateDiscount(data.couponCode, subtotal) : 0;
      const total = subtotal + shipping + tax - discount;

      // Criar pedido
      const order = await tx.order.create({
        data: {
          id: uuidv4(),
          orderNumber,
          customerId: data.customerId,
          status: OrderStatus.PENDING,
          subtotal,
          shipping,
          tax,
          discount,
          total,
          shippingAddress: data.shippingAddress,
          billingAddress: data.billingAddress || data.shippingAddress,
          paymentMethod: data.paymentMethod,
          shippingMethod: data.shippingMethod,
          couponCode: data.couponCode
        }
      });

      // Criar itens do pedido
      for (const item of data.items) {
        await tx.orderItem.create({
          data: {
            orderId: order.id,
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            productName: item.productName,
            productSku: item.productSku
          }
        });
      }

      // Criar histórico de status
      await tx.orderStatusHistory.create({
        data: {
          orderId: order.id,
          status: OrderStatus.PENDING,
          comment: 'Pedido criado',
          createdAt: new Date()
        }
      });

      return {
        ...order,
        items: data.items
      };
    });
  }

  async updateOrderStatus(orderId: string, status: OrderStatus, comment?: string): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      // Atualizar status do pedido
      await tx.order.update({
        where: { id: orderId },
        data: {
          status,
          updatedAt: new Date()
        }
      });

      // Adicionar ao histórico
      await tx.orderStatusHistory.create({
        data: {
          orderId,
          status,
          comment: comment || \`Status alterado para \${status}\`,
          createdAt: new Date()
        }
      });

      // Ações específicas por status
      switch (status) {
        case OrderStatus.PAID:
          await this.handleOrderPaid(orderId);
          break;
        case OrderStatus.SHIPPED:
          await this.handleOrderShipped(orderId);
          break;
        case OrderStatus.CANCELLED:
          await this.handleOrderCancelled(orderId);
          break;
      }
    });
  }

  async getOrder(orderId: string): Promise<Order | null> {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: true,
        customer: true,
        statusHistory: {
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    return order;
  }

  async getOrdersByCustomer(customerId: string, options: {
    page?: number;
    limit?: number;
    status?: OrderStatus;
  } = {}): Promise<{ orders: Order[], total: number }> {
    const { page = 1, limit = 10, status } = options;
    const skip = (page - 1) * limit;

    const where = {
      customerId,
      ...(status && { status })
    };

    const [orders, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        include: {
          items: true
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      }),
      this.prisma.order.count({ where })
    ]);

    return { orders, total };
  }

  async cancelOrder(orderId: string, reason: string): Promise<void> {
    const order = await this.getOrder(orderId);
    
    if (!order) {
      throw new Error('Pedido não encontrado');
    }

    if (![OrderStatus.PENDING, OrderStatus.CONFIRMED].includes(order.status)) {
      throw new Error('Pedido não pode ser cancelado neste status');
    }

    await this.prisma.$transaction(async (tx) => {
      // Atualizar status
      await this.updateOrderStatus(orderId, OrderStatus.CANCELLED, reason);
      
      // Liberar estoque
      for (const item of order.items) {
        await tx.inventory.update({
          where: { productId: item.productId },
          data: {
            quantity: { increment: item.quantity }
          }
        });
      }
      
      // Se já foi pago, processar reembolso
      if (order.status === OrderStatus.PAID) {
        await this.processRefund(orderId);
      }
    });
  }

  private async generateOrderNumber(): Promise<string> {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    
    const prefix = \`\${year}\${month}\${day}\`;
    
    // Buscar último número do dia
    const lastOrder = await this.prisma.order.findFirst({
      where: {
        orderNumber: {
          startsWith: prefix
        }
      },
      orderBy: {
        orderNumber: 'desc'
      }
    });
    
    let sequence = 1;
    if (lastOrder) {
      const lastSequence = parseInt(lastOrder.orderNumber.slice(-4));
      sequence = lastSequence + 1;
    }
    
    return \`\${prefix}\${String(sequence).padStart(4, '0')}\`;
  }

  private async calculateShipping(address: Address, items: OrderItem[]): Promise<number> {
    // Implementar cálculo de frete
    // Pode integrar com Correios, transportadoras, etc.
    return 15.00; // Valor fixo para exemplo
  }

  private async calculateTax(address: Address, subtotal: number): Promise<number> {
    // Implementar cálculo de impostos baseado no endereço
    return 0; // Sem impostos para exemplo
  }

  private async calculateDiscount(couponCode: string, subtotal: number): Promise<number> {
    const coupon = await this.prisma.coupon.findUnique({
      where: { code: couponCode }
    });
    
    if (!coupon || !coupon.isActive || coupon.expiresAt < new Date()) {
      return 0;
    }
    
    if (coupon.type === 'percentage') {
      return subtotal * (coupon.value / 100);
    } else {
      return Math.min(coupon.value, subtotal);
    }
  }

  private async handleOrderPaid(orderId: string): Promise<void> {
    // Confirmar estoque, enviar email, etc.
  }

  private async handleOrderShipped(orderId: string): Promise<void> {
    // Enviar código de rastreamento, notificar cliente
  }

  private async handleOrderCancelled(orderId: string): Promise<void> {
    // Liberar estoque, notificar cliente
  }

  private async processRefund(orderId: string): Promise<void> {
    // Implementar reembolso
  }
}`
  }
];

const checkoutOptimizations = [
  {
    title: 'Checkout em Uma Página',
    description: 'Reduzir fricção com checkout simplificado',
    benefits: ['Menos Abandono', 'UX Melhorada', 'Conversão Maior', 'Mobile Friendly'],
    example: `// Implementação de checkout em uma página
const [step, setStep] = useState(1);
const [formData, setFormData] = useState({
  customer: {},
  shipping: {},
  payment: {}
});

// Validação progressiva
const validateStep = (stepNumber) => {
  switch(stepNumber) {
    case 1: return validateCustomerInfo(formData.customer);
    case 2: return validateShippingInfo(formData.shipping);
    case 3: return validatePaymentInfo(formData.payment);
  }
};

// Auto-save do progresso
useEffect(() => {
  localStorage.setItem('checkoutProgress', JSON.stringify(formData));
}, [formData]);`
  },
  {
    title: 'Checkout Expresso',
    description: 'Opções de pagamento rápido',
    benefits: ['Apple Pay', 'Google Pay', 'PayPal Express', 'Pix Instantâneo'],
    example: `// Integração com Apple Pay
const handleApplePay = async () => {
  if (!window.ApplePaySession?.canMakePayments()) {
    return;
  }
  
  const request = {
    countryCode: 'BR',
    currencyCode: 'BRL',
    total: {
      label: 'Total',
      amount: total.toString()
    },
    supportedNetworks: ['visa', 'masterCard'],
    merchantCapabilities: ['supports3DS']
  };
  
  const session = new ApplePaySession(3, request);
  session.begin();
};`
  }
];

export default function CheckoutPage() {
  const [selectedExample, setSelectedExample] = useState(0);
  const [selectedOptimization, setSelectedOptimization] = useState(0);
  const [checkoutProgress, setCheckoutProgress] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const simulateCheckout = () => {
    setIsProcessing(true);
    
    const interval = setInterval(() => {
      setCheckoutProgress(prev => {
        if (prev >= 4) {
          clearInterval(interval);
          setIsProcessing(false);
          return 1;
        }
        return prev + 1;
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50 to-red-100 dark:from-gray-900 dark:via-orange-900 dark:to-red-900">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs />
        
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl mb-6">
            <ShoppingCart className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Processo de Checkout
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Implementação completa do fluxo de checkout para e-commerce
          </p>
        </motion.div>

        {/* Checkout Steps */}
        <DemoSection title="Etapas do Checkout" description="Fluxo completo do processo de compra">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {checkoutSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <DemoCardStatic title={step.title} description={step.description}>
                    <div className="space-y-4">
                      <Icon className={`h-12 w-12 mx-auto ${step.color}`} />
                      <div className="space-y-2">
                        {step.benefits.map((benefit) => (
                          <div key={benefit} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                            {benefit}
                          </div>
                        ))}
                      </div>
                    </div>
                  </DemoCardStatic>
                </motion.div>
              );
            })}
          </div>
        </DemoSection>

        {/* Implementation Examples */}
        <DemoSection title="Implementações" description="Exemplos práticos de cada etapa do checkout">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8 px-6 overflow-x-auto">
                {checkoutExamples.map((example, index) => (
                  <button
                    key={example.name}
                    onClick={() => setSelectedExample(index)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                      selectedExample === index
                        ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    {example.name}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {checkoutExamples[selectedExample].name}
                  </h3>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                    {checkoutExamples[selectedExample].type}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {checkoutExamples[selectedExample].description}
                </p>
                
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Características:</h4>
                  <div className="flex flex-wrap gap-2">
                    {checkoutExamples[selectedExample].features.map((feature) => (
                      <span key={feature} className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-green-400 text-sm">
                  <code>{checkoutExamples[selectedExample].example}</code>
                </pre>
              </div>
            </div>
          </div>
        </DemoSection>

        {/* Checkout Demo */}
        <DemoSection title="Demo de Checkout" description="Simulação do processo de checkout">
          <DemoCardStatic title="Simulador de Checkout" description="Demonstração do fluxo completo">
            <div className="space-y-6">
              {/* Progress Bar */}
              <div className="flex items-center justify-between">
                {checkoutSteps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = checkoutProgress > index;
                  const isCurrent = checkoutProgress === index + 1;
                  
                  return (
                    <div key={index} className="flex items-center">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                        isActive 
                          ? 'bg-orange-600 border-orange-600 text-white'
                          : isCurrent
                          ? 'border-orange-600 text-orange-600'
                          : 'border-gray-300 text-gray-300'
                      }`}>
                        {isActive ? (
                          <CheckCircle className="h-6 w-6" />
                        ) : (
                          <Icon className="h-5 w-5" />
                        )}
                      </div>
                      {index < checkoutSteps.length - 1 && (
                        <div className={`w-16 h-1 mx-2 ${
                          checkoutProgress > index + 1 ? 'bg-orange-600' : 'bg-gray-300'
                        }`} />
                      )}
                    </div>
                  );
                })}
              </div>
              
              {/* Current Step Info */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  {checkoutProgress <= 4 ? checkoutSteps[checkoutProgress - 1]?.title : 'Pedido Finalizado!'}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {checkoutProgress <= 4 
                    ? checkoutSteps[checkoutProgress - 1]?.description 
                    : 'Seu pedido foi processado com sucesso!'}
                </p>
              </div>
              
              <button
                onClick={simulateCheckout}
                disabled={isProcessing}
                className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 disabled:opacity-50 transition-colors"
              >
                {isProcessing ? 'Processando...' : 'Simular Checkout'}
              </button>
            </div>
          </DemoCardStatic>
        </DemoSection>

        {/* Optimizations */}
        <DemoSection title="Otimizações" description="Técnicas para melhorar conversão">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8 px-6 overflow-x-auto">
                {checkoutOptimizations.map((optimization, index) => (
                  <button
                    key={optimization.title}
                    onClick={() => setSelectedOptimization(index)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                      selectedOptimization === index
                        ? 'border-red-500 text-red-600 dark:text-red-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    {optimization.title}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {checkoutOptimizations[selectedOptimization].title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {checkoutOptimizations[selectedOptimization].description}
                </p>
                
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Benefícios:</h4>
                  <div className="flex flex-wrap gap-2">
                    {checkoutOptimizations[selectedOptimization].benefits.map((benefit) => (
                      <span key={benefit} className="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-full text-sm">
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-blue-400 text-sm">
                  <code>{checkoutOptimizations[selectedOptimization].example}</code>
                </pre>
              </div>
            </div>
          </div>
        </DemoSection>

        {/* Best Practices */}
        <DemoSection title="Melhores Práticas" description="Diretrizes para checkout eficaz">
          <div className="grid md:grid-cols-3 gap-6">
            <DemoCardStatic title="🛒 UX/UI" description="Experiência do usuário">
              <div className="space-y-3">
                {[
                  'Minimize o número de etapas',
                  'Mostre progresso claramente',
                  'Permita checkout como convidado',
                  'Use validação em tempo real',
                  'Otimize para mobile',
                  'Ofereça múltiplas opções de pagamento'
                ].map((practice, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{practice}</span>
                  </div>
                ))}
              </div>
            </DemoCardStatic>

            <DemoCardStatic title="🔒 Segurança" description="Proteção de dados">
              <div className="space-y-3">
                {[
                  'Use HTTPS em todo o fluxo',
                  'Implemente tokenização',
                  'Valide dados no servidor',
                  'Use 3D Secure quando necessário',
                  'Monitore transações suspeitas',
                  'Mantenha logs de auditoria'
                ].map((practice, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{practice}</span>
                  </div>
                ))}
              </div>
            </DemoCardStatic>

            <DemoCardStatic title="⚡ Performance" description="Otimização de performance">
              <div className="space-y-3">
                {[
                  'Carregue scripts de pagamento lazy',
                  'Use cache para dados estáticos',
                  'Otimize imagens de produtos',
                  'Implemente retry automático',
                  'Monitore tempo de resposta',
                  'Use CDN para assets'
                ].map((practice, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{practice}</span>
                  </div>
                ))}
              </div>
            </DemoCardStatic>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}