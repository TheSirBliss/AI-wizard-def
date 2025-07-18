import { GoogleGenerativeAI } from "@google/generative-ai";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
// Importi qui la configurazione di NextAuth che creeremo nello sprint successivo
// import { authOptions } from "../auth/[...nextauth]/route"; 

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not defined");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  // --- SPRINT 4: LOGICA DI BUSINESS (LIMITE MODIFICHE) ---
  // Per ora, questa sezione è commentata. La attiveremo quando il sistema di account sarà pronto.
  /*
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.email) {
    return new Response(JSON.stringify({ error: "Devi essere loggato per generare un sito." }), { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email }});

  // Assicurati di aggiungere `generationsMade Int @default(0)` al tuo modello User in schema.prisma
  if (user && user.generationsMade >= 2) {
    return new Response(JSON.stringify({ error: "Hai superato il limite di 2 generazioni gratuite." }), { status: 402 });
  }
  */

  try {
    const { businessName, businessSector, visualStyle, pages } = await req.json();

    if (!businessName || !pages || !Array.isArray(pages) || pages.length === 0) {
      return new Response(JSON.stringify({ error: "Dati mancanti o malformati per la generazione." }), { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const pagesContent = pages.map((page: {name: string, content: string}) => 
      `- Pagina "${page.name}":\n  Contenuti richiesti: ${page.content || 'Genera contenuti appropriati per questa pagina basandoti sulle informazioni generali.'}`
    ).join('\n');

    const fullPrompt = `
      # ROLE
      Assumi il ruolo di un Senior Web Architect e Content Strategist con 20 anni di esperienza. Sei un maestro nel creare siti web multi-pagina coerenti, professionali ed esteticamente impeccabili.
      
      # CONTEXT
      Stai creando un intero sito web per un cliente. Devi generare i file HTML separati per ogni pagina richiesta. Il design deve essere unificato e riflettere l'identità del brand.
      
      # TASK
      Analizza le specifiche generali e i contenuti richiesti per ogni singola pagina. Genera il codice HTML completo per TUTTE le pagine richieste.
      
      # REGOLE DI DESIGN e TECNICHE
      - Stile Generale: "${visualStyle}". Applica questo stile in modo coerente su tutte le pagine.
      - Palette Colori: Scegli una palette di colori professionale e armonica adatta al settore "${businessSector}".
      - Font: Usa Google Fonts per garantire leggibilità ed eleganza. Includi il link nel <head> di ogni pagina.
      - Immagini: Per ogni tag <img>, usa il servizio Unsplash Source: 'https://source.unsplash.com/random/WIDTHxHEIGHT?{keyword_in_inglese}'. Usa keyword pertinenti. Esempio per un ristorante: 'restaurant,italian-food'.
      - Navigazione: In ogni pagina, crea una navbar <nav> coerente che contenga i link a TUTTE le altre pagine generate. I link DEVONO essere relativi e scritti in minuscolo-senza-spazi.html (es. <a href="./chi-siamo.html">Chi Siamo</a>, <a href="./contatti.html">Contatti</a>). La homepage deve chiamarsi 'index.html'.
      
      # ACTION (Specifiche del Cliente)
      - Nome Attività: "${businessName}"
      - Settore di Mercato: "${businessSector}"
      - Pagine e Contenuti da Creare:
      ${pagesContent}

      # FORMAT (MOLTO IMPORTANTE)
      Restituisci tutto il codice in un unico blocco di testo, ma separa ogni file HTML con un commento specifico e riconoscibile: ''. Il nome del file deve essere basato sul nome della pagina, in minuscolo e con trattini. La homepage deve essere 'index.html'. Esempio di output:
      <!DOCTYPE html>
      ... (codice completo della homepage) ...
      </html>
      <!DOCTYPE html>
      ... (codice completo della pagina chi siamo) ...
      </html>
    `;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    // --- SPRINT 4: AGGIORNAMENTO CONTATORE DOPO SUCCESSO ---
    // Una volta attivata l'autenticazione, decommenta questa parte
    /*
    if (user) {
      await prisma.user.update({
        where: { email: session.user.email! },
        data: { generationsMade: { increment: 1 } },
      });
    }
    */

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
