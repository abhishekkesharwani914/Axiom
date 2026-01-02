import React from 'react';
import { cn } from '@/lib/utils';
import { 
  ExternalLink, 
  MessageCircle, 
  Globe, 
  Twitter,
  Send,
  Shield,
  BadgeCheck,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface SocialLinkProps {
  type: 'twitter' | 'website' | 'telegram';
  active: boolean;
  className?: string;
}

export const SocialLink = ({ type, active, className }: SocialLinkProps) => {
  const icons = {
    twitter: Twitter,
    website: Globe,
    telegram: Send,
  };
  
  const labels = {
    twitter: 'Twitter',
    website: 'Website',
    telegram: 'Telegram',
  };
  
  const Icon = icons[type];
  
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          className={cn(
            'p-1 rounded transition-colors',
            active 
              ? 'text-muted-foreground hover:text-foreground cursor-pointer' 
              : 'text-muted cursor-default opacity-30',
            className
          )}
          disabled={!active}
        >
          <Icon className="w-3.5 h-3.5" />
        </button>
      </TooltipTrigger>
      <TooltipContent side="top" className="text-xs">
        {active ? `View ${labels[type]}` : `No ${labels[type]}`}
      </TooltipContent>
    </Tooltip>
  );
};

interface VerifiedBadgeProps {
  className?: string;
}

export const VerifiedBadge = ({ className }: VerifiedBadgeProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className={cn('text-primary', className)}>
          <BadgeCheck className="w-4 h-4 fill-primary stroke-primary-foreground" />
        </span>
      </TooltipTrigger>
      <TooltipContent side="top" className="text-xs">
        Verified Token
      </TooltipContent>
    </Tooltip>
  );
};

interface MetricBadgeProps {
  type: 'dev' | 'bundled' | 'insider' | 'sniper';
  value: number;
  compact?: boolean;
  className?: string;
}

export const MetricBadge = ({ type, value, compact = false, className }: MetricBadgeProps) => {
  const labels = {
    dev: 'Dev',
    bundled: 'Bundle',
    insider: 'Insider',
    sniper: 'Sniper',
  };
  
  const shortLabels = {
    dev: 'D',
    bundled: 'B',
    insider: 'I',
    sniper: 'S',
  };
  
  const icons = {
    dev: Shield,
    bundled: MessageCircle,
    insider: ExternalLink,
    sniper: ExternalLink,
  };
  
  const colorClasses = {
    dev: 'text-dev',
    bundled: 'text-bundled',
    insider: 'text-insider',
    sniper: 'text-sniper',
  };
  
  const descriptions = {
    dev: 'Percentage held by developers',
    bundled: 'Percentage in bundle wallets',
    insider: 'Percentage held by insiders',
    sniper: 'Percentage held by snipers',
  };
  
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span
          className={cn(
            'font-medium cursor-help',
            compact ? 'text-2xs' : 'text-xs',
            colorClasses[type],
            className
          )}
        >
          {compact ? `${shortLabels[type]}:${value}%` : `${value}%`}
        </span>
      </TooltipTrigger>
      <TooltipContent side="top" className="text-xs max-w-[200px]">
        <div className="font-medium">{labels[type]}: {value}%</div>
        <div className="text-muted-foreground mt-1">{descriptions[type]}</div>
      </TooltipContent>
    </Tooltip>
  );
};
