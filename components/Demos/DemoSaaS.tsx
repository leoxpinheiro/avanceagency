
import React from 'react';
import { AppMode } from '../../types';
import { ArrowLeft, CheckCircle, Monitor, Smartphone, Zap } from 'lucide-react';

interface DemoProps {
  setMode: (mode: AppMode) => void;
}

const DemoSaaS: React.FC<DemoProps> = ({ setMode }) => {
  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-200 relative selection:bg-emerald-500">
      <div className="fixed top-4 left-4 z-50">
        <button onClick={() => setMode(AppMode.PUBLIC_HOME)} className="bg-slate-800/80 hover:bg-slate-800 backdrop-blur text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 border border-slate-700 transition-all hover:-translate-y-0.5 active:scale-95 shadow-lg">
            <ArrowLeft size={16} /> Voltar ao Portfólio
        </button>
      </div>

      {/* Hero */}
      <header className="relative pt-32 pb-20 px-6 overflow-hidden">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow"></div>
         <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none animate-blob"></div>

         <div className="max-w-6xl mx-auto text-center relative z-10 mb-16 reveal-on-scroll">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6 hover:bg-emerald-500/20 transition-colors">
                Sistema de Gestão v2.0
             </div>
             <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
                 Organize seu negócio em <span className="text-emerald-500">um único lugar.</span>
             </h1>
             <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
                 BarberFlow. O sistema completo para barbearias, salões e clínicas. Agendamento online, financeiro e fidelização.
             </p>
             <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-emerald-500/20 transition-all hover:-translate-y-1 active:scale-95">
                 Testar Sistema Gratuitamente
             </button>
         </div>

         {/* Mockup */}
         <div className="max-w-5xl mx-auto bg-slate-900 border border-slate-800 rounded-t-3xl shadow-2xl overflow-hidden relative reveal-on-scroll hover:shadow-emerald-500/10 transition-shadow duration-500">
             <div className="bg-slate-800 p-3 flex items-center gap-2 border-b border-slate-700">
                 <div className="flex gap-1.5">
                     <div className="w-3 h-3 rounded-full bg-red-500"></div>
                     <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                     <div className="w-3 h-3 rounded-full bg-green-500"></div>
                 </div>
                 <div className="bg-slate-900 px-4 py-1 rounded-md text-xs text-slate-500 flex-1 text-center font-mono">app.barberflow.com/dashboard</div>
             </div>
             <img src="https://image.pollinations.ai/prompt/saas%20dashboard%20dark%20ui%20analytics%20charts%20modern?nologo=true" className="w-full opacity-90" alt="Dashboard" />
         </div>
      </header>

      {/* Pricing Comparison */}
      <section className="py-24 px-6 bg-slate-900 border-y border-slate-800">
          <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16 reveal-on-scroll">
                  <h2 className="text-3xl font-bold text-white mb-4">Planos Transparentes</h2>
                  <p className="text-slate-400">Escolha o tamanho ideal para o seu momento.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                  {/* Solo */}
                  <div className="reveal-on-scroll bg-slate-950 p-8 rounded-3xl border border-slate-800 hover:border-slate-700 transition-all duration-300 relative hover:-translate-y-2 hover:shadow-xl">
                      <h3 className="text-xl font-bold text-white mb-2">Plano Solo</h3>
                      <div className="text-4xl font-bold text-white mb-4">R$ 39,90<span className="text-sm text-slate-500 font-medium">/mês</span></div>
                      <p className="text-slate-400 text-sm mb-8">Para quem trabalha sozinho e quer organização.</p>
                      <ul className="space-y-4 mb-8">
                          {['Agendamento Online 24h', 'Link Personalizado (.app)', 'Painel de Gestão Simples', 'Suporte via WhatsApp'].map((feat, i) => (
                              <li key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                                  <CheckCircle size={16} className="text-slate-500" /> {feat}
                              </li>
                          ))}
                      </ul>
                      <button className="w-full py-4 rounded-xl border border-slate-700 text-white font-bold hover:bg-slate-900 transition-colors active:scale-95">
                          Escolher Solo
                      </button>
                  </div>

                  {/* Pro */}
                  <div className="reveal-on-scroll bg-gradient-to-b from-slate-900 to-slate-950 p-8 rounded-3xl border border-emerald-500/30 hover:border-emerald-500/50 transition-all duration-300 relative shadow-2xl shadow-emerald-900/10 hover:-translate-y-2 hover:shadow-emerald-500/20">
                      <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider shadow-lg">Recomendado</div>
                      <h3 className="text-xl font-bold text-white mb-2">Plano Pro</h3>
                      <div className="text-4xl font-bold text-emerald-400 mb-4">R$ 79,90<span className="text-sm text-slate-500 font-medium">/mês</span></div>
                      <p className="text-slate-400 text-sm mb-8">Gestão total com inteligência artificial.</p>
                      <ul className="space-y-4 mb-8">
                          {['Tudo do Plano Solo', 'Chat IA Flutuante', 'IA Criadora de Conteúdo', 'Relatórios Financeiros', 'Gestão de Clientes'].map((feat, i) => (
                              <li key={i} className="flex items-center gap-3 text-white text-sm">
                                  <CheckCircle size={16} className="text-emerald-500" /> {feat}
                              </li>
                          ))}
                      </ul>
                      <button className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-lg shadow-emerald-600/20 active:scale-95">
                          Escolher Pro
                      </button>
                  </div>
              </div>

              {/* Installation Fee Note */}
              <div className="reveal-on-scroll mt-12 bg-slate-950 border border-slate-800 p-6 rounded-2xl flex items-center justify-between flex-col md:flex-row gap-4 text-center md:text-left hover:border-slate-700 transition-colors">
                  <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400">
                          <Zap size={24} />
                      </div>
                      <div>
                          <h4 className="text-white font-bold">Taxa de Instalação e Configuração</h4>
                          <p className="text-slate-400 text-sm">Aplicada em ambos os planos para setup inicial do sistema.</p>
                      </div>
                  </div>
                  <div className="text-xl font-bold text-white bg-slate-900 px-4 py-2 rounded-lg border border-slate-800">
                      R$ 197,00 <span className="text-xs text-slate-500 font-normal">único</span>
                  </div>
              </div>
          </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-950 border-t border-slate-900 text-center text-slate-600 text-sm">
          <p>© 2024 BarberFlow System. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default DemoSaaS;
