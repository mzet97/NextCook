'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, 
  Languages, 
  MapPin, 
  Calendar,
  DollarSign,
  Clock,
  Users,
  Settings,
  Code,
  FileText,
  CheckCircle,
  ArrowRight,
  Smartphone,
  Monitor
} from 'lucide-react';
import { DemoCard } from '@/components/DemoCard';
import { DemoCardStatic } from '@/components/DemoCardStatic';
import { DemoSection } from '@/components/DemoSection';
import { CodeBlock } from '@/components/CodeBlock';

const i18nFeatures = [
  {
    title: 'Locale Detection',
    description: 'Detecção automática do idioma do usuário',
    icon: Globe,
    color: 'text-blue-500',
    benefits: ['Browser Detection', 'URL-based', 'Cookie Storage', 'Fallback Support']
  },
  {
    title: 'Message Formatting',
    description: 'Formatação avançada de mensagens',
    icon: FileText,
    color: 'text-green-500',
    benefits: ['Pluralization', 'Rich Text', 'Variables', 'Nested Messages']
  },
  {
    title: 'Date & Number Formatting',
    description: 'Formatação localizada de dados',
    icon: Calendar,
    color: 'text-purple-500',
    benefits: ['Date Formats', 'Number Formats', 'Currency', 'Time Zones']
  },
  {
    title: 'Dynamic Loading',
    description: 'Carregamento dinâmico de traduções',
    icon: Code,
    color: 'text-orange-500',
    benefits: ['Code Splitting', 'Lazy Loading', 'Bundle Optimization', 'Performance']
  }
];

const supportedLocales = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    direction: 'ltr',
    examples: {
      greeting: 'Hello, World!',
      date: 'January 15, 2024',
      number: '1,234.56',
      currency: '$1,234.56'
    }
  },
  {
    code: 'pt',
    name: 'Portuguese',
    nativeName: 'Português',
    flag: '🇧🇷',
    direction: 'ltr',
    examples: {
      greeting: 'Olá, Mundo!',
      date: '15 de janeiro de 2024',
      number: '1.234,56',
      currency: 'R$ 1.234,56'
    }
  },
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    direction: 'ltr',
    examples: {
      greeting: '¡Hola, Mundo!',
      date: '15 de enero de 2024',
      number: '1.234,56',
      currency: '1.234,56 €'
    }
  },
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    direction: 'ltr',
    examples: {
      greeting: 'Bonjour, le Monde!',
      date: '15 janvier 2024',
      number: '1 234,56',
      currency: '1 234,56 €'
    }
  },
  {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    flag: '🇸🇦',
    direction: 'rtl',
    examples: {
      greeting: 'مرحبا بالعالم!',
      date: '١٥ يناير ٢٠٢٤',
      number: '١٬٢٣٤٫٥٦',
      currency: '١٬٢٣٤٫٥٦ ر.س'
    }
  },
  {
    code: 'zh',
    name: 'Chinese',
    nativeName: '中文',
    flag: '🇨🇳',
    direction: 'ltr',
    examples: {
      greeting: '你好，世界！',
      date: '2024年1月15日',
      number: '1,234.56',
      currency: '¥1,234.56'
    }
  }
];

