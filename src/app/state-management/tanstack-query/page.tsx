'use client';

import React, { useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { DemoCardStatic } from '@/components/DemoCardStatic';
import { DemoSection } from '@/components/DemoSection';
import { CodeBlock } from '@/components/CodeBlock';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
    },
  },
});

// Mock API functions
const api = {
  // Users
  getUsers: async (): Promise<Array<{ id: number; name: string; email: string; status: string }>> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return [
      { id: 1, name: 'João Silva', email: 'joao@example.com', status: 'active' },
      { id: 2, name: 'Maria Santos', email: 'maria@example.com', status: 'inactive' },
      { id: 3, name: 'Pedro Costa', email: 'pedro@example.com', status: 'active' },
    ];
  },
  
  getUser: async (id: number) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const users = await api.getUsers();
    const user = users.find(u => u.id === id);
    if (!user) throw new Error('User not found');
    return { ...user, bio: `Bio do usuário ${user.name}`, posts: Math.floor(Math.random() * 50) };
  },
  
  createUser: async (userData: { name: string; email: string }) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return {
      id: Date.now(),
      ...userData,
      status: 'active',
      createdAt: new Date().toISOString(),
    };
  },
  
  updateUser: async (id: number, updates: Partial<{ name: string; email: string; status: string }>) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { id, ...updates, updatedAt: new Date().toISOString() };
  },
  
  deleteUser: async (id: number) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return { id, deleted: true };
  },
  
  // Posts with pagination
  getPosts: async ({ pageParam = 0 }: { pageParam?: number }) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const posts = Array.from({ length: 10 }, (_, i) => ({
      id: pageParam * 10 + i + 1,
      title: `Post ${pageParam * 10 + i + 1}`,
      content: `Conteúdo do post ${pageParam * 10 + i + 1}. Lorem ipsum dolor sit amet.`,
      author: `Autor ${Math.floor(Math.random() * 5) + 1}`,
      likes: Math.floor(Math.random() * 100),
      createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
    }));
    
    return {
      posts,
      nextPage: pageParam < 4 ? pageParam + 1 : undefined,
      hasMore: pageParam < 4,
    };
  },
  
  // Search
  searchUsers: async (query: string) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    const allUsers = await api.getUsers();
    return allUsers.filter(user => 
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase())
    );
  },
};

