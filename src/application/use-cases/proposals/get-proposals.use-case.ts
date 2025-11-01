import { Proposal } from '@/domain/entities/proposal';
import { ProposalRepository } from '@/domain/repositories/proposal.repository';

/**
 * Use Case: Get Proposals
 * Orquestra a busca de propostas com filtros e ordenação
 */
export class GetProposalsUseCase {
  constructor(private proposalRepository: ProposalRepository) {}

  /**
   * Busca propostas com filtros opcionais
   */
  async execute(
    searchTerm?: string,
    sortOrder: 'asc' | 'desc' = 'asc'
  ): Promise<Proposal[]> {
    try {
      const proposals = await this.proposalRepository.getAll(
        searchTerm,
        sortOrder
      );
      return proposals;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Erro ao buscar propostas: ${error.message}`);
      }
      throw new Error('Erro ao buscar propostas');
    }
  }
}

