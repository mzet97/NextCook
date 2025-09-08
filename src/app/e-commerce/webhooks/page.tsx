'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Webhook, 
  Shield, 
  Zap, 
  Bell,
  CheckCircle,
  AlertTriangle,
  Play,
  Settings,
  Lock,
  RefreshCw,
  Clock,
  Database
} from 'lucide-react';
import { DemoCardStatic } from '@/components/DemoCardStatic';
import { DemoSection } from '@/components/DemoSection';

const webhookFeatures = [
  {
    title: 'Real-time Notifications',
    description: 'Notificações em tempo real de eventos',
    icon: Bell,
    color: 'text-blue-500',
    benefits: ['Instant Updates', 'Event-Driven', 'Reliable Delivery', 'Automatic Retry']
  },
  {
    title: 'Security & Verification',
    description: 'Verificação segura de webhooks',
    icon: Shield,
    color: 'text-green-500',
    benefits: ['Signature Verification', 'HTTPS Required', 'IP Whitelisting', 'Timestamp Validation']
  },
  {
    title: 'Event Processing',
    description: 'Processamento inteligente de eventos',
    icon: Zap,
    color: 'text-yellow-500',
    benefits: ['Event Filtering', 'Batch Processing', 'Error Handling', 'Dead Letter Queue']
  },
  {
    title: 'Monitoring & Logging',
    description: 'Monitoramento e logs detalhados',
    icon: Database,
    color: 'text-purple-500',
    benefits: ['Event Logs', 'Performance Metrics', 'Error Tracking', 'Analytics Dashboard']
  }
];

const webhookEvents = [
  {
    category: 'Payment Events',
    description: 'Eventos relacionados a pagamentos',
    icon: '💳',
    events: [
      { name: 'payment.succeeded', description: 'Pagamento processado com sucesso' },
      { name: 'payment.failed', description: 'Falha no processamento do pagamento' },
      { name: 'payment.refunded', description: 'Pagamento reembolsado' },
      { name: 'payment.disputed', description: 'Pagamento contestado (chargeback)' }
    ]
  },
  {
    category: 'Order Events',
    description: 'Eventos do ciclo de vida do pedido',
    icon: '📦',
    events: [
      { name: 'order.created', description: 'Novo pedido criado' },
      { name: 'order.updated', description: 'Pedido atualizado' },
      { name: 'order.shipped', description: 'Pedido enviado' },
      { name: 'order.delivered', description: 'Pedido entregue' },
      { name: 'order.cancelled', description: 'Pedido cancelado' }
    ]
  },
  {
    category: 'Customer Events',
    description: 'Eventos relacionados a clientes',
    icon: '👤',
    events: [
      { name: 'customer.created', description: 'Novo cliente registrado' },
      { name: 'customer.updated', description: 'Dados do cliente atualizados' },
      { name: 'customer.deleted', description: 'Cliente removido' }
    ]
  },
  {
    category: 'Subscription Events',
    description: 'Eventos de assinaturas',
    icon: '🔄',
    events: [
      { name: 'subscription.created', description: 'Nova assinatura criada' },
      { name: 'subscription.updated', description: 'Assinatura modificada' },
      { name: 'subscription.cancelled', description: 'Assinatura cancelada' },
      { name: 'subscription.renewed', description: 'Assinatura renovada' }
    ]
  }
];

