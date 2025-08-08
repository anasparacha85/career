import React from 'react';
import './ConsentModal.css';

const ConsentModal = ({ onAccept }) => {
  return (
    <div className="consent-modal-backdrop">
      <div className="consent-modal">
        <h2>Before you start</h2>
        <p>This test requires access to your webcam and screen to ensure integrity.</p>
        <ul>
          <li>🎥 Webcam access</li>
          <li>🖥️ Screen sharing</li>
          <li>🔴 Session recording</li>
        </ul>
        <button className="consent-btn" onClick={onAccept}>I Agree & Continue</button>
      </div>
    </div>
  );
};

export default ConsentModal;
