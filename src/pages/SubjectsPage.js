import React from 'react'
import { Outlet , Routes, Route} from 'react-router-dom'
import PageLayout from '../components/layout/PageLayout'
import StudentSubjectList from '../components/subjects/StudentSubjectList'
import TeacherSubjectList from '../components/subjects/TeacherSubjectList'
import CreateSubject from '../components/subjects/CreateSubject'

const CoursesPage = () => {
  return (
    <PageLayout>
      <Routes>
          <Route path = '/student' element = {<StudentSubjectList/>}/>
          <Route path = '/teacher' element = {<TeacherSubjectList/>}/>
          <Route path = '/createSubject' element = {<CreateSubject/>}/>
      </Routes> 
      <Outlet/>
    </PageLayout>)
}

export default CoursesPage