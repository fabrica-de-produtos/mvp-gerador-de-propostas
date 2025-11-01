import { Proposal } from '../entities/proposal';

/**
 * Repository Interface: Proposal
 * Define as operações de propostas do domínio
 */
export interface ProposalRepository {
  /**
   * Busca todas as propostas ordenadas por nome
   * @param searchTerm - Termo opcional para filtrar por nome ou flow_id
   * @param sortOrder - Ordem de classificação ('asc' ou 'desc')
   */
  getAll(searchTerm?: string, sortOrder?: 'asc' | 'desc'): Promise<Proposal[]>;

  /**
   * Busca uma proposta por flow_id
   */
  getByFlowId(flowId: string): Promise<Proposal | null>;
}

