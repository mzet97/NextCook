'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Lock, 
  Eye, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Key,
  FileText,
  Globe,
  Server,
  Database,
  Users,
  Settings,
  Zap,
  Clock,
  Activity,
  Target,
  Code,
  Filter,
  RefreshCw,
  ArrowRight
} from 'lucide-react';
import { DemoCard } from '@/components/DemoCard';
import { DemoCardStatic } from '@/components/DemoCardStatic';
import { DemoSection } from '@/components/DemoSection';
import Link from 'next/link';

const securityFeatures = [
  {
    title: 'CSRF Protection',
    description: 'Proteção contra ataques Cross-Site Request Forgery',
    icon: Shield,
    color: 'text-red-500',
    href: '/security/csrf',
    benefits: ['Token Validation', 'SameSite Cookies', 'Origin Checking', 'Double Submit']
  },
  {
    title: 'Rate Limiting',
    description: 'Controle de taxa de requisições e DDoS protection',
    icon: Clock,
    color: 'text-blue-500',
    href: '/security/rate-limiting',
    benefits: ['Request Throttling', 'IP Blocking', 'Sliding Window', 'Distributed Limiting']
  },
  {
    title: 'Input Sanitization',
    description: 'Validação e sanitização de dados de entrada',
    icon: Filter,
    color: 'text-green-500',
    href: '/security/input-sanitization',
    benefits: ['XSS Prevention', 'SQL Injection', 'Data Validation', 'Content Filtering']
  },
  {
    title: 'Security Headers',
    description: 'Headers HTTP para proteção adicional',
    icon: Globe,
    color: 'text-purple-500',
    href: '/security/headers',
    benefits: ['CSP', 'HSTS', 'X-Frame-Options', 'Content-Type']
  }
];

const securityThreats = [
  {
    name: 'Cross-Site Scripting (XSS)',
    severity: 'High',
    description: 'Injeção de scripts maliciosos em páginas web',
    prevention: ['Input sanitization', 'Content Security Policy', 'Output encoding', 'Validation'],
    impact: 'Session hijacking, data theft, malware distribution'
  },
  {
    name: 'SQL Injection',
    severity: 'Critical',
    description: 'Manipulação de consultas SQL através de inputs',
    prevention: ['Prepared statements', 'Input validation', 'Least privilege', 'WAF'],
    impact: 'Data breach, database corruption, unauthorized access'
  },
  {
    name: 'Cross-Site Request Forgery (CSRF)',
    severity: 'Medium',
    description: 'Execução não autorizada de ações em nome do usuário',
    prevention: ['CSRF tokens', 'SameSite cookies', 'Origin validation', 'Double submit'],
    impact: 'Unauthorized actions, data modification, privilege escalation'
  },
  {
    name: 'Distributed Denial of Service (DDoS)',
    severity: 'High',
    description: 'Sobrecarga do servidor com requisições maliciosas',
    prevention: ['Rate limiting', 'CDN protection', 'Load balancing', 'Traffic filtering'],
    impact: 'Service unavailability, performance degradation, revenue loss'
  },
  {
    name: 'Man-in-the-Middle (MITM)',
    severity: 'High',
    description: 'Interceptação de comunicação entre cliente e servidor',
    prevention: ['HTTPS/TLS', 'Certificate pinning', 'HSTS', 'Secure protocols'],
    impact: 'Data interception, credential theft, communication tampering'
  },
  {
    name: 'Session Hijacking',
    severity: 'High',
    description: 'Roubo de identificadores de sessão do usuário',
    prevention: ['Secure cookies', 'Session rotation', 'HTTPS only', 'IP validation'],
    impact: 'Account takeover, unauthorized access, identity theft'
  }
];

const securityChecklist = [
  {
    category: 'Authentication & Authorization',
    items: [
      { task: 'Implement strong password policies', completed: true },
      { task: 'Enable multi-factor authentication', completed: true },
      { task: 'Use secure session management', completed: true },
      { task: 'Implement proper access controls', completed: false },
      { task: 'Regular security audits', completed: false }
    ]
  },
  {
    category: 'Data Protection',
    items: [
      { task: 'Encrypt sensitive data at rest', completed: true },
      { task: 'Use HTTPS for all communications', completed: true },
      { task: 'Implement proper backup encryption', completed: true },
      { task: 'Regular data classification review', completed: false },
      { task: 'Data retention policy compliance', completed: true }
    ]
  },
  {
    category: 'Application Security',
    items: [
      { task: 'Input validation and sanitization', completed: true },
      { task: 'Output encoding implementation', completed: true },
      { task: 'CSRF protection enabled', completed: false },
      { task: 'Security headers configured', completed: false },
      { task: 'Regular dependency updates', completed: true }
    ]
  },
  {
    category: 'Infrastructure Security',
    items: [
      { task: 'Firewall configuration', completed: true },
      { task: 'Intrusion detection system', completed: false },
      { task: 'Regular security patches', completed: true },
      { task: 'Network segmentation', completed: false },
      { task: 'Monitoring and logging', completed: true }
    ]
  }
];

