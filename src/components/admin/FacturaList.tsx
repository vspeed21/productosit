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
            <h2>fac</h2>
            <p>lis</p>

            {facturasFiltradas.map((fact, i) => (
              <Factura
                key={i}
                factura={fact}
              />
            ))}
          </>
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