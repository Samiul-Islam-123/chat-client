import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ChatPage from '../Pages/AppPages/ChatPage'
import LoginPage from '../Pages/AuthPages/LoginPage'

function RoutesController() {
  return (
    <>
        <Routes>
            <Route exact path='/' element={<ChatPage />}/>
            <Route exact path='/login' element={<LoginPage />}/>
            
        </Routes>
    </>
  )
}

export default RoutesController