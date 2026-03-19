'use client'

import { type ReactNode } from 'react';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { base } from 'wagmi/chains';
import { injected, coinbaseWallet } from 'wagmi/connectors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// This entire module is loaded only on the client via dynamic({ ssr: false }) in layout.tsx.
// serverExternalPackages in next.config.mjs further ensures wagmi and its WalletConnect
// transitive deps are never bundled into the server build.
const config = createConfig({
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

const queryClient = new QueryClient();

interface Web3ProviderProps {
  children: ReactNode;
}

export function Web3Provider({ children }: Web3ProviderProps): JSX.Element {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
