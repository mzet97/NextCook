'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Palette, 
  Layers, 
  Zap, 
  Star,
  Package,
  Code,
  Sparkles,
  Brush
} from 'lucide-react';
import { DemoCardStatic } from '@/components/DemoCardStatic';
import { DemoSection } from '@/components/DemoSection';
import { CodeBlock } from '@/components/CodeBlock';

const uiLibraries = [
  {
    name: 'Shadcn/ui',
    description: 'Componentes modernos e acessíveis construídos com Radix UI e Tailwind CSS',
    icon: Package,
    href: '/ui-libraries/shadcn-ui',
    features: ['Copy & Paste', 'Customizable', 'Accessible', 'TypeScript'],
    category: 'Component Library',
    popularity: '⭐⭐⭐⭐⭐',
    bundleSize: '~15kb (tree-shaken)',
    color: 'from-slate-500 to-slate-700'
  },
  {
    name: 'Radix UI',
    description: 'Componentes headless de baixo nível para construir design systems',
    icon: Layers,
    href: '/ui-libraries/radix-ui',
    features: ['Headless', 'Accessible', 'Unstyled', 'Composable'],
    category: 'Headless Components',
    popularity: '⭐⭐⭐⭐⭐',
    bundleSize: '~8kb per component',
    color: 'from-purple-500 to-purple-700'
  },
  {
    name: 'Framer Motion',
    description: 'Biblioteca de animações declarativas para React',
    icon: Zap,
    href: '/ui-libraries/framer-motion',
    features: ['Animations', 'Gestures', 'Layout', 'SVG'],
    category: 'Animation Library',
    popularity: '⭐⭐⭐⭐⭐',
    bundleSize: '~32kb',
    color: 'from-pink-500 to-rose-700'
  },
  {
    name: 'Lucide Icons',
    description: 'Ícones SVG bonitos e consistentes para interfaces modernas',
    icon: Star,
    href: '/ui-libraries/lucide-icons',
    features: ['SVG Icons', 'Tree-shakable', 'Consistent', 'Customizable'],
    category: 'Icon Library',
    popularity: '⭐⭐⭐⭐⭐',
    bundleSize: '~1kb per icon',
    color: 'from-orange-500 to-red-700'
  }
];

const designPrinciples = [
  {
    title: 'Acessibilidade',
    description: 'Componentes que funcionam para todos os usuários',
    icon: '♿',
    details: [
      'Suporte a screen readers',
      'Navegação por teclado',
      'Contraste adequado',
      'ARIA labels apropriados'
    ]
  },
  {
    title: 'Performance',
    description: 'Otimizado para velocidade e eficiência',
    icon: '⚡',
    details: [
      'Tree-shaking automático',
      'Bundle size otimizado',
      'Lazy loading',
      'Renderização eficiente'
    ]
  },
  {
    title: 'Customização',
    description: 'Flexível e adaptável ao seu design',
    icon: '🎨',
    details: [
      'CSS-in-JS ou CSS modules',
      'Theming system',
      'Variantes customizáveis',
      'Override de estilos'
    ]
  },
  {
    title: 'Developer Experience',
    description: 'Fácil de usar e bem documentado',
    icon: '👨‍💻',
    details: [
      'TypeScript nativo',
      'Documentação completa',
      'Exemplos práticos',
      'DevTools integration'
    ]
  }
];

