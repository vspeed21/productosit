import { useContext } from 'react';
import { ContextAuthProps } from '../contexts';
import AuthContext from '../contexts/AuthContext';

function useAuth() {
  return useContext(AuthContext) as ContextAuthProps;
}

export default useAuth