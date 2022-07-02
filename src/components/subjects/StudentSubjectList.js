import React, {useState, useContext, useEffect} from 'react' 
import AuthContext from '../contexts/auth-context'
import Container from '../ui/Container'
import { studentUrl } from '../../constants'
import SubjectCard from './SubjectCard'
import styles from './SubjectList.module.css'
import useHttp from '../../hooks/use-http'
import LoadingSpinner from '../ui/LoadingSpinner'
import StudentTestListForSubject from './StudentTestListForSubject'

const StudentSubjectList = () => {
  const authCtx = useContext(AuthContext);
  const email = authCtx.user.mail
  const [subjectList, setSubjectList] = useState(null)

  const {isLoading, error, sendRequest: getSubjectsForStudent} = useHttp({
      url: `${studentUrl}/mail/${email}/subjects`,
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
  }, (data) => {setSubjectList(data)})
    
  useEffect(() => {
    getSubjectsForStudent()
    return () => {}
  }, [])

  return (
    <Container>
      {isLoading ? <LoadingSpinner/> :
        <ul className = {styles.list}>
          {subjectList && subjectList.map((subject) => {
            return (
              <li className = {styles.item} key = {subject.id}>
                <SubjectCard name = {subject.name}>
                  <StudentTestListForSubject subject = {subject.id}/>
                </SubjectCard>
              </li>)
          })}
        </ul>}
    </Container>
  )
}

export default StudentSubjectList