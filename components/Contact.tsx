// FILE: components/Contact.tsx
'use client';

const Contact = () => {
    // Il form può essere gestito con stato React o lasciato come HTML standard che invia a un servizio.
    // Per semplicità, lo lasciamo così, ma ricordati di mettere il tuo ID Formspree.
    return (
        <section id="contact" className="py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">Hai un progetto complesso?</h2>
                    <p className="max-w-xl mx-auto text-gray-400 mt-2">
                        Parliamone. Contattaci per un preventivo personalizzato o per una consulenza strategica gratuita.
                    </p>
                </div>
                <div className="max-w-xl mx-auto">
                    <form action="https://formspree.io/f/YOUR_OTHER_FORM_ID" method="POST" className="bg-gray-900 border border-gray-800 rounded-xl p-8 space-y-4">
                        <input type="text" name="name" placeholder="Il tuo nome" required className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition" />
                        <input type="email" name="email" placeholder="La tua email" required className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition" />
                        <textarea name="message" placeholder="Il tuo messaggio" rows={5} required className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"></textarea>
                        <button type="submit" className="w-full mt-4 bg-indigo-600 text-white py-3 font-semibold rounded-lg hover:bg-indigo-700 transition-colors">Invia Messaggio</button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;