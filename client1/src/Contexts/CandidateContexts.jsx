import { createContext,useContext, useState } from "react";
const CandidateContext=createContext()

export const CandidateContextProvider=({children})=>{
    const [selectedCategory, setselectedCategory] = useState('')
    const [selectedItem, setselectedItem] = useState('')
    const [TestLink, setTestLink] = useState("")
    const [testData, setTestData] = useState(null)
    const [attemptedData, setAttemptedData] = useState(null)
    return <CandidateContext.Provider value={{selectedCategory,setselectedCategory,selectedItem,setselectedItem,TestLink,setTestLink,testData,setTestData,attemptedData,setAttemptedData}}>
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
