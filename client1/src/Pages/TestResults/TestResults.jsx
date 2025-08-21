import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Clock, Award, BookOpen, Percent, User, Play, X, Video, ArrowBigLeft, FileText, Download, ChevronDown, ChevronRight } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import './TestResults.css'

const TestResultsPage = () => {
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isMainVideoModalOpen, setIsMainVideoModalOpen] = useState(false);
  const [isQuestionVideoModalOpen, setIsQuestionVideoModalOpen] = useState(false);
  const [selectedQuestionVideo, setSelectedQuestionVideo] = useState(null);
  const [expandedQuestions, setExpandedQuestions] = useState(new Set());
  const navigate = useNavigate();
  const params=useParams()

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

const toggleQuestionExpanded = (index) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedQuestions(newExpanded);
  };

  const openMainVideoModal = () => {
    setIsMainVideoModalOpen(true);
  };

  const closeMainVideoModal = () => {
    setIsMainVideoModalOpen(false);
  };

  const openQuestionVideoModal = (question, index) => {
    setSelectedQuestionVideo({ ...question, index: index + 1 });
    setIsQuestionVideoModalOpen(true);
  };

  const closeQuestionVideoModal = () => {
    setIsQuestionVideoModalOpen(false);
    setSelectedQuestionVideo(null);
  };

  // Close modals on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeMainVideoModal();
        closeQuestionVideoModal();
      }
    };

    if (isMainVideoModalOpen || isQuestionVideoModalOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isMainVideoModalOpen, isQuestionVideoModalOpen]);

  const onBack = () => {
     navigate('/');
    console.log('Navigate back');
  };

  const getQuestionStatusColor = (question) => {
    if (question.isCorrect === true) return 'correct';
    if (question.isCorrect === false) return 'incorrect';
    return 'pending';
  };

  const getQuestionStatusText = (question) => {
    if (question.isCorrect === true) return 'Correct';
    if (question.isCorrect === false) return 'Incorrect';
    return 'To be evaluated';
  };

  const getQuestionStatusIcon = (question) => {
    if (question.isCorrect === true) return <CheckCircle size={16} className="status-icon-correct" />;
    if (question.isCorrect === false) return <XCircle size={16} className="status-icon-incorrect" />;
    return <Clock size={16} className="status-icon-pending" />;
  };

  const renderQuestionContent = (question, index) => {
    switch (question.questionType) {
      case 'mcq':
        return (
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
        );

      case 'image':
        return (
          <div className="results-image-question">
            {question.questionImage && question.questionImage !== 'no file' && question.questionImage !== 'question' && (
              <div className="results-question-image">
                <img src={question.questionImage} alt="Question" className="question-image" />
              </div>
            )}
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
        );

      case 'input':
      case 'file':
        return (
          <div className="results-file-question">
            {question.questionFile && question.questionFile !== 'no file' && question.questionFile !== 'question' && (
              <div className="results-file-section">
                <span className="results-file-label">
                  <FileText size={16} />
                  Question file:
                </span>
                <a href={question.questionFile} target="_blank" rel="noopener noreferrer" className="results-file-link">
                  <Download size={14} />
                  View Question File
                </a>
              </div>
            )}
            
            {question.referenceFile && question.referenceFile !== 'no file' && question.referenceFile !== 'none' && (
              <div className="results-file-section">
                <span className="results-file-label">
                  <FileText size={16} />
                  Reference file:
                </span>
                <a href={question.referenceFile} target="_blank" rel="noopener noreferrer" className="results-file-link">
                  <Download size={14} />
                  View Reference File
                </a>
              </div>
            )}
            
            {question.AnswerFileUrl && (
              <div className="results-file-section">
                <span className="results-file-label">
                  <FileText size={16} />
                  Candidate answer file:
                </span>
                <a href={question.AnswerFileUrl} target="_blank" rel="noopener noreferrer" className="results-file-link candidate-file">
                  <Download size={14} />
                  View Submitted File
                </a>
              </div>
            )}
            
            {question.selectedAnswer && (
              <div className="results-answer-comparison">
                <div className="results-answer-section">
                  <span className="results-answer-label">Candidate answer:</span>
                  <span className="results-selected-answer">
                    {question.selectedAnswer}
                  </span>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  if (loading) return <div className="loading-state">Loading test result...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!results) return null;

  return (
    <div className="results-page-container">
      <div className="results-page-header">
        <div className="results-page-info">
          <h1 className="results-page-title">Test Results: {results.testName}</h1>
          <p className="results-page-description">Detailed performance report for your attempt</p>
        </div>
        <div className="results-page-meta">
          <div className="results-user-email">
            <User size={16} />
            {results.userEmail}
          </div>
          <div className="results-completion-date">
            <Clock size={16} />
            Completed on: {results.completionDate}
          </div>
        </div>
      </div>

      <div className="results-page-content">
        <div className="results-summary-panel">
          <div className={`results-score-card ${results.passed ? 'passed' : 'failed'}`}>
            <div className="results-score-value">{Math.floor(results.score)}%</div>
            <div className="results-score-label">Overall Score</div>
            <div className="results-score-status">
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
            <div className="results-passing-info">
              <Percent size={14} /> Passing Score: {results.passingScore}%
            </div>
          </div>

          <div className="results-stats-grid">
            <div className="results-stat-card">
              <div className="results-stat-icon">
                <Award size={20} />
              </div>
              <div className="results-stat-value">{results.correctCount}</div>
              <div className="results-stat-label">Correct</div>
            </div>
            <div className="results-stat-card">
              <div className="results-stat-icon">
                <XCircle size={20} />
              </div>
              <div className="results-stat-value">{results.incorrectCount}</div>
              <div className="results-stat-label">Incorrect</div>
            </div>
            <div className="results-stat-card">
              <div className="results-stat-icon">
                <BookOpen size={20} />
              </div>
              <div className="results-stat-value">{results.totalQuestions}</div>
              <div className="results-stat-label">Solved Questions</div>
            </div>
            <div className="results-stat-card">
              <div className="results-stat-icon">
                <Clock size={20} />
              </div>
              <div className="results-stat-value">{results.timeTaken}</div>
              <div className="results-stat-label">Time Taken</div>
            </div>
          </div>

          {/* Full Test Video Recording Section */}
          {results.videoUrl && (
            <div className="results-video-section">
              <h3 className="results-video-title">Full Test Recording</h3>
              <button className="results-main-video-btn" onClick={openMainVideoModal}>
                <Play size={18} />
                Watch Full Recording
              </button>
            </div>
          )}
        </div>

        <div className="results-details-panel">
          <h2 className="results-breakdown-title">
            <Clock size={20} /> Question Breakdown
          </h2>

          <div className="results-questions-list">
            {results.questionDetails.map((question, index) => (
              <div
                key={index}
                className={`results-question ${getQuestionStatusColor(question)}`}
              >
                <div 
                  className="results-question-header"
                  onClick={() => toggleQuestionExpanded(index)}
                >
                  <div className="results-question-header-left">
                    <span className="results-question-number">Q{index + 1}</span>
                    <span className="results-question-status">
                      {getQuestionStatusIcon(question)}
                      {getQuestionStatusText(question)}
                    </span>
                  </div>
                  <div className="results-question-header-right">
                    {question.AnswerVideoUrl && (
                      <button
                        className="results-question-video-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          openQuestionVideoModal(question, index);
                        }}
                      >
                        <Video size={12} />
                        View Video
                      </button>
                    )}
                    <button className="results-question-toggle-btn">
                      {expandedQuestions.has(index) ? (
                        <ChevronDown size={18} />
                      ) : (
                        <ChevronRight size={18} />
                      )}
                    </button>
                  </div>
                </div>
                
                <div className="results-question-text-preview">
                  {question.questionText}
                </div>
                
                {expandedQuestions.has(index) && (
                  <div className="results-question-content">
                    {renderQuestionContent(question, index)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="results-actions-panel">
        <button onClick={onBack} className="results-review-btn">
          <ArrowBigLeft size={18} /> Go Back
        </button>
      </div>

      {/* Main Video Modal */}
      {isMainVideoModalOpen && results.videoUrl && (
        <div className="results-video-modal-overlay" onClick={closeMainVideoModal}>
          <div className="results-video-modal" onClick={(e) => e.stopPropagation()}>
            <div className="results-video-modal-header">
              <h3 className="results-video-modal-title">
                <Video size={20} />
                Full Test Recording - {results.testName}
              </h3>
              <button className="results-video-modal-close" onClick={closeMainVideoModal}>
                <X size={20} />
              </button>
            </div>
            <div className="results-video-modal-content">
              <video 
                className="results-video-player"
                controls
                autoPlay
                src={results.videoUrl}
              >
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="results-video-modal-footer">
              <p className="results-video-modal-info">
                Full recording from test attempt completed on {results.completionDate}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Question Video Modal */}
      {isQuestionVideoModalOpen && selectedQuestionVideo && (
        <div className="results-video-modal-overlay" onClick={closeQuestionVideoModal}>
          <div className="results-video-modal" onClick={(e) => e.stopPropagation()}>
            <div className="results-video-modal-header">
              <h3 className="results-video-modal-title">
                <Video size={20} />
                Question {selectedQuestionVideo.index} Recording
              </h3>
              <button className="results-video-modal-close" onClick={closeQuestionVideoModal}>
                <X size={20} />
              </button>
            </div>
            <div className="results-video-modal-content">
              <video 
                className="results-video-player"
                controls
                autoPlay
                src={selectedQuestionVideo.AnswerVideoUrl}
              >
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="results-video-modal-footer">
              <p className="results-video-modal-info">
                Recording for Question {selectedQuestionVideo.index}: {selectedQuestionVideo.questionText}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestResultsPage;