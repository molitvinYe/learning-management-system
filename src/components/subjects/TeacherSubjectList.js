import React, {useState, useContext, useEffect} from 'react' 
import { Link } from 'react-router-dom'
import AuthContext from '../contexts/auth-context'
import Container from '../ui/Container'
import { teacherUrl, subjectUrl} from '../../constants'
import SubjectCard from './SubjectCard'
import styles from './SubjectList.module.css'
import useHttp from '../../hooks/use-http'
import TeacherTestListForSubject from './TeacherTestListForSubject'
import {ReactComponent as AddIcon} from '../../icons/add.svg'
import LoadingSpinner from '../ui/LoadingSpinner'


const TeacherSubjectList = () => {
  const authCtx = useContext(AuthContext);
  const [subjectList, setSubjectList] = useState([])
  const [subjectIdList, setSubjectIdList] = useState([])
  const [subject, setSubject] = useState(null)
  const [url, setUrl] = useState('')
  const email = authCtx.user.mail.replace('@', '%40')

  const {
    isLoading: listForTeacherIsLoading,
    error: listForTeacherError,
    sendRequest: getSubjectsForTeacher} = useHttp({
    url: `${teacherUrl}/mail/${email}/subjects`,
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  }, (data) => {setSubjectIdList([...data])})

  const {
    isLoading: subjectIsLoading,
    error: subjectError,
    sendRequest: getSubjectById} = useHttp({
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  }, (data) => {  setSubject(data)})

  useEffect(  () => {
    if (subjectIdList.length !== 0) {
      console.log(subjectIdList)
      const getSubs = async () => {
        for (let i = 0; i<subjectIdList.length; i++) {
          await getSubjectById(`${subjectUrl}/${subjectIdList[i]}`)
        }
      }
      getSubs()
    }
    return () => {}
  }, [subjectIdList])

  useEffect(() => {
    console.log('start')
    getSubjectsForTeacher()
    return () => {}
  }, [])

  useEffect(() => {
    if (subject) {
      const newSubjectList = [...subjectList]
      newSubjectList.push(subject)
      setSubjectList([...newSubjectList])
    }
    return () => {}
  }, [subject])

  return (
    <Container>
      {subjectIsLoading ? <LoadingSpinner/> :
        <ul className = {styles.list}>
          <li className = {styles.item + ' ' + styles.createItem}>
            <SubjectCard name = {<AddIcon className = {styles.icon}/>}>
              <Link to = {`/subjects/createSubject`} className =  {styles.createLink}>Create subject</Link>
            </SubjectCard>
        </li>
        {(subjectIdList.length !== 0 && subjectList.length === subjectIdList.length) && 
          subjectList.map((subject) => {
            return (
              <li className = {styles.item} key = {subject.id}>
                <SubjectCard name = {subject.name}>
                  <TeacherTestListForSubject subject = {subject.id}/>
                  <Link to = {`/test/createTest/${subject.id}`} className =  {styles.createTest}>Create test</Link>
                </SubjectCard>
              </li>)
            })}
        </ul>
      }
      
    </Container>
  )
}

export default TeacherSubjectList