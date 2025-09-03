'use client';

import Link from 'next/link';
import DemoSection from '@/components/DemoSection';
import { BookOpenIcon, CodeBracketIcon, CpuChipIcon } from '@heroicons/react/24/outline';

export default function FormsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Formulários Modernos
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore as melhores práticas para criação de formulários com React Hook Form e Zod.
            Validação robusta, performance otimizada e experiência de usuário excepcional.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">React Hook Form</h3>
                <p className="text-gray-600 dark:text-gray-300">Performance & Simplicidade</p>
              </div>
              <CodeBracketIcon className="h-12 w-12 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Zod</h3>
                <p className="text-gray-600 dark:text-gray-300">Validação TypeScript-first</p>
              </div>
              <CpuChipIcon className="h-12 w-12 text-purple-500" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Integração</h3>
                <p className="text-gray-600 dark:text-gray-300">Melhor dos dois mundos</p>
              </div>
              <BookOpenIcon className="h-12 w-12 text-green-500" />
            </div>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* React Hook Form */}
          <Link href="/forms/react-hook-form" className="group">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <div className="flex items-center mb-4">
                <CodeBracketIcon className="h-8 w-8 text-blue-500 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">React Hook Form</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Biblioteca performática para formulários React com validação mínima de re-renders.
              </p>
              <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                <li>• Formulários controlados e não-controlados</li>
                <li>• Validação em tempo real</li>
                <li>• Integração com UI libraries</li>
                <li>• Performance otimizada</li>
              </ul>
            </div>
          </Link>

          {/* Zod */}
          <Link href="/forms/zod" className="group">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <div className="flex items-center mb-4">
                <CpuChipIcon className="h-8 w-8 text-purple-500 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Zod</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Schema de validação TypeScript-first com inferência de tipos automática.
              </p>
              <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                <li>• Schemas de validação</li>
                <li>• Parsing e transformação</li>
                <li>• Inferência de tipos</li>
                <li>• Mensagens de erro customizadas</li>
              </ul>
            </div>
          </Link>

          {/* Combined */}
          <Link href="/forms/integration" className="group">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <div className="flex items-center mb-4">
                <BookOpenIcon className="h-8 w-8 text-green-500 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Integração</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Combinando React Hook Form com Zod para formulários robustos e type-safe.
              </p>
              <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                <li>• Formulários complexos</li>
                <li>• Validação avançada</li>
                <li>• Type safety completa</li>
                <li>• Exemplos práticos</li>
              </ul>
            </div>
          </Link>
        </div>

        {/* Features Section */}
        <DemoSection 
          title="Por que usar React Hook Form + Zod?"
          description="A combinação perfeita para formulários modernos em React"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">React Hook Form</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Performance superior com mínimos re-renders
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  API simples e intuitiva
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Suporte nativo a validação
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Integração fácil com UI libraries
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Zod</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Type safety automática
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Validação runtime robusta
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Mensagens de erro customizáveis
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Parsing e transformação de dados
                </li>
              </ul>
            </div>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}