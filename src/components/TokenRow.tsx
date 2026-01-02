import React, { memo } from 'react';
import { cn } from '@/lib/utils';
import { Token } from '@/types/token';
import { TokenAvatar } from './TokenAvatar';
import { BuyButton } from './BuyButton';
import { SocialLink, VerifiedBadge, MetricBadge } from './TokenBadges';
import { formatMarketCap, formatVolume } from '@/lib/mockData';
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Users, Activity, MessageSquare, Search } from 'lucide-react';

interface TokenRowProps {
  token: Token;
  flashing?: 'positive' | 'negative' | null;
  onBuy?: (token: Token) => void;
  showBondingCurve?: boolean;
}

export const TokenRow = memo(({
  token,
  flashing,
  onBuy,
  showBondingCurve = false,
}: TokenRowProps) => {
  return (
    <div
      className={cn(
        'flex flex-col xs:flex-row xs:items-center gap-2 p-2 sm:p-3 border-b border-border',
        'hover:bg-accent/50 transition-all duration-150',
        flashing === 'positive' && 'flash-positive',
        flashing === 'negative' && 'flash-negative',
      )}
    >
      {/* Mobile: Top row with avatar, name, and buy button */}
      <div className="flex items-center gap-2 w-full xs:flex-1 xs:min-w-0">
        {/* Avatar */}
        <TokenAvatar 
          gradient={token.avatar} 
          name={token.name}
          showIndicator={showBondingCurve && token.bondingCurve && token.bondingCurve > 90}
          indicatorColor="positive"
        />
        
        {/* Token Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 flex-wrap">
            <HoverCard openDelay={300} closeDelay={100}>
              <HoverCardTrigger asChild>
                <button className="flex items-center gap-1 hover:text-primary transition-colors">
                  <span className="font-semibold text-xs sm:text-sm truncate max-w-[70px] xs:max-w-[100px] sm:max-w-[120px]">
                    {token.name}
                  </span>
                  {token.verified && <VerifiedBadge />}
                </button>
              </HoverCardTrigger>
              <HoverCardContent 
                className="w-64 sm:w-72 p-3 sm:p-4" 
                side="bottom"
                align="start"
              >
                <div className="flex gap-2 sm:gap-3">
                  <TokenAvatar gradient={token.avatar} name={token.name} size="lg" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="font-semibold truncate text-sm">{token.name}</span>
                      {token.verified && <VerifiedBadge />}
                    </div>
                    <span className="text-xs text-muted-foreground">{token.ticker}</span>
                  </div>
                </div>
                
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3 h-3 text-muted-foreground" />
                    <span>{token.holders} holders</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Activity className="w-3 h-3 text-muted-foreground" />
                    <span>{token.transactions} txns</span>
                  </div>
                </div>
                
                <div className="mt-2 pt-2 border-t border-border">
                  <div className="text-2xs text-muted-foreground mb-1.5">Token Metrics</div>
                  <div className="flex flex-wrap gap-2">
                    <MetricBadge type="dev" value={token.devPercent} />
                    <MetricBadge type="bundled" value={token.bundledPercent} />
                    <MetricBadge type="insider" value={token.insiderPercent} />
                    <MetricBadge type="sniper" value={token.sniperPercent} />
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
          
          {/* Social Links & Age Row */}
          <div className="flex items-center gap-1 mt-0.5 flex-wrap">
            <span className="text-2xs xs:text-xs text-muted-foreground">{token.age}</span>
            
            <div className="flex items-center gap-0.5 ml-1">
              <SocialLink type="twitter" active={token.hasTwitter} />
              <SocialLink type="website" active={token.hasWebsite} />
              <SocialLink type="telegram" active={token.hasTelegram} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile only: Bottom row with metrics and MC */}
      <div className="flex items-center justify-between gap-2 w-full xs:hidden pl-10">
        <div className="flex items-center gap-1.5 text-2xs">
          <MetricBadge type="dev" value={token.devPercent} compact />
          <MetricBadge type="bundled" value={token.bundledPercent} compact />
          <MetricBadge type="insider" value={token.insiderPercent} compact />
          <MetricBadge type="sniper" value={token.sniperPercent} compact />
        </div>
        
        <div className="flex items-center gap-2">
          <span className={cn(
            'font-medium text-2xs',
            flashing === 'positive' && 'text-positive',
            flashing === 'negative' && 'text-negative',
          )}>
            {formatMarketCap(token.marketCap)}
          </span>
          <BuyButton 
            amount={token.buyAmount} 
            onClick={() => onBuy?.(token)}
          />
        </div>
      </div>
      
      {/* Tablet+: Percentages - Hidden on smallest screens */}
      <div className="hidden md:flex items-center gap-2 lg:gap-3 text-xs">
        <div className="flex flex-col items-end">
          <span className="text-dev text-2xs">Dev</span>
          <MetricBadge type="dev" value={token.devPercent} />
        </div>
        <div className="flex flex-col items-end">
          <span className="text-bundled text-2xs">Bundle</span>
          <MetricBadge type="bundled" value={token.bundledPercent} />
        </div>
        <div className="flex flex-col items-end">
          <span className="text-insider text-2xs">Insider</span>
          <MetricBadge type="insider" value={token.insiderPercent} />
        </div>
        <div className="flex flex-col items-end">
          <span className="text-sniper text-2xs">Sniper</span>
          <MetricBadge type="sniper" value={token.sniperPercent} />
        </div>
      </div>
      
      {/* xs+: Market Cap & Volume */}
      <div className="hidden xs:flex flex-col items-end text-xs min-w-[60px] sm:min-w-[70px]">
        <div className="flex items-center gap-1">
          <span className="text-muted-foreground text-2xs sm:text-xs">MC:</span>
          <span className={cn(
            'font-semibold text-2xs sm:text-xs',
            flashing === 'positive' && 'text-positive',
            flashing === 'negative' && 'text-negative',
          )}>
            {formatMarketCap(token.marketCap)}
          </span>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground text-2xs sm:text-xs">
          <span>V:</span>
          <span>{formatVolume(token.volume)}</span>
        </div>
        <div className="text-muted-foreground text-2xs sm:text-xs">
          TX: {token.transactions}
        </div>
      </div>
      
      {/* xs+: Buy Button */}
      <div className="hidden xs:block flex-shrink-0">
        <BuyButton 
          amount={token.buyAmount} 
          onClick={() => onBuy?.(token)}
        />
      </div>
    </div>
  );
});

TokenRow.displayName = 'TokenRow';
