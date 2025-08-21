// QuestionSetPage.jsx
import React, { useState } from "react";
import "./QuestionSetPage.css";
import { ChevronDown, ChevronUp, Eye, Check, Plus, X, ArrowLeft, Cross, CrossIcon, LucideCross } from 'lucide-react';

const QuestionSetPage = ({
  template,
  subcategory,
  selectedQuestions = [],
  setSelectedQuestions,
  onBack,
  onDone
}) => {
  const [expandedSets, setExpandedSets] = useState({});
  const [expandedParts, setExpandedParts] = useState({});
  const [viewingQuestion, setViewingQuestion] = useState(null);

  if (!template || !subcategory) {
    return (
      <div className="qset-error">
        <div className="error-content">
          <div className="error-icon">⚠️</div>
          <h3>No Data Found</h3>
          <p>Please go back and select again.</p>
          <button className="error-btn" onClick={onBack}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Ensure template.questions exists and filter by subcategory
  const questions = Array.isArray(template.questions)
    ? template.questions.filter((q) => q.subcategory === subcategory)
    : [];

  // Group questions by set, then by part
  const questionsBySet = questions.reduce((acc, question) => {
    const setKey = question.set || 'General';
    const partKey = question.part || 'General';

    if (!acc[setKey]) {
      acc[setKey] = {};
    }

    if (!acc[setKey][partKey]) {
      acc[setKey][partKey] = [];
    }

    acc[setKey][partKey].push(question);
    return acc;
  }, {});

  const toggleQuestionSelect = (question) => {
    if (!setSelectedQuestions) return;

    // Ensure selectedQuestions is always an array
    const currentSelected = Array.isArray(selectedQuestions) ? selectedQuestions : [];

    if (currentSelected.some((q) => q.id === question.id)) {
      setSelectedQuestions(currentSelected.filter((q) => q.id !== question.id));
    } else {
      setSelectedQuestions([...currentSelected, question]);
    }
  };
  //select whole set
  const toggleSetSelection = (setQuestions) => {
    if (!setSelectedQuestions) return;

    const currentSelected = Array.isArray(selectedQuestions) ? selectedQuestions : [];

    // Flatten all questions from all parts in this set
    const allSetQuestions = Object.values(setQuestions).flat();

    const allSelected = allSetQuestions.every(q =>
      currentSelected.some(sq => sq.id === q.id)
    );

    if (allSelected) {
      // Remove all questions from this set
      setSelectedQuestions(
        currentSelected.filter(sq =>
          !allSetQuestions.some(pq => pq.id === sq.id)
        ))
    } else {
      // Add all questions from this set that aren't already selected
      const newSelections = allSetQuestions.filter(pq =>
        !currentSelected.some(sq => sq.id === pq.id)
      );
      setSelectedQuestions([...currentSelected, ...newSelections]);
    }
  };
  //select each part
  const togglePartSelection = (partQuestions) => {
    if (!setSelectedQuestions) return;

    const currentSelected = Array.isArray(selectedQuestions) ? selectedQuestions : [];
    const allSelected = partQuestions.every(q =>
      currentSelected.some(sq => sq.id === q.id)
    );

    if (allSelected) {
      // Remove all questions from this part
      setSelectedQuestions(
        currentSelected.filter(sq =>
          !partQuestions.some(pq => pq.id === sq.id)
        )
      )
    } else {
      // Add all questions from this part that aren't already selected
      const newSelections = partQuestions.filter(pq =>
        !currentSelected.some(sq => sq.id === pq.id)
      );
      setSelectedQuestions([...currentSelected, ...newSelections]);
    }
  };

  const toggleSetExpansion = (setKey) => {
    setExpandedSets(prev => ({
      ...prev,
      [setKey]: !prev[setKey]
    }));
  };

  const togglePartExpansion = (setKey, partKey) => {
    setExpandedParts(prev => ({
      ...prev,
      [`${setKey}-${partKey}`]: !prev[`${setKey}-${partKey}`]
    }));
  };

  const isSelected = (question) => {
    return Array.isArray(selectedQuestions) && selectedQuestions.some((sq) => sq.id === question.id);
  };

  const formatPartName = (part) => {
    if (part === 'part 1(MCQs)') return 'Part 1 (MCQs)';
    if (part === 'part 2(Revit)') return 'Part 2 (Revit)';
    if (part === 'part 1') return 'Part 1';
    if (part === 'part 2') return 'Part 2';
    return part;
  };

  const formatSetName = (set) => {
    return set.replace(/(Set \d+)/, '$1');
  };

  const formatSubcategoryName = (name) => {
    return name
      .split('-')
      .slice(1)
      .join(' ')
      .replace(/\b\w/g, l => l.toUpperCase());
  };

  const getDifficultyClass = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'difficulty-easy';
      case 'medium': return 'difficulty-medium';
      case 'hard': return 'difficulty-hard';
      default: return 'difficulty-default';
    }
  };

  return (
    <div className="qset-page">
      {/* Header */}
      <div className="qset-header">
        <div className="qset-header-content">
          <div className="qset-header-main">
            <div className="template-icon">
              {template.icon}
            </div>
            <div className="header-text">
              <h1 className="page-title">
                {formatSubcategoryName(subcategory)}
              </h1>
              <p className="page-subtitle">{template.title}</p>
              <div className="selection-info">
                <span className="selection-count">
                  {Array.isArray(selectedQuestions) ? selectedQuestions.length : 0} of {questions.length} selected
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="qset-content">
        {questions.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <h3>No Questions Found</h3>
            <p>No questions found in this subcategory.</p>
          </div>
        ) : (
          <div className="sets-container">
            {Object.entries(questionsBySet).map(([setKey, parts]) => {
              const isSetExpanded = expandedSets[setKey];
              const allSetQuestions = Object.values(parts).flat();
              const isSetSelected = allSetQuestions.every(q =>
                selectedQuestions.some(sq => sq.id === q.id)
              );
              const isPartiallySelected = allSetQuestions.some(q =>
                selectedQuestions.some(sq => sq.id === q.id)
              ) && !isSetSelected;

              return (
                <div key={setKey} className="set-section">
                  <div className="set-header" onClick={() => toggleSetExpansion(setKey)}>
                    <div className="set-info">
                      <h2 className="set-title">
                        {formatSetName(setKey)}
                      </h2>
                      <p className="set-meta">
                        {Object.values(parts).flat().length} questions across {Object.keys(parts).length} parts
                      </p>
                    </div>
                    <div className="set-actions">
                      <label 
                        className={`set-checkbox-container ${isSetSelected ? 'checked' : isPartiallySelected ? 'partial' : ''}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="checkbox"
                          checked={isSetSelected}
                          onChange={() => toggleSetSelection(parts)}
                          className="set-checkbox"
                        />
                        <span className="checkmark"></span>
                      </label>
                      <div className="expand-icon" onClick={() => toggleSetExpansion(setKey)}>
                        {isSetExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </div>
                    </div>
                  </div>

                  {isSetExpanded && (
                    <div className="parts-container">
                      {Object.entries(parts).map(([partKey, partQuestions]) => {
                        const isPartExpanded = expandedParts[`${setKey}-${partKey}`];
                        const allSelected = partQuestions.every(q =>
                          selectedQuestions.some(sq => sq.id === q.id)
                        );
                        const someSelected = partQuestions.some(q =>
                          selectedQuestions.some(sq => sq.id === q.id)
                        );

                        return (
                          <div key={`${setKey}-${partKey}`} className="part-section">
                            <div
                              className="part-header"
                              onClick={() => togglePartExpansion(setKey, partKey)}
                            >
                              <div className="part-info">
                                <h3 className="part-title">
                                  {formatPartName(partKey)}
                                </h3>
                                <p className="part-meta">
                                  {partQuestions.length} questions
                                </p>
                              </div>
                              <div className="part-actions">
                                <label 
                                  className={`part-checkbox-container ${allSelected ? 'checked' : someSelected ? 'partial' : ''}`}
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <input
                                    type="checkbox"
                                    checked={allSelected}
                                    onChange={() => togglePartSelection(partQuestions)}
                                    className="part-checkbox"
                                  />
                                  <span className="checkmark"></span>
                                </label>
                                <div className="expand-icon" onClick={() => togglePartExpansion(setKey, partKey)}>
                                  {isPartExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                </div>
                              </div>
                            </div>

                            {isPartExpanded && (
                              <div className="questions-list">
                                {partQuestions.map((question) => (
                                  <div
                                    key={question.id}
                                    className={`question-card ${isSelected(question) ? 'selected' : ''}`}
                                  >
                                    <div className="question-content">
                                      <div className="question-header">
                                        <h4 className="question-text">
                                          {question.question || question.title || `Question ${question.id}`}
                                        </h4>
                                        {question.difficulty && (
                                          <span className={`difficulty-badge ${getDifficultyClass(question.difficulty)}`}>
                                            {question.difficulty}
                                          </span>
                                        )}
                                      </div>
                                      <div className="question-meta">
                                        <span className="question-type">
                                          {question.answerType === 'mcq' ? 'Multiple Choice' : 'Practical based'}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="question-actions">
                                      <button
                                        className="view-btn"
                                        onClick={() => setViewingQuestion(question)}
                                        title="View question details"
                                      >
                                        <Eye size={16} />
                                      </button>
                                      <label className="question-checkbox-container">
                                        <input
                                          type="checkbox"
                                          checked={isSelected(question)}
                                          onChange={() => toggleQuestionSelect(question)}
                                          className="question-checkbox"
                                        />
                                        <span className="checkmark"></span>
                                      </label>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="qset-footer">
        <div className="footer-content">
          <button className="back-btn" onClick={onBack}>
            <ArrowLeft size={16} />
            Back
          </button>
          <div className="footer-info">
            <span className="selection-summary">
              {Array.isArray(selectedQuestions) ? selectedQuestions.length : 0} questions selected
            </span>
            {onDone && (
              <button
                className="done-btn"
                onClick={onDone}
                disabled={!Array.isArray(selectedQuestions) || selectedQuestions.length === 0}
              >
                Continue ({Array.isArray(selectedQuestions) ? selectedQuestions.length : 0})
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Question Detail Modal - remains the same as before */}
      {viewingQuestion && (
        <div className="question-modal-overlay" onClick={() => setViewingQuestion(null)}>
          <div className="question-modal" onClick={(e) => e.stopPropagation()}>
            <div className="mod-header">
              <div className="modal-title-section">
                <div className="modal-category">
                  <span>{template.title}</span>
                </div>
                <h3 className="modal-title">Question Preview</h3>
                <span className="modal-subcategory">
                  {formatSubcategoryName(subcategory)}
                </span>
              </div>
              <button
                className="modal-close"
                onClick={() => setViewingQuestion(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-content">
              <div className="question-detail">
                <h4 className="question-title">
                  {viewingQuestion.question || viewingQuestion.title}
                </h4>

                {viewingQuestion.description && (
                  <p className="question-description">
                    {viewingQuestion.description}
                  </p>
                )}

                {viewingQuestion.options && Array.isArray(viewingQuestion.options) && (
                  <div className="question-options">
                    <h5>Answer Options:</h5>
                    <ul className="options-list">
                      {viewingQuestion.options.map((option, index) => (
                        <li
                          key={index}
                          className={
                            option === viewingQuestion.correct
                              ? 'option-item correct'
                              : 'option-item'
                          }
                        >
                          <span className="option-letter">
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span className="option-text">{option}</span>
                          {option === viewingQuestion.correct && (
                            <span className="correct-indicator">✓ Correct</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {viewingQuestion.answerType === 'input' && (
                  <div className="question-input-details">
                    {viewingQuestion.inputRequired && viewingQuestion.inputRequired.length > 0 && (
                      <div className="input-required">
                        <h5>Inputs Required:</h5>
                        <ul>
                          {viewingQuestion.inputRequired.map((input, idx) => (
                            <li key={idx}>{input}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {viewingQuestion.questionFile && (
                      <div className="question-file">
                        <h5>Question File:</h5>
                        <a href={viewingQuestion.questionFile} target="_blank" rel="noreferrer">
                          View Question PDF
                        </a>
                      </div>
                    )}
                    {viewingQuestion.correctFile && (
                      <div className="correct-file">
                        <h5>Correct / Reference File:</h5>
                        <a href={viewingQuestion.correctFile} target="_blank" rel="noreferrer">
                          View Correct File
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="modal-footer">
              <button
                className={`modal-select-btn ${selectedQuestions.some((q) => q.id === viewingQuestion.id)
                  ? 'selected'
                  : ''
                  }`}
                onClick={() => {
                  toggleQuestionSelect(viewingQuestion);
                  setViewingQuestion(null);
                }}
              >
                {selectedQuestions.some((q) => q.id === viewingQuestion.id)
                  ? 'Remove from Selection'
                  : 'Add to Selection'}
              </button>
              <button className="modal-close-btn" onClick={() => setViewingQuestion(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionSetPage;