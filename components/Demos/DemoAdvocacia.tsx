
import React from 'react';
import { AppMode } from '../../types';
import { ArrowLeft, Check, MapPin, Phone, Shield } from 'lucide-react';

interface DemoProps {
  setMode: (mode: AppMode) => void;
}

const DemoAdvocacia: React.FC<DemoProps> = ({ setMode }) => {
  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-200 selection:bg-indigo-500 selection:text-white relative">
      <div className="fixed top-4 left-4 z-50">
        <button onClick={() => setMode(AppMode.PUBLIC_HOME)} className="bg-white/10 hover:bg-white/20 backdrop-blur text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 border border-white/10 transition-all">
            <ArrowLeft size={16} /> Voltar ao Portfólio
        </button>
      </div>

      {/* Hero */}
      <header className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
             <img src="https://image.pollinations.ai/prompt/luxury%20lawyer%20office%20dark%20mood%20bokeh?nologo=true" alt="Background" className="w-full h-full object-cover opacity-20" />
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
            <div className="inline-block px-4 py-1 border border-indigo-500/50 rounded-full text-indigo-300 text-sm font-semibold uppercase tracking-widest mb-6">Advocacia Especializada</div>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
                Defendendo seus direitos com <span className="text-indigo-500">excelência e rigor.</span>
            </h1>
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
                Dr. Silva e Associados. Mais de 15 anos de experiência em Direito Criminal e Trabalhista. Atendimento 24h para flagrantes.
            </p>
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-indigo-500/20 transition-all hover:-translate-y-1">
                Falar com Especialista Agora
            </button>
        </div>
      </header>

      {/* Areas */}
      <section className="py-24 px-6 bg-slate-900">
          <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-12 text-center">Áreas de Atuação</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                      { title: 'Direito Criminal', desc: 'Defesa em inquéritos policiais, flagrantes e processos judiciais.' },
                      { title: 'Direito Trabalhista', desc: 'Reclamações trabalhistas, cálculos rescisórios e defesa de empresas.' },
                      { title: 'Direito de Família', desc: 'Divórcios, pensão alimentícia, guarda e inventários.' },
                  ].map((area, i) => (
                      <div key={i} className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 hover:border-indigo-500/50 transition-colors">
                          <Shield className="text-indigo-500 w-10 h-10 mb-4" />
                          <h3 className="text-xl font-bold text-white mb-2">{area.title}</h3>
                          <p className="text-slate-400">{area.desc}</p>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* Why Us */}
      <section className="py-24 px-6 bg-slate-950">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
             <div className="flex-1">
                 <img src="https://image.pollinations.ai/prompt/confident%20lawyer%20portrait%20dark%20suit?nologo=true" className="rounded-2xl shadow-2xl border border-slate-800" alt="Advogado" />
             </div>
             <div className="flex-1">
                 <h2 className="text-3xl font-bold text-white mb-6">Por que escolher nosso escritório?</h2>
                 <div className="space-y-4">
                     {['Atendimento personalizado 24h', 'Sigilo absoluto garantido', 'Estratégias jurídicas modernas', 'Transparência nos honorários'].map((item, i) => (
                         <div key={i} className="flex items-center gap-3">
                             <div className="bg-indigo-500/20 p-1 rounded-full text-indigo-400"><Check size={16} /></div>
                             <span className="text-slate-300 font-medium">{item}</span>
                         </div>
                     ))}
                 </div>
             </div>
          </div>
      </section>

      {/* Footer / Map */}
      <section className="py-12 bg-slate-900 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Localização</h3>
                  <p className="text-slate-400 mb-6 flex items-center gap-2">
                      <MapPin size={18} className="text-indigo-500" />
                      Av. Paulista, 1000 - São Paulo, SP
                  </p>
                  <div className="w-full h-48 bg-slate-800 rounded-xl flex items-center justify-center text-slate-500 text-sm">
                      [Mapa do Google Integrado Aqui]
                  </div>
              </div>
              <div className="text-center md:text-right">
                  <h3 className="text-2xl font-bold text-white mb-4">Entre em Contato</h3>
                  <p className="text-slate-400 mb-6">Agende sua consulta inicial sem compromisso.</p>
                  <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-3 ml-auto shadow-lg shadow-emerald-500/20">
                      <Phone size={20} /> (11) 99999-9999
                  </button>
              </div>
          </div>
      </section>
    </div>
  );
};

export default DemoAdvocacia;
