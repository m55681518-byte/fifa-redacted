import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FIFA Redacted — The Unofficial Secrets Archives",
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
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-dossier-900 antialiased neon-grid noise-overlay">
        {children}
      </body>
    </html>
  );
}
