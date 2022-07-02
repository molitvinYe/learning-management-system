import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom' 
import useHttp from '../../hooks/use-http'
import { resultUrl } from '../../constants'
import Container from '../ui/Container'
import AnalisesResultRow from './AnalisesResultRow'
import styles from './TableResult.module.css'
import AnalisesTitle from './AnalisesTitle'
import LoadingSpinner from '../ui/LoadingSpinner'

const AnalisesResult = () => {
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
        <table className = {styles.table}>
        <tbody>
          {result &&
            <AnalisesTitle result = {result[0]} getMark = {getMark}/>
          }          
          {result && 
            <React.Fragment>
              {result.map((studentResult,index) => {
                return <AnalisesResultRow key = {index} studentResult = {studentResult} mark = {mark}/>
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

export default AnalisesResult