const securityMetrics = [
  {
    name: 'Security Score',
    value: 87,
    target: 95,
    status: 'warning',
    description: 'Overall security posture rating'
  },
  {
    name: 'Vulnerabilities',
    value: 3,
    target: 0,
    status: 'danger',
    description: 'Known security vulnerabilities'
  },
  {
    name: 'Failed Login Attempts',
    value: 127,
    target: 50,
    status: 'warning',
    description: 'Suspicious login attempts (24h)'
  },
  {
    name: 'Security Incidents',
    value: 0,
    target: 0,
    status: 'success',
    description: 'Security incidents this month'
  },
  {
    name: 'Compliance Score',
    value: 94,
    target: 100,
    status: 'success',
    description: 'Regulatory compliance rating'
  },
  {
    name: 'Patch Level',
    value: 98,
    target: 100,
    status: 'success',
    description: 'System patch coverage'
  }
];

const implementationSteps = [
  {
    step: 1,
    title: 'Security Assessment',
    description: 'Avaliar estado atual da segurança',
    tasks: [
      'Audit de vulnerabilidades',
      'Análise de código',
      'Teste de penetração',
      'Revisão de configurações'
    ]
  },
  {
    step: 2,
    title: 'Basic Protections',
    description: 'Implementar proteções fundamentais',
    tasks: [
      'Configurar HTTPS',
      'Implementar autenticação',
      'Validação de entrada',
      'Headers de segurança'
    ]
  },
  {
    step: 3,
    title: 'Advanced Security',
    description: 'Adicionar camadas avançadas',
    tasks: [
      'Rate limiting',
      'CSRF protection',
      'Content Security Policy',
      'Monitoring de segurança'
    ]
  },
  {
    step: 4,
    title: 'Monitoring & Response',
    description: 'Monitoramento e resposta a incidentes',
    tasks: [
      'Logs de segurança',
      'Alertas automáticos',
      'Plano de resposta',
      'Treinamento da equipe'
    ]
  }
];

