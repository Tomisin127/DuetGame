import dynamic from 'next/dynamic';

// Both the Web3Provider and the game import wagmi which calls indexedDB at
// module evaluation time. Loading both with ssr:false ensures the server
// never evaluates those modules, eliminating the "indexedDB is not defined" crash.
const Web3Provider = dynamic(
  () => import('@/lib/web3/provider').then((m) => m.Web3Provider),
  { ssr: false, loading: () => null }
);

const DuetGame = dynamic(
  () => import('@/components/game/DuetGame'),
  { ssr: false, loading: () => null }
);

export default function Page() {
  return (
    <Web3Provider>
      <DuetGame />
    </Web3Provider>
  );
}