const configurationExamples = [
  {
    name: 'next-intl Setup',
    description: 'Configuração básica do next-intl',
    files: [
      {
        name: 'i18n.ts',
        content: `import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'

// Lista de locales suportados
export const locales = ['en', 'pt', 'es', 'fr'] as const
export type Locale = typeof locales[number]

// Locale padrão
export const defaultLocale: Locale = 'en'

export default getRequestConfig(async ({ locale }) => {
  // Validar se o locale é suportado
  if (!locales.includes(locale as Locale)) {
    notFound()
  }

  return {
    messages: (await import(\`../messages/\${locale}.json\`)).default,
    timeZone: 'America/Sao_Paulo',
    now: new Date(),
    formats: {
      dateTime: {
        short: {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        },
        long: {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          weekday: 'long'
        }
      },
      number: {
        precise: {
          maximumFractionDigits: 5
        }
      }
    }
  }
})`
      },
      {
        name: 'middleware.ts',
        content: `import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from './i18n'

export default createMiddleware({
  // Lista de todos os locales suportados
  locales,
  
  // Locale padrão quando nenhum corresponde
  defaultLocale,
  
  // Estratégia de detecção de locale
  localeDetection: true,
  
  // Prefixo de locale na URL
  localePrefix: 'as-needed', // ou 'always' | 'never'
  
  // Domínios por locale (opcional)
  domains: [
    {
      domain: 'example.com',
      defaultLocale: 'en'
    },
    {
      domain: 'example.com.br',
      defaultLocale: 'pt'
    }
  ]
})

export const config = {
  // Aplicar middleware apenas para rotas específicas
  matcher: [
    // Habilitar para todas as rotas exceto api, _next/static, _next/image, favicon.ico
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    // Habilitar para rotas de locale
    '/',
    '/(pt|en|es|fr)/:path*'
  ]
}`
      },
      {
        name: 'layout.tsx',
        content: `import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { locales } from '@/i18n'

type Props = {
  children: React.ReactNode
  params: { locale: string }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params
}: Props) {
  const { locale } = await params;
  
  // Validar locale
  if (!locales.includes(locale as any)) {
    notFound()
  }

  // Carregar mensagens para o locale atual
  const messages = await getMessages()

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}`
      }
    ]
  },
  {
    name: 'Translation Files',
    description: 'Arquivos de tradução estruturados',
    files: [
      {
        name: 'messages/en.json',
        content: `{
  "common": {
    "welcome": "Welcome",
    "hello": "Hello {name}!",
    "loading": "Loading...",
    "error": "An error occurred",
    "save": "Save",
    "cancel": "Cancel",
    "delete": "Delete",
    "edit": "Edit"
  },
  "navigation": {
    "home": "Home",
    "about": "About",
    "contact": "Contact",
    "products": "Products",
    "services": "Services"
  },
  "auth": {
    "login": "Sign In",
    "logout": "Sign Out",
    "register": "Sign Up",
    "email": "Email",
    "password": "Password",
    "forgotPassword": "Forgot Password?",
    "rememberMe": "Remember me"
  },
  "products": {
    "title": "Our Products",
    "description": "Discover our amazing products",
    "addToCart": "Add to Cart",
    "outOfStock": "Out of Stock",
    "price": "Price",
    "quantity": "Quantity",
    "total": "Total",
    "itemCount": {
      "zero": "No items",
      "one": "One item",
      "other": "{count} items"
    }
  },
  "validation": {
    "required": "This field is required",
    "email": "Please enter a valid email",
    "minLength": "Minimum {min} characters",
    "maxLength": "Maximum {max} characters"
  }
}`
      },
      {
        name: 'messages/pt.json',
        content: `{
  "common": {
    "welcome": "Bem-vindo",
    "hello": "Olá {name}!",
    "loading": "Carregando...",
    "error": "Ocorreu um erro",
    "save": "Salvar",
    "cancel": "Cancelar",
    "delete": "Excluir",
    "edit": "Editar"
  },
  "navigation": {
    "home": "Início",
    "about": "Sobre",
    "contact": "Contato",
    "products": "Produtos",
    "services": "Serviços"
  },
  "auth": {
    "login": "Entrar",
    "logout": "Sair",
    "register": "Cadastrar",
    "email": "E-mail",
    "password": "Senha",
    "forgotPassword": "Esqueceu a senha?",
    "rememberMe": "Lembrar de mim"
  },
  "products": {
    "title": "Nossos Produtos",
    "description": "Descubra nossos produtos incríveis",
    "addToCart": "Adicionar ao Carrinho",
    "outOfStock": "Fora de Estoque",
    "price": "Preço",
    "quantity": "Quantidade",
    "total": "Total",
    "itemCount": {
      "zero": "Nenhum item",
      "one": "Um item",
      "other": "{count} itens"
    }
  },
  "validation": {
    "required": "Este campo é obrigatório",
    "email": "Por favor, insira um e-mail válido",
    "minLength": "Mínimo de {min} caracteres",
    "maxLength": "Máximo de {max} caracteres"
  }
}`
      }
    ]
  },
  {
    name: 'Usage Examples',
    description: 'Como usar traduções nos componentes',
    files: [
      {
        name: 'components/Header.tsx',
        content: `'use client'

import { useTranslations, useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { locales } from '@/i18n'

export function Header() {
  const t = useTranslations('navigation')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const switchLocale = (newLocale: string) => {
    // Remover locale atual do pathname
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '') || '/'
    
    // Navegar para novo locale
    router.push(\`/\${newLocale}\${pathWithoutLocale}\`)
  }

  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex space-x-6">
            <a href={\`/\${locale}\`} className="text-gray-900 hover:text-blue-600">
              {t('home')}
            </a>
            <a href={\`/\${locale}/about\`} className="text-gray-900 hover:text-blue-600">
              {t('about')}
            </a>
            <a href={\`/\${locale}/products\`} className="text-gray-900 hover:text-blue-600">
              {t('products')}
            </a>
            <a href={\`/\${locale}/contact\`} className="text-gray-900 hover:text-blue-600">
              {t('contact')}
            </a>
          </div>
          
          {/* Language Switcher */}
          <div className="flex items-center space-x-2">
            <select
              value={locale}
              onChange={(e) => switchLocale(e.target.value)}
              className="border rounded px-2 py-1"
            >
              {locales.map((loc) => (
                <option key={loc} value={loc}>
                  {loc.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>
      </nav>
    </header>
  )
}`
      },
      {
        name: 'components/ProductCard.tsx',
        content: `'use client'

import { useTranslations, useFormatter } from 'next-intl'

type Product = {
  id: string
  name: string
  price: number
  stock: number
  createdAt: Date
}

type Props = {
  product: Product
}

export function ProductCard({ product }: Props) {
  const t = useTranslations('products')
  const tCommon = useTranslations('common')
  const format = useFormatter()

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
      
      <div className="space-y-2 mb-4">
        <p className="text-gray-600">
          {t('price')}: {format.number(product.price, {
            style: 'currency',
            currency: 'USD'
          })}
        </p>
        
        <p className="text-gray-600">
          {t('quantity')}: {format.number(product.stock)}
        </p>
        
        <p className="text-sm text-gray-500">
          {format.dateTime(product.createdAt, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
      </div>
      
      <button
        disabled={product.stock === 0}
        className={\`w-full py-2 px-4 rounded \${
          product.stock > 0
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }\`}
      >
        {product.stock > 0 ? t('addToCart') : t('outOfStock')}
      </button>
      
      {/* Pluralization Example */}
      <p className="text-xs text-gray-500 mt-2">
        {t('itemCount', { count: product.stock })}
      </p>
    </div>
  )
}`
      },
      {
        name: 'components/ContactForm.tsx',
        content: `'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

export function ContactForm() {
  const t = useTranslations('auth')
  const tValidation = useTranslations('validation')
  const tCommon = useTranslations('common')
  
  const [formData, setFormData] = useState({
    email: '',
    message: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.email) {
      newErrors.email = tValidation('required')
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = tValidation('email')
    }
    
    if (!formData.message) {
      newErrors.message = tValidation('required')
    } else if (formData.message.length < 10) {
      newErrors.message = tValidation('minLength', { min: 10 })
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      console.log('Form submitted:', formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          {t('email')}
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={\`mt-1 block w-full rounded-md border-gray-300 shadow-sm \${
            errors.email ? 'border-red-500' : ''
          }\`}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Message
        </label>
        <textarea
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows={4}
          className={\`mt-1 block w-full rounded-md border-gray-300 shadow-sm \${
            errors.message ? 'border-red-500' : ''
          }\`}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message}</p>
        )}
      </div>
      
      <div className="flex space-x-3">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {tCommon('save')}
        </button>
        <button
          type="button"
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
        >
          {tCommon('cancel')}
        </button>
      </div>
    </form>
  )
}`
      }
    ]
  }
];

