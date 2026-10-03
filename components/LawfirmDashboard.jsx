import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/clientDashboard.css';
import userAvatar from '../src/assets/images/user-avatar.png';

function LawfirmDashboard({ onNavigate }) {
  const [lawyers, setLawyers] = useState([]);

  // Promise settle state is decide on status code given be controller
  useEffect(() => {
    // Fetch lawyers from backend database
    axios.get("http://localhost:3000/lawfirm/ListLawyers")
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
  }, []);

  return (
    <div className="client-dashboard-container">
      {/* Top action bar with MyAppointments, Post a Job & Profile buttons */}
      <div className="dashboard-top-bar">
        <span className="dashboard-portal-tag">Law Firm Portal</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <button
            className="dashboard-signout-btn"
            style={{ borderColor: 'rgba(59, 130, 246, 0.4)', background: 'rgba(59, 130, 246, 0.18)', color: '#93c5fd' }}
            onClick={() => onNavigate && onNavigate('lawfirm-appointments')}
          >
            &#128197; MyAppointments
          </button>
          <button
            className="dashboard-signout-btn"
            style={{ borderColor: 'rgba(249, 115, 22, 0.4)', background: 'rgba(249, 115, 22, 0.18)', color: '#fdba74' }}
            onClick={() => onNavigate && onNavigate('job-posting-form')}
          >
            &#128221; Post a Job
          </button>
          <button
            className="dashboard-profile-btn"
            title="Profile"
            aria-label="Profile"
            onClick={() => onNavigate && onNavigate('lawfirm-profile')}
          >
            <img src={userAvatar} alt="Profile" className="dashboard-profile-img" />
          </button>
        </div>
      </div>


      <div className="dashboard-header-block">
        <h2>Explore Verified Lawyers</h2>
        <p>Review and connect with advocates, associates, and legal specialists.</p>
      </div>

      <div className="dashboard-list">
        {lawyers.length > 0 ? (
          lawyers.map((lawyer) => (
            <div
              key={lawyer._id}
              className="list-item-card"
              onClick={() => onNavigate('plain-page', lawyer)}
            >
              <div className="item-top-row">
                <h3 className="item-title">{lawyer.name}</h3>
                <span className="item-badge">{lawyer.experience || 'Verified Advocate'}</span>
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
              <span className="click-hint">Click to view lawyer profile &rarr;</span>
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

export default LawfirmDashboard;
