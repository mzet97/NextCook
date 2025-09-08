'use client';

import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import CodeBlock from '@/components/CodeBlock';
import DemoSection from '@/components/DemoSection';

// Componente para comparar useEffect vs useLayoutEffect
function EffectComparisonDemo() {
  const [count, setCount] = useState(0);
  const [layoutCount, setLayoutCount] = useState(0);
  const [effectCount, setEffectCount] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs(prev => [...prev.slice(-4), `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  useLayoutEffect(() => {
    addLog('useLayoutEffect executado (síncrono)');
    setLayoutCount(prev => prev + 1);
  }, [count]);

  useEffect(() => {
    addLog('useEffect executado (assíncrono)');
    setEffectCount(prev => prev + 1);
  }, [count]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <div className="space-y-4">
        <div className="flex gap-4">
          <button
            onClick={() => setCount(prev => prev + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Incrementar ({count})
          </button>
          <button
            onClick={() => {
              setLogs([]);
              setLayoutCount(0);
              setEffectCount(0);
            }}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            Limpar Logs
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded">
            <h4 className="font-semibold text-blue-700 dark:text-blue-300">useLayoutEffect</h4>
            <p className="text-sm text-blue-600 dark:text-blue-400">Executado: {layoutCount} vezes</p>
            <p className="text-xs text-blue-500 dark:text-blue-500">Executa sincronamente antes da pintura</p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded">
            <h4 className="font-semibold text-green-700 dark:text-green-300">useEffect</h4>
            <p className="text-sm text-green-600 dark:text-green-400">Executado: {effectCount} vezes</p>
            <p className="text-xs text-green-500 dark:text-green-500">Executa assincronamente após a pintura</p>
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded">
          <h4 className="font-semibold mb-2">Logs de Execução:</h4>
          <div className="space-y-1 text-sm font-mono">
            {logs.map((log, index) => (
              <div key={index} className="text-gray-600 dark:text-gray-300">{log}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente para demonstrar medição de DOM
function DOMeasurementDemo() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [content, setContent] = useState('Conteúdo inicial');
  const elementRef = useRef<HTMLDivElement>(null);
  
  useLayoutEffect(() => {
    if (elementRef.current) {
      const { width, height } = elementRef.current.getBoundingClientRect();
      const newDimensions = { width: Math.round(width), height: Math.round(height) };
      
      // Só atualiza se as dimensões realmente mudaram para evitar loop infinito
      setDimensions(prev => {
        if (prev.width !== newDimensions.width || prev.height !== newDimensions.height) {
          return newDimensions;
        }
        return prev;
      });
    }
  }, [content]); // Dependência no content para re-medir quando o conteúdo mudar
  
  const contents = [
    'Conteúdo inicial',
    'Este é um texto muito mais longo que vai ocupar mais espaço na tela e demonstrar como as dimensões mudam dinamicamente',
    'Texto curto',
    'Conteúdo\ncom\nmúltiplas\nlinhas\npara\ntestar\na\naltura'
  ];
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {contents.map((text, index) => (
            <button
              key={index}
              onClick={() => setContent(text)}
              className="px-3 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600 transition-colors"
            >
              Conteúdo {index + 1}
            </button>
          ))}
        </div>
        
        <div className="border-2 border-dashed border-purple-300 dark:border-purple-600 p-4 rounded">
          <div 
            ref={elementRef} 
            className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded whitespace-pre-wrap"
          >
            {content}
          </div>
        </div>
        
        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded">
          <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Dimensões Medidas:</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Largura:</span> {dimensions.width}px
            </div>
            <div>
              <span className="font-medium">Altura:</span> {dimensions.height}px
            </div>
          </div>
          <p className="text-xs text-purple-600 dark:text-purple-400 mt-2">
            As dimensões são medidas sincronamente com useLayoutEffect
          </p>
        </div>
      </div>
    </div>
  );
}

// Componente para demonstrar animação sem flicker
function AnimationDemo() {
  const [position, setPosition] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  
  useLayoutEffect(() => {
    if (elementRef.current) {
      // Aplicar transformação antes do paint para evitar flicker
      elementRef.current.style.transform = `translateX(${position}px)`;
    }
  }, [position]);
  
  const animate = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const startPosition = position;
    const targetPosition = startPosition === 0 ? 200 : 0;
    const duration = 1000;
    const startTime = performance.now();
    
    const frame = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-in-out)
      const easeInOut = progress < 0.5 
        ? 2 * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      
      const currentPosition = startPosition + (targetPosition - startPosition) * easeInOut;
      setPosition(currentPosition);
      
      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        setIsAnimating(false);
      }
    };
    
    requestAnimationFrame(frame);
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <div className="space-y-4">
        <button
          onClick={animate}
          disabled={isAnimating}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400 transition-colors"
        >
          {isAnimating ? 'Animando...' : 'Animar Elemento'}
        </button>
        
        <div className="relative h-20 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden">
          <div 
            ref={elementRef}
            className="absolute top-1/2 transform -translate-y-1/2 w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg shadow-lg flex items-center justify-center text-white font-bold"
          >
            🚀
          </div>
        </div>
        
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded">
          <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Posição Atual:</h4>
          <div className="text-sm text-green-600 dark:text-green-400">
            X: {Math.round(position)}px
          </div>
          <p className="text-xs text-green-500 dark:text-green-500 mt-2">
            useLayoutEffect aplica a transformação antes da pintura, evitando flicker
          </p>
        </div>
      </div>
    </div>
  );
}

// Componente para demonstrar tooltip com posicionamento inteligente
function TooltipDemo() {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const triggerRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const tooltipRef = useRef<HTMLDivElement>(null);
  
  useLayoutEffect(() => {
    if (activeTooltip && triggerRefs.current[activeTooltip] && tooltipRef.current) {
      const triggerRect = triggerRefs.current[activeTooltip]!.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      
      // Calcular posição ideal
      let top = triggerRect.bottom + 8;
      let left = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);
      
      // Ajustar se sair da viewport
      if (left < 8) left = 8;
      if (left + tooltipRect.width > window.innerWidth - 8) {
        left = window.innerWidth - tooltipRect.width - 8;
      }
      
      // Se não couber embaixo, colocar em cima
      if (top + tooltipRect.height > window.innerHeight - 8) {
        top = triggerRect.top - tooltipRect.height - 8;
      }
      
      setTooltipPosition({ top, left });
    }
  }, [activeTooltip]);
  
  const tooltips = {
    'top-left': 'Tooltip no canto superior esquerdo',
    'top-right': 'Tooltip no canto superior direito',
    'bottom-left': 'Tooltip no canto inferior esquerdo',
    'bottom-right': 'Tooltip no canto inferior direito',
    'center': 'Tooltip centralizado com texto mais longo para testar o posicionamento inteligente'
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <div className="space-y-4">
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          Passe o mouse sobre os botões para ver tooltips com posicionamento inteligente:
        </p>
        
        <div className="grid grid-cols-3 gap-4 h-40">
          <button
            ref={el => triggerRefs.current['top-left'] = el}
            onMouseEnter={() => setActiveTooltip('top-left')}
            onMouseLeave={() => setActiveTooltip(null)}
            className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600 transition-colors"
          >
            Top Left
          </button>
          
          <button
            ref={el => triggerRefs.current['center'] = el}
            onMouseEnter={() => setActiveTooltip('center')}
            onMouseLeave={() => setActiveTooltip(null)}
            className="bg-purple-500 text-white rounded p-2 hover:bg-purple-600 transition-colors self-center"
          >
            Center
          </button>
          
          <button
            ref={el => triggerRefs.current['top-right'] = el}
            onMouseEnter={() => setActiveTooltip('top-right')}
            onMouseLeave={() => setActiveTooltip(null)}
            className="bg-green-500 text-white rounded p-2 hover:bg-green-600 transition-colors"
          >
            Top Right
          </button>
          
          <button
            ref={el => triggerRefs.current['bottom-left'] = el}
            onMouseEnter={() => setActiveTooltip('bottom-left')}
            onMouseLeave={() => setActiveTooltip(null)}
            className="bg-red-500 text-white rounded p-2 hover:bg-red-600 transition-colors self-end"
          >
            Bottom Left
          </button>
          
          <div></div>
          
          <button
            ref={el => triggerRefs.current['bottom-right'] = el}
            onMouseEnter={() => setActiveTooltip('bottom-right')}
            onMouseLeave={() => setActiveTooltip(null)}
            className="bg-yellow-500 text-white rounded p-2 hover:bg-yellow-600 transition-colors self-end"
          >
            Bottom Right
          </button>
        </div>
        
        {activeTooltip && (
          <div
            ref={tooltipRef}
            className="fixed z-50 bg-gray-900 text-white px-3 py-2 rounded shadow-lg text-sm max-w-xs pointer-events-none"
            style={{ 
              top: tooltipPosition.top, 
              left: tooltipPosition.left,
              transform: 'translateZ(0)' // Force hardware acceleration
            }}
          >
            {tooltips[activeTooltip as keyof typeof tooltips]}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-2 h-2 bg-gray-900 rotate-45"></div>
          </div>
        )}
        
        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded">
          <h4 className="font-semibold text-yellow-700 dark:text-yellow-300 mb-2">Posicionamento Inteligente:</h4>
          <p className="text-xs text-yellow-600 dark:text-yellow-400">
            useLayoutEffect calcula a posição ideal do tooltip antes da pintura, 
            ajustando automaticamente para não sair da viewport.
          </p>
        </div>
      </div>
    </div>
  );
}



// Demonstração de medição de DOM
function DOMmeasurementDemo() {
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);
  const [measurements, setMeasurements] = useState<{ width: number; height: number; top: number }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    if (containerRef.current) {
      const newMeasurements = itemRefs.current.map((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          return {
            width: rect.width,
            height: rect.height,
            top: rect.top
          };
        }
        return { width: 0, height: 0, top: 0 };
      });
      setMeasurements(newMeasurements);
    }
  }, [items]);

  const addItem = () => {
    setItems(prev => [...prev, `Item ${prev.length + 1}`]);
  };

  const removeItem = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
    itemRefs.current = itemRefs.current.filter((_, i) => i !== index);
  };

  const shuffleItems = () => {
    setItems(prev => [...prev].sort(() => Math.random() - 0.5));
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-3 justify-center">
        <button
          onClick={addItem}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          Adicionar Item
        </button>
        <button
          onClick={shuffleItems}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
        >
          Embaralhar
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Items</h3>
          <div ref={containerRef} className="space-y-2">
            {items.map((item, index) => (
              <div
                key={item}
                ref={(el) => { itemRefs.current[index] = el; }}
                className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-between"
              >
                <span className="text-gray-800 dark:text-white">{item}</span>
                <button
                  onClick={() => removeItem(index)}
                  className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Medições (useLayoutEffect)</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {measurements.map((measurement, index) => (
              <div key={index} className="p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm">
                <div className="text-gray-800 dark:text-white font-medium">Item {index + 1}:</div>
                <div className="text-gray-600 dark:text-gray-300">
                  Width: {measurement.width.toFixed(1)}px<br />
                  Height: {measurement.height.toFixed(1)}px<br />
                  Top: {measurement.top.toFixed(1)}px
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}





export default function UseLayoutEffectPage() {
  const basicCode = `// useLayoutEffect vs useEffect
import { useEffect, useLayoutEffect, useState } from 'react';

function Component() {
  const [count, setCount] = useState(0);
  
  // Executa ANTES do browser pintar
  useLayoutEffect(() => {
    console.log('useLayoutEffect - síncrono');
    // Medições DOM, ajustes de posição, etc.
  }, [count]);
  
  // Executa DEPOIS do browser pintar
  useEffect(() => {
    console.log('useEffect - assíncrono');
    // Side effects que não afetam o layout
  }, [count]);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  );
}`;

  const measurementCode = `// Medição de DOM com useLayoutEffect
import { useLayoutEffect, useRef, useState } from 'react';

function MeasureComponent() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const elementRef = useRef<HTMLDivElement>(null);
  
  useLayoutEffect(() => {
    if (elementRef.current) {
      const { width, height } = elementRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }
  }); // Sem dependências - executa após cada render
  
  return (
    <div>
      <div ref={elementRef} className="dynamic-content">
        Conteúdo dinâmico
      </div>
      <p>Dimensões: {dimensions.width} x {dimensions.height}</p>
    </div>
  );
}`;

  const tooltipCode = `// Tooltip com posicionamento inteligente
import { useLayoutEffect, useRef, useState } from 'react';

function Tooltip({ children, content }) {
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  
  useLayoutEffect(() => {
    if (show && triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      
      // Calcular posição ideal
      let top = triggerRect.bottom + 8;
      let left = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);
      
      // Ajustar se sair da viewport
      if (left < 0) left = 8;
      if (left + tooltipRect.width > window.innerWidth) {
        left = window.innerWidth - tooltipRect.width - 8;
      }
      
      setPosition({ top, left });
    }
  }, [show]);
  
  return (
    <>
      <span
        ref={triggerRef}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {children}
      </span>
      {show && (
        <div
          ref={tooltipRef}
          className="tooltip"
          style={{ position: 'fixed', top: position.top, left: position.left }}
        >
          {content}
        </div>
      )}
    </>
  );
}`;

  const animationCode = `// Animação sem flicker
