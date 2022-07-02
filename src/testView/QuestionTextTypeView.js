import React from 'react'
import styles from './QuestionView.module.css' 
import QuestionPanel from '../createQuestions/QuestionPanel'

const QuestionTextTypeView = (props) => {
  const question = props.question
  const getInitialValue = (question) => {
    props.getInitialValue(question)
  }

  return (
    <div className = {styles.block}>
      <div className = {styles.content}>
        <div className = {styles.header}>
          <h4 className = {styles.title}>
            {props.number}. {question.question}
          </h4>
          <span className = {styles.mark}>
            {question.mark}
          </span>
        </div>
        <span className = {styles.answer}>Answer: <mark>{question.answer}</mark></span>
      </div>
     <QuestionPanel question = {question} getInitialValue = {getInitialValue}/>
    </div>
  )
}

export default QuestionTextTypeView