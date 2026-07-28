import type { Metadata, Viewport } from "next";
import { Chakra_Petch, Inter, JetBrains_Mono, Oswald } from "next/font/google";
import "./globals.css";

// Self-hosted via next/font: no render-blocking request to fonts.googleapis.com
// and no layout shift on first paint.
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const chakraPetch = Chakra_Petch({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-display-alt",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fifa-redacted.pages.dev";
const TITLE = "FIFA Redacted — What Football\u2019s Governing Body Did";
const DESCRIPTION =
  "A sourced archive of FIFA's institutional failures: the racketeering indictments, the buried Garcia Report, the ISL kickbacks, the heat warnings it ignored and the fifty-year ban on women's football. Every claim cited.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s — FIFA Redacted",
  },
  description: DESCRIPTION,
  keywords: [
    "World Cup",
    "football history",
    "FIFA archive",
    "declassified",
    "football conspiracies",
    "sports history",
  ],
  authors: [{ name: "FIFA Redacted" }],
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: SITE_URL,
    siteName: "FIFA Redacted",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "sports",
};

export const viewport: Viewport = {
  themeColor: "#08080a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

/** Schema.org payload so the archive surfaces as a structured collection. */
const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "FIFA Redacted",
  url: SITE_URL,
  description: DESCRIPTION,
  inLanguage: "en",
  isFamilyFriendly: true,
  about: { "@type": "Thing", name: "FIFA World Cup history" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${chakraPetch.variable} ${oswald.variable} ${jetBrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased">
        {/* Skip link for keyboard and screen-reader users */}
        <a
          href="#archive"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:border focus:border-redline focus:bg-void focus:px-4 focus:py-2 focus:text-xs focus:text-redline"
        >
          Skip to the archive
        </a>

        <div className="scanlines-overlay" aria-hidden />
        <div className="noise-overlay" aria-hidden />
        <div className="vignette-fixed" aria-hidden />

        {children}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
      </body>
    </html>
  );
}
