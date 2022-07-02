import React from 'react'
import Header from '../pageElements/Header'
import Social from '../pageElements/Social'
import FindUs from '../pageElements/FindUs'
import Author from '../pageElements/Author'
import FullScreenContainer from '../ui/FullScreenContainer'
import styles from './PageLayout.module.css'

const PageLayout = (props) => {
  return (
    <FullScreenContainer>
      <div className = {styles.container}>
        <Header/>
        <main className = {styles.main}>
          {props.children}
        </main>
        <footer className = {styles.footer}>
          <div className = {styles.footerContainer}>
            <Author/>
            <FindUs/>
            <Social/>
          </div>
        </footer>
      </div>
    </FullScreenContainer>
  )
}

export default PageLayout

