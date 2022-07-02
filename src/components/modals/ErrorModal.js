import React from 'react' 
import ModalLayout from '../layout/ModalLayout'
import styles from './ErrorModal.module.css'
import errorImg from '../../images/under_construction.png'

const ErrorModal = (props) => {
  return (
    <ModalLayout changeVisible = {props.changeVisible}>
      <div className = {styles.container}>
        <h3 className = {styles.title}>{props.massage}</h3>
        <img src = {errorImg} className = {styles.img}/>
        <button className = {styles.close} onClick = {props.changeVisible}>Close</button>
      </div>
    </ModalLayout>
  )
}

export default ErrorModal