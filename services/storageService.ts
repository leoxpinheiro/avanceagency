
import { User, AgencySettings, SaaSService, SaaSAppointment, SaaSClient, SaaSProfessional, SaaSIdentity, AgencyClient, Contract, SaaSData } from '../types';

// --- CHAVES DE ARMAZENAMENTO (RESET FORÇADO) ---
// Nova chave para garantir que o navegador crie um banco zerado
const USERS_KEY = 'avance_users_v3_reset_ok';
const CURRENT_USER_KEY = 'avance_current_user_v3_reset_ok';
const SETTINGS_KEY = 'avance_agency_settings_v3_reset_ok';
const CLIENTS_KEY = 'avance_agency_clients_v3_reset_ok';
const CONTRACTS_KEY = 'avance_agency_contracts_v3_reset_ok';
const SAAS_PREFIX = 'avance_saas_v3_reset_ok_';

// Initial default user
const DEFAULT_ADMIN: User = {
  id: 'admin-1',
  name: 'Admin Principal',
  pin: '123456',
  role: 'admin'
};

// DADOS PADRÃO SINCRONIZADOS COM A HOME PAGE
const DEFAULT_SETTINGS: AgencySettings = {
  agencyName: 'Avance Agency',
  whatsapp: '5511999999999',
  email: 'contato@avance.com',
  heroTitle: 'Escale seu Negócio com Tecnologia.',
  heroSubtitle: 'Sistemas de gestão, agendamento online e landing pages de alta conversão.',
  theme: 'dark',
  isDemo: true,
  plans: [
    {
      id: 'saas-solo',
      name: 'SaaS Solo',
      price: '39,90',
      description: 'Ideal para profissionais autônomos.',
      type: 'saas',
      features: ['Agenda Online 24h', 'Link de Agendamento', 'Histórico de Clientes', 'Dashboard Básico'],
      buttonText: 'Começar Agora',
      isPopular: false
    },
    {
      id: 'saas-elite',
      name: 'SaaS Premium',
      price: '79,90',
      description: 'Para estabelecimentos com equipe.',
      type: 'saas',
      features: ['Múltiplos Profissionais', 'Controle de Caixa', 'Cálculo de Comissões', 'Relatórios Financeiros'],
      buttonText: 'Escolher Premium',
      isPopular: true
    },
    {
      id: 'lp-premium',
      name: 'LP Premium',
      price: '397',
      description: 'Pagamento Único. Design Moderno.',
      type: 'landing',
      features: ['Layout Moderno', 'CTA em Todas Seções', 'Galeria de Fotos', 'SEO Básico'],
      buttonText: 'Ver Detalhes',
      isPopular: false
    },
    {
      id: 'lp-high',
      name: 'LP Alta Conversão',
      price: '697',
      description: 'Pagamento Único. Foco em Vendas.',
      type: 'landing',
      features: ['Copywriting Profissional', 'Analytics Integrado', 'Estrutura de Vendas', 'Depoimentos Dinâmicos'],
      buttonText: 'Quero Vender Mais',
      isPopular: true
    }
  ],
  portfolio: [
      // 4 SAAS (Sincronizado com PublicLanding.tsx)
      { id: '1', client: 'Studio Nails', niche: 'Manicure', plan: 'SaaS Solo', image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&auto=format&fit=crop&q=80' },
      { id: '2', client: 'Clínica Facial Express', niche: 'Estética', plan: 'SaaS Solo', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&auto=format&fit=crop&q=80' },
      { id: '3', client: 'Barber Club Elite', niche: 'Barbearia', plan: 'SaaS Elite', image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&auto=format&fit=crop&q=80' },
      { id: '4', client: 'Fitness Pro Elite', niche: 'Academia', plan: 'SaaS Elite', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80' },
      
      // 2 LP PREMIUM
      { id: '5', client: 'Clínica Odonto Saúde', niche: 'Dentista', plan: 'LP Premium', image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&auto=format&fit=crop&q=80' },
      { id: '6', client: 'Academia StrongFit', niche: 'Academia', plan: 'LP Premium', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80' },
      
      // 2 LP HIGH CONVERSION
      { id: '7', client: 'Lumière Estética', niche: 'Estética', plan: 'Alta Conversão', image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&auto=format&fit=crop&q=80' },
      { id: '8', client: 'Dr. Renato', niche: 'Plástica', plan: 'Alta Conversão', image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800&auto=format&fit=crop&q=80' }
  ], 
  demoContent: {}
};

// --- AUTH & USERS ---

export const getUsers = (): User[] => {
  const stored = localStorage.getItem(USERS_KEY);
  if (!stored) {
    localStorage.setItem(USERS_KEY, JSON.stringify([DEFAULT_ADMIN]));
    return [DEFAULT_ADMIN];
  }
  try {
      const users = JSON.parse(stored);
      if (!Array.isArray(users)) return [DEFAULT_ADMIN];
      if (!users.some((u: User) => u.role === 'admin')) {
          users.push(DEFAULT_ADMIN);
          localStorage.setItem(USERS_KEY, JSON.stringify(users));
      }
      return users;
  } catch (e) {
      return [DEFAULT_ADMIN];
  }
};

export const saveUser = (user: User) => {
  const users = getUsers();
  const existingIndex = users.findIndex(u => u.id === user.id);
  
  if (existingIndex >= 0) {
    users[existingIndex] = user;
  } else {
    users.push(user);
  }
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const deleteUser = (userId: string) => {
  const users = getUsers().filter(u => u.id !== userId);
  if (users.length === 0 || !users.some(u => u.role === 'admin')) {
     users.push(DEFAULT_ADMIN);
  }
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const authenticate = (pin: string): User | null => {
  const users = getUsers();
  const user = users.find(u => u.pin === pin);
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    return user;
  }
  return null;
};

export const logout = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

export const getCurrentUser = (): User | null => {
  const stored = localStorage.getItem(CURRENT_USER_KEY);
  return stored ? JSON.parse(stored) : null;
};

// --- SETTINGS (Operacional Apenas) ---

export const getAgencySettings = (): AgencySettings => {
  const stored = localStorage.getItem(SETTINGS_KEY);
  if (!stored) {
    // Se não existir, salva o DEFAULT que corresponde à Home Page
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(DEFAULT_SETTINGS));
    return DEFAULT_SETTINGS;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return DEFAULT_SETTINGS;
  }
};

export const saveAgencySettings = (settings: AgencySettings) => {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
};

export const resetFactorySettings = () => {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(DEFAULT_SETTINGS));
};

// --- AGENCY CLIENTS & CONTRACTS ---

export const getAgencyClients = (): AgencyClient[] => {
    const stored = localStorage.getItem(CLIENTS_KEY);
    if (stored) return JSON.parse(stored);
    return [];
};

export const saveAgencyClients = (clients: AgencyClient[]) => {
    localStorage.setItem(CLIENTS_KEY, JSON.stringify(clients));
};

export const getContracts = (): Contract[] => {
    const stored = localStorage.getItem(CONTRACTS_KEY);
    if (stored) return JSON.parse(stored);
    return [];
};

export const saveContracts = (contracts: Contract[]) => {
    localStorage.setItem(CONTRACTS_KEY, JSON.stringify(contracts));
};

// --- SAAS DATA ENGINE ---

export const getSaaSData = (niche: string): SaaSData => {
    const key = `${SAAS_PREFIX}${niche}`;
    const stored = localStorage.getItem(key);
    
    if (stored) {
        const parsed = JSON.parse(stored);
        if(parsed.appointments) {
            parsed.appointments = parsed.appointments.map((a: any) => ({
                ...a,
                date: new Date(a.date)
            }));
        }
        return parsed;
    }

    // Factory Defaults per Niche
    let defaults: SaaSData = {
        identity: {
            name: 'Nova Empresa',
            businessType: 'other',
            primaryColor: '#000000',
            whatsapp: '5511999999999',
            address: 'Endereço Principal, 100',
            openingHours: '09:00 - 18:00',
            slotDuration: 30
        },
        services: [],
        staff: [],
        appointments: [],
        clients: []
    };

    if (niche === 'nails') {
        defaults.identity = { ...defaults.identity, businessType: 'beauty', name: 'Studio Nails Ana', primaryColor: '#e11d48', cover: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=1200&auto=format&fit=crop&q=80', slotDuration: 60 };
        defaults.services = [
            { id: '1', name: 'Manicure Completa', price: 45.00, duration: 60, active: true, image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&auto=format&fit=crop&q=80' },
            { id: '2', name: 'Pedicure', price: 45.00, duration: 60, active: true, image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?w=400&auto=format&fit=crop&q=80' },
        ];
    } else if (niche === 'barber') {
        defaults.identity = { ...defaults.identity, businessType: 'barber', name: 'Barber Club Elite', primaryColor: '#10b981', cover: 'https://images.unsplash.com/photo-1595475207225-428b62b177a4?q=80&w=1200&auto=format&fit=crop', slotDuration: 45 };
        defaults.staff = [
             { id: '1', name: 'Mestre João', role: 'owner', commissionRate: 50, active: true, avatar: 'J', password: 'admin', specialty: 'Corte Moderno' },
             { id: '2', name: 'Pedro Barba', role: 'professional', commissionRate: 40, active: true, avatar: 'P', password: '123', specialty: 'Barba e Pigmento' },
        ];
        defaults.services = [
            { id: '1', name: 'Corte Premium', price: 60, duration: 45, active: true, image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400' },
            { id: '2', name: 'Barba Terapia', price: 45, duration: 30, active: true, image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400' },
        ];
    } else if (niche === 'clinic') {
        defaults.identity = { ...defaults.identity, businessType: 'health', name: 'Dermique Clínica', primaryColor: '#a855f7', cover: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&auto=format&fit=crop&q=80', slotDuration: 60 };
        defaults.staff = [
            { id: '1', name: 'Dra. Ana', role: 'owner', commissionRate: 60, active: true, avatar: 'A', password: 'admin', specialty: 'Harmonização' },
        ];
        defaults.services = [
             { id: '1', name: 'Botox Full Face', price: 1200, duration: 60, active: true, image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400' }
        ]
    } else if (niche === 'pet') {
        defaults.identity = { ...defaults.identity, businessType: 'pet', name: 'Happy Dog Pet', primaryColor: '#3b82f6', cover: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=1200', slotDuration: 60 };
        defaults.services = [
            { id: '1', name: 'Banho e Tosa P', price: 60, duration: 60, active: true, image: 'https://images.unsplash.com/photo-1591852662057-79257c742337?w=400' }
        ]
    }

    localStorage.setItem(key, JSON.stringify(defaults));
    return defaults;
};

export const saveSaaSData = (niche: string, data: SaaSData) => {
    localStorage.setItem(`${SAAS_PREFIX}${niche}`, JSON.stringify(data));
};
