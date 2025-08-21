import React from 'react';
import './Step3.css';
import { ChevronLeft, Clipboard, Navigation, RotateCw, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Step3GenerateLink = ({ onBack, onReset }) => {
 
  const navigate=useNavigate()
  const handleNavigation = () => {
    navigate('/')

    
  };

  return (
    <div className="step3-container">
      <div className="step3-header">
        <h2 className="step3-title">🎉 Test Created Successfully!</h2>
        <p className="step3-subtitle">Share the link below with your candidate</p>
      </div>

      <div className="success-card">
        <div className="success-content">
          <div className="success-icon">
            <Target className="w-8 h-8 text-green-600" />
          </div>
          
          <div>
            <h3 className="success-heading">Your test is ready to share!</h3>
            <p className="success-description">Click the button below and go to all your created tests.</p>
          </div>

          <div className="link-container">
            
            <div className="link-input-group">
              
              <button 
                onClick={handleNavigation}
                className="copy-btn"
              >
                <Navigation size={18} /> Go to Created tests
              </button>
            </div>
          </div>

          <div className="next-steps">
            <p><strong>Next steps:</strong></p>
            <ul className="next-steps-list">
              <li>• Go to your created tests and share their links with your candidates</li>
              <li>• Monitor responses in your dashboard</li>
              <li>• Review results once candidates complete the test</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="step3-footer">
      
        <button 
          onClick={onReset}
          className="new-test-btn"
        >
          <RotateCw size={18} /> Create New Test
        </button>
      </div>
    </div>
  );
};

export default Step3GenerateLink;