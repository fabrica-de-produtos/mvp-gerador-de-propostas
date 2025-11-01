import { createClient } from '@supabase/supabase-js';

/**
 * Supabase Client Configuration
 * Cliente singleton para acesso ao Supabase
 * 
 * MODO DE DESENVOLVIMENTO: Funciona sem variáveis de ambiente
 * Para produção, configure NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY
 */

// Valores padrão para desenvolvimento sem Supabase configurado
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

// Flag para verificar se Supabase está configurado
export const isSupabaseConfigured = 
  process.env.NEXT_PUBLIC_SUPABASE_URL !== undefined && 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== undefined;

/**
 * Cliente Supabase compartilhado
 * Configurado com as credenciais do ambiente ou valores placeholder
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  },
});

/**
 * Type-safe database schema
 * Define a estrutura das tabelas para type checking
 */
export interface Database {
  public: {
    Tables: {
      propostas_saas: {
        Row: {
          id: string;
          titulo_da_proposta: string;
          url: string;
        };
        Insert: {
          id: string;
          titulo_da_proposta: string;
          url: string;
        };
        Update: {
          id?: string;
          titulo_da_proposta?: string;
          url?: string;
        };
      };
    };
  };
}

