import { useState, useEffect } from 'react';
import axios from 'axios';
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
import BigPicture from '../components/BigPicture';
import ClientProfilePage from '../components/ClientProfilePage';
import LawfirmProfilePage from '../components/LawfirmProfilePage';
import LawyerProfilePage from '../components/LawyerProfilePage';
import ClientAppointments from '../components/ClientAppointments';
import LawyerAppointments from '../components/LawyerAppointments';
import LawfirmAppointments from '../components/LawfirmAppointments';
import JobPostingForm from '../components/JobPostingForm';
import JobsPage from '../components/JobsPage';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [previousDashboard, setPreviousDashboard] = useState('dashboard');
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [userRole, setUserRole] = useState(() => localStorage.getItem('userRole') || '');

  // Check active session on mount
  useEffect(() => {
    axios.get('http://localhost:3000/SignUp/currentUser', { withCredentials: true })
      .then((res) => {
        if (res.data?.user?.role) {
          setUserRole(res.data.user.role);
          localStorage.setItem('userRole', res.data.user.role);
        }
      })
      .catch(() => {
        // No active session or unauthenticated
      });
  }, []);

  const navigateTo = (view, item = null) => {
    if (view === 'plain-page' || view === 'big-picture') {
      setPreviousDashboard(currentView);
      setSelectedEntity(item || null);
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
        {currentView === 'signup' && (
          <SignUp
            onNavigate={navigateTo}
            onRoleSet={(role) => setUserRole(role)}
          />
        )}

        {/* Role Registration Forms */}
        {currentView === 'clients' && (
          <ClientForm
            onBack={() => navigateTo('dashboard')}
            onSuccess={() => {
              setUserRole('Clients');
              navigateTo('client-dashboard');
            }}
          />
        )}
        {currentView === 'lawfirm' && (
          <LawfirmForm
            onBack={() => navigateTo('dashboard')}
            onSuccess={() => {
              setUserRole('Lawfirm');
              navigateTo('lawfirm-dashboard');
            }}
          />
        )}
        {currentView === 'lawyer' && (
          <LawyerForm
            onBack={() => navigateTo('dashboard')}
            onSuccess={() => {
              setUserRole('Lawyer');
              navigateTo('lawyer-dashboard');
            }}
          />
        )}

        {/* Dashboards */}
        {/* Client Dashboard: Can see both Lawyers & Law Firms */}
        {currentView === 'client-dashboard' && <ClientDashboard onNavigate={navigateTo} />}

        {/* Law Firm Dashboard: Can see list of Lawyers */}
        {currentView === 'lawfirm-dashboard' && <LawfirmDashboard onNavigate={navigateTo} />}

        {/* Lawyer Dashboard: Can see list of Law Firms */}
        {currentView === 'lawyer-dashboard' && <LawyerDashboard onNavigate={navigateTo} />}

        {/* Role-Specific Profile Pages */}
        {currentView === 'client-profile' && (
          <ClientProfilePage onBack={() => navigateTo('client-dashboard')} />
        )}
        {currentView === 'lawfirm-profile' && (
          <LawfirmProfilePage onBack={() => navigateTo('lawfirm-dashboard')} />
        )}
        {currentView === 'lawyer-profile' && (
          <LawyerProfilePage onBack={() => navigateTo('lawyer-dashboard')} />
        )}

        {/* Role-Specific Appointment Pages */}
        {currentView === 'client-appointments' && (
          <ClientAppointments onBack={() => navigateTo('client-dashboard')} />
        )}
        {currentView === 'lawyer-appointments' && (
          <LawyerAppointments onBack={() => navigateTo('lawyer-dashboard')} />
        )}
        {currentView === 'lawfirm-appointments' && (
          <LawfirmAppointments onBack={() => navigateTo('lawfirm-dashboard')} />
        )}

        {/* Job Posting Form (Only accessible to role: Lawfirm) */}
        {currentView === 'job-posting-form' && (
          <JobPostingForm
            onBack={() => navigateTo('lawfirm-dashboard')}
            userRole={userRole}
            onSuccess={() => navigateTo('lawfirm-dashboard')}
          />
        )}

        {/* Jobs Page for Lawyers */}
        {currentView === 'jobs-page' && (
          <JobsPage onBack={() => navigateTo('lawyer-dashboard')} />
        )}

        {/* BigPicture Details View (renamed from PlainPage) */}
        {(currentView === 'big-picture' || currentView === 'plain-page') && (
          <BigPicture
            onBack={() => navigateTo(previousDashboard || 'dashboard')}
            initialItem={selectedEntity}
          />
        )}
      </main>
    </>
  );
}

export default App;

