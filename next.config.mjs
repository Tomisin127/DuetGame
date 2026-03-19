/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ohara-assets.s3.us-east-2.amazonaws.com',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Prevent WalletConnect/wagmi browser-only modules from being bundled on server
      config.resolve.fallback = {
        ...config.resolve.fallback,
        '@react-native-async-storage/async-storage': false,
        'pino-pretty': false,
        'lokijs': false,
        'indexeddb-js': false,
        'indexedDB': false,
      };
      // Externalize walletconnect and coinbaseWallet packages on the server —
      // these all access indexedDB at import time which crashes in Node.js
      const SSR_EXTERNAL_PATTERNS = [
        '@walletconnect',
        '@coinbase/wallet-sdk',
        '@metamask',
      ];
      config.externals = [
        ...(Array.isArray(config.externals) ? config.externals : []),
        ({ request }, callback) => {
          if (request && SSR_EXTERNAL_PATTERNS.some((p) => request.includes(p))) {
            return callback(null, 'commonjs ' + request);
          }
          callback();
        },
      ];
    }
    return config;
  },
};

export default nextConfig;
