'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Lock, 
  Key,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Code,
  Server,
  Globe,
  RefreshCw,
  Eye,
  EyeOff,
  Copy,
  Play,
  Settings,
  FileText,
  Database,
  Zap
} from 'lucide-react';
import { DemoCard } from '@/components/DemoCard';
import { DemoCardStatic } from '@/components/DemoCardStatic';
import { DemoSection } from '@/components/DemoSection';

const csrfMethods = [
  {
    name: 'Synchronizer Token Pattern',
    description: 'Token único gerado pelo servidor e validado em cada requisição',
    implementation: 'Double Submit Cookie',
    security: 'High',
    complexity: 'Medium',
    pros: ['Altamente seguro', 'Padrão da indústria', 'Suporte amplo'],
    cons: ['Requer estado no servidor', 'Complexidade adicional']
  },
  {
    name: 'SameSite Cookies',
    description: 'Atributo de cookie que previne envio em requisições cross-site',
    implementation: 'Cookie Attribute',
    security: 'Medium',
    complexity: 'Low',
    pros: ['Simples implementação', 'Suporte nativo', 'Sem JavaScript'],
    cons: ['Suporte limitado em browsers antigos', 'Não funciona com subdomínios']
  },
  {
    name: 'Origin Header Validation',
    description: 'Verificação do header Origin em requisições state-changing',
    implementation: 'Header Check',
    security: 'Medium',
    complexity: 'Low',
    pros: ['Implementação simples', 'Sem estado', 'Performance alta'],
    cons: ['Pode ser contornado', 'Dependente do browser']
  },
  {
    name: 'Custom Headers',
    description: 'Headers customizados que não podem ser definidos por formulários',
    implementation: 'X-Requested-With',
    security: 'Medium',
    complexity: 'Low',
    pros: ['Simples', 'Compatível com AJAX', 'Sem estado'],
    cons: ['Não funciona com formulários HTML', 'Pode ser contornado']
  }
];

const vulnerabilityExamples = [
  {
    title: 'Transferência Bancária Maliciosa',
    description: 'Atacante induz usuário a transferir dinheiro sem conhecimento',
    attack: `<!-- Site malicioso -->
<form action="https://bank.com/transfer" method="POST">
  <input type="hidden" name="to" value="attacker-account" />
  <input type="hidden" name="amount" value="10000" />
  <input type="submit" value="Clique aqui para ganhar prêmio!" />
</form>`,
    impact: 'Perda financeira, roubo de fundos',
    prevention: 'Token CSRF, validação de origem'
  },
  {
    title: 'Alteração de Email',
    description: 'Mudança não autorizada de email da conta do usuário',
    attack: `<!-- Requisição AJAX maliciosa -->
<script>
fetch('https://app.com/api/user/email', {
  method: 'POST',
  credentials: 'include',
  body: JSON.stringify({
    email: 'attacker@evil.com'
  })
});
</script>`,
    impact: 'Comprometimento da conta, perda de acesso',
    prevention: 'Token CSRF, SameSite cookies'
  },
  {
    title: 'Exclusão de Dados',
    description: 'Remoção não autorizada de dados importantes',
    attack: `<!-- Imagem com requisição maliciosa -->
<img src="https://app.com/api/delete-account" 
     style="display:none" />`,
    impact: 'Perda de dados, interrupção do serviço',
    prevention: 'Validação de método HTTP, tokens CSRF'
  }
];

