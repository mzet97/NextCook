'use client';

import { useState } from 'react';
import { Zap, Database, TrendingUp, Clock, Target, AlertTriangle, CheckCircle, BarChart3, Search, Filter } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import DemoCardStatic from '@/components/DemoCardStatic';

const optimizationTopics = [
  {
    title: 'Query Analysis',
    description: 'Análise e profiling de queries',
    icon: <Search className="w-5 h-5" />,
    techniques: ['EXPLAIN ANALYZE', 'Query Plans', 'Execution Time', 'Resource Usage']
  },
  {
    title: 'Indexing Strategy',
    description: 'Estratégias de indexação eficiente',
    icon: <Target className="w-5 h-5" />,
    techniques: ['B-tree Indexes', 'Composite Indexes', 'Partial Indexes', 'Index Maintenance']
  },
  {
    title: 'N+1 Problem',
    description: 'Identificação e solução do problema N+1',
    icon: <AlertTriangle className="w-5 h-5" />,
    techniques: ['Eager Loading', 'Batch Loading', 'DataLoader', 'Query Optimization']
  },
  {
    title: 'Caching Strategies',
    description: 'Estratégias de cache para performance',
    icon: <Zap className="w-5 h-5" />,
    techniques: ['Query Cache', 'Result Cache', 'Redis Cache', 'Application Cache']
  }
];

