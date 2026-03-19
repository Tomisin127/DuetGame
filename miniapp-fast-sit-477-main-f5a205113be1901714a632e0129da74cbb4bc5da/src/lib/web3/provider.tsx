'use client'

import { type ReactNode } from 'react';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { base } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { injected, coinbaseWallet, metaMask, walletConnect } from 'wagmi/connectors';

// Simple wagmi config for Base App standard web apps
const config = createConfig({
  chains: [base],
  connectors: [
    injected(), // For Base App injected wallet and other injected wallets
    coinbaseWallet({
      appName: 'Duet Game',
      appLogoUrl: 'https://duet-game.vercel.app/logo.png',
    }),
    metaMask(),
    walletConnect({
      projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'default',
    }),
  ],
  transports: {
    [base.id]: http('https://mainnet.base.org'),
  },
  ssr: true,
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
