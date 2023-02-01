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
    if(producto.id) {
      const updateProducts = products.map( pro => pro.id === producto.id ? producto : pro);
      setProducts(updateProducts);
      setProductObj({});
    }else {
      producto.id = crypto.randomUUID();
      setProducts([producto, ...products]);
      setProductObj({});
    }
  }

  const handleDelete = (id: string) => {
    const rpta = confirm('¿Desea eliminar este producto?')

    if(rpta) {
      const updateProducts = products.filter(pro => pro.id !== id);
      setProducts(updateProducts);
    }
  }

  return (
    <ProdcutContext.Provider
      value={{
        products,
        handleProduct,
        productObj,
        setProductObj,
        handleDelete,
      }}
    >
      {children}
    </ProdcutContext.Provider>

  )
}

export default ProdcutContext
