'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Layers, 
  Database, 
  Code, 
  GitBranch,
  Users,
  Settings,
  Zap,
  Target,
  CheckCircle,
  ArrowRight,
  Box,
  Workflow,
  AlertTriangle
} from 'lucide-react';
import { DemoCardStatic } from '@/components/DemoCardStatic';
import { DemoSection } from '@/components/DemoSection';
import Breadcrumbs from '@/components/Breadcrumbs';

const designPatterns = [
  {
    title: 'Repository Pattern',
    description: 'Abstração da camada de acesso a dados',
    icon: Database,
    color: 'text-blue-500',
    benefits: ['Testabilidade', 'Flexibilidade', 'Manutenibilidade', 'Abstração']
  },
  {
    title: 'Active Record',
    description: 'Objetos que encapsulam dados e comportamento',
    icon: Box,
    color: 'text-green-500',
    benefits: ['Simplicidade', 'Rapidez', 'Convenção', 'Produtividade']
  },
  {
    title: 'Data Mapper',
    description: 'Separação entre modelo de domínio e banco',
    icon: GitBranch,
    color: 'text-purple-500',
    benefits: ['Separação', 'Flexibilidade', 'Testabilidade', 'Domain Focus']
  },
  {
    title: 'Unit of Work',
    description: 'Gerenciamento de transações e mudanças',
    icon: Workflow,
    color: 'text-orange-500',
    benefits: ['Consistência', 'Performance', 'Transações', 'Batch Operations']
  }
];

