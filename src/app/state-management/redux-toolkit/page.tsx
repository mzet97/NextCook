'use client';

import { useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { DemoCardStatic } from '@/components/DemoCardStatic';
import { DemoSection } from '@/components/DemoSection';
import { 
  CubeIcon, 
  CogIcon, 
  ClockIcon,
  BugAntIcon,
  ChartBarIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

const reduxFeatures = [
  {
    name: 'createSlice',
    description: 'Simplifica criação de reducers e actions',
    icon: CubeIcon,
    example: `import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
  value: number;
  status: 'idle' | 'loading';
}

const initialState: CounterState = {
  value: 0,
  status: 'idle'
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      // Immer permite mutação direta
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    reset: (state) => {
      state.value = 0;
      state.status = 'idle';
    }
  }
});

export const { increment, decrement, incrementByAmount, reset } = counterSlice.actions;
export default counterSlice.reducer;`
  }
];

const practicalExamples = [
  {
    title: 'Counter Slice',
    description: 'Exemplo básico de slice com Redux Toolkit',
    code: `import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    }
  }
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;`
  }
];

export default function ReduxToolkitPage() {
  const [selectedFeature, setSelectedFeature] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Redux Toolkit
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A forma moderna e eficiente de usar Redux em aplicações React
          </p>
        </div>

        {/* Redux Features */}
        <DemoSection title="Principais Features" description="Explore as funcionalidades do Redux Toolkit">
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {reduxFeatures.map((feature, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedFeature(index)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedFeature === index
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {feature.name}
                </button>
              ))}
            </div>
            
            <DemoCardStatic 
              title={reduxFeatures[selectedFeature].name} 
              description={reduxFeatures[selectedFeature].description}
            >
              <div className="flex items-center mb-4">
                {(() => {
                  const Icon = reduxFeatures[selectedFeature].icon;
                  return <Icon className="h-6 w-6 text-red-600 dark:text-red-400 mr-2" />;
                })()}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {reduxFeatures[selectedFeature].name}
                </span>
              </div>
              <CodeBlock
                language="typescript"
                code={reduxFeatures[selectedFeature].example}
              />
            </DemoCardStatic>
          </div>
        </DemoSection>

        {/* Store Setup */}
        <DemoSection title="Configuração da Store" description="Setup completo do Redux Toolkit">
          <div className="grid md:grid-cols-2 gap-6">
            <DemoCardStatic title="store.ts" description="Configuração principal da store">
              <CodeBlock
                language="typescript"
                code={`import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;`}
              />
            </DemoCardStatic>

            <DemoCardStatic title="hooks.ts" description="Hooks tipados para TypeScript">
              <CodeBlock
                language="typescript"
                code={`import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;`}
              />
            </DemoCardStatic>
          </div>
        </DemoSection>

        {/* Practical Examples */}
        <DemoSection title="Exemplos Práticos" description="Implementações reais com Redux Toolkit">
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {practicalExamples.map((example, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedExample(index)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedExample === index
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {example.title}
                </button>
              ))}
            </div>
            
            <DemoCardStatic 
              title={practicalExamples[selectedExample].title} 
              description={practicalExamples[selectedExample].description}
            >
              <CodeBlock
                language="typescript"
                code={practicalExamples[selectedExample].code}
              />
            </DemoCardStatic>
          </div>
        </DemoSection>

        {/* Best Practices */}
        <DemoSection title="Melhores Práticas" description="Diretrizes para usar Redux Toolkit efetivamente">
          <div className="grid md:grid-cols-2 gap-6">
            <DemoCardStatic title="✅ Faça" description="Práticas recomendadas">
              <div className="space-y-3">
                {[
                  'Use createSlice para reducers simples',
                  'Implemente seletores memoizados',
                  'Use RTK Query para dados do servidor',
                  'Use TypeScript para type safety'
                ].map((practice, index) => (
                  <div key={index} className="flex items-start">
                    <ChartBarIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{practice}</span>
                  </div>
                ))}
              </div>
            </DemoCardStatic>

            <DemoCardStatic title="❌ Evite" description="Práticas a evitar">
              <div className="space-y-3">
                {[
                  'Mutações diretas sem Immer',
                  'Estado não serializável',
                  'Lógica de negócio em componentes',
                  'Não usar DevTools em desenvolvimento'
                ].map((practice, index) => (
                  <div key={index} className="flex items-start">
                    <BugAntIcon className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{practice}</span>
                  </div>
                ))}
              </div>
            </DemoCardStatic>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}