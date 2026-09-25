import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/clientDashboard.css';
import userAvatar from '../src/assets/images/user-avatar.png';

function LawyerDashboard({ onNavigate }) {
  const [lawfirms, setLawfirms] = useState([]);

  useEffect(() => {
    // Fetch law firms from backend database
    axios.get("http://localhost:3000/lawyers/ListLawfirms")
      .then((response) => {
        if (response.data && Array.isArray(response.data)) {
          setLawfirms(response.data);
        } else {
          setLawfirms([]);
        }
      })
      .catch((error) => {
        console.log("Error fetching law firms:", error);
        setLawfirms([]);
      });
  }, []);

  return (
    <div className="client-dashboard-container">
      {/* Top action bar with Profile button */}
      <div className="dashboard-top-bar">
        <span className="dashboard-portal-tag">Lawyer Portal</span>
        <button
          className="dashboard-profile-btn"
          title="Profile"
          aria-label="Profile"
          onClick={() => onNavigate && onNavigate('lawyer-profile')}
        >
          <img src={userAvatar} alt="Profile" className="dashboard-profile-img" />
        </button>
      </div>

      <div className="dashboard-header-block">
        <h2>Explore Registered Law Firms</h2>
        <p>Discover leading law firms, organizational practices, and partner engagements.</p>
      </div>

      <div className="dashboard-list">
        {lawfirms.length > 0 ? (
          lawfirms.map((firm) => (
            <div
              key={firm._id}
              className="list-item-card"
              onClick={() => onNavigate('plain-page')}
            >
              <div className="item-top-row">
                <h3 className="item-title">{firm.firmName}</h3>
                <span className="item-badge">Verified Law Firm</span>
              </div>
              <p className="item-subtitle">
                <strong>Practice Areas:</strong> {firm.practicesAreas || 'Full Service'} &nbsp;|&nbsp; 
                <strong>Offices:</strong> {firm.officeLocations || 'Multiple Cities'}
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
              <span className="click-hint">Click to view law firm profile &rarr;</span>
            </div>
          ))
        ) : (
          <div className="dashboard-empty">
            <p>data is not avaliable</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default LawyerDashboard;
