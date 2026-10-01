import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/profilePage.css';
import userAvatar from '../src/assets/images/user-avatar.png';

function LawyerProfilePage({ onBack, initialData = {} }) {
  const defaultValues = {
    name: initialData.name || '',
    age: initialData.age || '',
    contact: initialData.contact || '',
    email: initialData.email || '',
    education: initialData.education || '',
    barCouncilNumber: initialData.barCouncilNumber || initialData.barcouncilNumber || '',
    practiceNumber: initialData.practiceNumber || '',
    practiceAreas: initialData.practiceAreas || initialData.praticeAreas || '',
    location: initialData.location || initialData.Location || '',
    experience: initialData.experience || initialData.experenice || '',
    skills: initialData.skills || '',
    certifications: initialData.certifications || '',
    previousFirms: initialData.previousFirms || initialData.previousfirms || '',
    achievements: initialData.achievements || '',
    publications: initialData.publications || '',
    awards: initialData.awards || '',
  };

  const [originalData, setOriginalData] = useState(defaultValues);
  const [formData, setFormData] = useState(defaultValues);
  const [statusMessage, setStatusMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch lawyer profile on mount where database model == session.role and id == session.id
  useEffect(() => {
    axios.get("http://localhost:3000/lawyers/profile", {
      withCredentials: true
    })
    .then(response => {
      if (response.data) {
        const lawyer = response.data;
        const populatedData = {
          name: lawyer.name || '',
          age: lawyer.age !== undefined && lawyer.age !== null ? String(lawyer.age) : '',
          contact: lawyer.contact !== undefined && lawyer.contact !== null ? String(lawyer.contact) : '',
          email: lawyer.email || '',
          education: lawyer.education || '',
          barCouncilNumber: lawyer.barCouncilNumber || lawyer.barcouncilNumber || '',
          practiceNumber: lawyer.practiceNumber || '',
          practiceAreas: lawyer.praticeAreas || lawyer.practiceAreas || '',
          location: lawyer.Location || lawyer.location || '',
          experience: lawyer.experience || lawyer.experenice || '',
          skills: lawyer.skills || '',
          certifications: lawyer.certifications || '',
          previousFirms: lawyer.previousFirms || lawyer.previousfirms || '',
          achievements: lawyer.achievements || '',
          publications: lawyer.publications || '',
          awards: lawyer.awards || '',
        };
        setFormData(populatedData);
        setOriginalData(populatedData);
      }
    })
    .catch(error => {
      console.error("Error fetching lawyer profile:", error);
      const msg = error.response?.data?.error || 'Failed to fetch lawyer profile data.';
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
        "http://localhost:3000/lawyers/profile",
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
        text: `Lawyer profile updated successfully! Modified fields: ${Object.keys(modifiedFields).join(', ')}`,
      });
    } catch (error) {
      console.error('Error saving lawyer profile:', error);
      const errorMsg = error.response?.data?.error || error.response?.data?.message || 'Failed to update lawyer profile. Please try again.';
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
          <span className="profile-role-tag">Lawyer Portal</span>
        </div>

        {/* Profile Hero Header */}
        <div className="profile-hero-section">
          <div className="profile-avatar-wrapper">
            <img src={userAvatar} alt="Lawyer Avatar" className="profile-avatar-img" />
          </div>
          <div className="profile-hero-info">
            <h1>{formData.name ? formData.name : 'Lawyer Profile'}</h1>
            <div className="profile-hero-badges">
              <span className="profile-role-tag">Advocate / Lawyer</span>
              {formData.email && (
                <span className="profile-status-tag">● {formData.email}</span>
              )}
            </div>
          </div>
        </div>

        {/* Notice Info Box */}
        <div className="profile-notice-box">
          <span>ℹ️</span>
          <span>Edit your lawyer credentials and details below and click Save to apply changes.</span>
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
            <span>👤 Personal Information</span>
          </div>

          <div className="profile-grid-2">
            <div className="profile-input-group">
              <label htmlFor="lawyer-name">Full Name</label>
              <input
                id="lawyer-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
              />
            </div>

            <div className="profile-input-group">
              <label htmlFor="lawyer-age">Age</label>
              <input
                id="lawyer-age"
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
              <label htmlFor="lawyer-contact">Contact Number</label>
              <input
                id="lawyer-contact"
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="Enter contact number"
              />
            </div>

            <div className="profile-input-group">
              <label htmlFor="lawyer-email">Email Address</label>
              <input
                id="lawyer-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
              />
            </div>
          </div>

          <div className="profile-section-title">
            <span>⚖️ Legal Credentials & Practice</span>
          </div>

          <div className="profile-grid-2">
            <div className="profile-input-group">
              <label htmlFor="lawyer-bar-council">Bar Council Number</label>
              <input
                id="lawyer-bar-council"
                type="text"
                name="barCouncilNumber"
                value={formData.barCouncilNumber}
                onChange={handleChange}
                placeholder="e.g. BAR/2024/1234"
              />
            </div>

            <div className="profile-input-group">
              <label htmlFor="lawyer-practice-number">Practice Number</label>
              <input
                id="lawyer-practice-number"
                type="text"
                name="practiceNumber"
                value={formData.practiceNumber}
                onChange={handleChange}
                placeholder="Enter practice number"
              />
            </div>
          </div>

          <div className="profile-grid-2">
            <div className="profile-input-group">
              <label htmlFor="lawyer-practice-areas">Practice Areas</label>
              <input
                id="lawyer-practice-areas"
                type="text"
                name="practiceAreas"
                value={formData.practiceAreas}
                onChange={handleChange}
                placeholder="e.g. Corporate Law, Civil, Criminal"
              />
            </div>

            <div className="profile-input-group">
              <label htmlFor="lawyer-location">Location</label>
              <input
                id="lawyer-location"
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Ahmedabad, Gujarat"
              />
            </div>
          </div>

          <div className="profile-grid-2">
            <div className="profile-input-group">
              <label htmlFor="lawyer-education">Education</label>
              <input
                id="lawyer-education"
                type="text"
                name="education"
                value={formData.education}
                onChange={handleChange}
                placeholder="e.g. LL.B., LL.M."
              />
            </div>

            <div className="profile-input-group">
              <label htmlFor="lawyer-experience">Experience</label>
              <input
                id="lawyer-experience"
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="e.g. 5 Years"
              />
            </div>
          </div>

          <div className="profile-grid-2">
            <div className="profile-input-group">
              <label htmlFor="lawyer-skills">Skills</label>
              <input
                id="lawyer-skills"
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="e.g. Litigation, Drafting, Arbitration"
              />
            </div>

            <div className="profile-input-group">
              <label htmlFor="lawyer-certifications">Certifications</label>
              <input
                id="lawyer-certifications"
                type="text"
                name="certifications"
                value={formData.certifications}
                onChange={handleChange}
                placeholder="Enter certifications"
              />
            </div>
          </div>

          <div className="profile-section-title">
            <span>🏆 Professional Background & Achievements</span>
          </div>

          <div className="profile-input-group full-width">
            <label htmlFor="lawyer-previous-firms">Previous Firms</label>
            <input
              id="lawyer-previous-firms"
              type="text"
              name="previousFirms"
              value={formData.previousFirms}
              onChange={handleChange}
              placeholder="Enter previous firms or chambers"
            />
          </div>

          <div className="profile-input-group full-width">
            <label htmlFor="lawyer-achievements">Achievements</label>
            <input
              id="lawyer-achievements"
              type="text"
              name="achievements"
              value={formData.achievements}
              onChange={handleChange}
              placeholder="Enter notable achievements"
            />
          </div>

          <div className="profile-grid-2">
            <div className="profile-input-group">
              <label htmlFor="lawyer-publications">Publications</label>
              <input
                id="lawyer-publications"
                type="text"
                name="publications"
                value={formData.publications}
                onChange={handleChange}
                placeholder="Enter publications"
              />
            </div>

            <div className="profile-input-group">
              <label htmlFor="lawyer-awards">Awards</label>
              <input
                id="lawyer-awards"
                type="text"
                name="awards"
                value={formData.awards}
                onChange={handleChange}
                placeholder="Enter awards and recognitions"
              />
            </div>
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

export default LawyerProfilePage;
