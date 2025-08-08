import React, { useState } from 'react';
import { X, Search, Filter, CheckCircle2, Circle, BookOpen, Building, Cog, Database } from 'lucide-react';
import './PreDefinedQuestionsModal.css';

const PredefinedQuestionsModal = ({ isOpen, onClose, onSelectQuestions }) => {
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  // BIM Engineering Predefined Questions
  const predefinedQuestions = [
    {
      id: 1,
      category: 'modeling',
      difficulty: 'beginner',
      question: 'What does BIM stand for?',
      options: [
        'Building Information Modeling',
        'Basic Information Management',
        'Building Implementation Method',
        'Business Intelligence Model'
      ],
      correct: 'Building Information Modeling'
    },
    {
      id: 2,
      category: 'modeling',
      difficulty: 'beginner',
      question: 'Which of the following is a primary benefit of BIM?',
      options: [
        'Reduced project costs only',
        'Better collaboration and coordination',
        'Faster construction only',
        'Simplified documentation only'
      ],
      correct: 'Better collaboration and coordination'
    },
    {
      id: 3,
      category: 'software',
      difficulty: 'intermediate',
      question: 'Which software is commonly used for architectural BIM modeling?',
      options: [
        'AutoCAD 2D',
        'Revit Architecture',
        'Photoshop',
        'Excel'
      ],
      correct: 'Revit Architecture'
    },
    {
      id: 4,
      category: 'coordination',
      difficulty: 'intermediate',
      question: 'What is clash detection in BIM?',
      options: [
        'A method to delete unwanted elements',
        'Identifying conflicts between building systems',
        'A rendering technique',
        'A project scheduling method'
      ],
      correct: 'Identifying conflicts between building systems'
    },
    {
      id: 5,
      category: 'standards',
      difficulty: 'advanced',
      question: 'What is an IFC file in BIM?',
      options: [
        'Internal File Container',
        'Industry Foundation Classes',
        'Integrated File Converter',
        'International Format Code'
      ],
      correct: 'Industry Foundation Classes'
    },
    {
      id: 6,
      category: 'modeling',
      difficulty: 'intermediate',
      question: 'What is LOD (Level of Detail/Development) in BIM?',
      options: [
        'A software license type',
        'Level of geometric and non-geometric information',
        'A project phase',
        'A file format'
      ],
      correct: 'Level of geometric and non-geometric information'
    },
    {
      id: 7,
      category: 'coordination',
      difficulty: 'beginner',
      question: 'What is the purpose of a federated BIM model?',
      options: [
        'To reduce file size',
        'To combine multiple discipline models',
        'To create 2D drawings',
        'To backup project data'
      ],
      correct: 'To combine multiple discipline models'
    },
    {
      id: 8,
      category: 'software',
      difficulty: 'intermediate',
      question: 'Which BIM software is primarily used for MEP (Mechanical, Electrical, Plumbing) design?',
      options: [
        'Revit MEP',
        'Photoshop',
        'AutoCAD LT',
        'SketchUp'
      ],
      correct: 'Revit MEP'
    },
    {
      id: 9,
      category: 'standards',
      difficulty: 'advanced',
      question: 'What is BIM Execution Plan (BEP)?',
      options: [
        'A software installation guide',
        'A document defining BIM workflow and responsibilities',
        'A building code requirement',
        'A type of BIM model'
      ],
      correct: 'A document defining BIM workflow and responsibilities'
    },
    {
      id: 10,
      category: 'coordination',
      difficulty: 'advanced',
      question: 'What is 4D BIM?',
      options: [
        'BIM with virtual reality',
        'BIM with time/scheduling information',
        'BIM with cost data',
        'BIM with multiple versions'
      ],
      correct: 'BIM with time/scheduling information'
    },
    {
      id: 11,
      category: 'modeling',
      difficulty: 'beginner',
      question: 'What is a BIM Family in Revit?',
      options: [
        'A group of users',
        'A parametric building component',
        'A project folder',
        'A software license'
      ],
      correct: 'A parametric building component'
    },
    {
      id: 12,
      category: 'standards',
      difficulty: 'intermediate',
      question: 'What does COBie stand for in BIM?',
      options: [
        'Construction Operations Building information exchange',
        'Computer Operations Base integration engine',
        'Coordinated Object Building interface exchange',
        'Core Operations BIM integration environment'
      ],
      correct: 'Construction Operations Building information exchange'
    },
    {
      id: 13,
      category: 'coordination',
      difficulty: 'intermediate',
      question: 'What is the main purpose of BIM coordination meetings?',
      options: [
        'To discuss project budget',
        'To resolve design conflicts and coordinate trades',
        'To plan marketing strategies',
        'To schedule vacations'
      ],
      correct: 'To resolve design conflicts and coordinate trades'
    },
    {
      id: 14,
      category: 'software',
      difficulty: 'advanced',
      question: 'Which BIM platform is known for its parametric design capabilities?',
      options: [
        'SketchUp',
        'Dynamo for Revit',
        'Paint 3D',
        'Notepad'
      ],
      correct: 'Dynamo for Revit'
    },
    {
      id: 15,
      category: 'modeling',
      difficulty: 'advanced',
      question: 'What is the difference between LOD 300 and LOD 400?',
      options: [
        'LOD 300 is for design, LOD 400 is for construction',
        'LOD 300 has precise geometry, LOD 400 adds fabrication details',
        'LOD 300 is 2D, LOD 400 is 3D',
        'No difference, they are the same'
      ],
      correct: 'LOD 300 has precise geometry, LOD 400 adds fabrication details'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories', icon: BookOpen },
    { value: 'modeling', label: 'BIM Modeling', icon: Building },
    { value: 'software', label: 'BIM Software', icon: Cog },
    { value: 'coordination', label: 'Coordination', icon: Database },
    { value: 'standards', label: 'Standards & Protocols', icon: CheckCircle2 }
  ];

  const difficulties = [
    { value: 'all', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  const filteredQuestions = predefinedQuestions.filter(q => {
    const matchesSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         q.options.some(opt => opt.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || q.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || q.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const handleQuestionToggle = (question) => {
    setSelectedQuestions(prev => {
      const isSelected = prev.some(q => q.id === question.id);
      if (isSelected) {
        return prev.filter(q => q.id !== question.id);
      } else {
        return [...prev, question];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedQuestions.length === filteredQuestions.length) {
      setSelectedQuestions([]);
    } else {
      setSelectedQuestions(filteredQuestions);
    }
  };

  const handleAddSelected = () => {
    onSelectQuestions(selectedQuestions);
    onClose();
    setSelectedQuestions([]);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'difficulty-beginner';
      case 'intermediate': return 'difficulty-intermediate';
      case 'advanced': return 'difficulty-advanced';
      default: return 'difficulty-beginner';
    }
  };

  const getCategoryIcon = (category) => {
    const categoryObj = categories.find(cat => cat.value === category);
    return categoryObj ? categoryObj.icon : BookOpen;
  };

  if (!isOpen) return null;

  return (
    <div className="predefined-modal-overlay">
      <div className="predefined-modal-container">
        <div className="predefined-modal-header">
          <div className="predefined-modal-title-section">
            <h2 className="predefined-modal-title">BIM Engineering Question Templates</h2>
            <p className="predefined-modal-subtitle">Choose from our curated collection of professional BIM questions</p>
          </div>
          <button onClick={onClose} className="predefined-modal-close">
            <X size={24} />
          </button>
        </div>

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
              <label className="predefined-filter-label">
                <Filter size={16} />
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="predefined-filter-select"
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>

            <div className="predefined-filter-section">
              <label className="predefined-filter-label">Difficulty</label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="predefined-filter-select"
              >
                {difficulties.map(diff => (
                  <option key={diff.value} value={diff.value}>{diff.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="predefined-modal-stats">
          <div className="predefined-stats-item">
            <span className="predefined-stats-number">{filteredQuestions.length}</span>
            <span className="predefined-stats-label">Available Questions</span>
          </div>
          <div className="predefined-stats-item">
            <span className="predefined-stats-number">{selectedQuestions.length}</span>
            <span className="predefined-stats-label">Selected</span>
          </div>
          <button onClick={handleSelectAll} className="predefined-select-all-btn">
            {selectedQuestions.length === filteredQuestions.length ? 'Deselect All' : 'Select All'}
          </button>
        </div>

        <div className="predefined-questions-grid">
          {filteredQuestions.map((question) => {
            const isSelected = selectedQuestions.some(q => q.id === question.id);
            const CategoryIcon = getCategoryIcon(question.category);
            
            return (
              <div
                key={question.id}
                className={`predefined-question-card ${isSelected ? 'selected' : ''}`}
                onClick={() => handleQuestionToggle(question)}
              >
                <div className="predefined-question-header">
                  <div className="predefined-question-meta">
                    <div className="predefined-category-badge">
                      <CategoryIcon size={14} />
                      <span>{categories.find(c => c.value === question.category)?.label}</span>
                    </div>
                    <span className={`predefined-difficulty-badge ${getDifficultyColor(question.difficulty)}`}>
                      {question.difficulty}
                    </span>
                  </div>
                  <div className="predefined-selection-indicator">
                    {isSelected ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                  </div>
                </div>

                <div className="predefined-question-content">
                  <h4 className="predefined-question-text">{question.question}</h4>
                  <div className="predefined-options-preview">
                    {question.options.slice(0, 2).map((option, index) => (
                      <div key={index} className="predefined-option-preview">
                        {String.fromCharCode(65 + index)}. {option}
                      </div>
                    ))}
                    {question.options.length > 2 && (
                      <div className="predefined-more-options">
                        +{question.options.length - 2} more options
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredQuestions.length === 0 && (
          <div className="predefined-no-results">
            <Search size={48} className="predefined-no-results-icon" />
            <h3>No questions found</h3>
            <p>Try adjusting your search criteria or filters</p>
          </div>
        )}

        <div className="predefined-modal-footer">
          <button onClick={onClose} className="predefined-cancel-btn">
            Cancel
          </button>
          <button
            onClick={handleAddSelected}
            disabled={selectedQuestions.length === 0}
            className="predefined-add-btn"
          >
            Add {selectedQuestions.length} Selected Question{selectedQuestions.length !== 1 ? 's' : ''}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PredefinedQuestionsModal;