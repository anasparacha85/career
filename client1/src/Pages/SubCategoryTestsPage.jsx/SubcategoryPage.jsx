// SubcategoryPage.jsx
// ========================================
import React from 'react';
import './SubcategoryTest.css';
import { ChevronRight, BookOpen, Users, Clock, LogIn, ArrowLeft } from 'lucide-react';

const SubcategoryPage = ({
  template,
  onBack,
  onSubcategoryClick
}) => {
  if (!template) {
    return (
      <div className="subcategory-error">
        <div className="error-content">
          <div className="error-icon">⚠️</div>
          <h3>Template Not Found</h3>
          <p>Please go back and select a template to continue.</p>
          <button className="error-btn" onClick={onBack}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Ensure template.questions exists and is an array
  const questions = Array.isArray(template.questions) ? template.questions : [];

  const subcategories = questions.reduce((acc, question) => {
    const subcatName = question.subcategory || 'Uncategorized';
    console.log(subcatName)
    if (!acc[subcatName]) {

      acc[subcatName] = {
        name: subcatName,
        count: 0,
        parts: new Set(),
        difficulty: { easy: 0, medium: 0, hard: 0 }
      };
    }
    acc[subcatName].count++;
    
    if (question.part) {
      acc[subcatName].parts.add(question.part);
    }
    
    if (question.difficulty) {
      acc[subcatName].difficulty[question.difficulty] = 
        (acc[subcatName].difficulty[question.difficulty] || 0) + 1;
    }
    
    return acc;
  }, {});
  console.log(subcategories);
  

  const formatSubcategoryName = (name) => {
    return name
      .split('-')
      .slice(1)
      .join(' ')
      .replace(/\b\w/g, l => l.toUpperCase());
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'easy': return '#10b981';
      case 'medium': return '#f59e0b';
      case 'hard': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div className="subcategory-page">
      {/* Header */}
      <div className="subcategory-header">
       
        <div className="subcategory-header-content">
          <div className="subcategory-header-main">
            <div className="temp-icon">
              {template.icon}
            </div>
            <div className="header-text">
              <h1 className="page-title">{template.title}</h1>
              <p className="page-description">{template.description}</p>
              <div className="header-stats">
                <div className="stat-item">
                  <BookOpen size={16} />
                  <span style={{color:' gray'}}>{Object.keys(subcategories).length} Categories</span>
                </div>
                <div className="stat-item">
                  <Users size={16} />
                  <span style={{color:' gray'}}>{questions.length} Total Questions</span>
                </div>
              </div>
              
            </div>
            
            
          </div>
          
        </div>
        <div className='parent-back-btn'>
           <button className="back-btn" onClick={onBack} style={{height:'40px'}}>
          <ArrowLeft size={16}/> Back 
        </button>
        </div>
        
      </div>

      {/* Content */}
      <div className="subcategory-content">
        <div className="content-header">
          <h2>Select a Domain</h2>
          <p>Choose from the available domains  below</p>
        </div>

        {Object.keys(subcategories).length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📚</div>
            <h3>No Categories Available</h3>
            <p>No subcategories found for this template.</p>
          </div>
        ) : (
          <div className="subcategories-grid">
            {Object.entries(subcategories).map(([key, subcategory]) => {
              const displayName = formatSubcategoryName(subcategory.name);
              const totalDifficulty = Object.values(subcategory.difficulty).reduce((a, b) => a + b, 0);
              
              return (
                <div
                  key={key}
                  className="subcategory-card"
                  onClick={() => onSubcategoryClick && onSubcategoryClick(key)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSubcategoryClick && onSubcategoryClick(key);
                    }
                  }}
                >
                  <div className="card-header">
                    <div className="card-icon">
                      <BookOpen size={24} />
                    </div>
                    <div className="card-action">
                      <ChevronRight size={20} />
                    </div>
                  </div>
                  
                  <div className="card-content">
                    <h3 className="category-name">{subcategory.name}</h3>
                    
                    <div className="category-stats">
                      <div className="stat">
                        <span className="s-number">{subcategory.count}</span>
                        <span className="s-label">Questions</span>
                      </div>
                      <div className="stat">
                        <span className="s-number">{subcategory.parts.size}</span>
                        <span className="s-label">Parts</span>
                      </div>
                    </div>

                    {totalDifficulty > 0 && (
                      <div className="difficulty-breakdown">
                        <div className="difficulty-bar">
                          {Object.entries(subcategory.difficulty).map(([level, count]) => {
                            if (count === 0) return null;
                            const percentage = (count / totalDifficulty) * 100;
                            return (
                              <div
                                key={level}
                                className="difficulty-segment"
                                style={{
                                  width: `${percentage}%`,
                                  backgroundColor: getDifficultyColor(level)
                                }}
                                title={`${count} ${level} questions`}
                              />
                            );
                          })}
                        </div>
                        <div className="difficulty-labels">
                          {Object.entries(subcategory.difficulty).map(([level, count]) => {
                            if (count === 0) return null;
                            return (
                              <span key={level} className={`difficulty-label ${level}`}>
                                {count} {level}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="subcategory-footer">
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft size={16}/> Back to Templates
        </button>
      </div>
    </div>
  );
};

export default SubcategoryPage;