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
        config.resolve.fallback = {
            ...config.resolve.fallback,
            '@react-native-async-storage/async-storage': false,
            'pino-pretty': false,
            'lokijs': false,
            'encoding': false,
        };

        if (isServer) {
            // Prevent WalletConnect and wagmi connector packages from being
            // bundled into the server build. They access browser-only APIs
            // (indexedDB, localStorage, WebSocket) at module evaluation time.
            config.externals.push(
                '@walletconnect/core',
                '@walletconnect/sign-client',
                '@walletconnect/universal-provider',
                '@walletconnect/ethereum-provider',
                '@walletconnect/modal',
                '@wagmi/connectors',
                'wagmi/connectors',
            );
        }

        return config;
    },
};

export default nextConfig;
