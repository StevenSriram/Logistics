import React, { useEffect } from 'react'
import axios from 'axios'

import Header from './Header'
import Home from './Home'
import About from './About'
import Contact from './Contact'
import Footer from './Footer'

const Welcome = () => {
    // check for Authorization
    useEffect(() => {
        // function to Fetch Data
        const fetchData = async () => {
            const res = await axios.get('http://localhost:5000/api/welcome', 
                {withCredentials: true})
            window.alert(res.data.msg)
            return () => {console.log('')}
        }

        fetchData()
    }, [])

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

export default Welcome