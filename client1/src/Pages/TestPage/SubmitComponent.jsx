import { useState } from 'react';
import './SubmitComponent.css'

 const SubmitComponent = ({onsubmit,onBack}) => {
   
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
        
        <h1 className="completion-title">Your test is ready to submit</h1>
        
        <p className="completion-message">
          if you want to submit the test then click on submit button and if you want to review your test then click or review button.
        </p>
        
        
        
        <div className="completion-actions">
          <button 
            className="submit-support-btn"
            onClick={onsubmit}
          >
            Submit
          </button>
          <button 
            className="preview-support-btn"
            onClick={onBack}
          >
            Review test
          </button>
        </div>
        
       
      </div>
    </div>
  );
};
export default SubmitComponent