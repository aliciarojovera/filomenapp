import React, { useState } from 'react'

export const ThemeContext = React.createContext()

export const ThemeProvider = ({ children }) => {

    const [Theme, setTheme] = useState({isDark: JSON.parse(localStorage.getItem('isDark')) !== null ? JSON.parse(localStorage.getItem('isDark')) : "true"})

    return (
        <ThemeContext.Provider value={{Theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}
