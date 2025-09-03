'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Container, 
  Package, 
  Server, 
  Layers,
  Play,
  Square,
  RotateCcw,
  Download,
  Upload,
  Settings,
  Monitor,
  Shield,
  Zap,
  Database,
  Globe,
  Code
} from 'lucide-react';
import { DemoCard } from '@/components/DemoCard';
import { DemoCardStatic } from '@/components/DemoCardStatic';
import { DemoSection } from '@/components/DemoSection';
import { CodeBlock } from '@/components/CodeBlock';

const dockerFeatures = [
  {
    title: 'Containerização',
    description: 'Empacote aplicações com todas as dependências',
    icon: Package,
    color: 'text-blue-500',
    benefits: ['Isolamento', 'Portabilidade', 'Consistência', 'Eficiência']
  },
  {
    title: 'Orquestração',
    description: 'Gerencie múltiplos containers facilmente',
    icon: Settings,
    color: 'text-green-500',
    benefits: ['Docker Compose', 'Scaling', 'Load Balancing', 'Service Discovery']
  },
  {
    title: 'Desenvolvimento',
    description: 'Ambiente consistente para toda equipe',
    icon: Code,
    color: 'text-purple-500',
    benefits: ['Dev/Prod Parity', 'Quick Setup', 'Version Control', 'Collaboration']
  },
  {
    title: 'Produção',
    description: 'Deploy confiável e escalável',
    icon: Server,
    color: 'text-red-500',
    benefits: ['Zero Downtime', 'Auto Scaling', 'Health Checks', 'Rolling Updates']
  }
];

const dockerCommands = [
  {
    category: 'Images',
    commands: [
      { cmd: 'docker build -t myapp .', desc: 'Construir imagem' },
      { cmd: 'docker images', desc: 'Listar imagens' },
      { cmd: 'docker rmi image_id', desc: 'Remover imagem' },
      { cmd: 'docker pull nginx:latest', desc: 'Baixar imagem' }
    ]
  },
  {
    category: 'Containers',
    commands: [
      { cmd: 'docker run -d -p 3000:3000 myapp', desc: 'Executar container' },
      { cmd: 'docker ps', desc: 'Listar containers ativos' },
      { cmd: 'docker stop container_id', desc: 'Parar container' },
      { cmd: 'docker exec -it container_id bash', desc: 'Acessar container' }
    ]
  },
  {
    category: 'Volumes',
    commands: [
      { cmd: 'docker volume create myvolume', desc: 'Criar volume' },
      { cmd: 'docker volume ls', desc: 'Listar volumes' },
      { cmd: 'docker run -v myvolume:/data myapp', desc: 'Montar volume' },
      { cmd: 'docker volume prune', desc: 'Limpar volumes não usados' }
    ]
  },
  {
    category: 'Networks',
    commands: [
      { cmd: 'docker network create mynetwork', desc: 'Criar rede' },
      { cmd: 'docker network ls', desc: 'Listar redes' },
      { cmd: 'docker run --network mynetwork myapp', desc: 'Conectar à rede' },
      { cmd: 'docker network inspect mynetwork', desc: 'Inspecionar rede' }
    ]
  }
];

const dockerfileExamples = [
  {
    name: 'Next.js App',
    description: 'Aplicação Next.js com multi-stage build',
    dockerfile: `# Multi-stage build para Next.js
FROM node:18-alpine AS base

# Instalar dependências apenas quando necessário
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Instalar dependências baseado no package manager preferido
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Rebuild apenas quando necessário
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Desabilitar telemetria durante build
ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn build

# Imagem de produção
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Copiar arquivos de build
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]`
  },
  {
    name: 'Node.js API',
    description: 'API Node.js com Express',
    dockerfile: `# Usar imagem oficial do Node.js
FROM node:18-alpine

# Criar diretório da aplicação
WORKDIR /usr/src/app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm ci --only=production

# Copiar código fonte
COPY . .

# Criar usuário não-root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Mudar ownership dos arquivos
RUN chown -R nextjs:nodejs /usr/src/app
USER nextjs

# Expor porta
EXPOSE 8000

# Comando para iniciar aplicação
CMD ["npm", "start"]`
  },
  {
    name: 'Full Stack',
    description: 'Aplicação com frontend e backend',
    dockerfile: `# Multi-service Dockerfile
# Frontend (React/Next.js)
FROM node:18-alpine as frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# Backend (Node.js/Express)
FROM node:18-alpine as backend
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci --only=production
COPY backend/ ./

# Nginx para servir frontend e proxy backend
FROM nginx:alpine as production

# Copiar build do frontend
COPY --from=frontend /app/frontend/dist /usr/share/nginx/html

# Copiar configuração do Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copiar backend
COPY --from=backend /app/backend /app/backend

# Instalar Node.js para executar backend
RUN apk add --no-cache nodejs npm

# Script de inicialização
COPY start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 80

CMD ["/start.sh"]`
  }
];

