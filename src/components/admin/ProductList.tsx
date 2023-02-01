import useProducto from "../../hooks/useProduct"
import Product from "./Product";

function ProductList() {
  const { products } = useProducto();

  return (
    <div className='md:pt-5'>
      <h2 className='text-xl uppercase text-center md:text-start font-bold'>
        ver productos
      </h2>
      <p className='text-center md:text-start mt-4'>Administra tus productos</p>

      <table className='w-full mt-10 table-auto shadow bg-white mr-5'>
        <thead className='bg-blue-800 text-white'>
          <tr>
            <th className="p-2">Nombre</th>
            <th className="p-2">Precio</th>
            <th className="p-2">Existencias</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {products.length ? products.map(product => (
            <Product
              key={product.id}
              product={product}
            />
          )) : null}
        </tbody>
      </table>
    </div>
  )
}

export default ProductList