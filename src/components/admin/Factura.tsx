import { formatearCantidad } from '../../helpers';
import { Factura } from '../../interfaces'
import ProFactura from './ProFactura';

interface Props {
  factura: Factura
}

function FacturaC({ factura }: Props) {
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
            <p className='mr-5 text-center'>{factura.fecha}</p>
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

        <div className='mt-5'>
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