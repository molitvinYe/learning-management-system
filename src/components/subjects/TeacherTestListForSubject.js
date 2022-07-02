import React, {useState, useEffect} from 'react' 
import useHttp from '../../hooks/use-http'
import TeacherTestItem from './TeacherTestItem'
import { testListBySubject } from '../../constants'
import styles from './SubjectTestList.module.css'

const TeacherTestListForSubject = (props) => {
  const [testList, setTestList] = useState(null)

  const {isLoading, error, sendRequest: getTestList} = useHttp({
    url: `${testListBySubject}/${props.subject}`,
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  }, (data) => {setTestList(data)})

  useEffect(() => {
    getTestList()
  }, [])

  return (
    <ul className = {styles.list}>
      {testList && testList.map((test) => {
        if (test.isAvailable) {
          return (
            <li key = {test.id} className = {styles.item}>
              <TeacherTestItem 
                id = {test.id}
                name = {test.name}
                date = {JSON.parse(test.date)}
                startTime = {JSON.parse(test.startTime)}
                endTime = {JSON.parse(test.endTime)}
                duration = {test.duration}
                test = {test}/>
            </li>
          )}
      })}
    </ul>
  )
}

export default TeacherTestListForSubject