import React, { useState, useEffect } from 'react';
import {
  X,
  Search,
  Eye,
  BookOpen,
  Building,
  Cog,
  Database,
  CheckCircle2,
} from 'lucide-react';
import './QuestionByTemplate.css';

const PAGE_SIZE = 10;

const categories = [
  { value: 'all', label: 'All Categories', icon: BookOpen },
  { value: 'modeling', label: 'BIM Modeling', icon: Building },
  { value: 'software', label: 'BIM Software', icon: Cog },
  { value: 'coordination', label: 'Coordination', icon: Database },
  { value: 'standards', label: 'Standards & Protocols', icon: CheckCircle2 },
];

const difficulties = [
  { value: 'all', label: 'All Levels' },
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];
const QuestionsByTemplateModal = ({
  isOpen,
  onClose,
  predefinedQuestions,
  selectedQuestions,
  onToggleQuestion
}) => {

  
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const getCategoryIcon = (category) => {
    const categoryObj = categories.find((cat) => cat.value === category);
    return categoryObj ? categoryObj.icon : BookOpen;
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'difficulty-beginner';
      case 'intermediate':
        return 'difficulty-intermediate';
      case 'advanced':
        return 'difficulty-advanced';
      default:
        return '';
    }
  };

  const filteredQuestions = predefinedQuestions.filter((q) => {
    const matchesSearch =
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.options.some((opt) =>
        opt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === 'all' || q.category === selectedCategory;
    const matchesDifficulty =
      selectedDifficulty === 'all' || q.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const pagedQuestions = filteredQuestions.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const totalPages = Math.ceil(filteredQuestions.length / PAGE_SIZE);

  const handleQuestionToggle = (question) => {
    onToggleQuestion(question); // parent ka toggle call
  };

  const handleSelectAll = () => {
    if (selectedQuestions.length === filteredQuestions.length) {
      setSelectedQuestions([]);
    } else {
      setSelectedQuestions(filteredQuestions);
    }
  };

  const handleAddSelected = () => {
  onClose(); 
};

  const openQuestionModal = (question) => setExpandedQuestion(question);
  const closeQuestionModal = () => setExpandedQuestion(null);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedDifficulty]);

  if (!isOpen) return null;

  return (
    <>
      <div className="predefined-modal-overlay">
        <div className="predefined-modal-container">
          {/* Header */}
          <div className="predefined-modal-header">
            <div className="predefined-modal-title-section">
              <h2 className="predefined-modal-title"> {selectedCategory} questions</h2>
              <p className="predefined-modal-subtitle">
                Choose from our curated collection of professional questions
              </p>
            </div>
            <button onClick={onClose} className="predefined-modal-close">
              <X size={24} />
            </button>
          </div>

          {/* Filters */}
          <div className="predefined-modal-filters">
            <div className="predefined-search-container">
              <Search className="predefined-search-icon" size={20} />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="predefined-search-input"
              />
            </div>

            <div className="predefined-filter-group">
              

              <div className="predefined-filter-section">
                <label className="predefined-filter-label">Difficulty</label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="predefined-filter-select"
                >
                  {difficulties.map((diff) => (
                    <option key={diff.value} value={diff.value}>
                      {diff.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="predefined-modal-stats">
            <div className="predefined-stats-item">
              <span className="predefined-stats-number">
                {filteredQuestions.length}
              </span>
              <span className="predefined-stats-label">Available</span>
            </div>
            <div className="predefined-stats-item">
              <span className="predefined-stats-number">
                {selectedQuestions.length}
              </span>
              <span className="predefined-stats-label">Selected</span>
            </div>
            <button onClick={handleSelectAll} className="predefined-select-all-btn">
              {selectedQuestions.length === filteredQuestions.length
                ? 'Deselect All'
                : 'Select All'}
            </button>
          </div>

          {/* Question list */}
          <div className="questions-horizontal-list">
            {pagedQuestions.map((question) => {
              const isSelected = selectedQuestions.some(
                (q) => q.id === question.id
              );
              const CategoryIcon = getCategoryIcon(question.category);
              return (
                <div
                  key={question.id}
                  className={`question-horizontal-card ${
                    isSelected ? 'selected' : ''
                  }`}
                  onClick={() => handleQuestionToggle(question)}
                  title={question.question}
                >
                  <div className="card-header">
                    <CategoryIcon size={16} className="category-icon" />
                    <span
                      className={`difficulty-badge ${getDifficultyColor(
                        question.difficulty
                      )}`}
                    >
                      {question.difficulty}
                    </span>
                  </div>
                  <div className="question-text">
                    {question.question.length > 50
                      ? question.question.slice(0, 47) + '...'
                      : question.question}
                  </div>
                  <button
                    className="eye-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      openQuestionModal(question);
                    }}
                  >
                    <Eye size={20} />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="pagination-controls">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="pagination-btn"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="pagination-btn"
            >
              Next
            </button>
          </div>

          {filteredQuestions.length === 0 && (
            <div className="predefined-no-results">
              <Search size={48} className="predefined-no-results-icon" />
              <h3>No questions found</h3>
              <p>Try adjusting your search or filters</p>
            </div>
          )}

          {/* Footer */}
          <div className="predefined-modal-footer">
            <button onClick={onClose} className="predefined-cancel-btn">
              Cancel
            </button>
            <button
              onClick={handleAddSelected}
              disabled={selectedQuestions.length === 0}
              className="predefined-add-btn"
            >
              Add {selectedQuestions.length} Selected Question
              {selectedQuestions.length !== 1 ? 's' : ''}
            </button>
          </div>
        </div>
      </div>

      {/* Question detail modal */}
      {expandedQuestion && (
        <div className="question-detail-overlay">
          <div className="question-detail-modal">
            <div className="question-detail-header">
              <div className="question-detail-meta">
                <div className="question-detail-category">
                  {React.createElement(
                    getCategoryIcon(expandedQuestion.category),
                    { size: 16 }
                  )}
                  <span>
                    {
                      categories.find(
                        (c) => c.value === expandedQuestion.category
                      )?.label
                    }
                  </span>
                </div>
                <span
                  className={`question-detail-difficulty ${getDifficultyColor(
                    expandedQuestion.difficulty
                  )}`}
                >
                  {expandedQuestion.difficulty}
                </span>
              </div>
              <button
                onClick={closeQuestionModal}
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
                  handleQuestionToggle(expandedQuestion);
                  closeQuestionModal();
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
    </>
  );
};

export default QuestionsByTemplateModal;
