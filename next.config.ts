import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wordpress-1580849-6527382.cloudwaysapps.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
