

export interface Project {
  id: string;
  name: string;
  client: string;
  status: 'Draft' | 'Negotiation' | 'Sold' | 'Archived';
  value: number;
  niche: string;
  createdAt: Date;
  generatedHtml?: string;
  planType?: 'professional' | 'high_conversion';
  briefingAnswers?: Record<string, string>;
  type: 'Landing' | 'SaaS';
}

export interface Subscription {
  id: string;
  clientName: string;
  plan: 'Solo' | 'Elite';
  value: number;
  status: 'Active' | 'Late' | 'Cancelled';
  nextBilling: string;
  lastPayment: string;
  contractUrl?: string;
}

export interface AgencyClient {
    id: string;
    name: string;
    phone: string;
    systemType: 'SaaS Solo' | 'SaaS Premium' | 'Landing Page';
    renewalDate: string; // DD/MM
    monthlyValue: number;
    status: 'active' | 'late' | 'cancelled';
    notes?: string;
}

export interface Contract {
    id: string;
    clientName: string;
    product: string;
    value: number;
    renewal: string;
    date: string;
    signed: boolean;
}

export type PlanType = 'professional' | 'high_conversion';
export type LandingStyle = 'clean' | 'dark' | 'commercial';

export interface BriefingQuestion {
  id: string;
  question: string;
  placeholder: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface SalesAnalysis {
  shortResponse: string;
  mediumResponse: string;
  detailedResponse: string;
  counterObjection: string;
  priceStrategy: string;
  closingTechnique: string;
}

export interface ClientStrategy {
  briefingQuestions: string[];
  suggestedPages: string[];
  targetAudiencePainPoints: string[];
  killerFeatureIdea: string;
}

export interface SalesMentorResponse {
    content: string;
    type: 'objection' | 'copy' | 'proposal' | 'script';
}

export interface AuditScore {
  seo: number;
  ux: number;
  copy: number;
  details: string[];
}

export interface User {
  id: string;
  name: string;
  pin: string; // 6 digits
  role: 'admin' | 'partner';
}

export interface Plan {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  buttonText: string;
  type: 'landing' | 'saas';
}

export interface PortfolioItem {
  id: string;
  client: string;
  niche: string;
  image: string;
  plan: string;
  demoUrl?: string;
  badge?: string;
}

// --- THEME ENGINE v3 ---
export interface DemoTheme {
  primary: string;
  secondary: string;
  background: string;
  accent: string;
  button: string;
  radius: number;
  fontHeading?: string;
}

export interface DemoSection {
    id: string;
    label: string;
    enabled: boolean;
    order: number;
    type?: 'hero' | 'features' | 'services' | 'gallery' | 'testimonials' | 'faq' | 'contact' | 'custom';
}

export interface DemoContent {
    heroTitle: string;
    heroSubtitle: string;
    address?: string; // For Maps
    theme: DemoTheme;
    images: Record<string, string>; // key: url
    texts: Record<string, string>; // key: text
    features?: string[];
    sections: DemoSection[]; // New for Builder v4
}

export interface AgencySettings {
  agencyName: string;
  whatsapp: string;
  email: string;
  heroTitle: string;
  heroSubtitle: string;
  plans: Plan[];
  portfolio: PortfolioItem[];
  theme: 'dark' | 'light';
  isDemo: boolean; 
  demoContent: Record<string, DemoContent>;
}

// SaaS Specific Types

export interface SaaSIdentity {
    name: string;
    businessType: 'barber' | 'beauty' | 'health' | 'pet' | 'other'; // New Field
    logo?: string;
    cover?: string;
    slogan?: string;
    primaryColor?: string;
    whatsapp?: string;
    address?: string;
    welcomeText?: string;
    openingHours?: string; // e.g., "09:00 - 18:00"
    lunchStart?: string;
    lunchEnd?: string;
    slotDuration?: number; // 30, 60 min
}

export interface SaaSService {
    id: string;
    name: string;
    price: number;
    duration: number; // minutes
    active: boolean;
    description?: string;
    image?: string; // Required now in v3 logic
    category?: string;
    order?: number;
}

export interface SaaSProfessional {
    id: string;
    name: string;
    role: 'owner' | 'manager' | 'professional';
    commissionRate: number; // Percentage
    avatar: string; // URL or Initial
    active: boolean;
    password?: string; // New: Login access
    specialty?: string;
    bio?: string;
    breaks?: string[]; // e.g. ["12:00-13:00"]
    phone?: string;
}

export interface SaaSClient {
    id: string;
    name: string;
    phone: string;
    lastVisit: string; // ISO Date or string
    totalSpent: number;
    status: 'active' | 'inactive' | 'vip';
}

export interface SaaSAppointment {
  id: string;
  time: string;
  client: string;
  clientPhone: string; // Mandatory now
  service: string;
  serviceId?: string;
  price: number;
  status: 'confirmed' | 'pending' | 'done' | 'cancelled' | 'blocked'; // Added 'blocked' for breaks
  professionalId?: string; // For Elite
  professionalName?: string; // Cache name
  paymentMethod?: string;
  duration: number;
  date: Date; // Changed to proper Date object in usage, but keeping type compatible
}

export interface SaaSData {
    identity: SaaSIdentity;
    services: SaaSService[];
    staff: SaaSProfessional[];
    appointments: SaaSAppointment[];
    clients: SaaSClient[];
}

export enum AppMode {
  PUBLIC_HOME = 'public_home',
  HUB = 'hub',
  
  // AGENCY OS MODES
  AGENCY_DASHBOARD = 'agency_dashboard',
  AGENCY_CLIENTS = 'agency_clients',
  AGENCY_PROJECTS = 'agency_projects',
  AGENCY_FINANCE = 'agency_finance',
  AGENCY_CONTRACTS = 'agency_contracts',
  AGENCY_DEMO_ADMIN = 'agency_demo_admin',
  AGENCY_SETTINGS = 'agency_settings',

  // LEGACY / TOOLS
  LANDING_BUILDER = 'landing',
  SAAS_BUILDER = 'saas',
  SALES_ASSISTANT = 'sales_assistant',
  PORTFOLIO = 'portfolio',
  
  // DEMO MODES
  DEMO_PROFESSIONAL = 'demo_professional',
  DEMO_HIGH_CONVERSION = 'demo_high_conversion',
  
  // SPECIFIC SAAS DEMOS
  DEMO_SOLO_NAILS = 'demo_solo_nails',
  DEMO_SOLO_PET = 'demo_solo_pet',
  DEMO_ELITE_BARBER = 'demo_elite_barber',
  DEMO_ELITE_CLINIC = 'demo_elite_clinic',

  // SPECIFIC LP DEMOS
  DEMO_LP_DENTIST = 'demo_lp_dentist',
  DEMO_LP_GYM = 'demo_lp_gym',
  DEMO_LP_PLASTIC = 'demo_lp_plastic',
  DEMO_LP_AESTHETIC = 'demo_lp_aesthetic'
}