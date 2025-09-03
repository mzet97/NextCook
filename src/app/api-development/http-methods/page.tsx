'use client';

import { motion } from 'framer-motion';
import { 
  Download, 
  Upload, 
  Edit, 
  Trash2, 
  RefreshCw, 
  CheckCircle, 
  AlertCircle,
  Info
} from 'lucide-react';
import { DemoSection } from '@/components/DemoSection';
import { CodeBlock } from '@/components/CodeBlock';
import Breadcrumbs from '@/components/Breadcrumbs';
import { DemoCardStatic } from '@/components/DemoCardStatic';

const httpMethods = [
  {
    method: 'GET',
    description: 'Recuperar dados do servidor',
    icon: Download,
    color: 'blue',
    usage: 'Listar recursos, buscar dados'
  },
  {
    method: 'POST',
    description: 'Criar novos recursos',
    icon: Upload,
    color: 'green',
    usage: 'Criar usuários, enviar formulários'
  },
  {
    method: 'PUT',
    description: 'Atualizar recursos completamente',
    icon: Edit,
    color: 'orange',
    usage: 'Substituir dados existentes'
  },
  {
    method: 'PATCH',
    description: 'Atualizar recursos parcialmente',
    icon: RefreshCw,
    color: 'purple',
    usage: 'Modificar campos específicos'
  },
  {
    method: 'DELETE',
    description: 'Remover recursos',
    icon: Trash2,
    color: 'red',
    usage: 'Excluir dados, limpar cache'
  }
];

const statusCodes = [
  {
    code: '2xx',
    title: 'Sucesso',
    description: 'Requisição processada com sucesso',
    icon: CheckCircle,
    color: 'green',
    examples: '200 OK, 201 Created, 204 No Content'
  },
  {
    code: '4xx',
    title: 'Erro do Cliente',
    description: 'Problema na requisição do cliente',
    icon: AlertCircle,
    color: 'orange',
    examples: '400 Bad Request, 401 Unauthorized, 404 Not Found'
  },
  {
    code: '5xx',
    title: 'Erro do Servidor',
    description: 'Problema interno do servidor',
    icon: AlertCircle,
    color: 'red',
    examples: '500 Internal Server Error, 503 Service Unavailable'
  }
];

