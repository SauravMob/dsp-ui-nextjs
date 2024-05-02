/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: process.env.NODE_ENV === "production" ? 'https' : "http",
                hostname: process.env.NODE_ENV === "production" ?'assets.mobavenue.com' : "localhost",
                port: process.env.NODE_ENV === "production" ? '' : "8080",
                pathname: '/assets/**',
            },
        ],
    },
};

export default nextConfig;
