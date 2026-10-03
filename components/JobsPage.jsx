import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/clientDashboard.css';

function JobsPage({ onBack }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/lawyers/jobs", {
          withCredentials: true
        });

        if (Array.isArray(response.data)) {
          setJobs(response.data);
        } else {
          setJobs([]);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      (job.jobTitle && job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (job.practiceArea && job.practiceArea.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (job.location && job.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (job.firmName && job.firmName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (job.lawfirmId?.firmName && job.lawfirmId.firmName.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesType = selectedType === 'All' || job.jobType === selectedType;

    return matchesSearch && matchesType;
  });

  return (
    <div className="client-dashboard-container">
      {/* Top Banner with Back Button */}
      <div className="dashboard-top-bar">
        <span className="dashboard-portal-tag">Legal Career Board</span>
        <button
          className="dashboard-signout-btn"
          style={{ borderColor: 'rgba(59, 130, 246, 0.4)', background: 'rgba(59, 130, 246, 0.18)', color: '#93c5fd' }}
          onClick={onBack}
        >
          &larr; Back to Lawyer Dashboard
        </button>
      </div>

      {/* Header Block */}
      <div className="dashboard-header-block">
        <h2>Explore Available Law Firm Job Postings</h2>
        <p>Discover associate openings, counsel roles, and internships posted by registered law firms.</p>
      </div>

      {/* Search and Filters */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
        marginBottom: '24px',
        alignItems: 'center'
      }}>
        <input
          type="text"
          placeholder="Search by title, firm, practice area, location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: '1 1 260px',
            padding: '12px 16px',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            background: 'rgba(0, 0, 0, 0.2)',
            color: '#ffffff',
            fontSize: '14px',
            outline: 'none'
          }}
        />

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['All', 'Full-Time', 'Part-Time', 'Contract', 'Internship', 'Freelance'].map((type) => (
            <button
              key={type}
              type="button"
              className={`dashboard-nav-btn ${selectedType === type ? 'active' : ''}`}
              style={{ padding: '8px 14px', fontSize: '13px' }}
              onClick={() => setSelectedType(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Jobs List */}
      <div className="dashboard-list">
        {loading ? (
          <div className="dashboard-empty">
            <p>Loading available jobs from database...</p>
          </div>
        ) : filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div key={job._id} className="list-item-card" style={{ cursor: 'default' }}>
              <div className="item-top-row">
                <div>
                  <h3 className="item-title" style={{ fontSize: '20px', marginBottom: '4px' }}>
                    {job.jobTitle}
                  </h3>
                  <div style={{ color: '#93c5fd', fontSize: '14px', fontWeight: 600 }}>
                    🏢 {job.lawfirmId?.firmName || job.firmName || 'Registered Law Firm'}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span className="item-badge" style={{ background: '#3b82f6', color: '#ffffff' }}>
                    {job.jobType || 'Full-Time'}
                  </span>
                  {job.status && (
                    <span className="item-badge" style={{
                      background: job.status === 'Active' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(234, 179, 8, 0.2)',
                      color: job.status === 'Active' ? '#86efac' : '#fde047',
                      border: `1px solid ${job.status === 'Active' ? '#22c55e' : '#eab308'}`
                    }}>
                      {job.status}
                    </span>
                  )}
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '10px',
                marginTop: '12px',
                marginBottom: '12px',
                fontSize: '14px',
                opacity: 0.9
              }}>
                <div><strong>⚖️ Practice Area:</strong> {job.practiceArea || 'General'}</div>
                <div><strong>💼 Experience:</strong> {job.experienceRequired || 'Any'}</div>
                <div><strong>📍 Location:</strong> {job.location || 'Pan India'}</div>
                <div>
                  <strong>📅 Valid Till:</strong>{' '}
                  {job.scheduledDate
                    ? new Date(job.scheduledDate).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })
                    : 'Open until filled'}
                </div>
              </div>

              <div style={{
                marginTop: '12px',
                paddingTop: '12px',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                fontSize: '14px',
                lineHeight: '1.6',
                opacity: 0.85
              }}>
                <strong>Description:</strong>
                <p style={{ marginTop: '6px', whiteSpace: 'pre-line' }}>{job.description}</p>
              </div>

              {job.lawfirmId?.contactEmail && (
                <div style={{
                  marginTop: '10px',
                  fontSize: '13px',
                  color: '#93c5fd'
                }}>
                  ✉️ Firm Contact: {job.lawfirmId.contactEmail}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="dashboard-empty">
            <p>
              {searchTerm || selectedType !== 'All'
                ? 'No job postings match your filter criteria.'
                : 'No active job postings found in the database. Active jobs will appear here till their scheduled date.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default JobsPage;
