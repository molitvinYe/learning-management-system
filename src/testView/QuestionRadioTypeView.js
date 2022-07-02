import React from 'react' 
import styles from './QuestionView.module.css' 
import QuestionPanel from '../createQuestions/QuestionPanel'

const QuestionRadioTypeView = (props) => {
  const question = props.question
  const vars = JSON.parse(question.vars)
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
      <ul className = {styles.listVars}>
        {vars.map((variable, index) => {
          return <li key = {index}>{index+1}. {variable}</li>
        })}
      </ul>
      <span className = {styles.answer}>Answer: <mark>{question.answer}</mark></span>
    </div>
    <QuestionPanel question = {question} getInitialValue = {getInitialValue}/>
  </div>
  )
}

export default QuestionRadioTypeView