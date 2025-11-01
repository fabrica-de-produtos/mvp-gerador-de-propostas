import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * Supabase Middleware Client
 * Cliente para uso no middleware do Next.js
 * Gerencia refresh de tokens e cookies automaticamente
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

/**
 * Cria cliente Supabase para o middleware
 * Atualiza cookies de sessão automaticamente
 */
export function createSupabaseMiddlewareClient(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  return { supabase, response };
}

/**
 * Helper para atualizar sessão no middleware
 * Deve ser chamado em todos os requests para manter sessão ativa
 */
export async function updateSupabaseSession(request: NextRequest) {
  const { supabase, response } = createSupabaseMiddlewareClient(request);

  // Atualiza sessão (refresh token se necessário)
  await supabase.auth.getUser();

  return response;
}