const patternExamples = [
  {
    name: 'Repository Pattern',
    description: 'Implementação do padrão Repository com TypeScript',
    type: 'Data Access',
    pros: ['Testabilidade', 'Flexibilidade', 'Abstração', 'Mocking'],
    cons: ['Complexidade', 'Over-engineering', 'Boilerplate'],
    example: `// interfaces/IUserRepository.ts
export interface IUser {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserRepository {
  findById(id: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  findAll(options?: FindOptions): Promise<IUser[]>;
  create(userData: CreateUserData): Promise<IUser>;
  update(id: string, userData: UpdateUserData): Promise<IUser>;
  delete(id: string): Promise<void>;
  count(filters?: UserFilters): Promise<number>;
}

export interface FindOptions {
  limit?: number;
  offset?: number;
  orderBy?: string;
  orderDirection?: 'ASC' | 'DESC';
}

export interface CreateUserData {
  email: string;
  name: string;
  password: string;
}

export interface UpdateUserData {
  email?: string;
  name?: string;
  password?: string;
}

export interface UserFilters {
  email?: string;
  name?: string;
  createdAfter?: Date;
  createdBefore?: Date;
}

// repositories/PrismaUserRepository.ts
import { PrismaClient } from '@prisma/client';
import { IUserRepository, IUser, CreateUserData, UpdateUserData, FindOptions, UserFilters } from '../interfaces/IUserRepository';

export class PrismaUserRepository implements IUserRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise<IUser | null> {
    return await this.prisma.user.findUnique({
      where: { id }
    });
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await this.prisma.user.findUnique({
      where: { email }
    });
  }

  async findAll(options: FindOptions = {}): Promise<IUser[]> {
    const { limit = 10, offset = 0, orderBy = 'createdAt', orderDirection = 'DESC' } = options;
    
    return await this.prisma.user.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        [orderBy]: orderDirection.toLowerCase()
      }
    });
  }

  async create(userData: CreateUserData): Promise<IUser> {
    return await this.prisma.user.create({
      data: {
        email: userData.email,
        name: userData.name,
        passwordHash: await this.hashPassword(userData.password)
      }
    });
  }

  async update(id: string, userData: UpdateUserData): Promise<IUser> {
    const updateData: any = { ...userData };
    
    if (userData.password) {
      updateData.passwordHash = await this.hashPassword(userData.password);
      delete updateData.password;
    }
    
    return await this.prisma.user.update({
      where: { id },
      data: updateData
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id }
    });
  }

  async count(filters: UserFilters = {}): Promise<number> {
    const where: any = {};
    
    if (filters.email) {
      where.email = { contains: filters.email, mode: 'insensitive' };
    }
    
    if (filters.name) {
      where.name = { contains: filters.name, mode: 'insensitive' };
    }
    
    if (filters.createdAfter || filters.createdBefore) {
      where.createdAt = {};
      if (filters.createdAfter) where.createdAt.gte = filters.createdAfter;
      if (filters.createdBefore) where.createdAt.lte = filters.createdBefore;
    }
    
    return await this.prisma.user.count({ where });
  }

  private async hashPassword(password: string): Promise<string> {
    // Implementação de hash de senha
    const bcrypt = await import('bcrypt');
    return bcrypt.hash(password, 12);
  }
}

// services/UserService.ts
import { IUserRepository, IUser, CreateUserData, UpdateUserData } from '../interfaces/IUserRepository';

export class UserService {
  constructor(private userRepository: IUserRepository) {}

  async createUser(userData: CreateUserData): Promise<IUser> {
    // Validações de negócio
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('Email already exists');
    }

    if (userData.password.length < 8) {
      throw new Error('Password must be at least 8 characters');
    }

    return await this.userRepository.create(userData);
  }

  async getUserById(id: string): Promise<IUser> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async updateUser(id: string, userData: UpdateUserData): Promise<IUser> {
    // Verificar se usuário existe
    await this.getUserById(id);
    
    // Verificar email único se está sendo alterado
    if (userData.email) {
      const existingUser = await this.userRepository.findByEmail(userData.email);
      if (existingUser && existingUser.id !== id) {
        throw new Error('Email already exists');
      }
    }

    return await this.userRepository.update(id, userData);
  }

  async deleteUser(id: string): Promise<void> {
    // Verificar se usuário existe
    await this.getUserById(id);
    
    await this.userRepository.delete(id);
  }

  async getUsers(page: number = 1, limit: number = 10): Promise<{ users: IUser[], total: number }> {
    const offset = (page - 1) * limit;
    
    const [users, total] = await Promise.all([
      this.userRepository.findAll({ limit, offset }),
      this.userRepository.count()
    ]);
    
    return { users, total };
  }
}

// Uso em um controller
// controllers/UserController.ts
import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
  constructor(private userService: UserService) {}

  async createUser(req: Request, res: Response) {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getUser(req: Request, res: Response) {
    try {
      const user = await this.userService.getUserById(req.params.id);
      res.json(user);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      
      const result = await this.userService.getUsers(page, limit);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}`
  },
  {
    name: 'Active Record',
    description: 'Implementação do padrão Active Record',
    type: 'ORM Pattern',
    pros: ['Simplicidade', 'Rapidez de desenvolvimento', 'Convenção sobre configuração'],
    cons: ['Acoplamento', 'Dificuldade de teste', 'Violação SRP'],
    example: `// models/User.ts - Active Record Pattern
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export class User {
  public id?: string;
  public email: string;
  public name: string;
  public passwordHash?: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(data: Partial<User>) {
    Object.assign(this, data);
  }

  // Métodos de instância
  async save(): Promise<User> {
    if (this.id) {
      // Update
      const updated = await prisma.user.update({
        where: { id: this.id },
        data: {
          email: this.email,
          name: this.name,
          passwordHash: this.passwordHash
        }
      });
      Object.assign(this, updated);
    } else {
      // Create
      const created = await prisma.user.create({
        data: {
          email: this.email,
          name: this.name,
          passwordHash: this.passwordHash!
        }
      });
      Object.assign(this, created);
    }
    return this;
  }

  async delete(): Promise<void> {
    if (!this.id) {
      throw new Error('Cannot delete user without ID');
    }
    
    await prisma.user.delete({
      where: { id: this.id }
    });
  }

  async setPassword(password: string): Promise<void> {
    this.passwordHash = await bcrypt.hash(password, 12);
  }

  async checkPassword(password: string): Promise<boolean> {
    if (!this.passwordHash) return false;
    return bcrypt.compare(password, this.passwordHash);
  }

  // Métodos estáticos (class methods)
  static async findById(id: string): Promise<User | null> {
    const userData = await prisma.user.findUnique({
      where: { id }
    });
    
    return userData ? new User(userData) : null;
  }

  static async findByEmail(email: string): Promise<User | null> {
    const userData = await prisma.user.findUnique({
      where: { email }
    });
    
    return userData ? new User(userData) : null;
  }

  static async findAll(options: {
    limit?: number;
    offset?: number;
    orderBy?: string;
  } = {}): Promise<User[]> {
    const { limit = 10, offset = 0, orderBy = 'createdAt' } = options;
    
    const users = await prisma.user.findMany({
      take: limit,
      skip: offset,
      orderBy: { [orderBy]: 'desc' }
    });
    
    return users.map(userData => new User(userData));
  }

  static async create(data: {
    email: string;
    name: string;
    password: string;
  }): Promise<User> {
    const user = new User({
      email: data.email,
      name: data.name
    });
    
    await user.setPassword(data.password);
    return await user.save();
  }

  static async count(): Promise<number> {
    return await prisma.user.count();
  }

  // Validações
  validate(): string[] {
    const errors: string[] = [];
    
    if (!this.email || !this.email.includes('@')) {
      errors.push('Valid email is required');
    }
    
    if (!this.name || this.name.length < 2) {
      errors.push('Name must be at least 2 characters');
    }
    
    return errors;
  }

  isValid(): boolean {
    return this.validate().length === 0;
  }

  // Relacionamentos
  async getPosts(): Promise<any[]> {
    if (!this.id) return [];
    
    return await prisma.post.findMany({
      where: { authorId: this.id },
      orderBy: { createdAt: 'desc' }
    });
  }

  async getPostCount(): Promise<number> {
    if (!this.id) return 0;
    
    return await prisma.post.count({
      where: { authorId: this.id }
    });
  }

  // Serialização
  toJSON(): Partial<User> {
    const { passwordHash, ...publicData } = this;
    return publicData;
  }

  toPublic(): Partial<User> {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      createdAt: this.createdAt
    };
  }
}

// Uso do Active Record
// routes/users.ts
import { Router, Request, Response } from 'express';
import { User } from '../models/User';

const router = Router();

// Criar usuário
router.post('/', async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user.toPublic());
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Buscar usuário
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user.toPublic());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Atualizar usuário
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    Object.assign(user, req.body);
    
    if (!user.isValid()) {
      return res.status(400).json({ errors: user.validate() });
    }
    
    await user.save();
    res.json(user.toPublic());
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Deletar usuário
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    await user.delete();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;`
  },
  {
    name: 'Data Mapper',
    description: 'Separação entre modelo de domínio e persistência',
    type: 'Domain Pattern',
    pros: ['Separação de responsabilidades', 'Testabilidade', 'Flexibilidade'],
    cons: ['Complexidade', 'Mais código', 'Curva de aprendizado'],
    example: `// domain/User.ts - Modelo de domínio puro
export class User {
  private constructor(
    private readonly _id: string,
    private _email: string,
    private _name: string,
    private _passwordHash: string,
    private readonly _createdAt: Date,
    private _updatedAt: Date
  ) {}

  // Factory method
  static create(data: {
    email: string;
    name: string;
    passwordHash: string;
  }): User {
    const now = new Date();
    const id = crypto.randomUUID();
    
    const user = new User(
      id,
      data.email,
      data.name,
      data.passwordHash,
      now,
      now
    );
    
    user.validate();
    return user;
  }

  // Factory method para reconstruir do banco
  static fromPersistence(data: {
    id: string;
    email: string;
    name: string;
    passwordHash: string;
    createdAt: Date;
    updatedAt: Date;
  }): User {
    return new User(
      data.id,
      data.email,
      data.name,
      data.passwordHash,
      data.createdAt,
      data.updatedAt
    );
  }

  // Getters
  get id(): string { return this._id; }
  get email(): string { return this._email; }
  get name(): string { return this._name; }
  get passwordHash(): string { return this._passwordHash; }
  get createdAt(): Date { return this._createdAt; }
  get updatedAt(): Date { return this._updatedAt; }

  // Métodos de negócio
  changeEmail(newEmail: string): void {
    if (!this.isValidEmail(newEmail)) {
      throw new Error('Invalid email format');
    }
    
    this._email = newEmail;
    this._updatedAt = new Date();
  }

  changeName(newName: string): void {
    if (!newName || newName.trim().length < 2) {
      throw new Error('Name must be at least 2 characters');
    }
    
    this._name = newName.trim();
    this._updatedAt = new Date();
  }

  changePassword(newPasswordHash: string): void {
    if (!newPasswordHash) {
      throw new Error('Password hash is required');
    }
    
    this._passwordHash = newPasswordHash;
    this._updatedAt = new Date();
  }

  // Validações
  private validate(): void {
    if (!this.isValidEmail(this._email)) {
      throw new Error('Invalid email format');
    }
    
    if (!this._name || this._name.trim().length < 2) {
      throw new Error('Name must be at least 2 characters');
    }
    
    if (!this._passwordHash) {
      throw new Error('Password hash is required');
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Serialização para persistência
  toPersistence(): {
    id: string;
    email: string;
    name: string;
    passwordHash: string;
    createdAt: Date;
    updatedAt: Date;
  } {
    return {
      id: this._id,
      email: this._email,
      name: this._name,
      passwordHash: this._passwordHash,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt
    };
  }

  // Serialização para API
  toPublic(): {
    id: string;
    email: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  } {
    return {
      id: this._id,
      email: this._email,
      name: this._name,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt
    };
  }
}

// mappers/UserMapper.ts - Data Mapper
import { PrismaClient } from '@prisma/client';
import { User } from '../domain/User';

export interface IUserMapper {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<void>;
  delete(id: string): Promise<void>;
}

export class PrismaUserMapper implements IUserMapper {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise<User | null> {
    const userData = await this.prisma.user.findUnique({
      where: { id }
    });

    if (!userData) return null;

    return User.fromPersistence({
      id: userData.id,
      email: userData.email,
      name: userData.name,
      passwordHash: userData.passwordHash,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const userData = await this.prisma.user.findUnique({
      where: { email }
    });

    if (!userData) return null;

    return User.fromPersistence({
      id: userData.id,
      email: userData.email,
      name: userData.name,
      passwordHash: userData.passwordHash,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt
    });
  }

  async save(user: User): Promise<void> {
    const data = user.toPersistence();

    await this.prisma.user.upsert({
      where: { id: data.id },
      update: {
        email: data.email,
        name: data.name,
        passwordHash: data.passwordHash,
        updatedAt: data.updatedAt
      },
      create: data
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id }
    });
  }
}

// services/UserService.ts - Serviço de aplicação
import { User } from '../domain/User';
import { IUserMapper } from '../mappers/UserMapper';
import bcrypt from 'bcrypt';

export class UserService {
  constructor(private userMapper: IUserMapper) {}

  async createUser(data: {
    email: string;
    name: string;
    password: string;
  }): Promise<User> {
    // Verificar se email já existe
    const existingUser = await this.userMapper.findByEmail(data.email);
    if (existingUser) {
      throw new Error('Email already exists');
    }

    // Hash da senha
    const passwordHash = await bcrypt.hash(data.password, 12);

    // Criar usuário
    const user = User.create({
      email: data.email,
      name: data.name,
      passwordHash
    });

    // Persistir
    await this.userMapper.save(user);

    return user;
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userMapper.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async updateUser(id: string, data: {
    email?: string;
    name?: string;
    password?: string;
  }): Promise<User> {
    const user = await this.getUserById(id);

    if (data.email) {
      // Verificar se novo email já existe
      const existingUser = await this.userMapper.findByEmail(data.email);
      if (existingUser && existingUser.id !== id) {
        throw new Error('Email already exists');
      }
      user.changeEmail(data.email);
    }

    if (data.name) {
      user.changeName(data.name);
    }

    if (data.password) {
      const passwordHash = await bcrypt.hash(data.password, 12);
      user.changePassword(passwordHash);
    }

    await this.userMapper.save(user);
    return user;
  }

  async deleteUser(id: string): Promise<void> {
    // Verificar se usuário existe
    await this.getUserById(id);
    
    await this.userMapper.delete(id);
  }
}`
  },
  {
    name: 'Unit of Work',
    description: 'Gerenciamento de transações e mudanças',
    type: 'Transaction Pattern',
    pros: ['Consistência', 'Performance', 'Transações', 'Batch Operations'],
    cons: ['Complexidade', 'Memória', 'Debugging'],
    example: `// patterns/UnitOfWork.ts
import { PrismaClient } from '@prisma/client';

export interface IEntity {
  id: string;
}

export interface IRepository<T extends IEntity> {
  add(entity: T): void;
  update(entity: T): void;
  remove(id: string): void;
  findById(id: string): Promise<T | null>;
}

export class UnitOfWork {
  private newEntities: Map<string, IEntity[]> = new Map();
  private dirtyEntities: Map<string, IEntity[]> = new Map();
  private removedEntities: Map<string, string[]> = new Map();
  private repositories: Map<string, IRepository<any>> = new Map();

  constructor(private prisma: PrismaClient) {}

  registerRepository<T extends IEntity>(name: string, repository: IRepository<T>): void {
    this.repositories.set(name, repository);
  }

  registerNew<T extends IEntity>(entityType: string, entity: T): void {
    if (!this.newEntities.has(entityType)) {
      this.newEntities.set(entityType, []);
    }
    this.newEntities.get(entityType)!.push(entity);
  }

  registerDirty<T extends IEntity>(entityType: string, entity: T): void {
    if (!this.dirtyEntities.has(entityType)) {
      this.dirtyEntities.set(entityType, []);
    }
    
    const dirtyList = this.dirtyEntities.get(entityType)!;
    const existingIndex = dirtyList.findIndex(e => e.id === entity.id);
    
    if (existingIndex >= 0) {
      dirtyList[existingIndex] = entity;
    } else {
      dirtyList.push(entity);
    }
  }

  registerRemoved(entityType: string, id: string): void {
    if (!this.removedEntities.has(entityType)) {
      this.removedEntities.set(entityType, []);
    }
    this.removedEntities.get(entityType)!.push(id);
  }

  async commit(): Promise<void> {
    return await this.prisma.$transaction(async (tx) => {
      // Processar remoções primeiro
      for (const [entityType, ids] of this.removedEntities) {
        for (const id of ids) {
          await this.deleteEntity(tx, entityType, id);
        }
      }

      // Processar inserções
      for (const [entityType, entities] of this.newEntities) {
        for (const entity of entities) {
          await this.insertEntity(tx, entityType, entity);
        }
      }

      // Processar atualizações
      for (const [entityType, entities] of this.dirtyEntities) {
        for (const entity of entities) {
          await this.updateEntity(tx, entityType, entity);
        }
      }

      // Limpar registros após commit
      this.clear();
    });
  }

  rollback(): void {
    this.clear();
  }

  private clear(): void {
    this.newEntities.clear();
    this.dirtyEntities.clear();
    this.removedEntities.clear();
  }

  private async insertEntity(tx: any, entityType: string, entity: IEntity): Promise<void> {
    switch (entityType) {
      case 'User':
        await tx.user.create({ data: entity });
        break;
      case 'Post':
        await tx.post.create({ data: entity });
        break;
      case 'Comment':
        await tx.comment.create({ data: entity });
        break;
      default:
        throw new Error(\`Unknown entity type: \${entityType}\`);
    }
  }

  private async updateEntity(tx: any, entityType: string, entity: IEntity): Promise<void> {
    switch (entityType) {
      case 'User':
        await tx.user.update({ where: { id: entity.id }, data: entity });
        break;
      case 'Post':
        await tx.post.update({ where: { id: entity.id }, data: entity });
        break;
      case 'Comment':
        await tx.comment.update({ where: { id: entity.id }, data: entity });
        break;
      default:
        throw new Error(\`Unknown entity type: \${entityType}\`);
    }
  }

  private async deleteEntity(tx: any, entityType: string, id: string): Promise<void> {
    switch (entityType) {
      case 'User':
        await tx.user.delete({ where: { id } });
        break;
      case 'Post':
        await tx.post.delete({ where: { id } });
        break;
      case 'Comment':
        await tx.comment.delete({ where: { id } });
        break;
      default:
        throw new Error(\`Unknown entity type: \${entityType}\`);
    }
  }
}

// repositories/UserRepository.ts
import { User } from '../domain/User';
import { IRepository } from '../patterns/UnitOfWork';
import { UnitOfWork } from '../patterns/UnitOfWork';

export class UserRepository implements IRepository<User> {
  constructor(
    private prisma: PrismaClient,
    private unitOfWork: UnitOfWork
  ) {}

  add(user: User): void {
    this.unitOfWork.registerNew('User', user);
  }

  update(user: User): void {
    this.unitOfWork.registerDirty('User', user);
  }

  remove(id: string): void {
    this.unitOfWork.registerRemoved('User', id);
  }

  async findById(id: string): Promise<User | null> {
    const userData = await this.prisma.user.findUnique({
      where: { id }
    });

    return userData ? User.fromPersistence(userData) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const userData = await this.prisma.user.findUnique({
      where: { email }
    });

    return userData ? User.fromPersistence(userData) : null;
  }
}

// services/BlogService.ts - Exemplo de uso
import { UnitOfWork } from '../patterns/UnitOfWork';
import { UserRepository } from '../repositories/UserRepository';
import { PostRepository } from '../repositories/PostRepository';
import { User } from '../domain/User';
import { Post } from '../domain/Post';

export class BlogService {
  constructor(
    private unitOfWork: UnitOfWork,
    private userRepository: UserRepository,
    private postRepository: PostRepository
  ) {}

  async createUserWithWelcomePost(userData: {
    email: string;
    name: string;
    password: string;
  }): Promise<{ user: User; post: Post }> {
    try {
      // Criar usuário
      const user = User.create({
        email: userData.email,
        name: userData.name,
        passwordHash: await this.hashPassword(userData.password)
      });

      // Criar post de boas-vindas
      const welcomePost = Post.create({
        title: \`Bem-vindo, \${userData.name}!\`,
        content: 'Este é seu primeiro post. Bem-vindo à nossa plataforma!',
        authorId: user.id
      });

      // Registrar no Unit of Work
      this.userRepository.add(user);
      this.postRepository.add(welcomePost);

      // Commit da transação
      await this.unitOfWork.commit();

      return { user, post: welcomePost };
    } catch (error) {
      // Rollback em caso de erro
      this.unitOfWork.rollback();
      throw error;
    }
  }

  async transferPostsToUser(fromUserId: string, toUserId: string): Promise<void> {
    try {
      // Buscar usuários
      const fromUser = await this.userRepository.findById(fromUserId);
      const toUser = await this.userRepository.findById(toUserId);

      if (!fromUser || !toUser) {
        throw new Error('User not found');
      }

      // Buscar posts do usuário origem
      const posts = await this.postRepository.findByAuthorId(fromUserId);

      // Transferir posts
      for (const post of posts) {
        post.changeAuthor(toUserId);
        this.postRepository.update(post);
      }

      // Commit da transação
      await this.unitOfWork.commit();
    } catch (error) {
      this.unitOfWork.rollback();
      throw error;
    }
  }

  private async hashPassword(password: string): Promise<string> {
    const bcrypt = await import('bcrypt');
    return bcrypt.hash(password, 12);
  }
}`
  }
];

