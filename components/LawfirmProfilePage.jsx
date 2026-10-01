import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/profilePage.css';
import userAvatar from '../src/assets/images/user-avatar.png';

function LawfirmProfilePage({ onBack, initialData = {} }) {
  const defaultValues = {
    firmName: initialData.firmName || initialData.LawfirmName || '',
    description: initialData.description || initialData.desription || '',
    practiceAreas: initialData.practiceAreas || initialData.practicesAreas || '',
    officeLocations: initialData.officeLocations || '',
    website: initialData.website || '',
    contactEmail: initialData.contactEmail || initialData.contactemail || '',
  };

  const [originalData, setOriginalData] = useState(defaultValues);
  const [formData, setFormData] = useState(defaultValues);
  const [statusMessage, setStatusMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch law firm profile on mount where database model == session.role and id == session.id
  useEffect(() => {
    axios.get("http://localhost:3000/lawfirm/profile", {
      withCredentials: true
    })
    .then(response => {
      if (response.data) {
        const firm = response.data;
        const populatedData = {
          firmName: firm.firmName || firm.LawfirmName || '',
          description: firm.desription || firm.description || '',
          practiceAreas: firm.practicesAreas || firm.practiceAreas || '',
          officeLocations: firm.officeLocations || '',
          website: firm.website || '',
          contactEmail: firm.contactEmail || firm.contactemail || '',
        };
        setFormData(populatedData);
        setOriginalData(populatedData);
      }
    })
    .catch(error => {
      console.error("Error fetching law firm profile:", error);
      const msg = error.response?.data?.error || 'Failed to fetch law firm profile data.';
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
        "http://localhost:3000/lawfirm/profile",
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
        text: `Law Firm profile updated successfully! Modified fields: ${Object.keys(modifiedFields).join(', ')}`,
      });
    } catch (error) {
      console.error('Error saving law firm profile:', error);
      const errorMsg = error.response?.data?.error || error.response?.data?.message || 'Failed to update law firm profile. Please try again.';
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
          <span className="profile-role-tag">Law Firm Portal</span>
        </div>

        {/* Profile Hero Header */}
        <div className="profile-hero-section">
          <div className="profile-avatar-wrapper">
            <img src={userAvatar} alt="Law Firm Avatar" className="profile-avatar-img" />
          </div>
          <div className="profile-hero-info">
            <h1>{formData.firmName ? formData.firmName : 'Law Firm Profile'}</h1>
            <div className="profile-hero-badges">
              <span className="profile-role-tag">Law Firm</span>
              {formData.contactEmail && (
                <span className="profile-status-tag">● {formData.contactEmail}</span>
              )}
            </div>
          </div>
        </div>

        {/* Notice Info Box */}
        <div className="profile-notice-box">
          <span>ℹ️</span>
          <span>Edit your law firm details below and click Save to apply changes.</span>
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
            <span>🏢 Law Firm Information</span>
          </div>

          <div className="profile-input-group full-width">
            <label htmlFor="firm-name">Law Firm Name</label>
            <input
              id="firm-name"
              type="text"
              name="firmName"
              value={formData.firmName}
              onChange={handleChange}
              placeholder="Enter law firm name"
            />
          </div>

          <div className="profile-grid-2">
            <div className="profile-input-group">
              <label htmlFor="firm-contact-email">Contact Email</label>
              <input
                id="firm-contact-email"
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                placeholder="Enter official email"
              />
            </div>

            <div className="profile-input-group">
              <label htmlFor="firm-website">Website</label>
              <input
                id="firm-website"
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://www.examplefirm.com"
              />
            </div>
          </div>

          <div className="profile-section-title">
            <span>⚖️ Practice & Locations</span>
          </div>

          <div className="profile-input-group full-width">
            <label htmlFor="firm-practice-areas">Practice Areas</label>
            <input
              id="firm-practice-areas"
              type="text"
              name="practiceAreas"
              value={formData.practiceAreas}
              onChange={handleChange}
              placeholder="e.g. Corporate M&A, Criminal, Civil Litigation"
            />
          </div>

          <div className="profile-input-group full-width">
            <label htmlFor="firm-office-locations">Offline Locations</label>
            <input
              id="firm-office-locations"
              type="text"
              name="officeLocations"
              value={formData.officeLocations}
              onChange={handleChange}
              placeholder="e.g. Mumbai, New Delhi, Bengaluru"
            />
          </div>

          <div className="profile-input-group full-width">
            <label htmlFor="firm-description">Description</label>
            <input
              id="firm-description"
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter law firm description and overview"
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

export default LawfirmProfilePage;
