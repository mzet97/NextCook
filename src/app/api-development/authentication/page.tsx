'use client';

import { motion } from 'framer-motion';
import { 
  Lock, 
  Key, 
  Shield, 
  Users, 
  Clock, 
  Smartphone,
  Globe,
  Database,
  CheckCircle,
  AlertTriangle,
  Settings,
  Zap
} from 'lucide-react';
import { DemoSection } from '@/components/DemoSection';
import { CodeBlock } from '@/components/CodeBlock';
import Breadcrumbs from '@/components/Breadcrumbs';
import { DemoCardStatic } from '@/components/DemoCardStatic';

const authMethods = [
  {
    title: 'JWT (JSON Web Tokens)',
    description: 'Tokens stateless para autenticação',
    icon: Key,
    color: 'blue',
    pros: ['Stateless', 'Escalável', 'Cross-domain'],
    cons: ['Não pode ser revogado facilmente', 'Tamanho maior']
  },
  {
    title: 'Session-based',
    description: 'Sessões armazenadas no servidor',
    icon: Database,
    color: 'green',
    pros: ['Controle total', 'Revogação fácil', 'Seguro'],
    cons: ['Stateful', 'Problemas de escala', 'Memória do servidor']
  },
  {
    title: 'OAuth 2.0',
    description: 'Delegação de autorização',
    icon: Globe,
    color: 'purple',
    pros: ['Padrão da indústria', 'Terceiros', 'Flexível'],
    cons: ['Complexo', 'Múltiplos fluxos', 'Configuração']
  },
  {
    title: 'API Keys',
    description: 'Chaves simples para APIs',
    icon: Lock,
    color: 'orange',
    pros: ['Simples', 'Rápido', 'Direto'],
    cons: ['Menos seguro', 'Sem expiração', 'Difícil rotação']
  }
];

const securityFeatures = [
  {
    title: 'Rate Limiting',
    description: 'Limitar tentativas de login',
    icon: Clock,
    color: 'red'
  },
  {
    title: '2FA/MFA',
    description: 'Autenticação de dois fatores',
    icon: Smartphone,
    color: 'indigo'
  },
  {
    title: 'RBAC',
    description: 'Controle de acesso baseado em roles',
    icon: Users,
    color: 'green'
  },
  {
    title: 'Encryption',
    description: 'Criptografia de dados sensíveis',
    icon: Shield,
    color: 'blue'
  }
];

