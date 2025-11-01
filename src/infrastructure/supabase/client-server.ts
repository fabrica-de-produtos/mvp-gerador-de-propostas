import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Database } from './client';

/**
 * Supabase Server Client
 * Cliente para uso em Server Components, Server Actions e API Routes
 * Gerencia cookies de forma segura no servidor
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

// Flag para verificar se Supabase está configurado
export const isSupabaseConfigured = 
  process.env.NEXT_PUBLIC_SUPABASE_URL !== undefined && 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== undefined;

/**
 * Cria cliente Supabase para o servidor
 * Usa cookies para gerenciar sessão de forma segura
 * 
 * ⚠️ IMPORTANTE: Use apenas em:
 * - Server Components
 * - Server Actions
 * - API Routes
 */
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch (error) {
            // Erro pode ocorrer em Server Components
            // Os cookies serão definidos via middleware
          }
        },
      },
    }
  );
}

