import React, { memo } from 'react';
import { cn } from '@/lib/utils';
import { Token } from '@/types/token';
import { formatMarketCap, formatVolume } from '@/lib/mockData';
import { BuyButton } from './BuyButton';
import { 
  Link2, 
  Globe, 
  Search, 
  Copy, 
  Lock, 
  Users, 
  MessageSquare, 
  Bookmark,
  Send
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface TokenCardProps {
  token: Token;
  flashing?: 'positive' | 'negative' | null;
  onBuy?: (token: Token) => void;
  showBondingCurve?: boolean;
}

export const TokenCard = memo(({
  token,
  flashing,
  onBuy,
  showBondingCurve = false,
}: TokenCardProps) => {
  const txProgress = Math.min((token.transactions / 500) * 100, 100);
  
  return (
    <div
      className={cn(
        'bg-card border border-border rounded-lg p-3 hover:bg-accent/30 transition-all duration-150',
        flashing === 'positive' && 'flash-positive',
        flashing === 'negative' && 'flash-negative',
      )}
    >
      {/* Row 1: Avatar + Token Info + Market Cap */}
      <div className="flex items-start gap-3">
        {/* Avatar with status ring */}
        <div className="relative flex-shrink-0">
          <div className={cn(
            'w-14 h-14 rounded-lg bg-gradient-to-br flex items-center justify-center text-lg font-bold text-white overflow-hidden',
            token.avatar,
            'ring-2 ring-offset-1 ring-offset-background',
            token.status === 'positive' && 'ring-positive',
            token.status === 'negative' && 'ring-negative',
            token.status === 'neutral' && 'ring-muted-foreground',
          )}>
            {token.name.charAt(0)}
          </div>
          {/* Status indicator dot */}
          <div className={cn(
            'absolute -bottom-1 -left-1 w-3 h-3 rounded-full border-2 border-background',
            token.status === 'positive' && 'bg-positive',
            token.status === 'negative' && 'bg-negative',
            token.status === 'neutral' && 'bg-muted-foreground',
          )} />
        </div>
        
        {/* Token Info */}
        <div className="flex-1 min-w-0">
          {/* Name row */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-semibold text-sm truncate">{token.name}</span>
            <span className="text-muted-foreground text-xs truncate">{token.ticker}</span>
            <Lock className="w-3 h-3 text-muted-foreground flex-shrink-0" />
            <Copy className="w-3 h-3 text-muted-foreground hover:text-foreground cursor-pointer flex-shrink-0" />
          </div>
          
          {/* Timer badge */}
          {token.timer && (
            <span className="inline-flex items-center px-1.5 py-0.5 bg-positive/20 text-positive text-2xs rounded mt-0.5">
              ⏱ {token.timer}
            </span>
          )}
          
          {/* Social links and metrics row */}
          <div className="flex items-center gap-1.5 mt-1 text-2xs text-muted-foreground">
            <span className={cn(
              token.ageSeconds < 60 ? 'text-positive' : ''
            )}>{token.age}</span>
            <Link2 className={cn('w-3 h-3', token.hasWebsite ? 'text-muted-foreground' : 'text-muted/50')} />
            <Globe className={cn('w-3 h-3', token.hasWebsite ? 'text-muted-foreground' : 'text-muted/50')} />
            <Send className={cn('w-3 h-3', token.hasTelegram ? 'text-muted-foreground' : 'text-muted/50')} />
            <Search className="w-3 h-3" />
            
            <span className="flex items-center gap-0.5 ml-1">
              <Users className="w-3 h-3" />
              {token.proTraders}
            </span>
            <span className="flex items-center gap-0.5">
              <span className="text-muted-foreground">⚡</span>
              {token.holders}
            </span>
            <span className="flex items-center gap-0.5">
              <MessageSquare className="w-3 h-3" />
              {token.comments}
            </span>
            <span className="flex items-center gap-0.5">
              <Bookmark className="w-3 h-3" />
              {token.transactions > 100 ? `${Math.floor(token.transactions / 100)}/${Math.floor(token.transactions / 50)}` : '0/0'}
            </span>
          </div>
        </div>
        
        {/* Market Cap & Volume */}
        <div className="text-right flex-shrink-0">
          <div className="flex items-center justify-end gap-1">
            <span className="text-2xs text-muted-foreground">MC</span>
            <span className={cn(
              'font-semibold text-sm',
              flashing === 'positive' && 'text-positive',
              flashing === 'negative' && 'text-negative',
            )}>
              {formatMarketCap(token.marketCap)}
            </span>
          </div>
          <div className="flex items-center justify-end gap-1 text-2xs">
            <span className="text-muted-foreground">V</span>
            <span className="text-positive">{formatVolume(token.volume)}</span>
          </div>
        </div>
      </div>
      
      {/* Row 2: Fee, TX progress, Buy button */}
      <div className="flex items-center gap-2 mt-2">
        <div className="flex items-center gap-2 text-2xs text-muted-foreground flex-1">
          <span>F</span>
          <span className="text-foreground">{token.fee.toFixed(3)}</span>
          <span className="text-primary">TX {token.transactions}</span>
          <div className="flex-1 max-w-[80px]">
            <Progress value={txProgress} className="h-1 bg-muted" />
          </div>
        </div>
        
        {showBondingCurve && token.bondingCurve && (
          <div className="flex items-center gap-1 text-2xs">
            <span className="text-muted-foreground">Bonding:</span>
            <span className="text-primary">{token.bondingCurve}%</span>
          </div>
        )}
        
        <BuyButton 
          amount={token.buyAmount} 
          onClick={() => onBuy?.(token)}
        />
      </div>
      
      {/* Row 3: Metric percentages */}
      <div className="flex items-center gap-3 mt-2 text-2xs">
        <div className="flex items-center gap-1">
          <Users className="w-3 h-3 text-dev" />
          <span className={cn(
            token.devPercent < 5 ? 'text-positive' : token.devPercent > 50 ? 'text-negative' : 'text-dev'
          )}>{token.devPercent}%</span>
          {token.devHoldTime && <span className="text-muted-foreground">⬇ {token.devHoldTime}</span>}
        </div>
        
        <div className="flex items-center gap-1">
          <span className="text-bundled">⬇</span>
          <span className={cn(
            token.bundledPercent < 5 ? 'text-positive' : token.bundledPercent > 50 ? 'text-negative' : 'text-bundled'
          )}>{token.bundledPercent}%</span>
          {token.bundledHoldTime && <span className="text-muted-foreground">{token.bundledHoldTime}</span>}
        </div>
        
        <div className="flex items-center gap-1">
          <span className="text-insider">⊕</span>
          <span className={cn(
            token.insiderPercent < 5 ? 'text-positive' : token.insiderPercent > 50 ? 'text-negative' : 'text-insider'
          )}>{token.insiderPercent}%</span>
        </div>
        
        <div className="flex items-center gap-1">
          <span className="text-sniper">⊕</span>
          <span className={cn(
            token.sniperPercent < 5 ? 'text-positive' : token.sniperPercent > 50 ? 'text-negative' : 'text-sniper'
          )}>{token.sniperPercent}%</span>
        </div>
      </div>
      
      {/* Row 4: Wallet address */}
      <div className="mt-2 text-2xs text-muted-foreground">
        {token.walletAddress}
      </div>
    </div>
  );
});

TokenCard.displayName = 'TokenCard';
