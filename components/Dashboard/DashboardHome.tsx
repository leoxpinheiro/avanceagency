
import React from 'react';
import { DollarSign, TrendingUp, Users, Clock } from 'lucide-react';
import { getAgencySettings } from '../../services/storageService';

const DashboardHome: React.FC = () => {
  const settings = getAgencySettings();

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div>
        {/* Changed text color to white/premium white as requested */}
        <h1 className="text-3xl font-display font-bold text-[#F5F5F7]">Central de Comando</h1>
        <p className="text-slate-500 mt-1">Bem-vindo de volta. Aqui está o pulso da sua agência.</p>
        {settings.isDemo && (
             <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                 Modo Demonstração Ativo
             </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Receita Mensal', value: settings.isDemo ? 'R$ 15.450' : 'R$ 0,00', icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
          { label: 'Projetos Ativos', value: settings.isDemo ? '7' : '0', icon: Clock, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Taxa de Fechamento', value: settings.isDemo ? '64%' : '0%', icon: TrendingUp, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
          { label: 'Valor em Pipeline', value: settings.isDemo ? 'R$ 22.200' : 'R$ 0,00', icon: Users, color: 'text-purple-500', bg: 'bg-purple-500/10' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-slate-900/50 backdrop-blur p-6 rounded-2xl border border-slate-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className={`${stat.bg} p-3 rounded-xl`}>
                <stat.icon className={`${stat.color}`} size={24} />
              </div>
              <span className="text-xs font-medium bg-slate-800 text-slate-400 px-2 py-1 rounded-full">+12%</span>
            </div>
            <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
            <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-900/50 backdrop-blur rounded-2xl border border-slate-800 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-white">Crescimento de Receita</h3>
            <select className="text-sm bg-slate-950 border border-slate-800 rounded-lg text-slate-400 p-2 outline-none">
              <option>Últimos 6 Meses</option>
            </select>
          </div>
          <div className="h-64 flex items-end justify-between gap-2">
            {(settings.isDemo ? [40, 65, 45, 80, 55, 90] : [0, 0, 0, 0, 0, 0]).map((h, i) => (
              <div key={i} className="w-full bg-slate-800/50 rounded-t-xl relative group hover:bg-slate-800 transition-colors">
                <div 
                  className="absolute bottom-0 w-full bg-indigo-600 rounded-t-xl transition-all duration-500"
                  style={{ height: `${h}%` }}
                ></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs text-slate-500 font-medium uppercase tracking-wider">
            <span>Jan</span><span>Fev</span><span>Mar</span><span>Abr</span><span>Mai</span><span>Jun</span>
          </div>
        </div>

        <div className="bg-slate-900/50 backdrop-blur rounded-2xl border border-slate-800 shadow-sm p-6">
          <h3 className="font-bold text-white mb-4">Atividade Recente</h3>
          <div className="space-y-6">
            {(settings.isDemo ? [
              { text: 'Proposta enviada para Escritório de Advocacia', time: '2h atrás' },
              { text: 'Briefing completado: Pizzaria', time: '4h atrás' },
              { text: 'Novo lead: Clínica Odontológica', time: '1d atrás' },
            ] : []).map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-2 h-2 mt-2 rounded-full bg-indigo-500 flex-shrink-0"></div>
                <div>
                  <p className="text-sm font-medium text-slate-300">{item.text}</p>
                  <p className="text-xs text-slate-500">{item.time}</p>
                </div>
              </div>
            ))}
            {!settings.isDemo && <p className="text-slate-500 text-sm italic">Nenhuma atividade recente.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
