'use client';

import { useState, useEffect } from 'react';
import CodeBlock from '@/components/CodeBlock';
import DemoSection from '@/components/DemoSection';

// Padrão Singleton
class Logger {
  private static instance: Logger;
  private logs: string[] = [];

  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  log(message: string): void {
    const timestamp = new Date().toISOString();
    this.logs.push(`[${timestamp}] ${message}`);
  }

  getLogs(): string[] {
    return [...this.logs];
  }

  clearLogs(): void {
    this.logs = [];
  }
}

// Padrão Factory
interface Animal {
  name: string;
  sound: string;
  makeSound(): string;
}

class Dog implements Animal {
  constructor(public name: string) {}
  sound = 'Au au!';
  makeSound(): string {
    return `${this.name} faz: ${this.sound}`;
  }
}

class Cat implements Animal {
  constructor(public name: string) {}
  sound = 'Miau!';
  makeSound(): string {
    return `${this.name} faz: ${this.sound}`;
  }
}

class Bird implements Animal {
  constructor(public name: string) {}
  sound = 'Piu piu!';
  makeSound(): string {
    return `${this.name} faz: ${this.sound}`;
  }
}

type AnimalType = 'dog' | 'cat' | 'bird';

class AnimalFactory {
  static createAnimal(type: AnimalType, name: string): Animal {
    switch (type) {
      case 'dog':
        return new Dog(name);
      case 'cat':
        return new Cat(name);
      case 'bird':
        return new Bird(name);
      default:
        throw new Error(`Tipo de animal não suportado: ${type}`);
    }
  }
}

// Padrão Observer
interface Observer<T> {
  update(data: T): void;
}

class Subject<T> {
  private observers: Observer<T>[] = [];

  subscribe(observer: Observer<T>): void {
    this.observers.push(observer);
  }

  unsubscribe(observer: Observer<T>): void {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  notify(data: T): void {
    this.observers.forEach(observer => observer.update(data));
  }
}

interface NewsData {
  title: string;
  content: string;
  timestamp: Date;
}

class NewsPublisher extends Subject<NewsData> {
  publishNews(title: string, content: string): void {
    const newsData: NewsData = {
      title,
      content,
      timestamp: new Date()
    };
    this.notify(newsData);
  }
}

class NewsSubscriber implements Observer<NewsData> {
  constructor(private name: string, private onUpdate: (name: string, news: NewsData) => void) {}

  update(data: NewsData): void {
    this.onUpdate(this.name, data);
  }
}

// Padrão Strategy
interface PaymentStrategy {
  pay(amount: number): string;
}

class CreditCardPayment implements PaymentStrategy {
  constructor(private cardNumber: string) {}

  pay(amount: number): string {
    return `Pagamento de R$ ${amount.toFixed(2)} processado via cartão de crédito ****${this.cardNumber.slice(-4)}`;
  }
}

class PayPalPayment implements PaymentStrategy {
  constructor(private email: string) {}

  pay(amount: number): string {
    return `Pagamento de R$ ${amount.toFixed(2)} processado via PayPal (${this.email})`;
  }
}

class PixPayment implements PaymentStrategy {
  constructor(private pixKey: string) {}

  pay(amount: number): string {
    return `Pagamento de R$ ${amount.toFixed(2)} processado via PIX (${this.pixKey})`;
  }
}

class PaymentProcessor {
  constructor(private strategy: PaymentStrategy) {}

  setStrategy(strategy: PaymentStrategy): void {
    this.strategy = strategy;
  }

  processPayment(amount: number): string {
    return this.strategy.pay(amount);
  }
}

// Padrão Builder
interface User {
  id: string;
  name: string;
  email: string;
  age?: number;
  address?: string;
  phone?: string;
  isActive: boolean;
  roles: string[];
  createdAt: Date;
}

class UserBuilder {
  private user: Partial<User> = {
    isActive: true,
    roles: [],
    createdAt: new Date()
  };

  setId(id: string): UserBuilder {
    this.user.id = id;
    return this;
  }

  setName(name: string): UserBuilder {
    this.user.name = name;
    return this;
  }

  setEmail(email: string): UserBuilder {
    this.user.email = email;
    return this;
  }

  setAge(age: number): UserBuilder {
    this.user.age = age;
    return this;
  }

