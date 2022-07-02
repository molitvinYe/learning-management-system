import React, { useEffect } from 'react'
import styles from './TableResult.module.css'

const StudentTitleResult = (props) => {
  const result = props.result
  const time = JSON.parse(result.time).testDuration
  const questions = JSON.parse(result.questions)

  const questionNumbers = questions.map((question, index) => {
    return <th className = {styles.item} key = {index} title = {JSON.stringify(question)}>Q{index+1}</th>
  })

  let fullMark = 0
  const questionsMaxMark = questions.map((question, index) => {
    fullMark += +question.mark
    
    return <th className = {styles.item} key = {index}>{question.mark}</th>
  })

  useEffect(() => {
    props.getMark(fullMark)
  },[fullMark])
  
  
  return (
    <React.Fragment>
      <tr className = {styles.titleRow}>
        <th rowSpan = '2' className = {styles.item}>Student</th>
        <th rowSpan = '2' className = {styles.item}>Group</th>
        {questionNumbers}
        <th className = {styles.item}>Time (min)</th>
        <th className = {styles.item}>Mark</th>
      </tr>
      <tr className = {styles.correctRow}>
        {questionsMaxMark}
        <th className = {styles.item + ' ' + styles.timeColumn}>{time}</th>
        <th className = {styles.item}>{fullMark}</th>
      </tr>
    </React.Fragment>
  )
}

export default StudentTitleResult