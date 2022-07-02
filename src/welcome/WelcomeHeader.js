import React from 'react' 
import { Link } from 'react-router-dom'
import styles from './WelcomeHeader.module.css'
import Logo from '../ui/Logo'

const WelcomeHeader = (props) => {
  return (
    <header className = {styles.header}>
        <Logo/>
        <div className = {styles.linkContainer}>
          {props.auth === 'login' && <Link to = '/register/student' className = {styles.link}>Sign Up</Link>}
          {props.auth === 'register' && <Link to = '/login/student' className = {styles.link}>Log In</Link>}
        </div>
      </header>
  )
}

export default WelcomeHeader