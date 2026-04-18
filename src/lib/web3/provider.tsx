'use client'

import { type ReactNode } from 'react';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { base } from 'wagmi/chains';
import { injected, coinbaseWallet } from 'wagmi/connectors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Attribution } from 'ox/erc8021';

// ERC-8021 Builder Code attribution — appended to every transaction automatically.
// Registered code: bc_928el9vb
export const DATA_SUFFIX = Attribution.toDataSuffix({
  codes: ['bc_928el9vb'],
});

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
  dataSuffix: DATA_SUFFIX,
});

const queryClient = new QueryClient();

interface Web3ProviderProps {
  children: ReactNode;
}

export function Web3Provider({ children }: Web3ProviderProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
