'use client'

import dynamic from 'next/dynamic';

// ssr: false is only valid inside Client Components.
// Both Web3Provider and DuetGame transitively import wagmi/WalletConnect which
// accesses indexedDB at module evaluation time — keeping them client-only
// eliminates the "indexedDB is not defined" server crash.
const Web3Provider = dynamic(
  () => import('@/lib/web3/provider').then((m) => m.Web3Provider),
  { ssr: false, loading: () => null }
);

const DuetGame = dynamic(
  () => import('@/components/game/DuetGame'),
  { ssr: false, loading: () => null }
);

export default function ClientApp() {
  return (
    <Web3Provider>
      <DuetGame />
    </Web3Provider>
  );
}
