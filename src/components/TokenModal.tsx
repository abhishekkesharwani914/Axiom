import React from 'react';
import { Token } from '@/types/token';
import { TokenAvatar } from './TokenAvatar';
import { MetricBadge, SocialLink, VerifiedBadge } from './TokenBadges';
import { BuyButton } from './BuyButton';
import { formatMarketCap, formatVolume } from '@/lib/mockData';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { 
  Users, 
  Activity, 
  TrendingUp, 
  BarChart3, 
  Wallet,
  ExternalLink,
  Copy,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface TokenModalProps {
  token: Token | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBuy?: (token: Token) => void;
}

export const TokenModal = ({
  token,
  open,
  onOpenChange,
  onBuy,
}: TokenModalProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  if (!token) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(token.id);
    setCopied(true);
    toast({ title: 'Address copied!' });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <TokenAvatar gradient={token.avatar} name={token.name} size="lg" />
            <div>
              <div className="flex items-center gap-2">
                <span>{token.name}</span>
                {token.verified && <VerifiedBadge />}
              </div>
              <span className="text-sm font-normal text-muted-foreground">
                {token.ticker}
              </span>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Social Links */}
          <div className="flex items-center gap-2">
            <SocialLink type="twitter" active={token.hasTwitter} />
            <SocialLink type="website" active={token.hasWebsite} />
            <SocialLink type="telegram" active={token.hasTelegram} />
            
            <div className="flex-1" />
            
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-xs"
              onClick={handleCopy}
            >
              {copied ? (
                <Check className="w-3 h-3 mr-1" />
              ) : (
                <Copy className="w-3 h-3 mr-1" />
              )}
              Copy Address
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-secondary/50 rounded-lg p-3">
              <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                <Wallet className="w-3.5 h-3.5" />
                Market Cap
              </div>
              <div className="text-lg font-semibold">
                {formatMarketCap(token.marketCap)}
              </div>
            </div>
            
            <div className="bg-secondary/50 rounded-lg p-3">
              <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                <BarChart3 className="w-3.5 h-3.5" />
                Volume
              </div>
              <div className="text-lg font-semibold">
                {formatVolume(token.volume)}
              </div>
            </div>
            
            <div className="bg-secondary/50 rounded-lg p-3">
              <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                <Users className="w-3.5 h-3.5" />
                Holders
              </div>
              <div className="text-lg font-semibold">{token.holders}</div>
            </div>
            
            <div className="bg-secondary/50 rounded-lg p-3">
              <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                <Activity className="w-3.5 h-3.5" />
                Transactions
              </div>
              <div className="text-lg font-semibold">{token.transactions}</div>
            </div>
          </div>

          {/* Token Metrics */}
          <div className="bg-secondary/50 rounded-lg p-3">
            <div className="text-xs text-muted-foreground mb-2">Token Distribution</div>
            <div className="grid grid-cols-4 gap-2">
              <div className="text-center">
                <div className="text-xs text-muted-foreground mb-1">Dev</div>
                <MetricBadge type="dev" value={token.devPercent} />
              </div>
              <div className="text-center">
                <div className="text-xs text-muted-foreground mb-1">Bundle</div>
                <MetricBadge type="bundled" value={token.bundledPercent} />
              </div>
              <div className="text-center">
                <div className="text-xs text-muted-foreground mb-1">Insider</div>
                <MetricBadge type="insider" value={token.insiderPercent} />
              </div>
              <div className="text-center">
                <div className="text-xs text-muted-foreground mb-1">Sniper</div>
                <MetricBadge type="sniper" value={token.sniperPercent} />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button variant="secondary" className="flex-1" asChild>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Chart
              </a>
            </Button>
            <BuyButton 
              amount={token.buyAmount} 
              onClick={() => onBuy?.(token)}
              className="flex-1 justify-center"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
