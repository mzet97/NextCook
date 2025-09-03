'use client';

import { useState, useEffect } from 'react';
import CodeBlock from '@/components/CodeBlock';
import DemoSection from '@/components/DemoSection';

// Hook para detectar tamanho da tela
function useScreenSize() {
  const [screenSize, setScreenSize] = useState('unknown');

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      if (width < 640) setScreenSize('sm (< 640px)');
      else if (width < 768) setScreenSize('md (640px - 767px)');
      else if (width < 1024) setScreenSize('lg (768px - 1023px)');
      else if (width < 1280) setScreenSize('xl (1024px - 1279px)');
      else setScreenSize('2xl (≥ 1280px)');
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  return screenSize;
}

// Demonstração de Breakpoints
function BreakpointsDemo() {
  const screenSize = useScreenSize();

  const codeExample = `<!-- Breakpoints do Tailwind CSS -->
sm: 640px   // Small devices (landscape phones)
md: 768px   // Medium devices (tablets)
lg: 1024px  // Large devices (desktops)
xl: 1280px  // Extra large devices (large desktops)
2xl: 1536px // 2X Extra large devices

<!-- Uso dos breakpoints -->
<div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6">
  Responsivo
</div>

<!-- Mobile First -->
<div className="text-sm md:text-base lg:text-lg xl:text-xl">
  Texto que cresce com a tela
</div>`;

  return (
    <DemoSection title="Breakpoints" description="Sistema de breakpoints responsivos">
      <div className="space-y-6">
        <div className="text-center p-4 bg-blue-100 dark:bg-blue-900 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Tamanho Atual da Tela</h3>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{screenSize}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Redimensione a janela para ver as mudanças
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold mb-3">Breakpoints do Tailwind:</h4>
          <div className="grid gap-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded">
              <span className="font-mono text-sm">sm</span>
              <span className="text-sm">640px+</span>
              <span className="text-xs text-gray-500">Landscape phones</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded">
              <span className="font-mono text-sm">md</span>
              <span className="text-sm">768px+</span>
              <span className="text-xs text-gray-500">Tablets</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded">
              <span className="font-mono text-sm">lg</span>
              <span className="text-sm">1024px+</span>
              <span className="text-xs text-gray-500">Desktops</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded">
              <span className="font-mono text-sm">xl</span>
              <span className="text-sm">1280px+</span>
              <span className="text-xs text-gray-500">Large desktops</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded">
              <span className="font-mono text-sm">2xl</span>
              <span className="text-sm">1536px+</span>
              <span className="text-xs text-gray-500">Extra large</span>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold mb-3">Demonstração Visual:</h4>
          <div className="space-y-3">
            {/* Demonstração de largura responsiva */}
            <div className="bg-red-500 h-12 w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 rounded flex items-center justify-center text-white font-semibold">
              w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4
            </div>
            
            {/* Demonstração de texto responsivo */}
            <div className="bg-blue-500 p-4 rounded text-white text-center">
              <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
                Texto responsivo: xs → sm → base → lg → xl
              </p>
            </div>
            
            {/* Demonstração de padding responsivo */}
            <div className="bg-green-500 text-white rounded p-2 sm:p-4 md:p-6 lg:p-8 xl:p-10">
              <p className="text-center">Padding responsivo: p-2 → p-4 → p-6 → p-8 → p-10</p>
            </div>
          </div>
        </div>
        
        <CodeBlock code={codeExample} language="html" />
      </div>
    </DemoSection>
  );
}

