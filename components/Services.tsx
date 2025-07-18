// FILE: components/Services.tsx
'use client';
import { useState, useEffect } from 'react';
import { Loader2, Lock, CheckCircle2 } from 'lucide-react';

// Aggiungiamo la prop per ricevere il codice HTML
const Services = ({ generatedHtmlCode }: { generatedHtmlCode: string }) => {
    const [services, setServices] = useState({
        manual: false,
        hosting: false,
        management: false,
        ads: false,
    });
    const [totals, setTotals] = useState({ once: 0, monthly: 0 });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
    const [customerEmail, setCustomerEmail] = useState('');

    const serviceOptions = [
        { id: 'manual', price: 250, type: 'once', label: 'Perfezionamento Manuale Professionale' },
        { id: 'hosting', price: 45, type: 'yearly', label: 'Dominio & Hosting Gestito' }, // Lo tratteremo come una tantum per semplicità
        { id: 'management', price: 20, type: 'monthly', label: 'Gestione Completa "Senza Pensieri"' },
    ];
    
    useEffect(() => {
        let once = 0;
        let monthly = 0;
        
        if (services.manual) once += 250;
        // La gestione completa include l'hosting
        if (services.management) {
            monthly += 20;
            once += 45; // Costo annuale dell'hosting
        } else if (services.hosting) {
            once += 45;
        }

        setTotals({ once, monthly });
    }, [services]);

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, checked } = e.target;
        const newServices = { ...services, [id]: checked };

        // Logica di dipendenza: se si seleziona la gestione, si seleziona anche l'hosting
        if (id === 'management' && checked) {
            newServices.hosting = true;
        }
        setServices(newServices);
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const summaryText = Object.entries(services)
            .filter(([key, value]) => value)
            .map(([key]) => serviceOptions.find(opt => opt.id === key)?.label || 'Pubblicità Online')
            .join(', ');

        const formData = new FormData();
        formData.append('email', customerEmail);
        formData.append('services_summary', summaryText || 'Nessun servizio aggiuntivo');
        formData.append('generated_code', generatedHtmlCode || 'Nessun codice generato.');
        formData.append('_subject', 'Nuovo Ordine da AI Site Wizard');

        try {
            await fetch('https://formspree.io/f/YOUR_FORM_ID', { // <-- INSERISCI IL TUO ID FORMSPREE QUI
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });
            setIsSubmitSuccess(true);
        } catch (error) {
            console.error('Form submission error:', error);
            alert('Si è verificato un errore durante l\'invio.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        // Resetta lo stato del form dopo un po'
        setTimeout(() => {
            setIsSubmitSuccess(false);
            setCustomerEmail('');
        }, 300);
    }
    
    return (
        <>
            <section id="services" className="py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Dal Fai-da-te al Servizio Completo</h2>
                        <p className="max-w-2xl mx-auto text-gray-400 mt-2">
                            Parti dal sito generato con l'IA e aggiungi i nostri servizi professionali per un risultato impeccabile e una gestione senza pensieri.
                        </p>
                    </div>
                    {/* ... (contenuto HTML della sezione servizi tradotto in JSX) */}
                    <button onClick={() => setIsModalOpen(true)} id="checkout-button" className="w-full mt-6 bg-indigo-600 text-white py-3 font-semibold rounded-lg hover:bg-indigo-700 transition-colors">
                        Procedi all'acquisto
                    </button>
                </div>
            </section>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
                    <div className="bg-gray-900 border border-gray-700 rounded-xl w-full max-w-md p-8">
                        {!isSubmitSuccess ? (
                            <form onSubmit={handleFormSubmit}>
                                <h3 className="text-2xl font-bold text-white mb-2">Completa il tuo ordine</h3>
                                {/* ... (contenuto HTML del modale tradotto in JSX) */}
                                <button type="submit" disabled={isSubmitting} className="w-full bg-indigo-600 ...">
                                    {isSubmitting ? <Loader2 className="animate-spin" /> : <Lock />}
                                    <span>{isSubmitting ? 'Invio...' : 'Paga Ora (Simulazione)'}</span>
                                </button>
                                <button type="button" onClick={closeModal} className="w-full mt-2 text-gray-400 ...">Annulla</button>
                            </form>
                        ) : (
                            <div className="text-center">
                                <CheckCircle2 className="w-16 h-16 bg-green-500/10 text-green-400 ..."/>
                                <h3 className="text-2xl font-bold text-white mb-2">Grazie!</h3>
                                <p className="text-gray-300 mb-6">Il nostro team ha ricevuto la tua richiesta e ti contatterà a breve.</p>
                                <button onClick={closeModal} className="bg-indigo-600 ...">Chiudi</button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Services;