import { useLayoutEffect, useRef, useState } from 'react';

function SmoothAnimation() {
  const [position, setPosition] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  
  useLayoutEffect(() => {
    if (elementRef.current) {
      // Aplicar transformação antes do paint
      elementRef.current.style.transform = \`translateX(\${position}px)\`;
    }
  }, [position]);
  
  const animate = () => {
    let start = 0;
    const duration = 1000;
    const startTime = performance.now();
    
    const frame = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      setPosition(progress * 200);
      
      if (progress < 1) {
        requestAnimationFrame(frame);
      }
    };
    
    requestAnimationFrame(frame);
  };
  
  return (
    <div>
      <div ref={elementRef} className="animated-box" />
      <button onClick={animate}>Animate</button>
    </div>
  );
}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-6">
            useLayoutEffect
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Demonstração do useLayoutEffect Hook - executa efeitos sincronamente após mutações DOM, antes do browser pintar.
          </p>
        </div>

        <div className="space-y-12">
          <DemoSection title="useLayoutEffect vs useEffect">
            <EffectComparisonDemo />
          </DemoSection>

          <DemoSection title="Medição de DOM">
            <DOMeasurementDemo />
          </DemoSection>

          <DemoSection title="Animação sem Flicker">
            <AnimationDemo />
          </DemoSection>

          <DemoSection title="Tooltip com Posicionamento Inteligente">
            <TooltipDemo />
          </DemoSection>
        </div>

        <div className="mt-16 space-y-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Comparação com useEffect</h2>
            <CodeBlock code={basicCode} language="tsx" />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Medição de DOM</h2>
            <CodeBlock code={measurementCode} language="tsx" />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Tooltip Inteligente</h2>
            <CodeBlock code={tooltipCode} language="tsx" />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Animação Suave</h2>
            <CodeBlock code={animationCode} language="tsx" />
          </div>
        </div>

        <div className="mt-16 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">⚠️ Quando Usar useLayoutEffect</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Use quando:</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Medir elementos DOM</li>
                <li>• Posicionar elementos dinamicamente</li>
                <li>• Prevenir flicker visual</li>
                <li>• Sincronizar com mutações DOM</li>
                <li>• Aplicar estilos baseados em medições</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Cuidados:</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Pode bloquear a pintura</li>
                <li>• Use useEffect quando possível</li>
                <li>• Evite operações custosas</li>
                <li>• Pode afetar performance</li>
                <li>• Executa no thread principal</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}