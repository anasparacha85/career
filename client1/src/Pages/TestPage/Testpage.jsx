import React, { useState, useEffect } from 'react';
import { Maximize, Minimize, Clock } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import './TestPage.css';
import Swal from 'sweetalert2';
import ErrorState from '../../components/States/ErrorState';
import { CandidateStore } from '../../Contexts/CandidateContexts';

const TestPage = () => {
  const { token } = useParams(); // Get test ID from URL

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(1800); // default 30 mins
  const [loading, setLoading] = useState(true);
  const [Error, setError] = useState(null)
  const {testData,setTestData,attemptedData,setAttemptedData}=CandidateStore()
  const navigate=useNavigate()

  // Fetch test data from backend
  useEffect(() => {
    const fetchTest = async () => {
      try {
        const res = await fetch(`http://localhost:5000/test/test-link/${token}`);

        if (res.ok) {
          const data = await res.json();
          setTestData(data);
          setTimeRemaining(data.duration * 60); // Move inside
          console.log(data);
          
        } else {
          setError('Failed to load test');
        }
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch test:', error);
        setLoading(false);
        setError('Failed to fetch test:')
      }
    };

    fetchTest();
  }, [token]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [isFullscreen]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  // change the answers
  const handleAnswerChange = (value) => {
    const question = testData.questions[currentQuestionIndex];
    setAnswers(prev => ({
      ...prev,
      [question._id]: value
    }));
  };
  //jump to next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < testData.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };
  //jump jo previous question
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };
  // go to respective question
  const handleQuestionJump = (index) => {
    setCurrentQuestionIndex(index);
  };
  // submitting the test
  const handleSubmitTest = async () => {

    try {
      const response = await fetch(`${import.meta.env.VITE_LOCAL_BACKEND_API}/invite/submitTest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: token, answers: answers })
      })
      const data = await response.json()
      if (data.SuccessMessage) {
        Swal.fire(data.SuccessMessage, 'success')
        console.log(data);
        setAttemptedData(data)
        navigate('/result')
        

      }
      else {
        Swal.fire(data.FailureMessage, 'error')
      }


    } catch (error) {
      Swal.fire(e.FailureMessage, 'error')


    }



  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const getAnsweredQuestions = () => Object.keys(answers).length;

  if (loading) return <div className="loading">Loading test...</div>;
  if (Error ) return <ErrorState error={Error} />;
 if(!testData) return <div className=''>not found</div>
  

  const currentQuestion = testData.questions[currentQuestionIndex];
  const totalQuestions = testData.questions.length;

  return (
    <div className={`test-container ${isFullscreen ? 'fullscreen' : 'windowed'}`}>
      <div className="test-header">
        <div className="test-info">
          <h1>{testData.name}</h1>
          <p>{testData.description}</p>
        </div>
        <div className="test-controls">
          <div className={`timer ${timeRemaining < 300 ? 'warning' : ''}`}>
            <Clock size={16} />
            {formatTime(timeRemaining)}
          </div>
          <button className="fullscreen-btn" onClick={toggleFullscreen}>
            {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </button>
        </div>
      </div>

      <div className="test-content">
        <div className="question-sidebar">
          <h3 className="sidebar-title">Questions</h3>
          <div className="question-grid">
            {testData.questions.map((_, index) => (
              <div
                key={index}
                className={`question-number ${index === currentQuestionIndex
                    ? 'current'
                    : answers[testData.questions[index]._id]
                      ? 'answered'
                      : ''
                  }`}
                onClick={() => handleQuestionJump(index)}
              >
                {index + 1}
              </div>
            ))}
          </div>
          <div className="progress-info">
            <div>Progress: {getAnsweredQuestions()}/{totalQuestions}</div>
            <div>Remaining: {totalQuestions - getAnsweredQuestions()}</div>
          </div>
        </div>

        <div className="question-main">
          <div className="question-header-main">
            <div className="question-counter">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </div>
            <h2 className="question-text">{currentQuestion.question}</h2>
          </div>

          <div className="answer-section">
            {currentQuestion.options.map((option, index) => (
              <div
                key={index}
                className={`option-item ${answers[currentQuestion._id] === option ? 'selected' : ''
                  }`}
                onClick={() => handleAnswerChange(option)}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestion._id}`}
                  value={option}
                  checked={answers[currentQuestion._id] === option}
                  onChange={() => handleAnswerChange(option)}
                  className="option-radio"
                />
                <span className="option-text">{option}</span>
              </div>
            ))}
          </div>

          <div className="navigation-buttons">
            <button
              className="nav-btn secondary"
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </button>

            <div style={{ display: 'flex', gap: '12px' }}>
              {currentQuestionIndex === totalQuestions - 1 ? (
                <button className="submit-btn" onClick={handleSubmitTest}>
                  Submit Test
                </button>
              ) : (
                <button className="nav-btn" onClick={handleNextQuestion}>
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
