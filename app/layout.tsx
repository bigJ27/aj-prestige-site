import type { Metadata, Viewport } from "next";
import { Lora, Playfair_Display } from "next/font/google";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-body",
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
    images: [{ url: "/logo512.png", width: 512, height: 512, alt: "AJ Prestige" }],
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
  themeColor: "#FAFAFA",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="fr" className={`${playfair.variable} ${lora.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
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
