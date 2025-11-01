'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/presentation/contexts/auth-context';
import { Header } from '@/presentation/components/layout/header';
import { ProposalsGrid } from '@/presentation/components/proposals/proposals-grid';
import { RealtimeStatus } from '@/presentation/components/ui/realtime-status';
import { useProposals } from '@/presentation/hooks/use-proposals';

/**
 * Home Page (Protected)
 * Página principal com listagem de propostas
 */

export default function HomePage() {
  const router = useRouter();
  const { user, isLoading: isAuthLoading } = useAuth();
  const {
    proposals,
    isLoading,
    error,
    searchTerm,
    sortOrder,
    setSearchTerm,
    setSortOrder,
  } = useProposals();

  useEffect(() => {
    console.log('🏠 Home useEffect disparado');
    console.log('🏠 Home: user =', user);
    console.log('🏠 Home: isAuthLoading =', isAuthLoading);
    
    if (!isAuthLoading && !user) {
      console.log('❌ 🏠 Home: SEM USER! Redirecionando para login...');
      router.push('/login');
    } else if (!isAuthLoading && user) {
      console.log('✅ 🏠 Home: User autenticado! Tudo OK');
    }
  }, [user, isAuthLoading, router]);

  console.log('🏠 Home RENDER - isAuthLoading:', isAuthLoading, 'user:', !!user);

  // Mostrar loading enquanto verifica autenticação
  if (isAuthLoading) {
    console.log('🏠 Home: Mostrando loading...');
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-[#0B1220]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full" />
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Verificando autenticação...
          </p>
        </div>
      </div>
    );
  }

  // Não renderizar conteúdo se não estiver autenticado
  if (!user) {
    console.log('🏠 Home: Sem user, retornando null');
    return null;
  }

  console.log('🏠 Home: Renderizando conteúdo principal');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1220]">
      {/* Realtime Status Indicator */}
      <RealtimeStatus />
      
      {/* Header */}
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      
      {/* Dev Banner - só aparece em modo dev */}
      <div className="hidden" id="dev-mode-check">
        {typeof window !== 'undefined' && !process.env.NEXT_PUBLIC_SUPABASE_URL && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border-b border-blue-200 dark:border-blue-800">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
              <p className="text-xs text-blue-700 dark:text-blue-300 text-center">
                🔧 Modo Desenvolvimento - Usando dados mock
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title and Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            Propostas geradas
          </h2>

          {/* Sort Control */}
          <div className="flex items-center gap-2">
            <label
              htmlFor="sort-order"
              className="text-sm text-slate-600 dark:text-slate-400"
            >
              Ordenar:
            </label>
            <select
              id="sort-order"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
              className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="asc">Nome (A–Z)</option>
              <option value="desc">Nome (Z–A)</option>
            </select>
          </div>
        </div>

        {/* Proposals Grid */}
        <ProposalsGrid
          proposals={proposals}
          isLoading={isLoading}
          error={error}
        />
      </main>
    </div>
  );
}
