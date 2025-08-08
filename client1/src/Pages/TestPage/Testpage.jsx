import React, { useState, useEffect, useRef } from 'react';
import { Maximize, Minimize, Clock } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import './TestPage.css';
import Swal from 'sweetalert2';
import ErrorState from '../../components/States/ErrorState';
import { CandidateStore } from '../../Contexts/CandidateContexts';
import LoadingState from '../../components/States/LoadingState';

const TestPage = () => {
  const { token } = useParams();
  const testContainerRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(1800);
  const [loading, setLoading] = useState(false);
  const [SubmitLoading, setSubmitLoading] = useState(false)
  const [Error, setError] = useState(null);
  const { testData, setTestData, attemptedData, setAttemptedData } = CandidateStore();
  const navigate = useNavigate();
  const {webcamStream,setWebcamStream,recordedChunks,mediaRecorderRef,screenStream,setScreenStream,InvitationStatus,setInvitationStatus}=CandidateStore()
   const fetchInviteStatus=async()=>{
      try {
        const response=await fetch(`${import.meta.env.VITE_LOCAL_BACKEND_API}/invite/getInviteStatus/${token}`,{
          method:'GET'
        })
        const data=await response.json()
        console.log(data);
        if(response.ok){
          setInvitationStatus(data.status)
  
        }
        else{
          setError(data.FailureMessage || 'something went wrong')
        }
        
      } catch (error) {
        setError(error.FailureMessage)
        
        
      }
    }
    useEffect(()=>{
      fetchInviteStatus()
    },[])

useEffect(() => {
  
if(InvitationStatus==='completed'){
  return navigate(`/test-link/${token}`)
}
 
}, [InvitationStatus])

  // Strict fullscreen control
  // const enforceFullscreen = async () => {
  //   try {
  //     if (!document.fullscreenElement) {
  //       await testContainerRef.current?.requestFullscreen?.() || 
  //              testContainerRef.current?.webkitRequestFullscreen?.() || 
  //              testContainerRef.current?.msRequestFullscreen?.();
  //     }
  //     setIsFullscreen(true);
  //   } catch (err) {
  //     console.error('Fullscreen error:', err);
  //   }
  // };

  // Block all exit attempts
  // const blockExitAttempts = () => {
  //   const block = (e) => {
  //     const forbiddenKeys = ['F11', 'Escape'];
  //     const forbiddenCombos =
  //       (e.ctrlKey && ['w', 'n', 't'].includes(e.key.toLowerCase())) ||
  //       (e.altKey && e.key === 'Tab') ||
  //       e.keyCode === 9;

  //     if (forbiddenKeys.includes(e.key) || forbiddenCombos) {
  //       e.preventDefault();
  //       e.stopPropagation();
  //       enforceFullscreen(); // Immediately re-enter
  //     }
  //   };

  //   const blockContextMenu = (e) => e.preventDefault();
  //   const blockDragDrop = (e) => e.preventDefault();

  //   document.addEventListener('keydown', block, true); // useCapture: true
  //   document.addEventListener('contextmenu', blockContextMenu);
  //   document.addEventListener('dragstart', blockDragDrop);
  //   document.addEventListener('drop', blockDragDrop);

  //   return () => {
  //     document.removeEventListener('keydown', block, true);
  //     document.removeEventListener('contextmenu', blockContextMenu);
  //     document.removeEventListener('dragstart', blockDragDrop);
  //     document.removeEventListener('drop', blockDragDrop);
  //   };
  // };

  // Detect tab/window switching
  // const setupTabChangeDetection = () => {
  //   let lastFocusTime = Date.now();
    
  //   const handleVisibilityChange = () => {
  //     if (document.hidden) {
  //       const timeAway = Date.now() - lastFocusTime;
  //       if (timeAway > 1000) { // 1 second threshold
  //         Swal.fire({
  //           title: 'Warning!',
  //           text: 'Switching tabs/windows is not allowed during the test',
  //           icon: 'warning',
  //           confirmButtonText: 'OK'
  //         }).then(() => enforceFullscreen());
  //       }
  //     }
  //     lastFocusTime = Date.now();
  //   };

  //   const handleBlur = () => {
  //     setTimeout(() => {
  //       if (!document.hasFocus()) {
  //         Swal.fire({
  //           title: 'Warning!',
  //           text: 'Please return to the test window',
  //           icon: 'warning',
  //           confirmButtonText: 'OK'
  //         }).then(() => enforceFullscreen());
  //       }
  //     }, 500);
  //   };

  //   document.addEventListener('visibilitychange', handleVisibilityChange);
  //   window.addEventListener('blur', handleBlur);

  //   return () => {
  //     document.removeEventListener('visibilitychange', handleVisibilityChange);
  //     window.removeEventListener('blur', handleBlur);
  //   };
  // };
 const fetchTest = async () => {
      try {
        const res = await fetch(`http://localhost:5000/test/test-link/${token}`);
        if (res.ok) {
          const data = await res.json();
          setTestData(data);
          setTimeRemaining(data.duration * 60);
          // Enforce fullscreen immediately
          // await enforceFullscreen();
        } else {
          setError('Failed to load test');
        }
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch test:', error);
        setLoading(false);
        setError('Failed to fetch test');
      }
    };
  useEffect(() => {
   

    fetchTest();
    // const exitBlocker = blockExitAttempts();
    // const tabChangeMonitor = setupTabChangeDetection();

    // Fullscreen re-enforcement
    // const fullscreenCheck = setInterval(() => {
    //   if (!document.fullscreenElement) {
    //     enforceFullscreen();
    //   }
    // }, 1000);

    return () => {
      // exitBlocker();
      // tabChangeMonitor();
      // clearInterval(fullscreenCheck);
    };
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
   const handlePopState = (e) => {
    e.preventDefault();
    window.history.pushState(null, null, window.location.pathname);
    Swal.fire({
      title: "Action Blocked!",
      text: "You cannot go back during the test.",
      icon: "warning",
      confirmButtonText: "OK"
    });
  };

  window.history.pushState(null, null, window.location.pathname); // Push initial state
  window.addEventListener('popstate', handlePopState);

  return () => {
    clearInterval(timer);
    window.removeEventListener('popstate', handlePopState);
  };
  }, []);

  // useEffect(() => {
  //   const handleEscKey = (event) => {
  //     if (event.key === 'Escape' && isFullscreen) {
  //       setIsFullscreen(false);
  //     }
  //   };
  //   document.addEventListener('keydown', handleEscKey);
  //   return () => document.removeEventListener('keydown', handleEscKey);
  // }, [isFullscreen]);

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
     setSubmitLoading(true)
  try {
   
    // Stop recording if it's active
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      // Create a promise that resolves when recording stops
      const stopPromise = new Promise((resolve) => {
        mediaRecorderRef.current.onstop = resolve;
      });
      
      mediaRecorderRef.current.stop();
      
      await stopPromise; // Wait for recording to actually stop
    }
   

    // Combine video chunks
    const blob = new Blob(recordedChunks.current, { type: 'video/webm' });

    // Create FormData
    const formData = new FormData();
    formData.append('video', blob, 'recording.webm');
    formData.append('token', token);
    formData.append('answers', JSON.stringify(answers));

    // Log FormData contents for debugging
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    // Send to backend
    const response = await fetch(`${import.meta.env.VITE_LOCAL_BACKEND_API}/invite/submitTest`, {
      method: 'POST',
      body: formData,
      // Don't set Content-Type header manually - let the browser set it with the correct boundary
    });

    // if (!response.ok) {
    //   throw new Error(`HTTP error! status: ${response.status}`);
    // }

    const data = await response.json();
    console.log('Response:', data);

    if (data.SuccessMessage) {
      Swal.fire({
        title: 'Success!',
        text: data.SuccessMessage,
        icon: 'success'
      });
      setAttemptedData(data);
       if (webcamStream) {
      webcamStream.getTracks().forEach(track => track.stop());
    }
    if (screenStream) {
      screenStream.getTracks().forEach(track => track.stop());
    }
      navigate('/test-completed-status');
    } else {
      Swal.fire({
        title: 'Error!',
        text: data.FailureMessage || 'Test submission failed',
        icon: 'error'
      });
    }
  } catch (error) {
    console.error('Submission error:', error);
    Swal.fire({
      title: 'Error!',
      text: 'Something went wrong during submission',
      icon: 'error'
    });
  }
  finally{
    setSubmitLoading(false)
  }
};

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const getAnsweredQuestions = () => Object.keys(answers).length;

  if (loading) return <div className="loading"><LoadingState text={'Loading Test..'}/></div>;
  if (Error ) return <ErrorState error={Error} onRetry={()=>fetchTest()} />;
 if(!testData) return <div className=''>not found</div>
  

  const currentQuestion = testData.questions[currentQuestionIndex];
  const totalQuestions = testData.questions.length;

  return (
    <div
  ref={testContainerRef}
  className={`test-container ${isFullscreen ? 'fullscreen' : 'windowed'}`}
>

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
                 {SubmitLoading?'loading...':'Submit Test'} 
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
