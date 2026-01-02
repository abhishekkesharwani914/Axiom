import React from 'react';
import { cn } from '@/lib/utils';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ConnectionStatusProps {
  isConnected: boolean;
  onRefresh?: () => void;
  className?: string;
}

export const ConnectionStatus = ({
  isConnected,
  onRefresh,
  className,
}: ConnectionStatusProps) => {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              'flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium',
              isConnected
                ? 'bg-positive/10 text-positive'
                : 'bg-destructive/10 text-destructive'
            )}
          >
            {isConnected ? (
              <>
                <Wifi className="w-3 h-3" />
                <span className="hidden sm:inline">Live</span>
              </>
            ) : (
              <>
                <WifiOff className="w-3 h-3" />
                <span className="hidden sm:inline">Disconnected</span>
              </>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-xs">
          {isConnected 
            ? 'Receiving real-time price updates' 
            : 'Connection lost. Click refresh to reconnect.'}
        </TooltipContent>
      </Tooltip>
      
      {onRefresh && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0"
              onClick={onRefresh}
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="text-xs">
            Refresh tokens
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
};
