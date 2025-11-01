import { createClient } from '@supabase/supabase-js';
import { Database } from './client';

/**
 * Supabase Admin Client
 * Cliente para operações administrativas no servidor usando Service Role Key
 * 
 * ⚠️ IMPORTANTE: Este cliente NÃO deve ser usado no lado do cliente!
 * Use apenas em:
 * - API Routes (app/api/)
 * - Server Actions
 * 
 * A Service Role Key bypassa Row Level Security (RLS)
 * e tem acesso total ao banco de dados.
 * 
 * Para operações normais no servidor (com RLS), use createSupabaseServerClient
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Verifica se as credenciais estão configuradas
export const isSupabaseAdminConfigured = 
  supabaseUrl !== undefined && 
  supabaseServiceRoleKey !== undefined;

if (!isSupabaseAdminConfigured) {
  console.warn(
    '⚠️ Supabase Admin Client: Service Role Key não configurada. ' +
    'Operações administrativas não estarão disponíveis.'
  );
}

/**
 * Cliente Supabase com privilégios administrativos
 * Usa Service Role Key para operações que necessitam bypass de RLS
 * 
 * Casos de uso:
 * - Criação de usuários administrativamente
 * - Operações em lote
 * - Webhooks
 * - Background jobs
 * - Migrações de dados
 */
export const supabaseAdmin = isSupabaseAdminConfigured
  ? createClient<Database>(supabaseUrl!, supabaseServiceRoleKey!, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : null;

/**
 * Guard function para garantir que o cliente admin está disponível
 * @throws Error se o cliente admin não estiver configurado
 */
export function requireSupabaseAdmin() {
  if (!supabaseAdmin) {
    throw new Error(
      'Supabase Admin Client não está configurado. ' +
      'Configure SUPABASE_SERVICE_ROLE_KEY no arquivo .env.local'
    );
  }
  return supabaseAdmin;
}


