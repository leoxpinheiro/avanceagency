
import React, { useState, useEffect } from 'react';
import { AppMode, SaaSService, SaaSIdentity, SaaSAppointment, SaaSData } from '../../types';
import LoginModal from '../Auth/LoginModal';
import { getSaaSData, saveSaaSData } from '../../services/storageService';
import { generateMarketingCopy } from '../../services/geminiService';
import { 
    ArrowLeft, Calendar, Scissors, Settings,
    Smartphone, Menu, Clock, Dog, 
    Wallet, CheckCircle, Lock, MapPin, X, ChevronRight,
    Palette, Trash2, Plus, Edit3, DollarSign, Upload, Copy, Send, Megaphone,
    Monitor, ArrowRight, Sparkles
} from 'lucide-react';

interface DemoProps {
  setMode: (mode: AppMode) => void;
  niche: 'nails' | 'pet';
}

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

const DemoSaaSStart: React.FC<DemoProps> = ({ setMode, niche }) => {
  const [viewMode, setViewMode] = useState<'client' | 'admin'>('client');
  const [showLogin, setShowLogin] = useState(false);
  const [activeTab, setActiveTab] = useState('agenda'); 
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Storage State
  const [data, setData] = useState<SaaSData | null>(null);

  // Marketing AI State
  const [marketingPrompt, setMarketingPrompt] = useState('');
  const [marketingResult, setMarketingResult] = useState('');
  const [isGeneratingCopy, setIsGeneratingCopy] = useState(false);

  // Load Data on Mount
  useEffect(() => {
      const saasData = getSaaSData(niche);
      setData(saasData);
  }, [niche]);

  const saveData = (newData: SaaSData) => {
      setData(newData);
      saveSaaSData(niche, newData);
  };

  // Booking Wizard State
  // Steps: 0=Hidden, 1=Service, 2=Date, 3=Time, 4=Info, 5=Confirm
  const [bookingStep, setBookingStep] = useState(0); 
  const [bookingData, setBookingData] = useState<any>({});
  const [selectedDate, setSelectedDate] = useState(new Date());

  // CRUD STATES
  const [isEditingService, setIsEditingService] = useState(false);
  const [newService, setNewService] = useState<Partial<SaaSService>>({});
  
  // SETTINGS TABS
  const [settingsTab, setSettingsTab] = useState<'identity' | 'system'>('identity');

  if (!data) return <div className="min-h-screen flex items-center justify-center bg-slate-50"><div className="animate-spin w-8 h-8 border-4 border-rose-500 rounded-full border-t-transparent"></div></div>;

  const { identity, services, appointments } = data;

  // -- LOGIC HELPERS --

  const generateTimeSlots = (date: Date, serviceDuration: number) => {
      const slots = [];
      // Safe parsing of openingHours
      const [startStr, endStr] = (identity.openingHours || "09:00 - 18:00").split(' - ');
      const [startH, startM] = startStr.split(':').map(Number);
      const [endH, endM] = endStr.split(':').map(Number);
      
      let currentMin = startH * 60 + startM;
      const endMin = endH * 60 + endM;
      const now = new Date();
      const isToday = date.toDateString() === now.toDateString();

      while (currentMin + serviceDuration <= endMin) {
          const h = Math.floor(currentMin / 60);
          const m = currentMin % 60;
          
          const slotTime = new Date(date);
          slotTime.setHours(h, m, 0, 0);

          // Check past time if today
          if (isToday && slotTime < now) {
               currentMin += (identity.slotDuration || 30);
               continue;
          }

          const timeString = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
          
          // Check collision
          const isBlocked = appointments.some(a => {
              const apptDate = new Date(a.date);
              return apptDate.toDateString() === date.toDateString() && a.time === timeString && a.status !== 'cancelled';
          });

          if (!isBlocked) {
              slots.push(timeString);
          }
          currentMin += (identity.slotDuration || 30);
      }
      return slots;
  };

  const handleBookingSubmit = () => {
      const newAppt: SaaSAppointment = {
          id: Date.now().toString(),
          client: bookingData.name,
          clientPhone: bookingData.phone,
          service: bookingData.service.name,
          serviceId: bookingData.service.id,
          price: bookingData.service.price,
          duration: bookingData.service.duration,
          time: bookingData.time,
          date: selectedDate,
          paymentMethod: 'Whatsapp/Local',
          status: 'pending'
      };
      
      const updatedAppointments = [...appointments, newAppt];
      saveData({ ...data, appointments: updatedAppointments });
      setBookingStep(5); 

      // WhatsApp Message Generator
      const msg = `*Novo Agendamento Confirmado!* ✅
      
👤 *Cliente:* ${bookingData.name}
📱 *Telefone:* ${bookingData.phone}
💅 *Serviço:* ${bookingData.service.name}
💰 *Valor:* ${formatCurrency(bookingData.service.price)}
📅 *Data:* ${selectedDate.toLocaleDateString()}
⏰ *Horário:* ${bookingData.time}

_Enviado via App_`;
      
      setTimeout(() => {
          window.open(`https://wa.me/${identity.whatsapp?.replace(/\D/g,'')}?text=${encodeURIComponent(msg)}`, '_blank');
      }, 1500);
  };

  const handleBlockTime = (time: string) => {
      if(!confirm(`Bloquear horário ${time}?`)) return;
      const newBlock: SaaSAppointment = {
          id: `block-${Date.now()}`,
          client: 'BLOQUEIO / PAUSA',
          clientPhone: '',
          service: 'Bloqueio',
          price: 0,
          duration: identity.slotDuration || 30,
          time: time,
          date: new Date(),
          status: 'blocked'
      };
      saveData({ ...data, appointments: [...appointments, newBlock] });
  };

  const handleSaveService = () => {
      if (!newService.name || !newService.price) return;
      
      let updatedServices = [...services];
      if (newService.id) {
          updatedServices = updatedServices.map(s => s.id === newService.id ? { ...s, ...newService } as SaaSService : s);
      } else {
          updatedServices.push({
              id: Date.now().toString(),
              active: true,
              image: 'https://via.placeholder.com/150',
              ...newService
          } as SaaSService);
      }
      saveData({ ...data, services: updatedServices });
      setIsEditingService(false);
      setNewService({});
  };

  const handleGenerateCopy = async () => {
      if(!marketingPrompt) return;
      setIsGeneratingCopy(true);
      const text = await generateMarketingCopy(marketingPrompt);
      setMarketingResult(text);
      setIsGeneratingCopy(false);
  };

  // Finance Calc
  const today = new Date();
  const revenueDay = appointments.filter(a => new Date(a.date).toDateString() === today.toDateString() && a.status !== 'cancelled').reduce((acc, curr) => acc + curr.price, 0);
  const revenueMonth = appointments.filter(a => new Date(a.date).getMonth() === today.getMonth() && a.status !== 'cancelled').reduce((acc, curr) => acc + curr.price, 0);
  
  // Weekly Chart Simulation
  const weeklyData = [0,0,0,0,0,0,0]; // Last 7 days
  appointments.forEach(a => {
      // Simple logic for demo visualization
      const diff = Math.floor((today.getTime() - new Date(a.date).getTime()) / (1000 * 3600 * 24));
      if(diff >= 0 && diff < 7) weeklyData[6-diff] += a.price;
  });
  const maxVal = Math.max(...weeklyData, 100);

  // -- CLIENT VIEW --

  if (viewMode === 'client') {
      return (
          <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
              {showLogin && <LoginModal onSuccess={() => { setViewMode('admin'); setShowLogin(false); }} onClose={() => setShowLogin(false)} />}

              <header className="relative bg-white shadow-sm z-10">
                  <div className="h-64 md:h-80 w-full relative group overflow-hidden">
                      <img 
                        src={identity.cover} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                        alt="Cover" 
                        onError={(e) => e.currentTarget.src = 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=1200&auto=format&fit=crop&q=80'}
                      />
                      <div className="absolute inset-0 bg-black/20"></div>
                      <div className="absolute top-0 w-full p-4 flex justify-between items-center z-20">
                           <button 
                                onClick={() => setMode(AppMode.PUBLIC_HOME)} 
                                className="bg-white/90 backdrop-blur px-4 py-2 rounded-full text-sm font-bold shadow-md flex items-center gap-2 hover:bg-white transition-colors"
                            >
                                <ArrowLeft size={16}/> Voltar
                            </button>
                            <button 
                                onClick={() => setShowLogin(true)} 
                                className="bg-slate-900/80 backdrop-blur text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 hover:bg-slate-900 transition-colors"
                            >
                                <Lock size={12}/> Área Admin
                            </button>
                      </div>
                  </div>
                  
                  <div className="max-w-6xl mx-auto px-6 relative -mt-16 pb-8 flex flex-col md:flex-row items-end gap-6">
                      <div className="w-32 h-32 rounded-2xl bg-white shadow-xl p-1 flex items-center justify-center overflow-hidden flex-shrink-0">
                           <div className="w-full h-full rounded-xl flex items-center justify-center text-white font-bold text-4xl" style={{ backgroundColor: identity.primaryColor }}>
                                {identity.name.charAt(0)}
                           </div>
                      </div>
                      <div className="flex-1 mb-2">
                          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">{identity.name}</h1>
                          <p className="text-slate-500 font-medium">{identity.slogan || 'Serviços de Excelência'}</p>
                          <div className="flex flex-wrap gap-4 mt-3 text-sm text-slate-600">
                              <span className="flex items-center gap-1"><MapPin size={14}/> {identity.address || 'Endereço não informado'}</span>
                              <span className="flex items-center gap-1"><Clock size={14}/> {identity.openingHours}</span>
                          </div>
                      </div>
                      <div className="w-full md:w-auto mb-2">
                          <button 
                            onClick={() => document.getElementById('services-section')?.scrollIntoView({behavior: 'smooth'})}
                            className="w-full md:w-auto px-8 py-3 text-white font-bold rounded-xl shadow-lg hover:-translate-y-1 transition-transform flex items-center justify-center gap-2"
                            style={{ backgroundColor: identity.primaryColor }}
                          >
                              Agendar Horário <ChevronRight size={18}/>
                          </button>
                      </div>
                  </div>
              </header>

              <main id="services-section" className="max-w-6xl mx-auto px-6 py-12">
                  <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
                       {niche === 'nails' ? <Scissors size={24} style={{ color: identity.primaryColor }} /> : <Dog size={24} style={{ color: identity.primaryColor }} />} Nossos Serviços
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {services.filter(s => s.active).sort((a,b) => (a.order||0) - (b.order||0)).map(service => (
                          <div key={service.id} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 hover:shadow-xl transition-all group cursor-pointer flex flex-col h-full" onClick={() => { setBookingData({...bookingData, service}); setBookingStep(2); }}>
                              <div className="h-48 rounded-xl overflow-hidden relative mb-4 bg-slate-100">
                                  <img 
                                    src={service.image || 'https://via.placeholder.com/300'} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                    alt={service.name} 
                                  />
                                  <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold shadow-sm flex items-center gap-1">
                                      <Clock size={10}/> {service.duration} min
                                  </div>
                              </div>
                              <div className="flex-1 flex flex-col justify-between">
                                  <div>
                                      <h3 className="font-bold text-lg text-slate-900 leading-tight mb-1">{service.name}</h3>
                                      {service.description && <p className="text-xs text-slate-500 line-clamp-2 mb-2">{service.description}</p>}
                                  </div>
                                  <div className="flex justify-between items-end mt-4 border-t border-slate-50 pt-3">
                                      <div className="text-lg font-bold" style={{ color: identity.primaryColor }}>{formatCurrency(service.price)}</div>
                                      <span className="text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full group-hover:bg-slate-900 group-hover:text-white transition-colors">Agendar</span>
                                  </div>
                              </div>
                          </div>
                      ))}
                  </div>
              </main>

              <footer className="bg-slate-900 text-slate-400 py-10 text-center border-t border-slate-800 mt-12">
                  <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-6">
                      <div className="text-sm">
                          <p className="text-white font-bold mb-1">{identity.name}</p>
                          <p>{identity.address}</p>
                          <p className="mt-4 text-xs opacity-60">Criado por Avance Agency</p>
                      </div>
                  </div>
              </footer>

              {/* MOBILE-FIRST BOOKING WIZARD */}
              {bookingStep > 0 && (
                  <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-fade-in">
                      <div className="bg-white w-full sm:max-w-md sm:rounded-3xl rounded-t-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-slide-up">
                          
                          {/* Wizard Header */}
                          <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                              <div>
                                  <h3 className="font-bold text-lg text-slate-900">Agendamento</h3>
                                  <div className="flex gap-1 mt-1">
                                      {[1,2,3,4].map(step => (
                                          <div key={step} className={`h-1 w-8 rounded-full transition-colors ${bookingStep > step ? 'bg-emerald-500' : bookingStep === step ? 'bg-rose-500' : 'bg-slate-200'}`} style={{ backgroundColor: bookingStep === step ? identity.primaryColor : '' }}></div>
                                      ))}
                                  </div>
                              </div>
                              <button onClick={() => setBookingStep(0)} className="p-2 hover:bg-slate-200 rounded-full transition-colors"><X size={20} className="text-slate-500"/></button>
                          </div>

                          <div className="p-6 overflow-y-auto flex-1">
                              {/* Step 2: Date Selection */}
                              {bookingStep === 2 && (
                                  <div className="text-center">
                                      <h4 className="text-xl font-bold text-slate-800 mb-2">Quando você pode?</h4>
                                      <p className="text-sm text-slate-500 mb-6">Selecione o melhor dia</p>
                                      
                                      <div className="inline-block border border-slate-200 rounded-2xl p-4 shadow-sm bg-white w-full">
                                          <div className="flex justify-between items-center mb-4 px-2">
                                              <button className="p-1 hover:bg-slate-100 rounded" onClick={() => setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate()-7)))}><ArrowLeft size={16}/></button>
                                              <span className="font-bold text-slate-700 capitalize">{selectedDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}</span>
                                              <button className="p-1 hover:bg-slate-100 rounded" onClick={() => setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate()+7)))}><ChevronRight size={16}/></button>
                                          </div>
                                          <div className="grid grid-cols-7 gap-1 md:gap-2 mb-2 text-xs font-bold text-slate-400 text-center">
                                              {['D','S','T','Q','Q','S','S'].map(d => <span key={d}>{d}</span>)}
                                          </div>
                                          <div className="grid grid-cols-7 gap-1 md:gap-2">
                                              {[...Array(14)].map((_, i) => {
                                                  const d = new Date();
                                                  d.setDate(d.getDate() + i);
                                                  const isSelected = d.toDateString() === selectedDate.toDateString();
                                                  const isPast = d < new Date(new Date().setHours(0,0,0,0));
                                                  return (
                                                      <button 
                                                        key={i}
                                                        disabled={isPast}
                                                        onClick={() => setSelectedDate(d)}
                                                        className={`aspect-square rounded-full text-sm font-medium flex items-center justify-center transition-all ${isSelected ? 'text-white shadow-lg scale-110' : isPast ? 'opacity-20 cursor-not-allowed' : 'hover:bg-slate-100 text-slate-600'}`}
                                                        style={{ backgroundColor: isSelected ? identity.primaryColor : '' }}
                                                      >
                                                          {d.getDate()}
                                                      </button>
                                                  )
                                              })}
                                          </div>
                                      </div>
                                      <button onClick={() => setBookingStep(3)} className="w-full mt-8 bg-slate-900 text-white py-4 rounded-xl font-bold hover:scale-[1.02] transition-transform flex items-center justify-center gap-2">
                                          Continuar <ArrowRight size={18}/>
                                      </button>
                                  </div>
                              )}

                              {/* Step 3: Time Selection */}
                              {bookingStep === 3 && (
                                  <div>
                                      <h4 className="text-xl font-bold text-slate-800 mb-2">Horário</h4>
                                      <p className="text-slate-500 text-sm mb-6">Para {selectedDate.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                                      
                                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                          {generateTimeSlots(selectedDate, bookingData.service.duration).map(time => (
                                              <button 
                                                key={time}
                                                onClick={() => { setBookingData({...bookingData, time}); setBookingStep(4); }}
                                                className="py-3 rounded-lg border border-slate-200 font-bold text-slate-600 hover:text-white hover:border-transparent transition-all text-sm hover:shadow-md"
                                                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = identity.primaryColor; e.currentTarget.style.color = 'white'; }}
                                                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#475569'; }}
                                              >
                                                  {time}
                                              </button>
                                          ))}
                                          {generateTimeSlots(selectedDate, bookingData.service.duration).length === 0 && (
                                              <div className="col-span-full text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                                                  <p className="text-slate-400 font-medium">Sem horários para esta data.</p>
                                              </div>
                                          )}
                                      </div>
                                  </div>
                              )}

                              {/* Step 4: Info */}
                              {bookingStep === 4 && (
                                  <div className="space-y-4">
                                      <h4 className="text-xl font-bold text-slate-800 mb-6">Finalizar Agendamento</h4>
                                      
                                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6 flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-lg bg-white border border-slate-100 flex items-center justify-center shadow-sm">
                                                <Calendar size={20} style={{ color: identity.primaryColor }}/>
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-800 text-sm">{bookingData.service.name}</p>
                                                <p className="text-xs text-slate-500">{selectedDate.toLocaleDateString()} às {bookingData.time}</p>
                                                <p className="text-xs font-bold mt-1" style={{ color: identity.primaryColor }}>{formatCurrency(bookingData.service.price)}</p>
                                            </div>
                                      </div>

                                      <div>
                                          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nome Completo</label>
                                          <input 
                                            className="w-full p-4 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-slate-200 transition-all font-medium"
                                            value={bookingData.name || ''}
                                            onChange={e => setBookingData({...bookingData, name: e.target.value})}
                                            placeholder="Ex: Maria Silva"
                                          />
                                      </div>
                                      <div>
                                          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">WhatsApp</label>
                                          <input 
                                            className="w-full p-4 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-slate-200 transition-all font-medium"
                                            value={bookingData.phone || ''}
                                            onChange={e => setBookingData({...bookingData, phone: e.target.value})}
                                            placeholder="(11) 99999-9999"
                                          />
                                      </div>
                                      <button onClick={handleBookingSubmit} disabled={!bookingData.name || !bookingData.phone} className="w-full mt-4 bg-[#25D366] text-white py-4 rounded-xl font-bold disabled:opacity-50 shadow-lg shadow-green-500/20 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2">
                                          Confirmar e Enviar <Send size={18}/>
                                      </button>
                                  </div>
                              )}

                              {/* Step 5: Success */}
                              {bookingStep === 5 && (
                                  <div className="text-center py-8">
                                      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-6 animate-bounce">
                                          <CheckCircle size={48} />
                                      </div>
                                      <h2 className="text-2xl font-bold text-slate-900 mb-2">Agendamento Enviado!</h2>
                                      <p className="text-slate-500 mb-8 text-sm max-w-xs mx-auto leading-relaxed">
                                          Os detalhes foram enviados para o WhatsApp do estabelecimento. Aguarde a confirmação.
                                      </p>
                                      <button onClick={() => setBookingStep(0)} className="text-slate-900 font-bold underline text-sm hover:text-slate-700">
                                          Voltar ao início
                                      </button>
                                  </div>
                              )}
                          </div>
                      </div>
                  </div>
              )}
          </div>
      );
  }

  // === ADMIN VIEW ===
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex">
        {/* Admin Sidebar */}
        <aside className={`fixed inset-y-0 left-0 z-30 w-72 bg-white border-r border-slate-200 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shadow-lg" style={{ backgroundColor: identity.primaryColor }}>
                    {identity.name.charAt(0)}
                </div>
                <div>
                    <h1 className="font-bold text-slate-900 leading-tight truncate w-32">{identity.name}</h1>
                    <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-500 uppercase font-bold tracking-wider">SaaS Solo</span>
                </div>
            </div>
            <nav className="p-4 space-y-1">
                {[
                    { id: 'agenda', label: 'Agenda', icon: Calendar },
                    { id: 'finance', label: 'Financeiro', icon: Wallet },
                    { id: 'services', label: 'Serviços', icon: Scissors },
                    { id: 'marketing', label: 'Marketing IA', icon: Megaphone },
                    { id: 'settings', label: 'Configurações', icon: Settings },
                ].map((item) => (
                    <button
                        key={item.id}
                        onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-medium text-sm ${
                            activeTab === item.id 
                            ? 'bg-slate-900 text-white font-bold shadow-lg' 
                            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                    >
                        <item.icon size={18} /> {item.label}
                    </button>
                ))}
            </nav>
            <div className="absolute bottom-0 w-full p-4 border-t border-slate-100 bg-slate-50">
                <button onClick={() => setViewMode('client')} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold text-xs hover:border-rose-500 hover:text-rose-500 transition-colors shadow-sm mb-2">
                    <Smartphone size={14} /> Ver App Cliente
                </button>
                <p className="text-[10px] text-center text-slate-400">Avance OS v2.1</p>
            </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-72 p-8 lg:p-12 relative overflow-y-auto h-screen">
            <div className="lg:hidden absolute top-6 right-6 z-20">
                <button onClick={() => setSidebarOpen(true)} className="p-2 bg-white rounded-lg shadow border"><Menu/></button>
            </div>

            {/* AGENDA */}
            {activeTab === 'agenda' && (
                <div className="max-w-5xl mx-auto animate-fade-in">
                    <header className="flex justify-between items-center mb-10">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900">Agenda</h2>
                            <p className="text-slate-500">Gestão de horários - {today.toLocaleDateString()}</p>
                        </div>
                        <div className="flex gap-2">
                             <button className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50"><ArrowLeft size={16}/></button>
                             <button className="px-4 py-2 bg-slate-900 text-white font-bold rounded-lg text-sm">Hoje</button>
                             <button className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50"><ChevronRight size={16}/></button>
                        </div>
                    </header>
                    
                    <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden min-h-[600px] flex">
                        {/* Time Column */}
                        <div className="w-20 border-r border-slate-100 bg-slate-50/50 pt-8 flex flex-col items-center gap-12 text-xs font-bold text-slate-400">
                             {['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'].map(t => <div key={t} className="h-4">{t}</div>)}
                        </div>

                        {/* Appointments Column */}
                        <div className="flex-1 p-4 relative bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]">
                             {/* Simulated Grid Lines */}
                             {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
                                 <div key={i} className="absolute w-full border-t border-slate-100" style={{ top: `${32 + (i * 64)}px`, left: 0 }}></div>
                             ))}

                             {appointments.filter(a => new Date(a.date).toDateString() === today.toDateString()).map(appt => {
                                 const [h, m] = appt.time.split(':').map(Number);
                                 const startInMin = (h - 9) * 60 + m; // offset from 9am
                                 const top = (startInMin / 60) * 64 + 32;
                                 const height = (appt.duration / 60) * 64;

                                 return (
                                     <div 
                                        key={appt.id} 
                                        className={`absolute left-4 right-4 rounded-xl border-l-4 p-3 shadow-md transition-all hover:scale-[1.01] cursor-pointer flex justify-between items-start ${appt.status === 'blocked' ? 'bg-slate-100 border-slate-400 opacity-80' : 'bg-white border-rose-500'}`}
                                        style={{ top: `${top}px`, height: `${height}px` }}
                                     >
                                         <div>
                                            <p className="font-bold text-slate-900 text-sm">{appt.client}</p>
                                            <p className="text-xs text-slate-500">{appt.service}</p>
                                         </div>
                                         <button onClick={() => { if(confirm('Cancelar?')) { const n = appointments.filter(a => a.id !== appt.id); saveData({...data, appointments: n}); }}} className="text-slate-400 hover:text-red-500"><Trash2 size={14}/></button>
                                     </div>
                                 )
                             })}
                             
                             <button onClick={() => handleBlockTime('12:00')} className="absolute top-4 right-4 text-xs font-bold text-slate-400 hover:text-slate-600 border border-slate-200 px-2 py-1 rounded bg-white">
                                 + Bloqueio
                             </button>
                        </div>
                    </div>
                </div>
            )}

            {/* FINANCEIRO */}
            {activeTab === 'finance' && (
                <div className="max-w-5xl mx-auto animate-fade-in">
                    <h2 className="text-3xl font-bold text-slate-900 mb-8">Financeiro</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl w-fit mb-4"><DollarSign size={24}/></div>
                            <p className="text-xs font-bold text-slate-400 uppercase mb-1">Faturamento Hoje</p>
                            <h3 className="text-3xl font-bold text-slate-900">{formatCurrency(revenueDay)}</h3>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl w-fit mb-4"><Calendar size={24}/></div>
                            <p className="text-xs font-bold text-slate-400 uppercase mb-1">Faturamento Mês</p>
                            <h3 className="text-3xl font-bold text-slate-900">{formatCurrency(revenueMonth)}</h3>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                             <div className="p-3 bg-purple-100 text-purple-600 rounded-xl w-fit mb-4"><CheckCircle size={24}/></div>
                            <p className="text-xs font-bold text-slate-400 uppercase mb-1">Atendimentos</p>
                            <h3 className="text-3xl font-bold text-slate-900">{appointments.length}</h3>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 mb-8">
                        <h3 className="font-bold text-lg text-slate-900 mb-6">Performance Semanal</h3>
                        <div className="h-64 flex items-end justify-between gap-4">
                            {weeklyData.map((val, i) => (
                                <div key={i} className="flex-1 flex flex-col justify-end items-center gap-2 group">
                                    <div className="text-xs font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">{formatCurrency(val)}</div>
                                    <div 
                                        className="w-full bg-slate-100 rounded-t-xl group-hover:bg-rose-500 transition-colors duration-500 relative overflow-hidden" 
                                        style={{ height: `${(val / maxVal) * 100}%` }}
                                    ></div>
                                    <div className="text-xs font-bold text-slate-400">{['D','S','T','Q','Q','S','S'][i]}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* MARKETING AI */}
            {activeTab === 'marketing' && (
                <div className="max-w-3xl mx-auto animate-fade-in">
                    <div className="text-center mb-10">
                        <div className="w-16 h-16 bg-gradient-to-tr from-pink-500 to-rose-500 rounded-2xl mx-auto flex items-center justify-center text-white shadow-lg shadow-rose-500/30 mb-4">
                            <Megaphone size={32} />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900">Marketing Inteligente</h2>
                        <p className="text-slate-500 mt-2">Crie textos persuasivos para suas redes sociais em segundos.</p>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-200">
                        <label className="block text-sm font-bold text-slate-700 mb-3">O que você quer divulgar?</label>
                        <div className="flex gap-2 mb-6">
                            <input 
                                value={marketingPrompt}
                                onChange={e => setMarketingPrompt(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleGenerateCopy()}
                                placeholder="Ex: Promoção de Natal para manicure..." 
                                className="flex-1 p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-rose-500"
                            />
                            <button 
                                onClick={handleGenerateCopy}
                                disabled={isGeneratingCopy || !marketingPrompt}
                                className="bg-slate-900 text-white px-6 rounded-xl font-bold hover:bg-slate-800 disabled:opacity-50 transition-colors flex items-center gap-2"
                            >
                                {isGeneratingCopy ? 'Gerando...' : <><Sparkles size={18}/> Gerar</>}
                            </button>
                        </div>

                        {marketingResult && (
                            <div className="animate-fade-in">
                                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Resultado Gerado</label>
                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-slate-700 whitespace-pre-line mb-4 relative group">
                                    {marketingResult}
                                    <button 
                                        onClick={() => navigator.clipboard.writeText(marketingResult)}
                                        className="absolute top-4 right-4 p-2 bg-white rounded-lg shadow-sm text-slate-500 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                        title="Copiar"
                                    >
                                        <Copy size={16}/>
                                    </button>
                                </div>
                                <button onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(marketingResult)}`)} className="w-full py-3 rounded-xl bg-[#25D366] text-white font-bold hover:bg-[#20bd5a] flex items-center justify-center gap-2">
                                    <Send size={18}/> Enviar no WhatsApp
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
            
            {/* SERVICES CRUD */}
            {activeTab === 'services' && (
                <div className="max-w-5xl mx-auto animate-fade-in">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold text-slate-900">Serviços</h2>
                        <button onClick={() => setIsEditingService(true)} className="bg-slate-900 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-slate-800">
                            <Plus size={16}/> Novo Serviço
                        </button>
                    </div>
                    
                    {isEditingService && (
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 mb-8 animate-slide-up">
                            <h3 className="font-bold text-lg mb-4">{newService.id ? 'Editar Serviço' : 'Novo Serviço'}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Nome</label>
                                    <input className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200" value={newService.name || ''} onChange={e => setNewService({...newService, name: e.target.value})} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Preço (R$)</label>
                                    <input type="number" className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200" value={newService.price || ''} onChange={e => setNewService({...newService, price: Number(e.target.value)})} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Duração (min)</label>
                                    <select className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200" value={newService.duration || 30} onChange={e => setNewService({...newService, duration: Number(e.target.value)})}>
                                        {[15,30,45,60,90,120].map(m => <option key={m} value={m}>{m} min</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Imagem URL</label>
                                    <div className="flex gap-2">
                                        <input className="flex-1 p-3 bg-slate-50 rounded-xl border border-slate-200" value={newService.image || ''} onChange={e => setNewService({...newService, image: e.target.value})} placeholder="https://..." />
                                        <button className="p-3 bg-slate-100 rounded-xl text-slate-500 hover:bg-slate-200"><Upload size={18}/></button>
                                    </div>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Descrição</label>
                                    <textarea className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 resize-none h-20" value={newService.description || ''} onChange={e => setNewService({...newService, description: e.target.value})} />
                                </div>
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" checked={newService.active ?? true} onChange={e => setNewService({...newService, active: e.target.checked})} className="w-5 h-5 rounded text-rose-500 focus:ring-rose-500" />
                                    <span className="text-sm font-bold text-slate-700">Serviço Ativo</span>
                                </div>
                            </div>
                            <div className="flex gap-2 justify-end">
                                <button onClick={() => { setIsEditingService(false); setNewService({}); }} className="px-4 py-2 text-slate-500 font-bold hover:bg-slate-50 rounded-lg">Cancelar</button>
                                <button onClick={handleSaveService} className="px-6 py-2 bg-rose-500 text-white font-bold rounded-lg hover:bg-rose-600">Salvar</button>
                            </div>
                        </div>
                    )}

                    <div className="space-y-4">
                        {services.map((s, index) => (
                            <div key={s.id} className={`bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between group ${!s.active ? 'opacity-60 grayscale' : ''}`}>
                                <div className="flex items-center gap-4">
                                    <div className="flex flex-col gap-1 pr-3 border-r border-slate-100">
                                         <button onClick={() => { /* Move Up Logic */ }} className="text-slate-300 hover:text-slate-600"><ChevronRight className="-rotate-90" size={14}/></button>
                                         <button onClick={() => { /* Move Down Logic */ }} className="text-slate-300 hover:text-slate-600"><ChevronRight className="rotate-90" size={14}/></button>
                                    </div>
                                    <img src={s.image || 'https://via.placeholder.com/150'} className="w-14 h-14 rounded-lg object-cover bg-slate-100" />
                                    <div>
                                        <h4 className="font-bold text-slate-900">{s.name}</h4>
                                        <p className="text-xs text-slate-500">{s.duration} min • {formatCurrency(s.price)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => { setNewService(s); setIsEditingService(true); }} className="p-2 text-slate-400 hover:text-indigo-500 bg-slate-50 rounded-lg"><Edit3 size={18}/></button>
                                    <button onClick={() => { if(confirm('Excluir?')) saveData({...data, services: services.filter(ser => ser.id !== s.id)}) }} className="p-2 text-slate-400 hover:text-red-500 bg-slate-50 rounded-lg"><Trash2 size={18}/></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* CONFIGURAÇÕES */}
            {activeTab === 'settings' && (
                <div className="max-w-4xl mx-auto animate-fade-in">
                    <h2 className="text-3xl font-bold text-slate-900 mb-8">Configurações</h2>
                    
                    <div className="flex gap-2 mb-6 p-1 bg-slate-200 rounded-xl w-fit">
                        <button onClick={() => setSettingsTab('identity')} className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${settingsTab === 'identity' ? 'bg-white shadow text-slate-900' : 'text-slate-500'}`}>Identidade Visual</button>
                        <button onClick={() => setSettingsTab('system')} className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${settingsTab === 'system' ? 'bg-white shadow text-slate-900' : 'text-slate-500'}`}>Sistema</button>
                    </div>

                    {settingsTab === 'identity' && (
                        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200 space-y-6">
                            <h3 className="font-bold text-lg flex items-center gap-2"><Palette size={18}/> Aparência</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Cor Primária</label>
                                    <div className="flex gap-2">
                                        <input type="color" value={identity.primaryColor} onChange={e => saveData({...data, identity: {...identity, primaryColor: e.target.value}})} className="h-12 w-12 rounded-lg border-none bg-transparent cursor-pointer"/>
                                        <input value={identity.primaryColor} onChange={e => saveData({...data, identity: {...identity, primaryColor: e.target.value}})} className="flex-1 p-3 bg-slate-50 rounded-xl font-mono text-slate-600 outline-none border border-slate-200"/>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Logo URL</label>
                                    <input value={identity.logo || ''} onChange={e => saveData({...data, identity: {...identity, logo: e.target.value}})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 outline-none" placeholder="https://..."/>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Imagem de Capa</label>
                                    <input value={identity.cover || ''} onChange={e => saveData({...data, identity: {...identity, cover: e.target.value}})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 outline-none" placeholder="https://..."/>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Slogan</label>
                                    <input value={identity.slogan || ''} onChange={e => saveData({...data, identity: {...identity, slogan: e.target.value}})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 outline-none" placeholder="Frase de efeito"/>
                                </div>
                            </div>
                            
                            {/* LIVE PREVIEW MINIATURE */}
                            <div className="mt-8 border-t border-slate-100 pt-6">
                                <label className="block text-xs font-bold text-slate-400 uppercase mb-4">Preview Botões</label>
                                <button className="px-8 py-3 text-white font-bold rounded-xl shadow-lg transition-transform hover:scale-105" style={{ backgroundColor: identity.primaryColor }}>
                                    Botão Principal
                                </button>
                            </div>
                        </div>
                    )}

                    {settingsTab === 'system' && (
                        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200 space-y-6">
                            <h3 className="font-bold text-lg flex items-center gap-2"><Monitor size={18}/> Operacional</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                 <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Tipo de Negócio</label>
                                    <select 
                                        value={identity.businessType} 
                                        onChange={e => saveData({...data, identity: {...identity, businessType: e.target.value as any}})}
                                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 outline-none"
                                    >
                                        <option value="beauty">Salão / Manicure</option>
                                        <option value="barber">Barbearia</option>
                                        <option value="pet">Petshop</option>
                                        <option value="health">Clínica / Saúde</option>
                                        <option value="other">Outro</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Nome do Negócio</label>
                                    <input value={identity.name} onChange={e => saveData({...data, identity: {...identity, name: e.target.value}})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 outline-none"/>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">WhatsApp (com DDD)</label>
                                    <input value={identity.whatsapp} onChange={e => saveData({...data, identity: {...identity, whatsapp: e.target.value}})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 outline-none" placeholder="5511999999999"/>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Horário de Funcionamento</label>
                                    <input value={identity.openingHours} onChange={e => saveData({...data, identity: {...identity, openingHours: e.target.value}})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 outline-none" placeholder="09:00 - 18:00"/>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Intervalo Almoço</label>
                                    <div className="flex gap-2">
                                        <input value={identity.lunchStart || '12:00'} onChange={e => saveData({...data, identity: {...identity, lunchStart: e.target.value}})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 outline-none" placeholder="Início"/>
                                        <input value={identity.lunchEnd || '13:00'} onChange={e => saveData({...data, identity: {...identity, lunchEnd: e.target.value}})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 outline-none" placeholder="Fim"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </main>
    </div>
  );
};

export default DemoSaaSStart;
