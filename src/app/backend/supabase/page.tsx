'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Cloud, 
  Database, 
  Shield, 
  Zap,
  Users,
  Upload,
  Bell,
  Key,
  Globe,
  Server,
  Lock,
  FileText,
  Settings,
  Play,
  Code
} from 'lucide-react';
import { DemoCard } from '@/components/DemoCard';
import { DemoCardStatic } from '@/components/DemoCardStatic';
import { DemoSection } from '@/components/DemoSection';
import { CodeBlock } from '@/components/CodeBlock';

const supabaseFeatures = [
  {
    title: 'PostgreSQL Database',
    description: 'Banco de dados PostgreSQL totalmente gerenciado',
    icon: Database,
    color: 'text-blue-500',
    features: ['ACID Compliance', 'JSON Support', 'Full-text Search', 'Extensions']
  },
  {
    title: 'Authentication',
    description: 'Sistema de autenticação completo e seguro',
    icon: Shield,
    color: 'text-green-500',
    features: ['OAuth Providers', 'Magic Links', 'Phone Auth', 'Row Level Security']
  },
  {
    title: 'Real-time',
    description: 'Atualizações em tempo real via WebSockets',
    icon: Zap,
    color: 'text-yellow-500',
    features: ['Live Queries', 'Presence', 'Broadcast', 'Postgres Changes']
  },
  {
    title: 'Storage',
    description: 'Armazenamento de arquivos escalável',
    icon: Upload,
    color: 'text-purple-500',
    features: ['File Upload', 'Image Optimization', 'CDN', 'Access Control']
  }
];

const authProviders = [
  { name: 'Google', icon: '🔍', setup: 'OAuth 2.0 com Google Cloud Console' },
  { name: 'GitHub', icon: '🐙', setup: 'OAuth App no GitHub Settings' },
  { name: 'Discord', icon: '🎮', setup: 'Application no Discord Developer Portal' },
  { name: 'Twitter', icon: '🐦', setup: 'App no Twitter Developer Portal' },
  { name: 'Facebook', icon: '📘', setup: 'App no Facebook for Developers' },
  { name: 'Apple', icon: '🍎', setup: 'Sign in with Apple configuration' }
];

const realtimeExamples = [
  {
    name: 'Database Changes',
    description: 'Escutar mudanças em tabelas',
    code: `supabase
  .channel('public:posts')
  .on('postgres_changes', {
    event: '*',
    schema: 'public',
    table: 'posts'
  }, (payload) => {
    console.log('Change received!', payload)
  })
  .subscribe()`
  },
  {
    name: 'Presence',
    description: 'Usuários online em tempo real',
    code: `const channel = supabase.channel('room1')

channel
  .on('presence', { event: 'sync' }, () => {
    const newState = channel.presenceState()
    console.log('sync', newState)
  })
  .on('presence', { event: 'join' }, ({ key, newPresences }) => {
    console.log('join', key, newPresences)
  })
  .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
    console.log('leave', key, leftPresences)
  })
  .subscribe(async (status) => {
    if (status !== 'SUBSCRIBED') { return }
    
    await channel.track({
      user: 'user-1',
      online_at: new Date().toISOString(),
    })
  })`
  },
  {
    name: 'Broadcast',
    description: 'Mensagens em tempo real',
    code: `const channel = supabase.channel('room1')

// Escutar mensagens
channel
  .on('broadcast', { event: 'test' }, (payload) => {
    console.log(payload)
  })
  .subscribe()

// Enviar mensagem
channel.send({
  type: 'broadcast',
  event: 'test',
  payload: { message: 'hello world' }
})`
  }
];

// Mock data
const mockUsers = [
  { id: '1', email: 'joao@example.com', name: 'João Silva', avatar_url: null, created_at: '2024-01-15' },
  { id: '2', email: 'maria@example.com', name: 'Maria Santos', avatar_url: null, created_at: '2024-01-16' }
];

const mockPosts = [
  { id: 1, title: 'Primeiro Post', content: 'Conteúdo do primeiro post...', user_id: '1', created_at: '2024-01-15' },
  { id: 2, title: 'Segundo Post', content: 'Conteúdo do segundo post...', user_id: '2', created_at: '2024-01-16' }
];

