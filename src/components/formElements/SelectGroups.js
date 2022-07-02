import React, {useState, useEffect, useRef} from 'react' 
import styles from './SelectInput.module.css'

const SelectGroups = (props) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isActive, setIsAvtive] = useState(false)
  const [isSelected, setIsSelected] = useState(false)
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
    //setIsVisible((prev) => !prev)
    //setIsAvtive((prev) => !prev)
    setIsSelected(true)
    props.getInputData({[`${props.objectKey}`]: JSON.stringify(value)})
  }

  const chooseItem = (event) => {
    const group = event.target.dataset.group
    const currentItem = document.querySelector(`[data-group~="${group}"]`);
    currentItem.classList.toggle(`${styles.active}`)
    const newValue = [...value]
    if (newValue.includes(group)) {
      const filtered = newValue.filter(id => id !== group)
      setValue(filtered)    
    } else {
      newValue.push(group)
      setValue(newValue)
    }
  }

  return (
    <div className = {styles.container}>
      <h3 className = {styles.title}>{props.title}</h3>
      {(isActive && isVisible) &&
        <span onClick = {confirmHandler} className = {styles.input}>
          click to confirm
        </span>
      }
      {(!isActive && !isVisible) &&
        <span onClick = {changeHandler} className = {styles.input}>
          {isSelected ? 'groups is selected' : 'click to choose'}
        </span>
      }
      {isVisible && 
        <ul className = {styles.list}>
          {list.map((item, index) => {
            return (
              <li key = {index} 
                onClick = {chooseItem} 
                data-group = {item}
                className = {value.includes(item) ? 
                  styles.item + ' ' + styles.active : 
                  styles.item
                }>
                  {item}
              </li>
            )
          })}
        </ul>
      }
    </div>
  )
}

export default SelectGroups