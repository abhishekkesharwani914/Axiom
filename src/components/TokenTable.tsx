import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { TabType, Token } from '@/types/token';
import { useTokenData } from '@/hooks/useTokenData';
import { TabNavigation } from './TabNavigation';
import { TableHeader } from './TableHeader';
import { TokenRow } from './TokenRow';
import { TableSkeleton } from './SkeletonRow';
import { ErrorBoundary, EmptyState } from './ErrorBoundary';
import { ConnectionStatus } from './ConnectionStatus';
import { useToast } from '@/hooks/use-toast';
import { Zap } from 'lucide-react';

interface TokenTableProps {
  className?: string;
}

export const TokenTable = ({ className }: TokenTableProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('new-pairs');
  const { toast } = useToast();
  
  const {
    tokens,
    isLoading,
    error,
    isConnected,
    sortConfig,
    filters,
    flashingTokens,
    handleSort,
    setFilters,
    refreshTokens,
  } = useTokenData(activeTab);

  const handleBuy = useCallback((token: Token) => {
    toast({
      title: 'Quick Buy',
      description: `Buying ${token.buyAmount} SOL of ${token.ticker}...`,
    });
  }, [toast]);

  const handleTabChange = useCallback((tab: TabType) => {
    setActiveTab(tab);
  }, []);

  return (
    <div
      className={cn(
        'flex flex-col bg-card rounded-lg border border-border overflow-hidden',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-lg">Pulse</h2>
        </div>
        
        <ConnectionStatus
          isConnected={isConnected}
          onRefresh={refreshTokens}
        />
      </div>
      
      {/* Tab Navigation */}
      <TabNavigation
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
      
      {/* Table Header */}
      <TableHeader
        sortConfig={sortConfig}
        filters={filters}
        onSort={handleSort}
        onApplyFilters={setFilters}
      />
      
      {/* Table Content */}
      <div className="flex-1 overflow-auto custom-scrollbar">
        {isLoading ? (
          <TableSkeleton count={10} />
        ) : error ? (
          <ErrorBoundary error={error} onRetry={refreshTokens} />
        ) : tokens.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="divide-y divide-border">
            {tokens.map((token) => (
              <TokenRow
                key={token.id}
                token={token}
                flashing={flashingTokens[token.id]}
                onBuy={handleBuy}
                showBondingCurve={activeTab === 'final-stretch'}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
