import useFactura from "../../hooks/useFactura";
import Factura from "./Factura";
import Filtro from "./Filtro";
import { formatearCantidad, formatDate } from "../../helpers";
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
          <>
            <h2 className='text-gray-700 font-bold text-3xl mt-2 md:max-w-2xl md:mx-auto py-5 text-center md:text-left'>
              {facturasFiltradas.length > 0 ? `Facturas de ${filtroName}` : ''}
            </h2>

            <div className='mb-10 w-auto mx-6 md:ml-0 mr-6 max-w-4xl rounded overflow-auto h-[30rem]'>
              <table className='w-full table-auto shadow bg-white mr-5'>
                <thead className='bg-indigo-800 text-white'>
                  <tr>
                    <th className="p-2">Acciones</th>
                    <th className="p-2">#Factura</th>
                    <th className="p-2">Fecha</th>
                    <th className="p-2">Condicion</th>
                    <th className="p-2">Cliente</th>
                    <th className="p-2">Subtotal</th>
                    <th className="p-2">Impuesto</th>
                    <th className="p-2">Total a pagar</th>
                  </tr>
                </thead>

                <tbody>
                  {facturasFiltradas.map((fact, i) => (
                    <Factura
                      key={i}
                      factura={fact}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className='mb-10 w-auto mx-6 md:ml-0 mr-6 max-w-4xl rounded overflow-auto h-[30rem]'>
            <table className='w-full table-auto shadow bg-white mr-5'>
              <thead className='bg-indigo-800 text-white'>
                <tr>
                  <th className="p-2">Acciones</th>
                  <th className="p-2">#Factura</th>
                  <th className="p-2">Fecha</th>
                  <th className="p-2">Condicion</th>
                  <th className="p-2">Cliente</th>
                  <th className="p-2">Subtotal</th>
                  <th className="p-2">Impuesto</th>
                  <th className="p-2">Total a pagar</th>
                </tr>
              </thead>

              <tbody>
                {facturas.map((fact, i) => (
                  <Factura
                    key={i}
                    factura={fact}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default FacturaList