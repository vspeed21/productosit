import useAuth from '../../hooks/useAuth';
import { Link, useLocation } from 'react-router-dom'
import useFactura from '../../hooks/useFactura';

function Aside() {
  const location = useLocation();
  const { logOut } = useAuth();
  const { setFiltroName } = useFactura();

  const user = localStorage.getItem('userinfo') ? JSON.parse(localStorage.getItem('userinfo')!): {};

  return (
    <aside className='p-5 flex flex-col items-center border-b md:border-r-2 border-gray-400 mb-10 md:mr-10 md:mb-0 md:h-screen'>
      <h2 className='text-5xl font-bold text-center flex flex-col text-blue-700'>
        Productos
        <span className='font-black'>IT</span>
      </h2>

      <h3 className='mt-5 text-xl'>
        Bienvenido: {''}
        <span className='font-bold'>{user.name}</span>
      </h3>

      <nav className='flex flex-col gap-4 mt-10'>
        <div className='flex flex-col sm:gap-5 md:gap-4'>
          <div className='flex flex-col sm:flex-row md:flex-col gap-3 justify-center items-center'>
            <Link
              to='/'
              className={`uppercase p-3 rounded text-center w-max hover:bg-gradient-to-r from-sky-600 to-sky-800 hover:text-white transition-all duration-300 flex justify-center items-center gap-2 ${location.pathname === '/' ? 'bg-gradient-to-r from-sky-600 to-sky-800 text-white' : 'text-black'}`}
              onClick={() => setFiltroName('')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>

              Agregar producto
            </Link>

            <Link 
              to='/admin/ver-productos'
              className={`uppercase p-4 rounded text-center w-max hover:bg-gradient-to-r from-sky-600 to-sky-800 hover:text-white transition-colors duration-300 flex justify-center items-center gap-3 ${location.pathname === '/admin/ver-productos' ? 'bg-gradient-to-r from-sky-600 to-sky-800 text-white' : ''}`}
              onClick={() => setFiltroName('')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>

              Ver productos
            </Link>
          </div>

          <div className='flex flex-col sm:flex-row md:flex-col gap-3 justify-center items-center'>
            <Link 
            to='/admin/crear-factura'
            className={`uppercase p-4 rounded text-center w-max hover:bg-gradient-to-r from-sky-600 to-sky-800 hover:text-white transition-colors duration-300 flex justify-center items-center gap-2 ${location.pathname === '/admin/crear-factura' ? 'bg-gradient-to-r from-sky-600 to-sky-800 text-white' : ''}`}
            onClick={() => setFiltroName('')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>

            Agregar factura
          </Link>

          <Link 
            to='/admin/ver-facturas'
            className={`uppercase p-3 rounded text-center w-max hover:bg-gradient-to-r from-sky-600 to-sky-800 hover:text-white transition-all duration-300 flex justify-center items-center gap-2 ${location.pathname === '/admin/ver-facturas' ? 'bg-gradient-to-r from-sky-600 to-sky-800 text-white' : 'text-black'}`}
            onClick={() => setFiltroName('')}
          >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            listado facturas
          </Link>
          </div>

          <button 
            className='mt-10 bg-red-600 hover:bg-red-800 text-white px-2 py-1 uppercase font-bold md:mt-20 flex justify-center items-center gap-2'
            type='button'
            onClick={logOut}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>

            cerrar sesion
          </button>
        </div>
      </nav>
    </aside>
  )
}

export default Aside
