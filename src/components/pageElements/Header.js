import React from 'react'
import Logo from '../ui/Logo'
import Menu from './Menu'
import ExitButton from './ExitButton'
import Container from '../ui/Container'
import styles from './Header.module.css'

const Header = () => {
  return (
    <header className = {styles.header}>
      <Container className = {styles.container}>
        <Logo/>
        <Menu/>
        <ExitButton/>
      </Container>
    </header>
  )
}

export default Header