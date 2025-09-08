'use client';

import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  Shield, 
  Zap, 
  Database, 
  Globe, 
  FileText,
  Users,
  Clock,
  Settings,
  Lock,
  Activity,
  Code
} from 'lucide-react';
import { DemoSection } from '@/components/DemoSection';
import { CodeBlock } from '@/components/CodeBlock';
import Breadcrumbs from '@/components/Breadcrumbs';
import { DemoCardStatic } from '@/components/DemoCardStatic';

const restPrinciples = [
  {
    title: 'Stateless',
    description: 'Cada requisição deve conter toda informação necessária',
    icon: Globe,
    color: 'blue',
    example: 'Usar tokens JWT em vez de sessões'
  },
  {
    title: 'Cacheable',
    description: 'Respostas devem indicar se podem ser cacheadas',
    icon: Zap,
    color: 'green',
    example: 'Headers Cache-Control e ETag'
  },
  {
    title: 'Uniform Interface',
    description: 'Interface consistente para todos os recursos',
    icon: Settings,
    color: 'purple',
    example: 'Padrões de URL e métodos HTTP'
  },
  {
    title: 'Layered System',
    description: 'Arquitetura em camadas com separação de responsabilidades',
    icon: Database,
    color: 'orange',
    example: 'Load balancers, CDNs, proxies'
  }
];

const designPatterns = [
  {
    title: 'Resource-Based URLs',
    description: 'URLs representam recursos, não ações',
    icon: Globe,
    color: 'blue'
  },
  {
    title: 'HTTP Methods',
    description: 'Use métodos HTTP apropriados',
    icon: Code,
    color: 'green'
  },
  {
    title: 'Status Codes',
    description: 'Códigos de status HTTP corretos',
    icon: CheckCircle,
    color: 'purple'
  },
  {
    title: 'Consistent Naming',
    description: 'Convenções de nomenclatura consistentes',
    icon: FileText,
    color: 'orange'
  },
  {
    title: 'Versioning',
    description: 'Versionamento de API adequado',
    icon: Settings,
    color: 'red'
  },
  {
    title: 'Error Handling',
    description: 'Tratamento de erros padronizado',
    icon: Shield,
    color: 'yellow'
  }
];

const performanceTips = [
  {
    title: 'Caching',
    description: 'Implementar cache em múltiplas camadas',
    icon: Zap,
    color: 'green'
  },
  {
    title: 'Pagination',
    description: 'Paginar resultados grandes',
    icon: FileText,
    color: 'blue'
  },
  {
    title: 'Compression',
    description: 'Comprimir respostas HTTP',
    icon: Database,
    color: 'purple'
  },
  {
    title: 'Rate Limiting',
    description: 'Limitar requisições por cliente',
    icon: Clock,
    color: 'orange'
  }
];

