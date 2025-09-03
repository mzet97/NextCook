'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Container, 
  Cloud, 
  GitBranch, 
  Settings,
  Server,
  Zap,
  Shield,
  Globe,
  Database,
  Code,
  Play,
  CheckCircle,
  AlertTriangle,
  Monitor,
  Package
} from 'lucide-react';
import { DemoCard } from '@/components/DemoCard';
import { DemoCardStatic } from '@/components/DemoCardStatic';
import { DemoSection } from '@/components/DemoSection';
import { CodeBlock } from '@/components/CodeBlock';

const devopsTools = [
  {
    name: 'Docker',
    description: 'Containerização para desenvolvimento e produção',
    icon: Container,
    href: '/devops/docker',
    features: ['Containerização', 'Isolamento', 'Portabilidade', 'Escalabilidade'],
    category: 'Containerization',
    popularity: '⭐⭐⭐⭐⭐',
    difficulty: 'Medium',
    color: 'from-blue-500 to-blue-700'
  },
  {
    name: 'Vercel',
    description: 'Plataforma de deployment para aplicações frontend',
    icon: Cloud,
    href: '/devops/vercel',
    features: ['Edge Network', 'Serverless', 'Git Integration', 'Analytics'],
    category: 'Deployment Platform',
    popularity: '⭐⭐⭐⭐⭐',
    difficulty: 'Easy',
    color: 'from-black to-gray-800'
  },
  {
    name: 'GitHub Actions',
    description: 'CI/CD integrado ao GitHub para automação',
    icon: GitBranch,
    href: '/devops/github-actions',
    features: ['CI/CD', 'Workflows', 'Matrix Builds', 'Secrets Management'],
    category: 'CI/CD',
    popularity: '⭐⭐⭐⭐⭐',
    difficulty: 'Medium',
    color: 'from-purple-500 to-purple-700'
  },
  {
    name: 'Environment Management',
    description: 'Gerenciamento de variáveis e configurações',
    icon: Settings,
    href: '/devops/environment',
    features: ['Environment Variables', 'Secrets', 'Configuration', 'Security'],
    category: 'Configuration',
    popularity: '⭐⭐⭐⭐⭐',
    difficulty: 'Easy',
    color: 'from-green-500 to-green-700'
  }
];

const devopsConcepts = [
  {
    title: 'Continuous Integration',
    description: 'Integração contínua de código',
    icon: '🔄',
    topics: [
      'Automated testing',
      'Code quality checks',
      'Build automation',
      'Merge conflict resolution'
    ]
  },
  {
    title: 'Continuous Deployment',
    description: 'Deploy automático para produção',
    icon: '🚀',
    topics: [
      'Automated deployments',
      'Blue-green deployment',
      'Canary releases',
      'Rollback strategies'
    ]
  },
  {
    title: 'Infrastructure as Code',
    description: 'Infraestrutura definida por código',
    icon: '🏗️',
    topics: [
      'Terraform',
      'CloudFormation',
      'Ansible',
      'Version control'
    ]
  },
  {
    title: 'Monitoring & Observability',
    description: 'Monitoramento e observabilidade',
    icon: '📊',
    topics: [
      'Application metrics',
      'Log aggregation',
      'Distributed tracing',
      'Alerting systems'
    ]
  }
];

const deploymentStrategies = [
  {
    name: 'Blue-Green Deployment',
    description: 'Duas versões idênticas do ambiente',
    pros: ['Zero downtime', 'Rollback rápido', 'Teste em produção'],
    cons: ['Custo dobrado', 'Complexidade de dados', 'Sincronização'],
    useCase: 'Aplicações críticas com alta disponibilidade'
  },
  {
    name: 'Canary Deployment',
    description: 'Liberação gradual para subset de usuários',
    pros: ['Risco reduzido', 'Feedback rápido', 'Rollback parcial'],
    cons: ['Complexidade de roteamento', 'Monitoramento intensivo', 'Dados inconsistentes'],
    useCase: 'Aplicações com grande base de usuários'
  },
  {
    name: 'Rolling Deployment',
    description: 'Atualização gradual de instâncias',
    pros: ['Sem downtime', 'Uso eficiente de recursos', 'Rollback possível'],
    cons: ['Versões mistas', 'Tempo de deploy longo', 'Complexidade de estado'],
    useCase: 'Aplicações stateless com load balancer'
  },
  {
    name: 'Recreate Deployment',
    description: 'Para toda aplicação e recria',
    pros: ['Simplicidade', 'Estado limpo', 'Sem versões mistas'],
    cons: ['Downtime', 'Perda de sessões', 'Experiência ruim'],
    useCase: 'Aplicações de desenvolvimento ou baixo tráfego'
  }
];

