'use client'

import type { FC } from 'react';
import { useState } from 'react';

interface WalletDisplayProps {
  address: string;
  balance: string;
  balanceUSD: string;
  onLogout: () => void;
}

const WalletDisplay: FC<WalletDisplayProps> = ({ 
  address, 
  balance, 
  balanceUSD, 
  onLogout 
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy address:', error);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-30 max-w-[140px]">
      <div className="bg-zinc-900/95 backdrop-blur-sm border border-zinc-700 rounded-lg p-2 shadow-lg">
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5">
            <code className="text-white text-xs font-mono bg-zinc-800 px-2 py-0.5 rounded">
              {address.slice(0, 4)}...{address.slice(-4)}
            </code>
            <button
              onClick={handleCopy}
              className="text-zinc-400 hover:text-white transition-colors text-xs"
              title="Copy address"
            >
              {copied ? '✓' : '📋'}
            </button>
          </div>

          <div className="flex gap-2 text-xs">
            <div>
              <div className="text-zinc-500">Balance</div>
              <div className="text-white font-bold">{balance} ETH</div>
            </div>
            <div>
              <div className="text-zinc-500">USD</div>
              <div className="text-emerald-400 font-bold">${balanceUSD}</div>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="w-full bg-red-900/80 hover:bg-red-800 text-white px-2 py-1 rounded text-xs font-bold border border-red-800 transition-all"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default WalletDisplay;
