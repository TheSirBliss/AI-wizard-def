// FILE: components/Header.tsx
'use client'; // Questo componente è interattivo
import { useState, useEffect } from 'react';
import { Menu, X, Box } from 'lucide-react';
import Script from 'next/script';

const GoogleTranslateElement = () => {
  useEffect(() => {
    const googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement({
          pageLanguage: 'it',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false
        }, 'google_translate_element');
      }
    };

    // Definisce la funzione a livello globale
    window.googleTranslateElementInit = googleTranslateElementInit;

    // Esegue l'init se lo script è già caricato
    if (window.google && window.google.translate) {
        googleTranslateElementInit();
    }
  }, []);
  return <div id="google_translate_element" className="notranslate"></div>;
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = [
    { href: "#generator", label: "Generatore AI" },
    { href: "#services", label: "Servizi" },
    { href: "#team", label: "Chi Siamo" },
    { href: "#contact", label: "Contatti" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-lg border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <a href="#hero" className="flex items-center gap-2">
            <Box className="w-7 h-7 text-indigo-500" />
            <span className="text-xl font-bold text-white notranslate">SiteWizard</span>
          </a>
          <div className="flex items-center">
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-300">
              {navLinks.map(link => (
                <a key={link.href} href={link.href} className="hover:text-white transition-colors">{link.label}</a>
              ))}
            </nav>
            <div className="hidden md:block ml-6">
              <GoogleTranslateElement />
            </div>
            <a href="#services" className="hidden lg:inline-block ml-4 bg-indigo-600 text-white px-4 py-2 text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors">Inizia Ora</a>
          </div>
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800">
          <nav className="flex flex-col gap-4 p-4 text-gray-300">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="hover:text-white transition-colors">{link.label}</a>
            ))}
            <div className="pt-2 border-t border-gray-700">
              <GoogleTranslateElement />
            </div>
            <a href="#services" onClick={() => setIsOpen(false)} className="w-full text-center bg-indigo-600 text-white px-4 py-2 text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors">Inizia Ora</a>
          </nav>
        </div>
      )}
    </header>
  );
};
export default Header;