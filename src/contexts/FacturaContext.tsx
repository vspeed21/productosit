import { createContext, useState, useEffect} from 'react'
import { Factura } from '../interfaces';

const FacturaContext = createContext({});

interface Props {
  children: JSX.Element
}

export function FacturaProvider({children}: Props) {
  const [facturas, setFacturas] = useState(
    localStorage.getItem('facturas') ? JSON.parse(localStorage.getItem('facturas')!) : []
  );

  useEffect(() => {
    localStorage.setItem('facturas', JSON.stringify(facturas) ?? []);
  }, [facturas]);

  const handleFactura = (factura:Factura) => {
    setFacturas([
      ...facturas,
      factura
    ]);
  }

  return (
    <FacturaContext.Provider
      value={{
        handleFactura,
      }}
    >
      {children}
    </FacturaContext.Provider>
  )
}

export default FacturaContext