'use client';

import { useState } from 'react';
import { 
  FileText, 
  Code, 
  Zap, 
  Layers, 
  Eye, 
  Settings,
  CheckCircle,
  Copy,
  ExternalLink,
  Play,
  BookOpen,
  Puzzle,
  Sparkles
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import DemoCardStatic from '@/components/DemoCardStatic';
import { toast } from 'sonner';

const mdxFeatures = [
  {
    title: 'JSX in Markdown',
    description: 'Combine Markdown com componentes React',
    icon: <Code className="w-5 h-5" />,
    benefits: ['Interactive content', 'Reusable components', 'Type safety', 'Rich media']
  },
  {
    title: 'Component Imports',
    description: 'Importe e use qualquer componente React',
    icon: <Puzzle className="w-5 h-5" />,
    benefits: ['Custom components', 'Third-party libs', 'Charts & graphs', 'Interactive demos']
  },
  {
    title: 'Static Generation',
    description: 'Geração estática com performance otimizada',
    icon: <Zap className="w-5 h-5" />,
    benefits: ['Fast loading', 'SEO friendly', 'Build-time processing', 'CDN ready']
  },
  {
    title: 'Syntax Highlighting',
    description: 'Destaque de sintaxe automático para código',
    icon: <Sparkles className="w-5 h-5" />,
    benefits: ['Multiple languages', 'Themes', 'Line numbers', 'Copy button']
  }
];

const codeExamples = [
  {
    title: 'Configuração Básica',
    description: 'Setup do MDX no Next.js',
    language: 'typescript',
    code: `// next.config.js
import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeHighlight,
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }]
    ]
  }
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  experimental: {
    mdxRs: true
  }
}

export default withMDX(nextConfig)`
  },
  {
    title: 'MDX Components',
    description: 'Componentes customizados para MDX',
    language: 'typescript',
    code: `// components/mdx-components.tsx
import type { MDXComponents } from 'mdx/types'
import Image, { ImageProps } from 'next/image'
import Link from 'next/link'
import { CodeBlock } from './code-block'
import { Callout } from './callout'
import { Chart } from './chart'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Elementos HTML customizados
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-semibold text-gray-800 mb-4 mt-8">
        {children}
      </h2>
    ),
    p: ({ children }) => (
      <p className="text-gray-600 leading-relaxed mb-4">
        {children}
      </p>
    ),
    a: ({ href, children }) => (
      <Link 
        href={href as string} 
        className="text-blue-600 hover:text-blue-800 underline"
      >
        {children}
      </Link>
    ),
    img: (props) => (
      <Image
        {...(props as ImageProps)}
        className="rounded-lg shadow-md"
        width={800}
        height={400}
      />
    ),
    pre: ({ children }) => (
      <CodeBlock>{children}</CodeBlock>
    ),
    
    // Componentes customizados
    Callout,
    Chart,
    CodeBlock,
    
    // Wrapper para layout
    wrapper: ({ children }) => (
      <article className="prose prose-lg max-w-4xl mx-auto">
        {children}
      </article>
    ),
    
    ...components
  }
}`
  },
  {
    title: 'Frontmatter & Metadata',
    description: 'Gerenciando metadados em arquivos MDX',
    language: 'typescript',
    code: `// lib/mdx.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { compileMDX } from 'next-mdx-remote/rsc'
import { useMDXComponents } from '@/components/mdx-components'

const contentDirectory = path.join(process.cwd(), 'content')

export interface PostMeta {
  title: string
  description: string
  date: string
  author: string
  tags: string[]
  published: boolean
  image?: string
  readTime?: number
}

export interface Post {
  meta: PostMeta
  slug: string
  content: React.ReactElement
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const filePath = path.join(contentDirectory, \`\${slug}.mdx\`)
    const fileContent = fs.readFileSync(filePath, 'utf8')
    
    const { data, content } = matter(fileContent)
    
    const { content: mdxContent } = await compileMDX<PostMeta>({
      source: content,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [],
          rehypePlugins: []
        }
      },
      components: useMDXComponents({})
    })
    
    return {
      meta: {
        ...data,
        readTime: calculateReadTime(content)
      } as PostMeta,
      slug,
      content: mdxContent
    }
  } catch (error) {
    return null
  }
}

export async function getAllPosts(): Promise<Post[]> {
  const files = fs.readdirSync(contentDirectory)
  const posts = await Promise.all(
    files
      .filter(file => file.endsWith('.mdx'))
      .map(async file => {
        const slug = file.replace('.mdx', '')
        return getPostBySlug(slug)
      })
  )
  
  return posts
    .filter((post): post is Post => post !== null)
    .filter(post => post.meta.published)
    .sort((a, b) => 
      new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
    )
}

function calculateReadTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}`
  },
  {
    title: 'Dynamic MDX Pages',
    description: 'Páginas dinâmicas com MDX',
    language: 'typescript',
    code: `// app/blog/[slug]/page.tsx
import { getPostBySlug, getAllPosts } from '@/lib/mdx'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Image from 'next/image'

interface Props {
  params: { slug: string }
}

// Gerar parâmetros estáticos
export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map(post => ({
    slug: post.slug
  }))
}

// Gerar metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: 'Post não encontrado'
    }
  }
  
  return {
    title: post.meta.title,
    description: post.meta.description,
    authors: [{ name: post.meta.author }],
    keywords: post.meta.tags,
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      type: 'article',
      publishedTime: post.meta.date,
      authors: [post.meta.author],
      tags: post.meta.tags,
      images: post.meta.image ? [{
        url: post.meta.image,
        width: 1200,
        height: 630,
        alt: post.meta.title
      }] : []
    },
    twitter: {
      card: 'summary_large_image',
      title: post.meta.title,
      description: post.meta.description,
      images: post.meta.image ? [post.meta.image] : []
    }
  }
}

export default async function PostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug)
  
  if (!post) {
    notFound()
  }
  
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              {post.meta.title}
            </h1>
            
            <div className="flex items-center justify-center gap-1.5 text-gray-600 mb-8">
              <span>Por {post.meta.author}</span>
              <span>•</span>
              <time>{new Date(post.meta.date).toLocaleDateString('pt-BR')}</time>
              <span>•</span>
              <span>{post.meta.readTime} min de leitura</span>
            </div>
            
            {post.meta.image && (
              <div className="relative aspect-video max-w-4xl mx-auto mb-8">
                <Image
                  src={post.meta.image}
                  alt={post.meta.title}
                  fill
                  className="object-cover rounded-xl shadow-lg"
                  priority
                />
              </div>
            )}
            
            {/* Tags */}
            <div className="flex flex-wrap justify-center gap-2">
              {post.meta.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </header>
        
        {/* Content */}
        <main>
          {post.content}
        </main>
      </div>
    </div>
  )
}`
  },
  {
    title: 'Custom Components',
    description: 'Componentes interativos para MDX',
    language: 'typescript',
    code: `// components/callout.tsx
import { ReactNode } from 'react'
import { AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-react'

interface CalloutProps {
  type?: 'info' | 'warning' | 'success' | 'error'
  title?: string
  children: ReactNode
}

export function Callout({ 
  type = 'info', 
  title, 
  children 
}: CalloutProps) {
  const styles = {
    info: {
      container: 'bg-blue-50 border-blue-200 text-blue-800',
      icon: <Info className="w-5 h-5" />,
      iconColor: 'text-blue-600'
    },
    warning: {
      container: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      icon: <AlertTriangle className="w-5 h-5" />,
      iconColor: 'text-yellow-600'
    },
    success: {
      container: 'bg-green-50 border-green-200 text-green-800',
      icon: <CheckCircle className="w-5 h-5" />,
      iconColor: 'text-green-600'
    },
    error: {
      container: 'bg-red-50 border-red-200 text-red-800',
      icon: <XCircle className="w-5 h-5" />,
      iconColor: 'text-red-600'
    }
  }
  
  const style = styles[type]
  
  return (
    <div className={\`p-4 border rounded-lg my-6 \${style.container}\`}>
      <div className="flex items-start gap-3">
        <div className={style.iconColor}>
          {style.icon}
        </div>
        <div className="flex-1">
          {title && (
            <h4 className="font-semibold mb-2">{title}</h4>
          )}
          <div className="prose prose-sm max-w-none">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

// components/code-block.tsx
import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface CodeBlockProps {
  children: ReactNode
  language?: string
  filename?: string
}

export function CodeBlock({ 
  children, 
  language, 
  filename 
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  
  const copyCode = () => {
    const code = extractTextFromChildren(children)
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  
  return (
    <div className="relative group my-6">
      {filename && (
        <div className="bg-gray-800 text-gray-300 px-4 py-2 text-sm font-mono rounded-t-lg border-b border-gray-700">
          {filename}
        </div>
      )}
      
      <div className="relative">
        <button
          onClick={copyCode}
          className="absolute top-3 right-3 p-2 bg-gray-700 hover:bg-gray-600 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4 text-gray-300" />
          )}
        </button>
        
        <pre className={\`bg-gray-900 text-gray-100 p-4 overflow-x-auto text-sm \${
          filename ? 'rounded-b-lg' : 'rounded-lg'
        }\`}>
          {children}
        </pre>
      </div>
    </div>
  )
}

function extractTextFromChildren(children: ReactNode): string {
  if (typeof children === 'string') return children
  if (Array.isArray(children)) {
    return children.map(extractTextFromChildren).join('')
  }
  if (children && typeof children === 'object' && 'props' in children) {
    return extractTextFromChildren(children.props.children)
  }
  return ''
}`
  }
];

export default function MDXPage() {
  const [activeExample, setActiveExample] = useState(0);
  const [copiedCode, setCopiedCode] = useState<number | null>(null);

  const copyToClipboard = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(index);
    toast.success('Código copiado!');
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs />
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            MDX Integration
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Combine Markdown com componentes React para criar conteúdo interativo e dinâmico
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1.5 mb-12">
          {mdxFeatures.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-blue-50 rounded-lg mr-3">
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
                  onClick={() => copyToClipboard('npm install @next/mdx @mdx-js/loader @mdx-js/react remark-gfm rehype-highlight', -1)}
                  className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <pre className="text-green-400 text-sm overflow-x-auto">
                  npm install @next/mdx @mdx-js/loader @mdx-js/react remark-gfm rehype-highlight
                </pre>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">2. Configurar next.config.js</h3>
              <div className="bg-gray-900 rounded-lg p-4 relative">
                <button
                  onClick={() => copyToClipboard(`import createMDX from '@next/mdx'

const withMDX = createMDX({
  // Adicione plugins aqui
})

export default withMDX({
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx']
})`, -2)}
                  className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <pre className="text-green-400 text-sm overflow-x-auto">
{`import createMDX from '@next/mdx'

const withMDX = createMDX({
  // Adicione plugins aqui
})

export default withMDX({
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx']
})`}
                </pre>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">3. Criar mdx-components.tsx</h3>
              <div className="bg-gray-900 rounded-lg p-4 relative">
                <button
                  onClick={() => copyToClipboard(`import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  }
}`, -3)}
                  className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <pre className="text-green-400 text-sm overflow-x-auto">
{`import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  }
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Code Examples */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Exemplos de Implementação</h2>
            <p className="text-gray-600">Implementações práticas com MDX</p>
          </div>
          
          <div className="flex border-b border-gray-100 overflow-x-auto">
            {codeExamples.map((example, index) => (
              <button
                key={index}
                onClick={() => setActiveExample(index)}
                className={`flex-shrink-0 px-6 py-4 text-left border-b-2 transition-colors ${
                  activeExample === index
                    ? 'bg-blue-50 border-blue-600 text-blue-700'
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

        {/* MDX Example */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-1.5 mb-8">
          <DemoCardStatic
            title="MDX File Example"
            description="Exemplo de arquivo MDX com frontmatter"
            icon="📝"
            color="blue"
            category="CMS"
            tags={['mdx', 'frontmatter', 'content']}
          >
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-2">content/example.mdx</div>
              <pre className="text-xs bg-gray-900 text-green-400 p-3 rounded overflow-x-auto">
{`---
title: "Meu Primeiro Post MDX"
description: "Exemplo de post com MDX"
date: "2024-01-15"
author: "João Silva"
tags: ["react", "mdx", "tutorial"]
published: true
---

# {title}

Este é um exemplo de **MDX** em ação!

<Callout type="info" title="Dica">
  Você pode usar componentes React diretamente no MDX!
</Callout>

## Código Interativo

\`\`\`jsx
function HelloWorld() {
  return <h1>Hello, MDX!</h1>
}
\`\`\`

<Chart data={chartData} />`}
              </pre>
            </div>
          </DemoCardStatic>

          <DemoCardStatic
            title="Advanced Features"
            description="Recursos avançados do MDX"
            icon="⚡"
            color="purple"
            category="CMS"
            tags={['advanced', 'features', 'mdx']}
          >
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Importação dinâmica de componentes
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Plugins remark e rehype para processamento
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Syntax highlighting automático
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Geração de TOC (Table of Contents)
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Links automáticos para headings
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Suporte a matemática com KaTeX
              </li>
            </ul>
          </DemoCardStatic>
        </div>

        {/* Resources */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Recursos e Documentação</h2>
            <p className="text-blue-100 mb-6">
              Explore mais sobre MDX e suas possibilidades
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://mdxjs.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Documentação MDX
              </a>
              <a
                href="https://nextjs.org/docs/app/building-your-application/configuring/mdx"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-blue-700 text-white rounded-lg font-medium hover:bg-blue-800 transition-colors"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                Next.js + MDX
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}