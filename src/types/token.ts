export interface Token {
  id: string;
  name: string;
  ticker: string;
  avatar: string;
  verified: boolean;
  age: string;
  ageSeconds: number;
  
  // Social links
  hasTwitter: boolean;
  hasWebsite: boolean;
  hasTelegram: boolean;
  
  // Metrics
  holders: number;
  proTraders: number;
  transactions: number;
  comments: number;
  
  // Percentages
  devPercent: number;
  bundledPercent: number;
  insiderPercent: number;
  sniperPercent: number;
  devHoldTime?: string;
  bundledHoldTime?: string;
  
  // Financials
  marketCap: number;
  volume: number;
  liquidity: number;
  fee: number;
  
  // Price
  price: number;
  priceChange: number;
  
  // Buy amount
  buyAmount: number;
  
  // Bonding curve (for Final Stretch)
  bondingCurve?: number;
  
  // Wallet address
  walletAddress: string;
  
  // Status indicator
  status: 'positive' | 'negative' | 'neutral';
  
  // Timer (for special tokens)
  timer?: string;
}

export type TabType = 'new-pairs' | 'final-stretch' | 'migrated';

export type SortField = 
  | 'age' 
  | 'holders' 
  | 'marketCap' 
  | 'volume' 
  | 'transactions'
  | 'devPercent'
  | 'bundledPercent'
  | 'insiderPercent'
  | 'sniperPercent';

export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

export interface FilterConfig {
  ageMin?: number;
  ageMax?: number;
  holdersMin?: number;
  holdersMax?: number;
  devPercentMax?: number;
  bundledPercentMax?: number;
  insiderPercentMax?: number;
  sniperPercentMax?: number;
  marketCapMin?: number;
  marketCapMax?: number;
  volumeMin?: number;
  volumeMax?: number;
}
