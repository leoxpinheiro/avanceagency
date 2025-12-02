import React, { useState, useRef, useEffect } from 'react';
import { Smartphone, Monitor, Download, Wand2, RefreshCw, Eye, Image as ImageIcon, LogOut } from 'lucide-react';
import { auditSiteContent } from '../../services/geminiService';
import { AuditScore } from '../../types';
import ImageStudio from './ImageStudio';

interface EditorProps {
  initialHtml: string;
  onExit?: () => void;
}

const Editor: React.FC<EditorProps> = ({ initialHtml, onExit }) => {
  const [html, setHtml] = useState(initialHtml);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [is3D, setIs3D] = useState(false);
  const [activeTab, setActiveTab] = useState<'audit' | 'images'>('audit');
  const [audit, setAudit] = useState<AuditScore | null>(null);
  
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Magic Motion: Inject minimal CSS animation
  const applyMagicMotion = () => {
    const styleTag = `
      <style>
        .animate-fade-in { animation: fadeIn 0.8s ease-out forwards; opacity: 0; }
        .animate-slide-up { animation: slideUp 0.8s ease-out forwards; opacity: 0; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        
        /* Apply to common elements */
        h1, h2 { animation: slideUp 0.8s ease-out 0.2s forwards; opacity: 0; }
        p { animation: fadeIn 1s ease-out 0.4s forwards; opacity: 0; }
        img { transition: transform 0.5s ease; }
        img:hover { transform: scale(1.02); }
        button { transition: all 0.2s; }
        button:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
      </style>
    `;
    
    if (!html.includes('@keyframes fadeIn')) {
        setHtml(html.replace('</head>', `${styleTag}</head>`));
    }
  };

  const runAudit = async () => {
    const result = await auditSiteContent(html);
    setAudit(result);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([html], {type: 'text/html'});
    element.href = URL.createObjectURL(file);
    element.download = "avance_landing_page.html";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="flex h-full overflow-hidden bg-slate-950">
      {/* Left Toolbar */}
      <div className="w-16 bg-slate-900 border-r border-slate-800 flex flex-col items-center py-6 gap-6 z-10">
        {onExit && (
            <button 
                onClick={onExit}
                className="p-3 rounded-xl text-slate-500 hover:text-white hover:bg-slate-800 transition-all mb-4"
                title="Sair / Voltar"
            >
                <LogOut size={20} />
            </button>
        )}

        <button 
          onClick={() => setViewMode('desktop')}
          className={`p-3 rounded-xl transition-all ${viewMode === 'desktop' ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-500 hover:text-white'}`}
          title="Vista Desktop"
        >
          <Monitor size={20} />
        </button>
        <button 
          onClick={() => setViewMode('mobile')}
          className={`p-3 rounded-xl transition-all ${viewMode === 'mobile' ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-500 hover:text-white'}`}
          title="Vista Mobile"
        >
          <Smartphone size={20} />
        </button>
        <div className="w-8 h-px bg-slate-800"></div>
        <button 
          onClick={() => setIs3D(!is3D)}
          className={`p-3 rounded-xl transition-all ${is3D ? 'bg-purple-500/20 text-purple-400' : 'text-slate-500 hover:text-white'}`}
          title="Modo Apresentação (3D)"
        >
          <Eye size={20} />
        </button>
        <button 
          onClick={applyMagicMotion}
          className="p-3 rounded-xl text-slate-500 hover:text-amber-400 hover:bg-amber-500/10 transition-all"
          title="Magic Motion"
        >
          <Wand2 size={20} />
        </button>
        <div className="flex-1"></div>
        <button 
          onClick={handleDownload}
          className="p-3 rounded-xl text-slate-500 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all"
          title="Exportar HTML"
        >
          <Download size={20} />
        </button>
      </div>

      {/* Center Canvas */}
      <div className="flex-1 bg-slate-950 flex items-center justify-center p-8 overflow-hidden relative perspective-container">
        {/* Ambient Glow */}
        <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-[120px]"></div>
        </div>

        <div 
            className={`transition-all duration-700 ease-in-out shadow-2xl bg-white relative z-10
              ${viewMode === 'mobile' ? 'w-[375px] h-[812px] rounded-[3rem] border-8 border-slate-800' : 'w-full h-full rounded-xl border border-slate-800'}
              ${is3D ? 'transform perspective-1000 rotate-y-12 scale-90' : ''}
            `}
            style={{ transformStyle: 'preserve-3d' }}
        >
            <iframe 
                ref={iframeRef}
                title="Preview"
                srcDoc={html}
                className={`w-full h-full bg-white ${viewMode === 'mobile' ? 'rounded-[2.5rem]' : 'rounded-lg'}`}
                sandbox="allow-scripts allow-same-origin"
            />
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-80 bg-slate-900 border-l border-slate-800 flex flex-col">
        <div className="flex border-b border-slate-800">
            <button 
                className={`flex-1 py-4 text-sm font-bold ${activeTab === 'audit' ? 'text-white border-b-2 border-indigo-500 bg-slate-800/50' : 'text-slate-500 hover:text-slate-300'}`}
                onClick={() => setActiveTab('audit')}
            >
                Auditoria
            </button>
            <button 
                className={`flex-1 py-4 text-sm font-bold ${activeTab === 'images' ? 'text-white border-b-2 border-indigo-500 bg-slate-800/50' : 'text-slate-500 hover:text-slate-300'}`}
                onClick={() => setActiveTab('images')}
            >
                Estúdio
            </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'audit' && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h3 className="font-bold text-white">Pontuação</h3>
                        <button onClick={runAudit} className="text-indigo-400 hover:bg-slate-800 p-2 rounded-lg transition-colors"><RefreshCw size={16}/></button>
                    </div>
                    
                    {!audit ? (
                         <div className="text-center py-10 text-slate-500 bg-slate-950/50 rounded-xl border border-slate-800 border-dashed">
                             <p className="mb-4">Analise SEO e UX</p>
                             <button onClick={runAudit} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-500 font-medium">Executar Scan</button>
                         </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-3 gap-2">
                                <ScoreCard label="SEO" score={audit.seo} />
                                <ScoreCard label="UX" score={audit.ux} />
                                <ScoreCard label="Copy" score={audit.copy} />
                            </div>
                            <div className="space-y-3 mt-4">
                                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Recomendações</h4>
                                {audit.details.map((detail, i) => (
                                    <div key={i} className="flex gap-2 text-sm text-slate-400 items-start bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                                        <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 flex-shrink-0"></div>
                                        {detail}
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            )}

            {activeTab === 'images' && (
                <ImageStudio />
            )}
        </div>
      </div>
    </div>
  );
};

const ScoreCard = ({ label, score }: { label: string, score: number }) => {
    let color = 'text-red-400';
    let borderColor = 'border-red-500/20';
    if(score > 70) { color = 'text-yellow-400'; borderColor = 'border-yellow-500/20'; }
    if(score > 90) { color = 'text-emerald-400'; borderColor = 'border-emerald-500/20'; }

    return (
        <div className={`bg-slate-950/50 border ${borderColor} rounded-xl p-3 text-center`}>
            <div className={`text-xl font-bold ${color}`}>{score}</div>
            <div className="text-xs text-slate-500 font-bold mt-1">{label}</div>
        </div>
    );
};

export default Editor;