
import React, { useState } from 'react';
import { AppMode } from '../../types';
import { 
    ArrowRight, Star, LogIn, Eye, Hammer, 
    Smartphone, LayoutTemplate, ShieldCheck, Zap, Lock, Rocket, MessageCircle, Check
} from 'lucide-react';
import LoginModal from '../Auth/LoginModal';

// ============================================================
// AVANCE AGENCY — LISTA COMPLETA DE BENEFÍCIOS
// ============================================================

export const saasSoloBenefits = [
  "Agenda Online 24h",
  "Lembretes via WhatsApp",
  "Link de Agendamento (.app)",
  "Controle de Agendamentos",
  "Histórico de Clientes",
  "Dashboard Básico"
];

export const saasPremiumBenefits = [
  "Tudo do Solo",
  "Múltiplos Profissionais",
  "Relatórios de Faturamento",
  "Controle de Caixa",
  "Cálculo de Comissões",
  "Acompanhamento de Metas"
];

export const lpPremiumBenefits = [
  "Layout Moderno",
  "Botão WhatsApp Flutuante",
  "CTA em Todas Seções",
  "Galeria de Fotos",
  "SEO Básico",
  "Hospedagem Inclusa"
];

export const lpAltaConversaoBenefits = [
  "Copywriting Persuasivo",
  "Depoimentos Dinâmicos",
  "Estrutura de Vendas",
  "Analytics Integrado",
  "Design Avançado",
  "Preparada para Tráfego"
];

export function BenefitsList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5 mt-4 mb-6 opacity-90 text-sm text-left">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-2 text-slate-300">
          <span className="text-emerald-400 text-base leading-none mt-0.5">✔</span>
          <span className="leading-tight text-xs md:text-sm">{item}</span>
        </li>
      ))}
    </ul>
  );
}

// ============================================================
// DADOS DO PORTFÓLIO
// ============================================================

const portfolioData = {
    // 4 SISTEMAS SAAS (Corrigido para corresponder aos Demos App.tsx)
    saas: [
        { 
            title: 'Studio Nails', 
            subtitle: 'Manicure & Pedicure', 
            img: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&auto=format&fit=crop&q=80', 
            badge: 'SaaS Solo', 
            mode: AppMode.DEMO_SOLO_NAILS 
        },
        { 
            title: 'Pet Care Pro', 
            subtitle: 'Pet Shop & Veterinária', 
            img: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800&auto=format&fit=crop&q=80', 
            badge: 'SaaS Solo', 
            mode: AppMode.DEMO_SOLO_PET 
        },
        { 
            title: 'Barber Club Elite', 
            subtitle: 'Barbearia Premium', 
            img: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&auto=format&fit=crop&q=80', 
            badge: 'SaaS Elite', 
            mode: AppMode.DEMO_ELITE_BARBER 
        },
        { 
            title: 'Dermique Estética', 
            subtitle: 'Clínica de Estética', 
            img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&auto=format&fit=crop&q=80', 
            badge: 'SaaS Elite', 
            mode: AppMode.DEMO_ELITE_CLINIC 
        }
    ],
    // 2 LANDING PAGES PREMIUM
    lpPremium: [
        { 
            title: 'Clínica Odonto Saúde', 
            subtitle: 'Saúde & Odontologia', 
            img: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&auto=format&fit=crop&q=80', 
            badge: 'LP Premium', 
            mode: AppMode.DEMO_LP_DENTIST 
        },
        { 
            title: 'Academia StrongFit', 
            subtitle: 'Treino & Performance', 
            img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80', 
            badge: 'LP Premium', 
            mode: AppMode.DEMO_LP_GYM 
        }
    ],
    // 2 LANDING PAGES ALTA CONVERSÃO
    lpHigh: [
        { 
            title: 'Lumière Estética', 
            subtitle: 'Harmonização Facial', 
            img: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&auto=format&fit=crop&q=80', 
            badge: 'Alta Conversão', 
            mode: AppMode.DEMO_LP_AESTHETIC 
        },
        { 
            title: 'Dr. Renato', 
            subtitle: 'Cirurgião Plástico', 
            img: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800&auto=format&fit=crop&q=80', 
            badge: 'Alta Conversão', 
            mode: AppMode.DEMO_LP_PLASTIC 
        }
    ]
};

// ============================================================

