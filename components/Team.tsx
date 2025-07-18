// FILE: components/Team.tsx
import { Code2, LineChart, Briefcase } from 'lucide-react';

const teamMembers = [
    {
        icon: Code2,
        role: 'Senior Full-Stack Developer',
        description: 'Architettura software, sviluppo frontend/backend, design di database e UI/UX. La visione a 360° per progetti robusti e scalabili.'
    },
    {
        icon: LineChart,
        role: 'Senior Marketing Strategist',
        description: 'Posizionamento del brand, marketing digitale, growth hacking e ottimizzazione del ROI. Strategie data-driven per una crescita misurabile.'
    },
    {
        icon: Briefcase,
        role: 'Senior Business Consultant',
        description: 'Strategia aziendale, ottimizzazione dei processi, change management e P&L. La guida strategica per decisioni aziendali vincenti.'
    }
];

const Team = () => {
    return (
        <section id="team" className="py-20 bg-gray-900/50">
            <div className="container mx-auto px-4">
                 <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">La nostra Expertise al tuo Servizio</h2>
                    <p className="max-w-2xl mx-auto text-gray-400 mt-2">
                        Dietro la tecnologia c'è un team di professionisti con oltre 20 anni di esperienza, pronti a trasformare la tua visione in realtà.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="bg-gray-800 p-6 rounded-lg border border-gray-700 text-center transform hover:-translate-y-2 transition-transform">
                            <member.icon className="w-12 h-12 mx-auto text-indigo-400 mb-4" />
                            <h4 className="text-xl font-bold text-white">{member.role}</h4>
                            <p className="text-sm text-gray-400 mt-2">{member.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Team;