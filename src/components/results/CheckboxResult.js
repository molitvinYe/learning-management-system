import React from 'react'
import styles from './StudentResult.module.css'

const CheckboxResult = (props) => {
  let blockStyles = styles.block
  let mark = props.mark[0]
  if (props.mark[1] === 'true') {
    blockStyles += ' ' + styles.isTrue
  } else {
    blockStyles += ' ' + styles.isFalse
    mark = 0
  }
  const vars = JSON.parse(props.question.vars)
  return (
    <div className = {blockStyles}>
      <h3 className = {styles.title}>{props.number}. {props.question.question} ({mark}/{props.mark[0]})</h3>
      <ul className = {styles.listVars}>
        {vars.map((variable, index) => {
          return <li key = {index}>{index+1}. {variable}</li>
        })}
      </ul>
      <span className = {styles.trueAnswer}>True answer: <mark>{props.question.answer}</mark></span>
      <span className = {styles.yourAnswer}>Your answer: <mark>{props.answer}</mark></span>
    </div>
  )
}

export default CheckboxResult

