import { useState, useCallback, useMemo } from 'react';
import { Token, TabType, SortConfig, FilterConfig } from '@/types/token';
import { generateTokens } from '@/lib/mockData';
import { useWebSocketMock } from './useWebSocket';

export const useTokenData = (activeTab: TabType) => {
  const [tokens, setTokens] = useState<Token[]>(() => generateTokens(20));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ field: 'age', direction: 'asc' });
  const [filters, setFilters] = useState<FilterConfig>({});
  const [flashingTokens, setFlashingTokens] = useState<Record<string, 'positive' | 'negative'>>({});

  const handlePriceUpdates = useCallback((updates: { tokenId: string; newPrice: number; newMarketCap: number; priceChange: number }[]) => {
    const newFlashing: Record<string, 'positive' | 'negative'> = {};
    
    setTokens(prevTokens => 
      prevTokens.map(token => {
        const update = updates.find(u => u.tokenId === token.id);
        if (update) {
          newFlashing[token.id] = update.priceChange >= 0 ? 'positive' : 'negative';
          return {
            ...token,
            price: update.newPrice,
            marketCap: update.newMarketCap,
            priceChange: update.priceChange,
          };
        }
        return token;
      })
    );
    
    setFlashingTokens(newFlashing);
    
    // Clear flashing state after animation
    setTimeout(() => {
      setFlashingTokens({});
    }, 600);
  }, []);

  const { isConnected } = useWebSocketMock(tokens, handlePriceUpdates);

  const refreshTokens = useCallback(() => {
    setIsLoading(true);
    setError(null);
    
    // Simulate API call
    setTimeout(() => {
      setTokens(generateTokens(20));
      setIsLoading(false);
    }, 800);
  }, []);

  const handleSort = useCallback((field: SortConfig['field']) => {
    setSortConfig(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  }, []);

  const filteredAndSortedTokens = useMemo(() => {
    let result = [...tokens];
    
    // Apply filters
    if (filters.ageMax !== undefined) {
      result = result.filter(t => t.ageSeconds <= filters.ageMax! * 60);
    }
    if (filters.holdersMin !== undefined) {
      result = result.filter(t => t.holders >= filters.holdersMin!);
    }
    if (filters.devPercentMax !== undefined) {
      result = result.filter(t => t.devPercent <= filters.devPercentMax!);
    }
    if (filters.bundledPercentMax !== undefined) {
      result = result.filter(t => t.bundledPercent <= filters.bundledPercentMax!);
    }
    if (filters.insiderPercentMax !== undefined) {
      result = result.filter(t => t.insiderPercent <= filters.insiderPercentMax!);
    }
    if (filters.sniperPercentMax !== undefined) {
      result = result.filter(t => t.sniperPercent <= filters.sniperPercentMax!);
    }
    if (filters.marketCapMin !== undefined) {
      result = result.filter(t => t.marketCap >= filters.marketCapMin!);
    }
    
    // Apply sorting
    result.sort((a, b) => {
      const multiplier = sortConfig.direction === 'asc' ? 1 : -1;
      
      switch (sortConfig.field) {
        case 'age':
          return (a.ageSeconds - b.ageSeconds) * multiplier;
        case 'holders':
          return (a.holders - b.holders) * multiplier;
        case 'marketCap':
          return (a.marketCap - b.marketCap) * multiplier;
        case 'volume':
          return (a.volume - b.volume) * multiplier;
        case 'transactions':
          return (a.transactions - b.transactions) * multiplier;
        case 'devPercent':
          return (a.devPercent - b.devPercent) * multiplier;
        case 'bundledPercent':
          return (a.bundledPercent - b.bundledPercent) * multiplier;
        case 'insiderPercent':
          return (a.insiderPercent - b.insiderPercent) * multiplier;
        case 'sniperPercent':
          return (a.sniperPercent - b.sniperPercent) * multiplier;
        default:
          return 0;
      }
    });
    
    return result;
  }, [tokens, sortConfig, filters]);

  return {
    tokens: filteredAndSortedTokens,
    isLoading,
    error,
    isConnected,
    sortConfig,
    filters,
    flashingTokens,
    handleSort,
    setFilters,
    refreshTokens,
  };
};
