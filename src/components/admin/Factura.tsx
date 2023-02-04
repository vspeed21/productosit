import { useState } from 'react';
import { formatearCantidad, formatDate} from '../../helpers';
import { Factura } from '../../interfaces'
import ProFactura from './ProFactura';

interface Props {
  factura: Factura
}

function FacturaC({ factura }: Props) {
  const [showProducts, setShowProducts] = useState(false);

  const { productoFactura } = factura;

  return (
    <div className='mb-10 bg-gray-100 w-auto p-4 mx-6 md:ml-0 mr-6 overflow-x-auto max-w-3xl rounded'>
        <div className='flex gap-3'>
          <div className='flex flex-col border-r border-r-slate-600'>
            <p className='mr-5 text-center font-bold'># Factura</p>
            <p className='mr-5 text-center'>{factura.numeroFactura}</p>
          </div>
          <div className='flex flex-col border-r border-r-slate-600'>
            <p className='mr-5 text-center font-bold'>Fecha</p>
            <p className='mr-5 text-center'>{formatDate(factura.fecha)}</p>
          </div>

          <div className='flex flex-col border-r border-r-slate-600'>
            <p className='mr-5 text-center font-bold'>Condición</p>
            <p className='mr-5 text-center capitalize'>{factura.factura}</p>
          </div>

          <div className='flex flex-col border-r border-r-slate-600'>
            <p className='mr-5 text-center font-bold'>Cliente</p>
            <p className='mr-5 text-center capitalize'>{factura.client}</p>
          </div>

          <div className='flex flex-col border-r border-r-slate-600'>
            <p className='mr-5 text-center font-bold'>Subtotal</p>
            <p className='mr-5 text-center capitalize'>
              {formatearCantidad(factura.numeros.subtotal.toString())}
            </p>
          </div>
          <div className='flex flex-col border-r border-r-slate-600'>
            <p className='mr-5 text-center font-bold'>Impuesto</p>
            <p className='mr-5 text-center capitalize'>
              {formatearCantidad(factura.numeros.impuesto.toString())}
            </p>
          </div>
          <div className='flex flex-col'>
            <p className='mr-2 text-center font-bold'>Total Pagado</p>
            <p className='mr-2 text-center capitalize'>
              {formatearCantidad(factura.numeros.totalPagar.toString())}
            </p>
          </div>
        </div>

        <button
          type='button'
          className='my-3 underline hover:no-underline flex justify-center items-center gap-3'
          onClick={() => setShowProducts(!showProducts)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          {showProducts ? 'Ocultar detalle': 'Mostrar Detalle'}
        </button>

        <div className={`${showProducts ? 'block' : 'hidden'} mt-5`}>
          <p className='text-center font-bold text-xl mb-5'>Productos</p>

          <table className='w-full mt-10 table-auto shadow bg-white mr-5 overflow-y-scroll'>
            <thead className='bg-indigo-800 text-white'>
              <tr>
                <th className="p-2">Articulos</th>
                <th className="p-2">Precio</th>
                <th className="p-2">Cantidad</th>
              </tr>
            </thead>

            <tbody>
              {productoFactura.map(producto => (
                <ProFactura
                  key={producto.id}
                  factura={producto}
                />
              ))}
            </tbody>
          </table>
        </div>
    
    </div>
  )
}

export default FacturaC