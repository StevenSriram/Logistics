import React, { useEffect,useContext } from 'react'
import axios from 'axios'

import Header from './Header'
import Home from './Home'
import About from './About'
import Contact from './Contact'
import Footer from './Footer'
import {LoginContext} from '../contexts/LoginContext'

const Welcome = () => {
  const {login,setLogin} = useContext(LoginContext)
    
    // check for Authorization
    useEffect(() => {
        // function to Fetch Data
        const fetchData = async () => {
          document.body.style.paddingRight = 0

            const res = await axios.get('http://localhost:5000/api/welcome', 
                {withCredentials: true})
                if(res.data.msg == "Access Grant")
                {
                    setLogin(true)
                    // window.alert(res.data.msg)
                }
            return () => console.log('')
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
