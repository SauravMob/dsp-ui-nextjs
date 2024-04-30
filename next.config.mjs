/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'assets.mobavenue.com',
                port: '',
                pathname: '/assets/**',
            },
        ],
    },
};

export default nextConfig;
