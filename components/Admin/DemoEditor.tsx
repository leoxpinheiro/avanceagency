

import React, { useState } from 'react';
import { getAgencySettings, saveAgencySettings } from '../../services/storageService';
import { AgencySettings, DemoContent, DemoSection } from '../../types';
import { suggestDemoImprovements } from '../../services/geminiService';
import { Save, Palette, Layout, Type, Sparkles, Plus, Eye, EyeOff, GripVertical, Trash2, ArrowLeft, Wand2, Copy, Layers, ArrowUp, ArrowDown, Loader2 } from 'lucide-react';
import { AppMode } from '../../types';

interface DemoEditorProps {
    setMode: (mode: AppMode) => void;
}

const DemoEditor: React.FC<DemoEditorProps> = ({ setMode }) => {
    const [settings, setSettings] = useState<AgencySettings>(getAgencySettings());
    const [selectedDemo, setSelectedDemo] = useState('landing-professional');
    const [activeTab, setActiveTab] = useState<'sections' | 'ai' | 'content'>('sections');
    const [isThinking, setIsThinking] = useState(false);
    const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
    
    // Fallback content structure if not exists
    const currentDemoContent: DemoContent = settings.demoContent[selectedDemo] || {
        heroTitle: '',
        heroSubtitle: '',
        theme: { primary: '#000000', secondary: '#ffffff', background: '#ffffff', accent: '#000000', button: '#000000', radius: 8 },
        images: {},
        texts: {},
        sections: []
    };

    const handleSave = () => {
        saveAgencySettings(settings);
        alert('Alterações salvas com sucesso!');
    };

    const updateContent = (field: string, value: any) => {
        setSettings({
            ...settings,
            demoContent: {
                ...settings.demoContent,
                [selectedDemo]: { ...currentDemoContent, [field]: value }
            }
        });
    };

    // --- Section Management v4 ---
    const toggleSection = (id: string) => {
        const newSections = currentDemoContent.sections.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s);
        updateContent('sections', newSections);
    };

    const moveSection = (index: number, direction: 'up' | 'down') => {
        const newSections = [...currentDemoContent.sections];
        if (direction === 'up' && index > 0) {
            [newSections[index], newSections[index - 1]] = [newSections[index - 1], newSections[index]];
        } else if (direction === 'down' && index < newSections.length - 1) {
            [newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]];
        }
        // Update orders
        newSections.forEach((s, i) => s.order = i + 1);
        updateContent('sections', newSections);
    };

    const deleteSection = (id: string) => {
        if(confirm('Tem certeza que deseja remover esta seção?')) {
            const newSections = currentDemoContent.sections.filter(s => s.id !== id);
            updateContent('sections', newSections);
        }
    };

    const duplicateSection = (section: DemoSection) => {
        const newSection = { ...section, id: `${section.type}-${Date.now()}`, label: `${section.label} (Cópia)` };
        updateContent('sections', [...currentDemoContent.sections, newSection]);
    };

    const addSection = (type: string) => {
        if (!type) return;
        const newSection: DemoSection = {
            id: `${type}-${Date.now()}`,
            label: `Nova Seção ${type.charAt(0).toUpperCase() + type.slice(1)}`,
            enabled: true,
            order: currentDemoContent.sections.length + 1,
            type: type as any
        };
        updateContent('sections', [...currentDemoContent.sections, newSection]);
    };

    // --- AI Logic ---
    const runAIAssistant = async () => {
        setIsThinking(true);
        const suggestions = await suggestDemoImprovements(currentDemoContent.sections);
        setAiSuggestions(suggestions);
        setIsThinking(false);
    };

    return (
        <div className="p-8 max-w-7xl mx-auto min-h-screen bg-slate-950 text-white">
             <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        Adm Demos <span className="text-xs bg-indigo-500 px-2 py-1 rounded uppercase tracking-wider">IA</span>
                    </h1>
                    <p className="text-slate-400">Gerencie suas landing pages de demonstração.</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={() => setMode(AppMode.HUB)} className="text-slate-400 hover:text-white px-4 py-2 transition-colors flex items-center gap-2">
                        <ArrowLeft size={16} /> Voltar
                    </button>
                    <button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 shadow-lg transition-all">
                        <Save size={18} /> Salvar
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Sidebar */}
                <div className="lg:col-span-3 space-y-4">
                    <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                        <label className="block text-slate-500 text-xs font-bold uppercase mb-2">Demo Ativa</label>
                        <select 
                            value={selectedDemo}
                            onChange={(e) => setSelectedDemo(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500"
                        >
                            <option value="landing-professional">LP Profissional</option>
                            <option value="landing-high-conversion">LP Alta Conversão</option>
                        </select>
                    </div>

                    <nav className="flex flex-col gap-1">
                        {[
                            { id: 'sections', label: 'Estrutura', icon: Layers },
                            { id: 'content', label: 'Conteúdo', icon: Type },
                            { id: 'ai', label: 'Assistente IA', icon: Sparkles },
                        ].map(tab => (
                            <button 
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === tab.id ? 'bg-slate-800 text-white border border-slate-700' : 'text-slate-500 hover:text-white hover:bg-slate-900'}`}
                            >
                                <tab.icon size={18} className={tab.id === 'ai' ? 'text-pink-400' : ''} /> {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Editor Canvas */}
                <div className="lg:col-span-9">
                    {activeTab === 'sections' && (
                        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl animate-fade-in">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold text-xl">Gerenciar Seções</h3>
                                <div className="relative group">
                                    <select 
                                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold text-sm outline-none cursor-pointer hover:bg-indigo-500 appearance-none pr-8"
                                        onChange={(e) => { addSection(e.target.value); e.target.value = ""; }}
                                        value=""
                                    >
                                        <option value="" disabled>+ Adicionar Seção</option>
                                        <option value="hero">Hero / Capa</option>
                                        <option value="features">Lista de Benefícios</option>
                                        <option value="services">Grid de Serviços</option>
                                        <option value="testimonials">Depoimentos</option>
                                        <option value="gallery">Galeria de Fotos</option>
                                        <option value="faq">Perguntas Frequentes</option>
                                        <option value="contact">Contato / Mapa</option>
                                        <option value="footer">Rodapé</option>
                                    </select>
                                    <Plus size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-white pointer-events-none" />
                                </div>
                            </div>

                            <div className="space-y-3">
                                {currentDemoContent.sections?.length > 0 ? (
                                    currentDemoContent.sections.sort((a,b) => a.order - b.order).map((section, index) => (
                                        <div key={section.id} className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${section.enabled ? 'bg-slate-950 border-slate-800' : 'bg-slate-900/50 border-slate-800/50 opacity-50'}`}>
                                            <GripVertical size={20} className="text-slate-600 cursor-move" />
                                            <div className="flex-1">
                                                <p className="font-bold text-white">{section.label}</p>
                                                <p className="text-xs text-slate-500 uppercase tracking-wider">{section.type}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button 
                                                    onClick={() => moveSection(index, 'up')} 
                                                    disabled={index === 0} 
                                                    className="p-2 hover:bg-slate-800 rounded text-slate-400 disabled:opacity-20 hover:text-white transition-colors"
                                                    title="Mover para cima"
                                                >
                                                    <ArrowUp size={16}/>
                                                </button>
                                                <button 
                                                    onClick={() => moveSection(index, 'down')} 
                                                    disabled={index === currentDemoContent.sections.length - 1} 
                                                    className="p-2 hover:bg-slate-800 rounded text-slate-400 disabled:opacity-20 hover:text-white transition-colors"
                                                    title="Mover para baixo"
                                                >
                                                    <ArrowDown size={16}/>
                                                </button>
                                                <div className="w-px h-6 bg-slate-800 mx-2"></div>
                                                <button onClick={() => duplicateSection(section)} className="p-2 hover:bg-slate-800 rounded text-blue-400 hover:bg-blue-500/10 transition-colors" title="Duplicar"><Copy size={16}/></button>
                                                <button onClick={() => toggleSection(section.id)} className={`p-2 hover:bg-slate-800 rounded transition-colors ${section.enabled ? 'text-emerald-400' : 'text-slate-600'}`} title={section.enabled ? 'Ocultar' : 'Mostrar'}>
                                                    {section.enabled ? <Eye size={16}/> : <EyeOff size={16}/>}
                                                </button>
                                                <button onClick={() => deleteSection(section.id)} className="p-2 hover:bg-red-900/20 rounded text-red-400 hover:text-red-300 transition-colors" title="Excluir"><Trash2 size={16}/></button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-12 text-slate-500 border-2 border-dashed border-slate-800 rounded-xl">
                                        <Layers size={48} className="mx-auto mb-4 opacity-20" />
                                        <p>Nenhuma seção adicionada.</p>
                                        <p className="text-sm">Use o botão "+ Adicionar Seção" para começar.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'ai' && (
                        <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-indigo-500/30 p-10 rounded-3xl text-center animate-fade-in">
                            <div className="w-20 h-20 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-3xl mx-auto flex items-center justify-center text-white shadow-2xl shadow-indigo-500/30 mb-6">
                                <Sparkles size={40} />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-4">Assistente de Melhoria</h2>
                            <p className="text-slate-400 max-w-lg mx-auto mb-10 text-lg">
                                Nossa IA analisa o layout atual e sugere novas seções compatíveis com o nicho para aumentar a conversão.
                            </p>
                            
                            {aiSuggestions.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-left">
                                    {aiSuggestions.map((suggestion, idx) => (
                                        <div key={idx} className="bg-slate-900/50 p-6 rounded-2xl border border-indigo-500/20">
                                            <h4 className="font-bold text-white mb-2">Sugestão IA</h4>
                                            <p className="text-sm text-slate-400 mb-4">{suggestion}</p>
                                            <button className="text-xs bg-indigo-600 text-white px-3 py-1.5 rounded-lg font-bold hover:bg-indigo-500 w-full">Adicionar (Simulado)</button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="mb-10">
                                    <button 
                                        onClick={runAIAssistant} 
                                        disabled={isThinking}
                                        className="bg-white text-indigo-900 px-8 py-4 rounded-full font-bold shadow-xl flex items-center justify-center gap-3 mx-auto hover:scale-105 transition-transform disabled:opacity-50"
                                    >
                                        {isThinking ? <Loader2 className="animate-spin" size={20} /> : <Wand2 size={20} />} 
                                        {isThinking ? 'Analisando...' : 'Analisar e Sugerir'}
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DemoEditor;