import React, {useEffect, useState} from 'react'
import CustomInput from '../formElements/CustomInput'
import { validate } from '../../constants'
import styles from './CreateCheckboxTypeQuestion.module.css'

const CreateCheckboxTypeQuestion = (props) => {
  const getInputData =  (value) => props.getInputData(value)
  const [var1, setVar1] = useState('')
  const [var2, setVar2] = useState('')
  const [var3, setVar3] = useState('')
  const [var4, setVar4] = useState('')
  const [isChecked, setIsChecked] = useState(false)
  const [isChange, setIsChange] = useState(false)
  const varsArray = []
  const answersArray = []

  const question = props.initialData
  let initialVars = null
  
  if (Object.keys(question).length !== 0) {
    initialVars = JSON.parse(question.vars)
  }
  
  useEffect(() => {
    if(initialVars) {
      const inputs = document.querySelectorAll(`input[type="checkbox"]`)
      const answer = JSON.parse(question.answer)
      initialVars.map((initialVar, index) => {
        if (answer.includes(initialVar)) {inputs.item(index).checked = 'true'}
      })
    }
  },[])

  useEffect(() => {
    if (var1) varsArray[0] = var1
    if (var2) varsArray[1] = var2
    if (var3) varsArray[2] = var3
    if (var4) varsArray[3] = var4
    if (varsArray.length === 4) props.getInputData({vars: JSON.stringify(varsArray)})
    
    setIsChange((prev) => !prev)
  },[var1,var2,var3,var4])

  useEffect(() => {
    const trueAnswers = document.querySelectorAll(`input[type="checkbox"]:checked`)
    if (trueAnswers) {
      trueAnswers.forEach((answer) => {
        console.log(answer.value)
        if (!answersArray.includes(answer.value)) answersArray.push(answer.value)
      })
      props.getInputData({answer: JSON.stringify(answersArray)})
    }
  },[isChecked, isChange])

  const checkedHandler = (event) => {setIsChecked((prev) => !prev)}

  return (
    <React.Fragment>
      <CustomInput id = 'question-title' type = 'text' title = 'Question' 
      initialValue = {`${question.question ? question.question : ''}`}
        objectKey = 'question' errorMassage = 'incorrect'
        validateValue = {validate.emptyValidate}
        getInputData = {getInputData}/>
      
      <div className = {styles.container}>
        <input type = 'checkbox' name = {`checkbox`} id = 'question-checkbox1' value = {initialVars ? initialVars[0]: var1}
        className = {styles.checkbox} onChange = {checkedHandler}/>
        <label className = {styles.label} htmlFor = 'question-checkbox1'>
          <span className = {styles.customCheckbox}></span>
          <CustomInput id = 'question-var3' type = 'text' title = 'Var1' 
          initialValue = {`${initialVars ? initialVars[0] : ''}`} 
          objectKey = 'var1' errorMassage = 'incorrect'
          validateValue = {validate.emptyValidate}
          getInputData = {(value) => setVar1(value.var1)}/>
        </label>
      </div>

      <div className = {styles.container}>
        <input type = 'checkbox' name = {`checkbox`} id = 'question-checkbox2' value = {initialVars ? initialVars[1]: var2}
        className = {styles.checkbox} onChange = {checkedHandler}/>
        <label className = {styles.label} htmlFor = 'question-checkbox2'>
          <span className = {styles.customCheckbox}></span>
          <CustomInput id = 'question-var2' type = 'text' title = 'Var2' 
          initialValue = {`${initialVars ? initialVars[1] : ''}`} 
          objectKey = 'var2' errorMassage = 'incorrect'
          validateValue = {validate.emptyValidate}
          getInputData = {(value) => setVar2(value.var2)}/>
        </label>
      </div>

      <div className = {styles.container}>
        <input type = 'checkbox' name = {`checkbox`} id = 'question-checkbox3' value = {initialVars ? initialVars[2]: var3}
        className = {styles.checkbox} onChange = {checkedHandler}/>
        <label className = {styles.label} htmlFor = 'question-checkbox3'>
          <span className = {styles.customCheckbox}></span>
          <CustomInput id = 'question-var3' type = 'text' title = 'Var3' 
          initialValue = {`${initialVars ? initialVars[2] : ''}`} 
          objectKey = 'var3' errorMassage = 'incorrect'
          validateValue = {validate.emptyValidate}
          getInputData = {(value) => setVar3(value.var3)}/>
        </label>
      </div>

      <div className = {styles.container}>
        <input type = 'checkbox' name = {`checkbox`} id = 'question-checkbox4' value = {initialVars ? initialVars[3]: var4}
        className = {styles.checkbox} onChange = {checkedHandler}/>
        <label className = {styles.label} htmlFor = 'question-checkbox4'>
          <span className = {styles.customCheckbox}></span>
          <CustomInput id = 'question-var4' type = 'text' title = 'Var4' 
          initialValue = {`${initialVars ? initialVars[3] : ''}`} 
          objectKey = 'var4' errorMassage = 'incorrect'
          validateValue = {validate.emptyValidate}
          getInputData = {(value) => setVar4(value.var4)}/>
        </label>
      </div>      
        <CustomInput id = 'question-mark' type = 'number' title = 'Mark' 
        initialValue = {`${question.mark ? question.mark : ''}`}
          objectKey = 'mark' errorMassage = 'incorrect'
          validateValue = {validate.emptyValidate}
          getInputData = {getInputData}/>
    </React.Fragment>
  )
}

export default CreateCheckboxTypeQuestion