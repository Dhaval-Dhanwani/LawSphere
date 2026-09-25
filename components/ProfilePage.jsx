import { useState } from 'react';
import '../styles/profilePage.css';
import userAvatar from '../src/assets/images/user-avatar.png';

function ProfilePage({ role = 'lawyer', onBack }) {
  // Initial default values customized per role
  const getInitialState = (userRole) => {
    if (userRole === 'client') {
      return {
        firstName: 'Dhaval',
        lastName: 'Dhanwani',
        additionalName: '',
        pronouns: 'He/Him',
        headline: 'Individual Client & Enterprise Founder | Tech Solutions',
        email: 'dhaval.client@lawsphere.org',
        contact: '+91 98765 43210',
        age: '26',
        address: '402, Green Avenue, Nadiad, Gujarat, India',
        city: 'Nadiad',
        state: 'Gujarat',
        consultationPreference: 'Corporate Legal Advice & Intellectual Property',
        preferredLanguage: 'English, Hindi, Gujarati',
        accountStatus: 'Active',
      };
    } else if (userRole === 'lawfirm') {
      return {
        firmName: 'JSA Advocates & Solicitors',
        headline: 'Leading Full-Service Commercial Law Firm & Legal Consultants',
        contactEmail: 'contact@jsalaw.com',
        contactPhone: '+91 22 6636 5000',
        website: 'https://www.jsalaw.com',
        practicesAreas: 'Corporate M&A, Banking & Finance, Dispute Resolution, Tax, Real Estate',
        officeLocations: 'Mumbai, New Delhi, Bengaluru, Ahmedabad, Hyderabad, Chennai',
        yearEstablished: '1991',
        totalAdvocates: '120+ Advocates & Legal Partners',
        managingPartner: 'Amit Kapur',
        desription: 'JSA is a premier national law firm with extensive experience advising Fortune 500 corporations, financial institutions, and government bodies on complex cross-border transactions and high-stakes litigation.',
        vertficationsStatus: 'Verified',
        accountStatus: 'Active',
      };
    } else {
      // Lawyer / Advocate role
      return {
        firstName: 'Dhaval',
        lastName: 'Dhanwani',
        additionalName: '',
        pronouns: 'He/Him',
        headline: 'Advocate | High Court of Gujarat | Corporate & Commercial Litigation',
        email: 'dhaval.dhanwani@lawsphere.org',
        contact: '+91 98765 43210',
        age: '28',
        education: 'B.A. LL.B. (Hons.) - Gujarat National Law University (GNLU)',
        barCouncilNumber: 'GUJ/2021/8472',
        praticeAreas: 'Corporate Law, Commercial Arbitration, Civil & Criminal Litigation',
        Location: 'Ahmedabad, Gujarat',
        experience: '6 Years',
        skills: 'Litigation Strategy, Commercial Arbitration, Contract Drafting, Due Diligence',
        languages: 'English, Hindi, Gujarati',
        certifications: 'Certified Commercial Arbitrator (ICAI), Cyber Law Diploma',
        previousFirms: 'Shardul Amarchand Mangaldas & Co., JSA Associates',
        achievements: 'Represented 50+ clients in landmark High Court and commercial appellate proceedings.',
        awards: 'Best Young Advocate Award 2024 - Bar Council Excellence',
        publications: 'Cross-Border Arbitration in India (2025), Law Review Journal',
        vertificationStatus: 'Verified',
        accountStatus: 'Active',
      };
    }
  };

  const [formData, setFormData] = useState(getInitialState(role));
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 4000);
  };

  const handleReset = () => {
    setFormData(getInitialState(role));
    setSaveSuccess(false);
  };

  // Helper text and badge labels
  const roleDisplayTitle =
    role === 'client' ? 'Client Profile' : role === 'lawfirm' ? 'Law Firm Profile' : 'Lawyer Profile';
  const roleBadge =
    role === 'client' ? 'Client' : role === 'lawfirm' ? 'Law Firm' : 'Lawyer';

  return (
    <div className="profile-page-container">
      <div className="profile-card">
        {/* Top Banner Navigation */}
        <div className="profile-header-banner">
          <button type="button" className="profile-back-btn" onClick={onBack}>
            &larr; Back to Dashboard
          </button>
          <span className="profile-role-tag">{roleBadge} Portal</span>
        </div>

        {/* Profile Hero Header */}
        <div className="profile-hero-section">
          <div className="profile-avatar-wrapper">
            <img src={userAvatar} alt="Profile" className="profile-avatar-img" />
          </div>
          <div className="profile-hero-info">
            <h1>
              {role === 'lawfirm'
                ? formData.firmName || 'Law Firm Profile'
                : `${formData.firstName || ''} ${formData.lastName || ''}`.trim() || 'User Profile'}
            </h1>
            <div className="profile-hero-badges">
              <span className="profile-role-tag">{roleDisplayTitle}</span>
              <span className="profile-status-tag">
                ● {formData.vertificationStatus || formData.vertficationsStatus || 'Verified'} Account
              </span>
            </div>
          </div>
        </div>

        {/* Notice Info Box */}
        <div className="profile-notice-box">
          <span>ℹ️</span>
          <span>
            Profile details are editable below. All current values are pre-filled and displayed in input boxes.
          </span>
        </div>

        {/* Form Body */}
        <form className="profile-form-body" onSubmit={handleSave}>
          {saveSuccess && (
            <div className="profile-save-alert">
              <span>✓ Profile updated successfully! Changes have been saved.</span>
              <button
                type="button"
                onClick={() => setSaveSuccess(false)}
                style={{ background: 'transparent', border: 'none', color: 'inherit', cursor: 'pointer', fontWeight: 'bold' }}
              >
                ✕
              </button>
            </div>
          )}

          {/* LAWYER PROFILE FIELDS */}
          {role === 'lawyer' && (
            <>
              <div className="profile-section-title">
                <span>👤 Basic Information</span>
              </div>
              <div className="profile-grid-2">
                <div className="profile-input-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    required
                  />
                </div>
                <div className="profile-input-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    required
                  />
                </div>
              </div>

              <div className="profile-grid-2">
                <div className="profile-input-group">
                  <label>Additional Name</label>
                  <input
                    type="text"
                    name="additionalName"
                    value={formData.additionalName}
                    onChange={handleChange}
                    placeholder="Middle name or suffix"
                  />
                </div>
                <div className="profile-input-group">
                  <label>Pronouns</label>
                  <select
                    name="pronouns"
                    value={formData.pronouns}
                    onChange={handleChange}
                  >
                    <option value="He/Him">He/Him</option>
                    <option value="She/Her">She/Her</option>
                    <option value="They/Them">They/Them</option>
                    <option value="Advocate">Advocate</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="profile-input-group">
                <label>Headline</label>
                <input
                  type="text"
                  name="headline"
                  value={formData.headline}
                  onChange={handleChange}
                  placeholder="e.g. Senior Advocate | High Court"
                  required
                />
              </div>

              <div className="profile-grid-3">
                <div className="profile-input-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="profile-input-group">
                  <label>Contact Number</label>
                  <input
                    type="text"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    placeholder="Contact Number"
                    required
                  />
                </div>
                <div className="profile-input-group">
                  <label>Age</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Age"
                    required
                  />
                </div>
              </div>

              <div className="profile-section-title">
                <span>⚖️ Professional Credentials</span>
              </div>
              <div className="profile-grid-2">
                <div className="profile-input-group">
                  <label>Bar Council Number</label>
                  <input
                    type="text"
                    name="barCouncilNumber"
                    value={formData.barCouncilNumber}
                    onChange={handleChange}
                    placeholder="Bar Council No."
                    required
                  />
                </div>
                <div className="profile-input-group">
                  <label>Experience (Years)</label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="e.g. 5 Years"
                    required
                  />
                </div>
              </div>

              <div className="profile-grid-2">
                <div className="profile-input-group">
                  <label>Practice Areas</label>
                  <input
                    type="text"
                    name="praticeAreas"
                    value={formData.praticeAreas}
                    onChange={handleChange}
                    placeholder="e.g. Corporate, Criminal, Family"
                    required
                  />
                </div>
                <div className="profile-input-group">
                  <label>Location / City</label>
                  <input
                    type="text"
                    name="Location"
                    value={formData.Location}
                    onChange={handleChange}
                    placeholder="City, State"
                    required
                  />
                </div>
              </div>

              <div className="profile-input-group">
                <label>Education</label>
                <input
                  type="text"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  placeholder="Degrees & Law College"
                  required
                />
              </div>

              <div className="profile-grid-2">
                <div className="profile-input-group">
                  <label>Skills</label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="e.g. Litigation, Arbitration, Drafting"
                    required
                  />
                </div>
                <div className="profile-input-group">
                  <label>Languages Spoken</label>
                  <input
                    type="text"
                    name="languages"
                    value={formData.languages}
                    onChange={handleChange}
                    placeholder="e.g. English, Hindi, Gujarati"
                    required
                  />
                </div>
              </div>

              <div className="profile-section-title">
                <span>🏆 Background & Accomplishments</span>
              </div>
              <div className="profile-grid-2">
                <div className="profile-input-group">
                  <label>Certifications</label>
                  <input
                    type="text"
                    name="certifications"
                    value={formData.certifications}
                    onChange={handleChange}
                    placeholder="Certifications & Specializations"
                  />
                </div>
                <div className="profile-input-group">
                  <label>Previous Law Firms</label>
                  <input
                    type="text"
                    name="previousFirms"
                    value={formData.previousFirms}
                    onChange={handleChange}
                    placeholder="Previous firms or chambers"
                  />
                </div>
              </div>

              <div className="profile-input-group">
                <label>Achievements</label>
                <textarea
                  name="achievements"
                  value={formData.achievements}
                  onChange={handleChange}
                  rows="2"
                  placeholder="Key case victories & milestones"
                ></textarea>
              </div>

              <div className="profile-grid-2">
                <div className="profile-input-group">
                  <label>Awards & Recognitions</label>
                  <textarea
                    name="awards"
                    value={formData.awards}
                    onChange={handleChange}
                    rows="2"
                    placeholder="Honors and awards"
                  ></textarea>
                </div>
                <div className="profile-input-group">
                  <label>Publications</label>
                  <textarea
                    name="publications"
                    value={formData.publications}
                    onChange={handleChange}
                    rows="2"
                    placeholder="Published legal articles & papers"
                  ></textarea>
                </div>
              </div>

              <div className="profile-section-title">
                <span>🔒 Account & Verification Status</span>
              </div>
              <div className="profile-grid-2">
                <div className="profile-input-group">
                  <label>Verification Status</label>
                  <select
                    name="vertificationStatus"
                    value={formData.vertificationStatus}
                    onChange={handleChange}
                  >
                    <option value="Verified">Verified</option>
                    <option value="Pending">Pending</option>
                    <option value="Active">Active</option>
                  </select>
                </div>
                <div className="profile-input-group">
                  <label>Account Status</label>
                  <select
                    name="accountStatus"
                    value={formData.accountStatus}
                    onChange={handleChange}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {/* CLIENT PROFILE FIELDS */}
          {role === 'client' && (
            <>
              <div className="profile-section-title">
                <span>👤 Personal Information</span>
              </div>
              <div className="profile-grid-2">
                <div className="profile-input-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    required
                  />
                </div>
                <div className="profile-input-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    required
                  />
                </div>
              </div>

              <div className="profile-grid-2">
                <div className="profile-input-group">
                  <label>Additional Name</label>
                  <input
                    type="text"
                    name="additionalName"
                    value={formData.additionalName}
                    onChange={handleChange}
                    placeholder="Middle name"
                  />
                </div>
                <div className="profile-input-group">
                  <label>Pronouns</label>
                  <select
                    name="pronouns"
                    value={formData.pronouns}
                    onChange={handleChange}
                  >
                    <option value="He/Him">He/Him</option>
                    <option value="She/Her">She/Her</option>
                    <option value="They/Them">They/Them</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="profile-input-group">
                <label>Headline</label>
                <input
                  type="text"
                  name="headline"
                  value={formData.headline}
                  onChange={handleChange}
                  placeholder="Occupation or Brief Description"
                  required
                />
              </div>

              <div className="profile-grid-3">
                <div className="profile-input-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="profile-input-group">
                  <label>Contact Number</label>
                  <input
                    type="text"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    placeholder="Contact Number"
                    required
                  />
                </div>
                <div className="profile-input-group">
                  <label>Age</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Age"
                    required
                  />
                </div>
              </div>

              <div className="profile-section-title">
                <span>📍 Address & Consultation Preferences</span>
              </div>
              <div className="profile-input-group">
                <label>Full Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="2"
                  placeholder="Residential or Business Address"
                  required
                ></textarea>
              </div>

              <div className="profile-grid-2">
                <div className="profile-input-group">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    required
                  />
                </div>
                <div className="profile-input-group">
                  <label>State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                    required
                  />
                </div>
              </div>

              <div className="profile-grid-2">
                <div className="profile-input-group">
                  <label>Preferred Consultation Areas</label>
                  <input
                    type="text"
                    name="consultationPreference"
                    value={formData.consultationPreference}
                    onChange={handleChange}
                    placeholder="e.g. Civil Dispute, Corporate Law, Property"
                  />
                </div>
                <div className="profile-input-group">
                  <label>Preferred Languages</label>
                  <input
                    type="text"
                    name="preferredLanguage"
                    value={formData.preferredLanguage}
                    onChange={handleChange}
                    placeholder="e.g. English, Hindi"
                  />
                </div>
              </div>

              <div className="profile-section-title">
                <span>🔒 Account Status</span>
              </div>
              <div className="profile-grid-2">
                <div className="profile-input-group">
                  <label>Account Status</label>
                  <select
                    name="accountStatus"
                    value={formData.accountStatus}
                    onChange={handleChange}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {/* LAW FIRM PROFILE FIELDS */}
          {role === 'lawfirm' && (
            <>
              <div className="profile-section-title">
                <span>🏢 Law Firm Information</span>
              </div>
              <div className="profile-input-group">
                <label>Firm Name</label>
                <input
                  type="text"
                  name="firmName"
                  value={formData.firmName}
                  onChange={handleChange}
                  placeholder="Registered Law Firm Name"
                  required
                />
              </div>

              <div className="profile-input-group">
                <label>Firm Headline</label>
                <input
                  type="text"
                  name="headline"
                  value={formData.headline}
                  onChange={handleChange}
                  placeholder="Tagline or brief descriptor"
                  required
                />
              </div>

              <div className="profile-grid-3">
                <div className="profile-input-group">
                  <label>Contact Email</label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    placeholder="Official Contact Email"
                    required
                  />
                </div>
                <div className="profile-input-group">
                  <label>Contact Phone</label>
                  <input
                    type="text"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleChange}
                    placeholder="Official Phone"
                    required
                  />
                </div>
                <div className="profile-input-group">
                  <label>Website URL</label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://www.firmdomain.com"
                    required
                  />
                </div>
              </div>

              <div className="profile-section-title">
                <span>⚖️ Practice Areas & Operations</span>
              </div>
              <div className="profile-input-group">
                <label>Practice Areas</label>
                <input
                  type="text"
                  name="practicesAreas"
                  value={formData.practicesAreas}
                  onChange={handleChange}
                  placeholder="e.g. Corporate M&A, Capital Markets, Arbitration"
                  required
                />
              </div>

              <div className="profile-input-group">
                <label>Office Locations & Branches</label>
                <input
                  type="text"
                  name="officeLocations"
                  value={formData.officeLocations}
                  onChange={handleChange}
                  placeholder="e.g. Mumbai, New Delhi, Bengaluru"
                  required
                />
              </div>

              <div className="profile-grid-3">
                <div className="profile-input-group">
                  <label>Year Established</label>
                  <input
                    type="text"
                    name="yearEstablished"
                    value={formData.yearEstablished}
                    onChange={handleChange}
                    placeholder="e.g. 1995"
                  />
                </div>
                <div className="profile-input-group">
                  <label>Team Size / Total Advocates</label>
                  <input
                    type="text"
                    name="totalAdvocates"
                    value={formData.totalAdvocates}
                    onChange={handleChange}
                    placeholder="e.g. 150+ Partners & Advocates"
                  />
                </div>
                <div className="profile-input-group">
                  <label>Managing Partner</label>
                  <input
                    type="text"
                    name="managingPartner"
                    value={formData.managingPartner}
                    onChange={handleChange}
                    placeholder="Managing Partner Name"
                  />
                </div>
              </div>

              <div className="profile-input-group">
                <label>Firm Overview & Description</label>
                <textarea
                  name="desription"
                  value={formData.desription}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Provide an overview of firm practices, values, and client engagements."
                  required
                ></textarea>
              </div>

              <div className="profile-section-title">
                <span>🔒 Verification & Status</span>
              </div>
              <div className="profile-grid-2">
                <div className="profile-input-group">
                  <label>Verification Status</label>
                  <select
                    name="vertficationsStatus"
                    value={formData.vertficationsStatus}
                    onChange={handleChange}
                  >
                    <option value="Verified">Verified</option>
                    <option value="Pending">Pending</option>
                    <option value="Active">Active</option>
                  </select>
                </div>
                <div className="profile-input-group">
                  <label>Account Status</label>
                  <select
                    name="accountStatus"
                    value={formData.accountStatus}
                    onChange={handleChange}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {/* Action Buttons */}
          <div className="profile-actions-bar">
            <button type="button" className="profile-reset-btn" onClick={handleReset}>
              Reset Defaults
            </button>
            <button type="submit" className="profile-save-btn">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfilePage;
