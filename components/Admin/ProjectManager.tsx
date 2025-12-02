
import React, { useState, useEffect } from 'react';
import { Project, Subscription } from '../../types';
import { Folder, MoreVertical, CheckCircle, Archive, Smartphone, FileText, DollarSign, AlertCircle, User } from 'lucide-react';
import { getAgencySettings } from '../../services/storageService';

const ProjectManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'projects' | 'subscriptions'>('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const settings = getAgencySettings();
  const isDemo = settings.isDemo;

  useEffect(() => {
      if (isDemo) {
          setProjects([
            { id: '1', name: 'Advocacia Elite', client: 'Dr. Johnson', status: 'Negotiation', value: 2500, niche: 'Lawyer', createdAt: new Date(), type: 'Landing' },
            { id: '3', name: 'Dental Care', client: 'Smile Clinic', status: 'Sold', value: 1800, niche: 'Dentist', createdAt: new Date(), type: 'Landing' },
          ]);
          setSubscriptions([
              { id: 's1', clientName: 'Barbearia Cortes', plan: 'Solo', value: 39.90, status: 'Active', nextBilling: '15/12/2024', lastPayment: '15/11/2024' },
              { id: 's2', clientName: 'Studio Elite', plan: 'Elite', value: 79.90, status: 'Active', nextBilling: '20/12/2024', lastPayment: '20/11/2024' },
              { id: 's3', clientName: 'Pizza Express', plan: 'Start', value: 59.90, status: 'Late', nextBilling: '10/11/2024', lastPayment: '10/10/2024' },
          ]);
      } else {
          setProjects([]);
          setSubscriptions([]);
      }
  }, [isDemo]);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Sold': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'Active': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'Negotiation': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'Late': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Draft': return 'bg-slate-700/50 text-slate-300 border-slate-600';
      case 'Archived': return 'bg-slate-800/50 text-slate-400 border-slate-700'; // Lightened text
      case 'Cancelled': return 'bg-slate-800 text-slate-500 border-slate-700';
      default: return 'bg-slate-700 text-slate-300';
    }
  };

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'Sold': return 'Vendido';
      case 'Active': return 'Ativo';
      case 'Late': return 'Atrasado';
      case 'Negotiation': return 'Negociação';
      case 'Draft': return 'Rascunho';
      case 'Archived': return 'Arquivado';
      case 'Cancelled': return 'Cancelado';
      default: return status;
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
           <h1 className="text-3xl font-display font-bold text-[#F5F5F7]">Gestão</h1>
           <p className="text-slate-400">Administre seus projetos e assinaturas recorrentes.</p>
        </div>
        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button 
                onClick={() => setActiveTab('projects')}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'projects' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
                Projetos (Entregas)
            </button>
            <button 
                onClick={() => setActiveTab('subscriptions')}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'subscriptions' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
                Assinaturas SaaS
            </button>
        </div>
      </div>

      {isDemo && (
           <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl mb-4 font-bold text-sm text-center">
               MODO DEMO ATIVO: Exibindo dados fictícios.
           </div>
      )}

      {activeTab === 'projects' ? (
          // PROJECTS TABLE
          <div className="bg-slate-900/50 backdrop-blur rounded-2xl border border-slate-800 overflow-hidden shadow-xl shadow-black/20">
            <table className="w-full text-left">
                <thead className="bg-slate-900 border-b border-slate-800">
                    <tr>
                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Projeto</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Cliente</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Tipo</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Valor</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Ações</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                    {projects?.map((project) => (
                        <tr key={project.id} className="hover:bg-slate-800/50 transition-colors group">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-slate-800 text-slate-300 rounded-lg group-hover:text-white group-hover:bg-indigo-600 transition-colors">
                                        <Folder size={18} />
                                    </div>
                                    <span className="font-medium text-white">{project.name}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-slate-400 text-sm">{project.client}</td>
                            <td className="px-6 py-4">
                                <span className={`text-xs font-bold px-2 py-1 rounded-md ${project.type === 'SaaS' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-indigo-500/10 text-indigo-400'}`}>
                                    {project.type}
                                </span>
                            </td>
                            <td className="px-6 py-4 font-bold text-slate-200">R$ {project.value}</td>
                            <td className="px-6 py-4">
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusColor(project.status)}`}>
                                    {project.status === 'Sold' && <CheckCircle size={12} />}
                                    {getStatusLabel(project.status)}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <button className="text-slate-500 hover:text-white p-2 hover:bg-slate-700 rounded-lg transition-colors">
                                    <MoreVertical size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
          </div>
      ) : (
          // SUBSCRIPTIONS TABLE
          <div className="bg-slate-900/50 backdrop-blur rounded-2xl border border-slate-800 overflow-hidden shadow-xl shadow-black/20">
            <div className="p-4 bg-slate-900 border-b border-slate-800 flex justify-between items-center">
                <h3 className="font-bold text-white flex items-center gap-2"><Smartphone size={18} className="text-emerald-500" /> Clientes SaaS Ativos</h3>
                <div className="text-xs font-bold text-slate-500 uppercase flex gap-4">
                    <span>Faturamento Recorrente</span>
                    <span className="text-emerald-400">R$ {(subscriptions || []).reduce((acc, sub) => acc + sub.value, 0).toFixed(2)}</span>
                </div>
            </div>
            <table className="w-full text-left">
                <thead className="bg-slate-900/50 border-b border-slate-800">
                    <tr>
                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Cliente / Empresa</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Plano</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Mensalidade</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Vencimento</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Ações</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                    {subscriptions?.map((sub) => (
                        <tr key={sub.id} className="hover:bg-slate-800/50 transition-colors">
                            <td className="px-6 py-4 font-medium text-white">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center text-slate-400">
                                        <User size={14} />
                                    </div>
                                    {sub.clientName}
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                                    sub.plan === 'Elite' || sub.plan === 'Pro' 
                                    ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' 
                                    : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                }`}>
                                    {sub.plan}
                                </span>
                            </td>
                            <td className="px-6 py-4 font-bold text-slate-200">R$ {sub.value.toFixed(2)}</td>
                            <td className="px-6 py-4">
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusColor(sub.status)}`}>
                                    {sub.status === 'Late' && <AlertCircle size={12} />}
                                    {getStatusLabel(sub.status)}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-400 font-mono">{sub.nextBilling}</td>
                            <td className="px-6 py-4 flex items-center gap-2">
                                <button title="Confirmar Pagamento" className="p-2 rounded-lg text-emerald-500 hover:bg-emerald-500/10 transition-colors">
                                    <DollarSign size={18} />
                                </button>
                                <button title="Ver Contrato" className="p-2 rounded-lg text-indigo-400 hover:bg-indigo-500/10 transition-colors">
                                    <FileText size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
          </div>
      )}
    </div>
  );
};

export default ProjectManager;
