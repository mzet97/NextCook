'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import DemoCard from '@/components/DemoCard';
import StatsCard from '@/components/StatsCard';
import { useCounterStore } from '@/stores/counter-store';
import { mockDemoData } from '@/lib/mock-data';
import { Search, BookOpen, Code, Zap, Users, Star } from 'lucide-react';
import SearchBar from '@/components/SearchBar';

export default function Home() {
  const { count, increment } = useCounterStore();
  const [mounted, setMounted] = useState(false);
  const t = useTranslations('home');
  const tFeatures = useTranslations('features');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Evita hydration mismatch
  }

  // Organização por níveis de complexidade
  const basicTopics = [
    {
      title: 'Next.js Fundamentos',
      description: 'Configuração, roteamento e conceitos básicos',
      icon: '⚡',
      href: '/nextjs',
      color: 'blue',
      level: 'Básico'
    },
    {
      title: 'React Hooks',
      description: 'useState, useEffect e hooks customizados',
      icon: '⚛️',
      href: '/hooks',
      color: 'purple',
      level: 'Básico'
    },
    {
      title: 'Snippets Práticos',
      description: 'Biblioteca de código pronto para usar',
      icon: '📚',
      href: '/snippets',
      color: 'emerald',
      level: 'Básico'
    }
  ];

  const intermediateTopics = [
    {
      title: 'Gerenciamento de Estado',
      description: 'Zustand, Redux Toolkit e TanStack Query',
      icon: '🗃️',
      href: '/state-management',
      color: 'green',
      level: 'Intermediário'
    },
    {
      title: 'Tailwind CSS',
      description: 'Estilização utilitária e design responsivo',
      icon: '🎨',
      href: '/tailwind',
      color: 'indigo',
      level: 'Intermediário'
    },
    {
      title: 'Formulários',
      description: 'React Hook Form com validação Zod',
      icon: '📝',
      href: '/forms',
      color: 'yellow',
      level: 'Intermediário'
    },
    {
      title: 'Testes',
      description: 'Jest, Testing Library e Playwright',
      icon: '🧪',
      href: '/testing',
      color: 'red',
      level: 'Intermediário'
    }
  ];

  const advancedTopics = [
    {
      title: 'Backend & APIs',
      description: 'Prisma, tRPC, Auth.js e integrações',
      icon: '🔌',
      href: '/backend',
      color: 'yellow',
      level: 'Avançado'
    },
    {
      title: 'Performance',
      description: 'Otimizações, lazy loading e métricas',
      icon: '🚀',
      href: '/performance',
      color: 'red',
      level: 'Avançado'
    },
    {
      title: 'DevOps',
      description: 'Deploy, CI/CD e monitoramento',
      icon: '⚙️',
      href: '/devops',
      color: 'gray',
      level: 'Avançado'
    }
  ];

  const allTopics = [...basicTopics, ...intermediateTopics, ...advancedTopics];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-bg py-24 sm:py-32">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative section-container">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 glass-effect rounded-full text-white text-sm font-medium mb-8 animate-fade-in">
              <BookOpen className="w-4 h-4 mr-2" />
              Cookbook Definitivo para Next.js
            </div>
            <h1 className="hero-title animate-fade-in">
              NextCook
            </h1>
            <p className="hero-subtitle animate-fade-in" style={{animationDelay: '0.2s'}}>
              Guia prático e abrangente com exemplos aplicáveis para desenvolvedores profissionais
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mt-8 animate-fade-in" style={{animationDelay: '0.4s'}}>
              <SearchBar placeholder="Buscar tópicos, exemplos ou soluções..." />
            </div>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-1.5 mt-8 animate-fade-in" style={{animationDelay: '0.6s'}}>
              <div className="glass-effect px-4 py-2 rounded-lg text-white text-sm flex items-center">
                <Code className="w-4 h-4 mr-2" />
                {allTopics.length}+ Tópicos
              </div>
              <div className="glass-effect px-4 py-2 rounded-lg text-white text-sm flex items-center">
                <Zap className="w-4 h-4 mr-2" />
                Exemplos Práticos
              </div>
              <div className="glass-effect px-4 py-2 rounded-lg text-white text-sm flex items-center">
                <Star className="w-4 h-4 mr-2" />
                Melhores Práticas
              </div>
            </div>
          </div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce-slow shadow-glow"></div>
        <div className="absolute top-20 right-20 w-16 h-16 bg-yellow-300/20 rounded-full animate-pulse-slow shadow-glow"></div>
        <div className="absolute bottom-10 left-1/4 w-12 h-12 bg-pink-300/20 rounded-full animate-spin-slow shadow-glow-purple"></div>
        <div className="absolute bottom-20 right-1/4 w-14 h-14 bg-green-300/20 rounded-full animate-bounce-slow shadow-glow-green"></div>
      </section>

      {/* Quick Navigation by Level */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="section-title">
              Índice por Nível de Complexidade
            </h2>
            <p className="section-description">
              Navegue pelos tópicos organizados do básico ao avançado
            </p>
          </div>
          
          {/* Level Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1.5 mb-12">
            <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-2">Básico</h3>
              <p className="text-green-600 dark:text-green-300 text-sm mb-4">
                Fundamentos essenciais para começar
              </p>
              <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                {basicTopics.length} tópicos
              </div>
            </div>
            
            <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-2">Intermediário</h3>
              <p className="text-blue-600 dark:text-blue-300 text-sm mb-4">
                Padrões e técnicas avançadas
              </p>
              <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                {intermediateTopics.length} tópicos
              </div>
            </div>
            
            <div className="text-center p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold text-purple-800 dark:text-purple-200 mb-2">Avançado</h3>
              <p className="text-purple-600 dark:text-purple-300 text-sm mb-4">
                Arquitetura e otimizações profissionais
              </p>
              <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                {advancedTopics.length} tópicos
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Topics by Level Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="section-title">
              Tópicos Organizados por Nível
            </h2>
            <p className="section-description">
              Cada seção contém exemplos práticos, snippets prontos e soluções para problemas reais
            </p>
          </div>
          
          {/* Basic Level */}
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-sm font-bold">1</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Nível Básico</h3>
              <div className="ml-4 px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
                Fundamentos
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1.5">
              {basicTopics.map((topic, index) => (
                <div key={topic.title} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <DemoCard {...topic} />
                </div>
              ))}
            </div>
          </div>
          
          {/* Intermediate Level */}
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-sm font-bold">2</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Nível Intermediário</h3>
              <div className="ml-4 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                Padrões Avançados
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1.5">
              {intermediateTopics.map((topic, index) => (
                <div key={topic.title} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <DemoCard {...topic} />
                </div>
              ))}
            </div>
          </div>
          
          {/* Advanced Level */}
          <div>
            <div className="flex items-center mb-8">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-sm font-bold">3</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Nível Avançado</h3>
              <div className="ml-4 px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium">
                Arquitetura Profissional
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1.5">
              {advancedTopics.map((topic, index) => (
                <div key={topic.title} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <DemoCard {...topic} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cookbook Features */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="section-title">
              Por que usar este Cookbook?
            </h2>
            <p className="section-description">
              Desenvolvido para acelerar seu desenvolvimento profissional com Next.js
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1.5">
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Exemplos Práticos
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Código pronto para usar em projetos reais, com explicações detalhadas
              </p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Organização Clara
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Estruturado por complexidade, fácil navegação e consulta rápida
              </p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Melhores Práticas
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Padrões modernos, otimizações e soluções para problemas comuns
              </p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Sempre Atualizado
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Versões recentes das bibliotecas e técnicas mais atuais
              </p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Para Profissionais
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Focado em cenários reais do dia a dia de desenvolvimento
              </p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Busca Inteligente
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Encontre rapidamente soluções específicas para seus problemas
              </p>
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Comece sua jornada agora!</h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Escolha um nível de complexidade acima e explore os tópicos que mais interessam para seu projeto atual.
              </p>
              <button
                onClick={increment}
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                🐻 Teste o Zustand: {count} cliques
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
