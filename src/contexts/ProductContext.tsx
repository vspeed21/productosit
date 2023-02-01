import { createContext, useState, useEffect } from 'react'
import { Product } from '../interfaces';

const ProdcutContext = createContext({});

interface Props {
  children: JSX.Element
}

export function ProductProvider({children}:Props) {
  const [products, setProducts] = useState<Product[]>(
    localStorage.getItem('productsit') ? JSON.parse(localStorage.getItem('productsit')!) : []
  );
  const [productObj, setProductObj] = useState<Partial<Product>>({});

  useEffect(() => {
    localStorage.setItem('productsit', JSON.stringify(products) ?? []);
  }, [products]);

  const handleProduct = (producto: Product) => {
    producto.id = crypto.randomUUID();
    setProducts([producto, ...products])
  }

  const handleDelete = (id: string) => {
    console.log('deleting', id);
  }

  return (
    <ProdcutContext.Provider
      value={{
        products,
        handleProduct,
        setProductObj,
        handleDelete,
      }}
    >
      {children}
    </ProdcutContext.Provider>

  )
}

export default ProdcutContext
