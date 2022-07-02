import React, {useState, useEffect} from 'react' 
import { useParams } from 'react-router-dom'
import { resultUrl } from '../../constants'
import useHttp from '../../hooks/use-http'
import Container from '../ui/Container'
import TextResultItem from './TextResultItem'
import RadioResult from './RadioResult'
import CheckboxResult from './CheckboxResult'
import MatchResult from './MatchResult'
import styles from './StudentResult.module.css'

const StudentResult = () => {
  const params = useParams()
  const resultId = params.resultId
  const [result, setResult] = useState(null)
  const [answers, setAnswers] = useState(null)
  const [questions, setQuestions] = useState(null)
  const [marks, setMarks] = useState(null)
  const [maxMark,setMaxMark] = useState(null)
  const [yourMark,setYourMark] = useState(null)
  const {isLoading, error, sendRequest: getResult} = useHttp({
    url: `${resultUrl}/${resultId}`,
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  }, (data) => {setResult(data)})
  
  useEffect(() => {
    getResult()
    return () => {}
  }, [])

  useEffect(() => {
    if (result) {
      setMarks(JSON.parse(result.mark))
      setAnswers(JSON.parse(result.answers))
      let maxResult = 0
      let yourMark = 0
      {Object.values(JSON.parse(result.mark)).map((mark) => {
        maxResult += +mark[0]
        if (mark[1] === 'true') yourMark+= +mark[0]
      })}
      setYourMark(yourMark)
      setMaxMark(maxResult)
      setQuestions(JSON.parse(result.questions))
    }
    return () => {}
  }, [result])  

  return (
    <Container className = {styles.container}>
      {questions &&
          <ul className = {styles.list}>
            <li className = {yourMark/maxMark*100 >= 60 ? styles.goodMark : styles.badMark}>Your result: {yourMark}/{maxMark}</li>
            {Object.values(questions).map((question,index) => {
              return <li key = {index} className = {styles.item}>
                {question.type === 'text' &&
                  <TextResultItem question = {question} mark = {marks[index]} answer = {answers[index]} number = {index+1}/>
                }
                {question.type === 'radio' &&
                  <RadioResult question = {question} mark = {marks[index]} answer = {answers[index]} number = {index+1}/>
                }
                {question.type === 'checkbox' &&
                  <CheckboxResult question = {question} mark = {marks[index]} answer = {answers[index]} number = {index+1}/>
                }
                {question.type === 'match' &&
                    <MatchResult question = {question} mark = {marks[index]} answer = {JSON.stringify(answers[index])} number = {index+1}/>
                }
              </li>
            })}
          </ul>
      }
    </Container>

  )
}

export default StudentResult