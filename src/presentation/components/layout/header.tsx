'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '../ui/input';
import { UserMenu } from './user-menu';

/**
 * Header Component
 * Cabeçalho fixo com busca e menu do usuário
 */

export interface HeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchTerm,
  onSearchChange,
}) => {
  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-white/70 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo/Title */}
          <div className="flex-shrink-0">
            <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Gerador de Propostas
            </h1>
          </div>

          {/* Search - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <Input
              type="search"
              placeholder="Buscar por nome ou flow_id..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              leftIcon={<Search className="h-4 w-4" />}
              fullWidth
            />
          </div>

          {/* User Menu */}
          <div className="flex-shrink-0">
            <UserMenu />
          </div>
        </div>

        {/* Search - Mobile */}
        <div className="md:hidden pb-3">
          <Input
            type="search"
            placeholder="Buscar por nome ou flow_id..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            leftIcon={<Search className="h-4 w-4" />}
            fullWidth
          />
        </div>
      </div>
    </header>
  );
};

