'use client'

import { createConnector } from 'wagmi';
import { sdk } from '@farcaster/miniapp-sdk';
import type { Address, Chain, Transport } from 'viem';

interface FarcasterWalletOptions {
  chains: Chain[];
}

export function farcasterWallet(options: FarcasterWalletOptions) {
  return createConnector<any>((config) => ({
    id: 'farcaster',
    name: 'Farcaster Wallet',
    type: 'injected',
    
    async connect() {
      try {
        const provider = await sdk.wallet.ethProvider;
        
        if (!provider) {
          throw new Error('Farcaster wallet provider not available');
        }

        // Request accounts
        const accounts = await provider.request({
          method: 'eth_requestAccounts',
        }) as Address[];

        const account = accounts[0];
        const chainId = await this.getChainId();

        return {
          accounts: [account],
          chainId,
        };
      } catch (error) {
        console.error('Farcaster wallet connection error:', error);
        throw error;
      }
    },

    async disconnect() {
      // Farcaster wallet doesn't require explicit disconnect
    },

    async getAccounts() {
      try {
        const provider = await sdk.wallet.ethProvider;
        if (!provider) return [];
        
        const accounts = await provider.request({
          method: 'eth_accounts',
        }) as Address[];
        
        return accounts;
      } catch {
        return [];
      }
    },

    async getChainId() {
      try {
        const provider = await sdk.wallet.ethProvider;
        if (!provider) return options.chains[0].id;
        
        const chainId = await provider.request({
          method: 'eth_chainId',
        }) as string;
        
        return parseInt(chainId, 16);
      } catch {
        return options.chains[0].id;
      }
    },

    async getProvider() {
      return await sdk.wallet.ethProvider;
    },

    async isAuthorized() {
      try {
        const accounts = await this.getAccounts();
        return accounts.length > 0;
      } catch {
        return false;
      }
    },

    onAccountsChanged(accounts) {
      if (accounts.length === 0) {
        config.emitter.emit('disconnect');
      } else {
        config.emitter.emit('change', {
          accounts: accounts as Address[],
        });
      }
    },

    onChainChanged(chainId) {
      config.emitter.emit('change', {
        chainId: parseInt(chainId as string, 16),
      });
    },

    onDisconnect() {
      config.emitter.emit('disconnect');
    },

    async switchChain({ chainId }) {
      try {
        const provider = await sdk.wallet.ethProvider;
        if (!provider) throw new Error('Provider not available');

        await provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${chainId.toString(16)}` }],
        });

        return options.chains.find((chain) => chain.id === chainId) || options.chains[0];
      } catch (error) {
        throw error;
      }
    },
  }));
}
