import React, {useEffect} from 'react'
import CustomInput from '../formElements/CustomInput'
import { validate } from '../../constants'

const CreateTextTypeQuestion = (props) => {
  const getInputData =  (value) => props.getInputData(value)
  const question = props.initialData

  return (
    <React.Fragment>
        <CustomInput id = 'question-title' type = 'text' title = 'Question' 
          initialValue = {`${question.question ? question.question : ''}`}
          objectKey = 'question' errorMassage = 'incorrect'
          validateValue = {validate.emptyValidate}
          getInputData = {getInputData}
        />
        <CustomInput id = 'question-answer' type = 'text' title = 'Answer' 
          initialValue = {`${question.answer ? question.answer : ''}`}
          objectKey = 'answer' errorMassage = 'incorrect'
          validateValue = {validate.emptyValidate}
          getInputData = {getInputData}/>
        <CustomInput id = 'question-mark' type = 'number' title = 'Mark' 
          initialValue = {`${question.mark ? question.mark : ''}`}
          objectKey = 'mark' errorMassage = 'incorrect'
          validateValue = {validate.emptyValidate}
          getInputData = {getInputData}/>
    </React.Fragment>
  )
}

export default CreateTextTypeQuestion