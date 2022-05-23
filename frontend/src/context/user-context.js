import React, { useState } from 'react'

const UserContext = React.createContext()

const UserProvider = ({ children }) => {
    const [userState, setUserState] = useState(null)

    return (
        <UserContext.Provider value={{
            userState,
            changeUserState: (state) => setUserState(state)
        }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }