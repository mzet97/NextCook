'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as Dialog from '@radix-ui/react-dialog';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Accordion from '@radix-ui/react-accordion';
import * as Tabs from '@radix-ui/react-tabs';
import * as Tooltip from '@radix-ui/react-tooltip';
import * as Switch from '@radix-ui/react-switch';
import * as Slider from '@radix-ui/react-slider';
import * as Progress from '@radix-ui/react-progress';
import { 
  X, 
  ChevronDown, 
  User, 
  Settings, 
  LogOut, 
  Plus,
  Edit,
  Trash,
  Info,
  Volume2,
  VolumeX
} from 'lucide-react';
import { DemoCard } from '@/components/DemoCard';
import { DemoSection } from '@/components/DemoSection';
import { CodeBlock } from '@/components/CodeBlock';
import { DemoCardStatic } from '@/components/DemoCardStatic';

// Styled Radix components
function DialogDemo() {
  const [open, setOpen] = useState(false);
  
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
          Open Dialog
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-lg">
          <div className="flex flex-col space-y-1.5 text-center sm:text-left">
            <Dialog.Title className="text-lg font-semibold leading-none tracking-tight">
              Edit Profile
            </Dialog.Title>
            <Dialog.Description className="text-sm text-gray-500">
              Make changes to your profile here. Click save when you're done.
            </Dialog.Description>
          </div>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right text-sm font-medium">
                Name
              </label>
              <input
                id="name"
                defaultValue="Pedro Duarte"
                className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="username" className="text-right text-sm font-medium">
                Username
              </label>
              <input
                id="username"
                defaultValue="@peduarte"
                className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Dialog.Close asChild>
              <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                Cancel
              </button>
            </Dialog.Close>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
              Save changes
            </button>
          </div>
          
          <Dialog.Close asChild>
            <button className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function DropdownMenuDemo() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="inline-flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <User className="h-4 w-4 mr-2" />
          My Account
          <ChevronDown className="h-4 w-4 ml-2" />
        </button>
      </DropdownMenu.Trigger>
      
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="min-w-[220px] bg-white rounded-md p-1 shadow-lg border border-gray-200 will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade">
          <DropdownMenu.Item className="group text-sm leading-none text-gray-700 rounded-sm flex items-center h-8 px-2 relative select-none outline-none data-[disabled]:text-gray-300 data-[disabled]:pointer-events-none data-[highlighted]:bg-blue-50 data-[highlighted]:text-blue-900">
            <User className="h-4 w-4 mr-2" />
            Profile
          </DropdownMenu.Item>
          
          <DropdownMenu.Item className="group text-sm leading-none text-gray-700 rounded-sm flex items-center h-8 px-2 relative select-none outline-none data-[disabled]:text-gray-300 data-[disabled]:pointer-events-none data-[highlighted]:bg-blue-50 data-[highlighted]:text-blue-900">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </DropdownMenu.Item>
          
          <DropdownMenu.Separator className="h-px bg-gray-200 m-1" />
          
          <DropdownMenu.Item className="group text-sm leading-none text-gray-700 rounded-sm flex items-center h-8 px-2 relative select-none outline-none data-[disabled]:text-gray-300 data-[disabled]:pointer-events-none data-[highlighted]:bg-red-50 data-[highlighted]:text-red-900">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenu.Item>
          
          <DropdownMenu.Arrow className="fill-white" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

function AccordionDemo() {
  return (
    <Accordion.Root className="w-full" type="single" defaultValue="item-1" collapsible>
      <Accordion.Item className="border-b border-gray-200" value="item-1">
        <Accordion.Header className="flex">
          <Accordion.Trigger className="flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180">
            Is it accessible?
            <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
          <div className="pb-4 pt-0">
            Yes. It adheres to the WAI-ARIA design pattern and is tested with screen readers.
          </div>
        </Accordion.Content>
      </Accordion.Item>
      
      <Accordion.Item className="border-b border-gray-200" value="item-2">
        <Accordion.Header className="flex">
          <Accordion.Trigger className="flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180">
            Is it styled?
            <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
          <div className="pb-4 pt-0">
            Yes. It comes with default styles that match the other components' aesthetic.
          </div>
        </Accordion.Content>
      </Accordion.Item>
      
      <Accordion.Item className="border-b border-gray-200" value="item-3">
        <Accordion.Header className="flex">
          <Accordion.Trigger className="flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180">
            Is it animated?
            <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
          <div className="pb-4 pt-0">
            Yes. It's animated by default, but you can disable it if you prefer.
          </div>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
}

function TabsDemo() {
  return (
    <Tabs.Root className="w-full" defaultValue="account">
      <Tabs.List className="inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-500">
        <Tabs.Trigger 
          value="account" 
          className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-gray-950 data-[state=active]:shadow-sm"
        >
          Account
        </Tabs.Trigger>
        <Tabs.Trigger 
          value="password" 
          className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-gray-950 data-[state=active]:shadow-sm"
        >
          Password
        </Tabs.Trigger>
      </Tabs.List>
      
      <Tabs.Content value="account" className="mt-4 space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Name</label>
          <input 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
            defaultValue="Pedro Duarte" 
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Username</label>
          <input 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
            defaultValue="@peduarte" 
          />
        </div>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
          Save changes
        </button>
      </Tabs.Content>
      
      <Tabs.Content value="password" className="mt-4 space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Current password</label>
          <input 
            type="password" 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">New password</label>
          <input 
            type="password" 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
        </div>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
          Change password
        </button>
      </Tabs.Content>
    </Tabs.Root>
  );
}

function TooltipDemo() {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-white h-10 px-4 py-2 bg-blue-500 text-white hover:bg-blue-600">
            <Plus className="h-4 w-4 mr-2" />
            Hover me
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className="z-50 overflow-hidden rounded-md border bg-gray-900 px-3 py-1.5 text-xs text-white animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
            Add to library
            <Tooltip.Arrow className="fill-gray-900" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

function SwitchDemo() {
  const [checked, setChecked] = useState(false);
  
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch.Root 
          className="w-11 h-6 bg-gray-200 rounded-full relative data-[state=checked]:bg-blue-500 outline-none cursor-default transition-colors"
          checked={checked}
          onCheckedChange={setChecked}
        >
          <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
        </Switch.Root>
        <label className="text-sm font-medium">
          Enable notifications
        </label>
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch.Root 
          className="w-11 h-6 bg-gray-200 rounded-full relative data-[state=checked]:bg-green-500 outline-none cursor-default transition-colors"
          defaultChecked
        >
          <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
        </Switch.Root>
        <label className="text-sm font-medium">
          Auto-save
        </label>
      </div>
      
      <p className="text-sm text-gray-600">
        Notifications are {checked ? 'enabled' : 'disabled'}
      </p>
    </div>
  );
}

function SliderDemo() {
  const [value, setValue] = useState([50]);
  const [volume, setVolume] = useState([75]);
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Brightness: {value[0]}%</label>
        <Slider.Root
          className="relative flex items-center select-none touch-none w-full h-5"
          value={value}
          onValueChange={setValue}
          max={100}
          step={1}
        >
          <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
            <Slider.Range className="absolute bg-blue-500 rounded-full h-full" />
          </Slider.Track>
          <Slider.Thumb className="block w-5 h-5 bg-white border-2 border-blue-500 rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </Slider.Root>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          {volume[0] === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          <label className="text-sm font-medium">Volume: {volume[0]}%</label>
        </div>
        <Slider.Root
          className="relative flex items-center select-none touch-none w-full h-5"
          value={volume}
          onValueChange={setVolume}
          max={100}
          step={1}
        >
          <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
            <Slider.Range className="absolute bg-green-500 rounded-full h-full" />
          </Slider.Track>
          <Slider.Thumb className="block w-5 h-5 bg-white border-2 border-green-500 rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-400" />
        </Slider.Root>
      </div>
    </div>
  );
}

function ProgressDemo() {
  const [progress, setProgress] = useState(13);
  
  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <Progress.Root className="relative overflow-hidden bg-gray-200 rounded-full w-full h-2">
          <Progress.Indicator 
            className="h-full w-full flex-1 bg-blue-500 transition-all duration-500 ease-out"
            style={{ transform: `translateX(-${100 - progress}%)` }}
          />
        </Progress.Root>
      </div>
      
      <button 
        onClick={() => setProgress(Math.min(100, progress + 10))}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Increase Progress
      </button>
    </div>
  );
}

