import { useState } from "react";
import './AddQuestionModal.css';

const AddQuestionModal = ({ isOpen, onClose, onSave, questionType }) => {
  // Domain fields (persistent across questions)
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [domainLocked, setDomainLocked] = useState(false);

  // Question fields (reset after each save)
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correct, setCorrect] = useState('');
  const [image, setImage] = useState(null);
  const [questionFile, setQuestionFile] = useState(null);
  const [answerFile, setAnswerFile] = useState(null);
  
  // UI state
  const [questionsAdded, setQuestionsAdded] = useState(0);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const resetQuestionFields = () => {
    setQuestion('');
    setOptions(['', '', '', '']);
    setCorrect('');
    setImage(null);
    setQuestionFile(null);
    setAnswerFile(null);
  };

  const resetAllFields = () => {
    resetQuestionFields();
    setCategory('');
    setSubcategory('');
    setDomainLocked(false);
    setQuestionsAdded(0);
    setShowSuccessMessage(false);
  };

  const showTemporaryMessage = () => {
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 2000);
  };

  const validateFields = () => {
    if (!category.trim() || !subcategory.trim()) {
      alert("Please fill in Domain and Sub Domain fields");
      return false;
    }

    if (questionType === 'mcq') {
      if (!question.trim() || options.some(opt => !opt.trim()) || !correct.trim()) {
        alert('Please fill in all MCQ fields');
        return false;
      }
    }
    else if (questionType === 'image') {
      if (!question.trim() || !image || options.some(opt => !opt.trim()) || !correct.trim()) {
        alert('Please provide question, image, and all options');
        return false;
      }
    }
    else if (questionType === 'file') {
      if (!question.trim() || !questionFile || !answerFile) {
        alert('Please provide question, question file, and answer file');
        return false;
      }
    }
    return true;
  };

  const handleSaveQuestion = () => {
    if (!validateFields()) return;

    const questionData = {
      category: category.trim(),
      subcategory: subcategory.trim(),
      source: 'custom',
      question: question.trim(),
    };

    if (questionType === 'mcq') {
      Object.assign(questionData, {
        answerType: 'MCQs',
        part: 'part 1 (MCQs)',
        type: 'mcq',
        options: options.map(opt => opt.trim()),
        correct: correct.trim()
      });
    }
    else if (questionType === 'image') {
      Object.assign(questionData, {
        answerType: 'MCQs',
        part: 'part 1 (MCQs)',
        type: 'image',
        image,
        options: options.map(opt => opt.trim()),
        correct: correct.trim()
      });
    }
    else if (questionType === 'file') {
      Object.assign(questionData, {
        answerType: 'input',
        part: 'part 2 (Practical based)',
        type: 'file',
        questionFile,
        answerFile
      });
    }

    onSave(questionData);
    
    // Update UI state
    setDomainLocked(true);
    setQuestionsAdded(prev => prev + 1);
    resetQuestionFields();
    showTemporaryMessage();
  };

  const handleAddAnother = () => {
    resetQuestionFields();
  };

  const handleFinish = () => {
    resetAllFields();
    onClose();
  };

  const handleCancel = () => {
    resetAllFields();
    onClose();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (type === 'question') setQuestionFile(file);
      else setAnswerFile(file);
    }
  };

  if (!isOpen) return null;

  const getQuestionTypeTitle = () => {
    switch(questionType) {
      case 'mcq': return 'Multiple Choice Questions';
      case 'image': return 'Image-Based Questions';
      case 'file': return 'File-Based Questions';
      default: return 'Add Question';
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {/* Header */}
        <div className="mod-header">
          <div className="header-content">
            <h2 className="modal-title">{getQuestionTypeTitle()}</h2>
            {questionsAdded > 0 && (
              <div className="questions-counter">
                <span className="counter-badge">{questionsAdded}</span>
                <span className="counter-text">question{questionsAdded !== 1 ? 's' : ''} added</span>
              </div>
            )}
          </div>
          <button onClick={handleCancel} className="cls-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Success Message */}
        {showSuccessMessage && (
          <div className="success-message">
            <div className="success-content">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 12l2 2 4-4"></path>
                <circle cx="12" cy="12" r="10"></circle>
              </svg>
              <span>Question added successfully!</span>
            </div>
          </div>
        )}

        {/* Body */}
        <div className="modal-body">
          {/* Domain Section - Only show if not locked or if no questions added yet */}
          <div className={`domain-section ${domainLocked ? 'locked' : ''}`}>
            <div className="section-header">
              <h3 className="section-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                </svg>
                Domain Information
              </h3>
              {domainLocked && (
                <button 
                  className="edit-domain-btn"
                  onClick={() => setDomainLocked(false)}
                  title="Edit domain information"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                </button>
              )}
            </div>

            <div className="domain-fields">
              <div className="field-group">
                <label className="field-label">Domain <span className="required">*</span></label>
                <input 
                  className={`f-input ${domainLocked ? 'locked' : ''}`}
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)} 
                  placeholder="e.g., BIM, MERN Stack, Data Science"
                  disabled={domainLocked}
                />
              </div>

              <div className="field-group">
                <label className="field-label">Sub Domain <span className="required">*</span></label>
                <input 
                  className={`f-input ${domainLocked ? 'locked' : ''}`}
                  value={subcategory} 
                  onChange={(e) => setSubcategory(e.target.value)} 
                  placeholder="e.g., Architecture Focus, Node.js, Machine Learning"
                  disabled={domainLocked}
                />
              </div>
            </div>

            {!domainLocked && questionsAdded === 0 && (
              <div className="domain-note">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                Domain information will be applied to all questions you add in this session.
              </div>
            )}
          </div>

          {/* Question Section */}
          <div className="question-section">
            <div className="section-header">
              <h3 className="section-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V6a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
                Question Details
              </h3>
            </div>

            {/* Question Field */}
            <div className="field-group">
              <label className="field-label">Question <span className="required">*</span></label>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Enter your question here..."
                rows={3}
                className="field-textarea"
              />
            </div>

            {/* Type-specific fields */}
            {(questionType === 'mcq' || questionType === 'image') && (
              <>
                {questionType === 'image' && (
                  <div className="field-group">
                    <label className="field-label">Upload Image <span className="required">*</span></label>
                    <div className="image-upload-container">
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="file-input" id="image-upload" />
                      <label htmlFor="image-upload" className="upload-button">
                        {image ? 'Change Image' : 'Select Image'}
                      </label>
                      {image && <div className="image-preview"><img src={image} alt="Preview" /></div>}
                    </div>
                  </div>
                )}

                <div className="field-group">
                  <label className="field-label">Answer Options <span className="required">*</span></label>
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

                <div className="field-group">
                  <label className="field-label">Correct Answer <span className="required">*</span></label>
                  <select
                    value={correct}
                    onChange={(e) => setCorrect(e.target.value)}
                    className="f-input"
                    disabled={options.some(option => option === '')}
                  >
                    <option value="">-- Select Correct Answer --</option>
                    {options.map((option, index) => (
                      option && <option key={index} value={option}>
                        {String.fromCharCode(65 + index)}. {option}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}

            {questionType === 'file' && (
              <>
                <div className="field-group">
                  <label className="field-label">Question File <span className="required">*</span></label>
                  <div className="file-upload-container">
                    <input type="file" onChange={(e) => handleFileUpload(e, 'question')} className="file-input" id="question-file" />
                    <label htmlFor="question-file" className="upload-button">
                      {questionFile ? questionFile.name : 'Select Question File'}
                    </label>
                  </div>
                </div>
                <div className="field-group">
                  <label className="field-label">Answer File <span className="required">*</span></label>
                  <div className="file-upload-container">
                    <input type="file" onChange={(e) => handleFileUpload(e, 'answer')} className="file-input" id="answer-file" />
                    <label htmlFor="answer-file" className="upload-button">
                      {answerFile ? answerFile.name : 'Select Answer File'}
                    </label>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <div className="footer-actions">
            <button onClick={handleCancel} className="button button-secondary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
              Cancel
            </button>
            
            <div className="primary-actions">
              {questionsAdded > 0 && (
                <button onClick={handleFinish} className="button button-finish">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg>
                  Finish ({questionsAdded})
                </button>
              )}
              
              <button onClick={handleSaveQuestion} className="button button-primary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
                </svg>
                {questionsAdded > 0 ? 'Add Another' : 'Add Question'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddQuestionModal;