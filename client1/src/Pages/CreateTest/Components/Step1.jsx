import React from 'react';
import './Step1.css';
import { ChevronRight, Clock, Target } from 'lucide-react';
import './Buttons.css';
import Swal from 'sweetalert2';

const Step1Details = ({ testDetails, setTestDetails, nextStep }) => {
  const handleChange = (e) => {
    setTestDetails({ ...testDetails, [e.target.name]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    
    if (!testDetails.name || !testDetails.description || !testDetails.duration || !testDetails.passingScore) {
      Swal.fire('Please fill all fields.');
      return;
    }
    nextStep();
  };

  return (
    <div className="step1-container">
      <div className="step1-header">
        <h2 className="step1-title">Test Details</h2>
        <p className="step1-subtitle">Set up the basic information for your assessment</p>
      </div>
      
      <div className="step1-form-container">
        <div className="step1-field">
          <label className="step1-label">
            Test Name *
          </label>
          <input
            type="text"
            name="name"
            value={testDetails.name}
            onChange={handleChange}
            placeholder="Enter a descriptive test name"
            className="step1-input"
            required
          />
        </div>

        <div className="step1-field">
          <label className="step1-label">
            Description *
          </label>
          <textarea
            name="description"
            value={testDetails.description}
            onChange={handleChange}
            placeholder="Describe what this test will assess and any instructions for test takers"
            rows={4}
            className="step1-textarea"
            required
          />
        </div>

        <div className="step1-grid">
          <div className="step1-field grid-step1-field">
            <label className="step1-label">
              <Clock className="step1-label-icon" />
              Duration (minutes) *
            </label>
            <input
              type="number"
              name="duration"
              value={testDetails.duration}
              onChange={handleChange}
              placeholder="30"
              min="1"
              className="step1-input"
              required
            />
          </div>
          
          <div className="step1-field grid-step1-field">
            <label className="step1-label">
              <Target className="step1-label-icon" />
              Passing Score (%) *
            </label>
            <input
              type="number"
              name="passingScore"
              value={testDetails.passingScore}
              onChange={handleChange}
              placeholder="70"
              min="1"
              max="100"
              className="step1-input"
              required
            />
          </div>
        </div>
      </div>

      <div className="step1-button-container">
        <button 
          onClick={handleNext}
          className="step1-continue-btn"
        >
          Continue <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default Step1Details;