import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/clientDashboard.css';
import userAvatar from '../src/assets/images/user-avatar.png';

function LawyerDashboard({ onNavigate }) {
  const [lawfirms, setLawfirms] = useState([]);

  useEffect(() => {
    // Fetch law firms from backend if available, fallback to initial mock data for testing
    axios.get("http://localhost:3000/lawyers/ListLawfirms")
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setLawfirms(response.data);
        } else {
          setMockData();
        }
      })
      .catch((error) => {
        console.log("Using mock data for law firms:", error);
        setMockData();
      });

    function setMockData() {
      setLawfirms([
        {
          _id: '1',
          firmName: 'Shardul Amarchand Mangaldas & Co',
          practicesAreas: 'General Corporate, M&A, Private Equity, Competition Law',
          officeLocations: 'New Delhi, Mumbai, Bengaluru, Kolkata',
          website: 'https://www.amarchand.com',
          contactEmail: 'contact@amarchand.com',
          desription: 'One of India’s leading full-service law firms representing premier domestic and multinational corporations.'
        },
        {
          _id: '2',
          firmName: 'Khaitan & Co',
          practicesAreas: 'Banking & Finance, Dispute Resolution, Real Estate, IP',
          officeLocations: 'Mumbai, Bengaluru, Kolkata, Chennai, Singapore',
          website: 'https://www.khaitanco.com',
          contactEmail: 'info@khaitanco.com',
          desription: 'A tier-one Indian law firm offering comprehensive legal solutions across industries with century-old legacy.'
        },
        {
          _id: '3',
          firmName: 'AZB & Partners',
          practicesAreas: 'M&A, Securities, White-Collar Crime, Restructuring',
          officeLocations: 'Mumbai, Delhi NCR, Bengaluru, Pune',
          website: 'https://www.azbpartners.com',
          contactEmail: 'connect@azbpartners.com',
          desription: 'A pre-eminent corporate law firm known for handling landmark transactions and high-stakes dispute resolution.'
        },
        {
          _id: '4',
          firmName: 'Cyril Amarchand Mangaldas',
          practicesAreas: 'Capital Markets, Infrastructure, Technology & Fintech',
          officeLocations: 'Mumbai, New Delhi, Bengaluru, Hyderabad, GIFT City',
          website: 'https://www.cyrilamarchand.com',
          contactEmail: 'cam.contact@cyrilamarchand.com',
          desription: 'India’s largest full-service law firm with global footprint and visionary legal advisory.'
        }
      ]);
    }
  }, []);

  return (
    <div className="client-dashboard-container">
      {/* Top action bar with Profile button */}
      <div className="dashboard-top-bar">
        <span className="dashboard-portal-tag">Lawyer Portal</span>
        <button className="dashboard-profile-btn" title="Profile" aria-label="Profile">
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
            <p>No law firms found at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default LawyerDashboard;
