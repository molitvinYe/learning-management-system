import React, {useState, useEffect} from 'react'
import useHttp from '../../hooks/use-http'
import styles from './CreateQuestionsForm.module.css'
import CreateTextTypeQuestion from './CreateTextTypeQuestion'
import CreateCheckboxTypeQuestion from './CreateCheckboxTypeQuestion'
import CreateRadioTypeQuestion from './CreateRadioTypeQuestion'
import CreateMatchTypeQuestion from './CreateMatchTypeQuestion'
import { questionUrl } from '../../constants'
import { useParams } from 'react-router-dom'

const CreateQuestionsForm = (props) => {
  let initialData = props.initialData
  const initialType = initialData.type ? props.initialData.type : 'text'
  const [type, setType] = useState(initialType)
  const params = useParams()

  const initialQuestionData = {
    id: "id",
    testId: params.id,
    type: type,
    vars: type === 'text' ? "[]" : null,
    ...initialData
  }
  
  const [questionData, setQuestionData] = useState(initialQuestionData)
  //const editData = props.initialData

  const getType = (event) => {
    setType(event.target.value)
    setQuestionData({...initialQuestionData, type: event.target.value})
  }

  const getInputData =  (value) => setQuestionData({...questionData, ...value})

  const {
    isLoading, 
    error, 
    sendRequest: addQuestionToTest} = useHttp({
      url: questionUrl,
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=utf8"
      },
      body: questionData
  }, (data) => {
    props.getQuestionData(data)
})

  const submitHandler = (event) => {
    event.preventDefault()
    //formed data .then
    addQuestionToTest()
    window.location.reload()
  }

  return (
        <form className = {styles.form} onSubmit = {submitHandler}>
          <h3 className = {styles.title}>Create question</h3>
          <h4 className = {styles.selectTitle}>Choose type of question</h4>
          <select onChange={getType} className = {styles.select} value = {type}>
            <option value = 'text'>text</option>
            <option value = 'radio'>radio</option>
            <option value = 'checkbox'>checkbox</option>
            <option value = 'match'>match</option>
          </select>
          {type === 'text' && <CreateTextTypeQuestion getInputData = {getInputData} initialData = {initialData}/>}
          {type === 'checkbox' && <CreateCheckboxTypeQuestion getInputData = {getInputData} initialData = {initialData}/>}
          {type === 'radio' && <CreateRadioTypeQuestion getInputData = {getInputData} initialData = {initialData}/>}
          {type === 'match' && <CreateMatchTypeQuestion getInputData = {getInputData} initialData = {initialData}/>}
          <button className = {styles.button}>Add</button>
        </form>
  )
}

export default CreateQuestionsForm