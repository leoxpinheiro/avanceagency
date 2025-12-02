
import React, { useState, useEffect } from 'react';
import { Users, Plus, Search, MoreVertical, Send, Edit2, Trash2, Phone, CheckCircle } from 'lucide-react';
import { getAgencyClients, saveAgencyClients } from '../../services/storageService';
import { AgencyClient } from '../../types';

const ClientManager: React.FC = () => {
  const [clients, setClients] = useState<AgencyClient[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newClient, setNewClient] = useState<Partial<AgencyClient>>({});

  useEffect(() => {
    setClients(getAgencyClients());
  }, []);

  const handleSaveClient = () => {
    if (!newClient.name || !newClient.phone) return;
    const client: AgencyClient = {
        id: Date.now().toString(),
        name: newClient.name,
        phone: newClient.phone,
        systemType: newClient.systemType || 'SaaS Solo',
        renewalDate: newClient.renewalDate || '-',
        monthlyValue: Number(newClient.monthlyValue) || 0,
        status: 'active',
        notes: newClient.notes || ''
    };
    const updated = [...clients, client];
    setClients(updated);
    saveAgencyClients(updated);
    setIsAdding(false);
    setNewClient({});
  };

  const sendBilling = (client: AgencyClient) => {
      const msg = `Olá ${client.name}! Aqui é da Avance Agency.
Lembrete de renovação do seu plano ${client.systemType}.
Valor: R$ ${client.monthlyValue.toFixed(2)}.
Chave Pix: (sua-chave-pix)`;
      window.open(`https://wa.me/${client.phone.replace(/\D/g,'')}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
            <h1 className="text-3xl font-display font-bold text-white">Carteira de Clientes</h1>
            <p className="text-slate-400">Gerencie seus relacionamentos e cobranças.</p>
        </div>
        <button onClick={() => setIsAdding(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg transition-all">
            <Plus size={20} /> Novo Cliente
        </button>
      </div>

      {isAdding && (
          <div className="glass-card p-6 rounded-2xl mb-8 animate-slide-up border border-slate-800">
              <h3 className="font-bold text-white mb-4">Cadastrar Cliente</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <input placeholder="Nome" className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-white" value={newClient.name || ''} onChange={e => setNewClient({...newClient, name: e.target.value})} />
                  <input placeholder="WhatsApp (55...)" className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-white" value={newClient.phone || ''} onChange={e => setNewClient({...newClient, phone: e.target.value})} />
                  <select className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-white" value={newClient.systemType} onChange={e => setNewClient({...newClient, systemType: e.target.value as any})}>
                      <option value="SaaS Solo">SaaS Solo</option>
                      <option value="SaaS Premium">SaaS Premium</option>
                      <option value="Landing Page">Landing Page</option>
                  </select>
                  <input placeholder="Data Renovação (DD/MM)" className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-white" value={newClient.renewalDate || ''} onChange={e => setNewClient({...newClient, renewalDate: e.target.value})} />
                  <input placeholder="Valor Mensal (R$)" type="number" className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-white" value={newClient.monthlyValue || ''} onChange={e => setNewClient({...newClient, monthlyValue: Number(e.target.value)})} />
                  <input placeholder="Observações" className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-white" value={newClient.notes || ''} onChange={e => setNewClient({...newClient, notes: e.target.value})} />
              </div>
              <div className="flex justify-end gap-3">
                  <button onClick={() => setIsAdding(false)} className="text-slate-400 hover:text-white px-4 py-2">Cancelar</button>
                  <button onClick={handleSaveClient} className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-bold">Salvar</button>
              </div>
          </div>
      )}

      <div className="glass-card rounded-3xl border border-slate-800 overflow-hidden">
          <table className="w-full text-left">
              <thead className="bg-slate-900/50 border-b border-slate-800">
                  <tr>
                      <th className="p-6 text-xs font-bold text-slate-500 uppercase">Cliente</th>
                      <th className="p-6 text-xs font-bold text-slate-500 uppercase">Sistema</th>
                      <th className="p-6 text-xs font-bold text-slate-500 uppercase">Renovação</th>
                      <th className="p-6 text-xs font-bold text-slate-500 uppercase">Valor</th>
                      <th className="p-6 text-xs font-bold text-slate-500 uppercase">Status</th>
                      <th className="p-6 text-xs font-bold text-slate-500 uppercase text-right">Ações</th>
                  </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                  {clients.map(client => (
                      <tr key={client.id} className="hover:bg-slate-900/50 transition-colors">
                          <td className="p-6">
                              <div className="font-bold text-white">{client.name}</div>
                              <div className="text-xs text-slate-500 flex items-center gap-1"><Phone size={10}/> {client.phone}</div>
                          </td>
                          <td className="p-6">
                              <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-bold text-slate-300">{client.systemType}</span>
                          </td>
                          <td className="p-6 text-slate-300 font-mono">{client.renewalDate}</td>
                          <td className="p-6 font-bold text-emerald-400">R$ {client.monthlyValue.toFixed(2)}</td>
                          <td className="p-6">
                              <span className={`text-xs font-bold uppercase px-2 py-1 rounded ${client.status === 'active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                                  {client.status}
                              </span>
                          </td>
                          <td className="p-6 text-right">
                              <button onClick={() => sendBilling(client)} className="p-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg shadow-lg transition-all mr-2" title="Enviar Cobrança">
                                  <Send size={16}/>
                              </button>
                              <button className="p-2 text-slate-500 hover:text-white transition-colors"><Edit2 size={16}/></button>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
    </div>
  );
};

export default ClientManager;
