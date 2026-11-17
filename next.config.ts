import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF d'abord (le plus léger), WebP en repli. Les photos sont dans public/images.
    formats: ["image/avif", "image/webp"],
    // Qualité 60 : à l'œil, identique à 75, mais des fichiers deux fois plus légers
    qualities: [60],
  },
  async redirects() {
    return [
      { source: "/packs", destination: "/tarifs", permanent: true },
      { source: "/pourquoi-nous", destination: "/services", permanent: true },
      { source: "/avis", destination: "/", permanent: true },
    ];
  },
  // En-têtes de sécurité de base, envoyés avec toutes les pages
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
