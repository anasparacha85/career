import './SavingAnswerStateModal.css'

// Professional Answer Saving State
const SavingAnswerStateModal = ({ message,heading}) => {
  return (
    <div className="saving-answer-container">
      <div className="saving-answer-card">
        
        <div className="loader-icon">
          <svg className="spinner" viewBox="0 0 50 50">
            <circle
              className="path"
              cx="25"
              cy="25"
              r="20"
              fill="none"
              strokeWidth="5"
            />
          </svg>
        </div>

        <h1 className="saving-title">{heading}</h1>

        <p className="saving-message">
          {message || "Please wait while we securely save your response and move you to the next question."}
        </p>

        <div className="saving-footer">
          <p>⏳ This may take a few seconds, don’t close this window.</p>
        </div>
      </div>
    </div>
  )
}

export default SavingAnswerStateModal
