import React from 'react'
import Social from '../pageElements/Social'
import FindUs from '../pageElements/FindUs'
import Author from '../pageElements/Author'
import styles from './WelcomeFooter.module.css'

const WelcomeFooter = () => {
  return (
    <footer className = {styles.footer}>
        <Author/>
        <FindUs/>
        <Social/>
    </footer>
  )
}

export default WelcomeFooter