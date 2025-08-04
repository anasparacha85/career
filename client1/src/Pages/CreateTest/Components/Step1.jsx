import React from 'react';
import './Step1.css';
import { ChevronRight } from 'lucide-react';
import './Buttons.css'
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
    <div id="step1-form">
      <h2 id="section-title">Test Details</h2>
      
      <div id="input-group">
        <label>Test Name</label>
        <input
          type="text"
          name="name"
          value={testDetails.name}
          onChange={handleChange}
          placeholder="Enter test name"
          required
        />
      </div>

      <div id="input-group">
        <label>Description</label>
        <textarea
          name="description"
          value={testDetails.description}
          onChange={handleChange}
          placeholder="Enter test description"
          required
        />
      </div>

      <div id="input-row">
        <div id="input-group">
          <label>Duration (minutes)</label>
          <input
            type="number"
            name="duration"
            value={testDetails.duration}
            onChange={handleChange}
            placeholder="e.g. 30"
            min="1"
            required
          />
        </div>
        <div id="input-group">
          <label>Passing Score (%)</label>
          <input
            type="number"
            name="passingScore"
            value={testDetails.passingScore}
            onChange={handleChange}
            placeholder="e.g. 70"
            min="1"
            max="100"
            required
          />
        </div>
      </div>

      <div id="button-row">
        <button className="nav-btn" onClick={handleNext}>
          Next <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default Step1Details;