const implementationExamples = {
  nextjs: {
    middleware: `// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export function middleware(request: NextRequest) {
  // Gerar token CSRF para requisições GET
  if (request.method === 'GET') {
    const response = NextResponse.next();
    const csrfToken = generateCSRFToken();
    
    response.cookies.set('csrf-token', csrfToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict'
    });
    
    return response;
  }
  
  // Validar token CSRF para requisições state-changing
  if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method)) {
    const csrfToken = request.headers.get('x-csrf-token');
    const cookieToken = request.cookies.get('csrf-token')?.value;
    
    if (!csrfToken || csrfToken !== cookieToken) {
      return new NextResponse('CSRF token mismatch', { status: 403 });
    }
  }
  
  return NextResponse.next();
}

function generateCSRFToken(): string {
  return crypto.randomUUID();
}

export const config = {
  matcher: '/api/:path*'
};`,
    hook: `// hooks/useCSRF.ts
import { useState, useEffect } from 'react';

export function useCSRF() {
  const [csrfToken, setCSRFToken] = useState<string>('');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchCSRFToken();
  }, []);
  
  const fetchCSRFToken = async () => {
    try {
      const response = await fetch('/api/csrf-token');
      const data = await response.json();
      setCSRFToken(data.token);
    } catch (error) {
      console.error('Erro ao obter token CSRF:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const makeSecureRequest = async (url: string, options: RequestInit = {}) => {
    const headers = {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken,
      ...options.headers
    };
    
    return fetch(url, {
      ...options,
      headers,
      credentials: 'include'
    });
  };
  
  return {
    csrfToken,
    loading,
    makeSecureRequest,
    refreshToken: fetchCSRFToken
  };
}`,
    api: `// app/api/csrf-token/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';

export async function GET() {
  const token = crypto.randomUUID();
  
  const cookieStore = cookies();
  cookieStore.set('csrf-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 // 24 horas
  });
  
  return NextResponse.json({ token });
}

// app/api/protected/route.ts
export async function POST(request: NextRequest) {
  const csrfToken = request.headers.get('x-csrf-token');
  const cookieStore = cookies();
  const cookieToken = cookieStore.get('csrf-token')?.value;
  
  if (!csrfToken || csrfToken !== cookieToken) {
    return NextResponse.json(
      { error: 'CSRF token inválido' },
      { status: 403 }
    );
  }
  
  // Processar requisição segura
  const body = await request.json();
  
  return NextResponse.json({
    message: 'Requisição processada com sucesso',
    data: body
  });
}`,
    component: `// components/SecureForm.tsx
'use client';

import { useState } from 'react';
import { useCSRF } from '@/hooks/useCSRF';

interface FormData {
  name: string;
  email: string;
  message: string;
}

export function SecureForm() {
  const { csrfToken, loading, makeSecureRequest } = useCSRF();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<string>('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const response = await makeSecureRequest('/api/protected', {
        method: 'POST',
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        const data = await response.json();
        setResult('Formulário enviado com sucesso!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setResult('Erro ao enviar formulário');
      }
    } catch (error) {
      setResult('Erro de rede');
    } finally {
      setSubmitting(false);
    }
  };
  
  if (loading) {
    return <div>Carregando token de segurança...</div>;
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="hidden"
        name="_token"
        value={csrfToken}
      />
      
      <div>
        <label className="block text-sm font-medium mb-1">
          Nome:
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">
          Email:
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">
          Mensagem:
        </label>
        <textarea
          value={formData.message}
          onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
          className="w-full p-2 border rounded h-24"
          required
        />
      </div>
      
      <button
        type="submit"
        disabled={submitting}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {submitting ? 'Enviando...' : 'Enviar'}
      </button>
      
      {result && (
        <div className={result.includes('sucesso') 
            ? 'p-2 rounded bg-green-100 text-green-800' 
            : 'p-2 rounded bg-red-100 text-red-800'}>
          {result}
        </div>
      )}
    </form>
  );
}`
  }
};

