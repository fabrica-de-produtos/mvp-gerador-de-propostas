'use client';

import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { Proposal } from '@/domain/entities/proposal';
import { Modal } from '../ui/modal';
import { Button } from '../ui/button';

/**
 * ProposalModal Component
 * Modal de visualização de proposta com iframe
 */

export interface ProposalModalProps {
  proposal: Proposal;
  isOpen: boolean;
  onClose: () => void;
}

export const ProposalModal: React.FC<ProposalModalProps> = ({
  proposal,
  isOpen,
  onClose,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 truncate">
            {proposal.titulo_da_proposta}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
            {proposal.id}
          </p>
        </div>
        <a
          href={proposal.url}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-4"
        >
          <Button variant="secondary" size="sm" leftIcon={<ExternalLink className="h-4 w-4" />}>
            Abrir em nova aba
          </Button>
        </a>
      </div>

      {/* Iframe Container */}
      <div className="relative rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800">
        {/* Loading Bar */}
        {isLoading && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-blue-600 animate-pulse z-10" />
        )}

        {/* Iframe */}
        <iframe
          src={proposal.url}
          className="w-full h-[75vh] bg-white"
          title={proposal.titulo_da_proposta}
          onLoad={handleIframeLoad}
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      </div>
    </Modal>
  );
};

