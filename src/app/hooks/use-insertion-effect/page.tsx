'use client';

import { useInsertionEffect, useLayoutEffect, useEffect, useState, useRef, useCallback } from 'react';
import CodeBlock from '@/components/CodeBlock';
import DemoSection from '@/components/DemoSection';

// Simulação de CSS-in-JS library
class StyleManager {
  private static instance: StyleManager;
  private styleSheet: CSSStyleSheet | null = null;
  private rules = new Map<string, number>();
  private ruleCounter = 0;

  static getInstance(): StyleManager {
    if (!StyleManager.instance) {
      StyleManager.instance = new StyleManager();
    }
    return StyleManager.instance;
  }

  constructor() {
    if (typeof document !== 'undefined') {
      const style = document.createElement('style');
      style.setAttribute('data-styled', 'true');
      document.head.appendChild(style);
      this.styleSheet = style.sheet;
    }
  }

  insertRule(selector: string, styles: string): string {
    if (!this.styleSheet) return '';
    
    const ruleText = `${selector} { ${styles} }`;
    const existingRule = this.rules.get(ruleText);
    
    if (existingRule !== undefined) {
      return selector;
    }

    try {
      const index = this.styleSheet.insertRule(ruleText, this.styleSheet.cssRules.length);
      this.rules.set(ruleText, index);
      this.ruleCounter++;
      return selector;
    } catch (e) {
      console.warn('Failed to insert CSS rule:', e);
      return '';
    }
  }

  removeRule(selector: string, styles: string): void {
    if (!this.styleSheet) return;
    
    const ruleText = `${selector} { ${styles} }`;
    const index = this.rules.get(ruleText);
    
    if (index !== undefined) {
      try {
        this.styleSheet.deleteRule(index);
        this.rules.delete(ruleText);
      } catch (e) {
        console.warn('Failed to remove CSS rule:', e);
      }
    }
  }

  getRuleCount(): number {
    return this.rules.size;
  }

  getAllRules(): string[] {
    return Array.from(this.rules.keys());
  }
}

// Hook para CSS-in-JS usando useInsertionEffect
function useStyledComponent(styles: Record<string, string>) {
  const classNameRef = useRef<string>('');
  const stylesRef = useRef<string>('');
  const [, forceUpdate] = useState({});

  useInsertionEffect(() => {
    const styleManager = StyleManager.getInstance();
    const className = `styled-${Math.random().toString(36).substr(2, 9)}`;
    const cssText = Object.entries(styles)
      .map(([property, value]) => `${property.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`)
      .join('; ');

    // Inserir regra CSS
    styleManager.insertRule(`.${className}`, cssText);
    
    classNameRef.current = className;
    stylesRef.current = cssText;
    
    // Cleanup
    return () => {
      styleManager.removeRule(`.${className}`, cssText);
    };
  }, [JSON.stringify(styles)]);

  return classNameRef.current;
}

// Hook para injeção de CSS global
function useGlobalStyles(css: string) {
  const ruleRef = useRef<string>('');

  useInsertionEffect(() => {
    const styleManager = StyleManager.getInstance();
    const globalSelector = `global-${Math.random().toString(36).substr(2, 9)}`;
    
    // Inserir CSS global
    styleManager.insertRule(`:root`, css);
    ruleRef.current = css;
    
    return () => {
      styleManager.removeRule(`:root`, css);
    };
  }, [css]);

  return ruleRef.current;
}

// Hook para tema dinâmico
function useThemeInjection(theme: Record<string, string>) {
  useInsertionEffect(() => {
    const styleManager = StyleManager.getInstance();
    const themeVars = Object.entries(theme)
      .map(([key, value]) => `--${key}: ${value}`)
      .join('; ');
    
    styleManager.insertRule(':root', themeVars);
    
    return () => {
      styleManager.removeRule(':root', themeVars);
    };
  }, [JSON.stringify(theme)]);
}

