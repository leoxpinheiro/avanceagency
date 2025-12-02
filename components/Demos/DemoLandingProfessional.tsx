
import React, { useEffect } from 'react';
import { AppMode } from '../../types';
import { ArrowLeft, CheckCircle, Star, Phone, Smile, Clock, MapPin } from 'lucide-react';
import { getAgencySettings } from '../../services/storageService';

interface DemoProps {
  setMode: (mode: AppMode) => void;
}

const DemoLandingProfessional: React.FC<DemoProps> = ({ setMode }) => {
  const settings = getAgencySettings();
  const content = settings.demoContent['landing-professional'];
  
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
                    {content.texts.brandName || 'Sorriso Prime'}
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                    {content.heroTitle}
                </h1>
                <p className="text-lg text-slate-500 mb-8 leading-relaxed">
                    {content.heroSubtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <button className="bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-cyan-500/30 transition-all hover:-translate-y-1">
                        {content.texts.ctaButton || 'Agendar Avaliação'}
                    </button>
                    <div className="flex items-center gap-2 px-4 py-2">
                        <div className="flex -space-x-2">
                            {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full bg-cyan-200 border-2 border-white"></div>)}
                        </div>
                        <span className="text-sm text-slate-500 font-medium">+500 Clientes Felizes</span>
                    </div>
                </div>
            </div>
            <div className="relative animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="absolute inset-0 bg-cyan-200 rounded-full blur-3xl opacity-30 transform translate-x-10 translate-y-10"></div>
                <img 
                    src={content.images.hero || "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=1200"} 
                    alt="Hero" 
                    className="relative z-10 rounded-[2.5rem] shadow-2xl w-full object-cover h-[500px]"
                />
            </div>
        </div>
      </header>

      {/* Benefits - 3 Items (Simples) */}
      <section className="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                      { icon: Smile, title: 'Atendimento Humanizado', text: 'Conforto e atenção em cada detalhe do seu tratamento.' },
                      { icon: Star, title: 'Tecnologia Avançada', text: 'Equipamentos modernos para resultados precisos.' },
                      { icon: Clock, title: 'Horários Flexíveis', text: 'Agenda estendida para atender sua rotina.' }
                  ].map((item, i) => (
                      <div key={i} className="p-8 rounded-3xl bg-slate-50 hover:bg-cyan-50 transition-colors group border border-slate-100 hover:-translate-y-1 duration-300 h-full flex flex-col">
                          <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-cyan-500 mb-6 group-hover:scale-110 transition-transform">
                              <item.icon size={28} />
                          </div>
                          <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                          <p className="text-slate-500 leading-relaxed flex-1">{item.text}</p>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* Services List */}
      <section className="py-20 px-6 bg-slate-50">
          <div className="max-w-6xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Nossos Serviços</h2>
              <p className="text-slate-500 mb-12">Qualidade e excelência em cada procedimento.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-left">
                  {['Atendimento Especializado', 'Procedimentos Modernos', 'Consultoria Técnica', 'Suporte Dedicado', 'Ambiente Seguro', 'Garantia de Qualidade'].map((service, i) => (
                      <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                          <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600 shrink-0">
                              <CheckCircle size={20} />
                          </div>
                          <span className="font-bold text-slate-700">{service}</span>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* Simple About */}
      <section className="py-20 px-6 bg-white">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1">
                  <img src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800" className="rounded-2xl shadow-lg hover:scale-[1.02] transition-transform duration-500" alt="Consultório" />
              </div>
              <div className="flex-1">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6">Sobre Nós</h2>
                  <p className="text-slate-500 mb-6 leading-relaxed">
                      Focados em oferecer a melhor experiência para nossos clientes. Nossa missão é entregar resultados reais com um atendimento próximo e transparente.
                  </p>
                  <div className="flex items-center gap-2 text-slate-600 font-medium">
                      <MapPin size={20} className="text-cyan-500" />
                      Centro da Cidade, nº 100
                  </div>
              </div>
          </div>
      </section>

      {/* CTA Footer */}
      <footer className="py-16 px-6 bg-cyan-600 text-white text-center">
          <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Pronto para começar?</h2>
              <p className="text-cyan-100 mb-10 text-lg">
                  Clique no botão abaixo e fale diretamente conosco pelo WhatsApp.
              </p>
              <button className="bg-white text-cyan-600 px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-cyan-50 transition-all transform hover:scale-105 flex items-center gap-2 mx-auto">
                  <Phone size={20} /> Falar no WhatsApp
              </button>
              <p className="mt-8 text-sm text-cyan-200">© 2024 {content.texts.brandName}. Todos os direitos reservados.</p>
          </div>
      </footer>
    </div>
  );
};

export default DemoLandingProfessional;