export default function HttpMethodsPage() {
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
            🌐 Métodos HTTP
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Aprenda a implementar todos os métodos HTTP em Next.js Route Handlers.
            GET, POST, PUT, PATCH, DELETE e suas melhores práticas.
          </p>
        </motion.div>

        <DemoSection title="Métodos HTTP Principais">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {httpMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <motion.div
                  key={method.method}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center mb-4">
                    <div className={`p-3 rounded-lg bg-${method.color}-100 dark:bg-${method.color}-900/20 mr-4`}>
                      <IconComponent className={`h-6 w-6 text-${method.color}-600 dark:text-${method.color}-400`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">{method.method}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{method.description}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <strong>Uso:</strong> {method.usage}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </DemoSection>

        <DemoSection title="GET - Recuperar Dados">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Listar Recursos</h3>
              <CodeBlock
                language="typescript"
                code={`// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';

// GET /api/users
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parâmetros de paginação
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const order = searchParams.get('order') || 'desc';
    
    // Buscar usuários do banco de dados
    const users = await getUsersFromDB({
      page,
      limit,
      search,
      sortBy,
      order
    });
    
    return NextResponse.json({
      users: users.data,
      pagination: {
        page,
        limit,
        total: users.total,
        totalPages: Math.ceil(users.total / limit)
      },
      filters: { search, sortBy, order }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao buscar usuários' },
      { status: 500 }
    );
  }
}`}
              />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Buscar por ID</h3>
              <CodeBlock
                language="typescript"
                code={`// app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';

interface RouteParams {
  params: { id: string };
}

// GET /api/users/[id]
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const userId = parseInt(params.id);
    
    if (isNaN(userId)) {
      return NextResponse.json(
        { error: 'ID deve ser um número válido' },
        { status: 400 }
      );
    }
    
    const user = await getUserById(userId);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }
    
    // Incluir dados relacionados se solicitado
    const { searchParams } = new URL(request.url);
    const include = searchParams.get('include')?.split(',') || [];
    
    if (include.includes('posts')) {
      user.posts = await getUserPosts(userId);
    }
    
    if (include.includes('profile')) {
      user.profile = await getUserProfile(userId);
    }
    
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}`}
              />
            </div>
          </div>
        </DemoSection>

        <DemoSection title="POST - Criar Recursos">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Criar Usuário</h3>
              <CodeBlock
                language="typescript"
                code={`// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcryptjs';

const CreateUserSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres'),
  role: z.enum(['user', 'admin']).default('user')
});

// POST /api/users
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar dados de entrada
    const validatedData = CreateUserSchema.parse(body);
    
    // Verificar se email já existe
    const existingUser = await getUserByEmail(validatedData.email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email já está em uso' },
        { status: 409 }
      );
    }
    
    // Hash da senha
    const hashedPassword = await bcrypt.hash(validatedData.password, 12);
    
    // Criar usuário
    const newUser = await createUser({
      ...validatedData,
      password: hashedPassword
    });
    
    // Remover senha da resposta
    const { password, ...userWithoutPassword } = newUser;
    
    return NextResponse.json(
      userWithoutPassword,
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Dados inválidos',
          details: error.errors
        },
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
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Upload de Arquivo</h3>
              <CodeBlock
                language="typescript"
                code={`// app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

// POST /api/upload
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'Nenhum arquivo enviado' },
        { status: 400 }
      );
    }
    
    // Validar tipo de arquivo
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Tipo de arquivo não permitido' },
        { status: 400 }
      );
    }
    
    // Validar tamanho (5MB máximo)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'Arquivo muito grande (máximo 5MB)' },
        { status: 400 }
      );
    }
    
    // Gerar nome único
    const timestamp = Date.now();
    const extension = path.extname(file.name);
    const filename = \`\${timestamp}\${extension}\`;
    
    // Salvar arquivo
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadPath = path.join(process.cwd(), 'public/uploads', filename);
    
    await writeFile(uploadPath, buffer);
    
    return NextResponse.json({
      message: 'Arquivo enviado com sucesso',
      filename,
      url: \`/uploads/\${filename}\`,
      size: file.size,
      type: file.type
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao fazer upload do arquivo' },
      { status: 500 }
    );
  }
}`}
              />
            </div>
          </div>
        </DemoSection>

        <DemoSection title="PUT vs PATCH - Atualizar Recursos">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">PUT - Substituição Completa</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                PUT substitui o recurso inteiro. Todos os campos devem ser fornecidos.
              </p>
              <CodeBlock
                language="typescript"
                code={`// app/api/users/[id]/route.ts
const UpdateUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  age: z.number().min(18),
  role: z.enum(['user', 'admin'])
  // Todos os campos são obrigatórios
});

// PUT /api/users/[id] - Substituir usuário
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = parseInt(params.id);
    const body = await request.json();
    
    // Validar todos os campos
    const validatedData = UpdateUserSchema.parse(body);
    
    // Verificar se usuário existe
    const existingUser = await getUserById(userId);
    if (!existingUser) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }
    
    // Substituir completamente
    const updatedUser = await updateUser(userId, validatedData);
    
    return NextResponse.json(updatedUser);
  } catch (error) {
    // Tratamento de erros...
  }
}`}
              />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">PATCH - Atualização Parcial</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                PATCH atualiza apenas os campos fornecidos.
              </p>
              <CodeBlock
                language="typescript"
                code={`// app/api/users/[id]/route.ts
const PartialUpdateSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  age: z.number().min(18).optional(),
  role: z.enum(['user', 'admin']).optional()
  // Todos os campos são opcionais
});

// PATCH /api/users/[id] - Atualizar parcialmente
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = parseInt(params.id);
    const body = await request.json();
    
    // Validar apenas campos fornecidos
    const validatedData = PartialUpdateSchema.parse(body);
    
    // Verificar se há campos para atualizar
    if (Object.keys(validatedData).length === 0) {
      return NextResponse.json(
        { error: 'Nenhum campo para atualizar' },
        { status: 400 }
      );
    }
    
    // Verificar se usuário existe
    const existingUser = await getUserById(userId);
    if (!existingUser) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }
    
    // Atualizar apenas campos fornecidos
    const updatedUser = await updateUserPartial(userId, validatedData);
    
    return NextResponse.json(updatedUser);
  } catch (error) {
    // Tratamento de erros...
  }
}`}
              />
            </div>
          </div>
        </DemoSection>

        <DemoSection title="DELETE - Remover Recursos">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Exclusão Simples</h3>
              <CodeBlock
                language="typescript"
                code={`// app/api/users/[id]/route.ts

// DELETE /api/users/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = parseInt(params.id);
    
    if (isNaN(userId)) {
      return NextResponse.json(
        { error: 'ID inválido' },
        { status: 400 }
      );
    }
    
    // Verificar se usuário existe
    const existingUser = await getUserById(userId);
    if (!existingUser) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }
    
    // Verificar permissões
    const currentUser = await getCurrentUser(request);
    if (currentUser.id !== userId && currentUser.role !== 'admin') {
      return NextResponse.json(
        { error: 'Sem permissão para excluir este usuário' },
        { status: 403 }
      );
    }
    
    // Excluir usuário
    await deleteUser(userId);
    
    return NextResponse.json(
      { message: 'Usuário excluído com sucesso' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao excluir usuário' },
      { status: 500 }
    );
  }
}`}
              />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Exclusão em Lote</h3>
              <CodeBlock
                language="typescript"
                code={`// app/api/users/batch/route.ts
import { z } from 'zod';

const BatchDeleteSchema = z.object({
  ids: z.array(z.number()).min(1, 'Pelo menos um ID é necessário')
});

// DELETE /api/users/batch
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { ids } = BatchDeleteSchema.parse(body);
    
    // Verificar permissões
    const currentUser = await getCurrentUser(request);
    if (currentUser.role !== 'admin') {
      return NextResponse.json(
        { error: 'Apenas administradores podem excluir em lote' },
        { status: 403 }
      );
    }
    
    // Verificar se todos os usuários existem
    const existingUsers = await getUsersByIds(ids);
    const foundIds = existingUsers.map(user => user.id);
    const notFoundIds = ids.filter(id => !foundIds.includes(id));
    
    if (notFoundIds.length > 0) {
      return NextResponse.json(
        { 
          error: 'Alguns usuários não foram encontrados',
          notFoundIds
        },
        { status: 404 }
      );
    }
    
    // Excluir usuários
    const deletedCount = await deleteUsersByIds(ids);
    
    return NextResponse.json({
      message: \`\${deletedCount} usuários excluídos com sucesso\`,
      deletedIds: ids
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Erro ao excluir usuários' },
      { status: 500 }
    );
  }
}`}
              />
            </div>
          </div>
        </DemoSection>

        <DemoSection title="Status Codes HTTP">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {statusCodes.map((status, index) => {
              const IconComponent = status.icon;
              return (
                <motion.div
                  key={status.code}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <DemoCardStatic
                    title={`${status.code} - ${status.title}`}
                    description={status.description}
                    icon={<IconComponent className="w-6 h-6" />}
                    color={status.color}
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    <strong>Exemplos:</strong> {status.examples}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </DemoSection>

        <DemoSection title="Códigos de Status Detalhados">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Códigos de Sucesso (2xx)</h3>
              <div className="space-y-4">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 dark:text-green-200">200 OK</h4>
                  <p className="text-green-700 dark:text-green-300 text-sm">Requisição processada com sucesso (GET, PUT, PATCH)</p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 dark:text-green-200">201 Created</h4>
                  <p className="text-green-700 dark:text-green-300 text-sm">Recurso criado com sucesso (POST)</p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 dark:text-green-200">204 No Content</h4>
                  <p className="text-green-700 dark:text-green-300 text-sm">Sucesso sem conteúdo de resposta (DELETE)</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Códigos de Erro (4xx/5xx)</h3>
              <div className="space-y-4">
                <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-800 dark:text-orange-200">400 Bad Request</h4>
                  <p className="text-orange-700 dark:text-orange-300 text-sm">Dados inválidos ou malformados</p>
                </div>
                <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-800 dark:text-orange-200">401 Unauthorized</h4>
                  <p className="text-orange-700 dark:text-orange-300 text-sm">Autenticação necessária</p>
                </div>
                <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-800 dark:text-orange-200">403 Forbidden</h4>
                  <p className="text-orange-700 dark:text-orange-300 text-sm">Sem permissão para acessar</p>
                </div>
                <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-800 dark:text-orange-200">404 Not Found</h4>
                  <p className="text-orange-700 dark:text-orange-300 text-sm">Recurso não encontrado</p>
                </div>
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-800 dark:text-red-200">500 Internal Server Error</h4>
                  <p className="text-red-700 dark:text-red-300 text-sm">Erro interno do servidor</p>
                </div>
              </div>
            </div>
          </div>
        </DemoSection>

        <DemoSection title="Exemplo Completo - CRUD de Posts">
          <CodeBlock
            language="typescript"
            code={`// app/api/posts/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const PostSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  content: z.string().min(10, 'Conteúdo deve ter pelo menos 10 caracteres'),
  published: z.boolean().default(false),
  tags: z.array(z.string()).optional()
});

// GET /api/posts - Listar posts
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const published = searchParams.get('published');
  
  const posts = await getPosts({ page, limit, published });
  
  return NextResponse.json({
    posts: posts.data,
    pagination: {
      page,
      limit,
      total: posts.total,
      totalPages: Math.ceil(posts.total / limit)
    }
  });
}

// POST /api/posts - Criar post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = PostSchema.parse(body);
    
    const currentUser = await getCurrentUser(request);
    if (!currentUser) {
      return NextResponse.json(
        { error: 'Autenticação necessária' },
        { status: 401 }
      );
    }
    
    const newPost = await createPost({
      ...validatedData,
      authorId: currentUser.id
    });
    
    return NextResponse.json(newPost, { status: 201 });
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
}

// app/api/posts/[id]/route.ts

// GET /api/posts/[id] - Buscar post específico
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const postId = parseInt(params.id);
  
  if (isNaN(postId)) {
    return NextResponse.json(
      { error: 'ID inválido' },
      { status: 400 }
    );
  }
  
  const post = await getPostById(postId);
  
  if (!post) {
    return NextResponse.json(
      { error: 'Post não encontrado' },
      { status: 404 }
    );
  }
  
  return NextResponse.json(post);
}

// PUT /api/posts/[id] - Atualizar post completamente
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const postId = parseInt(params.id);
    const body = await request.json();
    const validatedData = PostSchema.parse(body);
    
    const currentUser = await getCurrentUser(request);
    const post = await getPostById(postId);
    
    if (!post) {
      return NextResponse.json(
        { error: 'Post não encontrado' },
        { status: 404 }
      );
    }
    
    // Verificar se é o autor ou admin
    if (post.authorId !== currentUser.id && currentUser.role !== 'admin') {
      return NextResponse.json(
        { error: 'Sem permissão para editar este post' },
        { status: 403 }
      );
    }
    
    const updatedPost = await updatePost(postId, validatedData);
    return NextResponse.json(updatedPost);
  } catch (error) {
    // Tratamento de erros...
  }
}

// PATCH /api/posts/[id] - Atualizar post parcialmente
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const postId = parseInt(params.id);
    const body = await request.json();
    
    // Schema parcial para PATCH
    const PartialPostSchema = PostSchema.partial();
    const validatedData = PartialPostSchema.parse(body);
    
    if (Object.keys(validatedData).length === 0) {
      return NextResponse.json(
        { error: 'Nenhum campo para atualizar' },
        { status: 400 }
      );
    }
    
    const currentUser = await getCurrentUser(request);
    const post = await getPostById(postId);
    
    if (!post) {
      return NextResponse.json(
        { error: 'Post não encontrado' },
        { status: 404 }
      );
    }
    
    if (post.authorId !== currentUser.id && currentUser.role !== 'admin') {
      return NextResponse.json(
        { error: 'Sem permissão para editar este post' },
        { status: 403 }
      );
    }
    
    const updatedPost = await updatePostPartial(postId, validatedData);
    return NextResponse.json(updatedPost);
  } catch (error) {
    // Tratamento de erros...
  }
}

// DELETE /api/posts/[id] - Excluir post
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const postId = parseInt(params.id);
    const currentUser = await getCurrentUser(request);
    const post = await getPostById(postId);
    
    if (!post) {
      return NextResponse.json(
        { error: 'Post não encontrado' },
        { status: 404 }
      );
    }
    
    if (post.authorId !== currentUser.id && currentUser.role !== 'admin') {
      return NextResponse.json(
        { error: 'Sem permissão para excluir este post' },
        { status: 403 }
      );
    }
    
    await deletePost(postId);
    
    return NextResponse.json(
      { message: 'Post excluído com sucesso' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao excluir post' },
      { status: 500 }
    );
  }
}`}
          />
        </DemoSection>

        <DemoSection title="Melhores Práticas">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4">💡 Dicas Importantes</h3>
            <ul className="space-y-2 text-blue-700 dark:text-blue-300">
              <li>• <strong>GET:</strong> Deve ser idempotente e não causar efeitos colaterais</li>
              <li>• <strong>POST:</strong> Use para criar recursos e operações não-idempotentes</li>
              <li>• <strong>PUT:</strong> Substitui o recurso inteiro, deve ser idempotente</li>
              <li>• <strong>PATCH:</strong> Atualiza parcialmente, pode não ser idempotente</li>
              <li>• <strong>DELETE:</strong> Remove recursos, deve ser idempotente</li>
              <li>• Sempre valide dados de entrada</li>
              <li>• Use status codes HTTP apropriados</li>
              <li>• Implemente tratamento de erros consistente</li>
              <li>• Considere paginação para listas grandes</li>
              <li>• Documente suas APIs adequadamente</li>
            </ul>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}