import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  async redirects() {
    return [
      { source: "/packs", destination: "/tarifs", permanent: true },
      { source: "/pourquoi-nous", destination: "/services", permanent: true },
      { source: "/avis", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
