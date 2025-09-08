'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  Calendar, 
  RefreshCw, 
  DollarSign,
  CheckCircle,
  AlertTriangle,
  Play,
  Pause,
  Users,
  BarChart3,
  Settings,
  Bell
} from 'lucide-react';
import { DemoCardStatic } from '@/components/DemoCardStatic';
import { DemoSection } from '@/components/DemoSection';

const subscriptionFeatures = [
  {
    title: 'Recurring Billing',
    description: 'Cobrança automática recorrente',
    icon: RefreshCw,
    color: 'text-blue-500',
    benefits: ['Automação Completa', 'Múltiplas Frequências', 'Retry Logic', 'Dunning Management']
  },
  {
    title: 'Plan Management',
    description: 'Gestão flexível de planos',
    icon: Settings,
    color: 'text-green-500',
    benefits: ['Múltiplos Planos', 'Upgrades/Downgrades', 'Promoções', 'Customização']
  },
  {
    title: 'Customer Portal',
    description: 'Portal do cliente para autogestão',
    icon: Users,
    color: 'text-purple-500',
    benefits: ['Self-Service', 'Billing History', 'Plan Changes', 'Payment Methods']
  },
  {
    title: 'Analytics & Reporting',
    description: 'Métricas e relatórios detalhados',
    icon: BarChart3,
    color: 'text-orange-500',
    benefits: ['MRR/ARR Tracking', 'Churn Analysis', 'Revenue Reports', 'Customer Insights']
  }
];

const subscriptionModels = [
  {
    name: 'Freemium',
    description: 'Plano gratuito com upgrades pagos',
    icon: '🆓',
    features: ['Plano básico gratuito', 'Recursos limitados', 'Upgrade para premium', 'Conversão gradual']
  },
  {
    name: 'Tiered Pricing',
    description: 'Múltiplos níveis de preço',
    icon: '📊',
    features: ['Básico, Pro, Enterprise', 'Recursos escalonados', 'Preços crescentes', 'Flexibilidade de escolha']
  },
  {
    name: 'Usage-Based',
    description: 'Cobrança baseada no uso',
    icon: '📈',
    features: ['Pay-as-you-go', 'Métricas de uso', 'Limites flexíveis', 'Escalabilidade automática']
  },
  {
    name: 'Hybrid Model',
    description: 'Combinação de modelos',
    icon: '🔄',
    features: ['Base fixa + variável', 'Múltiplas métricas', 'Flexibilidade máxima', 'Customização total']
  }
];

