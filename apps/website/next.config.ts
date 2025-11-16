import type { NextConfig } from "next";

process.loadEnvFile("../../.env");

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/export/:all*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