const PublicLanding: React.FC<{ setMode: (mode: AppMode) => void }> = ({ setMode }) => {
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginSuccess = () => {
    setShowLogin(false);
    setMode(AppMode.AGENCY_DASHBOARD);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://images.unsplash.com/photo-1557683316-973673baf926?w=800&auto=format&fit=crop&q=80";
  };

  const handleWhatsappClick = () => {
      window.open('https://wa.me/5511999999999?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20as%20soluções%20digitais.', '_blank');
  };

  // GRID CENTRALIZADO E MENOR
  const renderPortfolioGrid = (items: any[]) => (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10 w-full max-w-5xl mx-auto">
          {items.map((item, i) => (
              <div 
                key={i} 
                className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden hover:border-indigo-500/50 transition-all hover:-translate-y-2 cursor-pointer shadow-lg group flex flex-col h-full w-full" 
                onClick={() => setMode(item.mode)}
              >
                  <div className="h-32 bg-slate-900 relative overflow-hidden">
                      <img 
                        src={item.img} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                        onError={handleImageError}
                      />
                      <div className={`absolute top-2 left-2 px-2 py-0.5 rounded text-[9px] font-bold uppercase text-white border border-white/10 backdrop-blur-md ${
                          item.badge.includes('Elite') ? 'bg-emerald-600/80' : 
                          item.badge.includes('Alta') ? 'bg-purple-600/80' : 
                          'bg-indigo-600/80'
                      }`}>
                          {item.badge}
                      </div>
                  </div>
                  <div className="p-3 flex flex-col flex-1">
                      <h4 className="font-bold text-white text-sm mb-0.5 text-center">{item.title}</h4>
                      <p className="text-[10px] text-slate-500 mb-3 text-center">{item.subtitle}</p>
                      <button className="mt-auto w-full py-2 rounded-lg bg-slate-900 text-slate-300 text-xs font-bold border border-slate-800 group-hover:bg-slate-800 group-hover:text-white group-hover:border-slate-700 transition-all flex items-center justify-center gap-2">
                          <Eye size={12} /> Ver Demo
                      </button>
                  </div>
              </div>
          ))}
      </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden w-full max-w-[100vw]">
      {showLogin && <LoginModal onSuccess={handleLoginSuccess} onClose={() => setShowLogin(false)} />}

      {/* NAVBAR */}
      <nav className="fixed w-full z-50 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800 py-3 shadow-lg top-0 left-0">
        <div className="w-full max-w-5xl mx-auto px-6 flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20 text-sm">
                    A
                </div>
                <span className="font-display font-bold text-base tracking-tight text-white hidden sm:block">
                    Avance Agency
                </span>
            </div>
            <div className="flex items-center gap-4">
                <div className="hidden md:flex gap-6">
                    <button onClick={() => scrollToSection('saas-section')} className="text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors">Sistemas</button>
                    <button onClick={() => scrollToSection('landing-section')} className="text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors">Sites</button>
                    <button onClick={() => scrollToSection('demos-section')} className="text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors">Portfólio</button>
                </div>
                <button onClick={() => setShowLogin(true)} className="flex items-center gap-2 px-4 py-1.5 bg-white/10 hover:bg-white/20 rounded-full text-xs font-bold transition-all border border-white/5 active:scale-95">
                    <LogIn size={12} /> Entrar
                </button>
            </div>
        </div>
      </nav>

      {/* HERO SECTION - TIGHTER */}
      <section className="pt-28 pb-12 px-6 bg-slate-950 relative w-full border-b border-slate-900 flex justify-center overflow-hidden">
         <div className="w-full max-w-5xl mx-auto relative z-10 flex flex-col items-center text-center">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-6 shadow-lg">
                <Star size={10} fill="currentColor" /> Soluções Digitais Premium
            </div>
            
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white tracking-tight leading-tight drop-shadow-2xl max-w-3xl">
                Escale seu Negócio <br/>com Tecnologia.
            </h1>
            
            <p className="text-sm md:text-base text-slate-400 max-w-xl mb-10 leading-relaxed">
                Sistemas de gestão, agendamento online e landing pages de alta conversão. Tudo o que sua empresa precisa para crescer hoje.
            </p>
            
            {/* BUTTONS REORDERED */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
                <button onClick={() => scrollToSection('saas-section')} className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-sm transition-all border border-slate-700 w-full sm:w-auto justify-center">
                    Ver Sistemas
                </button>
                <button onClick={() => scrollToSection('landing-section')} className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-sm transition-all border border-slate-700 w-full sm:w-auto justify-center">
                    Ver Landing Pages
                </button>
                <button 
                    onClick={handleWhatsappClick}
                    className="px-6 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-green-900/20 flex items-center justify-center gap-2 w-full sm:w-auto hover:-translate-y-1"
                >
                    <MessageCircle size={16} /> Falar no WhatsApp
                </button>
            </div>
         </div>
      </section>

      {/* MARQUEE */}
      <div className="w-full bg-slate-950 border-b border-slate-900 py-3 overflow-hidden relative">
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none"></div>
            
            <div className="flex animate-marquee whitespace-nowrap gap-12 items-center w-full">
                {[...Array(10)].map((_, i) => (
                    <React.Fragment key={i}>
                        <div className="flex items-center gap-2 text-slate-500 font-bold uppercase tracking-wider text-[10px] flex-shrink-0"><Rocket size={14} className="text-indigo-500" /> Alta Conversão</div>
                        <div className="flex items-center gap-2 text-slate-500 font-bold uppercase tracking-wider text-[10px] flex-shrink-0"><Zap size={14} className="text-indigo-500" /> SEO Otimizado</div>
                        <div className="flex items-center gap-2 text-slate-500 font-bold uppercase tracking-wider text-[10px] flex-shrink-0"><Star size={14} className="text-indigo-500" /> Design Premium</div>
                        <div className="flex items-center gap-2 text-slate-500 font-bold uppercase tracking-wider text-[10px] flex-shrink-0"><ShieldCheck size={14} className="text-indigo-500" /> Suporte 24/7</div>
                    </React.Fragment>
                ))}
            </div>
      </div>

      {/* ===================================================================================== */}
      {/* SESSÃO 1: SISTEMAS SAAS */}
      {/* ===================================================================================== */}
      
      <section id="saas-section" className="py-12 px-6 bg-slate-900 border-y border-slate-800 w-full flex justify-center">
          <div className="w-full max-w-5xl mx-auto">
              
              <div className="text-center mb-10">
                  <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-3 text-emerald-500 mx-auto">
                      <Smartphone size={20} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">Sistemas de Gestão (SaaS)</h2>
                  <p className="text-slate-400 max-w-xl text-sm mx-auto">Soluções completas para agendamento e controle financeiro.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 w-full">
                  {/* SOLO */}
                  <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 hover:border-slate-700 transition-colors flex flex-col items-start text-left group hover:-translate-y-1 duration-300 w-full">
                      <h3 className="text-lg font-bold text-white mb-1">SaaS Solo</h3>
                      <div className="text-3xl font-display font-bold text-white mb-3 tracking-tight">39,90</div>
                      <p className="text-slate-500 text-xs mb-1">/mês</p>
                      <p className="text-slate-400 text-xs mb-4">Ideal para profissionais autônomos.</p>
                      <BenefitsList items={saasSoloBenefits} />
                      <button 
                        onClick={() => setMode(AppMode.DEMO_SOLO_NAILS)}
                        className="w-full py-3 mt-auto bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition-colors text-sm flex items-center justify-center gap-2"
                      >
                          <Eye size={16}/> Ver Demonstração
                      </button>
                  </div>

                  {/* ELITE */}
                  <div className="bg-gradient-to-b from-slate-900 to-slate-950 p-6 rounded-3xl border border-emerald-500/30 flex flex-col items-start text-left relative shadow-2xl group hover:-translate-y-1 duration-300 w-full">
                      <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[9px] px-3 py-1 font-bold rounded-bl-xl uppercase">Recomendado</div>
                      <h3 className="text-lg font-bold text-white mb-1">SaaS Elite</h3>
                      <div className="text-3xl font-display font-bold text-emerald-400 mb-3 tracking-tight">79,90</div>
                      <p className="text-slate-500 text-xs mb-1">/mês</p>
                      <p className="text-slate-400 text-xs mb-4">Para estabelecimentos com equipe.</p>
                      <BenefitsList items={saasPremiumBenefits} />
                      <button 
                        onClick={() => setMode(AppMode.DEMO_ELITE_BARBER)}
                        className="w-full py-3 mt-auto bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-500 transition-colors shadow-lg text-sm flex items-center justify-center gap-2"
                      >
                          <Eye size={16}/> Ver Demonstração
                      </button>
                  </div>
              </div>

              {/* INSTALLATION FEE DETAILS */}
              <div className="max-w-2xl mx-auto w-full">
                  <div className="bg-slate-950 border border-slate-800 border-dashed rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-slate-600 transition-colors">
                     <div className="flex items-center gap-3">
                         <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center text-slate-400 shrink-0 border border-slate-800">
                             <Hammer size={14} />
                         </div>
                         <div>
                             <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-0.5">Taxa de Instalação (Setup)</p>
                             <p className="text-lg font-bold text-white">R$ 197,00 <span className="text-[10px] text-slate-500 font-normal">único</span></p>
                         </div>
                     </div>
                     
                     <div className="flex-1 w-full md:w-auto bg-slate-900/50 p-3 rounded-lg border border-slate-800/50">
                         <p className="text-[10px] text-slate-500 font-bold uppercase mb-2">Incluso no Setup:</p>
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[10px] text-slate-400">
                             <span className="flex items-center gap-1.5"><Check size={10} className="text-emerald-500"/> Configuração Domínio</span>
                             <span className="flex items-center gap-1.5"><Check size={10} className="text-emerald-500"/> Cadastro Cardápio</span>
                             <span className="flex items-center gap-1.5"><Check size={10} className="text-emerald-500"/> Cores/Logo</span>
                             <span className="flex items-center gap-1.5"><Check size={10} className="text-emerald-500"/> IA Chatbot</span>
                         </div>
                     </div>
                 </div>
              </div>

          </div>
      </section>

      {/* ===================================================================================== */}
      {/* SESSÃO 2: LANDING PAGES */}
      {/* ===================================================================================== */}

      <section id="landing-section" className="py-12 px-6 bg-slate-950 w-full flex justify-center">
          <div className="w-full max-w-5xl mx-auto">
              
              <div className="text-center mb-10">
                  <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center mb-3 text-purple-500 mx-auto">
                      <LayoutTemplate size={20} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">Landing Pages Profissionais</h2>
                  <p className="text-slate-400 max-w-xl text-sm mx-auto">Sites de alta conversão sem mensalidade.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 w-full">
                  {/* PREMIUM */}
                  <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 hover:border-slate-600 transition-colors flex flex-col items-start text-left group hover:-translate-y-1 duration-300 w-full">
                      <h3 className="text-lg font-bold text-white mb-1">LP Premium</h3>
                      <div className="text-3xl font-display font-bold text-white mb-3 tracking-tight">397</div>
                      <p className="text-slate-500 text-xs mb-4">Pagamento Único</p>
                      <BenefitsList items={lpPremiumBenefits} />
                      <button 
                        onClick={() => setMode(AppMode.DEMO_LP_DENTIST)}
                        className="w-full py-3 mt-auto bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition-colors text-sm flex items-center justify-center gap-2"
                      >
                          <Eye size={16}/> Ver Exemplo
                      </button>
                  </div>

                  {/* HIGH CONVERSION */}
                  <div className="bg-gradient-to-r from-slate-900 to-purple-900/20 p-6 rounded-3xl border border-purple-500/30 flex flex-col items-start text-left relative shadow-2xl group hover:-translate-y-1 duration-300 w-full">
                      <div className="absolute top-0 right-0 bg-purple-600 text-white text-[9px] px-3 py-1 font-bold rounded-bl-xl uppercase">Máxima Performance</div>
                      <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">Alta Conversão <Star size={12} fill="currentColor" className="text-purple-400"/></h3>
                      <div className="text-3xl font-display font-bold text-purple-400 mb-3 tracking-tight">697</div>
                      <p className="text-slate-500 text-xs mb-4">Pagamento Único</p>
                      <BenefitsList items={lpAltaConversaoBenefits} />
                      <button 
                        onClick={() => setMode(AppMode.DEMO_LP_PLASTIC)}
                        className="w-full py-3 mt-auto bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-500 transition-colors shadow-lg text-sm flex items-center justify-center gap-2"
                      >
                          <Eye size={16}/> Ver Exemplo
                      </button>
                  </div>
              </div>
          </div>
      </section>

      {/* ===================================================================================== */}
      {/* SESSÃO 3: PORTFÓLIO COMPLETO */}
      {/* ===================================================================================== */}

      <section id="demos-section" className="py-12 px-6 bg-slate-900 w-full border-t border-slate-800 flex justify-center">
          <div className="w-full max-w-5xl mx-auto">
              <div className="text-center mb-10">
                  <h2 className="text-2xl font-bold text-white mb-2">Portfólio de Demonstração</h2>
                  <p className="text-slate-400 text-sm">Veja nossos sistemas e landing pages em ação.</p>
              </div>

              {/* GRUPO A: SAAS */}
              <div className="mb-12">
                  <h3 className="text-lg font-semibold text-white mb-4 text-center lg:text-left">Sistemas & Apps</h3>
                  {renderPortfolioGrid(portfolioData.saas)}
              </div>

              {/* GRUPO B: LANDING PAGES COMBINED */}
              <div className="mb-4">
                  <h3 className="text-lg font-semibold text-white mb-4 text-center lg:text-left">Landing Pages Profissionais</h3>
                  {renderPortfolioGrid([...portfolioData.lpPremium, ...portfolioData.lpHigh])}
              </div>

          </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-900 bg-slate-950 text-center relative z-10 w-full flex justify-center">
          <div className="w-full max-w-5xl mx-auto px-6 flex flex-col items-center">
             <p className="text-slate-500 text-xs mb-4">© {new Date().getFullYear()} Avance Agency. Todos os direitos reservados.</p>
             <button onClick={() => setShowLogin(true)} className="text-[10px] font-bold text-slate-600 hover:text-white transition-colors flex items-center gap-2 border border-slate-800 px-3 py-1.5 rounded-full hover:bg-slate-900">
                 <Lock size={10} /> Acesso Admin
             </button>
          </div>
      </footer>
    </div>
  );
};

export default PublicLanding;