const comparisonData = [
  {
    library: 'Shadcn/ui',
    type: 'Copy & Paste',
    styling: 'Tailwind CSS',
    accessibility: '✅ Excellent',
    customization: '✅ High',
    typescript: '✅ Native',
    maintenance: '✅ Active'
  },
  {
    library: 'Radix UI',
    type: 'Headless',
    styling: 'Bring your own',
    accessibility: '✅ Excellent',
    customization: '✅ Complete',
    typescript: '✅ Native',
    maintenance: '✅ Active'
  },
  {
    library: 'Chakra UI',
    type: 'Styled',
    styling: 'Emotion',
    accessibility: '✅ Good',
    customization: '✅ High',
    typescript: '✅ Native',
    maintenance: '✅ Active'
  },
  {
    library: 'Material-UI',
    type: 'Styled',
    styling: 'Emotion',
    accessibility: '✅ Good',
    customization: '⚠️ Medium',
    typescript: '✅ Native',
    maintenance: '✅ Active'
  },
  {
    library: 'Ant Design',
    type: 'Styled',
    styling: 'Less/CSS',
    accessibility: '⚠️ Fair',
    customization: '⚠️ Medium',
    typescript: '✅ Native',
    maintenance: '✅ Active'
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

export default function UILibrariesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            UI Libraries & Design Systems
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore as melhores bibliotecas de componentes para criar interfaces modernas, 
            acessíveis e performáticas
          </p>
        </motion.div>

        {/* Featured Libraries */}
        <DemoSection title="Bibliotecas em Destaque" description="As principais ferramentas para desenvolvimento de UI">
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-1.5 mb-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {uiLibraries.map((library) => {
              const Icon = library.icon;
              return (
                <motion.div key={library.name} variants={itemVariants}>
                  <Link href={library.href}>
                    <div className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer border border-gray-200 dark:border-gray-700 overflow-hidden relative">
                      {/* Background Gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${library.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                      
                      {/* Icon */}
                      <div className="flex items-center mb-4">
                        <div className={`p-3 rounded-lg bg-gradient-to-br ${library.color} text-white mr-3`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {library.name}
                          </h3>
                          <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                            {library.category}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                        {library.description}
                      </p>
                      
                      {/* Stats */}
                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500 dark:text-gray-400">Popularidade</span>
                          <span className="text-xs">{library.popularity}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500 dark:text-gray-400">Bundle Size</span>
                          <span className="text-xs font-mono text-green-600 dark:text-green-400">{library.bundleSize}</span>
                        </div>
                      </div>
                      
                      {/* Features */}
                      <div className="flex flex-wrap gap-1">
                        {library.features.map((feature) => (
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

        {/* Design Principles */}
        <DemoSection title="Princípios de Design" description="Fundamentos para criar interfaces excepcionais">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-1.5 mb-8">
            {designPrinciples.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <DemoCardStatic title={principle.title} description={principle.description}>
                  <div className="space-y-4">
                    <div className="text-4xl text-center">{principle.icon}</div>
                    <ul className="space-y-2">
                      {principle.details.map((detail, idx) => (
                        <li key={idx} className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                          <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2 flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </DemoCardStatic>
              </motion.div>
            ))}
          </div>
        </DemoSection>

        {/* Comparison Table */}
        <DemoSection title="Comparação de Bibliotecas" description="Análise detalhada das principais opções">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Biblioteca
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Tipo
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Styling
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Acessibilidade
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Customização
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      TypeScript
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Manutenção
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {comparisonData.map((item, index) => (
                    <motion.tr 
                      key={item.library} 
                      className={`${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700/50' : ''} hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {item.library}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {item.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {item.styling}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {item.accessibility}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {item.customization}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {item.typescript}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {item.maintenance}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </DemoSection>

        {/* Getting Started */}
        <DemoSection title="Como Começar" description="Guia rápido para implementar UI libraries">
          <div className="grid md:grid-cols-2 gap-1.5">
            <DemoCardStatic title="Instalação Básica" description="Setup inicial das bibliotecas">
              <CodeBlock
                language="bash"
                code={`# Instalar dependências principais
npm install framer-motion lucide-react

# Radix UI (componentes específicos)
npm install @radix-ui/react-dialog
npm install @radix-ui/react-dropdown-menu
npm install @radix-ui/react-tabs

# Shadcn/ui (via CLI)
npx shadcn-ui@latest init
npx shadcn-ui@latest add button
npx shadcn-ui@latest add dialog`}
              />
            </DemoCardStatic>

            <DemoCardStatic title="Configuração Básica" description="Setup do projeto">
              <CodeBlock
                language="typescript"
                code={`// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}`}
              />
            </DemoCardStatic>
          </div>
        </DemoSection>

        {/* Best Practices */}
        <DemoSection title="Melhores Práticas" description="Dicas para usar UI libraries efetivamente">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <div className="grid md:grid-cols-2 gap-1.5">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-yellow-500" />
                  Performance
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Use tree-shaking para reduzir bundle size</li>
                  <li>• Implemente lazy loading para componentes pesados</li>
                  <li>• Otimize animações com will-change</li>
                  <li>• Use React.memo para componentes puros</li>
                  <li>• Minimize re-renders desnecessários</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Brush className="h-5 w-5 mr-2 text-blue-500" />
                  Design System
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Defina tokens de design consistentes</li>
                  <li>• Crie variantes padronizadas</li>
                  <li>• Documente componentes com Storybook</li>
                  <li>• Implemente temas dark/light</li>
                  <li>• Mantenha consistência visual</li>
                </ul>
              </div>
            </div>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}