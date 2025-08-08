import { createContext,useContext, useRef, useState } from "react";
const CandidateContext=createContext()

export const CandidateContextProvider=({children})=>{
    const [selectedCategory, setselectedCategory] = useState('')
    const [selectedItem, setselectedItem] = useState('')
    const [TestLink, setTestLink] = useState("")
    const [testData, setTestData] = useState(null)
    const [attemptedData, setAttemptedData] = useState(null)
    const mediaRecorderRef = useRef(null);
    const recordedChunks = useRef([]);
    const [webcamStream, setWebcamStream] = useState(null);
    const [screenStream, setScreenStream] = useState(null);
    const [InvitationStatus, setInvitationStatus] = useState('')
    return <CandidateContext.Provider value={{selectedCategory,setselectedCategory,selectedItem,setselectedItem,TestLink,setTestLink,testData,setTestData,attemptedData,setAttemptedData,webcamStream,setWebcamStream,recordedChunks,mediaRecorderRef,screenStream,setScreenStream,InvitationStatus,setInvitationStatus}}>
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
