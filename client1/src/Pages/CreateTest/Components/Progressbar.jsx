import React from 'react';
import { FileText, Users, Target } from 'lucide-react';
import './ProgressBar.css'

const ProgressBar = ({ step }) => {
  const steps = [
    { label: "Details", icon: FileText },
    { label: "Questions", icon: Users },
    { label: "Share", icon: Target }
  ];

  return (
    <div className="progress-bar-container">
      <div className="progress-steps">
        {steps.map((stepData, index) => {
          const current = index + 1;
          const Icon = stepData.icon;
          
          const circleClass = `step-circle ${
            step === current ? 'active' : 
            step > current ? 'completed' : 'pending'
          }`;
          
          const labelClass = `step-label ${
            step >= current ? 'active' : 'pending'
          }`;
          
          const connectorClass = `step-connector ${
            step > current ? 'completed' : 'pending'
          }`;

          return (
            <React.Fragment key={stepData.label}>
              <div className="progress-step">
                <div className={circleClass}>
                  <Icon size={20} />
                </div>
                <span className={labelClass}>
                  {stepData.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={connectorClass} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;