'use client'

import { useEffect, useState } from 'react';
import { useConnect, useAccount } from 'wagmi';
import { injected } from 'wagmi/connectors';

interface BaseAppWalletResult {
  isBaseApp: boolean;
  isConnecting: boolean;
  autoConnect: () => Promise<void>;
}

export function useBaseAppWallet(): BaseAppWalletResult {
  const [isBaseApp, setIsBaseApp] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const { connect, connectors } = useConnect();
  const { isConnected } = useAccount();

  useEffect(() => {
    // Detect BaseApp environment
    const checkBaseApp = () => {
      // BaseApp injects a wallet provider
      if (typeof window !== 'undefined') {
        const hasBaseProvider = !!(window as any).ethereum?.isBase || 
                               !!(window as any).ethereum?.isCoinbaseWallet ||
                               window.location.hostname.includes('base.org') ||
                               window.location.hostname.includes('baseapp');
        
        setIsBaseApp(hasBaseProvider);
        return hasBaseProvider;
      }
      return false;
    };

    checkBaseApp();
  }, []);

  const autoConnect = async () => {
    if (isConnected || isConnecting) return;

    try {
      setIsConnecting(true);
      
      // Try to connect with injected connector (Coinbase Wallet, MetaMask, etc.)
      const injectedConnector = connectors.find(
        (c) => c.id === 'injected' || c.id === 'coinbaseWallet' || c.id === 'metaMask'
      );

      if (injectedConnector) {
        await connect({ connector: injectedConnector });
      }
    } catch (error) {
      console.error('Auto-connect failed:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  return {
    isBaseApp,
    isConnecting,
    autoConnect,
  };
}
