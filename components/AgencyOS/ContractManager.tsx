
import React, { useState, useEffect } from 'react';
import { FileText, Download, PenTool, Check } from 'lucide-react';
import { getContracts, saveContracts } from '../../services/storageService';
import { Contract } from '../../types';

const ContractManager: React.FC = () => {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [newContract, setNewContract] = useState<Partial<Contract>>({});
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
      setContracts(getContracts());
  }, []);

  const handleGenerate = () => {
      if (!newContract.clientName) return;
      const contract: Contract = {
          id: Date.now().toString(),
          clientName: newContract.clientName,
          product: newContract.product || 'Landing Page',
          value: Number(newContract.value) || 0,
          renewal: newContract.renewal || 'Único',
          date: new Date().toLocaleDateString(),
          signed: false
      };
      const updated = [...contracts, contract];
      setContracts(updated);
      saveContracts(updated);
      setShowForm(false);
      setNewContract({});
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
            <h1 className="text-3xl font-display font-bold text-white">Contratos</h1>
            <p className="text-slate-400">Gerador automático de documentos jurídicos.</p>
        </div>
        <button onClick={() => setShowForm(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg transition-all">
            <FileText size={20} /> Novo Contrato
        </button>
      </div>

      {showForm && (
          <div className="glass-card p-6 rounded-2xl mb-8 animate-slide-up border border-slate-800">
              <h3 className="font-bold text-white mb-4">Dados do Contrato</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input placeholder="Nome do Cliente" className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-white" value={newContract.clientName || ''} onChange={e => setNewContract({...newContract, clientName: e.target.value})} />
                  <select className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-white" value={newContract.product} onChange={e => setNewContract({...newContract, product: e.target.value})}>
                      <option value="Landing Page Profissional">Landing Page Profissional</option>
                      <option value="Landing Page Premium">Landing Page Premium</option>
                      <option value="SaaS Solo">SaaS Solo</option>
                      <option value="SaaS Premium">SaaS Premium</option>
                  </select>
                  <input placeholder="Valor (R$)" type="number" className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-white" value={newContract.value || ''} onChange={e => setNewContract({...newContract, value: Number(e.target.value)})} />
                  <input placeholder="Renovação (ex: Mensal, Anual)" className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-white" value={newContract.renewal || ''} onChange={e => setNewContract({...newContract, renewal: e.target.value})} />
              </div>
              <div className="flex justify-end gap-3">
                  <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-white px-4 py-2">Cancelar</button>
                  <button onClick={handleGenerate} className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-bold">Gerar PDF</button>
              </div>
          </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contracts.map(contract => (
              <div key={contract.id} className="glass-card p-6 rounded-2xl border border-slate-800 relative group hover:border-indigo-500/50 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-slate-800 rounded-xl text-slate-400"><FileText size={24}/></div>
                      {contract.signed ? (
                          <span className="bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded text-xs font-bold uppercase">Assinado</span>
                      ) : (
                          <span className="bg-slate-800 text-slate-500 px-2 py-1 rounded text-xs font-bold uppercase">Pendente</span>
                      )}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{contract.clientName}</h3>
                  <p className="text-sm text-slate-400 mb-4">{contract.product}</p>
                  
                  <div className="flex justify-between items-center border-t border-slate-800 pt-4">
                      <div>
                          <p className="text-xs text-slate-500 uppercase font-bold">Valor</p>
                          <p className="text-white font-bold">R$ {contract.value}</p>
                      </div>
                      <div className="flex gap-2">
                          <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors" title="Baixar PDF"><Download size={18}/></button>
                          <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors" title="Assinar"><PenTool size={18}/></button>
                      </div>
                  </div>
              </div>
          ))}
      </div>
    </div>
  );
};

export default ContractManager;
