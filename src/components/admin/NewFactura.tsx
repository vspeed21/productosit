import { FormEvent, useState, useEffect } from 'react';
import useFactura from '../../hooks/useFactura';

import Field from '../forms/Field';
import useProduct from '../../hooks/useProduct';
import { formatDate, formatearCantidad } from '../../helpers';
import Cantidad from './Cantidad';
import ProductFactura from './ProductFactura';
import Alert from '../Alert';
import { Product } from '../../interfaces';

function NewFactura() {
  const [client, setClient] = useState('');
  const [factura, setFactura] = useState('');
  const [buscadorPro, setbuscadorPro] = useState('');

  const [productoFactura, setproductoFactura] = useState([
    { id: Date.now(), name: '', price: '', stock: 1, cantidadP: 0, activa: false },
  ]);
  
  const [enableInput, setEnableInput] = useState(false);
  const [facturaGenerada, setFacturaGenerada] = useState(false);

  const [subtotal, setSubtotal] = useState(0);
  const [impuesto, setImpuesto] = useState(0);
  const [totalPagar, setTotalPagar] = useState(0);

  const [cantidad, setCantidad] = useState(1);
  const [numeroFactura, setNumeroFactura] = useState(
    localStorage.getItem('numeroFactura') ? 
      Number(localStorage.getItem('numeroFactura')) : 1
  );

  const [alerta, setAlerta] = useState({
    msg: '',
    error: false,
  });

  const { products, setProducts } = useProduct();
  const { handleFactura, facturas, setFacturas } = useFactura();

  useEffect(() => {
    localStorage.setItem('numeroFactura', JSON.stringify(numeroFactura));
  }, [numeroFactura]);

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

  useEffect(() => {
    if(facturaGenerada) {
      facturas.map(fact => {
        if(fact.activa) {
          products.map(pro => {
            fact.productoFactura.map(productoLlevado => {
              if(pro.name === productoLlevado.name) {
                pro.stock = (Number(pro.stock) - productoLlevado.cantidadP).toString();
              }
            });//detalle
          })//products
          setProducts([...products]);
          fact.activa = false;
        }
      })
      setFacturas([...facturas]);
    }
    setFacturaGenerada(false);
  }, [facturaGenerada]);

  const productoEncontrado = products.filter(pro => pro.name === buscadorPro);


  const addProductF = () => {
    if(cantidad === 0) {
      alert('La cantidad no puede ser 0');
      return;
    }

    if(Number(productoEncontrado[0]?.stock) > 0) {
      let valor = cantidad;
      productoFactura.map(proF => {
        if(proF.name === productoEncontrado[0]?.name) {
          valor = valor + proF.cantidadP;
        }
      })

      if(Number(productoEncontrado[0]?.stock) >= valor && cantidad <= Number(productoEncontrado[0]?.stock)) {
        setEnableInput(true);

        setproductoFactura([
          ...productoFactura,
          { id: Date.now(), name: productoEncontrado[0].name, price: productoEncontrado[0].price, stock: Number(productoEncontrado[0].stock), cantidadP: cantidad, activa: true}
        ]);
        setbuscadorPro('');
        setCantidad(1);
      } else{
        alert('No hay mas existencias');
        console.log(valor);
      }
      }else{
        alert(`No se puede agregar porque hay ${productoEncontrado[0]?.stock} existencias del articulo ${productoEncontrado[0]?.name}`);
      }


  }

  function removeProFactura(i: number) {
    const newproductoFactura = [...productoFactura];
    newproductoFactura.splice(i, 1);
    setproductoFactura(newproductoFactura);
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if(client === '') {
      setAlerta({
        msg: 'El nombre del cliente es obligatorio',
        error: true
      });
      setTimeout(() => {
        setAlerta({
          msg: '',
          error: false,
        })
      }, 2000);
      return;
    }

    if(factura === '') {
      setAlerta({
        msg: 'El tipo de factura es obligatorio',
        error: true
      });
      setTimeout(() => {
        setAlerta({
          msg: '',
          error: false,
        })
      }, 2000);
      return;
    }

    if(productoFactura.length <= 1) {
      setAlerta({
        msg: 'Agrega productos para generar factura',
        error: true
      });
      setTimeout(() => {
        setAlerta({
          msg: '',
          error: false,
        })
      }, 2000);
      return;
    }

    handleFactura({
      numeroFactura,
      client,
      factura,
      numeros: {subtotal, impuesto, totalPagar},
      productoFactura,
      fecha: Date.now(),
      activa: true,
    });

    setFacturaGenerada(true);
    setNumeroFactura(numeroFactura + 1);
    setClient('');
    setFactura('');
    setEnableInput(false);
    setproductoFactura([
      { id: Date.now(), name: '', price: '', stock: 1, cantidadP: 0, activa: false },
    ]);
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
        {alerta.msg && <Alert msg={alerta.msg} error={alerta.error} /> }

        <div className='flex justify-evenly mb-4'>
          <p>{`Numero factura: ${numeroFactura}`}</p>
          <p>
            Fecha: {''}
            <span className='font-bold'>{formatDate(Date.now())}</span>
          </p>
        </div>

        <div className='md:flex md:items-center gap-4 justify-center'>
          <div className='md:w-1/2'>
            <Field
              htmlFor='nombre'
              id='nombre'
              name='nombre'
              placeholder='Ingresa el nombre del cliente'
              type='text'
              disabled={enableInput}
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
              className='bg-gray-100 p-1 pl-3 outline-none focus:outline-blue-600 focus:outline-2 rounded text-center focus:shadow border border-gray-400 focus:border-none mb-4 hover:cursor-pointer disabled:bg-gray-300'
              value={factura}
              disabled={enableInput}
              onChange={e => setFactura(e.target.value)}
            >
              <option value=''>--Seleccione--</option>
              <option value='contado'>Contado</option>
              <option value='credito'>Credito</option>
            </select>
          </div>
        </div>

        <div className='flex flex-col gap-3'>
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
            <div className='flex gap-3 justify-evenly my-1'>
              <div className='flex flex-col gap-3 md:flex-row'>
                <p>
                  Disponible: {''}
                  <span className='font-bold'>{productoEncontrado[0]?.stock}</span>
                </p>
                <p>
                  Precio: {''}
                  <span className='font-bold'>{formatearCantidad(productoEncontrado[0]?.price)}</span>
                </p>
              </div>
              <Cantidad
                cantidad={cantidad}
                buscadorPro={buscadorPro}
                productoEncontrado={productoEncontrado}
                setCantidad={setCantidad}
              />
            </div>
          )}

          <div className='flex justify-end'>
            {buscadorPro && productoEncontrado[0]?.name && (
              <button
                type='button'
                className='capitalize py-1 px-2 rounded bg-blue-600 hover:bg-blue-800 text-white transition-colors -mt-3 flex justify-center items-center gap-1'
                onClick={addProductF}
              >
                agregar producto
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </button>
            )}
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