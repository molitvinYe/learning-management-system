import React, {useState, useEffect} from 'react' 
import useHttp from '../../hooks/use-http'
import StudentTestItem from './StudentTestItem'
import { testListBySubject } from '../../constants'
import styles from './SubjectTestList.module.css'

const StudentTestListForSubject = (props) => {
  const [testList, setTestList] = useState(null)

  const {isLoading, error, sendRequest: getTestList} = useHttp({
    url: `${testListBySubject}/${props.subject}`,
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  }, (data) => {setTestList(data)})

  useEffect(() => {
    getTestList()
    return () => {}
  }, [])

  return (
    <ul className = {styles.list}>
      {testList && testList.map((test) => {
        if (test.isAvailable) {
          return (
            <li key = {test.id} className = {styles.item}>
              <StudentTestItem 
                id = {test.id}
                name = {test.name}
                date = {JSON.parse(test.date)}
                startTime = {JSON.parse(test.startTime)}
                endTime = {JSON.parse(test.endTime)}
                duration = {test.duration}/>
            </li>
          )}
      })}
    </ul>
  )
}

export default StudentTestListForSubject