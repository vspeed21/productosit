import { createContext, useState, useEffect } from 'react'
import { Product } from '../interfaces';

const ProdcutContext = createContext({});

interface Props {
  children: JSX.Element
}

export function ProductProvider({children}:Props) {
  const [products, setProducts] = useState<Product[]>([]);

  const handleProduct = (producto: Product) => {
    producto.id = crypto.randomUUID();
    setProducts([producto, ...products])
  }

  return (
    <ProdcutContext.Provider
      value={{
        products,
        handleProduct,
      }}
    >
      {children}
    </ProdcutContext.Provider>

  )
}

export default ProdcutContext