const composeExamples = [
  {
    name: 'Full Stack App',
    description: 'Frontend, Backend, Database e Redis',
    compose: `version: '3.8'

services:
  # Frontend (Next.js)
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://backend:8000
    depends_on:
      - backend
    networks:
      - app-network

  # Backend (Node.js/Express)
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://user:password@postgres:5432/mydb
      - REDIS_URL=redis://redis:6379
    depends_on:
      - postgres
      - redis
    networks:
      - app-network
    volumes:
      - ./backend:/app
      - /app/node_modules

  # Database (PostgreSQL)
  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=mydb
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    networks:
      - app-network

  # Cache (Redis)
  redis:
    image: redis:7-alpine
    command: redis-server --appendonly yes
    volumes:
      - redis_data:/data
    networks:
      - app-network

  # Nginx (Load Balancer/Proxy)
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - frontend
      - backend
    networks:
      - app-network

volumes:
  postgres_data:
  redis_data:

networks:
  app-network:
    driver: bridge`
  },
  {
    name: 'Development Environment',
    description: 'Ambiente de desenvolvimento com hot reload',
    compose: `version: '3.8'

services:
  # Frontend com hot reload
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    environment:
      - CHOKIDAR_USEPOLLING=true
      - NEXT_PUBLIC_API_URL=http://localhost:8000
    volumes:
      - ./frontend:/app
      - /app/node_modules
      - /app/.next
    networks:
      - dev-network

  # Backend com nodemon
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile.dev
    ports:
      - "8000:8000"
      - "9229:9229"  # Debug port
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://dev:dev@postgres:5432/devdb
    volumes:
      - ./backend:/app
      - /app/node_modules
    depends_on:
      - postgres
    networks:
      - dev-network

  # Database para desenvolvimento
  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_USER=dev
      - POSTGRES_PASSWORD=dev
      - POSTGRES_DB=devdb
    ports:
      - "5432:5432"
    volumes:
      - dev_postgres_data:/var/lib/postgresql/data
    networks:
      - dev-network

  # Adminer para gerenciar DB
  adminer:
    image: adminer
    ports:
      - "8080:8080"
    networks:
      - dev-network

volumes:
  dev_postgres_data:

networks:
  dev-network:
    driver: bridge`
  }
];

