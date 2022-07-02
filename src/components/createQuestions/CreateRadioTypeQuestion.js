import React, {useEffect, useState} from 'react'
import CustomInput from '../formElements/CustomInput'
import { validate } from '../../constants'
import RadioAnswer from '../answers/RadioAnswer'
import styles from './CreateRadioTypeQuestion.module.css'

const CreateRadioTypeQuestion = (props) => {
  const getInputData =  (value) => props.getInputData(value)
  const question = props.initialData
  let initialVars = null
  
  if (Object.keys(question).length !== 0) {
    initialVars = JSON.parse(question.vars)
  }
  
  useEffect(() => {
    if(initialVars) {
      const inputs = document.querySelectorAll(`input[type="radio"]`)
      initialVars.map((initialVar, index) => {
        if (initialVar === question.answer) {inputs.item(index).checked = 'true'}
      })
    }
  },[])

  const [var1, setVar1] = useState('')
  const [var2, setVar2] = useState('')
  const [var3, setVar3] = useState('')
  const [var4, setVar4] = useState('')
  const varsArray = []

  useEffect(() => {
    const trueAnswer = document.querySelector(`input[type="radio"]:checked`)
    if (trueAnswer) props.getInputData({answer: trueAnswer.value})
    if (var1) varsArray[0] = var1
    if (var2) varsArray[1] = var2
    if (var3) varsArray[2] = var3
    if (var4) varsArray[3] = var4
    if (varsArray.length === 4) props.getInputData({vars: JSON.stringify(varsArray)})
  },[var1,var2,var3,var4])

  const checkedHandler = (event) => {props.getInputData({answer: event.target.value})}  

  return (
    <React.Fragment>
      <CustomInput id = 'question-title' type = 'text' title = 'Question' 
        initialValue = {`${question.question ? question.question : ''}`}
        objectKey = 'question' errorMassage = 'incorrect'
        validateValue = {validate.emptyValidate}
        getInputData = {getInputData}/>
      
      <div className = {styles.container}>
        <input type = 'radio' name = {`radio`} id = 'question-radio1' value = {initialVars ? initialVars[0]: var1}
        className = {styles.radio} onChange = {checkedHandler}/>
        <label className = {styles.label} htmlFor = 'question-radio1'>
          <span className = {styles.customRadio}></span>
          <CustomInput id = 'question-var1' type = 'text' title = 'Var1' 
          initialValue = {`${initialVars ? initialVars[0] : ''}`}
          objectKey = 'var1' errorMassage = 'incorrect'
          validateValue = {validate.emptyValidate}
          getInputData = {(value) => setVar1(value.var1)}/>
        </label>
      </div>

      <div className = {styles.container}>
        <input type = 'radio' name = {`radio`} id = 'question-radio2' value = {initialVars ? initialVars[1]: var2}
        className = {styles.radio} onChange = {checkedHandler}/>
        <label className = {styles.label} htmlFor = 'question-radio2'>
          <span className = {styles.customRadio}></span>
          <CustomInput id = 'question-var2' type = 'text' title = 'Var2' 
          initialValue = {`${initialVars ? initialVars[1] : ''}`}
          objectKey = 'var2' errorMassage = 'incorrect'
          validateValue = {validate.emptyValidate}
          getInputData = {(value) => setVar2(value.var2)}/>
        </label>
      </div>

      <div className = {styles.container}>
        <input type = 'radio' name = {`radio`} id = 'question-radio3' value = {initialVars ? initialVars[2]: var3}
        className = {styles.radio} onChange = {checkedHandler}/>
        <label className = {styles.label} htmlFor = 'question-radio3'>
          <span className = {styles.customRadio}></span>
          <CustomInput id = 'question-var3' type = 'text' title = 'Var3'
          initialValue = {`${initialVars ? initialVars[2] : ''}`} 
          objectKey = 'var3' errorMassage = 'incorrect'
          validateValue = {validate.emptyValidate}
          getInputData = {(value) => setVar3(value.var3)}/>
        </label>
      </div>

      <div className = {styles.container}>
        <input type = 'radio' name = {`radio`} id = 'question-radio4' value = {initialVars ? initialVars[3]: var4}
        className = {styles.radio} onChange = {checkedHandler}/>
        <label className = {styles.label} htmlFor = 'question-radio4'>
          <span className = {styles.customRadio}></span>
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

export default CreateRadioTypeQuestion