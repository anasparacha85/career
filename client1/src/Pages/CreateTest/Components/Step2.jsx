import React, { useState } from 'react';
import './Step2.css';
import AddQuestionModal from '../../../components/Modal/AddQuestionModal';
import { CandidateStore } from '../../../Contexts/CandidateContexts';
import { ChevronLeft, Plus, Save } from 'lucide-react';
import './Buttons.css'

const Step2Questions = ({ testDetails, setTestDetails, prevStep, nextStep }) => {
  const [showModal, setShowModal] = useState(false);
  const [Error, setError] = useState(null)
  const {TestLink, setTestLink} = CandidateStore()

  const handleAddQuestion = () => setShowModal(true);

  const handleSaveQuestion = (newQuestion) => {
    setTestDetails({
      ...testDetails,
      questions: [...testDetails.questions, newQuestion],
    });
  };

  const handleFinalSave = async() => {
    console.log("Final Test Data:", testDetails);
    try {
      const response = await fetch(`${import.meta.env.VITE_LOCAL_BACKEND_API}/test/createTest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(testDetails)
      })
      if(response.ok) {
        const data = await response.json()
        setTestLink(data.testLink)
        alert(data.SuccessMessage)
        nextStep()
      }
      else {
        setError("Failed to save test")
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="step2-form">
      <h2 id="step2-section-title">Test Questions</h2>
      
      <button id="add-question-btn" onClick={handleAddQuestion}>
        <Plus size={18} /> Add Question
      </button>

      <div id="questions-list-container">
        {testDetails.questions.length === 0 ? (
          <div id="empty-questions-state">
            <p>No questions added yet. Click the button above to add your first question.</p>
          </div>
        ) : (
          testDetails.questions.map((q, index) => (
            <div key={index} id={`question-card-${index}`} className="question-card">
              <h4>Q{index + 1}: {q.question}</h4>
              <ul>
                {q.options.map((opt, i) => (
                  <li key={i} className={opt === q.correct ? 'correct' : ''}>
                    {opt}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>

      <div id="step2-button-row">
        <button className="nav-btn secondary" onClick={prevStep}>
          <ChevronLeft size={18} /> Back
        </button>
        <button className="submit-btn" onClick={handleFinalSave}>
          Save Test <Save size={18} />
        </button>
      </div>

      {showModal && (
        <AddQuestionModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSave={handleSaveQuestion}
        />
      )}
    </div>
  );
};

export default Step2Questions;