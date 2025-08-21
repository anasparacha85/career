import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import { createBrowserRouter,createRoutesFromElements,RouterProvider,Route } from 'react-router-dom'
import DashboardPage from './Pages/DashboardPage.jsx'
 import CreateTest from './Pages/CreateTest/CreateTestPage.jsx'

import TestPage from './Pages/TestPage/Testpage.jsx'
import AllTests from './Pages/AllCreatedTests/AllTests.jsx'
import TestResultsPage from './Pages/TestResults/TestResults.jsx'
import StartTestPage from './Pages/Countdownpage/CountDown.jsx'
import AllInvites from './Pages/AllInvites/AllInvites.jsx'
import TestCompletedPage from './Pages/TestCompletedPage/TestCompletepage.jsx'
import SubcategoryPage from './Pages/SubCategoryTestsPage.jsx/SubcategoryPage.jsx'
import QuestionSetPage from './Pages/QuestionSetPage/QuestionSetPage.jsx'

const router=createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<App/>}>
   <Route index element={<AllTests/>} />
       
         <Route path='/all-invites/:testid' element={<AllInvites/>}/>
    {/* <Route index element={<DashboardPage/>}/> */}
    <Route path='/create-test' element={<CreateTest/>} />
    <Route path='/sub-category-page' element={<SubcategoryPage/>}/>
    <Route path='/test-link/:token' element={<StartTestPage/>}/>
    <Route path='/test-completed-status' element={<TestCompletedPage/>}/>
     <Route path="/question-set" element={<QuestionSetPage />} />

  
    
   

     <Route path='/start-test/:token' element={<TestPage/>}/>
       
        <Route path='/attempt/:inviteId' element={<TestResultsPage/>}/>
  </Route>
))
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <RouterProvider router={router}/>
  
  </StrictMode>,
)
