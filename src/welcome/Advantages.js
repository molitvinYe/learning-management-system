import React from 'react'
import {ReactComponent as AnaliticIcon} from '../../icons/analitic.svg'
import {ReactComponent as EffectiveIcon} from '../../icons/effective.svg'
import {ReactComponent as EasyIcon} from '../../icons/easy.svg'
import styles from './Advantages.module.css'

const Advantages = () => {
  return (
    <section className = {styles.container}>
      <div className = {styles.block}>
        <div className = {styles.info}>
          <h4 className = {styles.title}> Convenient and Efficient </h4>
          <p className = {styles.text}> One of the best features is that it becomes a centralized platform containing all the course material needed for any particular course. Having a single, well-managed database streamlines the learning experience for all the students. Students can upload assignments and take assessments, all from one platform.</p>
        </div>
        <div className = {styles.iconContainer}>
          <EasyIcon className={styles.icon}/>
        </div>
      </div>

      <div className = {styles.block}>
        <div className = {styles.info}>
          <h4 className = {styles.title}> Analytics Offer Unique Insights </h4>
          <p className = {styles.text}> Data is the currency which higher education institutions use to grow and improve themselves. LMS reporting enables its users to evaluate and analyze the data from each course and tailor it according to what the reports indicate. From knowing how well students are progressing in the course to time logs and assessment data, instructors can get to know exactly how their courses are being received. Knowing which courses are popular.</p>
        </div>
        <div className = {styles.iconContainer}>
          <AnaliticIcon className={styles.icon}/>
        </div>
      </div>

      <div className = {styles.block}>
        <div className = {styles.info}>
          <h4 className = {styles.title}> Easy Assessment and Grading Tools </h4>
          <p className = {styles.text}> A key advantage of having Learning Management Systems in education has been the ease with which instructors can assess their students` performance. Timed/Untimed tests and quizzes can be administered from the LMS and grading them can be automated and made even easier. Students can choose to take these assessments from anywhere.</p>
        </div>
        <div className = {styles.iconContainer}>
          <EffectiveIcon className={styles.icon}/>
        </div>
      </div>
    </section>
  )
}

export default Advantages