import { useState } from "react";
import './AddQuestionModal.css'; // Import the CSS file

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
      <div className="add-question-modal">
        <div className="modal-content">
          <div className="modal-header">
            <h3>Add New Question</h3>
          </div>
          
          <div className="modal-body">
            <div>
              <label className="form-label">
                Question *
              </label>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Enter your question here..."
                rows={3}
                className="form-textarea"
              />
            </div>

            <div>
              <label className="form-label">
                Answer Options *
              </label>
              <div className="options-container">
                {options.map((option, index) => (
                  <input
                    key={index}
                    type="text"
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...options];
                      newOptions[index] = e.target.value;
                      setOptions(newOptions);
                    }}
                    placeholder={`Option ${index + 1}`}
                    className="form-input"
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="form-label">
                Correct Answer *
              </label>
              <input
                type="text"
                value={correct}
                onChange={(e) => setCorrect(e.target.value)}
                placeholder="Enter the correct answer"
                className="form-input"
              />
            </div>
          </div>

          <div className="modal-footer">
            <button
              onClick={onClose}
              className="btn btn-cancel"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="btn btn-primary"
            >
              Add Question
            </button>
          </div>
        </div>
      </div>
    );
};

export default AddQuestionModal;