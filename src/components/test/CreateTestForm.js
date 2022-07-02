import React, {useState, useEffect, useContext} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { subjectUrl, testUrl } from '../../constants'
import useHttp from '../../hooks/use-http'
import { validate } from '../../constants'
import AuthContext from '../contexts/auth-context'
import SelectGroups from '../formElements/SelectGroups'
import CustomInput from '../formElements/CustomInput'
import styles from '../formElements/Form.module.css'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import '../../styles/calendar.css'
import { monthNames } from '../../constants'
import TimePicker from 'react-time-picker';

const CreateTestForm = () => {
  const authCtx = useContext(AuthContext)
  const params = useParams()
  const [groups, setGroups] = useState(null)
  const mail = authCtx.user.mail
  const [postTestBody, setPostTestBody] = useState(null)
  const [startTime, onChangeStartTime] = useState('10:00');
  const [endTime, onChangeEndTime] = useState('11:30');
  const subjectId = params.id

  const [formData, setFormData] = useState({})
  const getInputData =  (value) => setFormData({...formData, ...value})

  const {isLoading, error, sendRequest: getSubjectById} = useHttp({
    url: `${subjectUrl}/${subjectId}`,
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  }, (data) => {setGroups(data.groups)})

  useEffect(() => {
    getSubjectById()
  }, [])

  const [date, onChange] = useState(new Date());

  useEffect(() => {
    const dateObj = {
      day: date.getDate(),
      month: monthNames[date.getMonth()],
      year: date.getFullYear()
    }
    getInputData({date: JSON.stringify(dateObj)})
  }, [date])

  
  useEffect(() => {
    const endTimeArray = endTime.split(':')
    const endTimeObj = {
      hours: endTimeArray[0],
      minutes: endTimeArray[1]
    }
    getInputData({endTime: JSON.stringify(endTimeObj)})
  }, [endTime])

  useEffect(() => {
    const startTimeArray = startTime.split(':')
    const startTimeObj = {
      hours: startTimeArray[0],
      minutes: startTimeArray[1]
    }
    getInputData({startTime: JSON.stringify(startTimeObj)})
  }, [startTime])

  useEffect(() => {
    console.log(formData)
  }, [formData])

  const navigate = useNavigate()
  const {
    isLoading: testIsLoading, 
    error: testError, 
    sendRequest: postTest} = useHttp({
      url: "http://localhost:8080/moli/a/rest/test",
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=utf8"
      },
      body: postTestBody
  }, (data) => {navigate(`/test/editTestQuestions/${data.id}`)})

  useEffect(() => {
    if(postTestBody) {
      postTest()
    }
    return () => {}
  }, [postTestBody])


  const submitHandler = (event) => {
    event.preventDefault()

    const endTime = {
      hours: formData.endHours,
      minutes: formData.endMinutes
    }

    const startTime = {
      hours: formData.startHours,
      minutes: formData.startMinutes
    }
  
    setPostTestBody({
      "id": "id",
      "name" : formData.name,
      "duration" : formData.duration,
      "groups" : formData.groups,
      "date" : formData.date,
      "endTime" : formData.endTime,
      "startTime" : formData.startTime,
      "isAvailable": "true",
      "subjectId" : subjectId,
      "teacherMail" : mail,
    })
  }


  return (
      <form className = {styles.form} onSubmit = {submitHandler}>
        <h3 className = {styles.title}>Test</h3>
        <CustomInput id = 'test-name' type = 'text' title = 'Name' 
          objectKey = 'name' errorMassage = 'incorrect'
          validateValue = {validate.emptyValidate}
          getInputData = {getInputData}/>

        <SelectGroups title = 'Groups' objectKey = 'groups' 
          subjectList = {JSON.parse(groups)} 
          getInputData = {getInputData}/>
        
        <Calendar onChange={onChange} value={date}/>

        <CustomInput id = 'test-duration' type = 'number' title = 'Duration' 
          objectKey = 'duration' errorMassage = 'incorrect'
          validateValue = {validate.emptyValidate}
          getInputData = {getInputData}/>

        <div className = {styles.raw}>
          <div className = {styles.timeBlock}>
          <h4 className={styles.inputTitle}>Start time</h4>
          <TimePicker onChange={onChangeStartTime} value={startTime} className = {styles.time}/>
          </div>
          <div className = {styles.timeBlock}>
          <h4 className={styles.inputTitle}>End time</h4>
          <TimePicker onChange={onChangeEndTime} value={endTime} className = {styles.time}/>
          </div>
        </div>
        
        <button>Click</button>
      </form>
  )
}

export default CreateTestForm