import React, {useState, useEffect} from 'react'
import styles from './SubjectCard.module.css'

const SubjectCard = (props) => {
  return (
      <div className = {styles.card}>
        <div className = {styles.front}>
          <h3 className = {styles.title}>{props.name}</h3>
        </div>
        <div className = {styles.back}>
          {props.children}
        </div>
      </div>
  )
}

export default SubjectCard