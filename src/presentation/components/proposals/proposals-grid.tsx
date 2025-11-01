'use client';

import React, { useState } from 'react';
import { FileQuestion } from 'lucide-react';
import { Proposal } from '@/domain/entities/proposal';
import { ProposalCard } from './proposal-card';
import { ProposalModal } from './proposal-modal';
import { ProposalCardSkeleton } from '../ui/skeleton';
import { Alert } from '../ui/alert';

/**
 * ProposalsGrid Component
 * Grid de cards de propostas com estados de loading/empty/error
 */

export interface ProposalsGridProps {
  proposals: Proposal[];
  isLoading: boolean;
  error: string | null;
}

export const ProposalsGrid: React.FC<ProposalsGridProps> = ({
  proposals,
  isLoading,
  error,
}) => {
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(
    null
  );

  const handleVisualize = (proposal: Proposal) => {
    setSelectedProposal(proposal);
  };

  const handleCloseModal = () => {
    setSelectedProposal(null);
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProposalCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <Alert variant="error" title="Erro ao carregar propostas">
        {error}
      </Alert>
    );
  }

  // Empty State
  if (proposals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <FileQuestion className="h-16 w-16 text-slate-400 dark:text-slate-600 mb-4" />
        <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
          Nenhuma proposta encontrada
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 text-center max-w-md">
          Não há propostas cadastradas ou nenhuma proposta corresponde aos
          critérios de busca.
        </p>
      </div>
    );
  }

  // Grid with Proposals
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {proposals.map((proposal, index) => (
          <ProposalCard
            key={proposal.id || `proposal-${index}`}
            proposal={proposal}
            onVisualize={handleVisualize}
          />
        ))}
      </div>

      {/* Modal */}
      {selectedProposal && (
        <ProposalModal
          proposal={selectedProposal}
          isOpen={!!selectedProposal}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

