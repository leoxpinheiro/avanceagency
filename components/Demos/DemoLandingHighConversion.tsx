
import React, { useEffect, useState } from 'react';
import { AppMode } from '../../types';
import { ArrowLeft, Check, MapPin, Scale, Award, ChevronDown, Play, Heart, MessageCircle, Instagram, Star, BadgeCheck, Phone, ArrowRight, Menu, X, Clock, CheckCircle, Smartphone, Shield } from 'lucide-react';
import { getAgencySettings } from '../../services/storageService';

interface DemoProps {
  setMode: (mode: AppMode) => void;
}

const DemoLandingHighConversion: React.FC<DemoProps> = ({ setMode }) => {
  const settings = getAgencySettings();
  const content = settings.demoContent['landing-high-conversion'];
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Hardcoded theme color 'amber' for high conversion demo to prevent JIT issues
  const theme = content.theme;
  const address = content.address || "Av. Paulista, 1000 - São Paulo";
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  const scrollToSection = (id: string) => {
      const el = document.getElementById(id);
      if(el) {
          el.scrollIntoView({ behavior: 'smooth' });
          setMobileMenuOpen(false);
      }
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-200 selection:bg-amber-600 selection:text-white pb-20">
      {/* Admin Navigation Back - FIXED Z-INDEX */}
      <div className="fixed top-24 left-4 z-[100] lg:top-4">
        <button 
            onClick={() => setMode(AppMode.PUBLIC_HOME)} 
            className="bg-black/50 hover:bg-black/70 backdrop-blur text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 border border-white/10 transition-all shadow-xl hover:scale-105 cursor-pointer"
        >
            <ArrowLeft size={16} /> Voltar ao Painel
        </button>
      </div>

      {/* FLOATING WHATSAPP (CRUCIAL FOR CONVERSION) */}
      <div className="fixed bottom-6 right-6 z-50 animate-bounce-slow">
        <button className="bg-[#25D366] hover:bg-[#20bd5a] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center border-4 border-slate-900/50">
            <Phone size={32} fill="currentColor" />
        </button>
      </div>

      {/* STICKY NAVBAR */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/90 backdrop-blur-md py-3 shadow-lg border-b border-slate-800' : 'bg-transparent py-6'}`}>
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
              <div className="flex items-center gap-2 text-white font-serif font-bold text-xl">
                  <Scale className="text-amber-500" />
                  <span>{content.texts.brandName || 'Dr. Silva'}</span>
              </div>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center gap-8">
                  <button onClick={() => scrollToSection('sobre')} className="text-sm font-medium hover:text-white text-slate-400 transition-colors">Sobre</button>
                  <button onClick={() => scrollToSection('diferenciais')} className="text-sm font-medium hover:text-white text-slate-400 transition-colors">Diferenciais</button>
                  <button onClick={() => scrollToSection('local')} className="text-sm font-medium hover:text-white text-slate-400 transition-colors">Localização</button>
                  <button className="bg-amber-600 hover:bg-amber-500 text-white px-6 py-2 rounded-lg font-bold text-sm shadow-lg hover:-translate-y-0.5 transition-all">
                      {content.texts.ctaButton || 'Agendar Agora'}
                  </button>
              </div>

              {/* Mobile Toggle */}
              <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                  {mobileMenuOpen ? <X /> : <Menu />}
              </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
              <div className="absolute top-full left-0 right-0 bg-slate-900 border-b border-slate-800 p-6 flex flex-col gap-4 md:hidden shadow-2xl animate-slide-up">
                  <button onClick={() => scrollToSection('sobre')} className="text-left text-white font-bold py-2">Sobre Nós</button>
                  <button onClick={() => scrollToSection('diferenciais')} className="text-left text-white font-bold py-2">Diferenciais</button>
                  <button onClick={() => scrollToSection('local')} className="text-left text-white font-bold py-2">Localização</button>
                  <button className="w-full bg-amber-600 text-white py-3 rounded-lg font-bold">
                      Agendar Consulta
                  </button>
              </div>
          )}
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
             <img src={content.images.hero} alt="Background" className="w-full h-full object-cover opacity-40 scale-105 animate-pulse-slow" />
             <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/40"></div>
             {/* Gradient Overlay for Text Readability */}
             <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 to-transparent"></div>
        </div>
        
        <div className="max-w-7xl w-full mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
                <div className="inline-flex items-center gap-2 px-4 py-1 border border-amber-500/50 bg-amber-500/10 rounded-full text-amber-400 text-sm font-semibold uppercase tracking-widest mb-8">
                    <Star size={12} fill="currentColor" /> Advocacia de Alta Performance
                </div>
                
                <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-8 leading-tight drop-shadow-lg">
                    {content.heroTitle}
                </h1>
                
                <p className="text-xl text-slate-300 mb-12 max-w-lg font-light leading-relaxed border-l-2 border-slate-700 pl-6">
                    {content.heroSubtitle}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6">
                    <button className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white px-10 py-5 rounded-lg font-bold text-lg shadow-xl shadow-amber-900/40 transition-all hover:-translate-y-1 flex items-center justify-center gap-3">
                        {content.texts.ctaButton || 'Agendar Consultoria'} <ArrowRight size={20}/>
                    </button>
                    <button className="px-10 py-5 rounded-lg font-bold text-lg text-white border border-white/10 hover:bg-white/5 transition-all flex items-center justify-center gap-3">
                        <Play size={20} fill="currentColor" /> Ver Apresentação
                    </button>
                </div>
                
                <div className="mt-12 flex items-center gap-4 text-sm text-slate-500">
                     <div className="flex -space-x-3">
                         {[1,2,3,4].map(i => (
                             <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-950 bg-slate-800 flex items-center justify-center overflow-hidden">
                                 <img src={`https://images.unsplash.com/photo-${1500000000000 + i}?auto=format&fit=crop&q=80&w=100`} className="w-full h-full object-cover"/>
                             </div>
                         ))}
                     </div>
                     <p>+500 Casos resolvidos com sucesso.</p>
                </div>
            </div>
            
            {/* Hero Card / Form Simulation */}
            <div className="hidden lg:block bg-slate-900/50 backdrop-blur-md p-8 rounded-2xl border border-slate-800 shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-slate-800 overflow-hidden border-2 border-amber-500">
                        <img src={content.images.about || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200"} className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-lg">{content.texts.brandName}</h3>
                        <div className="flex text-amber-500 gap-1">
                            <Star size={14} fill="currentColor" />
                            <Star size={14} fill="currentColor" />
                            <Star size={14} fill="currentColor" />
                            <Star size={14} fill="currentColor" />
                            <Star size={14} fill="currentColor" />
                        </div>
                    </div>
                </div>
                <p className="text-slate-300 italic mb-6">"Compromisso absoluto com a defesa dos seus interesses. Nossa equipe está pronta para atuar no seu caso imediatamente."</p>
                <div className="space-y-3">
                    <div className="flex items-center gap-3 text-slate-400 text-sm">
                        <CheckCircle size={16} className="text-emerald-500" /> Atendimento 24h para urgências
                    </div>
                    <div className="flex items-center gap-3 text-slate-400 text-sm">
                        <CheckCircle size={16} className="text-emerald-500" /> Sigilo absoluto garantido
                    </div>
                    <div className="flex items-center gap-3 text-slate-400 text-sm">
                        <CheckCircle size={16} className="text-emerald-500" /> Especialistas renomados
                    </div>
                </div>
            </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500 animate-bounce">
            <ChevronDown size={32} />
        </div>
      </header>

      {/* Trust Badges */}
      <section className="py-12 bg-slate-900 border-y border-slate-800">
          <div className="max-w-7xl mx-auto px-6">
              <p className="text-center text-slate-500 text-xs font-bold uppercase tracking-widest mb-8">Reconhecimento e Mídia</p>
              <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                  {['Forbes', 'Exame', 'Valor Econômico', 'CNN Brasil', 'Estadão'].map((logo, i) => (
                      <div key={i} className="text-2xl font-serif font-bold text-slate-400 hover:text-white transition-colors cursor-default">{logo}</div>
                  ))}
              </div>
          </div>
      </section>

      {/* METRICS SECTION (New) */}
      <section className="py-20 bg-slate-950">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                  { value: '15+', label: 'Anos de Experiência' },
                  { value: '2k+', label: 'Casos Atendidos' },
                  { value: '98%', label: 'Taxa de Sucesso' },
                  { value: '24/7', label: 'Suporte Jurídico' }
              ].map((stat, i) => (
                  <div key={i} className="text-center p-6 border border-slate-800 rounded-2xl hover:border-amber-500/30 transition-colors bg-slate-900/50">
                      <div className="text-4xl md:text-5xl font-bold text-amber-500 mb-2 font-serif">{stat.value}</div>
                      <div className="text-slate-400 text-sm font-bold uppercase tracking-wider">{stat.label}</div>
                  </div>
              ))}
          </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-24 px-6 bg-slate-950 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-600/5 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
              <div className="order-2 md:order-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-amber-500/10 text-amber-500 text-xs font-bold uppercase tracking-wider mb-6">
                      <Award size={16} /> Sobre o Escritório
                  </div>
                  <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">
                      Não entregamos apenas serviços, entregamos <span className="text-amber-500">soluções definitivas.</span>
                  </h2>
                  <p className="text-slate-400 mb-8 leading-relaxed text-lg border-l-4 border-slate-800 pl-6">
                      Nossa abordagem é estratégica, focada em resultados de alto impacto e segurança absoluta. Não somos apenas prestadores de serviço, somos parceiros do seu crescimento e proteção.
                  </p>
                  
                  <div className="grid grid-cols-1 gap-4 mb-8">
                      {['Estratégias Personalizadas para cada caso', 'Equipe Multidisciplinar Sênior', 'Relatórios de Performance Mensais', 'Atendimento Preferencial e Sigiloso'].map((item, i) => (
                          <div key={i} className="flex items-center gap-4 text-slate-300 bg-slate-900/50 p-4 rounded-xl border border-slate-800/50 hover:border-amber-500/30 transition-colors">
                              <div className="bg-amber-500/10 p-2 rounded-full text-amber-500"><Check size={18} /></div>
                              <span className="font-medium">{item}</span>
                          </div>
                      ))}
                  </div>
                  
                  <button className="text-amber-500 font-bold hover:text-white transition-colors flex items-center gap-2 group">
                      Conheça nossa história <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
                  </button>
              </div>
              
              <div className="relative order-1 md:order-2 group">
                  <div className="absolute -inset-4 border-2 border-amber-500/20 rounded-2xl group-hover:border-amber-500/40 transition-colors duration-500 rotate-2 group-hover:rotate-0"></div>
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                       <img src={content.images.about || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800"} alt="About" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                       <div className={`absolute bottom-6 left-6 right-6`}>
                           <div className="bg-slate-900/90 backdrop-blur p-6 rounded-xl border-l-4 border-amber-500">
                                <p className="text-white font-bold text-xl mb-1">{content.texts.brandName}</p>
                                <p className="text-slate-400 text-xs uppercase tracking-wider font-bold">Excelência desde 2005</p>
                           </div>
                       </div>
                  </div>
              </div>
          </div>
      </section>

      {/* Differentials */}
      <section id="diferenciais" className="py-24 px-6 bg-slate-900">
          <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">Nossos Diferenciais</h2>
                  <p className="text-slate-400 max-w-2xl mx-auto">O que nos coloca à frente no mercado e garante a satisfação dos nossos clientes.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                   {[
                       { title: 'Agilidade Processual', desc: 'Processos otimizados com tecnologia proprietária para respostas rápidas.', icon: Clock },
                       { title: 'Inteligência Jurídica', desc: 'Uso de dados e jurimetria para decisões assertivas.', icon: Star },
                       { title: 'Transparência Total', desc: 'Acesso total às informações do seu caso em tempo real via app.', icon: Smartphone },
                       { title: 'Sigilo Absoluto', desc: 'Proteção de dados bancários e informações sensíveis.', icon: Shield },
                       { title: 'Foco no Resultado', desc: 'Honorários baseados em êxito na maioria das causas.', icon: Award },
                       { title: 'Experiência', desc: 'Sócios com mais de 20 anos de atuação em grandes bancas.', icon: BadgeCheck }
                   ].map((item, i) => (
                       <div key={i} className="bg-slate-950 p-8 border border-slate-800 rounded-2xl hover:border-amber-500/50 transition-all hover:-translate-y-2 group relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-colors"></div>
                            <div className="w-14 h-14 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-500 mb-6 group-hover:scale-110 transition-transform shadow-lg">
                                <item.icon size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-500 transition-colors">{item.title}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                       </div>
                   ))}
              </div>
          </div>
      </section>

      {/* Gallery / Results Section */}
      <section className="py-24 px-6 bg-slate-950 border-y border-slate-900">
          <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                  <div>
                      <h2 className="text-3xl font-serif font-bold text-white mb-4">Estrutura & Resultados</h2>
                      <p className="text-slate-400 max-w-xl">
                          Um ambiente preparado para garantir a excelência. Conheça nosso espaço e alguns dos nossos certificados.
                      </p>
                  </div>
                  <button className="text-white border border-slate-700 px-6 py-3 rounded-lg hover:bg-slate-800 transition-colors">Ver Galeria Completa</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Image 1 - Large */}
                  <div className="md:col-span-2 h-80 rounded-2xl overflow-hidden relative group">
                      <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Office"/>
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-end p-6">
                          <div>
                              <p className="text-white font-bold text-lg">Sede Principal</p>
                              <p className="text-slate-300 text-sm">Av. Paulista</p>
                          </div>
                      </div>
                  </div>
                  {/* Image 2 */}
                  <div className="h-80 rounded-2xl overflow-hidden relative group">
                      <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Meeting"/>
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-end p-6">
                           <div>
                              <p className="text-white font-bold text-lg">Salas de Reunião</p>
                              <p className="text-slate-300 text-sm">Privacidade Total</p>
                          </div>
                      </div>
                  </div>
                  {/* Image 3 */}
                  <div className="h-64 rounded-2xl overflow-hidden relative group">
                      <img src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Law"/>
                      <div className="absolute bottom-4 left-4 bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded">Certificado ISO 9001</div>
                  </div>
                  {/* Image 4 */}
                  <div className="md:col-span-2 h-64 rounded-2xl overflow-hidden relative group">
                      <img src="https://images.unsplash.com/photo-1507679799938-d991b90cd046?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Team"/>
                       <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                          <button className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors">
                              <Play fill="currentColor" size={24} className="ml-1"/>
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-slate-900">
          <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-serif font-bold text-center text-white mb-16">O que nossos clientes dizem</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                      { name: 'Carlos Mendes', role: 'CEO TechCorp', text: 'A equipe transformou nossa visão em realidade. Competência inigualável em processos complexos de fusão.' },
                      { name: 'Ana Souza', role: 'Diretora Grupo Varejo', text: 'Atendimento impecável e estratégias que realmente funcionam. Recuperamos valores que considerávamos perdidos.' },
                      { name: 'Roberto Lima', role: 'Construtora Forte', text: 'Segurança e confiança total. São parceiros estratégicos do nosso jurídico interno há 10 anos.' }
                  ].map((t, i) => (
                      <div key={i} className="bg-slate-950 p-8 border border-slate-800 rounded-2xl relative hover:border-amber-500/30 transition-colors hover:-translate-y-1 duration-300 shadow-xl">
                          <div className="text-amber-500 text-6xl font-serif absolute -top-4 left-6 opacity-20">"</div>
                          <div className="flex text-amber-500 mb-4">
                              <Star size={14} fill="currentColor"/>
                              <Star size={14} fill="currentColor"/>
                              <Star size={14} fill="currentColor"/>
                              <Star size={14} fill="currentColor"/>
                              <Star size={14} fill="currentColor"/>
                          </div>
                          <p className="text-slate-300 mb-6 italic pt-2 relative z-10 leading-relaxed">{t.text}</p>
                          <div className="flex items-center gap-4 border-t border-slate-800 pt-6">
                              <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center font-bold text-amber-500 border border-slate-800">{t.name.charAt(0)}</div>
                              <div>
                                  <h4 className="text-white font-bold text-sm">{t.name}</h4>
                                  <p className="text-slate-500 text-xs uppercase tracking-wider">{t.role}</p>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-20 px-6 bg-slate-950 border-t border-slate-900">
           <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-serif font-bold text-center text-white mb-12">Perguntas Frequentes</h2>
                <div className="space-y-4">
                    {[
                        'Como funciona a primeira consulta?',
                        'Quais as formas de pagamento aceitas?',
                        'O atendimento é em todo o território nacional?',
                        'Existe sigilo garantido em contrato?'
                    ].map((q, i) => (
                        <details key={i} className="group bg-slate-900 border border-slate-800 rounded-xl overflow-hidden cursor-pointer">
                            <summary className="flex justify-between items-center p-5 font-medium text-slate-200 hover:text-white transition-colors">
                                {q}
                                <ChevronDown className="text-slate-500 transition-transform group-open:rotate-180" />
                            </summary>
                            <div className="px-5 pb-5 text-slate-400 text-sm leading-relaxed border-t border-slate-800 pt-4">
                                Nossa equipe entrará em contato para entender sua demanda inicial e agendar uma reunião com o especialista adequado. Todo o processo é protegido por sigilo absoluto.
                            </div>
                        </details>
                    ))}
                </div>
           </div>
      </section>

      {/* Footer & Map (FIXED MAP) */}
      <section id="local" className="py-20 px-6 bg-slate-900 border-t border-slate-800">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                  <h2 className="text-4xl font-serif font-bold text-white mb-8">Onde estamos</h2>
                  <div className="space-y-6 mb-10">
                      <div className="flex items-start gap-4">
                          <div className="p-3 bg-amber-500/10 rounded-lg text-amber-500">
                              <MapPin size={24} />
                          </div>
                          <div>
                              <h4 className="text-white font-bold text-lg">Sede Principal</h4>
                              <p className="text-slate-400">{content.address}</p>
                          </div>
                      </div>
                      <div className="flex items-start gap-4">
                          <div className="p-3 bg-amber-500/10 rounded-lg text-amber-500">
                              <Clock size={24} />
                          </div>
                          <div>
                              <h4 className="text-white font-bold text-lg">Horário de Atendimento</h4>
                              <p className="text-slate-400">Segunda a Sexta: 08h às 19h</p>
                              <p className="text-slate-400">Plantão Criminal: 24h</p>
                          </div>
                      </div>
                  </div>
                  
                  <button className="bg-amber-600 hover:bg-amber-500 text-white px-12 py-5 rounded-lg font-bold text-lg shadow-xl hover:-translate-y-1 transition-all w-full md:w-auto flex items-center justify-center gap-3">
                      <Instagram size={20} /> Siga no Instagram
                  </button>
              </div>
              
              {/* FIXED IFRAME MAP CONTAINER */}
              <div className="h-[400px] w-full bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-2xl relative group">
                  <iframe 
                      src={mapSrc}
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      className="grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                  ></iframe>
                  {/* Map Overlay to match theme until hover */}
                  <div className="absolute inset-0 bg-indigo-900/20 pointer-events-none group-hover:opacity-0 transition-opacity duration-700"></div>
              </div>
          </div>
          
          <div className="mt-20 pt-8 border-t border-slate-800 text-center">
              <p className="text-slate-600 text-sm">© 2024 {content.texts.brandName}. Todos os direitos reservados. OAB/SP 123.456.</p>
          </div>
      </section>
    </div>
  );
};

export default DemoLandingHighConversion;
