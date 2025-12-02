
import React, { useEffect, useState } from 'react';
import { AppMode } from '../../types';
import { 
    ArrowLeft, Sparkles, Heart, Star, MapPin, Instagram, Users, 
    CheckCircle, Phone, ArrowRight, Menu, X, ChevronDown, Clock, 
    Calendar, Play 
} from 'lucide-react';

interface DemoProps {
  setMode: (mode: AppMode) => void;
}

const DemoLPAesthetic: React.FC<DemoProps> = ({ setMode }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const colors = {
      primary: '#e11d48', // Rose 600
      secondary: '#fff1f2', // Rose 50
      text: '#4a044e', // Fuchsia 950
      accent: '#fb7185', // Rose 400
  };

  const address = "Rua das Magnólias, 800 - Jardins, SP";
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="min-h-screen font-sans text-slate-800 bg-[#fffbfc] selection:bg-rose-200 selection:text-rose-900">
      {/* Admin Navigation Back - FIXED Z-INDEX to 100 */}
      <div className="fixed top-24 left-4 z-[100] lg:top-4">
        <button 
            onClick={() => setMode(AppMode.PUBLIC_HOME)} 
            className="bg-white/80 backdrop-blur text-rose-900 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 border border-rose-100 shadow-xl hover:scale-105 transition-transform cursor-pointer"
        >
            <ArrowLeft size={16} /> Voltar ao Portfólio
        </button>
      </div>

       {/* WhatsApp Floating */}
       <a 
        href="#"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform animate-bounce-slow flex items-center justify-center border-4 border-white"
        aria-label="Falar no WhatsApp"
      >
        <Phone size={28} fill="currentColor" />
      </a>

      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'}`}>
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
              <div className="flex items-center gap-2 font-serif text-2xl font-bold tracking-tight text-rose-950">
                  <Sparkles size={24} className="text-rose-500" />
                  <span>Lumière <span className="font-sans text-sm uppercase tracking-widest font-bold text-rose-400">Estética</span></span>
              </div>

              {/* Desktop Menu */}
              <div className={`hidden md:flex items-center gap-8 ${scrolled ? 'text-slate-600' : 'text-slate-800'}`}>
                  <button onClick={() => scrollTo('tratamentos')} className="text-sm font-medium hover:text-rose-500 transition-colors">Tratamentos</button>
                  <button onClick={() => scrollTo('espaco')} className="text-sm font-medium hover:text-rose-500 transition-colors">O Espaço</button>
                  <button onClick={() => scrollTo('depoimentos')} className="text-sm font-medium hover:text-rose-500 transition-colors">Depoimentos</button>
                  <button onClick={() => scrollTo('contato')} className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-lg hover:-translate-y-0.5 transition-all">
                      Agendar Horário
                  </button>
              </div>

              {/* Mobile Toggle */}
              <button className="md:hidden text-rose-950" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                  {mobileMenuOpen ? <X /> : <Menu />}
              </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
              <div className="absolute top-full left-0 right-0 bg-white border-t border-slate-100 p-6 flex flex-col gap-4 md:hidden shadow-2xl animate-fade-in">
                  <button onClick={() => scrollTo('tratamentos')} className="text-left font-bold text-rose-950 py-2 border-b border-slate-50">Tratamentos</button>
                  <button onClick={() => scrollTo('espaco')} className="text-left font-bold text-rose-950 py-2 border-b border-slate-50">O Espaço</button>
                  <button onClick={() => scrollTo('depoimentos')} className="text-left font-bold text-rose-950 py-2 border-b border-slate-50">Depoimentos</button>
                  <button className="w-full bg-rose-500 text-white py-3 rounded-full font-bold">
                      Agendar no WhatsApp
                  </button>
              </div>
          )}
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
             <img 
                src="https://images.pexels.com/photos/3762466/pexels-photo-3762466.jpeg?auto=compress&cs=tinysrgb&w=1600" 
                className="w-full h-full object-cover opacity-90" 
                alt="Hero Background"
                onError={(e) => e.currentTarget.src = 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=1600'}
             />
             <div className="absolute inset-0 bg-white/40"></div>
             <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/50 to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
                <span className="inline-block text-rose-500 font-bold tracking-[0.2em] uppercase text-xs mb-4">Bem-estar e Sofisticação</span>
                <h1 className="text-5xl md:text-7xl font-serif text-rose-950 mb-6 leading-tight">
                    Revele a sua <br/>
                    <span className="italic text-rose-500">melhor versão</span>
                </h1>
                <p className="text-xl text-slate-600 mb-10 font-light max-w-lg leading-relaxed">
                    Um refúgio urbano dedicado à beleza e ao autocuidado. Tratamentos exclusivos com tecnologia de ponta e um toque humano inigualável.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <button onClick={() => scrollTo('contato')} className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-4 rounded-full font-bold uppercase tracking-wide text-sm shadow-xl shadow-rose-200 transition-all hover:-translate-y-1 flex items-center justify-center gap-2">
                        Agendar Experiência <ArrowRight size={16} />
                    </button>
                    <button onClick={() => scrollTo('tratamentos')} className="bg-white hover:bg-rose-50 text-rose-900 px-8 py-4 rounded-full font-bold uppercase tracking-wide text-sm shadow-md border border-rose-100 transition-all flex items-center justify-center gap-2">
                        Conhecer Menu
                    </button>
                </div>
            </div>
            
            {/* Hero Gallery/Features */}
            <div className="hidden md:grid grid-cols-2 gap-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                 <div className="space-y-4 mt-12">
                     <img src="https://images.pexels.com/photos/5069432/pexels-photo-5069432.jpeg?auto=compress&cs=tinysrgb&w=800" className="rounded-2xl shadow-lg w-full h-64 object-cover hover:scale-105 transition-transform duration-700" alt="Facial" />
                     <div className="bg-white/80 backdrop-blur p-6 rounded-2xl shadow-sm border border-rose-100">
                         <Star className="text-rose-400 mb-2" />
                         <h3 className="font-serif font-bold text-rose-900 text-lg">5 Estrelas</h3>
                         <p className="text-xs text-slate-500">Avaliação média no Google</p>
                     </div>
                 </div>
                 <div className="space-y-4">
                     <div className="bg-rose-500 text-white p-6 rounded-2xl shadow-lg flex flex-col justify-between h-48">
                         <Sparkles size={32} className="opacity-80" />
                         <div>
                             <h3 className="font-serif font-bold text-2xl">Tecnologia</h3>
                             <p className="text-rose-100 text-sm">Equipamentos de última geração</p>
                         </div>
                     </div>
                     <img src="https://images.pexels.com/photos/3997993/pexels-photo-3997993.jpeg?auto=compress&cs=tinysrgb&w=800" className="rounded-2xl shadow-lg w-full h-64 object-cover hover:scale-105 transition-transform duration-700" alt="Massage" />
                 </div>
            </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-rose-300 animate-bounce">
            <ChevronDown size={32} />
        </div>
      </header>

      {/* Intro */}
      <section className="py-24 px-6 bg-white">
          <div className="max-w-4xl mx-auto text-center">
              <span className="text-rose-500 text-xs font-bold uppercase tracking-widest block mb-4">Nossa Filosofia</span>
              <h2 className="text-3xl md:text-5xl font-serif text-rose-950 mb-8 leading-tight">
                  Beleza que vem de dentro, <br/>cuidada por fora.
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed mb-12">
                  Acreditamos que cada pessoa possui uma beleza única. Nossa missão é realçar seus traços naturais através de protocolos personalizados, unindo ciência, tecnologia e bem-estar em um ambiente acolhedor.
              </p>
              <div className="flex justify-center gap-12">
                  <div className="text-center">
                      <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center text-rose-500 mx-auto mb-4">
                          <Users size={28} />
                      </div>
                      <h3 className="font-bold text-rose-900">Equipe Especialista</h3>
                  </div>
                  <div className="text-center">
                      <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center text-rose-500 mx-auto mb-4">
                          <Heart size={28} />
                      </div>
                      <h3 className="font-bold text-rose-900">Atendimento Humanizado</h3>
                  </div>
                  <div className="text-center">
                      <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center text-rose-500 mx-auto mb-4">
                          <CheckCircle size={28} />
                      </div>
                      <h3 className="font-bold text-rose-900">Resultados Reais</h3>
                  </div>
              </div>
          </div>
      </section>

      {/* Services Grid */}
      <section id="tratamentos" className="py-24 px-6 bg-[#fffbfc]">
          <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                  <span className="text-rose-500 text-xs font-bold uppercase tracking-widest block mb-4">Menu de Experiências</span>
                  <h2 className="text-4xl font-serif text-rose-950">Nossos Tratamentos</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                      { 
                          title: 'Facial Glow', 
                          desc: 'Protocolos para renovação celular e luminosidade.',
                          img: 'https://images.pexels.com/photos/3762875/pexels-photo-3762875.jpeg?auto=compress&cs=tinysrgb&w=800', 
                          items: ['Limpeza de Pele Premium', 'Peeling de Diamante', 'Hidratação com Ouro'] 
                      },
                      { 
                          title: 'Body Contour', 
                          desc: 'Tecnologia para remodelar suas curvas.',
                          img: 'https://images.pexels.com/photos/3865560/pexels-photo-3865560.jpeg?auto=compress&cs=tinysrgb&w=800', 
                          items: ['Drenagem Método Renata França', 'Radiofrequência', 'Massagem Modeladora'] 
                      },
                      { 
                          title: 'Laser & Tech', 
                          desc: 'Soluções definitivas e avançadas.',
                          img: 'https://images.pexels.com/photos/5938589/pexels-photo-5938589.jpeg?auto=compress&cs=tinysrgb&w=800', 
                          items: ['Depilação a Laser Soprano', 'Lavieen (BB Laser)', 'Ultraformer III'] 
                      }
                  ].map((cat, i) => (
                      <div key={i} className="group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                          <div className="h-72 overflow-hidden relative">
                              <img src={cat.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={cat.title} onError={(e) => e.currentTarget.src = 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=800'} />
                              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                          </div>
                          <div className="p-8">
                              <h3 className="text-2xl font-serif text-rose-950 mb-2 group-hover:text-rose-500 transition-colors">{cat.title}</h3>
                              <p className="text-slate-500 mb-6 text-sm leading-relaxed">{cat.desc}</p>
                              <div className="space-y-3 mb-8">
                                  {cat.items.map((item, idx) => (
                                      <div key={idx} className="flex items-center gap-3 text-sm text-slate-700">
                                          <div className="w-1.5 h-1.5 rounded-full bg-rose-300"></div>
                                          {item}
                                      </div>
                                  ))}
                              </div>
                              <button className="text-rose-500 font-bold text-xs uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
                                  Saiba Mais <ArrowRight size={14} />
                              </button>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* The Space (Carousel Simulation) */}
      <section id="espaco" className="py-24 px-6 bg-rose-950 text-white overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                  <span className="text-rose-300 text-xs font-bold uppercase tracking-widest block mb-4">O Espaço</span>
                  <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">Um oásis no meio da cidade.</h2>
                  <p className="text-rose-100/80 text-lg mb-10 leading-relaxed font-light">
                      Cada detalhe da Lumière foi pensado para desconectar você do mundo lá fora. Aromaterapia, sons relaxantes e um design biofílico que acolhe.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-8 mb-10">
                       <div>
                           <div className="text-3xl font-serif text-rose-300 mb-1">500m²</div>
                           <p className="text-xs text-rose-100 uppercase tracking-widest">De puro bem-estar</p>
                       </div>
                       <div>
                           <div className="text-3xl font-serif text-rose-300 mb-1">VIP</div>
                           <p className="text-xs text-rose-100 uppercase tracking-widest">Salas Privativas</p>
                       </div>
                  </div>

                  <button className="bg-white text-rose-950 px-8 py-4 rounded-full font-bold uppercase tracking-wide text-sm hover:bg-rose-100 transition-colors">
                      Tour Virtual
                  </button>
              </div>

              <div className="relative">
                   <div className="grid grid-cols-2 gap-4">
                       <img src="https://images.pexels.com/photos/6620925/pexels-photo-6620925.jpeg?auto=compress&cs=tinysrgb&w=800" className="rounded-2xl w-full h-64 object-cover translate-y-8" alt="Spa" onError={(e) => e.currentTarget.src = 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800'} />
                       <img src="https://images.pexels.com/photos/6663459/pexels-photo-6663459.jpeg?auto=compress&cs=tinysrgb&w=800" className="rounded-2xl w-full h-64 object-cover" alt="Relax" onError={(e) => e.currentTarget.src = 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=800'} />
                   </div>
                   {/* Decorative Circle */}
                   <div className="absolute -top-10 -right-10 w-32 h-32 border border-rose-500/30 rounded-full animate-spin-slow"></div>
              </div>
          </div>
      </section>

      {/* Testimonials */}
      <section id="depoimentos" className="py-24 px-6 bg-white">
          <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-serif text-rose-950 mb-16">Histórias de Transformação</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                      { name: 'Patrícia K.', text: 'Ambiente maravilhoso e profissionais super atenciosas. Me senti uma rainha!' },
                      { name: 'Sofia M.', text: 'Fiz o protocolo de redução de medidas e amei o resultado em apenas 1 mês.' },
                      { name: 'Beatriz L.', text: 'A melhor limpeza de pele que já fiz. Minha pele nunca esteve tão radiante.' }
                  ].map((d, i) => (
                      <div key={i} className="p-8 bg-rose-50/50 rounded-3xl flex flex-col items-center justify-center text-center hover:bg-rose-50 transition-colors duration-500">
                          <div className="flex text-amber-400 mb-6 gap-1">
                              <Star size={14} fill="currentColor"/>
                              <Star size={14} fill="currentColor"/>
                              <Star size={14} fill="currentColor"/>
                              <Star size={14} fill="currentColor"/>
                              <Star size={14} fill="currentColor"/>
                          </div>
                          <p className="text-neutral-600 italic mb-6 font-serif text-lg">"{d.text}"</p>
                          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-serif font-bold text-rose-500 shadow-sm mb-2">
                              {d.name.charAt(0)}
                          </div>
                          <p className="font-bold text-xs uppercase tracking-widest text-rose-900">{d.name}</p>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 bg-[#fffbfc]">
           <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-serif text-center text-rose-950 mb-12">Perguntas Frequentes</h2>
                <div className="space-y-4">
                    {[
                        { q: 'Quais formas de pagamento aceitas?', a: 'Aceitamos cartões de crédito em até 10x, Pix com 5% de desconto e dinheiro.' },
                        { q: 'Preciso passar por avaliação?', a: 'Sim! Para garantir sua segurança e melhores resultados, realizamos uma avaliação gratuita antes de qualquer procedimento.' },
                        { q: 'Vocês têm estacionamento?', a: 'Sim, possuímos estacionamento gratuito com manobrista no local.' },
                        { q: 'Qual a validade dos pacotes?', a: 'Nossos pacotes têm validade de 6 meses a partir da data da compra.' }
                    ].map((item, i) => (
                        <div key={i} className="bg-white border border-rose-100 rounded-2xl overflow-hidden">
                             <button 
                                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                                className="w-full flex justify-between items-center p-6 text-left hover:bg-rose-50/50 transition-colors"
                             >
                                 <span className="font-bold text-rose-900">{item.q}</span>
                                 <ChevronDown className={`text-rose-400 transition-transform duration-300 ${activeFaq === i ? 'rotate-180' : ''}`} />
                             </button>
                             {activeFaq === i && (
                                 <div className="px-6 pb-6 text-slate-600 leading-relaxed animate-fade-in border-t border-rose-50 pt-4">
                                     {item.a}
                                 </div>
                             )}
                        </div>
                    ))}
                </div>
           </div>
      </section>

      {/* Footer & Contact */}
      <section id="contato" className="py-24 px-6 bg-white border-t border-rose-50">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
               <div>
                   <h2 className="text-4xl font-serif text-rose-950 mb-8">Venha nos visitar</h2>
                   <p className="text-slate-500 mb-10">Agende seu horário e permita-se viver essa experiência.</p>
                   
                   <div className="space-y-6 mb-10">
                       <div className="flex items-center gap-4 group cursor-pointer">
                           <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-colors">
                               <MapPin size={24}/>
                           </div>
                           <div>
                               <p className="text-xs uppercase tracking-widest text-rose-400 font-bold">Endereço</p>
                               <p className="text-lg text-slate-700">{address}</p>
                           </div>
                       </div>
                       <div className="flex items-center gap-4 group cursor-pointer">
                           <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-colors">
                               <Instagram size={24}/>
                           </div>
                           <div>
                               <p className="text-xs uppercase tracking-widest text-rose-400 font-bold">Instagram</p>
                               <p className="text-lg text-slate-700">@esteticalumiere</p>
                           </div>
                       </div>
                       <div className="flex items-center gap-4 group cursor-pointer">
                           <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-colors">
                               <Clock size={24}/>
                           </div>
                           <div>
                               <p className="text-xs uppercase tracking-widest text-rose-400 font-bold">Horário</p>
                               <p className="text-lg text-slate-700">Seg a Sáb: 09h às 20h</p>
                           </div>
                       </div>
                   </div>

                   <button className="bg-rose-500 hover:bg-rose-600 text-white px-10 py-4 rounded-full font-bold uppercase tracking-wide text-sm shadow-xl transition-all w-full md:w-auto">
                       Falar com Concierge
                   </button>
               </div>

               <div className="h-[500px] w-full bg-rose-50 rounded-3xl overflow-hidden shadow-2xl relative group">
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
      
      <footer className="py-8 bg-white border-t border-slate-50 text-center text-slate-400 text-xs uppercase tracking-widest">
          © 2024 Lumière Estética. Todos os direitos reservados.
      </footer>
    </div>
  );
};

export default DemoLPAesthetic;
