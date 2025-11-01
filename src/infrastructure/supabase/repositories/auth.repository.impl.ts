import { AuthRepository } from '@/domain/repositories/auth.repository';
import { 
  User, 
  LoginCredentials, 
  RegisterData, 
  UpdateProfileData, 
  PasswordResetData 
} from '@/domain/entities/user';
import { supabaseBrowser, isSupabaseConfigured } from '../client-browser';

/**
 * Implementação concreta do AuthRepository usando Supabase
 * Segue o padrão Repository para isolar a lógica de acesso a dados
 * 
 * MODO MOCK: Se Supabase não estiver configurado, usa dados mock
 */
export class SupabaseAuthRepository implements AuthRepository {
  /**
   * Realiza login com email e senha via Supabase Auth
   * Se Supabase não configurado, usa credenciais mock: demo@teste.com / 123456
   */
  async login(credentials: LoginCredentials): Promise<User> {
    // Modo mock para desenvolvimento sem Supabase
    if (!isSupabaseConfigured) {
      console.log('🔧 MODO DESENVOLVIMENTO: Usando autenticação mock');
      
      // Credenciais mock aceitas
      if (credentials.email === 'demo@teste.com' && credentials.password === '123456') {
        return {
          id: 'mock-user-id-123',
          email: 'demo@teste.com',
          created_at: new Date().toISOString(),
        };
      }
      
      throw new Error('Email ou senha incorretos (Use: demo@teste.com / 123456)');
    }

    // Modo real com Supabase (usa cookies)
    const { data, error } = await supabaseBrowser.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) {
      throw new Error(error.message);
    }

    if (!data.user) {
      throw new Error('Login failed: No user returned');
    }

    return this.mapSupabaseUserToUser(data.user);
  }

  /**
   * Registra um novo usuário via Supabase Auth
   * Se Supabase não configurado, simula registro mock
   */
  async register(data: RegisterData): Promise<User> {
    // Modo mock para desenvolvimento sem Supabase
    if (!isSupabaseConfigured) {
      console.log('🔧 MODO DESENVOLVIMENTO: Usando registro mock');
      
      // Simula registro bem-sucedido
      const newUser: User = {
        id: `mock-user-${Date.now()}`,
        email: data.email,
        created_at: new Date().toISOString(),
        user_metadata: data.metadata,
      };
      
      return newUser;
    }

    // Modo real com Supabase (usa cookies)
    const { data: authData, error } = await supabaseBrowser.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: data.metadata,
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    if (!authData.user) {
      throw new Error('Registration failed: No user returned');
    }

    return this.mapSupabaseUserToUser(authData.user);
  }

  /**
   * Realiza logout do usuário atual
   */
  async logout(): Promise<void> {
    // Modo mock
    if (!isSupabaseConfigured) {
      console.log('🔧 MODO DESENVOLVIMENTO: Logout mock');
      // Limpar localStorage mock
      if (typeof window !== 'undefined') {
        localStorage.removeItem('mock-user');
      }
      return;
    }

    // Modo real (limpa cookies automaticamente)
    const { error } = await supabaseBrowser.auth.signOut();

    if (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Retorna o usuário atual autenticado
   */
  async getCurrentUser(): Promise<User | null> {
    // Modo mock
    if (!isSupabaseConfigured) {
      console.log('🔧 Repository: Verificando mock-user no localStorage');
      if (typeof window !== 'undefined') {
        const mockUser = localStorage.getItem('mock-user');
        console.log('🔧 Repository: mock-user encontrado?', !!mockUser);
        if (mockUser) {
          const parsed = JSON.parse(mockUser);
          console.log('🔧 Repository: Retornando user:', parsed);
          return parsed;
        }
      }
      console.log('🔧 Repository: Nenhum user encontrado, retornando null');
      return null;
    }

    // Modo real (lê cookies automaticamente)
    const {
      data: { user },
      error,
    } = await supabaseBrowser.auth.getUser();

    if (error || !user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email!,
      created_at: user.created_at,
    };
  }

  /**
   * Verifica se há uma sessão ativa
   */
  async hasActiveSession(): Promise<boolean> {
    // Modo mock
    if (!isSupabaseConfigured) {
      if (typeof window !== 'undefined') {
        return localStorage.getItem('mock-user') !== null;
      }
      return false;
    }

    // Modo real (verifica cookies)
    const {
      data: { session },
    } = await supabaseBrowser.auth.getSession();

    return session !== null;
  }

  /**
   * Envia email de recuperação de senha
   */
  async requestPasswordReset(data: PasswordResetData): Promise<void> {
    // Modo mock
    if (!isSupabaseConfigured) {
      console.log('🔧 MODO DESENVOLVIMENTO: Email de recuperação simulado para', data.email);
      // Em modo mock, apenas simula o envio
      return;
    }

    // Modo real
    const { error } = await supabaseBrowser.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });

    if (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Atualiza o perfil do usuário atual
   */
  async updateProfile(data: UpdateProfileData): Promise<User> {
    // Modo mock
    if (!isSupabaseConfigured) {
      console.log('🔧 MODO DESENVOLVIMENTO: Atualização de perfil mock');
      
      if (typeof window !== 'undefined') {
        const mockUser = localStorage.getItem('mock-user');
        if (mockUser) {
          const user = JSON.parse(mockUser);
          const updatedUser = {
            ...user,
            email: data.email || user.email,
            user_metadata: { ...user.user_metadata, ...data.metadata },
          };
          localStorage.setItem('mock-user', JSON.stringify(updatedUser));
          return updatedUser;
        }
      }
      
      throw new Error('Usuário não autenticado');
    }

    // Modo real
    const updateData: {
      email?: string;
      password?: string;
      data?: Record<string, unknown>;
    } = {};

    if (data.email) updateData.email = data.email;
    if (data.password) updateData.password = data.password;
    if (data.metadata) updateData.data = data.metadata;

    const { data: userData, error } = await supabaseBrowser.auth.updateUser(updateData);

    if (error) {
      throw new Error(error.message);
    }

    if (!userData.user) {
      throw new Error('Update failed: No user returned');
    }

    return this.mapSupabaseUserToUser(userData.user);
  }

  /**
   * Observa mudanças no estado de autenticação
   */
  onAuthStateChange(callback: (user: User | null) => void): () => void {
    // Modo mock
    if (!isSupabaseConfigured) {
      console.log('🔧 MODO DESENVOLVIMENTO: Auth state change listener mock');
      // Em modo mock, não há observação real
      return () => {};
    }

    // Modo real (observa mudanças nos cookies)
    const {
      data: { subscription },
    } = supabaseBrowser.auth.onAuthStateChange((event, session) => {
      console.log('🔔 Auth state changed:', event);
      
      if (session?.user) {
        callback(this.mapSupabaseUserToUser(session.user));
      } else {
        callback(null);
      }
    });

    // Retorna função para cancelar a inscrição
    return () => {
      subscription.unsubscribe();
    };
  }

  /**
   * Mapeia o usuário do Supabase para o formato do domínio
   * @private
   */
  private mapSupabaseUserToUser(supabaseUser: any): User {
    return {
      id: supabaseUser.id,
      email: supabaseUser.email!,
      created_at: supabaseUser.created_at,
      email_confirmed_at: supabaseUser.email_confirmed_at,
      phone: supabaseUser.phone,
      user_metadata: supabaseUser.user_metadata,
    };
  }
}

/**
 * Instância singleton do repositório
 * Exportada para ser usada nos use cases
 */
export const authRepository = new SupabaseAuthRepository();

