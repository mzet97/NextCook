'use client';

import React from 'react';
import { DemoSection } from '@/components/DemoSection';
import { DemoCardStatic } from '@/components/DemoCardStatic';
import { CodeBlock } from '@/components/CodeBlock';
import { Package, Download, Palette, Code } from 'lucide-react';

export default function ShadcnUIPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Shadcn/ui Components
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Componentes modernos e acessíveis construídos com Radix UI e Tailwind CSS.
            Copy & paste components que você pode usar em seus projetos.
          </p>
        </div>

        {/* Installation */}
        <DemoSection title="Instalação" description="Como começar com Shadcn/ui">
          <div className="grid md:grid-cols-2 gap-1.5">
            <DemoCardStatic title="Inicializar Projeto" description="Setup inicial do Shadcn/ui">
              <CodeBlock
                language="bash"
                code={`# Inicializar shadcn/ui
npx shadcn-ui@latest init

# Adicionar componentes
npx shadcn-ui@latest add button
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add input
npx shadcn-ui@latest add label`}
              />
            </DemoCardStatic>

            <DemoCardStatic title="Configuração" description="Configuração do components.json">
              <CodeBlock
                language="json"
                code={`{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "app/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}`}
              />
            </DemoCardStatic>
          </div>
        </DemoSection>

        {/* Features */}
        <DemoSection title="Características" description="Por que usar Shadcn/ui">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-1.5">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <Package className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Copy & Paste</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Componentes que você copia e cola diretamente no seu projeto.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <Palette className="h-8 w-8 text-green-600 dark:text-green-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Customizável</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Totalmente customizável com Tailwind CSS e CSS variables.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <Code className="h-8 w-8 text-purple-600 dark:text-purple-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Acessível</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Construído com Radix UI para máxima acessibilidade.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <Download className="h-8 w-8 text-orange-600 dark:text-orange-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">TypeScript</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Suporte completo ao TypeScript com tipos bem definidos.
              </p>
            </div>
          </div>
        </DemoSection>

        {/* Example Usage */}
        <DemoSection title="Exemplo de Uso" description="Como usar os componentes">
          <DemoCardStatic title="Button Component" description="Exemplo de uso do componente Button">
            <CodeBlock
              language="typescript"
              code={`import { Button } from "@/components/ui/button";

export function ButtonDemo() {
  return (
    <div className="space-x-2">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  );
}`}
            />
          </DemoCardStatic>
        </DemoSection>

        {/* Benefits */}
        <DemoSection title="Vantagens" description="Por que escolher Shadcn/ui">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <div className="grid md:grid-cols-2 gap-1.5">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  ✅ Prós
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Componentes de alta qualidade</li>
                  <li>• Totalmente customizável</li>
                  <li>• Acessibilidade nativa</li>
                  <li>• TypeScript first</li>
                  <li>• Sem dependências extras</li>
                  <li>• Documentação excelente</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  ⚠️ Considerações
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Requer Tailwind CSS</li>
                  <li>• Setup inicial necessário</li>
                  <li>• Curva de aprendizado do Radix UI</li>
                  <li>• Manutenção manual dos componentes</li>
                </ul>
              </div>
            </div>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}