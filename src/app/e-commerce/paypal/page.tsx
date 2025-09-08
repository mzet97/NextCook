'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  Shield, 
  Globe, 
  Zap,
  CheckCircle,
  AlertTriangle,
  Info
} from 'lucide-react';
import { DemoCardStatic } from '@/components/DemoCardStatic';
import { DemoSection } from '@/components/DemoSection';

const paypalFeatures = [
  {
    title: 'PayPal SDK',
    description: 'Integração oficial do PayPal',
    icon: CreditCard,
    color: 'text-blue-500',
    benefits: ['API Oficial', 'Documentação Completa', 'Suporte Ativo', 'Atualizações Regulares']
  },
  {
    title: 'Checkout Experience',
    description: 'Experiência de checkout otimizada',
    icon: Zap,
    color: 'text-yellow-500',
    benefits: ['One-Click Payment', 'Mobile Optimized', 'Guest Checkout', 'Express Checkout']
  },
  {
    title: 'Security & Compliance',
    description: 'Segurança e conformidade PCI',
    icon: Shield,
    color: 'text-green-500',
    benefits: ['PCI Compliance', 'Fraud Protection', 'Buyer Protection', 'Seller Protection']
  },
  {
    title: 'Global Reach',
    description: 'Alcance global com múltiplas moedas',
    icon: Globe,
    color: 'text-purple-500',
    benefits: ['200+ Countries', '25+ Currencies', 'Local Payment Methods', 'Multi-language']
  }
];

const paymentMethods = [
  {
    name: 'PayPal Wallet',
    description: 'Pagamento com conta PayPal',
    icon: '💳',
    features: ['Login rápido', 'Dados salvos', 'Proteção ao comprador', 'Histórico de transações']
  },
  {
    name: 'Credit/Debit Cards',
    description: 'Cartões de crédito e débito',
    icon: '💰',
    features: ['Visa, Mastercard, Amex', 'Processamento seguro', 'Validação em tempo real', 'Tokenização']
  },
  {
    name: 'PayPal Credit',
    description: 'Financiamento e parcelamento',
    icon: '📊',
    features: ['Parcelamento sem juros', 'Aprovação instantânea', 'Limites flexíveis', 'Gestão de crédito']
  },
  {
    name: 'Alternative Payments',
    description: 'Métodos de pagamento alternativos',
    icon: '🏦',
    features: ['Bank transfers', 'Digital wallets', 'Buy now, pay later', 'Local methods']
  }
];