// Components
function BasicQuery() {
  const { data: users, isLoading, error, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: api.getUsers,
  });

  if (isLoading) return <div className="text-center py-4">Carregando usuários...</div>;
  if (error) return <div className="text-red-500 text-center py-4">Erro: {(error as Error).message}</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Usuários ({users?.length})</h3>
        <button
          onClick={() => refetch()}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
        >
          Atualizar
        </button>
      </div>
      
      <div className="space-y-2">
        {users?.map(user => (
          <div key={user.id} className="p-3 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">{user.name}</h4>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
              <span className={`px-2 py-1 rounded text-xs ${
                user.status === 'active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {user.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function UserDetail() {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  
  const { data: user, isLoading, error } = useQuery({
    queryKey: ['user', selectedUserId],
    queryFn: () => api.getUser(selectedUserId!),
    enabled: !!selectedUserId,
  });

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Selecionar Usuário:</label>
        <select
          value={selectedUserId || ''}
          onChange={(e) => setSelectedUserId(Number(e.target.value) || null)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Selecione um usuário</option>
          <option value="1">João Silva</option>
          <option value="2">Maria Santos</option>
          <option value="3">Pedro Costa</option>
        </select>
      </div>
      
      {selectedUserId && (
        <div className="border-t pt-4">
          {isLoading && <div className="text-center py-4">Carregando detalhes...</div>}
          {error && <div className="text-red-500 text-center py-4">Erro: {(error as Error).message}</div>}
          {user && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">{user.name}</h3>
              <div className="space-y-1 text-sm">
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Status:</strong> {user.status}</p>
                <p><strong>Bio:</strong> {user.bio}</p>
                <p><strong>Posts:</strong> {user.posts}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function MutationExample() {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({ name: '', email: '' });
  
  const createUserMutation = useMutation({
    mutationFn: api.createUser,
    onSuccess: () => {
      // Invalidate and refetch users query
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setFormData({ name: '', email: '' });
    },
  });
  
  const updateUserMutation = useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: any }) => api.updateUser(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      createUserMutation.mutate(formData);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Nome"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            placeholder="Email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          disabled={createUserMutation.isPending}
          className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        >
          {createUserMutation.isPending ? 'Criando...' : 'Criar Usuário'}
        </button>
      </form>
      
      {createUserMutation.error && (
        <div className="text-red-500 text-sm">
          Erro: {(createUserMutation.error as Error).message}
        </div>
      )}
      
      {createUserMutation.isSuccess && (
        <div className="text-green-500 text-sm">
          Usuário criado com sucesso!
        </div>
      )}
      
      <div className="border-t pt-4">
        <h4 className="font-medium mb-2">Ações Rápidas:</h4>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => updateUserMutation.mutate({ id: 1, updates: { status: 'inactive' } })}
            disabled={updateUserMutation.isPending}
            className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm disabled:opacity-50"
          >
            Desativar João
          </button>
          <button
            onClick={() => updateUserMutation.mutate({ id: 2, updates: { status: 'active' } })}
            disabled={updateUserMutation.isPending}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm disabled:opacity-50"
          >
            Ativar Maria
          </button>
        </div>
      </div>
    </div>
  );
}

function InfiniteQueryExample() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: api.getPosts,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
  });

  if (isLoading) return <div className="text-center py-4">Carregando posts...</div>;
  if (error) return <div className="text-red-500 text-center py-4">Erro: {(error as Error).message}</div>;

  const allPosts = data?.pages.flatMap(page => page.posts) || [];

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Posts Infinitos ({allPosts.length})</h3>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {allPosts.map(post => (
          <div key={post.id} className="p-3 bg-gray-50 rounded-lg">
            <h4 className="font-medium">{post.title}</h4>
            <p className="text-sm text-gray-600 mt-1">{post.content}</p>
            <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
              <span>Por {post.author}</span>
              <div className="flex gap-3">
                <span>❤️ {post.likes}</span>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {isFetchingNextPage ? 'Carregando...' : 'Carregar Mais'}
        </button>
      )}
      
      {!hasNextPage && allPosts.length > 0 && (
        <div className="text-center text-gray-500 text-sm">
          Todos os posts foram carregados!
        </div>
      )}
    </div>
  );
}

function SearchExample() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  
  // Debounce search query
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchQuery]);
  
  const { data: searchResults, isLoading, error } = useQuery({
    queryKey: ['search', debouncedQuery],
    queryFn: () => api.searchUsers(debouncedQuery),
    enabled: debouncedQuery.length > 0,
  });

  return (
    <div className="space-y-4">
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar usuários..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      {debouncedQuery && (
        <div className="border-t pt-4">
          {isLoading && <div className="text-center py-4">Buscando...</div>}
          {error && <div className="text-red-500 text-center py-4">Erro: {(error as Error).message}</div>}
          {searchResults && (
            <div className="space-y-2">
              <h4 className="font-medium">Resultados ({searchResults.length}):</h4>
              {searchResults.length === 0 ? (
                <p className="text-gray-500 text-sm">Nenhum usuário encontrado.</p>
              ) : (
                searchResults.map(user => (
                  <div key={user.id} className="p-2 bg-yellow-50 rounded">
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-gray-600">{user.email}</div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function TanStackQueryContent() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            TanStack Query - Server State Management
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            TanStack Query (React Query) é a biblioteca definitiva para gerenciar estado do servidor. 
            Oferece caching, sincronização, atualizações em background e muito mais.
          </p>
        </div>

        <DemoSection title="Conceitos Fundamentais">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <DemoCardStatic title="useQuery" description="Buscar e cachear dados">
              <CodeBlock
                language="typescript"
                code={`const { data, isLoading, error } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
  staleTime: 5 * 60 * 1000, // 5 min
  gcTime: 10 * 60 * 1000,   // 10 min
});`}
              />
            </DemoCardStatic>

            <DemoCardStatic title="useMutation" description="Modificar dados no servidor">
              <CodeBlock
                language="typescript"
                code={`const mutation = useMutation({
  mutationFn: createUser,
  onSuccess: () => {
    queryClient.invalidateQueries(['users']);
  },
  onError: (error) => {
    console.error('Error:', error);
  },
});`}
              />
            </DemoCardStatic>
          </div>
        </DemoSection>

        <DemoSection title="Exemplos Práticos">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <DemoCardStatic title="Query Básica" description="Buscar lista de usuários">
              <BasicQuery />
            </DemoCardStatic>

            <DemoCardStatic title="Query Dependente" description="Buscar detalhes baseado em seleção">
              <UserDetail />
            </DemoCardStatic>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <DemoCardStatic title="Mutations" description="Criar e atualizar dados">
              <MutationExample />
            </DemoCardStatic>

            <DemoCardStatic title="Busca com Debounce" description="Search em tempo real">
              <SearchExample />
            </DemoCardStatic>
          </div>
        </DemoSection>

        <DemoSection title="Infinite Query">
          <DemoCardStatic title="Paginação Infinita" description="Carregar dados sob demanda">
            <InfiniteQueryExample />
          </DemoCardStatic>
        </DemoSection>

        <DemoSection title="Recursos Avançados">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">🗄️ Caching</h3>
              <p className="text-blue-800 text-sm mb-3">
                Cache inteligente com invalidação automática.
              </p>
              <CodeBlock
                language="typescript"
                code={`// Cache por 5 minutos
staleTime: 5 * 60 * 1000,

// Garbage collection após 10 min
gcTime: 10 * 60 * 1000`}
              />
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-green-900 mb-2">🔄 Background Updates</h3>
              <p className="text-green-800 text-sm mb-3">
                Atualizações automáticas em background.
              </p>
              <CodeBlock
                language="typescript"
                code={`refetchOnWindowFocus: true,
refetchOnReconnect: true,
refetchInterval: 30000`}
              />
            </div>
            
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">🎯 Optimistic Updates</h3>
              <p className="text-purple-800 text-sm mb-3">
                Atualizações otimistas para UX melhor.
              </p>
              <CodeBlock
                language="typescript"
                code={`onMutate: async (newData) => {
  await queryClient.cancelQueries(['users']);
  const previous = queryClient.getQueryData(['users']);
  queryClient.setQueryData(['users'], newData);
  return { previous };
}`}
              />
            </div>
          </div>
        </DemoSection>

        <DemoSection title="Vantagens do TanStack Query">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-yellow-900 mb-2">⚡ Performance</h3>
              <p className="text-yellow-800">
                Cache inteligente, deduplicação de requests e atualizações otimizadas.
              </p>
            </div>
            
            <div className="bg-red-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-red-900 mb-2">🔧 Developer Experience</h3>
              <p className="text-red-800">
                DevTools poderosas, TypeScript nativo e API intuitiva.
              </p>
            </div>
            
            <div className="bg-indigo-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-indigo-900 mb-2">🌐 Offline Support</h3>
              <p className="text-indigo-800">
                Funciona offline, sincroniza quando volta online e retry automático.
              </p>
            </div>
          </div>
        </DemoSection>

        <DemoSection title="Setup e Configuração">
          <CodeBlock
            language="typescript"
            code={`// 1. Instalar
npm install @tanstack/react-query

// 2. Criar QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10,   // 10 minutes
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
});

// 3. Envolver app com Provider
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <YourApp />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

// 4. Usar em componentes
function Users() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetch('/api/users').then(res => res.json()),
  });
  
  if (isLoading) return 'Loading...';
  if (error) return 'Error!';
  
  return (
    <ul>
      {data.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}`}
          />
        </DemoSection>
      </div>
    </div>
  );
}

export default function TanStackQueryPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <TanStackQueryContent />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}