  setAddress(address: string): UserBuilder {
    this.user.address = address;
    return this;
  }

  setPhone(phone: string): UserBuilder {
    this.user.phone = phone;
    return this;
  }

  setActive(isActive: boolean): UserBuilder {
    this.user.isActive = isActive;
    return this;
  }

  addRole(role: string): UserBuilder {
    this.user.roles = [...(this.user.roles || []), role];
    return this;
  }

  build(): User {
    if (!this.user.id || !this.user.name || !this.user.email) {
      throw new Error('ID, nome e email são obrigatórios');
    }
    return this.user as User;
  }
}

// Padrão Decorator
interface Coffee {
  cost(): number;
  description(): string;
}

class SimpleCoffee implements Coffee {
  cost(): number {
    return 5.0;
  }

  description(): string {
    return 'Café simples';
  }
}

abstract class CoffeeDecorator implements Coffee {
  constructor(protected coffee: Coffee) {}

  abstract cost(): number;
  abstract description(): string;
}

class MilkDecorator extends CoffeeDecorator {
  cost(): number {
    return this.coffee.cost() + 2.0;
  }

  description(): string {
    return this.coffee.description() + ', com leite';
  }
}

class SugarDecorator extends CoffeeDecorator {
  cost(): number {
    return this.coffee.cost() + 0.5;
  }

  description(): string {
    return this.coffee.description() + ', com açúcar';
  }
}

class ChocolateDecorator extends CoffeeDecorator {
  cost(): number {
    return this.coffee.cost() + 3.0;
  }

