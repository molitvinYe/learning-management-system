import React from 'react'
import styles from './WelcomeLayout.module.css'
import WelcomeHeader from '../welcome/WelcomeHeader'
import WelcomeFooter from '../welcome/WelcomeFooter'


const WelcomeLayout = (props) => {
  return (
    <section className = {styles.container}>
      <WelcomeHeader auth = {props.auth}/>
      <main className = {styles.main}>
        {props.children}
      </main>
      <WelcomeFooter/>
    </section>
  )
}

export default WelcomeLayout