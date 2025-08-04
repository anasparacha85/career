import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import { createBrowserRouter,createRoutesFromElements,RouterProvider,Route } from 'react-router-dom'
import DashboardPage from './Pages/DashboardPage.jsx'
 import CreateTest from './Pages/CreateTest/CreateTestPage.jsx'

import TestPage from './Pages/TestPage/Testpage.jsx'
import AllTests from './Pages/AllCreatedTests/AllTests.jsx'
import TestResultsPage from './Pages/TestResults/TestResults.jsx'

const router=createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<App/>}>
    <Route index element={<DashboardPage/>}/>
    <Route path='/create-test' element={<CreateTest/>} />
    <Route path='/test-link/:token' element={<TestPage/>}/>
     <Route path='/all-tests' element={<AllTests/>}/>
     <Route path='/result' element={<TestResultsPage/>}/>
  </Route>
))
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <RouterProvider router={router}/>
  
  </StrictMode>,
)
