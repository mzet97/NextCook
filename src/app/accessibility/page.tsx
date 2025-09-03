'use client';

import { useState, useRef, useEffect, useId } from 'react';
import { 
  Eye, EyeOff, Volume2, VolumeX, Play, Pause, RotateCcw, 
  ChevronDown, ChevronUp, Info, AlertTriangle, CheckCircle, 
  X, Menu, Search, Settings, User, Home, Star, Heart,
  Keyboard, Mouse, Smartphone, Monitor, Sun, Moon
} from 'lucide-react';

// Accessibility Context
interface AccessibilitySettings {
  highContrast: boolean;
  reducedMotion: boolean;
  fontSize: 'small' | 'medium' | 'large' | 'extra-large';
  screenReader: boolean;
  keyboardNavigation: boolean;
}

const defaultSettings: AccessibilitySettings = {
  highContrast: false,
  reducedMotion: false,
  fontSize: 'medium',
  screenReader: false,
  keyboardNavigation: true
};

// Custom Hook for Accessibility
const useAccessibility = () => {
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings);
  
  const updateSetting = (key: keyof AccessibilitySettings, value: boolean | number | string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };
  
  return { settings, updateSetting };
};

// Focus Trap Component
interface FocusTrapProps {
  children: React.ReactNode;
  isActive: boolean;
}

const FocusTrap: React.FC<FocusTrapProps> = ({ children, isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!isActive || !containerRef.current) return;
    
    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement?.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement?.focus();
          e.preventDefault();
        }
      }
    };
    
    container.addEventListener('keydown', handleTabKey);
    firstElement?.focus();
    
    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  }, [isActive]);
  
  return (
    <div ref={containerRef} className={isActive ? 'focus-trap-active' : ''}>
      {children}
    </div>
  );
};

// Skip Link Component
const SkipLink: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-lg z-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      Pular para o conteúdo principal
    </a>
  );
};

// Accessible Modal Component
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const AccessibleModal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const modalId = useId();
  const titleId = useId();
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.setAttribute('aria-hidden', 'true');
    } else {
      document.body.style.overflow = '';
      document.body.removeAttribute('aria-hidden');
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.removeAttribute('aria-hidden');
    };
  }, [isOpen]);
  
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      id={modalId}
    >
      <FocusTrap isActive={isOpen}>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h2 id={titleId} className="text-xl font-semibold text-gray-900 dark:text-white">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Fechar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div>{children}</div>
        </div>
      </FocusTrap>
    </div>
  );
};

