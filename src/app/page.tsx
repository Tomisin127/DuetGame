import dynamic from 'next/dynamic';

// Both the Web3Provider and the game itself import wagmi which accesses
// indexedDB at module evaluation time. Loading them with ssr:false ensures
// neither ever runs on the server.
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
