import { createBrowserClient } from '@supabase/ssr';
import { Database } from './client';

/**
 * Supabase Browser Client
 * Cliente para uso no lado do cliente (navegador)
 * Usa cookies em vez de localStorage para segurança
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

// Flag para verificar se Supabase está configurado
export const isSupabaseConfigured = 
  process.env.NEXT_PUBLIC_SUPABASE_URL !== undefined && 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== undefined;

/**
 * Cria cliente Supabase para o navegador
 * Sessions são armazenadas em cookies para segurança
 */
export function createSupabaseBrowserClient() {
  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
}

/**
 * Cliente singleton para uso global
 */
export const supabaseBrowser = createSupabaseBrowserClient();

