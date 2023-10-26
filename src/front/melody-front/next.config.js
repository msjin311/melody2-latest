/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    eslint: {
        ignoreDuringBuilds: true
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*', // Match any API route
                destination: 'http://3.38.169.202:8080/api/:path*', // Proxy to your backend server
                // destination: 'http://localhost:8080/api/:path*',
            },
        ];
    },
};