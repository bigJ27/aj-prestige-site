import type { NextConfig } from "next";

const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      { source: "/home.html", destination: "/", permanent: true },
      { source: "/tarifs", destination: "/#formules", permanent: true },
      { source: "/packs", destination: "/#formules", permanent: true },
      { source: "/services", destination: "/#conciergerie", permanent: true },
      { source: "/pourquoi-nous", destination: "/#conciergerie", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
      { source: "/avis", destination: "/", permanent: true },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [{ source: "/", destination: "/home.html" }],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
