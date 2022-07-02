import React from 'react'
import { Outlet, Routes, Route } from 'react-router-dom' 
import StudentResult from '../components/results/StudentResult'
import StudentTableResult from '../components/results/StudentTableResult'
import AnalisesResult from '../components/results/AnalisesResult'
import PageLayout from '../components/layout/PageLayout'

const ResultPage = () => {
  return (
    <PageLayout>
      <Routes>
        <Route path = '/student/:resultId' element = {<StudentResult/>}/>
        <Route path = '/studentTable/:testId' element = {<StudentTableResult/>}/>
        <Route path = '/analises/:testId' element = {<AnalisesResult/>}/>
      </Routes>
      <Outlet/>
    </PageLayout>
  )
}

export default ResultPage