import React, {useState} from 'react'
import ReactDom from 'react-dom'
import {ReactComponent as CloseIcon} from '../../icons/close.svg'
import styles from './ModalLayout.module.css' 

const ModalContent = (props) => {
  const closeHandler = (event) => {
    const targetClassName = event.target.className
    const isContainer = targetClassName === `${styles.container}`
    const isClose = targetClassName.baseVal === `${styles.close}`
    if (isContainer || isClose) {
      props.changeVisible()
    }
  }

  return (
    <div className = {styles.container} onClick = {closeHandler}>
      <div className = {styles.modal}>
        <div className = {styles.content}>
          <CloseIcon className = {styles.close}></CloseIcon>
          {props.children}
        </div>
        </div>
    </div>
    )
}

const ModalLayout = (props) => {
  return (
    <React.Fragment>
      {ReactDom.createPortal(
        <ModalContent children = {props.children} changeVisible = {props.changeVisible}/>, 
        document.getElementById('modal-root'))
      }
    </React.Fragment>
  )
}

export default ModalLayout