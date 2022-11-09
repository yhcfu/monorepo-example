/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  swcMinify: true,
  experimental: {
    outputFileTracingRoot: require('path').join(__dirname, '../../'),
    cpus: 4,
    concurrentFeatures: true,
  },
  rewrites: () => [
    {
      source: '/proxy/graphql',
      destination: process.env.NEXT_PUBLIC_GRAPHQL_URL,
    },
  ],
};

module.exports = nextConfig;
