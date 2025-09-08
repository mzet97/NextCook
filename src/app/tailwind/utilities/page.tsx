'use client';
import CodeBlock from '@/components/CodeBlock';
import DemoSection from '@/components/DemoSection';

// Demonstração de Grid
function GridDemo() {
  const codeExample = `<!-- Grid com 3 colunas -->
<div className="grid grid-cols-3 gap-4">
  <div className="bg-blue-500 p-4 text-white">Item 1</div>
  <div className="bg-green-500 p-4 text-white">Item 2</div>
  <div className="bg-purple-500 p-4 text-white">Item 3</div>
</div>

<!-- Grid responsivo -->
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  <!-- Items -->
</div>`;

  return (
    <DemoSection title="Grid Layout" description="Sistema de grid flexível e responsivo">
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold mb-3">Grid 3 Colunas:</h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-500 p-4 text-white text-center rounded">Item 1</div>
            <div className="bg-green-500 p-4 text-white text-center rounded">Item 2</div>
            <div className="bg-purple-500 p-4 text-white text-center rounded">Item 3</div>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold mb-3">Grid Responsivo (1→2→4 colunas):</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-red-500 p-4 text-white text-center rounded">A</div>
            <div className="bg-yellow-500 p-4 text-white text-center rounded">B</div>
            <div className="bg-indigo-500 p-4 text-white text-center rounded">C</div>
            <div className="bg-pink-500 p-4 text-white text-center rounded">D</div>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold mb-3">Grid com Spans:</h4>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-orange-500 p-4 text-white text-center rounded col-span-2">Span 2</div>
            <div className="bg-teal-500 p-4 text-white text-center rounded">1</div>
            <div className="bg-cyan-500 p-4 text-white text-center rounded">1</div>
            <div className="bg-lime-500 p-4 text-white text-center rounded">1</div>
            <div className="bg-emerald-500 p-4 text-white text-center rounded col-span-3">Span 3</div>
          </div>
        </div>
        
        <CodeBlock code={codeExample} language="html" />
      </div>
    </DemoSection>
  );
}

// Demonstração de Flexbox
function FlexboxDemo() {
  const codeExample = `<!-- Flex básico -->
<div className="flex space-x-4">
  <div className="bg-blue-500 p-4 text-white">Item 1</div>
  <div className="bg-green-500 p-4 text-white">Item 2</div>
  <div className="bg-purple-500 p-4 text-white">Item 3</div>
</div>

<!-- Flex com justify e align -->
<div className="flex justify-center items-center h-32">
  <div className="bg-red-500 p-4 text-white">Centralizado</div>
</div>

<!-- Flex wrap -->
<div className="flex flex-wrap gap-4">
  <!-- Items que quebram linha -->
</div>`;

  return (
    <DemoSection title="Flexbox" description="Layout flexível e alinhamento">
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold mb-3">Flex Básico:</h4>
          <div className="flex space-x-4">
            <div className="bg-blue-500 p-4 text-white rounded flex-1 text-center">Flex 1</div>
            <div className="bg-green-500 p-4 text-white rounded flex-1 text-center">Flex 1</div>
            <div className="bg-purple-500 p-4 text-white rounded flex-1 text-center">Flex 1</div>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold mb-3">Justify Content:</h4>
          <div className="space-y-3">
            <div className="flex justify-start space-x-2 bg-gray-100 p-3 rounded">
              <div className="bg-red-500 p-2 text-white rounded text-sm">Start</div>
              <div className="bg-red-500 p-2 text-white rounded text-sm">Start</div>
            </div>
            <div className="flex justify-center space-x-2 bg-gray-100 p-3 rounded">
              <div className="bg-green-500 p-2 text-white rounded text-sm">Center</div>
              <div className="bg-green-500 p-2 text-white rounded text-sm">Center</div>
            </div>
            <div className="flex justify-end space-x-2 bg-gray-100 p-3 rounded">
              <div className="bg-blue-500 p-2 text-white rounded text-sm">End</div>
              <div className="bg-blue-500 p-2 text-white rounded text-sm">End</div>
            </div>
            <div className="flex justify-between bg-gray-100 p-3 rounded">
              <div className="bg-purple-500 p-2 text-white rounded text-sm">Between</div>
              <div className="bg-purple-500 p-2 text-white rounded text-sm">Between</div>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold mb-3">Align Items:</h4>
          <div className="flex items-center justify-center h-32 bg-gray-100 rounded">
            <div className="bg-orange-500 p-4 text-white rounded">Centralizado Vertical e Horizontal</div>
          </div>
        </div>
        
        <CodeBlock code={codeExample} language="html" />
      </div>
    </DemoSection>
  );
}

