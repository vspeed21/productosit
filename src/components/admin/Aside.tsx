import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Aside() {
  const location = useLocation();
  return (
    <aside className='p-5 flex flex-col items-center border-b md:border-r-2 border-gray-400 mb-10 md:mr-10 md:mb-0 md:h-screen'>
      <h2 className='text-5xl font-bold text-center flex flex-col text-blue-700'>
        Productos
        <span className='font-black'>IT</span>
      </h2>

      <nav className='flex flex-col gap-4 mt-10'>
        <Link
          to='/'
          className={`uppercase p-3 rounded text-center hover:bg-gradient-to-r from-sky-600 to-sky-800 hover:text-white transition-all duration-300 ${location.pathname === '/' ? 'bg-gradient-to-r from-sky-600 to-sky-800 text-white' : 'text-black'}`}
        >
          Agregar producto
        </Link>

        <Link 
          to='/admin/ver-productos'
          className={`uppercase p-4 rounded text-center hover:bg-gradient-to-r from-sky-600 to-sky-800 hover:text-white transition-colors duration-300 ${location.pathname === '/admin/ver-productos' ? 'bg-gradient-to-r from-sky-600 to-sky-800 text-white' : ''}`}
        >
          Ver productos
        </Link>

        <Link 
          to='/admin/crear-factura'
          className={`uppercase p-4 rounded text-center hover:bg-gradient-to-r from-sky-600 to-sky-800 hover:text-white transition-colors duration-300 ${location.pathname === '/admin/crear-factura' ? 'bg-gradient-to-r from-sky-600 to-sky-800 text-white' : ''}`}
        >
          Agregar factura
        </Link>

        <Link 
          to='/admin/ver-facturas'
          className={`uppercase p-4 rounded text-center hover:bg-gradient-to-r from-sky-600 to-sky-800 hover:text-white transition-colors duration-300 ${location.pathname === '/admin/ver-facturas' ? 'bg-gradient-to-r from-sky-600 to-sky-800' : ''}`}
        >
          Ver facturas
        </Link>
      </nav>
    </aside>
  )
}

export default Aside
