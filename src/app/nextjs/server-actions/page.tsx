'use client';

import { useState, useTransition } from 'react';
import CodeBlock from '@/components/CodeBlock';
import DemoSection from '@/components/DemoSection';

// Simulação de Server Actions (normalmente seriam funções do servidor)
const simulateServerAction = async (formData: FormData) => {
  // Simular delay do servidor
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;
  
  // Simular validação
  if (!name || !email || !message) {
    throw new Error('Todos os campos são obrigatórios');
  }
  
  if (!email.includes('@')) {
    throw new Error('Email inválido');
  }
  
  return {
    success: true,
    message: 'Formulário enviado com sucesso!',
    data: { name, email, message }
  };
};

const simulateCreatePost = async (title: string, content: string) => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  if (!title.trim() || !content.trim()) {
    throw new Error('Título e conteúdo são obrigatórios');
  }
  
  return {
    id: Date.now(),
    title: title.trim(),
    content: content.trim(),
    createdAt: new Date().toISOString(),
    author: 'Usuário Demo'
  };
};

const simulateDeletePost = async (id: number) => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return { success: true, deletedId: id };
};

const simulateUpdatePost = async (id: number, title: string, content: string) => {
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  return {
    id,
    title,
    content,
    updatedAt: new Date().toISOString()
  };
};

