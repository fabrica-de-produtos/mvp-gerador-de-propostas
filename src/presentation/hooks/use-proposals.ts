'use client';

import { useState, useEffect, useCallback } from 'react';
import { Proposal } from '@/domain/entities/proposal';
import { GetProposalsUseCase } from '@/application/use-cases/proposals/get-proposals.use-case';
import { proposalRepository } from '@/infrastructure/supabase/repositories/proposal.repository.impl';
import { supabaseBrowser } from '@/infrastructure/supabase/client-browser';

/**
 * Hook: useProposals
 * Gerencia listagem e busca de propostas com Realtime
 */

export interface UseProposalsReturn {
  proposals: Proposal[];
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
  sortOrder: 'asc' | 'desc';
  setSearchTerm: (term: string) => void;
  setSortOrder: (order: 'asc' | 'desc') => void;
  refetch: () => Promise<void>;
}

const getProposalsUseCase = new GetProposalsUseCase(proposalRepository);

export function useProposals(): UseProposalsReturn {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const fetchProposals = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getProposalsUseCase.execute(searchTerm, sortOrder);
      setProposals(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro ao buscar propostas';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, sortOrder]);

  // Buscar propostas quando filtros mudarem
  useEffect(() => {
    fetchProposals();
  }, [fetchProposals]);

  // Log para debug sempre que proposals mudar
  useEffect(() => {
    console.log('🔄 Proposals state atualizado. Total:', proposals.length);
    console.log('🔄 Propostas atuais:', proposals);
  }, [proposals]);

  // Configurar Realtime Subscription
  useEffect(() => {
    console.log('🔔 Configurando Realtime subscription para propostas_saas');

    const channel = supabaseBrowser
      .channel('propostas_saas_changes')
      .on(
        'postgres_changes',
        {
          event: '*', // INSERT, UPDATE, DELETE
          schema: 'public',
          table: 'propostas_saas',
        },
        (payload) => {
          console.log('🔔 Realtime event received:', payload);
          console.log('🔔 Event type:', payload.eventType);
          console.log('🔔 Payload data:', payload);

          if (payload.eventType === 'INSERT') {
            const newProposal = payload.new as Proposal;
            console.log('➕ Nova proposta inserida:', newProposal);
            console.log('➕ ID da nova proposta:', newProposal.id);
            console.log('➕ Dados completos:', JSON.stringify(newProposal, null, 2));
            
            setProposals((current) => {
              console.log('➕ Propostas atuais antes de adicionar:', current.length);
              console.log('➕ Lista atual:', current);
              
              // Verifica se já existe para evitar duplicatas
              if (current.some((p) => p.id === newProposal.id)) {
                console.log('⚠️ Proposta duplicada, ignorando');
                return current;
              }
              
              // Verifica se a proposta corresponde ao filtro de busca atual
              if (searchTerm && searchTerm.trim() !== '') {
                const term = searchTerm.toLowerCase();
                const matchesSearch = 
                  newProposal.titulo_da_proposta?.toLowerCase().includes(term) ||
                  newProposal.id?.toLowerCase().includes(term);
                
                if (!matchesSearch) {
                  console.log('⚠️ Nova proposta não corresponde ao filtro de busca, ignorando');
                  return current;
                }
              }
              
              // Adiciona e ordena
              const updated = [...current, newProposal].sort((a, b) => {
                const comparison = a.titulo_da_proposta.localeCompare(b.titulo_da_proposta);
                return sortOrder === 'asc' ? comparison : -comparison;
              });
              
              console.log('✅ Nova lista de propostas:', updated.length);
              console.log('✅ Lista atualizada:', updated);
              return updated;
            });
          } else if (payload.eventType === 'UPDATE') {
            const updatedProposal = payload.new as Proposal;
            console.log('✏️ Proposta atualizada:', updatedProposal);
            
            setProposals((current) =>
              current.map((p) =>
                p.id === updatedProposal.id ? updatedProposal : p
              )
            );
          } else if (payload.eventType === 'DELETE') {
            const deletedProposal = payload.old as Proposal;
            console.log('🗑️ Proposta removida:', deletedProposal);
            
            setProposals((current) =>
              current.filter((p) => p.id !== deletedProposal.id)
            );
          }
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.log('✅ Realtime subscription ATIVA!');
        } else if (status === 'CHANNEL_ERROR') {
          console.error('❌ Erro na subscription do Realtime');
        } else {
          console.log('🔔 Realtime subscription status:', status);
        }
      });

    // Cleanup: remove subscription quando componente desmontar
    return () => {
      console.log('🔔 Removendo Realtime subscription');
      supabaseBrowser.removeChannel(channel);
    };
  }, [sortOrder, searchTerm]); // Re-subscribe se sortOrder ou searchTerm mudar

  return {
    proposals,
    isLoading,
    error,
    searchTerm,
    sortOrder,
    setSearchTerm,
    setSortOrder,
    refetch: fetchProposals,
  };
}

