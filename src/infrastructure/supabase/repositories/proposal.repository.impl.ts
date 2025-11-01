import { ProposalRepository } from '@/domain/repositories/proposal.repository';
import { Proposal } from '@/domain/entities/proposal';
import { supabaseBrowser, isSupabaseConfigured } from '../client-browser';

/**
 * Dados mock para desenvolvimento sem Supabase
 */
const mockProposals: Proposal[] = [
  {
    id: 'DEMO001',
    titulo_da_proposta: 'Proposta Demo - Sistema Web',
    url: 'https://example.com/proposta-1',
  },
  {
    id: 'DEMO002',
    titulo_da_proposta: 'Proposta Demo - App Mobile',
    url: 'https://example.com/proposta-2',
  },
  {
    id: 'DEMO003',
    titulo_da_proposta: 'Proposta Demo - Dashboard',
    url: 'https://example.com/proposta-3',
  },
  {
    id: 'DEMO004',
    titulo_da_proposta: 'Proposta Demo - E-commerce',
    url: 'https://example.com/proposta-4',
  },
  {
    id: 'DEMO005',
    titulo_da_proposta: 'Proposta Demo - Landing Page',
    url: 'https://example.com/proposta-5',
  },
  {
    id: 'DEMO006',
    titulo_da_proposta: 'Proposta Demo - Sistema ERP',
    url: 'https://example.com/proposta-6',
  },
];

/**
 * Implementação concreta do ProposalRepository usando Supabase
 * 
 * MODO MOCK: Se Supabase não estiver configurado, usa dados mock
 */
export class SupabaseProposalRepository implements ProposalRepository {
  /**
   * Busca todas as propostas com filtros opcionais
   */
  async getAll(
    searchTerm?: string,
    sortOrder: 'asc' | 'desc' = 'asc'
  ): Promise<Proposal[]> {
    // Modo mock para desenvolvimento sem Supabase
    if (!isSupabaseConfigured) {
      console.log('🔧 MODO DESENVOLVIMENTO: Usando propostas mock');
      
      let proposals = [...mockProposals];

      // Aplicar filtro de busca
      if (searchTerm && searchTerm.trim() !== '') {
        const term = searchTerm.toLowerCase();
        proposals = proposals.filter(
          (p) =>
            p.titulo_da_proposta.toLowerCase().includes(term) ||
            p.id.toLowerCase().includes(term)
        );
      }

      // Aplicar ordenação
      proposals.sort((a, b) => {
        const comparison = a.titulo_da_proposta.localeCompare(b.titulo_da_proposta);
        return sortOrder === 'asc' ? comparison : -comparison;
      });

      return proposals;
    }

    // Modo real com Supabase (usa cookies para auth)
    // Buscar TODOS os dados primeiro para ver a estrutura
    console.log('📊 Buscando TODOS os registros de propostas_saas...');
    const { data: allData, error: allError } = await supabaseBrowser
      .from('propostas_saas')
      .select('*');

    console.log('📊 Dados brutos recebidos do Supabase:', allData);
    console.log('📊 Erro (se houver):', allError);

    if (allError) {
      throw new Error(`Failed to fetch proposals: ${allError.message}`);
    }

    // Por enquanto, retornar os dados como vieram
    return (allData || []) as Proposal[];
  }

  /**
   * Busca uma proposta específica por flow_id
   */
  async getByFlowId(flowId: string): Promise<Proposal | null> {
    // Modo mock
    if (!isSupabaseConfigured) {
      return mockProposals.find((p) => p.id === flowId) || null;
    }

    // Modo real (usa cookies para auth)
    const { data, error } = await supabaseBrowser
      .from('propostas_saas')
      .select('*')
      .eq('id', flowId)
      .single();

    console.log('📊 Proposta individual recebida:', data);
    console.log('📊 Erro (se houver):', error);

    if (error) {
      if (error.code === 'PGRST116') {
        // Not found
        return null;
      }
      throw new Error(`Failed to fetch proposal: ${error.message}`);
    }

    return data as Proposal;
  }
}

/**
 * Instância singleton do repositório
 */
export const proposalRepository = new SupabaseProposalRepository();

