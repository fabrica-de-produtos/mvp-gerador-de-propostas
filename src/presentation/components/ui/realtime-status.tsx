'use client';

import React, { useEffect, useState } from 'react';
import { supabaseBrowser } from '@/infrastructure/supabase/client-browser';
import { Activity } from 'lucide-react';

/**
 * RealtimeStatus Component
 * Mostra o status da conexão Realtime do Supabase
 */

export const RealtimeStatus: React.FC = () => {
  const [status, setStatus] = useState<'connecting' | 'connected' | 'error'>('connecting');
  const [lastEvent, setLastEvent] = useState<string>('Aguardando eventos...');

  useEffect(() => {
    console.log('🔌 Iniciando teste de conexão Realtime');

    const channel = supabaseBrowser
      .channel('realtime_test_channel')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'propostas_saas',
        },
        (payload) => {
          console.log('🔔 Evento Realtime recebido:', payload);
          setLastEvent(`${payload.eventType} - ${new Date().toLocaleTimeString()}`);
        }
      )
      .subscribe((subscriptionStatus) => {
        console.log('🔌 Status da subscription:', subscriptionStatus);
        
        if (subscriptionStatus === 'SUBSCRIBED') {
          setStatus('connected');
          console.log('✅ Realtime conectado com sucesso!');
        } else if (subscriptionStatus === 'CHANNEL_ERROR') {
          setStatus('error');
          console.error('❌ Erro ao conectar Realtime');
        }
      });

    return () => {
      console.log('🔌 Desconectando teste Realtime');
      supabaseBrowser.removeChannel(channel);
    };
  }, []);

  const getStatusColor = () => {
    switch (status) {
      case 'connected':
        return 'text-green-600 dark:text-green-400';
      case 'error':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-yellow-600 dark:text-yellow-400';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'connected':
        return 'Conectado';
      case 'error':
        return 'Erro';
      default:
        return 'Conectando...';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3 shadow-lg z-50">
      <div className="flex items-center gap-2">
        <Activity className={`h-4 w-4 ${getStatusColor()} ${status === 'connecting' ? 'animate-pulse' : ''}`} />
        <div className="text-sm">
          <div className={`font-medium ${getStatusColor()}`}>
            Realtime: {getStatusText()}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            {lastEvent}
          </div>
        </div>
      </div>
    </div>
  );
};

