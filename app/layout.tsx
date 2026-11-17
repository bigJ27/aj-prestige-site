import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import ActionBar from "@/components/ActionBar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

/**
 * Polices auto-hébergées (dossier app/fonts), allégées pour le français.
 * — Fraunces : sérif douce, pour les titres (romain + italique)
 * — Figtree  : linéale très lisible, pour le texte et l'interface
 * « adjustFontFallback » ajuste la police de secours pour que la page ne
 * « saute » pas au moment où la vraie police arrive.
 */
const serif = localFont({
  src: [
    { path: "./fonts/Fraunces-Roman.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Fraunces-Italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-serif",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
  adjustFontFallback: "Times New Roman",
});

const sans = localFont({
  src: "./fonts/Figtree.woff2",
  weight: "400 700",
  variable: "--font-sans",
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "Helvetica Neue", "Arial", "sans-serif"],
  adjustFontFallback: "Arial",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AJ Prestige | Conciergerie Airbnb en Val-d'Oise",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Conciergerie Airbnb à Soisy-sous-Montmorency : gestion complète de votre location courte durée en Val-d'Oise et Île-de-France. Audit gratuit.",
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
    title: "AJ Prestige | Conciergerie Airbnb en Val-d'Oise",
    description:
      "Votre location courte durée gérée de bout en bout par une équipe installée à Soisy-sous-Montmorency. Commission de 15 à 25 %, audit gratuit.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AJ Prestige | Conciergerie Airbnb en Val-d'Oise",
    description:
      "Gestion complète de votre location courte durée en Val-d'Oise et Île-de-France. Audit gratuit.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#FBF7F1",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="fr" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <a href="#contenu" className="skip-link">
          Aller au contenu
        </a>
        <Header />
        <main id="contenu">{children}</main>
        <Footer />
        <ActionBar />
        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="lazyOnload"
            />
            <Script id="ga-init" strategy="lazyOnload">
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
