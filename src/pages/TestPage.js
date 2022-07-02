import React, {useState} from 'react' 
import { Route, Routes, Outlet} from 'react-router-dom'
import Test from '../components/test/Test'
import CreateTestForm from '../components/test/CreateTestForm'
import PageLayout from '../components/layout/PageLayout'
import EditTestQuestions from '../components/test/EditTestQuestions'
//
//<Test/>
const TestPage = () => {
  const [keyUpEvent, setKeyUpEvent] = useState(null)
  const [isTrue, setIsTrue] = useState(true)

  return (
    <PageLayout>
      <Routes>
          <Route path = '/createTest/:id' element = {<CreateTestForm />}/>
          <Route path = '/doTest/:id' element = {<Test keyUpEvent = {keyUpEvent}/>}/>
          <Route path = '/editTestQuestions/:id' element = {<EditTestQuestions />}/>
      </Routes> 
      
      <Outlet/>
    </PageLayout>
  )
}

export default TestPage