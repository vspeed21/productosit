import { createContext } from 'react'

const AuthContext = createContext({});

interface Props {
  children: JSX.Element
}

export function AuthProvider({children}:Props) {
  return (
    <AuthContext.Provider
      value={{
        saludo: 'hello from provider'
      }}
    >
      {children}
    </AuthContext.Provider>

  )
}

export default AuthContext