export default function SecurityPage() {
  const [selectedThreat, setSelectedThreat] = useState(0);
  const [selectedChecklist, setSelectedChecklist] = useState(0);

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300';
      case 'high': return 'text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-300';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300';
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
      case 'warning': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300';
      case 'danger': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl text-white mr-4">
              <Shield className="h-8 w-8" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
              Security
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Proteja sua aplicação com implementações robustas de segurança. 
            CSRF protection, rate limiting, sanitização e headers seguros.
          </p>
        </motion.div>

        {/* Security Features */}
        <DemoSection title="Recursos de Segurança" description="Implementações essenciais para proteger sua aplicação">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {securityFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Link href={feature.href}>
                    <DemoCardStatic title={feature.title} description={feature.description}>
                      <div className="space-y-4 cursor-pointer group">
                        <Icon className={`h-12 w-12 mx-auto ${feature.color} group-hover:scale-110 transition-transform`} />
                        <div className="space-y-2">
                          {feature.benefits.map((benefit) => (
                            <div key={benefit} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                              <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                              {benefit}
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center justify-center text-red-600 dark:text-red-400 group-hover:text-red-700 dark:group-hover:text-red-300">
                          <span className="text-sm font-medium mr-1">Explorar</span>
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                    </DemoCardStatic>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </DemoSection>

        {/* Security Metrics Dashboard */}
        <DemoSection title="Dashboard de Segurança" description="Métricas e indicadores de segurança em tempo real">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {securityMetrics.map((metric, index) => (
                <motion.div
                  key={metric.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {metric.name}
                    </h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(metric.status)}`}>
                      {metric.status === 'success' ? 'OK' :
                       metric.status === 'warning' ? 'ATENÇÃO' : 'CRÍTICO'}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      {metric.name === 'Security Score' || metric.name === 'Compliance Score' || metric.name === 'Patch Level'
                        ? `${metric.value}%`
                        : metric.value.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Target: {metric.name === 'Security Score' || metric.name === 'Compliance Score' || metric.name === 'Patch Level'
                        ? `${metric.target}%`
                        : metric.target.toLocaleString()}
                    </span>
                  </div>
                  
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    {metric.description}
                  </p>
                  
                  {/* Progress bar for percentage metrics */}
                  {(metric.name === 'Security Score' || metric.name === 'Compliance Score' || metric.name === 'Patch Level') && (
                    <div className="mt-2 w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          metric.status === 'success' ? 'bg-green-500' :
                          metric.status === 'warning' ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${metric.value}%` }}
                      ></div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </DemoSection>

        {/* Security Threats */}
        <DemoSection title="Ameaças de Segurança" description="Principais vulnerabilidades e como preveni-las">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-4 px-6 overflow-x-auto">
                {securityThreats.map((threat, index) => (
                  <button
                    key={threat.name}
                    onClick={() => setSelectedThreat(index)}
                    className={`py-4 px-3 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                      selectedThreat === index
                        ? 'border-red-500 text-red-600 dark:text-red-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    {threat.name}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="p-6">
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {securityThreats[selectedThreat].name}
                    </h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(securityThreats[selectedThreat].severity)}`}>
                      {securityThreats[selectedThreat].severity.toUpperCase()}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {securityThreats[selectedThreat].description}
                  </p>
                  
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <h4 className="font-medium text-red-900 dark:text-red-300 mb-2">
                      Impacto Potencial:
                    </h4>
                    <p className="text-red-700 dark:text-red-400 text-sm">
                      {securityThreats[selectedThreat].impact}
                    </p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Métodos de Prevenção
                  </h4>
                  <div className="space-y-3">
                    {securityThreats[selectedThreat].prevention.map((method, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <Shield className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-green-700 dark:text-green-300">{method}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DemoSection>

        {/* Security Checklist */}
        <DemoSection title="Checklist de Segurança" description="Lista de verificação para implementação de segurança">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8 px-6 overflow-x-auto">
                {securityChecklist.map((category, index) => (
                  <button
                    key={category.category}
                    onClick={() => setSelectedChecklist(index)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                      selectedChecklist === index
                        ? 'border-red-500 text-red-600 dark:text-red-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    {category.category}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {securityChecklist[selectedChecklist].items.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    {item.completed ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                    <span className={`flex-1 ${
                      item.completed 
                        ? 'text-gray-900 dark:text-white' 
                        : 'text-gray-600 dark:text-gray-300'
                    }`}>
                      {item.task}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      item.completed 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                    }`}>
                      {item.completed ? 'Concluído' : 'Pendente'}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-blue-900 dark:text-blue-300">
                    Progresso: {securityChecklist[selectedChecklist].category}
                  </span>
                  <span className="text-blue-700 dark:text-blue-400">
                    {securityChecklist[selectedChecklist].items.filter(item => item.completed).length} / {securityChecklist[selectedChecklist].items.length}
                  </span>
                </div>
                <div className="mt-2 w-full bg-blue-200 dark:bg-blue-800 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${(securityChecklist[selectedChecklist].items.filter(item => item.completed).length / securityChecklist[selectedChecklist].items.length) * 100}%` 
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </DemoSection>

        {/* Implementation Guide */}
        <DemoSection title="Guia de Implementação" description="Passos para implementar segurança robusta">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {implementationSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    {step.step}
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {step.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  {step.description}
                </p>
                <ul className="space-y-2">
                  {step.tasks.map((task, taskIndex) => (
                    <li key={taskIndex} className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                      <Shield className="h-3 w-3 text-red-500 mr-2 flex-shrink-0" />
                      {task}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </DemoSection>

        {/* Best Practices */}
        <DemoSection title="Melhores Práticas" description="Diretrizes para segurança robusta">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Lock className="h-5 w-5 mr-2 text-red-500" />
                  Autenticação
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Use autenticação multi-fator</li>
                  <li>• Implemente políticas de senha forte</li>
                  <li>• Gerencie sessões adequadamente</li>
                  <li>• Use tokens seguros</li>
                  <li>• Monitore tentativas de login</li>
                  <li>• Implemente bloqueio de conta</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-green-500" />
                  Proteção de Dados
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Criptografe dados sensíveis</li>
                  <li>• Use HTTPS sempre</li>
                  <li>• Valide todas as entradas</li>
                  <li>• Sanitize outputs</li>
                  <li>• Implemente backups seguros</li>
                  <li>• Monitore acesso a dados</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-blue-500" />
                  Monitoramento
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Configure logs de segurança</li>
                  <li>• Monitore atividades suspeitas</li>
                  <li>• Implemente alertas automáticos</li>
                  <li>• Realize auditorias regulares</li>
                  <li>• Mantenha sistemas atualizados</li>
                  <li>• Tenha plano de resposta</li>
                </ul>
              </div>
            </div>
          </div>
        </DemoSection>

        {/* Quick Start */}
        <DemoSection title="Quick Start" description="Comece rapidamente com implementações de segurança">
          <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Pronto para proteger sua aplicação?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Explore nossas implementações detalhadas de segurança
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {securityFeatures.map((feature) => {
                const Icon = feature.icon;
                return (
                  <Link key={feature.title} href={feature.href}>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center hover:shadow-lg transition-shadow cursor-pointer group">
                      <Icon className={`h-8 w-8 mx-auto mb-2 ${feature.color} group-hover:scale-110 transition-transform`} />
                      <div className="font-medium text-gray-900 dark:text-white text-sm">
                        {feature.title}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}