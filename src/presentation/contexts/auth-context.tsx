'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  User, 
  LoginCredentials, 
  RegisterData, 
  UpdateProfileData, 
  PasswordResetData 
} from '@/domain/entities/user';
import { LoginUseCase } from '@/application/use-cases/auth/login.use-case';
import { LogoutUseCase } from '@/application/use-cases/auth/logout.use-case';
import { RegisterUseCase } from '@/application/use-cases/auth/register.use-case';
import { RequestPasswordResetUseCase } from '@/application/use-cases/auth/request-password-reset.use-case';
import { UpdateProfileUseCase } from '@/application/use-cases/auth/update-profile.use-case';
import { authRepository } from '@/infrastructure/supabase/repositories/auth.repository.impl';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  requestPasswordReset: (data: PasswordResetData) => Promise<void>;
  updateProfile: (data: UpdateProfileData) => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const loginUseCase = new LoginUseCase(authRepository);
const logoutUseCase = new LogoutUseCase(authRepository);
const registerUseCase = new RegisterUseCase(authRepository);
const requestPasswordResetUseCase = new RequestPasswordResetUseCase(authRepository);
const updateProfileUseCase = new UpdateProfileUseCase(authRepository);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Verifica usuário ao montar e observa mudanças de autenticação
  useEffect(() => {
    console.log('🔷 AuthContext: Verificando user...');
    
    const checkUser = async () => {
      try {
        const currentUser = await authRepository.getCurrentUser();
        console.log('🔷 AuthContext: User encontrado:', currentUser);
        setUser(currentUser);
      } catch (err) {
        console.error('❌ AuthContext: Error checking user:', err);
      } finally {
        setIsLoading(false);
        console.log('🔷 AuthContext: Verificação completa');
      }
    };

    checkUser();

    // Observa mudanças no estado de autenticação (token refresh, logout, etc.)
    const unsubscribe = authRepository.onAuthStateChange((user) => {
      console.log('🔔 AuthContext: Auth state changed:', user);
      setUser(user);
    });

    // Cleanup: cancela a observação quando o componente desmonta
    return () => {
      unsubscribe();
    };
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    console.log('🔷 Context: Iniciando login');
    setIsLoading(true);
    setError(null);

    try {
      console.log('🔷 Context: Executando use case');
      const loggedUser = await loginUseCase.execute(credentials);
      console.log('🔷 Context: User logado:', loggedUser);
      setUser(loggedUser);
      console.log('✅ Context: Login completo! (Sessão salva em cookies)');
    } catch (err) {
      console.error('❌ Context: Erro no login:', err);
      const errorMessage = err instanceof Error ? err.message : 'Erro ao fazer login';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
      console.log('🔷 Context: Loading = false');
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      await logoutUseCase.execute();
      setUser(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao fazer logout';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    console.log('🔷 Context: Iniciando registro');
    setIsLoading(true);
    setError(null);

    try {
      console.log('🔷 Context: Executando use case de registro');
      const newUser = await registerUseCase.execute(data);
      console.log('🔷 Context: Usuário registrado:', newUser);
      setUser(newUser);
      console.log('✅ Context: Registro completo! (Sessão salva em cookies)');
    } catch (err) {
      console.error('❌ Context: Erro no registro:', err);
      const errorMessage = err instanceof Error ? err.message : 'Erro ao registrar usuário';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
      console.log('🔷 Context: Loading = false');
    }
  }, []);

  const requestPasswordReset = useCallback(async (data: PasswordResetData) => {
    console.log('🔷 Context: Solicitando recuperação de senha');
    setIsLoading(true);
    setError(null);

    try {
      await requestPasswordResetUseCase.execute(data);
      console.log('✅ Context: Email de recuperação enviado!');
    } catch (err) {
      console.error('❌ Context: Erro ao solicitar recuperação:', err);
      const errorMessage = err instanceof Error ? err.message : 'Erro ao solicitar recuperação de senha';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateProfile = useCallback(async (data: UpdateProfileData) => {
    console.log('🔷 Context: Atualizando perfil');
    setIsLoading(true);
    setError(null);

    try {
      const updatedUser = await updateProfileUseCase.execute(data);
      console.log('🔷 Context: Perfil atualizado:', updatedUser);
      setUser(updatedUser);
      console.log('✅ Context: Perfil atualizado com sucesso!');
    } catch (err) {
      console.error('❌ Context: Erro ao atualizar perfil:', err);
      const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar perfil';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoading, 
        error, 
        login, 
        register, 
        logout, 
        requestPasswordReset, 
        updateProfile, 
        clearError 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

