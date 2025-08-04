import React, { useState } from 'react';
import './AddQuestionModal.css';

const AddQuestionModal = ({ isOpen, onClose, onSave }) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correct, setCorrect] = useState('');

  const handleOptionChange = (index, value) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

 const handleSubmit = () => {
  const correctIndex = parseInt(correct) - 1;

  if (
    !question ||
    options.some(opt => !opt) ||
    isNaN(correctIndex) ||
    correctIndex < 0 ||
    correctIndex > 3
  ) {
    alert('Please fill all fields correctly.');
    return;
  }

  const correctAnswerText = options[correctIndex];

  onSave({ question, options, correctAnswer: correctAnswerText }); // ✅ save correct answer as text
  onClose();

  // Reset modal inputs
  setQuestion('');
  setOptions(['', '', '', '']);
  setCorrect('');
};


  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <h3>Add New Question</h3>
        <input placeholder="Question" value={question} onChange={e => setQuestion(e.target.value)} />
        {options.map((opt, idx) => (
          <input key={idx} placeholder={`Option ${idx + 1}`} value={opt}
            onChange={e => handleOptionChange(idx, e.target.value)} />
        ))}
        <input
          placeholder="Correct Option (1-4)"
          value={correct}
          onChange={e => setCorrect(e.target.value)}
        />
        <div className="modal-actions">
          <button onClick={handleSubmit}>Save</button>
          <button className="cancel" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddQuestionModal;
