import { useState } from "react";
import './AddQuestionModal.css';

const AddQuestionModal = ({ isOpen, onClose, onSave, questionType }) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correct, setCorrect] = useState('');
  const [image, setImage] = useState(null);
  const [questionFile, setQuestionFile] = useState(null);
  const [answerFile, setAnswerFile] = useState(null);

  // New fields
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [part, setPart] = useState('');
  const [source, setSource] = useState('');
  const [answerType, setAnswerType] = useState('');

  const handleSave = () => {
    if (!category || !subcategory ) {
      alert("Please fill all category-related fields");
      return;
    }

    if (questionType === 'mcq') {
      if (!question.trim() || options.some(opt => !opt.trim()) || !correct.trim()) {
        alert('Please fill in all fields');
        return;
      }
      onSave({
        answerType: 'MCQs',
        category,
        subcategory,
        part:'part 1 (MCQs)',
        source: 'custom',
        type: 'mcq',
        question,
        options,
        correct
      });
    }
    else if (questionType === 'image') {
      if (!question.trim() || !image) {
        alert('Please provide both question and image');
        return;
      }
      onSave({
        answerType: 'MCQs',
        category,
        subcategory,
        part:'part 1 (MCQs)',
        source: 'custom',
        type: 'image',
        question,
        image,
        options,
        correct
      });
    }
    else if (questionType === 'file') {
      if (!question.trim() || !questionFile || !answerFile) {
        alert('Please provide question, question file, and answer file');
        return;
      }
      onSave({
        answerType: 'input',
        category,
        subcategory,
        part:'part 2 (Practical based)',
        source: 'custom',
        type: 'file',
        question,
        questionFile,
        answerFile
      });
    }

    // Reset form
    setQuestion('');
    setOptions(['', '', '', '']);
    setCorrect('');
    setImage(null);
    setQuestionFile(null);
    setAnswerFile(null);
    setCategory('');
    setSubcategory('');
    setPart('');
    setSource('');
    setAnswerType('');
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

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {/* Header */}
        <div className="mod-header">
          <h2 className="modal-title">
            {questionType === 'mcq' ? 'Add MCQ Question' :
              questionType === 'image' ? 'Add Image Question' :
                'Add File Question'}
          </h2>
          <button onClick={onClose} className="cls-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">

          {/* New dropdown fields */}
          {/* <div className="field-group">
              <label className="field-label">Answer Type <span className="required">*</span></label>
              <select value={answerType} onChange={(e) => setAnswerType(e.target.value)} className="f-input">
                <option value="">-- Select Answer Type --</option>
                <option value="MCQ">MCQ</option>
                <option value="Technical">Technical</option>
                <option value="Practical">Practical</option>
              </select>
            </div> */}

          <div className="field-group">
            <label className="field-label">Domain <span className="required">*</span></label>
            <input className="f-input" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="-- Select Domain -- eg:BIM , MERN Stack" />
            {/* <select value={category} onChange={(e) => setCategory(e.target.value)} className="f-input">
                <option value="">-- Select Category --</option>
                <option value="BIM">BIM</option>
                <option value="Architecture">Architecture</option>
                <option value="Civil">Civil</option>
                <option value="Mechanical">Mechanical</option>
              </select> */}
          </div>

          <div className="field-group">
            <label className="field-label">Sub Domain <span className="required">*</span></label>
            <input className="f-input" value={subcategory} onChange={(e) => setSubcategory(e.target.value)} placeholder="-- Select Sub Domain--  eg: Architecture Focus , Node.js" />
            {/* <select value={subcategory} onChange={(e) => setSubcategory(e.target.value)} className="f-input">
                <option value="">-- Select Subcategory --</option>
                <option value="Architectural Focus">Architectural Focus</option>
                <option value="Structural Focus">Structural Focus</option>
                <option value="MEP Focus">MEP Focus</option>
              </select> */}
          </div>

          {/* <div className="field-group">
            <label className="field-label">Part <span className="required">*</span></label>
            <select value={part} onChange={(e) => setPart(e.target.value)} className="f-input">
              <option value="">-- Select Part --</option>
              <option value="Part 1 (MCQs)">Part 1 (MCQs)</option>
              <option value="Part 2 (Practical based)">Part 2 (practical)</option>
              <option value="Part 3 (technical)">Part 3 (technical)</option>
            </select>
          </div> */}


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
          {questionType === 'mcq' && (
            <>
              <div className="f-group">
                <label className="f-label">Answer Options <span className="required">*</span></label>
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
              <div className="f-group" style={{marginTop:'20px'}}>
                <label className="f-label">Correct Answer <span className="required">*</span></label>
                <select
                  value={correct}
                  onChange={(e) => setCorrect(e.target.value)}
                  className="f-input"
                >
                  <option value="">-- Select Correct Answer --</option>
                  {options.map((option, index) => (
                    <option key={index} value={option}>
                      {String.fromCharCode(65 + index)}. {option || `Option ${String.fromCharCode(65 + index)}`}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {questionType === 'image' && (
            <div className="f-group">
              <label className="f-label">Upload Image <span className="required">*</span></label>
              <div className="image-upload-container">
                <input type="file" accept="image/*" onChange={handleImageUpload} className="file-input" id="image-upload" />
                <label htmlFor="image-upload" className="upload-button">
                  {image ? 'Change Image' : 'Select Image'}
                </label>
                {image && <div className="image-preview"><img src={image} alt="Preview" /></div>}
              </div>
              <div className="f-group">
                <label className="f-label">Answer Options <span className="required">*</span></label>
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
              <div className="f-group">
                <label className="f-label">Correct Answer <span className="required">*</span></label>
                <select
                  value={correct}
                  disabled={options.find((option)=>option=='')}
                  onChange={(e) => setCorrect(e.target.value)}
                  className="f-input"
                >
                  <option value="">-- Select Correct Answer --</option>
                  {options.map((option, index) => (
                    <option key={index} value={option}>
                      {String.fromCharCode(65 + index)}. {option || `Option ${String.fromCharCode(65 + index)}`}
                    </option>
                  ))}
                </select>
              </div>
            </div>


          )}

          {questionType === 'file' && (
            <>
              <div className="f-group">
                <label className="f-label">Question File <span className="required">*</span></label>
                <div className="file-upload-container">
                  <input type="file" onChange={(e) => handleFileUpload(e, 'question')} className="file-input" id="question-file" />
                  <label htmlFor="question-file" className="upload-button">
                    {questionFile ? questionFile.name : 'Select Question File'}
                  </label>
                </div>
              </div>
              <div className="f-group">
                <label className="f-label">Answer File <span className="required">*</span></label>
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

        {/* Footer */}
        <div className="modal-footer">
          <button onClick={onClose} className="button button-secondary">Cancel</button>
          <button onClick={handleSave} className="button button-primary">Add Question</button>
        </div>
      </div>
    </div>
  );
};

export default AddQuestionModal;
