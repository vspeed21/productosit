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

  }, [token]);

  const logOut = () => {
    const rpta = confirm('¿Estas seguro de cerrar sesión? No se perderan los datos');

    if(rpta) {
      localStorage.removeItem('token');
      window.location.href = '/auth';
    }
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        loading,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>

  )
}

export default AuthContext
