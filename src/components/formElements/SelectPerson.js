import React from 'react'
import { Link} from 'react-router-dom'
import styles from './SelectPerson.module.css'
import {ReactComponent as Student} from '../../icons/student.svg'
import {ReactComponent as Teacher} from '../../icons/teacher.svg'
import {ReactComponent as Arrow} from '../../icons/arrow.svg'

const SelectPerson = (props) => {
  const isStudent = props.isWho === 'student'

  return (
    <React.Fragment>
      <div className = {styles.arrowContainer}>
        <Arrow className = {isStudent ? styles.studentArrow : styles.teacherArrow}/>
        <span className = {styles.arrowText}>I`m {props.isWho}</span>
      </div>

      <Link to = {`/${props.auth}/student`} className = {styles.link}>
      <div className = {`${styles.studentContainer} ${styles.radioContainer} ${isStudent && styles.active}`}>
          <input type='radio' id='user-student'  name = 'user' className = {styles.radio}/>
          <label htmlFor='user-student' className = {styles.radioIconContainer}>
              <Student  className = {styles.icon}/>
          </label>  
      </div>
      </Link>

      <Link to = {`/${props.auth}/teacher`} className = {styles.link}>
      <div className = {`${styles.teacherContainer} ${styles.radioContainer} ${!isStudent && styles.active}`}>
          <input type='radio' id='user-teacher'  name = 'user' className = {styles.radio}/>
          <label htmlFor='user-teacher' className = {styles.radioIconContainer}>
            <Teacher className = {styles.icon}/>
          </label>
      </div>
      </Link>
    </React.Fragment>
  )
}

export default SelectPerson