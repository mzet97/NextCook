'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useAnimation, useScroll, useTransform } from 'framer-motion';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Zap, 
  Heart, 
  Star,
  ArrowRight,
  MousePointer,
  Sparkles,
  Layers
} from 'lucide-react';
import { DemoCardStatic } from '@/components/DemoCardStatic';
import { DemoSection } from '@/components/DemoSection';
import { CodeBlock } from '@/components/CodeBlock';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      yoyo: Infinity
    }
  },
  tap: {
    scale: 0.95
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    rotateY: -90,
    transformPerspective: 1000
  },
  visible: { 
    opacity: 1, 
    rotateY: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  },
  hover: {
    rotateY: 5,
    scale: 1.02,
    transition: {
      duration: 0.3
    }
  }
};

// Demo Components
function BasicAnimations() {
  const [isVisible, setIsVisible] = useState(true);
  
  return (
    <div className="space-y-6">
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Toggle Visibility
        </button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold"
            >
              Scale
            </motion.div>
          )}
        </AnimatePresence>
        
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold"
            >
              Slide
            </motion.div>
          )}
        </AnimatePresence>
        
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ opacity: 0, rotateZ: -180 }}
              animate={{ opacity: 1, rotateZ: 0 }}
              exit={{ opacity: 0, rotateZ: 180 }}
              className="w-16 h-16 bg-purple-500 rounded-lg flex items-center justify-center text-white font-bold"
            >
              Rotate
            </motion.div>
          )}
        </AnimatePresence>
        
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-16 h-16 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold"
            >
              Spring
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function InteractiveAnimations() {
  const [liked, setLiked] = useState(false);
  const [starred, setStarred] = useState(false);
  
  return (
    <div className="space-y-6">
      <div className="flex gap-4 justify-center">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setLiked(!liked)}
          className={`p-3 rounded-full transition-colors ${
            liked ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-500'
          }`}
        >
          <motion.div
            animate={liked ? { scale: [1, 1.3, 1] } : { scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Heart className={`h-6 w-6 ${liked ? 'fill-current' : ''}`} />
          </motion.div>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setStarred(!starred)}
          className={`p-3 rounded-full transition-colors ${
            starred ? 'bg-yellow-100 text-yellow-500' : 'bg-gray-100 text-gray-500'
          }`}
        >
          <motion.div
            animate={starred ? { rotate: [0, 360] } : { rotate: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Star className={`h-6 w-6 ${starred ? 'fill-current' : ''}`} />
          </motion.div>
        </motion.button>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <motion.div
          whileHover="hover"
          variants={buttonVariants}
          className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg cursor-pointer text-center font-semibold"
        >
          Hover me!
        </motion.div>
        
        <motion.div
          whileHover={{ 
            background: "linear-gradient(45deg, #ff6b6b, #feca57)",
            boxShadow: "0 10px 20px rgba(0,0,0,0.2)"
          }}
          whileTap={{ scale: 0.98 }}
          className="p-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg cursor-pointer text-center font-semibold"
        >
          Click me!
        </motion.div>
      </div>
    </div>
  );
}

function StaggeredAnimations() {
  const [isVisible, setIsVisible] = useState(true);
  
  const items = [
    { id: 1, color: 'bg-red-500', text: 'Item 1' },
    { id: 2, color: 'bg-blue-500', text: 'Item 2' },
    { id: 3, color: 'bg-green-500', text: 'Item 3' },
    { id: 4, color: 'bg-yellow-500', text: 'Item 4' },
    { id: 5, color: 'bg-purple-500', text: 'Item 5' },
    { id: 6, color: 'bg-pink-500', text: 'Item 6' },
  ];
  
  return (
    <div className="space-y-6">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors"
      >
        Toggle Stagger
      </button>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="grid grid-cols-2 md:grid-cols-3 gap-4"
      >
        {items.map((item) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            className={`${item.color} text-white p-4 rounded-lg text-center font-semibold`}
          >
            {item.text}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

function LayoutAnimations() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  const items = [
    { id: '1', title: 'Card 1', subtitle: 'Subtitle 1', color: 'bg-blue-500' },
    { id: '2', title: 'Card 2', subtitle: 'Subtitle 2', color: 'bg-green-500' },
    { id: '3', title: 'Card 3', subtitle: 'Subtitle 3', color: 'bg-purple-500' },
    { id: '4', title: 'Card 4', subtitle: 'Subtitle 4', color: 'bg-red-500' },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Toggle Layout
        </button>
      </div>
      
      <motion.div 
        layout
        className={`grid gap-4 transition-all duration-300 ${
          isExpanded ? 'grid-cols-1' : 'grid-cols-2 md:grid-cols-4'
        }`}
      >
        {items.map((item) => (
          <motion.div
            key={item.id}
            layout
            layoutId={item.id}
            onClick={() => setSelectedId(selectedId === item.id ? null : item.id)}
            className={`${item.color} text-white p-4 rounded-lg cursor-pointer`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.h3 layout className="font-semibold">
              {item.title}
            </motion.h3>
            <motion.p layout className="text-sm opacity-80">
              {item.subtitle}
            </motion.p>
            {selectedId === item.id && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-2 text-sm"
              >
                This is additional content that appears when the card is selected.
                Layout animations make this transition smooth and natural.
              </motion.div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

function ScrollAnimations() {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1.2]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);
  
  return (
    <div className="space-y-8">
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-4">
          Scroll this page to see the animations below react to scroll position
        </p>
        
        <div className="flex justify-center space-x-8">
          <motion.div
            style={{ scale, opacity }}
            className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold"
          >
            Scale
          </motion.div>
          
          <motion.div
            style={{ rotate }}
            className="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold"
          >
            Rotate
          </motion.div>
          
          <motion.div
            style={{ opacity }}
            className="w-16 h-16 bg-purple-500 rounded-lg flex items-center justify-center text-white font-bold"
          >
            Fade
          </motion.div>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <motion.div
          className="bg-blue-500 h-2 rounded-full"
          style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
        />
      </div>
    </div>
  );
}

function GestureAnimations() {
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0, top: 0, bottom: 0 });
  
  React.useEffect(() => {
    setDragConstraints({ left: -100, right: 100, top: -50, bottom: 50 });
  }, []);
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <p className="text-sm text-gray-600">
          Drag the elements below to interact with them
        </p>
      </div>
      
      <div className="flex justify-center space-x-8">
        <motion.div
          drag
          dragConstraints={dragConstraints}
          dragElastic={0.2}
          whileDrag={{ scale: 1.1, rotate: 5 }}
          className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold cursor-grab active:cursor-grabbing"
        >
          Drag
        </motion.div>
        
        <motion.div
          drag="x"
          dragConstraints={{ left: -100, right: 100 }}
          whileDrag={{ scale: 1.1 }}
          className="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold cursor-grab active:cursor-grabbing"
        >
          X
        </motion.div>
        
        <motion.div
          drag="y"
          dragConstraints={{ top: -50, bottom: 50 }}
          whileDrag={{ scale: 1.1 }}
          className="w-16 h-16 bg-purple-500 rounded-lg flex items-center justify-center text-white font-bold cursor-grab active:cursor-grabbing"
        >
          Y
        </motion.div>
      </div>
    </div>
  );
}

function PathAnimations() {
  const [isAnimating, setIsAnimating] = useState(false);
  
  const pathVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 2,
        ease: "easeInOut"
      }
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="text-center">
        <button
          onClick={() => setIsAnimating(!isAnimating)}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
        >
          Animate Path
        </button>
      </div>
      
      <div className="flex justify-center">
        <svg width="200" height="200" viewBox="0 0 200 200">
          <motion.path
            d="M50 100 Q 100 50 150 100 T 150 150"
            stroke="#8b5cf6"
            strokeWidth="3"
            fill="none"
            variants={pathVariants}
            initial="hidden"
            animate={isAnimating ? "visible" : "hidden"}
          />
          
          <motion.circle
            cx="100"
            cy="100"
            r="30"
            stroke="#3b82f6"
            strokeWidth="3"
            fill="none"
            variants={pathVariants}
            initial="hidden"
            animate={isAnimating ? "visible" : "hidden"}
          />
          
          <motion.rect
            x="75"
            y="75"
            width="50"
            height="50"
            stroke="#10b981"
            strokeWidth="3"
            fill="none"
            variants={pathVariants}
            initial="hidden"
            animate={isAnimating ? "visible" : "hidden"}
          />
        </svg>
      </div>
    </div>
  );
}

export default function FramerMotionPage() {
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
            Framer Motion - Animation Library
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Biblioteca de animações declarativas para React. Crie animações fluidas e interativas 
            com uma API simples e poderosa.
          </p>
        </motion.div>

        <DemoSection title="Características Principais">
          <motion.div 
            className="grid md:grid-cols-3 gap-1.5 mb-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-2 flex items-center">
                <Zap className="h-5 w-5 mr-2" />
                Declarativo
              </h3>
              <p className="text-blue-800">
                Defina animações com props simples. Framer Motion cuida da implementação.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-green-900 mb-2 flex items-center">
                <MousePointer className="h-5 w-5 mr-2" />
                Gestos
              </h3>
              <p className="text-green-800">
                Suporte nativo para drag, hover, tap e outros gestos interativos.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-900 mb-2 flex items-center">
                <Layers className="h-5 w-5 mr-2" />
                Layout
              </h3>
              <p className="text-purple-800">
                Animações automáticas quando o layout muda. Sem cálculos manuais.
              </p>
            </motion.div>
          </motion.div>
        </DemoSection>

        <DemoSection title="Animações em Ação">
          <div className="space-y-8">
            <DemoCardStatic title="Animações Básicas" description="Entrada, saída e transições">
              <BasicAnimations />
            </DemoCardStatic>
            
            <DemoCardStatic title="Animações Interativas" description="Hover, tap e estados">
              <InteractiveAnimations />
            </DemoCardStatic>
            
            <DemoCardStatic title="Animações Escalonadas" description="Stagger children para efeitos sequenciais">
              <StaggeredAnimations />
            </DemoCardStatic>
            
            <DemoCardStatic title="Layout Animations" description="Animações automáticas de layout">
              <LayoutAnimations />
            </DemoCardStatic>
            
            <DemoCardStatic title="Scroll Animations" description="Animações baseadas em scroll">
              <ScrollAnimations />
            </DemoCardStatic>
            
            <DemoCardStatic title="Gesture Animations" description="Drag e gestos interativos">
              <GestureAnimations />
            </DemoCardStatic>
            
            <DemoCardStatic title="Path Animations" description="Animações de SVG e paths">
              <PathAnimations />
            </DemoCardStatic>
          </div>
        </DemoSection>

        <DemoSection title="Instalação e Setup">
          <div className="grid md:grid-cols-2 gap-1.5">
            <DemoCardStatic title="Instalação" description="Adicione Framer Motion ao seu projeto">
              <CodeBlock
                language="bash"
                code={`# Instalar Framer Motion
npm install framer-motion

# Ou com yarn
yarn add framer-motion

# Ou com pnpm
pnpm add framer-motion`}
              />
            </DemoCardStatic>

            <DemoCardStatic title="Uso Básico" description="Primeiros passos">
              <CodeBlock
                language="typescript"
                code={`import { motion } from 'framer-motion';

function App() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      Hello Framer Motion!
    </motion.div>
  );
}`}
              />
            </DemoCardStatic>
          </div>
        </DemoSection>

        <DemoSection title="Conceitos Fundamentais">
          <div className="grid md:grid-cols-2 gap-1.5">
            <DemoCardStatic title="Motion Components" description="Componentes animáveis">
              <CodeBlock
                language="typescript"
                code={`// Qualquer elemento HTML pode ser animado
<motion.div />
<motion.button />
<motion.img />
<motion.svg />

// Ou componentes customizados
const MotionComponent = motion(CustomComponent);

// Com forwardRef
const MotionCustom = motion(forwardRef(CustomComponent));`}
              />
            </DemoCardStatic>

            <DemoCardStatic title="Variants" description="Reutilizar animações">
              <CodeBlock
                language="typescript"
                code={`const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1
    }
  }
};

<motion.div
  variants={variants}
  initial="hidden"
  animate="visible"
>
  <motion.div variants={variants}>Child 1</motion.div>
  <motion.div variants={variants}>Child 2</motion.div>
</motion.div>`}
              />
            </DemoCardStatic>
          </div>
        </DemoSection>

        <DemoSection title="Recursos Avançados">
          <div className="grid md:grid-cols-3 gap-1.5 mb-8">
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-yellow-900 mb-2">🎯 useAnimation</h3>
              <p className="text-yellow-800 text-sm mb-3">
                Controle imperativo de animações.
              </p>
              <CodeBlock
                language="typescript"
                code={`const controls = useAnimation();

controls.start({
  x: 100,
  transition: { duration: 2 }
});`}
              />
            </div>
            
            <div className="bg-red-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-red-900 mb-2">📏 useScroll</h3>
              <p className="text-red-800 text-sm mb-3">
                Animações baseadas em scroll.
              </p>
              <CodeBlock
                language="typescript"
                code={`const { scrollYProgress } = useScroll();
const scale = useTransform(
  scrollYProgress, 
  [0, 1], 
  [0.8, 1.2]
);`}
              />
            </div>
            
            <div className="bg-indigo-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-indigo-900 mb-2">🔄 AnimatePresence</h3>
              <p className="text-indigo-800 text-sm mb-3">
                Animações de entrada e saída.
              </p>
              <CodeBlock
                language="typescript"
                code={`<AnimatePresence>
  {isVisible && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />
  )}
</AnimatePresence>`}
              />
            </div>
          </div>
        </DemoSection>

        <DemoSection title="Vantagens do Framer Motion">
          <div className="grid md:grid-cols-3 gap-1.5">
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-green-900 mb-2">⚡ Performance</h3>
              <p className="text-green-800">
                Animações otimizadas que rodam na GPU. 60fps garantidos.
              </p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">🎨 Flexibilidade</h3>
              <p className="text-blue-800">
                Desde animações simples até interações complexas com gestos.
              </p>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">🔧 Developer Experience</h3>
              <p className="text-purple-800">
                API intuitiva, TypeScript nativo e documentação excelente.
              </p>
            </div>
          </div>
        </DemoSection>

        <DemoSection title="Exemplo Completo">
          <CodeBlock
            language="typescript"
            code={`import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useState } from 'react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

function AnimatedCard({ title, content, isVisible }) {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          layout
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
          }}
          whileTap={{ scale: 0.95 }}
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={0.1}
          style={{ scale }}
          className="bg-white p-6 rounded-lg shadow-lg cursor-pointer"
        >
          <motion.h3 
            layout
            className="text-xl font-bold mb-2"
          >
            {title}
          </motion.h3>
          <motion.p 
            layout
            className="text-gray-600"
          >
            {content}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function App() {
  const [cards, setCards] = useState([
    { id: 1, title: "Card 1", content: "Content 1", visible: true },
    { id: 2, title: "Card 2", content: "Content 2", visible: true },
    { id: 3, title: "Card 3", content: "Content 3", visible: true },
  ]);
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid gap-4"
    >
      {cards.map(card => (
        <AnimatedCard
          key={card.id}
          title={card.title}
          content={card.content}
          isVisible={card.visible}
        />
      ))}
    </motion.div>
  );
}`}
          />
        </DemoSection>
      </div>
    </div>
  );
}