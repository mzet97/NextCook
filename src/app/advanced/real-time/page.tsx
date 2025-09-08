'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Radio, 
  MessageCircle, 
  Activity,
  Wifi,
  Server,
  Globe,
  Settings,
  Code,
  FileText,
  CheckCircle,
  ArrowRight,
  Send,
  Clock,
  Eye,
  Heart,
  Share
} from 'lucide-react';
import { DemoCard } from '@/components/DemoCard';
import { DemoCardStatic } from '@/components/DemoCardStatic';
import { DemoSection } from '@/components/DemoSection';
import { CodeBlock } from '@/components/CodeBlock';

const realTimeFeatures = [
  {
    title: 'WebSockets',
    description: 'Comunicação bidirecional em tempo real',
    icon: Zap,
    color: 'text-blue-500',
    benefits: ['Bidirectional', 'Low Latency', 'Full Duplex', 'Real-time']
  },
  {
    title: 'Server-Sent Events',
    description: 'Stream de dados do servidor para cliente',
    icon: Radio,
    color: 'text-green-500',
    benefits: ['Unidirectional', 'Auto Reconnect', 'Simple Setup', 'HTTP Based']
  },
  {
    title: 'Real-time Chat',
    description: 'Sistema de mensagens instantâneas',
    icon: MessageCircle,
    color: 'text-purple-500',
    benefits: ['Instant Messages', 'Typing Indicators', 'Online Status', 'Message History']
  },
  {
    title: 'Live Updates',
    description: 'Atualizações automáticas de conteúdo',
    icon: Activity,
    color: 'text-orange-500',
    benefits: ['Auto Refresh', 'Live Data', 'Push Updates', 'Sync State']
  }
];

const comparisonData = [
  {
    feature: 'Direção',
    websockets: 'Bidirecional',
    sse: 'Unidirecional (Server → Client)',
    polling: 'Unidirecional (Client → Server)'
  },
  {
    feature: 'Protocolo',
    websockets: 'WebSocket (ws://)',
    sse: 'HTTP (text/event-stream)',
    polling: 'HTTP (JSON/XML)'
  },
  {
    feature: 'Reconexão',
    websockets: 'Manual',
    sse: 'Automática',
    polling: 'Não aplicável'
  },
  {
    feature: 'Overhead',
    websockets: 'Baixo',
    sse: 'Médio',
    polling: 'Alto'
  },
  {
    feature: 'Complexidade',
    websockets: 'Alta',
    sse: 'Baixa',
    polling: 'Muito Baixa'
  },
  {
    feature: 'Suporte Browser',
    websockets: 'Moderno',
    sse: 'Amplo',
    polling: 'Universal'
  }
];

