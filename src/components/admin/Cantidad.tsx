import { Product } from "../../interfaces"

interface Props {
  cantidad: number
  setCantidad: (value: number) => void
  buscadorPro: string
  productoEncontrado: any
}

function Cantidad({cantidad, setCantidad, buscadorPro, productoEncontrado}: Props) {
  return (
    <div className='flex mb-4 gap-3 justify-center items-center'>
      <div>
        <button
          type='button'
          className='mt-1'
          onClick={() => {
            if (cantidad <= 1) return;
            if (cantidad > 1) {
              setCantidad(cantidad - 1)
            }
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>

        </button>
      </div>

      <input
        id='cantidad'
        type='number'
        name='stock'
        value={cantidad}
        disabled={!buscadorPro ? true : false}
        onChange={e => setCantidad(Number(e.target.value))}
        min={1}
        className='bg-gray-100 p-1 pl-3 outline-none focus:outline-blue-600 focus:outline-2 rounded focus:shadow border border-gray-400 focus:border-none text-center w-28'
      />
      
      <div>
        <button
          type='button'
          className='mt-1'
          onClick={() => {
            if (cantidad >= Number(productoEncontrado[0]?.stock)) return;
            if (cantidad >= 1 || cantidad === 0) {
              setCantidad(cantidad + 1)
            }
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>

        </button>
      </div>
    </div>
  )
}

export default Cantidad;