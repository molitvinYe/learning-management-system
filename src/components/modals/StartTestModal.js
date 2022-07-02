import React from 'react' 
import { Link } from 'react-router-dom'
import ModalLayout from '../layout/ModalLayout'
import styles from './StartTestModal.module.css'

const StartTestModal = (props) => {
  return (
    <ModalLayout changeVisible = {props.changeVisible}>
      <div className = {styles.container}>
        <h3 className = {styles.title}>Do you want to start?</h3>
        <span className = {styles.durationsMassage}>Durations of this test is {props.duration} minutes</span>
        <Link to = {`/test/doTest/${props.id}`} className = {styles.link}> Start test </Link>
      </div>
    </ModalLayout>
  )
}

export default StartTestModal