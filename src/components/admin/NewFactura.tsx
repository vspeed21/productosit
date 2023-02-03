import { FormEvent, useState, useEffect, ChangeEvent } from 'react';

import Field from '../forms/Field';
import useProduct from '../../hooks/useProduct';
import { formatearCantidad } from '../../helpers';
import ProductsFactura from '../ProductsFactura';
import { Product } from '../../interfaces';


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
              <option value='contaco'>Contado</option>
              <option value='credito'>Credito</option>
            </select>
          </div>
        </div>

        <button onClick={addProductF} type='button'>Add</button>


        <div className='flex flex-col gap-3'>
          <label className='text-gray-800 uppercase font-bold'>
            Buscar productos
          </label>
          <input
            list='productos'
            type='list'
            name='name'
            value={buscadorPro}
            onChange={e => setbuscadorPro(e.target.value)}
            className='bg-gray-100 p-1 pl-3 outline-none focus:outline-blue-600 focus:outline-2 rounded focus:shadow border border-gray-400 focus:border-none'
          />

          {productoEncontrado[0]?.price && (
            <div className='flex gap-3 justify-evenly my-3'>
              <p className='border-b-2 border-blue-500'>Cantidad disponible: {productoEncontrado[0]?.stock}</p>
              <p className='border-b-2 border-blue-500'>Precio: {formatearCantidad(productoEncontrado[0]?.price)}</p>
            </div>
          )}

          <div className='flex mb-4 gap-5 justify-center'>
            <button
              type='button'
              className='-mt-5'
              onClick={() => {
                if (cantidad <= 1) return;
                if (cantidad > 1) {
                  setCantidad(cantidad - 1)
                }
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>

            </button>
            <div className='flex flex-col gap-3'>

              <input
                id='cantidad'
                type='number'
                name='stock'
                value={cantidad}
                disabled={!buscadorPro ? true : false}
                onChange={e => setCantidad(Number(e.target.value))}
                min={1}
                className='bg-gray-100 p-1 pl-3 outline-none focus:outline-blue-600 focus:outline-2 rounded focus:shadow border border-gray-400 focus:border-none text-center w-30'
              />
            </div>
            <button
              type='button'
              className='-mt-5'
              onClick={() => {
                if (cantidad >= Number(productoEncontrado[0].stock) ) return;
                if (cantidad >= 1) {
                  setCantidad(cantidad + 1)
                }
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>

            </button>
          </div>

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
                <tr className='border-b hover:bg-gray-100 text-center' key={input.id}>
                  {input.name !== '' && <td className='p-3'>{input.name}</td>}
                  {input.name !== '' && (
                    <td className='p-3'>{formatearCantidad(input.price)}</td>
                  )}
                  {input.name !== '' && (
                    <td className='p-3'>
                      {input.cantidadP}
                    </td>)}
                  {input.name !== '' && <button type='button' onClick={() => removeProFactura(i)}>eliminar</button>}
                </tr>
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