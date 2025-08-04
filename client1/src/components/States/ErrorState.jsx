import React from 'react';
import './ErrorState.css'; // Import the CSS file
import { BookOpen, RefreshCw } from 'lucide-react'; // Optional: or replace with inline SVG/icons

const ErrorState = ({ error , onRetry }) => {
  return (
    <div className="error-container">
      <div className="error-icon-wrapper">
        <BookOpen className="error-icon" />
      </div>
      <h2 className="error-heading">Unable to Load Data</h2>
      <p className="error-message">{error}</p>
      <button className="retry-button" onClick={onRetry}>
        <RefreshCw className="retry-icon" />
        Try Again
      </button>
    </div>
  );
};

export default ErrorState;
