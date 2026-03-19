/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // Prevent wagmi connectors and WalletConnect packages from being bundled
  // on the server — they access indexedDB at import time which crashes in Node.js.
  // This is the Next.js 15 official API replacing the old webpack externals approach.
  serverExternalPackages: [
    'wagmi',
    'wagmi/connectors',
    '@wagmi/core',
    '@wagmi/connectors',
    '@walletconnect/core',
    '@walletconnect/sign-client',
    '@walletconnect/universal-provider',
    '@walletconnect/ethereum-provider',
    '@coinbase/wallet-sdk',
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ohara-assets.s3.us-east-2.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
