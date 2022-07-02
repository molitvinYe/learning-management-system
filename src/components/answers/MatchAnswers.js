import React, {useState} from 'react'
import MatchAnswer from './MatchAnswer'
import styles from './MatchAnswers.module.css' 

const MatchAnswers = (props) => {
  const vars = JSON.parse(props.vars)
  const leftListOfVariables = vars[0]
  const rightListOfVariables = vars[1]
  const [matchedAnswers, setMatchedAnswers] = useState({})

  const getValue = (index, value) => {
    const newMatchedAnswers = {...matchedAnswers, [index]: value}
    props.getValue(newMatchedAnswers, props.questionNumber)
    setMatchedAnswers({...newMatchedAnswers})
  }
  
  return (
    <div className = {styles.container}>
      <div className = {styles.vars}>
        <ul className = {styles.list}>
          {Object.entries(leftListOfVariables).map(([key, value], index) => {
            return (<li key = {key} className = {styles.item}>{key}. {value}</li>)
          })}
        </ul>
        <ul className = {styles.list}>
        {Object.entries(rightListOfVariables).map(([key, value]) => {
            return (<li key = {key} className = {styles.item}>{key}. {value}</li>)
          })}
        </ul>
      </div>
      <div className = {styles.raw}>
        {Object.keys(leftListOfVariables).map((leftKey, leftIndex) => {
          return (<MatchAnswer 
            key={leftIndex} 
            leftKey = {leftKey} 
            questionNumber = {props.questionNumber}
            rightListOfVariables = {rightListOfVariables}
            getValue = {getValue}/>)
          })}
      </div>
    </div>
  )
}

export default MatchAnswers