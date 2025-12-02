import React, { useState } from 'react';
import { generateSaaSPage } from '../../services/geminiService';
import Editor from './Editor';
import { Loader2, Monitor, Rocket, ArrowLeft } from 'lucide-react';
import { AppMode } from '../../types';

interface SaaSBuilderProps {
  setMode: (mode: AppMode) => void;
}

const SaaSBuilder: React.FC<SaaSBuilderProps> = ({ setMode }) => {
  const [step, setStep] = useState<'niche' | 'generating' | 'editor'>('niche');
  const [niche, setNiche] = useState('');
  const [generatedHtml, setGeneratedHtml] = useState('');

  const handleStart = async () => {
    if (!niche) return;
    setStep('generating');
    
    // For SaaS, we skip detailed briefing in this v1 to keep it fast, 
    // assuming standard SaaS sections (Hero, Features, Pricing)
    const html = await generateSaaSPage(niche, { 
      businessType: 'SaaS / ASS', 
      primaryGoal: 'Subscription / Demo Booking' 
    });
    
    setGeneratedHtml(html);
    setStep('editor');
  };

  if (step === 'generating') {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-slate-950">
        <div className="relative">
            <div className="absolute inset-0 bg-emerald-500 blur-xl opacity-20 animate-pulse rounded-full"></div>
            <Loader2 className="w-12 h-12 text-emerald-500 animate-spin relative z-10" />
        </div>
        <h2 className="mt-8 text-2xl font-bold text-white">Arquitetando SaaS...</h2>
        <p className="text-slate-400 mt-2">Bento grids, Glassmorphism e Tabelas de Preço.</p>
      </div>
    );
  }

  if (step === 'editor') {
    return <Editor initialHtml={generatedHtml} onExit={() => setMode(AppMode.HUB)} />;
  }

  return (
    <div className="h-full bg-slate-950 flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center">
        <button 
            onClick={() => setMode(AppMode.HUB)}
            className="mb-8 flex items-center text-slate-500 hover:text-white transition-colors mx-auto text-sm"
        >
            <ArrowLeft size={16} className="mr-1" /> Voltar ao Hub
        </button>

        <div className="w-20 h-20 bg-gradient-to-tr from-emerald-500 to-teal-600 rounded-3xl mx-auto flex items-center justify-center mb-8 shadow-2xl shadow-emerald-500/20 ring-1 ring-white/10">
            <Monitor className="text-white w-10 h-10" />
        </div>
        
        <h1 className="text-4xl font-display font-bold text-white mb-4">Novo SaaS (ASS)</h1>
        <p className="text-slate-400 text-lg mb-10">Qual o foco do software?</p>
        
        <div className="bg-slate-900/50 p-2 rounded-2xl border border-slate-800 shadow-xl flex items-center gap-2">
            <input 
              type="text" 
              className="flex-1 px-6 py-4 bg-transparent text-white placeholder:text-slate-600 text-lg outline-none"
              placeholder="Ex: Gestão de Barbearia, CRM Imobiliário..."
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleStart()}
            />
            <button 
              onClick={handleStart}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-xl font-bold transition-colors flex items-center gap-2"
            >
              <Rocket size={20} />
              Criar
            </button>
        </div>
      </div>
    </div>
  );
};

export default SaaSBuilder;