import { FormEvent, useState, useEffect, ChangeEvent } from 'react';

import Field from '../forms/Field';
import useProduct from '../../hooks/useProduct';
import { formatearCantidad } from '../../helpers';
import ProductsFactura from '../ProductsFactura';
import { Product } from '../../interfaces';
import Cantidad from './Cantidad';
import ProductFactura from './ProductFactura';


function NewFactura() {
  const [client, setClient] = useState('');
  const [factura, setFactura] = useState('');
  const [buscadorPro, setbuscadorPro] = useState('');

  const [productoFactura, setproductoFactura] = useState([
    { id: Date.now(), name: '', price: '', stock: 1, cantidadP: 0 },
  ]);

  const [subtotal, setSubtotal] = useState(0);
  const [impuesto, setImpuesto] = useState(0);
  const [totalPagar, setTotalPagar] = useState(0);

  const [cantidad, setCantidad] = useState(1);

  const { products } = useProduct();

  useEffect(() => {
    setImpuesto(subtotal * 0.15);
    setTotalPagar(subtotal + impuesto);
  }, [subtotal, impuesto, totalPagar])

  useEffect(() => {
    let valor = 0;
    for (let i = 0; i < productoFactura.length; i++) {
      valor = valor + Number(productoFactura[i].price) * productoFactura[i].cantidadP
    }
    setSubtotal(valor);
  }, [subtotal, productoFactura]);

  const productoEncontrado = products.filter(pro => pro.name === buscadorPro);
  const addProductF = () => {

    if (cantidad > Number(productoEncontrado[0]?.stock)) {
      alert('no se puede');
      return;
    }

    setproductoFactura([
      ...productoFactura,
      { id: Date.now(), name: productoEncontrado[0].name, price: productoEncontrado[0].price, stock: Number(productoEncontrado[0].stock), cantidadP: cantidad }
    ]);
    setbuscadorPro('');
    setCantidad(1);
  }

  function removeProFactura(i: number) {
    const newproductoFactura = [...productoFactura];
    newproductoFactura.splice(i, 1);
    setproductoFactura(newproductoFactura);
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  }

  return (
    <div className='md:pt-5'>
      <h2 className='text-xl uppercase text-center md:text-start font-bold'>
        Ingresar productos
      </h2>
      <p className='text-center md:text-start mt-4'>
        Completa el formulario para generar una factura
      </p>

      <form
        onSubmit={handleSubmit}
        className='bg-white p-4 rounded shadow md:w-4/5 mx-5 mt-10 md:mx-auto'
      >

        <div className='md:flex md:items-center gap-4 justify-center'>
          <div className='md:w-1/2'>
            <Field
              htmlFor='nombre'
              id='nombre'
              name='nombre'
              placeholder='Ingresa el nombre del cliente'
              type='text'
              value={client}
              onChange={setClient}
            />
          </div>

          <div className='flex flex-col gap-3 md:w-1/2'>
            <label htmlFor='factura' className='text-gray-800 uppercase font-bold'>
              Tipo factura
            </label>

            <select
              id='factura'
              className='bg-gray-100 p-1 pl-3 outline-none focus:outline-blue-600 focus:outline-2 rounded text-center focus:shadow border border-gray-400 focus:border-none mb-4 hover:cursor-pointer'
              value={factura}
              onChange={e => setFactura(e.target.value)}
            >
              <option value=''>--Seleccione--</option>
              <option value='contado'>Contado</option>
              <option value='credito'>Credito</option>
            </select>
          </div>
        </div>

        <div className='flex flex-col gap-3'>
          <div className='flex gap-5 items-center'>
            <label className='text-gray-800 uppercase font-bold'>
              Buscardor productos
            </label>
            {buscadorPro && (
                <button
                type='button'
                className='capitalize py-1 px-2 border-2 border-blue-500 rounded hover:bg-blue-600 hover:text-white transition-colors'
                onClick={addProductF}
              >
                agregar producto
              </button>
            )}
          </div>
          <input
            list='productos'
            type='list'
            name='name'
            value={buscadorPro}
            placeholder='Buscar productos...'
            onChange={e => setbuscadorPro(e.target.value)}
            className='bg-gray-100 p-1 pl-3 outline-none focus:outline-blue-600 focus:outline-2 rounded focus:shadow border border-gray-400 focus:border-none'
          />

          {productoEncontrado[0]?.price && (
            <div className='flex gap-3 justify-evenly my-3'>
              <p>
                Cantidad disponible: {''}
                <span className='font-bold'>{productoEncontrado[0]?.stock}</span>
              </p>
              <p>
                Precio: {''}
                <span className='font-bold'>{formatearCantidad(productoEncontrado[0]?.price)}</span>
              </p>
            </div>
          )}

          <Cantidad
            cantidad={cantidad}
            buscadorPro={buscadorPro}
            productoEncontrado={productoEncontrado}
            setCantidad={setCantidad}
          />

          <datalist
            id='productos'
          >
            {products.length && products.map((pro, index) => (
              <option
                value={pro.name}
                key={index}
              />
            ))}
          </datalist>
        </div>

        {productoFactura.length > 1 ? (
          <table className='w-full mt-10 table-auto shadow bg-white mr-5 overflow-y-scroll'>
            <thead className='bg-blue-800 text-white'>
              <tr>
                <th className="p-2">Nombre</th>
                <th className="p-2">Precio</th>
                <th className="p-2">Cantidad</th>
                <th className='p-2'>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {productoFactura.length >= 1 && productoFactura.map((input, i) => (
                <ProductFactura
                  key={input.id}
                  input={input}
                  removeProFactura={() => removeProFactura(i)}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <p className='text-center font-bold text-lg my-5'>No hay productos para facturar</p>
        )}

        {subtotal ? (
          <div className='flex gap-5 justify-end my-5'>
            <p>
              Subtotal: {''}
              <span className='font-bold'>{formatearCantidad(subtotal.toString())}</span>
            </p>
            <p>
              Impuesto: {''}
              <span className='font-bold'>{formatearCantidad(impuesto.toString())}</span>
            </p>
            <p>
              Total a Pagar: {''}
              <span className='font-bold'>{formatearCantidad(totalPagar.toString())}</span>
            </p>
          </div>
        ) : null}

        <div className='flex justify-center md:justify-end'>
          <input
            type='submit'
            value="Generar factura"
            className='bg-sky-600 py-1 px-3 rounded text-white font-bold uppercase hover:cursor-pointer hover:bg-sky-800 transition-colors duration-300 w-full md:w-auto'
          />
        </div>
      </form>
    </div>
  )
}

export default NewFactura