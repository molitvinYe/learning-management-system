import React, {useState, useEffect, useContext} from 'react' 
import { Link } from 'react-router-dom'
import useHttp from '../../hooks/use-http'
import { resultUrl } from '../../constants'
import styles from './StudentTestItem.module.css'
import StartTestModal from '../modals/StartTestModal'
import AuthContext from '../contexts/auth-context'

const StudentTestItem = (props) => {
  const [isDisabled, setIsDisabled] = useState(true)
  const [isStartTestModalVisible, setIsStartTestModalVisible] = useState(false)
  const [isHaveResult, setIsHaveResult] = useState(false)
  const [resultId, setResultId] = useState(false)
  const {hours: startTimeHours, minutes: startTimeMinutes} = props.startTime
  const {hours: endTimeHours, minutes: endTimeMinutes} = props.endTime
  const {day, month, year} = props.date
  const authCtx = useContext(AuthContext)

  const {isLoading, error, sendRequest: showInResult} = useHttp({
    url: `${resultUrl}/student/${authCtx.user.mail}`,
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  }, (data) => {
    console.log(props.id)
    data.map((result) => {
      if (result.test === props.id) {
        setIsHaveResult(true)
        setResultId(result.id)
     }
    })
  })

  useEffect(() => {
    const currentDate = new Date()
    const startDate = new Date(`${month} ${day}, ${year} ${startTimeHours}:${startTimeMinutes}:00`)
    const endDate = new Date(`${month} ${day}, ${year} ${endTimeHours}:${endTimeMinutes}:00`)

    if (currentDate >= startDate && currentDate <= endDate) setIsDisabled(false)
    return () => {}
  }, [])

  useEffect(() => {
    showInResult()
    return () => {setIsHaveResult(false)}
  }, [])

  const changeVisible = () => {
    setIsStartTestModalVisible((current) => !current)
  }

  return (
      <div className = {styles.container}>
        <div className = {styles.date}>
          <span className = {styles.day}>{day}</span>
          <span className = {styles.month}>{month}</span>
        </div>
        <div className = {styles.test}>
          <h3 className = {styles.name}>{props.name}</h3>
            {!isHaveResult ?
              <button 
              className = {styles.button} 
              disabled = {isDisabled}
              onClick = {changeVisible}>
                Start test
            </button> :
            <Link to = {`/result/student/${resultId}`}>Get result</Link>
            }
            
            {isStartTestModalVisible &&
              <StartTestModal 
                changeVisible = {changeVisible}
                duration = {props.durations}
                id = {props.id}/>}
        </div>
        <div className = {styles.time}>
          <span>{startTimeHours}:{startTimeMinutes}</span>
          <span className = {styles.line}></span>
          <span>{endTimeHours}:{endTimeMinutes}</span>
        </div>
      </div>
  )
}

export default StudentTestItem