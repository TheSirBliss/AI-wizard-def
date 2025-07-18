// FILE: components/Footer.tsx
const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="border-t border-gray-800 bg-black">
            <div className="container mx-auto px-4 py-8 text-center text-gray-500 text-sm">
                <div className="flex justify-center gap-x-6 gap-y-2 flex-wrap mb-4">
                    {/* SOSTITUISCA CON I SUOI LINK IUBENDA */}
                    <a href="IL-SUO-LINK-PRIVACY-POLICY" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="IL-SUO-LINK-COOKIE-POLICY" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Cookie Policy</a>
                </div>
                <p>&copy; {currentYear} SiteWizard. Tutti i diritti riservati.</p>
                <p className="mt-2">Realizzato con passione da un team di esperti.</p>
            </div>
        </footer>
    );
};

export default Footer;
