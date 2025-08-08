import './TestCompletedState.css'
// Professional Test Completed Component
export const TestCompletedState = ({ onBack }) => {
  return (
    <div className="test-completed-container">
      <div className="test-completed-card">
        <div className="success-icon">
          <svg viewBox="0 0 24 24" fill="none" className="checkmark">
            <circle cx="12" cy="12" r="10" fill="#10B981" fillOpacity="0.1" />
            <path 
              d="M8 12.5l2.5 2.5L16 9" 
              stroke="#10B981" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
        
        <h1 className="completion-title">Test Already Completed</h1>
        
        <p className="completion-message">
          Thank you for your participation. You have already successfully completed this assessment.
        </p>
        
        <div className="completion-details">
          <div className="detail-item">
            <span className="detail-label">Status:</span>
            <span className="detail-value completed">Completed</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Next Steps:</span>
            <span className="detail-value">You will be contacted with results soon</span>
          </div>
        </div>
        
        <div className="completion-actions">
          <button 
            className="contact-support-btn"
            onClick={onBack}
          >
            Go to our Website
          </button>
        </div>
        
        <div className="completion-footer">
          <p>If you believe this is an error, please contact our support team.</p>
        </div>
      </div>
    </div>
  );
};
export default TestCompletedState