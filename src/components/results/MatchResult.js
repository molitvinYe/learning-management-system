import React from 'react'
import styles from './StudentResult.module.css'

const MatchResult = (props) => {
  let blockStyles = styles.block
  let mark = props.mark[0]
  if (props.mark[1] === 'true') {
    blockStyles += ' ' + styles.isTrue
  } else {
    blockStyles += ' ' + styles.isFalse
    mark = 0
  }
  const vars = JSON.parse(props.question.vars)
  
  const leftVars = Object.entries(vars[0]).map(([key, value], index) => {
    return <li key = {key} className = {styles.item}>{key}. {value}</li>
  })

  const rightVars = Object.entries(vars[1]).map(([key, value]) => {
    return (<li key = {key} className = {styles.item}>{key}. {value}</li>)
  })
  
  return (
    <div className = {blockStyles}>
      <h3 className = {styles.title}>{props.number}. {props.question.question} ({mark}/{props.mark[0]})</h3>
      <div className = {styles.vars}>
        <ul className = {styles.list}>
          {leftVars}
        </ul>
        <ul className = {styles.list}>
          {rightVars}
        </ul>
      </div>
      <span className = {styles.trueAnswer}>True answer: <mark>{props.question.answer}</mark></span>
      <span className = {styles.yourAnswer}>Your answer: <mark>{props.answer}</mark></span>
    </div>
  )
}

export default MatchResult

