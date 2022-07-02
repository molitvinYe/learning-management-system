import React from 'react' 
import QuestionTextTypeView from './QuestionTextTypeView'
import QuestionCheckboxTypeView from './QuestionCheckboxTypeView'
import QuestionMatchTypeView from './QuestionMatchTypeView'
import QuestionRadioTypeView from './QuestionRadioTypeView'
import styles from './TestView.module.css'

const TestView = (props) => {
  const questionsList = props.questions

  const getInitialValue = (question) => {
    props.getInitialValue(question)
  }

  return (
    <div className = {styles.container}>
        <h3 className = {styles.title}>Test view</h3>
        {questionsList.map((question, index) => {
          if (question.type === 'text') return <QuestionTextTypeView key = {index} question = {question} number = {index+1} getInitialValue = {getInitialValue}/>
          if (question.type === 'radio') return <QuestionRadioTypeView key = {index} question = {question} number = {index+1} getInitialValue = {getInitialValue}/>
          if (question.type === 'checkbox') return <QuestionCheckboxTypeView key = {index} question = {question} number = {index+1} getInitialValue = {getInitialValue}/>
          if (question.type === 'match') return <QuestionMatchTypeView key = {index} question = {question} number = {index+1} getInitialValue = {getInitialValue}/>
        })}
    </div>
  )
}

export default TestView