// Hook para animações CSS
function useKeyframes(name: string, keyframes: Record<string, Record<string, string>>) {
  useInsertionEffect(() => {
    const styleManager = StyleManager.getInstance();
    const keyframeRules = Object.entries(keyframes)
      .map(([percentage, styles]) => {
        const cssProps = Object.entries(styles)
          .map(([prop, value]) => `${prop.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`)
          .join('; ');
        return `${percentage} { ${cssProps} }`;
      })
      .join(' ');
    
    const animationRule = `@keyframes ${name} { ${keyframeRules} }`;
    
    if (typeof document !== 'undefined') {
      const style = document.createElement('style');
      style.textContent = animationRule;
      style.setAttribute('data-animation', name);
      document.head.appendChild(style);
      
      return () => {
        document.head.removeChild(style);
      };
    }
  }, [name, JSON.stringify(keyframes)]);

  return name;
}

// Demonstração de timing dos effects
function EffectTimingDemo() {
  const [count, setCount] = useState(0);
  const [log, setLog] = useState<string[]>([]);
  const renderTimeRef = useRef<number>(0);

  const addLog = useCallback((message: string) => {
    const timestamp = performance.now();
    const timeSinceRender = timestamp - renderTimeRef.current;
    setLog(prev => [...prev, `${message}: ${timeSinceRender.toFixed(2)}ms`]);
  }, []);

  // useInsertionEffect - executa ANTES de useLayoutEffect
  useInsertionEffect(() => {
    // Usar setTimeout para evitar state update durante render
    setTimeout(() => addLog('useInsertionEffect'), 0);
  }, [count, addLog]);

  // useLayoutEffect - executa DEPOIS de useInsertionEffect
  useLayoutEffect(() => {
    setTimeout(() => addLog('useLayoutEffect'), 1);
  }, [count, addLog]);

  // useEffect - executa por último
  useEffect(() => {
    setTimeout(() => addLog('useEffect'), 2);
  }, [count, addLog]);

  const handleIncrement = () => {
    renderTimeRef.current = performance.now();
    setCount(prev => prev + 1);
    setLog([]); // Limpar log anterior
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-4">
          Count: {count}
        </div>
        <button
          onClick={handleIncrement}
          className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
        >
          Increment & Measure Timing
        </button>
      </div>

      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
        <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Execution Order</h3>
        <div className="space-y-2">
          {log.map((entry, index) => (
            <div key={index} className="flex items-center gap-3">
              <span className="text-sm font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                {index + 1}
              </span>
              <span className="text-sm text-gray-700 dark:text-gray-300">{entry}</span>
            </div>
          ))}
          {log.length === 0 && (
            <div className="text-gray-500 dark:text-gray-400 text-sm italic">
              Click increment to see execution order
            </div>
          )}
        </div>
      </div>

      <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-lg border border-purple-300 dark:border-purple-700">
        <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">⚡ Ordem de Execução:</h4>
        <ol className="text-purple-700 dark:text-purple-300 text-sm space-y-1">
          <li>1. <strong>useInsertionEffect</strong> - Executa primeiro, antes de qualquer mutação DOM</li>
          <li>2. <strong>useLayoutEffect</strong> - Executa após mutações DOM, antes do paint</li>
          <li>3. <strong>useEffect</strong> - Executa após o paint, de forma assíncrona</li>
        </ol>
      </div>
    </div>
  );
}