export default function BestPracticesPage() {
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
            📋 Melhores Práticas REST
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Aprenda as melhores práticas para desenvolver APIs REST robustas, escaláveis
            e fáceis de manter. Padrões, convenções e técnicas profissionais.
          </p>
        </motion.div>

        <DemoSection title="Princípios REST">
          <div className="grid md:grid-cols-2 gap-1.5 mb-8">
            {restPrinciples.map((principle, index) => {
              const IconComponent = principle.icon;
              return (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center mb-4">
                    <div className={`p-3 rounded-lg bg-${principle.color}-100 dark:bg-${principle.color}-900/20 mr-4`}>
                      {<IconComponent className={`h-6 w-6 text-${principle.color}-600 dark:text-${principle.color}-400`} />}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">{principle.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{principle.description}</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Exemplo:</strong> {principle.example}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </DemoSection>

        <DemoSection title="Design de URLs RESTful">
          <div className="grid md:grid-cols-2 gap-1.5">
            <div>
              <h3 className="text-xl font-semibold mb-4">✅ Boas Práticas</h3>
              <div className="space-y-4">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Recursos como Substantivos</h4>
                  <CodeBlock
                    language="bash"
                    code={`# ✅ Correto - substantivos no plural
GET /api/users
GET /api/users/123
GET /api/posts
GET /api/posts/456/comments

# ✅ Hierarquia clara
GET /api/users/123/posts
GET /api/users/123/posts/456
GET /api/categories/tech/posts`}
                  />
                </div>
                
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Métodos HTTP Apropriados</h4>
                  <CodeBlock
                    language="bash"
                    code={`# ✅ CRUD com métodos corretos
GET    /api/users        # Listar
GET    /api/users/123    # Buscar
POST   /api/users        # Criar
PUT    /api/users/123    # Atualizar completo
PATCH  /api/users/123    # Atualizar parcial
DELETE /api/users/123    # Excluir`}
                  />
                </div>
                
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Query Parameters</h4>
                  <CodeBlock
                    language="bash"
                    code={`# ✅ Filtros e paginação
GET /api/users?page=2&limit=10
GET /api/users?role=admin&active=true
GET /api/posts?author=123&published=true
GET /api/products?category=electronics&price_min=100`}
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">❌ Práticas a Evitar</h3>
              <div className="space-y-4">
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">Verbos nas URLs</h4>
                  <CodeBlock
                    language="bash"
                    code={`# ❌ Evitar verbos
GET /api/getUsers
POST /api/createUser
POST /api/deleteUser/123
GET /api/getUserPosts/123

# ❌ Ações como endpoints
POST /api/sendEmail
POST /api/calculateTotal
GET /api/searchUsers`}
                  />
                </div>
                
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">URLs Inconsistentes</h4>
                  <CodeBlock
                    language="bash"
                    code={`# ❌ Inconsistências
GET /api/user          # Singular
GET /api/posts         # Plural
GET /api/Categories    # PascalCase
GET /api/blog-posts    # Kebab-case

# ❌ Estrutura confusa
GET /api/user/123/post/456/comment
GET /api/posts/comments/789/user`}
                  />
                </div>
                
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">Métodos Incorretos</h4>
                  <CodeBlock
                    language="bash"
                    code={`# ❌ Uso incorreto de métodos
GET /api/users/delete/123  # Usar DELETE
POST /api/users/123        # Usar PUT/PATCH
GET /api/users/create      # Usar POST
PUT /api/users/123/activate # Usar PATCH`}
                  />
                </div>
              </div>
            </div>
          </div>
        </DemoSection>

        <DemoSection title="Padrões de Design">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-1.5 mb-8">
            {designPatterns.map((pattern, index) => {
              const IconComponent = pattern.icon;
              return (
                <motion.div
                  key={pattern.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <DemoCardStatic
                    title={pattern.title}
                    description={pattern.description}
                    icon={<IconComponent className="w-6 h-6" />}
                    color={pattern.color}
                  />
                </motion.div>
              );
            })}
          </div>
        </DemoSection>

        <DemoSection title="Versionamento de API">
          <div className="grid md:grid-cols-2 gap-1.5">
            <div>
              <h3 className="text-xl font-semibold mb-4">Estratégias de Versionamento</h3>
              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">1. URL Path Versioning</h4>
                  <CodeBlock
                    language="bash"
                    code={`# Versão na URL (mais comum)
GET /api/v1/users
GET /api/v2/users
GET /api/v3/users

# Com data
GET /api/2024-01-15/users
GET /api/2024-06-01/users`}
                  />
                  <p className="text-sm text-blue-700 dark:text-blue-300 mt-2">
                    <strong>Prós:</strong> Claro, fácil de implementar<br/>
                    <strong>Contras:</strong> URLs diferentes para cada versão
                  </p>
                </div>
                
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">2. Header Versioning</h4>
                  <CodeBlock
                    language="bash"
                    code={`# Versão no header
GET /api/users
API-Version: v2

# Accept header
GET /api/users
Accept: application/vnd.api+json;version=2`}
                  />
                  <p className="text-sm text-green-700 dark:text-green-300 mt-2">
                    <strong>Prós:</strong> URLs limpas, flexível<br/>
                    <strong>Contras:</strong> Menos visível, cache complexo
                  </p>
                </div>
                
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">3. Query Parameter</h4>
                  <CodeBlock
                    language="bash"
                    code={`# Versão como query parameter
GET /api/users?version=v2
GET /api/users?api_version=2024-01-15`}
                  />
                  <p className="text-sm text-purple-700 dark:text-purple-300 mt-2">
                    <strong>Prós:</strong> Simples, opcional<br/>
                    <strong>Contras:</strong> Pode ser ignorado, URLs longas
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Implementação Next.js</h3>
              <CodeBlock
                language="typescript"
                code={`// app/api/v1/users/route.ts
export async function GET() {
  return NextResponse.json({
    version: 'v1',
    users: await getUsersV1()
  });
}

// app/api/v2/users/route.ts
export async function GET() {
  return NextResponse.json({
    version: 'v2',
    users: await getUsersV2(),
    metadata: {
      total: await getUserCount(),
      page: 1
    }
  });
}

// lib/versioning.ts
export function getAPIVersion(request: NextRequest): string {
  // 1. Verificar header
  const headerVersion = request.headers.get('API-Version');
  if (headerVersion) return headerVersion;
  
  // 2. Verificar query parameter
  const { searchParams } = new URL(request.url);
  const queryVersion = searchParams.get('version');
  if (queryVersion) return queryVersion;
  
  // 3. Verificar path
  const pathMatch = request.nextUrl.pathname.match(/\/api\/(v\\d+)\//);;
  if (pathMatch) return pathMatch[1];
  
  // 4. Versão padrão
  return 'v1';
}

// Middleware para versionamento
export function withVersioning(
  handlers: Record<string, Function>
) {
  return async (request: NextRequest) => {
    const version = getAPIVersion(request);
    const handler = handlers[version] || handlers['v1'];
    
    if (!handler) {
      return NextResponse.json(
        { error: \`API version \${version} not supported\` },
        { status: 400 }
      );
    }
    
    return handler(request);
  };
}

// Uso do middleware
export const GET = withVersioning({
  'v1': getUsersV1Handler,
  'v2': getUsersV2Handler,
  'v3': getUsersV3Handler
});`}
              />
            </div>
          </div>
        </DemoSection>

        <DemoSection title="Paginação e Filtros">
          <div className="grid md:grid-cols-2 gap-1.5">
            <div>
              <h3 className="text-xl font-semibold mb-4">Paginação Eficiente</h3>
              <CodeBlock
                language="typescript"
                code={`// Paginação offset-based
interface PaginationQuery {
  page?: number;
  limit?: number;
  offset?: number;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  const page = parseInt(searchParams.get('page') || '1');
  const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100);
  const offset = (page - 1) * limit;
  
  const [users, total] = await Promise.all([
    getUsersPaginated({ offset, limit }),
    getUserCount()
  ]);
  
  const totalPages = Math.ceil(total / limit);
  
  return NextResponse.json({
    data: users,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null
    },
    links: {
      self: \`/api/users?page=\${page}&limit=\${limit}\`,
      first: \`/api/users?page=1&limit=\${limit}\`,
      last: \`/api/users?page=\${totalPages}&limit=\${limit}\`,
      next: page < totalPages ? \`/api/users?page=\${page + 1}&limit=\${limit}\` : null,
      prev: page > 1 ? \`/api/users?page=\${page - 1}&limit=\${limit}\` : null
    }
  });
}

// Paginação cursor-based (para grandes datasets)
export async function getCursorPaginated(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  const cursor = searchParams.get('cursor');
  const limit = parseInt(searchParams.get('limit') || '10');
  
  const users = await getUsersCursor({ cursor, limit });
  const nextCursor = users.length === limit ? users[users.length - 1].id : null;
  
  return NextResponse.json({
    data: users,
    pagination: {
      cursor,
      nextCursor,
      hasNext: nextCursor !== null,
      limit
    },
    links: {
      self: cursor ? \`/api/users?cursor=\${cursor}&limit=\${limit}\` : \`/api/users?limit=\${limit}\`,
      next: nextCursor ? \`/api/users?cursor=\${nextCursor}&limit=\${limit}\` : null
    }
  });
}`}
              />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Filtros Avançados</h3>
              <CodeBlock
                language="typescript"
                code={`// Sistema de filtros flexível
interface FilterQuery {
  // Filtros básicos
  name?: string;
  email?: string;
  role?: string;
  active?: boolean;
  
  // Filtros de data
  created_after?: string;
  created_before?: string;
  
  // Filtros numéricos
  age_min?: number;
  age_max?: number;
  
  // Busca
  search?: string;
  
  // Ordenação
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

function buildFilters(searchParams: URLSearchParams): FilterQuery {
  return {
    name: searchParams.get('name') || undefined,
    email: searchParams.get('email') || undefined,
    role: searchParams.get('role') || undefined,
    active: searchParams.get('active') === 'true' ? true : 
            searchParams.get('active') === 'false' ? false : undefined,
    
    created_after: searchParams.get('created_after') || undefined,
    created_before: searchParams.get('created_before') || undefined,
    
    age_min: searchParams.get('age_min') ? parseInt(searchParams.get('age_min')!) : undefined,
    age_max: searchParams.get('age_max') ? parseInt(searchParams.get('age_max')!) : undefined,
    
    search: searchParams.get('search') || undefined,
    
    sort_by: searchParams.get('sort_by') || 'created_at',
    sort_order: (searchParams.get('sort_order') as 'asc' | 'desc') || 'desc'
  };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const filters = buildFilters(searchParams);
  
  // Validar filtros
  const allowedSortFields = ['name', 'email', 'created_at', 'updated_at', 'age'];
  if (filters.sort_by && !allowedSortFields.includes(filters.sort_by)) {
    return NextResponse.json(
      { error: \`Invalid sort field. Allowed: \${allowedSortFields.join(', ')}\` },
      { status: 400 }
    );
  }
  
  const users = await getUsersWithFilters(filters);
  
  return NextResponse.json({
    data: users,
    filters: filters,
    meta: {
      total: users.length,
      applied_filters: Object.keys(filters).filter(key => filters[key] !== undefined)
    }
  });
}

// Exemplos de uso:
// GET /api/users?role=admin&active=true
// GET /api/users?age_min=18&age_max=65
// GET /api/users?created_after=2024-01-01&sort_by=name&sort_order=asc
// GET /api/users?search=john&role=user`}
              />
            </div>
          </div>
        </DemoSection>

        <DemoSection title="Performance e Otimização">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-1.5 mb-8">
            {performanceTips.map((tip, index) => {
              const IconComponent = tip.icon;
              return (
                <motion.div
                  key={tip.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <DemoCardStatic
                    title={tip.title}
                    description={tip.description}
                    icon={<IconComponent className="w-6 h-6" />}
                    color={tip.color}
                  />
                </motion.div>
              );
            })}
          </div>
          
          <div className="grid md:grid-cols-2 gap-1.5">
            <div>
              <h3 className="text-xl font-semibold mb-4">Cache Headers</h3>
              <CodeBlock
                language="typescript"
                code={`// Implementar cache apropriado
export async function GET(request: NextRequest) {
  const users = await getUsers();
  
  const response = NextResponse.json(users);
  
  // Cache público por 5 minutos
  response.headers.set('Cache-Control', 'public, max-age=300');
  
  // ETag para validação
  const etag = generateETag(users);
  response.headers.set('ETag', etag);
  
  // Verificar If-None-Match
  const ifNoneMatch = request.headers.get('If-None-Match');
  if (ifNoneMatch === etag) {
    return new NextResponse(null, { status: 304 });
  }
  
  return response;
}

// Cache condicional
export async function getUsersWithCache(request: NextRequest) {
  const cacheKey = \`users:\${request.url}\`;
  
  // Verificar cache
  const cached = await redis.get(cacheKey);
  if (cached) {
    return NextResponse.json(JSON.parse(cached), {
      headers: {
        'X-Cache': 'HIT',
        'Cache-Control': 'public, max-age=300'
      }
    });
  }
  
  // Buscar dados
  const users = await getUsers();
  
  // Salvar no cache
  await redis.setex(cacheKey, 300, JSON.stringify(users));
  
  return NextResponse.json(users, {
    headers: {
      'X-Cache': 'MISS',
      'Cache-Control': 'public, max-age=300'
    }
  });
}`}
              />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Compressão e Otimização</h3>
              <CodeBlock
                language="typescript"
                code={`// middleware.ts - Compressão global
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Habilitar compressão
  if (request.nextUrl.pathname.startsWith('/api/')) {
    response.headers.set('Content-Encoding', 'gzip');
  }
  
  return response;
}

// Otimização de queries
export async function getOptimizedUsers() {
  // Usar select específico
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      // Não buscar campos desnecessários
    },
    // Incluir relacionamentos necessários
    include: {
      profile: {
        select: {
          avatar: true,
          bio: true
        }
      }
    },
    // Limitar resultados
    take: 100
  });
  
  return users;
}

// Lazy loading de relacionamentos
export async function getUserWithLazyLoading(id: number) {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true
    }
  });
  
  // Carregar relacionamentos sob demanda
  return {
    ...user,
    async posts() {
      return prisma.post.findMany({
        where: { authorId: id },
        take: 10
      });
    },
    async profile() {
      return prisma.profile.findUnique({
        where: { userId: id }
      });
    }
  };
}`}
              />
            </div>
          </div>
        </DemoSection>

        <DemoSection title="Documentação de API">
          <div className="grid md:grid-cols-2 gap-1.5">
            <div>
              <h3 className="text-xl font-semibold mb-4">OpenAPI/Swagger</h3>
              <CodeBlock
                language="yaml"
                code={`# swagger.yml
openapi: 3.0.0
info:
  title: NextCook API
  version: 1.0.0
  description: API REST para gerenciamento de usuários
  contact:
    name: API Support
    email: support@nextcook.com

servers:
  - url: https://api.nextcook.com/v1
    description: Production
  - url: http://localhost:3000/api/v1
    description: Development

paths:
  /users:
    get:
      summary: Listar usuários
      description: Retorna lista paginada de usuários
      parameters:
        - name: page
          in: query
          schema:
            type: integer
            minimum: 1
            default: 1
        - name: limit
          in: query
          schema:
            type: integer
            minimum: 1
            maximum: 100
            default: 10
        - name: role
          in: query
          schema:
            type: string
            enum: [admin, user, moderator]
      responses:
        '200':
          description: Lista de usuários
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: array
                    items:
                      $ref: '#/components/schemas/User'
                  pagination:
                    $ref: '#/components/schemas/Pagination'
        '400':
          $ref: '#/components/responses/BadRequest'
        '500':
          $ref: '#/components/responses/InternalError'
    
    post:
      summary: Criar usuário
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateUser'
      responses:
        '201':
          description: Usuário criado
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
        '400':
          $ref: '#/components/responses/ValidationError'
        '409':
          $ref: '#/components/responses/Conflict'

components:
  schemas:
    User:
      type: object
      properties:
        id:
          type: integer
          example: 123
        name:
          type: string
          example: "João Silva"
        email:
          type: string
          format: email
          example: "joao@example.com"
        role:
          type: string
          enum: [admin, user, moderator]
        created_at:
          type: string
          format: date-time
        updated_at:
          type: string
          format: date-time
    
    CreateUser:
      type: object
      required:
        - name
        - email
        - password
      properties:
        name:
          type: string
          minLength: 2
          maxLength: 100
        email:
          type: string
          format: email
        password:
          type: string
          minLength: 8
        age:
          type: integer
          minimum: 18
          maximum: 120
    
    Pagination:
      type: object
      properties:
        page:
          type: integer
        limit:
          type: integer
        total:
          type: integer
        totalPages:
          type: integer
        hasNext:
          type: boolean
        hasPrev:
          type: boolean
  
  responses:
    BadRequest:
      description: Requisição inválida
      content:
        application/json:
          schema:
            type: object
            properties:
              error:
                type: string
              details:
                type: array
                items:
                  type: object
    
    ValidationError:
      description: Erro de validação
      content:
        application/json:
          schema:
            type: object
            properties:
              error:
                type: string
                example: "Validation Error"
              details:
                type: array
                items:
                  type: object
                  properties:
                    field:
                      type: string
                    message:
                      type: string
    
    Conflict:
      description: Conflito de dados
      content:
        application/json:
          schema:
            type: object
            properties:
              error:
                type: string
                example: "Email already exists"
    
    InternalError:
      description: Erro interno do servidor
      content:
        application/json:
          schema:
            type: object
            properties:
              error:
                type: string
                example: "Internal Server Error"
  
  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT

security:
  - BearerAuth: []`}
              />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Documentação Automática</h3>
              <CodeBlock
                language="typescript"
                code={`// lib/swagger.ts
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'NextCook API',
      version: '1.0.0',
      description: 'API REST documentation'
    },
    servers: [
      {
        url: process.env.API_URL || 'http://localhost:3000/api',
        description: 'API Server'
      }
    ]
  },
  apis: ['./app/api/**/*.ts'] // Arquivos com anotações
};

export const specs = swaggerJsdoc(options);

// app/api/docs/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { specs } from '@/lib/swagger';

export async function GET() {
  return NextResponse.json(specs);
}

// Anotações nos route handlers
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Listar usuários
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número da página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Itens por página
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 */
export async function GET(request: NextRequest) {
  // Implementação...
}

// Componente para exibir docs
// app/docs/page.tsx
'use client';

import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

export default function DocsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">API Documentation</h1>
      <SwaggerUI url="/api/docs" />
    </div>
  );
}`}
              />
            </div>
          </div>
        </DemoSection>

        <DemoSection title="Segurança e Monitoramento">
          <div className="grid md:grid-cols-2 gap-1.5">
            <div>
              <h3 className="text-xl font-semibold mb-4">Headers de Segurança</h3>
              <CodeBlock
                language="typescript"
                code={`// middleware.ts - Headers de segurança
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Headers de segurança
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // HSTS em produção
  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload'
    );
  }
  
  // CSP
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"
  );
  
  return response;
}

// Rate limiting por IP
const rateLimitMap = new Map();

export function rateLimit(maxRequests = 100, windowMs = 15 * 60 * 1000) {
  return (request: NextRequest) => {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    const windowStart = now - windowMs;
    
    // Limpar entradas antigas
    for (const [key, data] of rateLimitMap.entries()) {
      if (data.resetTime < now) {
        rateLimitMap.delete(key);
      }
    }
    
    const current = rateLimitMap.get(ip) || { count: 0, resetTime: now + windowMs };
    
    if (current.resetTime < now) {
      current.count = 1;
      current.resetTime = now + windowMs;
    } else {
      current.count++;
    }
    
    rateLimitMap.set(ip, current);
    
    if (current.count > maxRequests) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': maxRequests.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': current.resetTime.toString(),
            'Retry-After': Math.ceil((current.resetTime - now) / 1000).toString()
          }
        }
      );
    }
    
    return NextResponse.next();
  };
}`}
              />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Logging e Monitoramento</h3>
              <CodeBlock
                language="typescript"
                code={`// lib/monitoring.ts
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

// Middleware de logging
export function logRequest(request: NextRequest, response: NextResponse) {
  const logData = {
    method: request.method,
    url: request.url,
    status: response.status,
    userAgent: request.headers.get('user-agent'),
    ip: request.headers.get('x-forwarded-for'),
    timestamp: new Date().toISOString()
  };
  
  if (response.status >= 400) {
    logger.error('API Error', logData);
  } else {
    logger.info('API Request', logData);
  }
}

// Métricas de performance
const metrics = {
  requests: 0,
  errors: 0,
  responseTime: [] as number[]
};

export function trackMetrics(duration: number, status: number) {
  metrics.requests++;
  metrics.responseTime.push(duration);
  
  if (status >= 400) {
    metrics.errors++;
  }
  
  // Manter apenas últimas 1000 requisições
  if (metrics.responseTime.length > 1000) {
    metrics.responseTime = metrics.responseTime.slice(-1000);
  }
}

export function getMetrics() {
  const avgResponseTime = metrics.responseTime.length > 0
    ? metrics.responseTime.reduce((a, b) => a + b, 0) / metrics.responseTime.length
    : 0;
  
  return {
    totalRequests: metrics.requests,
    totalErrors: metrics.errors,
    errorRate: metrics.requests > 0 ? (metrics.errors / metrics.requests) * 100 : 0,
    avgResponseTime: Math.round(avgResponseTime),
    uptime: process.uptime()
  };
}

// Endpoint de health check
// app/api/health/route.ts
export async function GET() {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    metrics: getMetrics()
  };
  
  return NextResponse.json(health);
}`}
              />
            </div>
          </div>
        </DemoSection>

        <DemoSection title="Checklist de Melhores Práticas">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4">📋 Checklist Completo</h3>
            
            <div className="grid md:grid-cols-2 gap-1.5">
              <div>
                <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-3">🏗️ Design & Arquitetura</h4>
                <ul className="space-y-1 text-blue-600 dark:text-blue-400 text-sm">
                  <li>✅ URLs RESTful com substantivos</li>
                  <li>✅ Métodos HTTP apropriados</li>
                  <li>✅ Status codes corretos</li>
                  <li>✅ Versionamento de API</li>
                  <li>✅ Estrutura de resposta consistente</li>
                  <li>✅ Paginação implementada</li>
                  <li>✅ Filtros e ordenação</li>
                </ul>
                
                <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-3 mt-4">🔒 Segurança</h4>
                <ul className="space-y-1 text-blue-600 dark:text-blue-400 text-sm">
                  <li>✅ Autenticação implementada</li>
                  <li>✅ Autorização por roles</li>
                  <li>✅ Validação de entrada</li>
                  <li>✅ Rate limiting</li>
                  <li>✅ Headers de segurança</li>
                  <li>✅ HTTPS em produção</li>
                  <li>✅ Sanitização de dados</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-3">⚡ Performance</h4>
                <ul className="space-y-1 text-blue-600 dark:text-blue-400 text-sm">
                  <li>✅ Cache implementado</li>
                  <li>✅ Compressão habilitada</li>
                  <li>✅ Queries otimizadas</li>
                  <li>✅ Lazy loading</li>
                  <li>✅ Connection pooling</li>
                  <li>✅ CDN configurado</li>
                  <li>✅ Monitoramento ativo</li>
                </ul>
                
                <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-3 mt-4">📚 Documentação & Testes</h4>
                <ul className="space-y-1 text-blue-600 dark:text-blue-400 text-sm">
                  <li>✅ Documentação OpenAPI</li>
                  <li>✅ Exemplos de uso</li>
                  <li>✅ Testes unitários</li>
                  <li>✅ Testes de integração</li>
                  <li>✅ Testes E2E</li>
                  <li>✅ Cobertura de código</li>
                  <li>✅ CI/CD configurado</li>
                </ul>
              </div>
            </div>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}