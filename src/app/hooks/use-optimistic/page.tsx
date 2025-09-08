'use client';

import { useState, useOptimistic, useTransition } from 'react';
import CodeBlock from '@/components/CodeBlock';
import DemoSection from '@/components/DemoSection';

interface Message {
  id: string;
  text: string;
  timestamp: Date;
  status: 'sending' | 'sent' | 'failed';
}

interface Post {
  id: string;
  title: string;
  content: string;
  likes: number;
  isLiked: boolean;
  status: 'saving' | 'saved' | 'failed';
}

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  status: 'updating' | 'updated' | 'failed';
}

// Simular delay de rede
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Simular falha ocasional
const shouldFail = () => Math.random() < 0.3;

export default function UseOptimisticPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            useOptimistic Hook
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            O useOptimistic permite mostrar um estado diferente enquanto uma ação assíncrona está em andamento.
          </p>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg mb-12">
          <h2 className="text-lg font-semibold mb-2 text-blue-900 dark:text-blue-100">
            💡 Conceito Principal
          </h2>
          <p className="text-blue-800 dark:text-blue-200">
            O useOptimistic é ideal para melhorar a experiência do usuário mostrando 
            imediatamente o resultado esperado de uma ação, antes mesmo da confirmação do servidor.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-1.5 mb-12">
          <OptimisticChatExample />
          <OptimisticLikeExample />
        </div>
        
        <div className="mb-12">
          <OptimisticTodoExample />
        </div>
        
        <ExampleCode />
      </div>
    </div>
  );
}

function OptimisticChatExample() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Olá! Como você está?', timestamp: new Date(Date.now() - 60000), status: 'sent' },
    { id: '2', text: 'Tudo bem! E você?', timestamp: new Date(Date.now() - 30000), status: 'sent' }
  ]);
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage: Message) => [...state, newMessage]
  );
  const [isPending, startTransition] = useTransition();
  const [messageText, setMessageText] = useState('');

  const sendMessage = async (text: string) => {
    const tempMessage: Message = {
      id: Date.now().toString(),
      text,
      timestamp: new Date(),
      status: 'sending'
    };

    startTransition(() => {
      addOptimisticMessage(tempMessage);
    });

    try {
      await delay(2000); // Simular delay de rede
      
      if (shouldFail()) {
        throw new Error('Falha no envio');
      }

      setMessages(prev => [...prev, { ...tempMessage, status: 'sent' }]);
    } catch (error) {
      // Em caso de erro, a mensagem otimista será removida automaticamente
      console.error('Erro ao enviar mensagem:', error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageText.trim()) {
      sendMessage(messageText);
      setMessageText('');
    }
  };

  return (
    <DemoSection title="💬 Chat com Mensagens Otimistas">
      <div className="space-y-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          As mensagens aparecem imediatamente, mesmo antes da confirmação do servidor
        </p>
        <div className="h-64 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-lg p-4 space-y-2 bg-white dark:bg-gray-700">
          {optimisticMessages.map((message) => (
            <div key={message.id} className="flex flex-col">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-lg p-3 max-w-xs ml-auto">
                <p className="text-sm text-gray-800 dark:text-gray-200">{message.text}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                  {message.status === 'sending' && (
                    <span className="text-xs text-blue-500">Enviando...</span>
                  )}
                  {message.status === 'sent' && (
                    <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">Enviado</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Digite sua mensagem..."
            disabled={isPending}
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isPending || !messageText.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? 'Enviando...' : 'Enviar'}
          </button>
        </form>
      </div>
    </DemoSection>
  );
}

function OptimisticLikeExample() {
  const [post, setPost] = useState<Post>({
    id: '1',
    title: 'Aprendendo useOptimistic',
    content: 'Este é um exemplo de como usar o hook useOptimistic para melhorar a UX.',
    likes: 42,
    isLiked: false,
    status: 'saved'
  });
  
  const [optimisticPost, updateOptimisticPost] = useOptimistic(
    post,
    (state, { type, value }: { type: 'like' | 'unlike'; value?: any }) => {
      if (type === 'like') {
        return { ...state, likes: state.likes + 1, isLiked: true };
      } else {
        return { ...state, likes: state.likes - 1, isLiked: false };
      }
    }
  );
  
  const [isPending, startTransition] = useTransition();

  const toggleLike = async () => {
    const action = optimisticPost.isLiked ? 'unlike' : 'like';
    
    startTransition(() => {
      updateOptimisticPost({ type: action });
    });

    try {
      await delay(1500);
      
      if (shouldFail()) {
        throw new Error('Falha ao curtir');
      }

      setPost(prev => ({
        ...prev,
        likes: action === 'like' ? prev.likes + 1 : prev.likes - 1,
        isLiked: action === 'like'
      }));
    } catch (error) {
      console.error('Erro ao curtir:', error);
    }
  };

  return (
    <DemoSection title="❤️ Like Button Otimista">
      <div className="space-y-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          O like é aplicado imediatamente, proporcionando feedback instantâneo
        </p>
        <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-white dark:bg-gray-700">
          <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-200">{optimisticPost.title}</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{optimisticPost.content}</p>
          
          <div className="flex items-center gap-4">
            <button
              onClick={toggleLike}
              disabled={isPending}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors disabled:opacity-50 ${
                optimisticPost.isLiked 
                  ? 'bg-red-500 text-white hover:bg-red-600' 
                  : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'
              }`}
            >
              {isPending ? (
                <span className="animate-spin">⏳</span>
              ) : (
                <span className={optimisticPost.isLiked ? '❤️' : '🤍'}></span>
              )}
              {optimisticPost.likes}
            </button>
            
            {isPending && (
              <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">Atualizando...</span>
            )}
          </div>
        </div>
      </div>
    </DemoSection>
  );
}

function OptimisticTodoExample() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: '1', text: 'Estudar React Hooks', completed: false, status: 'updated' },
    { id: '2', text: 'Implementar useOptimistic', completed: true, status: 'updated' },
    { id: '3', text: 'Criar exemplos práticos', completed: false, status: 'updated' }
  ]);
  
  const [optimisticTodos, updateOptimisticTodos] = useOptimistic(
    todos,
    (state, { type, id, text }: { type: 'toggle' | 'add' | 'delete'; id: string; text?: string }) => {
      switch (type) {
        case 'toggle':
          return state.map(todo => 
            todo.id === id 
              ? { ...todo, completed: !todo.completed, status: 'updating' as const }
              : todo
          );
        case 'add':
          return [...state, { id, text: text!, completed: false, status: 'updating' as const }];
        case 'delete':
          return state.filter(todo => todo.id !== id);
        default:
          return state;
      }
    }
  );
  
  const [isPending, startTransition] = useTransition();
  const [newTodo, setNewTodo] = useState('');

  const toggleTodo = async (id: string) => {
    startTransition(() => {
      updateOptimisticTodos({ type: 'toggle', id });
    });

    try {
      await delay(1000);
      
      if (shouldFail()) {
        throw new Error('Falha ao atualizar');
      }

      setTodos(prev => prev.map(todo => 
        todo.id === id 
          ? { ...todo, completed: !todo.completed, status: 'updated' }
          : todo
      ));
    } catch (error) {
      console.error('Erro ao atualizar todo:', error);
    }
  };

  const addTodo = async () => {
    if (!newTodo.trim()) return;
    
    const id = Date.now().toString();
    const text = newTodo;
    
    startTransition(() => {
      updateOptimisticTodos({ type: 'add', id, text });
    });

    try {
      await delay(1500);
      
      if (shouldFail()) {
        throw new Error('Falha ao adicionar');
      }

      setTodos(prev => [...prev, { id, text, completed: false, status: 'updated' }]);
      setNewTodo('');
    } catch (error) {
      console.error('Erro ao adicionar todo:', error);
    }
  };

  const deleteTodo = async (id: string) => {
    startTransition(() => {
      updateOptimisticTodos({ type: 'delete', id });
    });

    try {
      await delay(800);
      
      if (shouldFail()) {
        throw new Error('Falha ao deletar');
      }

      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Erro ao deletar todo:', error);
    }
  };

  return (
    <DemoSection title="✅ Todo List Otimista">
      <div className="space-y-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Todas as operações (adicionar, completar, deletar) são aplicadas imediatamente
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Nova tarefa..."
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <button
            onClick={addTodo}
            disabled={!newTodo.trim()}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Adicionar
          </button>
        </div>
        
        <div className="space-y-2">
          {optimisticTodos.map((todo) => (
            <div key={todo.id} className="flex items-center gap-3 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="h-4 w-4"
              />
              <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-800 dark:text-gray-200'}`}>
                {todo.text}
              </span>
              
              {todo.status === 'updating' && (
                <span className="text-xs text-blue-500 animate-pulse">Atualizando...</span>
              )}
              
              <button
                onClick={() => deleteTodo(todo.id)}
                className="px-2 py-1 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900 rounded transition-colors"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
        
        {isPending && (
          <div className="text-center">
            <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">Sincronizando...</span>
          </div>
        )}
      </div>
    </DemoSection>
  );
}

function ExampleCode() {
  const basicExample = `import { useOptimistic, useTransition } from 'react';

function OptimisticComponent() {
  const [messages, setMessages] = useState([]);
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage) => [...state, newMessage]
  );
  const [isPending, startTransition] = useTransition();

  const sendMessage = async (text) => {
    const tempMessage = {
      id: Date.now(),
      text,
      status: 'sending'
    };

    // Adiciona mensagem otimista imediatamente
    startTransition(() => {
      addOptimisticMessage(tempMessage);
    });

    try {
      // Simula chamada para API
      await fetch('/api/messages', {
        method: 'POST',
        body: JSON.stringify({ text })
      });
      
      // Atualiza estado real após sucesso
      setMessages(prev => [...prev, { ...tempMessage, status: 'sent' }]);
    } catch (error) {
      // Em caso de erro, a mensagem otimista é removida automaticamente
      console.error('Erro ao enviar:', error);
    }
  };

  return (
    <div>
      {optimisticMessages.map(message => (
        <div key={message.id}>
          {message.text}
          {message.status === 'sending' && <span>Enviando...</span>}
        </div>
      ))}
    </div>
  );
}`;

  const advancedExample = `// Exemplo com múltiplas ações otimistas
function useOptimisticPosts() {
  const [posts, setPosts] = useState([]);
  const [optimisticPosts, updateOptimisticPosts] = useOptimistic(
    posts,
    (state, action) => {
      switch (action.type) {
        case 'LIKE':
          return state.map(post => 
            post.id === action.id 
              ? { ...post, likes: post.likes + 1, isLiked: true }
              : post
          );
        case 'UNLIKE':
          return state.map(post => 
            post.id === action.id 
              ? { ...post, likes: post.likes - 1, isLiked: false }
              : post
          );
        case 'ADD_COMMENT':
          return state.map(post => 
            post.id === action.postId 
              ? { 
                  ...post, 
                  comments: [...post.comments, action.comment],
                  commentCount: post.commentCount + 1
                }
              : post
          );
        default:
          return state;
      }
    }
  );

  const likePost = async (postId) => {
    startTransition(() => {
      updateOptimisticPosts({ type: 'LIKE', id: postId });
    });

    try {
      await api.likePost(postId);
      // Atualizar estado real
    } catch (error) {
      // Tratar erro
    }
  };

  return { optimisticPosts, likePost };
}`;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Exemplos de Código</h2>
      
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">Exemplo Básico</h3>
          <CodeBlock code={basicExample} language="tsx" />
        </div>
        
        <hr className="border-gray-200 dark:border-gray-700" />
        
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">Exemplo Avançado</h3>
          <CodeBlock code={advancedExample} language="tsx" />
        </div>
        
        <div className="bg-amber-50 dark:bg-amber-950 p-6 rounded-lg">
          <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-3">
            🎯 Dicas Importantes
          </h4>
          <ul className="text-amber-800 dark:text-amber-200 space-y-2 text-sm">
            <li>• Use useOptimistic com useTransition para melhor performance</li>
            <li>• O estado otimista é revertido automaticamente em caso de erro</li>
            <li>• Ideal para operações que o usuário espera que sejam bem-sucedidas</li>
            <li>• Sempre trate erros adequadamente para uma boa UX</li>
            <li>• Combine com loading states para feedback visual completo</li>
          </ul>
        </div>
      </div>
    </div>
  );
}