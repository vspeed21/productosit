import useFactura from "../../hooks/useFactura"

function Filtro() {
  const { setFiltroName, filtroName } = useFactura();

  return (
    <form className='ml-5'>
      <h2 className='text-xl mb-5'>Filtrar Facturas</h2>
      <div className='flex flex-col gap-2 mb-4'>
        <label htmlFor='name' className='text-gray-800 uppercase font-bold'>
          Nombre Cliente
        </label>
        <input
          type='text'
          id='name'
          value={filtroName}
          onChange={e => setFiltroName(e.target.value)}
          placeholder={'Ingresa el nombre del cliente'}
          className='bg-gray-100 p-1 pl-3 outline-none focus:outline-blue-600 focus:outline-2 rounded focus:shadow border border-gray-400 focus:border-none w-72'
        />
      </div>
    </form>
  )
}

export default Filtro