const integrationExamples = [
  {
    title: 'PayPal JavaScript SDK',
    description: 'Integração básica com JavaScript SDK',
    code: `// Instalar PayPal SDK
npm install @paypal/react-paypal-js

// Configurar PayPal Provider
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const initialOptions = {
  'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
  currency: 'BRL',
  intent: 'capture',
  'data-client-token': 'client_token',
  'enable-funding': 'venmo,paylater',
  'disable-funding': '',
  'data-sdk-integration-source': 'integrationbuilder_sc',
};

function PayPalProvider({ children }) {
  return (
    <PayPalScriptProvider options={initialOptions}>
      {children}
    </PayPalScriptProvider>
  );
}

// Componente de Checkout
function PayPalCheckout({ amount, onSuccess, onError }) {
  return (
    <PayPalButtons
      style={{
        shape: 'rect',
        color: 'gold',
        layout: 'vertical',
        label: 'paypal',
      }}
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                currency_code: 'BRL',
                value: amount.toString(),
              },
            },
          ],
        });
      }}
      onApprove={async (data, actions) => {
        try {
          const details = await actions.order.capture();
          onSuccess(details);
        } catch (error) {
          onError(error);
        }
      }}
      onError={onError}
    />
  );
}`
  },
  {
    title: 'Server-side Integration',
    description: 'Integração no backend com Node.js',
    code: `// Instalar PayPal SDK para Node.js
npm install @paypal/checkout-server-sdk

// Configurar PayPal Client
const paypal = require('@paypal/checkout-server-sdk');

// Configuração do ambiente
function environment() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  
  return process.env.NODE_ENV === 'production'
    ? new paypal.core.LiveEnvironment(clientId, clientSecret)
    : new paypal.core.SandboxEnvironment(clientId, clientSecret);
}

function client() {
  return new paypal.core.PayPalHttpClient(environment());
}

// Criar ordem
async function createOrder(amount, currency = 'BRL') {
  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer('return=representation');
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [{
      amount: {
        currency_code: currency,
        value: amount
      }
    }]
  });
  
  try {
    const order = await client().execute(request);
    return order.result;
  } catch (error) {
    console.error('Erro ao criar ordem:', error);
    throw error;
  }
}

// Capturar pagamento
async function captureOrder(orderId) {
  const request = new paypal.orders.OrdersCaptureRequest(orderId);
  request.requestBody({});
  
  try {
    const capture = await client().execute(request);
    return capture.result;
  } catch (error) {
    console.error('Erro ao capturar ordem:', error);
    throw error;
  }
}

// API Routes (Next.js)
// pages/api/paypal/create-order.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  
  try {
    const { amount } = req.body;
    const order = await createOrder(amount);
    res.status(200).json({ id: order.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// pages/api/paypal/capture-order.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  
  try {
    const { orderId } = req.body;
    const capture = await captureOrder(orderId);
    res.status(200).json(capture);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}`
  },
  {
    title: 'Webhook Integration',
    description: 'Configuração de webhooks para notificações',
    code: `// Configurar webhook endpoint
// pages/api/paypal/webhook.js
import crypto from 'crypto';

function verifyWebhookSignature(headers, body, webhookId) {
  const signature = headers['paypal-transmission-sig'];
  const certId = headers['paypal-cert-id'];
  const timestamp = headers['paypal-transmission-time'];
  
  // Verificar assinatura (implementação simplificada)
  // Em produção, use a biblioteca oficial do PayPal
  return true; // Placeholder
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  
  try {
    const webhookId = process.env.PAYPAL_WEBHOOK_ID;
    const isValid = verifyWebhookSignature(req.headers, req.body, webhookId);
    
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid signature' });
    }
    
    const event = req.body;
    
    switch (event.event_type) {
      case 'PAYMENT.CAPTURE.COMPLETED':
        await handlePaymentCompleted(event);
        break;
        
      case 'PAYMENT.CAPTURE.DENIED':
        await handlePaymentDenied(event);
        break;
        
      case 'PAYMENT.CAPTURE.REFUNDED':
        await handlePaymentRefunded(event);
        break;
        
      default:
        console.log('Evento não tratado:', event.event_type);
    }
    
    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Erro no webhook:', error);
    res.status(500).json({ error: error.message });
  }
}

async function handlePaymentCompleted(event) {
  const payment = event.resource;
  const orderId = payment.supplementary_data.related_ids.order_id;
  
  // Atualizar status do pedido no banco de dados
  await updateOrderStatus(orderId, 'completed');
  
  // Enviar email de confirmação
  await sendConfirmationEmail(orderId);
  
  // Processar entrega/fulfillment
  await processOrderFulfillment(orderId);
}

async function handlePaymentDenied(event) {
  const payment = event.resource;
  const orderId = payment.supplementary_data.related_ids.order_id;
  
  // Atualizar status do pedido
  await updateOrderStatus(orderId, 'failed');
  
  // Notificar cliente
  await notifyPaymentFailure(orderId);
}

async function handlePaymentRefunded(event) {
  const refund = event.resource;
  const captureId = refund.links.find(link => link.rel === 'up').href.split('/').pop();
  
  // Processar reembolso
  await processRefund(captureId, refund.amount.value);
  
  // Notificar cliente
  await notifyRefund(captureId);
}`
  },
  {
    title: 'Advanced Features',
    description: 'Recursos avançados e customizações',
    code: `// Configuração avançada do PayPal
const advancedOptions = {
  'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
  currency: 'BRL',
  intent: 'capture',
  
  // Habilitar métodos de pagamento específicos
  'enable-funding': 'venmo,paylater,card',
  'disable-funding': 'credit',
  
  // Configurações de localização
  locale: 'pt_BR',
  
  // Configurações de debug
  debug: process.env.NODE_ENV === 'development',
  
  // Configurações de componentes
  components: 'buttons,hosted-fields,marks',
  
  // Configurações de dados
  'data-client-token': 'client_token',
  'data-user-id-token': 'user_id_token',
};

// PayPal com campos customizados (Hosted Fields)
function CustomPayPalForm() {
  const [cardFieldsForm, setCardFieldsForm] = useState(null);
  const [billingAddress, setBillingAddress] = useState({});
  
  useEffect(() => {
    if (window.paypal) {
      window.paypal.HostedFields.render({
        createOrder: function() {
          return fetch('/api/paypal/create-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: '100.00' })
          }).then(res => res.json()).then(data => data.id);
        },
        
        styles: {
          '.valid': { 'color': 'green' },
          '.invalid': { 'color': 'red' }
        },
        
        fields: {
          number: {
            selector: '#card-number',
            placeholder: '4111 1111 1111 1111'
          },
          cvv: {
            selector: '#cvv',
            placeholder: '123'
          },
          expirationDate: {
            selector: '#expiration-date',
            placeholder: 'MM/YY'
          }
        }
      }).then(function(cardFields) {
        setCardFieldsForm(cardFields);
        
        cardFields.on('validityChange', function(event) {
          const field = event.fields[event.emittedBy];
          if (field.isValid) {
            // Campo válido
          } else {
            // Campo inválido
          }
        });
      });
    }
  }, []);
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (cardFieldsForm) {
      cardFieldsForm.submit({
        billingAddress: billingAddress
      }).then(function(payload) {
        // Processar pagamento
        console.log('Pagamento processado:', payload);
      }).catch(function(error) {
        console.error('Erro no pagamento:', error);
      });
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div id="card-number"></div>
      <div id="expiration-date"></div>
      <div id="cvv"></div>
      
      <input
        type="text"
        placeholder="Nome no cartão"
        onChange={(e) => setBillingAddress({...billingAddress, name: e.target.value})}
      />
      
      <button type="submit">Pagar com Cartão</button>
    </form>
  );
}

// Subscription/Recurring Payments
async function createSubscription(planId, subscriberInfo) {
  const request = new paypal.subscriptions.SubscriptionsCreateRequest();
  request.requestBody({
    plan_id: planId,
    subscriber: subscriberInfo,
    application_context: {
      brand_name: 'Minha Loja',
      locale: 'pt-BR',
      shipping_preference: 'SET_PROVIDED_ADDRESS',
      user_action: 'SUBSCRIBE_NOW',
      payment_method: {
        payer_selected: 'PAYPAL',
        payee_preferred: 'IMMEDIATE_PAYMENT_REQUIRED'
      },
      return_url: 'https://meusite.com/success',
      cancel_url: 'https://meusite.com/cancel'
    }
  });
  
  try {
    const subscription = await client().execute(request);
    return subscription.result;
  } catch (error) {
    console.error('Erro ao criar assinatura:', error);
    throw error;
  }
}

// Refund/Partial Refund
async function refundPayment(captureId, amount = null) {
  const request = new paypal.payments.CapturesRefundRequest(captureId);
  
  if (amount) {
    request.requestBody({
      amount: {
        currency_code: 'BRL',
        value: amount
      },
      note_to_payer: 'Reembolso processado'
    });
  }
  
  try {
    const refund = await client().execute(request);
    return refund.result;
  } catch (error) {
    console.error('Erro ao processar reembolso:', error);
    throw error;
  }
}`
  }
];

