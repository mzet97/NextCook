'use client';

import { useState } from 'react';
import Link from 'next/link';
import CodeBlock from '@/components/CodeBlock';
import DemoSection from '@/components/DemoSection';
import { 
  ServerIcon,
  CloudArrowUpIcon,
  ShieldCheckIcon,
  BoltIcon,
  CpuChipIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

// Simulador de Route Handlers
function RouteHandlerDemo() {
  const [selectedEndpoint, setSelectedEndpoint] = useState('users');
  const [requestMethod, setRequestMethod] = useState('GET');
  const [requestBody, setRequestBody] = useState('');
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const endpoints = {
    users: {
      name: 'Users API',
      path: '/api/users',
      methods: ['GET', 'POST'],
      description: 'CRUD operations for users'
    },
    auth: {
      name: 'Authentication',
      path: '/api/auth',
      methods: ['POST'],
      description: 'Login and token generation'
    },
    upload: {
      name: 'File Upload',
      path: '/api/upload',
      methods: ['POST'],
      description: 'Handle file uploads'
    },
    webhook: {
      name: 'Webhook',
      path: '/api/webhook',
      methods: ['POST'],
      description: 'Process webhook events'
    },
    stream: {
      name: 'Streaming',
      path: '/api/stream',
      methods: ['GET'],
      description: 'Server-sent events'
    },
    revalidate: {
      name: 'Revalidation',
      path: '/api/revalidate',
      methods: ['POST'],
      description: 'Trigger ISR revalidation'
    }
  };

  const simulateRequest = async () => {
    setLoading(true);
    setResponse(null);

    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 1000));

    const endpoint = endpoints[selectedEndpoint as keyof typeof endpoints];
    let mockResponse;

    switch (selectedEndpoint) {
      case 'users':
        if (requestMethod === 'GET') {
          mockResponse = {
            status: 200,
            data: [
              { id: 1, name: 'João Silva', email: 'joao@example.com' },
              { id: 2, name: 'Maria Santos', email: 'maria@example.com' }
            ],
            headers: {
              'Content-Type': 'application/json',
              'X-Total-Count': '2'
            }
          };
        } else {
          mockResponse = {
            status: 201,
            data: {
              id: 3,
              name: 'Novo Usuário',
              email: 'novo@example.com',
              createdAt: new Date().toISOString()
            },
            headers: {
              'Content-Type': 'application/json',
              'Location': '/api/users/3'
            }
          };
        }
        break;

      case 'auth':
        mockResponse = {
          status: 200,
          data: {
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            user: {
              id: 1,
              name: 'João Silva',
              role: 'user'
            },
            expiresIn: 3600
          },
          headers: {
            'Content-Type': 'application/json',
            'Set-Cookie': 'auth-token=...; HttpOnly; Secure'
          }
        };
        break;

      case 'upload':
        mockResponse = {
          status: 200,
          data: {
            filename: 'document.pdf',
            size: 1024000,
            url: 'https://example.com/uploads/document.pdf',
            uploadedAt: new Date().toISOString()
          },
          headers: {
            'Content-Type': 'application/json'
          }
        };
        break;

      case 'webhook':
        mockResponse = {
          status: 200,
          data: {
            received: true,
            eventType: 'payment.completed',
            processedAt: new Date().toISOString()
          },
          headers: {
            'Content-Type': 'application/json'
          }
        };
        break;

      case 'stream':
        mockResponse = {
          status: 200,
          data: 'data: {"message": "Hello from SSE", "timestamp": "' + new Date().toISOString() + '"}\n\n',
          headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
          }
        };
        break;

      case 'revalidate':
        mockResponse = {
          status: 200,
          data: {
            revalidated: true,
            paths: ['/products', '/categories'],
            timestamp: new Date().toISOString()
          },
          headers: {
            'Content-Type': 'application/json'
          }
        };
        break;

      default:
        mockResponse = {
          status: 404,
          data: { error: 'Endpoint not found' },
          headers: { 'Content-Type': 'application/json' }
        };
    }

    setResponse(mockResponse);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Endpoint</h3>
          <div className="space-y-2">
            {Object.entries(endpoints).map(([key, endpoint]) => (
              <button
                key={key}
                onClick={() => setSelectedEndpoint(key)}
                className={`w-full p-3 rounded-lg text-left transition-colors ${
                  selectedEndpoint === key
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                <div className="font-medium">{endpoint.name}</div>
                <div className="text-sm opacity-75">{endpoint.path}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Configuração</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Método HTTP
              </label>
              <div className="flex gap-2">
                {endpoints[selectedEndpoint as keyof typeof endpoints].methods.map(method => (
                  <button
                    key={method}
                    onClick={() => setRequestMethod(method)}
                    className={`px-3 py-1 rounded text-sm transition-colors ${
                      requestMethod === method
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            {requestMethod !== 'GET' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Request Body (JSON)
                </label>
                <textarea
                  value={requestBody}
                  onChange={(e) => setRequestBody(e.target.value)}
                  placeholder='{"name": "João", "email": "joao@example.com"}'
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  rows={4}
                />
              </div>
            )}

            <button
              onClick={simulateRequest}
              disabled={loading}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Enviando...' : 'Enviar Requisição'}
            </button>
          </div>
        </div>
      </div>

      {response && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Resposta</h3>
          <div className="space-y-4">
            <div className={`p-3 rounded-lg ${
              response.status >= 200 && response.status < 300
                ? 'bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700'
                : 'bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700'
            }`}>
              <div className="font-medium text-sm">
                Status: <span className={response.status >= 200 && response.status < 300 ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}>
                  {response.status}
                </span>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Headers:</h4>
              <pre className="text-xs bg-gray-800 text-gray-200 p-3 rounded overflow-x-auto">
                {JSON.stringify(response.headers, null, 2)}
              </pre>
            </div>

            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Body:</h4>
              <pre className="text-xs bg-gray-800 text-gray-200 p-3 rounded overflow-x-auto">
                {typeof response.data === 'string' ? response.data : JSON.stringify(response.data, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function RouteHandlersPage() {
  const codeExamples = {
    basicCRUD: `// app/api/users/route.ts - CRUD básico
import { NextRequest, NextResponse } from 'next/server';

// GET - Listar usuários
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1';
  const limit = searchParams.get('limit') || '10';
  
  try {
    const users = await getUsersPaginated({
      page: parseInt(page),
      limit: parseInt(limit)
    });
    
    return NextResponse.json({
      users,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: users.length
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

// POST - Criar usuário
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validação
    const { name, email, password } = body;
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const user = await createUser({ name, email, password });
    
    return NextResponse.json(
      { user: { id: user.id, name: user.name, email: user.email } },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}`,

    dynamicRoutes: `// app/api/users/[id]/route.ts - Rotas dinâmicas
import { NextRequest, NextResponse } from 'next/server';

// GET - Buscar usuário por ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getUserById(params.id);
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}

// PUT - Atualizar usuário
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const user = await updateUser(params.id, body);
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}

// DELETE - Remover usuário
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deleted = await deleteUser(params.id);
    
    if (!deleted) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { message: 'User deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}`,

    fileUpload: `// app/api/upload/route.ts - Upload de arquivos
import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }
    
    // Validações
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large' },
        { status: 400 }
      );
    }
    
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type' },
        { status: 400 }
      );
    }
    
    // Salvar arquivo
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const filename = \`\${Date.now()}-\${file.name}\`;
    const filepath = path.join(process.cwd(), 'public/uploads', filename);
    
    await writeFile(filepath, buffer);
    
    return NextResponse.json({
      message: 'File uploaded successfully',
      filename,
      size: file.size,
      type: file.type,
      url: \`/uploads/\${filename}\`
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    );
  }
}`,

    authentication: `// app/api/auth/login/route.ts - Autenticação
import { NextRequest, NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import bcrypt from 'bcryptjs';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    // Validação
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password required' },
        { status: 400 }
      );
    }
    
    // Buscar usuário
    const user = await getUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    // Verificar senha
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    // Gerar JWT
    const token = await new SignJWT({
      sub: user.id,
      email: user.email,
      role: user.role
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('24h')
      .sign(secret);
    
    // Configurar cookie
    const response = NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    });
    
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400 // 24 hours
    });
    
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}`,

    middleware: `// middleware.ts - Middleware global
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(request: NextRequest) {
  // Aplicar apenas em rotas protegidas
  if (request.nextUrl.pathname.startsWith('/api/protected')) {
    const token = request.cookies.get('auth-token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    try {
      const { payload } = await jwtVerify(token, secret);
      
      // Adicionar dados do usuário aos headers
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-user-id', payload.sub as string);
      requestHeaders.set('x-user-email', payload.email as string);
      requestHeaders.set('x-user-role', payload.role as string);
      
      return NextResponse.next({
        request: {
          headers: requestHeaders
        }
      });
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/protected/:path*']
};`,

    streaming: `// app/api/stream/route.ts - Server-Sent Events
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const encoder = new TextEncoder();
  
  const stream = new ReadableStream({
    start(controller) {
      // Função para enviar eventos
      const sendEvent = (data: any) => {
        const formatted = \`data: \${JSON.stringify(data)}\\n\\n\`;
        controller.enqueue(encoder.encode(formatted));
      };
      
      // Evento inicial
      sendEvent({
        type: 'connected',
        message: 'Stream connected',
        timestamp: new Date().toISOString()
      });
      
      // Enviar dados periódicos
      const interval = setInterval(() => {
        sendEvent({
          type: 'update',
          data: {
            timestamp: new Date().toISOString(),
            random: Math.random(),
            counter: Date.now()
          }
        });
      }, 1000);
      
      // Cleanup após 30 segundos
      setTimeout(() => {
        sendEvent({
          type: 'disconnect',
          message: 'Stream ending'
        });
        clearInterval(interval);
        controller.close();
      }, 30000);
      
      // Cleanup quando cliente desconecta
      request.signal.addEventListener('abort', () => {
        clearInterval(interval);
        controller.close();
      });
    }
  });
  
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*'
    }
  });
}`,

    webhooks: `// app/api/webhooks/stripe/route.ts - Webhook handler
import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = headers().get('stripe-signature')!;
    
    // Verificar assinatura do webhook
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        webhookSecret
      );
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }
    
    // Processar eventos
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await handlePaymentSuccess(paymentIntent);
        break;
        
      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object as Stripe.PaymentIntent;
        await handlePaymentFailure(failedPayment);
        break;
        
      case 'customer.subscription.created':
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionCreated(subscription);
        break;
        
      default:
        console.log(\`Unhandled event type: \${event.type}\`);
    }
    
    return NextResponse.json({ received: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}`,

    validation: `// app/api/users/route.ts - Validação com Zod
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Schema de validação
const createUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  age: z.number().min(18, 'Must be at least 18 years old').optional(),
  role: z.enum(['user', 'admin']).default('user')
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar dados
    const validationResult = createUserSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationResult.error.errors
        },
        { status: 400 }
      );
    }
    
    const userData = validationResult.data;
    
    // Verificar se email já existe
    const existingUser = await getUserByEmail(userData.email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 409 }
      );
    }
    
    // Criar usuário
    const user = await createUser(userData);
    
    return NextResponse.json(
      {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}`,

    rateLimit: `// app/api/protected/route.ts - Rate limiting
import { NextRequest, NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Configurar rate limiting
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '1 m'), // 10 requests per minute
  analytics: true
});

export async function GET(request: NextRequest) {
  try {
    // Identificar cliente (IP ou user ID)
    const identifier = request.ip ?? 'anonymous';
    
    // Verificar rate limit
    const { success, limit, reset, remaining } = await ratelimit.limit(
      identifier
    );
    
    if (!success) {
      return NextResponse.json(
        {
          error: 'Rate limit exceeded',
          limit,
          reset,
          remaining
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': remaining.toString(),
            'X-RateLimit-Reset': reset.toString()
          }
        }
      );
    }
    
    // Processar request normalmente
    const data = await getProtectedData();
    
    return NextResponse.json(
      { data },
      {
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': reset.toString()
        }
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}`
  };

  const apiFeatures = [
    {
      feature: 'CRUD Operations',
      description: 'Create, Read, Update, Delete com validação',
      icon: <ServerIcon className="h-6 w-6" />,
      color: 'blue',
      methods: ['GET', 'POST', 'PUT', 'DELETE']
    },
    {
      feature: 'File Upload',
      description: 'Upload seguro com validação de tipo e tamanho',
      icon: <CloudArrowUpIcon className="h-6 w-6" />,
      color: 'green',
      methods: ['POST']
    },
    {
      feature: 'Authentication',
      description: 'JWT, cookies seguros, middleware de auth',
      icon: <ShieldCheckIcon className="h-6 w-6" />,
      color: 'purple',
      methods: ['POST']
    },
    {
      feature: 'Real-time Streaming',
      description: 'Server-Sent Events para dados em tempo real',
      icon: <BoltIcon className="h-6 w-6" />,
      color: 'yellow',
      methods: ['GET']
    },
    {
      feature: 'Webhooks',
      description: 'Processamento de eventos externos',
      icon: <CpuChipIcon className="h-6 w-6" />,
      color: 'red',
      methods: ['POST']
    },
    {
      feature: 'Validation & Rate Limiting',
      description: 'Zod validation e rate limiting com Redis',
      icon: <DocumentTextIcon className="h-6 w-6" />,
      color: 'indigo',
      methods: ['ALL']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            API Routes (Route Handlers)
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Crie APIs robustas e escaláveis com Route Handlers do Next.js
          </p>
        </div>

        <div className="space-y-12">
          {/* Features Overview */}
          <DemoSection
            title="Recursos das API Routes"
            description="Funcionalidades avançadas para APIs modernas"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {apiFeatures.map((feature) => (
                <div key={feature.feature} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`text-${feature.color}-500`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      {feature.feature}
                    </h3>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {feature.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1">
                    {feature.methods.map((method) => (
                      <span key={method} className={`px-2 py-1 text-xs rounded bg-${feature.color}-100 text-${feature.color}-800 dark:bg-${feature.color}-900 dark:text-${feature.color}-200`}>
                        {method}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </DemoSection>

          {/* Demo Interativo */}
          <DemoSection
            title="Simulador de API Routes"
            description="Teste diferentes endpoints e métodos HTTP"
          >
            <RouteHandlerDemo />
          </DemoSection>

          {/* CRUD Básico */}
          <DemoSection
            title="CRUD Operations"
            description="Operações básicas de Create, Read, Update, Delete"
          >
            <CodeBlock
              code={codeExamples.basicCRUD}
              language="typescript"
              filename="app/api/users/route.ts"
            />
          </DemoSection>

          {/* Rotas Dinâmicas */}
          <DemoSection
            title="Rotas Dinâmicas"
            description="Manipule parâmetros de URL em suas APIs"
          >
            <CodeBlock
              code={codeExamples.dynamicRoutes}
              language="typescript"
              filename="app/api/users/[id]/route.ts"
            />
          </DemoSection>

          {/* Upload de Arquivos */}
          <DemoSection
            title="Upload de Arquivos"
            description="Processamento seguro de uploads com validação"
          >
            <CodeBlock
              code={codeExamples.fileUpload}
              language="typescript"
              filename="app/api/upload/route.ts"
            />
          </DemoSection>

          {/* Autenticação */}
          <DemoSection
            title="Autenticação JWT"
            description="Sistema completo de login com JWT e cookies"
          >
            <CodeBlock
              code={codeExamples.authentication}
              language="typescript"
              filename="app/api/auth/login/route.ts"
            />
          </DemoSection>

          {/* Middleware */}
          <DemoSection
            title="Middleware de Autenticação"
            description="Proteja rotas com middleware global"
          >
            <CodeBlock
              code={codeExamples.middleware}
              language="typescript"
              filename="middleware.ts"
            />
          </DemoSection>

          {/* Streaming */}
          <DemoSection
            title="Server-Sent Events"
            description="Dados em tempo real com streaming"
          >
            <CodeBlock
              code={codeExamples.streaming}
              language="typescript"
              filename="app/api/stream/route.ts"
            />
          </DemoSection>

          {/* Webhooks */}
          <DemoSection
            title="Webhook Processing"
            description="Processe eventos de serviços externos"
          >
            <CodeBlock
              code={codeExamples.webhooks}
              language="typescript"
              filename="app/api/webhooks/stripe/route.ts"
            />
          </DemoSection>

          {/* Validação */}
          <DemoSection
            title="Validação com Zod"
            description="Validação robusta de dados de entrada"
          >
            <CodeBlock
              code={codeExamples.validation}
              language="typescript"
              filename="app/api/users/route.ts"
            />
          </DemoSection>

          {/* Rate Limiting */}
          <DemoSection
            title="Rate Limiting"
            description="Proteja suas APIs contra abuso"
          >
            <CodeBlock
              code={codeExamples.rateLimit}
              language="typescript"
              filename="app/api/protected/route.ts"
            />
          </DemoSection>

          {/* Links de Navegação */}
          <div className="flex justify-between items-center pt-8 border-t border-gray-200 dark:border-gray-700">
            <Link
              href="/nextjs/route-groups"
              className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors"
            >
              <span>← Route Groups</span>
            </Link>
            
            <Link
              href="/nextjs"
              className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              Voltar ao Next.js
            </Link>
            
            <span className="text-gray-400 dark:text-gray-500">
              Fim das features
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}