import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/appointments.css';

function ClientAppointments({ onBack }) {

  const [appointments, setAppointments] = useState([]);
  const [targetToCancel, setTargetToCancel] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const getAppointments = async () => {

      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:3000/clients/appointments",
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

        console.log("Error fetching client appointments:", error);
        setAppointments([]);

      } finally {
        setLoading(false);
      }

    };

    getAppointments();

  }, []);


  const handleOpenCancelPrompt = (appointment) => {

    setTargetToCancel(appointment);
    setShowConfirmModal(true);

  };


  const handleConfirmCancel = async () => {

    if (!targetToCancel) return;

    try {

      // Update appointment status in MongoDB
      const response = await axios.patch(
        `http://localhost:3000/clients/CancelAppointment`,
        {
          appointId: targetToCancel._id
        },
        {
          withCredentials: true
        }
      );

      // Update frontend state using backend response
      setAppointments((prev) =>
        prev.map((apt) =>
          apt._id === targetToCancel._id
            ? {
                ...apt,
                requestStatus: response.data.requestStatus || 'Cancelled'
              }
            : apt
        )
      );

      setShowConfirmModal(false);
      setTargetToCancel(null);

    } catch (error) {

      console.log("Error cancelling appointment:", error);
      alert("Failed to cancel appointment. Please try again.");

    }

  };


  return (
    <div className="appointments-container">

      <div className="appointments-card">

        {/* Header Banner with Back Button */}

        <div className="appointments-header-banner">

          <button
            className="appointments-back-btn"
            onClick={onBack}
          >
            &larr; Back to Dashboard
          </button>

        </div>


        {/* Hero Information */}

        <div className="appointments-hero-info">

          <h2>My Appointments</h2>

          <p>
            Review and manage all consultation requests submitted
            to advocates and law firms.
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
                    {apt.lawyerId?.name || apt.lawfirmId?.firmName || apt.lawyerName || apt.lawfirmName || 'Legal Practitioner'}
                  </h3>

                  <span
                    className={`apt-status-badge ${apt.requestStatus.toLowerCase()}`}
                  >
                    {apt.requestStatus}
                  </span>

                </div>


                {/* Appointment Information */}

                <div className="appointment-meta-grid">

                  <div className="meta-field">

                    <strong>Practitioner Type:</strong>{' '}

                    {apt.lawfirmId && !apt.lawyerId
                      ? 'Law Firm'
                      : 'Lawyer'}

                  </div>


                  <div className="meta-field">

                    <strong>Scheduled Date:</strong>{' '}

                    {apt.date ? new Date(apt.date).toLocaleDateString() : 'N/A'}

                  </div>


                  <div className="meta-field">

                    <strong>Purpose / Subject:</strong>{' '}

                    {apt.message || apt.purpose || 'Not specified'}

                  </div>


                  <div className="meta-field">

                    <strong>Requested On:</strong>{' '}

                    {apt.createdAt ? new Date(apt.createdAt).toLocaleDateString() : 'N/A'}

                  </div>

                </div>


                {/* Client Message */}

                {apt.message && (

                  <div className="appointment-note-box">

                    <strong>Client Note:</strong>{' '}

                    {apt.message}

                  </div>

                )}


                {/* Cancel Button */}

                <div className="appointment-card-actions">

                  <button
                    className="apt-cancel-btn"

                    disabled={
                      apt.requestStatus === 'Cancelled' ||
                      apt.requestStatus === 'Rejected'
                    }

                    onClick={() =>
                      handleOpenCancelPrompt(apt)
                    }
                  >

                    {apt.requestStatus === 'Cancelled'
                      ? 'Cancelled'
                      : apt.requestStatus === 'Rejected'
                      ? 'Rejected'
                      : 'Cancel Appointment'}

                  </button>

                </div>

              </div>

            ))

          ) : (

            <div className="appointments-empty">

              <p>
                {loading ? 'Loading appointments...' : 'You have not made any appointments yet.'}
              </p>

            </div>

          )}

        </div>

      </div>


      {/* Confirmation Modal */}

      {showConfirmModal && targetToCancel && (

        <div
          className="confirm-modal-backdrop"

          onClick={() => {
            setShowConfirmModal(false);
            setTargetToCancel(null);
          }}
        >

          <div
            className="confirm-modal-box"

            onClick={(e) => e.stopPropagation()}
          >

            <h3>Confirm Cancellation</h3>

            <p>

              Are you sure you want to cancel your appointment with{' '}

              <strong>
                {targetToCancel.lawyerId?.name ||
                  targetToCancel.lawfirmId?.firmName ||
                  targetToCancel.lawyerName ||
                  targetToCancel.lawfirmName ||
                  'Practitioner'}
              </strong>

              {' '}scheduled for{' '}

              <strong>
                {targetToCancel.date ? new Date(
                  targetToCancel.date
                ).toLocaleDateString() : 'the scheduled date'}
              </strong>

              ?

            </p>


            <div className="confirm-modal-actions">

              <button
                className="confirm-btn-yes"
                onClick={handleConfirmCancel}
              >
                Yes, Cancel Appointment
              </button>


              <button
                className="confirm-btn-no"

                onClick={() => {
                  setShowConfirmModal(false);
                  setTargetToCancel(null);
                }}
              >
                No, Keep It
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default ClientAppointments;