// Demonstração de CSS-in-JS
function CSSinJSDemo() {
  const [buttonStyle, setButtonStyle] = useState({
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'all 0.3s ease'
  });

  const [cardStyle, setCardStyle] = useState({
    backgroundColor: '#f8fafc',
    padding: '24px',
    borderRadius: '12px',
    border: '2px solid #e2e8f0',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    margin: '16px 0'
  });

  const buttonClassName = useStyledComponent(buttonStyle);
  const cardClassName = useStyledComponent(cardStyle);
  const styleManager = StyleManager.getInstance();

  const randomizeButtonStyle = () => {
    const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    setButtonStyle(prev => ({
      ...prev,
      backgroundColor: randomColor,
      transform: `scale(${0.9 + Math.random() * 0.2})`
    }));
  };

  const randomizeCardStyle = () => {
    const backgrounds = ['#f8fafc', '#fef3c7', '#dbeafe', '#dcfce7', '#fce7f3', '#e0e7ff'];
    const randomBg = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    
    setCardStyle(prev => ({
      ...prev,
      backgroundColor: randomBg,
      transform: `rotate(${-2 + Math.random() * 4}deg)`
    }));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-800 dark:text-white">Dynamic Button</h3>
          <button
            className={buttonClassName}
            onClick={randomizeButtonStyle}
          >
            Click to Change Style
          </button>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Class: <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">{buttonClassName}</code>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-gray-800 dark:text-white">Dynamic Card</h3>
          <div className={cardClassName}>
            <p className="text-gray-700 dark:text-gray-300 mb-2">This is a styled card!</p>
            <button
              onClick={randomizeCardStyle}
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
            >
              Change Card Style
            </button>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Class: <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">{cardClassName}</code>
          </div>
        </div>
      </div>

      <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
        <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Style Manager Stats</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {styleManager.getRuleCount()}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Active Rules</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {buttonClassName ? '✅' : '❌'}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Button Styled</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {cardClassName ? '✅' : '❌'}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Card Styled</div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg border border-blue-300 dark:border-blue-700">
        <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">🎨 CSS-in-JS:</h4>
        <p className="text-blue-700 dark:text-blue-300 text-sm">
          Os estilos são injetados usando useInsertionEffect, garantindo que sejam aplicados 
          antes de qualquer layout ou paint, evitando FOUC (Flash of Unstyled Content).
        </p>
      </div>
    </div>
  );
}

