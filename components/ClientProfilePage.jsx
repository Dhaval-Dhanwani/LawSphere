import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/profilePage.css';
import userAvatar from '../src/assets/images/user-avatar.png';

function ClientProfilePage({ onBack, initialData = {} }) {
  const defaultValues = {
    name: initialData.name || '',
    age: initialData.age || '',
    contact: initialData.contact || '',
    email: initialData.email || '',
    address: initialData.address || '',
  };

  const [originalData, setOriginalData] = useState(defaultValues);
  const [formData, setFormData] = useState(defaultValues);
  const [statusMessage, setStatusMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch client data on mount where database model == session.role and id == session.id
  useEffect(() => {
    axios.get("http://localhost:3000/clients/profile", {
      withCredentials: true
    })
    .then(response => {
      if (response.data) {
        const client = response.data;
        const populatedData = {
          name: client.name || '',
          age: client.age !== undefined && client.age !== null ? String(client.age) : '',
          contact: client.contact !== undefined && client.contact !== null ? String(client.contact) : '',
          email: client.email || '',
          address: client.address || '',
        };
        setFormData(populatedData);
        setOriginalData(populatedData);
      }
    })
    .catch(error => {
      console.error("Error fetching client profile:", error);
      const msg = error.response?.data?.error || 'Failed to fetch client profile data.';
      setStatusMessage({
        type: 'error',
        text: msg
      });
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Compute only modified fields for PATCH request
    const modifiedFields = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== originalData[key]) {
        modifiedFields[key] = formData[key];
      }
    });

    if (Object.keys(modifiedFields).length === 0) {
      setStatusMessage({
        type: 'info',
        text: 'No changes detected to update.',
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.patch(
        "http://localhost:3000/clients/profile",
        modifiedFields,
        {
          withCredentials: true
        }
      );

      console.log('PATCH Response:', response.data);

      // Update original data baseline with modified fields
      setOriginalData({ ...formData });
      setStatusMessage({
        type: 'success',
        text: `Profile updated successfully! Modified fields: ${Object.keys(modifiedFields).join(', ')}`,
      });
    } catch (error) {
      console.error('Error saving profile:', error);
      const errorMsg = error.response?.data?.error || error.response?.data?.message || 'Failed to update profile. Please try again.';
      setStatusMessage({
        type: 'error',
        text: errorMsg,
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setStatusMessage(null);
      }, 4000);
    }
  };

  return (
    <div className="profile-page-container">
      <div className="profile-card">
        {/* Top Banner Navigation */}
        <div className="profile-header-banner">
          <button type="button" className="profile-back-btn" onClick={onBack}>
            &larr; Back to Dashboard
          </button>
          <span className="profile-role-tag">Client Portal</span>
        </div>

        {/* Profile Hero Header */}
        <div className="profile-hero-section">
          <div className="profile-avatar-wrapper">
            <img src={userAvatar} alt="Client Avatar" className="profile-avatar-img" />
          </div>
          <div className="profile-hero-info">
            <h1>{formData.name ? formData.name : 'Client Profile'}</h1>
            <div className="profile-hero-badges">
              <span className="profile-role-tag">Client</span>
              {formData.email && (
                <span className="profile-status-tag">● {formData.email}</span>
              )}
            </div>
          </div>
        </div>

        {/* Notice Info Box */}
        <div className="profile-notice-box">
          <span>ℹ️</span>
          <span>Edit your client profile information below and click Save to apply changes.</span>
        </div>

        {/* Form Body */}
        <form className="profile-form-body" onSubmit={handleSave}>
          {statusMessage && (
            <div className={`profile-save-alert ${statusMessage.type === 'error' ? 'alert-error' : statusMessage.type === 'info' ? 'alert-info' : ''}`}>
              <span>
                {statusMessage.type === 'success' ? '✓ ' : statusMessage.type === 'error' ? '⚠ ' : 'ℹ '}
                {statusMessage.text}
              </span>
              <button
                type="button"
                onClick={() => setStatusMessage(null)}
                style={{ background: 'transparent', border: 'none', color: 'inherit', cursor: 'pointer', fontWeight: 'bold' }}
              >
                ✕
              </button>
            </div>
          )}

          <div className="profile-section-title">
            <span>👤 Personal Details</span>
          </div>

          <div className="profile-grid-2">
            <div className="profile-input-group">
              <label htmlFor="client-name">Full Name</label>
              <input
                id="client-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </div>

            <div className="profile-input-group">
              <label htmlFor="client-age">Age</label>
              <input
                id="client-age"
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter age"
              />
            </div>
          </div>

          <div className="profile-grid-2">
            <div className="profile-input-group">
              <label htmlFor="client-contact">Contact Number</label>
              <input
                id="client-contact"
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="Enter contact number"
              />
            </div>

            <div className="profile-input-group">
              <label htmlFor="client-email">Email Address</label>
              <input
                id="client-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
              />
            </div>
          </div>

          <div className="profile-section-title">
            <span>📍 Address Information</span>
          </div>

          <div className="profile-input-group full-width">
            <label htmlFor="client-address">Address</label>
            <input
              id="client-address"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter full address"
            />
          </div>

          {/* Action Buttons */}
          <div className="profile-actions-bar">
            <button
              type="submit"
              className="profile-save-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ClientProfilePage;
