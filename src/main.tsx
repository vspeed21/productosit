import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';

import AuthLayout from './layout/AuthLayout';
import AdminLayout from './layout/AdminLayout';
import NewProduct from './components/admin/NewProduct';
import ProductList from './components/admin/ProductList';
import NewFactura from './components/admin/newFactura';
import FacturaList from './components/admin/FacturaList';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AdminLayout/>,
    children: [
      {
        index: true,
        element: <NewProduct/>
      },
      {
        path: '/admin/ver-productos',
        element: <ProductList/>
      },
      {
        path: '/admin/crear-factura',
        element: <NewFactura/>
      },
      {
        path: '/admin/ver-facturas',
        element: <FacturaList/>
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout/>
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
