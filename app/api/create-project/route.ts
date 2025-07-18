// File: app/api/create-project/route.ts
export const dynamic = 'force-dynamic';
export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!process.env.VERCEL_API_TOKEN) {
      return new Response(JSON.stringify({ error: 'VERCEL_API_TOKEN non è configurato.' }), { status: 500 });
    }
    const data = {
      name: body.name || 'new-ai-project',
      framework: 'nextjs',
      gitRepository: { type: 'github', repo: 'steven-tey/nextjs-starter-kit' },
    };
    const response = await fetch('https://api.vercel.com/v10/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.VERCEL_API_TOKEN}`,
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    if (!response.ok) {
      return new Response(JSON.stringify(responseData), { status: response.status });
    }
    return new Response(JSON.stringify(responseData), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Errore interno del server.' }), { status: 500 });
  }
}