
import React, { useState, useEffect } from 'react';
import { PlanType, LandingStyle, AppMode } from '../../types';
import { generateLandingPage } from '../../services/geminiService';
import Editor from './Editor';
import { Loader2, Sparkles, ArrowLeft, DollarSign, CheckCircle, Zap, Star, Cpu, Layers, PenTool, Image as ImageIcon } from 'lucide-react';

interface BuilderModeProps {
  setMode: (mode: AppMode) => void;
}

// Helper icon component for visual consistency in loader
const SearchIcon = ({size}: {size: number}) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);

const BuilderMode: React.FC<BuilderModeProps> = ({ setMode }) => {
  const [step, setStep] = useState<'niche' | 'simulator' | 'generating' | 'editor'>('niche');
  const [niche, setNiche] = useState('');
  const [plan, setPlan] = useState<PlanType>('professional');
  const [style, setStyle] = useState<LandingStyle>('clean');
  const [generatedHtml, setGeneratedHtml] = useState('');
  
  // Loading State Animation
  const [loadingStep, setLoadingStep] = useState(0);
  const loadingMessages = [
      { text: 'Analisando Mercado e Concorrência...', icon: SearchIcon },
      { text: 'Escrevendo Copywriting Persuasiva...', icon: PenTool },
      { text: 'Desenhando Interface Premium (UX/UI)...', icon: Layers },
      { text: 'Selecionando Imagens de Alta Resolução...', icon: ImageIcon }, 
      { text: 'Otimizando para Conversão e Mobile...', icon: Zap },
      { text: 'Finalizando Detalhes...', icon: CheckCircle }
  ];

  useEffect(() => {
    const savedPlan = localStorage.getItem('selectedPlan') as PlanType;
    if (savedPlan) {
        setPlan(savedPlan);
        localStorage.removeItem('selectedPlan');
    }
  }, []);

  // Cycle through loading messages
  useEffect(() => {
      if (step === 'generating') {
          const interval = setInterval(() => {
              setLoadingStep(prev => (prev < loadingMessages.length - 1 ? prev + 1 : prev));
          }, 2000); // Slightly faster steps
          return () => clearInterval(interval);
      }
  }, [step]);

  const handleNicheSubmit = () => {
    if (niche) setStep('simulator');
  };

  const handleGenerate = async () => {
    setStep('generating');
    setLoadingStep(0);
    
    try {
        const html = await generateLandingPage(niche, plan, style);
        setGeneratedHtml(html);
        // Small delay to show the "Finalizing" step
        setTimeout(() => {
            setStep('editor');
        }, 1000);
    } catch (error) {
        console.error("Erro fatal na geração:", error);
        alert("Houve um erro ao conectar com a IA. Tente novamente.");
        setStep('simulator');
    }
  };

  if (step === 'generating') {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-950 relative overflow-hidden px-6">
        {/* Ambient Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse-slow pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col items-center w-full max-w-md">
            {/* Loader visual - Moved down for breathing room */}
            <div className="relative mb-16 mt-10">
                <div className="w-32 h-32 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <Cpu className="text-indigo-400 animate-pulse" size={40} />
                </div>
            </div>

            <h2 className="text-4xl font-display font-bold text-white mb-3 text-center">IA Construindo...</h2>
            <p className="text-slate-400 mb-12 text-sm uppercase tracking-widest font-bold text-center">
                Plano {plan === 'high_conversion' ? 'Premium' : 'Standard'} • {niche}
            </p>

            <div className="space-y-6 w-full">
                {loadingMessages.map((msg, index) => (
                    <div 
                        key={index} 
                        className={`flex items-center gap-4 transition-all duration-500 ${
                            index === loadingStep 
                                ? 'opacity-100 scale-105 translate-x-2' 
                                : index < loadingStep 
                                    ? 'opacity-40 grayscale' 
                                    : 'opacity-10 blur-sm translate-y-2'
                        }`}
                    >
                        <div className={`p-3 rounded-full shadow-lg flex items-center justify-center shrink-0 ${index <= loadingStep ? 'bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/50' : 'bg-slate-800 text-slate-600'}`}>
                            {index < loadingStep ? <CheckCircle size={18} /> : <msg.icon size={18} />}
                        </div>
                        <span className={`text-base font-medium ${index === loadingStep ? 'text-white' : 'text-slate-500'}`}>
                            {msg.text}
                        </span>
                    </div>
                ))}
            </div>
        </div>
      </div>
    );
  }

  if (step === 'editor') {
    return <Editor initialHtml={generatedHtml} onExit={() => setMode(AppMode.HUB)} />;
  }

  return (
    <div className="h-full bg-slate-950 flex flex-col items-center justify-center p-6 min-h-screen relative">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-indigo-900/10 rounded-full blur-[150px]"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[150px]"></div>
      </div>

      {step === 'niche' && (
        <div className="max-w-xl w-full text-center animate-fade-in relative z-10">
             <button 
                onClick={() => setMode(AppMode.HUB)}
                className="mb-12 inline-flex items-center px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600 transition-all text-xs font-bold uppercase tracking-widest"
            >
                <ArrowLeft size={14} className="mr-2" /> Voltar ao Hub
            </button>

            <div className="w-24 h-24 bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-[2rem] mx-auto flex items-center justify-center mb-8 shadow-2xl shadow-indigo-500/30 ring-1 ring-white/10">
                <Sparkles className="text-white w-12 h-12" />
            </div>
            
            <h1 className="text-5xl font-display font-bold text-white mb-4 tracking-tight">Novo Projeto</h1>
            <p className="text-slate-400 text-lg mb-10 font-light">Para qual nicho vamos criar hoje?</p>
            
            <div className="bg-slate-900/80 backdrop-blur-xl p-2 rounded-2xl border border-slate-700/50 shadow-2xl flex items-center gap-2 group focus-within:border-indigo-500/50 focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all">
              <input 
                type="text" 
                className="flex-1 px-6 py-4 bg-transparent text-white placeholder:text-slate-600 text-lg outline-none font-medium"
                placeholder="Ex: Hamburgueria, Barbearia, Advogado..."
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleNicheSubmit()}
                autoFocus
              />
              <button 
                onClick={handleNicheSubmit}
                className="bg-white text-slate-950 hover:bg-slate-200 px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 text-sm md:text-base"
              >
                Avançar
              </button>
            </div>
            
            <div className="mt-10 flex justify-center gap-4 opacity-60 hover:opacity-100 transition-opacity">
                <button onClick={() => setPlan('professional')} className={`px-6 py-2 rounded-full text-xs font-bold border transition-all ${plan === 'professional' ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300' : 'border-slate-800 text-slate-500 hover:border-slate-600'}`}>
                    Plano R$ 397
                </button>
                <button onClick={() => setPlan('high_conversion')} className={`px-6 py-2 rounded-full text-xs font-bold border transition-all ${plan === 'high_conversion' ? 'bg-purple-500/20 border-purple-500 text-purple-300' : 'border-slate-800 text-slate-500 hover:border-slate-600'}`}>
                    Plano R$ 697
                </button>
            </div>
        </div>
      )}

      {step === 'simulator' && (
        <div className="max-w-5xl w-full animate-slide-up relative z-10">
            <div className="flex items-center gap-2 mb-8 cursor-pointer group" onClick={() => setStep('niche')}>
                <div className="p-2 rounded-full bg-slate-900 group-hover:bg-slate-800 transition-colors">
                    <ArrowLeft className="text-slate-500 group-hover:text-white" size={20} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Sales Card Simulator */}
                <div className="md:col-span-7 bg-slate-900/50 backdrop-blur-xl rounded-[2.5rem] p-8 border border-slate-800/60 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                        <DollarSign size={200} className="text-white" />
                    </div>
                    
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 text-slate-300 text-xs font-bold uppercase tracking-wider mb-8 shadow-lg">
                            <Zap size={12} className="text-amber-400" fill="currentColor"/> Simulador de Oferta
                        </div>
                        
                        <h2 className="text-4xl font-display font-bold text-white mb-2">
                            {plan === 'professional' ? 'Landing Page Profissional' : 'Landing Alta Conversão'}
                        </h2>
                        <div className="text-5xl font-bold text-emerald-400 mb-8 tracking-tight">
                            R$ {plan === 'professional' ? '397' : '697'}
                        </div>

                        <div className="space-y-6 mb-10">
                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">O que está incluso</h3>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-4 text-slate-200">
                                    <div className="p-1 rounded-full bg-indigo-500/20 text-indigo-400"><CheckCircle size={16} /></div>
                                    Design Premium & Textos Persuasivos (IA)
                                </li>
                                <li className="flex items-center gap-4 text-slate-200">
                                    <div className="p-1 rounded-full bg-indigo-500/20 text-indigo-400"><CheckCircle size={16} /></div>
                                    Otimizado para Celular (Mobile First)
                                </li>
                                <li className="flex items-center gap-4 text-slate-200">
                                    <div className="p-1 rounded-full bg-indigo-500/20 text-indigo-400"><CheckCircle size={16} /></div>
                                    Botão WhatsApp Flutuante
                                </li>
                                {plan === 'high_conversion' && (
                                    <>
                                        <li className="flex items-center gap-4 text-purple-200 font-medium">
                                            <div className="p-1 rounded-full bg-purple-500/20 text-purple-400"><Star size={16} /></div>
                                            Estrutura de Autoridade & Prova Social
                                        </li>
                                        <li className="flex items-center gap-4 text-purple-200 font-medium">
                                            <div className="p-1 rounded-full bg-purple-500/20 text-purple-400"><Star size={16} /></div>
                                            Google Maps & SEO Local
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>

                        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50">
                            <h3 className="text-xs font-bold text-slate-500 uppercase mb-2">Pitch de Vendas</h3>
                            <p className="text-slate-300 italic text-sm leading-relaxed">
                                "{plan === 'professional' 
                                    ? 'A solução ideal para você se posicionar profissionalmente na internet sem gastar rios de dinheiro. Rápido, bonito e funcional.' 
                                    : 'Para quem joga sério. Uma página construída psicologicamente para transformar visitantes em clientes pagantes. Autoridade instantânea.'}"
                            </p>
                        </div>
                    </div>
                </div>

                {/* Generator Settings */}
                <div className="md:col-span-5 flex flex-col justify-center space-y-8">
                    <div>
                        <h3 className="text-white font-bold mb-6 text-xl">Estilo Visual</h3>
                        <div className="grid grid-cols-1 gap-4">
                            {[
                                { id: 'clean', label: 'Clean / Moderno', desc: 'Branco, espaçado, minimalista.', icon: CheckCircle },
                                { id: 'dark', label: 'Dark / Premium', desc: 'Fundo escuro, luxuoso, neon.', icon: Star },
                                { id: 'commercial', label: 'Varejo / Impacto', desc: 'Cores fortes, botões grandes.', icon: Zap },
                            ].map((s) => (
                                <button 
                                    key={s.id}
                                    onClick={() => setStyle(s.id as LandingStyle)}
                                    className={`p-5 rounded-2xl border text-left flex items-center gap-4 transition-all duration-300 group ${
                                        style === s.id 
                                        ? 'bg-indigo-600 border-indigo-500 shadow-xl shadow-indigo-900/20 translate-x-2' 
                                        : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-600 hover:bg-slate-800'
                                    }`}
                                >
                                    <div className={`p-3 rounded-xl ${style === s.id ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-500 group-hover:text-white'}`}>
                                        <s.icon size={20} />
                                    </div>
                                    <div>
                                        <p className={`font-bold text-lg ${style === s.id ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>{s.label}</p>
                                        <p className={`text-xs ${style === s.id ? 'text-indigo-200' : 'text-slate-500'}`}>{s.desc}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="pt-4">
                        <button 
                            onClick={handleGenerate}
                            className="w-full py-5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white rounded-2xl font-bold text-xl shadow-xl shadow-emerald-900/20 transition-all hover:scale-[1.02] hover:shadow-2xl flex items-center justify-center gap-3"
                        >
                            <Cpu size={24} /> Gerar Site Agora
                        </button>
                        <p className="text-center text-xs text-slate-500 mt-4">
                            IA Powered by Gemini 2.5 • Gera código HTML/Tailwind real
                        </p>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default BuilderMode;