// Demonstração de tema dinâmico
function ThemeDemo() {
  const [theme, setTheme] = useState({
    primary: '#3b82f6',
    secondary: '#64748b',
    accent: '#f59e0b',
    background: '#ffffff',
    text: '#1f2937'
  });

  useThemeInjection(theme);

  const presets = {
    blue: {
      primary: '#3b82f6',
      secondary: '#64748b',
      accent: '#f59e0b',
      background: '#ffffff',
      text: '#1f2937'
    },
    dark: {
      primary: '#6366f1',
      secondary: '#9ca3af',
      accent: '#fbbf24',
      background: '#111827',
      text: '#f9fafb'
    },
    green: {
      primary: '#10b981',
      secondary: '#6b7280',
      accent: '#f59e0b',
      background: '#f0fdf4',
      text: '#065f46'
    },
    purple: {
      primary: '#8b5cf6',
      secondary: '#6b7280',
      accent: '#ec4899',
      background: '#faf5ff',
      text: '#581c87'
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {Object.entries(presets).map(([name, preset]) => (
          <button
            key={name}
            onClick={() => setTheme(preset)}
            className="px-4 py-2 rounded-lg border-2 transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor: preset.background,
              borderColor: preset.primary,
              color: preset.text
            }}
          >
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </button>
        ))}
      </div>

      <div 
        className="p-6 rounded-lg transition-all duration-300"
        style={{
          backgroundColor: 'var(--background)',
          color: 'var(--text)',
          border: '2px solid var(--primary)'
        }}
      >
        <h3 
          className="text-xl font-bold mb-4"
          style={{ color: 'var(--primary)' }}
        >
          Themed Component
        </h3>
        <p className="mb-4">
          This component uses CSS custom properties injected by useInsertionEffect.
          The theme variables are available immediately without any flash.
        </p>
        <div className="flex gap-2">
          <button 
            className="px-4 py-2 rounded transition-colors"
            style={{
              backgroundColor: 'var(--primary)',
              color: 'var(--background)'
            }}
          >
            Primary Button
          </button>
          <button 
            className="px-4 py-2 rounded transition-colors"
            style={{
              backgroundColor: 'var(--accent)',
              color: 'var(--background)'
            }}
          >
            Accent Button
          </button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {Object.entries(theme).map(([key, value]) => (
          <div key={key} className="text-center">
            <div 
              className="w-full h-12 rounded mb-2 border"
              style={{ backgroundColor: value }}
            />
            <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
              {key}
            </div>
            <div className="text-xs font-mono text-gray-500 dark:text-gray-400">
              {value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Demonstração de animações
function AnimationDemo() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationType, setAnimationType] = useState('bounce');

  const animations = {
    bounce: {
      '0%': { transform: 'translateY(0)' },
      '25%': { transform: 'translateY(-20px)' },
      '50%': { transform: 'translateY(0)' },
      '75%': { transform: 'translateY(-10px)' },
      '100%': { transform: 'translateY(0)' }
    },
    spin: {
      '0%': { transform: 'rotate(0deg)' },
      '100%': { transform: 'rotate(360deg)' }
    },
    pulse: {
      '0%': { transform: 'scale(1)', opacity: '1' },
      '50%': { transform: 'scale(1.1)', opacity: '0.7' },
      '100%': { transform: 'scale(1)', opacity: '1' }
    },
    shake: {
      '0%': { transform: 'translateX(0)' },
      '25%': { transform: 'translateX(-5px)' },
      '50%': { transform: 'translateX(5px)' },
      '75%': { transform: 'translateX(-5px)' },
      '100%': { transform: 'translateX(0)' }
    }
  };

  const animationName = useKeyframes(
    `${animationType}-animation`,
    animations[animationType as keyof typeof animations]
  );

  const startAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2 justify-center flex-wrap">
        {Object.keys(animations).map((type) => (
          <button
            key={type}
            onClick={() => setAnimationType(type)}
            className={`px-4 py-2 rounded transition-colors ${
              animationType === type
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <div className="text-center">
        <div
          className="inline-block w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mb-4"
          style={{
            animation: isAnimating ? `${animationName} 2s ease-in-out` : 'none'
          }}
        />
        <br />
        <button
          onClick={startAnimation}
          disabled={isAnimating}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isAnimating ? 'Animating...' : `Start ${animationType} Animation`}
        </button>
      </div>

      <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-lg border border-green-300 dark:border-green-700">
        <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">🎬 Keyframes:</h4>
        <p className="text-green-700 dark:text-green-300 text-sm">
          As animações CSS são injetadas usando useInsertionEffect, garantindo que estejam 
          disponíveis imediatamente quando o componente renderiza.
        </p>
      </div>
    </div>
  );
}

export default function UseInsertionEffectPage() {
  const basicCode = `// useInsertionEffect básico
import { useInsertionEffect } from 'react';

function useStyledComponent(styles: Record<string, string>) {
  const classNameRef = useRef('');

  useInsertionEffect(() => {
    // Criar classe CSS única
    const className = \`styled-\${Math.random().toString(36).substr(2, 9)}\`;
    
    // Converter estilos para CSS
    const cssText = Object.entries(styles)
      .map(([prop, value]) => \`\${prop.replace(/([A-Z])/g, '-$1').toLowerCase()}: \${value}\`)
      .join('; ');
    
    // Inserir regra CSS
    const style = document.createElement('style');
    style.textContent = \`.\${className} { \${cssText} }\`;
    document.head.appendChild(style);
    
    classNameRef.current = className;
    
    // Cleanup
    return () => {
      document.head.removeChild(style);
    };
  }, [JSON.stringify(styles)]);

  return classNameRef.current;
}

// Uso
function StyledButton() {
  const className = useStyledComponent({
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '8px',
    border: 'none'
  });

  return <button className={className}>Styled Button</button>;
}`;

  const timingCode = `// Comparação de timing
import { useEffect, useLayoutEffect, useInsertionEffect } from 'react';

function TimingDemo() {
  const [count, setCount] = useState(0);

  // 1. Executa PRIMEIRO - antes de qualquer mutação DOM
  useInsertionEffect(() => {
    console.log('1. useInsertionEffect - antes de tudo');
    // Ideal para injeção de CSS
  }, [count]);

  // 2. Executa SEGUNDO - após mutações DOM, antes do paint
  useLayoutEffect(() => {
    console.log('2. useLayoutEffect - após DOM, antes do paint');
    // Ideal para medições DOM
  }, [count]);

  // 3. Executa TERCEIRO - após o paint, assíncrono
  useEffect(() => {
    console.log('3. useEffect - após paint, assíncrono');
    // Ideal para side effects gerais
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  );
}`;

  const themeCode = `// Injeção de tema com useInsertionEffect
function useThemeInjection(theme: Record<string, string>) {
  useInsertionEffect(() => {
    // Converter tema para CSS custom properties
    const themeVars = Object.entries(theme)
      .map(([key, value]) => \`--\${key}: \${value}\`)
      .join('; ');
    
    // Inserir no :root
    const style = document.createElement('style');
    style.textContent = \`:root { \${themeVars} }\`;
    style.setAttribute('data-theme', 'true');
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, [JSON.stringify(theme)]);
}

// Uso
function ThemedComponent() {
  const [theme, setTheme] = useState({
    primary: '#3b82f6',
    secondary: '#64748b',
    background: '#ffffff'
  });

  useThemeInjection(theme);

  return (
    <div style={{ 
      backgroundColor: 'var(--background)',
      color: 'var(--primary)'
    }}>
      <h1>Themed Content</h1>
      <button 
        style={{ backgroundColor: 'var(--primary)' }}
        onClick={() => setTheme({ ...theme, primary: '#ef4444' })}
      >
        Change Theme
      </button>
    </div>
  );
}`;

  const animationCode = `// Animações CSS com useInsertionEffect
function useKeyframes(name: string, keyframes: Record<string, Record<string, string>>) {
  useInsertionEffect(() => {
    // Converter keyframes para CSS
    const keyframeRules = Object.entries(keyframes)
      .map(([percentage, styles]) => {
        const cssProps = Object.entries(styles)
          .map(([prop, value]) => \`\${prop.replace(/([A-Z])/g, '-$1').toLowerCase()}: \${value}\`)
          .join('; ');
        return \`\${percentage} { \${cssProps} }\`;
      })
      .join(' ');
    
    const animationRule = \`@keyframes \${name} { \${keyframeRules} }\`;
    
    // Inserir animação
    const style = document.createElement('style');
    style.textContent = animationRule;
    style.setAttribute('data-animation', name);
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, [name, JSON.stringify(keyframes)]);

  return name;
}

// Uso
function AnimatedComponent() {
  const animationName = useKeyframes('bounce', {
    '0%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(-20px)' },
    '100%': { transform: 'translateY(0)' }
  });

  return (
    <div 
      style={{ 
        animation: \`\${animationName} 1s infinite\`
      }}
    >
      Bouncing Element
    </div>
  );
}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 dark:from-gray-900 dark:to-gray-800 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-6">
            useInsertionEffect
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Demonstração do useInsertionEffect Hook - executa antes de useLayoutEffect, ideal para injeção de CSS.
          </p>
        </div>

        <div className="space-y-12">
          <DemoSection title="Timing dos Effects">
            <EffectTimingDemo />
          </DemoSection>

          <DemoSection title="CSS-in-JS Dinâmico">
            <CSSinJSDemo />
          </DemoSection>

          <DemoSection title="Tema Dinâmico">
            <ThemeDemo />
          </DemoSection>

          <DemoSection title="Animações CSS">
            <AnimationDemo />
          </DemoSection>
        </div>

        <div className="mt-16 space-y-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">CSS-in-JS Básico</h2>
            <CodeBlock code={basicCode} language="tsx" />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Timing Comparison</h2>
            <CodeBlock code={timingCode} language="tsx" />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Tema Dinâmico</h2>
            <CodeBlock code={themeCode} language="tsx" />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Animações CSS</h2>
            <CodeBlock code={animationCode} language="tsx" />
          </div>
        </div>

        <div className="mt-16 bg-gradient-to-r from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">⚡ useInsertionEffect</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Casos de Uso</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Injeção de CSS dinâmico</li>
                <li>• Bibliotecas CSS-in-JS</li>
                <li>• Temas dinâmicos</li>
                <li>• Animações CSS</li>
                <li>• Critical CSS injection</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Vantagens</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Executa antes de layout</li>
                <li>• Previne FOUC</li>
                <li>• Performance otimizada</li>
                <li>• Sincronização perfeita</li>
                <li>• Ideal para CSS-in-JS</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg border border-yellow-300 dark:border-yellow-700">
            <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">⚠️ Importante:</h4>
            <p className="text-yellow-700 dark:text-yellow-300 text-sm">
              useInsertionEffect deve ser usado apenas para injeção de CSS. Para outros casos, 
              prefira useLayoutEffect ou useEffect. Evite operações custosas neste hook.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}