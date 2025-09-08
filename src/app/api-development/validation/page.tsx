'use client';

import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  AlertTriangle, 
  Shield, 
  Code, 
  FileText, 
  Database,
  Zap,
  Settings,
  Lock,
  RefreshCw
} from 'lucide-react';
import { DemoSection } from '@/components/DemoSection';
import { CodeBlock } from '@/components/CodeBlock';
import Breadcrumbs from '@/components/Breadcrumbs';
import { DemoCardStatic } from '@/components/DemoCardStatic';

const validationFeatures = [
  {
    title: 'Type Safety',
    description: 'Validação com TypeScript automático',
    icon: Shield,
    color: 'blue'
  },
  {
    title: 'Schema Validation',
    description: 'Esquemas reutilizáveis e compostos',
    icon: FileText,
    color: 'green'
  },
  {
    title: 'Error Handling',
    description: 'Mensagens de erro detalhadas',
    icon: AlertTriangle,
    color: 'orange'
  },
  {
    title: 'Transformations',
    description: 'Transformar dados durante validação',
    icon: RefreshCw,
    color: 'purple'
  },
  {
    title: 'Custom Validators',
    description: 'Validações personalizadas',
    icon: Settings,
    color: 'indigo'
  },
  {
    title: 'Performance',
    description: 'Validação rápida e eficiente',
    icon: Zap,
    color: 'yellow'
  }
];

const zodTypes = [
  {
    type: 'z.string()',
    description: 'Validação de strings',
    example: 'z.string().min(3).max(50)'
  },
  {
    type: 'z.number()',
    description: 'Validação de números',
    example: 'z.number().positive().int()'
  },
  {
    type: 'z.boolean()',
    description: 'Validação de booleanos',
    example: 'z.boolean().default(false)'
  },
  {
    type: 'z.array()',
    description: 'Validação de arrays',
    example: 'z.array(z.string()).min(1)'
  },
  {
    type: 'z.object()',
    description: 'Validação de objetos',
    example: 'z.object({ name: z.string() })'
  },
  {
    type: 'z.enum()',
    description: 'Validação de enums',
    example: 'z.enum(["admin", "user"])'
  }
];

