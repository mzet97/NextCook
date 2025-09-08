'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Lock, 
  Key, 
  Eye,
  CheckCircle,
  AlertTriangle,
  Fingerprint,
  Database,
  Globe,
  UserCheck,
  CreditCard,
  FileText
} from 'lucide-react';
import { DemoCardStatic } from '@/components/DemoCardStatic';
import { DemoSection } from '@/components/DemoSection';

const securityFeatures = [
  {
    title: 'PCI Compliance',
    description: 'Conformidade com padrões PCI DSS',
    icon: CreditCard,
    color: 'text-blue-500',
    benefits: ['Data Protection', 'Secure Processing', 'Compliance Audit', 'Risk Mitigation']
  },
  {
    title: 'Data Encryption',
    description: 'Criptografia de dados em trânsito e repouso',
    icon: Lock,
    color: 'text-green-500',
    benefits: ['AES-256 Encryption', 'TLS 1.3', 'Key Management', 'End-to-End Security']
  },
  {
    title: 'Authentication & Authorization',
    description: 'Autenticação e autorização robustas',
    icon: UserCheck,
    color: 'text-purple-500',
    benefits: ['Multi-Factor Auth', 'OAuth 2.0', 'JWT Tokens', 'Role-Based Access']
  },
  {
    title: 'Fraud Prevention',
    description: 'Prevenção e detecção de fraudes',
    icon: Shield,
    color: 'text-red-500',
    benefits: ['ML Detection', 'Risk Scoring', 'Real-time Analysis', 'Behavioral Patterns']
  }
];

const securityThreats = [
  {
    category: 'Payment Fraud',
    description: 'Fraudes relacionadas a pagamentos',
    icon: '💳',
    threats: [
      { name: 'Card Testing', description: 'Teste de cartões roubados' },
      { name: 'Chargeback Fraud', description: 'Contestações fraudulentas' },
      { name: 'Account Takeover', description: 'Sequestro de contas' },
      { name: 'Synthetic Identity', description: 'Identidades sintéticas' }
    ]
  },
  {
    category: 'Data Breaches',
    description: 'Vazamentos e violações de dados',
    icon: '🔓',
    threats: [
      { name: 'SQL Injection', description: 'Injeção de código SQL' },
      { name: 'XSS Attacks', description: 'Cross-site scripting' },
      { name: 'Data Exfiltration', description: 'Roubo de dados' },
      { name: 'Insider Threats', description: 'Ameaças internas' }
    ]
  },
  {
    category: 'System Attacks',
    description: 'Ataques ao sistema e infraestrutura',
    icon: '⚡',
    threats: [
      { name: 'DDoS Attacks', description: 'Ataques de negação de serviço' },
      { name: 'Malware', description: 'Software malicioso' },
      { name: 'Phishing', description: 'Engenharia social' },
      { name: 'Man-in-the-Middle', description: 'Interceptação de comunicação' }
    ]
  },
  {
    category: 'Business Logic',
    description: 'Exploração de lógica de negócio',
    icon: '🎯',
    threats: [
      { name: 'Price Manipulation', description: 'Manipulação de preços' },
      { name: 'Inventory Fraud', description: 'Fraude de estoque' },
      { name: 'Coupon Abuse', description: 'Abuso de cupons' },
      { name: 'Return Fraud', description: 'Fraude em devoluções' }
    ]
  }
];

