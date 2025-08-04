import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Outlet } from 'react-router-dom'
import { CandidateContextProvider } from './Contexts/CandidateContexts'

function App() {
  const [count, setCount] = useState(0)

  return (
    < >
  <CandidateContextProvider>
     <Outlet/>
  </CandidateContextProvider>

   
    </>
  )
}

export default App
