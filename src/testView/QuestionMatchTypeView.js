import React from 'react' 
import styles from './QuestionView.module.css' 
import QuestionPanel from '../createQuestions/QuestionPanel'

const QuestionMatchTypeView = (props) => {
  const question = props.question
  const vars = JSON.parse(question.vars)
  
  const leftVars = Object.entries(vars[0]).map(([key, value], index) => {
    return <li key = {key} className = {styles.item}>{key}. {value}</li>
  })

  const rightVars = Object.entries(vars[1]).map(([key, value]) => {
    return (<li key = {key} className = {styles.item}>{key}. {value}</li>)
  })

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
      <div className = {styles.vars}>
        <ul className = {styles.listVars}>
          {leftVars}
        </ul>
        <ul className = {styles.listVars}>
          {rightVars}
        </ul>
      </div>
      <span className = {styles.answer}>Answer: <mark>{question.answer}</mark></span>
    </div>
    <QuestionPanel question = {question} getInitialValue = {getInitialValue}/>
  </div>
  )
}

export default QuestionMatchTypeView