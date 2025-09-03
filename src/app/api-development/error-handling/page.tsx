'use client';

import { motion } from 'framer-motion';
import { 
  AlertTriangle, 
  Bug, 
  Shield, 
  FileText, 
  Clock, 
  Database,
  Zap,
  Settings,
  CheckCircle,
  XCircle,
  Info,
  AlertCircle
} from 'lucide-react';
import { DemoSection } from '@/components/DemoSection';
import { CodeBlock } from '@/components/CodeBlock';
import Breadcrumbs from '@/components/Breadcrumbs';
import { DemoCardStatic } from '@/components/DemoCardStatic';

const errorTypes = [
  {
    title: 'Validation Errors',
    description: 'Erros de validação de dados',
    icon: AlertTriangle,
    color: 'orange',
    status: 400,
    example: 'Dados de entrada inválidos'
  },
  {
    title: 'Authentication Errors',
    description: 'Erros de autenticação',
    icon: Shield,
    color: 'red',
    status: 401,
    example: 'Token inválido ou expirado'
  },
  {
    title: 'Authorization Errors',
    description: 'Erros de autorização',
    icon: XCircle,
    color: 'purple',
    status: 403,
    example: 'Sem permissão para acessar'
  },
  {
    title: 'Not Found Errors',
    description: 'Recursos não encontrados',
    icon: Info,
    color: 'blue',
    status: 404,
    example: 'Usuário não encontrado'
  },
  {
    title: 'Server Errors',
    description: 'Erros internos do servidor',
    icon: Bug,
    color: 'red',
    status: 500,
    example: 'Erro de conexão com banco'
  },
  {
    title: 'Rate Limit Errors',
    description: 'Limite de requisições excedido',
    icon: Clock,
    color: 'yellow',
    status: 429,
    example: 'Muitas requisições'
  }
];

const errorHandlingFeatures = [
  {
    title: 'Structured Errors',
    description: 'Erros padronizados e estruturados',
    icon: FileText,
    color: 'blue'
  },
  {
    title: 'Error Logging',
    description: 'Registro detalhado de erros',
    icon: Database,
    color: 'green'
  },
  {
    title: 'Error Monitoring',
    description: 'Monitoramento em tempo real',
    icon: Zap,
    color: 'purple'
  },
  {
    title: 'Error Recovery',
    description: 'Estratégias de recuperação',
    icon: Settings,
    color: 'orange'
  }
];

const httpStatusCodes = [
  { code: 400, name: 'Bad Request', description: 'Requisição malformada' },
  { code: 401, name: 'Unauthorized', description: 'Autenticação necessária' },
  { code: 403, name: 'Forbidden', description: 'Acesso negado' },
  { code: 404, name: 'Not Found', description: 'Recurso não encontrado' },
  { code: 409, name: 'Conflict', description: 'Conflito de dados' },
  { code: 422, name: 'Unprocessable Entity', description: 'Dados inválidos' },
  { code: 429, name: 'Too Many Requests', description: 'Rate limit excedido' },
  { code: 500, name: 'Internal Server Error', description: 'Erro interno' },
  { code: 502, name: 'Bad Gateway', description: 'Gateway inválido' },
  { code: 503, name: 'Service Unavailable', description: 'Serviço indisponível' }
];

