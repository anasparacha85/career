import React, { useState } from 'react';
import './Step2.css';
import { Plus, ChevronLeft, Save, BookOpen, Sparkles } from 'lucide-react';
import AddQuestionModal from "../../../components/Modal/AddQuestionModal";
import PredefinedQuestionsModal from '../../../components/Modal/PreDefinedQuestionModal';
import Swal from 'sweetalert2';

const Step2Questions = ({ testDetails, setTestDetails, prevStep, nextStep }) => {
  const [showModal, setShowModal] = useState(false);
  const [showPredefinedModal, setShowPredefinedModal] = useState(false);
  const [error, setError] = useState(null);

  const handleAddCustomQuestion = () => setShowModal(true);
  const handleAddPredefinedQuestions = () => setShowPredefinedModal(true);

  const handleSaveCustomQuestion = (newQuestion) => {
    const questionWithSource = {
      ...newQuestion,
      source: 'custom',
      id: Date.now() // Add unique ID for tracking
    };
    
    setTestDetails({
      ...testDetails,
      questions: [...testDetails.questions, questionWithSource],
    });
  };

  const handleSelectPredefinedQuestions = (selectedQuestions) => {
    const questionsWithSource = selectedQuestions.map(question => ({
      ...question,
      source: 'predefined'
    }));
    
    setTestDetails({
      ...testDetails,
      questions: [...testDetails.questions, ...questionsWithSource],
    });
  };

  const handleFinalSave = async () => {
    console.log("Final Test Data:", testDetails);
    try {
      // Prepare questions for backend (remove source field if not needed)
      const questionsForBackend = testDetails.questions.map(({ source, ...question }) => question);
      const testDataForBackend = {
        ...testDetails,
        questions: questionsForBackend
      };

      const response = await fetch(`${import.meta.env.VITE_LOCAL_BACKEND_API}/test/createTest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(testDataForBackend)
      });
      
      if (response.ok) {
        const data = await response.json();
        Swal.fire({
          title: 'Success!',
          text: data.SuccessMessage,
          icon: 'success'
        });
        nextStep();
      } else {
        const data = await response.json();
        setError("Failed to save test");
        Swal.fire({
          title: 'Error!',
          text: data.FailureMessage || 'Failed to save test',
          icon: 'error'
        });
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred while saving the test");
      Swal.fire({
        title: 'Error!',
        icon: 'error',
        text: error.FailureMessage || 'Something went wrong'
      });
    }
  };

  const removeQuestion = (index) => {
    const updatedQuestions = testDetails.questions.filter((_, i) => i !== index);
    setTestDetails({ ...testDetails, questions: updatedQuestions });
  };

  const getQuestionStats = () => {
    const customCount = testDetails.questions.filter(q => q.source === 'custom').length;
    const predefinedCount = testDetails.questions.filter(q => q.source === 'predefined').length;
    return { customCount, predefinedCount };
  };

  const { customCount, predefinedCount } = getQuestionStats();

  return (
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
            onClick={handleAddPredefinedQuestions}
            className="step2-action-card step2-predefined-action"
          >
            <div className="step2-action-icon step2-predefined-icon">
              <BookOpen size={20} />
              <Sparkles size={12} className="step2-sparkle-icon" />
            </div>
            <div className="step2-action-content">
              <h3 className="step2-action-title">Add Template Questions</h3>
              <p className="step2-action-description">Choose from our curated BIM engineering question bank</p>
            </div>
          </button>
        </div>

        {/* Questions Summary */}
        {testDetails.questions.length > 0 && (
          <div className="step2-summary-card">
            <div className="step2-summary-stats">
              <div className="step2-summary-stat">
                <span className="step2-summary-number">{testDetails.questions.length}</span>
                <span className="step2-summary-label">Total Questions</span>
              </div>
              {customCount > 0 && (
                <div className="step2-summary-stat">
                  <span className="step2-summary-number">{customCount}</span>
                  <span className="step2-summary-label">Custom</span>
                </div>
              )}
              {predefinedCount > 0 && (
                <div className="step2-summary-stat">
                  <span className="step2-summary-number">{predefinedCount}</span>
                  <span className="step2-summary-label">Template</span>
                </div>
              )}
            </div>
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
                {customCount > 0 && predefinedCount > 0 && (
                  <div className="step2-filter-badges">
                    <span className="step2-filter-badge step2-custom-badge">
                      {customCount} Custom
                    </span>
                    <span className="step2-filter-badge step2-template-badge">
                      {predefinedCount} Template
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="step2-questions-list">
              {testDetails.questions.map((q, index) => (
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
                            {q.category}
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
                </div>
              ))}
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
      {showModal && (
        <AddQuestionModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSave={handleSaveCustomQuestion}
        />
      )}

      {showPredefinedModal && (
        <PredefinedQuestionsModal
          isOpen={showPredefinedModal}
          onClose={() => setShowPredefinedModal(false)}
          onSelectQuestions={handleSelectPredefinedQuestions}
        />
      )}
    </div>
  );
};

export default Step2Questions;