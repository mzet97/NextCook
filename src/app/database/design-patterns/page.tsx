'use client';

import { useState } from 'react';
import { Layers, Database, GitBranch, Zap, Shield, Users, FileText, Settings, ArrowRight, CheckCircle, AlertTriangle } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import DemoCardStatic from '@/components/DemoCardStatic';

const designPatterns = [
  {
    title: 'Repository Pattern',
    description: 'Abstração da camada de acesso a dados',
    icon: <Database className="w-6 h-6" />,
    level: 'Intermediário',
    benefits: ['Testabilidade', 'Flexibilidade', 'Manutenibilidade', 'Desacoplamento'],
    useCases: ['APIs REST', 'Testes unitários', 'Múltiplas fontes de dados']
  },
  {
    title: 'Unit of Work',
    description: 'Gerenciamento de transações e mudanças',
    icon: <GitBranch className="w-6 h-6" />,
    level: 'Avançado',
    benefits: ['Consistência', 'Performance', 'Transações', 'Controle de estado'],
    useCases: ['Operações complexas', 'Múltiplas entidades', 'Rollback automático']
  },
  {
    title: 'CQRS',
    description: 'Command Query Responsibility Segregation',
    icon: <Layers className="w-6 h-6" />,
    level: 'Avançado',
    benefits: ['Escalabilidade', 'Performance', 'Flexibilidade', 'Otimização'],
    useCases: ['Sistemas complexos', 'Alta performance', 'Diferentes modelos']
  },
  {
    title: 'Event Sourcing',
    description: 'Armazenamento de eventos ao invés de estado',
    icon: <FileText className="w-6 h-6" />,
    level: 'Avançado',
    benefits: ['Auditoria completa', 'Replay de eventos', 'Debugging', 'Histórico'],
    useCases: ['Sistemas financeiros', 'Auditoria', 'Análise temporal']
  },
  {
    title: 'Data Mapper',
    description: 'Mapeamento entre objetos e banco de dados',
    icon: <Settings className="w-6 h-6" />,
    level: 'Intermediário',
    benefits: ['Independência', 'Flexibilidade', 'Testabilidade', 'Reutilização'],
    useCases: ['ORMs', 'Múltiplos bancos', 'Transformação de dados']
  },
  {
    title: 'Active Record',
    description: 'Objetos que encapsulam dados e comportamento',
    icon: <Users className="w-6 h-6" />,
    level: 'Básico',
    benefits: ['Simplicidade', 'Rapidez', 'Intuitividade', 'Menos código'],
    useCases: ['Protótipos', 'Aplicações simples', 'RAD']
  }
];

