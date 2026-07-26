import type { Metadata } from "next";
import Script from "next/script";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { SITE, ADSENSE, FEATURES } from "@/lib/site";
import { getSubscriberCount } from "@/lib/db";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NewsletterCta } from "@/components/NewsletterCta";
import { NewsletterCtaGate } from "@/components/NewsletterCtaGate";
import { themeInitScript } from "@/components/ThemeToggle";

const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});
const body = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    url: SITE.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  alternates: {
    types: { "application/rss+xml": `${SITE.url}/rss.xml` },
  },
  // AdSense site verification (emitted only when a publisher id is configured).
  ...(ADSENSE.enabled ? { other: { "google-adsense-account": ADSENSE.client } } : {}),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen flex flex-col">
        {ADSENSE.enabled && (
          <Script
            id="adsbygoogle-init"
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE.client}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
        <Header />
        <main className="flex-1">{children}</main>
        {FEATURES.newsletter && (
          <NewsletterCtaGate>
            <NewsletterCta count={getSubscriberCount()} />
          </NewsletterCtaGate>
        )}
        <Footer />
      </body>
    </html>
  );
}
