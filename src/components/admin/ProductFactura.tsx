import { formatearCantidad } from '../../helpers';

interface Props {
  input: any,
  removeProFactura: () => void
}

function ProductFactura({ input, removeProFactura }: Props) {
  return (
    <tr className='border-b hover:bg-gray-100 text-center' key={input.id}>
        {input.name !== '' && <td className='p-3'>{input.name}</td>}
        {input.name !== '' && (
          <td className='p-3'>{formatearCantidad(input.price)}</td>
        )}
        {input.name !== '' && (
          <td className='p-3'>
            {input.cantidadP}
          </td>)}
        {input.name !== '' && 
        <button 
          type='button'
          className='bg-red-500 hover:bg-red-700 transition-colors text-white py-1 px-2 rounded mt-2'
          onClick={removeProFactura}
        >
          Eliminar
        </button>}
      </tr>
  )
}

export default ProductFactura