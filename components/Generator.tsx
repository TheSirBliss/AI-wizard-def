'use client';
import { useState } from 'react';
import { UtensilsCrossed, Camera, Rocket, Briefcase, Zap, Copy, Check, Loader2 } from 'lucide-react';

const templates = [
  { id: 'restaurant', name: 'Ristorante', icon: UtensilsCrossed, prompt: "Crea un sito per un ristorante italiano moderno a Milano chiamato 'Bella Cucina'. Voglio una homepage con foto grandi dei piatti, una sezione 'Chi Siamo', una pagina 'Menu' dettagliata con antipasti, primi, secondi e dessert, e una pagina 'Contatti' con mappa e form di prenotazione. Lo stile deve essere elegante e accogliente, con colori scuri come il nero e il bordeaux, e accenti dorati." },
  { id: 'portfolio', name: 'Portfolio', icon: Camera, prompt: "Realizza un sito portfolio per un fotografo professionista specializzato in ritratti e matrimoni. Il sito deve avere una homepage con una galleria a griglia dei migliori scatti, una pagina 'About Me' con biografia e foto personale, una pagina 'Servizi' che descrive i pacchetti offerti, e una pagina 'Contatti'. Lo stile deve essere minimalista e moderno, con sfondo bianco o grigio chiaro per far risaltare le foto." },
  { id: 'startup', name: 'Startup Tech', icon: Rocket, prompt: "Genera una landing page per una startup tecnologica che lancia una nuova app di produttività chiamata 'SyncFlow'. La pagina deve avere una hero section con un titolo d'impatto e una call-to-action per il download, una sezione 'Funzionalità' con icone e brevi descrizioni, una sezione 'Prezzi' con tre piani (Free, Pro, Business), e una sezione 'FAQ'. Lo stile deve essere pulito, moderno e tecnologico, usando colori come il blu, il viola e gradienti." },
  { id: 'consultant', name: 'Consulente', icon: Briefcase, prompt: "Crea un sito web professionale per un consulente finanziario. Deve includere una homepage che comunichi fiducia e professionalità, una pagina 'Servizi' che elenchi le aree di consulenza (pianificazione pensionistica, investimenti, etc.), una pagina 'Chi Sono' con le credenziali e l'esperienza, e un blog per articoli di settore. Lo stile deve essere corporate e affidabile, con colori sobri come il blu navy e il grigio." }
];

const Generator = ({ onHtmlGenerated }: { onHtmlGenerated: (html: string) => void }) => {
    const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState('');
    const [generatedHtml, setGeneratedHtml] = useState('');
    const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
    const [isCopied, setIsCopied] = useState(false);

    const handleTemplateSelect = (template: typeof templates[0]) => {
        setSelectedTemplateId(template.id);
        setDescription(template.prompt);
    };

    const handleGenerate = async () => {
        // --- NUOVO CONTROLLO PREVENTIVO ---
        if (!description.trim()) {
            setStatus('Errore: Per favore, inserisci una descrizione.');
            return;
        }
        
        setIsLoading(true);
        setStatus('Generazione in corso...');
        setGeneratedHtml('');
        onHtmlGenerated('');

        try {
            const response = await fetch('/api/create-project', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: description })
            });

            const data = await response.json();

            if (!response.ok) {
                // Ora leggiamo il messaggio di errore specifico dal JSON
                throw new Error(data.error || `Errore HTTP: ${response.status}`);
            }
            
            if (!data.html) {
                throw new Error("La risposta dell'API non conteneva codice HTML.");
            }

            const cleanHtml = data.html.replace(/^```html\n/, '').replace(/\n```$/, '');
            
            setGeneratedHtml(cleanHtml);
            onHtmlGenerated(cleanHtml); 
            setStatus('Sito generato con successo!');

        } catch (error: any) {
            console.error("Errore completo:", error);
            setStatus(`Errore: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedHtml);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
      <section id="generator" className="py-20 bg-black/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Crea il tuo sito con Gemini</h2>
            <p className="max-w-xl mx-auto text-gray-400 mt-2">
                Scegli un template come base, poi personalizza la descrizione. La nostra IA costruirà una bozza di sito completa di codice.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-2xl shadow-indigo-900/10">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">1. Scegli un punto di partenza</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {templates.map(t => (
                    <div 
                      key={t.id}
                      onClick={() => handleTemplateSelect(t)}
                      className={`bg-gray-800 p-4 rounded-lg border-2 cursor-pointer text-center transition-all ${selectedTemplateId === t.id ? 'border-indigo-500 shadow-lg' : 'border-transparent hover:border-gray-600'}`}
                    >
                      <t.icon className="mx-auto w-8 h-8 mb-2 text-indigo-400" />
                      <p className="text-sm font-semibold text-white">{t.name}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">2. Descrivi le tue personalizzazioni</h3>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full h-32 bg-gray-800 border border-gray-700 rounded-lg p-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition" 
                  placeholder="Scegli un template per iniziare oppure descrivi qui il tuo sito da zero..."
                />
              </div>
              <button onClick={handleGenerate} disabled={isLoading} className="w-full mt-6 bg-indigo-600 text-white py-3 font-semibold rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed">
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
                <span>{isLoading ? 'Generazione...' : 'Genera Sito Web'}</span>
              </button>
              {status && <div className="mt-4 text-center text-gray-400" style={{ color: status.startsWith('Errore') ? '#f87171' : '#4ade80' }}>{status}</div>}
            </div>
            {generatedHtml && (
              <div className="mt-12">
                  <h3 className="text-2xl font-bold text-center mb-4">Anteprima e Codice</h3>
                  <div className="flex justify-center mb-4">
                      <div className="bg-gray-800 p-1 rounded-lg flex gap-1">
                          <button onClick={() => setActiveTab('preview')} className={`px-4 py-1.5 text-sm font-medium rounded-md ${activeTab === 'preview' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}>Anteprima</button>
                          <button onClick={() => setActiveTab('code')} className={`px-4 py-1.5 text-sm font-medium rounded-md ${activeTab === 'code' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}>Codice</button>
                      </div>
                  </div>
                  {activeTab === 'preview' ? (
                      <div className="w-full h-[600px] bg-white rounded-lg border-4 border-gray-700 overflow-hidden">
                          <iframe srcDoc={generatedHtml} className="w-full h-full" title="Site Preview"/>
                      </div>
                  ) : (
                      <div className="relative">
                          <pre className="bg-gray-900 border border-gray-700 rounded-lg p-4 max-h-[600px] overflow-auto"><code className="language-html text-sm">{generatedHtml}</code></pre>
                          <button onClick={handleCopy} className="absolute top-3 right-3 bg-gray-700 text-gray-300 hover:bg-gray-600 p-2 rounded-md transition-colors">
                              {isCopied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                          </button>
                      </div>
                  )}
              </div>
            )}
          </div>
        </div>
      </section>
    );
};
export default Generator;
