import { formatearCantidad } from '../../helpers'
import { ProductoF } from '../../interfaces'

interface Props{
  factura: ProductoF
}

function ProFactura({factura}: Props) {
  return (
    <tr className='flex items-center my-4 border-r-2 border-r-gray-200 last-of-type:border-r-0'>
      {factura.name !== '' && (
        <td className='p-3 text-center capitalize'>
          <p className='font-bold'>producto</p>
          <p>{factura.name}</p>
        </td>
      )}
      {factura.name !== '' && (
        <td className='p-3 text-center capitalize'>
          <p className='font-bold'>Precio</p>
          <p>{formatearCantidad(factura.price)}</p>
        </td>
      )}
      {factura.name !== '' && (
        <td className='p-3 text-center capitalize'>
          <p className='font-bold'>Cantidad llevada</p>
          <p>{factura.cantidadP}</p>
        </td>
      )}
    </tr>
  )
}

export default ProFactura