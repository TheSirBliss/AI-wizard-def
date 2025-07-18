// FILE: components/Generator.tsx
'use client';
import { useState } from 'react';
import { Camera, Check, Briefcase, Copy, Loader2, Rocket, UtensilsCrossed, Zap } from 'lucide-react';

// I template ora servono solo per la UI, il prompt viene costruito dinamicamente
const templates = [
  { id: 'restaurant', name: 'Ristorante', icon: UtensilsCrossed },
  { id: 'portfolio', name: 'Portfolio', icon: Camera },
  { id: 'startup', name: 'Startup Tech', icon: Rocket },
  { id: 'consultant', name: 'Consulente', icon: Briefcase }
];

const Generator = ({ onHtmlGenerated }: { onHtmlGenerated: (html: string) => void }) => {
    // Stato per i nuovi campi del form
    const [businessName, setBusinessName] = useState('');
    const [businessSector, setBusinessSector] = useState('Ristorazione');
    const [visualStyle, setVisualStyle] = useState('Moderno/Minimale');
    
    // Vecchi stati
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState('');
    const [generatedHtml, setGeneratedHtml] = useState('');
    const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
    const [isCopied, setIsCopied] = useState(false);

    const handleGenerate = async () => {
        if (!businessName.trim()) {
            setStatus('Errore: Il nome dell\'attività è obbligatorio.');
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
                body: JSON.stringify({ 
                    businessName,
                    businessSector,
                    visualStyle,
                    description 
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || `Errore HTTP: ${response.status}`);
            }
            
            if (!data.html) {
                throw new Error("La risposta dell'API non conteneva codice HTML.");
            }

            const cleanHtml = data.html;
            
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
                Descriva il suo progetto. La nostra IA costruirà una bozza di sito completa di codice.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 md:p-8 shadow-2xl shadow-indigo-900/10">
              <div className="space-y-6">
                
                <div>
                  <label htmlFor="businessName" className="block text-lg font-semibold text-white mb-2">1. Nome Attività o Progetto</label>
                  <input 
                      type="text" 
                      id="businessName" 
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition" 
                      placeholder="Es. Rossi Pasticceria Artigianale" 
                  />
                </div>

                <div>
                  <label htmlFor="businessSector" className="block text-lg font-semibold text-white mb-2">2. Settore di Mercato</label>
                  <select 
                      id="businessSector" 
                      value={businessSector}
                      onChange={(e) => setBusinessSector(e.target.value)}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                  >
                      <option>Ristorazione</option>
                      <option>Consulenza Finanziaria</option>
                      <option>Portfolio Fotografico</option>
                      <option>Startup Tecnologica</option>
                      <option>Negozio E-commerce</option>
                      <option>Studio Legale</option>
                      <option>Altro</option>
                  </select>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">3. Stile Visivo</h3>
                  <div className="flex flex-wrap gap-x-6 gap-y-2">
                      <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                          <input type="radio" name="style" value="Moderno/Minimale" checked={visualStyle === 'Moderno/Minimale'} onChange={(e) => setVisualStyle(e.target.value)} className="h-4 w-4 bg-gray-700 border-gray-600 text-indigo-600 focus:ring-indigo-500" />
                          Moderno/Minimale
                      </label>
                      <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                          <input type="radio" name="style" value="Elegante/Classico" checked={visualStyle === 'Elegante/Classico'} onChange={(e) => setVisualStyle(e.target.value)} className="h-4 w-4 bg-gray-700 border-gray-600 text-indigo-600 focus:ring-indigo-500" />
                          Elegante/Classico
                      </label>
                      <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                          <input type="radio" name="style" value="Vivace/Colorato" checked={visualStyle === 'Vivace/Colorato'} onChange={(e) => setVisualStyle(e.target.value)} className="h-4 w-4 bg-gray-700 border-gray-600 text-indigo-600 focus:ring-indigo-500" />
                          Vivace/Colorato
                      </label>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">4. Dettagli Aggiuntivi (Opzionale)</h3>
                  <textarea 
                      id="site-description" 
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full h-24 bg-gray-800 border border-gray-700 rounded-lg p-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition" 
                      placeholder="Aggiungi dettagli specifici... (es. colori preferiti, siti di riferimento, sezioni da includere, etc.)"
                  ></textarea>
                </div>

              </div>

              <button onClick={handleGenerate} disabled={isLoading} className="w-full mt-8 bg-indigo-600 text-white py-3 font-semibold rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:bg-gray-600 disabled:cursor-not-allowed">
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
                <span>{isLoading ? 'Creazione in corso...' : 'Genera Sito Web Perfetto'}</span>
              </button>
              {status && <div className="mt-4 text-center text-sm" style={{ color: status.startsWith('Errore') ? '#f87171' : '#4ade80' }}>{status}</div>}
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
