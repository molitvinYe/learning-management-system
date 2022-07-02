import React, {useState} from "react"

const AuthContext = React.createContext({
  user: '',
  userType: '',
  isLoggedIn: false,
  login: (user, userType) => {},
  logout: () => {}
})

export const AuthContextProvider = (props) => {
  const initialUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(initialUser)
  const initialUserType = localStorage.getItem('userType')
  const [userType, setUserType] = useState(initialUserType)

  const userIsLoggedIn = !!user

  const loginHandler = (user, userType) => {
    const userJsonStringify = JSON.stringify(user)
    setUser(user)
    localStorage.setItem('user', userJsonStringify)
    setUserType(userType)
    localStorage.setItem('userType', userType)
  }

  const logoutHandler = () => {
    setUser(null)
    localStorage.removeItem('user')
    setUserType(null)
    localStorage.removeItem('userType')
  }

  const contextValue = {
    user, userType,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext