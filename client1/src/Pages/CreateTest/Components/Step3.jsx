import React from 'react';
import './Step3.css';
import { CandidateStore } from '../../../Contexts/CandidateContexts';
import { ChevronLeft, Clipboard, RotateCw } from 'lucide-react';

const Step3GenerateLink = ({ onBack, onReset }) => {
  const { TestLink, setTestLink } = CandidateStore();
  
  const handleCopy = () => {
    navigator.clipboard.writeText(TestLink);
    alert('Link copied to clipboard!');
  };

  return (
    <div id="step3-form">
      <h2 id="step3-section-title">🎉 Test Created Successfully!</h2>
      <p id="step3-description">Share the link below with your candidate:</p>

      <div id="link-container">
        <input 
          type="text" 
          value={TestLink} 
          readOnly 
          id="test-link-input"
        />
        <button id="copy-link-btn" onClick={handleCopy}>
          <Clipboard size={18} /> Copy
        </button>
      </div>

      <div id="step3-button-row">
        <button className="nav-btn secondary" onClick={onBack}>
          <ChevronLeft size={18} /> Back
        </button>
        <button className="submit-btn" onClick={onReset}>
          <RotateCw size={18} /> Create New Test
        </button>
      </div>
    </div>
  );
};

export default Step3GenerateLink;