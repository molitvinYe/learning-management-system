import React, {useState, useEffect} from 'react'
import styles from './TextAnswer.module.css' 

const TextAnswer = (props) => {
  const index = props.questionNumber
  const [value, setValue] = useState('')

  useEffect(() => {
    const identifier = setTimeout(() => {
      if (!!value) props.getValue(value, index)
    }, 500)

    return (() => clearTimeout(identifier))
  }, [value])


  const changeHandler = (event) => {
    setValue(event.target.value)
  }

  return (
    <React.Fragment>
      <input type = 'text' onChange = {changeHandler} className = {styles.input}/>
    </React.Fragment>
  )
}

export default TextAnswer