  description(): string {
    return this.coffee.description() + ', com chocolate';
  }
}

// Componentes de demonstração
function SingletonDemo() {
  const [logs, setLogs] = useState<string[]>([]);
  const logger = Logger.getInstance();

  const addLog = () => {
    logger.log(`Log ${Date.now()}`);
    setLogs(logger.getLogs());
  };

  const clearLogs = () => {
    logger.clearLogs();
    setLogs([]);
  };

  useEffect(() => {
    setLogs(logger.getLogs());
  }, []);

  return (
    <div className="card">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Singleton Pattern - Logger
      </h3>
      <div className="space-y-4">
        <div className="flex space-x-2">
          <button onClick={addLog} className="btn-primary">
            Adicionar Log
          </button>
          <button onClick={clearLogs} className="btn-secondary">
            Limpar Logs
          </button>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded max-h-40 overflow-y-auto">
          {logs.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">Nenhum log</p>
          ) : (
            logs.map((log, index) => (
              <div key={index} className="text-sm font-mono text-gray-700 dark:text-gray-300">
                {log}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function FactoryDemo() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [animalType, setAnimalType] = useState<AnimalType>('dog');
  const [animalName, setAnimalName] = useState('');

  const createAnimal = () => {
    if (animalName.trim()) {
      const animal = AnimalFactory.createAnimal(animalType, animalName);
      setAnimals(prev => [...prev, animal]);
      setAnimalName('');
    }
  };

  return (
    <div className="card">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Factory Pattern - Animais
      </h3>
      <div className="space-y-4">
        <div className="flex space-x-2">
          <select 
            value={animalType} 
            onChange={(e) => setAnimalType(e.target.value as AnimalType)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
          >
            <option value="dog">Cachorro</option>
            <option value="cat">Gato</option>
            <option value="bird">Pássaro</option>
          </select>
          <input
            type="text"
            placeholder="Nome do animal"
            value={animalName}
            onChange={(e) => setAnimalName(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
          />
          <button onClick={createAnimal} className="btn-primary">
            Criar
          </button>
        </div>
        <div className="space-y-2">
          {animals.map((animal, index) => (
            <div key={index} className="p-2 bg-gray-100 dark:bg-gray-800 rounded">
              {animal.makeSound()}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ObserverDemo() {
  const [news, setNews] = useState<{ subscriber: string; news: NewsData }[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [publisher] = useState(() => new NewsPublisher());
  const [subscribers] = useState(() => {
    const subs = [
      new NewsSubscriber('João', (name, newsData) => {
        setNews(prev => [...prev, { subscriber: name, news: newsData }]);
      }),
      new NewsSubscriber('Maria', (name, newsData) => {
        setNews(prev => [...prev, { subscriber: name, news: newsData }]);
      }),
      new NewsSubscriber('Pedro', (name, newsData) => {
        setNews(prev => [...prev, { subscriber: name, news: newsData }]);
      })
    ];
    
    subs.forEach(sub => publisher.subscribe(sub));
    return subs;
  });

  const publishNews = () => {
    if (title.trim() && content.trim()) {
      publisher.publishNews(title, content);
      setTitle('');
      setContent('');
    }
  };

  return (
    <div className="card">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Observer Pattern - Notícias
      </h3>
      <div className="space-y-4">
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Título da notícia"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
          />
          <textarea
            placeholder="Conteúdo da notícia"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 h-20"
          />
          <button onClick={publishNews} className="btn-primary w-full">
            Publicar Notícia
          </button>
        </div>
        <div className="max-h-40 overflow-y-auto space-y-2">
          {news.map((item, index) => (
            <div key={index} className="p-2 bg-gray-100 dark:bg-gray-800 rounded text-sm">
              <strong>{item.subscriber}</strong> recebeu: "{item.news.title}"
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {item.news.timestamp.toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StrategyDemo() {
  const [amount, setAmount] = useState(100);
  const [paymentMethod, setPaymentMethod] = useState<'credit' | 'paypal' | 'pix'>('credit');
  const [result, setResult] = useState('');

  const processPayment = () => {
    let strategy: PaymentStrategy;
    
    switch (paymentMethod) {
      case 'credit':
        strategy = new CreditCardPayment('1234567890123456');
        break;
      case 'paypal':
        strategy = new PayPalPayment('user@example.com');
        break;
      case 'pix':
        strategy = new PixPayment('user@email.com');
        break;
    }
    
    const processor = new PaymentProcessor(strategy);
    const paymentResult = processor.processPayment(amount);
    setResult(paymentResult);
  };

  return (
    <div className="card">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Strategy Pattern - Pagamentos
      </h3>
      <div className="space-y-4">
        <div className="space-y-2">
          <input
            type="number"
            placeholder="Valor"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
          />
          <select 
            value={paymentMethod} 
            onChange={(e) => setPaymentMethod(e.target.value as any)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
          >
            <option value="credit">Cartão de Crédito</option>
            <option value="paypal">PayPal</option>
            <option value="pix">PIX</option>
          </select>
          <button onClick={processPayment} className="btn-primary w-full">
            Processar Pagamento
          </button>
        </div>
        {result && (
          <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded">
            {result}
          </div>
        )}
      </div>
    </div>
  );
}

function BuilderDemo() {
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    address: '',
    phone: '',
    roles: [] as string[]
  });

  const buildUser = () => {
    try {
      const builder = new UserBuilder()
        .setId(Date.now().toString())
        .setName(formData.name)
        .setEmail(formData.email);
      
      if (formData.age) builder.setAge(Number(formData.age));
      if (formData.address) builder.setAddress(formData.address);
      if (formData.phone) builder.setPhone(formData.phone);
      
      formData.roles.forEach(role => builder.addRole(role));
      
      const newUser = builder.build();
      setUser(newUser);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Erro ao criar usuário');
    }
  };

  const addRole = (role: string) => {
    if (!formData.roles.includes(role)) {
      setFormData(prev => ({ ...prev, roles: [...prev.roles, role] }));
    }
  };

  return (
    <div className="card">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Builder Pattern - Usuário
      </h3>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nome *"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
          />
          <input
            type="email"
            placeholder="Email *"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
          />
          <input
            type="number"
            placeholder="Idade"
            value={formData.age}
            onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
          />
          <input
            type="text"
            placeholder="Endereço"
            value={formData.address}
            onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex space-x-2">
            <button onClick={() => addRole('admin')} className="btn-secondary text-sm">
              + Admin
            </button>
            <button onClick={() => addRole('user')} className="btn-secondary text-sm">
              + User
            </button>
            <button onClick={() => addRole('moderator')} className="btn-secondary text-sm">
              + Moderator
            </button>
          </div>
          {formData.roles.length > 0 && (
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Roles: {formData.roles.join(', ')}
            </div>
          )}
        </div>
        
        <button onClick={buildUser} className="btn-primary w-full">
          Criar Usuário
        </button>
        
        {user && (
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded">
            <pre className="text-sm">{JSON.stringify(user, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

function DecoratorDemo() {
  const [coffee, setCoffee] = useState<Coffee>(new SimpleCoffee());
  const [decorators, setDecorators] = useState<string[]>([]);

  const addDecorator = (decorator: string) => {
    let newCoffee: Coffee;
    
    switch (decorator) {
      case 'milk':
        newCoffee = new MilkDecorator(coffee);
        break;
      case 'sugar':
        newCoffee = new SugarDecorator(coffee);
        break;
      case 'chocolate':
        newCoffee = new ChocolateDecorator(coffee);
        break;
      default:
        return;
    }
    
    setCoffee(newCoffee);
    setDecorators(prev => [...prev, decorator]);
  };

  const resetCoffee = () => {
    setCoffee(new SimpleCoffee());
    setDecorators([]);
  };

  return (
    <div className="card">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Decorator Pattern - Café
      </h3>
      <div className="space-y-4">
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded">
          <div className="text-lg font-semibold">{coffee.description()}</div>
          <div className="text-xl text-green-600 dark:text-green-400">
            R$ {coffee.cost().toFixed(2)}
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button 
            onClick={() => addDecorator('milk')} 
            className="btn-secondary"
            disabled={decorators.includes('milk')}
          >
            + Leite (R$ 2,00)
          </button>
          <button 
            onClick={() => addDecorator('sugar')} 
            className="btn-secondary"
            disabled={decorators.includes('sugar')}
          >
            + Açúcar (R$ 0,50)
          </button>
          <button 
            onClick={() => addDecorator('chocolate')} 
            className="btn-secondary"
            disabled={decorators.includes('chocolate')}
          >
            + Chocolate (R$ 3,00)
          </button>
        </div>
        
        <button onClick={resetCoffee} className="btn-primary w-full">
          Novo Café
        </button>
      </div>
    </div>
  );
}

export default function TypeScriptPatternsPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            TypeScript - Design Patterns
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Implementação de padrões de design clássicos com TypeScript
          </p>
        </div>

        {/* Introdução aos Padrões */}
        <DemoSection title="Padrões de Design">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1.5">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Padrões Criacionais
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• <strong>Singleton:</strong> Uma única instância</li>
                <li>• <strong>Factory:</strong> Criação de objetos</li>
                <li>• <strong>Builder:</strong> Construção complexa</li>
                <li>• <strong>Prototype:</strong> Clonagem de objetos</li>
              </ul>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Padrões Estruturais
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• <strong>Decorator:</strong> Adiciona funcionalidades</li>
                <li>• <strong>Adapter:</strong> Compatibilidade de interfaces</li>
                <li>• <strong>Facade:</strong> Interface simplificada</li>
                <li>• <strong>Composite:</strong> Estruturas hierárquicas</li>
              </ul>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Padrões Comportamentais
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• <strong>Observer:</strong> Notificação de mudanças</li>
                <li>• <strong>Strategy:</strong> Algoritmos intercambiáveis</li>
                <li>• <strong>Command:</strong> Encapsulamento de ações</li>
                <li>• <strong>State:</strong> Mudança de comportamento</li>
              </ul>
            </div>
          </div>
        </DemoSection>

        {/* Demonstrações Práticas */}
        <DemoSection title="Demonstrações Práticas">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-1.5">
            <SingletonDemo />
            <FactoryDemo />
            <ObserverDemo />
            <StrategyDemo />
            <BuilderDemo />
            <DecoratorDemo />
          </div>
        </DemoSection>

        {/* Implementações dos Padrões */}
        <DemoSection title="Implementações">
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-1.5">
              <CodeBlock
                title="Singleton Pattern"
                language="tsx"
                code={`class Logger {
  private static instance: Logger;
  private logs: string[] = [];

  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  log(message: string): void {
    const timestamp = new Date().toISOString();
    this.logs.push(\`[\${timestamp}] \${message}\`);
  }

  getLogs(): string[] {
    return [...this.logs];
  }
}`}
              />
              
              <CodeBlock
                title="Factory Pattern"
                language="tsx"
                code={`interface Animal {
  name: string;
  sound: string;
  makeSound(): string;
}

class Dog implements Animal {
  constructor(public name: string) {}
  sound = 'Au au!';
  makeSound(): string {
    return \`\${this.name} faz: \${this.sound}\`;
  }
}

class AnimalFactory {
  static createAnimal(type: AnimalType, name: string): Animal {
    switch (type) {
      case 'dog':
        return new Dog(name);
      case 'cat':
        return new Cat(name);
      default:
        throw new Error(\`Tipo não suportado: \${type}\`);
    }
  }
}`}
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-1.5">
              <CodeBlock
                title="Observer Pattern"
                language="tsx"
                code={`interface Observer<T> {
  update(data: T): void;
}

class Subject<T> {
  private observers: Observer<T>[] = [];

  subscribe(observer: Observer<T>): void {
    this.observers.push(observer);
  }

  notify(data: T): void {
    this.observers.forEach(observer => observer.update(data));
  }
}

class NewsSubscriber implements Observer<NewsData> {
  constructor(private name: string) {}

  update(data: NewsData): void {
    console.log(\`\${this.name} recebeu: \${data.title}\`);
  }
}`}
              />
              
              <CodeBlock
                title="Strategy Pattern"
                language="tsx"
                code={`interface PaymentStrategy {
  pay(amount: number): string;
}

class CreditCardPayment implements PaymentStrategy {
  constructor(private cardNumber: string) {}

  pay(amount: number): string {
    return \`Pagamento de R$ \${amount} via cartão\`;
  }
}

class PaymentProcessor {
  constructor(private strategy: PaymentStrategy) {}

  setStrategy(strategy: PaymentStrategy): void {
    this.strategy = strategy;
  }

  processPayment(amount: number): string {
    return this.strategy.pay(amount);
  }
}`}
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-1.5">
              <CodeBlock
                title="Builder Pattern"
                language="tsx"
                code={`class UserBuilder {
  private user: Partial<User> = {
    isActive: true,
    roles: [],
    createdAt: new Date()
  };

  setName(name: string): UserBuilder {
    this.user.name = name;
    return this;
  }

  setEmail(email: string): UserBuilder {
    this.user.email = email;
    return this;
  }

  addRole(role: string): UserBuilder {
    this.user.roles = [...(this.user.roles || []), role];
    return this;
  }

  build(): User {
    if (!this.user.name || !this.user.email) {
      throw new Error('Nome e email são obrigatórios');
    }
    return this.user as User;
  }
}`}
              />
              
              <CodeBlock
                title="Decorator Pattern"
                language="tsx"
                code={`interface Coffee {
  cost(): number;
  description(): string;
}

class SimpleCoffee implements Coffee {
  cost(): number { return 5.0; }
  description(): string { return 'Café simples'; }
}

abstract class CoffeeDecorator implements Coffee {
  constructor(protected coffee: Coffee) {}
  abstract cost(): number;
  abstract description(): string;
}

class MilkDecorator extends CoffeeDecorator {
  cost(): number {
    return this.coffee.cost() + 2.0;
  }

  description(): string {
    return this.coffee.description() + ', com leite';
  }
}`}
              />
            </div>
          </div>
        </DemoSection>

        {/* Vantagens dos Padrões */}
        <DemoSection title="Vantagens dos Design Patterns">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                ✅ Benefícios
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• <strong>Reutilização:</strong> Soluções testadas e aprovadas</li>
                <li>• <strong>Comunicação:</strong> Linguagem comum entre desenvolvedores</li>
                <li>• <strong>Manutenibilidade:</strong> Código mais organizado</li>
                <li>• <strong>Flexibilidade:</strong> Facilita mudanças futuras</li>
                <li>• <strong>Qualidade:</strong> Reduz bugs e problemas</li>
                <li>• <strong>Performance:</strong> Otimizações conhecidas</li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                🎯 Quando Usar
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• <strong>Singleton:</strong> Configurações globais, logs</li>
                <li>• <strong>Factory:</strong> Criação de objetos complexos</li>
                <li>• <strong>Observer:</strong> Sistemas de eventos</li>
                <li>• <strong>Strategy:</strong> Algoritmos intercambiáveis</li>
                <li>• <strong>Builder:</strong> Objetos com muitos parâmetros</li>
                <li>• <strong>Decorator:</strong> Funcionalidades opcionais</li>
              </ul>
            </div>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}