export default function CSRFPage() {
  const [selectedMethod, setSelectedMethod] = useState(0);
  const [selectedVulnerability, setSelectedVulnerability] = useState(0);
  const [selectedExample, setSelectedExample] = useState<keyof typeof implementationExamples>('nextjs');
  const [selectedCode, setSelectedCode] = useState<keyof typeof implementationExamples.nextjs>('middleware');
  const [showToken, setShowToken] = useState(false);
  const [simulatedToken, setSimulatedToken] = useState('');
  const [requestCount, setRequestCount] = useState(0);
  const [blockedRequests, setBlockedRequests] = useState(0);

  useEffect(() => {
    // Simular geração de token
    setSimulatedToken(crypto.randomUUID());
  }, []);

  const simulateCSRFAttack = () => {
    setRequestCount(prev => prev + 1);
    // Simular bloqueio de requisição sem token
    if (Math.random() > 0.3) {
      setBlockedRequests(prev => prev + 1);
    }
  };

  const getSecurityColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300';
      case 'low': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getComplexityColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300';
      case 'high': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl text-white mr-4">
              <Shield className="h-8 w-8" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
              CSRF Protection
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Proteja sua aplicação contra ataques Cross-Site Request Forgery com 
            implementações robustas de tokens, cookies seguros e validação de origem.
          </p>
        </motion.div>

        {/* CSRF Demo */}
        <DemoSection title="Demo Interativa" description="Simule proteção CSRF em tempo real">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Token CSRF Simulado
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Token Atual:
                      </span>
                      <button
                        onClick={() => setShowToken(!showToken)}
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
                      >
                        {showToken ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    <div className="font-mono text-xs bg-white dark:bg-gray-800 p-2 rounded border">
                      {showToken ? simulatedToken : '••••••••-••••-••••-••••-••••••••••••'}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {requestCount}
                      </div>
                      <div className="text-sm text-blue-700 dark:text-blue-300">
                        Requisições
                      </div>
                    </div>
                    <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                        {blockedRequests}
                      </div>
                      <div className="text-sm text-red-700 dark:text-red-300">
                        Bloqueadas
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={simulateCSRFAttack}
                    className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Simular Ataque CSRF
                  </button>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Status de Proteção
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-green-700 dark:text-green-300">Token Validation</span>
                    </div>
                    <span className="text-green-600 dark:text-green-400 text-sm font-medium">Ativo</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-green-700 dark:text-green-300">SameSite Cookies</span>
                    </div>
                    <span className="text-green-600 dark:text-green-400 text-sm font-medium">Strict</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-green-700 dark:text-green-300">Origin Validation</span>
                    </div>
                    <span className="text-green-600 dark:text-green-400 text-sm font-medium">Ativo</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <div className="flex items-center">
                      <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
                      <span className="text-yellow-700 dark:text-yellow-300">Rate Limiting</span>
                    </div>
                    <span className="text-yellow-600 dark:text-yellow-400 text-sm font-medium">Configurar</span>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-1">
                    Taxa de Bloqueio
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {requestCount > 0 ? Math.round((blockedRequests / requestCount) * 100) : 0}%
                    </div>
                    <div className="text-sm text-blue-700 dark:text-blue-300">
                      Efetividade
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DemoSection>

        {/* CSRF Methods */}
        <DemoSection title="Métodos de Proteção" description="Diferentes abordagens para prevenir ataques CSRF">
          <div className="grid md:grid-cols-2 gap-6">
            {csrfMethods.map((method, index) => (
              <motion.div
                key={method.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {method.name}
                  </h3>
                  <div className="flex space-x-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getSecurityColor(method.security)}`}>
                      {method.security}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getComplexityColor(method.complexity)}`}>
                      {method.complexity}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {method.description}
                </p>
                
                <div className="mb-4">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Implementação: 
                  </span>
                  <span className="text-sm text-blue-600 dark:text-blue-400">
                    {method.implementation}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-green-700 dark:text-green-300 mb-2">
                      Vantagens:
                    </h4>
                    <ul className="space-y-1">
                      {method.pros.map((pro, idx) => (
                        <li key={idx} className="text-xs text-green-600 dark:text-green-400 flex items-center">
                          <CheckCircle className="h-3 w-3 mr-1 flex-shrink-0" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-red-700 dark:text-red-300 mb-2">
                      Desvantagens:
                    </h4>
                    <ul className="space-y-1">
                      {method.cons.map((con, idx) => (
                        <li key={idx} className="text-xs text-red-600 dark:text-red-400 flex items-center">
                          <XCircle className="h-3 w-3 mr-1 flex-shrink-0" />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </DemoSection>

        {/* Vulnerability Examples */}
        <DemoSection title="Exemplos de Vulnerabilidades" description="Ataques CSRF comuns e como preveni-los">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8 px-6 overflow-x-auto">
                {vulnerabilityExamples.map((example, index) => (
                  <button
                    key={example.title}
                    onClick={() => setSelectedVulnerability(index)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                      selectedVulnerability === index
                        ? 'border-red-500 text-red-600 dark:text-red-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    {example.title}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="p-6">
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                    {vulnerabilityExamples[selectedVulnerability].title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {vulnerabilityExamples[selectedVulnerability].description}
                  </p>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <h4 className="font-medium text-red-900 dark:text-red-300 mb-2">
                        Impacto:
                      </h4>
                      <p className="text-red-700 dark:text-red-400 text-sm">
                        {vulnerabilityExamples[selectedVulnerability].impact}
                      </p>
                    </div>
                    
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <h4 className="font-medium text-green-900 dark:text-green-300 mb-2">
                        Prevenção:
                      </h4>
                      <p className="text-green-700 dark:text-green-400 text-sm">
                        {vulnerabilityExamples[selectedVulnerability].prevention}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                    Código do Ataque
                  </h4>
                  <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-sm text-gray-300">
                      <code>{vulnerabilityExamples[selectedVulnerability].attack}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DemoSection>

        {/* Implementation Examples */}
        <DemoSection title="Exemplos de Implementação" description="Código prático para implementar proteção CSRF">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8 px-6 overflow-x-auto">
                {Object.keys(implementationExamples.nextjs).map((key) => (
                  <button
                    key={key}
                    onClick={() => setSelectedCode(key as keyof typeof implementationExamples.nextjs)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                      selectedCode === key
                        ? 'border-red-500 text-red-600 dark:text-red-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {selectedCode.charAt(0).toUpperCase() + selectedCode.slice(1)} Implementation
                </h3>
                <button
                  onClick={() => navigator.clipboard.writeText(implementationExamples.nextjs[selectedCode])}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 dark:text-blue-400"
                >
                  <Copy className="h-4 w-4" />
                  <span className="text-sm">Copiar</span>
                </button>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-gray-300">
                  <code>{implementationExamples.nextjs[selectedCode]}</code>
                </pre>
              </div>
            </div>
          </div>
        </DemoSection>

        {/* Best Practices */}
        <DemoSection title="Melhores Práticas" description="Diretrizes para implementação segura">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-red-500" />
                  Implementação
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Use tokens únicos por sessão</li>
                  <li>• Implemente double submit cookies</li>
                  <li>• Configure SameSite=Strict</li>
                  <li>• Valide Origin/Referer headers</li>
                  <li>• Use HTTPS sempre</li>
                  <li>• Regenere tokens após login</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Lock className="h-5 w-5 mr-2 text-green-500" />
                  Segurança
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Tokens criptograficamente seguros</li>
                  <li>• Expire tokens regularmente</li>
                  <li>• Não exponha tokens em URLs</li>
                  <li>• Use HttpOnly cookies</li>
                  <li>• Implemente rate limiting</li>
                  <li>• Monitore tentativas suspeitas</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Settings className="h-5 w-5 mr-2 text-blue-500" />
                  Configuração
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Configure middleware adequadamente</li>
                  <li>• Teste em diferentes browsers</li>
                  <li>• Documente implementação</li>
                  <li>• Treine equipe de desenvolvimento</li>
                  <li>• Realize auditorias regulares</li>
                  <li>• Mantenha bibliotecas atualizadas</li>
                </ul>
              </div>
            </div>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}