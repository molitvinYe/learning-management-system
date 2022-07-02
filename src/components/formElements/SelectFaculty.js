import React, {useState, useEffect} from 'react' 
import styles from './SelectInput.module.css'

const SelectFaculty = (props) => {
  const [isVisible, setIsVisible] = useState(false)
  const [value, setValue] = useState(null)
  const list = props.facultyList

  const changeVisible = () => {
    setIsVisible((prev) => !prev)
  }

  const selectItem = (event) => {
    const itemValue = JSON.parse(event.target.dataset.item)
    props.getInputData({[`${props.objectKey}`]: itemValue})
    props.changeList(itemValue.shortName)
    setValue(itemValue)
    changeVisible()
  }

  return (
    <div className = {styles.container}>
      <h3 className = {styles.title}>{props.title}</h3>
      <span onClick = {changeVisible} className = {styles.input}>
        {value ? value.shortName : `click to choose`}
      </span>
      {isVisible && 
        <ul className = {styles.list}>
          {list.map((item, index) => {
            return (
              <li 
                key = {index} 
                onClick = {selectItem} 
                data-item = {JSON.stringify(item)}
                className = {styles.item}>
                  {item.fullName}
              </li>
            )
          })}
        </ul>
      }
    </div>
  )
}

export default SelectFaculty