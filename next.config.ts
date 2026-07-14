import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        hostname: "**",
      },
      // {
      //   hostname: "res.cloudinary.com",
      // },
    ],
  },
};

export default nextConfig;