export default function RadixUIPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Radix UI - Headless Components
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Componentes de baixo nível e acessíveis para construir design systems de alta qualidade. 
            Sem estilos, totalmente customizáveis.
          </p>
        </motion.div>

        <DemoSection title="Características Principais">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">🎯 Headless</h3>
              <p className="text-purple-800">
                Funcionalidade sem estilos. Você tem controle total sobre a aparência.
              </p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-green-900 mb-2">♿ Acessível</h3>
              <p className="text-green-800">
                Segue padrões WAI-ARIA e é testado com screen readers.
              </p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">🧩 Composável</h3>
              <p className="text-blue-800">
                Componentes granulares que podem ser compostos conforme necessário.
              </p>
            </div>
          </div>
        </DemoSection>

        <DemoSection title="Componentes em Ação">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <DemoCardStatic title="Dialog" description="Modal acessível com overlay">
              <DialogDemo />
            </DemoCardStatic>
            
            <DemoCardStatic title="Dropdown Menu" description="Menu contextual com navegação por teclado">
              <DropdownMenuDemo />
            </DemoCardStatic>
            
            <DemoCardStatic title="Accordion" description="Conteúdo colapsável">
              <AccordionDemo />
            </DemoCardStatic>
            
            <DemoCardStatic title="Tabs" description="Navegação por abas">
              <TabsDemo />
            </DemoCardStatic>
            
            <DemoCardStatic title="Tooltip" description="Dicas contextuais">
              <TooltipDemo />
            </DemoCardStatic>
            
            <DemoCardStatic title="Switch" description="Toggle acessível">
              <SwitchDemo />
            </DemoCardStatic>
            
            <DemoCardStatic title="Slider" description="Controle deslizante">
              <SliderDemo />
            </DemoCardStatic>
            
            <DemoCardStatic title="Progress" description="Indicador de progresso">
              <ProgressDemo />
            </DemoCardStatic>
          </div>
        </DemoSection>

        <DemoSection title="Instalação e Uso">
          <div className="grid md:grid-cols-2 gap-6">
            <DemoCardStatic title="Instalação" description="Instale apenas os componentes que você precisa">
              <CodeBlock
                language="bash"
                code={`# Instalar Radix UI primitives
npm install @radix-ui/react-dialog
npm install @radix-ui/react-dropdown-menu
npm install @radix-ui/react-accordion
npm install @radix-ui/react-tabs
npm install @radix-ui/react-tooltip
npm install @radix-ui/react-switch
npm install @radix-ui/react-slider
npm install @radix-ui/react-progress

# Ou instalar múltiplos de uma vez
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-accordion`}
              />
            </DemoCardStatic>

            <DemoCardStatic title="Uso Básico" description="Exemplo de implementação">
              <CodeBlock
                language="typescript"
                code={`import * as Dialog from '@radix-ui/react-dialog';

function MyDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button>Open Dialog</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="overlay" />
        <Dialog.Content className="content">
          <Dialog.Title>Edit Profile</Dialog.Title>
          <Dialog.Description>
            Make changes to your profile.
          </Dialog.Description>
          {/* Content */}
          <Dialog.Close asChild>
            <button>Close</button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}`}
              />
            </DemoCardStatic>
          </div>
        </DemoSection>

        <DemoSection title="Styling com CSS">
           <DemoCardStatic title="Exemplo de Estilos" description="Como estilizar componentes Radix">
             <CodeBlock
              language="css"
              code={`/* Dialog Styles */
.overlay {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  inset: 0;
  animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
}

.content {
  background-color: white;
  border-radius: 6px;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
              hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 450px;
  max-height: 85vh;
  padding: 25px;
  animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes overlayShow {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes contentShow {
  from {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

/* Data attributes para estados */
.trigger[data-state='open'] {
  background-color: #f0f0f0;
}

.item[data-highlighted] {
  background-color: #e6f3ff;
  color: #0066cc;
}`}
            />
          </DemoCardStatic>
        </DemoSection>

        <DemoSection title="Recursos Avançados">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-yellow-900 mb-2">🎨 Data Attributes</h3>
              <p className="text-yellow-800 text-sm mb-3">
                Estados expostos via data attributes para styling.
              </p>
              <CodeBlock
                language="css"
                code={`[data-state="open"] {
  /* Estilos para estado aberto */
}

[data-highlighted] {
  /* Estilos para item destacado */
}`}
              />
            </div>
            
            <div className="bg-red-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-red-900 mb-2">⌨️ Keyboard Navigation</h3>
              <p className="text-red-800 text-sm mb-3">
                Navegação por teclado completa e intuitiva.
              </p>
              <ul className="text-xs text-red-700 space-y-1">
                <li>• Tab/Shift+Tab para navegar</li>
                <li>• Enter/Space para ativar</li>
                <li>• Arrow keys para listas</li>
                <li>• Escape para fechar</li>
              </ul>
            </div>
            
            <div className="bg-indigo-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-indigo-900 mb-2">🔧 Controlled/Uncontrolled</h3>
              <p className="text-indigo-800 text-sm mb-3">
                Suporte para ambos os padrões.
              </p>
              <CodeBlock
                language="typescript"
                code={`// Controlled
<Dialog.Root open={open} onOpenChange={setOpen}>

// Uncontrolled
<Dialog.Root defaultOpen>`}
              />
            </div>
          </div>
        </DemoSection>

        <DemoSection title="Vantagens do Radix UI">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-green-900 mb-2">🎯 Flexibilidade Total</h3>
              <p className="text-green-800">
                Sem estilos pré-definidos. Você tem controle completo sobre a aparência.
              </p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">⚡ Performance</h3>
              <p className="text-blue-800">
                Componentes otimizados e tree-shakeable. Apenas o que você usa é incluído.
              </p>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">🔒 Acessibilidade</h3>
              <p className="text-purple-800">
                Acessibilidade de primeira classe, testada com tecnologias assistivas.
              </p>
            </div>
          </div>
        </DemoSection>

        <DemoSection title="Exemplo Completo">
          <CodeBlock
            language="typescript"
            code={`import * as Dialog from '@radix-ui/react-dialog';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Cross2Icon, HamburgerMenuIcon } from '@radix-ui/react-icons';

function App() {
  return (
    <div>
      {/* Dialog Example */}
      <Dialog.Root>
        <Dialog.Trigger className="button">
          Edit profile
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="dialog-overlay" />
          <Dialog.Content className="dialog-content">
            <Dialog.Title className="dialog-title">
              Edit profile
            </Dialog.Title>
            <Dialog.Description className="dialog-description">
              Make changes to your profile here. Click save when you're done.
            </Dialog.Description>
            <fieldset className="fieldset">
              <label className="label" htmlFor="name">
                Name
              </label>
              <input className="input" id="name" defaultValue="Pedro Duarte" />
            </fieldset>
            <fieldset className="fieldset">
              <label className="label" htmlFor="username">
                Username
              </label>
              <input className="input" id="username" defaultValue="@peduarte" />
            </fieldset>
            <div className="dialog-actions">
              <Dialog.Close asChild>
                <button className="button green">Save changes</button>
              </Dialog.Close>
            </div>
            <Dialog.Close asChild>
              <button className="icon-button" aria-label="Close">
                <Cross2Icon />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Dropdown Menu Example */}
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="icon-button">
          <HamburgerMenuIcon />
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content className="dropdown-content">
            <DropdownMenu.Item className="dropdown-item">
              New Tab <div className="right-slot">⌘+T</div>
            </DropdownMenu.Item>
            <DropdownMenu.Item className="dropdown-item">
              New Window <div className="right-slot">⌘+N</div>
            </DropdownMenu.Item>
            <DropdownMenu.Item className="dropdown-item" disabled>
              New Private Window <div className="right-slot">⇧+⌘+N</div>
            </DropdownMenu.Item>
            <DropdownMenu.Sub>
              <DropdownMenu.SubTrigger className="dropdown-subtrigger">
                More Tools
              </DropdownMenu.SubTrigger>
              <DropdownMenu.Portal>
                <DropdownMenu.SubContent className="dropdown-content">
                  <DropdownMenu.Item className="dropdown-item">
                    Save Page As… <div className="right-slot">⌘+S</div>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="dropdown-item">
                    Create Shortcut…
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="dropdown-item">
                    Name Window…
                  </DropdownMenu.Item>
                  <DropdownMenu.Separator className="dropdown-separator" />
                  <DropdownMenu.Item className="dropdown-item">
                    Developer Tools
                  </DropdownMenu.Item>
                </DropdownMenu.SubContent>
              </DropdownMenu.Portal>
            </DropdownMenu.Sub>
            <DropdownMenu.Separator className="dropdown-separator" />
            <DropdownMenu.CheckboxItem className="dropdown-checkbox-item" checked>
              Show Bookmarks <div className="right-slot">⌘+⇧+B</div>
            </DropdownMenu.CheckboxItem>
            <DropdownMenu.CheckboxItem className="dropdown-checkbox-item">
              Show Full URLs
            </DropdownMenu.CheckboxItem>
            <DropdownMenu.Separator className="dropdown-separator" />
            <DropdownMenu.Label className="dropdown-label">People</DropdownMenu.Label>
            <DropdownMenu.RadioGroup value="pedro">
              <DropdownMenu.RadioItem className="dropdown-radio-item" value="pedro">
                Pedro Duarte
              </DropdownMenu.RadioItem>
              <DropdownMenu.RadioItem className="dropdown-radio-item" value="colm">
                Colm Tuite
              </DropdownMenu.RadioItem>
            </DropdownMenu.RadioGroup>
            <DropdownMenu.Arrow className="dropdown-arrow" />
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
}`}
          />
        </DemoSection>
      </div>
    </div>
  );
}