import { useState } from 'react';
import '../styles/plainPage.css';
import axios from 'axios';

function BigPicture({ onBack, initialItem }) {
  const [showModal, setShowModal] = useState(false);
  const [appointmentNote, setAppointmentNote] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentSuccess, setAppointmentSuccess] = useState(false);
  const [dateError, setDateError] = useState('');

  const todayStr = new Date().toISOString().split('T')[0];

  // If no initial item was passed, show empty state with back button
  if (!initialItem) {
    return (
      <div className="plain-page-wrapper">
        <div className="plain-details-card">
          <div className="plain-header-banner">
            <button className="plain-page-back-btn" onClick={onBack}>
              &larr; Back to Dashboard
            </button>
          </div>
          <div className="empty-plain-state">
            <h3>No Profile Selected</h3>
            <p>Please select a lawyer or law firm from the dashboard to view full details.</p>
            <button className="plain-page-back-btn" onClick={onBack}>
              &larr; Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Determine role based on schema attributes
  const isLawfirm = Boolean(initialItem.firmName || initialItem.officeLocations || initialItem.practicesAreas);
  const isLawyer = Boolean(initialItem.barCouncilNumber || initialItem.praticeAreas || initialItem.Location || initialItem.education);

  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    setDateError('');

    // Check future date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const chosenDate = new Date(appointmentDate);

    if (!appointmentDate || chosenDate < today) {
      setDateError("Please check and add a future date. Past dates are not allowed for appointments.");
      alert("Please check and add a future date for your appointment.");
      return;
    }

    try {
      const appointmentData = {
        date: appointmentDate,
        message: appointmentNote,
        lawyerId: isLawyer ? initialItem._id : null,
        lawfirmId: isLawfirm ? initialItem._id : null
      };


      const response = await axios.post(
        "http://localhost:3000/clients/makeappointment",
        appointmentData,
        {
          withCredentials: true
        }
      );

      console.log("Appointment created:", response.data);

      setAppointmentSuccess(true);

      setTimeout(() => {
        setShowModal(false);
        setAppointmentSuccess(false);
        setAppointmentNote('');
        setAppointmentDate('');

        alert("Appointment request submitted successfully!");
      }, 1200);

    } catch (error) {
      console.log("Error submitting appointment request:", error);

      alert(
        error.response?.data?.error ||
        error.response?.data ||
        "Failed to submit appointment request. Please ensure you are logged in."
      );
    }
  };

  return (
    <div className="plain-page-wrapper">
      <div className="plain-details-card">
        {/* Header with Back button on Left */}
        <div className="plain-header-banner">
          <button className="plain-page-back-btn" onClick={onBack}>
            &larr; Back to Dashboard
          </button>
        </div>

        {/* Hero Section */}
        <div className="plain-hero-section">
          <div className="plain-hero-title">
            <h1>{initialItem.firmName || initialItem.name || 'Big Picture Details'}</h1>
            <div className="plain-hero-badge-row">
              <span className="role-badge">
                {isLawfirm ? 'Law Firm' : isLawyer ? 'Lawyer' : 'Profile'}
              </span>
              {(initialItem.vertificationStatus || initialItem.vertficationsStatus) && (
                <span className="status-badge">
                  {initialItem.vertificationStatus || initialItem.vertficationsStatus}
                </span>
              )}
              {initialItem.accountStatus && (
                <span className="status-badge">
                  Account: {initialItem.accountStatus}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Body showing ONLY Database Table Attributes */}
        <div className="plain-body-content">
          {/* ================= LAWYER ATTRIBUTES ================= */}
          {isLawyer && (
            <>
              <div className="plain-section-header">Basic Details</div>
              <div className="attributes-grid">
                <div className="attribute-item">
                  <div className="attribute-label">Name</div>
                  <div className="attribute-value">{initialItem.name || 'N/A'}</div>
                </div>
                <div className="attribute-item">
                  <div className="attribute-label">Age</div>
                  <div className="attribute-value">{initialItem.age || 'N/A'}</div>
                </div>
                <div className="attribute-item">
                  <div className="attribute-label">Contact</div>
                  <div className="attribute-value">{initialItem.contact || 'N/A'}</div>
                </div>
                <div className="attribute-item">
                  <div className="attribute-label">Email</div>
                  <div className="attribute-value">{initialItem.email || 'N/A'}</div>
                </div>
                <div className="attribute-item">
                  <div className="attribute-label">Location</div>
                  <div className="attribute-value">{initialItem.Location || initialItem.location || 'N/A'}</div>
                </div>
                <div className="attribute-item">
                  <div className="attribute-label">Bar Council Number</div>
                  <div className="attribute-value">{initialItem.barCouncilNumber || 'N/A'}</div>
                </div>
              </div>

              <div className="plain-section-header">Professional &amp; Practice Details</div>
              <div className="attributes-grid">
                <div className="attribute-item">
                  <div className="attribute-label">Education</div>
                  <div className="attribute-value">{initialItem.education || 'N/A'}</div>
                </div>
                <div className="attribute-item">
                  <div className="attribute-label">Experience</div>
                  <div className="attribute-value">{initialItem.experience || 'N/A'}</div>
                </div>
                <div className="attribute-item">
                  <div className="attribute-label">Practice Areas</div>
                  <div className="attribute-value">{initialItem.praticeAreas || initialItem.practiceAreas || 'N/A'}</div>
                </div>
                <div className="attribute-item">
                  <div className="attribute-label">Skills</div>
                  <div className="attribute-value">{initialItem.skills || 'N/A'}</div>
                </div>
                <div className="attribute-item">
                  <div className="attribute-label">Languages</div>
                  <div className="attribute-value">{initialItem.languages || 'N/A'}</div>
                </div>
                <div className="attribute-item">
                  <div className="attribute-label">Certifications</div>
                  <div className="attribute-value">{initialItem.certifications || 'N/A'}</div>
                </div>
              </div>

              <div className="plain-section-header">Additional Background &amp; Honors</div>
              <div className="attributes-grid">
                <div className="attribute-item full-width">
                  <div className="attribute-label">Previous Firms</div>
                  <div className="attribute-value">{initialItem.previousFirms || 'Nothing'}</div>
                </div>
                <div className="attribute-item full-width">
                  <div className="attribute-label">Achievements</div>
                  <div className="attribute-value">{initialItem.achievements || 'Nothing'}</div>
                </div>
                <div className="attribute-item full-width">
                  <div className="attribute-label">Publications</div>
                  <div className="attribute-value">{initialItem.publications || 'Nothing'}</div>
                </div>
                <div className="attribute-item full-width">
                  <div className="attribute-label">Awards</div>
                  <div className="attribute-value">{initialItem.awards || 'Nothing'}</div>
                </div>
                <div className="attribute-item">
                  <div className="attribute-label">Account Status</div>
                  <div className="attribute-value">{initialItem.accountStatus || 'Active'}</div>
                </div>
                <div className="attribute-item">
                  <div className="attribute-label">Verification Status</div>
                  <div className="attribute-value">{initialItem.vertificationStatus || 'Verified'}</div>
                </div>
              </div>
            </>
          )}

          {/* ================= LAW FIRM ATTRIBUTES ================= */}
          {isLawfirm && (
            <>
              <div className="plain-section-header">Firm Overview</div>
              <div className="attributes-grid">
                <div className="attribute-item full-width">
                  <div className="attribute-label">Firm Name</div>
                  <div className="attribute-value">{initialItem.firmName || 'N/A'}</div>
                </div>
                <div className="attribute-item full-width">
                  <div className="attribute-label">Description</div>
                  <div className="attribute-value">{initialItem.desription || 'N/A'}</div>
                </div>
                <div className="attribute-item">
                  <div className="attribute-label">Practice Areas</div>
                  <div className="attribute-value">{initialItem.practicesAreas || 'N/A'}</div>
                </div>
                <div className="attribute-item">
                  <div className="attribute-label">Office Locations</div>
                  <div className="attribute-value">{initialItem.officeLocations || 'N/A'}</div>
                </div>
                <div className="attribute-item">
                  <div className="attribute-label">Website</div>
                  <div className="attribute-value">
                    {initialItem.website ? (
                      <a href={initialItem.website.startsWith('http') ? initialItem.website : `https://${initialItem.website}`} target="_blank" rel="noreferrer">
                        {initialItem.website}
                      </a>
                    ) : 'N/A'}
                  </div>
                </div>
                <div className="attribute-item">
                  <div className="attribute-label">Contact Email</div>
                  <div className="attribute-value">{initialItem.contactEmail || 'N/A'}</div>
                </div>
                <div className="attribute-item full-width">
                  <div className="attribute-label">Verification Status</div>
                  <div className="attribute-value">{initialItem.vertficationsStatus || 'Verified'}</div>
                </div>
              </div>
            </>
          )}

          {/* Fallback for general object if neither explicitly matched */}
          {!isLawyer && !isLawfirm && (
            <div className="attributes-grid">
              {Object.entries(initialItem)
                .filter(([key]) => key !== '_id' && key !== 'password' && key !== '__v')
                .map(([key, value]) => (
                  <div key={key} className="attribute-item">
                    <div className="attribute-label">{key}</div>
                    <div className="attribute-value">{String(value || 'N/A')}</div>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Card Footer with Request Appointment on Right Bottom Corner */}
        <div className="plain-card-footer">
          <button
            className="request-appoint-btn"
            onClick={() => setShowModal(true)}
          >
            Request Appointment
          </button>
        </div>
      </div>

      {/* Fixed Floating Action Button on Right Bottom Corner of Viewport */}
      <div className="fixed-bottom-right-action">
        <button
          className="request-appoint-btn"
          onClick={() => setShowModal(true)}
        >
          Request Appointment
        </button>
      </div>

      {/* Appointment Request Modal */}
      {showModal && (
        <div className="appoint-modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="appoint-modal-box" onClick={(e) => e.stopPropagation()}>
            <h3>Request Appointment</h3>
            <p>Schedule an appointment with {initialItem.firmName || initialItem.name}.</p>

            <form onSubmit={handleRequestSubmit}>
              <div className="appoint-form-group">
                <label>Preferred Date (Future dates only)</label>
                <input
                  type="date"
                  required
                  min={todayStr}
                  value={appointmentDate}
                  onChange={(e) => {
                    const val = e.target.value;
                    setAppointmentDate(val);
                    if (val && val < todayStr) {
                      setDateError("Please check and select a future date. Past dates are not allowed.");
                    } else {
                      setDateError("");
                    }
                  }}
                />
                {dateError && (
                  <div style={{ color: '#f87171', fontSize: '13px', marginTop: '4px' }}>
                    ⚠️ {dateError}
                  </div>
                )}
              </div>


              <div className="appoint-form-group">
                <label>Purpose / Note</label>
                <textarea
                  rows="3"
                  required
                  placeholder="Enter the purpose for your appointment..."
                  value={appointmentNote}
                  onChange={(e) => setAppointmentNote(e.target.value)}
                />
              </div>

              <div className="appoint-modal-actions">
                <button
                  type="button"
                  className="appoint-cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="appoint-submit-btn">
                  {appointmentSuccess ? 'Submitted!' : 'Submit Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default BigPicture;
