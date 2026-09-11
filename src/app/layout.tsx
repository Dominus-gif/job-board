import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SITE, ADSENSE, FEATURES, SUPABASE } from "@/lib/site";
import { getSubscriberCount } from "@/lib/db";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NewsletterCta } from "@/components/NewsletterCta";
import { NewsletterCtaGate } from "@/components/NewsletterCtaGate";
import { RoleSubscribeCta } from "@/components/RoleSubscribeCta";
import { themeInitScript, ThemeGuard } from "@/components/ThemeToggle";
import { TemplateAnalytics } from "@/components/TemplateAnalytics";

// Notion-style: one clean sans (Inter) carries the whole UI; headings are just bold.
const body = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Editorial pair used only by the footer's closing statement. Both live below
// the fold, so `swap` keeps them off the LCP path — the page paints in Inter and
// they arrive without blocking. Only the weights actually used are requested.
const editorialSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-editorial",
  display: "swap",
});
const editorialMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-editorial-mono",
  display: "swap",
});

// Google Analytics (GA4). Override with NEXT_PUBLIC_GA_ID if the id ever changes.
const GA_ID = (process.env.NEXT_PUBLIC_GA_ID || "G-XXPSMTS8ZX").trim();

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Remote Jobs From Around the World | getremotejobsnow.com",
    // Puts the "remote jobs" keyword in every page's <title>.
    template: "%s | getremotejobsnow.com — Remote Jobs",
  },
  description: SITE.description,
  keywords: [
    "remote jobs", "work from anywhere jobs", "worldwide remote jobs",
    "location-independent jobs", "fully remote jobs", "remote work",
  ],
  applicationName: SITE.name,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: "Remote Jobs From Around the World | getremotejobsnow.com",
    description: SITE.description,
    url: SITE.url,
    images: [{ url: "/api/og", width: 1200, height: 630, alt: "getremotejobsnow.com — remote jobs you can do from anywhere" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Remote Jobs From Around the World | getremotejobsnow.com",
    description: SITE.description,
    images: ["/api/og"],
  },
  alternates: {
    types: { "application/rss+xml": `${SITE.url}/rss.xml` },
  },
  // AdSense site verification (emitted only when a publisher id is configured).
  ...(ADSENSE.enabled ? { other: { "google-adsense-account": ADSENSE.client } } : {}),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${body.variable} ${editorialSerif.variable} ${editorialMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen flex flex-col">
        <ThemeGuard />
        {/* Tags each pageview with its template so RPM can be split per template. */}
        {GA_ID && <TemplateAnalytics />}
        {/* Google tag (gtag.js) — GA4, loaded on every page. */}
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
            </Script>
          </>
        )}
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
        {/* Role-targeted subscribe band (Supabase-backed). Independent of the
            legacy newsletter flag; shown once a Supabase URL is configured. */}
        {SUPABASE.enabled && (
          <NewsletterCtaGate>
            <RoleSubscribeCta />
          </NewsletterCtaGate>
        )}
        <Footer />
      </body>
    </html>
  );
}
