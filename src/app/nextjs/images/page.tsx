'use client';

import { useState } from 'react';
import Image from 'next/image';
import CodeBlock from '@/components/CodeBlock';
import DemoSection from '@/components/DemoSection';

const imageExamples = [
  {
    title: 'Imagem Básica',
    description: 'Uso básico do componente Image do Next.js com otimização automática',
    code: `import Image from 'next/image';

<Image
  src="/next.svg"
  alt="Next.js Logo"
  width={180}
  height={37}
  priority
/>`,
    component: (
      <Image
        src="/next.svg"
        alt="Next.js Logo"
        width={180}
        height={37}
        priority
        className="dark:invert"
      />
    )
  },
  {
    title: 'Imagem Responsiva',
    description: 'Imagem que se adapta ao container usando fill',
    code: `<div className="relative w-full h-64">
  <Image
    src="/vercel.svg"
    alt="Vercel Logo"
    fill
    className="object-contain"
  />
</div>`,
    component: (
      <div className="relative w-full h-64 border border-gray-300 dark:border-gray-600 rounded-lg">
        <Image
          src="/vercel.svg"
          alt="Vercel Logo"
          fill
          className="object-contain dark:invert"
        />
      </div>
    )
  },
  {
    title: 'Imagem com Placeholder',
    description: 'Imagem com blur placeholder para melhor UX',
    code: `<Image
  src="/globe.svg"
  alt="Globe"
  width={120}
  height={120}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
/>`,
    component: (
      <Image
        src="/globe.svg"
        alt="Globe"
        width={120}
        height={120}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        className="dark:invert"
      />
    )
  }
];

const optimizationFeatures = [
  {
    title: 'Lazy Loading',
    description: 'Carregamento sob demanda quando a imagem entra no viewport',
    icon: '⚡'
  },
  {
    title: 'Otimização Automática',
    description: 'Conversão automática para formatos modernos (WebP, AVIF)',
    icon: '🔧'
  },
  {
    title: 'Responsive Images',
    description: 'Diferentes tamanhos para diferentes dispositivos',
    icon: '📱'
  },
  {
    title: 'Placeholder Blur',
    description: 'Efeito blur durante o carregamento',
    icon: '🌫️'
  },
  {
    title: 'Priority Loading',
    description: 'Carregamento prioritário para imagens above-the-fold',
    icon: '🚀'
  },
  {
    title: 'Preload',
    description: 'Pré-carregamento de imagens críticas',
    icon: '⏰'
  }
];

export default function NextjsImagesPage() {
  const [selectedExample, setSelectedExample] = useState(0);

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Next.js Image Component
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Otimização automática de imagens com performance e UX aprimoradas
          </p>
        </div>

        {/* Optimization Features */}
        <DemoSection title="Recursos de Otimização">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1.5">
            {optimizationFeatures.map((feature, index) => (
              <div key={feature.title} className="card hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">{feature.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DemoSection>

        {/* Image Examples */}
        <DemoSection title="Exemplos Práticos">
          <div className="space-y-8">
            {/* Example Selector */}
            <div className="flex flex-wrap gap-2 justify-center">
              {imageExamples.map((example, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedExample(index)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    selectedExample === index
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {example.title}
                </button>
              ))}
            </div>

            {/* Selected Example */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-1.5">
              {/* Demo */}
              <div className="card">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  {imageExamples[selectedExample].title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {imageExamples[selectedExample].description}
                </p>
                <div className="flex justify-center items-center p-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  {imageExamples[selectedExample].component}
                </div>
              </div>

              {/* Code */}
              <div>
                <CodeBlock
                  title={`${imageExamples[selectedExample].title} - Código`}
                  language="tsx"
                  code={imageExamples[selectedExample].code}
                />
              </div>
            </div>
          </div>
        </DemoSection>

        {/* Advanced Configuration */}
        <DemoSection title="Configuração Avançada">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-1.5">
            <div className="space-y-6">
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  next.config.js
                </h3>
                <CodeBlock
                  language="javascript"
                  code={`/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['example.com'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
}

module.exports = nextConfig`}
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Propriedades Importantes
                </h3>
                <div className="space-y-4">
                  <div>
                    <code className="text-sm font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                      priority
                    </code>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Para imagens above-the-fold (LCP)
                    </p>
                  </div>
                  <div>
                    <code className="text-sm font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                      fill
                    </code>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Preenche o container pai (position: relative)
                    </p>
                  </div>
                  <div>
                    <code className="text-sm font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                      sizes
                    </code>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Define tamanhos responsivos
                    </p>
                  </div>
                  <div>
                    <code className="text-sm font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                      quality
                    </code>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Qualidade da imagem (1-100)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DemoSection>

        {/* Performance Tips */}
        <DemoSection title="Dicas de Performance">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                ✅ Boas Práticas
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Use <code>priority</code> para imagens LCP</li>
                <li>• Defina <code>width</code> e <code>height</code> para evitar layout shift</li>
                <li>• Use <code>placeholder="blur"</code> para melhor UX</li>
                <li>• Configure domínios externos no next.config.js</li>
                <li>• Use <code>sizes</code> para imagens responsivas</li>
                <li>• Otimize qualidade baseada no uso</li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                ❌ Evite
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Usar <code>&lt;img&gt;</code> tag diretamente</li>
                <li>• Não definir dimensões (causa layout shift)</li>
                <li>• Usar <code>priority</code> em muitas imagens</li>
                <li>• Ignorar otimização de formatos</li>
                <li>• Não configurar domínios externos</li>
                <li>• Usar qualidade muito alta desnecessariamente</li>
              </ul>
            </div>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}