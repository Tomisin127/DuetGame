'use client'

import { type ReactNode } from 'react';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { base } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { injected, coinbaseWallet, metaMask, walletConnect } from 'wagmi/connectors';

// Simple wagmi config without RainbowKit - perfect for BaseApp and Farcaster
const config = createConfig({
  chains: [base],
  connectors: [
    injected(), // For BaseApp, Farcaster, and other injected wallets
    coinbaseWallet({
      appName: 'Duet Game',
      preference: 'smartWalletOnly', // Use Coinbase Smart Wallet (keys.coinbase.com)
      appLogoUrl: 'https://duet-game.vercel.app/logo.png',
    }),
    coinbaseWallet({
      appName: 'Duet Game (All Wallets)',
      preference: 'all', // Support all Coinbase Wallet types
      appLogoUrl: 'https://duet-game.vercel.app/logo.png',
    }),
    metaMask(),
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
