import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Welcome from './components/Welcome'
import Login from './components/Login'
import Register from './components/Register'
import {LoginProvider} from './contexts/LoginContext'

import './index.css'
import About from './components/About'
import Header from './components/Header'
import Footer from './components/Footer'
import AdminLogin from './admin/AdminLogin'
import AdminRegister from './admin/AdminRegister'
import AdminDashBoard from './admin/AdminDashBoard'

const App = () => {
  return (
    
    <LoginProvider>
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<Welcome />}></Route>
            <Route path='/about' element={<><Header/> <About/> <Footer/></>}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/admin/login' element={<AdminLogin />}></Route>
            <Route path='/admin/register' element={<AdminRegister />}></Route>
            <Route path='/admin/dashboard' element={<AdminDashBoard />}></Route>
        </Routes>
      </BrowserRouter>
    </LoginProvider>
  )
}

export default App