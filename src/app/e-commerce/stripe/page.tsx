'use client';

import { useState } from 'react';
import { CreditCard, Shield, Zap, Globe, CheckCircle, AlertTriangle, Code, Play, Settings } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import DemoCardStatic from '@/components/DemoCardStatic';

const stripeFeatures = [
  {
    title: 'Payment Intents',
    description: 'API moderna para processar pagamentos',
    icon: <CreditCard className="w-5 h-5" />,
    benefits: ['3D Secure', 'Retry Logic', 'Webhooks', 'Multi-party']
  },
  {
    title: 'Stripe Elements',
    description: 'Componentes UI seguros e customizáveis',
    icon: <Shield className="w-5 h-5" />,
    benefits: ['PCI Compliant', 'Mobile Ready', 'Customizable', 'Accessible']
  },
  {
    title: 'Webhooks',
    description: 'Eventos em tempo real para sincronização',
    icon: <Zap className="w-5 h-5" />,
    benefits: ['Real-time', 'Reliable', 'Secure', 'Scalable']
  },
  {
    title: 'Global Payments',
    description: 'Suporte a múltiplas moedas e métodos',
    icon: <Globe className="w-5 h-5" />,
    benefits: ['135+ Currencies', 'Local Methods', 'Tax Handling', 'Compliance']
  }
];

