'use client';

import { motion } from 'framer-motion';
import { Code, FileText, Zap, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { DemoSection } from '@/components/DemoSection';
import { CodeBlock } from '@/components/CodeBlock';
import Breadcrumbs from '@/components/Breadcrumbs';
import { DemoCardStatic } from '@/components/DemoCardStatic';

const routeFeatures = [
  {
    title: 'App Router',
    description: 'Sistema moderno de roteamento do Next.js 13+',
    icon: Zap,
    color: 'blue'
  },
  {
    title: 'TypeScript',
    description: 'Suporte nativo com tipagem completa',
    icon: FileText,
    color: 'green'
  },
  {
    title: 'Streaming',
    description: 'Suporte a streaming e Server-Sent Events',
    icon: ArrowRight,
    color: 'purple'
  }
];

const bestPractices = [
  {
    title: 'Nomenclatura Consistente',
    description: 'Use nomes descritivos para suas rotas',
    icon: CheckCircle,
    color: 'green'
  },
  {
    title: 'Tratamento de Erros',
    description: 'Sempre trate erros adequadamente',
    icon: AlertCircle,
    color: 'orange'
  },
  {
    title: 'Validação de Dados',
    description: 'Valide todos os dados de entrada',
    icon: CheckCircle,
    color: 'blue'
  }
];

export default function RouteHandlersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <Breadcrumbs />
        
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🛣️ Route Handlers
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Route Handlers são a nova forma de criar APIs no Next.js App Router.
            Substitui as API Routes do Pages Router com melhor performance e DX.
          </p>
        </motion.div>

        <DemoSection title="Características dos Route Handlers">
          <div className="grid md:grid-cols-3 gap-1.5 mb-8">
            {routeFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <DemoCardStatic
                    title={feature.title}
                    description={feature.description}
                    icon={<IconComponent className="w-6 h-6" />}
                    color={feature.color}
                  />
                </motion.div>
              );
            })}
          </div>
        </DemoSection>

        <DemoSection title="Estrutura Básica">
          <div className="grid md:grid-cols-2 gap-1.5">
            <div>
              <h3 className="text-xl font-semibold mb-4">Arquivo route.ts</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Route Handlers são definidos em arquivos especiais chamados <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">route.ts</code> (ou <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">route.js</code>).
              </p>
              <CodeBlock
                language="bash"
                code={`app/
├── api/
│   ├── users/
│   │   └── route.ts      # /api/users
│   ├── posts/
│   │   ├── route.ts      # /api/posts
│   │   └── [id]/
│   │       └── route.ts  # /api/posts/[id]
│   └── auth/
│       ├── login/
│       │   └── route.ts  # /api/auth/login
│       └── register/
│           └── route.ts  # /api/auth/register`}
              />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Métodos HTTP</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Cada método HTTP é uma função exportada nomeada.
              </p>
              <CodeBlock
                language="typescript"
                code={`// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  // Lógica para GET
}

export async function POST(request: NextRequest) {
  // Lógica para POST
}

export async function PUT(request: NextRequest) {
  // Lógica para PUT
}

export async function DELETE(request: NextRequest) {
  // Lógica para DELETE
}

export async function PATCH(request: NextRequest) {
  // Lógica para PATCH
}`}
              />
            </div>
          </div>
        </DemoSection>

        <DemoSection title="Exemplo Completo - CRUD de Usuários">
          <CodeBlock
            language="typescript"
            code={`// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Schema de validação
const UserSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  age: z.number().min(18, 'Idade mínima é 18 anos')
});

// Simulando um banco de dados
let users = [
  { id: 1, name: 'João Silva', email: 'joao@email.com', age: 30 },
  { id: 2, name: 'Maria Santos', email: 'maria@email.com', age: 25 }
];

// GET /api/users - Listar todos os usuários
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUsers = users.slice(startIndex, endIndex);
    
    return NextResponse.json({
      users: paginatedUsers,
      total: users.length,
      page,
      totalPages: Math.ceil(users.length / limit)
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// POST /api/users - Criar novo usuário
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validação com Zod
    const validatedData = UserSchema.parse(body);
    
    // Verificar se email já existe
    const existingUser = users.find(user => user.email === validatedData.email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email já está em uso' },
        { status: 409 }
      );
    }
    
    // Criar novo usuário
    const newUser = {
      id: users.length + 1,
      ...validatedData
    };
    
    users.push(newUser);
    
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}`}
          />
        </DemoSection>

        <DemoSection title="Rotas Dinâmicas">
          <div className="grid md:grid-cols-2 gap-1.5">
            <div>
              <h3 className="text-xl font-semibold mb-4">Parâmetros de Rota</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Use colchetes para criar rotas dinâmicas.
              </p>
              <CodeBlock
                language="typescript"
                code={`// app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';

interface RouteParams {
  params: {
    id: string;
  };
}

// GET /api/users/[id]
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  const userId = parseInt(params.id);
  
  if (isNaN(userId)) {
    return NextResponse.json(
      { error: 'ID inválido' },
      { status: 400 }
    );
  }
  
  const user = users.find(u => u.id === userId);
  
  if (!user) {
    return NextResponse.json(
      { error: 'Usuário não encontrado' },
      { status: 404 }
    );
  }
  
  return NextResponse.json(user);
}`}
              />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Query Parameters</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Acesse query parameters através da URL.
              </p>
              <CodeBlock
                language="typescript"
                code={`// GET /api/users?search=joão&status=active
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  const search = searchParams.get('search');
  const status = searchParams.get('status');
  const page = parseInt(searchParams.get('page') || '1');
  
  let filteredUsers = users;
  
  // Filtrar por busca
  if (search) {
    filteredUsers = filteredUsers.filter(user =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  // Filtrar por status
  if (status) {
    filteredUsers = filteredUsers.filter(user =>
      user.status === status
    );
  }
  
  return NextResponse.json({
    users: filteredUsers,
    total: filteredUsers.length,
    filters: { search, status, page }
  });
}`}
              />
            </div>
          </div>
        </DemoSection>

        <DemoSection title="Headers e Cookies">
          <div className="grid md:grid-cols-2 gap-1.5">
            <div>
              <h3 className="text-xl font-semibold mb-4">Lendo Headers</h3>
              <CodeBlock
                language="typescript"
                code={`export async function GET(request: NextRequest) {
  // Ler headers
  const authorization = request.headers.get('authorization');
  const userAgent = request.headers.get('user-agent');
  const contentType = request.headers.get('content-type');
  
  // Verificar autenticação
  if (!authorization) {
    return NextResponse.json(
      { error: 'Token de autorização necessário' },
      { status: 401 }
    );
  }
  
  return NextResponse.json({
    message: 'Acesso autorizado',
    userAgent,
    contentType
  });
}`}
              />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Definindo Headers</h3>
              <CodeBlock
                language="typescript"
                code={`export async function POST(request: NextRequest) {
  const data = await request.json();
  
  // Criar resposta com headers customizados
  const response = NextResponse.json(
    { message: 'Criado com sucesso', data },
    { status: 201 }
  );
  
  // Definir headers
  response.headers.set('X-Custom-Header', 'valor');
  response.headers.set('Cache-Control', 'no-cache');
  
  // Definir cookies
  response.cookies.set('session', 'abc123', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7 // 7 dias
  });
  
  return response;
}`}
              />
            </div>
          </div>
        </DemoSection>

        <DemoSection title="Melhores Práticas">
          <div className="grid md:grid-cols-3 gap-1.5 mb-8">
            {bestPractices.map((practice, index) => {
              const IconComponent = practice.icon;
              return (
                <motion.div
                  key={practice.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <DemoCardStatic
                    title={practice.title}
                    description={practice.description}
                    icon={<IconComponent className="w-6 h-6" />}
                    color={practice.color}
                  />
                </motion.div>
              );
            })}
          </div>
          
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-4">💡 Dicas Importantes</h3>
            <ul className="space-y-2 text-yellow-700 dark:text-yellow-300">
              <li>• Route Handlers são executados no servidor, não no cliente</li>
              <li>• Use TypeScript para melhor experiência de desenvolvimento</li>
              <li>• Sempre valide dados de entrada com bibliotecas como Zod</li>
              <li>• Implemente tratamento de erros consistente</li>
              <li>• Use status codes HTTP apropriados</li>
              <li>• Considere implementar rate limiting para APIs públicas</li>
              <li>• Documente suas APIs com ferramentas como Swagger</li>
            </ul>
          </div>
        </DemoSection>

        <DemoSection title="Streaming e Server-Sent Events">
          <div className="grid md:grid-cols-2 gap-1.5">
            <div>
              <h3 className="text-xl font-semibold mb-4">Streaming Response</h3>
              <CodeBlock
                language="typescript"
                code={`// app/api/stream/route.ts
export async function GET() {
  const encoder = new TextEncoder();
  
  const stream = new ReadableStream({
    start(controller) {
      // Enviar dados em chunks
      const sendChunk = (data: string) => {
        controller.enqueue(encoder.encode(data));
      };
      
      // Simular dados sendo processados
      let count = 0;
      const interval = setInterval(() => {
        sendChunk(\`Chunk \${count++}\\n\`);
        
        if (count >= 10) {
          clearInterval(interval);
          controller.close();
        }
      }, 1000);
    }
  });
  
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain',
      'Transfer-Encoding': 'chunked'
    }
  });
}`}
              />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Server-Sent Events</h3>
              <CodeBlock
                language="typescript"
                code={`// app/api/events/route.ts
export async function GET() {
  const encoder = new TextEncoder();
  
  const stream = new ReadableStream({
    start(controller) {
      const sendEvent = (data: any) => {
        const formatted = \`data: \${JSON.stringify(data)}\\n\\n\`;
        controller.enqueue(encoder.encode(formatted));
      };
      
      // Enviar evento inicial
      sendEvent({ type: 'connected', timestamp: Date.now() });
      
      // Enviar eventos periódicos
      const interval = setInterval(() => {
        sendEvent({
          type: 'update',
          data: { value: Math.random() },
          timestamp: Date.now()
        });
      }, 2000);
      
      // Cleanup quando conexão fechar
      return () => clearInterval(interval);
    }
  });
  
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    }
  });
}`}
              />
            </div>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}