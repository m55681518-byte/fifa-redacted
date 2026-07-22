import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;600;700&family=Oswald:wght@400;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-zinc-950 antialiased">
        <div className="scanlines-overlay" />
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