const codeExamples = [
  {
    title: 'Configuração Inicial',
    description: 'Setup básico do Stripe no Next.js',
    code: `// .env.local
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

// lib/stripe.ts
import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
  typescript: true,
});

// lib/stripe-client.ts
import { loadStripe } from '@stripe/stripe-js';

let stripePromise: Promise<any>;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
    );
  }
  return stripePromise;
};

export default getStripe;

// package.json dependencies
{
  "dependencies": {
    "stripe": "^14.0.0",
    "@stripe/stripe-js": "^2.0.0",
    "@stripe/react-stripe-js": "^2.0.0"
  }
}

// components/StripeProvider.tsx
import { Elements } from '@stripe/react-stripe-js';
import getStripe from '@/lib/stripe-client';

interface StripeProviderProps {
  children: React.ReactNode;
  options?: any;
}

export function StripeProvider({ children, options }: StripeProviderProps) {
  return (
    <Elements stripe={getStripe()} options={options}>
      {children}
    </Elements>
  );
}

// app/layout.tsx ou _app.tsx
import { StripeProvider } from '@/components/StripeProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <StripeProvider>
          {children}
        </StripeProvider>
      </body>
    </html>
  );
}`,
    language: 'typescript'
  },
  {
    title: 'Payment Intent API',
    description: 'Criação e confirmação de pagamentos',
    code: `// app/api/create-payment-intent/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const { amount, currency = 'brl', metadata = {} } = await request.json();

    // Validações
    if (!amount || amount < 50) { // Mínimo R$ 0,50
      return NextResponse.json(
        { error: 'Valor mínimo é R$ 0,50' },
        { status: 400 }
      );
    }

    // Criar Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Converter para centavos
      currency,
      metadata: {
        ...metadata,
        timestamp: new Date().toISOString(),
      },
      automatic_payment_methods: {
        enabled: true,
      },
      // Configurações adicionais
      capture_method: 'automatic', // ou 'manual' para captura posterior
      confirmation_method: 'automatic',
      setup_future_usage: 'off_session', // Para pagamentos futuros
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error: any) {
    console.error('Erro ao criar Payment Intent:', error);
    
    return NextResponse.json(
      { error: error.message || 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// app/api/confirm-payment/route.ts
export async function POST(request: NextRequest) {
  try {
    const { paymentIntentId } = await request.json();

    // Recuperar Payment Intent
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      // Processar pedido bem-sucedido
      await processSuccessfulPayment(paymentIntent);
      
      return NextResponse.json({
        success: true,
        paymentIntent,
      });
    }

    return NextResponse.json({
      success: false,
      status: paymentIntent.status,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

async function processSuccessfulPayment(paymentIntent: any) {
  // Implementar lógica de negócio:
  // - Salvar pedido no banco de dados
  // - Enviar email de confirmação
  // - Atualizar estoque
  // - Gerar nota fiscal
  
  console.log('Pagamento processado:', paymentIntent.id);
}

// Tipos TypeScript
interface CreatePaymentIntentRequest {
  amount: number;
  currency?: string;
  metadata?: Record<string, string>;
  customerId?: string;
  description?: string;
}

interface PaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
}`,
    language: 'typescript'
  },
  {
    title: 'Checkout Component',
    description: 'Componente completo de checkout com Stripe Elements',
    code: `// components/CheckoutForm.tsx
import { useState, useEffect } from 'react';
import {
  useStripe,
  useElements,
  PaymentElement,
  AddressElement,
} from '@stripe/react-stripe-js';
import { CreditCard, Lock, AlertCircle, CheckCircle } from 'lucide-react';

interface CheckoutFormProps {
  amount: number;
  onSuccess?: (paymentIntent: any) => void;
  onError?: (error: string) => void;
}

export function CheckoutForm({ amount, onSuccess, onError }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string>('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Criar Payment Intent quando o componente monta
  useEffect(() => {
    createPaymentIntent();
  }, [amount]);

  const createPaymentIntent = async () => {
    try {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          amount,
          metadata: {
            source: 'checkout_form',
            timestamp: new Date().toISOString()
          }
        }),
      });

      const data = await response.json();
      
      if (data.error) {
        setError(data.error);
        return;
      }

      setClientSecret(data.clientSecret);
    } catch (err) {
      setError('Erro ao inicializar pagamento');
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Confirmar pagamento
      const { error: submitError } = await elements.submit();
      
      if (submitError) {
        setError(submitError.message || 'Erro ao processar pagamento');
        setIsLoading(false);
        return;
      }

      // Confirmar Payment Intent
      const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: window.location.origin + '/payment/success',
        },
        redirect: 'if_required', // Evitar redirect desnecessário
      });

      if (confirmError) {
        setError(confirmError.message || 'Erro ao confirmar pagamento');
        onError?.(confirmError.message || 'Erro ao confirmar pagamento');
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        setPaymentSuccess(true);
        onSuccess?.(paymentIntent);
      }
    } catch (err: any) {
      setError(err.message || 'Erro inesperado');
      onError?.(err.message || 'Erro inesperado');
    } finally {
      setIsLoading(false);
    }
  };

  if (paymentSuccess) {
    return (
      <div className="text-center py-8">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Pagamento Realizado!
        </h2>
        <p className="text-gray-600">
          Seu pagamento de R$ {amount.toFixed(2)} foi processado com sucesso.
        </p>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Carregando...</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Lock className="w-5 h-5 text-green-600 mr-2" />
          <span className="text-sm text-gray-600">Pagamento Seguro</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          R$ {amount.toFixed(2)}
        </h2>
      </div>

      {/* Address Element */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Endereço de Cobrança</h3>
        <AddressElement
          options={{
            mode: 'billing',
            allowedCountries: ['BR'],
            fields: {
              phone: 'always',
            },
            validation: {
              phone: {
                required: 'always',
              },
            },
          }}
        />
      </div>

      {/* Payment Element */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Método de Pagamento</h3>
        <PaymentElement
          options={{
            layout: 'tabs',
            paymentMethodOrder: ['card', 'boleto'],
            fields: {
              billingDetails: 'never', // Já coletado no AddressElement
            },
          }}
        />
      </div>

      {/* Error Display */}
      {error && (
        <div className="flex items-center p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
          <span className="text-red-700 text-sm">{error}</span>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!stripe || isLoading}
        className={'w-full flex items-center justify-center py-3 px-4 rounded-lg font-medium transition-colors ' + (
          isLoading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        ) + ' text-white'}
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Processando...
          </>
        ) : (
          <>
            <CreditCard className="w-4 h-4 mr-2" />
            Pagar R$ {amount.toFixed(2)}
          </>
        )}
      </button>

      {/* Security Notice */}
      <div className="text-center text-xs text-gray-500">
        <p>Seus dados estão protegidos com criptografia SSL</p>
        <p>Processado por Stripe - PCI DSS Compliant</p>
      </div>
    </form>
  );
}

// Uso do componente
export default function CheckoutPage() {
  const [amount] = useState(99.90);

  const handlePaymentSuccess = (paymentIntent: any) => {
    console.log('Pagamento bem-sucedido:', paymentIntent);
    // Redirecionar para página de sucesso
    // Enviar dados para analytics
    // Limpar carrinho
  };

  const handlePaymentError = (error: string) => {
    console.error('Erro no pagamento:', error);
    // Log do erro
    // Mostrar mensagem de erro
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <CheckoutForm
          amount={amount}
          onSuccess={handlePaymentSuccess}
          onError={handlePaymentError}
        />
      </div>
    </div>
  );
}`,
    language: 'typescript'
  },
  {
    title: 'Webhook Handler',
    description: 'Processamento seguro de webhooks do Stripe',
    code: `// app/api/webhooks/stripe/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import Stripe from 'stripe';

// Configurar para receber raw body
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = headers().get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    // Verificar assinatura do webhook
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  // Processar evento
  try {
    await handleWebhookEvent(event);
    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Webhook handler failed:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

async function handleWebhookEvent(event: Stripe.Event) {
  console.log('Processing webhook event:', event.type);

  switch (event.type) {
    case 'payment_intent.succeeded':
      await handlePaymentSucceeded(event.data.object as Stripe.PaymentIntent);
      break;

    case 'payment_intent.payment_failed':
      await handlePaymentFailed(event.data.object as Stripe.PaymentIntent);
      break;

    case 'customer.subscription.created':
      await handleSubscriptionCreated(event.data.object as Stripe.Subscription);
      break;

    case 'customer.subscription.updated':
      await handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
      break;

    case 'customer.subscription.deleted':
      await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
      break;

    case 'invoice.payment_succeeded':
      await handleInvoicePaymentSucceeded(event.data.object as Stripe.Invoice);
      break;

    case 'invoice.payment_failed':
      await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice);
      break;

    default:
      console.log(\`Unhandled event type: \${event.type}\`);
  }
}

// Handlers para diferentes tipos de eventos
async function handlePaymentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  console.log('Payment succeeded:', paymentIntent.id);
  
  try {
    // 1. Atualizar status do pedido no banco de dados
    await updateOrderStatus(paymentIntent.metadata.orderId, 'paid');
    
    // 2. Enviar email de confirmação
    await sendConfirmationEmail(paymentIntent);
    
    // 3. Atualizar estoque
    await updateInventory(paymentIntent.metadata.orderId);
    
    // 4. Gerar nota fiscal
    await generateInvoice(paymentIntent);
    
    // 5. Enviar para analytics
    await trackPurchase(paymentIntent);
    
  } catch (error) {
    console.error('Error processing successful payment:', error);
    // Implementar retry logic ou dead letter queue
  }
}

async function handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
  console.log('Payment failed:', paymentIntent.id);
  
  try {
    // 1. Atualizar status do pedido
    await updateOrderStatus(paymentIntent.metadata.orderId, 'failed');
    
    // 2. Enviar email de falha
    await sendPaymentFailedEmail(paymentIntent);
    
    // 3. Liberar estoque reservado
    await releaseReservedInventory(paymentIntent.metadata.orderId);
    
    // 4. Log para análise
    await logPaymentFailure(paymentIntent);
    
  } catch (error) {
    console.error('Error processing failed payment:', error);
  }
}

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  console.log('Subscription created:', subscription.id);
  
  try {
    // 1. Criar registro de assinatura
    await createSubscriptionRecord(subscription);
    
    // 2. Ativar acesso do usuário
    await activateUserAccess(subscription.customer as string);
    
    // 3. Enviar email de boas-vindas
    await sendWelcomeEmail(subscription);
    
  } catch (error) {
    console.error('Error processing subscription creation:', error);
  }
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  console.log('Subscription updated:', subscription.id);
  
  try {
    // 1. Atualizar registro de assinatura
    await updateSubscriptionRecord(subscription);
    
    // 2. Ajustar acesso do usuário se necessário
    if (subscription.status === 'active') {
      await activateUserAccess(subscription.customer as string);
    } else if (subscription.status === 'canceled' || subscription.status === 'unpaid') {
      await deactivateUserAccess(subscription.customer as string);
    }
    
    // 3. Notificar usuário sobre mudanças
    await notifySubscriptionChange(subscription);
    
  } catch (error) {
    console.error('Error processing subscription update:', error);
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  console.log('Subscription deleted:', subscription.id);
  
  try {
    // 1. Desativar acesso do usuário
    await deactivateUserAccess(subscription.customer as string);
    
    // 2. Atualizar registro de assinatura
    await updateSubscriptionRecord(subscription);
    
    // 3. Enviar email de cancelamento
    await sendCancellationEmail(subscription);
    
  } catch (error) {
    console.error('Error processing subscription deletion:', error);
  }
}

// Funções auxiliares (implementar conforme sua lógica de negócio)
async function updateOrderStatus(orderId: string, status: string) {
  // Implementar atualização no banco de dados
  console.log(\`Updating order \${orderId} to status \${status}\`);
}

async function sendConfirmationEmail(paymentIntent: Stripe.PaymentIntent) {
  // Implementar envio de email
  console.log(\`Sending confirmation email for payment \${paymentIntent.id}\`);
}

async function updateInventory(orderId: string) {
  // Implementar atualização de estoque
  console.log(\`Updating inventory for order \${orderId}\`);
}

async function generateInvoice(paymentIntent: Stripe.PaymentIntent) {
  // Implementar geração de nota fiscal
  console.log(\`Generating invoice for payment \${paymentIntent.id}\`);
}

async function trackPurchase(paymentIntent: Stripe.PaymentIntent) {
  // Implementar tracking de analytics
  console.log(\`Tracking purchase for payment \${paymentIntent.id}\`);
}

// Implementar outras funções auxiliares conforme necessário...

// Middleware para idempotência
const processedEvents = new Set<string>();

function isEventProcessed(eventId: string): boolean {
  return processedEvents.has(eventId);
}

function markEventAsProcessed(eventId: string): void {
  processedEvents.add(eventId);
  
  // Limpar eventos antigos para evitar memory leak
  if (processedEvents.size > 10000) {
    const eventsArray = Array.from(processedEvents);
    const toKeep = eventsArray.slice(-5000);
    processedEvents.clear();
    toKeep.forEach(id => processedEvents.add(id));
  }
}`,
    language: 'typescript'
  },
  {
    title: 'Subscription Management',
    description: 'Gerenciamento completo de assinaturas',
    code: `// lib/subscription.ts
import { stripe } from './stripe';
import Stripe from 'stripe';

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  interval: 'month' | 'year';
  features: string[];
  stripePriceId: string;
}

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'basic',
    name: 'Básico',
    description: 'Ideal para começar',
    price: 29.90,
    currency: 'brl',
    interval: 'month',
    features: ['10 projetos', 'Suporte por email', '5GB storage'],
    stripePriceId: 'price_basic_monthly'
  },
  {
    id: 'pro',
    name: 'Profissional',
    description: 'Para equipes pequenas',
    price: 79.90,
    currency: 'brl',
    interval: 'month',
    features: ['Projetos ilimitados', 'Suporte prioritário', '50GB storage', 'Analytics'],
    stripePriceId: 'price_pro_monthly'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Para grandes empresas',
    price: 199.90,
    currency: 'brl',
    interval: 'month',
    features: ['Tudo do Pro', 'Suporte 24/7', 'Storage ilimitado', 'API access'],
    stripePriceId: 'price_enterprise_monthly'
  }
];

export class SubscriptionService {
  // Criar assinatura
  static async createSubscription({
    customerId,
    priceId,
    paymentMethodId,
    trialDays = 0
  }: {
    customerId: string;
    priceId: string;
    paymentMethodId?: string;
    trialDays?: number;
  }) {
    try {
      const subscriptionData: Stripe.SubscriptionCreateParams = {
        customer: customerId,
        items: [{ price: priceId }],
        payment_behavior: 'default_incomplete',
        payment_settings: {
          save_default_payment_method: 'on_subscription',
        },
        expand: ['latest_invoice.payment_intent'],
      };

      // Adicionar período de teste se especificado
      if (trialDays > 0) {
        subscriptionData.trial_period_days = trialDays;
      }

      // Adicionar método de pagamento se fornecido
      if (paymentMethodId) {
        subscriptionData.default_payment_method = paymentMethodId;
      }

      const subscription = await stripe.subscriptions.create(subscriptionData);

      return {
        subscriptionId: subscription.id,
        clientSecret: (subscription.latest_invoice as Stripe.Invoice)?.payment_intent?.client_secret,
        status: subscription.status
      };
    } catch (error: any) {
      throw new Error(\`Erro ao criar assinatura: \${error.message}\`);
    }
  }

  // Atualizar assinatura (upgrade/downgrade)
  static async updateSubscription({
    subscriptionId,
    newPriceId,
    prorationBehavior = 'create_prorations'
  }: {
    subscriptionId: string;
    newPriceId: string;
    prorationBehavior?: 'create_prorations' | 'none' | 'always_invoice';
  }) {
    try {
      // Buscar assinatura atual
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      
      if (!subscription.items.data[0]) {
        throw new Error('Assinatura não encontrada');
      }

      // Atualizar assinatura
      const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
        items: [{
          id: subscription.items.data[0].id,
          price: newPriceId,
        }],
        proration_behavior: prorationBehavior,
      });

      return updatedSubscription;
    } catch (error: any) {
      throw new Error(\`Erro ao atualizar assinatura: \${error.message}\`);
    }
  }

  // Cancelar assinatura
  static async cancelSubscription({
    subscriptionId,
    cancelAtPeriodEnd = true,
    reason
  }: {
    subscriptionId: string;
    cancelAtPeriodEnd?: boolean;
    reason?: string;
  }) {
    try {
      if (cancelAtPeriodEnd) {
        // Cancelar no final do período
        const subscription = await stripe.subscriptions.update(subscriptionId, {
          cancel_at_period_end: true,
          metadata: {
            cancellation_reason: reason || 'user_requested'
          }
        });
        return subscription;
      } else {
        // Cancelar imediatamente
        const subscription = await stripe.subscriptions.cancel(subscriptionId, {
          prorate: true
        });
        return subscription;
      }
    } catch (error: any) {
      throw new Error(\`Erro ao cancelar assinatura: \${error.message}\`);
    }
  }

  // Reativar assinatura cancelada
  static async reactivateSubscription(subscriptionId: string) {
    try {
      const subscription = await stripe.subscriptions.update(subscriptionId, {
        cancel_at_period_end: false
      });
      return subscription;
    } catch (error: any) {
      throw new Error(\`Erro ao reativar assinatura: \${error.message}\`);
    }
  }

  // Buscar assinaturas do cliente
  static async getCustomerSubscriptions(customerId: string) {
    try {
      const subscriptions = await stripe.subscriptions.list({
        customer: customerId,
        status: 'all',
        expand: ['data.default_payment_method']
      });
      return subscriptions.data;
    } catch (error: any) {
      throw new Error(\`Erro ao buscar assinaturas: \${error.message}\`);
    }
  }

  // Buscar faturas do cliente
  static async getCustomerInvoices(customerId: string, limit: number = 10) {
    try {
      const invoices = await stripe.invoices.list({
        customer: customerId,
        limit
      });
      return invoices.data;
    } catch (error: any) {
      throw new Error(\`Erro ao buscar faturas: \${error.message}\`);
    }
  }

  // Criar portal do cliente
  static async createCustomerPortal({
    customerId,
    returnUrl
  }: {
    customerId: string;
    returnUrl: string;
  }) {
    try {
      const portalSession = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: returnUrl,
      });
      return portalSession.url;
    } catch (error: any) {
      throw new Error(\`Erro ao criar portal: \${error.message}\`);
    }
  }

  // Aplicar cupom de desconto
  static async applyCoupon(subscriptionId: string, couponId: string) {
    try {
      const subscription = await stripe.subscriptions.update(subscriptionId, {
        coupon: couponId
      });
      return subscription;
    } catch (error: any) {
      throw new Error(\`Erro ao aplicar cupom: \${error.message}\`);
    }
  }

  // Remover cupom
  static async removeCoupon(subscriptionId: string) {
    try {
      const subscription = await stripe.subscriptions.update(subscriptionId, {
        coupon: ''
      });
      return subscription;
    } catch (error: any) {
      throw new Error(\`Erro ao remover cupom: \${error.message}\`);
    }
  }
}

// API Routes para assinaturas
// app/api/subscriptions/create/route.ts
export async function POST(request: NextRequest) {
  try {
    const { customerId, priceId, paymentMethodId, trialDays } = await request.json();

    const result = await SubscriptionService.createSubscription({
      customerId,
      priceId,
      paymentMethodId,
      trialDays
    });

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}

// app/api/subscriptions/[id]/cancel/route.ts
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { cancelAtPeriodEnd, reason } = await request.json();

    const subscription = await SubscriptionService.cancelSubscription({
      subscriptionId: params.id,
      cancelAtPeriodEnd,
      reason
    });

    return NextResponse.json(subscription);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}`,
    language: 'typescript'
  }
];

