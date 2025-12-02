
import React from 'react';
import { 
  LayoutDashboard, 
  PaintBucket, 
  Monitor, 
  FolderKanban, 
  Wallet, 
  Mic2, 
  Settings,
  Menu,
  X,
  LogOut,
  Edit3,
  Users,
  FileText,
  Rocket
} from 'lucide-react';
import { AppMode } from '../../types';

interface SidebarProps {
  currentMode: AppMode;
  setMode: (mode: AppMode) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentMode, setMode }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const agencyOSMenu = [
      { id: AppMode.AGENCY_DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
      { id: AppMode.AGENCY_CLIENTS, label: 'Clientes', icon: Users },
      { id: AppMode.AGENCY_PROJECTS, label: 'Projetos', icon: FolderKanban },
      { id: AppMode.AGENCY_FINANCE, label: 'Assinaturas & Pagamentos', icon: Wallet },
      { id: AppMode.AGENCY_CONTRACTS, label: 'Contratos', icon: FileText },
      { id: AppMode.AGENCY_DEMO_ADMIN, label: 'Adm de Demos', icon: Edit3 },
      { id: AppMode.AGENCY_SETTINGS, label: 'Configurações', icon: Settings },
  ];

  const toolsMenu = [
      { id: AppMode.HUB, label: 'Hub de Ofertas', icon: Rocket },
      { id: AppMode.LANDING_BUILDER, label: 'Criador Landing', icon: PaintBucket },
      { id: AppMode.SAAS_BUILDER, label: 'Criador SaaS', icon: Monitor },
      { id: AppMode.SALES_ASSISTANT, label: 'Sales IA', icon: Mic2 },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-slate-950/95 backdrop-blur-xl border-r border-slate-800 shadow-2xl">
       <div className="h-20 flex items-center px-6 border-b border-slate-800 bg-slate-900/50">
        <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center text-white font-display font-bold text-xl shadow-lg shadow-indigo-500/20 ring-1 ring-white/10 shrink-0">
          A
        </div>
        <div className="ml-3 overflow-hidden">
          <span className="block font-bold text-white font-display text-sm leading-tight tracking-tight truncate">Avance OS</span>
          <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider block mt-0.5">Agency Panel</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8 custom-scrollbar">
        
        {/* Main Management */}
        <div>
            <h3 className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Gestão</h3>
            <div className="space-y-1">
                {agencyOSMenu.map((item) => {
                    const isActive = currentMode === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => { setMode(item.id); setIsOpen(false); }}
                            className={`w-full flex items-center px-3 py-2.5 rounded-xl transition-all duration-200 group relative overflow-hidden ${
                                isActive 
                                ? 'bg-indigo-600/10 text-indigo-400 ring-1 ring-indigo-500/50 shadow-lg shadow-indigo-900/20' 
                                : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                            }`}
                        >
                            {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 rounded-r-full"></div>}
                            <item.icon size={18} className={`${isActive ? 'text-indigo-400' : 'text-slate-500 group-hover:text-white'} transition-colors shrink-0`} />
                            <span className="ml-3 text-sm font-medium truncate">{item.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>

        {/* Tools */}
        <div>
            <h3 className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Ferramentas</h3>
            <div className="space-y-1">
                {toolsMenu.map((item) => {
                    const isActive = currentMode === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => { setMode(item.id); setIsOpen(false); }}
                            className={`w-full flex items-center px-3 py-2.5 rounded-xl transition-all duration-200 group relative overflow-hidden ${
                                isActive 
                                ? 'bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/50' 
                                : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                            }`}
                        >
                            <item.icon size={18} className={`${isActive ? 'text-emerald-400' : 'text-slate-500 group-hover:text-white'} transition-colors shrink-0`} />
                            <span className="ml-3 text-sm font-medium truncate">{item.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>

      </div>

      <div className="p-4 border-t border-slate-800 bg-slate-900/30">
        <button 
          onClick={() => setMode(AppMode.PUBLIC_HOME)}
          className="w-full flex items-center px-3 py-2.5 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl transition-colors mb-2"
        >
          <LogOut size={18} className="shrink-0" />
          <span className="ml-3 text-sm font-medium truncate">Sair do Sistema</span>
        </button>

        <div className="bg-slate-900 rounded-xl p-3 flex items-center gap-3 border border-slate-800 shadow-inner">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-white text-xs font-bold border border-slate-700 shadow-md shrink-0">
              AG
            </div>
            <div className="overflow-hidden min-w-0">
              <p className="text-slate-200 text-sm font-medium truncate">Minha Agência</p>
              <p className="text-emerald-500 text-[10px] font-bold uppercase tracking-wider truncate">v3.0 Principal</p>
            </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Trigger */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 z-50 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">A</div>
            <span className="font-bold text-white">Avance OS</span>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-300 hover:text-white transition-colors">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 h-screen fixed left-0 top-0 z-40 bg-slate-950 border-r border-slate-800">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-slate-950 shadow-2xl animate-slide-right border-r border-slate-800 flex flex-col">
            <SidebarContent />
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
