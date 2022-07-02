import React from 'react' 
import styles from './WelcomeTitles.module.css'

const WelcomeTitles = () => {
  return (
    <React.Fragment>
      <h2 className = {styles.slogan}>Learning is never done without errors and defeat</h2>
      <h1 className = {styles.title}>MoliTest is a modern learning management system</h1>
    </React.Fragment>
  )
}

export default WelcomeTitles