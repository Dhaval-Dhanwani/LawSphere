import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/appointments.css';

function LawfirmAppointments({ onBack }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAppointments = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:3000/lawfirm/appointments",
          {
            withCredentials: true
          }
        );

        if (Array.isArray(response.data)) {
          setAppointments(response.data);
        } else {
          setAppointments([]);
        }
      } catch (error) {
        console.error("Error fetching law firm appointments:", error);
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };

    getAppointments();
  }, []);

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      const response = await axios.patch(
        "http://localhost:3000/lawfirm/AppointmentStatus",
        {
          appointmentId: appointmentId,
          requestStatus: newStatus
        },
        {
          withCredentials: true
        }
      );

      setAppointments((prev) =>
        prev.map((apt) =>
          apt._id === appointmentId
            ? {
                ...apt,
                requestStatus: response.data.requestStatus || newStatus
              }
            : apt
        )
      );
    } catch (error) {
      console.error("Error updating appointment status:", error);
      alert("Failed to update appointment status. Please try again.");
    }
  };

  return (
    <div className="appointments-container">
      <div className="appointments-card">
        {/* Header */}
        <div className="appointments-header-banner">
          <button
            className="appointments-back-btn"
            onClick={onBack}
          >
            &larr; Back to Dashboard
          </button>
        </div>

        {/* Hero */}
        <div className="appointments-hero-info">
          <h2>Client Appointment Requests (Law Firm)</h2>
          <p>
            Review and respond to client consultations submitted directly to your law firm.
          </p>
        </div>

        {/* Appointments List */}
        <div className="appointments-list">
          {appointments.length > 0 ? (
            appointments.map((apt) => (
              <div
                key={apt._id}
                className="appointment-item-card"
              >
                {/* Top Row */}
                <div className="appointment-top-row">
                  <h3 className="appointment-practitioner-name">
                    {apt.clientId?.name || apt.clientName || 'Client'}
                  </h3>

                  <span
                    className={`apt-status-badge ${apt.requestStatus ? apt.requestStatus.toLowerCase() : 'pending'}`}
                  >
                    {apt.requestStatus || 'Pending'}
                  </span>
                </div>

                {/* Appointment Information */}
                <div className="appointment-meta-grid">
                  <div className="meta-field">
                    <strong>Client Email:</strong>{' '}
                    {apt.clientId?.email || 'N/A'}
                  </div>

                  <div className="meta-field">
                    <strong>Contact:</strong>{' '}
                    {apt.clientId?.contact || 'N/A'}
                  </div>

                  <div className="meta-field">
                    <strong>Scheduled Date:</strong>{' '}
                    {apt.date ? new Date(apt.date).toLocaleDateString() : 'N/A'}
                  </div>

                  <div className="meta-field">
                    <strong>Legal Subject / Note:</strong>{' '}
                    {apt.message || 'Not specified'}
                  </div>
                </div>

                {/* Client Message */}
                {apt.message && (
                  <div className="appointment-note-box">
                    <strong>Client Note:</strong>{' '}
                    {apt.message}
                  </div>
                )}

                {/* Accept / Reject Buttons */}
                <div className="appointment-card-actions">
                  <button
                    className="apt-accept-btn"
                    disabled={
                      apt.requestStatus === 'Accepted' ||
                      apt.requestStatus === 'Rejected' ||
                      apt.requestStatus === 'Cancelled'
                    }
                    onClick={() =>
                      handleStatusChange(
                        apt._id,
                        'Accepted'
                      )
                    }
                  >
                    {apt.requestStatus === 'Accepted'
                      ? 'Accepted'
                      : 'Accept'}
                  </button>

                  <button
                    className="apt-reject-btn"
                    disabled={
                      apt.requestStatus === 'Rejected' ||
                      apt.requestStatus === 'Accepted' ||
                      apt.requestStatus === 'Cancelled'
                    }
                    onClick={() =>
                      handleStatusChange(
                        apt._id,
                        'Rejected'
                      )
                    }
                  >
                    {apt.requestStatus === 'Rejected'
                      ? 'Rejected'
                      : 'Reject'}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="appointments-empty">
              <p>
                {loading ? 'Loading appointments...' : 'No incoming appointment requests for your law firm at this moment.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LawfirmAppointments;
