import { createContext, useState ,useEffect } from 'react'

const AuthContext = createContext({});

interface Props {
  children: JSX.Element
}

export function AuthProvider({children}:Props) {
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    validateToken();
    async function validateToken() {
      const tokenLS = localStorage.getItem('token');
      if(!tokenLS) {
        setLoading(false);
        return
      };
      setTimeout(() => {
        setLoading(false);
      }, 3000);

      setToken(tokenLS);
    }

  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        loading,
        hola: 'saludo'
      }}
    >
      {children}
    </AuthContext.Provider>

  )
}

export default AuthContext
