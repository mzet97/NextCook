'use client';

import { useState } from 'react';
import CodeBlock from '@/components/CodeBlock';
import DemoSection from '@/components/DemoSection';
import { useTheme } from '@/hooks';

// Demonstração de Dark/Light Mode
function DarkLightModeDemo() {
  const { theme, isDark, toggleTheme, setTheme } = useTheme();

  const codeExample = `<!-- Configuração no Tailwind -->
// tailwind.config.js
module.exports = {
  darkMode: 'class', // ou 'media'
  // ...
}

<!-- HTML com classes dark: -->
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  <h1 className="text-2xl font-bold">Título</h1>
  <p className="text-gray-600 dark:text-gray-300">Texto secundário</p>
  <button className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
    Botão
  </button>
</div>`;

  return (
    <DemoSection title="Dark/Light Mode" description="Sistema de tema escuro e claro">
      <div className="space-y-6">
        <div className="flex gap-4 justify-center">
          <button
            onClick={toggleTheme}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            {isDark ? '☀️' : '🌙'} Alternar Tema
          </button>
          <button
            onClick={() => setTheme('light')}
            className="px-4 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors"
          >
            ☀️ Claro
          </button>
          <button
            onClick={() => setTheme('dark')}
            className="px-4 py-3 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition-colors"
          >
            🌙 Escuro
          </button>
        </div>
        
        <div className="text-center">
          <p className="text-lg">Tema atual: <strong>{theme}</strong> {isDark ? '🌙' : '☀️'}</p>
        </div>
        
        {/* Demonstração visual dos temas */}
        <div className="grid md:grid-cols-2 gap-1.5">
          {/* Light Theme Preview */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🌞 Tema Claro</h3>
            <div className="space-y-3">
              <div className="bg-gray-50 text-gray-900 p-3 rounded">Background Claro</div>
              <div className="text-gray-600">Texto Secundário</div>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors">
                Botão Primário
              </button>
              <div className="border border-gray-200 p-3 rounded">Card com Border</div>
            </div>
          </div>
          
          {/* Dark Theme Preview */}
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">🌙 Tema Escuro</h3>
            <div className="space-y-3">
              <div className="bg-gray-800 text-white p-3 rounded">Background Escuro</div>
              <div className="text-gray-300">Texto Secundário</div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors">
                Botão Primário
              </button>
              <div className="border border-gray-700 p-3 rounded text-white">Card com Border</div>
            </div>
          </div>
        </div>
        
        <CodeBlock code={codeExample} language="javascript" />
      </div>
    </DemoSection>
  );
}

// Demonstração de Custom Color Palette
function CustomColorPaletteDemo() {
  const customColors = [
    { name: 'Primary', bg: 'bg-blue-500', text: 'text-blue-500', hex: '#3B82F6' },
    { name: 'Secondary', bg: 'bg-purple-500', text: 'text-purple-500', hex: '#8B5CF6' },
    { name: 'Success', bg: 'bg-green-500', text: 'text-green-500', hex: '#10B981' },
    { name: 'Warning', bg: 'bg-yellow-500', text: 'text-yellow-500', hex: '#F59E0B' },
    { name: 'Error', bg: 'bg-red-500', text: 'text-red-500', hex: '#EF4444' },
    { name: 'Info', bg: 'bg-cyan-500', text: 'text-cyan-500', hex: '#06B6D4' },
  ];

  const codeExample = `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
        brand: {
          light: '#8B5CF6',
          DEFAULT: '#7C3AED',
          dark: '#5B21B6',
        }
      }
    }
  }
}

<!-- Uso das cores customizadas -->
<div className="bg-primary-500 text-white">
<div className="bg-brand text-white">
<div className="text-primary-900">`;

  return (
    <DemoSection title="Custom Color Palette" description="Paleta de cores personalizada">
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {customColors.map((color) => (
            <div key={color.name} className="text-center">
              <div className={`${color.bg} h-20 rounded-lg mb-2 flex items-center justify-center text-white font-semibold`}>
                {color.name}
              </div>
              <p className="text-sm font-medium">{color.name}</p>
              <p className="text-xs text-gray-500">{color.hex}</p>
            </div>
          ))}
        </div>
        
        <div>
          <h4 className="font-semibold mb-3">Variações de Cor:</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-100 w-8 h-8 rounded"></div>
              <div className="bg-blue-200 w-8 h-8 rounded"></div>
              <div className="bg-blue-300 w-8 h-8 rounded"></div>
              <div className="bg-blue-400 w-8 h-8 rounded"></div>
              <div className="bg-blue-500 w-8 h-8 rounded"></div>
              <div className="bg-blue-600 w-8 h-8 rounded"></div>
              <div className="bg-blue-700 w-8 h-8 rounded"></div>
              <div className="bg-blue-800 w-8 h-8 rounded"></div>
              <div className="bg-blue-900 w-8 h-8 rounded"></div>
              <span className="text-sm text-gray-600">Blue Scale</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="bg-purple-100 w-8 h-8 rounded"></div>
              <div className="bg-purple-200 w-8 h-8 rounded"></div>
              <div className="bg-purple-300 w-8 h-8 rounded"></div>
              <div className="bg-purple-400 w-8 h-8 rounded"></div>
              <div className="bg-purple-500 w-8 h-8 rounded"></div>
              <div className="bg-purple-600 w-8 h-8 rounded"></div>
              <div className="bg-purple-700 w-8 h-8 rounded"></div>
              <div className="bg-purple-800 w-8 h-8 rounded"></div>
              <div className="bg-purple-900 w-8 h-8 rounded"></div>
              <span className="text-sm text-gray-600">Purple Scale</span>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold mb-3">Aplicação das Cores:</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors">
                Primary Button
              </button>
              <button className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded transition-colors">
                Secondary Button
              </button>
              <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition-colors">
                Success Button
              </button>
            </div>
            <div className="space-y-3">
              <div className="bg-blue-50 border border-blue-200 text-blue-800 p-3 rounded">
                💡 Info Alert
              </div>
              <div className="bg-green-50 border border-green-200 text-green-800 p-3 rounded">
                ✅ Success Alert
              </div>
              <div className="bg-red-50 border border-red-200 text-red-800 p-3 rounded">
                ❌ Error Alert
              </div>
            </div>
          </div>
        </div>
        
        <CodeBlock code={codeExample} language="javascript" />
      </div>
    </DemoSection>
  );
}

// Demonstração de Typography Themes
function TypographyThemeDemo() {
  const [selectedFont, setSelectedFont] = useState('inter');
  
  const fonts = {
    inter: { name: 'Inter', class: 'font-sans' },
    mono: { name: 'JetBrains Mono', class: 'font-mono' },
    serif: { name: 'Georgia', class: 'font-serif' },
  };

  const codeExample = `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
        'display': ['Playfair Display', 'serif'],
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
      }
    }
  }
}`;

  return (
    <DemoSection title="Typography Themes" description="Temas de tipografia e fontes">
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold mb-3">Seletor de Fonte:</h4>
          <div className="flex gap-2">
            {Object.entries(fonts).map(([key, font]) => (
              <button
                key={key}
                onClick={() => setSelectedFont(key)}
                className={`px-4 py-2 rounded transition-colors ${
                  selectedFont === key
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
              >
                {font.name}
              </button>
            ))}
          </div>
        </div>
        
        <div className={fonts[selectedFont as keyof typeof fonts].class}>
          <h4 className="font-semibold mb-3">Preview da Fonte: {fonts[selectedFont as keyof typeof fonts].name}</h4>
          <div className="space-y-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h1 className="text-4xl font-bold">Heading 1 - 4xl</h1>
            <h2 className="text-3xl font-semibold">Heading 2 - 3xl</h2>
            <h3 className="text-2xl font-medium">Heading 3 - 2xl</h3>
            <h4 className="text-xl">Heading 4 - xl</h4>
            <p className="text-lg">Large paragraph text - lg</p>
            <p className="text-base">Base paragraph text - base</p>
            <p className="text-sm">Small text - sm</p>
            <p className="text-xs">Extra small text - xs</p>
            
            <div className="mt-6">
              <p className="text-base leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
            
            <div className="flex gap-4 mt-6">
              <span className="font-thin">Thin</span>
              <span className="font-light">Light</span>
              <span className="font-normal">Normal</span>
              <span className="font-medium">Medium</span>
              <span className="font-semibold">Semibold</span>
              <span className="font-bold">Bold</span>
              <span className="font-extrabold">Extrabold</span>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold mb-3">Hierarquia Tipográfica:</h4>
          <div className="space-y-3 p-6 bg-white dark:bg-gray-900 border rounded-lg">
            <div className="text-4xl font-bold text-gray-900 dark:text-white">Display</div>
            <div className="text-3xl font-semibold text-gray-800 dark:text-gray-100">Heading 1</div>
            <div className="text-2xl font-semibold text-gray-700 dark:text-gray-200">Heading 2</div>
            <div className="text-xl font-medium text-gray-600 dark:text-gray-300">Heading 3</div>
            <div className="text-lg text-gray-600 dark:text-gray-300">Large Body</div>
            <div className="text-base text-gray-600 dark:text-gray-400">Body Text</div>
            <div className="text-sm text-gray-500 dark:text-gray-500">Small Text</div>
            <div className="text-xs text-gray-400 dark:text-gray-600">Caption</div>
          </div>
        </div>
        
        <CodeBlock code={codeExample} language="javascript" />
      </div>
    </DemoSection>
  );
}

// Demonstração de Component Themes
function ComponentThemeDemo() {
  const [selectedTheme, setSelectedTheme] = useState('default');
  
  const themes = {
    default: {
      name: 'Default',
      button: 'bg-blue-500 hover:bg-blue-600 text-white',
      card: 'bg-white border border-gray-200',
      input: 'border-gray-300 focus:border-blue-500',
    },
    dark: {
      name: 'Dark',
      button: 'bg-gray-800 hover:bg-gray-900 text-white',
      card: 'bg-gray-800 border border-gray-700',
      input: 'border-gray-600 focus:border-gray-400 bg-gray-700 text-white',
    },
    colorful: {
      name: 'Colorful',
      button: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white',
      card: 'bg-gradient-to-br from-blue-50 to-purple-50 border border-purple-200',
      input: 'border-purple-300 focus:border-purple-500',
    },
  };

  const currentTheme = themes[selectedTheme as keyof typeof themes];

  const codeExample = `// Tema de componentes
const themes = {
  default: {
    button: 'bg-blue-500 hover:bg-blue-600 text-white',
    card: 'bg-white border border-gray-200',
    input: 'border-gray-300 focus:border-blue-500',
  },
  dark: {
    button: 'bg-gray-800 hover:bg-gray-900 text-white',
    card: 'bg-gray-800 border border-gray-700',
    input: 'border-gray-600 focus:border-gray-400',
  }
};

// Componente com tema
function Button({ theme = 'default', children }) {
  return (
    <button className={themes[theme].button}>
      {children}
    </button>
  );
}`;

  return (
    <DemoSection title="Component Themes" description="Temas para componentes específicos">
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold mb-3">Seletor de Tema:</h4>
          <div className="flex gap-2">
            {Object.entries(themes).map(([key, theme]) => (
              <button
                key={key}
                onClick={() => setSelectedTheme(key)}
                className={`px-4 py-2 rounded transition-colors ${
                  selectedTheme === key
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
              >
                {theme.name}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold mb-3">Preview do Tema: {currentTheme.name}</h4>
          <div className={`p-6 rounded-lg ${currentTheme.card}`}>
            <h3 className="text-lg font-semibold mb-4">Card Component</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Input Field:</label>
                <input
                  type="text"
                  placeholder="Digite algo..."
                  className={`w-full px-3 py-2 rounded-md ${currentTheme.input}`}
                />
              </div>
              
              <div className="flex gap-3">
                <button className={`px-4 py-2 rounded-md transition-colors ${currentTheme.button}`}>
                  Primary Button
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                  Secondary Button
                </button>
              </div>
              
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Este é um exemplo de como os temas podem ser aplicados a componentes específicos.
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold mb-3">Variações de Botões:</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(themes).map(([key, theme]) => (
              <div key={key} className="text-center">
                <p className="text-sm font-medium mb-2">{theme.name}</p>
                <button className={`px-6 py-3 rounded-lg transition-colors ${theme.button}`}>
                  {theme.name} Button
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <CodeBlock code={codeExample} language="javascript" />
      </div>
    </DemoSection>
  );
}

export default function ThemesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🎨 Tailwind Themes
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Demonstrações de sistemas de tema, paletas de cores personalizadas e tipografia
          </p>
        </div>

        <div className="grid gap-1.5 max-w-6xl mx-auto">
          <DarkLightModeDemo />
          <CustomColorPaletteDemo />
          <TypographyThemeDemo />
          <ComponentThemeDemo />
        </div>
      </div>
    </div>
  );
}