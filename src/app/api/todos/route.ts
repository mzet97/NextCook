import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse, Todo } from '@/types';
import { initialTodos, delay, generateId } from '@/lib/mock-data';

// Simulação de armazenamento em memória (em produção seria um banco de dados)
let todos: Todo[] = [...initialTodos];

// GET /api/todos - Retorna todos os todos
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const completed = searchParams.get('completed');
    const priority = searchParams.get('priority');
    
    // Simular delay de API
    await delay(200);
    
    let filteredTodos = [...todos];
    
    // Filtrar por userId se fornecido
    if (userId) {
      const userIdNum = parseInt(userId);
      if (!isNaN(userIdNum)) {
        filteredTodos = filteredTodos.filter(todo => todo.userId === userIdNum);
      }
    }
    
    // Filtrar por status de conclusão se fornecido
    if (completed !== null) {
      const isCompleted = completed === 'true';
      filteredTodos = filteredTodos.filter(todo => todo.completed === isCompleted);
    }
    
    // Filtrar por prioridade se fornecido
    if (priority && ['low', 'medium', 'high'].includes(priority)) {
      filteredTodos = filteredTodos.filter(todo => todo.priority === priority);
    }
    
    // Ordenar por data de criação (mais recentes primeiro)
    filteredTodos.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    const response: ApiResponse<Todo[]> = {
      success: true,
      data: filteredTodos,
      message: `${filteredTodos.length} todo(s) encontrado(s)`
    };
    
    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'X-Total-Count': filteredTodos.length.toString(),
      },
    });
  } catch (error) {
    console.error('Erro ao buscar todos:', error);
    
    const errorResponse: ApiResponse = {
      success: false,
      error: 'Erro interno do servidor',
      message: 'Não foi possível buscar os todos'
    };
    
    return NextResponse.json(errorResponse, {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

// POST /api/todos - Cria um novo todo
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, priority = 'medium', userId = 1 } = body;
    
    // Validação
    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      const errorResponse: ApiResponse = {
        success: false,
        error: 'Texto inválido',
        message: 'O texto do todo é obrigatório e deve ser uma string não vazia'
      };
      
      return NextResponse.json(errorResponse, {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    
    if (!['low', 'medium', 'high'].includes(priority)) {
      const errorResponse: ApiResponse = {
        success: false,
        error: 'Prioridade inválida',
        message: 'A prioridade deve ser "low", "medium" ou "high"'
      };
      
      return NextResponse.json(errorResponse, {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    
    // Simular delay de criação
    await delay(300);
    
    const now = new Date().toISOString();
    const newTodo: Todo = {
      id: generateId(),
      text: text.trim(),
      completed: false,
      priority,
      userId,
      createdAt: now,
      updatedAt: now
    };
    
    todos.push(newTodo);
    
    const response: ApiResponse<Todo> = {
      success: true,
      data: newTodo,
      message: 'Todo criado com sucesso'
    };
    
    return NextResponse.json(response, {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
        'Location': `/api/todos/${newTodo.id}`,
      },
    });
  } catch (error) {
    console.error('Erro ao criar todo:', error);
    
    const errorResponse: ApiResponse = {
      success: false,
      error: 'Erro interno do servidor',
      message: 'Não foi possível criar o todo'
    };
    
    return NextResponse.json(errorResponse, {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

// DELETE /api/todos - Deleta todos os todos (cuidado!)
export async function DELETE() {
  try {
    await delay(200);
    
    const deletedCount = todos.length;
    todos = [];
    
    const response: ApiResponse = {
      success: true,
      data: { deletedCount },
      message: `${deletedCount} todo(s) deletado(s) com sucesso`
    };
    
    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Erro ao deletar todos:', error);
    
    const errorResponse: ApiResponse = {
      success: false,
      error: 'Erro interno do servidor',
      message: 'Não foi possível deletar os todos'
    };
    
    return NextResponse.json(errorResponse, {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}