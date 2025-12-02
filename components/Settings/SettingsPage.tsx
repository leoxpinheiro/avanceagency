
import React, { useState, useEffect } from 'react';
import { UserPlus, Trash2, ShieldCheck, X, AlertTriangle, Lock, Info } from 'lucide-react';
import { User, AgencySettings } from '../../types';
import { getUsers, saveUser, deleteUser } from '../../services/authService';
import { getAgencySettings, saveAgencySettings, resetFactorySettings } from '../../services/storageService';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'access' | 'info'>('access');
  const [settings, setSettings] = useState<AgencySettings>(getAgencySettings());
  
  // Auth State
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({ name: '', pin: '' });
  const [showAddUser, setShowAddUser] = useState(false);

  useEffect(() => {
    setUsers(getUsers());
    setSettings(getAgencySettings());
  }, []);

  const handleReset = () => {
    if(confirm('ATENÇÃO: Isso apaga todas as configurações internas. Continuar?')) {
        resetFactorySettings();
        setSettings(getAgencySettings());
        alert('Reset concluído.');
        window.location.reload(); 
    }
  };

  const handleAddUser = () => {
    if (newUser.name && newUser.pin.length === 6) {
      saveUser({
        id: Date.now().toString(),
        name: newUser.name,
        pin: newUser.pin,
        role: 'partner'
      });
      setUsers(getUsers());
      setNewUser({ name: '', pin: '' });
      setShowAddUser(false);
    } else {
        alert('Preencha o nome e uma senha de 6 dígitos.');
    }
  };

  const handleDeleteUser = (id: string) => {
    if(confirm('Remover acesso deste usuário?')) {
        deleteUser(id);
        setUsers(getUsers());
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
            <h1 className="text-3xl font-display font-bold text-white">Configurações</h1>
            <p className="text-slate-400">Administração do Sistema Avance OS.</p>
        </div>
      </div>

      <div className="flex gap-6 flex-col lg:flex-row">
        {/* Sidebar Tabs */}
        <div className="w-full lg:w-64 flex flex-col gap-2">
            {[
                { id: 'access', label: 'Acessos & Segurança', icon: Lock },
                { id: 'info', label: 'Status do Sistema', icon: Info },
            ].map(tab => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`text-left px-4 py-3 rounded-xl font-medium flex items-center gap-3 transition-colors ${
                        activeTab === tab.id 
                        ? 'bg-slate-800 text-white border border-slate-700' 
                        : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                    }`}
                >
                    <tab.icon size={18} /> {tab.label}
                </button>
            ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 space-y-6">
            
            {activeTab === 'info' && (
                <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-2xl p-6">
                    <h2 className="text-xl font-bold text-white mb-4">Versão Canônica v3.0 Principal</h2>
                    <p className="text-slate-400 mb-6 text-sm">
                        O sistema está operando na versão "Principal Estável". A página pública (Home) foi configurada para máxima conversão com layout compacto e identidade visual otimizada.
                    </p>
                    
                    <div className="bg-amber-900/20 border border-amber-500/30 p-4 rounded-xl">
                        <h3 className="text-amber-500 font-bold text-sm flex items-center gap-2 mb-2"><AlertTriangle size={16}/> Zona de Reset</h3>
                        <p className="text-amber-200/60 text-xs mb-4">
                            Se houver problemas com dados internos (clientes, contratos), utilize o botão abaixo para limpar o banco de dados operacional.
                        </p>
                        <button 
                            onClick={handleReset}
                            className="text-xs font-bold text-white bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg transition-colors"
                        >
                            Resetar Banco de Dados Operacional
                        </button>
                    </div>
                </div>
            )}

            {activeTab === 'access' && (
                <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <ShieldCheck className="text-emerald-500" /> Usuários e Senhas
                        </h2>
                        <button 
                            onClick={() => setShowAddUser(true)}
                            className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 transition-colors"
                        >
                            <UserPlus size={14} /> Adicionar
                        </button>
                    </div>

                    {showAddUser && (
                        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 mb-4 animate-fade-in">
                            <div className="flex justify-between mb-2">
                                <span className="text-sm font-bold text-white">Novo Parceiro</span>
                                <button onClick={() => setShowAddUser(false)}><X size={16} className="text-slate-500 hover:text-white" /></button>
                            </div>
                            <div className="grid grid-cols-2 gap-3 mb-3">
                                <input 
                                    placeholder="Nome"
                                    value={newUser.name}
                                    onChange={e => setNewUser({...newUser, name: e.target.value})}
                                    className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white text-sm focus:border-indigo-500 outline-none"
                                />
                                <input 
                                    placeholder="Senha (6 dígitos)"
                                    maxLength={6}
                                    value={newUser.pin}
                                    onChange={e => setNewUser({...newUser, pin: e.target.value.replace(/\D/g, '')})}
                                    className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white text-sm focus:border-indigo-500 outline-none"
                                />
                            </div>
                            <button onClick={handleAddUser} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-2 rounded-lg text-sm font-bold">
                                Confirmar Criação
                            </button>
                        </div>
                    )}

                    <div className="space-y-2 mb-8">
                        {users.map(user => (
                            <div key={user.id} className="flex justify-between items-center bg-slate-950 p-3 rounded-xl border border-slate-800">
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${user.role === 'admin' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-800 text-slate-400'}`}>
                                        {user.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-white text-sm font-medium">{user.name}</p>
                                        <p className="text-xs text-slate-500">PIN: ••••••</p>
                                    </div>
                                </div>
                                {user.role !== 'admin' && (
                                    <button onClick={() => handleDeleteUser(user.id)} className="text-slate-600 hover:text-red-500 transition-colors p-2">
                                        <Trash2 size={16} />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
