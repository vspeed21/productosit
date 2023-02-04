import useFactura from "../../hooks/useFactura"

function Filtro() {
  const { setFiltroName, filtroName, facturas, facturasFiltradas } = useFactura();

  const notDuplicateNames = new Set(facturas.map(factu => factu.client)); 

  return (
    <form className='ml-5'>
      <h2 className='text-2xl mb-5 font-bold'>Filtrar Facturas</h2>
      <div className='flex gap-2 mb-4 items-center'>
        <label htmlFor='name' className='text-gray-800 uppercase'>
          Nombre Cliente: {''}
        </label>
        <select
          id='name'
          value={filtroName}
          onChange={e => setFiltroName(e.target.value)}
          placeholder={'Ingresa el nombre del cliente'}
          className='bg-gray-100 p-1 pl-3 outline-none focus:outline-blue-600 focus:outline-2 rounded focus:shadow border border-gray-400 focus:border-none hover:cursor-pointer w-72'
        >
          <option value='' className="text-center">{facturasFiltradas.length ? 'Todas las facturas' : '--Seleccione --'}</option>
          {Array.from(notDuplicateNames).map((clientName, i) => (
            <option
              key={i}
              value={clientName}
              className='text-center capitalize'
            >
              {clientName}
            </option>
          ))}
        </select>
      </div>
    </form>
  )
}

export default Filtro