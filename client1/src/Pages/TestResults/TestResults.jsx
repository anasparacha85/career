import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Clock, Award, BookOpen, Percent, Clock as TimeIcon, User, Play, X, Video, ArrowBigLeft } from 'lucide-react';
import './TestResults.css';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingState from '../../components/States/LoadingState';

const TestResultsPage = () => {
  const params = useParams();
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const navigate=useNavigate()

  const fetchAttempt = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${import.meta.env.VITE_LOCAL_BACKEND_API}/api/admin/attemptByInvite/${params.inviteId}`, {
        method: 'GET',
      });

      const data = await response.json();
      console.log("Fetched results:", data);

      if (response.ok) {
        setResults(data);
      } else {
        setError(data.FailureMessage || 'No attempt found');
      }
    } catch (error) {
      setError(error.message || 'Failed to fetch attempt');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttempt();
  }, []);

  const openVideoModal = () => {
    setIsVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
  };

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeVideoModal();
      }
    };

    if (isVideoModalOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isVideoModalOpen]);
  
  const onBack=()=>{
    navigate('/all-tests')

  }

  if (loading) return <LoadingState text={'Loading test result..'}/>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!results) return null;

  return (
    <div id="results-page-container">
      <div id="results-page-header">
        <div id="results-page-info">
          <h1 id="results-page-title">Test Results: {results.testName}</h1>
          <p id="results-page-description">Detailed performance report for your attempt</p>
        </div>
        <div id="results-page-meta">
          <div id="results-user-email">
            <User size={16} />
            {results.userEmail}
          </div>
          <div id="results-completion-date">
            <Clock size={16} />
            Completed on: {results.completionDate}
          </div>
        </div>
      </div>

      <div id="results-page-content">
        <div id="results-summary-panel">
          <div id={`results-score-card-${results.passed ? 'passed' : 'failed'}`}>
            <div id="results-score-value">{Math.floor(results.score)}%</div>
            <div id="results-score-label">Overall Score</div>
            <div id="results-score-status">
              {results.passed ? (
                <>
                  <CheckCircle size={16} /> Passed
                </>
              ) : (
                <>
                  <XCircle size={16} /> Failed
                </>
              )}
            </div>
            <div id="results-passing-info">
              <Percent size={14} /> Passing Score: {results.passingScore}%
            </div>
          </div>

          <div id="results-stats-grid">
            <div id="results-correct-stat" className="results-stat-card">
              <div className="results-stat-icon">
                <Award size={20} />
              </div>
              <div className="results-stat-value">{results.correctCount}</div>
              <div className="results-stat-label">Correct</div>
            </div>
            <div id="results-incorrect-stat" className="results-stat-card">
              <div className="results-stat-icon">
                <XCircle size={20} />
              </div>
              <div className="results-stat-value">{results.incorrectCount}</div>
              <div className="results-stat-label">Incorrect</div>
            </div>
            <div id="results-total-stat" className="results-stat-card">
              <div className="results-stat-icon">
                <BookOpen size={20} />
              </div>
              <div className="results-stat-value">{results.totalQuestions}</div>
              <div className="results-stat-label">Total Questions</div>
            </div>
            <div id="results-time-stat" className="results-stat-card">
              <div className="results-stat-icon">
                <TimeIcon size={20} />
              </div>
              <div className="results-stat-value">{results.timeTaken}</div>
              <div className="results-stat-label">Time Taken</div>
            </div>
          </div>

          {/* Video Recording Section */}
          {results.videoUrl && (
            <div id="results-video-section">
              <h3 id="results-video-title">Test Recording</h3>
              <button id="results-video-btn" onClick={openVideoModal}>
                <Play size={18} />
                Watch Recording
              </button>
            </div>
          )}
        </div>

        <div id="results-details-panel">
          <h2 id="results-breakdown-title" className="results-section-title">
            <TimeIcon size={20} /> Question Breakdown
          </h2>

          <div id="results-questions-list">
            {results.questionDetails.map((question, index) => (
              <div
                key={index}
                id={`results-question-${index}`}
                className={`results-question ${question.isCorrect ? 'correct' : 'incorrect'}`}
              >
                <div className="results-question-meta">
                  <span className="results-question-number">Q{index + 1}</span>
                  <span className="results-question-status">
                    {question.isCorrect ? (
                      <CheckCircle size={16} color="#10b981" />
                    ) : (
                      <XCircle size={16} color="#ef4444" />
                    )}
                    {question.isCorrect ? 'Correct' : 'Incorrect'}
                  </span>
                </div>
                <div className="results-question-text">{question.questionText}</div>
                <div className="results-answer-comparison">
                  <div className="results-answer-section">
                    <span className="results-answer-label">Candidate answer:</span>
                    <span className={`results-selected-answer ${!question.isCorrect ? 'wrong' : ''}`}>
                      {question.selectedAnswer || <i>Not answered</i>}
                    </span>
                  </div>
                  {!question.isCorrect && (
                    <div className="results-answer-section">
                      <span className="results-answer-label">Correct answer:</span>
                      <span className="results-correct-answer">
                        {question.correctAnswer}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div id="results-actions-panel">
        <button onClick={onBack} id="results-review-btn" className="results-action-btn primary">
          <ArrowBigLeft size={18} /> Go Back
        </button>
      </div>

      {/* Video Modal */}
      {isVideoModalOpen && results.videoUrl && (
        <div id="results-video-modal-overlay" onClick={closeVideoModal}>
          <div id="results-video-modal" onClick={(e) => e.stopPropagation()}>
            <div id="results-video-modal-header">
              <h3 id="results-video-modal-title">
                <Video size={20} />
                Test Recording - {results.testName}
              </h3>
              <button id="results-video-modal-close" onClick={closeVideoModal}>
                <X size={20} />
              </button>
            </div>
            <div id="results-video-modal-content">
              <video 
                id="results-video-player"
                controls
                autoPlay
                src={results.videoUrl}
              >
                Your browser does not support the video tag.
              </video>
            </div>
            <div id="results-video-modal-footer">
              <p id="results-video-modal-info">
                Recording from test attempt completed on {results.completionDate}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestResultsPage;