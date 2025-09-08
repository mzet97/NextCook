'use client';

import { useState } from 'react';
import { Database, Zap, Users, BarChart3, CheckCircle, AlertTriangle, Settings, Monitor } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { DemoCardStatic } from '@/components/DemoCardStatic';
import { DemoSection } from '@/components/DemoSection';

const poolingFeatures = [
  {
    title: 'Connection Reuse',
    description: 'Reutilização eficiente de conexões',
    icon: <Database className="w-5 h-5" />,
    benefits: ['Reduz overhead', 'Melhora performance', 'Economiza recursos', 'Escalabilidade']
  },
  {
    title: 'Load Balancing',
    description: 'Distribuição inteligente de carga',
    icon: <BarChart3 className="w-5 h-5" />,
    benefits: ['Distribui conexões', 'Evita sobrecarga', 'Alta disponibilidade', 'Failover automático']
  },
  {
    title: 'Connection Limits',
    description: 'Controle de limites de conexão',
    icon: <Users className="w-5 h-5" />,
    benefits: ['Previne esgotamento', 'Controla recursos', 'Protege o banco', 'Monitoramento']
  },
  {
    title: 'Health Monitoring',
    description: 'Monitoramento de saúde das conexões',
    icon: <Monitor className="w-5 h-5" />,
    benefits: ['Detecta falhas', 'Reconexão automática', 'Métricas em tempo real', 'Alertas']
  }
];

