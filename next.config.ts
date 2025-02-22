import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: 'media.hcdn.vn'
      },
    ],
  },
};

export default nextConfig;
