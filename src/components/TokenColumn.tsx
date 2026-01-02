import React, { memo, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Token, TabType, FilterConfig } from '@/types/token';
import { TokenCard } from './TokenCard';
import { TableSkeleton } from './SkeletonRow';
import { ErrorBoundary, EmptyState } from './ErrorBoundary';
import { FilterPopover } from './FilterPopover';
import { Zap, Pause, Play, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface TokenColumnProps {
  title: string;
  tabType: TabType;
  tokens: Token[];
  isLoading: boolean;
  error: string | null;
  flashingTokens: Record<string, 'positive' | 'negative'>;
  filters: FilterConfig;
  onApplyFilters: (filters: FilterConfig) => void;
  onRefresh: () => void;
  className?: string;
}

export const TokenColumn = memo(({
  title,
  tabType,
  tokens,
  isLoading,
  error,
  flashingTokens,
  filters,
  onApplyFilters,
  onRefresh,
  className,
}: TokenColumnProps) => {
  const { toast } = useToast();
  const [isPaused, setIsPaused] = React.useState(false);
  const [activePreset, setActivePreset] = React.useState<string | null>(null);
  
  const handleBuy = useCallback((token: Token) => {
    toast({
      title: 'Quick Buy',
      description: `Buying ${token.buyAmount} SOL of ${token.ticker}...`,
    });
  }, [toast]);

  const handlePreset = (preset: string) => {
    setActivePreset(activePreset === preset ? null : preset);
    // Apply preset filters
    if (preset === 'P1') {
      onApplyFilters({ devPercentMax: 5, bundledPercentMax: 5 });
    } else if (preset === 'P2') {
      onApplyFilters({ devPercentMax: 10, insiderPercentMax: 10 });
    } else if (preset === 'P3') {
      onApplyFilters({ sniperPercentMax: 5 });
    } else {
      onApplyFilters({});
    }
  };

  return (
    <div className={cn(
      'flex flex-col bg-card rounded-lg border border-border overflow-hidden h-[calc(100vh-180px)] min-h-[400px]',
      className
    )}>
      {/* Column Header */}
      <div className="flex items-center justify-between px-3 py-2.5 border-b border-border bg-secondary/30">
        <h3 className="font-semibold text-sm">{title}</h3>
        
        <div className="flex items-center gap-1.5">
          {/* Token count */}
          <div className="flex items-center gap-1 text-2xs text-muted-foreground">
            <Zap className="w-3.5 h-3.5" />
            <span>{tokens.length}</span>
          </div>
          
          {/* Pause/Play */}
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => setIsPaused(!isPaused)}
          >
            {isPaused ? (
              <Play className="w-3.5 h-3.5" />
            ) : (
              <Pause className="w-3.5 h-3.5" />
            )}
          </Button>
          
          {/* Presets */}
          <div className="flex items-center gap-0.5">
            {['P1', 'P2', 'P3'].map(preset => (
              <Button
                key={preset}
                variant={activePreset === preset ? 'default' : 'ghost'}
                size="sm"
                className={cn(
                  'h-6 px-2 text-2xs',
                  activePreset === preset && 'bg-primary text-primary-foreground'
                )}
                onClick={() => handlePreset(preset)}
              >
                {preset}
              </Button>
            ))}
          </div>
          
          {/* Filter */}
          <FilterPopover
            filters={filters}
            onApplyFilters={onApplyFilters}
          />
        </div>
      </div>
      
      {/* Token List - Internal scroll */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-2">
        {isLoading ? (
          <TableSkeleton count={5} />
        ) : error ? (
          <ErrorBoundary error={error} onRetry={onRefresh} />
        ) : tokens.length === 0 ? (
          <EmptyState />
        ) : (
          tokens.map((token) => (
            <TokenCard
              key={token.id}
              token={token}
              flashing={flashingTokens[token.id]}
              onBuy={handleBuy}
              showBondingCurve={tabType === 'final-stretch'}
            />
          ))
        )}
      </div>
    </div>
  );
});

TokenColumn.displayName = 'TokenColumn';