export default function PayPalPage() {
  const [selectedExample, setSelectedExample] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const simulatePayment = async () => {
    setIsProcessing(true);
    
    // Simular processamento
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-yellow-500 rounded-2xl mb-6">
            <CreditCard className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-yellow-600 bg-clip-text text-transparent mb-4">
            PayPal Integration
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Integração completa com PayPal para pagamentos seguros e experiência otimizada
          </p>
        </motion.div>

        {/* Features */}
        <DemoSection title="Recursos do PayPal" description="Principais funcionalidades da integração PayPal">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-1.5 mb-8">
            {paypalFeatures.map((feature, index) => {
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

        {/* Payment Methods */}
        <DemoSection title="Métodos de Pagamento" description="Opções de pagamento suportadas pelo PayPal">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-1.5">
            {paymentMethods.map((method, index) => (
              <motion.div
                key={method.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <DemoCardStatic title={method.name} description={method.description}>
                  <div className="space-y-4">
                    <div className="text-4xl text-center">{method.icon}</div>
                    <div className="space-y-2">
                      {method.features.map((feature, idx) => (
                        <div key={idx} className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 flex-shrink-0"></div>
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
        <DemoSection title="Exemplos de Integração" description="Implementações práticas com PayPal">
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {integrationExamples.map((example, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedExample(index)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedExample === index
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {example.title}
                </button>
              ))}
            </div>
            
            <DemoCardStatic 
              title={integrationExamples[selectedExample].title} 
              description={integrationExamples[selectedExample].description}
            >
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-green-400 text-sm">
                  <code>{integrationExamples[selectedExample].code}</code>
                </pre>
              </div>
            </DemoCardStatic>
          </div>
        </DemoSection>

        {/* Demo */}
        <DemoSection title="Demo PayPal" description="Simulação de pagamento com PayPal">
          <DemoCardStatic title="PayPal Payment Demo" description="Simule um pagamento com PayPal">
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Resumo do Pedido</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Produto Demo</span>
                    <span>R$ 99,90</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Frete</span>
                    <span>R$ 10,00</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-semibold">
                    <span>Total</span>
                    <span>R$ 109,90</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={simulatePayment}
                disabled={isProcessing}
                className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-yellow-500 text-white rounded-lg hover:from-blue-600 hover:to-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processando...
                  </>
                ) : (
                  <>
                    <CreditCard className="h-5 w-5 mr-2" />
                    Pagar com PayPal
                  </>
                )}
              </button>
              
              {isProcessing && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <div className="flex items-center text-blue-700 dark:text-blue-300">
                    <Info className="h-5 w-5 mr-2" />
                    <span className="text-sm">Redirecionando para PayPal...</span>
                  </div>
                </div>
              )}
            </div>
          </DemoCardStatic>
        </DemoSection>

        {/* Best Practices */}
        <DemoSection title="Melhores Práticas" description="Diretrizes para integração PayPal">
          <div className="grid md:grid-cols-2 gap-1.5">
            <DemoCardStatic title="✅ Recomendações" description="Práticas recomendadas">
              <div className="space-y-3">
                {[
                  'Use o ambiente Sandbox para testes',
                  'Implemente verificação de webhooks',
                  'Configure timeout adequado para requests',
                  'Trate todos os estados de pagamento',
                  'Use HTTPS em produção',
                  'Implemente retry logic para falhas',
                  'Monitore transações em tempo real',
                  'Configure logs detalhados'
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
                  'Não armazenar dados de cartão',
                  'Não ignorar notificações de webhook',
                  'Não usar credenciais em código',
                  'Não processar pagamentos sem validação',
                  'Não ignorar erros de API',
                  'Não fazer polling desnecessário',
                  'Não expor informações sensíveis',
                  'Não pular testes de integração'
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
        <DemoSection title="Como Começar" description="Setup inicial da integração PayPal">
          <div className="grid md:grid-cols-2 gap-1.5">
            <DemoCardStatic title="Configuração Inicial" description="Setup do ambiente PayPal">
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-green-400 text-sm">
                  <code>{`# 1. Criar conta PayPal Developer
# https://developer.paypal.com

# 2. Criar aplicação
# Dashboard > My Apps & Credentials > Create App

# 3. Obter credenciais
# Client ID (público)
# Client Secret (privado)

# 4. Configurar variáveis de ambiente
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_client_id
PAYPAL_CLIENT_SECRET=your_client_secret
PAYPAL_WEBHOOK_ID=your_webhook_id

# 5. Instalar dependências
npm install @paypal/react-paypal-js
npm install @paypal/checkout-server-sdk

# 6. Configurar webhooks
# Dashboard > Webhooks > Create Webhook
# URL: https://yoursite.com/api/paypal/webhook
# Events: PAYMENT.CAPTURE.COMPLETED, etc.`}</code>
                </pre>
              </div>
            </DemoCardStatic>

            <DemoCardStatic title="Checklist de Produção" description="Itens para deploy em produção">
              <div className="space-y-3">
                {[
                  { item: 'Credenciais de produção configuradas', done: false },
                  { item: 'Webhooks configurados e testados', done: false },
                  { item: 'SSL/HTTPS habilitado', done: false },
                  { item: 'Logs e monitoramento implementados', done: false },
                  { item: 'Testes de integração passando', done: false },
                  { item: 'Tratamento de erros implementado', done: false },
                  { item: 'Backup e recovery configurados', done: false },
                  { item: 'Documentação atualizada', done: false }
                ].map((check, index) => (
                  <div key={index} className="flex items-center">
                    <input 
                      type="checkbox" 
                      checked={check.done}
                      className="mr-3 h-4 w-4 text-blue-600 rounded"
                      readOnly
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{check.item}</span>
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