import React from 'react';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';

/**
 * Alert Component
 * Componente de alerta para mensagens de feedback
 */

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  title?: string;
  children: React.ReactNode;
}

const variantConfig: Record<
  AlertVariant,
  {
    classes: string;
    icon: React.ReactNode;
  }
> = {
  info: {
    classes:
      'border-l-4 border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300',
    icon: <Info className="h-5 w-5" />,
  },
  success: {
    classes:
      'border-l-4 border-green-500 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300',
    icon: <CheckCircle className="h-5 w-5" />,
  },
  warning: {
    classes:
      'border-l-4 border-yellow-500 bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300',
    icon: <AlertCircle className="h-5 w-5" />,
  },
  error: {
    classes:
      'border-l-4 border-red-500 bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300',
    icon: <XCircle className="h-5 w-5" />,
  },
};

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  children,
  className = '',
  ...props
}) => {
  const config = variantConfig[variant];

  return (
    <div
      className={`p-4 rounded-lg flex gap-3 ${config.classes} ${className}`}
      role="alert"
      {...props}
    >
      <div className="flex-shrink-0">{config.icon}</div>
      <div className="flex-1">
        {title && (
          <h3 className="font-semibold mb-1">{title}</h3>
        )}
        <div className="text-sm">{children}</div>
      </div>
    </div>
  );
};

