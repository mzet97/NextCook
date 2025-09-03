'use client';

import { useState } from 'react';
import { z } from 'zod';
import CodeBlock from '@/components/CodeBlock';
import DemoSection from '@/components/DemoSection';

// Basic Schema
const basicSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  age: z.number().min(18, 'Idade mínima é 18 anos').max(120, 'Idade máxima é 120 anos'),
});

// Advanced Schema
const advancedSchema = z.object({
  username: z.string()
    .min(3, 'Username deve ter pelo menos 3 caracteres')
    .max(20, 'Username deve ter no máximo 20 caracteres')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username deve conter apenas letras, números e underscore'),
  password: z.string()
    .min(8, 'Senha deve ter pelo menos 8 caracteres')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Senha deve conter pelo menos uma letra minúscula, uma maiúscula e um número'),
  confirmPassword: z.string(),
  birthDate: z.string().refine((date) => {
    const birthDate = new Date(date);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    return age >= 18;
  }, 'Você deve ter pelo menos 18 anos'),
  terms: z.boolean().refine(val => val === true, 'Você deve aceitar os termos')
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Senhas não coincidem',
  path: ['confirmPassword']
});

// Transformation Schema
const transformSchema = z.object({
  price: z.string().transform((val) => parseFloat(val)),
  tags: z.string().transform((val) => val.split(',').map(tag => tag.trim())),
  isActive: z.string().transform((val) => val === 'true'),
  metadata: z.string().transform((val) => {
    try {
      return JSON.parse(val);
    } catch {
      return {};
    }
  })
});

// Union and Discriminated Union
const paymentSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('credit_card'),
    cardNumber: z.string().length(16, 'Número do cartão deve ter 16 dígitos'),
    expiryDate: z.string().regex(/^\d{2}\/\d{2}$/, 'Data deve estar no formato MM/YY'),
    cvv: z.string().length(3, 'CVV deve ter 3 dígitos')
  }),
  z.object({
    type: z.literal('pix'),
    pixKey: z.string().min(1, 'Chave PIX é obrigatória')
  }),
  z.object({
    type: z.literal('bank_transfer'),
    bankCode: z.string().length(3, 'Código do banco deve ter 3 dígitos'),
    accountNumber: z.string().min(1, 'Número da conta é obrigatório')
  })
]);

type BasicData = z.infer<typeof basicSchema>;
type AdvancedData = z.infer<typeof advancedSchema>;
type TransformData = z.infer<typeof transformSchema>;
type PaymentData = z.infer<typeof paymentSchema>;

export default function ZodPage() {
  const [validationResults, setValidationResults] = useState<any>(null);
  const [parseResults, setParseResults] = useState<any>(null);

  // Basic validation example
  const validateBasic = () => {
    const testData = {
      name: 'João',
      email: 'joao@email.com',
      age: 25
    };

    const result = basicSchema.safeParse(testData);
    setValidationResults({ type: 'basic', result, data: testData });
  };

  const validateBasicInvalid = () => {
    const testData = {
      name: 'J',
      email: 'invalid-email',
      age: 15
    };

    const result = basicSchema.safeParse(testData);
    setValidationResults({ type: 'basic-invalid', result, data: testData });
  };

  // Advanced validation example
  const validateAdvanced = () => {
    const testData = {
      username: 'user123',
      password: 'Password123',
      confirmPassword: 'Password123',
      birthDate: '1990-01-01',
      terms: true
    };

    const result = advancedSchema.safeParse(testData);
    setValidationResults({ type: 'advanced', result, data: testData });
  };

  // Transformation example
  const testTransformation = () => {
    const testData = {
      price: '29.99',
      tags: 'react, typescript, zod',
      isActive: 'true',
      metadata: '{"category": "frontend", "level": "intermediate"}'
    };

    const result = transformSchema.safeParse(testData);
    setParseResults({ type: 'transform', result, data: testData });
  };

  // Payment validation example
  const validatePayment = (type: 'credit_card' | 'pix' | 'bank_transfer') => {
    let testData: unknown;
    
    switch (type) {
      case 'credit_card':
        testData = {
          type: 'credit_card',
          cardNumber: '1234567890123456',
          expiryDate: '12/25',
          cvv: '123'
        };
        break;
      case 'pix':
        testData = {
          type: 'pix',
          pixKey: 'user@email.com'
        };
        break;
      case 'bank_transfer':
        testData = {
          type: 'bank_transfer',
          bankCode: '001',
          accountNumber: '12345-6'
        };
        break;
    }

    const result = paymentSchema.safeParse(testData);
    setValidationResults({ type: `payment-${type}`, result, data: testData });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Zod
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Schema de validação TypeScript-first com inferência de tipos automática.
            Explore validação robusta, transformações e parsing de dados.
          </p>
        </div>

        {/* Results Display */}
        {validationResults && (
          <DemoSection title="Resultado da Validação" description="Resultado do teste de validação">
            <div className={`border rounded-lg p-4 ${
              validationResults.result.success 
                ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
            }`}>
              <h4 className={`font-semibold mb-2 ${
                validationResults.result.success 
                  ? 'text-green-800 dark:text-green-200'
                  : 'text-red-800 dark:text-red-200'
              }`}>
                {validationResults.result.success ? '✅ Validação Bem-sucedida' : '❌ Validação Falhou'}
              </h4>
              
              <div className="space-y-2">
                <div>
                  <strong>Dados de entrada:</strong>
                  <pre className="text-sm mt-1 overflow-auto">
                    {JSON.stringify(validationResults.data, null, 2)}
                  </pre>
                </div>
                
                {validationResults.result.success ? (
                  <div>
                    <strong>Dados validados:</strong>
                    <pre className="text-sm mt-1 overflow-auto">
                      {JSON.stringify(validationResults.result.data, null, 2)}
                    </pre>
                  </div>
                ) : (
                  <div>
                    <strong>Erros:</strong>
                    <ul className="text-sm mt-1 space-y-1">
                      {validationResults.result.error?.errors?.map((error: unknown, index: number) => (
                        <li key={index} className="text-red-600 dark:text-red-400">
                          {error.path?.join('.') || 'Campo'}: {error.message}
                        </li>
                      )) || (
                        <li className="text-red-600 dark:text-red-400">
                          Erro de validação
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </DemoSection>
        )}

        {parseResults && (
          <DemoSection title="Resultado da Transformação" description="Resultado do parsing e transformação">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                🔄 Transformação Aplicada
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <strong>Dados originais:</strong>
                  <pre className="text-sm mt-1 overflow-auto bg-white dark:bg-gray-800 p-2 rounded">
                    {JSON.stringify(parseResults.data, null, 2)}
                  </pre>
                </div>
                
                <div>
                  <strong>Dados transformados:</strong>
                  <pre className="text-sm mt-1 overflow-auto bg-white dark:bg-gray-800 p-2 rounded">
                    {JSON.stringify(parseResults.result.data, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          </DemoSection>
        )}

        {/* Basic Schema */}
        <DemoSection 
          title="Schema Básico"
          description="Validação básica com tipos primitivos"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="space-y-4">
                <button
                  onClick={validateBasic}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                >
                  Testar Dados Válidos
                </button>
                
                <button
                  onClick={validateBasicInvalid}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                >
                  Testar Dados Inválidos
                </button>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Schema Definition</h4>
              <CodeBlock language="typescript">
{`const basicSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  age: z.number()
    .min(18, 'Idade mínima é 18 anos')
    .max(120, 'Idade máxima é 120 anos'),
});

// Inferência automática de tipos
type BasicData = z.infer<typeof basicSchema>;

// Validação
const result = basicSchema.safeParse(data);
if (result.success) {
  console.log(result.data); // Dados validados
} else {
  console.log(result.error.errors); // Lista de erros
}`}
              </CodeBlock>
            </div>
          </div>
        </DemoSection>

        {/* Advanced Schema */}
        <DemoSection 
          title="Schema Avançado"
          description="Validação complexa com regex, refinements e validação cruzada"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <button
                onClick={validateAdvanced}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                Testar Schema Avançado
              </button>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Schema Avançado</h4>
              <CodeBlock language="typescript">
{`const advancedSchema = z.object({
  username: z.string()
    .min(3, 'Mínimo 3 caracteres')
    .max(20, 'Máximo 20 caracteres')
    .regex(/^[a-zA-Z0-9_]+$/, 'Apenas letras, números e _'),
  
  password: z.string()
    .min(8, 'Mínimo 8 caracteres')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)/, 
           'Deve conter maiúscula, minúscula e número'),
  
  confirmPassword: z.string(),
  
  birthDate: z.string().refine((date) => {
    const age = new Date().getFullYear() - new Date(date).getFullYear();
    return age >= 18;
  }, 'Deve ter pelo menos 18 anos'),
  
  terms: z.boolean().refine(val => val === true, 
                            'Deve aceitar os termos')
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Senhas não coincidem',
  path: ['confirmPassword']
});`}
              </CodeBlock>
            </div>
          </div>
        </DemoSection>

        {/* Transformations */}
        <DemoSection 
          title="Transformações"
          description="Parsing e transformação de dados durante a validação"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <button
                onClick={testTransformation}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                Testar Transformações
              </button>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Schema com Transformações</h4>
              <CodeBlock language="typescript">
{`const transformSchema = z.object({
  price: z.string().transform((val) => parseFloat(val)),
  
  tags: z.string().transform((val) => 
    val.split(',').map(tag => tag.trim())
  ),
  
  isActive: z.string().transform((val) => val === 'true'),
  
  metadata: z.string().transform((val) => {
    try {
      return JSON.parse(val);
    } catch {
      return {};
    }
  })
});

// Input: { price: "29.99", tags: "react, typescript" }
// Output: { price: 29.99, tags: ["react", "typescript"] }`}
              </CodeBlock>
            </div>
          </div>
        </DemoSection>

        {/* Discriminated Unions */}
        <DemoSection 
          title="Discriminated Unions"
          description="Validação de diferentes tipos baseados em um discriminador"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <button
                onClick={() => validatePayment('credit_card')}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                Testar Cartão de Crédito
              </button>
              
              <button
                onClick={() => validatePayment('pix')}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                Testar PIX
              </button>
              
              <button
                onClick={() => validatePayment('bank_transfer')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                Testar Transferência Bancária
              </button>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Discriminated Union</h4>
              <CodeBlock language="typescript">
{`const paymentSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('credit_card'),
    cardNumber: z.string().length(16),
    expiryDate: z.string().regex(/^\\d{2}\/\\d{2}$/),
    cvv: z.string().length(3)
  }),
  z.object({
    type: z.literal('pix'),
    pixKey: z.string().min(1)
  }),
  z.object({
    type: z.literal('bank_transfer'),
    bankCode: z.string().length(3),
    accountNumber: z.string().min(1)
  })
]);

// TypeScript infere automaticamente o tipo correto
// baseado no valor do campo 'type'`}
              </CodeBlock>
            </div>
          </div>
        </DemoSection>

        {/* Features */}
        <DemoSection 
          title="Recursos do Zod"
          description="Principais funcionalidades e vantagens"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Type Safety</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                <li>• Inferência automática de tipos</li>
                <li>• TypeScript-first</li>
                <li>• Compile-time safety</li>
                <li>• Runtime validation</li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Validação</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                <li>• Primitivos e objetos</li>
                <li>• Arrays e unions</li>
                <li>• Regex e refinements</li>
                <li>• Validação cruzada</li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Transformação</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                <li>• Parsing de strings</li>
                <li>• Transformações customizadas</li>
                <li>• Coerção de tipos</li>
                <li>• Preprocessamento</li>
              </ul>
            </div>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}