export default function ErrorHandlingPage() {
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
            ⚠️ Tratamento de Erros
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Implemente tratamento de erros robusto e consistente em suas APIs Next.js.
            Aprenda sobre códigos de status, logging, monitoramento e recuperação.
          </p>
        </motion.div>

        <DemoSection title="Tipos de Erros Comuns">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {errorTypes.map((error, index) => {
              const IconComponent = error.icon;
              return (
                <motion.div
                  key={error.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center mb-4">
                    <div className={`p-3 rounded-lg bg-${error.color}-100 dark:bg-${error.color}-900/20 mr-4`}>
                      <IconComponent className={`h-6 w-6 text-${error.color}-600 dark:text-${error.color}-400`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">{error.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{error.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Status Code:</span>
                      <span className={`px-2 py-1 rounded text-xs font-bold bg-${error.color}-100 text-${error.color}-800 dark:bg-${error.color}-900/20 dark:text-${error.color}-200`}>
                        {error.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      <strong>Exemplo:</strong> {error.example}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </DemoSection>

        <DemoSection title="Estrutura de Erro Padronizada">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Interface de Erro</h3>
              <CodeBlock
                language="typescript"
                code={`// types/error.ts
export interface APIError {
  error: string;                    // Mensagem principal
  message?: string;                 // Mensagem detalhada
  code?: string;                    // Código interno do erro
  details?: ErrorDetail[];          // Detalhes específicos
  timestamp: string;                // Timestamp ISO
  path: string;                     // Caminho da API
  method: string;                   // Método HTTP
  requestId?: string;               // ID único da requisição
  stack?: string;                   // Stack trace (apenas dev)
}

export interface ErrorDetail {
  field?: string;                   // Campo específico
  message: string;                  // Mensagem do erro
  code?: string;                    // Código do erro
  value?: any;                      // Valor que causou o erro
}

// Tipos de erro específicos
export interface ValidationError extends APIError {
  error: 'Validation Error';
  details: ValidationErrorDetail[];
}

export interface ValidationErrorDetail extends ErrorDetail {
  field: string;
  rule: string;                     // Regra de validação violada
  expected?: any;                   // Valor esperado
  received?: any;                   // Valor recebido
}

export interface AuthenticationError extends APIError {
  error: 'Authentication Error';
  code: 'TOKEN_EXPIRED' | 'TOKEN_INVALID' | 'TOKEN_MISSING';
}

export interface AuthorizationError extends APIError {
  error: 'Authorization Error';
  required: string[];               // Permissões necessárias
  userRole?: string;                // Role do usuário
}

export interface NotFoundError extends APIError {
  error: 'Not Found';
  resource: string;                 // Tipo de recurso
  identifier: string | number;      // ID do recurso
}

export interface ConflictError extends APIError {
  error: 'Conflict';
  conflictingField: string;
  existingValue: any;
}

export interface RateLimitError extends APIError {
  error: 'Rate Limit Exceeded';
  limit: number;
  remaining: number;
  resetTime: number;
  retryAfter: number;
}`}
              />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Classe de Erro Base</h3>
              <CodeBlock
                language="typescript"
                code={`// lib/errors.ts
import { NextRequest, NextResponse } from 'next/server';

export class APIErrorBase extends Error {
  public readonly statusCode: number;
  public readonly code?: string;
  public readonly details?: any[];
  public readonly isOperational: boolean;
  
  constructor(
    message: string,
    statusCode: number = 500,
    code?: string,
    details?: any[],
    isOperational: boolean = true
  ) {
    super(message);
    
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    this.isOperational = isOperational;
    
    Error.captureStackTrace(this, this.constructor);
  }
  
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
      code: this.code,
      details: this.details,
      stack: process.env.NODE_ENV === 'development' ? this.stack : undefined
    };
  }
}

// Erros específicos
export class ValidationError extends APIErrorBase {
  constructor(message: string, details?: any[]) {
    super(message, 400, 'VALIDATION_ERROR', details);
  }
}

export class AuthenticationError extends APIErrorBase {
  constructor(message: string = 'Authentication required', code?: string) {
    super(message, 401, code || 'AUTHENTICATION_ERROR');
  }
}

export class AuthorizationError extends APIErrorBase {
  constructor(message: string = 'Access denied', required?: string[]) {
    super(message, 403, 'AUTHORIZATION_ERROR', required ? [{ required }] : undefined);
  }
}

export class NotFoundError extends APIErrorBase {
  constructor(resource: string, identifier?: string | number) {
    const message = identifier 
      ? \`\${resource} with ID '\${identifier}' not found\`
      : \`\${resource} not found\`;
    super(message, 404, 'NOT_FOUND', [{ resource, identifier }]);
  }
}

export class ConflictError extends APIErrorBase {
  constructor(message: string, field?: string, value?: any) {
    super(message, 409, 'CONFLICT', field ? [{ field, value }] : undefined);
  }
}

export class RateLimitError extends APIErrorBase {
  constructor(limit: number, resetTime: number) {
    super('Rate limit exceeded', 429, 'RATE_LIMIT_EXCEEDED', [
      { limit, resetTime, retryAfter: Math.ceil((resetTime - Date.now()) / 1000) }
    ]);
  }
}

export class DatabaseError extends APIErrorBase {
  constructor(message: string, originalError?: Error) {
    super(message, 500, 'DATABASE_ERROR', originalError ? [{ originalError: originalError.message }] : undefined, false);
  }
}

export class ExternalServiceError extends APIErrorBase {
  constructor(service: string, message: string) {
    super(\`External service error: \${service} - \${message}\`, 502, 'EXTERNAL_SERVICE_ERROR', [{ service }]);
  }
}`}
              />
            </div>
          </div>
        </DemoSection>

        <DemoSection title="Error Handler Global">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibent mb-4">Handler Principal</h3>
              <CodeBlock
                language="typescript"
                code={`// lib/error-handler.ts
import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { APIErrorBase } from './errors';
import { logError } from './logger';

export function createErrorResponse(
  error: unknown,
  request: NextRequest
): NextResponse {
  const timestamp = new Date().toISOString();
  const path = new URL(request.url).pathname;
  const method = request.method;
  const requestId = request.headers.get('x-request-id') || generateRequestId();
  
  // Erro customizado da aplicação
  if (error instanceof APIErrorBase) {
    const errorResponse = {
      error: error.message,
      code: error.code,
      details: error.details,
      timestamp,
      path,
      method,
      requestId,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    };
    
    // Log apenas erros não operacionais
    if (!error.isOperational) {
      logError(error, { request, errorResponse });
    }
    
    return NextResponse.json(errorResponse, {
      status: error.statusCode,
      headers: {
        'X-Request-ID': requestId,
        'X-Error-Code': error.code || 'UNKNOWN'
      }
    });
  }
  
  // Erro de validação Zod
  if (error instanceof ZodError) {
    const errorResponse = {
      error: 'Validation Error',
      code: 'VALIDATION_ERROR',
      details: error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message,
        code: err.code,
        received: 'received' in err ? err.received : undefined,
        expected: 'expected' in err ? err.expected : undefined
      })),
      timestamp,
      path,
      method,
      requestId
    };
    
    return NextResponse.json(errorResponse, {
      status: 400,
      headers: {
        'X-Request-ID': requestId,
        'X-Error-Code': 'VALIDATION_ERROR'
      }
    });
  }
  
  // Erro genérico
  const genericError = error instanceof Error ? error : new Error('Unknown error');
  
  // Log erro não tratado
  logError(genericError, { request, type: 'UNHANDLED_ERROR' });
  
  const errorResponse = {
    error: 'Internal Server Error',
    code: 'INTERNAL_ERROR',
    message: process.env.NODE_ENV === 'development' 
      ? genericError.message 
      : 'An unexpected error occurred',
    timestamp,
    path,
    method,
    requestId,
    stack: process.env.NODE_ENV === 'development' ? genericError.stack : undefined
  };
  
  return NextResponse.json(errorResponse, {
    status: 500,
    headers: {
      'X-Request-ID': requestId,
      'X-Error-Code': 'INTERNAL_ERROR'
    }
  });
}

// Wrapper para route handlers
export function withErrorHandler(
  handler: (request: NextRequest, context?: any) => Promise<NextResponse>
) {
  return async (request: NextRequest, context?: any): Promise<NextResponse> => {
    try {
      return await handler(request, context);
    } catch (error) {
      return createErrorResponse(error, request);
    }
  };
}

function generateRequestId(): string {
  return \`req_\${Date.now()}_\${Math.random().toString(36).substr(2, 9)}\`;
}`}
              />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Uso em Route Handlers</h3>
              <CodeBlock
                language="typescript"
                code={`// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { withErrorHandler } from '@/lib/error-handler';
import { 
  ValidationError, 
  NotFoundError, 
  ConflictError 
} from '@/lib/errors';
import { z } from 'zod';

const CreateUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  age: z.number().min(18)
});

// GET /api/users
export const GET = withErrorHandler(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  
  if (page < 1) {
    throw new ValidationError('Page must be greater than 0', [
      { field: 'page', message: 'Must be greater than 0', value: page }
    ]);
  }
  
  const users = await getUsers({ page });
  
  return NextResponse.json({
    users: users.data,
    pagination: {
      page,
      total: users.total,
      totalPages: Math.ceil(users.total / 10)
    }
  });
});

// POST /api/users
export const POST = withErrorHandler(async (request: NextRequest) => {
  const body = await request.json();
  
  // Validação com Zod (erro será capturado automaticamente)
  const validatedData = CreateUserSchema.parse(body);
  
  // Verificar se email já existe
  const existingUser = await getUserByEmail(validatedData.email);
  if (existingUser) {
    throw new ConflictError(
      'Email already in use',
      'email',
      validatedData.email
    );
  }
  
  try {
    const newUser = await createUser(validatedData);
    
    return NextResponse.json(newUser, { status: 201 });
  } catch (dbError) {
    // Erro de banco será tratado pelo error handler
    throw new DatabaseError('Failed to create user', dbError as Error);
  }
});

// app/api/users/[id]/route.ts
export const GET = withErrorHandler(async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const userId = parseInt(params.id);
  
  if (isNaN(userId)) {
    throw new ValidationError('Invalid user ID', [
      { field: 'id', message: 'Must be a valid number', value: params.id }
    ]);
  }
  
  const user = await getUserById(userId);
  
  if (!user) {
    throw new NotFoundError('User', userId);
  }
  
  return NextResponse.json(user);
});

export const DELETE = withErrorHandler(async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const userId = parseInt(params.id);
  const currentUserId = getCurrentUserId(request);
  
  // Verificar se usuário existe
  const user = await getUserById(userId);
  if (!user) {
    throw new NotFoundError('User', userId);
  }
  
  // Verificar permissões
  if (userId === currentUserId) {
    throw new ValidationError('Cannot delete your own account');
  }
  
  if (!hasPermission(request, 'user:delete')) {
    throw new AuthorizationError('Insufficient permissions to delete users');
  }
  
  await deleteUser(userId);
  
  return NextResponse.json(
    { message: 'User deleted successfully' },
    { status: 200 }
  );
});`}
              />
            </div>
          </div>
        </DemoSection>

        <DemoSection title="Logging de Erros">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Sistema de Logging</h3>
              <CodeBlock
                language="typescript"
                code={`// lib/logger.ts
import winston from 'winston';

// Configurar Winston
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: {
    service: 'nextcook-api',
    environment: process.env.NODE_ENV
  },
  transports: [
    // Console para desenvolvimento
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    
    // Arquivo para produção
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error'
    }),
    
    new winston.transports.File({
      filename: 'logs/combined.log'
    })
  ]
});

// Adicionar transporte para serviços externos em produção
if (process.env.NODE_ENV === 'production') {
  // Exemplo: Sentry, LogRocket, etc.
  if (process.env.SENTRY_DSN) {
    // logger.add(new SentryTransport());
  }
}

export interface LogContext {
  request?: {
    method: string;
    url: string;
    headers: Record<string, string>;
    ip?: string;
    userAgent?: string;
    userId?: string;
  };
  user?: {
    id: string;
    email: string;
    role: string;
  };
  performance?: {
    duration: number;
    memoryUsage: NodeJS.MemoryUsage;
  };
  [key: string]: any;
}

// Função para log de erros
export function logError(
  error: Error,
  context: LogContext = {}
) {
  logger.error({
    message: error.message,
    stack: error.stack,
    name: error.name,
    ...context,
    timestamp: new Date().toISOString()
  });
}

// Função para log de informações
export function logInfo(
  message: string,
  context: LogContext = {}
) {
  logger.info({
    message,
    ...context,
    timestamp: new Date().toISOString()
  });
}

// Função para log de warnings
export function logWarning(
  message: string,
  context: LogContext = {}
) {
  logger.warn({
    message,
    ...context,
    timestamp: new Date().toISOString()
  });
}

// Middleware de logging para requisições
export function logRequest(
  request: NextRequest,
  response: NextResponse,
  duration: number
) {
  const logData = {
    method: request.method,
    url: request.url,
    status: response.status,
    duration,
    userAgent: request.headers.get('user-agent'),
    ip: request.headers.get('x-forwarded-for') || 
        request.headers.get('x-real-ip') || 
        'unknown',
    requestId: request.headers.get('x-request-id'),
    userId: request.headers.get('x-user-id')
  };
  
  if (response.status >= 400) {
    logger.error('HTTP Error', logData);
  } else {
    logger.info('HTTP Request', logData);
  }
}`}
              />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Monitoramento de Erros</h3>
              <CodeBlock
                language="typescript"
                code={`// lib/error-monitoring.ts
import { logError } from './logger';

// Interface para métricas de erro
interface ErrorMetrics {
  count: number;
  lastOccurrence: Date;
  firstOccurrence: Date;
  affectedUsers: Set<string>;
  statusCodes: Map<number, number>;
  paths: Map<string, number>;
}

// Cache em memória para métricas (use Redis em produção)
const errorMetrics = new Map<string, ErrorMetrics>();

// Rastrear erro
export function trackError(
  error: Error,
  context: {
    userId?: string;
    path: string;
    statusCode: number;
    requestId: string;
  }
) {
  const errorKey = \`\${error.name}:\${error.message}\`;
  const now = new Date();
  
  let metrics = errorMetrics.get(errorKey);
  
  if (!metrics) {
    metrics = {
      count: 0,
      lastOccurrence: now,
      firstOccurrence: now,
      affectedUsers: new Set(),
      statusCodes: new Map(),
      paths: new Map()
    };
    errorMetrics.set(errorKey, metrics);
  }
  
  // Atualizar métricas
  metrics.count++;
  metrics.lastOccurrence = now;
  
  if (context.userId) {
    metrics.affectedUsers.add(context.userId);
  }
  
  // Contar status codes
  const statusCount = metrics.statusCodes.get(context.statusCode) || 0;
  metrics.statusCodes.set(context.statusCode, statusCount + 1);
  
  // Contar paths
  const pathCount = metrics.paths.get(context.path) || 0;
  metrics.paths.set(context.path, pathCount + 1);
  
  // Alertas para erros críticos
  if (shouldAlert(errorKey, metrics)) {
    sendAlert(error, metrics, context);
  }
  
  // Log estruturado
  logError(error, {
    metrics: {
      count: metrics.count,
      affectedUsers: metrics.affectedUsers.size,
      isRecurring: metrics.count > 1
    },
    context
  });
}

// Verificar se deve enviar alerta
function shouldAlert(errorKey: string, metrics: ErrorMetrics): boolean {
  // Alertar se:
  // 1. Erro novo (primeira ocorrência)
  // 2. Muitas ocorrências em pouco tempo
  // 3. Muitos usuários afetados
  
  if (metrics.count === 1) {
    return true; // Primeiro erro
  }
  
  const timeDiff = metrics.lastOccurrence.getTime() - metrics.firstOccurrence.getTime();
  const hourInMs = 60 * 60 * 1000;
  
  // Mais de 10 erros na última hora
  if (metrics.count > 10 && timeDiff < hourInMs) {
    return true;
  }
  
  // Mais de 5 usuários afetados
  if (metrics.affectedUsers.size > 5) {
    return true;
  }
  
  return false;
}

// Enviar alerta
async function sendAlert(
  error: Error,
  metrics: ErrorMetrics,
  context: any
) {
  const alertData = {
    error: {
      name: error.name,
      message: error.message,
      stack: error.stack
    },
    metrics: {
      count: metrics.count,
      affectedUsers: metrics.affectedUsers.size,
      timeSpan: metrics.lastOccurrence.getTime() - metrics.firstOccurrence.getTime()
    },
    context,
    timestamp: new Date().toISOString(),
    severity: getSeverity(metrics)
  };
  
  // Enviar para Slack, Discord, email, etc.
  if (process.env.SLACK_WEBHOOK_URL) {
    await sendSlackAlert(alertData);
  }
  
  if (process.env.EMAIL_ALERTS_ENABLED) {
    await sendEmailAlert(alertData);
  }
  
  // Log do alerta
  logError(new Error('Error Alert Sent'), { alertData });
}

// Determinar severidade
function getSeverity(metrics: ErrorMetrics): 'low' | 'medium' | 'high' | 'critical' {
  if (metrics.affectedUsers.size > 10) return 'critical';
  if (metrics.count > 50) return 'high';
  if (metrics.count > 10) return 'medium';
  return 'low';
}

// Obter estatísticas de erro
export function getErrorStats() {
  const stats = Array.from(errorMetrics.entries()).map(([key, metrics]) => ({
    error: key,
    count: metrics.count,
    affectedUsers: metrics.affectedUsers.size,
    firstOccurrence: metrics.firstOccurrence,
    lastOccurrence: metrics.lastOccurrence,
    topStatusCodes: Array.from(metrics.statusCodes.entries())
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3),
    topPaths: Array.from(metrics.paths.entries())
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
  }));
  
  return stats.sort((a, b) => b.count - a.count);
}`}
              />
            </div>
          </div>
        </DemoSection>

        <DemoSection title="Códigos de Status HTTP">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {httpStatusCodes.map((status, index) => (
              <motion.div
                key={status.code}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`p-4 rounded-lg border ${
                  status.code >= 500 ? 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800' :
                  status.code >= 400 ? 'bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-800' :
                  'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-lg font-bold ${
                    status.code >= 500 ? 'text-red-700 dark:text-red-300' :
                    status.code >= 400 ? 'text-orange-700 dark:text-orange-300' :
                    'text-green-700 dark:text-green-300'
                  }`}>
                    {status.code}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    status.code >= 500 ? 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100' :
                    status.code >= 400 ? 'bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-100' :
                    'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                  }`}>
                    {status.code >= 500 ? 'Server' : status.code >= 400 ? 'Client' : 'Success'}
                  </span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                  {status.name}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  {status.description}
                </p>
              </motion.div>
            ))}
          </div>
        </DemoSection>

        <DemoSection title="Estratégias de Recuperação">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Retry Logic</h3>
              <CodeBlock
                language="typescript"
                code={`// lib/retry.ts

interface RetryOptions {
  maxAttempts: number;
  baseDelay: number;
  maxDelay: number;
  backoffFactor: number;
  retryCondition?: (error: Error) => boolean;
}

const defaultRetryOptions: RetryOptions = {
  maxAttempts: 3,
  baseDelay: 1000,
  maxDelay: 10000,
  backoffFactor: 2,
  retryCondition: (error) => {
    // Retry apenas para erros temporários
    return error.message.includes('timeout') ||
           error.message.includes('connection') ||
           error.message.includes('network');
  }
};

export async function withRetry<T>(
  operation: () => Promise<T>,
  options: Partial<RetryOptions> = {}
): Promise<T> {
  const opts = { ...defaultRetryOptions, ...options };
  let lastError: Error;
  
  for (let attempt = 1; attempt <= opts.maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;
      
      // Não retry se não atender condição
      if (!opts.retryCondition!(lastError)) {
        throw lastError;
      }
      
      // Última tentativa
      if (attempt === opts.maxAttempts) {
        throw lastError;
      }
      
      // Calcular delay com exponential backoff
      const delay = Math.min(
        opts.baseDelay * Math.pow(opts.backoffFactor, attempt - 1),
        opts.maxDelay
      );
      
      // Log da tentativa
      logWarning(\`Retry attempt \${attempt}/\${opts.maxAttempts}\`, {
        error: lastError.message,
        delay,
        nextAttempt: attempt + 1
      });
      
      // Aguardar antes da próxima tentativa
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError!;
}

// Exemplo de uso
export async function fetchUserWithRetry(userId: number) {
  return withRetry(
    async () => {
      const response = await fetch(\`/api/users/\${userId}\`);
      
      if (!response.ok) {
        throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
      }
      
      return response.json();
    },
    {
      maxAttempts: 3,
      baseDelay: 500,
      retryCondition: (error) => {
        // Retry para erros de rede e 5xx
        return error.message.includes('fetch') ||
               error.message.includes('HTTP 5');
      }
    }
  );
}`}
              />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Circuit Breaker</h3>
              <CodeBlock
                language="typescript"
                code={`// lib/circuit-breaker.ts

type CircuitState = 'CLOSED' | 'OPEN' | 'HALF_OPEN';

interface CircuitBreakerOptions {
  failureThreshold: number;
  recoveryTimeout: number;
  monitoringPeriod: number;
}

export class CircuitBreaker {
  private state: CircuitState = 'CLOSED';
  private failureCount = 0;
  private lastFailureTime = 0;
  private successCount = 0;
  
  constructor(private options: CircuitBreakerOptions) {}
  
  async execute<T>(operation: () => Promise<T>): Promise<T> {
    if (this.state === 'OPEN') {
      if (this.shouldAttemptReset()) {
        this.state = 'HALF_OPEN';
        this.successCount = 0;
      } else {
        throw new Error('Circuit breaker is OPEN');
      }
    }
    
    try {
      const result = await operation();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }
  
  private onSuccess() {
    this.failureCount = 0;
    
    if (this.state === 'HALF_OPEN') {
      this.successCount++;
      
      // Se teve sucesso suficiente, fechar circuito
      if (this.successCount >= 3) {
        this.state = 'CLOSED';
      }
    }
  }
  
  private onFailure() {
    this.failureCount++;
    this.lastFailureTime = Date.now();
    
    if (this.failureCount >= this.options.failureThreshold) {
      this.state = 'OPEN';
    }
  }
  
  private shouldAttemptReset(): boolean {
    return Date.now() - this.lastFailureTime >= this.options.recoveryTimeout;
  }
  
  getState(): CircuitState {
    return this.state;
  }
  
  getMetrics() {
    return {
      state: this.state,
      failureCount: this.failureCount,
      successCount: this.successCount,
      lastFailureTime: this.lastFailureTime
    };
  }
}

// Uso do Circuit Breaker
const dbCircuitBreaker = new CircuitBreaker({
  failureThreshold: 5,
  recoveryTimeout: 30000, // 30 segundos
  monitoringPeriod: 60000  // 1 minuto
});

export async function queryDatabaseWithCircuitBreaker(query: string) {
  return dbCircuitBreaker.execute(async () => {
    // Operação que pode falhar
    const result = await database.query(query);
    return result;
  });
}

// Middleware para APIs com circuit breaker
export function withCircuitBreaker(
  circuitBreaker: CircuitBreaker
) {
  return (handler: Function) => {
    return async (request: NextRequest, context?: any) => {
      try {
        return await circuitBreaker.execute(() => 
          handler(request, context)
        );
      } catch (error) {
        if (error instanceof Error && error.message === 'Circuit breaker is OPEN') {
          return NextResponse.json(
            {
              error: 'Service temporarily unavailable',
              code: 'CIRCUIT_BREAKER_OPEN',
              retryAfter: 30
            },
            { status: 503 }
          );
        }
        throw error;
      }
    };
  };
}`}
              />
            </div>
          </div>
        </DemoSection>

        <DemoSection title="Recursos de Tratamento de Erros">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {errorHandlingFeatures.map((feature, index) => {
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

        <DemoSection title="Melhores Práticas">
          <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-orange-800 dark:text-orange-200 mb-4">⚠️ Práticas Essenciais</h3>
            <ul className="space-y-2 text-orange-700 dark:text-orange-300">
              <li>• <strong>Consistência:</strong> Use estrutura de erro padronizada em toda API</li>
              <li>• <strong>Status Codes:</strong> Use códigos HTTP apropriados para cada tipo de erro</li>
              <li>• <strong>Mensagens:</strong> Forneça mensagens claras e acionáveis para o usuário</li>
              <li>• <strong>Logging:</strong> Registre todos os erros com contexto suficiente</li>
              <li>• <strong>Monitoramento:</strong> Implemente alertas para erros críticos</li>
              <li>• <strong>Segurança:</strong> Não exponha informações sensíveis em erros</li>
              <li>• <strong>Validação:</strong> Valide dados de entrada antes do processamento</li>
              <li>• <strong>Graceful Degradation:</strong> Implemente fallbacks para serviços externos</li>
              <li>• <strong>Rate Limiting:</strong> Proteja contra ataques e sobrecarga</li>
              <li>• <strong>Documentation:</strong> Documente todos os possíveis erros da API</li>
              <li>• <strong>Testing:</strong> Teste cenários de erro e recuperação</li>
              <li>• <strong>Performance:</strong> Não deixe erros impactarem performance geral</li>
            </ul>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}