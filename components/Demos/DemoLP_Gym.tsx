
import React, { useEffect } from 'react';
import { AppMode } from '../../types';
import { ArrowLeft, Dumbbell, Zap, Users, Check, Phone } from 'lucide-react';

interface DemoProps {
  setMode: (mode: AppMode) => void;
}

const DemoLPGym: React.FC<DemoProps> = ({ setMode }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-900 font-sans text-white selection:bg-lime-500 selection:text-black">
      {/* Navigation Back */}
      <div className="fixed top-4 left-4 z-50">
        <button 
            onClick={() => setMode(AppMode.PUBLIC_HOME)} 
            className="bg-black/80 backdrop-blur text-lime-400 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 border border-lime-500/30 transition-all hover:bg-black"
        >
            <ArrowLeft size={16} /> Voltar ao Portfólio
        </button>
      </div>

      {/* Hero Section */}
      <header className="relative min-h-[90vh] flex items-center px-6 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
             <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1200" alt="Gym" className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-neutral-900/80 to-transparent"></div>
        </div>
        
        <div className="max-w-6xl mx-auto w-full relative z-10 grid grid-cols-1 md:grid-cols-2">
            <div className="animate-fade-in-up">
                <h1 className="text-6xl md:text-8xl font-black italic text-white mb-6 leading-none uppercase">
                    Strong<span className="text-lime-500">Fit</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 mb-10 font-medium uppercase tracking-widest">
                    Seu corpo é a sua máquina. <br/>Não pare até conseguir.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <button className="bg-lime-500 hover:bg-lime-400 text-black px-8 py-4 rounded-none skew-x-[-10deg] font-black text-xl uppercase transition-all hover:scale-105">
                        <span className="skew-x-[10deg] block">Começar Agora</span>
                    </button>
                    <button className="border-2 border-white hover:bg-white hover:text-black text-white px-8 py-4 rounded-none skew-x-[-10deg] font-black text-xl uppercase transition-all">
                        <span className="skew-x-[10deg] block">Ver Planos</span>
                    </button>
                </div>
            </div>
        </div>
      </header>

      {/* Services */}
      <section className="py-24 px-6 bg-neutral-900">
          <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                      { icon: Dumbbell, title: 'Musculação', text: 'Equipamentos importados de última geração para hipertrofia.' },
                      { icon: Zap, title: 'Personal Trainer', text: 'Acompanhamento exclusivo para acelerar seus resultados.' },
                      { icon: Users, title: 'Aulas Coletivas', text: 'FitDance, Spinning, Muay Thai e muito mais.' }
                  ].map((item, i) => (
                      <div key={i} className="p-8 border border-neutral-800 bg-neutral-800/50 hover:border-lime-500 transition-colors group">
                          <div className="text-lime-500 mb-6 group-hover:scale-110 transition-transform">
                              <item.icon size={48} />
                          </div>
                          <h3 className="text-2xl font-black uppercase text-white mb-4 italic">{item.title}</h3>
                          <p className="text-neutral-400">{item.text}</p>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-neutral-950">
          <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-black uppercase italic mb-12 text-white">Resultados Reais</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="bg-neutral-900 p-8 border-l-4 border-lime-500 text-left">
                       <p className="text-lg text-gray-300 italic mb-6">"Melhor estrutura da cidade. Os professores são muito atenciosos e o clima é motivador. Perdi 10kg em 3 meses!"</p>
                       <p className="font-bold text-lime-500 uppercase">- Carlos Silva</p>
                   </div>
                   <div className="bg-neutral-900 p-8 border-l-4 border-lime-500 text-left">
                       <p className="text-lg text-gray-300 italic mb-6">"Treino aqui há 2 anos e não troco por nada. A área de musculação é completa e as aulas de Spinning são insanas."</p>
                       <p className="font-bold text-lime-500 uppercase">- Fernanda Torres</p>
                   </div>
              </div>
          </div>
      </section>

      {/* CTA Footer */}
      <footer className="py-20 px-6 bg-lime-500 text-black text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <div className="max-w-3xl mx-auto relative z-10">
              <h2 className="text-5xl font-black uppercase italic mb-6 leading-none">Faça parte do time</h2>
              <p className="text-black/80 font-bold mb-10 text-xl uppercase tracking-wide">
                  Primeira aula experimental é por nossa conta.
              </p>
              <button className="bg-black text-lime-500 px-10 py-5 rounded-none skew-x-[-10deg] font-black text-xl uppercase shadow-2xl hover:scale-105 transition-transform flex items-center gap-2 mx-auto">
                  <span className="skew-x-[10deg] flex items-center gap-2">
                    <Phone size={24} /> Chamar no WhatsApp
                  </span>
              </button>
              <p className="mt-12 text-sm font-bold uppercase opacity-60">© 2024 Academia StrongFit.</p>
          </div>
      </footer>
    </div>
  );
};

export default DemoLPGym;
