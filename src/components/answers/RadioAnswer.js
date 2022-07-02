import React, {useState, useRef, useEffect} from 'react'
import styles from './RadioAnswer.module.css'

const RadioAnswer = (props) => {
  const checkedHandler = (event) => {
    const value = event.target.value
    props.getValue(value, props.questionNumber, props.varsIndex)
  }  

  const inputId = styles.radio + props.questionNumber + props.varsIndex

  return (
    <div className = {styles.container}>
      <input 
        type = 'radio' 
        name = {`radio${props.questionNumber}`} 
        id = {inputId}
        value = {props.variable}
        className = {styles.radio}
        onChange = {checkedHandler}/>
        <label className = {styles.label} htmlFor = {inputId}>
          <span className = {styles.customRadio}></span>
          <span>{props.variable}</span>
        </label>
    </div>
  )
}

export default RadioAnswer