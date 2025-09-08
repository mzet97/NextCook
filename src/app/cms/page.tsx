'use client';

import { useState } from 'react';
import { 
  FileText, 
  Edit3, 
  Globe, 
  Layers, 
  Zap, 
  Shield, 
  Search, 
  Users,
  Code,
  Play,
  CheckCircle,
  ArrowRight,
  Database,
  Cloud,
  Smartphone
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import DemoCardStatic from '@/components/DemoCardStatic';

const cmsFeatures = [
  {
    title: 'Headless CMS',
    description: 'Separação completa entre conteúdo e apresentação',
    icon: <Database className="w-5 h-5" />,
    benefits: ['API-First', 'Multi-channel', 'Developer-friendly', 'Scalable']
  },
  {
    title: 'Content API',
    description: 'APIs RESTful e GraphQL para acesso ao conteúdo',
    icon: <Code className="w-5 h-5" />,
    benefits: ['REST & GraphQL', 'Real-time', 'Webhooks', 'CDN Integration']
  },
  {
    title: 'Rich Editor',
    description: 'Editor visual avançado com blocos personalizados',
    icon: <Edit3 className="w-5 h-5" />,
    benefits: ['WYSIWYG', 'Custom Blocks', 'Media Library', 'Collaborative']
  },
  {
    title: 'Multi-platform',
    description: 'Conteúdo para web, mobile, IoT e mais',
    icon: <Smartphone className="w-5 h-5" />,
    benefits: ['Web', 'Mobile Apps', 'IoT Devices', 'Digital Signage']
  }
];

const cmsProviders = [
  {
    name: 'Sanity',
    description: 'CMS estruturado com editor em tempo real',
    features: ['Real-time collaboration', 'GROQ queries', 'Custom schemas', 'Asset pipeline'],
    pricing: 'Freemium',
    bestFor: 'Projetos complexos com necessidades customizadas'
  },
  {
    name: 'Contentful',
    description: 'Plataforma de conteúdo para equipes',
    features: ['Rich API', 'CDN global', 'Workflows', 'Localization'],
    pricing: 'Freemium',
    bestFor: 'Equipes grandes com fluxos de aprovação'
  },
  {
    name: 'Strapi',
    description: 'CMS open-source auto-hospedado',
    features: ['Self-hosted', 'Plugin system', 'Role-based access', 'GraphQL'],
    pricing: 'Open Source',
    bestFor: 'Controle total e customização máxima'
  },
  {
    name: 'Hygraph',
    description: 'GraphQL-native headless CMS',
    features: ['GraphQL-first', 'Content federation', 'Asset optimization', 'Localization'],
    pricing: 'Freemium',
    bestFor: 'Aplicações GraphQL-first'
  }
];

const quickStartSteps = [
  { step: '1', title: 'Escolher CMS', desc: 'Selecionar plataforma baseada nas necessidades' },
  { step: '2', title: 'Configurar Schema', desc: 'Definir tipos de conteúdo e campos' },
  { step: '3', title: 'Integrar API', desc: 'Conectar Next.js com o CMS via API' },
  { step: '4', title: 'Implementar UI', desc: 'Criar componentes para renderizar conteúdo' }
];

export default function CMSPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs />
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6">
            <FileText className="w-8 h-8 text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            CMS & Content Management
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Gerencie conteúdo de forma eficiente com Headless CMS, MDX, versionamento e otimização SEO
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-lg p-1 shadow-sm border">
            {[
              { id: 'overview', label: 'Visão Geral' },
              { id: 'providers', label: 'Provedores' },
              { id: 'implementation', label: 'Implementação' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
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

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1.5 mb-12">
              {cmsFeatures.map((feature, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-purple-50 rounded-lg mr-3">
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
                title="Sanity Integration"
                description="Exemplo de integração com Sanity CMS"
                icon="🎨"
                color="purple"
                category="CMS"
                tags={['sanity', 'cms', 'integration']}
              >
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-2">sanity.config.ts</div>
                  <pre className="text-xs bg-gray-900 text-green-400 p-3 rounded overflow-x-auto">
{`import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'default',
  title: 'My Project',
  projectId: 'your-project-id',
  dataset: 'production',
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
})`}
                  </pre>
                </div>
              </DemoCardStatic>

              <DemoCardStatic
                title="Content Fetching"
                description="Buscar conteúdo do CMS no Next.js"
                icon="📡"
                color="blue"
                category="CMS"
                tags={['fetch', 'api', 'content']}
              >
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-2">lib/cms.ts</div>
                  <pre className="text-xs bg-gray-900 text-green-400 p-3 rounded overflow-x-auto">
{`import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-05-03'
})

export async function getPosts() {
  return client.fetch(
    \`*[_type == "post"] {
      _id, title, slug, publishedAt,
      "author": author->name,
      "categories": categories[]->title
    }\`
  )
}`}
                  </pre>
                </div>
              </DemoCardStatic>
            </div>

            {/* Benefits Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Vantagens do Headless CMS</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-1.5">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
                    <Zap className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Performance</h3>
                  <p className="text-gray-600 text-sm">
                    Entrega de conteúdo via CDN global com cache otimizado
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                    <Globe className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Omnichannel</h3>
                  <p className="text-gray-600 text-sm">
                    Um conteúdo para web, mobile, IoT e qualquer plataforma
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-3">
                    <Shield className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Segurança</h3>
                  <p className="text-gray-600 text-sm">
                    Separação entre frontend e backend aumenta a segurança
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Providers Tab */}
        {activeTab === 'providers' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
            {cmsProviders.map((provider, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{provider.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    provider.pricing === 'Open Source' 
                      ? 'bg-green-100 text-green-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
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

        {/* Implementation Tab */}
        {activeTab === 'implementation' && (
          <>
            {/* Quick Start Guide */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Guia de Implementação</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-1.5">
                {quickStartSteps.map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-3">
                      <span className="text-purple-600 font-semibold">{item.step}</span>
                    </div>
                    <h3 className="text-sm font-medium text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Implementation Examples */}
            <div className="space-y-8">
              <DemoCardStatic
                title="Schema Definition"
                description="Definindo tipos de conteúdo no Sanity"
                icon="📋"
                color="purple"
                category="CMS"
                tags={['schema', 'sanity', 'content-types']}
              >
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-2">schemas/post.ts</div>
                  <pre className="text-xs bg-gray-900 text-green-400 p-3 rounded overflow-x-auto">
{`export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }]
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime'
    }
  ]
}`}
                  </pre>
                </div>
              </DemoCardStatic>

              <DemoCardStatic
                title="Dynamic Pages"
                description="Gerando páginas dinâmicas com conteúdo do CMS"
                icon="🔄"
                color="blue"
                category="CMS"
                tags={['dynamic', 'pages', 'ssg']}
              >
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-2">app/blog/[slug]/page.tsx</div>
                  <pre className="text-xs bg-gray-900 text-green-400 p-3 rounded overflow-x-auto">
{`import { getPost, getAllPosts } from '@/lib/cms'
import { PortableText } from '@portabletext/react'

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug.current
  }))
}

export default async function PostPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const post = await getPost(params.slug)
  
  return (
    <article>
      <h1>{post.title}</h1>
      <time>{post.publishedAt}</time>
      <PortableText value={post.content} />
    </article>
  )
}`}
                  </pre>
                </div>
              </DemoCardStatic>
            </div>
          </>
        )}

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Pronto para começar?</h2>
            <p className="text-purple-100 mb-6">
              Explore as implementações específicas de cada CMS e MDX
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/cms/sanity"
                className="inline-flex items-center px-6 py-3 bg-white text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition-colors"
              >
                <FileText className="w-5 h-5 mr-2" />
                Sanity CMS
              </a>
              <a
                href="/cms/mdx"
                className="inline-flex items-center px-6 py-3 bg-purple-700 text-white rounded-lg font-medium hover:bg-purple-800 transition-colors"
              >
                <Edit3 className="w-5 h-5 mr-2" />
                MDX Integration
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}