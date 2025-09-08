'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Key, 
  Users, 
  Lock,
  Globe,
  Smartphone,
  Mail,
  Github,
  Chrome,
  Facebook,
  Twitter,
  Settings,
  Database,
  Server,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { DemoCard } from '@/components/DemoCard';
import { DemoCardStatic } from '@/components/DemoCardStatic';
import { DemoSection } from '@/components/DemoSection';
import { CodeBlock } from '@/components/CodeBlock';

const authFeatures = [
  {
    title: 'OAuth Providers',
    description: 'Integração com 50+ provedores OAuth',
    icon: Globe,
    color: 'text-blue-500',
    providers: ['Google', 'GitHub', 'Facebook', 'Twitter', 'Discord', 'Apple']
  },
  {
    title: 'Database Adapters',
    description: 'Suporte para múltiplos bancos de dados',
    icon: Database,
    color: 'text-green-500',
    providers: ['Prisma', 'MongoDB', 'PostgreSQL', 'MySQL', 'SQLite', 'DynamoDB']
  },
  {
    title: 'Session Management',
    description: 'JWT e Database sessions',
    icon: Key,
    color: 'text-purple-500',
    providers: ['JWT', 'Database', 'Encrypted', 'Secure', 'Scalable', 'Flexible']
  },
  {
    title: 'Security Features',
    description: 'Recursos de segurança avançados',
    icon: Shield,
    color: 'text-red-500',
    providers: ['CSRF Protection', 'Secure Cookies', 'PKCE', 'State Validation', 'Nonce', 'JWE']
  }
];

const oauthProviders = [
  {
    name: 'Google',
    icon: Chrome,
    color: 'bg-red-500',
    setup: 'Google Cloud Console',
    scopes: ['email', 'profile'],
    features: ['OpenID Connect', 'Refresh Tokens', 'ID Tokens']
  },
  {
    name: 'GitHub',
    icon: Github,
    color: 'bg-gray-800',
    setup: 'GitHub Developer Settings',
    scopes: ['user:email', 'read:user'],
    features: ['OAuth 2.0', 'User Info', 'Organizations']
  },
  {
    name: 'Discord',
    icon: Users,
    color: 'bg-indigo-500',
    setup: 'Discord Developer Portal',
    scopes: ['identify', 'email'],
    features: ['OAuth 2.0', 'Guild Info', 'Bot Integration']
  },
  {
    name: 'Facebook',
    icon: Facebook,
    color: 'bg-blue-600',
    setup: 'Facebook for Developers',
    scopes: ['email', 'public_profile'],
    features: ['Graph API', 'Login Review', 'Business Verification']
  }
];

const sessionStrategies = [
  {
    name: 'JWT Strategy',
    description: 'Stateless, escalável, sem banco de dados',
    pros: ['Stateless', 'Escalável', 'Rápido', 'Sem DB'],
    cons: ['Não revogável', 'Tamanho limitado', 'Menos seguro'],
    useCase: 'APIs, microservices, aplicações simples'
  },
  {
    name: 'Database Strategy',
    description: 'Stateful, seguro, revogável',
    pros: ['Revogável', 'Mais seguro', 'Auditoria', 'Flexível'],
    cons: ['Requer DB', 'Menos escalável', 'Mais lento'],
    useCase: 'Aplicações complexas, alta segurança'
  }
];

// Mock user data
const mockUser = {
  id: '1',
  name: 'João Silva',
  email: 'joao@example.com',
  image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20avatar%20of%20a%20software%20developer%20male%20with%20glasses&image_size=square',
  role: 'USER',
  provider: 'google'
};

