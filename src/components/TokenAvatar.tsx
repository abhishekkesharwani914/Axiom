import React, { memo } from 'react';
import { cn } from '@/lib/utils';

interface TokenAvatarProps {
  gradient: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showIndicator?: boolean;
  indicatorColor?: 'positive' | 'negative' | 'warning';
}

export const TokenAvatar = memo(({
  gradient,
  name,
  size = 'md',
  className,
  showIndicator = false,
  indicatorColor = 'positive',
}: TokenAvatarProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  const indicatorColorClasses = {
    positive: 'bg-positive',
    negative: 'bg-negative',
    warning: 'bg-warning',
  };

  return (
    <div className={cn('relative flex-shrink-0', className)}>
      <div
        className={cn(
          'rounded-full bg-gradient-to-br flex items-center justify-center font-semibold text-foreground',
          gradient,
          sizeClasses[size]
        )}
      >
        {name.slice(0, 2).toUpperCase()}
      </div>
      {showIndicator && (
        <div
          className={cn(
            'absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background',
            indicatorColorClasses[indicatorColor]
          )}
        />
      )}
    </div>
  );
});

TokenAvatar.displayName = 'TokenAvatar';
