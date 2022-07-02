import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Menu.module.css'

const Menu  = () => {
  return (
    <nav className = {styles.navigation}>
      <ul className = {styles.list}>
        <li className = {styles.item}>
          <NavLink to = '/courses' className = {(navData) => navData.isActive ? `${styles.link} + ${styles.active}` : styles.link}>
            Courses
          </NavLink>
        </li>
        <li className = {styles.item}>
          <NavLink to = '/profile' className = {(navData) => navData.isActive ? `${styles.link} + ${styles.active}` : styles.link}>
            Profile
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Menu