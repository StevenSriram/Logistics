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
import AdminDashBoard from './admin/AdminDashBoard'
import AddVehicle from './admin/AddVehicle'
import Transport from './components/Transport'

const App = () => {
  return (
    
    <LoginProvider>
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<Welcome />}></Route>
            <Route path='/about' element={<><Header/> <About/> <Footer/></>}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/transport' element={<Transport />}></Route>
            <Route path='/admin/login' element={<AdminLogin />}></Route>
            <Route path='/admin/dashboard' element={<AdminDashBoard />}></Route>
            <Route path='/admin/add' element={<AddVehicle />}></Route>
        </Routes>
      </BrowserRouter>
    </LoginProvider>
  )
}

export default App