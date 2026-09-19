import { useState } from 'react';
import './App.css';

import Navbar from '../components/Navbar';
import RoleDashboard from '../components/RoleDashboard';
import SignUp from '../components/SignUp';
import ClientForm from '../components/ClientForm';
import LawyerForm from '../components/LawyerForm';
import LawfirmForm from '../components/LawfirmForm';
import ClientDashboard from '../components/ClientDashboard';
import LawfirmDashboard from '../components/LawfirmDashboard';
import LawyerDashboard from '../components/LawyerDashboard';
import PlainPage from '../components/PlainPage';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [previousDashboard, setPreviousDashboard] = useState('dashboard');

  const navigateTo = (view) => {
    if (view === 'plain-page') {
      setPreviousDashboard(currentView);
    }
    setCurrentView(view);
  };

  return (
    <>
      <Navbar onNavigate={navigateTo} currentView={currentView} />
      <main>
        {/* Homepage / Role Selection */}
        {currentView === 'dashboard' && <RoleDashboard onProceed={navigateTo} />}

        {/* Sign Up Page */}
        {currentView === 'signup' && <SignUp onNavigate={navigateTo} />}

        {/* Role Registration Forms */}
        {currentView === 'clients' && (
          <ClientForm
            onBack={() => navigateTo('dashboard')}
            onSuccess={() => navigateTo('client-dashboard')}
          />
        )}
        {currentView === 'lawfirm' && (
          <LawfirmForm
            onBack={() => navigateTo('dashboard')}
            onSuccess={() => navigateTo('lawfirm-dashboard')}
          />
        )}
        {currentView === 'lawyer' && (
          <LawyerForm
            onBack={() => navigateTo('dashboard')}
            onSuccess={() => navigateTo('lawyer-dashboard')}
          />
        )}

        {/* Dashboards */}
        {/* Client Dashboard: Can see both Lawyers & Law Firms */}
        {currentView === 'client-dashboard' && <ClientDashboard onNavigate={navigateTo} />}

        {/* Law Firm Dashboard: Can see list of Lawyers */}
        {currentView === 'lawfirm-dashboard' && <LawfirmDashboard onNavigate={navigateTo} />}

        {/* Lawyer Dashboard: Can see list of Law Firms */}
        {currentView === 'lawyer-dashboard' && <LawyerDashboard onNavigate={navigateTo} />}

        {/* Test Plain White Page */}
        {currentView === 'plain-page' && (
          <PlainPage onBack={() => navigateTo(previousDashboard || 'dashboard')} />
        )}
      </main>
    </>
  );
}

export default App;
