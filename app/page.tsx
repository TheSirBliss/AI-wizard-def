// FILE: app/page.tsx (AGGIORNATO)
'use client'; // Necessario per usare lo stato
import { useState } from 'react';
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Generator from "@/components/Generator";
import Services from "@/components/Services";
import Team from "@/components/Team";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  // Stato per memorizzare il codice generato dall'IA
  const [generatedHtml, setGeneratedHtml] = useState('');

  return (
    <>
      <Header />
      <main>
        <Hero />
        {/* Passiamo la funzione per aggiornare il codice */}
        <Generator onHtmlGenerated={setGeneratedHtml} />
        {/* Passiamo il codice generato al componente dei servizi */}
        <Services generatedHtmlCode={generatedHtml} />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  );
}