export default function NextAuthPage() {
  const [selectedTab, setSelectedTab] = useState('setup');
  const [selectedProvider, setSelectedProvider] = useState(0);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [authState, setAuthState] = useState('signin');
  const [isLoading, setIsLoading] = useState(false);

  const simulateAuth = async (action: string) => {
    setIsLoading(true);
    
    setTimeout(() => {
      switch (action) {
        case 'signin':
          setIsSignedIn(true);
          break;
        case 'signout':
          setIsSignedIn(false);
          break;
        case 'signup':
          setIsSignedIn(true);
          setAuthState('signin');
          break;
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-br from-red-500 to-red-700 rounded-xl text-white mr-4">
              <Shield className="h-8 w-8" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
              Auth.js
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Autenticação completa para Next.js. Segura por padrão, fácil de usar, 
            com suporte para OAuth, email/password e muito mais. (Anteriormente NextAuth.js)
          </p>
        </motion.div>

        {/* Features Overview */}
        <DemoSection title="Recursos Principais" description="Tudo que você precisa para autenticação moderna">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-1.5 mb-8">
            {authFeatures.map((feature, index) => {
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
                        {feature.providers.map((provider) => (
                          <div key={provider} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                            <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                            {provider}
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

        {/* OAuth Providers */}
        <DemoSection title="Provedores OAuth" description="Integração com os principais serviços de autenticação">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-1.5 mb-8">
            {oauthProviders.map((provider, index) => {
              const Icon = provider.icon;
              return (
                <motion.div
                  key={provider.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow"
                >
                  <div className="text-center mb-4">
                    <div className={`w-12 h-12 ${provider.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {provider.name}
                    </h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Setup:</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{provider.setup}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Scopes:</h4>
                      <div className="flex flex-wrap gap-1">
                        {provider.scopes.map((scope) => (
                          <span key={scope} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                            {scope}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Features:</h4>
                      <ul className="space-y-1">
                        {provider.features.map((feature) => (
                          <li key={feature} className="text-xs text-gray-600 dark:text-gray-400 flex items-center">
                            <span className="w-1 h-1 bg-green-500 rounded-full mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </DemoSection>

        {/* Setup & Configuration */}
        <DemoSection title="Configuração e Exemplos" description="Como implementar Auth.js em seu projeto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8 px-6">
                {['setup', 'providers', 'sessions', 'callbacks'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setSelectedTab(tab)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                      selectedTab === tab
                        ? 'border-red-500 text-red-600 dark:text-red-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    {tab === 'setup' ? 'Instalação' : 
                     tab === 'providers' ? 'Provedores' :
                     tab === 'sessions' ? 'Sessões' : 'Callbacks'}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="p-6">
              {selectedTab === 'setup' && (
                <div className="grid lg:grid-cols-2 gap-1.5">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Instalação</h3>
                    <CodeBlock
                      language="bash"
                      code={`# Instalar Auth.js (NextAuth.js v5)
npm install next-auth

# Para usar com Prisma
npm install @auth/prisma-adapter prisma @prisma/client

# Para usar com MongoDB
npm install @auth/mongodb-adapter mongodb

# Para providers específicos
npm install @auth/google-provider
npm install @auth/github-provider`}
                    />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Variáveis de Ambiente</h3>
                    <CodeBlock
                      language="bash"
                      code={`# .env.local
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub OAuth
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Database (se usando database sessions)
DATABASE_URL=postgresql://user:password@localhost:5432/mydb`}
                    />
                  </div>
                  
                  <div className="lg:col-span-2">
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Configuração Básica</h3>
                    <CodeBlock
                      language="typescript"
                      code={`// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user || !await bcrypt.compare(credentials.password, user.password)) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
    error: '/auth/error',
  },
})

export { handler as GET, handler as POST }`}
                    />
                  </div>
                </div>
              )}
              
              {selectedTab === 'providers' && (
                <div className="space-y-6">
                  <div className="grid lg:grid-cols-3 gap-4 mb-6">
                    {['OAuth', 'Credentials', 'Email'].map((type, index) => (
                      <button
                        key={type}
                        onClick={() => setSelectedProvider(index)}
                        className={`p-4 rounded-lg text-left transition-colors ${
                          selectedProvider === index
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        <h4 className="font-medium mb-2">{type}</h4>
                        <p className="text-sm opacity-90">
                          {type === 'OAuth' ? 'Google, GitHub, Discord...' :
                           type === 'Credentials' ? 'Email & Password' : 'Magic Links'}
                        </p>
                      </button>
                    ))}
                  </div>
                  
                  {selectedProvider === 0 && (
                    <CodeBlock
                      language="typescript"
                      code={`// OAuth Providers
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import DiscordProvider from 'next-auth/providers/discord'
import FacebookProvider from 'next-auth/providers/facebook'

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: 'read:user user:email'
        }
      }
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    })
  ],
  // ... outras configurações
})`}
                    />
                  )}
                  
                  {selectedProvider === 1 && (
                    <CodeBlock
                      language="typescript"
                      code={`// Credentials Provider
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { 
          label: 'Email', 
          type: 'email',
          placeholder: 'seu@email.com'
        },
        password: { 
          label: 'Password', 
          type: 'password',
          placeholder: 'Sua senha'
        }
      },
      async authorize(credentials) {
        try {
          // Validar entrada
          const { email, password } = loginSchema.parse(credentials)
          
          // Buscar usuário
          const user = await prisma.user.findUnique({
            where: { email },
            select: {
              id: true,
              email: true,
              name: true,
              password: true,
              role: true,
              emailVerified: true
            }
          })
          
          if (!user) {
            throw new Error('Usuário não encontrado')
          }
          
          // Verificar senha
          const isValidPassword = await bcrypt.compare(password, user.password)
          
          if (!isValidPassword) {
            throw new Error('Senha incorreta')
          }
          
          // Verificar se email foi verificado
          if (!user.emailVerified) {
            throw new Error('Email não verificado')
          }
          
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          }
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      }
    })
  ],
  // ... outras configurações
})`}
                    />
                  )}
                  
                  {selectedProvider === 2 && (
                    <CodeBlock
                      language="typescript"
                      code={`// Email Provider (Magic Links)
import EmailProvider from 'next-auth/providers/email'
import { createTransport } from 'nodemailer'

export default NextAuth({
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      // Customizar email
      async sendVerificationRequest({
        identifier: email,
        url,
        provider: { server, from },
      }) {
        const { host } = new URL(url)
        const transport = createTransport(server)
        
        await transport.sendMail({
          to: email,
          from,
          subject: \`Faça login em \${host}\`,
          text: \`Faça login em \${host}\\n\${url}\\n\\n\`,
          html: \`
            <body>
              <h1>Faça login em \${host}</h1>
              <p>Clique no link abaixo para fazer login:</p>
              <p><a href="\${url}">Fazer Login</a></p>
              <p>Se você não solicitou este email, pode ignorá-lo.</p>
            </body>
          \`,
        })
      },
    })
  ],
  // ... outras configurações
})`}
                    />
                  )}
                </div>
              )}
              
              {selectedTab === 'sessions' && (
                <div className="space-y-6">
                  <div className="grid lg:grid-cols-2 gap-1.5">
                    {sessionStrategies.map((strategy, index) => (
                      <div key={strategy.name} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {strategy.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          {strategy.description}
                        </p>
                        
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <h4 className="font-medium text-green-700 dark:text-green-400 mb-2">✅ Vantagens</h4>
                            <ul className="space-y-1">
                              {strategy.pros.map((pro) => (
                                <li key={pro} className="text-sm text-gray-600 dark:text-gray-300">
                                  • {pro}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-red-700 dark:text-red-400 mb-2">❌ Desvantagens</h4>
                            <ul className="space-y-1">
                              {strategy.cons.map((con) => (
                                <li key={con} className="text-sm text-gray-600 dark:text-gray-300">
                                  • {con}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                          <h4 className="font-medium text-blue-700 dark:text-blue-400 mb-1">💡 Quando usar</h4>
                          <p className="text-sm text-blue-600 dark:text-blue-300">
                            {strategy.useCase}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Configuração de Sessões</h3>
                    <CodeBlock
                      language="typescript"
                      code={`// Configuração JWT
export default NextAuth({
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 dias
    updateAge: 24 * 60 * 60, // 24 horas
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 30 * 24 * 60 * 60, // 30 dias
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Adicionar dados customizados ao token
      if (user) {
        token.role = user.role
        token.id = user.id
      }
      
      // Refresh token rotation
      if (account?.refresh_token) {
        token.refreshToken = account.refresh_token
      }
      
      return token
    },
    async session({ session, token }) {
      // Enviar propriedades para o cliente
      if (token) {
        session.user.id = token.id
        session.user.role = token.role
      }
      
      return session
    }
  }
})

// Configuração Database
export default NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'database',
    maxAge: 30 * 24 * 60 * 60, // 30 dias
    updateAge: 24 * 60 * 60, // 24 horas
    generateSessionToken: () => {
      return randomUUID?.()
    }
  },
  callbacks: {
    async session({ session, user }) {
      // Dados do usuário vêm diretamente do banco
      session.user.id = user.id
      session.user.role = user.role
      
      return session
    }
  }
})`}
                    />
                  </div>
                </div>
              )}
              
              {selectedTab === 'callbacks' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Callbacks Principais</h3>
                    <CodeBlock
                      language="typescript"
                      code={`export default NextAuth({
  callbacks: {
    // Controlar se usuário pode fazer login
    async signIn({ user, account, profile, email, credentials }) {
      // Verificar se email está na whitelist
      const allowedEmails = ['admin@example.com', 'user@example.com']
      
      if (account?.provider === 'email') {
        return allowedEmails.includes(user.email!)
      }
      
      // Verificar domínio para OAuth
      if (account?.provider === 'google') {
        return user.email?.endsWith('@mycompany.com') ?? false
      }
      
      // Verificar se usuário existe no banco
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email! }
      })
      
      if (!existingUser) {
        // Criar usuário automaticamente
        await prisma.user.create({
          data: {
            email: user.email!,
            name: user.name!,
            image: user.image,
            role: 'USER'
          }
        })
      }
      
      return true
    },
    
    // Redirecionar após login/logout
    async redirect({ url, baseUrl }) {
      // Permite URLs relativas
      if (url.startsWith('/')) return \`\${baseUrl}\${url}\`
      
      // Permite URLs do mesmo domínio
      else if (new URL(url).origin === baseUrl) return url
      
      // Fallback para base URL
      return baseUrl
    },
    
    // Customizar JWT token
    async jwt({ token, user, account, profile, isNewUser }) {
      // Login inicial
      if (user) {
        token.id = user.id
        token.role = user.role
        token.emailVerified = user.emailVerified
      }
      
      // OAuth account linking
      if (account) {
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
        token.provider = account.provider
      }
      
      // Refresh token rotation
      if (account?.refresh_token) {
        try {
          const response = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
              client_id: process.env.GOOGLE_CLIENT_ID!,
              client_secret: process.env.GOOGLE_CLIENT_SECRET!,
              grant_type: 'refresh_token',
              refresh_token: account.refresh_token,
            }),
          })
          
          const tokens = await response.json()
          
          if (!response.ok) throw tokens
          
          token.accessToken = tokens.access_token
          token.refreshToken = tokens.refresh_token ?? token.refreshToken
        } catch (error) {
          console.error('Error refreshing access token', error)
          token.error = 'RefreshAccessTokenError'
        }
      }
      
      return token
    },
    
    // Customizar session object
    async session({ session, token, user }) {
      // JWT strategy
      if (token) {
        session.user.id = token.id
        session.user.role = token.role
        session.user.emailVerified = token.emailVerified
        session.accessToken = token.accessToken
        session.error = token.error
      }
      
      // Database strategy
      if (user) {
        session.user.id = user.id
        session.user.role = user.role
      }
      
      return session
    }
  }
})`}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </DemoSection>

        {/* Interactive Auth Demo */}
        <DemoSection title="Demo Interativo" description="Teste o fluxo de autenticação">
          <div className="grid lg:grid-cols-2 gap-1.5">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Autenticação</h3>
              
              {!isSignedIn ? (
                <div className="space-y-4">
                  <div className="flex space-x-2 mb-4">
                    <button
                      onClick={() => setAuthState('signin')}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        authState === 'signin'
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => setAuthState('signup')}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        authState === 'signup'
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      Sign Up
                    </button>
                  </div>
                  
                  {/* OAuth Buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={() => simulateAuth('signin')}
                      disabled={isLoading}
                      className="w-full flex items-center justify-center p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                    >
                      <Chrome className="h-5 w-5 mr-3 text-red-500" />
                      {isLoading ? 'Conectando...' : 'Continue with Google'}
                    </button>
                    
                    <button
                      onClick={() => simulateAuth('signin')}
                      disabled={isLoading}
                      className="w-full flex items-center justify-center p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                    >
                      <Github className="h-5 w-5 mr-3 text-gray-800 dark:text-gray-200" />
                      {isLoading ? 'Conectando...' : 'Continue with GitHub'}
                    </button>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">ou</span>
                    </div>
                  </div>
                  
                  {/* Email/Password Form */}
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="seu@email.com"
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {authState === 'signup' ? 'Criar Senha' : 'Senha'}
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          className="w-full p-3 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-400" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => simulateAuth(authState)}
                      disabled={isLoading}
                      className="w-full flex items-center justify-center p-3 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white rounded-lg transition-colors"
                    >
                      {isLoading ? (
                        <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                      ) : (
                        <Lock className="h-5 w-5 mr-2" />
                      )}
                      {isLoading ? 'Processando...' : authState === 'signup' ? 'Criar Conta' : 'Entrar'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Bem-vindo!</h4>
                    <p className="text-gray-600 dark:text-gray-300">Você está autenticado</p>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={mockUser.image}
                        alt={mockUser.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="text-left">
                        <p className="font-medium text-gray-900 dark:text-white">{mockUser.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{mockUser.email}</p>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => simulateAuth('signout')}
                    className="w-full p-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Usando no Componente</h3>
              <CodeBlock
                language="typescript"
                code={`// components/AuthButton.tsx
import { useSession, signIn, signOut } from 'next-auth/react'

export function AuthButton() {
  const { data: session, status } = useSession()
  
  if (status === 'loading') {
    return <div>Carregando...</div>
  }
  
  if (session) {
    return (
      <div className="flex items-center space-x-4">
        <img
          src={session.user?.image || '/default-avatar.png'}
          alt={session.user?.name || 'User'}
          className="w-8 h-8 rounded-full"
        />
        <span>Olá, {session.user?.name}</span>
        <button
          onClick={() => signOut()}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Sign Out
        </button>
      </div>
    )
  }
  
  return (
    <div className="space-x-2">
      <button
        onClick={() => signIn('google')}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Sign in with Google
      </button>
      <button
        onClick={() => signIn('github')}
        className="px-4 py-2 bg-gray-800 text-white rounded"
      >
        Sign in with GitHub
      </button>
    </div>
  )
}

// Proteger páginas
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export function ProtectedPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  
  useEffect(() => {
    if (status === 'loading') return // Ainda carregando
    
    if (!session) {
      router.push('/auth/signin')
    }
  }, [session, status, router])
  
  if (status === 'loading') {
    return <div>Carregando...</div>
  }
  
  if (!session) {
    return <div>Redirecionando...</div>
  }
  
  return (
    <div>
      <h1>Página Protegida</h1>
      <p>Olá, {session.user?.name}!</p>
    </div>
  )
}`}
              />
            </div>
          </div>
        </DemoSection>

        {/* Best Practices */}
        <DemoSection title="Melhores Práticas" description="Diretrizes para implementar autenticação segura">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <div className="grid md:grid-cols-3 gap-1.5">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-green-500" />
                  Segurança
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Use HTTPS em produção sempre</li>
                  <li>• Configure NEXTAUTH_SECRET forte</li>
                  <li>• Valide dados em callbacks</li>
                  <li>• Implemente rate limiting</li>
                  <li>• Use secure cookies</li>
                  <li>• Monitore tentativas de login</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Users className="h-5 w-5 mr-2 text-blue-500" />
                  Experiência do Usuário
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Customize páginas de auth</li>
                  <li>• Implemente loading states</li>
                  <li>• Trate erros graciosamente</li>
                  <li>• Use redirects inteligentes</li>
                  <li>• Ofereça múltiplas opções</li>
                  <li>• Mantenha sessões persistentes</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Settings className="h-5 w-5 mr-2 text-purple-500" />
                  Configuração
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Configure variáveis de ambiente</li>
                  <li>• Use adapters apropriados</li>
                  <li>• Configure callbacks necessários</li>
                  <li>• Teste em diferentes ambientes</li>
                  <li>• Documente configurações</li>
                  <li>• Monitore logs de auth</li>
                </ul>
              </div>
            </div>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}