'use client';

import { useState } from 'react';
import { 
  Database, 
  Code, 
  Settings, 
  Eye, 
  Zap, 
  Users, 
  Globe,
  CheckCircle,
  Copy,
  ExternalLink,
  Play,
  FileText,
  Image,
  Calendar
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import DemoCardStatic from '@/components/DemoCardStatic';
import { toast } from 'sonner';

const sanityFeatures = [
  {
    title: 'Real-time Collaboration',
    description: 'Edição colaborativa em tempo real',
    icon: <Users className="w-5 h-5" />,
    benefits: ['Live editing', 'Conflict resolution', 'User presence', 'Comments']
  },
  {
    title: 'GROQ Queries',
    description: 'Linguagem de query poderosa e flexível',
    icon: <Database className="w-5 h-5" />,
    benefits: ['Type-safe', 'Powerful filtering', 'Joins', 'Projections']
  },
  {
    title: 'Custom Schemas',
    description: 'Esquemas totalmente customizáveis',
    icon: <Settings className="w-5 h-5" />,
    benefits: ['Flexible fields', 'Validation', 'References', 'Arrays']
  },
  {
    title: 'Asset Pipeline',
    description: 'Gerenciamento avançado de mídia',
    icon: <Image className="w-5 h-5" />,
    benefits: ['Auto optimization', 'CDN delivery', 'Transformations', 'Metadata']
  }
];

const codeExamples = [
  {
    title: 'Configuração Inicial',
    description: 'Setup básico do Sanity Studio',
    language: 'typescript',
    code: `// sanity.config.ts
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'default',
  title: 'My Project',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [
    deskTool(),
    visionTool()
  ],
  schema: {
    types: schemaTypes,
  },
  studio: {
    components: {
      // Custom studio components
    }
  }
})`
  },
  {
    title: 'Schema Definition',
    description: 'Definindo tipos de conteúdo',
    language: 'typescript',
    code: `// schemas/post.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required().min(10).max(80)
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }]
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text'
        }
      ]
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }]
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent'
    })
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage'
    },
    prepare(selection) {
      const { author } = selection
      return {
        ...selection,
        subtitle: author && \`by \${author}\`
      }
    }
  }
})`
  },
  {
    title: 'Client Setup',
    description: 'Configurando o cliente Sanity',
    language: 'typescript',
    code: `// lib/sanity.ts
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2023-05-03',
  token: process.env.SANITY_API_TOKEN // Para operações de escrita
})

// Helper para URLs de imagem
const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Configuração para preview mode
export const previewClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: false,
  apiVersion: '2023-05-03',
  token: process.env.SANITY_API_TOKEN,
  perspective: 'previewDrafts'
})`
  },
  {
    title: 'GROQ Queries',
    description: 'Buscando dados com GROQ',
    language: 'typescript',
    code: `// lib/queries.ts
import { client } from './sanity'

// Query básica
export async function getAllPosts() {
  return client.fetch(
    \`*[_type == "post" && publishedAt < now()] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      "author": author->name,
      "categories": categories[]->title,
      "mainImage": mainImage.asset->url
    }\`
  )
}

// Query com parâmetros
export async function getPostBySlug(slug: string) {
  return client.fetch(
    \`*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      publishedAt,
      body,
      "author": author-> {
        name,
        "image": image.asset->url
      },
      "categories": categories[]-> {
        title,
        description
      },
      mainImage {
        asset-> {
          url,
          metadata {
            dimensions
          }
        },
        alt
      }
    }\`,
    { slug }
  )
}

// Query com paginação
export async function getPostsPaginated(start = 0, end = 10) {
  return client.fetch(
    \`{
      "posts": *[_type == "post" && publishedAt < now()] 
        | order(publishedAt desc) [$start...$end] {
        _id,
        title,
        slug,
        publishedAt,
        "excerpt": pt::text(body[0...2]),
        "author": author->name,
        "readTime": round(length(pt::text(body)) / 5 / 180 )
      },
      "total": count(*[_type == "post" && publishedAt < now()])
    }\`,
    { start, end }
  )
}`
  },
  {
    title: 'Next.js Integration',
    description: 'Integrando com páginas Next.js',
    language: 'typescript',
    code: `// app/blog/[slug]/page.tsx
import { getPostBySlug, getAllPosts } from '@/lib/queries'
import { PortableText } from '@portabletext/react'
import { urlFor } from '@/lib/sanity'
import Image from 'next/image'

// Gerar parâmetros estáticos
export async function generateStaticParams() {
  const posts = await getAllPosts()
  
  return posts.map((post) => ({
    slug: post.slug.current
  }))
}

// Gerar metadata
export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const post = await getPostBySlug(params.slug)
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{
        url: urlFor(post.mainImage).width(1200).height(630).url(),
        width: 1200,
        height: 630
      }]
    }
  }
}

export default async function PostPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const post = await getPostBySlug(params.slug)
  
  if (!post) {
    return <div>Post not found</div>
  }
  
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        
        <div className="flex items-center gap-4 text-gray-600 mb-6">
          <span>By {post.author.name}</span>
          <span>•</span>
          <time>{new Date(post.publishedAt).toLocaleDateString()}</time>
        </div>
        
        {post.mainImage && (
          <div className="relative aspect-video mb-8">
            <Image
              src={urlFor(post.mainImage).width(800).height(450).url()}
              alt={post.mainImage.alt || post.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        )}
      </header>
      
      <div className="prose prose-lg max-w-none">
        <PortableText 
          value={post.body}
          components={{
            // Custom components para blocos especiais
            types: {
              image: ({ value }) => (
                <Image
                  src={urlFor(value).width(800).url()}
                  alt={value.alt || ''}
                  width={800}
                  height={400}
                  className="rounded-lg"
                />
              )
            }
          }}
        />
      </div>
    </article>
  )
}`
  }
];

export default function SanityPage() {
  const [activeExample, setActiveExample] = useState(0);
  const [copiedCode, setCopiedCode] = useState<number | null>(null);

  const copyToClipboard = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(index);
    toast.success('Código copiado!');
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs />
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-6">
            <Database className="w-8 h-8 text-orange-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Sanity CMS Integration
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            CMS estruturado com editor em tempo real, GROQ queries e schemas customizáveis
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {sanityFeatures.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-orange-50 rounded-lg mr-3">
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

        {/* Installation Guide */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Instalação e Setup</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">1. Instalar Dependências</h3>
              <div className="bg-gray-900 rounded-lg p-4 relative">
                <button
                  onClick={() => copyToClipboard('npm install sanity @sanity/client @sanity/image-url @portabletext/react', -1)}
                  className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <pre className="text-green-400 text-sm overflow-x-auto">
                  npm install sanity @sanity/client @sanity/image-url @portabletext/react
                </pre>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">2. Configurar Variáveis de Ambiente</h3>
              <div className="bg-gray-900 rounded-lg p-4 relative">
                <button
                  onClick={() => copyToClipboard(`NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token`, -2)}
                  className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <pre className="text-green-400 text-sm overflow-x-auto">
{`NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token`}
                </pre>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">3. Inicializar Sanity Studio</h3>
              <div className="bg-gray-900 rounded-lg p-4 relative">
                <button
                  onClick={() => copyToClipboard('npx sanity init --env', -3)}
                  className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <pre className="text-green-400 text-sm overflow-x-auto">
                  npx sanity init --env
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Code Examples */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Exemplos de Implementação</h2>
            <p className="text-gray-600">Implementações práticas com Sanity CMS</p>
          </div>
          
          <div className="flex border-b border-gray-100 overflow-x-auto">
            {codeExamples.map((example, index) => (
              <button
                key={index}
                onClick={() => setActiveExample(index)}
                className={`flex-shrink-0 px-6 py-4 text-left border-b-2 transition-colors ${
                  activeExample === index
                    ? 'bg-orange-50 border-orange-600 text-orange-700'
                    : 'hover:bg-gray-50 text-gray-600 border-transparent'
                }`}
              >
                <div className="font-medium">{example.title}</div>
                <div className="text-sm opacity-75">{example.description}</div>
              </button>
            ))}
          </div>
          
          <div className="p-6">
            <div className="relative">
              <button
                onClick={() => copyToClipboard(codeExamples[activeExample].code, activeExample)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors z-10"
              >
                {copiedCode === activeExample ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                {codeExamples[activeExample].code}
              </pre>
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <DemoCardStatic
            title="Performance Tips"
            description="Otimizações para melhor performance"
            icon="⚡"
            color="yellow"
            category="CMS"
            tags={['performance', 'optimization', 'sanity']}
          >
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Use CDN para imagens com transformações automáticas
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Implemente cache com ISR para conteúdo dinâmico
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Use projeções GROQ para buscar apenas dados necessários
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Configure webhooks para invalidação de cache
              </li>
            </ul>
          </DemoCardStatic>

          <DemoCardStatic
            title="Security Best Practices"
            description="Práticas de segurança essenciais"
            icon="🔒"
            color="red"
            category="CMS"
            tags={['security', 'best-practices', 'sanity']}
          >
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Use tokens com escopo limitado para diferentes ambientes
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Configure CORS adequadamente no Sanity
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Implemente validação de dados no schema
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Use preview mode apenas em desenvolvimento
              </li>
            </ul>
          </DemoCardStatic>
        </div>

        {/* Resources */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-xl p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Recursos Adicionais</h2>
            <p className="text-orange-100 mb-6">
              Explore a documentação oficial e exemplos avançados
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.sanity.io/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-white text-orange-600 rounded-lg font-medium hover:bg-orange-50 transition-colors"
              >
                <FileText className="w-5 h-5 mr-2" />
                Documentação
              </a>
              <a
                href="https://www.sanity.io/exchange"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-orange-700 text-white rounded-lg font-medium hover:bg-orange-800 transition-colors"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                Sanity Exchange
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}