const implementationExamples = [
  {
    title: 'Stripe Subscriptions',
    description: 'Implementação com Stripe para assinaturas',
    code: `// Configurar Stripe
npm install stripe @stripe/stripe-js

// Criar produtos e preços no Stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Criar produto
const product = await stripe.products.create({
  name: 'Plano Pro',
  description: 'Acesso completo à plataforma',
  metadata: {
    features: 'unlimited_projects,priority_support,advanced_analytics'
  }
});

// Criar preços recorrentes
const monthlyPrice = await stripe.prices.create({
  product: product.id,
  unit_amount: 2990, // R$ 29,90
  currency: 'brl',
  recurring: {
    interval: 'month',
    interval_count: 1
  },
  metadata: {
    billing_period: 'monthly'
  }
});

const yearlyPrice = await stripe.prices.create({
  product: product.id,
  unit_amount: 29900, // R$ 299,00 (desconto anual)
  currency: 'brl',
  recurring: {
    interval: 'year',
    interval_count: 1
  },
  metadata: {
    billing_period: 'yearly',
    discount: '16%'
  }
});

// Criar assinatura
async function createSubscription(customerId, priceId, trialDays = 0) {
  try {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      trial_period_days: trialDays,
      payment_behavior: 'default_incomplete',
      payment_settings: {
        save_default_payment_method: 'on_subscription'
      },
      expand: ['latest_invoice.payment_intent'],
      metadata: {
        created_by: 'web_app',
        plan_type: 'pro'
      }
    });
    
    return {
      subscriptionId: subscription.id,
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
      status: subscription.status
    };
  } catch (error) {
    console.error('Erro ao criar assinatura:', error);
    throw error;
  }
}

// Componente React para checkout de assinatura
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

function SubscriptionCheckout({ priceId, customerId }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    
    if (!stripe || !elements) return;
    
    try {
      // Criar assinatura no backend
      const response = await fetch('/api/subscriptions/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId, customerId })
      });
      
      const { clientSecret, subscriptionId } = await response.json();
      
      // Confirmar pagamento
      const { error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: 'Cliente Teste'
          }
        }
      });
      
      if (confirmError) {
        setError(confirmError.message);
      } else {
        // Assinatura criada com sucesso
        window.location.href = '/dashboard?subscription=success';
      }
    } catch (err) {
      setError('Erro ao processar assinatura');
    } finally {
      setLoading(false);
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
                '::placeholder': { color: '#aab7c4' }
              }
            }
          }}
        />
      </div>
      
      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}
      
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg disabled:opacity-50"
      >
        {loading ? 'Processando...' : 'Assinar Agora'}
      </button>
    </form>
  );
}

function SubscriptionPage() {
  return (
    <Elements stripe={stripePromise}>
      <SubscriptionCheckout priceId="price_xxx" customerId="cus_xxx" />
    </Elements>
  );
}`
  },
  {
    title: 'Subscription Management',
    description: 'Gestão completa de assinaturas',
    code: `// API para gerenciar assinaturas
// pages/api/subscriptions/[action].js

export default async function handler(req, res) {
  const { action } = req.query;
  const { method } = req;
  
  switch (action) {
    case 'create':
      if (method === 'POST') {
        return await createSubscription(req, res);
      }
      break;
      
    case 'update':
      if (method === 'PUT') {
        return await updateSubscription(req, res);
      }
      break;
      
    case 'cancel':
      if (method === 'DELETE') {
        return await cancelSubscription(req, res);
      }
      break;
      
    case 'reactivate':
      if (method === 'POST') {
        return await reactivateSubscription(req, res);
      }
      break;
      
    default:
      return res.status(404).json({ error: 'Action not found' });
  }
}

// Atualizar assinatura (upgrade/downgrade)
async function updateSubscription(req, res) {
  try {
    const { subscriptionId, newPriceId, prorationBehavior = 'create_prorations' } = req.body;
    
    // Buscar assinatura atual
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    
    // Atualizar assinatura
    const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
      items: [{
        id: subscription.items.data[0].id,
        price: newPriceId
      }],
      proration_behavior: prorationBehavior,
      metadata: {
        ...subscription.metadata,
        last_updated: new Date().toISOString(),
        updated_by: 'customer_portal'
      }
    });
    
    // Atualizar no banco de dados
    await updateUserSubscription(subscription.customer, {
      subscriptionId: updatedSubscription.id,
      priceId: newPriceId,
      status: updatedSubscription.status,
      currentPeriodEnd: new Date(updatedSubscription.current_period_end * 1000)
    });
    
    res.status(200).json({ subscription: updatedSubscription });
  } catch (error) {
    console.error('Erro ao atualizar assinatura:', error);
    res.status(500).json({ error: error.message });
  }
}

// Cancelar assinatura
async function cancelSubscription(req, res) {
  try {
    const { subscriptionId, cancelAtPeriodEnd = true, reason } = req.body;
    
    const canceledSubscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: cancelAtPeriodEnd,
      metadata: {
        cancellation_reason: reason || 'customer_request',
        canceled_at: new Date().toISOString()
      }
    });
    
    // Se cancelamento imediato
    if (!cancelAtPeriodEnd) {
      await stripe.subscriptions.del(subscriptionId);
    }
    
    // Atualizar no banco de dados
    await updateUserSubscription(canceledSubscription.customer, {
      status: cancelAtPeriodEnd ? 'cancel_at_period_end' : 'canceled',
      canceledAt: new Date(),
      cancellationReason: reason
    });
    
    // Enviar email de confirmação
    await sendCancellationEmail(canceledSubscription.customer, {
      cancelAtPeriodEnd,
      periodEnd: new Date(canceledSubscription.current_period_end * 1000)
    });
    
    res.status(200).json({ subscription: canceledSubscription });
  } catch (error) {
    console.error('Erro ao cancelar assinatura:', error);
    res.status(500).json({ error: error.message });
  }
}

// Reativar assinatura cancelada
async function reactivateSubscription(req, res) {
  try {
    const { subscriptionId } = req.body;
    
    const reactivatedSubscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: false,
      metadata: {
        reactivated_at: new Date().toISOString(),
        reactivated_by: 'customer_request'
      }
    });
    
    // Atualizar no banco de dados
    await updateUserSubscription(reactivatedSubscription.customer, {
      status: 'active',
      reactivatedAt: new Date()
    });
    
    res.status(200).json({ subscription: reactivatedSubscription });
  } catch (error) {
    console.error('Erro ao reativar assinatura:', error);
    res.status(500).json({ error: error.message });
  }
}

// Webhook para eventos de assinatura
// pages/api/webhooks/stripe.js
export default async function handler(req, res) {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  
  let event;
  
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send('Webhook Error');
  }
  
  switch (event.type) {
    case 'customer.subscription.created':
      await handleSubscriptionCreated(event.data.object);
      break;
      
    case 'customer.subscription.updated':
      await handleSubscriptionUpdated(event.data.object);
      break;
      
    case 'customer.subscription.deleted':
      await handleSubscriptionDeleted(event.data.object);
      break;
      
    case 'invoice.payment_succeeded':
      await handlePaymentSucceeded(event.data.object);
      break;
      
    case 'invoice.payment_failed':
      await handlePaymentFailed(event.data.object);
      break;
      
    default:
      console.log('Unhandled event type:', event.type);
  }
  
  res.status(200).json({ received: true });
}

async function handleSubscriptionCreated(subscription) {
  // Ativar recursos premium para o usuário
  await activatePremiumFeatures(subscription.customer);
  
  // Enviar email de boas-vindas
  await sendWelcomeEmail(subscription.customer);
  
  // Registrar evento de conversão
  await trackConversionEvent(subscription.customer, {
    plan: subscription.items.data[0].price.id,
    amount: subscription.items.data[0].price.unit_amount,
    currency: subscription.currency
  });
}`
  },
  {
    title: 'Customer Portal',
    description: 'Portal do cliente para autogestão',
    code: `// Componente do portal do cliente
import { useState, useEffect } from 'react';

function CustomerPortal({ customerId }) {
  const [subscription, setSubscription] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadCustomerData();
  }, [customerId]);
  
  const loadCustomerData = async () => {
    try {
      const [subResponse, invoicesResponse] = await Promise.all([
        fetch(\`/api/customers/\${customerId}/subscription\`),
        fetch(\`/api/customers/\${customerId}/invoices\`)
      ]);
      
      const subData = await subResponse.json();
      const invoicesData = await invoicesResponse.json();
      
      setSubscription(subData.subscription);
      setInvoices(invoicesData.invoices);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handlePlanChange = async (newPriceId) => {
    try {
      const response = await fetch('/api/subscriptions/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subscriptionId: subscription.id,
          newPriceId
        })
      });
      
      if (response.ok) {
        await loadCustomerData(); // Recarregar dados
        alert('Plano atualizado com sucesso!');
      }
    } catch (error) {
      alert('Erro ao atualizar plano');
    }
  };
  
  const handleCancelSubscription = async () => {
    if (!confirm('Tem certeza que deseja cancelar sua assinatura?')) return;
    
    try {
      const response = await fetch('/api/subscriptions/cancel', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subscriptionId: subscription.id,
          reason: 'customer_request'
        })
      });
      
      if (response.ok) {
        await loadCustomerData();
        alert('Assinatura cancelada. Você terá acesso até o final do período atual.');
      }
    } catch (error) {
      alert('Erro ao cancelar assinatura');
    }
  };
  
  if (loading) {
    return <div className="text-center py-8">Carregando...</div>;
  }
  
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Informações da Assinatura */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Minha Assinatura</h2>
        
        {subscription ? (
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Plano Atual</label>
                <p className="text-lg font-semibold">{subscription.plan_name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <span className={\`inline-flex px-2 py-1 text-xs font-semibold rounded-full \${
                  subscription.status === 'active' ? 'bg-green-100 text-green-800' :
                  subscription.status === 'cancel_at_period_end' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }\`}>
                  {subscription.status === 'active' ? 'Ativo' :
                   subscription.status === 'cancel_at_period_end' ? 'Cancelando' :
                   'Inativo'}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Próxima Cobrança</label>
                <p>{new Date(subscription.current_period_end).toLocaleDateString('pt-BR')}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Valor</label>
                <p className="text-lg font-semibold">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(subscription.amount / 100)}
                  <span className="text-sm text-gray-500">/{subscription.interval}</span>
                </p>
              </div>
            </div>
            
            <div className="flex space-x-4 pt-4">
              <button
                onClick={() => handlePlanChange('price_premium')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Fazer Upgrade
              </button>
              
              {subscription.status === 'active' && (
                <button
                  onClick={handleCancelSubscription}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Cancelar Assinatura
                </button>
              )}
              
              {subscription.status === 'cancel_at_period_end' && (
                <button
                  onClick={() => handleReactivateSubscription()}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  Reativar Assinatura
                </button>
              )}
            </div>
          </div>
        ) : (
          <p>Nenhuma assinatura ativa encontrada.</p>
        )}
      </div>
      
      {/* Histórico de Faturas */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Histórico de Faturas</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(invoice.created * 1000).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(invoice.amount_paid / 100)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={\`inline-flex px-2 py-1 text-xs font-semibold rounded-full \${
                      invoice.status === 'paid' ? 'bg-green-100 text-green-800' :
                      invoice.status === 'open' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }\`}>
                      {invoice.status === 'paid' ? 'Pago' :
                       invoice.status === 'open' ? 'Pendente' :
                       'Falhou'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <a
                      href={invoice.hosted_invoice_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Ver Fatura
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}`
  },
  {
    title: 'Analytics & Metrics',
    description: 'Métricas e análises de assinaturas',
    code: `// Sistema de métricas para assinaturas
class SubscriptionAnalytics {
  constructor(stripeClient, database) {
    this.stripe = stripeClient;
    this.db = database;
  }
  
  // Monthly Recurring Revenue (MRR)
  async calculateMRR(date = new Date()) {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    
    const subscriptions = await this.stripe.subscriptions.list({
      status: 'active',
      created: {
        gte: Math.floor(startOfMonth.getTime() / 1000),
        lte: Math.floor(endOfMonth.getTime() / 1000)
      },
      limit: 100
    });
    
    let mrr = 0;
    
    for (const subscription of subscriptions.data) {
      const price = subscription.items.data[0].price;
      let monthlyAmount = price.unit_amount;
      
      // Converter para valor mensal
      if (price.recurring.interval === 'year') {
        monthlyAmount = monthlyAmount / 12;
      } else if (price.recurring.interval === 'week') {
        monthlyAmount = monthlyAmount * 4.33; // Média de semanas por mês
      }
      
      mrr += monthlyAmount;
    }
    
    return mrr / 100; // Converter de centavos para reais
  }
  
  // Annual Recurring Revenue (ARR)
  async calculateARR(date = new Date()) {
    const mrr = await this.calculateMRR(date);
    return mrr * 12;
  }
  
  // Churn Rate
  async calculateChurnRate(startDate, endDate) {
    const startOfPeriod = Math.floor(startDate.getTime() / 1000);
    const endOfPeriod = Math.floor(endDate.getTime() / 1000);
    
    // Assinaturas ativas no início do período
    const activeAtStart = await this.stripe.subscriptions.list({
      status: 'active',
      created: { lt: startOfPeriod },
      limit: 100
    });
    
    // Assinaturas canceladas durante o período
    const canceledDuringPeriod = await this.stripe.subscriptions.list({
      status: 'canceled',
      canceled_at: {
        gte: startOfPeriod,
        lte: endOfPeriod
      },
      limit: 100
    });
    
    const churnRate = (canceledDuringPeriod.data.length / activeAtStart.data.length) * 100;
    return churnRate;
  }
  
  // Customer Lifetime Value (CLV)
  async calculateCLV() {
    const avgMonthlyRevenue = await this.calculateAverageMonthlyRevenue();
    const avgCustomerLifespan = await this.calculateAverageCustomerLifespan();
    
    return avgMonthlyRevenue * avgCustomerLifespan;
  }
  
  // Métricas de conversão
  async getConversionMetrics(startDate, endDate) {
    const trials = await this.getTrialSignups(startDate, endDate);
    const conversions = await this.getTrialConversions(startDate, endDate);
    
    return {
      trialSignups: trials.length,
      conversions: conversions.length,
      conversionRate: (conversions.length / trials.length) * 100,
      averageTimeToConvert: this.calculateAverageTimeToConvert(conversions)
    };
  }
  
  // Dashboard de métricas
  async getDashboardMetrics() {
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    
    const [currentMRR, lastMonthMRR, currentARR, churnRate] = await Promise.all([
      this.calculateMRR(now),
      this.calculateMRR(lastMonth),
      this.calculateARR(now),
      this.calculateChurnRate(thisMonth, now)
    ]);
    
    const mrrGrowth = ((currentMRR - lastMonthMRR) / lastMonthMRR) * 100;
    
    return {
      mrr: {
        current: currentMRR,
        growth: mrrGrowth,
        trend: mrrGrowth > 0 ? 'up' : 'down'
      },
      arr: {
        current: currentARR,
        projected: currentMRR * 12
      },
      churn: {
        rate: churnRate,
        trend: churnRate < 5 ? 'good' : churnRate < 10 ? 'warning' : 'critical'
      },
      customers: {
        total: await this.getTotalActiveCustomers(),
        new: await this.getNewCustomers(thisMonth, now),
        churned: await this.getChurnedCustomers(thisMonth, now)
      }
    };
  }
}

// Uso do sistema de analytics
const analytics = new SubscriptionAnalytics(stripe, database);

// API endpoint para métricas
// pages/api/analytics/subscription-metrics.js
export default async function handler(req, res) {
  try {
    const metrics = await analytics.getDashboardMetrics();
    res.status(200).json(metrics);
  } catch (error) {
    console.error('Erro ao calcular métricas:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

// Componente React para dashboard
function SubscriptionDashboard() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch('/api/analytics/subscription-metrics')
      .then(res => res.json())
      .then(data => {
        setMetrics(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao carregar métricas:', error);
        setLoading(false);
      });
  }, []);
  
  if (loading) return <div>Carregando métricas...</div>;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1.5">
      <MetricCard
        title="MRR"
        value={formatCurrency(metrics.mrr.current)}
        growth={metrics.mrr.growth}
        trend={metrics.mrr.trend}
      />
      
      <MetricCard
        title="ARR"
        value={formatCurrency(metrics.arr.current)}
        subtitle={\`Projetado: \${formatCurrency(metrics.arr.projected)}\`}
      />
      
      <MetricCard
        title="Churn Rate"
        value={\`\${metrics.churn.rate.toFixed(2)}%\`}
        trend={metrics.churn.trend}
      />
      
      <MetricCard
        title="Clientes Ativos"
        value={metrics.customers.total}
        subtitle={\`+\${metrics.customers.new} novos este mês\`}
      />
    </div>
  );
}`
  }
];

