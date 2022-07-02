import React from 'react'
import styles from './TableResult.module.css'

const StudentResultRow = (props) => {
  const result = props.studentResult
  const marks = JSON.parse(result.mark)
  const time = JSON.parse(result.time)
  let markResult = 0
  const studentMarks = Object.entries(marks).map(([key, mark]) => {
    const studentMark = (mark[1] === 'true') ? mark[0] : 0
    markResult += +studentMark
    return <th key = {key} className = {styles.mark}>{studentMark}</th>
  })
  console.log(time)

  return (
      <tr className = {styles.row}>
        <th>{result.student}</th>
        <th>{result.groupa}</th>
        {studentMarks}
        <th className = {styles.item + ' ' + styles.timeColumn}>{time.timeForTest}</th>
        {(markResult/props.mark*100 >= 60) ?
          <th className = {styles.goodMark}>{markResult}</th>
          : <th className = {styles.badMark}>{markResult}</th>
        }
      </tr>
  )
}

export default StudentResultRow
