// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Note: 'domains' is deprecated in favor of 'remotePatterns' in newer Next.js
    remotePatterns: [],
  },
  // ✅ Essential for Prisma 7 + Next.js 16 on Vercel
  outputFileTracingIncludes: {
    '/api/**/*': ['./node_modules/.prisma/client/**/*'],
    '/*': ['./node_modules/.prisma/client/**/*'],
  },
};

export default nextConfig;