const implementationExamples = [
  {
    title: 'Webhook Endpoint Setup',
    description: 'Configuração básica de endpoint webhook',
    code: `// pages/api/webhooks/ecommerce.js
import crypto from 'crypto';
import { buffer } from 'micro';

// Configurar para receber raw body
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Obter raw body
    const buf = await buffer(req);
    const rawBody = buf.toString('utf8');
    
    // Verificar assinatura
    const signature = req.headers['x-signature'];
    const timestamp = req.headers['x-timestamp'];
    
    if (!verifyWebhookSignature(rawBody, signature, timestamp)) {
      return res.status(401).json({ error: 'Invalid signature' });
    }
    
    // Parse do evento
    const event = JSON.parse(rawBody);
    
    // Processar evento
    await processWebhookEvent(event);
    
    // Resposta de sucesso
    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Verificar assinatura do webhook
function verifyWebhookSignature(payload, signature, timestamp) {
  const webhookSecret = process.env.WEBHOOK_SECRET;
  
  // Verificar timestamp (evitar replay attacks)
  const currentTime = Math.floor(Date.now() / 1000);
  const eventTime = parseInt(timestamp);
  
  if (Math.abs(currentTime - eventTime) > 300) { // 5 minutos
    console.error('Webhook timestamp too old');
    return false;
  }
  
  // Criar assinatura esperada
  const expectedSignature = crypto
    .createHmac('sha256', webhookSecret)
    .update(timestamp + '.' + payload)
    .digest('hex');
  
  // Comparar assinaturas de forma segura
  return crypto.timingSafeEqual(
    Buffer.from(signature, 'hex'),
    Buffer.from(expectedSignature, 'hex')
  );
}

// Processar eventos do webhook
async function processWebhookEvent(event) {
  const { type, data, id, created_at } = event;
  
  // Log do evento
  console.log(\`Processing webhook event: \${type} (\${id})\`);
  
  // Verificar se evento já foi processado (idempotência)
  const existingEvent = await getProcessedEvent(id);
  if (existingEvent) {
    console.log(\`Event \${id} already processed, skipping\`);
    return;
  }
  
  try {
    // Processar baseado no tipo de evento
    switch (type) {
      case 'payment.succeeded':
        await handlePaymentSucceeded(data);
        break;
        
      case 'payment.failed':
        await handlePaymentFailed(data);
        break;
        
      case 'order.created':
        await handleOrderCreated(data);
        break;
        
      case 'order.shipped':
        await handleOrderShipped(data);
        break;
        
      case 'subscription.created':
        await handleSubscriptionCreated(data);
        break;
        
      case 'subscription.cancelled':
        await handleSubscriptionCancelled(data);
        break;
        
      default:
        console.log(\`Unhandled event type: \${type}\`);
    }
    
    // Marcar evento como processado
    await markEventAsProcessed(id, type, created_at);
    
  } catch (error) {
    console.error(\`Error processing event \${id}:\`, error);
    
    // Salvar erro para retry posterior
    await saveEventError(id, type, error.message);
    
    throw error; // Re-throw para trigger retry
  }
}

// Handlers específicos para cada tipo de evento
async function handlePaymentSucceeded(paymentData) {
  const { order_id, amount, currency, payment_method } = paymentData;
  
  // Atualizar status do pedido
  await updateOrderStatus(order_id, 'paid');
  
  // Enviar email de confirmação
  await sendPaymentConfirmationEmail(order_id);
  
  // Processar fulfillment
  await triggerOrderFulfillment(order_id);
  
  // Atualizar métricas
  await updatePaymentMetrics(amount, currency, payment_method);
}

async function handlePaymentFailed(paymentData) {
  const { order_id, error_code, error_message } = paymentData;
  
  // Atualizar status do pedido
  await updateOrderStatus(order_id, 'payment_failed');
  
  // Notificar cliente sobre falha
  await sendPaymentFailureEmail(order_id, error_message);
  
  // Criar task para retry de pagamento
  await createPaymentRetryTask(order_id);
}

async function handleOrderCreated(orderData) {
  const { order_id, customer_id, items, total_amount } = orderData;
  
  // Validar estoque
  await validateInventory(items);
  
  // Reservar produtos
  await reserveInventory(order_id, items);
  
  // Enviar confirmação de pedido
  await sendOrderConfirmationEmail(order_id);
  
  // Notificar equipe de fulfillment
  await notifyFulfillmentTeam(order_id);
}

async function handleOrderShipped(orderData) {
  const { order_id, tracking_number, carrier, estimated_delivery } = orderData;
  
  // Atualizar status do pedido
  await updateOrderStatus(order_id, 'shipped');
  
  // Enviar informações de rastreamento
  await sendShippingNotificationEmail(order_id, tracking_number, carrier);
  
  // Agendar notificação de entrega
  await scheduleDeliveryReminder(order_id, estimated_delivery);
}`
  },
  {
    title: 'Webhook Security',
    description: 'Implementação de segurança para webhooks',
    code: `// Middleware de segurança para webhooks
class WebhookSecurity {
  constructor(secret, options = {}) {
    this.secret = secret;
    this.timestampTolerance = options.timestampTolerance || 300; // 5 minutos
    this.signatureHeader = options.signatureHeader || 'x-signature';
    this.timestampHeader = options.timestampHeader || 'x-timestamp';
  }
  
  // Verificar assinatura HMAC
  verifySignature(payload, signature, timestamp) {
    try {
      // Verificar timestamp
      if (!this.isTimestampValid(timestamp)) {
        throw new Error('Invalid timestamp');
      }
      
      // Criar payload para assinatura
      const signedPayload = \`\${timestamp}.\${payload}\`;
      
      // Calcular assinatura esperada
      const expectedSignature = crypto
        .createHmac('sha256', this.secret)
        .update(signedPayload, 'utf8')
        .digest('hex');
      
      // Comparar assinaturas
      const providedSignature = signature.replace('sha256=', '');
      
      return crypto.timingSafeEqual(
        Buffer.from(expectedSignature, 'hex'),
        Buffer.from(providedSignature, 'hex')
      );
    } catch (error) {
      console.error('Signature verification failed:', error);
      return false;
    }
  }
  
  // Verificar se timestamp é válido
  isTimestampValid(timestamp) {
    const now = Math.floor(Date.now() / 1000);
    const eventTime = parseInt(timestamp);
    
    return Math.abs(now - eventTime) <= this.timestampTolerance;
  }
  
  // Middleware Express/Next.js
  middleware() {
    return async (req, res, next) => {
      try {
        const signature = req.headers[this.signatureHeader];
        const timestamp = req.headers[this.timestampHeader];
        
        if (!signature || !timestamp) {
          return res.status(401).json({ 
            error: 'Missing signature or timestamp' 
          });
        }
        
        // Obter raw body
        const rawBody = req.rawBody || req.body;
        
        if (!this.verifySignature(rawBody, signature, timestamp)) {
          return res.status(401).json({ 
            error: 'Invalid signature' 
          });
        }
        
        // Adicionar dados verificados ao request
        req.webhookVerified = true;
        req.webhookTimestamp = timestamp;
        
        next();
      } catch (error) {
        console.error('Webhook security middleware error:', error);
        res.status(500).json({ error: 'Security verification failed' });
      }
    };
  }
}

// Rate limiting para webhooks
class WebhookRateLimit {
  constructor(options = {}) {
    this.windowMs = options.windowMs || 60000; // 1 minuto
    this.maxRequests = options.maxRequests || 100;
    this.requests = new Map();
  }
  
  isAllowed(identifier) {
    const now = Date.now();
    const windowStart = now - this.windowMs;
    
    // Limpar requests antigas
    this.cleanupOldRequests(windowStart);
    
    // Obter requests do identificador
    const userRequests = this.requests.get(identifier) || [];
    
    // Filtrar requests dentro da janela
    const recentRequests = userRequests.filter(time => time > windowStart);
    
    if (recentRequests.length >= this.maxRequests) {
      return false;
    }
    
    // Adicionar request atual
    recentRequests.push(now);
    this.requests.set(identifier, recentRequests);
    
    return true;
  }
  
  cleanupOldRequests(windowStart) {
    for (const [identifier, requests] of this.requests.entries()) {
      const recentRequests = requests.filter(time => time > windowStart);
      
      if (recentRequests.length === 0) {
        this.requests.delete(identifier);
      } else {
        this.requests.set(identifier, recentRequests);
      }
    }
  }
  
  middleware() {
    return (req, res, next) => {
      const identifier = req.ip || req.connection.remoteAddress;
      
      if (!this.isAllowed(identifier)) {
        return res.status(429).json({ 
          error: 'Too many requests' 
        });
      }
      
      next();
    };
  }
}

// IP Whitelisting
class WebhookIPWhitelist {
  constructor(allowedIPs = []) {
    this.allowedIPs = new Set(allowedIPs);
  }
  
  addIP(ip) {
    this.allowedIPs.add(ip);
  }
  
  removeIP(ip) {
    this.allowedIPs.delete(ip);
  }
  
  isAllowed(ip) {
    // Se não há IPs configurados, permitir todos
    if (this.allowedIPs.size === 0) {
      return true;
    }
    
    return this.allowedIPs.has(ip);
  }
  
  middleware() {
    return (req, res, next) => {
      const clientIP = req.ip || 
                      req.connection.remoteAddress ||
                      req.headers['x-forwarded-for']?.split(',')[0]?.trim();
      
      if (!this.isAllowed(clientIP)) {
        console.warn(\`Blocked webhook request from IP: \${clientIP}\`);
        return res.status(403).json({ 
          error: 'IP not allowed' 
        });
      }
      
      next();
    };
  }
}

// Uso combinado dos middlewares de segurança
const webhookSecurity = new WebhookSecurity(process.env.WEBHOOK_SECRET);
const webhookRateLimit = new WebhookRateLimit({ maxRequests: 50 });
const webhookIPWhitelist = new WebhookIPWhitelist([
  '192.168.1.100',
  '10.0.0.50'
]);

// Aplicar middlewares
app.use('/api/webhooks', webhookIPWhitelist.middleware());
app.use('/api/webhooks', webhookRateLimit.middleware());
app.use('/api/webhooks', webhookSecurity.middleware());

// Endpoint protegido
app.post('/api/webhooks/ecommerce', async (req, res) => {
  // Webhook já foi verificado pelos middlewares
  const event = req.body;
  
  try {
    await processWebhookEvent(event);
    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ error: 'Processing failed' });
  }
});`
  },
  {
    title: 'Retry & Error Handling',
    description: 'Sistema de retry e tratamento de erros',
    code: `// Sistema de retry para webhooks
class WebhookRetrySystem {
  constructor(options = {}) {
    this.maxRetries = options.maxRetries || 5;
    this.baseDelay = options.baseDelay || 1000; // 1 segundo
    this.maxDelay = options.maxDelay || 300000; // 5 minutos
    this.backoffMultiplier = options.backoffMultiplier || 2;
  }
  
  // Calcular delay para retry com exponential backoff
  calculateDelay(attempt) {
    const delay = this.baseDelay * Math.pow(this.backoffMultiplier, attempt - 1);
    return Math.min(delay, this.maxDelay);
  }
  
  // Processar webhook com retry automático
  async processWithRetry(webhookData, processor) {
    let lastError;
    
    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        await processor(webhookData);
        
        // Sucesso - marcar como processado
        await this.markAsProcessed(webhookData.id);
        return;
        
      } catch (error) {
        lastError = error;
        
        console.error(\`Webhook processing failed (attempt \${attempt}/\${this.maxRetries}):\`, error);
        
        // Se não é o último attempt, aguardar antes do retry
        if (attempt < this.maxRetries) {
          const delay = this.calculateDelay(attempt);
          console.log(\`Retrying in \${delay}ms...\`);
          await this.sleep(delay);
        }
      }
    }
    
    // Todos os retries falharam
    await this.handleFinalFailure(webhookData, lastError);
    throw new Error(\`Webhook processing failed after \${this.maxRetries} attempts\`);
  }
  
  // Aguardar delay
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  // Marcar webhook como processado
  async markAsProcessed(webhookId) {
    await db.webhookEvents.update({
      where: { id: webhookId },
      data: {
        status: 'processed',
        processedAt: new Date(),
        retryCount: 0
      }
    });
  }
  
  // Lidar com falha final
  async handleFinalFailure(webhookData, error) {
    // Salvar no dead letter queue
    await this.saveToDeadLetterQueue(webhookData, error);
    
    // Notificar equipe de desenvolvimento
    await this.notifyDevelopmentTeam(webhookData, error);
    
    // Marcar como falha permanente
    await db.webhookEvents.update({
      where: { id: webhookData.id },
      data: {
        status: 'failed',
        failedAt: new Date(),
        errorMessage: error.message,
        retryCount: this.maxRetries
      }
    });
  }
  
  // Salvar no dead letter queue
  async saveToDeadLetterQueue(webhookData, error) {
    await db.deadLetterQueue.create({
      data: {
        webhookId: webhookData.id,
        eventType: webhookData.type,
        payload: webhookData,
        errorMessage: error.message,
        errorStack: error.stack,
        createdAt: new Date()
      }
    });
  }
  
  // Notificar equipe
  async notifyDevelopmentTeam(webhookData, error) {
    const message = {
      subject: 'Webhook Processing Failed',
      body: \`
        Webhook ID: \${webhookData.id}
        Event Type: \${webhookData.type}
        Error: \${error.message}
        
        Please check the dead letter queue for manual processing.
      \`
    };
    
    // Enviar via email, Slack, etc.
    await sendAlert(message);
  }
}

// Queue de processamento assíncrono
class WebhookQueue {
  constructor() {
    this.queue = [];
    this.processing = false;
    this.retrySystem = new WebhookRetrySystem();
  }
  
  // Adicionar webhook à queue
  async enqueue(webhookData) {
    this.queue.push(webhookData);
    
    // Salvar no banco para persistência
    await db.webhookEvents.create({
      data: {
        id: webhookData.id,
        type: webhookData.type,
        payload: webhookData,
        status: 'queued',
        createdAt: new Date()
      }
    });
    
    // Iniciar processamento se não estiver rodando
    if (!this.processing) {
      this.processQueue();
    }
  }
  
  // Processar queue
  async processQueue() {
    this.processing = true;
    
    while (this.queue.length > 0) {
      const webhookData = this.queue.shift();
      
      try {
        await this.retrySystem.processWithRetry(
          webhookData, 
          this.processWebhookEvent.bind(this)
        );
        
        console.log(\`Successfully processed webhook: \${webhookData.id}\`);
        
      } catch (error) {
        console.error(\`Failed to process webhook: \${webhookData.id}\`, error);
      }
    }
    
    this.processing = false;
  }
  
  // Processar evento individual
  async processWebhookEvent(webhookData) {
    const { type, data } = webhookData;
    
    // Simular processamento que pode falhar
    if (Math.random() < 0.1) { // 10% chance de falha
      throw new Error('Random processing failure');
    }
    
    // Processar baseado no tipo
    switch (type) {
      case 'payment.succeeded':
        await this.handlePaymentSucceeded(data);
        break;
      case 'order.created':
        await this.handleOrderCreated(data);
        break;
      default:
        console.log(\`Unhandled event type: \${type}\`);
    }
  }
  
  // Handlers específicos
  async handlePaymentSucceeded(data) {
    // Simular processamento
    await new Promise(resolve => setTimeout(resolve, 100));
    console.log('Payment succeeded processed:', data.payment_id);
  }
  
  async handleOrderCreated(data) {
    // Simular processamento
    await new Promise(resolve => setTimeout(resolve, 150));
    console.log('Order created processed:', data.order_id);
  }
}

// Monitoramento e métricas
class WebhookMonitoring {
  constructor() {
    this.metrics = {
      totalReceived: 0,
      totalProcessed: 0,
      totalFailed: 0,
      averageProcessingTime: 0,
      eventTypes: new Map()
    };
  }
  
  // Registrar evento recebido
  recordReceived(eventType) {
    this.metrics.totalReceived++;
    
    const typeCount = this.metrics.eventTypes.get(eventType) || 0;
    this.metrics.eventTypes.set(eventType, typeCount + 1);
  }
  
  // Registrar processamento bem-sucedido
  recordProcessed(eventType, processingTime) {
    this.metrics.totalProcessed++;
    
    // Atualizar tempo médio de processamento
    const currentAvg = this.metrics.averageProcessingTime;
    const totalProcessed = this.metrics.totalProcessed;
    
    this.metrics.averageProcessingTime = 
      (currentAvg * (totalProcessed - 1) + processingTime) / totalProcessed;
  }
  
  // Registrar falha
  recordFailed(eventType, error) {
    this.metrics.totalFailed++;
    console.error(\`Webhook failed for \${eventType}:\`, error);
  }
  
  // Obter métricas
  getMetrics() {
    return {
      ...this.metrics,
      successRate: (this.metrics.totalProcessed / this.metrics.totalReceived) * 100,
      failureRate: (this.metrics.totalFailed / this.metrics.totalReceived) * 100,
      eventTypes: Object.fromEntries(this.metrics.eventTypes)
    };
  }
}

// Uso do sistema completo
const webhookQueue = new WebhookQueue();
const monitoring = new WebhookMonitoring();

// Endpoint principal com monitoramento
app.post('/api/webhooks/ecommerce', async (req, res) => {
  const startTime = Date.now();
  const event = req.body;
  
  try {
    // Registrar recebimento
    monitoring.recordReceived(event.type);
    
    // Adicionar à queue para processamento assíncrono
    await webhookQueue.enqueue(event);
    
    // Registrar sucesso
    const processingTime = Date.now() - startTime;
    monitoring.recordProcessed(event.type, processingTime);
    
    res.status(200).json({ received: true });
    
  } catch (error) {
    // Registrar falha
    monitoring.recordFailed(event.type, error);
    
    res.status(500).json({ error: 'Processing failed' });
  }
});

// Endpoint para métricas
app.get('/api/webhooks/metrics', (req, res) => {
  res.json(monitoring.getMetrics());
});`
  },
  {
    title: 'Testing Webhooks',
    description: 'Testes e simulação de webhooks',
    code: `// Utilitários para testar webhooks
class WebhookTester {
  constructor(webhookUrl, secret) {
    this.webhookUrl = webhookUrl;
    this.secret = secret;
  }
  
  // Gerar assinatura para teste
  generateSignature(payload, timestamp) {
    const signedPayload = \`\${timestamp}.\${payload}\`;
    
    return crypto
      .createHmac('sha256', this.secret)
      .update(signedPayload, 'utf8')
      .digest('hex');
  }
  
  // Enviar webhook de teste
  async sendTestWebhook(eventType, data) {
    const timestamp = Math.floor(Date.now() / 1000);
    const payload = JSON.stringify({
      id: \`test_\${Date.now()}\`,
      type: eventType,
      data: data,
      created_at: timestamp
    });
    
    const signature = this.generateSignature(payload, timestamp);
    
    try {
      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Signature': \`sha256=\${signature}\`,
          'X-Timestamp': timestamp.toString()
        },
        body: payload
      });
      
      return {
        success: response.ok,
        status: response.status,
        response: await response.text()
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
  
  // Testar diferentes cenários
  async runTestSuite() {
    const tests = [
      {
        name: 'Payment Succeeded',
        eventType: 'payment.succeeded',
        data: {
          payment_id: 'pay_test_123',
          order_id: 'order_test_456',
          amount: 9990,
          currency: 'BRL',
          payment_method: 'credit_card'
        }
      },
      {
        name: 'Order Created',
        eventType: 'order.created',
        data: {
          order_id: 'order_test_789',
          customer_id: 'cust_test_123',
          total_amount: 15990,
          items: [
            { product_id: 'prod_1', quantity: 2, price: 7995 }
          ]
        }
      },
      {
        name: 'Subscription Cancelled',
        eventType: 'subscription.cancelled',
        data: {
          subscription_id: 'sub_test_456',
          customer_id: 'cust_test_123',
          cancelled_at: Date.now(),
          reason: 'customer_request'
        }
      }
    ];
    
    const results = [];
    
    for (const test of tests) {
      console.log(\`Running test: \${test.name}\`);
      
      const result = await this.sendTestWebhook(test.eventType, test.data);
      
      results.push({
        test: test.name,
        ...result
      });
      
      // Aguardar entre testes
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    return results;
  }
  
  // Testar assinatura inválida
  async testInvalidSignature() {
    const timestamp = Math.floor(Date.now() / 1000);
    const payload = JSON.stringify({
      id: 'test_invalid_sig',
      type: 'test.invalid_signature',
      data: { test: true }
    });
    
    try {
      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Signature': 'sha256=invalid_signature',
          'X-Timestamp': timestamp.toString()
        },
        body: payload
      });
      
      return {
        success: response.status === 401, // Esperamos 401 para assinatura inválida
        status: response.status,
        response: await response.text()
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
  
  // Testar timestamp expirado
  async testExpiredTimestamp() {
    const expiredTimestamp = Math.floor(Date.now() / 1000) - 600; // 10 minutos atrás
    const payload = JSON.stringify({
      id: 'test_expired_timestamp',
      type: 'test.expired_timestamp',
      data: { test: true }
    });
    
    const signature = this.generateSignature(payload, expiredTimestamp);
    
    try {
      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Signature': \`sha256=\${signature}\`,
          'X-Timestamp': expiredTimestamp.toString()
        },
        body: payload
      });
      
      return {
        success: response.status === 401, // Esperamos 401 para timestamp expirado
        status: response.status,
        response: await response.text()
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

// Simulador de webhook para desenvolvimento
class WebhookSimulator {
  constructor() {
    this.events = [];
  }
  
  // Simular evento de pagamento
  simulatePaymentEvent(orderId, amount, success = true) {
    const event = {
      id: \`evt_\${Date.now()}\`,
      type: success ? 'payment.succeeded' : 'payment.failed',
      data: {
        payment_id: \`pay_\${Date.now()}\`,
        order_id: orderId,
        amount: amount,
        currency: 'BRL',
        payment_method: 'credit_card',
        ...(success ? {} : {
          error_code: 'card_declined',
          error_message: 'Your card was declined'
        })
      },
      created_at: Math.floor(Date.now() / 1000)
    };
    
    this.events.push(event);
    return event;
  }
  
  // Simular evento de pedido
  simulateOrderEvent(eventType, orderData) {
    const event = {
      id: \`evt_\${Date.now()}\`,
      type: eventType,
      data: orderData,
      created_at: Math.floor(Date.now() / 1000)
    };
    
    this.events.push(event);
    return event;
  }
  
  // Obter eventos simulados
  getEvents() {
    return this.events;
  }
  
  // Limpar eventos
  clearEvents() {
    this.events = [];
  }
}

// Testes unitários
describe('Webhook Processing', () => {
  let webhookTester;
  let simulator;
  
  beforeEach(() => {
    webhookTester = new WebhookTester(
      'http://localhost:3000/api/webhooks/ecommerce',
      'test_webhook_secret'
    );
    simulator = new WebhookSimulator();
  });
  
  test('should process payment succeeded webhook', async () => {
    const event = simulator.simulatePaymentEvent('order_123', 9990, true);
    
    const result = await webhookTester.sendTestWebhook(event.type, event.data);
    
    expect(result.success).toBe(true);
    expect(result.status).toBe(200);
  });
  
  test('should reject webhook with invalid signature', async () => {
    const result = await webhookTester.testInvalidSignature();
    
    expect(result.success).toBe(true); // Sucesso = rejeitou corretamente
    expect(result.status).toBe(401);
  });
  
  test('should reject webhook with expired timestamp', async () => {
    const result = await webhookTester.testExpiredTimestamp();
    
    expect(result.success).toBe(true); // Sucesso = rejeitou corretamente
    expect(result.status).toBe(401);
  });
});

// Uso dos utilitários
const tester = new WebhookTester(
  'https://myapp.com/api/webhooks/ecommerce',
  process.env.WEBHOOK_SECRET
);

// Executar suite de testes
tester.runTestSuite().then(results => {
  console.log('Test Results:', results);
});

// Simular eventos para desenvolvimento
const simulator = new WebhookSimulator();
const paymentEvent = simulator.simulatePaymentEvent('order_123', 9990);
console.log('Simulated event:', paymentEvent);`
  }
];

