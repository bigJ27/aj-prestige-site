import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileActions from "@/components/MobileActions";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "AJ Prestige | Conciergerie Airbnb premium en Val-d'Oise & Île-de-France",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Conciergerie Airbnb premium à Soisy-sous-Montmorency : gestion complète de votre location courte durée en Val-d'Oise et Île-de-France. Audit gratuit.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "AJ Prestige | Conciergerie Airbnb premium",
    description:
      "Déléguez la gestion complète de votre location courte durée en Val-d'Oise et Île-de-France. Commission transparente, audit gratuit.",
    images: [
      { url: "/logo512.png", width: 512, height: 512, alt: "AJ Prestige" },
    ],
  },
  twitter: {
    card: "summary",
    title: "AJ Prestige | Conciergerie Airbnb premium",
    description:
      "Gestion complète de votre location courte durée en Val-d'Oise et Île-de-France. Audit gratuit.",
    images: ["/logo512.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#FDF6EE",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="fr" className={inter.variable}>
      <head>
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <a href="#contenu" className="skip-link">
          Aller au contenu
        </a>
        <Header />
        <main id="contenu">{children}</main>
        <Footer />
        <MobileActions />
        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
