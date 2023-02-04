import useAuth from '../../hooks/useAuth';
import { Link, useLocation } from 'react-router-dom'

function Aside() {
  const location = useLocation();
  const { logOut } = useAuth();

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
              className={`uppercase p-3 rounded text-center w-max hover:bg-gradient-to-r from-sky-600 to-sky-800 hover:text-white transition-all duration-300 ${location.pathname === '/' ? 'bg-gradient-to-r from-sky-600 to-sky-800 text-white' : 'text-black'}`}
            >
              Agregar producto
            </Link>

            <Link 
              to='/admin/ver-productos'
              className={`uppercase p-4 rounded text-center w-max hover:bg-gradient-to-r from-sky-600 to-sky-800 hover:text-white transition-colors duration-300 ${location.pathname === '/admin/ver-productos' ? 'bg-gradient-to-r from-sky-600 to-sky-800 text-white' : ''}`}
            >
              Ver productos
            </Link>
          </div>

          <div className='flex flex-col sm:flex-row md:flex-col gap-3 justify-center items-center'>
            <Link 
            to='/admin/crear-factura'
            className={`uppercase p-4 rounded text-center w-max hover:bg-gradient-to-r from-sky-600 to-sky-800 hover:text-white transition-colors duration-300 ${location.pathname === '/admin/crear-factura' ? 'bg-gradient-to-r from-sky-600 to-sky-800 text-white' : ''}`}
          >
            Agregar factura
          </Link>

          <Link 
            to='/admin/ver-facturas'
            className={`uppercase p-3 rounded text-center w-max hover:bg-gradient-to-r from-sky-600 to-sky-800 hover:text-white transition-all duration-300 ${location.pathname === '/admin/ver-facturas' ? 'bg-gradient-to-r from-sky-600 to-sky-800 text-white' : 'text-black'}`}
          >
            Ver facturas
          </Link>
          </div>

          <button 
            className='mt-10 bg-red-600 hover:bg-red-800 text-white px-2 py-1 uppercase font-bold md:mt-20'
            type='button'
            onClick={logOut}
          >
            cerrar sesion
          </button>
        </div>
      </nav>
    </aside>
  )
}

export default Aside