const codeExamples = [
  {
    title: 'Repository Pattern',
    description: 'Implementação do padrão Repository com TypeScript',
    code: `// interfaces/UserRepository.ts
export interface User {
  id: number;
  email: string;
  name: string;
  createdAt: Date;
}

export interface UserRepository {
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(options?: FindOptions): Promise<User[]>;
  create(userData: Omit<User, 'id' | 'createdAt'>): Promise<User>;
  update(id: number, userData: Partial<User>): Promise<User>;
  delete(id: number): Promise<void>;
}

export interface FindOptions {
  limit?: number;
  offset?: number;
  orderBy?: keyof User;
  order?: 'asc' | 'desc';
}

// repositories/PrismaUserRepository.ts
import { PrismaClient } from '@prisma/client';
import { UserRepository, User, FindOptions } from '../interfaces/UserRepository';

export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id }
    });
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email }
    });
    return user;
  }

  async findAll(options: FindOptions = {}): Promise<User[]> {
    const { limit = 10, offset = 0, orderBy = 'createdAt', order = 'desc' } = options;
    
    const users = await this.prisma.user.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        [orderBy]: order
      }
    });
    return users;
  }

  async create(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const user = await this.prisma.user.create({
      data: userData
    });
    return user;
  }

  async update(id: number, userData: Partial<User>): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id },
      data: userData
    });
    return user;
  }

  async delete(id: number): Promise<void> {
    await this.prisma.user.delete({
      where: { id }
    });
  }
}

// services/UserService.ts
import { UserRepository } from '../interfaces/UserRepository';

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUserProfile(id: number) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    return user;
  }

  async createUser(email: string, name: string) {
    // Verificar se email já existe
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('Email já está em uso');
    }

    return await this.userRepository.create({ email, name });
  }

  async getUsers(page: number = 1, limit: number = 10) {
    const offset = (page - 1) * limit;
    return await this.userRepository.findAll({ limit, offset });
  }
}`,
    language: 'typescript'
  },
  {
    title: 'Unit of Work',
    description: 'Padrão para gerenciar transações e mudanças',
    code: `// UnitOfWork.ts
import { PrismaClient } from '@prisma/client';

export interface UnitOfWork {
  commit(): Promise<void>;
  rollback(): Promise<void>;
  registerNew<T>(entity: T, repository: string): void;
  registerDirty<T>(entity: T, repository: string): void;
  registerDeleted<T>(entity: T, repository: string): void;
}

type EntityOperation = {
  entity: any;
  repository: string;
  operation: 'create' | 'update' | 'delete';
};

export class PrismaUnitOfWork implements UnitOfWork {
  private operations: EntityOperation[] = [];
  private transaction: any = null;

  constructor(private prisma: PrismaClient) {}

  registerNew<T>(entity: T, repository: string): void {
    this.operations.push({
      entity,
      repository,
      operation: 'create'
    });
  }

  registerDirty<T>(entity: T, repository: string): void {
    this.operations.push({
      entity,
      repository,
      operation: 'update'
    });
  }

  registerDeleted<T>(entity: T, repository: string): void {
    this.operations.push({
      entity,
      repository,
      operation: 'delete'
    });
  }

  async commit(): Promise<void> {
    if (this.operations.length === 0) {
      return;
    }

    try {
      await this.prisma.$transaction(async (tx) => {
        this.transaction = tx;
        
        for (const operation of this.operations) {
          await this.executeOperation(operation);
        }
      });
      
      this.operations = [];
    } catch (error) {
      await this.rollback();
      throw error;
    }
  }

  async rollback(): Promise<void> {
    this.operations = [];
    this.transaction = null;
  }

  private async executeOperation(operation: EntityOperation): Promise<void> {
    const { entity, repository, operation: op } = operation;
    const tx = this.transaction;

    switch (repository) {
      case 'user':
        switch (op) {
          case 'create':
            await tx.user.create({ data: entity });
            break;
          case 'update':
            await tx.user.update({ 
              where: { id: entity.id }, 
              data: entity 
            });
            break;
          case 'delete':
            await tx.user.delete({ where: { id: entity.id } });
            break;
        }
        break;
      
      case 'post':
        switch (op) {
          case 'create':
            await tx.post.create({ data: entity });
            break;
          case 'update':
            await tx.post.update({ 
              where: { id: entity.id }, 
              data: entity 
            });
            break;
          case 'delete':
            await tx.post.delete({ where: { id: entity.id } });
            break;
        }
        break;
    }
  }
}

// Exemplo de uso
export class BlogService {
  constructor(
    private unitOfWork: UnitOfWork,
    private userRepository: UserRepository,
    private postRepository: PostRepository
  ) {}

  async createUserWithPost(userData: any, postData: any) {
    try {
      // Registrar operações
      const user = { ...userData, id: Date.now() }; // ID temporário
      this.unitOfWork.registerNew(user, 'user');
      
      const post = { ...postData, authorId: user.id, id: Date.now() + 1 };
      this.unitOfWork.registerNew(post, 'post');
      
      // Executar todas as operações em uma transação
      await this.unitOfWork.commit();
      
      return { user, post };
    } catch (error) {
      await this.unitOfWork.rollback();
      throw error;
    }
  }

  async transferPostOwnership(postId: number, newOwnerId: number) {
    try {
      const post = await this.postRepository.findById(postId);
      if (!post) {
        throw new Error('Post não encontrado');
      }

      const newOwner = await this.userRepository.findById(newOwnerId);
      if (!newOwner) {
        throw new Error('Novo proprietário não encontrado');
      }

      // Atualizar post
      const updatedPost = { ...post, authorId: newOwnerId };
      this.unitOfWork.registerDirty(updatedPost, 'post');
      
      // Atualizar contadores (se existirem)
      // ...
      
      await this.unitOfWork.commit();
      
      return updatedPost;
    } catch (error) {
      await this.unitOfWork.rollback();
      throw error;
    }
  }
}`,
    language: 'typescript'
  },
  {
    title: 'CQRS Pattern',
    description: 'Separação de comandos e consultas',
    code: `// commands/CreateUserCommand.ts
export interface CreateUserCommand {
  email: string;
  name: string;
  password: string;
}

export interface UpdateUserCommand {
  id: number;
  email?: string;
  name?: string;
}

export interface DeleteUserCommand {
  id: number;
}

// queries/UserQueries.ts
export interface UserListQuery {
  page?: number;
  limit?: number;
  search?: string;
  orderBy?: string;
  order?: 'asc' | 'desc';
}

export interface UserDetailQuery {
  id: number;
  includeProfile?: boolean;
  includePosts?: boolean;
}

// handlers/UserCommandHandler.ts
import { PrismaClient } from '@prisma/client';
import { CreateUserCommand, UpdateUserCommand, DeleteUserCommand } from '../commands';
import { EventBus } from '../events/EventBus';
import { UserCreatedEvent, UserUpdatedEvent, UserDeletedEvent } from '../events';

export class UserCommandHandler {
  constructor(
    private prisma: PrismaClient,
    private eventBus: EventBus
  ) {}

  async handle(command: CreateUserCommand): Promise<{ id: number }> {
    // Validações
    const existingUser = await this.prisma.user.findUnique({
      where: { email: command.email }
    });
    
    if (existingUser) {
      throw new Error('Email já está em uso');
    }

    // Criar usuário
    const user = await this.prisma.user.create({
      data: {
        email: command.email,
        name: command.name,
        password: await this.hashPassword(command.password)
      }
    });

    // Publicar evento
    await this.eventBus.publish(new UserCreatedEvent({
      userId: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt
    }));

    return { id: user.id };
  }

  async handleUpdate(command: UpdateUserCommand): Promise<void> {
    const user = await this.prisma.user.update({
      where: { id: command.id },
      data: {
        email: command.email,
        name: command.name
      }
    });

    await this.eventBus.publish(new UserUpdatedEvent({
      userId: user.id,
      changes: command,
      updatedAt: new Date()
    }));
  }

  async handleDelete(command: DeleteUserCommand): Promise<void> {
    await this.prisma.user.delete({
      where: { id: command.id }
    });

    await this.eventBus.publish(new UserDeletedEvent({
      userId: command.id,
      deletedAt: new Date()
    }));
  }

  private async hashPassword(password: string): Promise<string> {
    // Implementar hash da senha
    return password; // Placeholder
  }
}

// handlers/UserQueryHandler.ts
import { PrismaClient } from '@prisma/client';
import { UserListQuery, UserDetailQuery } from '../queries';

export class UserQueryHandler {
  constructor(private prisma: PrismaClient) {}

  async handleList(query: UserListQuery) {
    const {
      page = 1,
      limit = 10,
      search,
      orderBy = 'createdAt',
      order = 'desc'
    } = query;

    const offset = (page - 1) * limit;

    const where = search ? {
      OR: [
        { name: { contains: search, mode: 'insensitive' as const } },
        { email: { contains: search, mode: 'insensitive' as const } }
      ]
    } : {};

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        take: limit,
        skip: offset,
        orderBy: { [orderBy]: order },
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true,
          _count: {
            select: { posts: true }
          }
        }
      }),
      this.prisma.user.count({ where })
    ]);

    return {
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  async handleDetail(query: UserDetailQuery) {
    const { id, includeProfile = false, includePosts = false } = query;

    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        profile: includeProfile,
        posts: includePosts ? {
          orderBy: { createdAt: 'desc' },
          take: 10
        } : false
      }
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return user;
  }
}

// api/users/route.ts (Next.js App Router)
import { NextRequest, NextResponse } from 'next/server';
import { UserCommandHandler, UserQueryHandler } from '@/handlers';
import { CreateUserCommand, UserListQuery } from '@/types';

const commandHandler = new UserCommandHandler(prisma, eventBus);
const queryHandler = new UserQueryHandler(prisma);

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  const query: UserListQuery = {
    page: parseInt(searchParams.get('page') || '1'),
    limit: parseInt(searchParams.get('limit') || '10'),
    search: searchParams.get('search') || undefined,
    orderBy: searchParams.get('orderBy') || 'createdAt',
    order: (searchParams.get('order') as 'asc' | 'desc') || 'desc'
  };

  try {
    const result = await queryHandler.handleList(query);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao buscar usuários' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const command: CreateUserCommand = {
      email: body.email,
      name: body.name,
      password: body.password
    };

    const result = await commandHandler.handle(command);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}`,
    language: 'typescript'
  },
  {
    title: 'Event Sourcing',
    description: 'Armazenamento baseado em eventos',
    code: `// events/BaseEvent.ts
export abstract class BaseEvent {
  public readonly id: string;
  public readonly aggregateId: string;
  public readonly version: number;
  public readonly timestamp: Date;
  public readonly type: string;

  constructor(
    aggregateId: string,
    version: number,
    type: string,
    public readonly data: any
  ) {
    this.id = crypto.randomUUID();
    this.aggregateId = aggregateId;
    this.version = version;
    this.timestamp = new Date();
    this.type = type;
  }
}

// events/UserEvents.ts
export class UserCreatedEvent extends BaseEvent {
  constructor(aggregateId: string, version: number, data: {
    email: string;
    name: string;
  }) {
    super(aggregateId, version, 'UserCreated', data);
  }
}

export class UserEmailChangedEvent extends BaseEvent {
  constructor(aggregateId: string, version: number, data: {
    oldEmail: string;
    newEmail: string;
  }) {
    super(aggregateId, version, 'UserEmailChanged', data);
  }
}

export class UserDeactivatedEvent extends BaseEvent {
  constructor(aggregateId: string, version: number, data: {
    reason: string;
  }) {
    super(aggregateId, version, 'UserDeactivated', data);
  }
}

// aggregates/User.ts
import { BaseEvent } from '../events/BaseEvent';
import { UserCreatedEvent, UserEmailChangedEvent, UserDeactivatedEvent } from '../events/UserEvents';

export class User {
  private id: string;
  private email: string;
  private name: string;
  private isActive: boolean = true;
  private version: number = 0;
  private uncommittedEvents: BaseEvent[] = [];

  constructor(id?: string) {
    this.id = id || crypto.randomUUID();
  }

  // Factory method para criar novo usuário
  static create(email: string, name: string): User {
    const user = new User();
    const event = new UserCreatedEvent(user.id, user.version + 1, {
      email,
      name
    });
    
    user.apply(event);
    user.uncommittedEvents.push(event);
    
    return user;
  }

  // Factory method para reconstruir a partir de eventos
  static fromEvents(events: BaseEvent[]): User {
    const user = new User(events[0]?.aggregateId);
    
    events.forEach(event => {
      user.apply(event);
    });
    
    return user;
  }

  changeEmail(newEmail: string): void {
    if (!this.isActive) {
      throw new Error('Usuário inativo não pode alterar email');
    }

    if (this.email === newEmail) {
      return; // Nenhuma mudança
    }

    const event = new UserEmailChangedEvent(this.id, this.version + 1, {
      oldEmail: this.email,
      newEmail
    });
    
    this.apply(event);
    this.uncommittedEvents.push(event);
  }

  deactivate(reason: string): void {
    if (!this.isActive) {
      throw new Error('Usuário já está inativo');
    }

    const event = new UserDeactivatedEvent(this.id, this.version + 1, {
      reason
    });
    
    this.apply(event);
    this.uncommittedEvents.push(event);
  }

  private apply(event: BaseEvent): void {
    switch (event.type) {
      case 'UserCreated':
        this.email = event.data.email;
        this.name = event.data.name;
        break;
        
      case 'UserEmailChanged':
        this.email = event.data.newEmail;
        break;
        
      case 'UserDeactivated':
        this.isActive = false;
        break;
    }
    
    this.version = event.version;
  }

  getUncommittedEvents(): BaseEvent[] {
    return [...this.uncommittedEvents];
  }

  markEventsAsCommitted(): void {
    this.uncommittedEvents = [];
  }

  // Getters
  getId(): string { return this.id; }
  getEmail(): string { return this.email; }
  getName(): string { return this.name; }
  getIsActive(): boolean { return this.isActive; }
  getVersion(): number { return this.version; }
}

// repositories/EventStore.ts
import { PrismaClient } from '@prisma/client';
import { BaseEvent } from '../events/BaseEvent';

export interface EventStore {
  saveEvents(aggregateId: string, events: BaseEvent[], expectedVersion: number): Promise<void>;
  getEvents(aggregateId: string): Promise<BaseEvent[]>;
  getAllEvents(fromVersion?: number): Promise<BaseEvent[]>;
}

export class PrismaEventStore implements EventStore {
  constructor(private prisma: PrismaClient) {}

  async saveEvents(aggregateId: string, events: BaseEvent[], expectedVersion: number): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      // Verificar versão atual
      const currentVersion = await tx.event.findFirst({
        where: { aggregateId },
        orderBy: { version: 'desc' },
        select: { version: true }
      });

      if (currentVersion && currentVersion.version !== expectedVersion) {
        throw new Error('Conflito de concorrência detectado');
      }

      // Salvar eventos
      for (const event of events) {
        await tx.event.create({
          data: {
            id: event.id,
            aggregateId: event.aggregateId,
            version: event.version,
            type: event.type,
            data: JSON.stringify(event.data),
            timestamp: event.timestamp
          }
        });
      }
    });
  }

  async getEvents(aggregateId: string): Promise<BaseEvent[]> {
    const events = await this.prisma.event.findMany({
      where: { aggregateId },
      orderBy: { version: 'asc' }
    });

    return events.map(event => this.deserializeEvent(event));
  }

  async getAllEvents(fromVersion?: number): Promise<BaseEvent[]> {
    const events = await this.prisma.event.findMany({
      where: fromVersion ? {
        version: { gte: fromVersion }
      } : {},
      orderBy: [{ timestamp: 'asc' }, { version: 'asc' }]
    });

    return events.map(event => this.deserializeEvent(event));
  }

  private deserializeEvent(eventData: any): BaseEvent {
    const data = JSON.parse(eventData.data);
    
    // Factory para recriar eventos baseado no tipo
    switch (eventData.type) {
      case 'UserCreated':
        return new UserCreatedEvent(eventData.aggregateId, eventData.version, data);
      case 'UserEmailChanged':
        return new UserEmailChangedEvent(eventData.aggregateId, eventData.version, data);
      case 'UserDeactivated':
        return new UserDeactivatedEvent(eventData.aggregateId, eventData.version, data);
      default:
        throw new Error('Tipo de evento desconhecido: ' + eventData.type);
    }
  }
}

// services/UserService.ts
import { User } from '../aggregates/User';
import { EventStore } from '../repositories/EventStore';

export class UserService {
  constructor(private eventStore: EventStore) {}

  async createUser(email: string, name: string): Promise<string> {
    const user = User.create(email, name);
    const events = user.getUncommittedEvents();
    
    await this.eventStore.saveEvents(user.getId(), events, 0);
    user.markEventsAsCommitted();
    
    return user.getId();
  }

  async changeUserEmail(userId: string, newEmail: string): Promise<void> {
    const events = await this.eventStore.getEvents(userId);
    const user = User.fromEvents(events);
    
    user.changeEmail(newEmail);
    
    const uncommittedEvents = user.getUncommittedEvents();
    if (uncommittedEvents.length > 0) {
      await this.eventStore.saveEvents(userId, uncommittedEvents, user.getVersion() - uncommittedEvents.length);
      user.markEventsAsCommitted();
    }
  }

  async getUser(userId: string): Promise<User> {
    const events = await this.eventStore.getEvents(userId);
    if (events.length === 0) {
      throw new Error('Usuário não encontrado');
    }
    
    return User.fromEvents(events);
  }

  async getUserHistory(userId: string): Promise<BaseEvent[]> {
    return await this.eventStore.getEvents(userId);
  }
}`,
    language: 'typescript'
  }
];