// Demonstração de Grid Responsivo
function ResponsiveGridDemo() {
  const items = Array.from({ length: 12 }, (_, i) => i + 1);

  const codeExample = `<!-- Grid Responsivo -->
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
  {items.map(item => (
    <div key={item} className="bg-blue-500 p-4 text-white text-center rounded">
      Item {item}
    </div>
  ))}
</div>

<!-- Comportamento:
- Mobile: 1 coluna
- Small: 2 colunas
- Medium: 3 colunas
- Large: 4 colunas
- Extra Large: 6 colunas
-->`;

  return (
    <DemoSection title="Grid Responsivo" description="Layout de grid que se adapta ao tamanho da tela">
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold mb-3">Grid Adaptativo (1→2→3→4→6 colunas):</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {items.map(item => (
              <div key={item} className="bg-blue-500 p-4 text-white text-center rounded font-semibold">
                Item {item}
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold mb-3">Grid com Diferentes Proporções:</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div className="bg-red-500 p-4 text-white text-center rounded col-span-2 md:col-span-2 lg:col-span-3">
              Destaque
            </div>
            <div className="bg-green-500 p-4 text-white text-center rounded">
              A
            </div>
            <div className="bg-yellow-500 p-4 text-white text-center rounded">
              B
            </div>
            <div className="bg-purple-500 p-4 text-white text-center rounded">
              C
            </div>
            <div className="bg-pink-500 p-4 text-white text-center rounded">
              D
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold mb-3">Cards Responsivos:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(item => (
              <div key={item} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
                <div className="w-full h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg mb-4"></div>
                <h3 className="text-lg font-semibold mb-2">Card {item}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Este é um card responsivo que se adapta ao layout da tela.
                </p>
              </div>
            ))}
          </div>
        </div>
        
        <CodeBlock code={codeExample} language="html" />
      </div>
    </DemoSection>
  );
}

// Demonstração de Flexbox Responsivo
function ResponsiveFlexDemo() {
  const codeExample = `<!-- Flex Direction Responsivo -->
<div className="flex flex-col md:flex-row gap-4">
  <div className="flex-1">Conteúdo Principal</div>
  <div className="w-full md:w-64">Sidebar</div>
</div>

<!-- Flex Wrap Responsivo -->
<div className="flex flex-wrap gap-4">
  <div className="w-full sm:w-auto flex-1 min-w-0">Item 1</div>
  <div className="w-full sm:w-auto flex-1 min-w-0">Item 2</div>
  <div className="w-full sm:w-auto flex-1 min-w-0">Item 3</div>
</div>

<!-- Justify Content Responsivo -->
<div className="flex flex-col sm:flex-row justify-start sm:justify-center lg:justify-between">
  <!-- Items -->
</div>`;

  return (
    <DemoSection title="Flexbox Responsivo" description="Layouts flexíveis que se adaptam">
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold mb-3">Layout Principal + Sidebar:</h4>
          <div className="flex flex-col md:flex-row gap-4 min-h-[200px]">
            <div className="flex-1 bg-blue-500 text-white p-6 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Conteúdo Principal</h3>
                <p className="text-sm opacity-90">flex-1 (ocupa espaço restante)</p>
              </div>
            </div>
            <div className="w-full md:w-64 bg-green-500 text-white p-6 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Sidebar</h3>
                <p className="text-sm opacity-90">w-full md:w-64</p>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold mb-3">Flex Wrap Responsivo:</h4>
          <div className="flex flex-wrap gap-4">
            <div className="w-full sm:w-auto flex-1 min-w-0 bg-red-500 text-white p-4 rounded text-center">
              Item 1
            </div>
            <div className="w-full sm:w-auto flex-1 min-w-0 bg-yellow-500 text-white p-4 rounded text-center">
              Item 2
            </div>
            <div className="w-full sm:w-auto flex-1 min-w-0 bg-purple-500 text-white p-4 rounded text-center">
              Item 3
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold mb-3">Justify Content Responsivo:</h4>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-start sm:justify-center lg:justify-between gap-4 p-4 bg-gray-100 dark:bg-gray-800 rounded">
              <div className="bg-orange-500 text-white px-4 py-2 rounded text-center">
                Start
              </div>
              <div className="bg-teal-500 text-white px-4 py-2 rounded text-center">
                Center
              </div>
              <div className="bg-indigo-500 text-white px-4 py-2 rounded text-center">
                Between
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Mobile: flex-col justify-start | Tablet: flex-row justify-center | Desktop: justify-between
            </p>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold mb-3">Navigation Responsiva:</h4>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="text-xl font-bold">Logo</div>
              <nav className="flex flex-col sm:flex-row gap-2 sm:gap-6 w-full sm:w-auto">
                <a href="#" className="text-gray-600 hover:text-blue-600 py-2 sm:py-0">Home</a>
                <a href="#" className="text-gray-600 hover:text-blue-600 py-2 sm:py-0">About</a>
                <a href="#" className="text-gray-600 hover:text-blue-600 py-2 sm:py-0">Services</a>
                <a href="#" className="text-gray-600 hover:text-blue-600 py-2 sm:py-0">Contact</a>
              </nav>
            </div>
          </div>
        </div>
        
        <CodeBlock code={codeExample} language="html" />
      </div>
    </DemoSection>
  );
}

