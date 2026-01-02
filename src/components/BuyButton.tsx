import React, { memo } from 'react';
import { cn } from '@/lib/utils';
import { Zap } from 'lucide-react';

interface BuyButtonProps {
  amount: number;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export const BuyButton = memo(({
  amount,
  onClick,
  className,
  disabled = false,
}: BuyButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex items-center gap-1 px-2 py-1 rounded text-2xs font-medium',
        'bg-primary hover:bg-primary/90 text-primary-foreground',
        'transition-all duration-150 ease-out',
        'hover:scale-[1.02] active:scale-[0.98]',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
        'focus:outline-none focus:ring-2 focus:ring-primary/50',
        className
      )}
    >
      <Zap className="w-3 h-3 fill-current" />
      <span>${amount} SOL</span>
    </button>
  );
});

BuyButton.displayName = 'BuyButton';