export default function I18nPage() {
  const [selectedTab, setSelectedTab] = useState('config');
  const [selectedConfig, setSelectedConfig] = useState(0);
  const [selectedFile, setSelectedFile] = useState(0);
  const [selectedLocale, setSelectedLocale] = useState('en');

  const currentLocale = supportedLocales.find(locale => locale.code === selectedLocale) || supportedLocales[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl text-white mr-4">
              <Globe className="h-8 w-8" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
              Internationalization (i18n)
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Crie aplicações multi-idioma com next-intl. Suporte completo para 
            localização, formatação e detecção automática de idioma.
          </p>
        </motion.div>

        {/* Features */}
        <DemoSection title="Recursos Principais" description="Funcionalidades do sistema de internacionalização">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {i18nFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <DemoCardStatic title={feature.title} description={feature.description}>
                    <div className="space-y-4">
                      <Icon className={`h-12 w-12 mx-auto ${feature.color}`} />
                      <div className="space-y-2">
                        {feature.benefits.map((benefit) => (
                          <div key={benefit} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                            <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                            {benefit}
                          </div>
                        ))}
                      </div>
                    </div>
                  </DemoCardStatic>
                </motion.div>
              );
            })}
          </div>
        </DemoSection>

        {/* Supported Locales */}
        <DemoSection title="Locales Suportados" description="Exemplos de formatação para diferentes idiomas">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-4 px-6 overflow-x-auto">
                {supportedLocales.map((locale) => (
                  <button
                    key={locale.code}
                    onClick={() => setSelectedLocale(locale.code)}
                    className={`py-4 px-3 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                      selectedLocale === locale.code
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    <span className="mr-2">{locale.flag}</span>
                    {locale.nativeName}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="p-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Informações do Locale
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-gray-600 dark:text-gray-300">Código:</span>
                      <span className="font-mono text-blue-600 dark:text-blue-400">{currentLocale.code}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-gray-600 dark:text-gray-300">Nome:</span>
                      <span className="font-medium">{currentLocale.name}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-gray-600 dark:text-gray-300">Nome Nativo:</span>
                      <span className="font-medium">{currentLocale.nativeName}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-gray-600 dark:text-gray-300">Direção:</span>
                      <span className="font-mono">{currentLocale.direction.toUpperCase()}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Exemplos de Formatação
                  </h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">Saudação:</div>
                      <div className="font-medium" dir={currentLocale.direction}>
                        {currentLocale.examples.greeting}
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">Data:</div>
                      <div className="font-medium" dir={currentLocale.direction}>
                        {currentLocale.examples.date}
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">Número:</div>
                      <div className="font-medium" dir={currentLocale.direction}>
                        {currentLocale.examples.number}
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">Moeda:</div>
                      <div className="font-medium" dir={currentLocale.direction}>
                        {currentLocale.examples.currency}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DemoSection>

        {/* Configuration Examples */}
        <DemoSection title="Configuração e Uso" description="Como implementar i18n com next-intl">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8 px-6 overflow-x-auto">
                {configurationExamples.map((config, index) => (
                  <button
                    key={config.name}
                    onClick={() => setSelectedConfig(index)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                      selectedConfig === index
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    {config.name}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {configurationExamples[selectedConfig].name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {configurationExamples[selectedConfig].description}
                </p>
              </div>
              
              {/* File Tabs */}
              <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
                <nav className="flex space-x-4">
                  {configurationExamples[selectedConfig].files.map((file, index) => (
                    <button
                      key={file.name}
                      onClick={() => setSelectedFile(index)}
                      className={`py-2 px-3 border-b-2 font-medium text-sm transition-colors ${
                        selectedFile === index
                          ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                          : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                      }`}
                    >
                      {file.name}
                    </button>
                  ))}
                </nav>
              </div>
              
              <CodeBlock
                language={configurationExamples[selectedConfig].files[selectedFile].name.endsWith('.json') ? 'json' : 'typescript'}
                code={configurationExamples[selectedConfig].files[selectedFile].content}
              />
            </div>
          </div>
        </DemoSection>

        {/* Best Practices */}
        <DemoSection title="Melhores Práticas" description="Diretrizes para implementar i18n eficientemente">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-500" />
                  Organização
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Organize traduções por namespace</li>
                  <li>• Use chaves descritivas e hierárquicas</li>
                  <li>• Mantenha consistência entre idiomas</li>
                  <li>• Documente contexto das traduções</li>
                  <li>• Use ferramentas de validação</li>
                  <li>• Implemente fallbacks adequados</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Settings className="h-5 w-5 mr-2 text-green-500" />
                  Performance
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Use lazy loading para traduções</li>
                  <li>• Implemente code splitting por locale</li>
                  <li>• Cache traduções no cliente</li>
                  <li>• Otimize bundle size</li>
                  <li>• Use CDN para arquivos de tradução</li>
                  <li>• Monitore performance de carregamento</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Users className="h-5 w-5 mr-2 text-purple-500" />
                  Experiência do Usuário
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Detecte idioma automaticamente</li>
                  <li>• Forneça seletor de idioma visível</li>
                  <li>• Suporte RTL quando necessário</li>
                  <li>• Teste com textos longos</li>
                  <li>• Considere diferenças culturais</li>
                  <li>• Implemente SEO multi-idioma</li>
                </ul>
              </div>
            </div>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}