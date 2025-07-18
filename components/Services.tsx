// FILE: components/Services.tsx
'use client';
import { useState, useEffect } from 'react';
import { Loader2, Lock, CheckCircle2 } from 'lucide-react';

// Definiamo i dati dei servizi in un unico punto per facilità di manutenzione
const serviceOptions = [
    { id: 'manual', price: 250, type: 'once', label: 'Perfezionamento Manuale Professionale', description: "Un nostro Senior Full-Stack Developer interviene sul codice per ottimizzare design, performance e UX." },
    { id: 'hosting', price: 45, type: 'yearly', label: 'Dominio & Hosting Gestito', description: "Registriamo il tuo dominio e ospitiamo il sito su server veloci e sicuri. Nessun pensiero tecnico." },
    { id: 'management', price: 20, type: 'monthly', label: 'Gestione Completa "Senza Pensieri"', description: "Include hosting, aggiornamenti, supporto e piccole modifiche mensili. Ideale per concentrarti sul tuo business." }
];

const Services = ({ generatedHtmlCode }: { generatedHtmlCode: string }) => {
    const [services, setServices] = useState({
        manual: false,
        hosting: false,
        management: false,
    });
    const [totals, setTotals] = useState({ once: 0, monthly: 0 });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
    const [customerEmail, setCustomerEmail] = useState('');

    // Effetto per ricalcolare i totali ogni volta che i servizi selezionati cambiano
    useEffect(() => {
        let once = 0;
        let monthly = 0;
        
        if (services.manual) once += serviceOptions.find(s => s.id === 'manual')!.price;
        if (services.management) {
            monthly += serviceOptions.find(s => s.id === 'management')!.price;
            once += serviceOptions.find(s => s.id === 'hosting')!.price; // Il pacchetto management include l'hosting annuale
        } else if (services.hosting) {
            once += serviceOptions.find(s => s.id === 'hosting')!.price;
        }

        setTotals({ once, monthly });
    }, [services]);

    // Gestore per il cambio di stato delle checkbox
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, checked } = e.target as { id: keyof typeof services, checked: boolean };
        
        // Crea una copia dello stato attuale per modificarlo
        const newServices = { ...services, [id]: checked };

        // Logica di dipendenza: se si seleziona la gestione, si seleziona e disabilita l'hosting
        if (id === 'management' && checked) {
            newServices.hosting = true;
        }
        setServices(newServices);
    };

    // Gestore per l'invio del form (simulazione di pagamento)
    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!customerEmail) return;
        setIsSubmitting(true);
        
        const summaryText = Object.entries(services)
            .filter(([, value]) => value)
            .map(([key]) => serviceOptions.find(opt => opt.id === key)?.label)
            .join(', ');

        const formData = new FormData();
        formData.append('email', customerEmail);
        formData.append('services_summary', summaryText || 'Nessun servizio aggiuntivo selezionato.');
        formData.append('total_once', `${totals.once}€`);
        formData.append('total_monthly', `${totals.monthly}€/mese`);
        formData.append('generated_code', generatedHtmlCode || 'Nessun codice generato dall\'IA.');
        formData.append('_subject', `Nuovo Ordine da AI Site Wizard per ${customerEmail}`);

        try {
            // SOSTITUIRE 'YOUR_FORM_ID' CON IL PROPRIO ID DI FORMSPREE
            await fetch('https://formspree.io/f/YOUR_FORM_ID', {
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
    
    const openModal = () => {
        if (totals.once === 0 && totals.monthly === 0 && !generatedHtmlCode) {
            alert("Per favore, genera un sito o seleziona almeno un servizio prima di procedere.");
            return;
        }
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
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
                            Parta dal sito generato con l'IA e aggiunga i nostri servizi professionali per un risultato impeccabile e una gestione senza pensieri.
                        </p>
                    </div>
                    <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                        {/* Colonna dei servizi */}
                        <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-xl p-8 space-y-6">
                            <h3 className="text-2xl font-bold text-white">Configuri il suo pacchetto</h3>
                            {serviceOptions.map(service => (
                                <div key={service.id} className="flex items-start gap-4">
                                    <input 
                                        type="checkbox" 
                                        id={service.id}
                                        checked={services[service.id as keyof typeof services]}
                                        disabled={service.id === 'hosting' && services.management}
                                        onChange={handleCheckboxChange}
                                        className="custom-checkbox mt-1.5 h-5 w-5 rounded border-gray-600 text-indigo-600 focus:ring-indigo-500 bg-gray-800 shrink-0 disabled:opacity-50"
                                    />
                                    <div>
                                        <label htmlFor={service.id} className="font-semibold text-white cursor-pointer">{service.label}</label>
                                        <p className="text-gray-400 text-sm">{service.description} <strong className="text-white">Costo: {service.price}€/{service.type === 'monthly' ? 'mese' : (service.type === 'yearly' ? 'anno' : 'una tantum')}</strong></p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Colonna del riepilogo */}
                        <div className="lg:col-span-1 sticky top-24 bg-gray-900 border border-indigo-500/30 rounded-xl p-6 shadow-2xl shadow-indigo-900/20">
                            <h4 className="text-xl font-bold text-white border-b border-gray-700 pb-3 mb-4">Riepilogo</h4>
                            <div className="space-y-2 text-sm">
                                {Object.entries(services).filter(([, value]) => value).length > 0 ? (
                                    Object.entries(services).map(([key, value]) => {
                                        if (!value) return null;
                                        const service = serviceOptions.find(s => s.id === key)!;
                                        return (
                                            <div key={key} className="flex justify-between items-center">
                                                <span className="text-gray-300">{service.label}</span>
                                                <span className="font-medium text-white">{service.price}€</span>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <p className="text-gray-500">Nessun servizio selezionato.</p>
                                )}
                            </div>
                            <div className="border-t border-gray-700 mt-4 pt-4">
                                <div className="flex justify-between items-baseline">
                                    <span className="text-lg font-semibold text-white">Totale Una Tantum:</span>
                                    <span id="total-once" className="text-2xl font-bold text-indigo-400">{totals.once}€</span>
                                </div>
                                <div className="flex justify-between items-baseline mt-2">
                                    <span className="text-lg font-semibold text-white">Totale Mensile:</span>
                                    <span id="total-monthly" className="text-2xl font-bold text-indigo-400">{totals.monthly}€</span>
                                </div>
                            </div>
                            <button onClick={openModal} className="w-full mt-6 bg-indigo-600 text-white py-3 font-semibold rounded-lg hover:bg-indigo-700 transition-colors">
                                Procedi all'acquisto
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-gray-900 border border-gray-700 rounded-xl w-full max-w-md p-8">
                        {!isSubmitSuccess ? (
                            <form onSubmit={handleFormSubmit}>
                                <h3 className="text-2xl font-bold text-white mb-2">Completi il suo ordine</h3>
                                <p className="text-gray-400 mb-6">Inserisca la sua email per ricevere il codice e/o le comunicazioni dal nostro team.</p>
                                <div className="mb-4">
                                    <label htmlFor="customer-email" className="block text-sm font-medium text-gray-300 mb-1">La sua Email</label>
                                    <input type="email" id="customer-email" name="email" required value={customerEmail} onChange={e => setCustomerEmail(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition" />
                                </div>
                                <div className="bg-gray-800/50 p-4 rounded-lg mb-6 border border-gray-700">
                                    <h4 className="font-semibold text-white mb-2">Riepilogo Ordine:</h4>
                                    <div className="border-t border-gray-600 mt-3 pt-3">
                                        <div className="flex justify-between items-baseline font-bold">
                                            <span>Totale Una Tantum:</span>
                                            <span>{totals.once}€</span>
                                        </div>
                                        <div className="flex justify-between items-baseline font-bold">
                                            <span>Totale Mensile:</span>
                                            <span>{totals.monthly}€</span>
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" disabled={isSubmitting} className="w-full bg-indigo-600 text-white py-3 font-semibold rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-600">
                                    {isSubmitting ? <Loader2 className="animate-spin" /> : <Lock />}
                                    <span>{isSubmitting ? 'Invio...' : 'Invia Richiesta (Simulazione)'}</span>
                                </button>
                                <button type="button" onClick={closeModal} className="w-full mt-2 text-gray-400 hover:text-white text-sm py-2 rounded-lg transition-colors">Annulla</button>
                            </form>
                        ) : (
                            <div className="text-center">
                               <div className="w-16 h-16 bg-green-500/10 text-green-400 rounded-full mx-auto flex items-center justify-center mb-4">
                                  <CheckCircle2 className="w-10 h-10" />
                               </div>
                               <h3 className="text-2xl font-bold text-white mb-2">Grazie!</h3>
                               <p className="text-gray-300 mb-6">La sua richiesta è stata inviata. Il nostro team la contatterà a breve sulla mail fornita.</p>
                               <button onClick={closeModal} className="bg-indigo-600 text-white px-6 py-2 font-semibold rounded-lg hover:bg-indigo-700 transition-colors">Chiudi</button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Services;