const codeExamples = [
  {
    title: 'Prisma Connection Pooling',
    description: 'Configuração de connection pooling com Prisma',
    code: `// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
  previewFeatures = ["metrics"]
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// .env
# Connection pooling configuration
DATABASE_URL="postgresql://user:password@localhost:5432/mydb?connection_limit=20&pool_timeout=20&schema=public"

# Para PgBouncer
DIRECT_URL="postgresql://user:password@localhost:5432/mydb"
DATABASE_URL="postgresql://user:password@localhost:6543/mydb?pgbouncer=true"

// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query', 'error', 'warn'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Configuração avançada de pooling
export const prismaWithPool = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  // Configurações de connection pool
  __internal: {
    engine: {
      // Número máximo de conexões no pool
      connectionLimit: 20,
      // Timeout para obter conexão do pool
      poolTimeout: 20000,
      // Tempo de vida máximo de uma conexão
      maxLifetime: 3600000, // 1 hora
      // Tempo de idle antes de fechar conexão
      idleTimeout: 600000, // 10 minutos
    },
  },
});

// Middleware para monitoramento
prisma.$use(async (params, next) => {
  const before = Date.now();
  const result = await next(params);
  const after = Date.now();
  
  console.log(\`Query \${params.model}.\${params.action} took \${after - before}ms\`);
  return result;
});

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});`,
    language: 'typescript'
  },
  {
    title: 'PgBouncer Configuration',
    description: 'Configuração do PgBouncer para pooling avançado',
    code: `# pgbouncer.ini
[databases]
mydb = host=localhost port=5432 dbname=mydb user=myuser password=mypass

[pgbouncer]
# Pool settings
pool_mode = transaction
max_client_conn = 1000
default_pool_size = 20
max_db_connections = 100
max_user_connections = 100

# Connection limits
reserve_pool_size = 5
reserve_pool_timeout = 5

# Timeouts
server_reset_query = DISCARD ALL
server_check_delay = 30
server_check_query = SELECT 1
server_lifetime = 3600
server_idle_timeout = 600

# Logging
log_connections = 1
log_disconnections = 1
log_pooler_errors = 1
verbose = 0

# Authentication
auth_type = md5
auth_file = /etc/pgbouncer/userlist.txt

# Admin
admin_users = postgres
stats_users = stats, postgres

# Network
listen_addr = 0.0.0.0
listen_port = 6543
unix_socket_dir = /var/run/postgresql

# userlist.txt
"myuser" "md5hash_of_password"
"postgres" "md5hash_of_admin_password"

# Docker Compose com PgBouncer
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: mydb
      POSTGRES_USER: myuser
      POSTGRES_PASSWORD: mypass
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  pgbouncer:
    image: pgbouncer/pgbouncer:latest
    environment:
      DATABASES_HOST: postgres
      DATABASES_PORT: 5432
      DATABASES_USER: myuser
      DATABASES_PASSWORD: mypass
      DATABASES_DBNAME: mydb
      POOL_MODE: transaction
      MAX_CLIENT_CONN: 1000
      DEFAULT_POOL_SIZE: 20
      MAX_DB_CONNECTIONS: 100
    ports:
      - "6543:5432"
    depends_on:
      - postgres

volumes:
  postgres_data:

# Comandos úteis do PgBouncer
# Conectar ao console admin
psql -h localhost -p 6543 -U postgres pgbouncer

# Comandos admin
SHOW POOLS;           # Ver status dos pools
SHOW CLIENTS;         # Ver conexões de clientes
SHOW SERVERS;         # Ver conexões com o servidor
SHOW STATS;           # Estatísticas
RELOAD;               # Recarregar configuração
PAUSE;                # Pausar novas conexões
RESUME;               # Retomar conexões`,
    language: 'ini'
  },
  {
    title: 'Node.js Pool Configuration',
    description: 'Configuração manual de pool com node-postgres',
    code: `// lib/db-pool.ts
import { Pool, PoolConfig } from 'pg';

const poolConfig: PoolConfig = {
  // Configurações de conexão
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'mydb',
  user: process.env.DB_USER || 'myuser',
  password: process.env.DB_PASSWORD || 'mypass',
  
  // Configurações do pool
  max: 20,                    // Máximo de conexões no pool
  min: 5,                     // Mínimo de conexões mantidas
  idleTimeoutMillis: 30000,   // Tempo para fechar conexão idle
  connectionTimeoutMillis: 2000, // Timeout para nova conexão
  maxUses: 7500,              // Máximo de usos por conexão
  
  // SSL configuration
  ssl: process.env.NODE_ENV === 'production' ? {
    rejectUnauthorized: false
  } : false,
  
  // Configurações avançadas
  allowExitOnIdle: true,      // Permite processo sair se pool idle
  application_name: 'my-app', // Nome da aplicação
  statement_timeout: 30000,   // Timeout para statements
  query_timeout: 30000,       // Timeout para queries
};

export const pool = new Pool(poolConfig);

// Event listeners para monitoramento
pool.on('connect', (client) => {
  console.log('Nova conexão estabelecida:', client.processID);
});

pool.on('acquire', (client) => {
  console.log('Conexão adquirida do pool:', client.processID);
});

pool.on('remove', (client) => {
  console.log('Conexão removida do pool:', client.processID);
});

pool.on('error', (err, client) => {
  console.error('Erro no pool de conexões:', err);
  console.error('Cliente:', client?.processID);
});

// Função para executar queries com retry
export async function executeQuery<T = any>(
  text: string,
  params?: any[],
  retries = 3
): Promise<T[]> {
  let lastError: Error;
  
  for (let i = 0; i < retries; i++) {
    try {
      const client = await pool.connect();
      try {
        const result = await client.query(text, params);
        return result.rows;
      } finally {
        client.release();
      }
    } catch (error) {
      lastError = error as Error;
      console.warn(\`Query failed (attempt \${i + 1}/\${retries}):\`, error);
      
      if (i < retries - 1) {
        // Aguardar antes de tentar novamente
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
      }
    }
  }
  
  throw lastError!;
}

// Função para transações
export async function executeTransaction<T>(
  callback: (client: any) => Promise<T>
): Promise<T> {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

// Monitoramento do pool
export function getPoolStats() {
  return {
    totalCount: pool.totalCount,
    idleCount: pool.idleCount,
    waitingCount: pool.waitingCount,
  };
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Fechando pool de conexões...');
  await pool.end();
  process.exit(0);
});`,
    language: 'typescript'
  },
  {
    title: 'Monitoring & Metrics',
    description: 'Monitoramento e métricas de connection pooling',
    code: `// lib/pool-monitor.ts
import { pool } from './db-pool';
import { prisma } from './prisma';

interface PoolMetrics {
  timestamp: Date;
  totalConnections: number;
  idleConnections: number;
  activeConnections: number;
  waitingClients: number;
  averageQueryTime: number;
  errorRate: number;
}

class PoolMonitor {
  private metrics: PoolMetrics[] = [];
  private queryTimes: number[] = [];
  private errorCount = 0;
  private totalQueries = 0;

  startMonitoring(intervalMs = 30000) {
    setInterval(() => {
      this.collectMetrics();
    }, intervalMs);
  }

  private collectMetrics() {
    const stats = {
      totalCount: pool.totalCount,
      idleCount: pool.idleCount,
      waitingCount: pool.waitingCount,
    };

    const metrics: PoolMetrics = {
      timestamp: new Date(),
      totalConnections: stats.totalCount,
      idleConnections: stats.idleCount,
      activeConnections: stats.totalCount - stats.idleCount,
      waitingClients: stats.waitingCount,
      averageQueryTime: this.calculateAverageQueryTime(),
      errorRate: this.calculateErrorRate(),
    };

    this.metrics.push(metrics);
    
    // Manter apenas últimas 100 métricas
    if (this.metrics.length > 100) {
      this.metrics.shift();
    }

    // Log alertas
    this.checkAlerts(metrics);
  }

  private calculateAverageQueryTime(): number {
    if (this.queryTimes.length === 0) return 0;
    const sum = this.queryTimes.reduce((a, b) => a + b, 0);
    return sum / this.queryTimes.length;
  }

  private calculateErrorRate(): number {
    if (this.totalQueries === 0) return 0;
    return (this.errorCount / this.totalQueries) * 100;
  }

  private checkAlerts(metrics: PoolMetrics) {
    // Alerta: muitas conexões ativas
    if (metrics.activeConnections > 15) {
      console.warn(\`🚨 Alto número de conexões ativas: \${metrics.activeConnections}\`);
    }

    // Alerta: clientes aguardando
    if (metrics.waitingClients > 5) {
      console.warn(\`⏳ Clientes aguardando conexão: \${metrics.waitingClients}\`);
    }

    // Alerta: queries lentas
    if (metrics.averageQueryTime > 1000) {
      console.warn(\`🐌 Queries lentas detectadas: \${metrics.averageQueryTime}ms\`);
    }

    // Alerta: alta taxa de erro
    if (metrics.errorRate > 5) {
      console.warn(\`❌ Alta taxa de erro: \${metrics.errorRate}%\`);
    }
  }

  recordQueryTime(timeMs: number) {
    this.queryTimes.push(timeMs);
    this.totalQueries++;
    
    // Manter apenas últimas 1000 queries
    if (this.queryTimes.length > 1000) {
      this.queryTimes.shift();
    }
  }

  recordError() {
    this.errorCount++;
  }

  getLatestMetrics(): PoolMetrics | null {
    return this.metrics[this.metrics.length - 1] || null;
  }

  getMetricsHistory(): PoolMetrics[] {
    return [...this.metrics];
  }

  // API endpoint para métricas
  getHealthCheck() {
    const latest = this.getLatestMetrics();
    if (!latest) {
      return { status: 'unknown', message: 'Sem métricas disponíveis' };
    }

    const issues = [];
    if (latest.activeConnections > 15) issues.push('Muitas conexões ativas');
    if (latest.waitingClients > 5) issues.push('Clientes aguardando');
    if (latest.averageQueryTime > 1000) issues.push('Queries lentas');
    if (latest.errorRate > 5) issues.push('Alta taxa de erro');

    return {
      status: issues.length === 0 ? 'healthy' : 'warning',
      message: issues.length === 0 ? 'Pool funcionando normalmente' : issues.join(', '),
      metrics: latest,
    };
  }
}

export const poolMonitor = new PoolMonitor();

// Iniciar monitoramento
if (process.env.NODE_ENV === 'production') {
  poolMonitor.startMonitoring(30000); // A cada 30 segundos
} else {
  poolMonitor.startMonitoring(10000); // A cada 10 segundos em dev
}

// API route para métricas
// app/api/pool-metrics/route.ts
export async function GET() {
  const healthCheck = poolMonitor.getHealthCheck();
  const history = poolMonitor.getMetricsHistory();
  
  return Response.json({
    health: healthCheck,
    history: history.slice(-20), // Últimas 20 métricas
  });
}`,
    language: 'typescript'
  }
];