// Demonstração de Hide/Show Responsivo
function ResponsiveVisibilityDemo() {
  const codeExample = `<!-- Hide/Show em diferentes tamanhos -->
<div className="block sm:hidden">Visível apenas no mobile</div>
<div className="hidden sm:block md:hidden">Visível apenas no tablet</div>
<div className="hidden md:block">Visível apenas no desktop+</div>

<!-- Combinações úteis -->
<div className="sm:hidden">Mobile only</div>
<div className="hidden sm:block">Tablet e desktop</div>
<div className="hidden lg:block">Desktop large+</div>

<!-- Menu mobile/desktop -->
<div className="md:hidden">
  <!-- Menu mobile (hamburger) -->
</div>
<div className="hidden md:block">
  <!-- Menu desktop -->
</div>`;

  return (
    <DemoSection title="Visibilidade Responsiva" description="Mostrar/ocultar elementos por tamanho de tela">
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold mb-3">Elementos por Tamanho de Tela:</h4>
          <div className="space-y-3">
            <div className="block sm:hidden bg-red-500 text-white p-3 rounded text-center">
              📱 Visível apenas no MOBILE (block sm:hidden)
            </div>
            <div className="hidden sm:block md:hidden bg-green-500 text-white p-3 rounded text-center">
              📱 Visível apenas no TABLET (hidden sm:block md:hidden)
            </div>
            <div className="hidden md:block lg:hidden bg-blue-500 text-white p-3 rounded text-center">
              💻 Visível apenas no DESKTOP MÉDIO (hidden md:block lg:hidden)
            </div>
            <div className="hidden lg:block bg-purple-500 text-white p-3 rounded text-center">
              🖥️ Visível apenas no DESKTOP GRANDE+ (hidden lg:block)
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold mb-3">Combinações Comuns:</h4>
          <div className="space-y-3">
            <div className="sm:hidden bg-orange-500 text-white p-3 rounded text-center">
              📱 Mobile Only (sm:hidden)
            </div>
            <div className="hidden sm:block bg-teal-500 text-white p-3 rounded text-center">
              📱💻 Tablet e Desktop (hidden sm:block)
            </div>
            <div className="hidden md:block bg-indigo-500 text-white p-3 rounded text-center">
              💻 Desktop+ (hidden md:block)
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold mb-3">Exemplo: Menu Responsivo</h4>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div className="text-xl font-bold">Logo</div>
              
              {/* Menu Mobile */}
              <div className="md:hidden">
                <button className="bg-blue-500 text-white px-3 py-2 rounded text-sm">
                  ☰ Menu
                </button>
              </div>
              
              {/* Menu Desktop */}
              <nav className="hidden md:flex space-x-6">
                <a href="#" className="text-gray-600 hover:text-blue-600">Home</a>
                <a href="#" className="text-gray-600 hover:text-blue-600">About</a>
                <a href="#" className="text-gray-600 hover:text-blue-600">Services</a>
                <a href="#" className="text-gray-600 hover:text-blue-600">Contact</a>
              </nav>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold mb-3">Informações Contextuais:</h4>
          <div className="grid gap-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded">
              <span className="font-mono text-sm">block sm:hidden</span>
              <span className="text-sm">Visível: &lt; 640px</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded">
              <span className="font-mono text-sm">hidden sm:block</span>
              <span className="text-sm">Visível: ≥ 640px</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded">
              <span className="font-mono text-sm">hidden md:block</span>
              <span className="text-sm">Visível: ≥ 768px</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded">
              <span className="font-mono text-sm">hidden lg:block</span>
              <span className="text-sm">Visível: ≥ 1024px</span>
            </div>
          </div>
        </div>
        
        <CodeBlock code={codeExample} language="html" />
      </div>
    </DemoSection>
  );
}

export default function ResponsivePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            📱 Design Responsivo
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Demonstrações de design responsivo com Tailwind CSS: breakpoints, grids adaptativos e visibilidade condicional
          </p>
        </div>

        <div className="grid gap-8 max-w-6xl mx-auto">
          <BreakpointsDemo />
          <ResponsiveGridDemo />
          <ResponsiveFlexDemo />
          <ResponsiveVisibilityDemo />
        </div>
      </div>
    </div>
  );
}