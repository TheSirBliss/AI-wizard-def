// FILE: app/api/create-project/route.ts (Versione finale corretta)
import { GoogleGenerativeAI } from "@google/generative-ai";

// Assicurati che la variabile d'ambiente sia presente
if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not defined");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return new Response(JSON.stringify({ error: "Il prompt è obbligatorio" }), { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const fullPrompt = `Sei un esperto sviluppatore web full-stack con 20 anni di esperienza. 
    Crea una landing page completa basata sulla seguente descrizione. Il codice deve essere un singolo file HTML, usando Tailwind CSS per lo stile (usa lo script CDN: <script src="https://cdn.tailwindcss.com"></script>). 
    Includi sezioni pertinenti e contenuti di esempio. Il design deve essere moderno, pulito e professionale. 
    Rispondi ESCLUSIVAMENTE con il codice HTML completo. Non includere \`\`\`html, spiegazioni o commenti al di fuori del codice.

    Descrizione utente: "${prompt}"`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    return new Response(JSON.stringify({ html: text }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error: unknown) {
    console.error("Errore nella rotta API:", error);
    // ECCO LA CORREZIONE: Estraiamo il messaggio specifico dall'errore
    const errorMessage = (error instanceof Error) ? error.message : "Errore sconosciuto";
    return new Response(JSON.stringify({ error: errorMessage }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
    });
  }
}
