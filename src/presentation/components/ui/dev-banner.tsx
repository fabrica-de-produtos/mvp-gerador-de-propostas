'use client';

import React, { useState, useEffect } from 'react';
import { Info } from 'lucide-react';

/**
 * Dev Banner Component
 * Mostra aviso quando está em modo desenvolvimento sem Supabase
 */

export const DevBanner: React.FC = () => {
  const [isConfigured, setIsConfigured] = useState(true); // Assume configurado por padrão para evitar flash
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Verifica apenas no cliente após montar
    setIsMounted(true);
    setIsConfigured(process.env.NEXT_PUBLIC_SUPABASE_URL !== undefined);
  }, []);

  // Não renderiza nada até montar no cliente (evita hydration mismatch)
  if (!isMounted) return null;

  // Se estiver configurado, não mostra o banner
  if (isConfigured) return null;

  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 border-b border-blue-200 dark:border-blue-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center gap-2 text-sm text-blue-700 dark:text-blue-300">
          <Info className="h-4 w-4 flex-shrink-0" />
          <p>
            <strong>Modo Desenvolvimento:</strong> Use{' '}
            <code className="bg-blue-100 dark:bg-blue-900/50 px-1.5 py-0.5 rounded">
              demo@teste.com
            </code>{' '}
            /{' '}
            <code className="bg-blue-100 dark:bg-blue-900/50 px-1.5 py-0.5 rounded">
              123456
            </code>{' '}
            para login. Dados mock sendo usados.
          </p>
        </div>
      </div>
    </div>
  );
};

