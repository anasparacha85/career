import React from 'react';
import './TypeQuestionsModal.css';

const QuestionTypeModal = ({ isOpen, onClose, onSelectType }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container question-type-modal">
        <div className="type-modal-header">
          <h2 className="type-modal-title">Select Question Type</h2>
          
          <button onClick={onClose} className="type-close-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div className="modal-body">
          <div className="question-type-grid">
            <button 
              onClick={() => onSelectType('mcq')}
              className="question-type-card"
            >
              <div className="question-type-icon mcq-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 12l2 2 4-4" />
                </svg>
              </div>
              <h3>Multiple Choice</h3>
              <p>Standard MCQ with text options</p>
            </button>

            <button 
              onClick={() => onSelectType('image')}
              className="question-type-card"
            >
              <div className="question-type-icon image-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-3.5-3.5L12 18l-3-3-5 5" />
                </svg>
              </div>
              <h3>Image Based</h3>
              <p>Question with image upload option</p>
            </button>

            <button 
              onClick={() => onSelectType('file')}
              className="question-type-card"
            >
              <div className="question-type-icon file-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
                </svg>
              </div>
              <h3>File Based</h3>
              <p>Question with file upload requirements</p>
            </button>
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="button button-secondary">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionTypeModal;