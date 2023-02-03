import { createContext, useState, useEffect} from 'react'

const FacturaContext = createContext({});

interface Props {
  children: JSX.Element
}

export function FacturaProvider({children}: Props) {
  return (
    <FacturaContext.Provider
      value={{
        saludo: 'hola desde factura context'
      }}
    >
      {children}
    </FacturaContext.Provider>
  )
}

export default FacturaContext