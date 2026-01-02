import { useEffect, useRef, useCallback, useState } from 'react';
import { Token } from '@/types/token';

interface PriceUpdate {
  tokenId: string;
  newPrice: number;
  newMarketCap: number;
  priceChange: number;
}

export const useWebSocketMock = (tokens: Token[], onUpdate: (updates: PriceUpdate[]) => void) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const startMockWebSocket = useCallback(() => {
    setIsConnected(true);
    
    intervalRef.current = setInterval(() => {
      // Randomly update 1-3 tokens every 2 seconds
      const numUpdates = Math.floor(Math.random() * 3) + 1;
      const updates: PriceUpdate[] = [];
      
      for (let i = 0; i < numUpdates; i++) {
        const randomIndex = Math.floor(Math.random() * tokens.length);
        const token = tokens[randomIndex];
        
        if (token) {
          const priceChangePercent = (Math.random() - 0.5) * 10; // -5% to +5%
          const newPrice = token.price * (1 + priceChangePercent / 100);
          const newMarketCap = token.marketCap * (1 + priceChangePercent / 100);
          
          updates.push({
            tokenId: token.id,
            newPrice,
            newMarketCap,
            priceChange: priceChangePercent,
          });
        }
      }
      
      if (updates.length > 0) {
        onUpdate(updates);
      }
    }, 2000);
  }, [tokens, onUpdate]);

  const stopMockWebSocket = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsConnected(false);
  }, []);

  useEffect(() => {
    if (tokens.length > 0) {
      startMockWebSocket();
    }
    
    return () => {
      stopMockWebSocket();
    };
  }, [tokens.length, startMockWebSocket, stopMockWebSocket]);

  return { isConnected };
};
