import { useContext } from 'react';
import { ContextProductProps } from '../contexts';
import ProductContext from '../contexts/ProductContext';

function useAuth() {
  return useContext(ProductContext) as ContextProductProps;
}

export default useAuth