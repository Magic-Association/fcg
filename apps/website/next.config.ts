import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  headers() {
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
  reactCompiler: true,
};

export default nextConfig;
