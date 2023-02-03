import useFactura from "../../hooks/useFactura";
import Factura from "./Factura";
import Filtro from "./Filtro";
import { formatearCantidad } from "../../helpers";
import ProFactura from "./ProFactura";

function FacturaList() {

  const { facturas, facturasFiltradas, filtroName } = useFactura();

  return (
    <div className='md:pt-5'>
      {facturas.length ? (
        <Filtro />
      ) : null}

      <div className="mt-5">
        {filtroName ? (
          facturasFiltradas.map(fact => (
            <div className='mb-10 bg-gray-100 w-auto p-4 mx-6 md:ml-0 mr-6 overflow-x-auto max-w-3xl rounded'>
              <div className='flex gap-3'>
                <div className='flex flex-col border-r border-r-slate-600'>
                  <p className='mr-5 text-center font-bold'># Factura</p>
                  <p className='mr-5 text-center'>{fact.numeroFactura}</p>
                </div>
                <div className='flex flex-col border-r border-r-slate-600'>
                  <p className='mr-5 text-center font-bold'>Fecha</p>
                  <p className='mr-5 text-center'>{fact.fecha}</p>
                </div>

                <div className='flex flex-col border-r border-r-slate-600'>
                  <p className='mr-5 text-center font-bold'>Condición</p>
                  <p className='mr-5 text-center capitalize'>{fact.factura}</p>
                </div>

                <div className='flex flex-col border-r border-r-slate-600'>
                  <p className='mr-5 text-center font-bold'>Cliente</p>
                  <p className='mr-5 text-center capitalize'>{fact.client}</p>
                </div>

                <div className='flex flex-col border-r border-r-slate-600'>
                  <p className='mr-5 text-center font-bold'>Subtotal</p>
                  <p className='mr-5 text-center capitalize'>
                    {formatearCantidad(fact.numeros.subtotal.toString())}
                  </p>
                </div>
                <div className='flex flex-col border-r border-r-slate-600'>
                  <p className='mr-5 text-center font-bold'>Impuesto</p>
                  <p className='mr-5 text-center capitalize'>
                    {formatearCantidad(fact.numeros.impuesto.toString())}
                  </p>
                </div>
                <div className='flex flex-col'>
                  <p className='mr-2 text-center font-bold'>Total Pagado</p>
                  <p className='mr-2 text-center capitalize'>
                    {formatearCantidad(fact.numeros.totalPagar.toString())}
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
                    {fact.productoFactura.map(producto => (
                      <ProFactura
                        key={producto.id}
                        factura={producto}
                      />
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          ))
        ) : (
          facturas.length && facturas.map((factura, i) => (
            <Factura
              key={i}
              factura={factura}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default FacturaList