import React from 'react'
import { Route, Routes, Outlet} from 'react-router-dom'
import WelcomeLayout from '../components/layout/WelcomeLayout'
import FullScreenContainer from '../components/ui/FullScreenContainer'
import Advantages from '../components/welcome/Advantages'
import StudentRegisterForm from '../components/auth/StudentRegisterForm'
import TeacherRegisterForm from '../components/auth/TeacherRegisterForm'

const RegisterPage = () => {
  return (
    <FullScreenContainer>
      <WelcomeLayout auth = 'register'>
        <Routes>
          <Route path = '/student' element = {<StudentRegisterForm/>}/>
          <Route path = '/teacher' element = {<TeacherRegisterForm/>}/>
        </Routes> 
      </WelcomeLayout>
      <Advantages/>
      <Outlet/>
    </FullScreenContainer>
  )
}

export default RegisterPage