export default function AuthenticationPage() {
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
            🔐 Autenticação e Autorização
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Implemente autenticação segura e autorização robusta em suas APIs Next.js.
            JWT, Sessions, OAuth, 2FA e controle de acesso baseado em roles.
          </p>
        </motion.div>

        <DemoSection title="Métodos de Autenticação">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {authMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <motion.div
                  key={method.title}
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
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">{method.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{method.description}</p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-semibold text-green-600 dark:text-green-400 mb-2">Vantagens</h4>
                      <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
                        {method.pros.map((pro, i) => (
                          <li key={i} className="flex items-center">
                            <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-semibold text-orange-600 dark:text-orange-400 mb-2">Desvantagens</h4>
                      <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
                        {method.cons.map((con, i) => (
                          <li key={i} className="flex items-center">
                            <AlertTriangle className="h-3 w-3 text-orange-500 mr-1" />
                            {con}
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

        <DemoSection title="JWT Authentication">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Configuração JWT</h3>
              <CodeBlock
                language="typescript"
                code={`// lib/jwt.ts
import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
const REFRESH_TOKEN_EXPIRES_IN = '30d';

interface JWTPayload {
  userId: number;
  email: string;
  role: string;
  permissions?: string[];
}

// Gerar token de acesso
export function generateAccessToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
    issuer: 'nextcook-api',
    audience: 'nextcook-app'
  });
}

// Gerar refresh token
export function generateRefreshToken(userId: number): string {
  return jwt.sign(
    { userId, type: 'refresh' },
    JWT_SECRET,
    {
      expiresIn: REFRESH_TOKEN_EXPIRES_IN,
      issuer: 'nextcook-api'
    }
  );
}

// Verificar token
export function verifyToken(token: string): JWTPayload {
  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      issuer: 'nextcook-api',
      audience: 'nextcook-app'
    }) as JWTPayload;
    
    return decoded;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error('Token expirado');
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error('Token inválido');
    }
    throw new Error('Erro ao verificar token');
  }
}

// Extrair token do header Authorization
export function extractTokenFromRequest(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  
  return authHeader.substring(7);
}

// Middleware de autenticação
export async function authenticateToken(request: NextRequest) {
  const token = extractTokenFromRequest(request);
  
  if (!token) {
    throw new Error('Token de autorização necessário');
  }
  
  const payload = verifyToken(token);
  
  // Verificar se usuário ainda existe e está ativo
  const user = await getUserById(payload.userId);
  if (!user || !user.active) {
    throw new Error('Usuário inválido ou inativo');
  }
  
  return { user, payload };
}`}
              />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Login com JWT</h3>
              <CodeBlock
                language="typescript"
                code={`// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { 
  generateAccessToken, 
  generateRefreshToken 
} from '@/lib/jwt';

const LoginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
  rememberMe: z.boolean().default(false)
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, rememberMe } = LoginSchema.parse(body);
    
    // Buscar usuário por email
    const user = await getUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { error: 'Credenciais inválidas' },
        { status: 401 }
      );
    }
    
    // Verificar se conta está ativa
    if (!user.active) {
      return NextResponse.json(
        { error: 'Conta desativada' },
        { status: 401 }
      );
    }
    
    // Verificar senha
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      // Incrementar tentativas de login falhadas
      await incrementFailedLoginAttempts(user.id);
      
      return NextResponse.json(
        { error: 'Credenciais inválidas' },
        { status: 401 }
      );
    }
    
    // Verificar se conta está bloqueada por muitas tentativas
    if (user.failedLoginAttempts >= 5) {
      const lockoutTime = 15 * 60 * 1000; // 15 minutos
      const timeSinceLastAttempt = Date.now() - user.lastFailedLogin.getTime();
      
      if (timeSinceLastAttempt < lockoutTime) {
        return NextResponse.json(
          { 
            error: 'Conta temporariamente bloqueada',
            retryAfter: Math.ceil((lockoutTime - timeSinceLastAttempt) / 1000)
          },
          { status: 429 }
        );
      }
    }
    
    // Reset tentativas de login falhadas
    await resetFailedLoginAttempts(user.id);
    
    // Gerar tokens
    const accessToken = generateAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      permissions: user.permissions
    });
    
    const refreshToken = generateRefreshToken(user.id);
    
    // Salvar refresh token no banco
    await saveRefreshToken(user.id, refreshToken);
    
    // Atualizar último login
    await updateLastLogin(user.id);
    
    // Configurar cookies
    const response = NextResponse.json({
      message: 'Login realizado com sucesso',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      accessToken
    });
    
    // Definir refresh token como httpOnly cookie
    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60, // 30 dias ou 1 dia
      path: '/'
    });
    
    return response;
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
            </div>
          </div>
        </DemoSection>

        <DemoSection title="Refresh Token">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibent mb-4">Renovar Token</h3>
              <CodeBlock
                language="typescript"
                code={`// app/api/auth/refresh/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, generateAccessToken } from '@/lib/jwt';

export async function POST(request: NextRequest) {
  try {
    // Obter refresh token do cookie
    const refreshToken = request.cookies.get('refreshToken')?.value;
    
    if (!refreshToken) {
      return NextResponse.json(
        { error: 'Refresh token não encontrado' },
        { status: 401 }
      );
    }
    
    // Verificar refresh token
    let payload;
    try {
      payload = verifyToken(refreshToken);
    } catch (error) {
      return NextResponse.json(
        { error: 'Refresh token inválido ou expirado' },
        { status: 401 }
      );
    }
    
    // Verificar se é um refresh token
    if (payload.type !== 'refresh') {
      return NextResponse.json(
        { error: 'Token inválido' },
        { status: 401 }
      );
    }
    
    // Verificar se refresh token existe no banco
    const storedToken = await getRefreshToken(payload.userId, refreshToken);
    if (!storedToken) {
      return NextResponse.json(
        { error: 'Refresh token revogado' },
        { status: 401 }
      );
    }
    
    // Buscar dados atualizados do usuário
    const user = await getUserById(payload.userId);
    if (!user || !user.active) {
      return NextResponse.json(
        { error: 'Usuário inválido ou inativo' },
        { status: 401 }
      );
    }
    
    // Gerar novo access token
    const newAccessToken = generateAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      permissions: user.permissions
    });
    
    return NextResponse.json({
      accessToken: newAccessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
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
              <h3 className="text-xl font-semibold mb-4">Logout</h3>
              <CodeBlock
                language="typescript"
                code={`// app/api/auth/logout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { extractTokenFromRequest, verifyToken } from '@/lib/jwt';

export async function POST(request: NextRequest) {
  try {
    // Obter access token
    const accessToken = extractTokenFromRequest(request);
    const refreshToken = request.cookies.get('refreshToken')?.value;
    
    if (accessToken) {
      try {
        const payload = verifyToken(accessToken);
        
        // Adicionar token à blacklist (opcional)
        await addTokenToBlacklist(accessToken);
        
        // Remover refresh token do banco
        if (refreshToken) {
          await revokeRefreshToken(payload.userId, refreshToken);
        }
        
        // Atualizar último logout
        await updateLastLogout(payload.userId);
      } catch (error) {
        // Token inválido, mas ainda assim fazer logout
        console.warn('Token inválido durante logout:', error);
      }
    }
    
    // Criar resposta
    const response = NextResponse.json({
      message: 'Logout realizado com sucesso'
    });
    
    // Remover refresh token cookie
    response.cookies.set('refreshToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
      path: '/'
    });
    
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// Logout de todos os dispositivos
export async function DELETE(request: NextRequest) {
  try {
    const accessToken = extractTokenFromRequest(request);
    
    if (!accessToken) {
      return NextResponse.json(
        { error: 'Token de autorização necessário' },
        { status: 401 }
      );
    }
    
    const payload = verifyToken(accessToken);
    
    // Revogar todos os refresh tokens do usuário
    await revokeAllRefreshTokens(payload.userId);
    
    // Adicionar todos os tokens ativos à blacklist
    await blacklistAllUserTokens(payload.userId);
    
    // Atualizar timestamp de logout global
    await updateGlobalLogout(payload.userId);
    
    const response = NextResponse.json({
      message: 'Logout realizado em todos os dispositivos'
    });
    
    // Remover refresh token cookie
    response.cookies.set('refreshToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
      path: '/'
    });
    
    return response;
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

        <DemoSection title="Autorização e Controle de Acesso">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">RBAC (Role-Based Access Control)</h3>
              <CodeBlock
                language="typescript"
                code={`// lib/authorization.ts
import { NextRequest, NextResponse } from 'next/server';
import { authenticateToken } from '@/lib/jwt';

// Definir roles e permissões
const ROLES = {
  ADMIN: 'admin',
  MODERATOR: 'moderator',
  USER: 'user',
  GUEST: 'guest'
} as const;

const PERMISSIONS = {
  // Usuários
  USER_READ: 'user:read',
  USER_WRITE: 'user:write',
  USER_DELETE: 'user:delete',
  
  // Posts
  POST_READ: 'post:read',
  POST_WRITE: 'post:write',
  POST_DELETE: 'post:delete',
  POST_PUBLISH: 'post:publish',
  
  // Admin
  ADMIN_PANEL: 'admin:panel',
  SYSTEM_CONFIG: 'system:config'
} as const;

// Mapeamento de roles para permissões
const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: Object.values(PERMISSIONS),
  [ROLES.MODERATOR]: [
    PERMISSIONS.USER_READ,
    PERMISSIONS.USER_WRITE,
    PERMISSIONS.POST_READ,
    PERMISSIONS.POST_WRITE,
    PERMISSIONS.POST_DELETE,
    PERMISSIONS.POST_PUBLISH
  ],
  [ROLES.USER]: [
    PERMISSIONS.USER_READ,
    PERMISSIONS.POST_READ,
    PERMISSIONS.POST_WRITE
  ],
  [ROLES.GUEST]: [
    PERMISSIONS.POST_READ
  ]
};

// Verificar se usuário tem permissão
export function hasPermission(
  userRole: string,
  userPermissions: string[] = [],
  requiredPermission: string
): boolean {
  // Verificar permissões específicas do usuário
  if (userPermissions.includes(requiredPermission)) {
    return true;
  }
  
  // Verificar permissões do role
  const rolePermissions = ROLE_PERMISSIONS[userRole as keyof typeof ROLE_PERMISSIONS] || [];
  return rolePermissions.includes(requiredPermission);
}

// Middleware de autorização
export function requirePermission(permission: string) {
  return async (request: NextRequest) => {
    try {
      const { user, payload } = await authenticateToken(request);
      
      if (!hasPermission(payload.role, payload.permissions, permission)) {
        return NextResponse.json(
          { 
            error: 'Acesso negado',
            required: permission,
            userRole: payload.role
          },
          { status: 403 }
        );
      }
      
      // Adicionar dados do usuário aos headers para uso na rota
      const response = NextResponse.next();
      response.headers.set('x-user-id', payload.userId.toString());
      response.headers.set('x-user-role', payload.role);
      response.headers.set('x-user-permissions', JSON.stringify(payload.permissions || []));
      
      return response;
    } catch (error) {
      return NextResponse.json(
        { error: error instanceof Error ? error.message : 'Erro de autenticação' },
        { status: 401 }
      );
    }
  };
}

// Middleware para múltiplas permissões
export function requireAnyPermission(permissions: string[]) {
  return async (request: NextRequest) => {
    try {
      const { user, payload } = await authenticateToken(request);
      
      const hasAnyPermission = permissions.some(permission =>
        hasPermission(payload.role, payload.permissions, permission)
      );
      
      if (!hasAnyPermission) {
        return NextResponse.json(
          { 
            error: 'Acesso negado',
            required: permissions,
            userRole: payload.role
          },
          { status: 403 }
        );
      }
      
      return NextResponse.next();
    } catch (error) {
      return NextResponse.json(
        { error: error instanceof Error ? error.message : 'Erro de autenticação' },
        { status: 401 }
      );
    }
  };
}`}
              />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Uso em Route Handlers</h3>
              <CodeBlock
                language="typescript"
                code={`// app/api/admin/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { requirePermission, PERMISSIONS } from '@/lib/authorization';

// GET /api/admin/users - Listar usuários (apenas admin)
export async function GET(request: NextRequest) {
  // Verificar permissão
  const authResult = await requirePermission(PERMISSIONS.USER_READ)(request);
  if (authResult.status !== 200) {
    return authResult;
  }
  
  // Obter dados do usuário dos headers
  const userId = request.headers.get('x-user-id');
  const userRole = request.headers.get('x-user-role');
  
  try {
    const users = await getUsers();
    
    return NextResponse.json({
      users,
      requestedBy: { userId, role: userRole }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao buscar usuários' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/users/[id]/route.ts
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Verificar permissão de deletar usuários
  const authResult = await requirePermission(PERMISSIONS.USER_DELETE)(request);
  if (authResult.status !== 200) {
    return authResult;
  }
  
  const currentUserId = parseInt(request.headers.get('x-user-id') || '0');
  const targetUserId = parseInt(params.id);
  
  // Não permitir que usuário delete a si mesmo
  if (currentUserId === targetUserId) {
    return NextResponse.json(
      { error: 'Não é possível deletar sua própria conta' },
      { status: 400 }
    );
  }
  
  try {
    await deleteUser(targetUserId);
    
    return NextResponse.json({
      message: 'Usuário deletado com sucesso'
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao deletar usuário' },
      { status: 500 }
    );
  }
}

// app/api/posts/[id]/route.ts
// Exemplo de autorização baseada em propriedade
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { user, payload } = await authenticateToken(request);
    const postId = parseInt(params.id);
    
    // Buscar o post
    const post = await getPostById(postId);
    if (!post) {
      return NextResponse.json(
        { error: 'Post não encontrado' },
        { status: 404 }
      );
    }
    
    // Verificar se usuário pode editar este post
    const canEdit = 
      post.authorId === payload.userId || // É o autor
      hasPermission(payload.role, payload.permissions, PERMISSIONS.POST_DELETE); // Ou tem permissão admin
    
    if (!canEdit) {
      return NextResponse.json(
        { error: 'Sem permissão para editar este post' },
        { status: 403 }
      );
    }
    
    // Atualizar post...
    const body = await request.json();
    const updatedPost = await updatePost(postId, body);
    
    return NextResponse.json(updatedPost);
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

        <DemoSection title="Recursos de Segurança">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {securityFeatures.map((feature, index) => {
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

        <DemoSection title="Two-Factor Authentication (2FA)">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Configurar 2FA</h3>
              <CodeBlock
                language="typescript"
                code={`// lib/2fa.ts
import speakeasy from 'speakeasy';
import QRCode from 'qrcode';

// Gerar secret para 2FA
export function generate2FASecret(userEmail: string) {
  const secret = speakeasy.generateSecret({
    name: \`NextCook (\${userEmail})\`,
    issuer: 'NextCook',
    length: 32
  });
  
  return {
    secret: secret.base32,
    otpauthUrl: secret.otpauth_url
  };
}

// Gerar QR Code
export async function generateQRCode(otpauthUrl: string): Promise<string> {
  try {
    return await QRCode.toDataURL(otpauthUrl);
  } catch (error) {
    throw new Error('Erro ao gerar QR Code');
  }
}

// Verificar token 2FA
export function verify2FAToken(secret: string, token: string): boolean {
  return speakeasy.totp.verify({
    secret,
    encoding: 'base32',
    token,
    window: 2 // Permite tokens de até 2 períodos (60s cada)
  });
}

// app/api/auth/2fa/setup/route.ts
export async function POST(request: NextRequest) {
  try {
    const { user } = await authenticateToken(request);
    
    // Verificar se 2FA já está habilitado
    if (user.twoFactorEnabled) {
      return NextResponse.json(
        { error: '2FA já está habilitado' },
        { status: 400 }
      );
    }
    
    // Gerar secret temporário
    const { secret, otpauthUrl } = generate2FASecret(user.email);
    const qrCode = await generateQRCode(otpauthUrl);
    
    // Salvar secret temporário (não ativar ainda)
    await saveTempTwoFactorSecret(user.id, secret);
    
    return NextResponse.json({
      qrCode,
      secret, // Para entrada manual
      message: 'Escaneie o QR Code com seu app autenticador'
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao configurar 2FA' },
      { status: 500 }
    );
  }
}`}
              />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Verificar 2FA</h3>
              <CodeBlock
                language="typescript"
                code={`// app/api/auth/2fa/verify/route.ts
import { z } from 'zod';

const Verify2FASchema = z.object({
  token: z.string().length(6, 'Token deve ter 6 dígitos'),
  action: z.enum(['enable', 'login']).default('login')
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, action } = Verify2FASchema.parse(body);
    
    if (action === 'enable') {
      // Habilitar 2FA
      const { user } = await authenticateToken(request);
      
      const tempSecret = await getTempTwoFactorSecret(user.id);
      if (!tempSecret) {
        return NextResponse.json(
          { error: 'Setup de 2FA não iniciado' },
          { status: 400 }
        );
      }
      
      // Verificar token
      const isValid = verify2FAToken(tempSecret, token);
      if (!isValid) {
        return NextResponse.json(
          { error: 'Token inválido' },
          { status: 400 }
        );
      }
      
      // Ativar 2FA
      await enableTwoFactor(user.id, tempSecret);
      await deleteTempTwoFactorSecret(user.id);
      
      // Gerar códigos de backup
      const backupCodes = generateBackupCodes();
      await saveBackupCodes(user.id, backupCodes);
      
      return NextResponse.json({
        message: '2FA habilitado com sucesso',
        backupCodes
      });
    } else {
      // Login com 2FA
      const email = request.headers.get('x-login-email');
      if (!email) {
        return NextResponse.json(
          { error: 'Email não fornecido' },
          { status: 400 }
        );
      }
      
      const user = await getUserByEmail(email);
      if (!user || !user.twoFactorEnabled) {
        return NextResponse.json(
          { error: 'Usuário inválido' },
          { status: 400 }
        );
      }
      
      // Verificar token ou código de backup
      let isValid = false;
      
      if (token.length === 6) {
        // Token do app autenticador
        isValid = verify2FAToken(user.twoFactorSecret, token);
      } else if (token.length === 8) {
        // Código de backup
        isValid = await verifyBackupCode(user.id, token);
        if (isValid) {
          await markBackupCodeAsUsed(user.id, token);
        }
      }
      
      if (!isValid) {
        return NextResponse.json(
          { error: 'Token ou código de backup inválido' },
          { status: 400 }
        );
      }
      
      // Gerar tokens JWT
      const accessToken = generateAccessToken({
        userId: user.id,
        email: user.email,
        role: user.role,
        permissions: user.permissions
      });
      
      const refreshToken = generateRefreshToken(user.id);
      await saveRefreshToken(user.id, refreshToken);
      
      const response = NextResponse.json({
        message: 'Login com 2FA realizado com sucesso',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        },
        accessToken
      });
      
      response.cookies.set('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60,
        path: '/'
      });
      
      return response;
    }
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

        <DemoSection title="OAuth 2.0 Integration">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Google OAuth</h3>
              <CodeBlock
                language="typescript"
                code={`// lib/oauth.ts
import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Gerar URL de autorização
export function getGoogleAuthUrl(): string {
  const scopes = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'
  ];
  
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    state: generateRandomState() // CSRF protection
  });
}

// Trocar código por tokens
export async function exchangeCodeForTokens(code: string) {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  
  return tokens;
}

// Obter informações do usuário
export async function getGoogleUserInfo(accessToken: string) {
  const response = await fetch(
    \`https://www.googleapis.com/oauth2/v2/userinfo?access_token=\${accessToken}\`
  );
  
  if (!response.ok) {
    throw new Error('Erro ao obter informações do usuário');
  }
  
  return response.json();
}

// app/api/auth/google/route.ts
export async function GET() {
  try {
    const authUrl = getGoogleAuthUrl();
    
    return NextResponse.redirect(authUrl);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao iniciar autenticação Google' },
      { status: 500 }
    );
  }
}

// app/api/auth/google/callback/route.ts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');
    
    if (error) {
      return NextResponse.redirect(
        \`\${process.env.FRONTEND_URL}/login?error=oauth_error\`
      );
    }
    
    if (!code) {
      return NextResponse.redirect(
        \`\${process.env.FRONTEND_URL}/login?error=no_code\`
      );
    }
    
    // Verificar state (CSRF protection)
    if (!verifyState(state)) {
      return NextResponse.redirect(
        \`\${process.env.FRONTEND_URL}/login?error=invalid_state\`
      );
    }
    
    // Trocar código por tokens
    const tokens = await exchangeCodeForTokens(code);
    
    // Obter informações do usuário
    const googleUser = await getGoogleUserInfo(tokens.access_token!);
    
    // Verificar se usuário já existe
    let user = await getUserByEmail(googleUser.email);
    
    if (!user) {
      // Criar novo usuário
      user = await createUser({
        name: googleUser.name,
        email: googleUser.email,
        avatar: googleUser.picture,
        provider: 'google',
        providerId: googleUser.id,
        emailVerified: true // Google já verificou
      });
    } else {
      // Atualizar informações se necessário
      if (!user.providerId) {
        await linkGoogleAccount(user.id, googleUser.id);
      }
    }
    
    // Gerar tokens JWT
    const accessToken = generateAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      permissions: user.permissions
    });
    
    const refreshToken = generateRefreshToken(user.id);
    await saveRefreshToken(user.id, refreshToken);
    
    // Redirecionar com tokens
    const redirectUrl = new URL(\`\${process.env.FRONTEND_URL}/auth/callback\`);
    redirectUrl.searchParams.set('token', accessToken);
    
    const response = NextResponse.redirect(redirectUrl.toString());
    
    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60,
      path: '/'
    });
    
    return response;
  } catch (error) {
    return NextResponse.redirect(
      \`\${process.env.FRONTEND_URL}/login?error=oauth_failed\`
    );
  }
}`}
              />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">GitHub OAuth</h3>
              <CodeBlock
                language="typescript"
                code={`// lib/github-oauth.ts

// Gerar URL de autorização GitHub
export function getGitHubAuthUrl(): string {
  const params = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    redirect_uri: process.env.GITHUB_REDIRECT_URI!,
    scope: 'user:email',
    state: generateRandomState()
  });
  
  return \`https://github.com/login/oauth/authorize?\${params}\`;
}

// Trocar código por access token
export async function getGitHubAccessToken(code: string): Promise<string> {
  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code
    })
  });
  
  const data = await response.json();
  
  if (data.error) {
    throw new Error(data.error_description || 'Erro ao obter access token');
  }
  
  return data.access_token;
}

// Obter informações do usuário GitHub
export async function getGitHubUserInfo(accessToken: string) {
  const [userResponse, emailsResponse] = await Promise.all([
    fetch('https://api.github.com/user', {
      headers: {
        'Authorization': \`token \${accessToken}\`,
        'User-Agent': 'NextCook-App'
      }
    }),
    fetch('https://api.github.com/user/emails', {
      headers: {
        'Authorization': \`token \${accessToken}\`,
        'User-Agent': 'NextCook-App'
      }
    })
  ]);
  
  const user = await userResponse.json();
  const emails = await emailsResponse.json();
  
  // Encontrar email primário
  const primaryEmail = emails.find((email: any) => email.primary);
  
  return {
    id: user.id,
    name: user.name || user.login,
    email: primaryEmail?.email || user.email,
    avatar: user.avatar_url,
    username: user.login
  };
}

// app/api/auth/github/callback/route.ts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    
    if (!code) {
      return NextResponse.redirect(
        \`\${process.env.FRONTEND_URL}/login?error=no_code\`
      );
    }
    
    // Verificar state
    if (!verifyState(state)) {
      return NextResponse.redirect(
        \`\${process.env.FRONTEND_URL}/login?error=invalid_state\`
      );
    }
    
    // Obter access token
    const accessToken = await getGitHubAccessToken(code);
    
    // Obter informações do usuário
    const githubUser = await getGitHubUserInfo(accessToken);
    
    if (!githubUser.email) {
      return NextResponse.redirect(
        \`\${process.env.FRONTEND_URL}/login?error=no_email\`
      );
    }
    
    // Verificar se usuário já existe
    let user = await getUserByEmail(githubUser.email);
    
    if (!user) {
      // Criar novo usuário
      user = await createUser({
        name: githubUser.name,
        email: githubUser.email,
        username: githubUser.username,
        avatar: githubUser.avatar,
        provider: 'github',
        providerId: githubUser.id.toString(),
        emailVerified: true
      });
    }
    
    // Gerar tokens e redirecionar...
    // (mesmo processo do Google OAuth)
  } catch (error) {
    return NextResponse.redirect(
      \`\${process.env.FRONTEND_URL}/login?error=github_failed\`
    );
  }
}`}
              />
            </div>
          </div>
        </DemoSection>

        <DemoSection title="Melhores Práticas de Segurança">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-4">🔒 Práticas Essenciais</h3>
            <ul className="space-y-2 text-red-700 dark:text-red-300">
              <li>• <strong>Senhas:</strong> Use bcrypt com salt rounds ≥ 12 para hash de senhas</li>
              <li>• <strong>JWT:</strong> Use secrets fortes e implemente refresh tokens</li>
              <li>• <strong>Rate Limiting:</strong> Limite tentativas de login (5 por 15 min)</li>
              <li>• <strong>2FA:</strong> Implemente autenticação de dois fatores para contas sensíveis</li>
              <li>• <strong>HTTPS:</strong> Sempre use HTTPS em produção</li>
              <li>• <strong>Cookies:</strong> Use httpOnly, secure e sameSite para cookies sensíveis</li>
              <li>• <strong>CORS:</strong> Configure origins específicos, não use '*' em produção</li>
              <li>• <strong>Headers:</strong> Implemente headers de segurança (CSP, HSTS, etc.)</li>
              <li>• <strong>Validação:</strong> Sempre valide e sanitize dados de entrada</li>
              <li>• <strong>Logs:</strong> Registre tentativas de acesso e atividades suspeitas</li>
              <li>• <strong>Secrets:</strong> Use variáveis de ambiente para chaves e senhas</li>
              <li>• <strong>Expiração:</strong> Implemente expiração adequada para tokens</li>
            </ul>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}