const codeExamples = [
  {
    title: 'Query Analysis com EXPLAIN',
    description: 'Analisando performance de queries com EXPLAIN ANALYZE',
    code: `-- Análise básica de query
EXPLAIN ANALYZE
SELECT u.name, COUNT(p.id) as post_count
FROM users u
LEFT JOIN posts p ON u.id = p.author_id
WHERE u.created_at >= '2024-01-01'
GROUP BY u.id, u.name
ORDER BY post_count DESC
LIMIT 10;

-- Resultado do EXPLAIN ANALYZE:
/*
Limit  (cost=1234.56..1234.67 rows=10 width=64) (actual time=45.123..45.234 rows=10 loops=1)
  ->  Sort  (cost=1234.56..1234.89 rows=132 width=64) (actual time=45.120..45.125 rows=10 loops=1)
        Sort Key: (count(p.id)) DESC
        Sort Method: top-N heapsort  Memory: 25kB
        ->  HashAggregate  (cost=1230.00..1231.32 rows=132 width=64) (actual time=44.567..44.890 rows=132 loops=1)
              Group Key: u.id, u.name
              ->  Hash Left Join  (cost=22.50..1225.67 rows=578 width=36) (actual time=0.234..43.456 rows=578 loops=1)
                    Hash Cond: (u.id = p.author_id)
                    ->  Seq Scan on users u  (cost=0.00..15.75 rows=132 width=36) (actual time=0.012..0.234 rows=132 loops=1)
                          Filter: (created_at >= '2024-01-01'::date)
                          Rows Removed by Filter: 23
                    ->  Hash  (cost=15.00..15.00 rows=600 width=8) (actual time=0.189..0.189 rows=600 loops=1)
                          Buckets: 1024  Batches: 1  Memory Usage: 30kB
                          ->  Seq Scan on posts p  (cost=0.00..15.00 rows=600 width=8) (actual time=0.006..0.089 rows=600 loops=1)
Planning Time: 0.234 ms
Execution Time: 45.345 ms
*/

-- Identificando problemas:
-- 1. Seq Scan em users - precisa de índice em created_at
-- 2. Sort custoso - pode ser otimizado
-- 3. Execution Time alto para poucos dados

-- Query otimizada com índices:
CREATE INDEX CONCURRENTLY idx_users_created_at ON users(created_at);
CREATE INDEX CONCURRENTLY idx_posts_author_id ON posts(author_id);

-- Query melhorada:
EXPLAIN ANALYZE
SELECT u.name, COUNT(p.id) as post_count
FROM users u
LEFT JOIN posts p ON u.id = p.author_id
WHERE u.created_at >= '2024-01-01'
GROUP BY u.id, u.name
ORDER BY post_count DESC
LIMIT 10;

-- Resultado otimizado:
/*
Limit  (cost=45.67..45.78 rows=10 width=64) (actual time=2.123..2.234 rows=10 loops=1)
  ->  Sort  (cost=45.67..46.00 rows=132 width=64) (actual time=2.120..2.125 rows=10 loops=1)
        Sort Key: (count(p.id)) DESC
        Sort Method: top-N heapsort  Memory: 25kB
        ->  HashAggregate  (cost=42.00..43.32 rows=132 width=64) (actual time=1.567..1.890 rows=132 loops=1)
              Group Key: u.id, u.name
              ->  Hash Left Join  (cost=8.50..40.67 rows=178 width=36) (actual time=0.134..1.456 rows=178 loops=1)
                    Hash Cond: (u.id = p.author_id)
                    ->  Index Scan using idx_users_created_at on users u  (cost=0.29..4.75 rows=132 width=36) (actual time=0.012..0.134 rows=132 loops=1)
                          Index Cond: (created_at >= '2024-01-01'::date)
                    ->  Hash  (cost=6.00..6.00 rows=178 width=8) (actual time=0.089..0.089 rows=178 loops=1)
                          Buckets: 1024  Batches: 1  Memory Usage: 15kB
                          ->  Index Scan using idx_posts_author_id on posts p  (cost=0.29..6.00 rows=178 width=8) (actual time=0.006..0.045 rows=178 loops=1)
Planning Time: 0.134 ms
Execution Time: 2.345 ms
*/

-- Melhoria: 45ms -> 2ms (95% mais rápido!)

-- Monitoramento contínuo de queries lentas
-- postgresql.conf
log_min_duration_statement = 1000  # Log queries > 1s
log_statement = 'all'  # Log todas as queries (apenas desenvolvimento)
log_duration = on
log_line_prefix = '%t [%p]: [%l-1] user=%u,db=%d,app=%a,client=%h '

-- Query para encontrar queries mais lentas
SELECT 
  query,
  calls,
  total_time,
  mean_time,
  rows,
  100.0 * shared_blks_hit / nullif(shared_blks_hit + shared_blks_read, 0) AS hit_percent
FROM pg_stat_statements 
ORDER BY total_time DESC 
LIMIT 10;`,
    language: 'sql'
  },
  {
    title: 'Estratégias de Indexação',
    description: 'Criação e otimização de índices para diferentes cenários',
    code: `-- 1. Índices Simples
-- Para queries com WHERE em uma coluna
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_posts_published ON posts(published);
CREATE INDEX idx_posts_created_at ON posts(created_at);

-- 2. Índices Compostos
-- Para queries com múltiplas condições WHERE
CREATE INDEX idx_posts_author_published ON posts(author_id, published);
CREATE INDEX idx_posts_published_created ON posts(published, created_at DESC);

-- Ordem importa! Coloque a mais seletiva primeiro
-- ✅ Bom: published (boolean) + created_at (timestamp)
CREATE INDEX idx_posts_published_date ON posts(published, created_at);

-- ❌ Ruim: created_at + published (menos eficiente para filtros por published)
CREATE INDEX idx_posts_date_published ON posts(created_at, published);

-- 3. Índices Parciais
-- Apenas para subset dos dados
CREATE INDEX idx_posts_published_only ON posts(created_at) 
WHERE published = true;

CREATE INDEX idx_users_active_email ON users(email) 
WHERE is_active = true;

-- 4. Índices Funcionais
-- Para queries com funções
CREATE INDEX idx_users_email_lower ON users(LOWER(email));
CREATE INDEX idx_posts_title_trgm ON posts USING gin(title gin_trgm_ops);

-- 5. Índices para Full-Text Search
-- Configurar extensão
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE EXTENSION IF NOT EXISTS unaccent;

-- Índice para busca de texto
CREATE INDEX idx_posts_search ON posts USING gin(
  to_tsvector('portuguese', title || ' ' || COALESCE(content, ''))
);

-- Query otimizada para busca
SELECT id, title, content
FROM posts
WHERE to_tsvector('portuguese', title || ' ' || COALESCE(content, '')) 
      @@ plainto_tsquery('portuguese', 'next.js react');

-- 6. Índices para JSON (PostgreSQL)
-- Para campos JSONB
CREATE INDEX idx_users_metadata_gin ON users USING gin(metadata);
CREATE INDEX idx_users_preferences ON users USING gin((metadata->'preferences'));

-- Queries otimizadas para JSON
SELECT * FROM users WHERE metadata @> '{"role": "admin"}';
SELECT * FROM users WHERE metadata->'preferences'->>'theme' = 'dark';

-- 7. Monitoramento de Índices
-- Verificar uso dos índices
SELECT 
  schemaname,
  tablename,
  indexname,
  idx_scan,
  idx_tup_read,
  idx_tup_fetch
FROM pg_stat_user_indexes
ORDER BY idx_scan DESC;

-- Encontrar índices não utilizados
SELECT 
  schemaname,
  tablename,
  indexname,
  pg_size_pretty(pg_relation_size(indexrelid)) as size
FROM pg_stat_user_indexes
WHERE idx_scan = 0
ORDER BY pg_relation_size(indexrelid) DESC;

-- 8. Manutenção de Índices
-- Reindexar quando necessário
REINDEX INDEX CONCURRENTLY idx_posts_published_date;
REINDEX TABLE CONCURRENTLY posts;

-- Analisar estatísticas
ANALYZE posts;
ANALYZE users;

-- Vacuum para limpeza
VACUUM ANALYZE posts;

-- 9. Índices no Prisma Schema
// schema.prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique // Cria índice único automaticamente
  name      String?
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  
  posts     Post[]
  
  // Índices customizados
  @@index([isActive, createdAt]) // Índice composto
  @@index([email]) // Índice simples adicional
  @@map("users")
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  createdAt DateTime @default(now())
  authorId  Int
  
  author    User     @relation(fields: [authorId], references: [id])
  
  // Índices para otimização
  @@index([published, createdAt(sort: Desc)]) // Para listagem de posts
  @@index([authorId, published]) // Para posts do autor
  @@index([createdAt]) // Para ordenação temporal
  @@fulltext([title, content]) // Full-text search (MySQL)
  @@map("posts")
}

-- 10. Estratégias por Tipo de Query

-- Para paginação eficiente
CREATE INDEX idx_posts_cursor ON posts(id, created_at);

-- Query com cursor pagination
SELECT * FROM posts 
WHERE (created_at, id) < ('2024-01-01 12:00:00', 1000)
ORDER BY created_at DESC, id DESC
LIMIT 20;

-- Para agregações
CREATE INDEX idx_posts_author_stats ON posts(author_id, published, created_at);

-- Query otimizada para contagem
SELECT 
  author_id,
  COUNT(*) as total_posts,
  COUNT(*) FILTER (WHERE published) as published_posts
FROM posts
GROUP BY author_id;

-- Para ranges de data
CREATE INDEX idx_posts_date_range ON posts(created_at) 
WHERE created_at >= '2024-01-01';

-- Query otimizada para range
SELECT * FROM posts
WHERE created_at BETWEEN '2024-01-01' AND '2024-12-31'
ORDER BY created_at DESC;`,
    language: 'sql'
  },
  {
    title: 'Resolvendo o Problema N+1',
    description: 'Identificação e solução do problema N+1 com Prisma',
    code: `// ❌ PROBLEMA N+1 - Evitar este padrão
// Este código faz 1 query para buscar posts + N queries para cada autor
const getBlogPostsBad = async () => {
  // 1 query para buscar posts
  const posts = await prisma.post.findMany({
    take: 10,
    orderBy: { createdAt: 'desc' }
  });
  
  // N queries - uma para cada post!
  const postsWithAuthors = await Promise.all(
    posts.map(async (post) => {
      // Query individual para cada autor
      const author = await prisma.user.findUnique({
        where: { id: post.authorId },
        select: { name: true, avatar: true }
      });
      
      return { ...post, author };
    })
  );
  
  return postsWithAuthors;
};
// Total: 1 + 10 = 11 queries! 😱

// ✅ SOLUÇÃO 1: Include/Select (Eager Loading)
const getBlogPostsGood = async () => {
  // Apenas 1 query com JOIN
  const posts = await prisma.post.findMany({
    take: 10,
    orderBy: { createdAt: 'desc' },
    include: {
      author: {
        select: {
          name: true,
          avatar: true
        }
      }
    }
  });
  
  return posts;
};
// Total: 1 query! 🎉

// ✅ SOLUÇÃO 2: Batch Loading Manual
const getBlogPostsBatch = async () => {
  // 1. Buscar posts
  const posts = await prisma.post.findMany({
    take: 10,
    orderBy: { createdAt: 'desc' }
  });
  
  // 2. Extrair IDs únicos dos autores
  const authorIds = [...new Set(posts.map(post => post.authorId))];
  
  // 3. Buscar todos os autores de uma vez
  const authors = await prisma.user.findMany({
    where: {
      id: { in: authorIds }
    },
    select: {
      id: true,
      name: true,
      avatar: true
    }
  });
  
  // 4. Criar mapa para lookup eficiente
  const authorMap = new Map(authors.map(author => [author.id, author]));
  
  // 5. Combinar dados
  const postsWithAuthors = posts.map(post => ({
    ...post,
    author: authorMap.get(post.authorId)
  }));
  
  return postsWithAuthors;
};
// Total: 2 queries (independente do número de posts)

// ✅ SOLUÇÃO 3: DataLoader Pattern
import DataLoader from 'dataloader';

// Criar DataLoader para usuários
const userLoader = new DataLoader(async (userIds: number[]) => {
  const users = await prisma.user.findMany({
    where: {
      id: { in: userIds }
    },
    select: {
      id: true,
      name: true,
      avatar: true
    }
  });
  
  // DataLoader espera array na mesma ordem dos IDs
  const userMap = new Map(users.map(user => [user.id, user]));
  return userIds.map(id => userMap.get(id) || null);
});

// Usar DataLoader
const getBlogPostsDataLoader = async () => {
  const posts = await prisma.post.findMany({
    take: 10,
    orderBy: { createdAt: 'desc' }
  });
  
  // DataLoader automaticamente faz batch das requisições
  const postsWithAuthors = await Promise.all(
    posts.map(async (post) => {
      const author = await userLoader.load(post.authorId);
      return { ...post, author };
    })
  );
  
  return postsWithAuthors;
};

// ✅ SOLUÇÃO 4: Query Complexa com Relacionamentos Aninhados
const getBlogPostsWithComments = async () => {
  const posts = await prisma.post.findMany({
    take: 10,
    orderBy: { createdAt: 'desc' },
    include: {
      author: {
        select: {
          name: true,
          avatar: true
        }
      },
      comments: {
        take: 3, // Apenas os 3 comentários mais recentes
        orderBy: { createdAt: 'desc' },
        include: {
          author: {
            select: {
              name: true,
              avatar: true
            }
          }
        }
      },
      _count: {
        select: {
          comments: true,
          likes: true
        }
      }
    }
  });
  
  return posts;
};
// Uma única query complexa vs múltiplas queries simples

// 🔍 DETECTANDO PROBLEMAS N+1

// 1. Middleware para logging de queries
const queryLogger = async (params: any, next: any) => {
  const before = Date.now();
  const result = await next(params);
  const after = Date.now();
  
  console.log('Query ' + params.model + '.' + params.action + ' took ' + (after - before) + 'ms');
  
  return result;
};

prisma.$use(queryLogger);

// 2. Contador de queries por request
class QueryCounter {
  private count = 0;
  private queries: string[] = [];
  
  increment(query: string) {
    this.count++;
    this.queries.push(query);
    
    if (this.count > 10) {
      console.warn('⚠️  Possível problema N+1 detectado! ' + this.count + ' queries:');
      console.log(this.queries);
    }
  }
  
  reset() {
    this.count = 0;
    this.queries = [];
  }
  
  getCount() {
    return this.count;
  }
}

// 3. Hook para detectar N+1 em desenvolvimento
const useQueryOptimization = () => {
  const [queryCount, setQueryCount] = useState(0);
  
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const originalFetch = window.fetch;
      
      window.fetch = async (...args) => {
        setQueryCount(prev => prev + 1);
        return originalFetch(...args);
      };
      
      return () => {
        window.fetch = originalFetch;
      };
    }
  }, []);
  
  return { queryCount };
};

// ✅ PADRÕES RECOMENDADOS

// 1. Repository Pattern com otimizações
class PostRepository {
  async findManyWithAuthors(options: {
    take?: number;
    skip?: number;
    where?: any;
  }) {
    return prisma.post.findMany({
      ...options,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        }
      }
    });
  }
  
  async findManyWithFullData(options: {
    take?: number;
    skip?: number;
  }) {
    return prisma.post.findMany({
      ...options,
      include: {
        author: true,
        comments: {
          take: 5,
          include: {
            author: true
          }
        },
        categories: true,
        _count: {
          select: {
            comments: true,
            likes: true
          }
        }
      }
    });
  }
}

// 2. Service Layer com cache
class PostService {
  private authorCache = new Map();
  
  async getPostsWithCachedAuthors(postIds: number[]) {
    const posts = await prisma.post.findMany({
      where: { id: { in: postIds } }
    });
    
    // Identificar autores não em cache
    const uncachedAuthorIds = posts
      .map(post => post.authorId)
      .filter(id => !this.authorCache.has(id));
    
    // Buscar apenas autores não em cache
    if (uncachedAuthorIds.length > 0) {
      const authors = await prisma.user.findMany({
        where: { id: { in: uncachedAuthorIds } },
        select: { id: true, name: true, avatar: true }
      });
      
      // Adicionar ao cache
      authors.forEach(author => {
        this.authorCache.set(author.id, author);
      });
    }
    
    // Combinar com dados do cache
    return posts.map(post => ({
      ...post,
      author: this.authorCache.get(post.authorId)
    }));
  }
}`,
    language: 'typescript'
  },
  {
    title: 'Estratégias de Cache',
    description: 'Implementação de cache para otimização de performance',
    code: `// 1. CACHE EM MEMÓRIA (Node.js)
import NodeCache from 'node-cache';

// Configurar cache com TTL
const cache = new NodeCache({
  stdTTL: 600, // 10 minutos
  checkperiod: 120, // Verificar expiração a cada 2 minutos
  useClones: false // Performance
});

// Service com cache
class CachedUserService {
  async getUser(id: number) {
    const cacheKey = 'user:' + id;
    
    // Tentar buscar do cache
    let user = cache.get(cacheKey);
    
    if (!user) {
      // Cache miss - buscar do banco
      user = await prisma.user.findUnique({
        where: { id },
        include: {
          profile: true,
          _count: {
            select: { posts: true }
          }
        }
      });
      
      if (user) {
        // Armazenar no cache
        cache.set(cacheKey, user, 300); // 5 minutos para dados de usuário
      }
    }
    
    return user;
  }
  
  async updateUser(id: number, data: any) {
    const user = await prisma.user.update({
      where: { id },
      data
    });
    
    // Invalidar cache
    cache.del('user:' + id);
    
    return user;
  }
}

// 2. REDIS CACHE
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

class RedisCache {
  async get<T>(key: string): Promise<T | null> {
    const value = await redis.get(key);
    return value ? JSON.parse(value) : null;
  }
  
  async set(key: string, value: any, ttl: number = 3600) {
    await redis.setex(key, ttl, JSON.stringify(value));
  }
  
  async del(key: string) {
    await redis.del(key);
  }
  
  async invalidatePattern(pattern: string) {
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  }
}

const redisCache = new RedisCache();

// Service com Redis
class PostService {
  async getPosts(page: number = 1, limit: number = 10) {
    const cacheKey = 'posts:page:' + page + ':limit:' + limit;
    
    // Tentar cache primeiro
    let posts = await redisCache.get(cacheKey);
    
    if (!posts) {
      posts = await prisma.post.findMany({
        skip: (page - 1) * limit,
        take: limit,
        include: {
          author: {
            select: { name: true, avatar: true }
          }
        },
        orderBy: { createdAt: 'desc' }
      });
      
      // Cache por 5 minutos
      await redisCache.set(cacheKey, posts, 300);
    }
    
    return posts;
  }
  
  async createPost(data: any) {
    const post = await prisma.post.create({
      data,
      include: {
        author: {
          select: { name: true, avatar: true }
        }
      }
    });
    
    // Invalidar cache de listagem
    await redisCache.invalidatePattern('posts:page:*');
    
    return post;
  }
}

// 3. CACHE COM TAGS
class TaggedCache {
  private cache = new Map();
  private tags = new Map<string, Set<string>>();
  
  set(key: string, value: any, tags: string[] = [], ttl: number = 3600) {
    const expiry = Date.now() + (ttl * 1000);
    this.cache.set(key, { value, expiry });
    
    // Associar tags
    tags.forEach(tag => {
      if (!this.tags.has(tag)) {
        this.tags.set(tag, new Set());
      }
      this.tags.get(tag)!.add(key);
    });
  }
  
  get(key: string) {
    const item = this.cache.get(key);
    
    if (!item) return null;
    
    // Verificar expiração
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }
    
    return item.value;
  }
  
  invalidateByTag(tag: string) {
    const keys = this.tags.get(tag);
    if (keys) {
      keys.forEach(key => this.cache.delete(key));
      this.tags.delete(tag);
    }
  }
}

const taggedCache = new TaggedCache();

// Uso com tags
class BlogService {
  async getPostsByAuthor(authorId: number) {
    const cacheKey = 'posts:author:' + authorId;
    
    let posts = taggedCache.get(cacheKey);
    
    if (!posts) {
      posts = await prisma.post.findMany({
        where: { authorId },
        include: { author: true }
      });
      
      // Cache com tags para invalidação
      taggedCache.set(cacheKey, posts, ['user:' + authorId, 'posts'], 600);
    }
    
    return posts;
  }
  
  async updateUser(userId: number, data: any) {
    const user = await prisma.user.update({
      where: { id: userId },
      data
    });
    
    // Invalidar todos os caches relacionados ao usuário
    taggedCache.invalidateByTag('user:' + userId);
    
    return user;
  }
}

// 4. CACHE DE QUERY RESULTS
class QueryCache {
  private cache = new Map();
  
  // Gerar chave baseada na query
  private generateKey(model: string, operation: string, args: any): string {
    return model + ':' + operation + ':' + JSON.stringify(args);
  }
  
  async findMany<T>(model: string, args: any, fetcher: () => Promise<T>): Promise<T> {
    const key = this.generateKey(model, 'findMany', args);
    
    let result = this.cache.get(key);
    
    if (!result) {
      result = await fetcher();
      this.cache.set(key, result);
      
      // Auto-expiração
      setTimeout(() => {
        this.cache.delete(key);
      }, 300000); // 5 minutos
    }
    
    return result;
  }
  
  invalidateModel(model: string) {
    const keysToDelete = [];
    
    for (const key of this.cache.keys()) {
      if (key.startsWith(model + ':')) {
        keysToDelete.push(key);
      }
    }
    
    keysToDelete.forEach(key => this.cache.delete(key));
  }
}

const queryCache = new QueryCache();

// Wrapper para Prisma com cache
class CachedPrisma {
  async findManyPosts(args: any) {
    return queryCache.findMany('post', args, () => 
      prisma.post.findMany(args)
    );
  }
  
  async createPost(data: any) {
    const post = await prisma.post.create({ data });
    
    // Invalidar cache de posts
    queryCache.invalidateModel('post');
    
    return post;
  }
}

// 5. CACHE MIDDLEWARE PARA PRISMA
const cacheMiddleware = async (params: any, next: any) => {
  // Apenas cachear operações de leitura
  if (!['findMany', 'findUnique', 'findFirst'].includes(params.action)) {
    return next(params);
  }
  
  const cacheKey = params.model + ':' + params.action + ':' + JSON.stringify(params.args);
  
  // Tentar cache
  let result = cache.get(cacheKey);
  
  if (!result) {
    result = await next(params);
    
    // Cache por 5 minutos
    cache.set(cacheKey, result, 300);
  }
  
  return result;
};

// Aplicar middleware
prisma.$use(cacheMiddleware);

// 6. CACHE INTELIGENTE COM INVALIDAÇÃO
class SmartCache {
  private cache = new Map();
  private dependencies = new Map<string, Set<string>>();
  
  set(key: string, value: any, dependencies: string[] = []) {
    this.cache.set(key, value);
    
    // Registrar dependências
    dependencies.forEach(dep => {
      if (!this.dependencies.has(dep)) {
        this.dependencies.set(dep, new Set());
      }
      this.dependencies.get(dep)!.add(key);
    });
  }
  
  get(key: string) {
    return this.cache.get(key);
  }
  
  invalidate(dependency: string) {
    const dependentKeys = this.dependencies.get(dependency);
    
    if (dependentKeys) {
      dependentKeys.forEach(key => {
        this.cache.delete(key);
      });
      this.dependencies.delete(dependency);
    }
  }
}

const smartCache = new SmartCache();

// Exemplo de uso
class UserPostService {
  async getUserPosts(userId: number) {
    const cacheKey = 'user-posts:' + userId;
    
    let posts = smartCache.get(cacheKey);
    
    if (!posts) {
      posts = await prisma.post.findMany({
        where: { authorId: userId },
        include: { author: true }
      });
      
      // Cache com dependências
      smartCache.set(cacheKey, posts, ['user:' + userId, 'posts']);
    }
    
    return posts;
  }
  
  async updateUser(userId: number, data: any) {
    const user = await prisma.user.update({
      where: { id: userId },
      data
    });
    
    // Invalidar automaticamente todos os caches dependentes
    smartCache.invalidate('user:' + userId);
    
    return user;
  }
  
  async createPost(data: any) {
    const post = await prisma.post.create({ data });
    
    // Invalidar caches de posts
    smartCache.invalidate('posts');
    smartCache.invalidate('user:' + data.authorId);
    
    return post;
  }
}`,
    language: 'typescript'
  }
];

