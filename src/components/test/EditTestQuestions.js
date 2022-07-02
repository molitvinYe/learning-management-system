import React, {useState, useEffect} from 'react' 
import { useParams } from 'react-router-dom'
import { questionUrl } from '../../constants'
import useHttp from '../../hooks/use-http'
import CreateQuestionsForm from '../createQuestions/CreateQuestionsForm'
import TestView from '../testView/TestView'
import Container from '../ui/Container'
import styles from './EditTestQuestions.module.css'

const EditTestQuestions = () => {
  const [questionsList, setQuestionsList] = useState([])
  const [initialData, setInitialData] = useState({})
  const params = useParams()
  const [reload, setReload] = useState(false)
  const getQuestionData = (question) => {
    const newQuestionsList = [...questionsList]
    newQuestionsList.push(question)
    setQuestionsList([...newQuestionsList])
    setReload(true)
  }

  useEffect(() => {
    return () => setReload(false)
  },[reload])

  useEffect(() => {
    getQuestions()
  }, [])  

  const {isLoading, error, sendRequest: getQuestions} = useHttp({
    url: `${questionUrl}/test/${params.id}`,
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  }, (data) => {setQuestionsList([...data])})

  const getInitialValue = (question) => {
    setInitialData(question)
    setReload(true)
  }

  return (
    <Container className = {styles.container}>
      <section className = {styles.section}>
        {!reload && <CreateQuestionsForm getQuestionData = {getQuestionData} initialData = {initialData}/>}
      </section>
      <section className = {styles.section}>
        {!reload && <TestView questions = {questionsList} getInitialValue = {getInitialValue}/>}
      </section>
    </Container>
  )
}

export default EditTestQuestions