const configurationExamples = [
  {
    name: 'WebSocket Setup',
    description: 'Configuração de WebSocket com Socket.io',
    files: [
      {
        name: 'server/websocket.ts',
        content: `import { Server } from 'socket.io'
import { createServer } from 'http'
import { parse } from 'url'
import next from 'next'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url!, true)
    handle(req, res, parsedUrl)
  })

  const io = new Server(server, {
    cors: {
      origin: process.env.NEXT_PUBLIC_CLIENT_URL || "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  })

  // Namespace para chat
  const chatNamespace = io.of('/chat')
  
  chatNamespace.on('connection', (socket) => {
    console.log('User connected:', socket.id)

    // Join room
    socket.on('join-room', (roomId: string) => {
      socket.join(roomId)
      socket.to(roomId).emit('user-joined', {
        userId: socket.id,
        timestamp: new Date().toISOString()
      })
    })

    // Handle messages
    socket.on('send-message', (data: {
      roomId: string
      message: string
      userId: string
      username: string
    }) => {
      const messageData = {
        id: Date.now().toString(),
        ...data,
        timestamp: new Date().toISOString()
      }
      
      // Send to all users in room
      chatNamespace.to(data.roomId).emit('receive-message', messageData)
    })

    // Typing indicators
    socket.on('typing-start', (data: { roomId: string; username: string }) => {
      socket.to(data.roomId).emit('user-typing', data)
    })

    socket.on('typing-stop', (data: { roomId: string; username: string }) => {
      socket.to(data.roomId).emit('user-stopped-typing', data)
    })

    // Handle disconnect
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id)
    })
  })

  // Namespace para notificações
  const notificationNamespace = io.of('/notifications')
  
  notificationNamespace.on('connection', (socket) => {
    socket.on('subscribe', (userId: string) => {
      socket.join(\`user-\${userId}\`)
    })
  })

  // Função para enviar notificação
  const sendNotification = (userId: string, notification: Record<string, unknown>) => {
    notificationNamespace.to(\`user-\${userId}\`).emit('notification', notification)
  }

  server.listen(3001, () => {
    console.log('> Ready on http://localhost:3001')
  })
})`
      },
      {
        name: 'hooks/useSocket.ts',
        content: `import { useEffect, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'

interface UseSocketOptions {
  namespace?: string
  autoConnect?: boolean
}

export function useSocket(options: UseSocketOptions = {}) {
  const { namespace = '', autoConnect = true } = options
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    if (!autoConnect) return

    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001'
    const socket = io(\`\${socketUrl}\${namespace}\`, {
      transports: ['websocket', 'polling'],
      timeout: 20000,
      forceNew: true
    })

    socketRef.current = socket

    socket.on('connect', () => {
      setIsConnected(true)
      setError(null)
      console.log('Connected to socket server')
    })

    socket.on('disconnect', () => {
      setIsConnected(false)
      console.log('Disconnected from socket server')
    })

    socket.on('connect_error', (err) => {
      setError(err.message)
      setIsConnected(false)
      console.error('Socket connection error:', err)
    })

    return () => {
      socket.disconnect()
    }
  }, [namespace, autoConnect])

  const emit = (event: string, data?: Record<string, unknown>) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit(event, data)
    }
  }

  const on = (event: string, callback: (...args: unknown[]) => void) => {
    socketRef.current?.on(event, callback)
  }

  const off = (event: string, callback?: (...args: unknown[]) => void) => {
    socketRef.current?.off(event, callback)
  }

  const connect = () => {
    if (!socketRef.current?.connected) {
      socketRef.current?.connect()
    }
  }

  const disconnect = () => {
    socketRef.current?.disconnect()
  }

  return {
    socket: socketRef.current,
    isConnected,
    error,
    emit,
    on,
    off,
    connect,
    disconnect
  }
}`
      },
      {
        name: 'components/ChatRoom.tsx',
        content: `'use client'

import { useState, useEffect, useRef } from 'react'
import { Send, User } from 'lucide-react'
import { useSocket } from '@/hooks/useSocket'

interface Message {
  id: string
  userId: string
  username: string
  message: string
  timestamp: string
}

interface ChatRoomProps {
  roomId: string
  userId: string
  username: string
}

export function ChatRoom({ roomId, userId, username }: ChatRoomProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [typingUsers, setTypingUsers] = useState<string[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const typingTimeoutRef = useRef<NodeJS.Timeout>()
  
  const { isConnected, emit, on, off } = useSocket({ namespace: '/chat' })

  useEffect(() => {
    if (isConnected) {
      emit('join-room', roomId)
    }
  }, [isConnected, roomId, emit])

  useEffect(() => {
    const handleReceiveMessage = (message: Message) => {
      setMessages(prev => [...prev, message])
    }

    const handleUserTyping = ({ username: typingUsername }: { username: string }) => {
      setTypingUsers(prev => 
        prev.includes(typingUsername) ? prev : [...prev, typingUsername]
      )
    }

    const handleUserStoppedTyping = ({ username: typingUsername }: { username: string }) => {
      setTypingUsers(prev => prev.filter(user => user !== typingUsername))
    }

    on('receive-message', handleReceiveMessage)
    on('user-typing', handleUserTyping)
    on('user-stopped-typing', handleUserStoppedTyping)

    return () => {
      off('receive-message', handleReceiveMessage)
      off('user-typing', handleUserTyping)
      off('user-stopped-typing', handleUserStoppedTyping)
    }
  }, [on, off])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !isConnected) return

    emit('send-message', {
      roomId,
      message: newMessage,
      userId,
      username
    })

    setNewMessage('')
    handleStopTyping()
  }

  const handleTyping = (value: string) => {
    setNewMessage(value)
    
    if (!isTyping && value.trim()) {
      setIsTyping(true)
      emit('typing-start', { roomId, username })
    }

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    // Set new timeout
    typingTimeoutRef.current = setTimeout(() => {
      handleStopTyping()
    }, 1000)
  }

  const handleStopTyping = () => {
    if (isTyping) {
      setIsTyping(false)
      emit('typing-stop', { roomId, username })
    }
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }
  }

  return (
    <div className="flex flex-col h-96 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Chat Room: {roomId}
          </h3>
          <div className={\`flex items-center space-x-2 \${
            isConnected ? 'text-green-600' : 'text-red-600'
          }\`}>
            <div className={\`w-2 h-2 rounded-full \${
              isConnected ? 'bg-green-500' : 'bg-red-500'
            }\`} />
            <span className="text-sm">
              {isConnected ? 'Conectado' : 'Desconectado'}
            </span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={\`flex \${message.userId === userId ? 'justify-end' : 'justify-start'}\`}
          >
            <div className={\`max-w-xs lg:max-w-md px-3 py-2 rounded-lg \${
              message.userId === userId
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
            }\`}>
              {message.userId !== userId && (
                <div className="text-xs font-medium mb-1 opacity-75">
                  {message.username}
                </div>
              )}
              <div className="text-sm">{message.message}</div>
              <div className="text-xs opacity-75 mt-1">
                {new Date(message.timestamp).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
        
        {/* Typing indicators */}
        {typingUsers.length > 0 && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {typingUsers.join(', ')} {typingUsers.length === 1 ? 'está' : 'estão'} digitando...
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => handleTyping(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            disabled={!isConnected}
          />
          <button
            type="submit"
            disabled={!newMessage.trim() || !isConnected}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  )
}`
      }
    ]
  },
  {
    name: 'Server-Sent Events',
    description: 'Implementação de SSE para atualizações em tempo real',
    files: [
      {
        name: 'api/events/route.ts',
        content: `import { NextRequest } from 'next/server'

// Simular dados em tempo real
const generateRandomData = () => ({
  timestamp: new Date().toISOString(),
  value: Math.floor(Math.random() * 100),
  status: Math.random() > 0.8 ? 'warning' : 'normal',
  users: Math.floor(Math.random() * 1000) + 100,
  revenue: (Math.random() * 10000).toFixed(2)
})

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const channel = searchParams.get('channel') || 'default'

  // Configurar headers para SSE
  const headers = new Headers({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Cache-Control'
  })

  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    start(controller) {
      // Enviar dados iniciais
      const initialData = generateRandomData()
      const initialMessage = \`data: \${JSON.stringify({
        type: 'initial',
        channel,
        data: initialData
      })}\n\n\`
      controller.enqueue(encoder.encode(initialMessage))

      // Configurar intervalo para enviar dados
      const interval = setInterval(() => {
        try {
          const data = generateRandomData()
          const message = \`data: \${JSON.stringify({
            type: 'update',
            channel,
            data
          })}\n\n\`
          controller.enqueue(encoder.encode(message))
        } catch (error) {
          console.error('Error sending SSE data:', error)
          clearInterval(interval)
          controller.close()
        }
      }, 2000) // Enviar dados a cada 2 segundos

      // Cleanup quando a conexão for fechada
      request.signal.addEventListener('abort', () => {
        clearInterval(interval)
        controller.close()
      })
    }
  })

  return new Response(stream, { headers })
}

// Endpoint para eventos específicos
export async function POST(request: NextRequest) {
  const body = await request.json()
  const { event, data, channel = 'default' } = body

  // Aqui você pode processar eventos específicos
  // e enviar notificações para clientes conectados
  
  return Response.json({
    success: true,
    message: 'Event processed',
    event,
    channel
  })
}`
      },
      {
        name: 'hooks/useServerSentEvents.ts',
        content: `import { useEffect, useRef, useState } from 'react'

interface SSEOptions {
  channel?: string
  autoConnect?: boolean
  reconnectInterval?: number
  maxReconnectAttempts?: number
}

interface SSEData {
  type: string
  channel: string
  data: Record<string, unknown>
}

export function useServerSentEvents(options: SSEOptions = {}) {
  const {
    channel = 'default',
    autoConnect = true,
    reconnectInterval = 3000,
    maxReconnectAttempts = 5
  } = options

  const [isConnected, setIsConnected] = useState(false)
  const [data, setData] = useState<Record<string, unknown> | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [reconnectAttempts, setReconnectAttempts] = useState(0)
  
  const eventSourceRef = useRef<EventSource | null>(null)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>()

  const connect = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close()
    }

    const url = \`/api/events?channel=\${channel}\`
    const eventSource = new EventSource(url)
    eventSourceRef.current = eventSource

    eventSource.onopen = () => {
      setIsConnected(true)
      setError(null)
      setReconnectAttempts(0)
      console.log('SSE connection opened')
    }

    eventSource.onmessage = (event) => {
      try {
        const parsedData: SSEData = JSON.parse(event.data)
        setData(parsedData.data)
      } catch (err) {
        console.error('Error parsing SSE data:', err)
      }
    }

    eventSource.onerror = (event) => {
      setIsConnected(false)
      setError('Connection error')
      console.error('SSE error:', event)

      // Tentar reconectar
      if (reconnectAttempts < maxReconnectAttempts) {
        reconnectTimeoutRef.current = setTimeout(() => {
          setReconnectAttempts(prev => prev + 1)
          connect()
        }, reconnectInterval)
      } else {
        setError('Max reconnection attempts reached')
      }
    }
  }

  const disconnect = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close()
      eventSourceRef.current = null
    }
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
    }
    setIsConnected(false)
  }

  useEffect(() => {
    if (autoConnect) {
      connect()
    }

    return () => {
      disconnect()
    }
  }, [channel, autoConnect])

  return {
    isConnected,
    data,
    error,
    reconnectAttempts,
    connect,
    disconnect
  }
}`
      },
      {
        name: 'components/LiveDashboard.tsx',
        content: `'use client'

import { useState } from 'react'
import { Activity, Users, DollarSign, TrendingUp, Wifi, WifiOff } from 'lucide-react'
import { useServerSentEvents } from '@/hooks/useServerSentEvents'

interface DashboardData {
  timestamp: string
  value: number
  status: 'normal' | 'warning'
  users: number
  revenue: string
}

export function LiveDashboard() {
  const [selectedChannel, setSelectedChannel] = useState('analytics')
  const { isConnected, data, error, reconnectAttempts } = useServerSentEvents({
    channel: selectedChannel
  })

  const dashboardData: DashboardData = data || {
    timestamp: new Date().toISOString(),
    value: 0,
    status: 'normal',
    users: 0,
    revenue: '0.00'
  }

  const channels = [
    { id: 'analytics', name: 'Analytics', icon: Activity },
    { id: 'users', name: 'Users', icon: Users },
    { id: 'revenue', name: 'Revenue', icon: DollarSign }
  ]

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          {isConnected ? (
            <Wifi className="h-5 w-5 text-green-500" />
          ) : (
            <WifiOff className="h-5 w-5 text-red-500" />
          )}
          <div>
            <div className="font-medium text-gray-900 dark:text-white">
              {isConnected ? 'Conectado' : 'Desconectado'}
            </div>
            {error && (
              <div className="text-sm text-red-600 dark:text-red-400">
                {error} {reconnectAttempts > 0 && \`(Tentativa \${reconnectAttempts})\`}
              </div>
            )}
          </div>
        </div>
        
        {/* Channel Selector */}
        <div className="flex space-x-2">
          {channels.map((channel) => {
            const Icon = channel.icon
            return (
              <button
                key={channel.id}
                onClick={() => setSelectedChannel(channel.id)}
                className={\`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors \${
                  selectedChannel === channel.id
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }\`}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm">{channel.name}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Live Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-1.5">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Valor Atual</p>
              <p className={\`text-2xl font-bold \${
                dashboardData.status === 'warning' ? 'text-orange-600' : 'text-green-600'
              }\`}>
                {dashboardData.value}
              </p>
            </div>
            <Activity className={\`h-8 w-8 \${
              dashboardData.status === 'warning' ? 'text-orange-500' : 'text-green-500'
            }\`} />
          </div>
          <div className="mt-2">
            <span className={\`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium \${
              dashboardData.status === 'warning'
                ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
                : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
            }\`}>
              {dashboardData.status === 'warning' ? 'Atenção' : 'Normal'}
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Usuários Online</p>
              <p className="text-2xl font-bold text-blue-600">
                {dashboardData.users.toLocaleString()}
              </p>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </div>
          <div className="mt-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Atualizado em tempo real
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Receita</p>
              <p className="text-2xl font-bold text-green-600">
                R$ {parseFloat(dashboardData.revenue).toLocaleString('pt-BR', {
                  minimumFractionDigits: 2
                })}
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-green-500" />
          </div>
          <div className="mt-2">
            <span className="inline-flex items-center text-xs text-green-600 dark:text-green-400">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12.5% vs ontem
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Última Atualização</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {new Date(dashboardData.timestamp).toLocaleTimeString('pt-BR')}
              </p>
            </div>
            <div className={\`w-3 h-3 rounded-full \${
              isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'
            }\`} />
          </div>
          <div className="mt-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Canal: {selectedChannel}
            </span>
          </div>
        </div>
      </div>

      {/* Live Activity Feed */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Feed de Atividades em Tempo Real
          </h3>
        </div>
        <div className="p-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <div className="flex-1">
                <p className="text-sm text-gray-900 dark:text-white">
                  Novo dado recebido: {dashboardData.value}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(dashboardData.timestamp).toLocaleString('pt-BR')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}`
      }
    ]
  }
];

