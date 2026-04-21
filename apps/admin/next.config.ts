import type { NextConfig } from 'next';

const config: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@nacks/ui', '@nacks/config'],
  typedRoutes: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  poweredByHeader: false,
};

export default config;
