
import React, { useState } from 'react';
import { Lock, X, ChevronRight, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { authenticate } from '../../services/authService';

interface LoginModalProps {
  onSuccess: () => void;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onSuccess, onClose }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (pin.length < 3) {
        setError('Senha muito curta.');
        return;
    }

    const user = authenticate(pin);
    if (user) {
      onSuccess();
    } else {
      setError('Senha incorreta.');
      setPin('');
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity" onClick={onClose}></div>
      
      <div className="relative bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-sm p-8 shadow-2xl animate-slide-up overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>

        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5">
          <X size={20} />
        </button>

        <div className="text-center mb-10 mt-2">
          <div className="w-20 h-20 bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-2xl mx-auto flex items-center justify-center text-white mb-6 shadow-xl shadow-indigo-500/20 transform rotate-3 hover:rotate-0 transition-transform duration-500">
            <Lock size={32} />
          </div>
          <h2 className="text-2xl font-display font-bold text-white tracking-tight">Área do Proprietário</h2>
          <p className="text-slate-400 text-sm mt-2 font-medium">Digite sua senha de administrador.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative group">
                <input 
                    type={showPassword ? "text" : "password"}
                    value={pin}
                    onChange={(e) => {
                        setPin(e.target.value);
                        setError('');
                    }}
                    placeholder="Sua senha"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-4 text-center text-xl tracking-widest text-white placeholder:text-slate-700 placeholder:tracking-normal focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all font-mono"
                    autoFocus
                />
                <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-white transition-colors"
                >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>

            {error && (
            <div className="text-red-400 text-xs font-bold text-center bg-red-500/10 py-3 rounded-lg border border-red-500/20 flex items-center justify-center gap-2 animate-fade-in">
                <AlertCircle size={14} /> {error}
            </div>
            )}

            <button
            type="submit"
            disabled={pin.length < 3}
            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                pin.length >= 3 
                ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 hover:-translate-y-0.5' 
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
            >
            Entrar <ChevronRight size={18} />
            </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-800 text-center">
            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-2 opacity-50">Admin Default</p>
            <div className="flex justify-center gap-4 text-xs font-mono text-indigo-400/50">
                <span>Pass: 123456</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
