'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  DollarSign, 
  Eye, 
  Target, 
  PieChart, 
  LineChart, 
  Activity,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { DemoSection } from '@/components/DemoSection';
import { DemoCardStatic } from '@/components/DemoCardStatic';

// Analytics Features
const analyticsFeatures = [
  {
    title: 'Tracking de Conversão',
    description: 'Monitoramento completo do funil de vendas',
    icon: Target,
    color: 'text-blue-500',
    benefits: [
      'Funil de conversão detalhado',
      'Análise de abandono de carrinho',
      'Otimização de checkout',
      'A/B testing integrado'
    ]
  },
  {
    title: 'Métricas de Performance',
    description: 'KPIs essenciais para e-commerce',
    icon: TrendingUp,
    color: 'text-green-500',
    benefits: [
      'Revenue tracking',
      'AOV (Average Order Value)',
      'CLV (Customer Lifetime Value)',
      'ROI por canal'
    ]
  },
  {
    title: 'Análise de Comportamento',
    description: 'Entenda como usuários navegam',
    icon: Eye,
    color: 'text-purple-500',
    benefits: [
      'Heatmaps de páginas',
      'Session recordings',
      'Análise de jornada',
      'Segmentação de usuários'
    ]
  },
  {
    title: 'Relatórios Avançados',
    description: 'Dashboards e relatórios customizados',
    icon: BarChart3,
    color: 'text-orange-500',
    benefits: [
      'Dashboards em tempo real',
      'Relatórios automatizados',
      'Exportação de dados',
      'Alertas personalizados'
    ]
  }
];

// Analytics Metrics
const analyticsMetrics = [
  {
    category: 'Vendas',
    icon: '💰',
    description: 'Métricas de receita e vendas',
    metrics: [
      { name: 'Revenue Total', value: 'R$ 125.430', change: '+12.5%' },
      { name: 'Pedidos', value: '1.234', change: '+8.3%' },
      { name: 'AOV', value: 'R$ 101.65', change: '+3.2%' },
      { name: 'Taxa Conversão', value: '3.45%', change: '+0.8%' }
    ]
  },
  {
    category: 'Tráfego',
    icon: '📊',
    description: 'Análise de visitantes e sessões',
    metrics: [
      { name: 'Visitantes Únicos', value: '45.678', change: '+15.2%' },
      { name: 'Sessões', value: '67.890', change: '+11.7%' },
      { name: 'Pageviews', value: '234.567', change: '+9.4%' },
      { name: 'Bounce Rate', value: '42.3%', change: '-2.1%' }
    ]
  },
  {
    category: 'Produtos',
    icon: '🛍️',
    description: 'Performance de produtos',
    metrics: [
      { name: 'Mais Vendido', value: 'Produto A', change: '234 vendas' },
      { name: 'Maior Receita', value: 'Produto B', change: 'R$ 12.345' },
      { name: 'Melhor Margem', value: 'Produto C', change: '45.6%' },
      { name: 'Estoque Baixo', value: '12 produtos', change: 'Alerta' }
    ]
  },
  {
    category: 'Marketing',
    icon: '📈',
    description: 'ROI de campanhas e canais',
    metrics: [
      { name: 'Google Ads ROI', value: '320%', change: '+25%' },
      { name: 'Facebook ROI', value: '280%', change: '+18%' },
      { name: 'Email ROI', value: '450%', change: '+12%' },
      { name: 'Orgânico', value: '65%', change: '+5%' }
    ]
  }
];

