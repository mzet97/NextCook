'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  // Navigation
  Home, Menu, ArrowLeft, ArrowRight, ChevronDown, ChevronUp, MoreHorizontal,
  // Actions
  Plus, Minus, X, Check, Edit, Trash2, Save, Download, Upload, Copy, Share,
  // Media
  Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Camera, Image,
  // Communication
  Mail, Phone, MessageCircle, Send, Bell, BellOff,
  // Files
  File, FileText, Folder, FolderOpen, Archive, Paperclip,
  // UI Elements
  Search, Filter, Settings, User, Users, Heart, Star, Eye, EyeOff,
  // Status
  AlertCircle, CheckCircle, XCircle, Info, HelpCircle, Loader,
  // Weather
  Sun, Moon, Cloud, CloudRain, Zap,
  // Technology
  Wifi, WifiOff, Battery, BatteryLow, Smartphone, Monitor, Headphones,
  // Shopping
  ShoppingCart, CreditCard, Package, Truck,
  // Social
  Github, Twitter, Facebook, Instagram, Linkedin,
  // Arrows
  ArrowUp, ArrowDown, TrendingUp, TrendingDown, RotateCcw, RefreshCw,
  // Misc
  Calendar, Clock, MapPin, Globe, Lock, Unlock, Key, Shield
} from 'lucide-react';
import { DemoCard } from '@/components/DemoCard';
import { DemoCardStatic } from '@/components/DemoCardStatic';
import { DemoSection } from '@/components/DemoSection';
import { CodeBlock } from '@/components/CodeBlock';

const iconCategories = [
  {
    name: 'Navigation',
    description: 'Ícones para navegação e direcionamento',
    icons: [
      { name: 'Home', component: Home },
      { name: 'Menu', component: Menu },
      { name: 'ArrowLeft', component: ArrowLeft },
      { name: 'ArrowRight', component: ArrowRight },
      { name: 'ChevronDown', component: ChevronDown },
      { name: 'ChevronUp', component: ChevronUp },
      { name: 'MoreHorizontal', component: MoreHorizontal },
    ]
  },
  {
    name: 'Actions',
    description: 'Ícones para ações e comandos',
    icons: [
      { name: 'Plus', component: Plus },
      { name: 'Minus', component: Minus },
      { name: 'X', component: X },
      { name: 'Check', component: Check },
      { name: 'Edit', component: Edit },
      { name: 'Trash2', component: Trash2 },
      { name: 'Save', component: Save },
      { name: 'Download', component: Download },
      { name: 'Upload', component: Upload },
      { name: 'Copy', component: Copy },
      { name: 'Share', component: Share },
    ]
  },
  {
    name: 'Media',
    description: 'Ícones para controles de mídia',
    icons: [
      { name: 'Play', component: Play },
      { name: 'Pause', component: Pause },
      { name: 'SkipForward', component: SkipForward },
      { name: 'SkipBack', component: SkipBack },
      { name: 'Volume2', component: Volume2 },
      { name: 'VolumeX', component: VolumeX },
      { name: 'Camera', component: Camera },
      { name: 'Image', component: Image },
    ]
  },
  {
    name: 'Communication',
    description: 'Ícones para comunicação',
    icons: [
      { name: 'Mail', component: Mail },
      { name: 'Phone', component: Phone },
      { name: 'MessageCircle', component: MessageCircle },
      { name: 'Send', component: Send },
      { name: 'Bell', component: Bell },
      { name: 'BellOff', component: BellOff },
    ]
  },
  {
    name: 'Files',
    description: 'Ícones para arquivos e documentos',
    icons: [
      { name: 'File', component: File },
      { name: 'FileText', component: FileText },
      { name: 'Folder', component: Folder },
      { name: 'FolderOpen', component: FolderOpen },
      { name: 'Archive', component: Archive },
      { name: 'Paperclip', component: Paperclip },
    ]
  },
  {
    name: 'UI Elements',
    description: 'Ícones para elementos de interface',
    icons: [
      { name: 'Search', component: Search },
      { name: 'Filter', component: Filter },
      { name: 'Settings', component: Settings },
      { name: 'User', component: User },
      { name: 'Users', component: Users },
      { name: 'Heart', component: Heart },
      { name: 'Star', component: Star },
      { name: 'Eye', component: Eye },
      { name: 'EyeOff', component: EyeOff },
    ]
  },
  {
    name: 'Status',
    description: 'Ícones para status e alertas',
    icons: [
      { name: 'AlertCircle', component: AlertCircle },
      { name: 'CheckCircle', component: CheckCircle },
      { name: 'XCircle', component: XCircle },
      { name: 'Info', component: Info },
      { name: 'HelpCircle', component: HelpCircle },
      { name: 'Loader', component: Loader },
    ]
  },
  {
    name: 'Technology',
    description: 'Ícones para tecnologia e dispositivos',
    icons: [
      { name: 'Wifi', component: Wifi },
      { name: 'WifiOff', component: WifiOff },
      { name: 'Battery', component: Battery },
      { name: 'BatteryLow', component: BatteryLow },
      { name: 'Smartphone', component: Smartphone },
      { name: 'Monitor', component: Monitor },
      { name: 'Headphones', component: Headphones },
    ]
  }
];

