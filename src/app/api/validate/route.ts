import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse, ValidationResponse } from '@/types';
import { delay } from '@/lib/mock-data';

// Função para validar email
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Função para validar senha
function validatePassword(password: string): string[] {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('A senha deve ter pelo menos 8 caracteres');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('A senha deve conter pelo menos uma letra maiúscula');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('A senha deve conter pelo menos uma letra minúscula');
  }
  
  if (!/\d/.test(password)) {
    errors.push('A senha deve conter pelo menos um número');
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('A senha deve conter pelo menos um caractere especial');
  }
  
  return errors;
}

// POST /api/validate - Valida dados de formulário
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;
    
    // Simular delay de validação
    await delay(300);
    
    const errors: string[] = [];
    
    // Validação de email
    if (!email) {
      errors.push('Email é obrigatório');
    } else if (typeof email !== 'string') {
      errors.push('Email deve ser uma string');
    } else if (!isValidEmail(email)) {
      errors.push('Email deve ter um formato válido');
    }
    
    // Validação de senha
    if (!password) {
      errors.push('Senha é obrigatória');
    } else if (typeof password !== 'string') {
      errors.push('Senha deve ser uma string');
    } else {
      const passwordErrors = validatePassword(password);
      errors.push(...passwordErrors);
    }
    
    const validationResult: ValidationResponse = {
      valid: errors.length === 0,
      errors
    };
    
    const response: ApiResponse<ValidationResponse> = {
      success: true,
      data: validationResult,
      message: validationResult.valid 
        ? 'Dados válidos' 
        : `Encontrados ${errors.length} erro(s) de validação`
    };
    
    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Erro na validação:', error);
    
    const errorResponse: ApiResponse = {
      success: false,
      error: 'Erro interno do servidor',
      message: 'Não foi possível validar os dados'
    };
    
    return NextResponse.json(errorResponse, {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

// GET /api/validate - Retorna regras de validação
export async function GET() {
  try {
    const validationRules = {
      email: {
        required: true,
        type: 'string',
        format: 'email',
        description: 'Deve ser um endereço de email válido'
      },
      password: {
        required: true,
        type: 'string',
        minLength: 8,
        rules: [
          'Pelo menos 8 caracteres',
          'Pelo menos uma letra maiúscula',
          'Pelo menos uma letra minúscula',
          'Pelo menos um número',
          'Pelo menos um caractere especial (!@#$%^&*(),.?":{}|<>)'
        ],
        description: 'Senha deve atender a todos os critérios de segurança'
      }
    };
    
    const response: ApiResponse = {
      success: true,
      data: validationRules,
      message: 'Regras de validação obtidas com sucesso'
    };
    
    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600', // Cache por 1 hora
      },
    });
  } catch (error) {
    console.error('Erro ao obter regras de validação:', error);
    
    const errorResponse: ApiResponse = {
      success: false,
      error: 'Erro interno do servidor',
      message: 'Não foi possível obter as regras de validação'
    };
    
    return NextResponse.json(errorResponse, {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}