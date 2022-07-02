import React, {useEffect, useState, useRef} from 'react'
import Countdown from "react-countdown";
import { useParams } from 'react-router-dom' 
import Container from '../ui/Container'
import QuestoinsList from './QuestionsList'
import useHttp from '../../hooks/use-http';
import styles from './Test.module.css'
import { questionUrl, httpUrl } from '../../constants';
//plans 29: do test secions
//number of test
//time
//notes 

const Test = () => {
  const params = useParams()
  const [questions, setQuestions] = useState(null)
  const [testDuration, setTestDuration] = useState(null)

  const {isLoading, error, sendRequest: getQuestions} = useHttp({
    url: `${questionUrl}/test/${params.id}`,
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  }, (data) => {setQuestions(data)})

  const {isLoading: isTestLoading, error: testError, sendRequest: getTest} = useHttp({
    url: `${httpUrl}/test/${params.id}`,
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  }, (data) => {setTestDuration(data.duration)})

  useEffect(() => {
    getQuestions()
    getTest()
  }, [])  
  
  
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span>time end</span>;
    } else {
      return (
        <React.Fragment>
          <span>Time left:</span>
          <span className = 'time'>{hours*60 + minutes}:{seconds}</span>
        </React.Fragment>)
    }
  };

  return (
    <Container className = {styles.container}>
        <div className = {styles.main}>
          <QuestoinsList 
            className = {styles.main_left}
            questions = {questions}
            test = {params.id}
            duration = {testDuration}
          />
          <div className = {styles.main_right} id = 'rightContainer'>
          <ul className = {styles.list}></ul>
          <div className = {styles.timeContainer}>
            {testDuration &&
              <Countdown date={Date.now() + testDuration*60*1000} renderer = {renderer}/>
            }
          </div>
          </div>
        </div>
    </Container>
  )
}

export default Test

