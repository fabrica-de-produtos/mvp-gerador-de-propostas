import { NextResponse } from 'next/server';
import { supabaseAdmin, requireSupabaseAdmin } from '@/infrastructure/supabase/server-client';

/**
 * API Route: Admin Users
 * Exemplo de endpoint administrativo usando Service Role Key
 * 
 * ⚠️ IMPORTANTE: Em produção, adicione autenticação e autorização
 * para garantir que apenas administradores possam acessar.
 */

/**
 * GET /api/admin/users
 * Lista todos os usuários (operação administrativa)
 */
export async function GET() {
  try {
    // Garante que o cliente admin está configurado
    const admin = requireSupabaseAdmin();

    // Lista usuários usando a API administrativa
    const { data, error } = await admin.auth.admin.listUsers();

    if (error) {
      console.error('Error listing users:', error);
      return NextResponse.json(
        { error: 'Erro ao listar usuários' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      users: data.users,
      total: data.users.length,
    });
  } catch (error) {
    console.error('Admin API Error:', error);
    
    if (error instanceof Error && error.message.includes('não está configurado')) {
      return NextResponse.json(
        { error: 'Supabase Admin não configurado' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/users
 * Cria um novo usuário administrativamente
 * 
 * Body: { email: string, password: string, metadata?: object }
 */
export async function POST(request: Request) {
  try {
    const admin = requireSupabaseAdmin();
    const body = await request.json();

    const { email, password, metadata } = body;

    // Validação
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email e senha são obrigatórios' },
        { status: 400 }
      );
    }

    // Cria usuário usando a API administrativa
    const { data, error } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Confirma email automaticamente
      user_metadata: metadata || {},
    });

    if (error) {
      console.error('Error creating user:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: 'Usuário criado com sucesso',
      user: {
        id: data.user.id,
        email: data.user.email,
        created_at: data.user.created_at,
      },
    });
  } catch (error) {
    console.error('Admin API Error:', error);
    
    if (error instanceof Error && error.message.includes('não está configurado')) {
      return NextResponse.json(
        { error: 'Supabase Admin não configurado' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/users/:id
 * Remove um usuário (operação administrativa)
 * 
 * Body: { userId: string }
 */
export async function DELETE(request: Request) {
  try {
    const admin = requireSupabaseAdmin();
    const body = await request.json();

    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        { error: 'userId é obrigatório' },
        { status: 400 }
      );
    }

    // Remove usuário usando a API administrativa
    const { error } = await admin.auth.admin.deleteUser(userId);

    if (error) {
      console.error('Error deleting user:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: 'Usuário removido com sucesso',
    });
  } catch (error) {
    console.error('Admin API Error:', error);
    
    if (error instanceof Error && error.message.includes('não está configurado')) {
      return NextResponse.json(
        { error: 'Supabase Admin não configurado' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

