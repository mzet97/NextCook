'use client';

import { useState, useEffect } from 'react';

interface DynamicDemoProps {
  title?: string;
}

function DynamicDemo({ title = 'Dynamic Component' }: DynamicDemoProps) {
  const [count, setCount] = useState(0);
  const [loadTime, setLoadTime] = useState<number | null>(null);

  useEffect(() => {
    const startTime = performance.now();
    setLoadTime(startTime);
  }, []);

  const formatLoadTime = () => {
    if (!loadTime) return 'Calculating...';
    const currentTime = performance.now();
    return `${(currentTime - loadTime).toFixed(2)}ms`;
  };

  return (
    <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-lg border border-purple-300 dark:border-purple-700">
      <h3 className="font-semibold text-purple-800 dark:text-purple-200 mb-3">{title}</h3>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-purple-700 dark:text-purple-300">Load Time:</span>
          <span className="font-mono text-sm text-purple-600 dark:text-purple-400">
            {formatLoadTime()}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-purple-700 dark:text-purple-300">Counter:</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCount(prev => prev - 1)}
              className="px-2 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600 transition-colors"
            >
              -
            </button>
            <span className="font-mono text-lg text-purple-600 dark:text-purple-400 min-w-[3ch] text-center">
              {count}
            </span>
            <button
              onClick={() => setCount(prev => prev + 1)}
              className="px-2 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600 transition-colors"
            >
              +
            </button>
          </div>
        </div>
        
        <div className="text-sm text-purple-600 dark:text-purple-400">
          Este componente foi carregado dinamicamente usando Next.js dynamic imports.
          Ele não foi incluído no bundle inicial da página.
        </div>
        
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="p-2 bg-purple-200 dark:bg-purple-800/50 rounded text-center">
            <div className="font-semibold">SSR</div>
            <div>Disabled</div>
          </div>
          <div className="p-2 bg-purple-200 dark:bg-purple-800/50 rounded text-center">
            <div className="font-semibold">Loading</div>
            <div>Custom</div>
          </div>
          <div className="p-2 bg-purple-200 dark:bg-purple-800/50 rounded text-center">
            <div className="font-semibold">Bundle</div>
            <div>Separate</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Exports
export default DynamicDemo;
export { DynamicDemo };