export default function ValidationPage() {
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
            ✅ Validação com Zod
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Aprenda a implementar validação robusta e type-safe em suas APIs Next.js
            usando Zod, a biblioteca de validação mais popular do TypeScript.
          </p>
        </motion.div>

        <DemoSection title="Por que usar Zod?">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-1.5 mb-8">
            {validationFeatures.map((feature, index) => {
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

        <DemoSection title="Instalação e Setup">
          <div className="grid md:grid-cols-2 gap-1.5">
            <div>
              <h3 className="text-xl font-semibold mb-4">Instalação</h3>
              <CodeBlock
                language="bash"
                code={`# Instalar Zod
npm install zod

# Ou com yarn
yarn add zod

# Ou com pnpm
pnpm add zod`}
              />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Configuração Básica</h3>
              <CodeBlock
                language="typescript"
                code={`// lib/validations.ts
import { z } from 'zod';

// Schema básico
const UserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  age: z.number().min(18)
});

// Inferir tipo TypeScript
type User = z.infer<typeof UserSchema>;

// Validar dados
const result = UserSchema.safeParse(data);
if (result.success) {
  console.log(result.data); // Dados válidos
} else {
  console.log(result.error); // Erros de validação
}`}
              />
            </div>
          </div>
        </DemoSection>

        <DemoSection title="Tipos Básicos do Zod">
          <div className="grid md:grid-cols-2 gap-1.5">
            <div>
              <h3 className="text-xl font-semibold mb-4">Tipos Primitivos</h3>
              <div className="space-y-4">
                {zodTypes.map((type, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{type.type}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{type.description}</p>
                    <code className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      {type.example}
                    </code>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Exemplos Práticos</h3>
              <CodeBlock
                language="typescript"
                code={`import { z } from 'zod';

// String com validações
const nameSchema = z.string()
  .min(2, 'Nome deve ter pelo menos 2 caracteres')
  .max(50, 'Nome não pode ter mais de 50 caracteres')
  .regex(/^[a-zA-Z\\s]+$/, 'Nome deve conter apenas letras');

// Email
const emailSchema = z.string()
  .email('Email inválido')
  .toLowerCase(); // Transformação

// Número com validações
const ageSchema = z.number()
  .int('Idade deve ser um número inteiro')
  .min(18, 'Idade mínima é 18 anos')
  .max(120, 'Idade máxima é 120 anos');

// Array com validações
const tagsSchema = z.array(z.string())
  .min(1, 'Pelo menos uma tag é necessária')
  .max(5, 'Máximo 5 tags permitidas');

// Enum
const roleSchema = z.enum(['admin', 'user', 'moderator'], {
  errorMap: () => ({ message: 'Role deve ser admin, user ou moderator' })
});

// Data
const dateSchema = z.string()
  .datetime('Data deve estar no formato ISO')
  .transform((str) => new Date(str));

// URL
const urlSchema = z.string()
  .url('URL inválida')
  .startsWith('https://', 'URL deve usar HTTPS');

// UUID
const idSchema = z.string()
  .uuid('ID deve ser um UUID válido');`}
              />
            </div>
          </div>
        </DemoSection>

        <DemoSection title="Schemas Complexos">
          <div className="grid md:grid-cols-2 gap-1.5">
            <div>
              <h3 className="text-xl font-semibold mb-4">Objetos Aninhados</h3>
              <CodeBlock
                language="typescript"
                code={`// Schema de usuário completo
const UserSchema = z.object({
  // Dados básicos
  id: z.string().uuid(),
  name: z.string().min(2).max(50),
  email: z.string().email().toLowerCase(),
  age: z.number().int().min(18).max(120),
  
  // Dados opcionais
  bio: z.string().max(500).optional(),
  avatar: z.string().url().optional(),
  
  // Enum
  role: z.enum(['admin', 'user', 'moderator']),
  
  // Array de strings
  interests: z.array(z.string()).max(10),
  
  // Objeto aninhado
  address: z.object({
    street: z.string().min(5),
    city: z.string().min(2),
    zipCode: z.string().regex(/^\\d{5}-?\\d{3}$/),
    country: z.string().length(2) // Código do país
  }),
  
  // Array de objetos
  socialLinks: z.array(
    z.object({
      platform: z.enum(['twitter', 'linkedin', 'github']),
      url: z.string().url()
    })
  ).max(3),
  
  // Configurações
  settings: z.object({
    notifications: z.boolean().default(true),
    theme: z.enum(['light', 'dark']).default('light'),
    language: z.string().length(2).default('pt')
  }),
  
  // Timestamps
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});

type User = z.infer<typeof UserSchema>;`}
              />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Schemas Condicionais</h3>
              <CodeBlock
                language="typescript"
                code={`// Schema com validação condicional
const CreatePostSchema = z.object({
  title: z.string().min(5).max(100),
  content: z.string().min(10),
  type: z.enum(['article', 'video', 'image']),
  published: z.boolean().default(false),
  
  // Campos condicionais baseados no tipo
  videoUrl: z.string().url().optional(),
  imageUrl: z.string().url().optional(),
  duration: z.number().positive().optional()
}).refine((data) => {
  // Se for vídeo, videoUrl e duration são obrigatórios
  if (data.type === 'video') {
    return data.videoUrl && data.duration;
  }
  
  // Se for imagem, imageUrl é obrigatório
  if (data.type === 'image') {
    return data.imageUrl;
  }
  
  return true;
}, {
  message: 'Campos obrigatórios faltando para o tipo selecionado'
});

// Schema com discriminated union
const PaymentSchema = z.discriminatedUnion('method', [
  z.object({
    method: z.literal('credit_card'),
    cardNumber: z.string().length(16),
    expiryDate: z.string().regex(/^\\d{2}\\/\\d{2}$/),
    cvv: z.string().length(3)
  }),
  z.object({
    method: z.literal('pix'),
    pixKey: z.string().min(1)
  }),
  z.object({
    method: z.literal('bank_transfer'),
    bankCode: z.string().length(3),
    accountNumber: z.string().min(1)
  })
]);

// Schema com transformações
const ProductSchema = z.object({
  name: z.string().trim().min(1),
  price: z.string()
    .regex(/^\\d+(\\.\\d{2})?$/, 'Preço deve ter formato 0.00')
    .transform((val) => parseFloat(val)),
  tags: z.string()
    .transform((str) => str.split(',').map(tag => tag.trim()))
    .pipe(z.array(z.string().min(1)).max(5))
});`}
              />
            </div>
          </div>
        </DemoSection>

        <DemoSection title="Validação em Route Handlers">
          <div className="grid md:grid-cols-2 gap-1.5">
            <div>
              <h3 className="text-xl font-semibold mb-4">POST - Criar Usuário</h3>
              <CodeBlock
                language="typescript"
                code={`// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const CreateUserSchema = z.object({
  name: z.string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(50, 'Nome não pode ter mais de 50 caracteres'),
  email: z.string()
    .email('Email inválido')
    .toLowerCase(),
  password: z.string()
    .min(8, 'Senha deve ter pelo menos 8 caracteres')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]/,
      'Senha deve conter ao menos: 1 minúscula, 1 maiúscula, 1 número e 1 símbolo'
    ),
  age: z.number()
    .int('Idade deve ser um número inteiro')
    .min(18, 'Idade mínima é 18 anos')
    .max(120, 'Idade máxima é 120 anos'),
  role: z.enum(['user', 'admin']).default('user')
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar dados de entrada
    const validationResult = CreateUserSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Dados inválidos',
          details: validationResult.error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message,
            code: err.code
          }))
        },
        { status: 400 }
      );
    }
    
    const validatedData = validationResult.data;
    
    // Verificar se email já existe
    const existingUser = await getUserByEmail(validatedData.email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email já está em uso' },
        { status: 409 }
      );
    }
    
    // Criar usuário
    const newUser = await createUser(validatedData);
    
    return NextResponse.json(
      { message: 'Usuário criado com sucesso', user: newUser },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}`}
              />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">PUT - Atualizar Usuário</h3>
              <CodeBlock
                language="typescript"
                code={`// app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Schema para atualização (todos os campos opcionais)
const UpdateUserSchema = z.object({
  name: z.string().min(2).max(50).optional(),
  email: z.string().email().toLowerCase().optional(),
  age: z.number().int().min(18).max(120).optional(),
  bio: z.string().max(500).optional(),
  avatar: z.string().url().optional()
}).refine(
  (data) => Object.keys(data).length > 0,
  { message: 'Pelo menos um campo deve ser fornecido para atualização' }
);

// Schema para validar ID da URL
const ParamsSchema = z.object({
  id: z.string().regex(/^\\d+$/, 'ID deve ser um número')
    .transform((val) => parseInt(val))
});

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Validar parâmetros da URL
    const paramsResult = ParamsSchema.safeParse(params);
    if (!paramsResult.success) {
      return NextResponse.json(
        { error: 'ID inválido' },
        { status: 400 }
      );
    }
    
    const userId = paramsResult.data.id;
    
    // Validar body
    const body = await request.json();
    const validationResult = UpdateUserSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Dados inválidos',
          details: validationResult.error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        },
        { status: 400 }
      );
    }
    
    const validatedData = validationResult.data;
    
    // Verificar se usuário existe
    const existingUser = await getUserById(userId);
    if (!existingUser) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }
    
    // Se email está sendo atualizado, verificar duplicatas
    if (validatedData.email && validatedData.email !== existingUser.email) {
      const emailExists = await getUserByEmail(validatedData.email);
      if (emailExists) {
        return NextResponse.json(
          { error: 'Email já está em uso' },
          { status: 409 }
        );
      }
    }
    
    // Atualizar usuário
    const updatedUser = await updateUser(userId, validatedData);
    
    return NextResponse.json({
      message: 'Usuário atualizado com sucesso',
      user: updatedUser
    });
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

        <DemoSection title="Validação de Query Parameters">
          <div className="grid md:grid-cols-2 gap-1.5">
            <div>
              <h3 className="text-xl font-semibold mb-4">Paginação e Filtros</h3>
              <CodeBlock
                language="typescript"
                code={`// Schema para query parameters
const QuerySchema = z.object({
  // Paginação
  page: z.string()
    .regex(/^\\d+$/, 'Page deve ser um número')
    .transform((val) => parseInt(val))
    .refine((val) => val > 0, 'Page deve ser maior que 0')
    .default('1'),
  
  limit: z.string()
    .regex(/^\\d+$/, 'Limit deve ser um número')
    .transform((val) => parseInt(val))
    .refine((val) => val > 0 && val <= 100, 'Limit deve estar entre 1 e 100')
    .default('10'),
  
  // Busca
  search: z.string().min(1).optional(),
  
  // Ordenação
  sortBy: z.enum(['name', 'email', 'createdAt', 'updatedAt'])
    .default('createdAt'),
  
  order: z.enum(['asc', 'desc']).default('desc'),
  
  // Filtros
  role: z.enum(['admin', 'user']).optional(),
  
  active: z.string()
    .transform((val) => val === 'true')
    .optional(),
  
  // Data range
  startDate: z.string()
    .datetime('Data de início inválida')
    .optional(),
  
  endDate: z.string()
    .datetime('Data de fim inválida')
    .optional()
}).refine(
  (data) => {
    if (data.startDate && data.endDate) {
      return new Date(data.startDate) <= new Date(data.endDate);
    }
    return true;
  },
  {
    message: 'Data de início deve ser anterior à data de fim',
    path: ['startDate']
  }
);

// GET /api/users
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Converter URLSearchParams para objeto
    const queryObject = Object.fromEntries(searchParams.entries());
    
    // Validar query parameters
    const validationResult = QuerySchema.safeParse(queryObject);
    
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Parâmetros de consulta inválidos',
          details: validationResult.error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        },
        { status: 400 }
      );
    }
    
    const query = validationResult.data;
    
    // Buscar usuários com filtros validados
    const users = await getUsers(query);
    
    return NextResponse.json({
      users: users.data,
      pagination: {
        page: query.page,
        limit: query.limit,
        total: users.total,
        totalPages: Math.ceil(users.total / query.limit)
      },
      filters: {
        search: query.search,
        role: query.role,
        active: query.active,
        sortBy: query.sortBy,
        order: query.order
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}`}
              />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Validação de Headers</h3>
              <CodeBlock
                language="typescript"
                code={`// Schema para headers
const HeadersSchema = z.object({
  'content-type': z.string()
    .refine(
      (val) => val.includes('application/json'),
      'Content-Type deve ser application/json'
    ),
  
  'authorization': z.string()
    .regex(/^Bearer \\S+$/, 'Authorization deve estar no formato Bearer <token>'),
  
  'x-api-key': z.string().uuid('API Key deve ser um UUID válido').optional(),
  
  'user-agent': z.string().min(1).optional(),
  
  'x-request-id': z.string().uuid().optional()
});

// Middleware para validar headers
export async function validateHeaders(request: NextRequest) {
  try {
    // Converter headers para objeto
    const headersObject = Object.fromEntries(
      Array.from(request.headers.entries())
    );
    
    const validationResult = HeadersSchema.safeParse(headersObject);
    
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Headers inválidos',
          details: validationResult.error.errors.map(err => ({
            header: err.path.join('.'),
            message: err.message
          }))
        },
        { status: 400 }
      );
    }
    
    return null; // Headers válidos
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao validar headers' },
      { status: 500 }
    );
  }
}

// Uso em route handler
export async function POST(request: NextRequest) {
  // Validar headers primeiro
  const headerValidation = await validateHeaders(request);
  if (headerValidation) {
    return headerValidation;
  }
  
  // Continuar com a lógica da rota...
}`}
              />
            </div>
          </div>
        </DemoSection>

        <DemoSection title="Validações Customizadas">
          <div className="grid md:grid-cols-2 gap-1.5">
            <div>
              <h3 className="text-xl font-semibold mb-4">Validadores Personalizados</h3>
              <CodeBlock
                language="typescript"
                code={`import { z } from 'zod';

// Validador de CPF
const cpfValidator = z.string()
  .regex(/^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$/, 'CPF deve estar no formato 000.000.000-00')
  .refine((cpf) => {
    // Remover pontos e traços
    const digits = cpf.replace(/[^\\d]/g, '');
    
    // Verificar se não são todos iguais
    if (/^(\\d)\\1{10}$/.test(digits)) return false;
    
    // Validar dígitos verificadores
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(digits[i]) * (10 - i);
    }
    let remainder = sum % 11;
    let digit1 = remainder < 2 ? 0 : 11 - remainder;
    
    if (parseInt(digits[9]) !== digit1) return false;
    
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(digits[i]) * (11 - i);
    }
    remainder = sum % 11;
    let digit2 = remainder < 2 ? 0 : 11 - remainder;
    
    return parseInt(digits[10]) === digit2;
  }, 'CPF inválido');

// Validador de senha forte
const strongPasswordValidator = z.string()
  .min(8, 'Senha deve ter pelo menos 8 caracteres')
  .refine(
    (password) => /[a-z]/.test(password),
    'Senha deve conter pelo menos uma letra minúscula'
  )
  .refine(
    (password) => /[A-Z]/.test(password),
    'Senha deve conter pelo menos uma letra maiúscula'
  )
  .refine(
    (password) => /\\d/.test(password),
    'Senha deve conter pelo menos um número'
  )
  .refine(
    (password) => /[@$!%*?&]/.test(password),
    'Senha deve conter pelo menos um símbolo (@$!%*?&)'
  )
  .refine(
    (password) => !/(..).*\\1/.test(password),
    'Senha não pode ter caracteres repetidos consecutivos'
  );

// Validador de data de nascimento
const birthDateValidator = z.string()
  .regex(/^\\d{4}-\\d{2}-\\d{2}$/, 'Data deve estar no formato YYYY-MM-DD')
  .refine((date) => {
    const birthDate = new Date(date);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    
    return age >= 18 && age <= 120;
  }, 'Idade deve estar entre 18 e 120 anos');

// Validador de arquivo
const fileValidator = z.object({
  name: z.string().min(1),
  size: z.number()
    .max(5 * 1024 * 1024, 'Arquivo deve ter no máximo 5MB'),
  type: z.string()
    .refine(
      (type) => ['image/jpeg', 'image/png', 'image/webp'].includes(type),
      'Tipo de arquivo não permitido'
    )
});`}
              />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Validações Assíncronas</h3>
              <CodeBlock
                language="typescript"
                code={`// Validações que dependem de banco de dados
const AsyncUserSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(20)
});

