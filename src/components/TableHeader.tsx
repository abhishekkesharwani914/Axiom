import React from 'react';
import { cn } from '@/lib/utils';
import { SortConfig, SortField, FilterConfig } from '@/types/token';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import { FilterPopover } from './FilterPopover';

interface TableHeaderProps {
  sortConfig: SortConfig;
  filters: FilterConfig;
  onSort: (field: SortField) => void;
  onApplyFilters: (filters: FilterConfig) => void;
  className?: string;
}

interface SortableHeaderProps {
  field: SortField;
  label: string;
  currentSort: SortConfig;
  onSort: (field: SortField) => void;
  className?: string;
}

const SortableHeader = ({
  field,
  label,
  currentSort,
  onSort,
  className,
}: SortableHeaderProps) => {
  const isActive = currentSort.field === field;
  
  return (
    <button
      onClick={() => onSort(field)}
      className={cn(
        'flex items-center gap-1 text-xs font-medium transition-colors',
        'hover:text-foreground focus:outline-none',
        isActive ? 'text-foreground' : 'text-muted-foreground',
        className
      )}
    >
      <span>{label}</span>
      {isActive ? (
        currentSort.direction === 'asc' ? (
          <ChevronUp className="w-3 h-3" />
        ) : (
          <ChevronDown className="w-3 h-3" />
        )
      ) : (
        <ChevronsUpDown className="w-3 h-3 opacity-50" />
      )}
    </button>
  );
};

export const TableHeader = ({
  sortConfig,
  filters,
  onSort,
  onApplyFilters,
  className,
}: TableHeaderProps) => {
  return (
    <div
      className={cn(
        'flex items-center gap-1 xs:gap-2 sm:gap-3 px-2 sm:px-3 py-2 bg-secondary/50 border-b border-border',
        className
      )}
    >
      {/* Token column placeholder */}
      <div className="flex-1 min-w-0">
        <SortableHeader
          field="age"
          label="Token"
          currentSort={sortConfig}
          onSort={onSort}
        />
      </div>
      
      {/* Percentages headers - tablet and up */}
      <div className="hidden md:flex items-center gap-2 lg:gap-3">
        <SortableHeader
          field="devPercent"
          label="Dev%"
          currentSort={sortConfig}
          onSort={onSort}
          className="w-12"
        />
        <SortableHeader
          field="bundledPercent"
          label="Bundle%"
          currentSort={sortConfig}
          onSort={onSort}
          className="w-14"
        />
        <SortableHeader
          field="insiderPercent"
          label="Insider%"
          currentSort={sortConfig}
          onSort={onSort}
          className="w-14"
        />
        <SortableHeader
          field="sniperPercent"
          label="Sniper%"
          currentSort={sortConfig}
          onSort={onSort}
          className="w-14"
        />
      </div>
      
      {/* Market cap header - hidden on mobile */}
      <div className="hidden xs:flex flex-col items-end min-w-[50px] sm:min-w-[70px]">
        <SortableHeader
          field="marketCap"
          label="MC"
          currentSort={sortConfig}
          onSort={onSort}
        />
      </div>
      
      {/* Filter popover */}
      <FilterPopover
        filters={filters}
        onApplyFilters={onApplyFilters}
      />
    </div>
  );
};
