import type { Metadata } from "next";
import { Chakra_Petch, Inter, JetBrains_Mono, Oswald } from "next/font/google";
import "./globals.css";

// Self-hosted via next/font: removes render-blocking <link> requests to
// fonts.googleapis.com and eliminates layout shift on first paint.
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

export const metadata: Metadata = {
  title: "FIFA REDACTED — CLASSIFIED ARCHIVES",
  description: "Declassified dossiers, sealed records, and whistleblower leaks from the hidden history of the World Cup.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${chakraPetch.variable} ${oswald.variable} ${jetBrainsMono.variable}`}
    >
      <body className="min-h-screen antialiased" style={{ background: '#121212' }}>
        <div className="scanlines-overlay" />
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