const architecturalPatterns = [
  {
    title: 'CQRS (Command Query Responsibility Segregation)',
    description: 'Separação entre comandos e consultas',
    benefits: ['Escalabilidade', 'Performance', 'Flexibilidade', 'Otimização'],
    example: `// CQRS Pattern Implementation

// Commands (Write Side)
export interface CreateUserCommand {
  email: string;
  name: string;
  password: string;
}

export interface UpdateUserCommand {
  id: string;
  email?: string;
  name?: string;
}

// Command Handlers
export class UserCommandHandler {
  constructor(private userRepository: IUserRepository) {}

  async handle(command: CreateUserCommand): Promise<string> {
    const user = await this.userRepository.create(command);
    return user.id;
  }

  async handleUpdate(command: UpdateUserCommand): Promise<void> {
    await this.userRepository.update(command.id, command);
  }
}

// Queries (Read Side)
export interface UserListQuery {
  page: number;
  limit: number;
  search?: string;
}

export interface UserDetailQuery {
  id: string;
}

// Query Handlers
export class UserQueryHandler {
  constructor(private userReadRepository: IUserReadRepository) {}

  async handle(query: UserListQuery): Promise<UserListResult> {
    return await this.userReadRepository.findMany(query);
  }

  async handleDetail(query: UserDetailQuery): Promise<UserDetail> {
    return await this.userReadRepository.findDetail(query.id);
  }
}`
  },
  {
    title: 'Event Sourcing',
    description: 'Armazenamento de eventos ao invés de estado',
    benefits: ['Auditoria', 'Replay', 'Debugging', 'Temporal Queries'],
    example: `// Event Sourcing Pattern

// Events
export interface UserCreatedEvent {
  type: 'UserCreated';
  aggregateId: string;
  data: {
    email: string;
    name: string;
    passwordHash: string;
  };
  timestamp: Date;
  version: number;
}

export interface UserEmailChangedEvent {
  type: 'UserEmailChanged';
  aggregateId: string;
  data: {
    oldEmail: string;
    newEmail: string;
  };
  timestamp: Date;
  version: number;
}

// Event Store
export class EventStore {
  async saveEvents(aggregateId: string, events: DomainEvent[], expectedVersion: number): Promise<void> {
    // Implementação de salvamento de eventos
  }

  async getEvents(aggregateId: string): Promise<DomainEvent[]> {
    // Implementação de recuperação de eventos
  }
}

// Aggregate Root
export class UserAggregate {
  private events: DomainEvent[] = [];
  
  static fromHistory(events: DomainEvent[]): UserAggregate {
    const user = new UserAggregate();
    events.forEach(event => user.apply(event));
    return user;
  }

  private apply(event: DomainEvent): void {
    switch (event.type) {
      case 'UserCreated':
        this.applyUserCreated(event as UserCreatedEvent);
        break;
      case 'UserEmailChanged':
        this.applyUserEmailChanged(event as UserEmailChangedEvent);
        break;
    }
  }
}`
  }
];

