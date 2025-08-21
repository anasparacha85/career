import React, { useState, useEffect, useRef } from 'react';
import { Maximize, Minimize, Clock, Download, Upload, FileText, Timer } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import './TestPage.css';
import Swal from 'sweetalert2';
import ErrorState from '../../components/States/ErrorState';
import { CandidateStore } from '../../Contexts/CandidateContexts';
import LoadingState from '../../components/States/LoadingState';
import SubmitComponent from './SubmitComponent';
import NextButtonModal from '../../components/Modal/SavingAnswerStateModal';
import SavingAnswerStateModal from '../../components/Modal/SavingAnswerStateModal';
import MessageData from '../../CustomData/Messages/MessageData';


const TestPage = () => {
  const { token } = useParams();
  const testContainerRef = useRef(null);
  const fileInputRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(1800);
  const [loading, setLoading] = useState(false);
  const [SubmitLoading, setSubmitLoading] = useState(false);
  const [Error, setError] = useState(null);
  const [currentPart, setCurrentPart] = useState('');
  const [showSubmit, setShowSubmit] = useState(false)
  const [showPartTransition, setShowPartTransition] = useState(false);
  const { testData, setTestData, attemptedData, setAttemptedData } = CandidateStore();
  const [NextLoading, setNextLoading] = useState()
  const [TimerPaused, setTimerPaused] = useState(false)
  const timerRef=useRef()
  const navigate = useNavigate();
  const [count, setcount] = useState(0);
  const {webcamStream,setWebcamStream,recordedChunks,mediaRecorderRef,screenStream,setScreenStream,InvitationStatus,setInvitationStatus}=CandidateStore();

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

  const fetchTest = async () => {
    try {
      const res = await fetch(`http://localhost:5000/test/test-link/${token}`);
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setTestData(data);
        setTimeRemaining(data.duration * 60);
        
        // Set initial part
        if (data.questions && data.questions.length > 0) {
          setCurrentPart(data.questions[0].part);
        }
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
  }, [token]);

  useEffect(() => {
    if(TimerPaused) return;

  timerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 0) {
          clearInterval(timerRef.current);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
     
    }, 1000);

    

    return () => {
      clearInterval(timerRef.current);
   
    };
  }, [TimerPaused]);
  useEffect(() => {
  const handleBeforeUnload = (e) => {
    e.preventDefault();
    localStorage.setItem(`autoSubmit${token}`, "true");

    e.returnValue = "Are you sure you want to reload? Your test will be submitted."; 
    return "Are you sure you want to reload? Your test will be submitted.";
  };
  


  window.addEventListener("beforeunload", handleBeforeUnload);

  return () => {
    window.removeEventListener("beforeunload", handleBeforeUnload);
  };
}, []);
useEffect(() => {
  if (localStorage.getItem(`autoSubmit${token}`) === "true") {
     handleSubmitTest(); // auto submit
    localStorage.removeItem(`autoSubmit${token}`);
   
  }
}, []);
  


  //disable back button
  useEffect(()=>{
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

    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener('popstate', handlePopState);
     return () => {
    
      window.removeEventListener('popstate', handlePopState);
    };
  },[])

  // Check for part transitions
  useEffect(() => {
    if (testData && testData.questions) {
      const newPart = testData.questions[currentQuestionIndex]?.part;
      if (newPart && newPart !== currentPart) {
        setShowPartTransition(true);
        setCurrentPart(newPart);
      }
    }
  }, [currentQuestionIndex, testData, currentPart]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (value) => {
    const question = testData.questions[currentQuestionIndex];
    setAnswers(prev => ({
      ...prev,
      [question._id]: value
    }));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const question = testData.questions[currentQuestionIndex];
      setUploadedFiles(prev => ({
        ...prev,
        [question._id]: file
      }));
      
      // Also add to answers for tracking
      setAnswers(prev => ({
        ...prev,
        [question._id]: file.name
      }));
    }
  };

  const downloadQuestionFile = () => {
    const question = testData.questions[currentQuestionIndex];
    if (question.questionFile && question.questionFile !== 'question') {
      // Create download link
      const link = document.createElement('a');
      link.href = question.questionFile;
      link.download = `question_${currentQuestionIndex + 1}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  //Save the answer one by one
  // helper function: har question ke liye naya recorder start karo
const startNewRecorder = () => {
  if (!webcamStream || !screenStream) return;

  const canvas = document.createElement("canvas");
  canvas.width = 1280;
  canvas.height = 720;
  const ctx = canvas.getContext("2d");

  const webcamVideo = document.createElement("video");
  webcamVideo.srcObject = webcamStream;
  webcamVideo.play();

  const screenVideo = document.createElement("video");
  screenVideo.srcObject = screenStream;
  screenVideo.play();

  const drawFrame = () => {
    ctx.drawImage(screenVideo, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(webcamVideo, canvas.width - 320, canvas.height - 240, 320, 240);
    requestAnimationFrame(drawFrame);
  };
  drawFrame();

  const combinedStream = canvas.captureStream(30);
  const audioTracks = [...webcamStream.getAudioTracks(), ...screenStream.getAudioTracks()];
  audioTracks.forEach(track => combinedStream.addTrack(track));

  const recorder = new MediaRecorder(combinedStream, { mimeType: "video/webm" });
  recordedChunks.current = [];
  recorder.ondataavailable = (event) => {
    if (event.data.size > 0) {
      recordedChunks.current.push(event.data);
    }
  };

  recorder.start();
  mediaRecorderRef.current = recorder;
};

// saveCurrentAnswer update
const saveCurrentAnswer = async () => {
  setTimerPaused(true)
  setNextLoading(true)
  
  const question = testData.questions[currentQuestionIndex];
  const formData = new FormData();
  formData.append("token", token);
  formData.append("questionId", question._id);
  formData.append("answer", answers[question._id] || "");

  if (uploadedFiles[question._id]) {
    formData.append("file", uploadedFiles[question._id]);
  }

  // recorder stop + blob send
  if (mediaRecorderRef.current) {
    const stopPromise = new Promise(resolve => {
      mediaRecorderRef.current.onstop = resolve;
    });
    mediaRecorderRef.current.stop();
    await stopPromise;

    if (recordedChunks.current.length > 0) {
      const blob = new Blob(recordedChunks.current, { type: "video/webm" });
      formData.append("video", blob, `q_${question._id}.webm`);
      recordedChunks.current = [];
    }
  }

  try {
    const res = await fetch(`${import.meta.env.VITE_LOCAL_BACKEND_API}/invite/saveQuestion`, {
      method: "POST",
      body: formData,
    });
    const result = await res.json();
    console.log(result);

    // ✅ naya recorder start karo next question ke liye
    startNewRecorder();
  } catch (error) {
    console.error("Error saving question:", error);
  }
  finally{
    setTimerPaused(false)
    setNextLoading(false)
  }
};


  const handleNextQuestion = async() => {
   await saveCurrentAnswer();
  if (currentQuestionIndex < testData.questions.length - 1) {
    setCurrentQuestionIndex(prev => prev + 1);
  }
  if(currentQuestionIndex===testData.questions.length-1){
    setShowSubmit(true)
  }
  };
 const handleBacktoReview=()=>{
  setShowSubmit(false)
  setCurrentQuestionIndex(testData.questions.length-1)
 }
  const handlePreviousQuestion =async () => {
  await saveCurrentAnswer();
  if (currentQuestionIndex > 0) {
    setCurrentQuestionIndex(prev => prev - 1);
  }
  };

  const handleQuestionJump = (index) => {
    setCurrentQuestionIndex(index);
  };

  const handlePartTransitionContinue = () => {
    setShowPartTransition(false);
  };


  const handleSubmitTest = async () => {
  setSubmitLoading(true);

  try {
    // recording band karo
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      const stopPromise = new Promise(resolve => {
        mediaRecorderRef.current.onstop = resolve;
      });
      mediaRecorderRef.current.stop();
      await stopPromise;
    }

    // final merge trigger
    const res = await fetch(`${import.meta.env.VITE_LOCAL_BACKEND_API}/invite/submitTestFinal`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });

    const data = await res.json();
    if (data.SuccessMessage) {
        if (webcamStream) {
          webcamStream.getTracks().forEach(track => track.stop());
        }
        if (screenStream) {
          screenStream.getTracks().forEach(track => track.stop());
        }
      Swal.fire("Success!", data.SuccessMessage, "success");

      navigate("/test-completed-status");
    } else {
      Swal.fire("Error!", data.FailureMessage || "Submission failed", "error");
    }
  } catch (error) {
    Swal.fire("Error!", "Something went wrong", "error");
  } finally {
    setSubmitLoading(false);
  }
};


  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const getAnsweredQuestions = () => Object.keys(answers).length;

  const getPartDescription = (part) => {
    if (part.toLowerCase().includes('mcq')) {
      return "You are now entering the Multiple Choice Questions (MCQs) section. Please select the best answer for each question.";
    } else if (part.toLowerCase().includes('practical')) {
      return "You are now entering the Practical section. You will need to download question files, complete tasks, and upload your solution files.";
    }
    return `You are now entering: ${part}`;
  };

  if (loading) return <div className="loading"><LoadingState text={'Loading Test..'}/></div>;
  if (Error) return <ErrorState error={Error} onRetry={()=>fetchTest()} />;
  if (!testData) return <div className=''>not found</div>;

  const currentQuestion = testData.questions[currentQuestionIndex];
  const totalQuestions = testData.questions.length;

  // Show part transition modal
  if (showPartTransition) {
    return (
      <div className="test-container">
        <div className="part-transition-overlay">
          <div className="part-transition-modal">
            <h2>Section Transition</h2>
            <p>{getPartDescription(currentPart)}</p>
            <button 
              className="nav-btn" 
              onClick={handlePartTransitionContinue}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
   {NextLoading && (
  <SavingAnswerStateModal 
    heading={
      currentQuestion.type === "mcq" || currentQuestion.type === "image"
        ? MessageData.mcqImageHeadings[Math.floor(Math.random() * MessageData.mcqImageHeadings.length)]
        : MessageData.otherHeadings[Math.floor(Math.random() * MessageData.otherHeadings.length)]
    }
    message={
      currentQuestion.type === "mcq" || currentQuestion.type === "image"
        ? MessageData.mcqImageMessages[Math.floor(Math.random() * MessageData.mcqImageMessages.length)]
        : MessageData.otherMessages[Math.floor(Math.random() * MessageData.otherMessages.length)]
    }
  />
)}
    {showSubmit ? (
        <SubmitComponent 
          onsubmit={handleSubmitTest} 
          onBack={handleBacktoReview}
        />
        ):
        (
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
            <div className="part-indicator">
              {currentQuestion.part}
            </div>
            <h2 className="question-text">{currentQuestion.question}</h2>
          </div>

          <div className="answer-section">
            {/* MCQ Questions */}
            {currentQuestion.type === 'mcq' && (
              <div className="mcq-section">

                {currentQuestion.options.map((option, index) => (
                  
                  <div
                    key={index}
                    className={`option-item ${answers[currentQuestion._id] === option ? 'selected' : ''}`}
                    onClick={() => handleAnswerChange(option)}
                  >
                    <label style={{color:'GrayText' }}>{index+1==1?'A':index+1==2?'B':index+1==3?'C':index+1==4&&'D'}{")"}</label>

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
            )}

            {/* Image Questions */}
            {currentQuestion.type === 'image' && (
              <div className="image-section">
                <div className="question-image-container">
                  <img 
                    src={currentQuestion.image} 
                    alt="Question Image" 
                    className="question-image"
                  />
                </div>
                <div className="image-options">
                  {currentQuestion.options.map((option, index) => (
                    <div
                      key={index}
                      className={`option-item ${answers[currentQuestion._id] === option ? 'selected' : ''}`}
                      onClick={() => handleAnswerChange(option)}
                    >
                    <label style={{color:'GrayText' }}>{index+1==1?'A':index+1==2?'B':index+1==3?'C':index+1==4&&'D'}{")"}</label>

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
              </div>
            )}

            {/* File/Input Questions (Practical) */}
            {(currentQuestion.type === 'file' || currentQuestion.type === 'input') && (
              <div className="practical-section">
                {currentQuestion.questionFile && currentQuestion.questionFile !== 'question' && (
                  <div className="file-download-section">
                    <p className="download-instruction">
                      Download the file below to see the full question details:
                    </p>
                    <button 
                      className="download-btn"
                      onClick={downloadQuestionFile}
                    >
                      <Download size={16} />
                      Download Question File
                    </button>
                  </div>
                )}
                
                <div className="file-upload-section">
                  <p className="upload-instruction">
                    Upload your solution file:
                  </p>
                  <div className="upload-container">
                    <input
                      ref={fileInputRef}
                      type="file"
                      onChange={handleFileUpload}
                      className="file-input"
                      accept=".rvt,.dwg,.pdf,.doc,.docx"
                    />
                    <button 
                      className="upload-btn"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload size={16} />
                      {uploadedFiles[currentQuestion._id] ? 'Change File' : 'Upload Solution'}
                    </button>
                  </div>
                  {uploadedFiles[currentQuestion._id] && (
                    <div className="uploaded-file-info">
                      <FileText size={16} />
                      <span>Uploaded: {uploadedFiles[currentQuestion._id].name}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
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
             
                <button disabled={NextLoading} className="nav-btn" onClick={handleNextQuestion}>
               {NextLoading?"Your answer is saving...":"Save and Next"}  
                </button>
             
            </div>
          </div>
        </div>
      </div>
    </div>
        )}
        
    </>
  );
};

export default TestPage;