const bestPractices = [
  {
    title: 'Segurança',
    description: 'Práticas de segurança essenciais',
    icon: <Shield className="w-5 h-5 text-green-600" />,
    practices: [
      'Nunca exponha chaves secretas no frontend',
      'Sempre valide webhooks com assinatura',
      'Use HTTPS em produção',
      'Implemente rate limiting nas APIs'
    ]
  },
  {
    title: 'Error Handling',
    description: 'Tratamento robusto de erros',
    icon: <AlertTriangle className="w-5 h-5 text-yellow-600" />,
    practices: [
      'Capture e trate erros específicos do Stripe',
      'Implemente retry logic para falhas temporárias',
      'Log erros para debugging',
      'Forneça mensagens de erro claras ao usuário'
    ]
  },
  {
    title: 'Performance',
    description: 'Otimizações de performance',
    icon: <Zap className="w-5 h-5 text-blue-600" />,
    practices: [
      'Use webhooks para processamento assíncrono',
      'Implemente cache para dados frequentes',
      'Otimize chamadas à API do Stripe',
      'Use paginação para listas grandes'
    ]
  },
  {
    title: 'Testing',
    description: 'Estratégias de teste',
    icon: <CheckCircle className="w-5 h-5 text-purple-600" />,
    practices: [
      'Use test cards do Stripe',
      'Teste webhooks com Stripe CLI',
      'Implemente testes de integração',
      'Teste cenários de falha'
    ]
  }
];