const implementationExamples = [
  {
    title: 'PCI DSS Implementation',
    description: 'Implementação de conformidade PCI DSS',
    code: `// Configuração PCI DSS para e-commerce
class PCICompliance {
  constructor() {
    this.requirements = {
      network_security: true,
      cardholder_data_protection: true,
      vulnerability_management: true,
      access_control: true,
      monitoring: true,
      security_policies: true
    };
  }
  
  // Requirement 1 & 2: Network Security
  configureNetworkSecurity() {
    return {
      firewall: {
        enabled: true,
        rules: [
          { port: 443, protocol: 'HTTPS', action: 'ALLOW' },
          { port: 80, protocol: 'HTTP', action: 'REDIRECT_TO_HTTPS' },
          { port: 22, protocol: 'SSH', action: 'ALLOW_WHITELIST_ONLY' }
        ]
      },
      network_segmentation: {
        cardholder_data_environment: 'isolated',
        dmz: 'configured',
        internal_network: 'protected'
      },
      default_passwords: 'changed',
      unnecessary_services: 'disabled'
    };
  }
  
  // Requirement 3 & 4: Protect Cardholder Data
  protectCardholderData() {
    return {
      data_retention: {
        policy: 'minimal_retention',
        max_storage_time: '90_days',
        secure_deletion: true
      },
      encryption: {
        at_rest: {
          algorithm: 'AES-256',
          key_management: 'HSM',
          database_encryption: true
        },
        in_transit: {
          protocol: 'TLS_1_3',
          certificate_validation: true,
          perfect_forward_secrecy: true
        }
      },
      masking: {
        display_format: '**** **** **** 1234',
        log_masking: true,
        database_masking: true
      }
    };
  }
  
  // Requirement 5 & 6: Vulnerability Management
  vulnerabilityManagement() {
    return {
      antivirus: {
        installed: true,
        updated: 'daily',
        real_time_scanning: true
      },
      secure_development: {
        code_review: 'mandatory',
        security_testing: 'automated',
        vulnerability_scanning: 'continuous',
        penetration_testing: 'annual'
      },
      patch_management: {
        critical_patches: 'within_30_days',
        security_patches: 'within_60_days',
        testing_process: 'staged_deployment'
      }
    };
  }
  
  // Requirement 7 & 8: Access Control
  accessControl() {
    return {
      principle: 'least_privilege',
      authentication: {
        multi_factor: true,
        password_policy: {
          min_length: 12,
          complexity: 'high',
          expiration: '90_days',
          history: 12
        },
        account_lockout: {
          failed_attempts: 5,
          lockout_duration: '30_minutes'
        }
      },
      authorization: {
        role_based: true,
        regular_review: 'quarterly',
        automated_provisioning: true,
        segregation_of_duties: true
      }
    };
  }
  
  // Requirement 9: Physical Access
  physicalSecurity() {
    return {
      data_center: {
        access_control: 'biometric',
        visitor_management: true,
        surveillance: '24x7',
        environmental_monitoring: true
      },
      media_handling: {
        secure_storage: true,
        destruction_policy: 'certified',
        transport_security: 'encrypted'
      }
    };
  }
  
  // Requirement 10: Monitoring
  monitoring() {
    return {
      logging: {
        all_access: true,
        cardholder_data_access: 'detailed',
        privileged_actions: 'comprehensive',
        retention: '1_year'
      },
      log_monitoring: {
        real_time: true,
        automated_alerts: true,
        daily_review: true,
        incident_response: 'automated'
      },
      time_synchronization: {
        ntp_servers: 'secure',
        accuracy: '+/- 1_second'
      }
    };
  }
  
  // Requirement 11: Security Testing
  securityTesting() {
    return {
      vulnerability_scans: {
        internal: 'quarterly',
        external: 'quarterly',
        after_changes: 'mandatory'
      },
      penetration_testing: {
        frequency: 'annual',
        scope: 'comprehensive',
        methodology: 'owasp'
      },
      intrusion_detection: {
        network_ids: true,
        host_ids: true,
        file_integrity_monitoring: true
      }
    };
  }
  
  // Requirement 12: Security Policy
  securityPolicy() {
    return {
      information_security_policy: {
        documented: true,
        approved: 'annually',
        communicated: 'all_personnel',
        updated: 'as_needed'
      },
      security_awareness: {
        training: 'annual',
        testing: 'quarterly',
        updates: 'continuous'
      },
      incident_response: {
        plan: 'documented',
        team: 'designated',
        testing: 'annual',
        communication: 'defined'
      }
    };
  }
  
  // Validar conformidade
  validateCompliance() {
    const checks = [
      this.configureNetworkSecurity(),
      this.protectCardholderData(),
      this.vulnerabilityManagement(),
      this.accessControl(),
      this.physicalSecurity(),
      this.monitoring(),
      this.securityTesting(),
      this.securityPolicy()
    ];
    
    return {
      compliant: checks.every(check => this.isCompliant(check)),
      requirements_met: checks.length,
      last_assessment: new Date(),
      next_assessment: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
    };
  }
  
  isCompliant(requirement) {
     // Lógica de validação específica para cada requirement
     return true; // Simplificado para exemplo
   }
 }`
   },
   {
     title: 'Fraud Detection System',
     description: 'Sistema de detecção de fraudes em tempo real',
     code: `// Sistema de detecção de fraudes
class FraudDetectionSystem {
  constructor() {
    this.riskFactors = new Map();
    this.blacklist = new Set();
    this.whitelist = new Set();
    this.mlModel = new FraudMLModel();
  }
  
  // Analisar transação para fraude
  async analyzeTransaction(transaction) {
    const riskScore = await this.calculateRiskScore(transaction);
    const decision = this.makeDecision(riskScore);
    
    // Log da análise
    await this.logAnalysis(transaction, riskScore, decision);
    
    return {
      transactionId: transaction.id,
      riskScore,
      decision,
      reasons: this.getDecisionReasons(transaction, riskScore),
      timestamp: new Date()
    };
  }
  
  // Calcular score de risco
  async calculateRiskScore(transaction) {
    const factors = {
      velocity: this.checkVelocity(transaction),
      geolocation: this.checkGeolocation(transaction),
      device: this.checkDevice(transaction),
      behavioral: this.checkBehavioralPatterns(transaction),
      payment: this.checkPaymentMethod(transaction),
      amount: this.checkAmountPatterns(transaction)
    };
    
    // Combinar fatores com pesos
    const weights = {
      velocity: 0.25,
      geolocation: 0.15,
      device: 0.20,
      behavioral: 0.20,
      payment: 0.10,
      amount: 0.10
    };
    
    let riskScore = 0;
    for (const [factor, score] of Object.entries(factors)) {
      riskScore += score * weights[factor];
    }
    
    // Aplicar ML model para refinamento
    const mlScore = await this.mlModel.predict(transaction, factors);
    
    return Math.min(100, Math.max(0, (riskScore * 0.7) + (mlScore * 0.3)));
  }
  
  // Verificar velocidade de transações
  checkVelocity(transaction) {
    const timeWindow = 3600000; // 1 hora
    const now = Date.now();
    
    const recentTransactions = this.getRecentTransactions(
      transaction.userId,
      now - timeWindow
    );
    
    // Múltiplas transações em pouco tempo
    if (recentTransactions.length > 5) {
      return 80;
    }
    
    // Valor total alto em pouco tempo
    const totalAmount = recentTransactions.reduce(
      (sum, tx) => sum + tx.amount, 0
    );
    
    if (totalAmount > 10000) {
      return 70;
    }
    
    return Math.min(50, recentTransactions.length * 10);
  }
  
  // Verificar geolocalização
  checkGeolocation(transaction) {
    const userLocation = this.getUserLocation(transaction.userId);
    const transactionLocation = transaction.location;
    
    if (!userLocation || !transactionLocation) {
      return 30; // Score médio para dados incompletos
    }
    
    const distance = this.calculateDistance(
      userLocation,
      transactionLocation
    );
    
    // Transação muito distante da localização usual
    if (distance > 1000) { // > 1000km
      return 60;
    }
    
    // País diferente
    if (userLocation.country !== transactionLocation.country) {
      return 40;
    }
    
    return Math.min(30, distance / 50);
  }
  
  // Verificar dispositivo
  checkDevice(transaction) {
    const knownDevices = this.getUserDevices(transaction.userId);
    const currentDevice = transaction.deviceFingerprint;
    
    // Dispositivo desconhecido
    if (!knownDevices.includes(currentDevice)) {
      return 50;
    }
    
    // Verificar se dispositivo está na blacklist
    if (this.blacklist.has(currentDevice)) {
      return 90;
    }
    
    return 10;
  }
  
  // Verificar padrões comportamentais
  checkBehavioralPatterns(transaction) {
    const userBehavior = this.getUserBehavior(transaction.userId);
    
    let riskScore = 0;
    
    // Horário incomum
    const hour = new Date(transaction.timestamp).getHours();
    if (hour < 6 || hour > 23) {
      riskScore += 20;
    }
    
    // Valor muito diferente do padrão
    const avgAmount = userBehavior.averageTransactionAmount;
    const deviation = Math.abs(transaction.amount - avgAmount) / avgAmount;
    
    if (deviation > 5) { // 500% de diferença
      riskScore += 40;
    } else if (deviation > 2) { // 200% de diferença
      riskScore += 20;
    }
    
    // Categoria de produto incomum
    const usualCategories = userBehavior.commonCategories;
    if (!usualCategories.includes(transaction.category)) {
      riskScore += 15;
    }
    
    return Math.min(80, riskScore);
  }
  
  // Verificar método de pagamento
  checkPaymentMethod(transaction) {
    const paymentMethod = transaction.paymentMethod;
    
    // Cartão na blacklist
    if (this.blacklist.has(paymentMethod.cardHash)) {
      return 95;
    }
    
    // Cartão recém-emitido
    const cardAge = Date.now() - paymentMethod.issuedDate;
    if (cardAge < 30 * 24 * 60 * 60 * 1000) { // < 30 dias
      return 40;
    }
    
    // Múltiplos cartões do mesmo usuário
    const userCards = this.getUserCards(transaction.userId);
    if (userCards.length > 5) {
      return 30;
    }
    
    return 10;
  }
  
  // Verificar padrões de valor
  checkAmountPatterns(transaction) {
    const amount = transaction.amount;
    
    // Valores redondos (possível teste)
    if (amount % 100 === 0 && amount < 1000) {
      return 30;
    }
    
    // Valores muito baixos (card testing)
    if (amount < 10) {
      return 60;
    }
    
    // Valores muito altos
    if (amount > 50000) {
      return 40;
    }
    
    return 5;
  }
  
  // Tomar decisão baseada no score
  makeDecision(riskScore) {
    if (riskScore >= 80) {
      return 'BLOCK';
    } else if (riskScore >= 50) {
      return 'REVIEW';
    } else if (riskScore >= 30) {
      return 'CHALLENGE'; // Solicitar autenticação adicional
    } else {
      return 'APPROVE';
    }
  }
  
  // Obter razões da decisão
  getDecisionReasons(transaction, riskScore) {
    const reasons = [];
    
    if (riskScore >= 80) {
      reasons.push('High risk score detected');
    }
    
    if (this.blacklist.has(transaction.deviceFingerprint)) {
      reasons.push('Device in blacklist');
    }
    
    if (this.checkVelocity(transaction) > 60) {
      reasons.push('High transaction velocity');
    }
    
    if (this.checkGeolocation(transaction) > 50) {
      reasons.push('Unusual location');
    }
    
    return reasons;
  }
  
  // Atualizar modelo com feedback
  async updateModel(transactionId, actualOutcome) {
    const analysis = await this.getAnalysis(transactionId);
    
    if (analysis) {
      await this.mlModel.updateWithFeedback(
        analysis.transaction,
        analysis.factors,
        actualOutcome
      );
    }
  }
}`
   },
   {
     title: 'Data Protection & GDPR',
     description: 'Proteção de dados e conformidade GDPR',
     code: `// Sistema de proteção de dados GDPR
class DataProtectionSystem {
  constructor() {
    this.consentManager = new ConsentManager();
    this.dataProcessor = new DataProcessor();
    this.auditLogger = new AuditLogger();
  }
  
  // Coletar dados com consentimento
  async collectData(userId, dataType, purpose, data) {
    // Verificar consentimento
    const hasConsent = await this.consentManager.hasConsent(
      userId, dataType, purpose
    );
    
    if (!hasConsent) {
      throw new Error('No consent for data collection');
    }
    
    // Minimização de dados
    const minimizedData = this.minimizeData(data, purpose);
    
    // Criptografar dados sensíveis
    const encryptedData = await this.dataProcessor.encrypt(
      minimizedData, dataType
    );
    
    // Armazenar com metadata
    const record = {
      userId,
      dataType,
      purpose,
      data: encryptedData,
      collectedAt: new Date(),
      retentionPeriod: this.getRetentionPeriod(dataType, purpose),
      legalBasis: this.getLegalBasis(dataType, purpose)
    };
    
    await this.storeData(record);
    
    // Log de auditoria
    await this.auditLogger.log({
      action: 'DATA_COLLECTED',
      userId,
      dataType,
      purpose,
      timestamp: new Date()
    });
    
    return record.id;
  }
  
  // Processar solicitação de acesso (Art. 15)
  async handleAccessRequest(userId) {
    const userData = await this.getAllUserData(userId);
    
    const response = {
      personalData: await this.dataProcessor.decrypt(userData.personal),
      processingPurposes: userData.purposes,
      dataCategories: userData.categories,
      recipients: userData.recipients,
      retentionPeriods: userData.retention,
      rights: this.getUserRights(),
      dataSource: userData.sources
    };
    
    await this.auditLogger.log({
      action: 'ACCESS_REQUEST_PROCESSED',
      userId,
      timestamp: new Date()
    });
    
    return response;
  }
  
  // Processar solicitação de retificação (Art. 16)
  async handleRectificationRequest(userId, corrections) {
    const validatedCorrections = await this.validateCorrections(corrections);
    
    for (const correction of validatedCorrections) {
      await this.updateUserData(userId, correction.field, correction.newValue);
    }
    
    await this.auditLogger.log({
      action: 'DATA_RECTIFIED',
      userId,
      corrections: validatedCorrections,
      timestamp: new Date()
    });
    
    return { success: true, corrected: validatedCorrections.length };
  }
  
  // Processar solicitação de apagamento (Art. 17)
  async handleErasureRequest(userId, reason) {
    // Verificar se é possível apagar
    const canErase = await this.canEraseData(userId, reason);
    
    if (!canErase.allowed) {
      return {
        success: false,
        reason: canErase.reason,
        legalBasis: canErase.legalBasis
      };
    }
    
    // Apagar dados
    const erasedData = await this.eraseUserData(userId);
    
    // Notificar terceiros se necessário
    await this.notifyThirdParties(userId, 'ERASURE');
    
    await this.auditLogger.log({
      action: 'DATA_ERASED',
      userId,
      reason,
      erasedCategories: erasedData.categories,
      timestamp: new Date()
    });
    
    return { success: true, erased: erasedData };
  }
  
  // Processar solicitação de portabilidade (Art. 20)
  async handlePortabilityRequest(userId, format = 'JSON') {
    const portableData = await this.getPortableData(userId);
    
    const exportData = {
      userId,
      exportDate: new Date(),
      format,
      data: await this.dataProcessor.decrypt(portableData)
    };
    
    const exportFile = await this.generateExportFile(exportData, format);
    
    await this.auditLogger.log({
      action: 'DATA_EXPORTED',
      userId,
      format,
      timestamp: new Date()
    });
    
    return exportFile;
  }
  
  // Gerenciar consentimento
  async updateConsent(userId, consentData) {
    const updatedConsent = await this.consentManager.updateConsent(
      userId, consentData
    );
    
    // Se consentimento foi retirado, parar processamento
    if (!updatedConsent.marketing) {
      await this.stopMarketingProcessing(userId);
    }
    
    if (!updatedConsent.analytics) {
      await this.stopAnalyticsProcessing(userId);
    }
    
    await this.auditLogger.log({
      action: 'CONSENT_UPDATED',
      userId,
      newConsent: updatedConsent,
      timestamp: new Date()
    });
    
    return updatedConsent;
  }
  
  // Verificar violação de dados
  async detectDataBreach(incident) {
    const severity = this.assessBreachSeverity(incident);
    
    if (severity.requiresNotification) {
      // Notificar autoridade em 72h
      await this.notifyDataProtectionAuthority(incident, severity);
    }
    
    if (severity.requiresUserNotification) {
      // Notificar usuários afetados
      await this.notifyAffectedUsers(incident.affectedUsers, incident);
    }
    
    await this.auditLogger.log({
      action: 'DATA_BREACH_DETECTED',
      incident,
      severity,
      timestamp: new Date()
    });
    
    return {
      breachId: incident.id,
      severity,
      notificationsSent: severity.requiresNotification,
      usersNotified: severity.requiresUserNotification
    };
  }
  
  // Minimização de dados
  minimizeData(data, purpose) {
    const necessaryFields = this.getNecessaryFields(purpose);
    
    const minimized = {};
    for (const field of necessaryFields) {
      if (data[field] !== undefined) {
        minimized[field] = data[field];
      }
    }
    
    return minimized;
  }
  
  // Obter período de retenção
  getRetentionPeriod(dataType, purpose) {
    const retentionPolicies = {
      'transaction_data': {
        'fraud_prevention': '7_years',
        'accounting': '10_years',
        'marketing': '2_years'
      },
      'personal_data': {
        'service_provision': '5_years',
        'marketing': '2_years',
        'analytics': '1_year'
      }
    };
    
    return retentionPolicies[dataType]?.[purpose] || '1_year';
  }
  
  // Verificar se dados podem ser apagados
  async canEraseData(userId, reason) {
    // Verificar obrigações legais
    const legalObligations = await this.checkLegalObligations(userId);
    
    if (legalObligations.length > 0) {
      return {
        allowed: false,
        reason: 'Legal obligations require data retention',
        legalBasis: legalObligations
      };
    }
    
    // Verificar contratos ativos
    const activeContracts = await this.checkActiveContracts(userId);
    
    if (activeContracts.length > 0) {
      return {
        allowed: false,
        reason: 'Active contracts require data retention',
        legalBasis: activeContracts
      };
    }
    
    return { allowed: true };
  }
}`
   }
 ];

