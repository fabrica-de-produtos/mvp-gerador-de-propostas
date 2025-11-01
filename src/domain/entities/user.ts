/**
 * Domain Entity: User
 * Representa um usuário autenticado no sistema
 */
export interface User {
  id: string;
  email: string;
  created_at?: string;
  email_confirmed_at?: string;
  phone?: string;
  user_metadata?: Record<string, unknown>;
}

/**
 * Credenciais de login
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Dados para registro de novo usuário
 */
export interface RegisterData {
  email: string;
  password: string;
  metadata?: {
    full_name?: string;
    avatar_url?: string;
    [key: string]: unknown;
  };
}

/**
 * Dados para atualização de perfil
 */
export interface UpdateProfileData {
  email?: string;
  password?: string;
  metadata?: {
    full_name?: string;
    avatar_url?: string;
    [key: string]: unknown;
  };
}

/**
 * Dados para recuperação de senha
 */
export interface PasswordResetData {
  email: string;
}

