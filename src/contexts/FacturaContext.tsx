import { createContext, useState, useEffect} from 'react'
import { Factura } from '../interfaces';

const FacturaContext = createContext({});

interface Props {
  children: JSX.Element
}

export function FacturaProvider({children}: Props) {
  const [facturas, setFacturas] = useState<Factura[]>(
    localStorage.getItem('facturas') ? JSON.parse(localStorage.getItem('facturas')!) : []
  );
  const [facturasFiltradas, setFacturasFiltradas] = useState<Factura[]>([]);

  const [filtroName, setFiltroName] = useState('');

  useEffect(() => {
    localStorage.setItem('facturas', JSON.stringify(facturas) ?? []);
  }, [facturas]);

  useEffect(() => {
    const facturasF = facturas.filter(fact => fact.client.toLowerCase() === filtroName.toLowerCase());
    setFacturasFiltradas(facturasF);
  }, [filtroName]);

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
        facturas,
        filtroName,
        setFiltroName,
        facturasFiltradas
      }}
    >
      {children}
    </FacturaContext.Provider>
  )
}

export default FacturaContext