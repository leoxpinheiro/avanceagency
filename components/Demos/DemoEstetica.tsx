
import React from 'react';
import { AppMode } from '../../types';
import { ArrowLeft, Star, Heart, Calendar } from 'lucide-react';

interface DemoProps {
  setMode: (mode: AppMode) => void;
}

const DemoEstetica: React.FC<DemoProps> = ({ setMode }) => {
  return (
    <div className="min-h-screen bg-rose-50 font-sans text-slate-800 relative selection:bg-pink-300">
      <div className="fixed top-4 left-4 z-50">
        <button onClick={() => setMode(AppMode.PUBLIC_HOME)} className="bg-white/80 hover:bg-white backdrop-blur text-pink-600 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg transition-all">
            <ArrowLeft size={16} /> Voltar ao Portfólio
        </button>
      </div>

      {/* Hero */}
      <header className="relative pt-32 pb-20 px-6 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="z-10">
                <span className="text-pink-500 font-bold tracking-widest text-sm uppercase mb-4 block">Clínica de Estética Avançada</span>
                <h1 className="text-5xl md:text-6xl font-display font-bold text-slate-900 mb-6 leading-tight">
                    Realce sua beleza natural com <span className="text-pink-500">segurança e tecnologia.</span>
                </h1>
                <p className="text-xl text-slate-500 mb-8 leading-relaxed">
                    Dra. Ana Estética. Tratamentos faciais e corporais personalizados para você se sentir bem consigo mesma.
                </p>
                <button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl shadow-pink-200 transition-all hover:-translate-y-1">
                    Agendar Avaliação Gratuita
                </button>
            </div>
            <div className="relative">
                 <div className="absolute inset-0 bg-pink-100 rounded-full blur-3xl transform translate-x-10 translate-y-10"></div>
                 <img src="https://image.pollinations.ai/prompt/beautiful%20woman%20skin%20care%20clinic%20bright%20clean?nologo=true" className="relative z-10 rounded-[3rem] shadow-2xl" alt="Estética" />
            </div>
        </div>
      </header>

      {/* Procedimentos */}
      <section className="py-24 px-6 bg-rose-50">
          <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-slate-800 mb-16">Nossos Procedimentos</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                      { name: 'Harmonização Facial', img: 'https://image.pollinations.ai/prompt/face%20massage%20spa?nologo=true' },
                      { name: 'Botox & Preenchimento', img: 'https://image.pollinations.ai/prompt/botox%20injection%20beauty?nologo=true' },
                      { name: 'Bioestimuladores', img: 'https://image.pollinations.ai/prompt/skin%20care%20products%20luxury?nologo=true' },
                  ].map((proc, i) => (
                      <div key={i} className="bg-white p-4 rounded-3xl shadow-lg hover:shadow-xl transition-shadow group cursor-pointer">
                          <div className="h-48 overflow-hidden rounded-2xl mb-4">
                              <img src={proc.img} alt={proc.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <h3 className="text-xl font-bold text-slate-800 text-center">{proc.name}</h3>
                          <p className="text-center text-pink-400 text-sm font-medium mt-1">Saiba mais</p>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* Benefícios */}
      <section className="py-24 px-6 bg-white">
          <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-slate-800 mb-12">Por que somos referência?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="p-6">
                      <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center text-pink-500 mx-auto mb-4">
                          <Star size={28} />
                      </div>
                      <h3 className="font-bold text-lg mb-2">Profissionais Qualificados</h3>
                      <p className="text-slate-500 text-sm">Equipe formada e especializada nas melhores técnicas.</p>
                  </div>
                  <div className="p-6">
                      <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center text-pink-500 mx-auto mb-4">
                          <Heart size={28} />
                      </div>
                      <h3 className="font-bold text-lg mb-2">Atendimento Humanizado</h3>
                      <p className="text-slate-500 text-sm">Cuidamos de você com carinho desde a recepção.</p>
                  </div>
                  <div className="p-6">
                      <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center text-pink-500 mx-auto mb-4">
                          <Calendar size={28} />
                      </div>
                      <h3 className="font-bold text-lg mb-2">Horários Flexíveis</h3>
                      <p className="text-slate-500 text-sm">Agenda estendida para atender sua rotina.</p>
                  </div>
              </div>
          </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-pink-50 border-t border-pink-100 text-center">
           <div className="max-w-4xl mx-auto px-6">
               <h2 className="text-2xl font-bold text-slate-800 mb-6">Pronta para sua transformação?</h2>
               <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg flex items-center gap-2 mx-auto">
                   Chamar no WhatsApp
               </button>
               <p className="text-slate-400 text-sm mt-8">© 2024 Dra. Ana Estética. Todos os direitos reservados.</p>
           </div>
      </footer>
    </div>
  );
};

export default DemoEstetica;