const popularIcons = [
  { name: 'Home', component: Home, usage: '95%' },
  { name: 'User', component: User, usage: '92%' },
  { name: 'Search', component: Search, usage: '89%' },
  { name: 'Settings', component: Settings, usage: '87%' },
  { name: 'Bell', component: Bell, usage: '85%' },
  { name: 'Heart', component: Heart, usage: '83%' },
  { name: 'Star', component: Star, usage: '81%' },
  { name: 'Mail', component: Mail, usage: '79%' },
  { name: 'Plus', component: Plus, usage: '77%' },
  { name: 'X', component: X, usage: '75%' },
];

// Demo Components
function IconShowcase() {
  const [selectedCategory, setSelectedCategory] = useState(iconCategories[0]);
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  
  return (
    <div className="space-y-6">
      {/* Category Selector */}
      <div className="flex flex-wrap gap-2">
        {iconCategories.map((category) => (
          <button
            key={category.name}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              selectedCategory.name === category.name
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      {/* Selected Category Info */}
      <div className="text-center">
        <h3 className="text-lg font-semibold">{selectedCategory.name}</h3>
        <p className="text-gray-600 text-sm">{selectedCategory.description}</p>
      </div>
      
      {/* Icons Grid */}
      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
        {selectedCategory.icons.map((icon) => {
          const IconComponent = icon.component;
          return (
            <motion.div
              key={icon.name}
              className="flex flex-col items-center p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => setHoveredIcon(icon.name)}
              onHoverEnd={() => setHoveredIcon(null)}
            >
              <IconComponent 
                className={`h-6 w-6 transition-colors ${
                  hoveredIcon === icon.name ? 'text-blue-500' : 'text-gray-700'
                }`} 
              />
              <span className="text-xs mt-1 text-center">{icon.name}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function PopularIcons() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-center">Ícones Mais Populares</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {popularIcons.map((icon, index) => {
          const IconComponent = icon.component;
          return (
            <motion.div
              key={icon.name}
              className="flex flex-col items-center p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <IconComponent className="h-8 w-8 text-blue-500 mb-2" />
              <span className="text-sm font-medium">{icon.name}</span>
              <span className="text-xs text-gray-500">{icon.usage}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function IconSizes() {
  const sizes = [
    { name: 'xs', class: 'h-3 w-3', pixels: '12px' },
    { name: 'sm', class: 'h-4 w-4', pixels: '16px' },
    { name: 'md', class: 'h-5 w-5', pixels: '20px' },
    { name: 'lg', class: 'h-6 w-6', pixels: '24px' },
    { name: 'xl', class: 'h-8 w-8', pixels: '32px' },
    { name: '2xl', class: 'h-10 w-10', pixels: '40px' },
    { name: '3xl', class: 'h-12 w-12', pixels: '48px' },
  ];
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 md:grid-cols-7 gap-4">
        {sizes.map((size) => (
          <div key={size.name} className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
            <Star className={`${size.class} text-yellow-500 mb-2`} />
            <span className="text-xs font-medium">{size.name}</span>
            <span className="text-xs text-gray-500">{size.pixels}</span>
          </div>
        ))}
      </div>
      
      <div className="text-center text-sm text-gray-600">
        <p>Todos os ícones são SVG e podem ser redimensionados sem perda de qualidade</p>
      </div>
    </div>
  );
}

function IconColors() {
  const colors = [
    { name: 'Gray', class: 'text-gray-500' },
    { name: 'Red', class: 'text-red-500' },
    { name: 'Orange', class: 'text-orange-500' },
    { name: 'Yellow', class: 'text-yellow-500' },
    { name: 'Green', class: 'text-green-500' },
    { name: 'Blue', class: 'text-blue-500' },
    { name: 'Indigo', class: 'text-indigo-500' },
    { name: 'Purple', class: 'text-purple-500' },
    { name: 'Pink', class: 'text-pink-500' },
  ];
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 md:grid-cols-9 gap-4">
        {colors.map((color) => (
          <div key={color.name} className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
            <Heart className={`h-8 w-8 ${color.class} mb-2`} />
            <span className="text-xs font-medium">{color.name}</span>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex items-center space-x-2 p-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg">
          <Heart className="h-5 w-5" />
          <span className="text-sm">Gradient</span>
        </div>
        <div className="flex items-center space-x-2 p-3 bg-gray-900 text-white rounded-lg">
          <Star className="h-5 w-5" />
          <span className="text-sm">Dark</span>
        </div>
        <div className="flex items-center space-x-2 p-3 border-2 border-blue-500 text-blue-500 rounded-lg">
          <CheckCircle className="h-5 w-5" />
          <span className="text-sm">Outline</span>
        </div>
        <div className="flex items-center space-x-2 p-3 bg-blue-500 text-white rounded-lg shadow-lg">
          <Zap className="h-5 w-5" />
          <span className="text-sm">Shadow</span>
        </div>
      </div>
    </div>
  );
}

function IconStates() {
  const [liked, setLiked] = useState(false);
  const [starred, setStarred] = useState(false);
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  
  const handleLoad = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button
          onClick={() => setLiked(!liked)}
          className={`flex items-center justify-center p-4 rounded-lg transition-all ${
            liked 
              ? 'bg-red-100 text-red-500 border-2 border-red-200' 
              : 'bg-gray-100 text-gray-500 border-2 border-gray-200 hover:bg-gray-200'
          }`}
        >
          <motion.div
            animate={liked ? { scale: [1, 1.2, 1] } : { scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Heart className={`h-6 w-6 ${liked ? 'fill-current' : ''}`} />
          </motion.div>
        </button>
        
        <button
          onClick={() => setStarred(!starred)}
          className={`flex items-center justify-center p-4 rounded-lg transition-all ${
            starred 
              ? 'bg-yellow-100 text-yellow-500 border-2 border-yellow-200' 
              : 'bg-gray-100 text-gray-500 border-2 border-gray-200 hover:bg-gray-200'
          }`}
        >
          <motion.div
            animate={starred ? { rotate: [0, 360] } : { rotate: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Star className={`h-6 w-6 ${starred ? 'fill-current' : ''}`} />
          </motion.div>
        </button>
        
        <button
          onClick={() => setVisible(!visible)}
          className="flex items-center justify-center p-4 rounded-lg bg-gray-100 text-gray-500 border-2 border-gray-200 hover:bg-gray-200 transition-all"
        >
          {visible ? <Eye className="h-6 w-6" /> : <EyeOff className="h-6 w-6" />}
        </button>
        
        <button
          onClick={handleLoad}
          disabled={loading}
          className="flex items-center justify-center p-4 rounded-lg bg-blue-100 text-blue-500 border-2 border-blue-200 hover:bg-blue-200 transition-all disabled:opacity-50"
        >
          <motion.div
            animate={loading ? { rotate: 360 } : { rotate: 0 }}
            transition={loading ? { duration: 1, repeat: Infinity, ease: "linear" } : {}}
          >
            {loading ? <Loader className="h-6 w-6" /> : <RefreshCw className="h-6 w-6" />}
          </motion.div>
        </button>
      </div>
      
      <div className="text-center text-sm text-gray-600">
        <p>Clique nos ícones acima para ver diferentes estados interativos</p>
      </div>
    </div>
  );
}

function IconInContext() {
  return (
    <div className="space-y-6">
      {/* Navigation Bar */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Home className="h-5 w-5 text-blue-500" />
            <span className="font-medium">Dashboard</span>
          </div>
          <div className="flex items-center space-x-3">
            <Bell className="h-5 w-5 text-gray-500 hover:text-gray-700 cursor-pointer" />
            <Settings className="h-5 w-5 text-gray-500 hover:text-gray-700 cursor-pointer" />
            <User className="h-5 w-5 text-gray-500 hover:text-gray-700 cursor-pointer" />
          </div>
        </div>
      </div>
      
      {/* Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          <Plus className="h-4 w-4" />
          <span>Add</span>
        </button>
        
        <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
          <Download className="h-4 w-4" />
          <span>Download</span>
        </button>
        
        <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
          <Trash2 className="h-4 w-4" />
          <span>Delete</span>
        </button>
        
        <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
          <Share className="h-4 w-4" />
          <span>Share</span>
        </button>
      </div>
      
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <h3 className="font-medium">Team Members</h3>
              <p className="text-sm text-gray-500">24 active</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <h3 className="font-medium">Revenue</h3>
              <p className="text-sm text-gray-500">+12% this month</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Package className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <h3 className="font-medium">Orders</h3>
              <p className="text-sm text-gray-500">156 pending</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LucideIconsPage() {
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
            Lucide Icons - Beautiful SVG Icons
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Biblioteca de ícones SVG bonitos, consistentes e customizáveis. 
            Mais de 1000 ícones otimizados para interfaces modernas.
          </p>
        </motion.div>

        <DemoSection title="Características Principais">
          <div className="grid md:grid-cols-4 gap-1.5 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <Package className="h-8 w-8 text-blue-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-blue-900 mb-2">1000+ Ícones</h3>
              <p className="text-blue-800 text-sm">
                Biblioteca abrangente com ícones para todas as necessidades.
              </p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg text-center">
              <Zap className="h-8 w-8 text-green-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-green-900 mb-2">Tree-shakable</h3>
              <p className="text-green-800 text-sm">
                Apenas os ícones que você usa são incluídos no bundle.
              </p>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-lg text-center">
              <Settings className="h-8 w-8 text-purple-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-purple-900 mb-2">Customizável</h3>
              <p className="text-purple-800 text-sm">
                Tamanho, cor e estilo totalmente personalizáveis via CSS.
              </p>
            </div>
            
            <div className="bg-orange-50 p-6 rounded-lg text-center">
              <CheckCircle className="h-8 w-8 text-orange-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-orange-900 mb-2">Consistente</h3>
              <p className="text-orange-800 text-sm">
                Design consistente com stroke width e estilo unificados.
              </p>
            </div>
          </div>
        </DemoSection>

        <DemoSection title="Explorar Ícones">
          <DemoCardStatic title="Categorias de Ícones" description="Navegue pelos ícones por categoria">
            <IconShowcase />
          </DemoCardStatic>
        </DemoSection>

        <DemoSection title="Ícones Populares">
          <DemoCardStatic title="Mais Utilizados" description="Os ícones mais comuns em interfaces">
            <PopularIcons />
          </DemoCardStatic>
        </DemoSection>

        <DemoSection title="Customização">
          <div className="grid md:grid-cols-2 gap-1.5">
            <DemoCardStatic title="Tamanhos" description="Diferentes tamanhos disponíveis">
              <IconSizes />
            </DemoCardStatic>
            
            <DemoCardStatic title="Cores" description="Personalize cores com CSS">
              <IconColors />
            </DemoCardStatic>
          </div>
        </DemoSection>

        <DemoSection title="Estados Interativos">
          <DemoCardStatic title="Ícones com Estado" description="Animações e interações">
            <IconStates />
          </DemoCardStatic>
        </DemoSection>

        <DemoSection title="Ícones em Contexto">
          <DemoCardStatic title="Exemplos Práticos" description="Como usar ícones em interfaces reais">
            <IconInContext />
          </DemoCardStatic>
        </DemoSection>

        <DemoSection title="Instalação e Uso">
          <div className="grid md:grid-cols-2 gap-1.5">
            <DemoCardStatic title="Instalação" description="Adicione Lucide Icons ao seu projeto">
              <CodeBlock
                language="bash"
                code={`# Instalar Lucide React
npm install lucide-react

# Ou com yarn
yarn add lucide-react

# Ou com pnpm
pnpm add lucide-react`}
              />
            </DemoCardStatic>

            <DemoCardStatic title="Uso Básico" description="Importe e use os ícones">
              <CodeBlock
                language="typescript"
                code={`import { Home, User, Settings, Heart } from 'lucide-react';

function App() {
  return (
    <div>
      <Home className="h-6 w-6" />
      <User className="h-5 w-5 text-blue-500" />
      <Settings size={24} color="#666" />
      <Heart className="h-4 w-4 text-red-500 fill-current" />
    </div>
  );
}`}
              />
            </DemoCardStatic>
          </div>
        </DemoSection>

        <DemoSection title="Customização Avançada">
          <div className="grid md:grid-cols-2 gap-1.5">
            <DemoCardStatic title="Props Disponíveis" description="Todas as opções de customização">
              <CodeBlock
                language="typescript"
                code={`// Props básicas
<Icon 
  size={24}           // Tamanho (number | string)
  color="#333"        // Cor (string)
  strokeWidth={2}     // Espessura do stroke
  className="icon"    // Classes CSS
/>

// Props HTML padrão
<Icon 
  onClick={handleClick}
  onMouseEnter={handleHover}
  style={{ transform: 'rotate(45deg)' }}
  aria-label="Home icon"
/>`}
              />
            </DemoCardStatic>

            <DemoCardStatic title="Styling com CSS" description="Personalize com classes CSS">
              <CodeBlock
                language="css"
                code={`/* Tamanhos customizados */
.icon-xs { width: 12px; height: 12px; }
.icon-sm { width: 16px; height: 16px; }
.icon-lg { width: 32px; height: 32px; }

/* Cores e estados */
.icon-primary { color: #3b82f6; }
.icon-success { color: #10b981; }
.icon-danger { color: #ef4444; }

/* Animações */
.icon-spin {
  animation: spin 1s linear infinite;
}

.icon-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Hover effects */
.icon-hover:hover {
  transform: scale(1.1);
  transition: transform 0.2s;
}`}
              />
            </DemoCardStatic>
          </div>
        </DemoSection>

        <DemoSection title="Melhores Práticas">
          <div className="grid md:grid-cols-2 gap-1.5">
            <DemoCardStatic title="Acessibilidade" description="Torne seus ícones acessíveis">
              <CodeBlock
                language="typescript"
                code={`// Ícones decorativos
<Heart className="h-4 w-4" aria-hidden="true" />

// Ícones funcionais
<Search 
  className="h-5 w-5" 
  aria-label="Buscar"
  role="img"
/>

// Ícones em botões
<button aria-label="Curtir post">
  <Heart className="h-4 w-4" aria-hidden="true" />
</button>

// Com texto alternativo
<span className="sr-only">Configurações</span>
<Settings className="h-5 w-5" aria-hidden="true" />`}
              />
            </DemoCardStatic>

            <DemoCardStatic title="Performance" description="Otimize o uso dos ícones">
              <CodeBlock
                language="typescript"
                code={`// ✅ Importe apenas os ícones necessários
import { Home, User } from 'lucide-react';

// ❌ Evite importar tudo
import * as Icons from 'lucide-react';

// ✅ Use tree-shaking
const iconComponents = {
  home: Home,
  user: User,
};

// ✅ Lazy loading para muitos ícones
const LazyIcon = lazy(() => import('./IconComponent'));

// ✅ Memoize ícones estáticos
const MemoizedIcon = memo(() => <Home className="h-5 w-5" />);`}
              />
            </DemoCardStatic>
          </div>
        </DemoSection>

        <DemoSection title="Vantagens do Lucide Icons">
          <div className="grid md:grid-cols-3 gap-1.5">
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-green-900 mb-2">🎯 Qualidade</h3>
              <p className="text-green-800">
                Ícones desenhados à mão com atenção aos detalhes e consistência visual.
              </p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">⚡ Performance</h3>
              <p className="text-blue-800">
                SVG otimizados, tree-shakeable e com bundle size mínimo.
              </p>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">🔧 Flexibilidade</h3>
              <p className="text-purple-800">
                Totalmente customizável via props e CSS. Funciona com qualquer framework.
              </p>
            </div>
          </div>
        </DemoSection>

        <DemoSection title="Exemplo Completo">
          <CodeBlock
            language="typescript"
            code={`import React, { useState } from 'react';
import { 
  Home, 
  User, 
  Settings, 
  Bell, 
  Search, 
  Plus, 
  Heart,
  Star,
  Menu,
  X
} from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [starred, setStarred] = useState(false);
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md hover:bg-gray-100"
              >
                {isMenuOpen ? 
                  <X className="h-5 w-5" /> : 
                  <Menu className="h-5 w-5" />
                }
              </button>
              <Home className="h-6 w-6 text-blue-500" />
              <h1 className="text-xl font-semibold">Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <button className="p-2 rounded-md hover:bg-gray-100 relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              
              <button className="p-2 rounded-md hover:bg-gray-100">
                <Settings className="h-5 w-5" />
              </button>
              
              <button className="p-2 rounded-md hover:bg-gray-100">
                <User className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1.5">
          {/* Card Example */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Post Title</h3>
              <button className="p-1 rounded hover:bg-gray-100">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            
            <p className="text-gray-600 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setLiked(!liked)}
                  className={liked ? 'p-2 rounded-full transition-colors text-red-500 bg-red-50' : 'p-2 rounded-full transition-colors text-gray-400 hover:text-red-500 hover:bg-red-50'}
                >
                  <Heart className={liked ? 'h-4 w-4 fill-current' : 'h-4 w-4'} />
                </button>
                
                <button 
                  onClick={() => setStarred(!starred)}
                  className={starred ? 'p-2 rounded-full transition-colors text-yellow-500 bg-yellow-50' : 'p-2 rounded-full transition-colors text-gray-400 hover:text-yellow-500'}
                >
                  <Star className={starred ? 'h-4 w-4 fill-current' : 'h-4 w-4'} />
                </button>
              </div>
              
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}`}
          />
        </DemoSection>
      </div>
    </div>
  );
}