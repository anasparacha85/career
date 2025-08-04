import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ step }) => {
  const steps = ["Details", "Questions", "Share"];

  return (
    <div className="progress-container">
      {steps.map((label, index) => {
        const current = index + 1;
        return (
          <div key={label} className="progress-step">
            <div className={`circle ${step === current ? 'active' : ''} ${step > current ? 'completed' : ''}`}>{current}</div>
            <div className="label">{label}</div>
            {index < steps.length - 1 && <div className="line" />}
          </div>
        );
      })}
    </div>
  );
};

export default ProgressBar;
