import React, {useState} from 'react'
import RadioAnswer from './RadioAnswer'

const RadioAnswers = (props) => {
  const variables = JSON.parse(props.vars)

  const getValue = (value, questionIndex, varsIndex) => {
    props.getValue(value, questionIndex)
  }

  return (
    <React.Fragment>
      {variables.map((variable, varsIndex) => {
        return (<RadioAnswer 
          key = {varsIndex}
          varsIndex = {varsIndex}
          questionNumber = {props.questionNumber} 
          variable = {variable} 
          getValue = {getValue}
          />)
      })}
    </React.Fragment>
  )
}

export default RadioAnswers