import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/packs", destination: "/tarifs", permanent: true },
      { source: "/pourquoi-nous", destination: "/services", permanent: true },
      { source: "/avis", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