export default function WebhooksPage() {
  const [selectedExample, setSelectedExample] = useState(0);
  const [webhookLogs, setWebhookLogs] = useState([]);
  const [isSimulating, setIsSimulating] = useState(false);

  const simulateWebhook = async (eventType) => {
    setIsSimulating(true);
    
    // Simular recebimento de webhook
    const newLog = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      eventType,
      status: 'processing',
      data: {
        order_id: 'order_' + Math.random().toString(36).substr(2, 9),
        amount: Math.floor(Math.random() * 10000) + 1000
      }
    };
    
    setWebhookLogs(prev => [newLog, ...prev.slice(0, 9)]);
    
    // Simular processamento
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Atualizar status
    setWebhookLogs(prev => 
      prev.map(log => 
        log.id === newLog.id 
          ? { ...log, status: Math.random() > 0.1 ? 'success' : 'failed' }
          : log
      )
    );
    
    setIsSimulating(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl mb-6">
            <Webhook className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            E-commerce Webhooks
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Sistema completo de webhooks para notificações em tempo real de eventos de e-commerce
          </p>
        </motion.div>

        {/* Features */}
        <DemoSection title="Recursos de Webhooks" description="Funcionalidades essenciais para webhooks de e-commerce">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-1.5 mb-8">
            {webhookFeatures.map((feature, index) => {
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

        {/* Webhook Events */}
        <DemoSection title="Tipos de Eventos" description="Eventos de webhook suportados">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-1.5">
            {webhookEvents.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <DemoCardStatic title={category.category} description={category.description}>
                  <div className="space-y-4">
                    <div className="text-4xl text-center">{category.icon}</div>
                    <div className="space-y-2">
                      {category.events.map((event, idx) => (
                        <div key={idx} className="border-l-4 border-indigo-500 pl-3">
                          <div className="font-mono text-xs text-indigo-600 dark:text-indigo-400">
                            {event.name}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            {event.description}
                          </div>
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
        <DemoSection title="Implementação" description="Exemplos práticos de implementação de webhooks">
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {implementationExamples.map((example, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedExample(index)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedExample === index
                      ? 'bg-indigo-600 text-white'
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

        {/* Webhook Simulator */}
        <DemoSection title="Simulador de Webhooks" description="Teste webhooks em tempo real">
          <div className="grid md:grid-cols-2 gap-1.5">
            <DemoCardStatic title="Simular Eventos" description="Envie webhooks de teste">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { type: 'payment.succeeded', label: 'Pagamento OK', color: 'bg-green-600' },
                    { type: 'payment.failed', label: 'Pagamento Falhou', color: 'bg-red-600' },
                    { type: 'order.created', label: 'Pedido Criado', color: 'bg-blue-600' },
                    { type: 'order.shipped', label: 'Pedido Enviado', color: 'bg-purple-600' }
                  ].map((event) => (
                    <button
                      key={event.type}
                      onClick={() => simulateWebhook(event.type)}
                      disabled={isSimulating}
                      className={`${event.color} text-white px-3 py-2 rounded text-sm hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity`}
                    >
                      {event.label}
                    </button>
                  ))}
                </div>
                
                {isSimulating && (
                  <div className="flex items-center justify-center py-4">
                    <RefreshCw className="h-5 w-5 animate-spin text-indigo-600 mr-2" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Enviando webhook...</span>
                  </div>
                )}
              </div>
            </DemoCardStatic>

            <DemoCardStatic title="Log de Webhooks" description="Eventos recebidos em tempo real">
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {webhookLogs.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <Webhook className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Nenhum webhook recebido ainda</p>
                  </div>
                ) : (
                  webhookLogs.map((log) => (
                    <div key={log.id} className="bg-gray-50 dark:bg-gray-700 rounded p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-xs text-indigo-600 dark:text-indigo-400">
                          {log.eventType}
                        </span>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          log.status === 'success' ? 'bg-green-100 text-green-800' :
                          log.status === 'failed' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {log.status === 'success' ? 'Sucesso' :
                           log.status === 'failed' ? 'Falhou' :
                           'Processando'}
                        </span>
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {new Date(log.timestamp).toLocaleTimeString('pt-BR')}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        Order: {log.data.order_id} | Amount: R$ {(log.data.amount / 100).toFixed(2)}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </DemoCardStatic>
          </div>
        </DemoSection>

        {/* Best Practices */}
        <DemoSection title="Melhores Práticas" description="Diretrizes para implementação de webhooks">
          <div className="grid md:grid-cols-2 gap-1.5">
            <DemoCardStatic title="✅ Recomendações" description="Práticas recomendadas">
              <div className="space-y-3">
                {[
                  'Sempre verificar assinatura HMAC',
                  'Implementar idempotência',
                  'Usar HTTPS em produção',
                  'Implementar retry com backoff',
                  'Validar timestamp para evitar replay',
                  'Processar webhooks de forma assíncrona',
                  'Implementar rate limiting',
                  'Monitorar e logar todos os eventos'
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
                  'Não verificar assinatura do webhook',
                  'Processar o mesmo evento múltiplas vezes',
                  'Usar HTTP em produção',
                  'Não implementar timeout adequado',
                  'Ignorar códigos de erro HTTP',
                  'Processar webhooks de forma síncrona',
                  'Não implementar rate limiting',
                  'Expor informações sensíveis em logs'
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
        <DemoSection title="Como Começar" description="Setup inicial de webhooks">
          <div className="grid md:grid-cols-2 gap-1.5">
            <DemoCardStatic title="Configuração Inicial" description="Setup do endpoint webhook">
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-green-400 text-sm">
                  <code>{`# 1. Configurar endpoint
# URL: https://yourapp.com/api/webhooks/ecommerce
# Method: POST
# Content-Type: application/json

# 2. Configurar variáveis de ambiente
WEBHOOK_SECRET=your_webhook_secret_key
WEBHOOK_TIMEOUT=30000
WEBHOOK_MAX_RETRIES=5

# 3. Implementar verificação de segurança
# - Verificar assinatura HMAC
# - Validar timestamp
# - Implementar rate limiting

# 4. Configurar processamento
# - Queue para processamento assíncrono
# - Retry com exponential backoff
# - Dead letter queue para falhas

# 5. Implementar monitoramento
# - Logs detalhados
# - Métricas de performance
# - Alertas para falhas`}</code>
                </pre>
              </div>
            </DemoCardStatic>

            <DemoCardStatic title="Checklist de Produção" description="Itens para deploy em produção">
              <div className="space-y-3">
                {[
                  { item: 'HTTPS configurado', done: false },
                  { item: 'Verificação de assinatura implementada', done: false },
                  { item: 'Rate limiting configurado', done: false },
                  { item: 'Sistema de retry implementado', done: false },
                  { item: 'Monitoramento e alertas ativos', done: false },
                  { item: 'Dead letter queue configurada', done: false },
                  { item: 'Logs estruturados implementados', done: false },
                  { item: 'Testes de integração passando', done: false }
                ].map((check, index) => (
                  <div key={index} className="flex items-center">
                    <input 
                      type="checkbox" 
                      checked={check.done}
                      className="mr-3 h-4 w-4 text-indigo-600 rounded"
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