// Componente de formulário com Server Action
function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    startTransition(async () => {
      try {
        setError('');
        setResult(null);
        const response = await simulateServerAction(formData);
        setResult(response);
        (event.target as HTMLFormElement).reset();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      }
    });
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Nome
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            disabled={isPending}
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            disabled={isPending}
          />
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Mensagem
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            disabled={isPending}
          />
        </div>
        
        <button
          type="submit"
          disabled={isPending}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? 'Enviando...' : 'Enviar Mensagem'}
        </button>
      </form>
      
      {error && (
        <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-lg border border-red-300 dark:border-red-700">
          <p className="text-red-700 dark:text-red-300">{error}</p>
        </div>
      )}
      
      {result && (
        <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-lg border border-green-300 dark:border-green-700">
          <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">{result.message}</h4>
          <pre className="text-sm text-green-700 dark:text-green-300">
            {JSON.stringify(result.data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

// Componente de CRUD de posts
function PostManager() {
  const [posts, setPosts] = useState<any[]>([]);
  const [isPending, startTransition] = useTransition();
  const [editingPost, setEditingPost] = useState<any>(null);
  const [newPost, setNewPost] = useState({ title: '', content: '' });

  const handleCreatePost = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) return;
    
    startTransition(async () => {
      try {
        const post = await simulateCreatePost(newPost.title, newPost.content);
        setPosts(prev => [post, ...prev]);
        setNewPost({ title: '', content: '' });
      } catch (error) {
        console.error('Erro ao criar post:', error);
      }
    });
  };

  const handleDeletePost = (id: number) => {
    startTransition(async () => {
      try {
        await simulateDeletePost(id);
        setPosts(prev => prev.filter(post => post.id !== id));
      } catch (error) {
        console.error('Erro ao deletar post:', error);
      }
    });
  };

  const handleUpdatePost = (post: any) => {
    startTransition(async () => {
      try {
        const updatedPost = await simulateUpdatePost(post.id, post.title, post.content);
        setPosts(prev => prev.map(p => p.id === post.id ? { ...p, ...updatedPost } : p));
        setEditingPost(null);
      } catch (error) {
        console.error('Erro ao atualizar post:', error);
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Criar novo post */}
      <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg border border-blue-300 dark:border-blue-700">
        <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4">Criar Novo Post</h3>
        <div className="space-y-3">
          <input
            type="text"
            value={newPost.title}
            onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Título do post"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            disabled={isPending}
          />
          <textarea
            value={newPost.content}
            onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
            placeholder="Conteúdo do post"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            disabled={isPending}
          />
          <button
            onClick={handleCreatePost}
            disabled={isPending || !newPost.title.trim() || !newPost.content.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
          >
            {isPending ? 'Criando...' : 'Criar Post'}
          </button>
        </div>
      </div>
      
      {/* Lista de posts */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          Posts ({posts.length})
        </h3>
        
        {posts.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">
            Nenhum post criado ainda
          </p>
        ) : (
          posts.map(post => (
            <div key={post.id} className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600">
              {editingPost?.id === post.id ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editingPost.title}
                    onChange={(e) => setEditingPost(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <textarea
                    value={editingPost.content}
                    onChange={(e) => setEditingPost(prev => ({ ...prev, content: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdatePost(editingPost)}
                      disabled={isPending}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors disabled:opacity-50"
                    >
                      {isPending ? 'Salvando...' : 'Salvar'}
                    </button>
                    <button
                      onClick={() => setEditingPost(null)}
                      className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">{post.title}</h4>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingPost(post)}
                        className="px-2 py-1 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600 transition-colors"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        disabled={isPending}
                        className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors disabled:opacity-50"
                      >
                        {isPending ? '...' : 'Deletar'}
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">{post.content}</p>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    <p>Por: {post.author}</p>
                    <p>Criado: {new Date(post.createdAt).toLocaleString()}</p>
                    {post.updatedAt && (
                      <p>Atualizado: {new Date(post.updatedAt).toLocaleString()}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default function ServerActionsPage() {
  const serverActionCode = `// app/actions.ts - Server Actions
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// Action para criar post
export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  
  // Validação
  if (!title || !content) {
    throw new Error('Título e conteúdo são obrigatórios');
  }
  
  // Salvar no banco de dados
  const post = await db.post.create({
    data: { title, content, authorId: 1 }
  });
  
  // Revalidar cache
  revalidatePath('/posts');
  
  // Redirecionar
  redirect(\`/posts/\${post.id}\`);
}

// Action para deletar post
export async function deletePost(id: number) {
  await db.post.delete({ where: { id } });
  revalidatePath('/posts');
}

// Action para atualizar post
export async function updatePost(id: number, formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  
  const post = await db.post.update({
    where: { id },
    data: { title, content }
  });
  
  revalidatePath(\`/posts/\${id}\`);
  return post;
}`;

  const formActionCode = `// app/contact/page.tsx - Formulário com Server Action
import { createMessage } from './actions';

export default function ContactPage() {
  return (
    <form action={createMessage}>
      <input name="name" placeholder="Nome" required />
      <input name="email" type="email" placeholder="Email" required />
      <textarea name="message" placeholder="Mensagem" required />
      <button type="submit">Enviar</button>
    </form>
  );
}

// app/contact/actions.ts
'use server';

export async function createMessage(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;
  
  // Validação
  if (!name || !email || !message) {
    throw new Error('Todos os campos são obrigatórios');
  }
  
  // Salvar mensagem
  await db.message.create({
    data: { name, email, message }
  });
  
  // Enviar email
  await sendEmail({
    to: 'admin@site.com',
    subject: 'Nova mensagem de contato',
    body: \`Nome: \${name}\nEmail: \${email}\nMensagem: \${message}\`
  });
  
  revalidatePath('/contact');
}`;

  const progressiveEnhancementCode = `// Formulário com Progressive Enhancement
'use client';

import { useFormStatus } from 'react-dom';
import { createPost } from './actions';

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Criando...' : 'Criar Post'}
    </button>
  );
}

export default function CreatePostForm() {
  return (
    <form action={createPost}>
      <input name="title" placeholder="Título" required />
      <textarea name="content" placeholder="Conteúdo" required />
      <SubmitButton />
    </form>
  );
}

// Com useFormState para feedback
import { useFormState } from 'react-dom';

const initialState = {
  message: '',
  errors: {},
};

export default function FormWithState() {
  const [state, formAction] = useFormState(createPostWithValidation, initialState);
  
  return (
    <form action={formAction}>
      <input name="title" />
      {state.errors?.title && <p>{state.errors.title}</p>}
      
      <textarea name="content" />
      {state.errors?.content && <p>{state.errors.content}</p>}
      
      <button type="submit">Criar</button>
      {state.message && <p>{state.message}</p>}
    </form>
  );
}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Server Actions
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Demonstração dos Server Actions do Next.js 15.5.2 - funções que executam no servidor e podem ser chamadas diretamente de formulários e componentes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-1.5 mb-12">
          <DemoSection title="Formulário de Contato">
            <ContactForm />
          </DemoSection>

          <DemoSection title="CRUD de Posts">
            <PostManager />
          </DemoSection>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Exemplo: Server Actions</h2>
          <CodeBlock code={serverActionCode} language="tsx" />
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Exemplo: Formulário com Action</h2>
          <CodeBlock code={formActionCode} language="tsx" />
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Exemplo: Progressive Enhancement</h2>
          <CodeBlock code={progressiveEnhancementCode} language="tsx" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">🚀 Vantagens dos Server Actions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Simplicidade:</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Sem necessidade de API routes</li>
                  <li>• Formulários funcionam sem JS</li>
                  <li>• Progressive enhancement</li>
                  <li>• Type-safe por padrão</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Performance:</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Execução no servidor</li>
                  <li>• Menos JavaScript no cliente</li>
                  <li>• Revalidação automática</li>
                  <li>• Streaming de respostas</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">🛠️ Recursos Avançados</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Hooks:</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• <code>useFormStatus</code> - Status do formulário</li>
                  <li>• <code>useFormState</code> - Estado e validação</li>
                  <li>• <code>useOptimistic</code> - Updates otimistas</li>
                  <li>• <code>useTransition</code> - Transições</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Funcionalidades:</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• <code>revalidatePath</code> - Cache</li>
                  <li>• <code>redirect</code> - Navegação</li>
                  <li>• <code>cookies</code> - Gerenciamento</li>
                  <li>• <code>headers</code> - Acesso</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">🎯 Casos de Uso</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1.5">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Formulários</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Contato e feedback</li>
                <li>• Cadastro de usuários</li>
                <li>• Upload de arquivos</li>
                <li>• Configurações</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">CRUD</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Criar posts/artigos</li>
                <li>• Atualizar perfil</li>
                <li>• Deletar conteúdo</li>
                <li>• Gerenciar dados</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Integrações</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• APIs externas</li>
                <li>• Envio de emails</li>
                <li>• Processamento de dados</li>
                <li>• Webhooks</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}