const comparisonData = [
  {
    pattern: 'Repository',
    complexity: 'Baixa',
    testability: 'Alta',
    performance: 'Boa',
    scalability: 'Média',
    useCases: 'APIs simples, CRUD'
  },
  {
    pattern: 'Unit of Work',
    complexity: 'Média',
    testability: 'Alta',
    performance: 'Boa',
    scalability: 'Boa',
    useCases: 'Transações complexas'
  },
  {
    pattern: 'CQRS',
    complexity: 'Alta',
    testability: 'Alta',
    performance: 'Excelente',
    scalability: 'Excelente',
    useCases: 'Sistemas de alta escala'
  },
  {
    pattern: 'Event Sourcing',
    complexity: 'Muito Alta',
    testability: 'Média',
    performance: 'Variável',
    scalability: 'Excelente',
    useCases: 'Auditoria, sistemas financeiros'
  }
];

export default function DesignPatternsPage() {
  const [selectedExample, setSelectedExample] = useState(0);
  const [activeTab, setActiveTab] = useState('patterns');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  const filteredPatterns = selectedLevel === 'all' 
    ? designPatterns 
    : designPatterns.filter(pattern => pattern.level === selectedLevel);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs />
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6">
            <Layers className="w-8 h-8 text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Database Design Patterns
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore padrões arquiteturais para organizar e estruturar o acesso a dados de forma eficiente e maintível.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-lg p-1 shadow-sm border">
            {[
              { id: 'patterns', label: 'Padrões' },
              { id: 'examples', label: 'Exemplos' },
              { id: 'comparison', label: 'Comparação' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'patterns' && (
          <>
            {/* Level Filter */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex bg-white rounded-lg p-1 shadow-sm border">
                {['all', 'Básico', 'Intermediário', 'Avançado'].map((level) => (
                  <button
                    key={level}
                    onClick={() => setSelectedLevel(level)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      selectedLevel === level
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {level === 'all' ? 'Todos os Níveis' : level}
                  </button>
                ))}
              </div>
            </div>

            {/* Patterns Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1.5">
              {filteredPatterns.map((pattern, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-purple-50 rounded-lg">
                      {pattern.icon}
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      pattern.level === 'Básico' ? 'bg-green-100 text-green-700' :
                      pattern.level === 'Intermediário' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {pattern.level}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {pattern.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4">
                    {pattern.description}
                  </p>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Benefícios:</h4>
                    <div className="flex flex-wrap gap-1">
                      {pattern.benefits.map((benefit, benefitIndex) => (
                        <span key={benefitIndex} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Casos de Uso:</h4>
                    <ul className="space-y-1">
                      {pattern.useCases.map((useCase, useCaseIndex) => (
                        <li key={useCaseIndex} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                          {useCase}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'examples' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Implementações Práticas</h2>
              <p className="text-gray-600">Veja como implementar cada padrão na prática</p>
            </div>
            
            <div className="flex border-b border-gray-100 overflow-x-auto">
              {codeExamples.map((example, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedExample(index)}
                  className={`flex-shrink-0 p-4 text-left transition-colors min-w-[200px] ${
                    selectedExample === index
                      ? 'bg-purple-50 border-b-2 border-purple-600 text-purple-700'
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
                  <pre className="text-green-400 text-sm">
                    <code>{codeExamples[selectedExample].code}</code>
                  </pre>
                </div>
              </DemoCardStatic>
            </div>
          </div>
        )}

        {activeTab === 'comparison' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Comparação de Padrões</h2>
              <p className="text-gray-600">Compare características e adequação de cada padrão</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Padrão</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Complexidade</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Testabilidade</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Escalabilidade</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Melhor Para</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {comparisonData.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.pattern}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          item.complexity === 'Baixa' ? 'bg-green-100 text-green-700' :
                          item.complexity === 'Média' ? 'bg-yellow-100 text-yellow-700' :
                          item.complexity === 'Alta' ? 'bg-orange-100 text-orange-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {item.complexity}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          item.testability === 'Alta' ? 'bg-green-100 text-green-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {item.testability}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          item.performance === 'Excelente' ? 'bg-green-100 text-green-700' :
                          item.performance === 'Boa' ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {item.performance}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          item.scalability === 'Excelente' ? 'bg-green-100 text-green-700' :
                          item.scalability === 'Boa' ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {item.scalability}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {item.useCases}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Getting Started */}
        <div className="mt-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Escolha o Padrão Ideal</h2>
            <p className="text-purple-100 mb-6">
              Cada padrão tem suas vantagens. Comece com Repository para projetos simples e evolua conforme a complexidade aumenta.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-lg p-4 text-left">
                <h3 className="font-semibold mb-2">🚀 Para Começar</h3>
                <p className="text-sm text-purple-100">Repository Pattern + Unit of Work</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4 text-left">
                <h3 className="font-semibold mb-2">⚡ Para Escalar</h3>
                <p className="text-sm text-purple-100">CQRS + Event Sourcing</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}