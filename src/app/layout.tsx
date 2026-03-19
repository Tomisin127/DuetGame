import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import dynamic from 'next/dynamic';
import type { PropsWithChildren } from 'react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// Dynamic import with ssr:false completely prevents wagmi/WalletConnect
// from being evaluated on the server, eliminating the indexedDB crash.
const Web3Provider = dynamic(
  () => import('@/lib/web3/provider').then((m) => m.Web3Provider),
  {
    ssr: false,
    loading: () => null,
  }
);

export const metadata: Metadata = {
  title: 'DUET - On-Chain Survival Game',
  description:
    'A minimalist, high-intensity survival game on Base blockchain. Rotate to dodge obstacles and climb the leaderboard. On-chain entry fees, pure skill-based gameplay.',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Web3Provider>{children}</Web3Provider>
      </body>
    </html>
  );
}
