import { useContext } from 'react';
import { ContextFacturaProps } from '../contexts';
import FacturaContext from '../contexts/FacturaContext';

const useFactura = () => {
  return useContext(FacturaContext) as ContextFacturaProps;
}

export default useFactura