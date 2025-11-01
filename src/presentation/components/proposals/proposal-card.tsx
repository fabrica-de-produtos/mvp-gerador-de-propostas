import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Proposal } from '@/domain/entities/proposal';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

/**
 * ProposalCard Component
 * Card individual de proposta com ações
 */

export interface ProposalCardProps {
  proposal: Proposal;
  onVisualize: (proposal: Proposal) => void;
}

export const ProposalCard: React.FC<ProposalCardProps> = ({
  proposal,
  onVisualize,
}) => {
  // Extrair hostname do URL
  const getHostname = (url: string): string => {
    try {
      return new URL(url).hostname;
    } catch {
      return url;
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm hover:shadow-md transition duration-200">
      {/* Title */}
      <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 truncate">
        {proposal.titulo_da_proposta}
      </h3>

      {/* URL Hostname */}
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 truncate">
        {getHostname(proposal.url)}
      </p>

      {/* ID Badge */}
      <div className="mt-2">
        <Badge variant="default">{proposal.id}</Badge>
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-4">
        <Button
          variant="primary"
          size="sm"
          onClick={() => onVisualize(proposal)}
          className="flex-1"
        >
          Visualizar
        </Button>
        <a
          href={proposal.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition"
          aria-label={`Abrir ${proposal.titulo_da_proposta} em nova aba`}
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
};

