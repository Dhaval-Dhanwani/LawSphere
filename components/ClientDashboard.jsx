import { useState, useEffect } from 'react';
import '../styles/clientDashboard.css';
import axios from 'axios';
import userAvatar from '../src/assets/images/user-avatar.png';

function ClientDashboard({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('lawyers');

  // Placeholder states for backend data
  const [lawyers, setLawyers] = useState([]);
  const [lawfirms, setLawfirms] = useState([]);

  // Fetch data from Express backend here when ready
  useEffect(() => {
    // Fetch Lawyers
    axios.get("http://localhost:3000/clients/ListLawyers")
      .then((response) => {
        console.log("Lawyers:", response.data);
        setLawyers(response.data);
      })
      .catch((error) => console.log("Error fetching lawyers:", error));

    // Fetch Law Firms
    axios.get("http://localhost:3000/clients/ListLawfirms")
      .then((response) => {
        console.log("Law firms:", response.data);
        setLawfirms(response.data);
      })
      .catch((err) => {
        console.log("Error fetching law firms:", err);
      });
  }, []);

  return (
    <div className="client-dashboard-container">
      {/* Top action bar with Profile button */}
      <div className="dashboard-top-bar">
        <span className="dashboard-portal-tag">Client Portal</span>
        <button className="dashboard-profile-btn" title="Profile" aria-label="Profile">
          <img src={userAvatar} alt="Profile" className="dashboard-profile-img" />
        </button>
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
          lawyers.map((lawyer) => (
            <div
              key={lawyer._id}
              className="list-item-card"
              onClick={() => onNavigate('plain-page')}
            >
              <div className="item-top-row">
                <h3 className="item-title">{lawyer.name}</h3>
                <span className="item-badge">{lawyer.experience || 'Advocate'}</span>
              </div>
              <p className="item-subtitle">
                <strong>Practice:</strong> {lawyer.praticeAreas || lawyer.practiceAreas || 'General Practice'} &nbsp;|&nbsp; 
                <strong>Location:</strong> {lawyer.Location || lawyer.location || 'Pan India'}
              </p>
              <span className="click-hint">Click to view details &rarr;</span>
            </div>
          ))
        )}

        {activeTab === 'lawfirms' && (
          lawfirms.map((firm) => (
            <div
              key={firm._id}
              className="list-item-card"
              onClick={() => onNavigate('plain-page')}
            >
              <div className="item-top-row">
                <h3 className="item-title">{firm.firmName}</h3>
                <span className="item-badge">Law Firm</span>
              </div>
              <p className="item-subtitle">
                <strong>Practice:</strong> {firm.practicesAreas || 'Corporate / Litigation'} &nbsp;|&nbsp; 
                <strong>Offices:</strong> {firm.officeLocations || 'Multiple Locations'}
              </p>
              <span className="click-hint">Click to view details &rarr;</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ClientDashboard;