// Função para validação assíncrona
async function validateUserData(data: unknown) {
  // Validação síncrona primeiro
  const syncResult = AsyncUserSchema.safeParse(data);
  if (!syncResult.success) {
    return { success: false, error: syncResult.error };
  }
  
  const { email, username } = syncResult.data;
  
  // Validações assíncronas
  const [emailExists, usernameExists] = await Promise.all([
    checkEmailExists(email),
    checkUsernameExists(username)
  ]);
  
  const errors = [];
  
  if (emailExists) {
    errors.push({
      path: ['email'],
      message: 'Email já está em uso',
      code: 'custom'
    });
  }
  
  if (usernameExists) {
    errors.push({
      path: ['username'],
      message: 'Username já está em uso',
      code: 'custom'
    });
  }
  
  if (errors.length > 0) {
    return {
      success: false,
      error: { errors }
    };
  }
  
  return {
    success: true,
    data: syncResult.data
  };
}

// Uso em route handler
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const validation = await validateUserData(body);
    
    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Dados inválidos',
          details: validation.error.errors
        },
        { status: 400 }
      );
    }
    
    // Dados válidos, criar usuário
    const user = await createUser(validation.data);
    
    return NextResponse.json(user, { status: 201 });
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

        <DemoSection title="Transformações de Dados">
          <div className="grid md:grid-cols-2 gap-1.5">
            <div>
              <h3 className="text-xl font-semibold mb-4">Transformações Básicas</h3>
              <CodeBlock
                language="typescript"
                code={`import { z } from 'zod';

const TransformSchema = z.object({
  // Converter string para número
  price: z.string()
    .regex(/^\\d+(\\.\\d{2})?$/, 'Preço inválido')
    .transform((val) => parseFloat(val)),
  
  // Normalizar email
  email: z.string()
    .email()
    .toLowerCase()
    .transform((email) => email.trim()),
  
  // Converter string para array
  tags: z.string()
    .transform((str) => str.split(',').map(tag => tag.trim()))
    .pipe(z.array(z.string().min(1)).max(5)),
  
  // Converter string para boolean
  active: z.string()
    .transform((val) => val === 'true' || val === '1'),
  
  // Converter string para Date
  birthDate: z.string()
    .datetime()
    .transform((str) => new Date(str)),
  
  // Limpar e formatar telefone
  phone: z.string()
    .transform((phone) => phone.replace(/[^\\d]/g, ''))
    .pipe(
      z.string()
        .length(11, 'Telefone deve ter 11 dígitos')
        .transform((digits) => {
          return \`(\${digits.slice(0, 2)}) \${digits.slice(2, 7)}-\${digits.slice(7)}\`;
        })
    ),
  
  // Gerar slug a partir do título
  title: z.string().min(1),
  slug: z.string().optional()
}).transform((data) => {
  // Se slug não foi fornecido, gerar a partir do título
  if (!data.slug) {
    data.slug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9\\s-]/g, '')
      .replace(/\\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  }
  
  return data;
});`}
              />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Transformações Avançadas</h3>
              <CodeBlock
                language="typescript"
                code={`// Schema com múltiplas transformações
const ProductSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(10),
  price: z.number().positive(),
  category: z.string(),
  
  // Transformar array de IDs em objetos
  tagIds: z.array(z.number())
    .transform(async (ids) => {
      return await getTagsByIds(ids);
    }),
  
  // Processar imagens
  images: z.array(
    z.object({
      url: z.string().url(),
      alt: z.string().optional()
    })
  ).transform((images) => {
    return images.map((img, index) => ({
      ...img,
      alt: img.alt || \`Imagem \${index + 1} do produto\`,
      order: index
    }));
  }),
  
  // Calcular campos derivados
  dimensions: z.object({
    width: z.number().positive(),
    height: z.number().positive(),
    depth: z.number().positive()
  }).transform((dims) => ({
    ...dims,
    volume: dims.width * dims.height * dims.depth,
    aspectRatio: dims.width / dims.height
  })),
  
  // Normalizar dados de endereço
  address: z.object({
    street: z.string(),
    number: z.string(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string()
  }).transform((addr) => ({
    ...addr,
    zipCode: addr.zipCode.replace(/[^\\d]/g, ''),
    fullAddress: \`\${addr.street}, \${addr.number}, \${addr.city} - \${addr.state}\`
  }))
}).transform((product) => {
  // Adicionar metadados
  return {
    ...product,
    createdAt: new Date(),
    updatedAt: new Date(),
    id: generateId(),
    searchTerms: [
      product.name.toLowerCase(),
      product.category.toLowerCase(),
      ...product.description.toLowerCase().split(' ')
    ].filter(term => term.length > 2)
  };
});

// Função helper para transformações condicionais
function conditionalTransform<T, U>(
  condition: (data: T) => boolean,
  transform: (data: T) => U
) {
  return (data: T): T | U => {
    return condition(data) ? transform(data) : data;
  };
}

// Uso da função helper
const ConditionalSchema = z.object({
  type: z.enum(['user', 'admin']),
  permissions: z.array(z.string()).optional()
}).transform(
  conditionalTransform(
    (data) => data.type === 'admin' && !data.permissions,
    (data) => ({
      ...data,
      permissions: ['read', 'write', 'delete', 'admin']
    })
  )
);`}
              />
            </div>
          </div>
        </DemoSection>

        <DemoSection title="Tratamento de Erros">
          <div className="grid md:grid-cols-2 gap-1.5">
            <div>
              <h3 className="text-xl font-semibold mb-4">Formatação de Erros</h3>
              <CodeBlock
                language="typescript"
                code={`// Função para formatar erros do Zod
function formatZodError(error: z.ZodError) {
  return {
    message: 'Dados de entrada inválidos',
    errors: error.errors.map((err) => {
      const field = err.path.join('.');
      
      return {
        field,
        message: err.message,
        code: err.code,
        value: err.code === 'invalid_type' ? 
          \`Recebido: \${(err as any).received}, Esperado: \${(err as any).expected}\` : 
          undefined
      };
    }),
    timestamp: new Date().toISOString()
  };
}

// Middleware para tratamento de erros de validação
export function handleValidationError(error: z.ZodError) {
  const formattedError = formatZodError(error);
  
  return NextResponse.json(formattedError, { status: 400 });
}

// Uso em route handler
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = UserSchema.safeParse(body);
    
    if (!result.success) {
      return handleValidationError(result.error);
    }
    
    // Processar dados válidos...
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}`}
              />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Mensagens Customizadas</h3>
              <CodeBlock
                language="typescript"
                code={`// Schema com mensagens customizadas
const CustomMessageSchema = z.object({
  name: z.string({
    required_error: 'Nome é obrigatório',
    invalid_type_error: 'Nome deve ser uma string'
  }).min(2, 'Nome deve ter pelo menos 2 caracteres'),
  
  email: z.string({
    required_error: 'Email é obrigatório'
  }).email('Formato de email inválido'),
  
  age: z.number({
    required_error: 'Idade é obrigatória',
    invalid_type_error: 'Idade deve ser um número'
  }).min(18, 'Você deve ter pelo menos 18 anos'),
  
  role: z.enum(['admin', 'user'], {
    errorMap: (issue, ctx) => {
      switch (issue.code) {
        case z.ZodIssueCode.invalid_enum_value:
          return { message: 'Role deve ser "admin" ou "user"' };
        default:
          return { message: ctx.defaultError };
      }
    }
  })
});

// Error map global personalizado
const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  switch (issue.code) {
    case z.ZodIssueCode.invalid_type:
      if (issue.expected === 'string') {
        return { message: 'Este campo deve ser um texto' };
      }
      if (issue.expected === 'number') {
        return { message: 'Este campo deve ser um número' };
      }
      break;
    
    case z.ZodIssueCode.too_small:
      if (issue.type === 'string') {
        return { 
          message: \`Este campo deve ter pelo menos \${issue.minimum} caracteres\` 
        };
      }
      if (issue.type === 'number') {
        return { 
          message: \`Este valor deve ser pelo menos \${issue.minimum}\` 
        };
      }
      break;
    
    case z.ZodIssueCode.too_big:
      if (issue.type === 'string') {
        return { 
          message: \`Este campo deve ter no máximo \${issue.maximum} caracteres\` 
        };
      }
      break;
    
    case z.ZodIssueCode.invalid_string:
      if (issue.validation === 'email') {
        return { message: 'Email inválido' };
      }
      if (issue.validation === 'url') {
        return { message: 'URL inválida' };
      }
      break;
  }
  
  return { message: ctx.defaultError };
};

// Aplicar error map globalmente
z.setErrorMap(customErrorMap);

// Ou usar em schema específico
const SchemaWithCustomErrors = z.object({
  email: z.string().email()
}, { errorMap: customErrorMap });`}
              />
            </div>
          </div>
        </DemoSection>

        <DemoSection title="Melhores Práticas">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4">💡 Dicas Importantes</h3>
            <ul className="space-y-2 text-blue-700 dark:text-blue-300">
              <li>• <strong>Reutilização:</strong> Crie schemas reutilizáveis em arquivos separados</li>
              <li>• <strong>Composição:</strong> Use .extend(), .pick(), .omit() para compor schemas</li>
              <li>• <strong>Performance:</strong> Use .safeParse() em vez de .parse() para evitar exceções</li>
              <li>• <strong>Transformações:</strong> Aplique transformações após validações básicas</li>
              <li>• <strong>Mensagens:</strong> Forneça mensagens de erro claras e específicas</li>
              <li>• <strong>Validação Assíncrona:</strong> Implemente validações de banco separadamente</li>
              <li>• <strong>Tipos:</strong> Use z.infer&lt;&gt; para gerar tipos TypeScript automaticamente</li>
              <li>• <strong>Documentação:</strong> Documente schemas complexos com comentários</li>
              <li>• <strong>Testes:</strong> Teste schemas com dados válidos e inválidos</li>
              <li>• <strong>Versionamento:</strong> Versione schemas para manter compatibilidade</li>
            </ul>
          </div>
        </DemoSection>

        <DemoSection title="Exemplo Completo - API de Blog">
          <CodeBlock
            language="typescript"
            code={`// lib/validations/blog.ts
import { z } from 'zod';

// Schemas base
const BasePostSchema = z.object({
  title: z.string()
    .min(5, 'Título deve ter pelo menos 5 caracteres')
    .max(100, 'Título não pode ter mais de 100 caracteres'),
  
  content: z.string()
    .min(50, 'Conteúdo deve ter pelo menos 50 caracteres'),
  
  excerpt: z.string()
    .max(200, 'Resumo não pode ter mais de 200 caracteres')
    .optional(),
  
  tags: z.array(z.string().min(1))
    .max(5, 'Máximo 5 tags permitidas'),
  
  published: z.boolean().default(false),
  
  publishedAt: z.string().datetime().optional(),
  
  featuredImage: z.string().url().optional()
});

// Schema para criação
export const CreatePostSchema = BasePostSchema
  .omit({ publishedAt: true })
  .transform((data) => {
    // Gerar excerpt se não fornecido
    if (!data.excerpt) {
      data.excerpt = data.content.substring(0, 150) + '...';
    }
    
    // Se publicado, definir data de publicação
    if (data.published) {
      (data as any).publishedAt = new Date().toISOString();
    }
    
    return data;
  });

// Schema para atualização
export const UpdatePostSchema = BasePostSchema
  .partial()
  .refine(
    (data) => Object.keys(data).length > 0,
    'Pelo menos um campo deve ser fornecido'
  )
  .transform((data) => {
    // Se mudando para publicado, definir data
    if (data.published === true && !data.publishedAt) {
      (data as any).publishedAt = new Date().toISOString();
    }
    
    // Se mudando para rascunho, remover data de publicação
    if (data.published === false) {
      (data as any).publishedAt = null;
    }
    
    return data;
  });

// Schema para query parameters
export const PostQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(50).default(10),
  search: z.string().min(1).optional(),
  tag: z.string().optional(),
  published: z.coerce.boolean().optional(),
  sortBy: z.enum(['createdAt', 'updatedAt', 'title', 'publishedAt'])
    .default('createdAt'),
  order: z.enum(['asc', 'desc']).default('desc')
});

// Schema para parâmetros de rota
export const PostParamsSchema = z.object({
  id: z.coerce.number().positive('ID deve ser um número positivo')
});

// Tipos TypeScript inferidos
export type CreatePost = z.infer<typeof CreatePostSchema>;
export type UpdatePost = z.infer<typeof UpdatePostSchema>;
export type PostQuery = z.infer<typeof PostQuerySchema>;
export type PostParams = z.infer<typeof PostParamsSchema>;

// app/api/posts/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { 
  CreatePostSchema, 
  PostQuerySchema,
  handleValidationError 
} from '@/lib/validations/blog';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const queryObject = Object.fromEntries(searchParams.entries());
    
    const queryResult = PostQuerySchema.safeParse(queryObject);
    if (!queryResult.success) {
      return handleValidationError(queryResult.error);
    }
    
    const query = queryResult.data;
    const posts = await getPosts(query);
    
    return NextResponse.json({
      posts: posts.data,
      pagination: {
        page: query.page,
        limit: query.limit,
        total: posts.total,
        totalPages: Math.ceil(posts.total / query.limit)
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const validationResult = CreatePostSchema.safeParse(body);
    if (!validationResult.success) {
      return handleValidationError(validationResult.error);
    }
    
    const validatedData = validationResult.data;
    const newPost = await createPost(validatedData);
    
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}`}
          />
        </DemoSection>
      </div>
    </div>
  );
}