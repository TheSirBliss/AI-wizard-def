// FILE: app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Site Wizard | Crea Siti Web con l'IA e Servizi Professionali",
  description: "Genera il tuo sito web in pochi secondi con l'intelligenza artificiale di Gemini. Offriamo anche servizi di personalizzazione, hosting, gestione e marketing digitale per professionisti e aziende.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className="!scroll-smooth">
      <body className={`${inter.className} bg-[#0a0a0a] text-neutral-50 antialiased`}>
        {children}
        {/* Script per Google Translate */}
        <Script 
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" 
          strategy="afterInteractive" 
        />
      </body>
    </html>
  );
}