import React, {useState, useContext, useEffect} from 'react'
import { validate, httpUrl } from '../../constants'
import useHttp from '../../hooks/use-http'
import AuthContext from '../contexts/auth-context'
import SelectPerson from '../formElements/SelectPerson'
import CustomInput from '../formElements/CustomInput'
import ErrorModal from '../modals/ErrorModal'
import LoadingSpinner from '../ui/LoadingSpinner'
import styles from '../formElements/Form.module.css'

const LoginForm = (props) => {  
  const [isDisabled, setIsDisabled] = useState(true)
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false)
  const [emailAndPasswordUrl, setEmailAndPasswordUrl] = useState('')
  const [formData, setFormData] = useState({})
  const getInputData =  (value) => setFormData({...formData, ...value})

  useEffect(() => {
    const formIsValidObj = Object.values(formData).map((value) => {
      if (value) {return true} else {return false}
    })

    const checkValid = (value) => value === true
    const isFormValid = formIsValidObj.every(checkValid) && formIsValidObj.length === 2

    if (formData.email) {
      const url = `${httpUrl}/${props.userType}/mail/${formData.email.replace('@', '%40')}/pass/${formData.password}`
      if (isFormValid) {
        setEmailAndPasswordUrl(url)
        setIsDisabled(false)
      } else setIsDisabled(true)
    }
  
    return () => {}
  }, [formData]) 


  const authCtx = useContext(AuthContext)
  const applyData = (user) => {
    authCtx.login(user, props.userType)
  }

  const {isLoading, error, sendRequest: login} = useHttp({
      url: emailAndPasswordUrl,
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    }, applyData)

  const loginHandler = async (event) => {
    event.preventDefault()
    await login()
    setIsErrorModalVisible(true)
  }

  const changeVisible = () => {
    setIsErrorModalVisible(prev => !prev)
  }
 
  return (
    <form className = {styles.form} onSubmit = {loginHandler}>
      <h3 className = {styles.title}>Login</h3>
      <SelectPerson isWho = {props.userType} auth = 'login'/>
      {isLoading ? <LoadingSpinner/> : 
        <React.Fragment>
          <CustomInput id = 'student-email' type = 'email' title = 'Email' 
            objectKey = 'email' errorMassage = 'incorrect' 
            validateValue = {validate.emailValidate} 
            getInputData = {getInputData}/>
          <CustomInput id = 'student-password' type = 'password' title = 'Password' 
            objectKey = 'password' errorMassage = 'must be 8-16 symbols' 
            validateValue = {validate.passwordValidate}
            getInputData = {getInputData}/>
        </React.Fragment>
      }
      {isErrorModalVisible && 
        <ErrorModal 
          changeVisible = {changeVisible} 
          massage = 'Don`t correct password or email'/>}
      <button className = {styles.button} disabled = {isDisabled} >Enter</button>
    </form>
  )
}

export default LoginForm