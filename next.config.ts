import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
      domains: ["res.cloudinary.com", "delic.vn", "tse3.mm.bing.net", "brand.assets.adidas.com", "www.bing.com"],
    // remotePatterns: [
    //   {
    //     hostname: 'media.hcdn.vn'
    //   },
    // ],
  },
};

export default nextConfig;
