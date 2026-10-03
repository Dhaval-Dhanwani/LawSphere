import { useState } from 'react';
import axios from 'axios';

import '../styles/forms.css';

function SignUp({ onNavigate, onRoleSet }) {
  const [selectedRole, setSelectedRole] = useState('Clients');

  const handleSubmit = (e) => {
    e.preventDefault();

    let form = e.target;
    let formdata = new FormData(form);

    // Convert FormData into key-value object
    let data = Object.fromEntries(formdata.entries());

    // Clean inputs
    if (data.email) data.email = data.email.trim();
    if (data.password) data.password = data.password.trim();

    // Add selected role
    data.role = selectedRole;
    console.log('Authenticating with data:', data);

    axios.post(
      "http://localhost:3000/SignUp/Authenticate",
      data,
      {
        withCredentials: true
      }
    )
    .then((response) => {
      console.log("Authentication successful:", response.data);
      const activeRole = response.data.role || selectedRole;
      localStorage.setItem('userRole', activeRole);
      if (typeof onRoleSet === 'function') {
        onRoleSet(activeRole);
      }

      // Direct based on authenticated role
      const effectiveRole = activeRole.toLowerCase();
      if (effectiveRole.includes('client')) {
        onNavigate('client-dashboard');
      } 
      else if (effectiveRole.includes('firm') || effectiveRole.includes('lawfirm')) {
        onNavigate('lawfirm-dashboard');
      } 
      else if (effectiveRole.includes('lawyer')) {
        onNavigate('lawyer-dashboard');
      } else {
        onNavigate('dashboard');
      }
    })
    .catch((e) => {
      console.error('Authentication failed:', e);
      const errorMsg = e.response?.data?.error || e.response?.data?.message || (e.response ? 'Authentication failed. Please check your credentials.' : e.message);
      alert(errorMsg);
    });
  };


  return (
    <div className="form-container">

      <div className="form-header">
        <button
          className="back-btn"
          onClick={() => onNavigate('dashboard')}
        >
          &larr; Back to Home
        </button>

        <h2>Create LawSphere Account</h2>
      </div>

      <form className="styled-form" onSubmit={handleSubmit}>

        {/* Role Selector */}
        <div className="form-group full-width">
          <label>Select Your Role</label>

          <div
            style={{
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap',
              marginTop: '6px'
            }}
          >

            {/* Client */}
            <button
              type="button"
              className={`back-btn ${
                selectedRole === 'Clients'
                  ? 'active-role-pill'
                  : ''
              }`}
              style={{
                flex: 1,
                padding: '12px',
                textAlign: 'center',
                fontWeight: 600,
                background:
                  selectedRole === 'Clients'
                    ? '#f97316'
                    : undefined,
                color:
                  selectedRole === 'Clients'
                    ? '#ffffff'
                    : undefined,
                borderColor:
                  selectedRole === 'Clients'
                    ? '#f97316'
                    : undefined
              }}
              onClick={() => setSelectedRole('Clients')}
            >
              👤 Client
            </button>


            {/* Lawyer */}
            <button
              type="button"
              className={`back-btn ${
                selectedRole === 'Lawyer'
                  ? 'active-role-pill'
                  : ''
              }`}
              style={{
                flex: 1,
                padding: '12px',
                textAlign: 'center',
                fontWeight: 600,
                background:
                  selectedRole === 'Lawyer'
                    ? '#f97316'
                    : undefined,
                color:
                  selectedRole === 'Lawyer'
                    ? '#ffffff'
                    : undefined,
                borderColor:
                  selectedRole === 'Lawyer'
                    ? '#f97316'
                    : undefined
              }}
              onClick={() => setSelectedRole('Lawyer')}
            >
              ⚖️ Lawyer
            </button>


            {/* Law Firm */}
            <button
              type="button"
              className={`back-btn ${
                selectedRole === 'Lawfirm'
                  ? 'active-role-pill'
                  : ''
              }`}
              style={{
                flex: 1,
                padding: '12px',
                textAlign: 'center',
                fontWeight: 600,
                background:
                  selectedRole === 'Lawfirm'
                    ? '#f97316'
                    : undefined,
                color:
                  selectedRole === 'Lawfirm'
                    ? '#ffffff'
                    : undefined,
                borderColor:
                  selectedRole === 'Lawfirm'
                    ? '#f97316'
                    : undefined
              }}
              onClick={() => setSelectedRole('Lawfirm')}
            >
              🏢 Law Firm
            </button>

          </div>
        </div>


        {/* Email */}
        <div className="form-group full-width">
          <label>Email Address</label>

          <input
            type="email"
            name="email"
            placeholder="Enter Email Address"
            required
          />
        </div>


        {/* Password */}
        <div className="form-group full-width">
          <label>Password</label>

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            required
          />
        </div>


        {/* Submit */}
        <button
          type="submit"
          className="submit-btn"
        >
          Sign Up &amp; Enter Portal &rarr;
        </button>

      </form>
    </div>
  );
}

export default SignUp;