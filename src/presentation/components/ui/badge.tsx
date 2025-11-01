import React from 'react';

/**
 * Badge Component
 * Componente de badge para destacar informações
 */

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  default:
    'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  primary:
    'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  success:
    'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  warning:
    'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
  danger:
    'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
};

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  className = '',
  children,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium';

  const classes = [baseClasses, variantClasses[variant], className]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
};

