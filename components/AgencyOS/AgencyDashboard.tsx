
import React from 'react';
import { DollarSign, Users, ShoppingBag, AlertCircle, TrendingUp, PieChart as PieIcon } from 'lucide-react';
import { getAgencyClients } from '../../services/storageService';

const AgencyDashboard: React.FC = () => {
  const clients = getAgencyClients();
  
  const activeClients = clients.filter(c => c.status === 'active').length;
  const monthlyRevenue = clients.reduce((acc, c) => acc + (c.status !== 'cancelled' ? c.monthlyValue : 0), 0);
  const productBreakdown = {
      solo: clients.filter(c => c.systemType === 'SaaS Solo').length,
      premium: clients.filter(c => c.systemType === 'SaaS Premium').length,
      landing: clients.filter(c => c.systemType === 'Landing Page').length
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
            <h1 className="text-3xl font-display font-bold text-white">Visão Geral</h1>
            <p className="text-slate-400">Acompanhe o crescimento da sua agência.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 rounded-full border border-slate-800">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Sistema Operacional</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Users size={60} className="text-indigo-500"/>
            </div>
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-indigo-500/20 rounded-xl text-indigo-400"><Users size={24}/></div>
            </div>
            <h3 className="text-3xl font-bold text-white">{activeClients}</h3>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Clientes Ativos</p>
        </div>

        <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <DollarSign size={60} className="text-emerald-500"/>
            </div>
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-400"><DollarSign size={24}/></div>
            </div>
            <h3 className="text-3xl font-bold text-white">R$ {monthlyRevenue.toFixed(2)}</h3>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Faturamento Mensal</p>
        </div>

        <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <ShoppingBag size={60} className="text-blue-500"/>
            </div>
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400"><ShoppingBag size={24}/></div>
            </div>
            <h3 className="text-3xl font-bold text-white">{clients.length}</h3>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Produtos</p>
        </div>

        <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <AlertCircle size={60} className="text-amber-500"/>
            </div>
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-amber-500/20 rounded-xl text-amber-400"><AlertCircle size={24}/></div>
            </div>
            <h3 className="text-3xl font-bold text-white">1</h3>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Renovação (7 dias)</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Revenue Bar Chart */}
          <div className="lg:col-span-2 glass-card p-8 rounded-3xl border border-slate-800">
              <div className="flex justify-between items-center mb-8">
                  <h3 className="font-bold text-white flex items-center gap-2"><TrendingUp size={20} className="text-emerald-500"/> Receita (Últimos 6 Meses)</h3>
              </div>
              <div className="h-64 flex items-end justify-between gap-4">
                  {[45, 60, 75, 50, 80, 90].map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                          <div className="w-full bg-slate-800 rounded-t-lg relative h-full overflow-hidden group-hover:bg-slate-700 transition-colors">
                              <div className="absolute bottom-0 w-full bg-emerald-600 group-hover:bg-emerald-500 transition-colors rounded-t-lg" style={{ height: `${h}%` }}></div>
                          </div>
                          <span className="text-xs font-bold text-slate-500 uppercase">Mês {i+1}</span>
                      </div>
                  ))}
              </div>
          </div>

          {/* Product Pie Chart */}
          <div className="glass-card p-8 rounded-3xl border border-slate-800">
              <h3 className="font-bold text-white mb-8 flex items-center gap-2"><PieIcon size={20} className="text-purple-500"/> Produtos Vendidos</h3>
              <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-slate-800">
                      <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                          <span className="text-sm font-bold text-slate-300">SaaS Solo</span>
                      </div>
                      <span className="text-white font-bold">{productBreakdown.solo}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-slate-800">
                      <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                          <span className="text-sm font-bold text-slate-300">SaaS Premium</span>
                      </div>
                      <span className="text-white font-bold">{productBreakdown.premium}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-slate-800">
                      <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                          <span className="text-sm font-bold text-slate-300">Landing Pages</span>
                      </div>
                      <span className="text-white font-bold">{productBreakdown.landing}</span>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default AgencyDashboard;
