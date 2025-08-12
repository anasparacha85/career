import { useState } from "react";
import './AddQuestionModal.css'
const AddQuestionModal = ({ isOpen, onClose, onSave }) => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [correct, setCorrect] = useState('');

    const handleSave = () => {
      if (!question.trim() || options.some(opt => !opt.trim()) || !correct.trim()) {
        alert('Please fill in all fields');
        return;
      }

      onSave({
        question,
        options,
        correct
      });

      // Reset form
      setQuestion('');
      setOptions(['', '', '', '']);
      setCorrect('');
      onClose();
    };

    if (!isOpen) return null;

    return (
      <div className="modal-overlay">
        <div className="modal-container">
          {/* Header */}
          <div className="modal-header">
            <h2 className="modal-title">Add New Question</h2>
            <button onClick={onClose} className="close-button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          {/* Body */}
          <div className="modal-body">
            {/* Question Field */}
            <div className="field-group">
              <label className="field-label">
                Question <span className="required">*</span>
              </label>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Enter your question here..."
                rows={3}
                className="field-textarea"
              />
            </div>

            {/* Options Field */}
            <div id="" className="f-group">
              <label className="f-label">
                Answer Options <span className="required">*</span>
              </label>
              <div className="opts-grid">
                {options.map((option, index) => (
                  <div key={index} className="opt-item">
                    <span className="opt-label">{String.fromCharCode(65 + index)}</span>
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...options];
                        newOptions[index] = e.target.value;
                        setOptions(newOptions);
                      }}
                      placeholder={`Option ${String.fromCharCode(65 + index)}`}
                      className="f-input"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Correct Answer Field */}
            <div className="f-group">
              <label className="f-label">
                Correct Answer <span className="required">*</span>
              </label>
              <input
                type="text"
                value={correct}
                onChange={(e) => setCorrect(e.target.value)}
                placeholder="Enter the correct answer"
                className="f-input"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button onClick={onClose} className="button button-secondary">
              Cancel
            </button>
            <button onClick={handleSave} className="button button-primary">
              Add Question
            </button>
          </div>
        </div>

      </div>
    );
};

export default AddQuestionModal