'use client';

import { useState } from 'react';
import { 
  Brain, 
  Zap, 
  Database, 
  MessageSquare, 
  Search, 
  Code,
  CheckCircle,
  Play,
  ExternalLink,
  Sparkles,
  Bot,
  FileText,
  Image,
  Mic,
  Eye
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import DemoCardStatic from '@/components/DemoCardStatic';

const aiFeatures = [
  {
    title: 'OpenAI Integration',
    description: 'GPT-4, DALL-E, Whisper e Embeddings',
    icon: <Brain className="w-5 h-5" />,
    benefits: ['Text generation', 'Image creation', 'Speech-to-text', 'Embeddings']
  },
  {
    title: 'LangChain.js',
    description: 'Framework para aplicações LLM',
    icon: <Zap className="w-5 h-5" />,
    benefits: ['Chain operations', 'Memory management', 'Tool integration', 'Agents']
  },
  {
    title: 'Vector Databases',
    description: 'Armazenamento e busca semântica',
    icon: <Database className="w-5 h-5" />,
    benefits: ['Semantic search', 'Similarity matching', 'RAG support', 'Scalable']
  },
  {
    title: 'RAG Implementation',
    description: 'Retrieval-Augmented Generation',
    icon: <Search className="w-5 h-5" />,
    benefits: ['Context-aware', 'Knowledge base', 'Real-time data', 'Accurate responses']
  }
];

const aiUseCases = [
  {
    title: 'Chatbots Inteligentes',
    description: 'Assistentes virtuais com contexto',
    icon: <MessageSquare className="w-6 h-6" />,
    examples: ['Customer support', 'FAQ automation', 'Personal assistants', 'Code helpers']
  },
  {
    title: 'Geração de Conteúdo',
    description: 'Criação automática de texto e mídia',
    icon: <FileText className="w-6 h-6" />,
    examples: ['Blog posts', 'Product descriptions', 'Social media', 'Documentation']
  },
  {
    title: 'Análise de Dados',
    description: 'Insights automáticos de dados',
    icon: <Eye className="w-6 h-6" />,
    examples: ['Sentiment analysis', 'Data visualization', 'Trend detection', 'Reporting']
  },
  {
    title: 'Processamento de Mídia',
    description: 'Análise e geração de imagens/áudio',
    icon: <Image className="w-6 h-6" />,
    examples: ['Image recognition', 'Audio transcription', 'Video analysis', 'Content moderation']
  }
];

const quickStartSteps = [
  { step: '1', title: 'Setup API Keys', desc: 'Configurar chaves de API dos provedores' },
  { step: '2', title: 'Install Libraries', desc: 'Instalar OpenAI, LangChain e dependências' },
  { step: '3', title: 'Create Components', desc: 'Desenvolver componentes de interface' },
  { step: '4', title: 'Implement Logic', desc: 'Integrar lógica de AI/ML' }
];

const providers = [
  {
    name: 'OpenAI',
    description: 'GPT-4, DALL-E, Whisper, Embeddings',
    logo: '🤖',
    features: ['Text generation', 'Image creation', 'Speech processing', 'Code generation'],
    pricing: 'Pay-per-use',
    bestFor: 'Aplicações gerais de IA'
  },
  {
    name: 'Anthropic Claude',
    description: 'Modelo de linguagem seguro e útil',
    logo: '🧠',
    features: ['Long context', 'Safe responses', 'Code analysis', 'Document processing'],
    pricing: 'Pay-per-use',
    bestFor: 'Análise de documentos longos'
  },
  {
    name: 'Google Gemini',
    description: 'Modelo multimodal do Google',
    logo: '✨',
    features: ['Multimodal', 'Code generation', 'Math reasoning', 'Visual understanding'],
    pricing: 'Freemium',
    bestFor: 'Aplicações multimodais'
  },
  {
    name: 'Hugging Face',
    description: 'Modelos open-source e APIs',
    logo: '🤗',
    features: ['Open models', 'Custom training', 'Inference API', 'Community'],
    pricing: 'Freemium',
    bestFor: 'Modelos customizados'
  }
];

export default function AIMLPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs />
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-6">
            <Brain className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI & Machine Learning
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Integre inteligência artificial em suas aplicações com OpenAI, LangChain, Vector Databases e RAG
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-lg p-1 shadow-sm border">
            {[
              { id: 'overview', label: 'Visão Geral' },
              { id: 'providers', label: 'Provedores' },
              { id: 'use-cases', label: 'Casos de Uso' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1.5 mb-12">
              {aiFeatures.map((feature, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-indigo-50 rounded-lg mr-3">
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

            {/* Quick Examples */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-1.5 mb-12">
              <DemoCardStatic
                title="OpenAI Chat Integration"
                description="Exemplo básico de chat com GPT-4"
                icon="🤖"
                color="indigo"
                category="AI"
                tags={['openai', 'chat', 'gpt-4']}
              >
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-2">lib/openai.ts</div>
                  <pre className="text-xs bg-gray-900 text-green-400 p-3 rounded overflow-x-auto">
{`import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function generateResponse(
  message: string
) {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{
      role: 'user',
      content: message
    }],
    max_tokens: 150
  })
  
  return completion.choices[0].message.content
}`}
                  </pre>
                </div>
              </DemoCardStatic>

              <DemoCardStatic
                title="Vector Search"
                description="Busca semântica com embeddings"
                icon="🔍"
                color="purple"
                category="AI"
                tags={['vector', 'search', 'embeddings']}
              >
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-2">lib/vector-search.ts</div>
                  <pre className="text-xs bg-gray-900 text-green-400 p-3 rounded overflow-x-auto">
{`import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'

const embeddings = new OpenAIEmbeddings()
const vectorStore = new MemoryVectorStore(embeddings)

export async function addDocuments(docs: string[]) {
  await vectorStore.addDocuments(
    docs.map(content => ({ pageContent: content }))
  )
}

export async function searchSimilar(
  query: string, 
  k = 3
) {
  return vectorStore.similaritySearch(query, k)
}`}
                  </pre>
                </div>
              </DemoCardStatic>
            </div>

            {/* Quick Start Guide */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Guia de Início Rápido</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-1.5">
                {quickStartSteps.map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-full mb-3">
                      <span className="text-indigo-600 font-semibold">{item.step}</span>
                    </div>
                    <h3 className="text-sm font-medium text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Por que usar AI/ML?</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-1.5">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
                    <Zap className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Automação</h3>
                  <p className="text-gray-600 text-sm">
                    Automatize tarefas repetitivas e complexas com IA
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                    <Sparkles className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Experiência</h3>
                  <p className="text-gray-600 text-sm">
                    Crie experiências personalizadas e inteligentes
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-3">
                    <Bot className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Insights</h3>
                  <p className="text-gray-600 text-sm">
                    Extraia insights valiosos de grandes volumes de dados
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Providers Tab */}
        {activeTab === 'providers' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
            {providers.map((provider, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{provider.logo}</span>
                    <h3 className="text-xl font-bold text-gray-900">{provider.name}</h3>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    {provider.pricing}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4">{provider.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Principais Features:</h4>
                  <ul className="space-y-1">
                    {provider.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500">
                    <strong>Melhor para:</strong> {provider.bestFor}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Use Cases Tab */}
        {activeTab === 'use-cases' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
            {aiUseCases.map((useCase, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-indigo-50 rounded-lg mr-4">
                    {useCase.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{useCase.title}</h3>
                    <p className="text-gray-600">{useCase.description}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Exemplos de Aplicação:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {useCase.examples.map((example, exampleIndex) => (
                      <div
                        key={exampleIndex}
                        className="bg-gray-50 rounded-lg p-3 text-center"
                      >
                        <span className="text-sm text-gray-700">{example}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Comece sua jornada em AI</h2>
            <p className="text-indigo-100 mb-6">
              Explore implementações específicas e exemplos práticos
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/ai-ml/openai"
                className="inline-flex items-center px-6 py-3 bg-white text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition-colors"
              >
                <Brain className="w-5 h-5 mr-2" />
                OpenAI Integration
              </a>
              <a
                href="/ai-ml/langchain"
                className="inline-flex items-center px-6 py-3 bg-indigo-700 text-white rounded-lg font-medium hover:bg-indigo-800 transition-colors"
              >
                <Zap className="w-5 h-5 mr-2" />
                LangChain.js
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}