import React from 'react'
import { useParams } from 'react-router-dom'
import WelcomeTitles from '../components/welcome/WelcomeTitles'
import LoginForm from '../components/auth/LoginForm'
import Advantages from '../components/welcome/Advantages'
import WelcomeLayout from '../components/layout/WelcomeLayout'
import FullScreenContainer from '../components/ui/FullScreenContainer'

const LoginPage = () => {
  const params = useParams()

  return (
    <FullScreenContainer>
      <WelcomeLayout auth = 'login'>
        <WelcomeTitles/>
        <LoginForm userType = {params.user}/>
      </WelcomeLayout>  
      <Advantages/>
    </FullScreenContainer> 
  )
}

export default LoginPage