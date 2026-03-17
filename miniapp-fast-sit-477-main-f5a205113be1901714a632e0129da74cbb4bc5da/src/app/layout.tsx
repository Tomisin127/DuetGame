import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Web3Provider } from '@/lib/web3/provider';
import type { PropsWithChildren } from 'react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Web3Provider>
          {children}
        </Web3Provider>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "Duet Circles Adventure",
  description: "Navigate spinning circles to dodge obstacles in this blockchain mini-game. Cinematic audio syncs with pulsing visuals. Requires Base ETH for play. Seamless mobile-friendly experience.",
};
