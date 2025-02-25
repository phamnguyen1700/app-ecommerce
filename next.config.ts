import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
      domains: ["res.cloudinary.com"],
    // remotePatterns: [
    //   {
    //     hostname: 'media.hcdn.vn'
    //   },
    // ],
  },
};

export default nextConfig;