// Demonstração de Spacing
function SpacingDemo() {
  const codeExample = `<!-- Padding -->
<div className="p-4">Padding 4</div>
<div className="px-6 py-3">Padding X:6 Y:3</div>
<div className="pt-8 pb-4 pl-2 pr-6">Padding específico</div>

<!-- Margin -->
<div className="m-4">Margin 4</div>
<div className="mx-auto">Margin X auto (centralizar)</div>
<div className="mt-8 mb-4">Margin Top:8 Bottom:4</div>

<!-- Space Between -->
<div className="flex space-x-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>`;

  return (
    <DemoSection title="Spacing" description="Padding, margin e espaçamento">
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold mb-3">Padding:</h4>
          <div className="space-y-3">
            <div className="bg-blue-100 border-2 border-blue-300 border-dashed">
              <div className="bg-blue-500 text-white p-2 rounded">p-2</div>
            </div>
            <div className="bg-green-100 border-2 border-green-300 border-dashed">
              <div className="bg-green-500 text-white p-4 rounded">p-4</div>
            </div>
            <div className="bg-purple-100 border-2 border-purple-300 border-dashed">
              <div className="bg-purple-500 text-white p-8 rounded">p-8</div>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold mb-3">Margin:</h4>
          <div className="bg-gray-100 p-4 rounded">
            <div className="bg-red-500 text-white p-2 rounded m-2">m-2</div>
            <div className="bg-yellow-500 text-white p-2 rounded m-4">m-4</div>
            <div className="bg-indigo-500 text-white p-2 rounded mx-auto w-32 text-center">mx-auto</div>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold mb-3">Space Between:</h4>
          <div className="flex space-x-2">
            <div className="bg-pink-500 text-white p-2 rounded">space-x-2</div>
            <div className="bg-pink-500 text-white p-2 rounded">space-x-2</div>
            <div className="bg-pink-500 text-white p-2 rounded">space-x-2</div>
          </div>
          <div className="flex space-x-6 mt-3">
            <div className="bg-teal-500 text-white p-2 rounded">space-x-6</div>
            <div className="bg-teal-500 text-white p-2 rounded">space-x-6</div>
            <div className="bg-teal-500 text-white p-2 rounded">space-x-6</div>
          </div>
        </div>
        
        <CodeBlock code={codeExample} language="html" />
      </div>
    </DemoSection>
  );
}

// Demonstração de Colors
function ColorsDemo() {
  const colors = [
    { name: 'Red', class: 'bg-red-500', text: 'text-red-500' },
    { name: 'Orange', class: 'bg-orange-500', text: 'text-orange-500' },
    { name: 'Yellow', class: 'bg-yellow-500', text: 'text-yellow-500' },
    { name: 'Green', class: 'bg-green-500', text: 'text-green-500' },
    { name: 'Blue', class: 'bg-blue-500', text: 'text-blue-500' },
    { name: 'Indigo', class: 'bg-indigo-500', text: 'text-indigo-500' },
    { name: 'Purple', class: 'bg-purple-500', text: 'text-purple-500' },
    { name: 'Pink', class: 'bg-pink-500', text: 'text-pink-500' },
  ];

  const codeExample = `<!-- Background Colors -->
<div className="bg-red-500 text-white p-4">Red Background</div>
<div className="bg-blue-500 text-white p-4">Blue Background</div>

<!-- Text Colors -->
<p className="text-red-500">Red Text</p>
<p className="text-blue-500">Blue Text</p>

<!-- Color Variations -->
<div className="bg-blue-100 text-blue-900 p-4">Light Blue BG, Dark Blue Text</div>
<div className="bg-blue-900 text-blue-100 p-4">Dark Blue BG, Light Blue Text</div>`;

  return (
    <DemoSection title="Colors" description="Paleta de cores e variações">
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold mb-3">Background Colors:</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {colors.map((color) => (
              <div key={color.name} className={`${color.class} text-white p-3 rounded text-center text-sm`}>
                {color.name}
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold mb-3">Text Colors:</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {colors.map((color) => (
              <div key={color.name} className={`${color.text} font-semibold text-center`}>
                {color.name}
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold mb-3">Color Variations:</h4>
          <div className="space-y-2">
            <div className="bg-blue-100 text-blue-900 p-3 rounded">bg-blue-100 text-blue-900</div>
            <div className="bg-blue-200 text-blue-800 p-3 rounded">bg-blue-200 text-blue-800</div>
            <div className="bg-blue-500 text-white p-3 rounded">bg-blue-500 text-white</div>
            <div className="bg-blue-800 text-blue-100 p-3 rounded">bg-blue-800 text-blue-100</div>
            <div className="bg-blue-900 text-blue-50 p-3 rounded">bg-blue-900 text-blue-50</div>
          </div>
        </div>
        
        <CodeBlock code={codeExample} language="html" />
      </div>
    </DemoSection>
  );
}

