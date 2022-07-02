import React, {useState} from 'react'
import styles from './MatchAnswer.module.css' 

const MatchAnswer = (props) => {
  const checkedHandler = (event) => {
    const value = event.target.value
    props.getValue(props.leftKey, value)
  }  
  
  return (
    <div className = {styles.container}>
      <label className = {styles.label}>{props.leftKey}: </label>
      <select 
        name = {props.leftKey}
        id = {props.questionNumber+props.leftKey} 
        onChange = {checkedHandler}
        className = {styles.select}>
        <option className = {styles.option}></option>
        {Object.keys(props.rightListOfVariables).map((rightKey, rightIndex) => {
          return (
            <option 
              className = {styles.option}
              key = {rightIndex} 
              value = {rightKey}>
                {rightKey}
            </option>)
        })}
      </select>
    </div>
  )
}

export default MatchAnswer