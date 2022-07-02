import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom' 
import useHttp from '../../hooks/use-http'
import { resultUrl } from '../../constants'
import Container from '../ui/Container'
import StudentResultRow from './StudentResultRow'
import styles from './TableResult.module.css'
import StudentTitleResult from './StudentTitleResult'
import LoadingSpinner from '../ui/LoadingSpinner'

const StudentTableResult = () => {
  const [result, setResult] = useState(null)
  const [mark, setMark] = useState(null)
  const params = useParams()
  const testId = params.testId

  const {isLoading, error, sendRequest: getResultByTest} = useHttp({
    url: `${resultUrl}/test/${testId}`,
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  },(data) => {setResult(data)})

  useEffect(() => {
    getResultByTest()
    return () => {}
  }, [])

  const getMark = (mark) => {
    setMark(mark)
  }

  return (
    <Container className = {styles.container}>
      <h2>Result of test</h2>
      {isLoading ? <LoadingSpinner/> :
      <React.Fragment>
        <Link to = {`/result/analises/${testId}`}>Get analises</Link>
        <table className = {styles.table}>
        <tbody>
          {result &&
            <StudentTitleResult result = {result[0]} getMark = {getMark}/>
          }          
          {result && 
            <React.Fragment>
              {result.map((studentResult,index) => {
                return <StudentResultRow key = {index} studentResult = {studentResult} mark = {mark}/>
              })}
            </React.Fragment>
          }
        </tbody>
      </table>
      </React.Fragment>
      }
    </Container>
  )
}

export default StudentTableResult
