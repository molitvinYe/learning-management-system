import React, {useState, useEffect} from 'react'
import styles from './CustomInput.module.css'

const CustomInput = (props) => {
  const [value, setValue] = useState('')
  const [hasError, setHasError] = useState(false)
  const [valueIsValid, setValueIsValid] = useState(false)
  const [isTouched, setIsTouched] = useState(false)

  useEffect(() => {
    const identifier = setTimeout(() => {
      props.validateValue(value) ? setValueIsValid(true) : setValueIsValid(false)
      setHasError(!props.validateValue(value) && isTouched)
      if(isTouched && valueIsValid && !hasError) props.getInputData({[`${props.objectKey}`] : value})
    }, 500)
    
    return (() => clearTimeout(identifier))
  }, [value, valueIsValid, hasError])

  useEffect(() => {
    if (props.initialValue) {
      setValue(props.initialValue)
    }
  }, [])

  const changeHandler = (event) => {
    setValue(event.target.value)
  }

  const focusHandler = (event) => {
    if (!isTouched) setIsTouched(true)
  }

  return (
    <div className = {`${styles.inputContainer} ${props.isInRaw ? styles.inputContainerInRaw : ''}`}>
        <label htmlFor={props.id} className = {styles.inputTitle}>
          {props.title}
          {hasError && <span className = {styles.error}>{props.errorMassage}</span>}
        </label>
        <input type={props.type} id={props.id} className = {styles.input} onChange = {changeHandler} onFocus = {focusHandler} value = {value}/>
    </div>
  )
}

export default CustomInput