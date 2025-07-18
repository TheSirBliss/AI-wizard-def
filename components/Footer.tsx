// FILE: /components/Footer.tsx (Versione Corretta)
const Footer = () => {
    const currentYear = new Date().getFullYear();
    const privacyPolicyUrl = "https://www.iubenda.com/privacy-policy/89179131";
    const cookiePolicyUrl = "https://www.iubenda.com/privacy-policy/89179131/cookie-policy";

    return (
        <footer className="border-t border-gray-800 bg-black">
            <div className="container mx-auto px-4 py-8 text-center text-gray-500 text-sm">
                <div className="flex justify-center gap-x-6 gap-y-2 flex-wrap mb-4">
                    {/* Link semplici, senza gli script */}
                    <a 
                        href={privacyPolicyUrl} 
                        className="iubenda-white iubenda-noiframe iubenda-embed iubenda-noiframe hover:text-white transition-colors" 
                        title="Privacy Policy"
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        Privacy Policy
                    </a>
                    <a 
                        href={cookiePolicyUrl} 
                        className="iubenda-white iubenda-noiframe iubenda-embed iubenda-noiframe hover:text-white transition-colors" 
                        title="Cookie Policy"
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        Cookie Policy
                    </a>
                </div>
                <p>&copy; {currentYear} SiteWizard. Tutti i diritti riservati.</p>
                <p className="mt-2">Realizzato con passione da un team di esperti.</p>
            </div>
        </footer>
    );
};

export default Footer;
