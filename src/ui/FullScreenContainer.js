import React from 'react'
import styles from './FullScreenContainer.module.css'

const FullScreenContainer = (props) => {
  return <div className = {styles.container}>{props.children}</div>
}

export default FullScreenContainer