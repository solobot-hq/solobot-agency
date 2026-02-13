import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  /**
   * 🚀 1. Stable Server External Packages
   * Essential for Prisma 7 and Postgres. This prevents the 'digest' errors 
   * by ensuring native binaries aren't bundled incorrectly.
   */
  serverExternalPackages: ["@prisma/client", "pg"],

  /**
   * 🖼️ 2. Image Optimization
   * Required to render Clerk user avatars safely.
   */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      }
    ],
  },

  /**
   * 📋 3. Trace Generated Files
   * Ensures the custom Prisma engine in src/generated is included 
   * during the build process and deployment.
   */
  outputFileTracingIncludes: {
    '/**': ['./src/generated/prisma/**/*'],
  },

  /* * NOTE: turbopack key is removed to prevent 'Unrecognized key' warnings 
   * which often interrupt middleware registration in Next.js 15.
   */
};

export default nextConfig;