export default function DockerPage() {
  const [selectedTab, setSelectedTab] = useState('dockerfile');
  const [selectedCommand, setSelectedCommand] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [selectedCompose, setSelectedCompose] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl text-white mr-4">
              <Container className="h-8 w-8" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
              Docker
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Containerize suas aplicações para desenvolvimento e produção. 
            Garanta consistência, portabilidade e escalabilidade.
          </p>
        </motion.div>

        {/* Features */}
        <DemoSection title="Por que Docker?" description="Benefícios da containerização">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {dockerFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <DemoCardStatic title={feature.title} description={feature.description}>
                    <div className="space-y-4">
                      <Icon className={`h-12 w-12 mx-auto ${feature.color}`} />
                      <div className="space-y-2">
                        {feature.benefits.map((benefit) => (
                          <div key={benefit} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 flex-shrink-0" />
                            {benefit}
                          </div>
                        ))}
                      </div>
                    </div>
                  </DemoCardStatic>
                </motion.div>
              );
            })}
          </div>
        </DemoSection>

        {/* Installation */}
        <DemoSection title="Instalação e Setup" description="Como instalar e configurar Docker">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <DemoCardStatic title="Instalação" description="Instalar Docker em diferentes sistemas">
              <CodeBlock
                language="bash"
                code={`# Ubuntu/Debian
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Adicionar usuário ao grupo docker
sudo usermod -aG docker $USER

# macOS (usando Homebrew)
brew install --cask docker

# Windows
# Baixar Docker Desktop do site oficial
# https://www.docker.com/products/docker-desktop

# Verificar instalação
docker --version
docker-compose --version

# Testar instalação
docker run hello-world`}
              />
            </DemoCardStatic>

            <DemoCardStatic title="Configuração" description="Configurações iniciais recomendadas">
              <CodeBlock
                language="bash"
                code={`# Configurar daemon Docker
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<EOF
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  },
  "storage-driver": "overlay2"
}
EOF

# Reiniciar Docker
sudo systemctl restart docker

# Configurar Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Criar alias úteis
echo 'alias dps="docker ps"' >> ~/.bashrc
echo 'alias di="docker images"' >> ~/.bashrc
echo 'alias dc="docker-compose"' >> ~/.bashrc`}
              />
            </DemoCardStatic>
          </div>
        </DemoSection>

        {/* Docker Commands */}
        <DemoSection title="Comandos Essenciais" description="Comandos Docker mais utilizados">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8 px-6">
                {dockerCommands.map((category, index) => (
                  <button
                    key={category.category}
                    onClick={() => setSelectedCommand(index)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      selectedCommand === index
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    {category.category}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {dockerCommands[selectedCommand].commands.map((command, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <code className="text-sm font-mono bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-blue-600 dark:text-blue-400">
                        {command.cmd}
                      </code>
                      <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <Package className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {command.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DemoSection>

        {/* Dockerfile Examples */}
        <DemoSection title="Exemplos de Dockerfile" description="Dockerfiles para diferentes tipos de aplicação">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8 px-6">
                {dockerfileExamples.map((example, index) => (
                  <button
                    key={example.name}
                    onClick={() => setSelectedExample(index)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      selectedExample === index
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    {example.name}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {dockerfileExamples[selectedExample].name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {dockerfileExamples[selectedExample].description}
                </p>
              </div>
              
              <CodeBlock
                language="dockerfile"
                code={dockerfileExamples[selectedExample].dockerfile}
              />
            </div>
          </div>
        </DemoSection>

        {/* Docker Compose */}
        <DemoSection title="Docker Compose" description="Orquestração de múltiplos containers">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8 px-6">
                {composeExamples.map((example, index) => (
                  <button
                    key={example.name}
                    onClick={() => setSelectedCompose(index)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      selectedCompose === index
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    {example.name}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {composeExamples[selectedCompose].name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {composeExamples[selectedCompose].description}
                </p>
              </div>
              
              <CodeBlock
                language="yaml"
                code={composeExamples[selectedCompose].compose}
              />
            </div>
          </div>
        </DemoSection>

        {/* Best Practices */}
        <DemoSection title="Melhores Práticas" description="Diretrizes para usar Docker eficientemente">
          <div className="grid md:grid-cols-2 gap-6">
            <DemoCardStatic title="Otimização de Imagens" description="Como criar imagens menores e mais eficientes">
              <div className="space-y-4">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h4 className="font-medium text-green-800 dark:text-green-400 mb-2">✅ Boas Práticas</h4>
                  <ul className="space-y-1 text-sm text-green-700 dark:text-green-300">
                    <li>• Use imagens base Alpine quando possível</li>
                    <li>• Implemente multi-stage builds</li>
                    <li>• Minimize o número de layers</li>
                    <li>• Use .dockerignore para excluir arquivos</li>
                    <li>• Ordene comandos por frequência de mudança</li>
                    <li>• Remova cache de package managers</li>
                  </ul>
                </div>
                
                <CodeBlock
                  language="dockerfile"
                  code={`# ✅ Bom exemplo
FROM node:18-alpine
WORKDIR /app

# Copiar apenas package.json primeiro (cache layer)
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copiar código depois
COPY . .

# Usar usuário não-root
USER node

EXPOSE 3000
CMD ["npm", "start"]`}
                />
              </div>
            </DemoCardStatic>

             <DemoCardStatic title="Segurança" description="Práticas de segurança para containers">
              <div className="space-y-4">
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                  <h4 className="font-medium text-red-800 dark:text-red-400 mb-2">🔒 Segurança</h4>
                  <ul className="space-y-1 text-sm text-red-700 dark:text-red-300">
                    <li>• Nunca execute como root</li>
                    <li>• Use imagens oficiais e verificadas</li>
                    <li>• Mantenha imagens atualizadas</li>
                    <li>• Escaneie vulnerabilidades</li>
                    <li>• Use secrets para dados sensíveis</li>
                    <li>• Configure resource limits</li>
                  </ul>
                </div>
                
                <CodeBlock
                  language="dockerfile"
                  code={`# Criar usuário não-root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Configurar permissões
COPY --chown=nextjs:nodejs . .

# Usar usuário não-root
USER nextjs

# Configurar health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1`}
                />
              </div>
            </DemoCardStatic>
          </div>
        </DemoSection>

        {/* Production Tips */}
        <DemoSection title="Produção" description="Configurações para ambiente de produção">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Monitor className="h-5 w-5 mr-2 text-blue-500" />
                  Monitoramento
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Configure health checks</li>
                  <li>• Implemente logging estruturado</li>
                  <li>• Use métricas de container</li>
                  <li>• Configure alertas</li>
                  <li>• Monitore resource usage</li>
                  <li>• Track container lifecycle</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-yellow-500" />
                  Performance
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Configure resource limits</li>
                  <li>• Use multi-stage builds</li>
                  <li>• Otimize startup time</li>
                  <li>• Configure restart policies</li>
                  <li>• Use volume mounts adequadamente</li>
                  <li>• Implemente graceful shutdown</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-green-500" />
                  Segurança
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Escaneie imagens regularmente</li>
                  <li>• Use registry privado</li>
                  <li>• Configure network policies</li>
                  <li>• Implemente RBAC</li>
                  <li>• Use secrets management</li>
                  <li>• Configure audit logging</li>
                </ul>
              </div>
            </div>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}