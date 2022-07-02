import React, {useState, useRef, useEffect} from 'react'
import styles from './CheckBoxAnswer.module.css'

const CheckBoxAnswer = (props) => {
  const [isCheck, setIsCheck] = useState(false)


  const checkedHandler = (event) => {
    const value = event.target.value
    const valueIsCheck = !isCheck
    props.getValue(value, props.questionNumber, valueIsCheck)
    setIsCheck((prev) => !prev)
  }  

  const inputId = styles.checkbox + props.questionNumber + props.varsIndex

  return (
    <div className = {styles.container}>
      <input 
        type = 'checkbox' 
        name = {`checkbox${props.questionNumber}`} 
        id = {inputId}
        value = {props.variable}
        className = {styles.checkbox}
        onChange = {checkedHandler}/>
        <label className = {styles.label} htmlFor = {inputId}>
          <span className = {styles.customCheckbox}></span>
          <span>{props.variable}</span>
        </label>
    </div>
  )
}

export default CheckBoxAnswer