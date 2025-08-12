import React, { useState } from 'react';
import { X, ChevronDown, ChevronUp, Check, BookOpen, Eye, Plus } from 'lucide-react';
import './TemplateSelectionModal.css';
import PreDefinedQuestions from '../QuestionsData/PreDefinedQuestions';
import PredefinedQuestionsModal from './QuestionsByTemplateModal';
import QuestionsByTemplateModal from './QuestionsByTemplateModal';

const TemplateSelectionModal = ({ isOpen, onClose, onSelectQuestions }) => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [templateQuestionsModal, setTemplateQuestionsModal] = useState(false);

  const templates = PreDefinedQuestions();

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

  const handleViewQuestions = (template) => {
    setExpandedCategory(template.category);
    setTemplateQuestionsModal(true);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {/* Header */}
        <div className="modal-header">
          <div className="header-content">
            <div className="header-icon">
              <BookOpen size={24} />
            </div>
            <div className="header-text">
              <h2 className="modal-title">Question Templates</h2>
              <p className="modal-subtitle">Choose from professionally curated question sets</p>
            </div>
          </div>
          <button className="close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="modal-content">
          <div className="templates-grid">
            {templates.map((template) => {
              const allSelected = template.questions.every(q =>
                selectedQuestions.some(sq => sq.id === q.id)
              );
              const someSelected = template.questions.some(q =>
                selectedQuestions.some(sq => sq.id === q.id)
              );

              return (
                <div key={template.category} className="template-card">
                  <div className="card-header">
                    <div className="card-icon">{template.icon}</div>
                    <div className="card-badge">
                      {template.questions.length} questions
                    </div>
                  </div>
                  
                  <div className="card-body">
                    <h3 className="card-title">{template.title}</h3>
                    <p className="card-description">{template.description}</p>
                  </div>

                  <div className="card-footer">
                    <button 
                      className="action-btn secondary"
                      onClick={() => handleViewQuestions(template)}
                    >
                      <Eye size={16} />
                      Preview
                    </button>
                    
                    <button
                      className={`action-btn ${allSelected ? 'remove' : 'primary'} ${someSelected && !allSelected ? 'partial' : ''}`}
                      onClick={() => handleSelectAllInCategory(template.questions)}
                    >
                      {allSelected ? (
                        <>
                          <X size={16} />
                          Remove All
                        </>
                      ) : (
                        <>
                          <Plus size={16} />
                          {someSelected ? 'Select Remaining' : 'Select All'}
                        </>
                      )}
                    </button>
                  </div>

                  {/* Selection indicator */}
                  {someSelected && (
                    <div className="selection-indicator">
                      <div className="selection-bar" style={{
                        width: `${(selectedQuestions.filter(q => template.questions.some(tq => tq.id === q.id)).length / template.questions.length) * 100}%`
                      }}></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <div className="selection-summary">
            <div className="selection-count">
              <Check size={16} />
              {selectedQuestions.length} questions selected
            </div>
            {selectedQuestions.length > 0 && (
              <div className="selection-breakdown">
                {templates.map(template => {
                  const count = selectedQuestions.filter(q => 
                    template.questions.some(tq => tq.id === q.id)
                  ).length;
                  return count > 0 ? (
                    <span key={template.category} className="breakdown-item">
                      {template.title}: {count}
                    </span>
                  ) : null;
                })}
              </div>
            )}
          </div>
          
          <div className="footer-actions">
            <button className="footer-btn secondary" onClick={onClose}>
              Cancel
            </button>
            <button 
              className="footer-btn primary"
              onClick={handleSubmit}
              disabled={selectedQuestions.length === 0}
            >
              Add Selected Questions
            </button>
          </div>
        </div>
      </div>

      {/* Questions Modal */}
      {expandedCategory && (
        <QuestionsByTemplateModal
          isOpen={templateQuestionsModal}
          onClose={() => setTemplateQuestionsModal(false)}
          predefinedQuestions={templates.find(t => t.category === expandedCategory)?.questions || []}
          selectedQuestions={selectedQuestions}
          onToggleQuestion={toggleQuestionSelection}
        />
      )}

     
    </div>
  );
};

export default TemplateSelectionModal;