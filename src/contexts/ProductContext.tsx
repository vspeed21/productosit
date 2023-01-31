import { createContext, useState, useEffect } from 'react'

const ProdcutContext = createContext({});

interface Props {
  children: JSX.Element
}

export function ProductProvider({children}:Props) {

  return (
    <ProdcutContext.Provider
      value={{
      }}
    >
      {children}
    </ProdcutContext.Provider>

  )
}

export default ProdcutContext
