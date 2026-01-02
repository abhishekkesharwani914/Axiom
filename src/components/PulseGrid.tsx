import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { TokenColumn } from './TokenColumn';
import { PulseHeader } from './PulseHeader';
import { useTokenData } from '@/hooks/useTokenData';

interface PulseGridProps {
  className?: string;
}

export const PulseGrid = ({ className }: PulseGridProps) => {
  // Use separate data hooks for each column
  const newPairsData = useTokenData('new-pairs');
  const finalStretchData = useTokenData('final-stretch');
  const migratedData = useTokenData('migrated');
  
  const handleRefreshAll = useCallback(() => {
    newPairsData.refreshTokens();
    finalStretchData.refreshTokens();
    migratedData.refreshTokens();
  }, [newPairsData, finalStretchData, migratedData]);

  const isConnected = newPairsData.isConnected && finalStretchData.isConnected && migratedData.isConnected;

  return (
    <div className={cn('flex flex-col', className)}>
      {/* Header */}
      <PulseHeader 
        isConnected={isConnected}
        onRefresh={handleRefreshAll}
      />
      
      {/* 3 Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3">
        <TokenColumn
          title="New Pairs"
          tabType="new-pairs"
          tokens={newPairsData.tokens}
          isLoading={newPairsData.isLoading}
          error={newPairsData.error}
          flashingTokens={newPairsData.flashingTokens}
          filters={newPairsData.filters}
          onApplyFilters={newPairsData.setFilters}
          onRefresh={newPairsData.refreshTokens}
        />
        
        <TokenColumn
          title="Final Stretch"
          tabType="final-stretch"
          tokens={finalStretchData.tokens}
          isLoading={finalStretchData.isLoading}
          error={finalStretchData.error}
          flashingTokens={finalStretchData.flashingTokens}
          filters={finalStretchData.filters}
          onApplyFilters={finalStretchData.setFilters}
          onRefresh={finalStretchData.refreshTokens}
        />
        
        <TokenColumn
          title="Migrated"
          tabType="migrated"
          tokens={migratedData.tokens}
          isLoading={migratedData.isLoading}
          error={migratedData.error}
          flashingTokens={migratedData.flashingTokens}
          filters={migratedData.filters}
          onApplyFilters={migratedData.setFilters}
          onRefresh={migratedData.refreshTokens}
        />
      </div>
    </div>
  );
};
