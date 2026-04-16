import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'DUET - On-Chain Survival Game',
  description:
    'A minimalist, high-intensity portrait survival game on Base blockchain. Rotate to dodge obstacles and climb the leaderboard. On-chain entry fees, pure skill-based gameplay.',
  other: {
    'base:app_id': '693ecf0cd77c069a945bdecd',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#000000',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-background">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white overscroll-none`}
      >
        {children}
      </body>
    </html>
  );
}
