import React, {useState, useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import useHttp from '../../hooks/use-http'
import Container from '../ui/Container'
import CustomInput from '../formElements/CustomInput'
import SelectFaculty from '../formElements/SelectFaculty'
import AuthContext from '../contexts/auth-context'
import styles from '../formElements/Form.module.css'
import SelectGroups from '../formElements/SelectGroups'
import { validate , facultyListUrl, studentUrl, subjectUrl, teacherUrl} from '../../constants'

const CreateSubject = () => {
  const authCtx = useContext(AuthContext)
  const [isDisabled, setIsDisabled] = useState(true)
  const [facultyList, setFacultyList] = useState(null)
  const [groupsList, setGroupsList] = useState(null)
  const [filterSpecialityList, setFilterSpecialityList] = useState(null)
  const [subjectPostBody, setSubjectPostBody] = useState(null)
  const [teacherPostBody, setTeacherPostBody] = useState(null)
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false)
  const [formData, setFormData] = useState({})
  const getInputData =  (value) => setFormData({...formData, ...value})

  useEffect(() => {
    const formIsValidObj = Object.values(formData).map((value) => {
      if (value) {return true} else {return false}
    })

    const checkValid = (value) => value === true
    const isFormValid = formIsValidObj.every(checkValid) && formIsValidObj.length === 3
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
      url: `${studentUrl}/all`,
      method: 'GET',
      header: {'Content-Type': 'application/json'}
  }, (data) => {
    const groups = data.map((student) => {
      return student.groupa
    })
    setGroupsList([...new Set(groups)])
  })
  
  useEffect(() => {
    getFacultyList()
    getSpecialityList()
    return () => {}
  }, [])

  const {
    isLoading: isRegisterLoading, 
    error: registerError, 
    sendRequest: postSubject} = useHttp({
      url: subjectUrl,
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=utf8"
      },
      body: subjectPostBody
  }, (data) => {
    const subjects = JSON.parse(authCtx.user.subjects)
    subjects.push(data.id)
    setTeacherPostBody({...authCtx.user, subjects: JSON.stringify(subjects)})
  })

  const navigate = useNavigate()
  const {
    isLoading, 
    error, 
    sendRequest: postTeacher} = useHttp({
      url: teacherUrl,
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=utf8"
      },
      body: teacherPostBody
  }, () => {
    authCtx.login(teacherPostBody,authCtx.userType)
    navigate('/subjects/teacher')
  })
  

  
  useEffect(() => {
    if(subjectPostBody) {
      postSubject()
    }
    return () => {}
  }, [subjectPostBody])

  useEffect(() => {
    if(teacherPostBody) {
      console.log('here')
      postTeacher()
      //navigate('/subjects/teacher')
    }
    return () => {}
  }, [teacherPostBody])

  const submitHandler = (event) => {
    event.preventDefault()
    
    setSubjectPostBody({
      "id": "id",
      "name" : formData.name,
      "faculty" : formData.faculty,
      "groups" : formData.groups
    })
    

  }

  console.log(authCtx.user)

  return (
      <form onSubmit = {submitHandler} className = {styles.form}>
        <h2>Create subject</h2>
        <CustomInput id = 'subject-name' type = 'text' title = 'Subject name' 
          objectKey = 'name' errorMassage = 'incorrect'
          validateValue = {validate.emptyValidate}
          getInputData = {getInputData}/>
        
        <SelectFaculty title = 'Faculty' objectKey = 'faculty'
        facultyList = {facultyList}
        changeList = {() => {}}
        getInputData = {getInputData}/>

        <SelectGroups title = 'Groups' objectKey = 'groups'
        subjectList = {groupsList}
        getInputData = {getInputData}/>

        <button disabled = {isDisabled}>Enter</button>
      </form>
  )
}

export default CreateSubject