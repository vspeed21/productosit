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
            <h2 className='text-gray-700 font-bold text-3xl mt-10 md:max-w-2xl md:mx-auto py-5 text-center md:text-left'>
              {facturasFiltradas.length > 0 ? `Facturas de ${filtroName}` : ''}
            </h2>
            <p>lis</p>

            {facturasFiltradas.map((fact, i) => (
              <Factura
                key={i}
                factura={fact}
              />
            ))}
          </>
        ) : (
            <>
              <h2 className='text-gray-700 font-bold text-3xl pt-1 pb-4 text-center md:text-left border-b-2 border-blue-500 md:border-b-0'>
                {facturas.length > 1 ? 'Listado de facturas' : 'No hay facturas por mostrar'}
              </h2>

              {facturas.map((fact, i) => (
                <Factura
                  key={i}
                  factura={fact}
                />
            ))}
          </>
        )}
      </div>
    </div>
  )
}

export default FacturaList