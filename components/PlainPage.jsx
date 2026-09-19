import '../styles/clientDashboard.css';

function PlainPage({ onBack }) {
  return (
    <div className="plain-white-page">
      <button className="plain-back-btn" onClick={onBack}>
        &larr; Back to Dashboard
      </button>
      <h1 style={{ color: '#0f172a', fontWeight: 'bold' }}>Plain Testing Page</h1>
      <p style={{ color: '#475569', marginTop: '10px' }}>
        This is a temporary white screen. Click the back button to return to your dashboard.
      </p>
    </div>
  );
}

export default PlainPage;
