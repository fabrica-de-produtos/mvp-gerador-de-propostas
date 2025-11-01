import React from 'react';
import { LoginForm } from '@/presentation/components/auth/login-form';
import { DevBanner } from '@/presentation/components/ui/dev-banner';

/**
 * Login Page
 * Página de autenticação
 */

export default function LoginPage() {
  return (
    <>
      <DevBanner />
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-[#0B1220] px-4">
        <LoginForm />
      </div>
    </>
  );
}

