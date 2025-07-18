// FILE: /app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
      <head>
        {/*
          INCOLLI QUI SOTTO LO SNIPPET COMPLETO DELLA COOKIE SOLUTION DI IUBENDA
          Vada sulla sua dashboard di Iubenda > Cookie Solution > Clicchi su "Integra" e copi lo snippet.
        */}
        <Script id="iubenda-cs" strategy="beforeInteractive">
          {`
            // Esempio di come apparirà lo snippet di Iubenda:
            // var _iub = _iub || [];
            // _iub.csConfiguration = {"lang":"it","siteId":123456,"cookiePolicyId":123456, "banner":{ "position":"float-top-center" }};
          `}
        </Script>
        <Script src="//cdn.iubenda.com/cs/iubenda_cs.js" strategy="beforeInteractive" async />
      </head>
      <body className={`${inter.className} bg-[#0a0a0a] text-neutral-50 antialiased`}>
        {children}
        
        {/* Componenti di Vercel per le statistiche */}
        <Analytics />
        <SpeedInsights />
        
        {/* Script per Google Translate */}
        <Script 
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" 
          strategy="afterInteractive" 
        />
      </body>
    </html>
  );
}
