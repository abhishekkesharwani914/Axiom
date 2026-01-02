import React from 'react';
import { cn } from '@/lib/utils';
import { TabType } from '@/types/token';
import { Sparkles, TrendingUp, Rocket } from 'lucide-react';

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  className?: string;
}

const tabs: { id: TabType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'new-pairs', label: 'New Pairs', icon: Sparkles },
  { id: 'final-stretch', label: 'Final Stretch', icon: TrendingUp },
  { id: 'migrated', label: 'Migrated', icon: Rocket },
];

export const TabNavigation = ({
  activeTab,
  onTabChange,
  className,
}: TabNavigationProps) => {
  return (
    <div className={cn('flex border-b border-border overflow-x-auto scrollbar-hide', className)}>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              'flex items-center gap-1 xs:gap-2 px-2 xs:px-3 sm:px-4 py-2.5 sm:py-3 text-sm font-medium transition-colors relative whitespace-nowrap flex-shrink-0',
              'hover:text-foreground focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary/50',
              isActive
                ? 'text-foreground'
                : 'text-muted-foreground',
            )}
          >
            <Icon className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
            <span className="text-2xs xs:text-xs sm:text-sm">{tab.label}</span>
            
            {/* Active indicator */}
            {isActive && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        );
      })}
    </div>
  );
};
