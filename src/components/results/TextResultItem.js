import React from 'react'
import styles from './StudentResult.module.css'

const TextResultItem = (props) => {
  let blockStyles = styles.block
  let mark = props.mark[0]
  if (props.mark[1] === 'true') {
    blockStyles += ' ' + styles.isTrue
  } else {
    blockStyles += ' ' + styles.isFalse
    mark = 0
  }
  return (
    <div className = {blockStyles}>
      <h3 className = {styles.title}>{props.number}. {props.question.question} ({mark}/{props.mark[0]})</h3>
      <span className = {styles.trueAnswer}>True answer: <mark>{props.question.answer}</mark></span>
      <span className = {styles.yourAnswer}>Your answer: <mark>{props.answer}</mark></span>
    </div>
  )
}

export default TextResultItem

