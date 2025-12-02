
import React, { useEffect, useState } from 'react';
import { AppMode } from '../../types';
import { 
    ArrowLeft, MapPin, Star, Shield, Play, Instagram, 
    Phone, ChevronDown, Menu, X, CheckCircle, 
    Award, Activity, Smile, Sparkles, ArrowRight
} from 'lucide-react';
import { getAgencySettings } from '../../services/storageService';

interface DemoProps {
  setMode: (mode: AppMode) => void;
}

const DemoLPPlastic: React.FC<DemoProps> = ({ setMode }) => {
  const settings = getAgencySettings();
  const content = settings.demoContent['landing-high-conversion'];
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Theme Constants
  const colors = {
      primary: '#0f172a', 
      secondary: '#334155', 
      accent: '#c0a062', 
      light: '#f8fafc', 
      white: '#ffffff'
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const address = "Av. Brasil, 1500 - Jardins, São Paulo";
  // Standard Google Maps Embed URL
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  const scrollTo = (id: string) => {
      setMobileMenuOpen(false);
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen font-sans text-slate-800 bg-white selection:bg-[#c0a062] selection:text-white">
      {/* Admin Navigation Back */}
      <div className="fixed top-24 left-4 z-[100] lg:top-4">
        <button 
            onClick={() => setMode(AppMode.PUBLIC_HOME)} 
            className="bg-white/90 backdrop-blur text-slate-800 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 border border-slate-200 shadow-xl hover:scale-105 transition-transform hover:bg-slate-50 cursor-pointer"
        >
            <ArrowLeft size={16} /> Voltar ao Portfólio
        </button>
      </div>

      {/* WhatsApp Floating Button */}
      <a 
        href="#"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform animate-bounce-slow flex items-center justify-center"
        aria-label="Falar no WhatsApp"
      >
        <Phone size={28} fill="currentColor" />
      </a>

      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-6'}`}>
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
              <div className={`text-2xl font-serif font-bold tracking-tight ${scrolled ? 'text-slate-900' : 'text-slate-900 lg:text-white'}`}>
                  Dr. Renato <span style={{ color: colors.accent }}>Oliveira</span>
              </div>

              {/* Desktop Menu */}
              <div className={`hidden md:flex items-center gap-8 ${scrolled ? 'text-slate-600' : 'text-slate-300'}`}>
                  <button onClick={() => scrollTo('sobre')} className="text-sm font-medium hover:text-[#c0a062] transition-colors">O Especialista</button>
                  <button onClick={() => scrollTo('procedimentos')} className="text-sm font-medium hover:text-[#c0a062] transition-colors">Procedimentos</button>
                  <button onClick={() => scrollTo('clinica')} className="text-sm font-medium hover:text-[#c0a062] transition-colors">A Clínica</button>
                  <button onClick={() => scrollTo('contato')} className="px-6 py-2.5 rounded-none font-bold text-sm uppercase tracking-widest transition-all text-white hover:opacity-90 shadow-lg" style={{ backgroundColor: colors.accent }}>
                      Agendar Consulta
                  </button>
              </div>

              {/* Mobile Toggle */}
              <button className={`md:hidden ${scrolled ? 'text-slate-900' : 'text-slate-900 lg:text-white'}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                  {mobileMenuOpen ? <X /> : <Menu />}
              </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
              <div className="absolute top-full left-0 right-0 bg-white border-t border-slate-100 p-6 flex flex-col gap-4 md:hidden shadow-2xl animate-fade-in">
                  <button onClick={() => scrollTo('sobre')} className="text-left text-slate-800 font-bold py-2 border-b border-slate-50">O Especialista</button>
                  <button onClick={() => scrollTo('procedimentos')} className="text-left text-slate-800 font-bold py-2 border-b border-slate-50">Procedimentos</button>
                  <button onClick={() => scrollTo('clinica')} className="text-left text-slate-800 font-bold py-2 border-b border-slate-50">A Clínica</button>
                  <button className="w-full text-white py-4 rounded-none font-bold uppercase tracking-widest" style={{ backgroundColor: colors.accent }}>
                      Agendar no WhatsApp
                  </button>
              </div>
          )}
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
             <img 
                src="https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=1600" 
                alt="Consultório" 
                className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
                <div className="inline-flex items-center gap-3 px-4 py-1 border border-white/20 bg-white/5 backdrop-blur rounded-full text-white text-sm font-semibold uppercase tracking-widest mb-8">
                   <Star size={12} fill={colors.accent} color={colors.accent} /> Cirurgia Plástica & Reconstrutora
                </div>
                
                <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-8 leading-tight drop-shadow-xl">
                    Excelência e <br/>
                    <span style={{ color: colors.accent }}>Sofisticação</span> em <br/>
                    cada detalhe.
                </h1>
                
                <p className="text-lg text-slate-300 mb-12 max-w-lg font-light leading-relaxed border-l-2 pl-6" style={{ borderColor: colors.accent }}>
                    Dr. Renato Oliveira. CRM 123456 / RQE 1234. <br/>
                    Membro Titular da Sociedade Brasileira de Cirurgia Plástica.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6">
                    <button 
                        onClick={() => scrollTo('contato')}
                        className="text-white px-10 py-4 rounded-none font-bold text-lg shadow-xl transition-all hover:-translate-y-1 flex items-center justify-center gap-3"
                        style={{ backgroundColor: colors.accent }}
                    >
                        Agendar Avaliação <ArrowRight size={20}/>
                    </button>
                    <button className="px-10 py-4 rounded-none font-bold text-lg text-white border border-white/20 hover:bg-white/5 transition-all flex items-center justify-center gap-3">
                        <Play size={20} fill="currentColor" /> Tour Virtual
                    </button>
                </div>
            </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
            <ChevronDown size={32} />
        </div>
      </header>

      {/* Authority Section */}
      <section id="sobre" className="py-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="relative">
                  <div className="absolute top-4 -left-4 w-full h-full border-2" style={{ borderColor: colors.accent }}></div>
                  <img 
                    src="https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=800" 
                    alt="Dr. Renato" 
                    className="relative z-10 w-full h-[600px] object-cover grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl"
                  />
              </div>
              
              <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: colors.accent }}>
                      <Award size={18} /> Sobre o Especialista
                  </h4>
                  <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-8 leading-tight">
                      A arte da medicina aliada à ciência da beleza.
                  </h2>
                  <p className="text-slate-600 mb-6 text-lg leading-relaxed">
                      Dr. Renato Oliveira é referência em cirurgia plástica moderna. Com formação nos principais centros da Europa e EUA, traz para o Brasil técnicas que priorizam a naturalidade.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-6 mb-10">
                      <div className="flex items-start gap-3">
                          <CheckCircle size={24} style={{ color: colors.accent }} />
                          <div>
                              <h5 className="font-bold text-slate-900">Membro SBCP</h5>
                              <p className="text-xs text-slate-500">Sociedade Bras. de Cirurgia Plástica</p>
                          </div>
                      </div>
                      <div className="flex items-start gap-3">
                          <CheckCircle size={24} style={{ color: colors.accent }} />
                          <div>
                              <h5 className="font-bold text-slate-900">Membro ASPS</h5>
                              <p className="text-xs text-slate-500">American Society of Plastic Surgeons</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* Procedures */}
      <section id="procedimentos" className="py-24 px-6 bg-slate-50">
          <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">Procedimentos</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                      {
                          title: 'Contorno Corporal',
                          desc: 'Lipoescultura HD, Abdominoplastia e Mamoplastia.',
                          img: 'https://images.pexels.com/photos/3762466/pexels-photo-3762466.jpeg?auto=compress&cs=tinysrgb&w=800',
                          icon: Activity
                      },
                      {
                          title: 'Face & Pescoço',
                          desc: 'Deep Plane Facelift e Rinoplastia Estruturada.',
                          img: 'https://images.pexels.com/photos/5069432/pexels-photo-5069432.jpeg?auto=compress&cs=tinysrgb&w=800',
                          icon: Smile
                      },
                      {
                          title: 'Minimamente Invasivos',
                          desc: 'Preenchimentos, Botox e Bioestimuladores.',
                          img: 'https://images.pexels.com/photos/3997993/pexels-photo-3997993.jpeg?auto=compress&cs=tinysrgb&w=800',
                          icon: Sparkles
                      }
                  ].map((proc, i) => (
                      <div key={i} className="group cursor-pointer bg-white rounded-none shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden">
                          <div className="h-80 overflow-hidden relative">
                              <img src={proc.img} alt={proc.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                          </div>
                          <div className="p-8 relative">
                              <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4">{proc.title}</h3>
                              <p className="text-slate-500 leading-relaxed mb-6">{proc.desc}</p>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 bg-white">
          <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-serif font-bold text-center text-slate-900 mb-12">Perguntas Frequentes</h2>
              <div className="space-y-4">
                  {[
                      { q: 'Quanto custa uma cirurgia plástica?', a: 'Por determinação do CRM, valores só podem ser passados após avaliação médica presencial, pois cada caso é único.' },
                      { q: 'Aceitam convênio médico?', a: 'Trabalhamos com sistema de reembolso para consultas e parte hospitalar, dependendo do seu plano.' },
                      { q: 'Como é a recuperação?', a: 'Utilizamos protocolos modernos de recuperação rápida (R24R) para minimizar o tempo de repouso.' },
                      { q: 'Onde é o consultório?', a: `Estamos localizados nos Jardins, em São Paulo. Endereço: ${address}.` }
                  ].map((item, i) => (
                      <div key={i} className="border border-slate-200 bg-slate-50">
                          <button 
                            onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                            className="w-full flex justify-between items-center p-6 text-left hover:bg-slate-100 transition-colors"
                          >
                              <span className="font-bold text-slate-800">{item.q}</span>
                              <ChevronDown className={`transition-transform duration-300 ${activeFaq === i ? 'rotate-180' : ''}`} />
                          </button>
                          {activeFaq === i && (
                              <div className="px-6 pb-6 text-slate-600 leading-relaxed animate-fade-in">
                                  {item.a}
                              </div>
                          )}
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* Contact & Map */}
      <section id="contato" className="py-24 px-6 bg-slate-900 text-white border-t border-slate-800">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                  <h2 className="text-4xl font-serif font-bold mb-8">Agende sua Consulta</h2>
                  <p className="text-slate-400 mb-10 leading-relaxed">
                      Dê o primeiro passo para sua transformação. Nossa equipe de concierge está pronta para te atender com exclusividade.
                  </p>
                  
                  <div className="space-y-6 mb-10">
                      <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#c0a062] text-slate-900">
                              <Phone size={24} />
                          </div>
                          <div>
                              <p className="text-xs uppercase tracking-widest text-[#c0a062] font-bold">WhatsApp & Telefone</p>
                              <p className="text-xl font-bold">(11) 99999-9999</p>
                          </div>
                      </div>
                      <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#c0a062] text-slate-900">
                              <MapPin size={24} />
                          </div>
                          <div>
                              <p className="text-xs uppercase tracking-widest text-[#c0a062] font-bold">Endereço</p>
                              <p className="text-lg font-bold">{address}</p>
                          </div>
                      </div>
                  </div>
              </div>

              <div className="h-[500px] w-full bg-slate-800 border border-slate-700 relative group overflow-hidden rounded-xl">
                  <iframe 
                      src={mapSrc}
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      className="grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                  ></iframe>
              </div>
          </div>
      </section>

      <footer className="py-8 bg-black text-center text-slate-600 text-xs uppercase tracking-widest border-t border-slate-900">
          <p>© 2024 Dr. Renato Oliveira. CRM 123456. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default DemoLPPlastic;
