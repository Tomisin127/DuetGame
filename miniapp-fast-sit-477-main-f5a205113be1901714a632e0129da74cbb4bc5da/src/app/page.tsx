import ClientApp from '@/components/game/ClientApp';

// Server Component — delegates all wagmi/wallet rendering to a client-only shell.
export default function Page() {
  return <ClientApp />;
}
