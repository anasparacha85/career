import React, { useState } from 'react';
import { X, ChevronDown, ChevronUp, Check, Eye } from 'lucide-react';
import './QuestionSetModal.css';

const QuestionSetModal = ({
  isOpen,
  onClose,
  template,
  subcategory,
  selectedQuestions,
  toggleQuestionSelection,
  onSelectAllInSet
}) => {
  const [expandedPart, setExpandedPart] = useState(null);
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  if (!isOpen) return null;

  // Filter questions for this subcategory and group by part
  const questionsByPart = template.questions
    .filter(q => q.subcategory === subcategory)
    .reduce((acc, question) => {
      const partKey = question.part;
      if (!acc[partKey]) {
        acc[partKey] = [];
      }
      acc[partKey].push(question);
      return acc;
    }, {});

  // Get subcategory display name
  const subcategoryName = subcategory.split('-').slice(1).join(' ');
  
  return (
    <div className="question-set-modal-overlay" onClick={onClose}>
      <div className="question-set-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="question-set-modal-header">
          <div className="question-set-header-content">
            <div className="question-set-header-icon">
              {template.icon}
            </div>
            <div className="question-set-header-text">
              <h2 className="question-set-modal-title">
                {subcategoryName.charAt(0).toUpperCase() + subcategoryName.slice(1)}
              </h2>
              <p className="question-set-modal-subtitle">{template.title}</p>
            </div>
          </div>
          <button className="question-set-close-button" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="question-set-modal-content">
          {Object.entries(questionsByPart).map(([part, questions]) => {
            const isExpanded = expandedPart === part;
            const allSelected = questions.every(q => 
              selectedQuestions.some(sq => sq.id === q.id)
            );
            const someSelected = questions.some(q => 
              selectedQuestions.some(sq => sq.id === q.id)
            );

            return (
              <div key={part} className="set-section">
                <div 
                  className="set-header"
                  onClick={() => setExpandedPart(isExpanded ? null : part)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="set-info">
                    <h3 className="set-title">
                      {part === 'part 1(MCQs)' ? 'Part 1 (MCQs)' : 
                       part === 'part 2(Revit)' ? 'Part 2 (Revit)' :
                       part === 'part 1' ? 'Part 1' : 'Part 2'}
                    </h3>
                    <p className="set-meta">{questions.length} questions</p>
                  </div>
                  <div className="set-actions">
                    <button 
                      className={`set-select-btn ${allSelected ? 'selected' : someSelected ? 'partial' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectAllInSet(questions);
                      }}
                    >
                      {allSelected ? 'Deselect All' : someSelected ? 'Select Remaining' : 'Select All'}
                    </button>
                    <div className="expand-icon">
                      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="questions-list">
                    {questions.map((question) => (
                      <div 
                        key={question.id} 
                        className={`question-item ${
                          selectedQuestions.some(q => q.id === question.id) ? 'selected' : ''
                        }`}
                      >
                        <div 
                          className="question-text"
                          onClick={() => setExpandedQuestion(question)}
                        >
                          <p className="question-content">{question.question}</p>
                          <span className="question-meta">
                            {question.answerType === 'mcq' ? 'Multiple Choice' : 'Other'}
                          </span>
                        </div>
                        <div className="question-actions">
                          <button 
                            className="view-question-btn"
                            onClick={() => setExpandedQuestion(question)}
                            title="View question details"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            className={`select-question-btn ${
                              selectedQuestions.some(q => q.id === question.id) ? 'selected' : ''
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleQuestionSelection(question);
                            }}
                          >
                            {selectedQuestions.some(q => q.id === question.id) ? (
                              <Check size={16} />
                            ) : (
                              '+'
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="question-set-modal-footer">
          <button className="question-set-footer-btn" onClick={onClose}>
            Back to Subcategories
          </button>
        </div>
      </div>

      {/* Question Detail Modal */}
      {expandedQuestion && (
        <div className="question-detail-overlay">
          <div className="question-detail-modal">
            <div className="question-detail-header">
              <div className="question-detail-meta">
                <div className="question-detail-category">
                  <span>{template.title}</span>
                </div>
                <span className="question-detail-subcategory">
                  {subcategoryName}
                </span>
              </div>
              <button
                onClick={() => setExpandedQuestion(null)}
                className="question-detail-close"
              >
                <X size={20} />
              </button>
            </div>

            <div className="question-detail-content">
              <h3 className="question-detail-title">
                {expandedQuestion.question}
              </h3>
              <div className="question-detail-options">
                <h4>Answer Options:</h4>
                <ul>
                  {expandedQuestion.options.map((option, index) => (
                    <li
                      key={index}
                      className={
                        option === expandedQuestion.correct
                          ? 'correct-answer'
                          : ''
                      }
                    >
                      <span className="option-letter">
                        {String.fromCharCode(65 + index)}
                      </span>
                      {option}
                      {option === expandedQuestion.correct && (
                        <span className="correct-indicator">✓ Correct</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="question-detail-actions">
              <button
                onClick={() => {
                  toggleQuestionSelection(expandedQuestion);
                  setExpandedQuestion(null);
                }}
                className={`question-detail-select ${
                  selectedQuestions.some(
                    (q) => q.id === expandedQuestion.id
                  )
                    ? 'selected'
                    : ''
                }`}
              >
                {selectedQuestions.some(
                  (q) => q.id === expandedQuestion.id
                )
                  ? 'Remove from Selection'
                  : 'Add to Selection'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionSetModal;