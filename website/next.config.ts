import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: '9abel.vercel.app',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/dyg4weoem/image/upload/**',
      },
      {
       protocol: 'https',
        hostname: 'aceternity.com',
        pathname: '/cdn-cgi/image/**',
      },
      {
        protocol: 'https',
        hostname: 'assets.aceternity.com',
        pathname: '/companies/**',
      },
    ],
  },
};

export default nextConfig;