const performanceMetrics = [
  {
    metric: 'Query Execution Time',
    description: 'Tempo de execução das queries',
    target: '< 100ms',
    tools: ['EXPLAIN ANALYZE', 'pg_stat_statements', 'Prisma metrics']
  },
  {
    metric: 'Cache Hit Rate',
    description: 'Taxa de acerto do cache',
    target: '> 80%',
    tools: ['Redis INFO', 'Application metrics', 'Custom counters']
  },
  {
    metric: 'Connection Pool Usage',
    description: 'Utilização do pool de conexões',
    target: '< 80%',
    tools: ['Prisma metrics', 'Database monitoring', 'Connection stats']
  },
  {
    metric: 'Index Usage',
    description: 'Utilização dos índices',
    target: '> 95%',
    tools: ['pg_stat_user_indexes', 'Query analysis', 'Index monitoring']
  }
];

const optimizationTips = [
  {
    category: 'Query Optimization',
    tips: [
      'Use SELECT específico ao invés de SELECT *',
      'Implemente paginação adequada',
      'Evite queries desnecessárias em loops',
      'Use LIMIT para restringir resultados'
    ]
  },
  {
    category: 'Index Strategy',
    tips: [
      'Crie índices para colunas em WHERE',
      'Use índices compostos para múltiplas condições',
      'Monitore índices não utilizados',
      'Considere índices parciais para subsets'
    ]
  },
  {
    category: 'Caching',
    tips: [
      'Cache dados frequentemente acessados',
      'Implemente invalidação inteligente',
      'Use TTL apropriado para cada tipo de dado',
      'Monitore hit rate do cache'
    ]
  },
  {
    category: 'Connection Management',
    tips: [
      'Configure pool de conexões adequadamente',
      'Use uma instância única do Prisma Client',
      'Monitore conexões ativas',
      'Implemente connection retry logic'
    ]
  }
];

