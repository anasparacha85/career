import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './CountDown.css';
import TestPage from '../TestPage/Testpage';
import ConsentModal from '../../components/Modal/ConsentModal';
import { CandidateStore } from '../../Contexts/CandidateContexts';
import TestCompletedState from '../../components/States/TestCompletedState';

const StartTestPage = () => {
  const [countdown, setCountdown] = useState(null);
  const [showCountdown, setShowCountdown] = useState(false);
  const [testStarted, setTestStarted] = useState(false);
  const { token } = useParams();
  const containerRef = useRef();
  const [ConsentGiven, setConsentGiven] = useState(false)
  const webcamRef = useRef(null);
const screenRef = useRef(null);
const navigate=useNavigate()
const [Error, setError] = useState(null)

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

  // Automatically re-enter fullscreen if exited
  // useEffect(() => {
  //   const handleFullscreenChange = async () => {
  //     if (testStarted && !document.fullscreenElement) {
  //       try {
  //         await containerRef.current?.requestFullscreen?.();
  //       } catch (err) {
  //         console.error('Re-enter fullscreen error:', err);
  //       }
  //     }
  //   };

  //   document.addEventListener('fullscreenchange', handleFullscreenChange);
  //   return () => {
  //     document.removeEventListener('fullscreenchange', handleFullscreenChange);
  //   };
  // }, [testStarted]);

  const startCountdown = () => {
    setShowCountdown(true);
    let counter = 3;
    setCountdown(counter);

    const interval = setInterval(() => {
      counter--;
      if (counter === 0) {
        clearInterval(interval);
        startTest();
      } else {
        setCountdown(counter);
      }
    }, 1000);
  };
   useEffect(() => {
  if (ConsentGiven) {
    // Request webcam and screen only ONCE here
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setWebcamStream(stream);
      })
      .catch((err) => {
        console.error('Webcam access error:', err);
      });

    navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
      .then((stream) => {
        setScreenStream(stream);
      })
      .catch((err) => {
        console.error('Screen sharing error:', err);
      });
  }
}, [ConsentGiven]);
const startTest = async () => {
  try {
    if (!webcamStream || !screenStream) {
      console.error('Media streams not available');
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = 1280;
    canvas.height = 720;
    const ctx = canvas.getContext('2d');

    const webcamVideo = document.createElement('video');
    webcamVideo.srcObject = webcamStream;
    webcamVideo.play();

    const screenVideo = document.createElement('video');
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

    const recorder = new MediaRecorder(combinedStream, { mimeType: 'video/webm' });
    mediaRecorderRef.current = recorder;

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunks.current.push(event.data);
      }
    };

    recorder.start();

    // Enter fullscreen
    // if (!document.fullscreenElement) {
    //   await containerRef.current?.requestFullscreen?.();
    // }
 
    setTestStarted(true);
    navigate(`/start-test/${token}`)
  
    
  } catch (err) {
    console.error('Recording Setup Error:', err);
  }
};

const handleNavigate=()=>{
  navigate('/')
}

if (InvitationStatus === 'completed') {
    return <TestCompletedState onBack={handleNavigate} />;
  }

  // Show error state if there's an error
  if (Error) {
    return (
      <div className="start-page-container" ref={containerRef}>
        <div className="start-card">
          <h1 className="start-title" style={{ color: '#ef4444' }}>Error</h1>
          <p className="start-desc">{Error}</p>
          <button className="start-btn" onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="start-page-container" ref={containerRef}>
      {InvitationStatus==='pending' && !ConsentGiven ? (
        <ConsentModal onAccept={() => setConsentGiven(true)} />
      ) :
        !testStarted && (
          !showCountdown ? (
            <div className="start-card">
              <h1 className="start-title">Ready to Begin Your Test?</h1>
                <p className="start-desc">During the test please make sure that you do not close the tab and <br/>  must not reload the window other wise you test will be AutoSubmitted</p>

              <p className="start-desc">Please make sure you are in a quiet place with no distractions.</p>
                  
              <button className="start-btn" onClick={startCountdown}>
                Start Test
              </button>
            </div>
          ) : (
            <div className="countdown-display">
              <h2 className="countdown-number">{countdown}</h2>
              <p className="countdown-text">Get Ready...</p>
            </div>
          )
        )
      }
    </div>
  );
};

export default StartTestPage;