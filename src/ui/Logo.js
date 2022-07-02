import React from 'react'
import {ReactComponent as LogoIcon} from '../../icons/logo.svg'
import styles from './Logo.module.css'

const Logo = () => {
  return (
    <div className = {styles.container}>
      <LogoIcon className = {styles.icon}/>
      <span className = {styles.text}>MoliTest</span>
    </div>
  )
}

export default Logo