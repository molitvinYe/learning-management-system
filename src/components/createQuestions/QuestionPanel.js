import React from 'react' 
import useHttp from '../../hooks/use-http'
import { questionUrl } from '../../constants'
import {ReactComponent as DeleteIcon} from '../../icons/garbage.svg'
import {ReactComponent as EditIcon} from '../../icons/edit.svg'
import styles from './QuestionPanel.module.css'

const QuestionPanel = (props) => {
  const editHandler = () => {
    props.getInitialValue(props.question)
  }
  const {
    isLoading, 
    error, 
    sendRequest: deleteQuestion} = useHttp({
      url: `http://localhost:8080/moli/a/rest/question/${props.question.id}`,
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json; charset=utf8"
      },
  }, () => {})

  const deleteHandler = () => {
    deleteQuestion()
    window.location.reload()
  }

  return (
    <div className = {styles.container}>
      <EditIcon className = {styles.icon} onClick = {editHandler}/>
      <DeleteIcon className = {styles.icon} onClick = {deleteHandler}/>
    </div>
  )
}

export default QuestionPanel