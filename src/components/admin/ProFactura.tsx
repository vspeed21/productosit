import { formatearCantidad } from '../../helpers'
import { ProductoF } from '../../interfaces'

interface Props{
  factura: ProductoF
}

function ProFactura({factura}: Props) {
  return (
    <tr>
      {factura.name !== '' && (
        <td className='p-3 text-center capitalize'>
          {factura.name}
        </td>
      )}
      {factura.name !== '' && (
        <td className='p-3 text-center capitalize'>
          {formatearCantidad(factura.price)}
        </td>
      )}
      {factura.name !== '' && (
        <td className='p-3 text-center capitalize'>
          {factura.cantidadP}
        </td>
      )}
    </tr>
  )
}

export default ProFactura