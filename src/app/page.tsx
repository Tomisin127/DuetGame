import type { Metadata } from 'next';
import ClientApp from '@/components/game/ClientApp';

export const metadata: Metadata = {
  other: {
    'base:app_id': '693ecf0cd77c069a945bdecd',
  },
};

// Server Component — delegates all wagmi/wallet rendering to a client-only shell.
export default function Page() {
  return <ClientApp />;
}
