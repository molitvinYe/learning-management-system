import React, {useState, useEffect} from 'react'
import CheckBoxAnswer from './CheckBoxAnswer'

const CheckBoxAnswers = (props) => {
  const variables = JSON.parse(props.vars)
  const [checkedValues, setCheckedValues] = useState([])

  const getValue = (value, questionIndex,isCheck) => {
    let newValues = [...checkedValues]
    if (isCheck) {
      newValues.push(value)
    } else {
      newValues.map( (newValue, index) => {
        if (newValue === value) {
          newValues.splice(index, 1)
        }
      })
    }
    if (newValues.length === 0) {
      props.getValue(null, questionIndex)
    } else {
      props.getValue(newValues, questionIndex)
    }
    setCheckedValues([...newValues])
  }

  return (
    <React.Fragment>
      {variables.map((variable, varsIndex) => {
        return (<CheckBoxAnswer 
          key = {varsIndex}
          varsIndex = {varsIndex}
          questionNumber = {props.questionNumber} 
          variable = {variable} 
          getValue = {getValue}
          />)
      })}
    </React.Fragment>
  )
}

export default CheckBoxAnswers