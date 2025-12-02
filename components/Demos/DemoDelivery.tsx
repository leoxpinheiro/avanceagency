
import React from 'react';
import { AppMode } from '../../types';
import { ArrowLeft, Clock, ShoppingBag, Star } from 'lucide-react';

interface DemoProps {
  setMode: (mode: AppMode) => void;
}

const DemoDelivery: React.FC<DemoProps> = ({ setMode }) => {
  return (
    <div className="min-h-screen bg-zinc-900 font-sans text-white relative selection:bg-orange-500">
      <div className="fixed top-4 left-4 z-50">
        <button onClick={() => setMode(AppMode.PUBLIC_HOME)} className="bg-black/50 hover:bg-black/80 backdrop-blur text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 border border-white/10 transition-all">
            <ArrowLeft size={16} /> Voltar ao Portfólio
        </button>
      </div>

      {/* Hero */}
      <header className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
            <img src="https://image.pollinations.ai/prompt/delicious%20pepperoni%20pizza%20dark%20photography%20steam?nologo=true" className="w-full h-full object-cover opacity-60" alt="Pizza" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/60 to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl">
            <span className="text-orange-500 font-bold tracking-widest uppercase mb-4 block animate-fade-in">A melhor da cidade</span>
            <h1 className="text-6xl md:text-8xl font-display font-black text-white mb-6 leading-none uppercase drop-shadow-xl">
                Pizza <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">Express</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 font-light">
                Massa artesanal, forno a lenha e entrega flash em 30 minutos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-orange-600 hover:bg-orange-500 text-white px-8 py-4 rounded-xl font-bold text-xl flex items-center justify-center gap-2 shadow-lg shadow-orange-600/20 transform hover:scale-105 transition-all">
                    <ShoppingBag size={24} /> Pedir Agora
                </button>
                <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-bold text-xl backdrop-blur-sm border border-white/10">
                    Ver Cardápio
                </button>
            </div>
        </div>
      </header>

      {/* Combos */}
      <section className="py-20 px-6 bg-zinc-900">
          <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-white mb-12 uppercase italic">Combos Matadores</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-zinc-800 rounded-3xl p-6 flex gap-6 border border-zinc-700 hover:border-orange-500 transition-colors cursor-pointer group">
                      <div className="w-32 h-32 bg-zinc-900 rounded-2xl overflow-hidden flex-shrink-0">
                          <img src="https://image.pollinations.ai/prompt/pizza%20combo%20coke?nologo=true" className="w-full h-full object-cover group-hover:scale-110 transition-transform" alt="Combo" />
                      </div>
                      <div>
                          <h3 className="text-2xl font-bold text-white mb-2">Combo Casal</h3>
                          <p className="text-gray-400 text-sm mb-4">1 Pizza Grande + 1 Guaraná 2L. O clássico que não tem erro.</p>
                          <div className="text-orange-500 font-bold text-2xl">R$ 59,90</div>
                      </div>
                  </div>
                  <div className="bg-zinc-800 rounded-3xl p-6 flex gap-6 border border-zinc-700 hover:border-orange-500 transition-colors cursor-pointer group">
                      <div className="w-32 h-32 bg-zinc-900 rounded-2xl overflow-hidden flex-shrink-0">
                          <img src="https://image.pollinations.ai/prompt/pizza%20combo%20family?nologo=true" className="w-full h-full object-cover group-hover:scale-110 transition-transform" alt="Combo" />
                      </div>
                      <div>
                          <h3 className="text-2xl font-bold text-white mb-2">Combo Família</h3>
                          <p className="text-gray-400 text-sm mb-4">2 Pizzas Grandes + Borda Recheada Grátis.</p>
                          <div className="text-orange-500 font-bold text-2xl">R$ 99,90</div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* Info Bar */}
      <section className="py-12 bg-orange-600 text-white">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex items-center gap-4">
                  <Clock size={48} className="text-orange-200" />
                  <div>
                      <h3 className="font-bold text-xl uppercase">Aberto Hoje</h3>
                      <p className="text-orange-100">Das 18h às 23:30h</p>
                  </div>
              </div>
              <div className="flex items-center gap-4">
                  <Star size={48} className="text-orange-200" />
                  <div>
                      <h3 className="font-bold text-xl uppercase">Avaliação 4.9/5</h3>
                      <p className="text-orange-100">Mais de 2.000 pedidos entregues</p>
                  </div>
              </div>
              <button className="bg-white text-orange-600 px-8 py-3 rounded-xl font-bold text-lg hover:bg-orange-50 transition-colors">
                  Fazer Pedido
              </button>
          </div>
      </section>

      <footer className="py-8 bg-zinc-950 text-center text-zinc-500 text-sm">
          <p>© 2024 Pizza Express. Desenvolvido por Avance Agency.</p>
      </footer>
    </div>
  );
};

export default DemoDelivery;