// Accessible Form Component
const AccessibleForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    newsletter: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  
  const nameId = useId();
  const emailId = useId();
  const messageId = useId();
  const newsletterId = useId();
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Mensagem é obrigatória';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      alert('Formulário enviado com sucesso!');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div>
        <label htmlFor={nameId} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Nome *
        </label>
        <input
          id={nameId}
          type="text"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.name ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-gray-300 dark:border-gray-600'
          } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? `${nameId}-error` : undefined}
          required
        />
        {errors.name && (
          <div id={`${nameId}-error`} role="alert" className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <AlertTriangle className="w-4 h-4" />
            {errors.name}
          </div>
        )}
      </div>
      
      <div>
        <label htmlFor={emailId} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Email *
        </label>
        <input
          id={emailId}
          type="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.email ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-gray-300 dark:border-gray-600'
          } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? `${emailId}-error` : undefined}
          required
        />
        {errors.email && (
          <div id={`${emailId}-error`} role="alert" className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <AlertTriangle className="w-4 h-4" />
            {errors.email}
          </div>
        )}
      </div>
      
      <div>
        <label htmlFor={messageId} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Mensagem *
        </label>
        <textarea
          id={messageId}
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.message ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-gray-300 dark:border-gray-600'
          } bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-vertical`}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? `${messageId}-error` : undefined}
          required
        />
        {errors.message && (
          <div id={`${messageId}-error`} role="alert" className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <AlertTriangle className="w-4 h-4" />
            {errors.message}
          </div>
        )}
      </div>
      
      <div>
        <label htmlFor={newsletterId} className="flex items-center gap-3 cursor-pointer">
          <input
            id={newsletterId}
            type="checkbox"
            checked={formData.newsletter}
            onChange={(e) => setFormData(prev => ({ ...prev, newsletter: e.target.checked }))}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
          />
          <span className="text-gray-700 dark:text-gray-300">
            Quero receber newsletters
          </span>
        </label>
      </div>
      
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Enviar Mensagem
      </button>
    </form>
  );
};

// Accessible Navigation
const AccessibleNavigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('home');
  
  const menuItems = [
    { id: 'home', label: 'Início', icon: Home },
    { id: 'about', label: 'Sobre', icon: User },
    { id: 'services', label: 'Serviços', icon: Settings },
    { id: 'contact', label: 'Contato', icon: Search }
  ];
  
  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700" role="navigation" aria-label="Navegação principal">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Acessibilidade Demo
            </h1>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <ul className="flex space-x-4" role="menubar">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id} role="none">
                    <button
                      role="menuitem"
                      onClick={() => setActiveItem(item.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        activeItem === item.id
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                      aria-current={activeItem === item.id ? 'page' : undefined}
                    >
                      <Icon className="w-4 h-4" aria-hidden="true" />
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Abrir menu de navegação"
            >
              <Menu className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div id="mobile-menu" className="md:hidden pb-4">
            <ul className="space-y-2" role="menu">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id} role="none">
                    <button
                      role="menuitem"
                      onClick={() => {
                        setActiveItem(item.id);
                        setIsMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        activeItem === item.id
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                      aria-current={activeItem === item.id ? 'page' : undefined}
                    >
                      <Icon className="w-4 h-4" aria-hidden="true" />
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

// Accessible Accordion
const AccessibleAccordion: React.FC = () => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  
  const accordionItems = [
    {
      id: 'item1',
      title: 'O que é acessibilidade web?',
      content: 'Acessibilidade web refere-se à prática de tornar websites utilizáveis por pessoas com deficiências. Isso inclui deficiências visuais, auditivas, motoras e cognitivas.'
    },
    {
      id: 'item2',
      title: 'Por que a acessibilidade é importante?',
      content: 'A acessibilidade é importante porque garante que todos os usuários, independentemente de suas habilidades, possam acessar e usar seu website. Além disso, melhora a experiência para todos os usuários.'
    },
    {
      id: 'item3',
      title: 'Quais são as diretrizes WCAG?',
      content: 'As Web Content Accessibility Guidelines (WCAG) são um conjunto de diretrizes desenvolvidas pelo W3C para tornar o conteúdo web mais acessível. A versão atual é a WCAG 2.1.'
    }
  ];
  
  const toggleItem = (itemId: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(itemId)) {
      newOpenItems.delete(itemId);
    } else {
      newOpenItems.add(itemId);
    }
    setOpenItems(newOpenItems);
  };
  
  return (
    <div className="space-y-2">
      {accordionItems.map((item) => {
        const isOpen = openItems.has(item.id);
        const buttonId = `accordion-button-${item.id}`;
        const panelId = `accordion-panel-${item.id}`;
        
        return (
          <div key={item.id} className="border border-gray-200 dark:border-gray-600 rounded-lg">
            <h3>
              <button
                id={buttonId}
                onClick={() => toggleItem(item.id)}
                className="w-full flex items-center justify-between px-4 py-3 text-left bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset rounded-lg transition-colors"
                aria-expanded={isOpen}
                aria-controls={panelId}
              >
                <span className="font-medium text-gray-900 dark:text-white">{item.title}</span>
                {isOpen ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" aria-hidden="true" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" aria-hidden="true" />
                )}
              </button>
            </h3>
            {isOpen && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="px-4 pb-3"
              >
                <p className="text-gray-700 dark:text-gray-300">{item.content}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

// Main Component
export default function AccessibilityPage() {
  const { settings, updateSetting } = useAccessibility();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  
  // Live region for announcements
  const announceToScreenReader = (message: string) => {
    setAnnouncement(message);
    setTimeout(() => setAnnouncement(''), 1000);
  };
  
  const fontSizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
    'extra-large': 'text-xl'
  };
  
  return (
    <div className={`min-h-screen ${
      settings.highContrast 
        ? 'bg-black text-white' 
        : 'bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800'
    } ${fontSizeClasses[settings.fontSize]} ${
      settings.reducedMotion ? 'motion-reduce' : ''
    }`}>
      <SkipLink />
      
      {/* Live Region for Screen Reader Announcements */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      
      <AccessibleNavigation />
      
      <main id="main-content" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Demonstração de Acessibilidade
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Explore as melhores práticas de acessibilidade web e UX inclusivo com exemplos interativos.
            </p>
          </div>
          
          {/* Accessibility Settings Panel */}
          <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-12" aria-labelledby="settings-heading">
            <h2 id="settings-heading" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Configurações de Acessibilidade
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* High Contrast */}
              <div className="space-y-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.highContrast}
                    onChange={(e) => {
                      updateSetting('highContrast', e.target.checked);
                      announceToScreenReader(e.target.checked ? 'Alto contraste ativado' : 'Alto contraste desativado');
                    }}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 focus:ring-2"
                  />
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    Alto Contraste
                  </span>
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Melhora a legibilidade para usuários com baixa visão
                </p>
              </div>
              
              {/* Reduced Motion */}
              <div className="space-y-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.reducedMotion}
                    onChange={(e) => {
                      updateSetting('reducedMotion', e.target.checked);
                      announceToScreenReader(e.target.checked ? 'Movimento reduzido ativado' : 'Movimento reduzido desativado');
                    }}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 focus:ring-2"
                  />
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    Reduzir Movimento
                  </span>
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Reduz animações para usuários sensíveis ao movimento
                </p>
              </div>
              
              {/* Font Size */}
              <div className="space-y-2">
                <label htmlFor="font-size-select" className="block font-medium text-gray-700 dark:text-gray-300">
                  Tamanho da Fonte
                </label>
                <select
                  id="font-size-select"
                  value={settings.fontSize}
                  onChange={(e) => {
                    updateSetting('fontSize', e.target.value);
                    announceToScreenReader(`Tamanho da fonte alterado para ${e.target.value}`);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="small">Pequeno</option>
                  <option value="medium">Médio</option>
                  <option value="large">Grande</option>
                  <option value="extra-large">Extra Grande</option>
                </select>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Ajusta o tamanho do texto para melhor legibilidade
                </p>
              </div>
            </div>
          </section>
          
          {/* Keyboard Navigation Demo */}
          <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-12" aria-labelledby="keyboard-heading">
            <h2 id="keyboard-heading" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Navegação por Teclado
            </h2>
            
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                Use a tecla <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm font-mono">Tab</kbd> para navegar pelos elementos focáveis.
                Use <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm font-mono">Shift + Tab</kbd> para navegar para trás.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 focus:bg-purple-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors">
                  Botão 1
                </button>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
                  Botão 2
                </button>
                <button className="px-4 py-2 bg-green-600 hover:bg-green-700 focus:bg-green-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors">
                  Botão 3
                </button>
                <input
                  type="text"
                  placeholder="Campo de texto focável"
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
          </section>
          
          {/* Modal Demo */}
          <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-12" aria-labelledby="modal-heading">
            <h2 id="modal-heading" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Modal Acessível
            </h2>
            
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                Este modal implementa focus trap, navegação por teclado e anúncios para leitores de tela.
              </p>
              
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 focus:bg-purple-700 text-white rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
              >
                Abrir Modal
              </button>
            </div>
          </section>
          
          {/* Form Demo */}
          <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-12" aria-labelledby="form-heading">
            <h2 id="form-heading" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Formulário Acessível
            </h2>
            
            <div className="max-w-md">
              <AccessibleForm />
            </div>
          </section>
          
          {/* Accordion Demo */}
          <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-12" aria-labelledby="accordion-heading">
            <h2 id="accordion-heading" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Accordion Acessível
            </h2>
            
            <AccessibleAccordion />
          </section>
          
          {/* ARIA Live Regions Demo */}
          <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-12" aria-labelledby="live-regions-heading">
            <h2 id="live-regions-heading" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Regiões Dinâmicas (ARIA Live)
            </h2>
            
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                As regiões dinâmicas anunciam mudanças de conteúdo para leitores de tela.
              </p>
              
              <div className="flex gap-4">
                <button
                  onClick={() => announceToScreenReader('Mensagem de sucesso!')}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 focus:bg-green-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                >
                  Anunciar Sucesso
                </button>
                <button
                  onClick={() => announceToScreenReader('Mensagem de erro!')}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 focus:bg-red-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                >
                  Anunciar Erro
                </button>
                <button
                  onClick={() => announceToScreenReader('Informação importante!')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Anunciar Info
                </button>
              </div>
            </div>
          </section>
          
          {/* Best Practices */}
          <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg" aria-labelledby="best-practices-heading">
            <h2 id="best-practices-heading" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Melhores Práticas Implementadas
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" aria-hidden="true" />
                  Estrutura Semântica
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Uso correto de headings (h1, h2, h3)</li>
                  <li>• Elementos semânticos (nav, main, section)</li>
                  <li>• Landmarks ARIA apropriados</li>
                  <li>• Estrutura lógica de navegação</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" aria-hidden="true" />
                  Navegação por Teclado
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Todos os elementos são focáveis</li>
                  <li>• Indicadores visuais de foco</li>
                  <li>• Ordem lógica de tabulação</li>
                  <li>• Atalhos de teclado apropriados</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" aria-hidden="true" />
                  Leitores de Tela
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Labels descritivos em formulários</li>
                  <li>• Texto alternativo em imagens</li>
                  <li>• Regiões dinâmicas (aria-live)</li>
                  <li>• Estados e propriedades ARIA</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" aria-hidden="true" />
                  Design Inclusivo
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Contraste adequado de cores</li>
                  <li>• Tamanhos de fonte ajustáveis</li>
                  <li>• Áreas de clique adequadas</li>
                  <li>• Suporte a movimento reduzido</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      {/* Accessible Modal */}
      <AccessibleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Modal de Demonstração"
      >
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-300">
            Este é um modal totalmente acessível que implementa:
          </p>
          <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
            <li>Focus trap (foco fica dentro do modal)</li>
            <li>Fechamento com tecla Escape</li>
            <li>Anúncios para leitores de tela</li>
            <li>Navegação por teclado</li>
          </ul>
          <div className="flex gap-3 pt-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 focus:bg-purple-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
            >
              Fechar
            </button>
            <button
              onClick={() => alert('Ação executada!')}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 focus:bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
            >
              Ação
            </button>
          </div>
        </div>
      </AccessibleModal>
    </div>
  );
}