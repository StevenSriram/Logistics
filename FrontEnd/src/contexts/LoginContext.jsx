import React, { createContext, useState } from 'react'

// create Context API
const LoginContext = createContext()

// context Provider
const LoginProvider = ({ children }) => {
    // state passed through Context
    const [login,setLogin] = useState(false)

    return (
        // provide Context
        <LoginContext.Provider value={{login, setLogin}}>
            {children}
        </LoginContext.Provider>
    )
}

export {LoginContext, LoginProvider};