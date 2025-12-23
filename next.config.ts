import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  
  // 1. Tell Next.js to treat 'pg' as an external server package
  // This resolves the Turbopack "Module not found" error for native drivers
  serverExternalPackages: ["pg"],

  images: {
    remotePatterns: [],
  },

  outputFileTracingIncludes: {
    '/api/**/*': ['./node_modules/.prisma/client/**/*'],
    '/*': ['./node_modules/.prisma/client/**/*'],
  },
};

export default nextConfig;