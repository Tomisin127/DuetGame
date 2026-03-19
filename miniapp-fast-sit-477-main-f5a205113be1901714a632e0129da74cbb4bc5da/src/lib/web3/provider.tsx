'use client'

import { type ReactNode, useState, useEffect, useMemo } from 'react';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { base } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

// Lazily create wagmi config to avoid SSR indexedDB crashes from connector imports
function getConfig() {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { injected, coinbaseWallet } = require('wagmi/connectors');
  return createConfig({
    chains: [base],
    connectors: [
      injected(),
      coinbaseWallet({
        appName: 'Duet Game',
        appLogoUrl: 'https://duet-game.vercel.app/logo.png',
      }),
    ],
    transports: {
      [base.id]: http('https://mainnet.base.org'),
    },
  });
}

interface Web3ProviderProps {
  children: ReactNode;
}

export function Web3Provider({ children }: Web3ProviderProps): JSX.Element {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const config = useMemo(() => {
    if (typeof window === 'undefined') return null;
    return getConfig();
  }, []);

  if (!mounted || !config) {
    return <>{null}</>;
  }

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