// Demonstração de Typography
function TypographyDemo() {
  const codeExample = `<!-- Font Sizes -->
<p className="text-xs">Extra Small Text</p>
<p className="text-sm">Small Text</p>
<p className="text-base">Base Text</p>
<p className="text-lg">Large Text</p>
<p className="text-xl">Extra Large Text</p>
<p className="text-2xl">2X Large Text</p>

<!-- Font Weights -->
<p className="font-thin">Thin</p>
<p className="font-normal">Normal</p>
<p className="font-semibold">Semibold</p>
<p className="font-bold">Bold</p>

<!-- Text Alignment -->
<p className="text-left">Left Aligned</p>
<p className="text-center">Center Aligned</p>
<p className="text-right">Right Aligned</p>`;

  return (
    <DemoSection title="Typography" description="Tipografia e formatação de texto">
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold mb-3">Font Sizes:</h4>
          <div className="space-y-2">
            <p className="text-xs">text-xs - Extra Small Text</p>
            <p className="text-sm">text-sm - Small Text</p>
            <p className="text-base">text-base - Base Text</p>
            <p className="text-lg">text-lg - Large Text</p>
            <p className="text-xl">text-xl - Extra Large Text</p>
            <p className="text-2xl">text-2xl - 2X Large Text</p>
            <p className="text-3xl">text-3xl - 3X Large Text</p>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold mb-3">Font Weights:</h4>
          <div className="space-y-2">
            <p className="font-thin">font-thin - Thin Weight</p>
            <p className="font-light">font-light - Light Weight</p>
            <p className="font-normal">font-normal - Normal Weight</p>
            <p className="font-medium">font-medium - Medium Weight</p>
            <p className="font-semibold">font-semibold - Semibold Weight</p>
            <p className="font-bold">font-bold - Bold Weight</p>
            <p className="font-extrabold">font-extrabold - Extra Bold Weight</p>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold mb-3">Text Alignment:</h4>
          <div className="space-y-2 bg-gray-50 p-4 rounded">
            <p className="text-left">text-left - Left Aligned Text</p>
            <p className="text-center">text-center - Center Aligned Text</p>
            <p className="text-right">text-right - Right Aligned Text</p>
            <p className="text-justify">text-justify - Justified text that spreads across the full width of the container, creating even spacing between words.</p>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold mb-3">Text Decoration:</h4>
          <div className="space-y-2">
            <p className="underline">underline - Underlined Text</p>
            <p className="line-through">line-through - Strikethrough Text</p>
            <p className="uppercase">uppercase - UPPERCASE TEXT</p>
            <p className="lowercase">LOWERCASE - lowercase text</p>
            <p className="capitalize">capitalize - Capitalized Text</p>
          </div>
        </div>
        
        <CodeBlock code={codeExample} language="html" />
        </div>
     </DemoSection>
  );
}

export default function UtilitiesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🛠️ Tailwind Utilities
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Demonstrações práticas das principais classes utilitárias do Tailwind CSS
          </p>
        </div>

        <div className="grid gap-1.5 max-w-6xl mx-auto">
          <GridDemo />
          <FlexboxDemo />
          <SpacingDemo />
          <ColorsDemo />
          <TypographyDemo />
        </div>
      </div>
    </div>
  );
}