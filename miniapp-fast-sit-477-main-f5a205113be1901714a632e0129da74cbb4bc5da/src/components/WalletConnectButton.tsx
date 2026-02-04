'use client'

import { useConnect, useAccount } from 'wagmi';
import { useState, useEffect } from 'react';
import { useIsInFarcaster } from '@/hooks/useIsInFarcaster';
import { useBaseAppWallet } from '@/hooks/useBaseAppWallet';

export default function WalletConnectButton() {
  const { connect, connectors, isPending } = useConnect();
  const { isConnected } = useAccount();
  const [showModal, setShowModal] = useState<boolean>(false);
  const isInFarcaster = useIsInFarcaster();
  const { isBaseApp } = useBaseAppWallet();
  
  // Detect if we're in an embedded environment
  const isEmbedded = isInFarcaster || isBaseApp;

  if (isConnected) {
    return null; // Don't show button when connected
  }

  const handleConnect = () => {
    // In embedded environments (BaseApp/Farcaster), auto-connect with injected wallet
    if (isEmbedded) {
      const injectedConnector = connectors.find(c => c.id === 'injected' || c.id === 'coinbaseWallet');
      if (injectedConnector) {
        connect({ connector: injectedConnector });
      }
    } else {
      // In normal browsers, show the full wallet selection modal
      setShowModal(true);
    }
  };

  return (
    <>
      <button
        onClick={handleConnect}
        disabled={isPending}
        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-8 py-4 rounded-2xl shadow-2xl border-2 border-blue-400 uppercase tracking-wider text-lg transition-all disabled:opacity-50"
      >
        {isPending ? '🔄 Connecting...' : '🔗 Connect Wallet'}
      </button>

      {showModal && !isEmbedded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={() => setShowModal(false)}>
          <div className="bg-zinc-900 border-2 border-zinc-700 rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">Connect Wallet</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-zinc-400 hover:text-white text-3xl leading-none"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-3">
              {connectors.map((connector) => (
                <button
                  key={connector.id}
                  onClick={() => {
                    connect({ connector });
                    setShowModal(false);
                  }}
                  disabled={isPending}
                  className="w-full bg-zinc-800 hover:bg-zinc-700 border-2 border-zinc-600 rounded-xl px-6 py-4 text-white font-semibold transition-all disabled:opacity-50 text-left flex items-center gap-3"
                >
                  <span className="text-xl">
                    {connector.name.includes('MetaMask') ? '🦊' : 
                     connector.name.includes('Coinbase') ? '🔵' :
                     connector.name.includes('Rainbow') ? '🌈' :
                     connector.name.includes('WalletConnect') ? '🔗' : '👛'}
                  </span>
                  <span>{connector.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
