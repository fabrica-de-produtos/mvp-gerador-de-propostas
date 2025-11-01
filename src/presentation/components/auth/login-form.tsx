'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Alert } from '../ui/alert';
import { useAuth } from '@/presentation/contexts/auth-context';

/**
 * LoginForm Component
 * Formulário de autenticação com validação e estados
 */

export const LoginForm: React.FC = () => {
  const router = useRouter();
  const { login, error, clearError } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🔐 Tentando login com:', email);
    clearError();
    setSuccess(false);
    setIsSubmitting(true);

    try {
      console.log('🔐 Chamando login...');
      await login({ email, password });
      console.log('✅ Login bem sucedido! Redirecionando...');
      setSuccess(true);
      
      // Pequeno delay para garantir que o cookie foi salvo
      await new Promise(resolve => setTimeout(resolve, 300));
      
      console.log('🔐 Redirecionando para home...');
      router.push('/');
    } catch (err) {
      console.error('❌ Erro no login:', err);
      setIsSubmitting(false);
      // Erro já tratado pelo hook
    }
    // Não seta isSubmitting=false aqui para manter o loading durante o redirect
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="max-w-md w-full mx-auto">
      <div className="p-6 sm:p-8 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
            Gerador de Propostas
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Acesse sua conta
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="error" className="mb-4">
            {error}
          </Alert>
        )}

        {/* Success Alert */}
        {success && (
          <Alert variant="success" className="mb-4">
            Login realizado com sucesso! Redirecionando...
          </Alert>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            label="Email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail className="h-4 w-4" />}
            fullWidth
            required
            autoComplete="email"
            disabled={isSubmitting}
          />

          <div>
            <Input
              type={showPassword ? 'text' : 'password'}
              label="Senha"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="h-4 w-4" />}
              rightIcon={
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="focus:outline-none hover:text-slate-600 dark:hover:text-slate-300"
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              }
              fullWidth
              required
              autoComplete="current-password"
              disabled={isSubmitting}
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            isLoading={isSubmitting}
          >
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
          <p className="text-xs text-center text-slate-500 dark:text-slate-400">
            Gerador de Propostas — MVP
          </p>
        </div>
      </div>
    </div>
  );
};

