import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse, CounterResponse } from '@/types';

// Simulação de armazenamento em memória (em produção seria um banco de dados)
const globalCounter = {
  id: 'global',
  value: 0,
  lastUpdated: new Date().toISOString()
};

// POST /api/counter - Incrementa ou decrementa o contador
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, value = 1 } = body;
    
    // Validação dos parâmetros
    if (!action || !['increment', 'decrement'].includes(action)) {
      const errorResponse: ApiResponse = {
        success: false,
        error: 'Ação inválida',
        message: 'A ação deve ser "increment" ou "decrement"'
      };
      
      return NextResponse.json(errorResponse, {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    
    if (typeof value !== 'number' || value < 0) {
      const errorResponse: ApiResponse = {
        success: false,
        error: 'Valor inválido',
        message: 'O valor deve ser um número positivo'
      };
      
      return NextResponse.json(errorResponse, {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    
    // Atualizar contador
    if (action === 'increment') {
      globalCounter.value += value;
    } else {
      globalCounter.value -= value;
    }
    
    globalCounter.lastUpdated = new Date().toISOString();
    
    const counterResponse: CounterResponse = {
      count: globalCounter.value,
      timestamp: globalCounter.lastUpdated
    };
    
    const response: ApiResponse<CounterResponse> = {
      success: true,
      data: counterResponse,
      message: `Contador ${action === 'increment' ? 'incrementado' : 'decrementado'} com sucesso`
    };
    
    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Erro ao atualizar contador:', error);
    
    const errorResponse: ApiResponse = {
      success: false,
      error: 'Erro interno do servidor',
      message: 'Não foi possível atualizar o contador'
    };
    
    return NextResponse.json(errorResponse, {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

// GET /api/counter - Retorna o valor atual do contador
export async function GET() {
  try {
    const counterResponse: CounterResponse = {
      count: globalCounter.value,
      timestamp: globalCounter.lastUpdated
    };
    
    const response: ApiResponse<CounterResponse> = {
      success: true,
      data: counterResponse,
      message: 'Valor do contador obtido com sucesso'
    };
    
    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache', // Sempre buscar valor atual
      },
    });
  } catch (error) {
    console.error('Erro ao obter contador:', error);
    
    const errorResponse: ApiResponse = {
      success: false,
      error: 'Erro interno do servidor',
      message: 'Não foi possível obter o valor do contador'
    };
    
    return NextResponse.json(errorResponse, {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

// DELETE /api/counter - Reseta o contador
export async function DELETE() {
  try {
    globalCounter.value = 0;
    globalCounter.lastUpdated = new Date().toISOString();
    
    const counterResponse: CounterResponse = {
      count: globalCounter.value,
      timestamp: globalCounter.lastUpdated
    };
    
    const response: ApiResponse<CounterResponse> = {
      success: true,
      data: counterResponse,
      message: 'Contador resetado com sucesso'
    };
    
    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Erro ao resetar contador:', error);
    
    const errorResponse: ApiResponse = {
      success: false,
      error: 'Erro interno do servidor',
      message: 'Não foi possível resetar o contador'
    };
    
    return NextResponse.json(errorResponse, {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}