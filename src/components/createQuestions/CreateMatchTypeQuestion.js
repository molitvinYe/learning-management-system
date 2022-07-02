import React, {useEffect, useState} from 'react'
import CustomInput from '../formElements/CustomInput'
import { validate } from '../../constants'
import styles from './CreateMatchTypeQuestion.module.css'

const CreateMatchTypeQuestion = (props) => {
  const getInputData =  (value) => props.getInputData(value)
  const [vars, setVars] = useState([])
  const [leftVars, setLeftVars] = useState({})
  const [rightVars, setRightVars] = useState({})
  const [answers, setAnswers] = useState({})
  const question = props.initialData
  let initialVars = null
  let initialAnswers = null
  
  if (Object.keys(question).length !== 0) {
    initialVars = JSON.parse(question.vars)
    initialAnswers = JSON.parse(question.answer)
  }

  const getleftVars = (variable) => {
    const newLeftVars = {...leftVars, ...variable}
    setLeftVars({...newLeftVars})
    const newVars = [...vars]
    newVars[0] = newLeftVars
    setVars([...newVars])
    props.getInputData({vars: JSON.stringify(newVars)})
  }

  const getRightVars = (variable) => {
    const newRightVars = {...rightVars, ...variable}
    setRightVars({...newRightVars})
    const newVars = [...vars]
    newVars[1] = newRightVars
    setVars([...newVars])
    props.getInputData({vars: JSON.stringify(newVars)})
  }

  useEffect(() => {
    const selects = document.querySelectorAll(`.${styles.select}`)
    console.log(selects)
    if (initialAnswers) {
      selects.item(0).value = initialAnswers[1]
      selects.item(1).value = initialAnswers[2]
      selects.item(2).value = initialAnswers[3]
      selects.item(3).value = initialAnswers[4]
    }
  },[])

  const changeHandler = (event) => {
    const value = event.target.value
    const id = event.target.dataset.id
    const answer = {[id]: value}
    const newAnswers = {...answers, ...answer}
    setAnswers({...newAnswers})
    props.getInputData({answer: JSON.stringify(newAnswers)})
  }
 
  const options = 
    <React.Fragment>
      <option className = {styles.option}></option>
      <option className = {styles.option} value = "A">A</option>
      <option className = {styles.option} value = "B">B</option>
      <option className = {styles.option} value = "C">C</option>
      <option className = {styles.option} value = "D">D</option>
    </React.Fragment>
  
  return (
    <React.Fragment>
        <CustomInput id = 'question-title' type = 'text' title = 'Question' 
        initialValue = {`${question.question ? question.question : ''}`}
          objectKey = 'question' errorMassage = 'incorrect'
          validateValue = {validate.emptyValidate}
          getInputData = {getInputData}
        />
        <div className = {styles.raw}>
          <div className = {styles.list}>
            <CustomInput id = 'question-1' type = 'text' title = '1' 
            initialValue = {`${initialVars ? initialVars[0][1] : ''}`}
            objectKey = '1' errorMassage = 'incorrect'
            validateValue = {validate.emptyValidate}
            getInputData = {getleftVars}
          />
          <CustomInput id = 'question-2' type = 'text' title = '2' 
          initialValue = {`${initialVars ? initialVars[0][2] : ''}`}
            objectKey = '2' errorMassage = 'incorrect'
            validateValue = {validate.emptyValidate}
            getInputData = {getleftVars}
          />
          <CustomInput id = 'question-3' type = 'text' title = '3' 
          initialValue = {`${initialVars ? initialVars[0][3] : ''}`}
            objectKey = '3' errorMassage = 'incorrect'
            validateValue = {validate.emptyValidate}
            getInputData = {getleftVars}
          />
          <CustomInput id = 'question-4' type = 'text' title = '4' 
          initialValue = {`${initialVars ? initialVars[0][4] : ''}`}
            objectKey = '4' errorMassage = 'incorrect'
            validateValue = {validate.emptyValidate}
            getInputData = {getleftVars}
          />
          </div>
          <div className = {styles.list}>
            <CustomInput id = 'question-A' type = 'text' title = 'A' 
            initialValue = {`${initialVars ? initialVars[1]['A'] : ''}`}
            objectKey = 'A' errorMassage = 'incorrect'
            validateValue = {validate.emptyValidate}
            getInputData = {getRightVars}
          />
          <CustomInput id = 'question-B' type = 'text' title = 'B'
          initialValue = {`${initialVars ? initialVars[1]['B'] : ''}`} 
            objectKey = 'B' errorMassage = 'incorrect'
            validateValue = {validate.emptyValidate}
            getInputData = {getRightVars}
          />
          <CustomInput id = 'question-C' type = 'text' title = 'C' 
          initialValue = {`${initialVars ? initialVars[1]['C'] : ''}`}
            objectKey = 'C' errorMassage = 'incorrect'
            validateValue = {validate.emptyValidate}
            getInputData = {getRightVars}
          />
          <CustomInput id = 'question-D' type = 'text' title = 'D' 
          initialValue = {`${initialVars ? initialVars[1]['D'] : ''}`}
            objectKey = 'D' errorMassage = 'incorrect'
            validateValue = {validate.emptyValidate}
            getInputData = {getRightVars}
          />
          </div>
        </div>
        <h4 className = {styles.title}>Select answer</h4>
        <div className = {styles.raw}>
          <div className = {styles.container}>
            <label className = {styles.label}>1.</label>
            <select className = {styles.select}
            data-id = "1" onChange = {changeHandler}>
            {options}
            </select>
          </div>
          <div className = {styles.container}>
            <label className = {styles.label}>2.</label>
            <select className = {styles.select}
            data-id = "2" onChange = {changeHandler}>
            {options}
            </select>
          </div>
          <div className = {styles.container}>
            <label className = {styles.label}>3.</label>
            <select className = {styles.select}
            data-id = "3" onChange = {changeHandler}>
            {options}
            </select>
          </div>
          <div className = {styles.container}>
            <label className = {styles.label}>4.</label>
            <select className = {styles.select}
            data-id = "4" onChange = {changeHandler}>
            {options}
            </select>
          </div>
        </div>
        <CustomInput id = 'question-mark' type = 'number' title = 'Mark' 
        initialValue = {`${question.mark ? question.mark : ''}`}
          objectKey = 'mark' errorMassage = 'incorrect'
          validateValue = {validate.emptyValidate}
          getInputData = {getInputData}/>
    </React.Fragment>
  )
}

export default CreateMatchTypeQuestion