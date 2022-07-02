import React, {useState, useReducer, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { validate } from '../../constants'
import { facultyListUrl, teacherUrl, subjectsListUrl } from '../../constants'
import SelectSubjects from '../formElements/SelectSubjects'
import CustomInput from '../formElements/CustomInput'
import styles from '../formElements/Form.module.css'
import SelectPerson from '../formElements/SelectPerson'
import useHttp from '../../hooks/use-http'
import ErrorModal from '../modals/ErrorModal'
import SelectFaculty from '../formElements/SelectFaculty'
import LoadingSpinner from '../ui/LoadingSpinner'

const TeacherRegisterForm = () => {
  const [isDisabled, setIsDisabled] = useState(true)
  const [facultyList, setFacultyList] = useState(null)
  const [subjectList, setSubjectList] = useState(null)
  const [teacherPostBody, setTeacherPostBody] = useState(null)
  const [filterSubjectList, setFilterSubjectList] = useState(null)
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false)

  const [formData, setFormData] = useState({})
  const getInputData =  (value) => setFormData({...formData, ...value})
  
  const {
    isLoading: isFacultyLoading, 
    error: facultyError, 
    sendRequest: getFacultyList} = useHttp({
      url: facultyListUrl,
      method: 'GET',
      header: {'Content-Type': 'application/json'}
  }, (data) => {setFacultyList(data)})

  const {
    isLoading: isSubjectLoading, 
    error: subjectError, 
    sendRequest: getSubjectList} = useHttp({
      url: subjectsListUrl,
      method: 'GET',
      header: {'Content-Type': 'application/json'}
  }, (data) => {
    setSubjectList(data)
    setFilterSubjectList(data)
  })
  
  useEffect(() => {
    getFacultyList()
    getSubjectList()
    return () => {}
  }, [])

  useEffect(() => {
    const formIsValidObj = Object.values(formData).map((value) => {
      if (value) {return true} else {return false}
    })

    console.log(formData)
    const checkValid = (value) => value === true
    console.log(formIsValidObj)
    const isFormValid = formIsValidObj.every(checkValid) && formIsValidObj.length === 5
    console.log(isFormValid)
    isFormValid ? setIsDisabled(false) : setIsDisabled(true)
    return () => {}
  }, [formData]) 

  const changeVisible = () => {
    setIsErrorModalVisible(prev => !prev)
  }

  const changeSubjectList = (facultyName) => {
    const sujectListFilterByFaculty  = subjectList.filter(
      (subject) => subject.faculty.shortName === facultyName)

    setFilterSubjectList([...sujectListFilterByFaculty])
  }

  const navigate = useNavigate()
  const {
    isLoading: isRegisterLoading, 
    error: registerError, 
    sendRequest: register} = useHttp({
      url: teacherUrl,
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=utf8"
      },
      body: teacherPostBody
  }, () => {navigate('/login/teacher')})

  useEffect(() => {
    if(teacherPostBody) {
      register()
    }
    return () => {}
  }, [teacherPostBody])

  useEffect(() => {
    if (registerError) setIsErrorModalVisible(prev => !prev)
    return () => {}
  },[registerError])

  const submitHandler = (event) => {
    event.preventDefault()
    const subjects = formData.subjects
    const subjectsString = JSON.stringify(subjects)
    const validateSubjects = subjectsString.replace(/(")/g, '\"')
    const teacherData = {
      "faculty": formData.faculty,
      "fullName": formData.fullName,
      "mail": formData.email,
      "password": formData.password,
      "subjects": validateSubjects
    }
    setTeacherPostBody({...teacherData})
  }


  return (
    <form className = {styles.form}  onSubmit = {submitHandler}>
      <h3 className = {styles.title}>Register</h3>
      <SelectPerson isWho = 'teacher' auth = 'register'/>
      {isRegisterLoading ? <LoadingSpinner/> : 
        <React.Fragment>
          <CustomInput id = 'teacher-fullName' type = 'text' title = 'Full name' 
            objectKey = 'fullName' errorMassage = 'incorrect'
            validateValue = {validate.emptyValidate}
            getInputData = {getInputData}/>
            
          <SelectFaculty title = 'Faculty' objectKey = 'faculty'
            facultyList = {facultyList} 
            getInputData = {getInputData} 
            changeList = {changeSubjectList}/>
          
          <SelectSubjects title = 'Subjects' objectKey = 'subjects' 
            subjectList = {filterSubjectList} 
            getInputData = {getInputData}/>
          
          <CustomInput id = 'teacher-email' type = 'email' title = 'Email' 
            objectKey = 'email' errorMassage = 'incorrect' 
            validateValue = {validate.emailValidate} 
            getInputData = {getInputData}/>
          
          <CustomInput id = 'teacher-password' type = 'password' title = 'Password' 
            objectKey = 'password' errorMassage = 'must be 8-16 symbols' 
            validateValue = {validate.passwordValidate}
            getInputData = {getInputData}/>
        </React.Fragment>}

      {isErrorModalVisible && 
        <ErrorModal changeVisible = {changeVisible} 
          massage = 'Register is failed!!! Try again'/>}
      <button className = {styles.button}  disabled = {isDisabled}>Enter</button>
    </form>
  )
}

export default TeacherRegisterForm