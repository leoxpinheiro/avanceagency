
import React, { useState, useEffect } from 'react';
import { getAgencySettings } from '../../services/storageService';
import { AgencySettings, PortfolioItem } from '../../types';
import { Share2, Check, ArrowLeft, Eye, ExternalLink } from 'lucide-react';
import { AppMode } from '../../types';

interface PortfolioPageProps {
    // Optional if we want to pass navigation
}

const PortfolioPage: React.FC = () => {
  const [settings, setSettings] = useState<AgencySettings>(getAgencySettings());
  const [showShareToast, setShowShareToast] = useState(false);

  const handleShare = (productName: string) => {
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 3000);
      // In a real app, copy link to clipboard
  };

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen relative">
       {showShareToast && (
           <div className="fixed top-10 right-10 z-50 bg-emerald-500 text-white px-6 py-3 rounded-xl shadow-2xl animate-fade-in flex items-center gap-2 font-bold border border-emerald-400/50">
               <Check size={20} /> Link copiado!
           </div>
       )}

       <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4 reveal-on-scroll">
          <div>
             <h1 className="text-3xl font-display font-bold text-white mb-2">Catálogo & Preços</h1>
             <p className="text-slate-400">Produtos ativos para venda.</p>
          </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {settings.plans.map((plan, index) => (
             <div 
                key={plan.id} 
                className="reveal-on-scroll bg-slate-900/50 backdrop-blur rounded-3xl overflow-hidden border border-slate-800 flex flex-col group hover:border-indigo-500/50 transition-all duration-300 hover:shadow-2xl shadow-black relative hover:-translate-y-2"
                style={{ transitionDelay: `${index * 100}ms` }}
             >
                {plan.isPopular && (
                    <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] px-3 py-1 font-bold rounded-bl-xl uppercase transform group-hover:scale-110 transition-transform origin-top-right">
                        Top
                    </div>
                )}
                
                <div className="p-8 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                        <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${plan.type === 'landing' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                            {plan.type === 'landing' ? 'Landing Page' : 'SaaS / App'}
                        </div>
                        <div className="text-right">
                            <span className="block text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-colors">
                                R$ {plan.price}
                                <span className="text-xs text-slate-500 font-medium ml-1">
                                    {plan.type === 'saas' ? '/mês' : ''}
                                </span>
                            </span>
                        </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-slate-400 text-sm mb-6 flex-1 leading-relaxed">
                        {plan.description}
                    </p>

                    <div className="space-y-3 mb-8 border-t border-slate-800 pt-4">
                        {plan.features.map((feat, i) => (
                            <div key={i} className="flex items-center gap-3 text-slate-300 text-sm group-hover:text-white transition-colors">
                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0 group-hover:scale-125 transition-transform"></div>
                                {feat}
                            </div>
                        ))}
                    </div>

                    <button 
                        onClick={() => handleShare(plan.name)}
                        className="w-full py-3 bg-white hover:bg-slate-200 text-slate-900 rounded-xl font-bold transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg"
                    >
                        <Share2 size={18} /> Compartilhar Link
                    </button>
                </div>
             </div>
          ))}
       </div>
    </div>
  );
};

export default PortfolioPage;