const bestPractices = [
  {
    title: 'Pool Sizing',
    description: 'Dimensionamento adequado do pool',
    icon: <Settings className="w-5 h-5 text-blue-600" />,
    practices: [
      'Calcule baseado na carga esperada',
      'Considere limites do banco de dados',
      'Monitore uso em produção',
      'Ajuste conforme necessário'
    ]
  },
  {
    title: 'Connection Management',
    description: 'Gerenciamento de conexões',
    icon: <Database className="w-5 h-5 text-green-600" />,
    practices: [
      'Sempre libere conexões após uso',
      'Use timeouts apropriados',
      'Implemente retry logic',
      'Monitore conexões órfãs'
    ]
  },
  {
    title: 'Performance',
    description: 'Otimização de performance',
    icon: <Zap className="w-5 h-5 text-yellow-600" />,
    practices: [
      'Use prepared statements',
      'Implemente connection warming',
      'Configure keep-alive',
      'Otimize queries lentas'
    ]
  },
  {
    title: 'Monitoring',
    description: 'Monitoramento contínuo',
    icon: <Monitor className="w-5 h-5 text-purple-600" />,
    practices: [
      'Monitore métricas em tempo real',
      'Configure alertas',
      'Analise padrões de uso',
      'Documente incidentes'
    ]
  }
];

export default function ConnectionPoolingPage() {
  const [selectedExample, setSelectedExample] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs />
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <Database className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Connection Pooling
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Otimize a performance e escalabilidade da sua aplicação com estratégias avançadas de connection pooling para bancos de dados.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-lg p-1 shadow-sm border">
            {[
              { id: 'overview', label: 'Visão Geral' },
              { id: 'examples', label: 'Exemplos' },
              { id: 'practices', label: 'Boas Práticas' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'overview' && (
          <>
            {/* Features Overview */}
            <DemoSection title="Recursos do Connection Pooling" description="Principais benefícios e funcionalidades">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1.5">
                {poolingFeatures.map((feature, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center mb-4">
                      <div className="p-2 bg-blue-50 rounded-lg mr-3">
                        {feature.icon}
                      </div>
                      <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{feature.description}</p>
                    <ul className="space-y-1">
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-center text-sm text-gray-500">
                          <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </DemoSection>

            {/* Pool Architecture */}
            <DemoSection title="Arquitetura do Pool" description="Como funciona o connection pooling">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-1.5">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                      <Users className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Aplicação</h3>
                    <p className="text-gray-600 text-sm">Múltiplas requisições simultâneas solicitam conexões com o banco de dados</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                      <Database className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Connection Pool</h3>
                    <p className="text-gray-600 text-sm">Pool gerencia e reutiliza conexões, controlando limites e timeouts</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                      <BarChart3 className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Banco de Dados</h3>
                    <p className="text-gray-600 text-sm">Recebe conexões otimizadas sem sobrecarga de criação/destruição</p>
                  </div>
                </div>
              </div>
            </DemoSection>
          </>
        )}

        {activeTab === 'examples' && (
          <DemoSection title="Exemplos Práticos" description="Implementações de connection pooling">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex border-b border-gray-100 overflow-x-auto">
                {codeExamples.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedExample(index)}
                    className={`flex-shrink-0 p-4 text-left transition-colors min-w-[200px] ${
                      selectedExample === index
                        ? 'bg-blue-50 border-b-2 border-blue-600 text-blue-700'
                        : 'hover:bg-gray-50 text-gray-600'
                    }`}
                  >
                    <div className="font-medium">{example.title}</div>
                    <div className="text-sm opacity-75">{example.description}</div>
                  </button>
                ))}
              </div>
              
              <div className="p-6">
                <DemoCardStatic
                  title={codeExamples[selectedExample].title}
                  description={codeExamples[selectedExample].description}
                >
                  <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-blue-400 text-sm">
                      <code>{codeExamples[selectedExample].code}</code>
                    </pre>
                  </div>
                </DemoCardStatic>
              </div>
            </div>
          </DemoSection>
        )}

        {activeTab === 'practices' && (
          <DemoSection title="Melhores Práticas" description="Diretrizes para connection pooling eficiente">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
              {bestPractices.map((practice, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center mb-4">
                    {practice.icon}
                    <h3 className="text-lg font-semibold text-gray-900 ml-3">{practice.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{practice.description}</p>
                  <ul className="space-y-2">
                    {practice.practices.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </DemoSection>
        )}

        {/* Performance Impact */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl p-8 text-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Impacto na Performance</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1.5">
              <div className="text-center p-6 bg-white/10 rounded-lg">
                <Zap className="w-8 h-8 mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2">Redução de Latência</h3>
                <p className="text-3xl font-bold mb-1">80%</p>
                <p className="text-sm opacity-75">Menos tempo para estabelecer conexões</p>
              </div>
              
              <div className="text-center p-6 bg-white/10 rounded-lg">
                <BarChart3 className="w-8 h-8 mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2">Throughput</h3>
                <p className="text-3xl font-bold mb-1">5x</p>
                <p className="text-sm opacity-75">Mais requisições por segundo</p>
              </div>
              
              <div className="text-center p-6 bg-white/10 rounded-lg">
                <Database className="w-8 h-8 mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2">Uso de Recursos</h3>
                <p className="text-3xl font-bold mb-1">60%</p>
                <p className="text-sm opacity-75">Redução no uso de memória</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}