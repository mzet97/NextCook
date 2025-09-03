import { NextRequest, NextResponse } from 'next/server';
import { mockDemoData, delay } from '@/lib/mock-data';
import { ApiResponse, DemoResponse } from '@/types';

// GET /api/demo-data - Retorna dados de demonstração
export async function GET() {
  try {
    // Simular delay de API real
    await delay(500);
    
    const response: ApiResponse<DemoResponse> = {
      success: true,
      data: mockDemoData,
      message: 'Dados de demonstração carregados com sucesso'
    };
    
    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=60', // Cache por 1 minuto
      },
    });
  } catch (error) {
    console.error('Erro ao carregar dados de demonstração:', error);
    
    const errorResponse: ApiResponse = {
      success: false,
      error: 'Erro interno do servidor',
      message: 'Não foi possível carregar os dados de demonstração'
    };
    
    return NextResponse.json(errorResponse, {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

// POST /api/demo-data - Simula criação de novos dados
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validação básica
    if (!body || typeof body !== 'object') {
      const errorResponse: ApiResponse = {
        success: false,
        error: 'Dados inválidos',
        message: 'O corpo da requisição deve ser um objeto JSON válido'
      };
      
      return NextResponse.json(errorResponse, {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    
    // Simular processamento
    await delay(800);
    
    const response: ApiResponse = {
      success: true,
      data: {
        id: Date.now(),
        ...body,
        createdAt: new Date().toISOString()
      },
      message: 'Dados criados com sucesso'
    };
    
    return NextResponse.json(response, {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Erro ao criar dados:', error);
    
    const errorResponse: ApiResponse = {
      success: false,
      error: 'Erro interno do servidor',
      message: 'Não foi possível criar os dados'
    };
    
    return NextResponse.json(errorResponse, {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}