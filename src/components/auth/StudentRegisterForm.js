import React, {useState, useReducer, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { validate } from '../../constants'
import { facultyListUrl, specialityListUrl, studentUrl } from '../../constants'
import CustomInput from '../formElements/CustomInput'
import styles from '../formElements/Form.module.css'
import SelectPerson from '../formElements/SelectPerson'
import SelectFaculty from '../formElements/SelectFaculty'
import SelectSpeciality from '../formElements/SelectSpeciality'
import useHttp from '../../hooks/use-http'
import ErrorModal from '../modals/ErrorModal'

const StudentRegisterForm = () => {
  const [isDisabled, setIsDisabled] = useState(true)
  const [facultyList, setFacultyList] = useState(null)
  const [specialityList, setSpecialityList] = useState(null)
  const [filterSpecialityList, setFilterSpecialityList] = useState(null)
  const [studentPostBody, setStudentPostBody] = useState(null)
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false)
  const [formData, setFormData] = useState({})
  const getInputData =  (value) => setFormData({...formData, ...value})

  useEffect(() => {
    const formIsValidObj = Object.values(formData).map((value) => {
      if (value) {return true} else {return false}
    })

    const checkValid = (value) => value === true
    const isFormValid = formIsValidObj.every(checkValid) && formIsValidObj.length === 8
    isFormValid ? setIsDisabled(false) : setIsDisabled(true)
    return () => {}
  }, [formData]) 
  
  const {
    isLoading: isFacultyLoading, 
    error: facultyError, 
    sendRequest: getFacultyList} = useHttp({
      url: facultyListUrl,
      method: 'GET',
      header: {'Content-Type': 'application/json'}
  }, (data) => {setFacultyList(data)})

  const {
    isLoading: isSpecialityLoading, 
    error: specialityError, 
    sendRequest: getSpecialityList} = useHttp({
      url: specialityListUrl,
      method: 'GET',
      header: {'Content-Type': 'application/json'}
  }, (data) => {
    setSpecialityList(data)
    setFilterSpecialityList(data)
  })
  
  useEffect(() => {
    getFacultyList()
    getSpecialityList()
    return () => {}
  }, [])

  const {
    isLoading: isRegisterLoading, 
    error: registerError, 
    sendRequest: register} = useHttp({
      url: studentUrl,
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=utf8"
      },
      body: studentPostBody
  }, () => {})

  useEffect(() => {
    if (registerError) setIsErrorModalVisible(prev => !prev)
    return () => {}
  },[registerError])

  const changeSpecialityList =  (facultyName) => {
    const specialityListFilterByFaculty  = specialityList.filter(
      (speciality) => speciality.faculty.shortName === facultyName)
    setFilterSpecialityList([...specialityListFilterByFaculty])
  }

  const submitHandler = (event) => {
    event.preventDefault()
    setStudentPostBody({
      "course": formData.course,
      "faculty": formData.faculty,
      "fullName": formData.fullName,
      "groupa": `${formData.speciality.shortName}${formData.course}${formData.group}`,
      "mail": formData.email,
      "password": formData.password,
      "speciality": formData.speciality
    })
  }

  const navigate = useNavigate()
  useEffect(() => {
    if(studentPostBody) {
      register()
      navigate('/login/student')
    }
    return () => {}
  }, [studentPostBody])

  return (
    <form className = {styles.form}  onSubmit = {submitHandler}>
      <h3 className = {styles.title}>Register</h3>

      <SelectPerson isWho = 'student' auth = 'register'/>

      <CustomInput id = 'student-fullName' type = 'text' title = 'Full name' 
        objectKey = 'fullName' errorMassage = 'incorrect'
        validateValue = {validate.emptyValidate}
        getInputData = {getInputData}/>

      <SelectFaculty title = 'Faculty' objectKey = 'faculty'
        facultyList = {facultyList}
        changeList = {changeSpecialityList}
        getInputData = {getInputData}/>

      <SelectSpeciality title = 'Speciality' objectKey = 'speciality'
        specialityList = {filterSpecialityList}
        getInputData = {getInputData}/>

      <CustomInput id = 'student-ticket' type = 'number' title = 'Ticket number'
        objectKey = 'ticket' errorMassage = 'must be 6 symbols'
        validateValue = {validate.ticketValidate} 
        getInputData = {getInputData}/>

      <div className = {styles.raw}>
        <CustomInput id = 'student-course' type = 'number' title = 'Course' 
          isInRaw = {true} objectKey = 'course' errorMassage = 'must be 1-6'
          validateValue = {validate.courseValidate}
          getInputData = {getInputData}/>

        <CustomInput id = 'student-group' type = 'number' title = 'Group' 
          isInRaw = {true} objectKey = 'group' errorMassage = 'must be 1-3'
          validateValue = {validate.groupValidate} 
          getInputData = {getInputData}/>
      </div>

      <CustomInput id = 'student-email' type = 'email' title = 'Email' 
        objectKey = 'email' errorMassage = 'incorrect' 
        validateValue = {validate.emailValidate} 
        getInputData = {getInputData}/>
      
      <CustomInput id = 'student-password' type = 'password' title = 'Password' 
        objectKey = 'password' errorMassage = 'must be 8-16 symbols' 
        validateValue = {validate.passwordValidate}
        getInputData = {getInputData}/>

      {isErrorModalVisible && 
        <ErrorModal changeVisible = {() => setIsErrorModalVisible(prev => !prev)} 
          massage = 'Register is failed!!! Try again'/>}
      
      <button className = {styles.button}  disabled = {isDisabled}>Enter</button>
    </form>
  )
}

export default StudentRegisterForm