import React from 'react';
import { X, ChevronRight } from 'lucide-react';
import './SubcategoryModal.css';

const SubcategoryModal = ({ 
  isOpen, 
  onClose, 
  template,
  onSubcategorySelect
}) => {
  if (!isOpen) return null;

  // Group questions by subcategory
  const subcategories = template.questions.reduce((acc, question) => {
    if (!acc[question.subcategory]) {
      acc[question.subcategory] = {
        name: question.subcategory,
        count: 0,
        sets: new Set()
      };
    }
    acc[question.subcategory].count++;
    acc[question.subcategory].sets.add(question.set);
    return acc;
  }, {});

  return (
    <div className="subcategory-modal-overlay" onClick={onClose}>
      <div className="subcategory-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="subcategory-modal-header">
          <div className="subcategory-header-content">
            <div className="subcategory-header-icon">
              {template.icon}
            </div>
            <div className="subcategory-header-text">
              <h2 className="subcategory-modal-title">{template.title}</h2>
              <p className="subcategory-modal-subtitle">{template.description}</p>
            </div>
          </div>
          <button className="subcategory-close-button" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="subcategory-modal-content">
          <div className="subcategories-grid">
            {Object.entries(subcategories).map(([key, subcategory]) => (
              <div 
                key={key} 
                className="subcategory-card"
                onClick={() => onSubcategorySelect(key)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSubcategorySelect(key);
                  }
                }}
              >
                <div className="subcategory-info">
                  <h3 className="subcategory-name">
                    {subcategory.name.charAt(0).toUpperCase() + subcategory.name.slice(1)}
                  </h3>
                  <p className="subcategory-meta">
                    {subcategory.count} questions • {subcategory.sets.size} sets
                  </p>
                </div>
                <ChevronRight size={20} className="subcategory-chevron-icon" />
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="subcategory-modal-footer">
          <button className="subcategory-footer-btn" onClick={onClose}>
            Back to Templates
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubcategoryModal;