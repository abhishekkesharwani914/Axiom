import React from 'react';
import { cn } from '@/lib/utils';
import { 
  SlidersHorizontal, 
  Bookmark, 
  Volume2, 
  Settings, 
  ChevronDown,
  LayoutGrid
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ConnectionStatus } from './ConnectionStatus';

interface PulseHeaderProps {
  isConnected: boolean;
  onRefresh: () => void;
}

export const PulseHeader = ({ isConnected, onRefresh }: PulseHeaderProps) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
      {/* Left side */}
      <div className="flex items-center gap-3">
        <h2 className="font-semibold text-lg">Pulse</h2>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <SlidersHorizontal className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <Settings className="w-4 h-4 text-muted-foreground" />
          </Button>
        </div>
      </div>
      
      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* Display dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
              <LayoutGrid className="w-3.5 h-3.5" />
              Display
              <ChevronDown className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>3 Columns</DropdownMenuItem>
            <DropdownMenuItem>2 Columns</DropdownMenuItem>
            <DropdownMenuItem>1 Column</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* Bookmark */}
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Bookmark className="w-4 h-4" />
        </Button>
        
        {/* Sound */}
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Volume2 className="w-4 h-4" />
        </Button>
        
        {/* Settings */}
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Settings className="w-4 h-4" />
        </Button>
        
        {/* Column toggle */}
        <div className="flex items-center gap-1 text-xs text-muted-foreground border border-border rounded px-2 py-1">
          <LayoutGrid className="w-3.5 h-3.5" />
          <span>1</span>
          <span className="text-muted">≡</span>
          <span>0</span>
        </div>
        
        <ConnectionStatus isConnected={isConnected} onRefresh={onRefresh} />
      </div>
    </div>
  );
};
