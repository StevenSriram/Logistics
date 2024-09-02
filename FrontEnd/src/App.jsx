import React from 'react'
import Header from './components/Header'
import Home from './components/Home'

import './index.css'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'

const App = () => {
  return (
    <>
      <Header />
      <Home />
      <About />

      <Contact />
      <Footer />
    </>
  )
}

export default App