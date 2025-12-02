
import React, { useState } from 'react';
import { Mic2, Send, Lightbulb, MessageSquare, Instagram, FileText } from 'lucide-react';
import { generateSalesContent } from '../../services/geminiService';

const SalesAssistant: React.FC = () => {
  const [niche, setNiche] = useState('');
  const [activeTab, setActiveTab] = useState<'objection' | 'copy' | 'proposal' | 'script'>('objection');
  const [result, setResult] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!niche.trim()) return;
    setIsGenerating(true);
    setResult('');
    const content = await generateSalesContent(activeTab, niche);
    setResult(content);
    setIsGenerating(false);
  };

  return (
    <div className="h-full flex flex-col lg:flex-row bg-slate-950 overflow-hidden">
      {/* Input Section */}
      <div className="w-full lg:w-1/3 bg-slate-900 border-r border-slate-800 flex flex-col p-8 z-10 shadow-2xl">
        <div className="mb-8">
            <div className="w-14 h-14 bg-pink-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-pink-500/30 mb-6">
                <Mic2 size={28} />
            </div>
            <h2 className="text-2xl font-bold text-white leading-tight">Mentor Comercial</h2>
            <p className="text-slate-400 mt-2">
                IA Estratégica para fechar mais vendas.
            </p>
        </div>

        <div className="flex-1 flex flex-col justify-start gap-6">
            <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">Contexto / Nicho / Objeção</label>
                <textarea
                    className="w-full p-4 bg-slate-950 border border-slate-800 rounded-2xl focus:ring-2 focus:ring-pink-500 outline-none text-white transition-all font-medium text-sm placeholder:text-slate-600 resize-none h-32"
                    placeholder={activeTab === 'objection' ? 'Ex: O cliente disse "Vou pensar e te aviso"...' : 'Ex: Advogado Criminalista...'}
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-2 gap-2">
                <button onClick={() => setActiveTab('objection')} className={`p-3 rounded-xl text-sm font-bold border ${activeTab === 'objection' ? 'bg-pink-500/20 border-pink-500 text-pink-300' : 'border-slate-800 text-slate-500'}`}>
                    Quebrar Objeção
                </button>
                <button onClick={() => setActiveTab('copy')} className={`p-3 rounded-xl text-sm font-bold border ${activeTab === 'copy' ? 'bg-pink-500/20 border-pink-500 text-pink-300' : 'border-slate-800 text-slate-500'}`}>
                    Post Instagram
                </button>
                <button onClick={() => setActiveTab('proposal')} className={`p-3 rounded-xl text-sm font-bold border ${activeTab === 'proposal' ? 'bg-pink-500/20 border-pink-500 text-pink-300' : 'border-slate-800 text-slate-500'}`}>
                    Proposta Formal
                </button>
                <button onClick={() => setActiveTab('script')} className={`p-3 rounded-xl text-sm font-bold border ${activeTab === 'script' ? 'bg-pink-500/20 border-pink-500 text-pink-300' : 'border-slate-800 text-slate-500'}`}>
                    Script Abordagem
                </button>
            </div>
            
            <button
                onClick={handleGenerate}
                disabled={isGenerating || !niche}
                className={`w-full py-4 rounded-xl font-bold text-white shadow-lg flex items-center justify-center gap-2 transition-all hover:-translate-y-1 ${
                    isGenerating ? 'bg-slate-700 cursor-not-allowed' : 'bg-pink-600 hover:bg-pink-500 shadow-pink-500/30'
                }`}
            >
                {isGenerating ? 'Pensando...' : (
                    <>
                        Gerar Resposta <Send size={18} />
                    </>
                )}
            </button>
        </div>
      </div>

      {/* Results Section */}
      <div className="flex-1 overflow-y-auto p-6 lg:p-10 bg-slate-950 relative">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

        {!result ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-600 opacity-50">
                <Lightbulb size={64} className="mb-4 text-slate-700" />
                <p className="text-lg font-medium">Aguardando comando...</p>
            </div>
        ) : (
            <div className="max-w-4xl mx-auto space-y-6 animate-fade-in relative z-10">
                <div className="bg-slate-900/50 backdrop-blur p-8 rounded-3xl border border-slate-800">
                    <div className="flex items-center gap-3 mb-6 text-pink-400">
                        {activeTab === 'objection' && <MessageSquare size={24} />}
                        {activeTab === 'copy' && <Instagram size={24} />}
                        {activeTab === 'proposal' && <FileText size={24} />}
                        <h3 className="font-bold text-lg text-white">Estratégia Gerada</h3>
                    </div>
                    <div className="prose prose-invert prose-p:text-slate-300 max-w-none whitespace-pre-line">
                        {result}
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default SalesAssistant;