export default function RealTimePage() {
  const [selectedConfig, setSelectedConfig] = useState(0);
  const [selectedFile, setSelectedFile] = useState(0);
  const [selectedComparison, setSelectedComparison] = useState('websockets');

  // Demo Chat State
  const [chatMessages, setChatMessages] = useState([
    { id: '1', user: 'Alice', message: 'Olá pessoal!', time: '14:30' },
    { id: '2', user: 'Bob', message: 'Oi Alice! Como vai?', time: '14:31' },
    { id: '3', user: 'Carol', message: 'Tudo bem por aqui 👋', time: '14:32' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    const message = {
      id: Date.now().toString(),
      user: 'Você',
      message: newMessage,
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl text-white mr-4">
              <Zap className="h-8 w-8" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
              Real-time Features
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Implemente comunicação em tempo real com WebSockets, Server-Sent Events 
            e outras tecnologias para criar experiências interativas.
          </p>
        </motion.div>

        {/* Features */}
        <DemoSection title="Tecnologias Real-time" description="Diferentes abordagens para comunicação em tempo real">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-1.5 mb-8">
            {realTimeFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <DemoCardStatic title={feature.title} description={feature.description}>
                    <div className="space-y-4">
                      <Icon className={`h-12 w-12 mx-auto ${feature.color}`} />
                      <div className="space-y-2">
                        {feature.benefits.map((benefit) => (
                          <div key={benefit} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                            <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                            {benefit}
                          </div>
                        ))}
                      </div>
                    </div>
                  </DemoCardStatic>
                </motion.div>
              );
            })}
          </div>
        </DemoSection>

        {/* Technology Comparison */}
        <DemoSection title="Comparação de Tecnologias" description="WebSockets vs Server-Sent Events vs Polling">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Característica
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      WebSockets
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Server-Sent Events
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Polling
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                  {comparisonData.map((row, index) => (
                    <tr key={row.feature} className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {row.feature}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        {row.websockets}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        {row.sse}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        {row.polling}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </DemoSection>

        {/* Live Demo */}
        <DemoSection title="Demo Interativo" description="Exemplo de chat em tempo real">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="grid lg:grid-cols-2 gap-1.5">
              {/* Chat Demo */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2 text-blue-500" />
                  Chat Demo
                </h3>
                
                <div className="border border-gray-200 dark:border-gray-600 rounded-lg">
                  {/* Messages */}
                  <div className="h-64 overflow-y-auto p-4 space-y-3">
                    {chatMessages.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.user === 'Você' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs px-3 py-2 rounded-lg ${
                          msg.user === 'Você'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                        }`}>
                          {msg.user !== 'Você' && (
                            <div className="text-xs font-medium mb-1 opacity-75">
                              {msg.user}
                            </div>
                          )}
                          <div className="text-sm">{msg.message}</div>
                          <div className="text-xs opacity-75 mt-1">{msg.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Input */}
                  <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-600">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Digite sua mensagem..."
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Send className="h-4 w-4" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              
              {/* Live Metrics */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-green-500" />
                  Métricas em Tempo Real
                </h3>
                
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-300">Usuários Online</span>
                      <span className="text-lg font-bold text-blue-600">1,234</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-300">Mensagens/min</span>
                      <span className="text-lg font-bold text-green-600">89</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-300">Latência</span>
                      <span className="text-lg font-bold text-orange-600">45ms</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div className="bg-orange-600 h-2 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DemoSection>

        {/* Configuration Examples */}
        <DemoSection title="Implementação" description="Código para implementar funcionalidades real-time">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8 px-6 overflow-x-auto">
                {configurationExamples.map((config, index) => (
                  <button
                    key={config.name}
                    onClick={() => setSelectedConfig(index)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                      selectedConfig === index
                        ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    {config.name}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {configurationExamples[selectedConfig].name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {configurationExamples[selectedConfig].description}
                </p>
              </div>
              
              {/* File Tabs */}
              <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
                <nav className="flex space-x-4">
                  {configurationExamples[selectedConfig].files.map((file, index) => (
                    <button
                      key={file.name}
                      onClick={() => setSelectedFile(index)}
                      className={`py-2 px-3 border-b-2 font-medium text-sm transition-colors ${
                        selectedFile === index
                          ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                          : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                      }`}
                    >
                      {file.name}
                    </button>
                  ))}
                </nav>
              </div>
              
              <CodeBlock
                language="typescript"
                code={configurationExamples[selectedConfig].files[selectedFile].content}
              />
            </div>
          </div>
        </DemoSection>

        {/* Best Practices */}
        <DemoSection title="Melhores Práticas" description="Diretrizes para implementar funcionalidades real-time">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <div className="grid md:grid-cols-3 gap-1.5">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-yellow-500" />
                  Performance
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Use connection pooling</li>
                  <li>• Implemente throttling</li>
                  <li>• Otimize payload size</li>
                  <li>• Use compression</li>
                  <li>• Monitore latência</li>
                  <li>• Cache dados frequentes</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Settings className="h-5 w-5 mr-2 text-blue-500" />
                  Confiabilidade
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Implemente reconexão automática</li>
                  <li>• Use heartbeat/ping-pong</li>
                  <li>• Trate desconexões gracefully</li>
                  <li>• Implemente fallbacks</li>
                  <li>• Use message queues</li>
                  <li>• Monitore health checks</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Users className="h-5 w-5 mr-2 text-green-500" />
                  Escalabilidade
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Use load balancing</li>
                  <li>• Implemente clustering</li>
                  <li>• Use Redis para pub/sub</li>
                  <li>• Otimize para múltiplos servidores</li>
                  <li>• Monitore recursos</li>
                  <li>• Use CDN quando possível</li>
                </ul>
              </div>
            </div>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}