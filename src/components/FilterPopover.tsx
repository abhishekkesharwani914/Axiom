import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { FilterConfig } from '@/types/token';
import { SlidersHorizontal, X } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface FilterPopoverProps {
  filters: FilterConfig;
  onApplyFilters: (filters: FilterConfig) => void;
  className?: string;
}

const PERCENTAGE_OPTIONS = [
  { value: '', label: 'Any' },
  { value: '10', label: '≤ 10%' },
  { value: '20', label: '≤ 20%' },
  { value: '30', label: '≤ 30%' },
  { value: '50', label: '≤ 50%' },
  { value: '75', label: '≤ 75%' },
];

const AGE_OPTIONS = [
  { value: '', label: 'Any' },
  { value: '5', label: '≤ 5 min' },
  { value: '15', label: '≤ 15 min' },
  { value: '30', label: '≤ 30 min' },
  { value: '60', label: '≤ 1 hour' },
  { value: '120', label: '≤ 2 hours' },
];

const MARKET_CAP_OPTIONS = [
  { value: '', label: 'Any' },
  { value: '5000', label: '≥ $5K' },
  { value: '10000', label: '≥ $10K' },
  { value: '25000', label: '≥ $25K' },
  { value: '50000', label: '≥ $50K' },
  { value: '100000', label: '≥ $100K' },
];

const HOLDERS_OPTIONS = [
  { value: '', label: 'Any' },
  { value: '10', label: '≥ 10' },
  { value: '25', label: '≥ 25' },
  { value: '50', label: '≥ 50' },
  { value: '100', label: '≥ 100' },
  { value: '500', label: '≥ 500' },
];

export const FilterPopover = ({
  filters,
  onApplyFilters,
  className,
}: FilterPopoverProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState<FilterConfig>(filters);
  
  // Count active filters
  const activeFilterCount = Object.values(filters).filter(v => v !== undefined).length;
  
  const handleReset = useCallback(() => {
    const emptyFilters: FilterConfig = {};
    setLocalFilters(emptyFilters);
    onApplyFilters(emptyFilters);
  }, [onApplyFilters]);
  
  const handleApply = useCallback(() => {
    onApplyFilters(localFilters);
    setIsOpen(false);
  }, [localFilters, onApplyFilters]);
  
  const updateFilter = useCallback((key: keyof FilterConfig, value: string) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: value && value !== 'any' ? Number(value) : undefined,
    }));
  }, []);
  
  // Sync local state when popover opens
  const handleOpenChange = (open: boolean) => {
    if (open) {
      setLocalFilters(filters);
    }
    setIsOpen(open);
  };
  
  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            'h-7 w-7 xs:h-8 xs:w-8 p-0 relative',
            activeFilterCount > 0 && 'text-primary',
            className
          )}
        >
          <SlidersHorizontal className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
          {activeFilterCount > 0 && (
            <Badge 
              variant="default" 
              className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-2xs"
            >
              {activeFilterCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 xs:w-80" align="end">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-sm">Filters</h4>
            {activeFilterCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
              >
                <X className="w-3 h-3 mr-1" />
                Clear all
              </Button>
            )}
          </div>
          
          <div className="space-y-3">
            {/* Age filter */}
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground">Age</label>
              <Select
                value={localFilters.ageMax?.toString() || ''}
                onValueChange={(v) => updateFilter('ageMax', v)}
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue placeholder="Any age" />
                </SelectTrigger>
                <SelectContent>
                  {AGE_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value || 'any-age'} value={opt.value || 'any'} className="text-xs">
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Min Holders filter */}
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground">Min Holders</label>
              <Select
                value={localFilters.holdersMin?.toString() || ''}
                onValueChange={(v) => updateFilter('holdersMin', v)}
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue placeholder="Any holders" />
                </SelectTrigger>
                <SelectContent>
                  {HOLDERS_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value || 'any-holders'} value={opt.value || 'any'} className="text-xs">
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Market Cap filter */}
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground">Min Market Cap</label>
              <Select
                value={localFilters.marketCapMin?.toString() || ''}
                onValueChange={(v) => updateFilter('marketCapMin', v)}
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue placeholder="Any market cap" />
                </SelectTrigger>
                <SelectContent>
                  {MARKET_CAP_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value || 'any-mc'} value={opt.value || 'any'} className="text-xs">
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Percentage filters */}
            <div className="pt-2 border-t border-border">
              <label className="text-xs text-muted-foreground mb-2 block">Max Percentages</label>
              <div className="grid grid-cols-2 gap-2">
                {/* Dev % */}
                <div className="space-y-1">
                  <label className="text-2xs text-dev">Dev %</label>
                  <Select
                    value={localFilters.devPercentMax?.toString() || ''}
                    onValueChange={(v) => updateFilter('devPercentMax', v)}
                  >
                    <SelectTrigger className="h-7 text-xs">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      {PERCENTAGE_OPTIONS.map((opt) => (
                        <SelectItem key={`dev-${opt.value || 'any'}`} value={opt.value || 'any'} className="text-xs">
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Bundle % */}
                <div className="space-y-1">
                  <label className="text-2xs text-bundled">Bundle %</label>
                  <Select
                    value={localFilters.bundledPercentMax?.toString() || ''}
                    onValueChange={(v) => updateFilter('bundledPercentMax', v)}
                  >
                    <SelectTrigger className="h-7 text-xs">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      {PERCENTAGE_OPTIONS.map((opt) => (
                        <SelectItem key={`bundle-${opt.value || 'any'}`} value={opt.value || 'any'} className="text-xs">
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Insider % */}
                <div className="space-y-1">
                  <label className="text-2xs text-insider">Insider %</label>
                  <Select
                    value={localFilters.insiderPercentMax?.toString() || ''}
                    onValueChange={(v) => updateFilter('insiderPercentMax', v)}
                  >
                    <SelectTrigger className="h-7 text-xs">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      {PERCENTAGE_OPTIONS.map((opt) => (
                        <SelectItem key={`insider-${opt.value || 'any'}`} value={opt.value || 'any'} className="text-xs">
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Sniper % */}
                <div className="space-y-1">
                  <label className="text-2xs text-sniper">Sniper %</label>
                  <Select
                    value={localFilters.sniperPercentMax?.toString() || ''}
                    onValueChange={(v) => updateFilter('sniperPercentMax', v)}
                  >
                    <SelectTrigger className="h-7 text-xs">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      {PERCENTAGE_OPTIONS.map((opt) => (
                        <SelectItem key={`sniper-${opt.value || 'any'}`} value={opt.value || 'any'} className="text-xs">
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2 pt-2">
            <Button 
              size="sm" 
              variant="secondary" 
              className="flex-1 h-8 text-xs"
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button 
              size="sm" 
              className="flex-1 h-8 text-xs"
              onClick={handleApply}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};