import { useState } from 'react';
import '../styles/roleDashboard.css';

function RoleDashboard({ onProceed }) {
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleClick = (roleKey) => {
    setSelectedRole(roleKey);
  };

  return (
    <div className="role-dashboard-container">
      <div className="role-dashboard-header">
        <span className="role-dashboard-pill">Welcome to LawSphere</span>
        <h1 className="role-dashboard-title">Choose Your Role</h1>
        <p className="role-dashboard-subtitle">
          Select your portal to proceed into LawSphere's legal ecosystem.
        </p>
      </div>

      <div className="role-dashboard-grid">
        {/* Button 1: Clients */}
        <button
          type="button"
          className={`role-card-button ${selectedRole === 'clients' ? 'selected' : ''}`}
          onClick={() => handleRoleClick('clients')}
          aria-pressed={selectedRole === 'clients'}
        >
          <div className="role-card-top">
            <div className="role-icon-wrapper">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <span className="role-badge">Client Portal</span>
          </div>
          <h2 className="role-title">Clients</h2>
          <p className="role-description">
            Find advocates, initiate legal consultations, and manage matter documents.
          </p>
          <div className="role-action-indicator">
            <span>{selectedRole === 'clients' ? '✓ Selected' : 'Continue as Client →'}</span>
          </div>
        </button>

        {/* Button 2: Law Firm */}
        <button
          type="button"
          className={`role-card-button ${selectedRole === 'lawfirm' ? 'selected' : ''}`}
          onClick={() => handleRoleClick('lawfirm')}
          aria-pressed={selectedRole === 'lawfirm'}
        >
          <div className="role-card-top">
            <div className="role-icon-wrapper">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
                <line x1="9" y1="22" x2="9" y2="22.01" />
                <line x1="15" y1="22" x2="15" y2="22.01" />
                <line x1="8" y1="6" x2="10" y2="6" />
                <line x1="14" y1="6" x2="16" y2="6" />
                <line x1="8" y1="10" x2="10" y2="10" />
                <line x1="14" y1="10" x2="16" y2="10" />
                <line x1="8" y1="14" x2="10" y2="14" />
                <line x1="14" y1="14" x2="16" y2="14" />
                <line x1="8" y1="18" x2="10" y2="18" />
                <line x1="14" y1="18" x2="16" y2="18" />
              </svg>
            </div>
            <span className="role-badge">Firm Portal</span>
          </div>
          <h2 className="role-title">Law Firm</h2>
          <p className="role-description">
            Oversee firm operations, associate lawyers, organizational practice areas, and corporate accounts.
          </p>
          <div className="role-action-indicator">
            <span>{selectedRole === 'lawfirm' ? '✓ Selected' : 'Continue as Law Firm →'}</span>
          </div>
        </button>

        {/* Button 3: Lawyer */}
        <button
          type="button"
          className={`role-card-button ${selectedRole === 'lawyer' ? 'selected' : ''}`}
          onClick={() => handleRoleClick('lawyer')}
          aria-pressed={selectedRole === 'lawyer'}
        >
          <div className="role-card-top">
            <div className="role-icon-wrapper">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3v18" />
                <path d="m6 8 6-3 6 3" />
                <path d="M3 13a3 3 0 0 0 6 0l-3-5Z" />
                <path d="M15 13a3 3 0 0 0 6 0l-3-5Z" />
              </svg>
            </div>
            <span className="role-badge">Advocate Portal</span>
          </div>
          <h2 className="role-title">Lawyer</h2>
          <p className="role-description">
            Manage your legal cases, track court matters, bar council verification, and client engagements.
          </p>
          <div className="role-action-indicator">
            <span>{selectedRole === 'lawyer' ? '✓ Selected' : 'Continue as Lawyer →'}</span>
          </div>
        </button>
      </div>

      {selectedRole && (
        <div className="role-selection-status">
          <p>
            Selected Portal: <strong>{selectedRole === 'clients' ? 'Clients' : selectedRole === 'lawfirm' ? 'Law Firm' : 'Lawyer'}</strong>
          </p>
          <button className="proceed-btn" onClick={() => onProceed(selectedRole)}>
            Proceed to Registration &rarr;
          </button>
        </div>
      )}
    </div>
  );
}

export default RoleDashboard;