export default function SupabasePage() {
  const [selectedTab, setSelectedTab] = useState('database');
  const [selectedAuth, setSelectedAuth] = useState('email');
  const [selectedRealtime, setSelectedRealtime] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [queryResult, setQueryResult] = useState(null);

  const simulateQuery = (operation: string) => {
    setTimeout(() => {
      switch (operation) {
        case 'select':
          setQueryResult(mockPosts);
          break;
        case 'insert':
          setQueryResult({ id: 3, title: 'Novo Post', content: 'Conteúdo...', user_id: '1' });
          break;
        case 'update':
          setQueryResult({ ...mockPosts[0], title: 'Post Atualizado' });
          break;
        case 'delete':
          setQueryResult({ message: 'Post deletado com sucesso' });
          break;
        default:
          setQueryResult(null);
      }
    }, 500);
  };

  const toggleConnection = () => {
    setIsConnected(!isConnected);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-br from-green-500 to-green-700 rounded-xl text-white mr-4">
              <Cloud className="h-8 w-8" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
              Supabase
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Backend as a Service (BaaS) com PostgreSQL, autenticação, storage e real-time. 
            A alternativa open-source ao Firebase.
          </p>
        </motion.div>

        {/* Features Overview */}
        <DemoSection title="Recursos Principais" description="Tudo que você precisa para construir aplicações modernas">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {supabaseFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <DemoCardStatic title={feature.title} description={feature.description}>
                    <div className="text-center space-y-4">
                      <Icon className={`h-12 w-12 mx-auto ${feature.color}`} />
                      <div className="space-y-2">
                        {feature.features.map((item) => (
                          <div key={item} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 flex-shrink-0" />
                            {item}
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

        {/* Setup & Installation */}
        <DemoSection title="Configuração Inicial" description="Como começar com Supabase">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <DemoCardStatic title="Instalação" description="Instalar cliente Supabase">
              <CodeBlock
                language="bash"
                code={`# Instalar cliente Supabase
npm install @supabase/supabase-js

# Para Next.js com SSR
npm install @supabase/ssr

# CLI para gerenciamento local
npm install -g supabase

# Inicializar projeto local
supabase init
supabase start`}
              />
            </DemoCardStatic>

            <DemoCardStatic title="Configuração" description="Setup do cliente">
              <CodeBlock
                language="typescript"
                code={`// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Para Next.js App Router
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )
}`}
              />
            </DemoCardStatic>
          </div>
        </DemoSection>

        {/* Interactive Examples */}
        <DemoSection title="Exemplos Interativos" description="Teste as funcionalidades do Supabase">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8 px-6">
                {['database', 'auth', 'realtime', 'storage'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setSelectedTab(tab)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                      selectedTab === tab
                        ? 'border-green-500 text-green-600 dark:text-green-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    {tab === 'database' ? 'Database' : 
                     tab === 'auth' ? 'Authentication' :
                     tab === 'realtime' ? 'Real-time' : 'Storage'}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="p-6">
              {selectedTab === 'database' && (
                <div className="space-y-6">
                  <div className="grid lg:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Operações CRUD</h3>
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <button
                          onClick={() => simulateQuery('select')}
                          className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                        >
                          SELECT
                        </button>
                        <button
                          onClick={() => simulateQuery('insert')}
                          className="p-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                        >
                          INSERT
                        </button>
                        <button
                          onClick={() => simulateQuery('update')}
                          className="p-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                        >
                          UPDATE
                        </button>
                        <button
                          onClick={() => simulateQuery('delete')}
                          className="p-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                        >
                          DELETE
                        </button>
                      </div>
                      
                      <CodeBlock
                        language="typescript"
                        code={`// SELECT
const { data, error } = await supabase
  .from('posts')
  .select('*')
  .eq('published', true)
  .order('created_at', { ascending: false })

// INSERT
const { data, error } = await supabase
  .from('posts')
  .insert({
    title: 'Novo Post',
    content: 'Conteúdo do post...',
    user_id: user.id
  })
  .select()

// UPDATE
const { data, error } = await supabase
  .from('posts')
  .update({ title: 'Título Atualizado' })
  .eq('id', postId)
  .select()

// DELETE
const { error } = await supabase
  .from('posts')
  .delete()
  .eq('id', postId)`}
                      />
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Resultado</h3>
                      <div className="bg-gray-900 rounded-lg p-4 min-h-[300px]">
                        {queryResult ? (
                          <motion.pre 
                            className="text-green-400 text-sm overflow-auto"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            {JSON.stringify(queryResult, null, 2)}
                          </motion.pre>
                        ) : (
                          <div className="flex items-center justify-center h-full text-gray-500">
                            <div className="text-center">
                              <Database className="h-12 w-12 mx-auto mb-4 opacity-50" />
                              <p>Execute uma operação para ver o resultado</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {selectedTab === 'auth' && (
                <div className="space-y-6">
                  <div className="grid lg:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Métodos de Autenticação</h3>
                      <div className="space-y-3 mb-6">
                        {['email', 'magic-link', 'oauth'].map((method) => (
                          <button
                            key={method}
                            onClick={() => setSelectedAuth(method)}
                            className={`w-full p-3 rounded-lg transition-colors text-left ${
                              selectedAuth === method
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                            }`}
                          >
                            {method === 'email' ? '📧 Email & Password' :
                             method === 'magic-link' ? '✨ Magic Link' : '🔗 OAuth Providers'}
                          </button>
                        ))}
                      </div>
                      
                      {selectedAuth === 'oauth' && (
                        <div className="grid grid-cols-3 gap-2 mb-4">
                          {authProviders.map((provider) => (
                            <div key={provider.name} className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                              <div className="text-2xl mb-1">{provider.icon}</div>
                              <div className="text-xs text-gray-600 dark:text-gray-300">{provider.name}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Código de Exemplo</h3>
                      {selectedAuth === 'email' && (
                        <CodeBlock
                          language="typescript"
                          code={`// Sign Up
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123',
  options: {
    data: {
      first_name: 'João',
      last_name: 'Silva'
    }
  }
})

// Sign In
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123'
})

// Sign Out
const { error } = await supabase.auth.signOut()

// Get User
const { data: { user } } = await supabase.auth.getUser()`}
                        />
                      )}
                      
                      {selectedAuth === 'magic-link' && (
                        <CodeBlock
                          language="typescript"
                          code={`// Send Magic Link
const { data, error } = await supabase.auth.signInWithOtp({
  email: 'user@example.com',
  options: {
    emailRedirectTo: 'https://example.com/welcome'
  }
})

// Verify OTP
const { data, error } = await supabase.auth.verifyOtp({
  email: 'user@example.com',
  token: '123456',
  type: 'email'
})

// Phone OTP
const { data, error } = await supabase.auth.signInWithOtp({
  phone: '+5511999999999'
})`}
                        />
                      )}
                      
                      {selectedAuth === 'oauth' && (
                        <CodeBlock
                          language="typescript"
                          code={`// OAuth Sign In
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    redirectTo: 'https://example.com/auth/callback',
    scopes: 'email profile'
  }
})

// GitHub
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'github'
})

// Discord
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'discord'
})

// Listen to auth changes
supabase.auth.onAuthStateChange((event, session) => {
  console.log(event, session)
})`}
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              {selectedTab === 'realtime' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Real-time Features</h3>
                    <button
                      onClick={toggleConnection}
                      className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                        isConnected 
                          ? 'bg-red-500 hover:bg-red-600 text-white'
                          : 'bg-green-500 hover:bg-green-600 text-white'
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        isConnected ? 'bg-white' : 'bg-white'
                      }`} />
                      {isConnected ? 'Disconnect' : 'Connect'}
                    </button>
                  </div>
                  
                  <div className="grid lg:grid-cols-3 gap-4 mb-6">
                    {realtimeExamples.map((example, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedRealtime(index)}
                        className={`p-4 rounded-lg text-left transition-colors ${
                          selectedRealtime === index
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        <h4 className="font-medium mb-2">{example.name}</h4>
                        <p className="text-sm opacity-90">{example.description}</p>
                      </button>
                    ))}
                  </div>
                  
                  <CodeBlock
                    language="typescript"
                    code={realtimeExamples[selectedRealtime].code}
                  />
                </div>
              )}
              
              {selectedTab === 'storage' && (
                <div className="space-y-6">
                  <div className="grid lg:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">File Operations</h3>
                      <div className="space-y-4">
                        <div className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-center">
                          <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                          <p className="text-gray-600 dark:text-gray-300">Drag & drop files here</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">or click to browse</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                          <button className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                            Upload File
                          </button>
                          <button className="p-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors">
                            List Files
                          </button>
                          <button className="p-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors">
                            Download
                          </button>
                          <button className="p-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors">
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Storage Examples</h3>
                      <CodeBlock
                        language="typescript"
                        code={`// Upload file
const { data, error } = await supabase.storage
  .from('avatars')
  .upload('public/avatar1.png', file, {
    cacheControl: '3600',
    upsert: false
  })

// Download file
const { data, error } = await supabase.storage
  .from('avatars')
  .download('public/avatar1.png')

// Get public URL
const { data } = supabase.storage
  .from('avatars')
  .getPublicUrl('public/avatar1.png')

// List files
const { data, error } = await supabase.storage
  .from('avatars')
  .list('public', {
    limit: 100,
    offset: 0,
    sortBy: { column: 'name', order: 'asc' }
  })

// Delete file
const { data, error } = await supabase.storage
  .from('avatars')
  .remove(['public/avatar1.png'])

// Create signed URL
const { data, error } = await supabase.storage
  .from('avatars')
  .createSignedUrl('public/avatar1.png', 60)`}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </DemoSection>

        {/* Row Level Security */}
        <DemoSection title="Row Level Security (RLS)" description="Segurança a nível de linha para controle de acesso granular">
          <div className="grid md:grid-cols-2 gap-6">
            <DemoCardStatic title="Políticas de Segurança" description="Controle quem pode acessar quais dados">
              <CodeBlock
                language="sql"
                code={`-- Habilitar RLS na tabela
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Política para leitura (todos podem ler posts públicos)
CREATE POLICY "Posts públicos são visíveis para todos" ON posts
  FOR SELECT USING (published = true);

-- Política para inserção (usuários autenticados)
CREATE POLICY "Usuários podem criar posts" ON posts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Política para atualização (apenas o autor)
CREATE POLICY "Usuários podem editar seus posts" ON posts
  FOR UPDATE USING (auth.uid() = user_id);

-- Política para exclusão (apenas o autor)
CREATE POLICY "Usuários podem deletar seus posts" ON posts
  FOR DELETE USING (auth.uid() = user_id);`}
              />
            </DemoCardStatic>

            <DemoCardStatic title="Políticas Avançadas" description="Controle de acesso baseado em roles">
              <CodeBlock
                language="sql"
                code={`-- Função para verificar role do usuário
CREATE OR REPLACE FUNCTION auth.user_role()
RETURNS TEXT AS $$
  SELECT raw_user_meta_data->>'role'
  FROM auth.users
  WHERE id = auth.uid()
$$ LANGUAGE SQL SECURITY DEFINER;

-- Política para admins
CREATE POLICY "Admins podem fazer tudo" ON posts
  FOR ALL USING (auth.user_role() = 'admin');

-- Política baseada em relacionamento
CREATE POLICY "Membros do time podem editar" ON posts
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM team_members tm
      WHERE tm.user_id = auth.uid()
      AND tm.team_id = posts.team_id
    )
  );

-- Política com condições complexas
CREATE POLICY "Acesso baseado em subscription" ON premium_content
  FOR SELECT USING (
    auth.uid() IS NOT NULL
    AND (
      auth.user_role() = 'premium'
      OR EXISTS (
        SELECT 1 FROM subscriptions s
        WHERE s.user_id = auth.uid()
        AND s.status = 'active'
        AND s.expires_at > NOW()
      )
    )
  );`}
              />            </DemoCardStatic>
          </div>
        </DemoSection>

        {/* Best Practices */}
        <DemoSection title="Melhores Práticas" description="Diretrizes para usar Supabase eficientemente">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-green-500" />
                  Segurança
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Sempre use Row Level Security (RLS)</li>
                  <li>• Valide dados no cliente e servidor</li>
                  <li>• Use service_role apenas no backend</li>
                  <li>• Implemente rate limiting</li>
                  <li>• Configure CORS adequadamente</li>
                  <li>• Use HTTPS em produção</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-yellow-500" />
                  Performance
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Use select() para campos específicos</li>
                  <li>• Implemente paginação adequada</li>
                  <li>• Configure índices no banco</li>
                  <li>• Use connection pooling</li>
                  <li>• Cache dados quando possível</li>
                  <li>• Otimize queries complexas</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Code className="h-5 w-5 mr-2 text-blue-500" />
                  Desenvolvimento
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Use TypeScript para type safety</li>
                  <li>• Gere tipos do schema automaticamente</li>
                  <li>• Teste localmente com CLI</li>
                  <li>• Use migrations para mudanças</li>
                  <li>• Monitore logs e métricas</li>
                  <li>• Documente políticas RLS</li>
                </ul>
              </div>
            </div>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}