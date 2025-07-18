// FILE: /components/Footer.tsx
const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="border-t border-gray-800 bg-black">
            <div className="container mx-auto px-4 py-8 text-center text-gray-500 text-sm">
                <div className="flex justify-center gap-x-6 gap-y-2 flex-wrap mb-4">
                    <a href="https://www.iubenda.com/privacy-policy/89179131" class="iubenda-white iubenda-noiframe iubenda-embed iubenda-noiframe " title="Privacy Policy ">Privacy Policy</a><script type="text/javascript">(function (w,d) {var loader = function () {var s = d.createElement("script"), tag = d.getElementsByTagName("script")[0]; s.src="https://cdn.iubenda.com/iubenda.js"; tag.parentNode.insertBefore(s,tag);}; if(w.addEventListener){w.addEventListener("load", loader, false);}else if(w.attachEvent){w.attachEvent("onload", loader);}else{w.onload = loader;}})(window, document);</script>
                    
                    <a href="https://www.iubenda.com/privacy-policy/89179131/cookie-policy" class="iubenda-white iubenda-noiframe iubenda-embed iubenda-noiframe " title="Cookie Policy ">Cookie Policy</a><script type="text/javascript">(function (w,d) {var loader = function () {var s = d.createElement("script"), tag = d.getElementsByTagName("script")[0]; s.src="https://cdn.iubenda.com/iubenda.js"; tag.parentNode.insertBefore(s,tag);}; if(w.addEventListener){w.addEventListener("load", loader, false);}else if(w.attachEvent){w.attachEvent("onload", loader);}else{w.onload = loader;}})(window, document);</script>
                    
                </div>
                <p>&copy; {currentYear} SiteWizard. Tutti i diritti riservati.</p>
                <p className="mt-2">Realizzato con passione da un team di esperti.</p>
            </div>
        </footer>
    );
};

export default Footer;