export default function DatabasePatternsPage() {
  const [selectedPattern, setSelectedPattern] = useState(0);
  const [selectedArchPattern, setSelectedArchPattern] = useState(0);
  const [showComparison, setShowComparison] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-blue-100 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs />
        
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl mb-6">
            <Layers className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Padrões de Banco de Dados
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Padrões de design e arquitetura para organizar e estruturar o acesso a dados
          </p>
        </motion.div>

        {/* Design Patterns Overview */}
        <DemoSection title="Padrões de Design" description="Padrões fundamentais para acesso a dados">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-1.5 mb-8">
            {designPatterns.map((pattern, index) => {
              const Icon = pattern.icon;
              return (
                <motion.div
                  key={pattern.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <DemoCardStatic title={pattern.title} description={pattern.description}>
                    <div className="space-y-4">
                      <Icon className={`h-12 w-12 mx-auto ${pattern.color}`} />
                      <div className="space-y-2">
                        {pattern.benefits.map((benefit) => (
                          <div key={benefit} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
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

        {/* Pattern Examples */}
        <DemoSection title="Implementações" description="Exemplos práticos dos padrões de design">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8 px-6 overflow-x-auto">
                {patternExamples.map((pattern, index) => (
                  <button
                    key={pattern.name}
                    onClick={() => setSelectedPattern(index)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                      selectedPattern === index
                        ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    {pattern.name}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {patternExamples[selectedPattern].name}
                  </h3>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                    {patternExamples[selectedPattern].type}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {patternExamples[selectedPattern].description}
                </p>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Vantagens:</h4>
                    <div className="space-y-1">
                      {patternExamples[selectedPattern].pros.map((pro) => (
                        <div key={pro} className="flex items-center text-sm text-green-700 dark:text-green-400">
                          <CheckCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                          {pro}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Desvantagens:</h4>
                    <div className="space-y-1">
                      {patternExamples[selectedPattern].cons.map((con) => (
                        <div key={con} className="flex items-center text-sm text-red-700 dark:text-red-400">
                          <AlertTriangle className="h-4 w-4 mr-2 flex-shrink-0" />
                          {con}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-green-400 text-sm">
                  <code>{patternExamples[selectedPattern].example}</code>
                </pre>
              </div>
            </div>
          </div>
        </DemoSection>

        {/* Architectural Patterns */}
        <DemoSection title="Padrões Arquiteturais" description="Padrões avançados para arquiteturas complexas">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8 px-6 overflow-x-auto">
                {architecturalPatterns.map((pattern, index) => (
                  <button
                    key={pattern.title}
                    onClick={() => setSelectedArchPattern(index)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                      selectedArchPattern === index
                        ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    {pattern.title}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {architecturalPatterns[selectedArchPattern].title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {architecturalPatterns[selectedArchPattern].description}
                </p>
                
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Benefícios:</h4>
                  <div className="flex flex-wrap gap-2">
                    {architecturalPatterns[selectedArchPattern].benefits.map((benefit) => (
                      <span key={benefit} className="px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-full text-sm">
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-blue-400 text-sm">
                  <code>{architecturalPatterns[selectedArchPattern].example}</code>
                </pre>
              </div>
            </div>
          </div>
        </DemoSection>

        {/* Pattern Comparison */}
        <DemoSection title="Comparação de Padrões" description="Quando usar cada padrão">
          <DemoCardStatic title="Guia de Seleção" description="Escolha o padrão adequado para seu contexto">
            <div className="space-y-4">
              <button
                onClick={() => setShowComparison(!showComparison)}
                className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Target className="h-5 w-5 mr-2" />
                {showComparison ? 'Ocultar' : 'Mostrar'} Comparação
              </button>
              
              {showComparison && (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">Projetos Simples:</h4>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <ArrowRight className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-gray-700 dark:text-gray-300">Active Record para prototipagem rápida</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <ArrowRight className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-gray-700 dark:text-gray-300">Repository para testabilidade</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">Projetos Complexos:</h4>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <ArrowRight className="h-4 w-4 text-blue-500 mr-2" />
                          <span className="text-gray-700 dark:text-gray-300">Data Mapper para domínios ricos</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <ArrowRight className="h-4 w-4 text-blue-500 mr-2" />
                          <span className="text-gray-700 dark:text-gray-300">Unit of Work para transações complexas</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <ArrowRight className="h-4 w-4 text-blue-500 mr-2" />
                          <span className="text-gray-700 dark:text-gray-300">CQRS para alta escalabilidade</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </DemoCardStatic>
        </DemoSection>

        {/* Best Practices */}
        <DemoSection title="Melhores Práticas" description="Diretrizes para implementação de padrões">
          <div className="grid md:grid-cols-3 gap-1.5">
            <DemoCardStatic title="🏗️ Arquitetura" description="Práticas arquiteturais">
              <div className="space-y-3">
                {[
                  'Mantenha separação de responsabilidades',
                  'Use interfaces para abstração',
                  'Implemente injeção de dependência',
                  'Evite acoplamento forte',
                  'Considere testabilidade',
                  'Documente decisões arquiteturais'
                ].map((practice, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{practice}</span>
                  </div>
                ))}
              </div>
            </DemoCardStatic>

            <DemoCardStatic title="⚡ Performance" description="Práticas de performance">
              <div className="space-y-3">
                {[
                  'Use lazy loading quando apropriado',
                  'Implemente cache estratégico',
                  'Otimize queries N+1',
                  'Use connection pooling',
                  'Monitore performance',
                  'Profile consultas lentas'
                ].map((practice, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{practice}</span>
                  </div>
                ))}
              </div>
            </DemoCardStatic>

            <DemoCardStatic title="🧪 Testes" description="Práticas de teste">
              <div className="space-y-3">
                {[
                  'Use mocks para isolamento',
                  'Teste comportamentos, não implementação',
                  'Implemente testes de integração',
                  'Use bancos de teste separados',
                  'Teste cenários de erro',
                  'Mantenha testes rápidos'
                ].map((practice, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{practice}</span>
                  </div>
                ))}
              </div>
            </DemoCardStatic>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}