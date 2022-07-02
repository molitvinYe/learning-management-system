import React, {useState, useEffect} from 'react' 
import { Link } from 'react-router-dom'
import styles from './TeacherTestItem.module.css'

const TeacherTestItem = (props) => {
  const [isDisabled, setIsDisabled] = useState(true)
  const {hours: startTimeHours, minutes: startTimeMinutes} = props.startTime
  const {hours: endTimeHours, minutes: endTimeMinutes} = props.endTime
  const {day, month, year} = props.date

  return (
      <div className = {styles.container}>
        <div className = {styles.date}>
          <span className = {styles.day}>{day}</span>
          <span className = {styles.month}>{month}</span>
        </div>
        <div className = {styles.test}>
          <h3 className = {styles.name}>{props.name}</h3>
          <Link to = {`/result/studentTable/${props.id}`} className = {styles.link}>Get results</Link>
          <Link to = {`/test/editTestQuestions/${props.id}`} className = {styles.link}>Edit</Link>
        </div>
        <div className = {styles.time}>
          <span>{startTimeHours}:{startTimeMinutes}</span>
          <span className = {styles.line}></span>
          <span>{endTimeHours}:{endTimeMinutes}</span>
        </div>
      </div>
  )
}

export default TeacherTestItem