

import React, { useState, useEffect } from 'react';
import Sidebar from './components/Layout/Sidebar';
import Hub from './components/Dashboard/Hub';
import DashboardHome from './components/Dashboard/DashboardHome';
import BuilderMode from './components/Builder/BuilderMode';
import SaaSBuilder from './components/Builder/SaaSBuilder';
import ProjectManager from './components/Admin/ProjectManager';
import FinanceDashboard from './components/Admin/FinanceDashboard';
import SalesAssistant from './components/Sales/SalesAssistant';
import PortfolioPage from './components/Portfolio/PortfolioPage';
import SettingsPage from './components/Settings/SettingsPage';
import DemoEditor from './components/Admin/DemoEditor';
import PublicLanding from './components/Public/PublicLanding';
import DemoLandingProfessional from './components/Demos/DemoLandingProfessional';
import DemoLandingHighConversion from './components/Demos/DemoLandingHighConversion';
import DemoSaaSStart from './components/Demos/DemoSaaSStart';
import DemoSaaSGrowth from './components/Demos/DemoSaaSGrowth';
import LoginModal from './components/Auth/LoginModal';
import { getCurrentUser } from './services/authService';
import { AppMode } from './types';

// Agency OS Components
import AgencyDashboard from './components/AgencyOS/AgencyDashboard';
import ClientManager from './components/AgencyOS/ClientManager';
import ContractManager from './components/AgencyOS/ContractManager';

// New Demos
import DemoLPDentist from './components/Demos/DemoLP_Dentist';
import DemoLPGym from './components/Demos/DemoLP_Gym';
import DemoLPPlastic from './components/Demos/DemoLP_Plastic';
import DemoLPAesthetic from './components/Demos/DemoLP_Aesthetic';

const App: React.FC = () => {
  const [currentMode, setCurrentMode] = useState<AppMode>(AppMode.PUBLIC_HOME);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    // Check if user is already logged in on mount
    const user = getCurrentUser();
    if (user) {
      setIsAuthenticated(true);
      setCurrentMode(AppMode.HUB);
    }
  }, []);

  const handleModeChange = (mode: AppMode) => {
    if (mode === AppMode.PUBLIC_HOME || mode.startsWith('demo_')) {
      // Allow going to public home or demos freely
      setCurrentMode(mode);
      return;
    }

    // Protected Routes
    if (!isAuthenticated) {
      setShowLogin(true);
    } else {
      setCurrentMode(mode);
    }
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setShowLogin(false);
    setCurrentMode(AppMode.AGENCY_DASHBOARD); // Redirect to Agency Dashboard on login
  };

  const renderContent = () => {
    switch (currentMode) {
      case AppMode.PUBLIC_HOME:
        return <PublicLanding setMode={handleModeChange} />;
      case AppMode.DEMO_PROFESSIONAL:
        return <DemoLandingProfessional setMode={handleModeChange} />;
      case AppMode.DEMO_HIGH_CONVERSION:
        return <DemoLandingHighConversion setMode={handleModeChange} />;
        
      // NEW SAAS DEMOS
      case AppMode.DEMO_SOLO_NAILS:
        return <DemoSaaSStart setMode={handleModeChange} niche="nails" />;
      case AppMode.DEMO_SOLO_PET:
        return <DemoSaaSStart setMode={handleModeChange} niche="pet" />;
      case AppMode.DEMO_ELITE_BARBER:
        return <DemoSaaSGrowth setMode={handleModeChange} niche="barber" />;
      case AppMode.DEMO_ELITE_CLINIC:
        return <DemoSaaSGrowth setMode={handleModeChange} niche="clinic" />;

      // NEW LANDING PAGE DEMOS
      case AppMode.DEMO_LP_DENTIST:
        return <DemoLPDentist setMode={handleModeChange} />;
      case AppMode.DEMO_LP_GYM:
        return <DemoLPGym setMode={handleModeChange} />;
      case AppMode.DEMO_LP_PLASTIC:
        return <DemoLPPlastic setMode={handleModeChange} />;
      case AppMode.DEMO_LP_AESTHETIC:
        return <DemoLPAesthetic setMode={handleModeChange} />;

      // LEGACY / SHARED
      case AppMode.HUB:
        return <Hub setMode={handleModeChange} />;
      case AppMode.LANDING_BUILDER:
        return <BuilderMode setMode={handleModeChange} />;
      case AppMode.SAAS_BUILDER:
        return <SaaSBuilder setMode={handleModeChange} />;
      case AppMode.SALES_ASSISTANT:
        return <SalesAssistant />;
      case AppMode.PORTFOLIO:
        return <PortfolioPage />;

      // AGENCY OS ROUTES
      case AppMode.AGENCY_DASHBOARD:
        return <AgencyDashboard />;
      case AppMode.AGENCY_CLIENTS:
        return <ClientManager />;
      case AppMode.AGENCY_PROJECTS:
        return <ProjectManager />; // Reusing existing project manager as base
      case AppMode.AGENCY_FINANCE:
        return <FinanceDashboard />; // Reusing existing finance dashboard
      case AppMode.AGENCY_CONTRACTS:
        return <ContractManager />;
      case AppMode.AGENCY_DEMO_ADMIN:
        return <DemoEditor setMode={handleModeChange} />;
      case AppMode.AGENCY_SETTINGS:
        return <SettingsPage />;
        
      default:
        return <Hub setMode={handleModeChange} />;
    }
  };

  const isPublicOrDemo = currentMode === AppMode.PUBLIC_HOME || currentMode.startsWith('demo_');

  return (
    <div className="flex min-h-screen bg-slate-950 font-sans text-slate-100">
      {/* Login Modal for Protected Access */}
      {showLogin && (
        <LoginModal 
            onSuccess={handleLoginSuccess} 
            onClose={() => setShowLogin(false)} 
        />
      )}

      {!isPublicOrDemo && (
         <Sidebar currentMode={currentMode} setMode={handleModeChange} />
      )}
      
      {/* Content Area */}
      <main className={`flex-1 transition-all duration-300 relative ${!isPublicOrDemo ? 'lg:ml-72 pt-20 lg:pt-0' : ''}`}>
        {renderContent()}
      </main>
    </div>
  );
};

export default App;