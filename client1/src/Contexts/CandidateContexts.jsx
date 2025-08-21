import { createContext,useContext, useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
const CandidateContext=createContext()

export const CandidateContextProvider=({children})=>{
    // const [selectedQuestions, setselectedQuestions] = useState('')
    const [selectedItem, setselectedItem] = useState('')
    const [TestLink, setTestLink] = useState("")
    const [testData, setTestData] = useState(null)
    const [attemptedData, setAttemptedData] = useState(null)
    const mediaRecorderRef = useRef(null);
    const recordedChunks = useRef([]);
    const [webcamStream, setWebcamStream] = useState(null);
    const [screenStream, setScreenStream] = useState(null);
    const [InvitationStatus, setInvitationStatus] = useState('')
    const onSelectedQuestions=(handlesselectquestions)=>{handlesselectquestions()}
    const [SubmitLoading, setSubmitLoading] = useState(false)
    const [InviteModalOpen, setOnInviteModalOpen] = useState(false)
  const [BulkInviteModalOpen, setBulkInviteModalOpen] = useState(false)
  const [subcategory, setSubcategory] = useState(null);
  // const [invitationData, setInvitationData] = useState({})
//   const [selectedQuestions, setSelectedQuestions] = useState([]);
  
  const [template, setTemplate] = useState(() => {
    return JSON.parse(localStorage.getItem("template")) || null;
  });

  const [selectedQuestions, setSelectedQuestions] = useState(() => {
    return JSON.parse(localStorage.getItem("selectedQuestions")) || [];
  });
  
   const sendSingleInvitation = async ({ invitationData, testId }) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_LOCAL_BACKEND_API}/invite/sendInvite`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...invitationData, testId }),
        }
      );

      const data = await res.json();
      console.log("test data",data);
      
      if (res.ok) {
        Swal.fire(data.SuccessMessage || "Invitation sent!");
        console.log(data);
        
        return { success: true, data };
      } else {
        Swal.fire(data.FailureMessage || "Error sending invitation.");
        return { success: false, data };
      }
    } catch (err) {
      Swal.fire("Something went wrong.");
      return { success: false, err };
    }
  };
  //send Bulk invitation
  const sendBulkInvitations=async({candidates,testId})=>{
     try {
          const res = await fetch(`${import.meta.env.VITE_LOCAL_BACKEND_API}/invite/sendBulkInvites`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              testId: testId,
              candidates,
            }),
          });
    
          const data = await res.json();
          console.log(data);
          
          
          if (res.ok) {
            Swal.fire(data.SuccessMessage);
             return { success: true, data };
          } else {
            Swal.fire(data.FailureMessage || 'Error sending bulk invitations.');
             return { success: false, data };
          }
        } catch (err) {
          Swal.fire('Something went wrong.');
           return { success: false, err };
  }
}
  useEffect(() => {
    localStorage.setItem("template", JSON.stringify(template));
  }, [template]);

  useEffect(() => {
    localStorage.setItem("selectedQuestions", JSON.stringify(selectedQuestions));
  }, [selectedQuestions]);
    return <CandidateContext.Provider value={{sendBulkInvitations,sendSingleInvitation,subcategory,setSubcategory,template,setTemplate,onSelectedQuestions,selectedQuestions,setSelectedQuestions,selectedItem,setselectedItem,TestLink,setTestLink,testData,setTestData,attemptedData,setAttemptedData,webcamStream,setWebcamStream,recordedChunks,mediaRecorderRef,screenStream,setScreenStream,InvitationStatus,setInvitationStatus}}>
        {children} 
    </CandidateContext.Provider>
}

export const CandidateStore=()=>{
    const cadidatevalue=useContext(CandidateContext)
    if(!cadidatevalue){
        throw new Error('Candidate value should be inside the provider')
    }
    return cadidatevalue;
}
