
import React from 'react';
import { LayoutDashboard, ArrowRight, Smartphone, Eye, Rocket, Hammer, LayoutTemplate, Mic2, Star, CheckCircle, CreditCard } from 'lucide-react';
import { AppMode } from '../../types';

interface HubProps {
  setMode: (mode: AppMode) => void;
}

const Hub: React.FC<HubProps> = ({ setMode }) => {
  
  // --- DADOS DOS PRODUTOS ---
  
  const saasProducts = [
    {
        id: 'saas-solo-nails',
        title: 'SaaS Solo',
        subtitle: 'Demo: Studio Beleza / Nails',
        price: 'R$ 39,90',
        period: '/mês',
        image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&auto=format&fit=crop&q=80',
        mode: AppMode.DEMO_SOLO_NAILS,
        badge: 'Básico',
        badgeColor: 'bg-blue-600'
    },
    {
        id: 'saas-elite-barber',
        title: 'SaaS Premium',
        subtitle: 'Demo: Barbearia Completa',
        price: 'R$ 79,90',
        period: '/mês',
        image: 'https://images.unsplash.com/photo-1503951914205-9847b3981254?w=800&auto=format&fit=crop&q=80',
        mode: AppMode.DEMO_ELITE_BARBER,
        badge: 'Mais Vendido',
        badgeColor: 'bg-emerald-600'
    },
    {
        id: 'saas-solo-pet',
        title: 'SaaS Solo',
        subtitle: 'Demo: Pet Shop / Vet',
        price: 'R$ 39,90',
        period: '/mês',
        image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800&auto=format&fit=crop&q=80',
        mode: AppMode.DEMO_SOLO_PET,
        badge: 'Básico',
        badgeColor: 'bg-blue-600'
    },
    {
        id: 'saas-elite-clinic',
        title: 'SaaS Premium',
        subtitle: 'Demo: Clínica / Saúde',
        price: 'R$ 79,90',
        period: '/mês',
        image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&auto=format&fit=crop&q=80',
        mode: AppMode.DEMO_ELITE_CLINIC,
        badge: 'Premium',
        badgeColor: 'bg-purple-600'
    }
  ];

  const landingPages = [
    {
        id: 'lp-dentist',
        title: 'Landing Page Premium',
        subtitle: 'Demo: Clínica Odonto',
        price: 'R$ 397',
        image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&auto=format&fit=crop&q=80',
        mode: AppMode.DEMO_LP_DENTIST,
        planType: 'professional',
        buttonText: 'Ver Demo Clínica',
        badge: 'Entrega Rápida',
        badgeColor: 'bg-indigo-500'
    },
    {
        id: 'lp-gym',
        title: 'Landing Page Premium',
        subtitle: 'Demo: Academia',
        price: 'R$ 397',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80',
        mode: AppMode.DEMO_LP_GYM,
        planType: 'professional',
        buttonText: 'Ver Demo Academia',
        badge: 'Entrega Rápida',
        badgeColor: 'bg-indigo-500'
    },
    {
        id: 'lp-aesthetic',
        title: 'Landing Alta Conversão',
        subtitle: 'Demo: Estética',
        price: 'R$ 697',
        image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&auto=format&fit=crop&q=80',
        mode: AppMode.DEMO_LP_AESTHETIC,
        planType: 'high_conversion',
        buttonText: 'Ver Demo Estética',
        badge: 'Top de Linha',
        badgeColor: 'bg-rose-600'
    },
    {
        id: 'lp-plastic',
        title: 'Landing Alta Conversão',
        subtitle: 'Demo: Profissional Saúde',
        price: 'R$ 697',
        image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800&auto=format&fit=crop&q=80',
        mode: AppMode.DEMO_LP_PLASTIC,
        planType: 'high_conversion',
        buttonText: 'Ver Demo Saúde',
        badge: 'Top de Linha',
        badgeColor: 'bg-rose-600'
    }
  ];

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto min-h-screen pb-20">
      {/* Background Ambience */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] bg-emerald-600/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10">
        
        {/* HEADER */}
        <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-4 reveal-on-scroll">
          <div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-2 tracking-tight">
              Avance <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Agency v3</span>
            </h1>
            <p className="text-slate-400 text-lg">Vitrine Oficial de Produtos & Ferramentas.</p>
          </div>
          <div className="flex gap-3">
             <div className="bg-slate-900/50 backdrop-blur px-4 py-2 rounded-lg border border-slate-800 flex items-center gap-2 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-slate-300 text-sm font-medium">Sistema Operacional</span>
             </div>
          </div>
        </div>

        {/* ===================================================================================== */}
        {/* SESSÃO 1: SISTEMAS SAAS */}
        {/* ===================================================================================== */}
        
        <div className="mb-20 reveal-on-scroll">
            
            {/* 1.1 Título da Sessão */}
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-800">
                <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-400">
                    <Smartphone size={28} />
                </div>
                <div>
                    <h2 className="text-3xl font-bold text-white">Sistemas de Gestão (SaaS)</h2>
                    <p className="text-slate-400">Recorrência mensal. Soluções completas de agendamento e gestão.</p>
                </div>
            </div>

            {/* 1.2 Informações de Venda & Instalação (Pricing Banner) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {/* SaaS Solo Info */}
                <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl flex flex-col items-center justify-center text-center hover:border-blue-500/30 transition-colors">
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">Plano Solo</span>
                    <div className="text-3xl font-bold text-white">R$ 39,90<span className="text-sm text-slate-500 font-normal">/mês</span></div>
                    <p className="text-slate-500 text-xs mt-2">Para autônomos e iniciantes.</p>
                </div>
                
                {/* SaaS Premium Info */}
                <div className="bg-slate-900/80 border border-emerald-500/30 p-5 rounded-2xl flex flex-col items-center justify-center text-center relative overflow-hidden hover:border-emerald-500/50 transition-colors">
                    <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[9px] px-2 py-1 rounded-bl-lg font-bold uppercase">Top</div>
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">Plano Premium</span>
                    <div className="text-3xl font-bold text-white">R$ 79,90<span className="text-sm text-slate-500 font-normal">/mês</span></div>
                    <p className="text-slate-500 text-xs mt-2">Para estabelecimentos com equipe.</p>
                </div>

                {/* Installation Fee Info */}
                <div className="bg-slate-900/80 border border-slate-800 border-dashed p-5 rounded-2xl flex flex-col items-center justify-center text-center hover:border-slate-600 transition-colors">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1 justify-center"><Hammer size={12}/> Taxa de Instalação</span>
                    <div className="text-3xl font-bold text-white">R$ 197,00</div>
                    <p className="text-slate-500 text-xs mt-2">Pagamento único na adesão (Setup).</p>
                </div>
            </div>

            {/* 1.3 As 4 Demos SaaS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {saasProducts.map((product) => (
                    <div key={product.id} className="bg-slate-900/40 backdrop-blur rounded-2xl overflow-hidden border border-slate-800 hover:border-emerald-500/50 transition-all hover:-translate-y-1 group flex flex-col h-full shadow-lg">
                        <div className="h-44 overflow-hidden relative bg-slate-950">
                            <img src={product.image} alt={product.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                            <div className={`absolute top-3 left-3 px-2 py-1 rounded text-[10px] font-bold uppercase text-white tracking-wider shadow-md ${product.badgeColor}`}>
                                {product.badge}
                            </div>
                        </div>
                        <div className="p-5 flex flex-col flex-1">
                            <h3 className="text-lg font-bold text-white mb-1">{product.title}</h3>
                            <p className="text-slate-400 text-xs mb-4">{product.subtitle}</p>
                            <div className="mt-auto pt-4 border-t border-slate-800/50">
                                <div className="flex items-baseline gap-1 mb-4">
                                    <span className="text-2xl font-bold text-white">{product.price}</span>
                                    <span className="text-xs text-slate-500 font-normal">{product.period}</span>
                                </div>
                                <div className="grid grid-cols-1 gap-2">
                                    <button 
                                        onClick={() => setMode(product.mode)}
                                        className="w-full py-2.5 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                                    >
                                        <Eye size={14}/> Ver Demo
                                    </button>
                                    <button 
                                        onClick={() => setMode(AppMode.SAAS_BUILDER)}
                                        className="w-full py-2.5 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-900/20"
                                    >
                                        <Rocket size={14}/> Criar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>


        {/* ===================================================================================== */}
        {/* SESSÃO 2: LANDING PAGES */}
        {/* ===================================================================================== */}

        <div className="mb-20 reveal-on-scroll">
            
            {/* 2.1 Título da Sessão */}
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-800">
                <div className="p-3 bg-purple-500/20 rounded-xl text-purple-400">
                    <LayoutTemplate size={28} />
                </div>
                <div>
                    <h2 className="text-3xl font-bold text-white">Landing Pages Profissionais</h2>
                    <p className="text-slate-400">Venda única. Sites de alta conversão sem mensalidade.</p>
                </div>
            </div>

            {/* 2.2 Informações de Venda (Pricing Banner) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {/* LP Premium Info */}
                <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl flex items-center justify-between px-10 hover:border-indigo-500/30 transition-colors">
                    <div>
                        <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block mb-1">LP Premium</span>
                        <div className="text-4xl font-bold text-white">R$ 397</div>
                        <p className="text-slate-500 text-xs mt-1">Pagamento Único</p>
                    </div>
                    <div className="text-right text-slate-400 text-xs max-w-[150px]">
                        Modelo profissional, entrega rápida e design moderno.
                    </div>
                </div>

                {/* LP Alta Conversão Info */}
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 border border-purple-500/30 p-6 rounded-2xl flex items-center justify-between px-10 relative overflow-hidden hover:border-purple-500/50 transition-colors">
                    <div className="absolute -right-6 -top-6 w-20 h-20 bg-purple-500/20 rounded-full blur-xl"></div>
                    <div>
                        <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block mb-1 flex items-center gap-1"><Star size={10} fill="currentColor"/> LP Alta Conversão</span>
                        <div className="text-4xl font-bold text-white">R$ 697</div>
                        <p className="text-slate-500 text-xs mt-1">Pagamento Único</p>
                    </div>
                    <div className="text-right text-slate-400 text-xs max-w-[150px]">
                        Estrutura de persuasão avançada, copywriter e SEO local.
                    </div>
                </div>
            </div>

            {/* 2.3 As 4 Demos Landing Pages */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {landingPages.map((lp) => (
                    <div key={lp.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden group hover:border-purple-500/50 transition-all hover:-translate-y-1 hover:shadow-2xl flex flex-col h-full">
                        <div className="h-44 overflow-hidden relative bg-slate-950">
                            <img src={lp.image} alt={lp.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100" />
                            <div className={`absolute top-3 right-3 px-2 py-1 rounded-lg text-[10px] font-bold text-white shadow-md backdrop-blur-md ${lp.badgeColor}`}>
                                {lp.badge}
                            </div>
                        </div>
                        
                        <div className="p-5 flex-1 flex flex-col">
                            <div className="mb-3">
                                <h3 className="font-bold text-white text-sm truncate mb-1">{lp.title}</h3>
                                <p className="text-slate-400 text-xs line-clamp-1">{lp.subtitle}</p>
                            </div>
                            
                            <div className="mt-auto pt-4 border-t border-slate-800/50">
                                <div className="flex items-baseline gap-1 mb-4">
                                    <span className="text-xl font-bold text-white">{lp.price}</span>
                                    <span className="text-[10px] text-slate-500 font-medium uppercase">/único</span>
                                </div>

                                <div className="grid grid-cols-1 gap-2">
                                    <button 
                                        onClick={() => setMode(lp.mode)}
                                        className="w-full py-2.5 rounded-lg border border-slate-700 text-slate-300 text-xs font-bold hover:bg-slate-800 hover:text-white transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Eye size={14} /> {lp.buttonText}
                                    </button>
                                    <button 
                                        onClick={() => {
                                            localStorage.setItem('selectedPlan', lp.planType);
                                            setMode(AppMode.LANDING_BUILDER);
                                        }}
                                        className={`w-full py-2.5 rounded-lg text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-lg ${lp.title.includes('Alta Conversão') ? 'bg-purple-600 hover:bg-purple-500 shadow-purple-900/20' : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-900/20'}`}
                                    >
                                        <Rocket size={14} /> Criar Projeto
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* --- SECTION 3: FERRAMENTAS ADMIN --- */}
        <div className="reveal-on-scroll pt-10 border-t border-slate-900">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6 px-2">Ferramentas Administrativas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div 
                    onClick={() => setMode(AppMode.AGENCY_PROJECTS)}
                    className="bg-slate-900/40 rounded-2xl p-6 border border-slate-800 flex items-center justify-between hover:border-slate-600 transition-all cursor-pointer group hover:-translate-y-1"
                >
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-white font-bold text-lg">
                            <LayoutDashboard size={20} className="text-slate-400" />
                            Gestão de Projetos
                        </div>
                        <p className="text-slate-500 text-sm">Gerencie clientes, status e entregas.</p>
                    </div>
                    <ArrowRight className="text-slate-600 group-hover:text-white transition-colors" />
                </div>

                <div 
                    onClick={() => setMode(AppMode.SALES_ASSISTANT)}
                    className="bg-slate-900/40 rounded-2xl p-6 border border-slate-800 flex items-center justify-between hover:border-pink-500/50 transition-all cursor-pointer group hover:-translate-y-1"
                >
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-white font-bold text-lg">
                            <Mic2 size={20} className="text-pink-400" />
                            Mentor Comercial IA
                        </div>
                        <p className="text-slate-500 text-sm">Scripts de venda e quebra de objeções.</p>
                    </div>
                    <ArrowRight className="text-slate-600 group-hover:text-pink-400 transition-colors" />
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default Hub;
