import useFactura from "../../hooks/useFactura";
import Factura from "./Factura";
import Filtro from "./Filtro";

function FacturaList() {

  const { facturas } = useFactura();

  return (
    <div className='md:pt-5'>
      {facturas.length > 1 ? (
        <Filtro/>
      ): null}

      <div className="mt-5">
        {facturas.length ? facturas.map((factura, i) => (
          <Factura
            key={i}
            factura={factura}
          />
        ) ) : null}
      </div>
    </div>
  )
}

export default FacturaList