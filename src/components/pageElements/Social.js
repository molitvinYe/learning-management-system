import React from 'react' 
import styles from './Social.module.css'
import {ReactComponent as Inst} from '../../icons/inst.svg'
import {ReactComponent as Facebook} from '../../icons/facebook.svg'
import {ReactComponent as Twiter} from '../../icons/twitter.svg'
import {ReactComponent as Telegram} from '../../icons/telegram.svg'

const Social = () => {
  return (
    <div className = {styles.social}>
      <Inst className = {styles.icon}/>
      <Facebook className = {styles.icon}/>
      <Telegram className = {styles.icon}/>
      <Twiter className = {styles.icon}/>
    </div>
  )
}

export default Social