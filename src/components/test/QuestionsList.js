import React, {useState, useEffect, useRef, useContext} from 'react' 
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from 'react-router-dom';
import useHttp from '../../hooks/use-http';
import { Carousel } from 'react-responsive-carousel';
import NumberBlock from './NumberBlock';
import Question from './Question';
import styles from './QuestionsList.module.css'
import AuthContext from '../contexts/auth-context';
import { resultUrl } from '../../constants';
import '../../styles/carousel.css'


const QuestoinsList = (props) => {
  const questionsList = props.questions;
  const [trueAnswers, setTrueAnswers] = useState({})
  const authCtx = useContext(AuthContext)
  const [answers, setAnswers] = useState({});
  const [marks, setMarks] = useState({})
  const [violations, setViolations] = useState({})
  const [resultBody, setResultBody] = useState(null)

  const navigate = useNavigate()
  const {isLoading, error, sendRequest: postResult} = useHttp({
    url: resultUrl,
    method: 'POST',
    body: resultBody,
    headers: {
      "Content-Type": "application/json; charset=utf8"
    }
  }, (data) => {
    navigate(`/result/student/${data.id}`)
  })


  const itemRef = useRef()

  const isJsonString = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
  }

  useEffect(() => {
    if (questionsList) {
      const newTrueAnswers = {}
      const newMaks = {}
      questionsList.forEach( (question, index) => {
        if (isJsonString(question.answer)) {
          newTrueAnswers[index] = JSON.parse(question.answer)
        } else {
          newTrueAnswers[index] = question.answer
        }
        newMaks[index] = [question.mark]
      });
      setTrueAnswers({...newTrueAnswers})
      setMarks({...newMaks})
    }
  }, [questionsList])
  //const initialAnswers = JSON.parse(localStorage.getItem('answers'))
  

  const renderIndecator = (onClickHandler, isSelected, index, label) => {
    if(itemRef.current) {
      const parent = itemRef.current.parentElement
      const dots = document.getElementById('rightContainer')
      dots.insertBefore(parent, dots.firstChild);
    }
    
    return (
      <li
        className = {styles.item}
        onClick={onClickHandler}
        onKeyDown={onClickHandler}
        value={index}
        key={index}
        role="button"
        tabIndex={0}
        aria-label={`${label} ${index + 1}`}
        ref = {itemRef}>
          <NumberBlock 
            number = {index} 
            isSelected = {isSelected}/>
      </li>
    )
  }

  const getValue = (value, index) => {
    setAnswers({...answers, [index]: value}) 
  }

  const sendAnswers = (event) => {
    event.preventDefault()
    
    //makeBetter
    Object.entries(trueAnswers).map(([testNumber, trueAnswer]) => {
      const answer = typeof answers[testNumber] === "string" ? answers[testNumber] : JSON.stringify(answers[testNumber])
      if (answer === JSON.stringify(trueAnswer)) {
        marks[testNumber].push('true')
      } else {
        marks[testNumber].push('false')
      }
    })

    const timeSelector = document.querySelector('.time')
    const time = {
      testDuration: props.duration, 
      timeForTest: props.duration - timeSelector.textContent.slice(0,2)
    }

    const result = {
      id: `${Math.floor(Math.random() * 100000000)}`,
      student: authCtx.user.mail,
      groupa: authCtx.user.groupa,
      test: props.test,
      answers: JSON.stringify(answers),
      questions: JSON.stringify(questionsList),
      mark: JSON.stringify(marks),
      time: JSON.stringify(time),
      violations: JSON.stringify(violations)
    }
    setResultBody(result)
  }

  useEffect(() => {
    if(resultBody) {
      postResult()
    }
  },[resultBody])

  const addViolation = (type) => {
    const numberSelector = document.querySelector('.slide.selected .questionNumber')
    
    if (numberSelector) {
      const testNumber = numberSelector.dataset.number
      const newViolations = {...violations}
    if (newViolations[testNumber]) {
      if (newViolations[testNumber][type]) {
        const prevCount = newViolations[testNumber][type]
        newViolations[testNumber][type] = prevCount + 1
      } else {
        newViolations[testNumber] = {...newViolations[testNumber], [type]: 1}
      }
    } else {
      newViolations[testNumber] = {[type]: 1}
    }
    setViolations({...newViolations})
    }
  }

  const pasteHandler = (event) => {
    addViolation('pasteCount')
  }

  const copyHandler = (event) => {
    addViolation('copyCount')
  }

document.addEventListener("visibilitychange", function() {
  if (document.hidden){
    console.log('here')
    addViolation('hiddenCount')
  }
});

const keyupHendler = (event) => {
  if (event.code === 'PrintScreen') {
    addViolation('screenCount')
  }
}

const keydownHendler = (event) => {
  if ((event.shiftKey || event.metaKey) && event.code === 'KeyS') {
    addViolation('screenCount')
  }
  
}
  
  return (
    <form 
      className = {props.className} 
      onPaste = {pasteHandler} 
      onCopy = {copyHandler} 
      onSubmit = {sendAnswers} 
      onKeyUp = {keyupHendler} 
      onKeyDown={keydownHendler}>
      <Carousel 
        showThumbs={false} 
        showStatus = {false} 
        showIndicators = {true}
        useKeyboardArrows = {true}
        renderIndicator={renderIndecator}
        >
        {questionsList && questionsList.map((question, index) => {
          return <Question 
            question = {question} 
            key = {question.id} 
            questionNumber = {index}
            isLast = {questionsList.length === index + 1} 
            getValue = {getValue}
            sendAnswers = {sendAnswers}/>
        })}
      </Carousel>
    </form>
  )
}

export default QuestoinsList