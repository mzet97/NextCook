'use client';

import { useState } from 'react';
import DemoCard from '@/components/DemoCard';
import { useThemeStore } from '@/stores/theme-store';

const tailwindFeatures = [
  {
    title: 'Utility Classes',
    description: 'Grid, flexbox, spacing, colors e muito mais com classes utilitárias.',
    icon: '🎯',
    href: '/tailwind/utilities',
    color: 'blue' as const
  },
  {
    title: 'Custom Themes',
    description: 'Dark/light mode, paletas de cores personalizadas e tipografia.',
    icon: '🎨',
    href: '/tailwind/themes',
    color: 'purple' as const
  },
  {
    title: 'Responsive Design',
    description: 'Breakpoints, design mobile-first e layouts adaptativos.',
    icon: '📱',
    href: '/tailwind/responsive',
    color: 'green' as const
  }
];

const colorPalette = [
  { name: 'Blue', class: 'bg-blue-500', hex: '#3B82F6' },
  { name: 'Purple', class: 'bg-purple-500', hex: '#8B5CF6' },
  { name: 'Green', class: 'bg-green-500', hex: '#10B981' },
  { name: 'Pink', class: 'bg-pink-500', hex: '#EC4899' },
  { name: 'Yellow', class: 'bg-yellow-500', hex: '#F59E0B' },
  { name: 'Red', class: 'bg-red-500', hex: '#EF4444' }
];

const spacingExamples = [
  { label: 'p-2', value: '8px', class: 'p-2 bg-blue-100 dark:bg-blue-900' },
  { label: 'p-4', value: '16px', class: 'p-4 bg-green-100 dark:bg-green-900' },
  { label: 'p-6', value: '24px', class: 'p-6 bg-purple-100 dark:bg-purple-900' },
  { label: 'p-8', value: '32px', class: 'p-8 bg-pink-100 dark:bg-pink-900' }
];

export default function TailwindPage() {
  const { theme, toggleTheme } = useThemeStore();
  const [activeTab, setActiveTab] = useState('colors');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-white text-sm font-medium mb-6">
              <span className="mr-2">🎨</span>
              Tailwind CSS Showcase
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Tailwind CSS
              <span className="block text-yellow-300">Showcase</span>
            </h1>
            <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
              Explore utilitários CSS, temas personalizados e design responsivo com Tailwind CSS.
            </p>
            <button
              onClick={toggleTheme}
              className="inline-flex items-center px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors duration-200"
            >
              {theme === 'light' ? '🌙' : '☀️'}
              <span className="ml-2">
                Alternar para {theme === 'light' ? 'Dark' : 'Light'} Mode
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Demo Tabs */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Demonstração Interativa
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Explore diferentes aspectos do Tailwind CSS
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              {['colors', 'spacing', 'typography'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    activeTab === tab
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8">
            {activeTab === 'colors' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                  Paleta de Cores
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {colorPalette.map((color) => (
                    <div key={color.name} className="text-center">
                      <div className={`w-20 h-20 ${color.class} rounded-lg mx-auto mb-2 shadow-lg`}></div>
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {color.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {color.hex}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'spacing' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                  Sistema de Espaçamento
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1.5">
                  {spacingExamples.map((spacing) => (
                    <div key={spacing.label} className="text-center">
                      <div className={`${spacing.class} rounded-lg mb-2 flex items-center justify-center text-gray-700 dark:text-gray-300 font-mono text-sm`}>
                        {spacing.label}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {spacing.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'typography' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                  Sistema de Tipografia
                </h3>
                <div className="space-y-4">
                  <div className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                    text-4xl font-bold
                  </div>
                  <div className="text-3xl font-semibold text-gray-800 dark:text-gray-200">
                    text-3xl font-semibold
                  </div>
                  <div className="text-2xl font-medium text-gray-700 dark:text-gray-300">
                    text-2xl font-medium
                  </div>
                  <div className="text-xl text-gray-600 dark:text-gray-400">
                    text-xl regular
                  </div>
                  <div className="text-lg text-gray-500 dark:text-gray-500">
                    text-lg regular
                  </div>
                  <div className="text-base text-gray-400 dark:text-gray-600">
                    text-base regular
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Recursos do Tailwind
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Explore cada aspecto do framework CSS mais popular
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-1.5">
            {tailwindFeatures.map((feature) => (
              <div key={feature.title} className="transform hover:scale-105 transition-transform duration-200">
                <DemoCard {...feature} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Responsive Demo */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Design Responsivo
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Veja como os elementos se adaptam a diferentes tamanhos de tela
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-red-100 dark:bg-red-900 p-4 rounded-lg text-center">
              <div className="text-red-800 dark:text-red-200 font-semibold">Mobile</div>
              <div className="text-sm text-red-600 dark:text-red-400">&lt; 640px</div>
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg text-center">
              <div className="text-yellow-800 dark:text-yellow-200 font-semibold">Tablet</div>
              <div className="text-sm text-yellow-600 dark:text-yellow-400">640px+</div>
            </div>
            <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg text-center">
              <div className="text-green-800 dark:text-green-200 font-semibold">Desktop</div>
              <div className="text-sm text-green-600 dark:text-green-400">1024px+</div>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg text-center">
              <div className="text-blue-800 dark:text-blue-200 font-semibold">Large</div>
              <div className="text-sm text-blue-600 dark:text-blue-400">1280px+</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}