export default function SubscriptionsPage() {
  const [selectedExample, setSelectedExample] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const simulateSubscription = async () => {
    setIsSubscribing(true);
    
    // Simular processo de assinatura
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsSubscribing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl mb-6">
            <RefreshCw className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
            Subscription Management
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Sistema completo de assinaturas com cobrança recorrente e gestão de planos
          </p>
        </motion.div>

        {/* Features */}
        <DemoSection title="Recursos de Assinatura" description="Funcionalidades essenciais para gestão de assinaturas">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-1.5 mb-8">
            {subscriptionFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <DemoCardStatic title={feature.title} description={feature.description}>
                    <div className="space-y-4">
                      <Icon className={`h-12 w-12 mx-auto ${feature.color}`} />
                      <div className="space-y-2">
                        {feature.benefits.map((benefit) => (
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

        {/* Subscription Models */}
        <DemoSection title="Modelos de Assinatura" description="Diferentes estratégias de monetização">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-1.5">
            {subscriptionModels.map((model, index) => (
              <motion.div
                key={model.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <DemoCardStatic title={model.name} description={model.description}>
                  <div className="space-y-4">
                    <div className="text-4xl text-center">{model.icon}</div>
                    <div className="space-y-2">
                      {model.features.map((feature, idx) => (
                        <div key={idx} className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 flex-shrink-0"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </DemoCardStatic>
              </motion.div>
            ))}
          </div>
        </DemoSection>

        {/* Code Examples */}
        <DemoSection title="Implementação" description="Exemplos práticos de implementação">
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {implementationExamples.map((example, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedExample(index)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedExample === index
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {example.title}
                </button>
              ))}
            </div>
            
            <DemoCardStatic 
              title={implementationExamples[selectedExample].title} 
              description={implementationExamples[selectedExample].description}
            >
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-green-400 text-sm">
                  <code>{implementationExamples[selectedExample].code}</code>
                </pre>
              </div>
            </DemoCardStatic>
          </div>
        </DemoSection>

        {/* Pricing Demo */}
        <DemoSection title="Demo de Planos" description="Simulação de seleção de planos">
          <div className="grid md:grid-cols-3 gap-1.5 mb-8">
            {[
              { name: 'Básico', price: 29.90, features: ['5 Projetos', 'Suporte Email', '10GB Storage'] },
              { name: 'Pro', price: 59.90, features: ['Projetos Ilimitados', 'Suporte Prioritário', '100GB Storage', 'Analytics Avançado'], popular: true },
              { name: 'Enterprise', price: 129.90, features: ['Tudo do Pro', 'Suporte 24/7', '1TB Storage', 'API Access', 'White Label'] }
            ].map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`relative bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 ${plan.popular ? 'ring-2 ring-purple-500' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Mais Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      R$ {plan.price.toFixed(2).replace('.', ',')}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">/mês</span>
                  </div>
                  
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    onClick={simulateSubscription}
                    disabled={isSubscribing}
                    className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                      plan.popular
                        ? 'bg-purple-600 text-white hover:bg-purple-700'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isSubscribing ? 'Processando...' : 'Assinar'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </DemoSection>

        {/* Best Practices */}
        <DemoSection title="Melhores Práticas" description="Diretrizes para gestão de assinaturas">
          <div className="grid md:grid-cols-2 gap-1.5">
            <DemoCardStatic title="✅ Recomendações" description="Práticas recomendadas">
              <div className="space-y-3">
                {[
                  'Ofereça período de teste gratuito',
                  'Implemente dunning management',
                  'Facilite upgrades e downgrades',
                  'Monitore métricas de churn',
                  'Automatize cobrança e renovação',
                  'Forneça portal de autogestão',
                  'Implemente retry logic para falhas',
                  'Mantenha comunicação transparente'
                ].map((practice, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{practice}</span>
                  </div>
                ))}
              </div>
            </DemoCardStatic>

            <DemoCardStatic title="❌ Evitar" description="Práticas a evitar">
              <div className="space-y-3">
                {[
                  'Dificultar cancelamento de assinatura',
                  'Não comunicar mudanças de preço',
                  'Ignorar falhas de pagamento',
                  'Não oferecer opções de recuperação',
                  'Cobrar sem aviso prévio',
                  'Não fornecer histórico de faturas',
                  'Ignorar feedback dos clientes',
                  'Não ter processo de retenção'
                ].map((practice, index) => (
                  <div key={index} className="flex items-start">
                    <AlertTriangle className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{practice}</span>
                  </div>
                ))}
              </div>
            </DemoCardStatic>
          </div>
        </DemoSection>

        {/* Getting Started */}
        <DemoSection title="Como Começar" description="Setup inicial de assinaturas">
          <div className="grid md:grid-cols-2 gap-1.5">
            <DemoCardStatic title="Configuração Stripe" description="Setup do Stripe para assinaturas">
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-green-400 text-sm">
                  <code>{`# 1. Instalar Stripe
npm install stripe @stripe/stripe-js
npm install @stripe/react-stripe-js

# 2. Configurar variáveis
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# 3. Criar produtos no Stripe Dashboard
# Products > Add Product
# Configure recurring prices

# 4. Configurar webhooks
# Developers > Webhooks > Add endpoint
# Events: customer.subscription.*
#         invoice.payment_*

# 5. Implementar endpoints
# /api/subscriptions/create
# /api/subscriptions/update
# /api/subscriptions/cancel
# /api/webhooks/stripe`}</code>
                </pre>
              </div>
            </DemoCardStatic>

            <DemoCardStatic title="Métricas Essenciais" description="KPIs para monitorar">
              <div className="space-y-3">
                {[
                  { metric: 'MRR (Monthly Recurring Revenue)', description: 'Receita recorrente mensal' },
                  { metric: 'ARR (Annual Recurring Revenue)', description: 'Receita recorrente anual' },
                  { metric: 'Churn Rate', description: 'Taxa de cancelamento' },
                  { metric: 'CLV (Customer Lifetime Value)', description: 'Valor do cliente ao longo da vida' },
                  { metric: 'CAC (Customer Acquisition Cost)', description: 'Custo de aquisição de cliente' },
                  { metric: 'Conversion Rate', description: 'Taxa de conversão trial → pago' }
                ].map((item, index) => (
                  <div key={index} className="border-l-4 border-purple-500 pl-4">
                    <div className="font-semibold text-sm text-gray-900 dark:text-white">{item.metric}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{item.description}</div>
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