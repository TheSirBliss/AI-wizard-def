import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not defined");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { businessName, businessSector, visualStyle, description } = await req.json();

    if (!businessName || !businessSector || !visualStyle) {
      return new Response(JSON.stringify({ error: "Nome, settore e stile sono obbligatori." }), { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const fullPrompt = `
      # ROLE
      Assumi il ruolo di un Senior UI/UX Designer e Full-Stack Developer con 20+ anni di esperienza. La tua specialità è creare design puliti, moderni, accattivanti e altamente professionali.
      
      # CONTEXT
      Il tuo compito è generare il codice HTML completo per una landing page esteticamente impeccabile. Il codice deve essere un singolo file HTML autonomo che usa Tailwind CSS tramite CDN.
      
      # TASK
      Analizza le specifiche e genera il codice. Presta massima attenzione all'estetica: usa ampi spazi bianchi, scegli una palette di colori coerente e professionale, e seleziona abbinamenti di font moderni tramite Google Fonts.
      
      # IMAGE RULES (Regole per le Immagini)
      Per ogni tag <img>, usa il servizio Unsplash Source per trovare immagini pertinenti e gratuite. La sintassi è 'https://source.unsplash.com/random/WIDTHxHEIGHT?{keyword}'. Sostituisci {keyword} con un termine in INGLESE pertinente al contenuto (es. 'restaurant,food,pasta' per un ristorante). Usa risoluzioni appropriate come 1600x900 per le hero image e 800x600 per immagini più piccole.
      
      # LINK RULES (Regole per i Link)
      Tutti i link di navigazione e i pulsanti non funzionali DEVONO avere 'href="#"' per evitare problemi di reindirizzamento nell'anteprima.

      # ACTION (Specifiche del Cliente)
      - Nome Attività: "${businessName}"
      - Settore di Mercato: "${businessSector}"
      - Stile Visivo Desiderato: "${visualStyle}"
      - Dettagli Aggiuntivi: "${description || 'Nessun dettaglio aggiuntivo. Concentrati sulla qualità del design.'}"

      # FORMAT
      Rispondi ESCLUSIVAMENTE con il codice HTML completo. Non includere \`\`\`html, commenti o qualsiasi testo al di fuori del codice. Il codice deve iniziare con <!DOCTYPE html> e finire con </html>. Assicurati che nel <head> ci siano i link a Tailwind CSS e Google Fonts, e alla fine del <body> gli script per Lucide Icons.
    `;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    return new Response(JSON.stringify({ html: text }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error: unknown) {
    console.error("Errore nella rotta API:", error);
    const errorMessage = (error instanceof Error) ? error.message : "Errore sconosciuto nel backend";
    return new Response(JSON.stringify({ error: errorMessage }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
    });
  }
}
