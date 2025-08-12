import React, { useState } from 'react';
import { X, ChevronDown, ChevronUp, Check } from 'lucide-react';
import './TemplateSelectionModal.css';
import PreDefinedQuestions from '../QuestionsData/PreDefinedQuestions';
import PredefinedQuestionsModal from './QuestionsByTemplateModal';
import QuestionsByTemplateModal from './QuestionsByTemplateModal';

const TemplateSelectionModal = ({ isOpen, onClose, onSelectQuestions }) => {
  const [expandedCategory, setExpandedCategory] = React.useState(null);
  const [selectedQuestions, setSelectedQuestions] = React.useState([]);
const [TemplateQuestionsModal, setTemplateQuestionsModal] = useState(false)
  const templates = PreDefinedQuestions()

  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
    setTemplateQuestionsModal(true)
  };

  const toggleQuestionSelection = (question) => {
    setSelectedQuestions(prev => 
      prev.some(q => q.id === question.id) 
        ? prev.filter(q => q.id !== question.id)
        : [...prev, question]
    );
  };

  const handleSelectAllInCategory = (categoryQuestions) => {
    const allSelected = categoryQuestions.every(q => 
      selectedQuestions.some(sq => sq.id === q.id)
    );
    
    if (allSelected) {
      setSelectedQuestions(prev => 
        prev.filter(q => !categoryQuestions.some(cq => cq.id === q.id))
      );
    } else {
      const newQuestions = categoryQuestions.filter(q => 
        !selectedQuestions.some(sq => sq.id === q.id)
      );
      setSelectedQuestions(prev => [...prev, ...newQuestions]);
    }
  };

  const handleSubmit = () => {
    onSelectQuestions(selectedQuestions);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="template-modal-overlay">
      <div className="template-modal-container">
        <div className="template-modal-header">
          <h2 className="template-modal-title">Professional Question Templates</h2>
          <p className="template-modal-subtitle">Select from our expertly curated question sets</p>
          <button className="template-modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

       <div className="template-modal-content">
  <div className="template-grid">
    {templates.map((template) => {
      const allSelected = template.questions.every(q =>
        selectedQuestions.some(sq => sq.id === q.id)
      );

      return (
        <>
        <div key={template.category} className="template-card">
          <div className="template-card-icon">{template.icon}</div>
          <h3 className="template-card-title">{template.title}</h3>
          <p className="template-card-description">{template.description}</p>

          <div className="template-card-actions">
            <button
              className="template-btn view-btn"
              onClick={() => {
                setExpandedCategory(template.category);
                setTemplateQuestionsModal(true);
              }}
            >
              View Questions
            </button>

            <button
              className={`template-btn select-btn ${allSelected ? "selected" : ""}`}
              onClick={() => handleSelectAllInCategory(template.questions)}
            >
              {allSelected ? "Remove Entire Template" : "Select Entire Template"}
            </button>
          </div>

          
        </div>
       {expandedCategory === template.category && (
    <QuestionsByTemplateModal
        isOpen={TemplateQuestionsModal}
        onClose={() => setTemplateQuestionsModal(false)}
        predefinedQuestions={template.questions}
        selectedQuestions={selectedQuestions} // send current selection
        onToggleQuestion={toggleQuestionSelection} // send toggle function
    />
)}
        </>
      );
    })}
  </div>
</div>

        <div className="template-modal-footer">
          <div className="template-selection-count">
            {selectedQuestions.length} questions selected
          </div>
          <div className="template-modal-actions">
            <button 
              className="template-modal-cancel"
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              className="template-modal-submit"
              onClick={handleSubmit}
              disabled={selectedQuestions.length === 0}
            >
              Add Selected Questions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelectionModal;