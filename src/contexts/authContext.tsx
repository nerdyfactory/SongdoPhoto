import React, {createContext, useState, useMemo} from 'react'

const AuthContext = createContext(undefined)

function useAuth() {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error(`useSome must be used within a AuthProvider`)
  }
  return context
}

function AuthProvider(props: any) {
  const [auth, setAuth] = useState({
    token: '',
    name: ''
  })
  const value = useMemo(() => [auth, setAuth], [auth])
  return <AuthContext.Provider value={value} {...props} />
}

export {AuthProvider, useAuth}