// Implementation Examples
const implementationExamples = [
  {
    title: 'Google Analytics 4 Setup',
    description: 'Configuração completa do GA4 para e-commerce',
    code: `// Configuração Google Analytics 4
import { gtag } from 'gtag';

// Inicializar GA4
function initializeGA4() {
  // Configurar GA4
  gtag('config', 'GA_MEASUREMENT_ID', {
    page_title: document.title,
    page_location: window.location.href,
    custom_map: {
      'custom_parameter': 'dimension1'
    }
  });
}

// Tracking de e-commerce
class EcommerceTracking {
  // Visualização de produto
  trackProductView(product) {
    gtag('event', 'view_item', {
      currency: 'BRL',
      value: product.price,
      items: [{
        item_id: product.id,
        item_name: product.name,
        item_category: product.category,
        item_variant: product.variant,
        price: product.price,
        quantity: 1
      }]
    });
  }
  
  // Adicionar ao carrinho
  trackAddToCart(product, quantity = 1) {
    gtag('event', 'add_to_cart', {
      currency: 'BRL',
      value: product.price * quantity,
      items: [{
        item_id: product.id,
        item_name: product.name,
        item_category: product.category,
        price: product.price,
        quantity: quantity
      }]
    });
  }
  
  // Iniciar checkout
  trackBeginCheckout(cart) {
    const items = cart.items.map(item => ({
      item_id: item.product.id,
      item_name: item.product.name,
      item_category: item.product.category,
      price: item.product.price,
      quantity: item.quantity
    }));
    
    gtag('event', 'begin_checkout', {
      currency: 'BRL',
      value: cart.total,
      items: items
    });
  }
  
  // Compra realizada
  trackPurchase(order) {
    const items = order.items.map(item => ({
      item_id: item.product.id,
      item_name: item.product.name,
      item_category: item.product.category,
      price: item.product.price,
      quantity: item.quantity
    }));
    
    gtag('event', 'purchase', {
      transaction_id: order.id,
      currency: 'BRL',
      value: order.total,
      tax: order.tax,
      shipping: order.shipping,
      items: items
    });
  }
  
  // Eventos customizados
  trackCustomEvent(eventName, parameters) {
    gtag('event', eventName, parameters);
  }
  
  // Conversões personalizadas
  trackConversion(conversionName, value) {
    gtag('event', 'conversion', {
      send_to: 'AW-CONVERSION_ID/' + conversionName,
      value: value,
      currency: 'BRL'
    });
  }
}`
  },
  {
    title: 'Custom Analytics Dashboard',
    description: 'Dashboard personalizado com métricas em tempo real',
    code: `// Dashboard de Analytics Personalizado
class AnalyticsDashboard {
  constructor() {
    this.metrics = new Map();
    this.charts = new Map();
    this.realTimeData = new EventSource('/api/analytics/realtime');
    this.setupRealTimeUpdates();
  }
  
  // Configurar atualizações em tempo real
  setupRealTimeUpdates() {
    this.realTimeData.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.updateMetrics(data);
      this.updateCharts(data);
    };
  }
  
  // Buscar métricas do período
  async fetchMetrics(startDate, endDate, metrics) {
    const response = await fetch('/api/analytics/metrics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        startDate,
        endDate,
        metrics
      })
    });
    
    return await response.json();
  }
  
  // Calcular KPIs principais
  calculateKPIs(data) {
    const kpis = {
      // Revenue metrics
      totalRevenue: data.orders.reduce((sum, order) => sum + order.total, 0),
      averageOrderValue: data.orders.length > 0 
        ? data.totalRevenue / data.orders.length 
        : 0,
      
      // Conversion metrics
      conversionRate: data.sessions > 0 
        ? (data.orders.length / data.sessions) * 100 
        : 0,
      
      // Customer metrics
      newCustomers: data.customers.filter(c => c.isNew).length,
      returningCustomers: data.customers.filter(c => !c.isNew).length,
      
      // Product metrics
      topProducts: this.getTopProducts(data.orders),
      
      // Traffic metrics
      totalSessions: data.sessions,
      bounceRate: data.bounces / data.sessions * 100,
      avgSessionDuration: data.totalSessionTime / data.sessions
    };
    
    return kpis;
  }
  
  // Análise de funil de conversão
  analyzeFunnel(data) {
    const funnel = {
      visitors: data.uniqueVisitors,
      productViews: data.productViews,
      addToCarts: data.addToCarts,
      checkoutStarts: data.checkoutStarts,
      purchases: data.purchases
    };
    
    // Calcular taxas de conversão entre etapas
    const conversionRates = {
      visitorToView: (funnel.productViews / funnel.visitors) * 100,
      viewToCart: (funnel.addToCarts / funnel.productViews) * 100,
      cartToCheckout: (funnel.checkoutStarts / funnel.addToCarts) * 100,
      checkoutToPurchase: (funnel.purchases / funnel.checkoutStarts) * 100
    };
    
    return { funnel, conversionRates };
  }
  
  // Análise de coorte
  analyzeCohorts(customers, orders) {
    const cohorts = new Map();
    
    customers.forEach(customer => {
      const cohortMonth = customer.firstPurchaseDate.substring(0, 7);
      
      if (!cohorts.has(cohortMonth)) {
        cohorts.set(cohortMonth, {
          customers: [],
          monthlyRevenue: new Map()
        });
      }
      
      cohorts.get(cohortMonth).customers.push(customer);
    });
    
    // Calcular revenue por mês para cada coorte
    orders.forEach(order => {
      const customer = customers.find(c => c.id === order.customerId);
      const cohortMonth = customer.firstPurchaseDate.substring(0, 7);
      const orderMonth = order.date.substring(0, 7);
      
      const cohort = cohorts.get(cohortMonth);
      if (!cohort.monthlyRevenue.has(orderMonth)) {
        cohort.monthlyRevenue.set(orderMonth, 0);
      }
      
      cohort.monthlyRevenue.set(
        orderMonth,
        cohort.monthlyRevenue.get(orderMonth) + order.total
      );
    });
    
    return cohorts;
  }
  
  // Análise RFM (Recency, Frequency, Monetary)
  analyzeRFM(customers, orders) {
    const now = new Date();
    
    const rfmData = customers.map(customer => {
      const customerOrders = orders.filter(o => o.customerId === customer.id);
      
      // Recency: dias desde última compra
      const lastOrder = customerOrders.sort((a, b) => 
        new Date(b.date) - new Date(a.date)
      )[0];
      const recency = Math.floor(
        (now - new Date(lastOrder.date)) / (1000 * 60 * 60 * 24)
      );
      
      // Frequency: número de pedidos
      const frequency = customerOrders.length;
      
      // Monetary: valor total gasto
      const monetary = customerOrders.reduce((sum, order) => sum + order.total, 0);
      
      return {
        customerId: customer.id,
        recency,
        frequency,
        monetary
      };
    });
    
    // Calcular quintis para segmentação
    const recencyQuintiles = this.calculateQuintiles(
      rfmData.map(d => d.recency)
    );
    const frequencyQuintiles = this.calculateQuintiles(
      rfmData.map(d => d.frequency)
    );
    const monetaryQuintiles = this.calculateQuintiles(
      rfmData.map(d => d.monetary)
    );
    
    // Segmentar clientes
    return rfmData.map(data => ({
      ...data,
      recencyScore: this.getQuintileScore(data.recency, recencyQuintiles, true),
      frequencyScore: this.getQuintileScore(data.frequency, frequencyQuintiles),
      monetaryScore: this.getQuintileScore(data.monetary, monetaryQuintiles),
      segment: this.getRFMSegment(data)
    }));
  }
  
  // Gerar relatório automatizado
  generateReport(startDate, endDate) {
    return {
      period: { startDate, endDate },
      summary: this.generateSummary(),
      kpis: this.calculateKPIs(),
      trends: this.analyzeTrends(),
      recommendations: this.generateRecommendations(),
      generatedAt: new Date()
    };
  }
  
  // Exportar dados
  async exportData(format, data) {
    const response = await fetch('/api/analytics/export', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        format, // 'csv', 'xlsx', 'json'
        data
      })
    });
    
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = \`analytics-report.\${format}\`;
    a.click();
  }
}`
  },
  {
    title: 'A/B Testing Framework',
    description: 'Sistema de testes A/B para otimização',
    code: `// Framework de A/B Testing
class ABTestingFramework {
  constructor() {
    this.tests = new Map();
    this.userAssignments = new Map();
    this.results = new Map();
  }
  
  // Criar novo teste
  createTest(testConfig) {
    const test = {
      id: testConfig.id,
      name: testConfig.name,
      description: testConfig.description,
      variants: testConfig.variants,
      trafficAllocation: testConfig.trafficAllocation || 100,
      targetingRules: testConfig.targetingRules || {},
      metrics: testConfig.metrics,
      startDate: new Date(),
      endDate: testConfig.endDate,
      status: 'active',
      sampleSize: testConfig.sampleSize || 1000
    };
    
    this.tests.set(test.id, test);
    return test;
  }
  
  // Atribuir usuário a variante
  assignUserToVariant(userId, testId) {
    const test = this.tests.get(testId);
    
    if (!test || test.status !== 'active') {
      return null;
    }
    
    // Verificar regras de targeting
    if (!this.matchesTargeting(userId, test.targetingRules)) {
      return null;
    }
    
    // Verificar se usuário já foi atribuído
    const assignmentKey = \`\${userId}-\${testId}\`;
    if (this.userAssignments.has(assignmentKey)) {
      return this.userAssignments.get(assignmentKey);
    }
    
    // Atribuir baseado em hash determinístico
    const hash = this.hashUserId(userId, testId);
    const variants = test.variants;
    const totalWeight = variants.reduce((sum, v) => sum + v.weight, 0);
    
    let cumulativeWeight = 0;
    let selectedVariant = null;
    
    for (const variant of variants) {
      cumulativeWeight += variant.weight;
      if (hash <= (cumulativeWeight / totalWeight)) {
        selectedVariant = variant;
        break;
      }
    }
    
    // Salvar atribuição
    const assignment = {
      userId,
      testId,
      variant: selectedVariant.id,
      assignedAt: new Date()
    };
    
    this.userAssignments.set(assignmentKey, assignment);
    
    // Tracking do evento
    this.trackEvent('ab_test_assignment', {
      testId,
      variant: selectedVariant.id,
      userId
    });
    
    return assignment;
  }
  
  // Registrar conversão
  trackConversion(userId, testId, metric, value = 1) {
    const assignmentKey = \`\${userId}-\${testId}\`;
    const assignment = this.userAssignments.get(assignmentKey);
    
    if (!assignment) {
      return; // Usuário não está no teste
    }
    
    const resultKey = \`\${testId}-\${assignment.variant}-\${metric}\`;
    
    if (!this.results.has(resultKey)) {
      this.results.set(resultKey, {
        testId,
        variant: assignment.variant,
        metric,
        conversions: 0,
        totalValue: 0,
        users: new Set()
      });
    }
    
    const result = this.results.get(resultKey);
    result.conversions += 1;
    result.totalValue += value;
    result.users.add(userId);
    
    // Tracking do evento
    this.trackEvent('ab_test_conversion', {
      testId,
      variant: assignment.variant,
      metric,
      value,
      userId
    });
  }
  
  // Analisar resultados
  analyzeResults(testId) {
    const test = this.tests.get(testId);
    if (!test) return null;
    
    const analysis = {
      testId,
      testName: test.name,
      variants: [],
      winner: null,
      confidence: 0,
      significance: false
    };
    
    // Coletar dados por variante
    for (const variant of test.variants) {
      const variantData = {
        id: variant.id,
        name: variant.name,
        metrics: {}
      };
      
      for (const metric of test.metrics) {
        const resultKey = \`\${testId}-\${variant.id}-\${metric}\`;
        const result = this.results.get(resultKey);
        
        if (result) {
          const uniqueUsers = result.users.size;
          const conversionRate = uniqueUsers > 0 
            ? (result.conversions / uniqueUsers) * 100 
            : 0;
          
          variantData.metrics[metric] = {
            conversions: result.conversions,
            users: uniqueUsers,
            conversionRate,
            totalValue: result.totalValue,
            averageValue: result.conversions > 0 
              ? result.totalValue / result.conversions 
              : 0
          };
        }
      }
      
      analysis.variants.push(variantData);
    }
    
    // Calcular significância estatística
    if (analysis.variants.length === 2) {
      const [control, treatment] = analysis.variants;
      const primaryMetric = test.metrics[0];
      
      const controlData = control.metrics[primaryMetric];
      const treatmentData = treatment.metrics[primaryMetric];
      
      if (controlData && treatmentData) {
        const significance = this.calculateSignificance(
          controlData.conversions,
          controlData.users,
          treatmentData.conversions,
          treatmentData.users
        );
        
        analysis.confidence = significance.confidence;
        analysis.significance = significance.pValue < 0.05;
        
        if (analysis.significance) {
          analysis.winner = treatmentData.conversionRate > controlData.conversionRate
            ? treatment.id
            : control.id;
        }
      }
    }
    
    return analysis;
  }
  
  // Calcular significância estatística (teste Z)
  calculateSignificance(conversionsA, usersA, conversionsB, usersB) {
    const pA = conversionsA / usersA;
    const pB = conversionsB / usersB;
    const pPooled = (conversionsA + conversionsB) / (usersA + usersB);
    
    const se = Math.sqrt(
      pPooled * (1 - pPooled) * (1/usersA + 1/usersB)
    );
    
    const zScore = (pB - pA) / se;
    const pValue = 2 * (1 - this.normalCDF(Math.abs(zScore)));
    const confidence = (1 - pValue) * 100;
    
    return {
      zScore,
      pValue,
      confidence,
      significant: pValue < 0.05
    };
  }
  
  // Hash determinístico para atribuição consistente
  hashUserId(userId, testId) {
    const str = \`\${userId}-\${testId}\`;
    let hash = 0;
    
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    return Math.abs(hash) / Math.pow(2, 31);
  }
}`
  }
];

