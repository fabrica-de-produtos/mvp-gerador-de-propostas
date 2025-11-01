import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { updateSupabaseSession } from '@/infrastructure/supabase/middleware-client';

/**
 * Middleware de proteção de rotas e gerenciamento de sessão
 * 
 * Responsabilidades:
 * 1. Atualiza sessão do Supabase (refresh tokens automaticamente)
 * 2. Verifica autenticação antes de permitir acesso às rotas protegidas
 * 3. Gerencia cookies de sessão de forma segura
 */

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Modo dev: permitir tudo (proteção via client-side)
  const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL !== undefined;
  if (!isSupabaseConfigured) {
    console.log('🔧 Middleware: Modo dev - permitindo acesso (proteção client-side)');
    return NextResponse.next();
  }

  // Atualiza sessão do Supabase (refresh tokens se necessário)
  const response = await updateSupabaseSession(request);

  // Verificar se há algum cookie de sessão do Supabase
  const cookies = request.cookies.getAll();
  const hasSupabaseCookie = cookies.some(cookie => 
    cookie.name.startsWith('sb-') && cookie.value
  );

  // Rotas públicas que não precisam de autenticação
  const publicRoutes = ['/login'];
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Se estiver autenticado e tentar acessar rota pública (login), redirecionar para home
  if (isPublicRoute && hasSupabaseCookie) {
    console.log('🔒 Middleware: Usuário autenticado tentando acessar login, redirecionando para home');
    const homeUrl = new URL('/', request.url);
    return NextResponse.redirect(homeUrl);
  }

  // Se for rota pública e não estiver autenticado, permitir acesso
  if (isPublicRoute) {
    return response;
  }

  // Para rotas protegidas, verificar se está autenticado
  if (!hasSupabaseCookie) {
    console.log('🔒 Middleware: Sem sessão, redirecionando para login');
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Permitir acesso se autenticado
  return response;
}

/**
 * Configuração do matcher
 * Define quais rotas o middleware deve processar
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

