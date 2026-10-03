import { useState, useEffect } from 'react';
import '../styles/clientDashboard.css';
import axios from 'axios';
import userAvatar from '../src/assets/images/user-avatar.png';

function ClientDashboard({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('lawyers');

  const [lawyers, setLawyers] = useState([]);
  const [lawfirms, setLawfirms] = useState([]);

  useEffect(() => {
    // Fetch Lawyers
    axios.get("http://localhost:3000/clients/ListLawyers")
      .then((response) => {
        if (response.data && Array.isArray(response.data)) {
          setLawyers(response.data);
        } else {
          setLawyers([]);
        }
      })
      .catch((error) => {
        console.log("Error fetching lawyers:", error);
        setLawyers([]);
      });

    // Fetch Law Firms
    axios.get("http://localhost:3000/clients/ListLawfirms")
      .then((response) => {
        if (response.data && Array.isArray(response.data)) {
          setLawfirms(response.data);
        } else {
          setLawfirms([]);
        }
      })
      .catch((err) => {
        console.log("Error fetching law firms:", err);
        setLawfirms([]);
      });
  }, []);

  return (
    <div className="client-dashboard-container">
      {/* Top action bar with Appointments & Profile buttons */}
      <div className="dashboard-top-bar">
        <span className="dashboard-portal-tag">Client Portal</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            className="dashboard-signout-btn"
            style={{ borderColor: 'rgba(59, 130, 246, 0.4)', background: 'rgba(59, 130, 246, 0.18)', color: '#93c5fd' }}
            onClick={() => onNavigate && onNavigate('client-appointments')}
          >
            &#128197; My Appointments
          </button>
          <button
            className="dashboard-profile-btn"
            title="Profile"
            aria-label="Profile"
            onClick={() => onNavigate && onNavigate('client-profile')}
          >
            <img src={userAvatar} alt="Profile" className="dashboard-profile-img" />
          </button>
        </div>
      </div>

      <div className="dashboard-header-block">
        <h2>Client Workspace</h2>
        <p>Browse verified legal practitioners and leading law firms for your cases.</p>
      </div>

      <div className="dashboard-navbar">
        <button
          className={`dashboard-nav-btn ${activeTab === 'lawyers' ? 'active' : ''}`}
          onClick={() => setActiveTab('lawyers')}
        >
          Lawyers
        </button>
        <button
          className={`dashboard-nav-btn ${activeTab === 'lawfirms' ? 'active' : ''}`}
          onClick={() => setActiveTab('lawfirms')}
        >
          Law Firms
        </button>
      </div>

      <div className="dashboard-list">
        {activeTab === 'lawyers' && (
          lawyers.length > 0 ? (
            lawyers.map((lawyer) => (
              <div
                key={lawyer._id}
                className="list-item-card"
                onClick={() => onNavigate('plain-page', lawyer)}
              >
                <div className="item-top-row">
                  <h3 className="item-title">{lawyer.name}</h3>
                  <span className="item-badge">{lawyer.experience || 'Advocate'}</span>
                </div>
                <p className="item-subtitle">
                  <strong>Practice:</strong> {lawyer.praticeAreas || lawyer.practiceAreas || 'General Practice'} &nbsp;|&nbsp; 
                  <strong>Location:</strong> {lawyer.Location || lawyer.location || 'Pan India'}
                </p>
                {lawyer.education && (
                  <p className="item-details">
                    <strong>Education:</strong> {lawyer.education}
                  </p>
                )}
                {lawyer.skills && (
                  <p className="item-details">
                    <strong>Skills:</strong> {lawyer.skills}
                  </p>
                )}
                <span className="click-hint">Click to view details &rarr;</span>
              </div>
            ))
          ) : (
            <div className="dashboard-empty">
              <p>data is not avaliable</p>
            </div>
          )
        )}

        {activeTab === 'lawfirms' && (
          lawfirms.length > 0 ? (
            lawfirms.map((firm) => (
              <div
                key={firm._id}
                className="list-item-card"
                onClick={() => onNavigate('plain-page', firm)}
              >
                <div className="item-top-row">
                  <h3 className="item-title">{firm.firmName}</h3>
                  <span className="item-badge">Law Firm</span>
                </div>
                <p className="item-subtitle">
                  <strong>Practice:</strong> {firm.practicesAreas || 'Corporate / Litigation'} &nbsp;|&nbsp; 
                  <strong>Offices:</strong> {firm.officeLocations || 'Multiple Locations'}
                </p>
                {firm.website && (
                  <p className="item-details">
                    <strong>Website:</strong> {firm.website} &nbsp;|&nbsp; <strong>Contact:</strong> {firm.contactEmail || 'N/A'}
                  </p>
                )}
                {firm.desription && (
                  <p className="item-details">
                    {firm.desription}
                  </p>
                )}
                <span className="click-hint">Click to view details &rarr;</span>
              </div>
            ))
          ) : (
            <div className="dashboard-empty">
              <p>data is not avaliable</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default ClientDashboard;
