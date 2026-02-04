import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Web3Provider } from '@/lib/web3/provider';
import type { PropsWithChildren } from 'react';
import FarcasterWrapper from "@/components/FarcasterWrapper";

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
      <FarcasterWrapper>
        {children}
      </FarcasterWrapper>
      </Web3Provider>
          </body>
        </html>
      );
}

export const metadata: Metadata = {
        title: "Duet Circles Adventure",
        description: "Navigate spinning circles to dodge obstacles in this blockchain mini-game. Cinematic audio syncs with pulsing visuals. Requires Base ETH for play. Seamless mobile-friendly experience.",
        other: {
          "fc:frame": JSON.stringify({
            "version": "next",
            "imageUrl": "https://files.catbox.moe/978got.jpg",
            "button": {
              "title": "Open with Ohara",
              "action": {
                "type": "launch_frame",
                "name": "Duet Circles Adventure",
                "url": "https://fast-sit-477.app.ohara.ai",
                "splashImageUrl": "https://usdozf7pplhxfvrl.public.blob.vercel-storage.com/farcaster/splash_images/splash_image1.svg",
                "splashBackgroundColor": "#ffffff"
              }
            }
          }
          ),
          "base:app_id": "693ecf0cd77c069a945bdecd"
        }
    };
