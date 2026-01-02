import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonRowProps {
  className?: string;
}

export const SkeletonRow = ({ className }: SkeletonRowProps) => {
  return (
    <div
      className={cn(
        'flex items-center gap-3 p-3 border-b border-border animate-pulse',
        className
      )}
    >
      {/* Avatar skeleton */}
      <div className="w-10 h-10 rounded-full bg-muted shimmer" />
      
      {/* Token info skeleton */}
      <div className="flex-1 min-w-0 space-y-2">
        <div className="flex items-center gap-2">
          <div className="h-4 w-20 rounded bg-muted shimmer" />
          <div className="h-3 w-12 rounded bg-muted shimmer" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-6 rounded bg-muted shimmer" />
          <div className="h-3 w-4 rounded bg-muted shimmer" />
          <div className="h-3 w-4 rounded bg-muted shimmer" />
        </div>
      </div>
      
      {/* Stats skeleton */}
      <div className="hidden sm:flex items-center gap-4">
        <div className="h-4 w-16 rounded bg-muted shimmer" />
        <div className="h-4 w-12 rounded bg-muted shimmer" />
        <div className="h-4 w-10 rounded bg-muted shimmer" />
      </div>
      
      {/* Percentages skeleton */}
      <div className="hidden md:flex items-center gap-3">
        <div className="h-4 w-10 rounded bg-muted shimmer" />
        <div className="h-4 w-10 rounded bg-muted shimmer" />
        <div className="h-4 w-10 rounded bg-muted shimmer" />
        <div className="h-4 w-10 rounded bg-muted shimmer" />
      </div>
      
      {/* Buy button skeleton */}
      <div className="h-8 w-28 rounded-lg bg-muted shimmer" />
    </div>
  );
};

export const TableSkeleton = ({ count = 10 }: { count?: number }) => {
  return (
    <div className="divide-y divide-border">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonRow key={i} />
      ))}
    </div>
  );
};
