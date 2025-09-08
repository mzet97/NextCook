'use client';

import { useState } from 'react';
import Link from 'next/link';
import CodeBlock from '@/components/CodeBlock';
import DemoSection from '@/components/DemoSection';
import { 
  SparklesIcon, 
  ClockIcon, 
  GlobeAltIcon, 
  DocumentTextIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';

const codeExamples = {
  googleFontsBasic: `// app/layout.tsx - Google Fonts básico
import { Inter } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // Melhora performance
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}`,

  googleFontsAdvanced: `// lib/fonts.ts - Configuração avançada
import { 
  Inter, 
  Roboto_Mono, 
  Playfair_Display,
  Open_Sans 
} from 'next/font/google';

// Fonte principal
export const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
});

// Fonte monoespaçada
export const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  weight: ['400', '500', '700'],
});

// Fonte para títulos
export const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  weight: ['400', '700', '900'],
});

// Fonte alternativa
export const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans',
  weight: ['300', '400', '600', '700'],
});`,

  localFonts: `// lib/fonts.ts - Fontes locais
import localFont from 'next/font/local';

// Fonte customizada local
export const customFont = localFont({
  src: [
    {
      path: '../public/fonts/custom-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/custom-medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/custom-bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/custom-italic.woff2',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-custom',
  display: 'swap',
});

// Fonte de ícones
export const iconFont = localFont({
  src: '../public/fonts/icons.woff2',
  variable: '--font-icons',
  display: 'block', // Para ícones
});

// Fonte para logos
export const logoFont = localFont({
  src: '../public/fonts/logo.woff2',
  variable: '--font-logo',
  display: 'swap',
  weight: '400',
});`,

  tailwindConfig: `// tailwind.config.js - Integração com Tailwind
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'Consolas', 'monospace'],
        display: ['var(--font-playfair)', 'serif'],
        body: ['var(--font-open-sans)', 'system-ui', 'sans-serif'],
        custom: ['var(--font-custom)', 'sans-serif'],
        icons: ['var(--font-icons)'],
        logo: ['var(--font-logo)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};`,

  layoutWithFonts: `// app/layout.tsx - Layout com múltiplas fontes
import { 
  inter, 
  robotoMono, 
  playfair, 
  openSans, 
  customFont 
} from '@/lib/fonts';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="pt-BR" 
      className={\`
        \${inter.variable} 
        \${robotoMono.variable} 
        \${playfair.variable} 
        \${openSans.variable}
        \${customFont.variable}
      \`}
    >
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}`,

  cssVariables: `/* globals.css - Variáveis CSS para fontes */
:root {
  --font-inter: 'Inter', system-ui, sans-serif;
  --font-mono: 'Roboto Mono', Consolas, monospace;
  --font-playfair: 'Playfair Display', serif;
  --font-open-sans: 'Open Sans', system-ui, sans-serif;
  --font-custom: 'Custom Font', sans-serif;
}

/* Classes utilitárias */
.font-heading {
  font-family: var(--font-playfair);
  font-weight: 700;
  line-height: 1.2;
}

.font-body {
  font-family: var(--font-open-sans);
  font-weight: 400;
  line-height: 1.6;
}

.font-code {
  font-family: var(--font-mono);
  font-weight: 400;
  font-size: 0.875rem;
}

.font-custom {
  font-family: var(--font-custom);
}

/* Otimizações de performance */
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/inter-regular.woff2') format('woff2');
}`,

  conditionalFonts: `// components/ConditionalFont.tsx
'use client';

import { useState, useEffect } from 'react';
import { Inter, Roboto } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const roboto = Roboto({ 
  weight: ['400', '700'], 
  subsets: ['latin'] 
});

export default function ConditionalFont({ children }: { children: React.ReactNode }) {
  const [useAlternativeFont, setUseAlternativeFont] = useState(false);
  
  useEffect(() => {
    // Detecta preferência do usuário ou condição
    const preference = localStorage.getItem('font-preference');
    setUseAlternativeFont(preference === 'roboto');
  }, []);
  
  const currentFont = useAlternativeFont ? roboto : inter;
  
  return (
    <div className={currentFont.className}>
      <button 
        onClick={() => {
          const newPreference = !useAlternativeFont;
          setUseAlternativeFont(newPreference);
          localStorage.setItem('font-preference', newPreference ? 'roboto' : 'inter');
        }}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Alternar fonte: {useAlternativeFont ? 'Roboto' : 'Inter'}
      </button>
      {children}
    </div>
  );
}`,

  fontOptimization: `// next.config.js - Otimizações de fonte
module.exports = {
  // Preload de fontes críticas
  experimental: {
    fontLoaders: [
      {
        loader: '@next/font/google',
        options: {
          subsets: ['latin'],
          preload: true, // Preload automático
        },
      },
    ],
  },
  
  // Headers para cache de fontes
  async headers() {
    return [
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  
  // Compressão de fontes
  compress: true,
};`,

  fontFallbacks: `// lib/fonts.ts - Fallbacks otimizados
import { Inter } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  // Fallbacks otimizados para reduzir layout shift
  fallback: [
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'sans-serif'
  ],
  // Ajuste de métricas para reduzir CLS
  adjustFontFallback: true,
});

// Para fontes locais
export const customFont = localFont({
  src: './custom-font.woff2',
  display: 'swap',
  // Fallback manual para fontes locais
  fallback: ['Arial', 'sans-serif'],
  // Ajustes manuais de métricas
  adjustFontFallback: false,
});`,

  fontPerformance: `// components/FontPerformance.tsx
'use client';

import { useEffect, useState } from 'react';

interface FontMetrics {
  loadTime: number;
  renderTime: number;
  cls: number;
}

export default function FontPerformance() {
  const [metrics, setMetrics] = useState<FontMetrics | null>(null);
  
  useEffect(() => {
    // Mede performance de carregamento de fontes
    const measureFontPerformance = async () => {
      const startTime = performance.now();
      
      // Aguarda todas as fontes carregarem
      await document.fonts.ready;
      
      const loadTime = performance.now() - startTime;
      
      // Mede CLS (Cumulative Layout Shift)
      const observer = new PerformanceObserver((list) => {
        let cls = 0;
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
            cls += entry.value;
          }
        }
        
        setMetrics({
          loadTime,
          renderTime: performance.now() - startTime,
          cls
        });
      });
      
      observer.observe({ entryTypes: ['layout-shift'] });
    };
    
    measureFontPerformance();
  }, []);
  
  if (!metrics) {
    return <div>Medindo performance...</div>;
  }
  
  return (
    <div className="font-metrics">
      <h3>Métricas de Performance</h3>
      <ul>
        <li>Tempo de carregamento: {metrics.loadTime.toFixed(2)}ms</li>
        <li>Tempo de renderização: {metrics.renderTime.toFixed(2)}ms</li>
        <li>CLS Score: {metrics.cls.toFixed(4)}</li>
      </ul>
    </div>
  );
}`,

  fontSubsetting: `// lib/fonts.ts - Subsetting de fontes
import { Inter, Noto_Sans } from 'next/font/google';

// Fonte principal com subsets específicos
export const inter = Inter({
  subsets: ['latin'], // Apenas caracteres latinos
  display: 'swap',
  // Preload apenas pesos essenciais
  weight: ['400', '600'], 
});

// Fonte para múltiplos idiomas
export const notoSans = Noto_Sans({
  subsets: ['latin', 'latin-ext', 'cyrillic'], // Múltiplos subsets
  display: 'swap',
  weight: ['400', '700'],
});

// Fonte com caracteres específicos
export const mathFont = Inter({
  subsets: ['latin'],
  display: 'swap',
  // Apenas para textos com símbolos matemáticos
  text: '0123456789+-×÷=()[]{}√∞∑∏∫',
});`
};

const fontTypes = [
  {
    type: 'Google Fonts',
    description: 'Fontes hospedadas pelo Google com otimização automática',
    benefits: ['CDN global', 'Cache otimizado', 'Subsets automáticos'],
    example: 'Inter, Roboto, Open Sans',
    color: 'blue',
    icon: '🌐'
  },
  {
    type: 'Local Fonts',
    description: 'Fontes hospedadas localmente para máximo controle',
    benefits: ['Sem dependências externas', 'Controle total', 'Privacy'],
    example: 'Custom fonts, Brand fonts',
    color: 'green',
    icon: '💾'
  },
  {
    type: 'Variable Fonts',
    description: 'Uma fonte com múltiplos pesos e estilos',
    benefits: ['Menor tamanho', 'Flexibilidade', 'Animações suaves'],
    example: 'Inter Variable, Roboto Flex',
    color: 'purple',
    icon: '🎛️'
  },
  {
    type: 'Icon Fonts',
    description: 'Fontes especializadas para ícones',
    benefits: ['Escaláveis', 'Colorização CSS', 'Compatibilidade'],
    example: 'Font Awesome, Material Icons',
    color: 'orange',
    icon: '🎨'
  }
];

const optimizationTechniques = [
  {
    technique: 'Font Display Swap',
    description: 'Mostra fallback até a fonte carregar',
    impact: 'Reduz FOIT (Flash of Invisible Text)',
    code: "display: 'swap'",
    color: 'blue'
  },
  {
    technique: 'Preloading',
    description: 'Carrega fontes críticas antecipadamente',
    impact: 'Reduz tempo de carregamento',
    code: 'preload: true',
    color: 'green'
  },
  {
    technique: 'Subsetting',
    description: 'Carrega apenas caracteres necessários',
    impact: 'Reduz tamanho do arquivo',
    code: "subsets: ['latin']",
    color: 'purple'
  },
  {
    technique: 'Font Fallbacks',
    description: 'Define fontes de backup otimizadas',
    impact: 'Reduz CLS (Cumulative Layout Shift)',
    code: 'adjustFontFallback: true',
    color: 'orange'
  }
];

function FontDemo() {
  const [selectedFont, setSelectedFont] = useState('Inter');
  const [fontSize, setFontSize] = useState(16);
  const [fontWeight, setFontWeight] = useState(400);
  const [lineHeight, setLineHeight] = useState(1.5);
  
  const fonts = {
    'Inter': 'font-sans',
    'Roboto Mono': 'font-mono',
    'Playfair Display': 'font-serif',
    'Custom Font': 'font-custom'
  };
  
  const sampleText = "The quick brown fox jumps over the lazy dog. 1234567890";
  
  return (
    <div className="space-y-6">
      {/* Controles */}
      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Controles de Fonte
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Família da Fonte
            </label>
            <select
              value={selectedFont}
              onChange={(e) => setSelectedFont(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {Object.keys(fonts).map(font => (
                <option key={font} value={font}>{font}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tamanho: {fontSize}px
            </label>
            <input
              type="range"
              min="12"
              max="48"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Peso: {fontWeight}
            </label>
            <input
              type="range"
              min="100"
              max="900"
              step="100"
              value={fontWeight}
              onChange={(e) => setFontWeight(Number(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Altura da linha: {lineHeight}
            </label>
            <input
              type="range"
              min="1"
              max="2"
              step="0.1"
              value={lineHeight}
              onChange={(e) => setLineHeight(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </div>
      
      {/* Preview */}
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg border">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Preview: {selectedFont}
        </h3>
        
        <div 
          className={`${fonts[selectedFont as keyof typeof fonts]} text-gray-900 dark:text-white`}
          style={{
            fontSize: `${fontSize}px`,
            fontWeight: fontWeight,
            lineHeight: lineHeight
          }}
        >
          <div className="space-y-4">
            <h1 style={{ fontSize: `${fontSize * 2}px`, fontWeight: 700 }}>
              Título Principal
            </h1>
            <h2 style={{ fontSize: `${fontSize * 1.5}px`, fontWeight: 600 }}>
              Subtítulo Secundário
            </h2>
            <p>{sampleText}</p>
            <p className="text-sm opacity-75">
              Texto menor para demonstração de hierarquia tipográfica.
            </p>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded">
          <h4 className="font-semibold text-gray-800 dark:text-white mb-2">CSS Aplicado:</h4>
          <code className="text-sm text-gray-600 dark:text-gray-400">
            font-family: {selectedFont};<br/>
            font-size: {fontSize}px;<br/>
            font-weight: {fontWeight};<br/>
            line-height: {lineHeight};
          </code>
        </div>
      </div>
    </div>
  );
}

function OptimizationDemo() {
  const [activeOptimization, setActiveOptimization] = useState('Font Display Swap');
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {optimizationTechniques.map((opt) => (
          <button
            key={opt.technique}
            onClick={() => setActiveOptimization(opt.technique)}
            className={`p-4 rounded-lg border-2 text-left transition-all ${
              activeOptimization === opt.technique
                ? `border-${opt.color}-500 bg-${opt.color}-50 dark:bg-${opt.color}-900/20`
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
              {opt.technique}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {opt.description}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              {opt.impact}
            </p>
          </button>
        ))}
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          {activeOptimization}
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-1.5">
          <div>
            <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Descrição:</h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {optimizationTechniques.find(opt => opt.technique === activeOptimization)?.description}
            </p>
            
            <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Impacto:</h4>
            <p className="text-gray-600 dark:text-gray-400">
              {optimizationTechniques.find(opt => opt.technique === activeOptimization)?.impact}
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Implementação:</h4>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
              <code className="text-sm text-gray-800 dark:text-gray-200">
                {optimizationTechniques.find(opt => opt.technique === activeOptimization)?.code}
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FontOptimizationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Font Optimization
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Otimize fontes no Next.js com next/font para melhor performance e UX
          </p>
        </div>

        <div className="space-y-12">
          {/* Tipos de Fontes */}
          <DemoSection
            title="Tipos de Fontes"
            description="Diferentes estratégias para carregar fontes no Next.js"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1.5">
              {fontTypes.map((type) => (
                <div key={type.type} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-2xl">{type.icon}</span>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      {type.type}
                    </h3>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {type.description}
                  </p>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-700 dark:text-gray-300">Benefícios:</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      {type.benefits.map((benefit, index) => (
                        <li key={index}>• {benefit}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-1">Exemplos:</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{type.example}</p>
                  </div>
                </div>
              ))}
            </div>
          </DemoSection>

          {/* Demo de Fontes */}
          <DemoSection
            title="Demonstração de Fontes"
            description="Experimente diferentes configurações de fontes"
          >
            <FontDemo />
          </DemoSection>

          {/* Técnicas de Otimização */}
          <DemoSection
            title="Técnicas de Otimização"
            description="Estratégias para melhorar performance de fontes"
          >
            <OptimizationDemo />
          </DemoSection>

          {/* Google Fonts Básico */}
          <DemoSection
            title="Google Fonts Básico"
            description="Implementação simples com Google Fonts"
          >
            <CodeBlock
              code={codeExamples.googleFontsBasic}
              language="typescript"
              filename="app/layout.tsx"
            />
          </DemoSection>

          {/* Google Fonts Avançado */}
          <DemoSection
            title="Google Fonts Avançado"
            description="Configuração completa com múltiplas fontes"
          >
            <CodeBlock
              code={codeExamples.googleFontsAdvanced}
              language="typescript"
              filename="lib/fonts.ts"
            />
          </DemoSection>

          {/* Fontes Locais */}
          <DemoSection
            title="Fontes Locais"
            description="Como usar fontes hospedadas localmente"
          >
            <CodeBlock
              code={codeExamples.localFonts}
              language="typescript"
              filename="lib/fonts.ts"
            />
          </DemoSection>

          {/* Integração Tailwind */}
          <DemoSection
            title="Integração com Tailwind CSS"
            description="Configure fontes no Tailwind CSS"
          >
            <CodeBlock
              code={codeExamples.tailwindConfig}
              language="javascript"
              filename="tailwind.config.js"
            />
          </DemoSection>

          {/* Layout com Fontes */}
          <DemoSection
            title="Layout com Múltiplas Fontes"
            description="Como aplicar diferentes fontes no layout"
          >
            <CodeBlock
              code={codeExamples.layoutWithFonts}
              language="typescript"
              filename="app/layout.tsx"
            />
          </DemoSection>

          {/* CSS Variables */}
          <DemoSection
            title="Variáveis CSS"
            description="Use CSS custom properties para fontes"
          >
            <CodeBlock
              code={codeExamples.cssVariables}
              language="css"
              filename="globals.css"
            />
          </DemoSection>

          {/* Fontes Condicionais */}
          <DemoSection
            title="Fontes Condicionais"
            description="Altere fontes dinamicamente baseado em condições"
          >
            <CodeBlock
              code={codeExamples.conditionalFonts}
              language="typescript"
              filename="components/ConditionalFont.tsx"
            />
          </DemoSection>

          {/* Otimização de Performance */}
          <DemoSection
            title="Otimização de Performance"
            description="Configurações avançadas para máxima performance"
          >
            <CodeBlock
              code={codeExamples.fontOptimization}
              language="javascript"
              filename="next.config.js"
            />
          </DemoSection>

          {/* Font Fallbacks */}
          <DemoSection
            title="Font Fallbacks"
            description="Configure fallbacks para reduzir layout shift"
          >
            <CodeBlock
              code={codeExamples.fontFallbacks}
              language="typescript"
              filename="lib/fonts.ts"
            />
          </DemoSection>

          {/* Subsetting */}
          <DemoSection
            title="Font Subsetting"
            description="Carregue apenas os caracteres necessários"
          >
            <CodeBlock
              code={codeExamples.fontSubsetting}
              language="typescript"
              filename="lib/fonts.ts"
            />
          </DemoSection>

          {/* Links de Navegação */}
          <div className="flex justify-between items-center pt-8 border-t border-gray-200 dark:border-gray-700">
            <Link
              href="/nextjs/not-found"
              className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
            >
              <span>← Not Found</span>
            </Link>
            
            <Link
              href="/nextjs"
              className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
            >
              Voltar ao Next.js
            </Link>
            
            <Link
              href="/nextjs/data-fetching"
              className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
            >
              <span>Data Fetching →</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}