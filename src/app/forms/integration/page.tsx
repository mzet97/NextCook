'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import CodeBlock from '@/components/CodeBlock';
import DemoSection from '@/components/DemoSection';

// Registration Schema
const registrationSchema = z.object({
  firstName: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  lastName: z.string().min(2, 'Sobrenome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string()
    .min(8, 'Senha deve ter pelo menos 8 caracteres')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Senha deve conter pelo menos uma letra minúscula, uma maiúscula e um número'),
  confirmPassword: z.string(),
  age: z.number().min(18, 'Idade mínima é 18 anos').max(120, 'Idade máxima é 120 anos'),
  country: z.string().min(1, 'País é obrigatório'),
  terms: z.boolean().refine(val => val === true, 'Você deve aceitar os termos de uso'),
  newsletter: z.boolean().optional()
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Senhas não coincidem',
  path: ['confirmPassword']
});

// Product Schema
const productSchema = z.object({
  name: z.string().min(1, 'Nome do produto é obrigatório'),
  description: z.string().min(10, 'Descrição deve ter pelo menos 10 caracteres'),
  price: z.number().min(0.01, 'Preço deve ser maior que zero'),
  category: z.enum(['electronics', 'clothing', 'books', 'home'], {
    errorMap: () => ({ message: 'Selecione uma categoria válida' })
  }),
  tags: z.array(z.string()).min(1, 'Adicione pelo menos uma tag'),
  inStock: z.boolean(),
  specifications: z.record(z.string()).optional(),
  images: z.array(z.string().url('URL da imagem inválida')).optional()
});

// Contact Schema with conditional fields
const contactSchema = z.object({
  name: z.string().min(2, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  subject: z.enum(['support', 'sales', 'feedback', 'other']),
  priority: z.enum(['low', 'medium', 'high']),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres'),
  phone: z.string().optional(),
  company: z.string().optional(),
  attachments: z.array(z.string()).optional()
}).refine((data) => {
  if (data.subject === 'sales' && !data.company) {
    return false;
  }
  return true;
}, {
  message: 'Empresa é obrigatória para consultas de vendas',
  path: ['company']
});

type RegistrationData = z.infer<typeof registrationSchema>;
type ProductData = z.infer<typeof productSchema>;
type ContactData = z.infer<typeof contactSchema>;

export default function IntegrationPage() {
  const [submittedData, setSubmittedData] = useState<any>(null);
  const [currentTags, setCurrentTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  // Registration Form
  const {
    register: registerReg,
    handleSubmit: handleSubmitReg,
    formState: { errors: errorsReg, isSubmitting: isSubmittingReg },
    reset: resetReg
  } = useForm<RegistrationData>({
    resolver: zodResolver(registrationSchema)
  });

  // Product Form
  const {
    register: registerProd,
    handleSubmit: handleSubmitProd,
    formState: { errors: errorsProd },
    setValue: setValueProd,
    watch: watchProd,
    control: controlProd
  } = useForm<ProductData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      tags: [],
      inStock: true
    }
  });

  // Contact Form
  const {
    register: registerContact,
    handleSubmit: handleSubmitContact,
    formState: { errors: errorsContact },
    watch: watchContact
  } = useForm<ContactData>({
    resolver: zodResolver(contactSchema)
  });

  const contactSubject = watchContact('subject');

  const onSubmitRegistration = async (data: RegistrationData) => {
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
    setSubmittedData({ type: 'registration', data });
    resetReg();
  };

  const onSubmitProduct = (data: ProductData) => {
    setSubmittedData({ type: 'product', data });
  };

  const onSubmitContact = (data: ContactData) => {
    setSubmittedData({ type: 'contact', data });
  };

  const addTag = () => {
    if (tagInput.trim() && !currentTags.includes(tagInput.trim())) {
      const newTags = [...currentTags, tagInput.trim()];
      setCurrentTags(newTags);
      setValueProd('tags', newTags);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = currentTags.filter(tag => tag !== tagToRemove);
    setCurrentTags(newTags);
    setValueProd('tags', newTags);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            React Hook Form + Zod
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A combinação perfeita para formulários robustos, type-safe e performáticos.
            Explore exemplos práticos de integração completa.
          </p>
        </div>

        {/* Submitted Data Display */}
        {submittedData && (
          <DemoSection title="Dados Submetidos" description="Resultado da submissão com validação Zod">
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                ✅ Formulário: {submittedData.type}
              </h4>
              <pre className="text-sm text-green-700 dark:text-green-300 overflow-auto">
                {JSON.stringify(submittedData.data, null, 2)}
              </pre>
            </div>
          </DemoSection>
        )}

        {/* Registration Form */}
        <DemoSection 
          title="Formulário de Registro"
          description="Exemplo completo com validação complexa e estados de loading"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-1.5">
            <div>
              <form onSubmit={handleSubmitReg(onSubmitRegistration)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Nome
                    </label>
                    <input
                      {...registerReg('firstName')}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                      placeholder="João"
                    />
                    {errorsReg.firstName && (
                      <p className="text-red-500 text-sm mt-1">{errorsReg.firstName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Sobrenome
                    </label>
                    <input
                      {...registerReg('lastName')}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Silva"
                    />
                    {errorsReg.lastName && (
                      <p className="text-red-500 text-sm mt-1">{errorsReg.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    {...registerReg('email')}
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                    placeholder="joao@email.com"
                  />
                  {errorsReg.email && (
                    <p className="text-red-500 text-sm mt-1">{errorsReg.email.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Senha
                    </label>
                    <input
                      {...registerReg('password')}
                      type="password"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Senha123"
                    />
                    {errorsReg.password && (
                      <p className="text-red-500 text-sm mt-1">{errorsReg.password.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Confirmar Senha
                    </label>
                    <input
                      {...registerReg('confirmPassword')}
                      type="password"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Senha123"
                    />
                    {errorsReg.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">{errorsReg.confirmPassword.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Idade
                    </label>
                    <input
                      {...registerReg('age', { valueAsNumber: true })}
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                      placeholder="25"
                    />
                    {errorsReg.age && (
                      <p className="text-red-500 text-sm mt-1">{errorsReg.age.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      País
                    </label>
                    <select
                      {...registerReg('country')}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="">Selecione...</option>
                      <option value="BR">Brasil</option>
                      <option value="US">Estados Unidos</option>
                      <option value="CA">Canadá</option>
                      <option value="UK">Reino Unido</option>
                    </select>
                    {errorsReg.country && (
                      <p className="text-red-500 text-sm mt-1">{errorsReg.country.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      {...registerReg('terms')}
                      type="checkbox"
                      className="mr-2 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Aceito os termos de uso e pol&iacute;tica de privacidade
                    </span>
                  </label>
                  {errorsReg.terms && (
                    <p className="text-red-500 text-sm">{errorsReg.terms.message}</p>
                  )}

                  <label className="flex items-center">
                    <input
                      {...registerReg('newsletter')}
                      type="checkbox"
                      className="mr-2 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Quero receber newsletter
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingReg}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium py-2 px-4 rounded-md transition-colors"
                >
                  {isSubmittingReg ? 'Registrando...' : 'Registrar'}
                </button>
              </form>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Setup da Integração</h4>
              <CodeBlock language="typescript">
{`import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  firstName: z.string().min(2, &apos;Mínimo 2 caracteres&apos;),
  email: z.string().email(&apos;Email inválido&apos;),
  password: z.string().min(8, &apos;Mínimo 8 caracteres&apos;),
  confirmPassword: z.string(),
  terms: z.boolean().refine(val => val === true, 
                            &apos;Aceite os termos&apos;)
}).refine((data) => data.password === data.confirmPassword, {
  message: &apos;Senhas não coincidem&apos;,
  path: [&apos;confirmPassword&apos;]
});

type FormData = z.infer<typeof schema>;

const { register, handleSubmit, formState: { errors } } = 
  useForm<FormData>({
    resolver: zodResolver(schema)
  });

// Validação automática com Zod
// Type safety completa
// Mensagens de erro customizadas`}
              </CodeBlock>
            </div>
          </div>
        </DemoSection>

        {/* Product Form */}
        <DemoSection 
          title="Formulário de Produto"
          description="Exemplo com arrays, enums e campos dinâmicos"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-1.5">
            <div>
              <form onSubmit={handleSubmitProd(onSubmitProduct)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nome do Produto
                  </label>
                  <input
                    {...registerProd('name')}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="iPhone 15 Pro"
                  />
                  {errorsProd.name && (
                    <p className="text-red-500 text-sm mt-1">{errorsProd.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Descrição
                  </label>
                  <textarea
                    {...registerProd('description')}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Descrição detalhada do produto..."
                  />
                  {errorsProd.description && (
                    <p className="text-red-500 text-sm mt-1">{errorsProd.description.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Preço
                    </label>
                    <input
                      {...registerProd('price', { valueAsNumber: true })}
                      type="number"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="999.99"
                    />
                    {errorsProd.price && (
                      <p className="text-red-500 text-sm mt-1">{errorsProd.price.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Categoria
                    </label>
                    <select
                      {...registerProd('category')}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="">Selecione...</option>
                      <option value="electronics">Eletrônicos</option>
                      <option value="clothing">Roupas</option>
                      <option value="books">Livros</option>
                      <option value="home">Casa</option>
                    </select>
                    {errorsProd.category && (
                      <p className="text-red-500 text-sm mt-1">{errorsProd.category.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Tags
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Adicionar tag"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    />
                    <button
                      type="button"
                      onClick={addTag}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                    >
                      Adicionar
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentTags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-md text-sm flex items-center gap-1"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  {errorsProd.tags && (
                    <p className="text-red-500 text-sm mt-1">{errorsProd.tags.message}</p>
                  )}
                </div>

                <div>
                  <label className="flex items-center">
                    <input
                      {...registerProd('inStock')}
                      type="checkbox"
                      className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Produto em estoque
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                >
                  Salvar Produto
                </button>
              </form>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Schema com Arrays e Enums</h4>
              <CodeBlock language="typescript">
{`const productSchema = z.object({
  name: z.string().min(1, &apos;Nome é obrigatório&apos;),
  description: z.string().min(10, &apos;Mínimo 10 caracteres&apos;),
  price: z.number().min(0.01, &apos;Preço deve ser > 0&apos;),
  
  // Enum com mensagem customizada
  category: z.enum([&apos;electronics&apos;, &apos;clothing&apos;, &apos;books&apos;], {
    errorMap: () => ({ message: &apos;Categoria inválida&apos; })
  }),
  
  // Array de strings
  tags: z.array(z.string()).min(1, &apos;Adicione pelo menos uma tag&apos;),
  
  inStock: z.boolean(),
  
  // Record opcional
  specifications: z.record(z.string()).optional(),
  
  // Array de URLs
  images: z.array(z.string().url()).optional()
});

// setValue para campos dinâmicos
const addTag = () => {
  const newTags = [...currentTags, tagInput];
  setCurrentTags(newTags);
  setValue(&apos;tags&apos;, newTags); // Atualiza o form
};`}
              </CodeBlock>
            </div>
          </div>
        </DemoSection>

        {/* Contact Form */}
        <DemoSection 
          title="Formulário de Contato"
          description="Validação condicional baseada em outros campos"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-1.5">
            <div>
              <form onSubmit={handleSubmitContact(onSubmitContact)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nome
                  </label>
                  <input
                    {...registerContact('name')}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Seu nome"
                  />
                  {errorsContact.name && (
                    <p className="text-red-500 text-sm mt-1">{errorsContact.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    {...registerContact('email')}
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                    placeholder="seu@email.com"
                  />
                  {errorsContact.email && (
                    <p className="text-red-500 text-sm mt-1">{errorsContact.email.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Assunto
                    </label>
                    <select
                      {...registerContact('subject')}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="">Selecione...</option>
                      <option value="support">Suporte</option>
                      <option value="sales">Vendas</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Outro</option>
                    </select>
                    {errorsContact.subject && (
                      <p className="text-red-500 text-sm mt-1">{errorsContact.subject.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Prioridade
                    </label>
                    <select
                      {...registerContact('priority')}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="">Selecione...</option>
                      <option value="low">Baixa</option>
                      <option value="medium">Média</option>
                      <option value="high">Alta</option>
                    </select>
                    {errorsContact.priority && (
                      <p className="text-red-500 text-sm mt-1">{errorsContact.priority.message}</p>
                    )}
                  </div>
                </div>

                {contactSubject === 'sales' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Empresa *
                    </label>
                    <input
                      {...registerContact('company')}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Nome da empresa"
                    />
                    {errorsContact.company && (
                      <p className="text-red-500 text-sm mt-1">{errorsContact.company.message}</p>
                    )}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Telefone (opcional)
                  </label>
                  <input
                    {...registerContact('phone')}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                    placeholder="(11) 99999-9999"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Mensagem
                  </label>
                  <textarea
                    {...registerContact('message')}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Descreva sua solicitação..."
                  />
                  {errorsContact.message && (
                    <p className="text-red-500 text-sm mt-1">{errorsContact.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                >
                  Enviar Mensagem
                </button>
              </form>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Validação Condicional</h4>
              <CodeBlock language="typescript">
{`const contactSchema = z.object({
  name: z.string().min(2, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  subject: z.enum(['support', 'sales', 'feedback', 'other']),
  message: z.string().min(10, 'Mínimo 10 caracteres'),
  company: z.string().optional()
}).refine((data) => {
  // Validação condicional
  if (data.subject === &apos;sales&apos; && !data.company) {
    return false;
  }
  return true;
}, {
  message: &apos;Empresa é obrigatória para consultas de vendas&apos;,
  path: [&apos;company&apos;] // Campo específico do erro
});

// No componente
const subject = watch(&apos;subject&apos;);

{subject === &apos;sales&apos; && (
  <input {...register(&apos;company&apos;)} />
)}`}
              </CodeBlock>
            </div>
          </div>
        </DemoSection>

        {/* Benefits */}
        <DemoSection 
          title="Vantagens da Integração"
          description="Por que React Hook Form + Zod é a combinação perfeita"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <span className="text-green-500 mr-2">⚡</span>
                  Performance
                </h4>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                  <li>&bull; M&iacute;nimos re-renders com React Hook Form</li>
                  <li>&bull; Valida&ccedil;&atilde;o otimizada apenas quando necess&aacute;rio</li>
                  <li>&bull; Uncontrolled components por padr&atilde;o</li>
                  <li>&bull; Bundle size reduzido</li>
                </ul>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <span className="text-blue-500 mr-2">🛡️</span>
                  Type Safety
                </h4>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                  <li>&bull; Infer&ecirc;ncia autom&aacute;tica de tipos com Zod</li>
                  <li>&bull; Compile-time e runtime validation</li>
                  <li>&bull; Autocompletar no IDE</li>
                  <li>&bull; Refactoring seguro</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <span className="text-purple-500 mr-2">🎯</span>
                  Developer Experience
                </h4>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                  <li>&bull; API simples e intuitiva</li>
                  <li>&bull; Mensagens de erro customiz&aacute;veis</li>
                  <li>&bull; Valida&ccedil;&atilde;o declarativa</li>
                  <li>&bull; Integra&ccedil;&atilde;o perfeita</li>
                </ul>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <span className="text-orange-500 mr-2">🔧</span>
                  Flexibilidade
                </h4>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                  <li>&bull; Valida&ccedil;&atilde;o condicional complexa</li>
                  <li>&bull; Transforma&ccedil;&atilde;o de dados</li>
                  <li>&bull; Schemas reutiliz&aacute;veis</li>
                  <li>&bull; Integra&ccedil;&atilde;o com qualquer UI library</li>
                </ul>
              </div>
            </div>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}