export default function StripePage() {
  const [selectedExample, setSelectedExample] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs />
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <CreditCard className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Stripe Integration
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Integração completa com Stripe para pagamentos seguros, assinaturas e gestão de clientes em aplicações Next.js.
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
                    ? 'bg-blue-600 text-white'
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
              {stripeFeatures.map((feature, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-blue-50 rounded-lg mr-3">
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

            {/* Integration Steps */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Passos para Integração</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { step: '1', title: 'Configurar Conta', desc: 'Criar conta no Stripe e obter chaves API' },
                  { step: '2', title: 'Instalar SDK', desc: 'Instalar bibliotecas do Stripe' },
                  { step: '3', title: 'Implementar Frontend', desc: 'Criar formulários de pagamento' },
                  { step: '4', title: 'Configurar Webhooks', desc: 'Processar eventos do Stripe' }
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                      <span className="text-blue-600 font-semibold">{item.step}</span>
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
              <p className="text-gray-600">Implementações completas com Stripe</p>
            </div>
            
            <div className="flex border-b border-gray-100 overflow-x-auto">
              {codeExamples.map((example, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedExample(index)}
                  className={`flex-shrink-0 p-4 text-left transition-colors min-w-[200px] ${
                    selectedExample === index
                      ? 'bg-blue-50 border-b-2 border-blue-600 text-blue-700'
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

        {/* Getting Started */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Comece com Stripe hoje</h2>
            <p className="text-blue-100 mb-6">
              Integre pagamentos seguros em minutos com nossa documentação completa e exemplos práticos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://stripe.com/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                <Code className="w-5 h-5 mr-2" />
                Documentação Stripe
              </a>
              <a 
                href="https://dashboard.stripe.com/register"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-blue-700 text-white rounded-lg font-medium hover:bg-blue-800 transition-colors"
              >
                <Play className="w-5 h-5 mr-2" />
                Criar Conta Stripe
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}