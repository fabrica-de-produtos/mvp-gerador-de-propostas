import React from 'react';

/**
 * Skeleton Component
 * Componente de loading skeleton para estados de carregamento
 */

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string;
  height?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  className = '',
  style,
  ...props
}) => {
  const inlineStyle = {
    width,
    height,
    ...style,
  };

  return (
    <div
      className={`animate-pulse bg-slate-200 dark:bg-slate-800 rounded ${className}`}
      style={inlineStyle}
      {...props}
    />
  );
};

/**
 * Card Skeleton - Skeleton pré-configurado para cards de proposta
 */
export const ProposalCardSkeleton: React.FC = () => {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
      <Skeleton height="20px" width="75%" className="mb-2" />
      <Skeleton height="16px" width="50%" className="mb-3" />
      <Skeleton height="24px" width="60px" className="mb-4" />
      <div className="flex gap-2">
        <Skeleton height="36px" className="flex-1" />
        <Skeleton height="36px" width="36px" />
      </div>
    </div>
  );
};

