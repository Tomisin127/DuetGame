'use client'

import { type ReactNode, useState, useEffect, useRef } from 'react';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { base } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { Config } from 'wagmi';

const queryClient = new QueryClient();

// Config is created lazily on the client only to avoid indexedDB crash during SSR.
// wagmi/connectors (coinbaseWallet, injected) transitively import @walletconnect/core
// which accesses indexedDB at import time — this must never run on the server.
let clientConfig: Config | null = null;
function getClientConfig(): Config {
  if (!clientConfig) {
    // Dynamic require ensures this never runs during SSR
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { injected, coinbaseWallet } = require('wagmi/connectors');
    clientConfig = createConfig({
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
  return clientConfig;
}

interface Web3ProviderProps {
  children: ReactNode;
}

export function Web3Provider({ children }: Web3ProviderProps): JSX.Element {
  const [mounted, setMounted] = useState(false);
  const configRef = useRef<Config | null>(null);

  useEffect(() => {
    configRef.current = getClientConfig();
    setMounted(true);
  }, []);

  if (!mounted || !configRef.current) {
    return <>{children}</>;
  }

  return (
    <WagmiProvider config={configRef.current}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
