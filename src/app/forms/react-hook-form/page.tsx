'use client';

import { useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import CodeBlock from '@/components/CodeBlock';
import DemoSection from '@/components/DemoSection';

type BasicFormData = {
  name: string;
  email: string;
  age: number;
  message: string;
};

type DynamicFormData = {
  title: string;
  items: { name: string; quantity: number }[];
};

type ConditionalFormData = {
  userType: 'student' | 'professional';
  name: string;
  school?: string;
  company?: string;
  experience?: number;
};

export default function ReactHookFormPage() {
  const [submittedData, setSubmittedData] = useState<any>(null);

  // Basic Form
  const {
    register: registerBasic,
    handleSubmit: handleSubmitBasic,
    formState: { errors: errorsBasic, isSubmitting: isSubmittingBasic },
    reset: resetBasic
  } = useForm<BasicFormData>();

  // Dynamic Form
  const {
    register: registerDynamic,
    control: controlDynamic,
    handleSubmit: handleSubmitDynamic,
    formState: { errors: errorsDynamic }
  } = useForm<DynamicFormData>({
    defaultValues: {
      title: '',
      items: [{ name: '', quantity: 1 }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: controlDynamic,
    name: 'items'
  });

  // Conditional Form
  const {
    register: registerConditional,
    handleSubmit: handleSubmitConditional,
    watch: watchConditional,
    formState: { errors: errorsConditional }
  } = useForm<ConditionalFormData>();

  const userType = watchConditional('userType');

  const onSubmitBasic = async (data: BasicFormData) => {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    setSubmittedData({ type: 'basic', data });
    resetBasic();
  };

  const onSubmitDynamic = (data: DynamicFormData) => {
    setSubmittedData({ type: 'dynamic', data });
  };

  const onSubmitConditional = (data: ConditionalFormData) => {
    setSubmittedData({ type: 'conditional', data });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            React Hook Form
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Biblioteca performática para formulários React com validação mínima de re-renders.
            Explore exemplos práticos e padrões avançados.
          </p>
        </div>

        {/* Submitted Data Display */}
        {submittedData && (
          <DemoSection title="Dados Submetidos" description="Resultado da submissão do formulário">
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                Formulário: {submittedData.type}
              </h4>
              <pre className="text-sm text-green-700 dark:text-green-300 overflow-auto">
                {JSON.stringify(submittedData.data, null, 2)}
              </pre>
            </div>
          </DemoSection>
        )}

        {/* Basic Form */}
        <DemoSection 
          title="Formulário Básico"
          description="Exemplo básico com validação e estados de loading"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <form onSubmit={handleSubmitBasic(onSubmitBasic)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nome
                  </label>
                  <input
                    {...registerBasic('name', { 
                      required: 'Nome é obrigatório',
                      minLength: { value: 2, message: 'Nome deve ter pelo menos 2 caracteres' }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Seu nome"
                  />
                  {errorsBasic.name && (
                    <p className="text-red-500 text-sm mt-1">{errorsBasic.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    {...registerBasic('email', { 
                      required: 'Email é obrigatório',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Email inválido'
                      }
                    })}
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="seu@email.com"
                  />
                  {errorsBasic.email && (
                    <p className="text-red-500 text-sm mt-1">{errorsBasic.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Idade
                  </label>
                  <input
                    {...registerBasic('age', { 
                      required: 'Idade é obrigatória',
                      min: { value: 18, message: 'Idade mínima é 18 anos' },
                      max: { value: 120, message: 'Idade máxima é 120 anos' }
                    })}
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="25"
                  />
                  {errorsBasic.age && (
                    <p className="text-red-500 text-sm mt-1">{errorsBasic.age.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Mensagem
                  </label>
                  <textarea
                    {...registerBasic('message', { 
                      required: 'Mensagem é obrigatória',
                      minLength: { value: 10, message: 'Mensagem deve ter pelo menos 10 caracteres' }
                    })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Sua mensagem..."
                  />
                  {errorsBasic.message && (
                    <p className="text-red-500 text-sm mt-1">{errorsBasic.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingBasic}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded-md transition-colors"
                >
                  {isSubmittingBasic ? 'Enviando...' : 'Enviar'}
                </button>
              </form>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Código do Formulário</h4>
              <CodeBlock language="typescript">
{`const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>();

const onSubmit = async (data: FormData) => {
  await apiCall(data);
};

<form onSubmit={handleSubmit(onSubmit)}>
  <input
    {...register('name', { 
      required: 'Nome é obrigatório',
      minLength: { value: 2, message: 'Mínimo 2 caracteres' }
    })}
  />
  {errors.name && <p>{errors.name.message}</p>}
  
  <button type="submit" disabled={isSubmitting}>
    {isSubmitting ? 'Enviando...' : 'Enviar'}
  </button>
</form>`}
              </CodeBlock>
            </div>
          </div>
        </DemoSection>

        {/* Dynamic Form */}
        <DemoSection 
          title="Formulário Dinâmico"
          description="Adicionando e removendo campos dinamicamente com useFieldArray"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <form onSubmit={handleSubmitDynamic(onSubmitDynamic)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Título
                  </label>
                  <input
                    {...registerDynamic('title', { required: 'Título é obrigatório' })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Título da lista"
                  />
                  {errorsDynamic.title && (
                    <p className="text-red-500 text-sm mt-1">{errorsDynamic.title.message}</p>
                  )}
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Items
                    </label>
                    <button
                      type="button"
                      onClick={() => append({ name: '', quantity: 1 })}
                      className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1 rounded-md"
                    >
                      Adicionar Item
                    </button>
                  </div>
                  
                  {fields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 mb-2">
                      <input
                        {...registerDynamic(`items.${index}.name`, { required: 'Nome é obrigatório' })}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Nome do item"
                      />
                      <input
                        {...registerDynamic(`items.${index}.quantity`, { 
                          required: 'Quantidade é obrigatória',
                          min: { value: 1, message: 'Mínimo 1' }
                        })}
                        type="number"
                        className="w-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Qtd"
                      />
                      {fields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                >
                  Salvar Lista
                </button>
              </form>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Código useFieldArray</h4>
              <CodeBlock language="typescript">
{`const { control, register } = useForm({
  defaultValues: {
    items: [{ name: '', quantity: 1 }]
  }
});

const { fields, append, remove } = useFieldArray({
  control,
  name: 'items'
});

{fields.map((field, index) => (
  <div key={field.id}>
    <input {...register(\`items.\${index}.name\`)} />
    <input {...register(\`items.\${index}.quantity\`)} />
    <button onClick={() => remove(index)}>Remove</button>
  </div>
))}

<button onClick={() => append({ name: '', quantity: 1 })}>
  Add Item
</button>`}
              </CodeBlock>
            </div>
          </div>
        </DemoSection>

        {/* Conditional Form */}
        <DemoSection 
          title="Formulário Condicional"
          description="Campos condicionais baseados em outros valores usando watch"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <form onSubmit={handleSubmitConditional(onSubmitConditional)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Tipo de Usuário
                  </label>
                  <select
                    {...registerConditional('userType', { required: 'Selecione um tipo' })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Selecione...</option>
                    <option value="student">Estudante</option>
                    <option value="professional">Profissional</option>
                  </select>
                  {errorsConditional.userType && (
                    <p className="text-red-500 text-sm mt-1">{errorsConditional.userType.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nome
                  </label>
                  <input
                    {...registerConditional('name', { required: 'Nome é obrigatório' })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Seu nome"
                  />
                  {errorsConditional.name && (
                    <p className="text-red-500 text-sm mt-1">{errorsConditional.name.message}</p>
                  )}
                </div>

                {userType === 'student' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Escola
                    </label>
                    <input
                      {...registerConditional('school', { required: 'Escola é obrigatória para estudantes' })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Nome da escola"
                    />
                    {errorsConditional.school && (
                      <p className="text-red-500 text-sm mt-1">{errorsConditional.school.message}</p>
                    )}
                  </div>
                )}

                {userType === 'professional' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Empresa
                      </label>
                      <input
                        {...registerConditional('company', { required: 'Empresa é obrigatória para profissionais' })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Nome da empresa"
                      />
                      {errorsConditional.company && (
                        <p className="text-red-500 text-sm mt-1">{errorsConditional.company.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Anos de Experiência
                      </label>
                      <input
                        {...registerConditional('experience', { 
                          required: 'Experiência é obrigatória',
                          min: { value: 0, message: 'Mínimo 0 anos' }
                        })}
                        type="number"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Anos de experiência"
                      />
                      {errorsConditional.experience && (
                        <p className="text-red-500 text-sm mt-1">{errorsConditional.experience.message}</p>
                      )}
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                >
                  Enviar
                </button>
              </form>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Código watch</h4>
              <CodeBlock language="typescript">
{`const { register, watch } = useForm();

const userType = watch('userType');

<select {...register('userType')}>
  <option value="student">Estudante</option>
  <option value="professional">Profissional</option>
</select>

{userType === 'student' && (
  <input 
    {...register('school', { required: true })} 
    placeholder="Escola" 
  />
)}

{userType === 'professional' && (
  <>
    <input {...register('company')} placeholder="Empresa" />
    <input {...register('experience')} placeholder="Experiência" />
  </>
)}`}
              </CodeBlock>
            </div>
          </div>
        </DemoSection>

        {/* Features */}
        <DemoSection 
          title="Recursos do React Hook Form"
          description="Principais funcionalidades e vantagens"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Performance</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                <li>• Mínimos re-renders</li>
                <li>• Validação otimizada</li>
                <li>• Uncontrolled components</li>
                <li>• Lazy validation</li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">API Simples</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                <li>• register() para campos</li>
                <li>• handleSubmit() para envio</li>
                <li>• watch() para observar valores</li>
                <li>• setValue() para controle</li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Validação</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                <li>• Validação nativa HTML</li>
                <li>• Validação customizada</li>
                <li>• Integração com schemas</li>
                <li>• Mensagens personalizadas</li>
              </ul>
            </div>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}