export default function AnalyticsPage() {
  const [selectedExample, setSelectedExample] = useState(0);
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl mb-6">
            <BarChart3 className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            E-commerce Analytics
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Analytics avançado para e-commerce com tracking, métricas e insights acionáveis
          </p>
        </motion.div>

        {/* Analytics Features */}
        <DemoSection title="Recursos de Analytics" description="Funcionalidades essenciais para análise de e-commerce">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {analyticsFeatures.map((feature, index) => {
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

        {/* Analytics Metrics */}
        <DemoSection title="Métricas em Tempo Real" description="Dashboard com principais KPIs">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {analyticsMetrics.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <DemoCardStatic title={category.category} description={category.description}>
                  <div className="space-y-4">
                    <div className="text-4xl text-center">{category.icon}</div>
                    <div className="space-y-3">
                      {category.metrics.map((metric, idx) => (
                        <div key={idx} className="flex justify-between items-center">
                          <div>
                            <div className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                              {metric.name}
                            </div>
                            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                              {metric.value}
                            </div>
                          </div>
                          <div className={`text-sm font-semibold ${
                            metric.change.startsWith('+') 
                              ? 'text-green-600 dark:text-green-400'
                              : metric.change.startsWith('-')
                              ? 'text-red-600 dark:text-red-400'
                              : 'text-gray-600 dark:text-gray-400'
                          }`}>
                            {metric.change}
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

        {/* Implementation Examples */}
        <DemoSection title="Implementação" description="Exemplos práticos de analytics">
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {implementationExamples.map((example, index) => (
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

        {/* Analytics Dashboard Demo */}
        <DemoSection title="Dashboard Interativo" description="Simulação de dashboard de analytics">
          <div className="space-y-6">
            {/* Controls */}
            <div className="flex flex-wrap gap-4 items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg border">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <select 
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="border rounded px-3 py-1 text-sm"
                  >
                    <option value="1d">Último dia</option>
                    <option value="7d">Últimos 7 dias</option>
                    <option value="30d">Últimos 30 dias</option>
                    <option value="90d">Últimos 90 dias</option>
                  </select>
                </div>
                
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <select 
                    value={selectedMetric}
                    onChange={(e) => setSelectedMetric(e.target.value)}
                    className="border rounded px-3 py-1 text-sm"
                  >
                    <option value="revenue">Receita</option>
                    <option value="orders">Pedidos</option>
                    <option value="visitors">Visitantes</option>
                    <option value="conversion">Conversão</option>
                  </select>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
                  <RefreshCw className="h-4 w-4" />
                  Atualizar
                </button>
                <button className="flex items-center gap-2 px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700">
                  <Download className="h-4 w-4" />
                  Exportar
                </button>
              </div>
            </div>
            
            {/* Chart Placeholder */}
            <DemoCardStatic title="Gráfico de Performance" description={`Métrica: ${selectedMetric} | Período: ${selectedPeriod}`}>
              <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <LineChart className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-300">Gráfico interativo seria renderizado aqui</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Integração com Chart.js, D3.js ou similar</p>
                </div>
              </div>
            </DemoCardStatic>
          </div>
        </DemoSection>

        {/* Best Practices */}
        <DemoSection title="Melhores Práticas" description="Diretrizes para analytics eficaz">
          <div className="grid md:grid-cols-2 gap-6">
            <DemoCardStatic title="✅ Implementar" description="Práticas essenciais de analytics">
              <div className="space-y-3">
                {[
                  'Definir KPIs claros e mensuráveis',
                  'Implementar tracking de eventos',
                  'Configurar funis de conversão',
                  'Segmentar usuários por comportamento',
                  'Monitorar métricas em tempo real',
                  'Criar dashboards personalizados',
                  'Realizar testes A/B regulares',
                  'Automatizar relatórios'
                ].map((practice, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{practice}</span>
                  </div>
                ))}
              </div>
            </DemoCardStatic>

            <DemoCardStatic title="❌ Evitar" description="Armadilhas comuns em analytics">
              <div className="space-y-3">
                {[
                  'Coletar dados sem propósito claro',
                  'Ignorar privacidade e LGPD',
                  'Não validar dados coletados',
                  'Focar apenas em métricas de vaidade',
                  'Não segmentar análises',
                  'Ignorar dados qualitativos',
                  'Não testar implementações',
                  'Análise sem ação'
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
        <DemoSection title="Como Começar" description="Setup inicial de analytics">
          <div className="grid md:grid-cols-2 gap-6">
            <DemoCardStatic title="Checklist de Setup" description="Itens essenciais para implementar">
              <div className="space-y-3">
                {[
                  { item: 'Google Analytics 4 configurado', priority: 'high' },
                  { item: 'Eventos de e-commerce implementados', priority: 'high' },
                  { item: 'Funis de conversão definidos', priority: 'high' },
                  { item: 'Dashboard personalizado criado', priority: 'medium' },
                  { item: 'Segmentação de usuários', priority: 'medium' },
                  { item: 'Relatórios automatizados', priority: 'medium' },
                  { item: 'Testes A/B configurados', priority: 'low' },
                  { item: 'Análise de coorte implementada', priority: 'low' }
                ].map((check, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="mr-3 h-4 w-4 text-blue-600 rounded"
                        readOnly
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{check.item}</span>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded ${
                      check.priority === 'high' ? 'bg-red-100 text-red-800' :
                      check.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {check.priority === 'high' ? 'Alta' :
                       check.priority === 'medium' ? 'Média' : 'Baixa'}
                    </span>
                  </div>
                ))}
              </div>
            </DemoCardStatic>

            <DemoCardStatic title="Configuração Inicial" description="Primeiros passos">
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-green-400 text-sm">
                  <code>{`# 1. Instalar Google Analytics
npm install gtag

# 2. Configurar tracking básico
// pages/_app.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { gtag } from 'gtag';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: url,
      });
    };
    
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
  
  return <Component {...pageProps} />;
}

# 3. Implementar eventos de e-commerce
// Exemplo de tracking de compra
gtag('event', 'purchase', {
  transaction_id: 'ORDER_123',
  value: 25.42,
  currency: 'BRL',
  items: [{
    item_id: 'PROD_123',
    item_name: 'Produto Exemplo',
    category: 'Categoria',
    quantity: 1,
    price: 25.42
  }]
});`}</code>
                </pre>
              </div>
            </DemoCardStatic>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}