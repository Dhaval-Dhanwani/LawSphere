import { useState } from 'react';
import axios from 'axios';
import '../styles/forms.css';

function JobPostingForm({ onBack, userRole, onSuccess }) {
  const isLawfirm = userRole && userRole.toLowerCase() === 'lawfirm';

  const todayStr = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    jobTitle: '',
    practiceArea: '',
    experienceRequired: '',
    location: '',
    jobType: 'Full-Time',
    scheduledDate: '',
    description: '',
    status: 'Active'
  });

  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Access control: only role Lawfirm can access this form
  if (!isLawfirm) {
    return (
      <div className="form-container">
        <div className="form-header">
          <button className="back-btn" onClick={onBack}>
            &larr; Back to Dashboard
          </button>
          <h2>Access Denied</h2>
        </div>
        <div style={{ textAlign: 'center', padding: '30px 15px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔒</div>
          <h3 style={{ color: '#ef4444', marginBottom: '12px' }}>Role Restriction</h3>
          <p style={{ opacity: 0.9, maxWidth: '480px', margin: '0 auto 20px', lineHeight: '1.6' }}>
            This page is strictly reserved for users with the <strong>Lawfirm</strong> role.
            Your current role is not authorized to create job postings.
          </p>
          <button
            className="submit-btn"
            style={{ maxWidth: '240px', margin: '0 auto' }}
            onClick={onBack}
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // Date validation: scheduled date must not be in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const chosenDate = new Date(formData.scheduledDate);

    if (!formData.scheduledDate || chosenDate < today) {
      setErrorMessage("Please check and select a future date for the job posting deadline.");
      alert("Please check and select a future date for the scheduled job posting deadline.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/lawfirm/JobPosting",
        formData,
        {
          withCredentials: true
        }
      );

      console.log("Job posted successfully:", response.data);
      setSuccessMessage("Job Posting created successfully! It is now live in the LawSphere job board.");
      alert("Job Posting published successfully!");

      // Reset form
      setFormData({
        jobTitle: '',
        practiceArea: '',
        experienceRequired: '',
        location: '',
        jobType: 'Full-Time',
        scheduledDate: '',
        description: '',
        status: 'Active'
      });

      if (onSuccess) {
        onSuccess();
      } else if (onBack) {
        setTimeout(() => {
          onBack();
        }, 1200);
      }
    } catch (error) {
      console.error("Error creating job posting:", error);
      const msg = error.response?.data?.error || error.response?.data?.message || "Failed to post job. Please ensure you are logged in as Law Firm.";
      setErrorMessage(msg);
      alert(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <button className="back-btn" onClick={onBack}>
          &larr; Back to Dashboard
        </button>
        <h2>Create Law Firm Job Posting</h2>
      </div>

      <div style={{ marginBottom: '24px', opacity: 0.85, fontSize: '14px' }}>
        Publish career openings, associate vacancies, or legal internship positions for verified advocates.
      </div>

      {errorMessage && (
        <div style={{
          background: 'rgba(239, 68, 68, 0.15)',
          border: '1px solid #ef4444',
          color: '#fca5a5',
          padding: '12px 16px',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          ⚠️ {errorMessage}
        </div>
      )}

      {successMessage && (
        <div style={{
          background: 'rgba(34, 197, 94, 0.15)',
          border: '1px solid #22c55e',
          color: '#86efac',
          padding: '12px 16px',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          ✓ {successMessage}
        </div>
      )}

      <form className="styled-form two-col" onSubmit={handleSubmit}>
        {/* Job Title */}
        <div className="form-group full-width">
          <label>Job Title *</label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            placeholder="e.g. Senior Corporate Advocate / Associate"
            required
          />
        </div>

        {/* Practice Area */}
        <div className="form-group">
          <label>Practice Area *</label>
          <input
            type="text"
            name="practiceArea"
            value={formData.practiceArea}
            onChange={handleChange}
            placeholder="e.g. Corporate M&A, Criminal Law, Civil"
            required
          />
        </div>

        {/* Experience Required */}
        <div className="form-group">
          <label>Experience Required *</label>
          <input
            type="text"
            name="experienceRequired"
            value={formData.experienceRequired}
            onChange={handleChange}
            placeholder="e.g. 2-5 Years / Entry Level"
            required
          />
        </div>

        {/* Location */}
        <div className="form-group">
          <label>Location *</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. New Delhi / Hybrid / Remote"
            required
          />
        </div>

        {/* Job Type */}
        <div className="form-group">
          <label>Job Type *</label>
          <select
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              background: '#1e293b',
              color: '#ffffff',
              fontSize: '15px'
            }}
          >
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
            <option value="Freelance">Freelance</option>
          </select>
        </div>

        {/* Scheduled Date / Deadline */}
        <div className="form-group">
          <label>Scheduled Expiry Date * (Visible till this date)</label>
          <input
            type="date"
            name="scheduledDate"
            min={todayStr}
            value={formData.scheduledDate}
            onChange={handleChange}
            required
          />
        </div>

        {/* Status */}
        <div className="form-group">
          <label>Listing Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              background: '#1e293b',
              color: '#ffffff',
              fontSize: '15px'
            }}
          >
            <option value="Active">Active (Live)</option>
            <option value="Draft">Draft</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        {/* Job Description */}
        <div className="form-group full-width">
          <label>Job Description & Responsibilities *</label>
          <textarea
            name="description"
            rows="5"
            value={formData.description}
            onChange={handleChange}
            placeholder="Outline candidate qualifications, daily matters handled, court appearance expectations, and firm benefits..."
            required
          ></textarea>
        </div>

        {/* Post Button */}
        <button
          type="submit"
          className="submit-btn"
          disabled={submitting}
        >
          {submitting ? 'Posting Job...' : 'Post'}
        </button>
      </form>
    </div>
  );
}

export default JobPostingForm;
