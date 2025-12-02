
import React, { useEffect } from 'react';
import { AppMode } from '../../types';
import { ArrowLeft, CheckCircle, Clock, MapPin, Phone, Smile, Star, Calendar } from 'lucide-react';

interface DemoProps {
  setMode: (mode: AppMode) => void;
}

const DemoLPDentist: React.FC<DemoProps> = ({ setMode }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 selection:bg-cyan-200">
      {/* Navigation Back */}
      <div className="fixed top-4 left-4 z-50">
        <button 
            onClick={() => setMode(AppMode.PUBLIC_HOME)} 
            className="bg-white/90 backdrop-blur text-slate-600 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg border border-slate-100 hover:scale-105 transition-transform"
        >
            <ArrowLeft size={16} /> Voltar ao Portfólio
        </button>
      </div>

      {/* Hero Section */}
      <header className="relative pt-32 pb-24 px-6 bg-gradient-to-b from-cyan-50 to-white overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
                <div className="inline-block px-4 py-1.5 bg-cyan-100 text-cyan-700 rounded-full text-sm font-bold mb-6">
                    Clínica Odonto Saúde
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                    Seu sorriso saudável e bonito <span className="text-cyan-600">começa aqui.</span>
                </h1>
                <p className="text-lg text-slate-500 mb-8 leading-relaxed">
                    Tratamentos modernos, sem dor e com tecnologia de ponta para você voltar a sorrir com confiança. Agende sua avaliação hoje.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <button className="bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-cyan-500/30 transition-all hover:-translate-y-1">
                        Agendar Agora
                    </button>
                </div>
            </div>
            <div className="relative animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="absolute inset-0 bg-cyan-200 rounded-full blur-3xl opacity-30 transform translate-x-10 translate-y-10"></div>
                <img 
                    src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200" 
                    alt="Dentist" 
                    className="relative z-10 rounded-[2.5rem] shadow-2xl w-full object-cover h-[500px]"
                />
            </div>
        </div>
      </header>

      {/* Benefits */}
      <section className="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                      { icon: Smile, title: 'Atendimento Humanizado', text: 'Conforto e atenção em cada detalhe do seu tratamento.' },
                      { icon: Star, title: 'Tecnologia Avançada', text: 'Equipamentos modernos para resultados precisos.' },
                      { icon: Clock, title: 'Horários Flexíveis', text: 'Agenda estendida para atender sua rotina.' }
                  ].map((item, i) => (
                      <div key={i} className="p-8 rounded-3xl bg-slate-50 hover:bg-cyan-50 transition-colors group border border-slate-100 hover:-translate-y-1 duration-300">
                          <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-cyan-600 mb-6 group-hover:scale-110 transition-transform">
                              <item.icon size={28} />
                          </div>
                          <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                          <p className="text-slate-500">{item.text}</p>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* Services List */}
      <section className="py-20 px-6 bg-slate-50">
          <div className="max-w-6xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Nossos Tratamentos</h2>
              <p className="text-slate-500 mb-12">Cuidamos de você e da sua família.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-left">
                  {['Limpeza e Profilaxia', 'Clareamento Dental', 'Implantes', 'Ortodontia (Aparelho)', 'Tratamento de Canal', 'Estética Dental'].map((service, i) => (
                      <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                          <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600">
                              <CheckCircle size={20} />
                          </div>
                          <span className="font-bold text-slate-700">{service}</span>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* About */}
      <section className="py-20 px-6 bg-white">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1">
                  <img src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800" className="rounded-2xl shadow-lg hover:scale-[1.02] transition-transform duration-500" alt="Consultório" />
              </div>
              <div className="flex-1">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6">Sobre a Clínica</h2>
                  <p className="text-slate-500 mb-6 leading-relaxed">
                      Fundada há 10 anos, a Odonto Saúde é referência na região. Nossa missão é entregar resultados reais com um atendimento próximo e transparente, devolvendo a autoestima de nossos pacientes.
                  </p>
                  <div className="flex items-center gap-2 text-slate-600 font-medium">
                      <MapPin size={20} className="text-cyan-600" />
                      Av. Central, 500 - Centro
                  </div>
              </div>
          </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-slate-50">
           <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Dúvidas Frequentes</h2>
                <div className="space-y-4">
                    {[
                        'Vocês aceitam convênios?',
                        'Qual o valor do clareamento?',
                        'Atendem crianças?',
                        'Fazem atendimento de emergência?'
                    ].map((q, i) => (
                        <div key={i} className="p-5 bg-white border border-slate-200 rounded-lg flex justify-between items-center cursor-pointer hover:border-cyan-300 transition-colors">
                            <span className="text-slate-700 font-medium">{q}</span>
                            <div className="text-slate-400">+</div>
                        </div>
                    ))}
                </div>
           </div>
      </section>

      {/* CTA Footer */}
      <footer className="py-16 px-6 bg-cyan-600 text-white text-center">
          <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Agende sua consulta</h2>
              <p className="text-cyan-100 mb-10 text-lg">
                  Clique no botão abaixo e fale diretamente conosco pelo WhatsApp.
              </p>
              <button className="bg-white text-cyan-600 px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-cyan-50 transition-all transform hover:scale-105 flex items-center gap-2 mx-auto">
                  <Phone size={20} /> Falar no WhatsApp
              </button>
              <p className="mt-8 text-sm text-cyan-200">© 2024 Clínica Odonto Saúde. Todos os direitos reservados.</p>
          </div>
      </footer>
    </div>
  );
};

export default DemoLPDentist;
