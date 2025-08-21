import React, { useState } from 'react';
import './Step2.css';
import { Plus, ChevronLeft, Save, BookOpen, Sparkles, Building, Code, Palette, Database, Server, Image as ImageIcon, File as FileIcon } from 'lucide-react';

import AddQuestionModal from "../../../components/Modal/AddQuestionModal";
import TemplateSelectionModal from '../../../components/Modal/TemplateSelectionModal';
import Swal from 'sweetalert2';
import QuestionTypeModal from '../../../components/Modal/TypeQuestionsModal';
import TemplateSelectionPage from '../../TemplateSelectionPage/TemplateSelectionPage';
import SubcategoryPage from '../../SubCategoryTestsPage.jsx/SubcategoryPage';
import QuestionSetPage from '../../QuestionSetPage/QuestionSetPage';

const Step2Questions = ({ testDetails, setTestDetails, prevStep, nextStep }) => {
  const [showModal, setShowModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [error, setError] = useState(null);
  const [showQuestionTypeModal, setShowQuestionTypeModal] = useState(false);
  const [selectedQuestionType, setSelectedQuestionType] = useState(null);
  const [Loading, setLoading] = useState(false)
  
  // View management
  const [activeView, setActiveView] = useState('main');
  const [viewingTemplate, setViewingTemplate] = useState(null);
  const [viewingSubcategory, setViewingSubcategory] = useState(null);
  const [selectedTemplateQuestions, setSelectedTemplateQuestions] = useState([]);

  const handleAddCustomQuestion = () => {
    setShowQuestionTypeModal(true);
    setSelectedQuestionType(null);
  };

  const handleSelectQuestionType = (type) => {
    setSelectedQuestionType(type);
    setShowQuestionTypeModal(false);
    setShowModal(true);
  };

  const handleAddTemplateQuestions = () => {
    setActiveView('template');
  };

const mergeTemplateQuestions = (qs) => {
  const existingIds = new Set(testDetails.questions.map(q => q.id));
  console.log(qs);
  
  const toAdd = qs
    .filter(q => !existingIds.has(q.id))
    .map(q => ({
      id: q.id || Date.now() + Math.random(),
      question: q.question || q.text, // map from template field
      options: Array.isArray(q.options) ? q.options : q.choices || [],
      correct: q.correct || q.correctAnswer,
      type: q.answerType || 'mcq',
      category: q.category || viewingTemplate?.category,
      difficulty: q.difficulty || 'beginner',
      source: 'template',
      subcategory:q.subcategory || '',
      part:q.part || 'part 1',
      inputRequired:Array.isArray(q.inputRequired)?q.inputRequired :[] ,
      questionFile:q.questionFile || 'question',
      answerFile:q.correctFile || 'none'
    }));

  setTestDetails(prev => ({
    ...prev,
    questions: [...prev.questions, ...toAdd],
  }));
};
console.log(testDetails);


  const handleSelectTemplateQuestions = (qs) => {
    mergeTemplateQuestions(qs);
    setActiveView('main');
  };

  // Fixed subcategory handler
  const handleOpenSubCategory = (subcategory) => {
    setViewingSubcategory(subcategory);
    setActiveView('questionSet');
  };

  const handleSaveCustomQuestion = (newQuestion) => {
    const questionWithSource = {
      ...newQuestion,
      source: 'custom',
      id: Date.now(),
      options: Array.isArray(newQuestion.options) ? newQuestion.options : []
    };
    
    setTestDetails({
      ...testDetails,
      questions: [...testDetails.questions, questionWithSource],
    });
  };
const handleFinalSave = async () => {
  try {
    const formData = new FormData();

    // Use Promise.all to handle async operations in map
    const questionsForBackend = await Promise.all(
      testDetails.questions.map(async (q, index) => {
        let { source, ...rest } = q;

        // If questionFile is a File object
        if (q.questionFile instanceof File) {
          formData.append(`questionFile_${index}`, q.questionFile);
          rest.questionFile = `__UPLOAD__questionFile_${index}`;
        }

        // If answerFile is a File object
        if (q.answerFile instanceof File) {
          formData.append(`answerFile_${index}`, q.answerFile);
          rest.answerFile = `__UPLOAD__answerFile_${index}`;
        }

        // If image is base64 string
        if (q.image && q.image.startsWith("data:image")) {
          // Convert base64 to Blob
          const response = await fetch(q.image);
          const blob = await response.blob();
          const file = new File([blob], `image_${index}.jpeg`, { type: 'image/jpeg' });
          formData.append(`image_${index}`, file);
          rest.image = `__UPLOAD__image_${index}`;
        }

        return rest;
      })
    );

    const testDataForBackend = {
      ...testDetails,
      questions: questionsForBackend,
    };

    formData.append("testData", JSON.stringify(testDataForBackend));

    const response = await fetch(`${import.meta.env.VITE_LOCAL_BACKEND_API}/test/createTest`, {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    if (response.ok) {
      Swal.fire({
        title: 'Success!',
        text: data.SuccessMessage,
        icon: 'success'
      });
      nextStep();
    } else {
      Swal.fire({
        title: 'Error!',
        text: data.FailureMessage || 'Failed to save test',
        icon: 'error'
      });
    }
  } catch (error) {
    Swal.fire({
      title: 'Error!',
      icon: 'error',
      text: error.message || 'Something went wrong'
    });
  }
};


  const removeQuestion = (index) => {
    const updatedQuestions = testDetails.questions.filter((_, i) => i !== index);
    setTestDetails({ ...testDetails, questions: updatedQuestions });
  };

  const getQuestionStats = () => {
    const customCount = testDetails.questions.filter(q => q.source === 'custom').length;
    const templateCount = testDetails.questions.filter(q => q.source === 'template').length;
    
    const categoryStats = {};
    testDetails.questions.forEach(q => {
      if (q.source === 'template' && q.category) {
        categoryStats[q.category] = (categoryStats[q.category] || 0) + 1;
      }
    });

    return { customCount, templateCount, categoryStats };
  };

  const getCategoryIcon = (category) => {
    const iconMap = {
      'mern-stack': Code,
      'bim-engineering': Building,
      'graphic-design': Palette,
      'data-science': Database,
      'devops-cloud': Server
    };
    return iconMap[category] || BookOpen;
  };

  const getDifficultyClass = (difficulty) => {
    const classMap = {
      'beginner': 'step2-difficulty-beginner',
      'intermediate': 'step2-difficulty-intermediate', 
      'advanced': 'step2-difficulty-advanced'
    };
    return classMap[difficulty] || 'step2-difficulty-beginner';
  };

  const { customCount, templateCount, categoryStats } = getQuestionStats();
  
  // Route to Template Selection Page
  if (activeView === 'template') {
    return (
      <TemplateSelectionPage
        onBack={() => setActiveView('main')}
        onPreview={(template) => {
          setViewingTemplate(template);
          setActiveView('subcategory');
        }}
        onSelectQuestions={(qs) => handleSelectTemplateQuestions(qs)}
        selectedQuestions={selectedTemplateQuestions}
        setSelectedQuestions={setSelectedTemplateQuestions}
      />
    );
  }

  // Route to Subcategory Page
  if (activeView === 'subcategory' && viewingTemplate) {
    return (
      <SubcategoryPage
        template={viewingTemplate}
        onBack={() => setActiveView('template')}
        onSubcategoryClick={(subcategory) => handleOpenSubCategory(subcategory)}
      />
    );
  }

  // Route to Question Set Page
  if (activeView === 'questionSet' && viewingTemplate && viewingSubcategory) {
    return (
      <QuestionSetPage
        template={viewingTemplate}
        subcategory={viewingSubcategory}
        selectedQuestions={selectedTemplateQuestions}
        setSelectedQuestions={setSelectedTemplateQuestions}
        onBack={() => setActiveView('subcategory')}
        onDone={() => setActiveView('template')}
      />
    );
  }

  // Main Step2 View
  return (
    <>
      {activeView === 'main' && (
        <div className="step2-container">
          <div className="step2-header">
            <h2 className="step2-title">Test Questions</h2>
            <p className="step2-subtitle">Build your assessment with custom questions or choose from our professional templates</p>
          </div>

          {error && (
            <div className="step2-error">
              <p className="step2-error-text">{error}</p>
            </div>
          )}

          {/* Enhanced Action Buttons Section */}
          <div className="step2-actions-container">
            <div className="step2-actions-grid">
              <button 
                onClick={handleAddCustomQuestion}
                className="step2-action-card step2-custom-action"
              >
                <div className="step2-action-icon">
                  <Plus size={20} />
                </div>
                <div className="step2-action-content">
                  <h3 className="step2-action-title">Create Custom Question</h3>
                  <p className="step2-action-description">Build your own questions with multiple choice options</p>
                </div>
              </button>

              <button 
                onClick={handleAddTemplateQuestions}
                className="step2-action-card step2-predefined-action"
              >
                <div className="step2-action-icon step2-predefined-icon">
                  <BookOpen size={20} />
                  <Sparkles size={12} className="step2-sparkle-icon" />
                </div>
                <div className="step2-action-content">
                  <h3 className="step2-action-title">Professional Templates</h3>
                  <p className="step2-action-description">Choose from expertly curated question sets across various domains</p>
                  <div className="step2-template-preview">
                    <span className="step2-template-tag">
                      <Code size={12} />
                      MERN
                    </span>
                    <span className="step2-template-tag">
                      <Building size={12} />
                      BIM
                    </span>
                    <span className="step2-template-tag">
                      <Palette size={12} />
                      Design
                    </span>
                    <span className="step2-template-more">+2 more</span>
                  </div>
                </div>
              </button>
            </div>

            {/* Enhanced Questions Summary */}
            {testDetails.questions.length > 0 && (
              <div className="step2-summary-card">
                <div className="step2-summary-stats">
                  <div className="step2-summary-stat">
                    <span className="step2-summary-number">{testDetails.questions.length}</span>
                    <span className="step2-summary-label">Total Questions</span>
                  </div>
                  {customCount > 0 && (
                    <div className="step2-summary-stat">
                      <span className="step2-summary-number step2-custom-color">{customCount}</span>
                      <span className="step2-summary-label">Custom</span>
                    </div>
                  )}
                  {templateCount > 0 && (
                    <div className="step2-summary-stat">
                      <span className="step2-summary-number step2-template-color">{templateCount}</span>
                      <span className="step2-summary-label">Template</span>
                    </div>
                  )}
                </div>
                
                {/* Template Categories Summary */}
                {Object.keys(categoryStats).length > 0 && (
                  <div className="step2-category-summary">
                    <div className="step2-category-header">
                      <span className="step2-category-title">Template Categories:</span>
                    </div>
                    <div className="step2-category-tags">
                      {Object.entries(categoryStats).map(([category, count]) => {
                        const IconComponent = getCategoryIcon(category);
                        return (
                          <span key={category} className="step2-category-tag">
                            <IconComponent size={14} />
                            <span className="step2-category-name">{category.replace('-', ' ')}</span>
                            <span className="step2-category-count">{count}</span>
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="step2-questions-container">
            {testDetails.questions.length === 0 ? (
              <div className="step2-empty-state">
                <div className="step2-empty-icon">
                  <BookOpen className="step2-empty-icon-svg" />
                </div>
                <h3 className="step2-empty-title">No questions added yet</h3>
                <p className="step2-empty-text">Start building your test by creating custom questions or selecting from our professional templates above.</p>
              </div>
            ) : (
              <div>
                <div className="step2-questions-header">
                  <h3 className="step2-questions-title">
                    Test Questions ({testDetails.questions.length})
                  </h3>
                  <div className="step2-question-filters">
                    {customCount > 0 && templateCount > 0 && (
                      <div className="step2-filter-badges">
                        <span className="step2-filter-badge step2-custom-badge">
                          {customCount} Custom
                        </span>
                        <span className="step2-filter-badge step2-template-badge">
                          {templateCount} Template
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="step2-questions-list">
                  {testDetails.questions.map((q, index) => {
                    const IconComponent = getCategoryIcon(q.category);
                    return (
                      <div key={q.id || index} className="step2-question-card">
                        <div className="step2-question-header">
                          <div className="step2-question-title-section">
                            <div className="step2-question-meta">
                              <span className="step2-question-number">Q{index + 1}</span>
                              <span className={`step2-question-source-badge ${
                                q.source === 'custom' ? 'step2-source-custom' : 'step2-source-template'
                              }`}>
                                {q.source === 'custom' ? 'Custom' : 'Template'}
                              </span>
                              {q.category && (
                                <span className="step2-question-category-badge">
                                  <IconComponent size={12} />
                                  {q.category.replace('-', ' ')}
                                </span>
                              )}
                              {/* {q.difficulty && (
                                <span className={`step2-difficulty-badge ${getDifficultyClass(q.difficulty)}`}>
                                  {q.difficulty}
                                </span>
                              )} */}
                              {q.type && (
                                <span className="step2-question-type-badge">
                                  {q.type === 'mcq' ? (
                                    <BookOpen size={12} />
                                  ) : q.type === 'image' ? (
                                    <ImageIcon size={12} />
                                  ) : (
                                    <FileIcon size={12} />
                                  )}
                                  {q.type.toUpperCase()}
                                </span>
                              )}
                            </div>
                            <h4 className="step2-question-title">{q.question}</h4>
                          </div>
                          <button
                            onClick={() => removeQuestion(index)}
                            className="step2-remove-btn"
                          >
                            Remove
                          </button>
                        </div>

                        {/* Render question content based on type */}
                        {q.type === 'mcq' && q.options && Array.isArray(q.options) && (
                          <div className="step2-options-list">
                            {q.options.map((opt, i) => (
                              <div key={i} className={`step2-option ${
                                opt === q.correct 
                                  ? 'step2-option-correct' 
                                  : 'step2-option-incorrect'
                              }`}>
                                <span className="step2-option-letter">{String.fromCharCode(65 + i)}.</span>
                                <span className="step2-option-text">{opt}</span>
                                {opt === q.correct && <span className="step2-correct-indicator">✓</span>}
                              </div>
                            ))}
                          </div>
                        )}

                        {q.type === 'image' && q.image && (
                          <div className="step2-image-container">
                            <div className="step2-image-preview">
                              <img src={q.image} alt="Question image" />
                            </div>
                            {q.options && Array.isArray(q.options) && q.options.length > 0 && (
                              <div className="step2-options-list">
                                {q.options.map((opt, i) => (
                                  <div key={i} className={`step2-option ${
                                    opt === q.correct 
                                      ? 'step2-option-correct' 
                                      : 'step2-option-incorrect'
                                  }`}>
                                    <span className="step2-option-letter">{String.fromCharCode(65 + i)}.</span>
                                    <span className="step2-option-text">{opt}</span>
                                    {opt === q.correct && <span className="step2-correct-indicator">✓</span>}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        {q.type === 'file' && (
                          <div className="step2-file-container">
                            <div className="step2-file-info">
                              <FileIcon size={16} />
                              <span className="step2-file-name">
                                Question File: {q.questionFile?.name || 'No file uploaded'}
                              </span>
                            </div>
                            <div className="step2-file-info">
                              <FileIcon size={16} />
                              <span className="step2-file-name">
                                Answer File: {q.answerFile?.name || 'No file uploaded'}
                              </span>
                            </div>
                          </div>
                        )}
                         {q.type === 'input' && (
                          <div className="step2-file-container">
                            <div className="step2-file-info">
                              <FileIcon size={16} />
                              <span className="step2-file-name">
                                Question File: {q.questionFile || 'No file uploaded'}
                              </span>
                            </div>
                            <div className="step2-file-info">
                              <FileIcon size={16} />
                              <span className="step2-file-name">
                                Answer File: {q.answerFile || 'No file uploaded'}
                              </span>
                            </div>
                             {q.inputRequired && Array.isArray(q.inputRequired) && q.inputRequired.length > 0 && (
                              <div className="step2-options-list">
                              <h3>Inputs Required</h3>
                                {q.inputRequired.map((opt, i) => (
                                  <div key={i} className={`step2-option ${
                                    opt === q.correct 
                                      ? 'step2-option-correct' 
                                      : 'step2-option-incorrect'
                                  }`}>
                                    <span className="step2-option-letter">{String.fromCharCode(65 + i)}.</span>
                                    <span className="step2-option-text">{opt}</span>
                                    {/* {opt === q.correct && <span className="step2-correct-indicator">✓</span>} */}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="step2-navigation">
            <button 
              onClick={prevStep}
              className="step2-back-btn"
            >
              <ChevronLeft size={18} /> Back
            </button>
            <button 
              onClick={handleFinalSave}
              disabled={testDetails.questions.length === 0}
              className="step2-save-btn"
            >
              Save Test <Save size={18} />
            </button>
          </div>

          {/* Modals */}
          {showQuestionTypeModal && (
            <QuestionTypeModal
              isOpen={showQuestionTypeModal}
              onClose={() => setShowQuestionTypeModal(false)}
              onSelectType={handleSelectQuestionType}
            />
          )}

          {showModal && (
            <AddQuestionModal
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              onSave={handleSaveCustomQuestion}
              questionType={selectedQuestionType}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Step2Questions;