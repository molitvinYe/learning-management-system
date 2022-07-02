import React, {useState, useEffect} from 'react' 
import TextAnswer from '../answers/TextAnswer'
import RadioAnswers from '../answers/RadioAnswers'
import CheckBoxAnswers from '../answers/CheckBoxAnswers'
import MatchAnswers from '../answers/MatchAnswers'
import styles from './Question.module.css'
import numStyles from './NumberBlock.module.css'

const Question = (props) => {
  const question = props.question
  const getValue = (value, index) => {
    props.getValue(value, index)
  }

  return (
    <div className = {styles.container}>
      <span className = 'questionNumber' data-number = {props.questionNumber}></span>
      <h3 className = {styles.title} >
        {props.questionNumber+1}. {question.question}</h3>
      <div className = {styles.vars}>
        {question.type === 'text' && 
          <TextAnswer 
            getValue = {getValue} 
            questionNumber = {props.questionNumber}/>}
        {question.type === 'radio' && 
          <RadioAnswers 
            getValue = {getValue} 
            questionNumber = {props.questionNumber} 
            vars = {question.vars}/>}
        {question.type === 'checkbox' && 
          <CheckBoxAnswers 
            getValue = {getValue} 
            questionNumber = {props.questionNumber} 
            vars = {question.vars}/>}
        {question.type === 'match' && 
          <MatchAnswers 
            getValue = {getValue} 
            questionNumber = {props.questionNumber} 
            vars = {question.vars}/>}
      </div>
      {props.isLast && <button className = {styles.endButton}>End test</button>}
    </div>
  )
}

export default Question