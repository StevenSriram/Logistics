import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Welcome from './components/Welcome'
import Login from './components/Login'
import Register from './components/Register'

import './index.css'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Welcome />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App