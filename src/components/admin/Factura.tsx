import { useState } from 'react';
import { formatearCantidad, formatDate } from '../../helpers';
import { Factura } from '../../interfaces'
import ProFactura from './ProFactura';

interface Props {
  factura: Factura
}

function FacturaC({ factura }: Props) {
  const [showProducts, setShowProducts] = useState(false);

  const { productoFactura } = factura;

  return (
    <>
      <tr className='text-center border-b-2 border-gray-300 last-of-type:border-b-0'>
        <td className='p-2'>
          <button
            type='button'
            className='my-3 underline hover:no-underline flex justify-center items-center gap-3'
            onClick={() => setShowProducts(!showProducts)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Detalle
          </button>
        </td>
        <td className='p-2'>{factura.numeroFactura}</td>
        <td className='p-2'>{formatDate(factura.fecha)}</td>
        <td className='p-2 capitalize'>{factura.factura}</td>
        <td className='p-2 capitalize'>{factura.client}</td>
        <td className='p-2'>{formatearCantidad(factura.numeros.subtotal.toString())}</td>
        <td className='p-2'>{formatearCantidad(factura.numeros.impuesto.toString())}</td>
        <td className='p-2'>{formatearCantidad(factura.numeros.totalPagar.toString())}</td>
      </tr>

      {showProducts ? (
        <tr>
          <div className='grid grid-cols-3 gap-x-32'>
            <div className='font-bold'>Cantidad</div>
            <div className='font-bold'>Producto</div>
            <div className='font-bold'>Subtotal</div>

            <div className='grid grid-cols-3 gap-x-32 text-center'>
              {productoFactura.map(pro => (
                <>
                  {pro.name !== '' && (
                    <>
                      <p className=''>{pro.cantidadP}</p>
                      <p className='col-start-2 col-end-3 w-max'>{pro.name}</p>
                      <p className='col-start-3 cold-end-4'>{formatearCantidad(pro.price)}</p>
                    </>
                  )}
                </>
              ))}
            </div>
          </div>
        </tr>
      ) : null}
    </>
  )
}

export default FacturaC