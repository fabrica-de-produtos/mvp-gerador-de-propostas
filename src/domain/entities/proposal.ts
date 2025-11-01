/**
 * Domain Entity: Proposal
 * Representa uma proposta gerada no sistema
 */
export interface Proposal {
  id: string;
  titulo_da_proposta: string;
  url: string;
}

/**
 * Type guard para validar se um objeto é uma Proposal válida
 */
export function isProposal(obj: unknown): obj is Proposal {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'titulo_da_proposta' in obj &&
    'url' in obj &&
    typeof (obj as Proposal).id === 'string' &&
    typeof (obj as Proposal).titulo_da_proposta === 'string' &&
    typeof (obj as Proposal).url === 'string'
  );
}

