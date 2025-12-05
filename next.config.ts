import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.ltrbxd.com",
      },
      {
        protocol: "https",
        hostname: "**.imdb.com",
      },
      {
        protocol: "https",
        hostname: "image.tmdb.org",
      },
      {
        protocol: "https",
        hostname: "**.imgur.com",
      },
    ],
  },
};

export default nextConfig;
