import useFactura from "../../hooks/useFactura";
import Factura from "./Factura";

function FacturaList() {

  const { facturas } = useFactura();

  return (
    <div className='md:pt-5'>
      <h2 className='text-xl uppercase text-center md:text-start font-bold'>
        {facturas.length ? 'Listado de Facturas' : 'No hay facturas para ver'}
      </h2>
      {facturas.length > 1 ? (
        <p className='text-center md:text-start mt-4'>
          Filtra por nombres
        </p>
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