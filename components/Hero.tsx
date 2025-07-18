// FILE: components/Hero.tsx
const Hero = () => {
    return (
        <section id="hero" className="relative pt-32 pb-20 text-center" style={{ background: 'radial-gradient(ellipse 80% 50% at 50% -20%,rgba(120,119,198,0.3),hsla(0,0%,100%,0))' }}>
            <div className="container mx-auto px-4">
                <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-4">
                    Il Futuro della Creazione Web è Qui
                </h1>
                <p className="max-w-2xl mx-auto text-lg text-gray-300 mb-8">
                    Genera un sito web professionale in pochi istanti con l'IA di Gemini, o affidati alla nostra ventennale esperienza per un progetto su misura.
                </p>
                <div>
                    <a href="#generator" className="bg-indigo-600 text-white px-8 py-3 font-semibold rounded-lg hover:bg-indigo-700 transition-transform hover:scale-105 inline-block">
                        Prova il Generatore AI
                    </a>
                </div>
            </div>
        </section>
    );
};
export default Hero;