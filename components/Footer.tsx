// FILE: components/Footer.tsx
const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="border-t border-gray-800 bg-black">
            <div className="container mx-auto px-4 py-8 text-center text-gray-500 text-sm">
                <p>&copy; {currentYear} SiteWizard. Tutti i diritti riservati.</p>
                <p className="mt-2">Realizzato con passione da un team di esperti.</p>
            </div>
        </footer>
    );
};

export default Footer;