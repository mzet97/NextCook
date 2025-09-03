import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse, Todo } from '@/types';
import { initialTodos, delay } from '@/lib/mock-data';

// Simulação de armazenamento em memória (em produção seria um banco de dados)
const todos: Todo[] = [...initialTodos];

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// GET /api/todos/[id] - Retorna um todo específico
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    
    if (isNaN(id)) {
      const errorResponse: ApiResponse = {
        success: false,
        error: 'ID inválido',
        message: 'O ID deve ser um número válido'
      };
      
      return NextResponse.json(errorResponse, {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    
    await delay(100);
    
    const todo = todos.find(t => t.id === id);
    
    if (!todo) {
      const errorResponse: ApiResponse = {
        success: false,
        error: 'Todo não encontrado',
        message: `Todo com ID ${id} não foi encontrado`
      };
      
      return NextResponse.json(errorResponse, {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    
    const response: ApiResponse<Todo> = {
      success: true,
      data: todo,
      message: 'Todo encontrado com sucesso'
    };
    
    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Erro ao buscar todo:', error);
    
    const errorResponse: ApiResponse = {
      success: false,
      error: 'Erro interno do servidor',
      message: 'Não foi possível buscar o todo'
    };
    
    return NextResponse.json(errorResponse, {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

// PUT /api/todos/[id] - Atualiza um todo específico
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    
    if (isNaN(id)) {
      const errorResponse: ApiResponse = {
        success: false,
        error: 'ID inválido',
        message: 'O ID deve ser um número válido'
      };
      
      return NextResponse.json(errorResponse, {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    
    const body = await request.json();
    const { text, completed, priority } = body;
    
    const todoIndex = todos.findIndex(t => t.id === id);
    
    if (todoIndex === -1) {
      const errorResponse: ApiResponse = {
        success: false,
        error: 'Todo não encontrado',
        message: `Todo com ID ${id} não foi encontrado`
      };
      
      return NextResponse.json(errorResponse, {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    
    // Validações
    if (text !== undefined && (typeof text !== 'string' || text.trim().length === 0)) {
      const errorResponse: ApiResponse = {
        success: false,
        error: 'Texto inválido',
        message: 'O texto deve ser uma string não vazia'
      };
      
      return NextResponse.json(errorResponse, {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    
    if (completed !== undefined && typeof completed !== 'boolean') {
      const errorResponse: ApiResponse = {
        success: false,
        error: 'Status inválido',
        message: 'O status completed deve ser um boolean'
      };
      
      return NextResponse.json(errorResponse, {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    
    if (priority !== undefined && !['low', 'medium', 'high'].includes(priority)) {
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
    
    await delay(200);
    
    // Atualizar todo
    const updatedTodo = {
      ...todos[todoIndex],
      ...(text !== undefined && { text: text.trim() }),
      ...(completed !== undefined && { completed }),
      ...(priority !== undefined && { priority }),
      updatedAt: new Date().toISOString()
    };
    
    todos[todoIndex] = updatedTodo;
    
    const response: ApiResponse<Todo> = {
      success: true,
      data: updatedTodo,
      message: 'Todo atualizado com sucesso'
    };
    
    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Erro ao atualizar todo:', error);
    
    const errorResponse: ApiResponse = {
      success: false,
      error: 'Erro interno do servidor',
      message: 'Não foi possível atualizar o todo'
    };
    
    return NextResponse.json(errorResponse, {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

// DELETE /api/todos/[id] - Deleta um todo específico
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    
    if (isNaN(id)) {
      const errorResponse: ApiResponse = {
        success: false,
        error: 'ID inválido',
        message: 'O ID deve ser um número válido'
      };
      
      return NextResponse.json(errorResponse, {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    
    const todoIndex = todos.findIndex(t => t.id === id);
    
    if (todoIndex === -1) {
      const errorResponse: ApiResponse = {
        success: false,
        error: 'Todo não encontrado',
        message: `Todo com ID ${id} não foi encontrado`
      };
      
      return NextResponse.json(errorResponse, {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    
    await delay(150);
    
    const deletedTodo = todos[todoIndex];
    todos.splice(todoIndex, 1);
    
    const response: ApiResponse<Todo> = {
      success: true,
      data: deletedTodo,
      message: 'Todo deletado com sucesso'
    };
    
    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Erro ao deletar todo:', error);
    
    const errorResponse: ApiResponse = {
      success: false,
      error: 'Erro interno do servidor',
      message: 'Não foi possível deletar o todo'
    };
    
    return NextResponse.json(errorResponse, {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}