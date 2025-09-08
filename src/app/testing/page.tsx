'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CodeBlock } from '@/components/CodeBlock';
import { DemoCard } from '@/components/DemoCard';
import { DemoCardStatic } from '@/components/DemoCardStatic';
import { DemoSection } from '@/components/DemoSection';
import { 
  BeakerIcon, 
  BugAntIcon, 
  CogIcon, 
  DocumentTextIcon,
  PlayIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const testingTools = [
  {
    name: 'Jest',
    description: 'Framework de testes unitários com mocking e coverage',
    icon: BeakerIcon,
    href: '/testing/jest',
    features: ['Unit Testing', 'Mocking', 'Coverage Reports', 'Snapshot Testing']
  },
  {
    name: 'Playwright',
    description: 'Testes E2E cross-browser com debugging avançado',
    icon: PlayIcon,
    href: '/testing/playwright',
    features: ['E2E Testing', 'Cross-browser', 'Visual Testing', 'Auto-wait']
  },
  {
    name: 'React Testing Library',
    description: 'Testes focados no comportamento do usuário',
    icon: CheckCircleIcon,
    href: '/testing/react-testing-library',
    features: ['User-centric', 'Accessibility', 'Integration Tests', 'Best Practices']
  },
  {
    name: 'Storybook',
    description: 'Desenvolvimento e teste de componentes isolados',
    icon: DocumentTextIcon,
    href: '/testing/storybook',
    features: ['Component Testing', 'Visual Testing', 'Documentation', 'Interaction Testing']
  }
];

const testingPyramid = {
  unit: {
    name: 'Unit Tests',
    description: 'Testes rápidos e isolados de funções e componentes',
    percentage: '70%',
    tools: ['Jest', 'React Testing Library'],
    color: 'bg-green-500'
  },
  integration: {
    name: 'Integration Tests',
    description: 'Testes de interação entre componentes',
    percentage: '20%',
    tools: ['React Testing Library', 'Jest'],
    color: 'bg-yellow-500'
  },
  e2e: {
    name: 'E2E Tests',
    description: 'Testes completos do fluxo do usuário',
    percentage: '10%',
    tools: ['Playwright', 'Cypress'],
    color: 'bg-red-500'
  }
};

export default function TestingPage() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Testing & Quality Assurance
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Estratégias completas de teste para garantir qualidade, confiabilidade e manutenibilidade do código
          </p>
        </div>

        {/* Testing Pyramid */}
        <DemoSection title="Pirâmide de Testes" description="Estratégia balanceada de testes">
          <div className="grid md:grid-cols-3 gap-1.5 mb-8">
            {Object.entries(testingPyramid).map(([key, level]) => (
              <DemoCardStatic key={key} title={level.name} description={level.description}>
                <div className="space-y-4">
                  <div className={`h-20 ${level.color} rounded-lg flex items-center justify-center text-white font-bold text-lg`}>
                    {level.percentage}
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Ferramentas:</h4>
                    <div className="flex flex-wrap gap-2">
                      {level.tools.map((tool) => (
                        <span key={tool} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </DemoCardStatic>
            ))}
          </div>
        </DemoSection>

        {/* Testing Tools */}
        <DemoSection title="Ferramentas de Teste" description="Explore cada ferramenta em detalhes">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-1.5 mb-8">
            {testingTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link key={tool.name} href={tool.href}>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center mb-4">
                      <Icon className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {tool.name}
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                      {tool.description}
                    </p>
                    <div className="space-y-2">
                      {tool.features.map((feature) => (
                        <div key={feature} className="flex items-center text-sm">
                          <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </DemoSection>

        {/* Quick Start Guide */}
        <DemoSection title="Guia Rápido" description="Comandos essenciais para começar">
          <div className="grid md:grid-cols-2 gap-1.5">
            <DemoCardStatic title="Testes Unitários" description="Jest + React Testing Library">
              <CodeBlock
                language="bash"
                code={`# Executar todos os testes
npm run test

# Executar em modo watch
npm run test:watch

# Gerar relatório de coverage
npm run test:coverage

# Executar teste específico
npm test -- Navigation.test.tsx`}
              />
            </DemoCardStatic>

            <DemoCardStatic title="Testes E2E" description="Playwright">
              <CodeBlock
                language="bash"
                code={`# Executar testes E2E
npm run test:e2e

# Executar com interface visual
npm run test:e2e:ui

# Executar com browser visível
npm run test:e2e:headed

# Executar todos os testes
npm run test:all`}
              />
            </DemoCardStatic>
          </div>
        </DemoSection>

        {/* Best Practices */}
        <DemoSection title="Melhores Práticas" description="Diretrizes para testes eficazes">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="grid md:grid-cols-2 gap-1.5">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  ✅ Faça
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Teste comportamentos, não implementação</li>
                  <li>• Use nomes descritivos para os testes</li>
                  <li>• Mantenha testes independentes</li>
                  <li>• Teste casos extremos e erros</li>
                  <li>• Use mocks com moderação</li>
                  <li>• Priorize testes de integração</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  ❌ Evite
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Testar detalhes de implementação</li>
                  <li>• Testes muito complexos</li>
                  <li>• Dependências entre testes</li>
                  <li>• Mocks excessivos</li>
                  <li>• Ignorar testes que falham</li>
                  <li>• Testes sem assertions</li>
                </ul>
              </div>
            </div>
          </div>
        </DemoSection>

        {/* Coverage Goals */}
        <DemoSection title="Metas de Coverage" description="Objetivos de cobertura de código">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="grid md:grid-cols-4 gap-1.5">
              {[
                { metric: 'Statements', target: '80%', current: '75%' },
                { metric: 'Branches', target: '70%', current: '68%' },
                { metric: 'Functions', target: '80%', current: '82%' },
                { metric: 'Lines', target: '80%', current: '77%' }
              ].map((item) => (
                <div key={item.metric} className="text-center">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {item.metric}
                  </h4>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                    {item.current}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Meta: {item.target}
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: item.current }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}