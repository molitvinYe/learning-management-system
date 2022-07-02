import React, {useState, useRef, useEffect} from 'react'
import styles from './NumberBlock.module.css'

const NumberBlock = (props) => {
  const number = props.number
  const isSelected = props.isSelected

  let itemStyles = styles.block
  if (isSelected) itemStyles += ' ' + styles.current

  return (
    <div className = {itemStyles} id = {`number${number}`}>
      <span className = {styles.text}>{number + 1}</span>
    </div>)
}

export default NumberBlock