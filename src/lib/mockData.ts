import { Token } from '@/types/token';

const tokenNames = [
  { name: 'Grok', ticker: 'Rainbow Grok' },
  { name: '$JUAN', ticker: 'JUAN' },
  { name: 'Wizdaddy', ticker: 'Wizdaddy' },
  { name: 'TwinTwin', ticker: 'TwinTwin' },
  { name: 'Google Ai', ticker: 'Google Coin' },
  { name: 'EIG', ticker: 'EIG Ponzi' },
  { name: 'PEPE2026', ticker: 'PEPE2026' },
  { name: 'HORSEWHALE', ticker: 'HORSE WHALE' },
  { name: 'Toyota', ticker: 'Toyota' },
  { name: 'Day1', ticker: 'Bullish Start' },
  { name: 'MetaMak', ticker: 'MetaMask AI2026' },
  { name: 'SolanaMax', ticker: 'SOLMAX' },
  { name: 'MemeKing', ticker: 'MKING' },
  { name: 'DefiPunk', ticker: 'DPUNK' },
  { name: 'CryptoWhale', ticker: 'CWHALE' },
  { name: 'MoonShot', ticker: 'MOON' },
  { name: 'RocketFi', ticker: 'ROCKET' },
  { name: 'DiamondHands', ticker: 'DHAND' },
  { name: 'PepeMax', ticker: 'PMAX' },
  { name: 'ShibaElite', ticker: 'SELITE' },
];

const avatarColors = [
  'from-cyan-500 to-blue-600',
  'from-purple-500 to-pink-600',
  'from-green-500 to-teal-600',
  'from-orange-500 to-red-600',
  'from-yellow-500 to-orange-600',
  'from-indigo-500 to-purple-600',
  'from-pink-500 to-rose-600',
  'from-teal-500 to-cyan-600',
];

const getRandomAge = (): { age: string; ageSeconds: number } => {
  const seconds = Math.floor(Math.random() * 7200);
  if (seconds < 60) {
    return { age: `${seconds}s`, ageSeconds: seconds };
  } else if (seconds < 3600) {
    const mins = Math.floor(seconds / 60);
    return { age: `${mins}m`, ageSeconds: seconds };
  } else {
    const hours = Math.floor(seconds / 3600);
    return { age: `${hours}h`, ageSeconds: seconds };
  }
};

const generateWalletAddress = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const prefix = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  const suffix = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `${prefix}...${suffix}`;
};

const getRandomHoldTime = (): string => {
  const units = ['m', 'mo', 'h', 'd'];
  const num = Math.floor(Math.random() * 12) + 1;
  return `${num}${units[Math.floor(Math.random() * units.length)]}`;
};

export const generateToken = (index: number): Token => {
  const tokenInfo = tokenNames[index % tokenNames.length];
  const { age, ageSeconds } = getRandomAge();
  
  return {
    id: `token-${index}-${Date.now()}`,
    name: tokenInfo.name,
    ticker: tokenInfo.ticker,
    avatar: avatarColors[index % avatarColors.length],
    verified: Math.random() > 0.7,
    age,
    ageSeconds,
    hasTwitter: Math.random() > 0.3,
    hasWebsite: Math.random() > 0.5,
    hasTelegram: Math.random() > 0.6,
    holders: Math.floor(Math.random() * 500) + 10,
    proTraders: Math.floor(Math.random() * 20),
    transactions: Math.floor(Math.random() * 500) + 10,
    comments: Math.floor(Math.random() * 15),
    devPercent: Math.floor(Math.random() * 100),
    bundledPercent: Math.floor(Math.random() * 100),
    insiderPercent: Math.floor(Math.random() * 100),
    sniperPercent: Math.floor(Math.random() * 100),
    devHoldTime: getRandomHoldTime(),
    bundledHoldTime: getRandomHoldTime(),
    marketCap: Math.floor(Math.random() * 2000000) + 5000,
    volume: Math.floor(Math.random() * 50000) + 100,
    liquidity: Math.floor(Math.random() * 5000) + 500,
    fee: parseFloat((Math.random() * 0.1).toFixed(3)),
    price: Math.random() * 0.001,
    priceChange: (Math.random() - 0.5) * 20,
    buyAmount: Math.floor(Math.random() * 5) + 1,
    bondingCurve: Math.floor(Math.random() * 30) + 70,
    walletAddress: generateWalletAddress(),
    status: Math.random() > 0.5 ? 'positive' : Math.random() > 0.5 ? 'negative' : 'neutral',
    timer: Math.random() > 0.8 ? `${Math.floor(Math.random() * 24)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}` : undefined,
  };
};

export const generateTokens = (count: number): Token[] => {
  return Array.from({ length: count }, (_, i) => generateToken(i));
};

export const formatMarketCap = (mc: number): string => {
  if (mc >= 1000000) {
    return `$${(mc / 1000000).toFixed(2)}M`;
  } else if (mc >= 1000) {
    return `$${(mc / 1000).toFixed(2)}K`;
  }
  return `$${mc}`;
};

export const formatVolume = (vol: number): string => {
  if (vol >= 1000000) {
    return `$${(vol / 1000000).toFixed(1)}M`;
  } else if (vol >= 1000) {
    return `$${(vol / 1000).toFixed(0)}K`;
  }
  return `$${vol}`;
};
