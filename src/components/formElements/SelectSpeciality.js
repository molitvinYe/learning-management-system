import React, {useState, useEffect} from 'react' 
import styles from './SelectInput.module.css'

const SelectSpeciality = (props) => {
  const [isVisible, setIsVisible] = useState(false)
  const [value, setValue] = useState(null)
  const list = props.specialityList

  useEffect(() => {
    if (list) {
      const isValueInList = list.some((item) =>  item.shortName === value)
      if (!isValueInList) setValue(null)
    }
  },[list])

  const changeVisible = () => {
    setIsVisible((prev) => !prev)
  }

  const chooseItem = (event) => {
    const itemValue = JSON.parse(event.target.dataset.item)
    props.getInputData({[`${props.objectKey}`]: itemValue})
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
                onClick = {chooseItem} 
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

export default SelectSpeciality