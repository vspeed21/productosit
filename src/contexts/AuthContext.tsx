import { createContext, useState ,useEffect } from 'react'

const AuthContext = createContext({});

interface Props {
  children: JSX.Element
}

export function AuthProvider({children}:Props) {
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const tokenLS = localStorage.getItem('token');
    if(!tokenLS) return;

    setToken(tokenLS);

  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>

  )
}

export default AuthContext