export default function OptimizationPage() {
  const [selectedExample, setSelectedExample] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs />
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-6">
            <Zap className="w-8 h-8 text-yellow-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Query Optimization
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Otimize a performance do seu banco de dados com estratégias avançadas de indexação, cache e análise de queries.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-lg p-1 shadow-sm border">
            {[
              { id: 'overview', label: 'Visão Geral' },
              { id: 'examples', label: 'Exemplos' },
              { id: 'metrics', label: 'Métricas' },
              { id: 'tips', label: 'Dicas' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-yellow-600 text-white'
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
            {/* Topics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {optimizationTopics.map((topic, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-yellow-50 rounded-lg mr-3">
                      {topic.icon}
                    </div>
                    <h3 className="font-semibold text-gray-900">{topic.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{topic.description}</p>
                  <ul className="space-y-1">
                    {topic.techniques.map((technique, techIndex) => (
                      <li key={techIndex} className="flex items-center text-sm text-gray-500">
                        <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                        {technique}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Performance Impact */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Impacto na Performance</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-green-50 rounded-lg">
                  <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Índices Otimizados</h3>
                  <p className="text-3xl font-bold text-green-600 mb-1">95%</p>
                  <p className="text-sm text-gray-600">Redução no tempo de query</p>
                </div>
                
                <div className="text-center p-6 bg-blue-50 rounded-lg">
                  <Clock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Cache Inteligente</h3>
                  <p className="text-3xl font-bold text-blue-600 mb-1">80%</p>
                  <p className="text-sm text-gray-600">Menos queries ao banco</p>
                </div>
                
                <div className="text-center p-6 bg-purple-50 rounded-lg">
                  <BarChart3 className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">N+1 Resolvido</h3>
                  <p className="text-3xl font-bold text-purple-600 mb-1">90%</p>
                  <p className="text-sm text-gray-600">Melhoria na escalabilidade</p>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'examples' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Exemplos Práticos</h2>
              <p className="text-gray-600">Técnicas avançadas de otimização com exemplos reais</p>
            </div>
            
            <div className="flex border-b border-gray-100 overflow-x-auto">
              {codeExamples.map((example, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedExample(index)}
                  className={`flex-shrink-0 p-4 text-left transition-colors min-w-[200px] ${
                    selectedExample === index
                      ? 'bg-yellow-50 border-b-2 border-yellow-600 text-yellow-700'
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
                  <pre className="text-yellow-400 text-sm">
                    <code>{codeExamples[selectedExample].code}</code>
                  </pre>
                </div>
              </DemoCardStatic>
            </div>
          </div>
        )}

        {activeTab === 'metrics' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{metric.metric}</h3>
                  <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded">
                    {metric.target}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{metric.description}</p>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Ferramentas:</h4>
                  <div className="flex flex-wrap gap-2">
                    {metric.tools.map((tool, toolIndex) => (
                      <span key={toolIndex} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'tips' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {optimizationTips.map((category, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{category.category}</h3>
                <ul className="space-y-3">
                  {category.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Performance Checklist */}
        <div className="mt-12 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-xl p-8 text-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Checklist de Performance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="font-semibold mb-3">✅ Essenciais</h3>
                <div className="space-y-2 text-sm">
                  <div>□ Índices em colunas WHERE</div>
                  <div>□ Análise de queries lentas</div>
                  <div>□ Resolução de problemas N+1</div>
                  <div>□ Cache de dados frequentes</div>
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold mb-3">🚀 Avançado</h3>
                <div className="space-y-2 text-sm">
                  <div>□ Índices compostos otimizados</div>
                  <div>□ Connection pooling configurado</div>
                  <div>□ Monitoramento de métricas</div>
                  <div>□ Estratégias de invalidação</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}