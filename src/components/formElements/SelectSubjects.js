import React, {useState, useEffect, useRef} from 'react' 
import styles from './SelectInput.module.css'

const SelectSubjects = (props) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isActive, setIsAvtive] = useState(false)
  const [value, setValue] = useState([])
  const list = props.subjectList

useEffect(() => {
    if (list) {
      const isValueInList = list.some((item) => {return item.shortName === value})
      if (!isValueInList) setValue([])
    }
  },[list])

  const changeHandler = () => {
    setIsVisible((prev) => !prev)
    setIsAvtive((prev) => !prev)
  }

  const confirmHandler = () => {
    changeHandler()
    props.getInputData({[`${props.objectKey}`]: value})
  }

  const chooseItem = (event) => {
    const idValue = event.target.dataset.id
    const currentItem = document.querySelector(`[data-id~="${idValue}"]`);
    currentItem.classList.toggle(`${styles.active}`)
    const newValue = [...value]
    if (newValue.includes(idValue)) {
      const filtered = newValue.filter(id => id !== idValue)
      setValue(filtered)    
    } else {
      newValue.push(idValue)
      setValue(newValue)
    }
    
  }

  return (
    <div className = {styles.container}>
      <h3 className = {styles.title}>{props.title}</h3>
      {isActive && 
        <span onClick = {confirmHandler} className = {styles.input}>
          click to confirm
        </span>
      }
      {!isActive && 
        <span onClick = {changeHandler} className = {styles.input}>
          {value.length === 0 ? 'click to choose': `subjects is choosed`}
        </span>
      }
      {isVisible && 
        <ul className = {styles.list}>
          {list.map((item, index) => {
            return (
              <li key = {index} 
                onClick = {chooseItem} 
                data-id = {item.id}
                className = {value.includes(item.id) ? 
                  styles.item + ' ' + styles.active : 
                  styles.item
                }>
                  {item.name}
              </li>
            )
          })}
        </ul>
      }
    </div>
  )
}

export default SelectSubjects