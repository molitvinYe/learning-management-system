import React, {useRef} from 'react'
import styles from './TableResult.module.css'

const AnalisesResultRow = (props) => {
  const result = props.studentResult
  const marks = JSON.parse(result.mark)
  const time = JSON.parse(result.time)
  const violations = JSON.parse(result.violations)
  const markRef = useRef()
  let markResult = 0
  let realMarkResult = 0

  Object.entries(marks).map(([key, mark]) => {
    const violation = violations[key]
    const studentMark = (mark[1] === 'true') ? mark[0] : 0
    if (violation) {
      if (((violation.copyCount || violation.parseCount || violation.screenCount) 
      && violation.hiddenCount) || (violation.copyCount && violation.parseCount)
      || violation.hiddenCount >= 1) {
        realMarkResult += 0
     } else {
      realMarkResult += +studentMark
     }
    } else {
      realMarkResult += +studentMark
    }
  })

  const studentMarks = Object.entries(marks).map(([key, mark]) => {
    const violation = violations[key]
    let stylesItem = styles.mark
    if (violation) {
     if (((violation.copyCount || violation.parseCount || violation.screenCount) 
        && violation.hiddenCount) || (violation.copyCount && violation.parseCount)
        || violation.hiddenCount >= 1) {
      stylesItem += ' ' + styles.badMark
     }
    }
    const studentMark = (mark[1] === 'true') ? mark[0] : 0
    
    markResult += +studentMark
    console.log(markResult)
    return <th key = {key} className = {stylesItem} ref = {markRef}>{studentMark}</th>
  })

  
  let copy = 0
  let paste = 0
  let hidden = 0
  let screenshot = 0
  Object.values(violations).map((violation) => {
    if (violation.copyCount) copy += violation.copyCount
    if (violation.pasteCount) paste += violation.pasteCount
    if (violation.hiddenCount) hidden += violation.hiddenCount
    if (violation.screenCount) screenshot += violation.screenCount
  })

  return (
      <tr className = {styles.row}>
        <th>{result.student}</th>
        <th>{result.groupa}</th>
        {studentMarks}
        <th className = {styles.item + ' ' + styles.timeColumn}>{time.timeForTest}</th>
        <th className = {markResult/props.mark*100 >= 60 ? styles.goodMark : styles.badMark}>
            {markResult}
        </th>
        <th>{copy}</th>
        <th>{paste}</th>
        <th>{hidden}</th>
        <th>{screenshot}</th>
        <th className = {realMarkResult/props.mark*100 >= 60 ? styles.goodMark : styles.badMark}>
          {realMarkResult}
        </th>
      </tr>
  )
}

export default AnalisesResultRow
