'use client'

import { useConnect, useAccount } from 'wagmi';
import { useState } from 'react';
import { useBaseAppWallet } from '@/hooks/useBaseAppWallet';

export default function WalletConnectButton() {
  const { connect, connectors, isPending } = useConnect();
  const { isConnected } = useAccount();
  const [showModal, setShowModal] = useState<boolean>(false);
  const { isBaseApp } = useBaseAppWallet();

  if (isConnected) {
    return null; // Don't show button when connected
  }

  const handleConnect = () => {
    // In Base App environment, auto-connect with injected wallet
    if (isBaseApp) {
      const baseAccountConnector = connectors.find(c => c.id === 'baseAccount');
      if (baseAccountConnector) {
        connect({ connector: baseAccountConnector });
        return;
      }
    }
    // Otherwise show the full wallet selection modal
    setShowModal(true);
  };

  return (
    <>
      <button
        onClick={handleConnect}
        disabled={isPending}
        className="bg-white text-black hover:bg-gray-200 active:bg-gray-300 font-medium px-12 py-5 border border-white shadow-sm uppercase tracking-widest text-lg transition-smooth disabled:opacity-40"
      >
        {isPending ? 'Connecting...' : 'Connect Wallet'}
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)}>
          <div className="bg-black border border-white p-8 max-w-md w-full mx-4 shadow-lg animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-white uppercase tracking-widest">Select Wallet</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-white text-2xl leading-none"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-2 divide-y divide-gray-800">
              {connectors.map((connector) => (
                <button
                  key={connector.id}
                  onClick={() => {
                    connect({ connector });
                    setShowModal(false);
                  }}
                  disabled={isPending}
                  className="w-full bg-black hover:bg-gray-900 border border-gray-800 hover:border-white px-6 py-4 text-white font-medium transition-smooth disabled:opacity-40 text-left flex items-center gap-3"
                >
                  <span className="text-lg">
                    {connector.name.includes('MetaMask') ? '🦊' : 
                     connector.name.includes('Coinbase') ? '⭐' :
                     connector.name.includes('Rainbow') ? '🌈' :
                     connector.name.includes('WalletConnect') ? '🔗' :
                     connector.name.includes('baseAccount') ? '⛓️' : '👛'}
                  </span>
                  <span className="text-sm">{connector.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
