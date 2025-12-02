
import React from 'react';
import { DollarSign, TrendingUp, CreditCard, PieChart, Plus } from 'lucide-react';
import { getAgencySettings } from '../../services/storageService';

const FinanceDashboard: React.FC = () => {
  const settings = getAgencySettings();
  const isDemo = settings.isDemo;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
            <h1 className="text-3xl font-display font-bold text-white">Financeiro</h1>
            <p className="text-slate-400">Controle de caixa da agência.</p>
        </div>
        <button className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-emerald-500/20 hover:bg-emerald-700 transition-all hover:-translate-y-1 flex items-center gap-2">
            <Plus size={20} /> Registrar Venda Manual
        </button>
      </div>
      
      {isDemo && (
           <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl mb-4 font-bold text-sm text-center">
               MODO DEMO ATIVO: Exibindo dados fictícios de exemplo.
           </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Receita Total', value: isDemo ? 'R$ 15.450' : 'R$ 0,00', icon: DollarSign, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Projetos Vendidos', value: isDemo ? '23' : '0', icon: TrendingUp, color: 'text-blue-400', bg: 'bg-blue-500/10' },
          { label: 'Ticket Médio', value: isDemo ? 'R$ 671' : 'R$ 0', icon: CreditCard, color: 'text-purple-400', bg: 'bg-purple-500/10' },
          { label: 'Top Plano', value: isDemo ? 'R$ 697' : '-', icon: PieChart, color: 'text-amber-400', bg: 'bg-amber-500/10' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-slate-900/50 backdrop-blur p-6 rounded-2xl border border-slate-800">
            <div className="flex justify-between items-start mb-4">
              <div className={`${stat.bg} p-3 rounded-xl`}>
                <stat.icon className={`${stat.color}`} size={24} />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
            <p className="text-sm text-slate-500 font-medium uppercase tracking-wider mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 bg-slate-900/50 backdrop-blur p-8 rounded-3xl border border-slate-800">
            <h3 className="font-bold text-white mb-8 text-lg">Últimas Vendas</h3>
            <div className="space-y-4">
                {(isDemo ? [
                    { client: 'Advogado Criminalista', plan: 'Alta Conversão', amount: 'R$ 697', date: 'Hoje' },
                    { client: 'Pizzaria Delivery', plan: 'Profissional', amount: 'R$ 397', date: 'Ontem' },
                    { client: 'Clínica Odonto', plan: 'Alta Conversão', amount: 'R$ 697', date: '20 Nov' },
                ] : []).map((sale, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-950/50 rounded-xl border border-slate-800">
                        <div>
                            <p className="font-bold text-white">{sale.client}</p>
                            <p className="text-xs text-slate-400">{sale.plan}</p>
                        </div>
                        <div className="text-right">
                             <p className="font-bold text-emerald-400">{sale.amount}</p>
                             <p className="text-xs text-slate-500">{sale.date}</p>
                        </div>
                    </div>
                ))}
                {!isDemo && <p className="text-slate-500 text-center py-8">Nenhuma venda registrada.</p>}
            </div>
         </div>

         <div className="bg-slate-900/50 backdrop-blur p-8 rounded-3xl border border-slate-800">
            <h3 className="font-bold text-white mb-6 text-lg">Metas</h3>
            <div className="text-center py-8">
                <div className="text-5xl font-bold text-white mb-2">{isDemo ? '64%' : '0%'}</div>
                <p className="text-slate-400 text-sm">da meta de R$ 5k atingida</p>
                <div className="w-full bg-slate-800 h-2 rounded-full mt-4 overflow-hidden">
                    <div className="h-full bg-indigo-500" style={{ width: isDemo ? '64%' : '0%' }}></div>
                </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default FinanceDashboard;
