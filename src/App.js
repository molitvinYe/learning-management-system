import React, {useContext} from 'react'
import { Route, Routes, Navigate} from "react-router-dom";
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import SubjectsPage from './pages/SubjectsPage';
import TestPage from './pages/TestPage';
import ResultPage from './pages/ResultPage';
import LoginForm from './components/auth/LoginForm';
import AuthContext from './components/contexts/auth-context';

function App() {
  const authCtx = useContext(AuthContext)
  const isLoggedIn = authCtx.isLoggedIn  
 
  return (
    <Routes>
      <Route path='/' element={<Navigate to={isLoggedIn ? `/subjects/${authCtx.userType}` : '/login/student'} />}/>
      {!isLoggedIn && 
        <Route path='/login' element = {<LoginPage/>}>
          <Route path=':user' element = {<LoginForm/>} />
        </Route>}
      {!isLoggedIn && <Route path='/register/*' element = {<RegisterPage/>} />}
      {isLoggedIn && <Route path='/profile' element = {<ProfilePage/>}/>}
      {isLoggedIn && <Route path='/subjects/*' element = {<SubjectsPage/>}/>}
      {isLoggedIn && <Route path='/test/*' element = {<TestPage/>}/>}
      {isLoggedIn && <Route path = '/result/*' element = {<ResultPage/>}/>}
      <Route path="*" element={<Navigate to={isLoggedIn ?  `/subjects/${authCtx.userType}` : '/login/student'} />}/>
    </Routes>
   );
}

export default App;