export default function SecurityPage() {
  const [selectedExample, setSelectedExample] = useState(0);
  const [securityStatus, setSecurityStatus] = useState({
    pciCompliant: true,
    sslEnabled: true,
    fraudDetection: true,
    dataEncrypted: true
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl mb-6">
            <Shield className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent mb-4">
            E-commerce Security
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Segurança completa para e-commerce com conformidade PCI DSS e proteção contra fraudes
          </p>
        </motion.div>

        {/* Security Features */}
        <DemoSection title="Recursos de Segurança" description="Funcionalidades essenciais para segurança de e-commerce">
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

        {/* Security Threats */}
        <DemoSection title="Ameaças de Segurança" description="Principais ameaças e como se proteger">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {securityThreats.map((category, index) => (
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
                      {category.threats.map((threat, idx) => (
                        <div key={idx} className="border-l-4 border-red-500 pl-3">
                          <div className="font-semibold text-xs text-red-600 dark:text-red-400">
                            {threat.name}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            {threat.description}
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
        <DemoSection title="Implementação" description="Exemplos práticos de segurança">
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {implementationExamples.map((example, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedExample(index)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedExample === index
                      ? 'bg-red-600 text-white'
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

        {/* Security Dashboard */}
        <DemoSection title="Dashboard de Segurança" description="Monitoramento em tempo real">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'PCI Compliance', status: securityStatus.pciCompliant, icon: CreditCard },
              { label: 'SSL/TLS', status: securityStatus.sslEnabled, icon: Lock },
              { label: 'Fraud Detection', status: securityStatus.fraudDetection, icon: Shield },
              { label: 'Data Encryption', status: securityStatus.dataEncrypted, icon: Key }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <DemoCardStatic title={item.label} description={`Status: ${item.status ? 'Ativo' : 'Inativo'}`}>
                    <div className="text-center space-y-4">
                      <Icon className={`h-12 w-12 mx-auto ${item.status ? 'text-green-500' : 'text-red-500'}`} />
                      <div className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${
                        item.status 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {item.status ? '✓ Ativo' : '✗ Inativo'}
                      </div>
                    </div>
                  </DemoCardStatic>
                </motion.div>
              );
            })}
          </div>
        </DemoSection>

        {/* Best Practices */}
        <DemoSection title="Melhores Práticas" description="Diretrizes de segurança para e-commerce">
          <div className="grid md:grid-cols-2 gap-6">
            <DemoCardStatic title="✅ Implementar" description="Práticas essenciais de segurança">
              <div className="space-y-3">
                {[
                  'Certificado SSL/TLS válido',
                  'Conformidade PCI DSS',
                  'Autenticação multifator',
                  'Criptografia de dados sensíveis',
                  'Monitoramento de fraudes',
                  'Backup e recovery seguros',
                  'Testes de penetração regulares',
                  'Treinamento de segurança'
                ].map((practice, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{practice}</span>
                  </div>
                ))}
              </div>
            </DemoCardStatic>

            <DemoCardStatic title="❌ Evitar" description="Práticas que comprometem a segurança">
              <div className="space-y-3">
                {[
                  'Armazenar dados de cartão sem criptografia',
                  'Usar senhas fracas ou padrão',
                  'Ignorar atualizações de segurança',
                  'Não monitorar logs de acesso',
                  'Expor informações sensíveis em URLs',
                  'Não validar entrada de usuários',
                  'Usar protocolos inseguros (HTTP)',
                  'Não ter plano de resposta a incidentes'
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
        <DemoSection title="Como Começar" description="Setup inicial de segurança">
          <div className="grid md:grid-cols-2 gap-6">
            <DemoCardStatic title="Checklist de Segurança" description="Itens essenciais para implementar">
              <div className="space-y-3">
                {[
                  { item: 'Certificado SSL instalado', priority: 'high' },
                  { item: 'Firewall configurado', priority: 'high' },
                  { item: 'Sistema de backup ativo', priority: 'high' },
                  { item: 'Monitoramento de logs', priority: 'medium' },
                  { item: 'Política de senhas', priority: 'medium' },
                  { item: 'Treinamento de equipe', priority: 'medium' },
                  { item: 'Testes de penetração', priority: 'low' },
                  { item: 'Auditoria de segurança', priority: 'low' }
                ].map((check, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="mr-3 h-4 w-4 text-red-600 rounded"
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
                  <code>{`# 1. Instalar certificado SSL
# Obter certificado de CA confiável
# Configurar HTTPS redirect

# 2. Configurar firewall
sudo ufw enable
sudo ufw allow 443/tcp
sudo ufw allow 80/tcp
sudo ufw deny 22/tcp

# 3. Configurar variáveis de ambiente
ENCRYPTION_KEY=your_encryption_key
JWT_SECRET=your_jwt_secret
DATABASE_ENCRYPTION=enabled

# 4. Implementar rate limiting
# Express.js example
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

# 5. Configurar logs de segurança
# Implementar logging estruturado
# Monitorar tentativas de acesso
# Alertas automáticos`}</code>
                </pre>
              </div>
            </DemoCardStatic>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}