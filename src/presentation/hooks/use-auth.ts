'use client';

import { useState, useEffect, useCallback } from 'react';
import { User, LoginCredentials } from '@/domain/entities/user';
import { LoginUseCase } from '@/application/use-cases/auth/login.use-case';
import { LogoutUseCase } from '@/application/use-cases/auth/logout.use-case';
import { authRepository } from '@/infrastructure/supabase/repositories/auth.repository.impl';

/**
 * Hook: useAuth
 * Gerencia estado de autenticação e ações relacionadas
 */

export interface UseAuthReturn {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const loginUseCase = new LoginUseCase(authRepository);
const logoutUseCase = new LogoutUseCase(authRepository);

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Verifica usuário atual ao montar
  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await authRepository.getCurrentUser();
        setUser(currentUser);
      } catch (err) {
        console.error('Error checking user:', err);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      const loggedUser = await loginUseCase.execute(credentials);
      setUser(loggedUser);
      
      // Salvar no localStorage para modo mock
      if (typeof window !== 'undefined') {
        localStorage.setItem('mock-user', JSON.stringify(loggedUser));
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro ao fazer login';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      await logoutUseCase.execute();
      setUser(null);
      
      // Limpar localStorage no modo mock
      if (typeof window !== 'undefined') {
        localStorage.removeItem('mock-user');
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro ao fazer logout';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    user,
    isLoading,
    error,
    login,
    logout,
    clearError,
  };
}

