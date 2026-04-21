import type { NextConfig } from 'next';

const config: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@nacks/ui', '@nacks/config'],
  typedRoutes: true,
  experimental: {
    optimizePackageImports: ['motion', '@nacks/ui'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      // Cloudflare R2 CDN (add once domain is set up)
      // { protocol: 'https', hostname: 'cdn.nacksgalerie.com' },
    ],
  },
  eslint: {
    // Delegated to pnpm lint at the monorepo level; don't double-run on build.
    ignoreDuringBuilds: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },
  poweredByHeader: false,
  compress: true,
};

export default config;