const cicdPipeline = [
  {
    stage: 'Source',
    description: 'Código fonte no repositório',
    tools: ['Git', 'GitHub', 'GitLab', 'Bitbucket'],
    actions: ['Push code', 'Create PR', 'Merge branch']
  },
  {
    stage: 'Build',
    description: 'Compilação e empacotamento',
    tools: ['npm', 'webpack', 'Docker', 'Maven'],
    actions: ['Install deps', 'Run build', 'Create artifacts']
  },
  {
    stage: 'Test',
    description: 'Execução de testes automatizados',
    tools: ['Jest', 'Cypress', 'Playwright', 'SonarQube'],
    actions: ['Unit tests', 'Integration tests', 'E2E tests']
  },
  {
    stage: 'Deploy',
    description: 'Deploy para ambiente de destino',
    tools: ['Vercel', 'AWS', 'Kubernetes', 'Docker'],
    actions: ['Deploy staging', 'Deploy production', 'Health checks']
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

export default function DevOpsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            DevOps & Deployment
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Automatize, monitore e escale suas aplicações com as melhores práticas de DevOps. 
            Do desenvolvimento à produção com confiança e eficiência.
          </p>
        </motion.div>

        {/* Featured Tools */}
        <DemoSection title="Ferramentas Essenciais" description="As principais tecnologias para DevOps moderno">
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {devopsTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <motion.div key={tool.name} variants={itemVariants}>
                  <Link href={tool.href}>
                    <div className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer border border-gray-200 dark:border-gray-700 overflow-hidden relative">
                      {/* Background Gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                      
                      {/* Icon */}
                      <div className="flex items-center mb-4">
                        <div className={`p-3 rounded-lg bg-gradient-to-br ${tool.color} text-white mr-3`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {tool.name}
                          </h3>
                          <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                            {tool.category}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                        {tool.description}
                      </p>
                      
                      {/* Stats */}
                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500 dark:text-gray-400">Popularidade</span>
                          <span className="text-xs">{tool.popularity}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500 dark:text-gray-400">Dificuldade</span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            tool.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                            tool.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {tool.difficulty}
                          </span>
                        </div>
                      </div>
                      
                      {/* Features */}
                      <div className="flex flex-wrap gap-1">
                        {tool.features.map((feature) => (
                          <span key={feature} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                            {feature}
                          </span>
                        ))}
                      </div>
                      
                      {/* Hover Arrow */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">→</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </DemoSection>

        {/* DevOps Concepts */}
        <DemoSection title="Conceitos Fundamentais" description="Princípios essenciais do DevOps">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {devopsConcepts.map((concept, index) => (
              <motion.div
                key={concept.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <DemoCardStatic title={concept.title} description={concept.description}>
                  <div className="space-y-4">
                    <div className="text-4xl text-center">{concept.icon}</div>
                    <ul className="space-y-2">
                      {concept.topics.map((topic, idx) => (
                        <li key={idx} className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                          <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2 flex-shrink-0" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                </DemoCardStatic>
              </motion.div>
            ))}
          </div>
        </DemoSection>

        {/* CI/CD Pipeline */}
        <DemoSection title="Pipeline CI/CD" description="Fluxo completo de integração e deploy contínuo">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <div className="grid md:grid-cols-4 gap-6">
              {cicdPipeline.map((stage, index) => (
                <motion.div
                  key={stage.stage}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  className="relative"
                >
                  {/* Arrow */}
                  {index < cicdPipeline.length - 1 && (
                    <div className="hidden md:block absolute top-8 -right-3 z-10">
                      <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">→</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 h-full">
                    <div className="text-center mb-4">
                      <div className={`w-12 h-12 mx-auto rounded-lg flex items-center justify-center mb-3 ${
                        index === 0 ? 'bg-blue-500' :
                        index === 1 ? 'bg-green-500' :
                        index === 2 ? 'bg-yellow-500' : 'bg-purple-500'
                      }`}>
                        {index === 0 ? <Code className="h-6 w-6 text-white" /> :
                         index === 1 ? <Package className="h-6 w-6 text-white" /> :
                         index === 2 ? <CheckCircle className="h-6 w-6 text-white" /> :
                         <Cloud className="h-6 w-6 text-white" />}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {stage.stage}
                      </h3>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm text-center">
                      {stage.description}
                    </p>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2 text-sm">Ferramentas:</h4>
                        <div className="flex flex-wrap gap-1">
                          {stage.tools.map((tool) => (
                            <span key={tool} className="px-2 py-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded text-xs">
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2 text-sm">Ações:</h4>
                        <ul className="space-y-1">
                          {stage.actions.map((action) => (
                            <li key={action} className="text-xs text-gray-600 dark:text-gray-400 flex items-center">
                              <span className="w-1 h-1 bg-indigo-500 rounded-full mr-2 flex-shrink-0" />
                              {action}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </DemoSection>

        {/* Deployment Strategies */}
        <DemoSection title="Estratégias de Deploy" description="Diferentes abordagens para deploy em produção">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {deploymentStrategies.map((strategy, index) => (
              <motion.div
                key={strategy.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {strategy.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {strategy.description}
                </p>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-medium text-green-700 dark:text-green-400 mb-2">✅ Vantagens</h4>
                    <ul className="space-y-1">
                      {strategy.pros.map((pro, idx) => (
                        <li key={idx} className="text-sm text-gray-600 dark:text-gray-300">
                          • {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-red-700 dark:text-red-400 mb-2">❌ Desvantagens</h4>
                    <ul className="space-y-1">
                      {strategy.cons.map((con, idx) => (
                        <li key={idx} className="text-sm text-gray-600 dark:text-gray-300">
                          • {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                  <h4 className="font-medium text-blue-700 dark:text-blue-400 mb-1">💡 Quando usar</h4>
                  <p className="text-sm text-blue-600 dark:text-blue-300">
                    {strategy.useCase}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </DemoSection>

        {/* Getting Started */}
        <DemoSection title="Como Começar" description="Primeiros passos para implementar DevOps">
          <div className="grid md:grid-cols-2 gap-6">
            <DemoCardStatic title="Setup Básico" description="Configuração inicial do ambiente">
              <CodeBlock
                language="bash"
                code={`# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Instalar Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verificar instalação
docker --version
docker-compose --version

# Instalar Vercel CLI
npm install -g vercel

# Login no Vercel
vercel login`}
              />
            </DemoCardStatic>

            <DemoCardStatic title="Estrutura de Projeto" description="Organização recomendada">
              <CodeBlock
                language="text"
                code={`my-app/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
├── docker/
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── nginx.conf
├── scripts/
│   ├── build.sh
│   ├── test.sh
│   └── deploy.sh
├── .env.example
├── .env.local
├── vercel.json
└── package.json`}
              />
            </DemoCardStatic>
          </div>
        </DemoSection>

        {/* Best Practices */}
        <DemoSection title="Melhores Práticas" description="Diretrizes para DevOps eficiente">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-green-500" />
                  Segurança
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Use secrets management adequado</li>
                  <li>• Implemente scanning de vulnerabilidades</li>
                  <li>• Configure RBAC nos pipelines</li>
                  <li>• Monitore acessos e mudanças</li>
                  <li>• Use imagens base seguras</li>
                  <li>• Mantenha dependências atualizadas</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-yellow-500" />
                  Performance
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Otimize builds com cache</li>
                  <li>• Use builds paralelos</li>
                  <li>• Implemente health checks</li>
                  <li>• Configure auto-scaling</li>
                  <li>• Monitore métricas de performance</li>
                  <li>• Use CDN para assets estáticos</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Monitor className="h-5 w-5 mr-2 text-blue-500" />
                  Monitoramento
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Configure alertas inteligentes</li>
                  <li>• Implemente logging estruturado</li>
                  <li>• Use distributed tracing</li>
                  <li>• Monitore SLA/SLO</li>
                  <li>• Configure dashboards</li>
                  <li>• Documente runbooks</li>
                </ul>
              </div>
            </div>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}