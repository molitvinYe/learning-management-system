import React, {useContext} from 'react'
import {ReactComponent as ExitIcon} from '../../icons/exit.svg'
import AuthContext from '../contexts/auth-context'
import styles from './ExitButton.module.css'

const ExitButton = () => {
  const authCtx = useContext(AuthContext)
  const exit = () => {
    authCtx.logout()
  }

  return (
    <button onClick={exit} className = {styles.button} title = 'exit'>
      <ExitIcon className = {styles.icon}/>
    </button>
  )
}

export default ExitButton