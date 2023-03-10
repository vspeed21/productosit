import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import { ProductProvider } from './contexts/ProductContext';

import AuthLayout from './layout/AuthLayout';
import AdminLayout from './layout/AdminLayout';
import NewProduct from './components/admin/NewProduct';
import ProductList from './components/admin/ProductList';
import NewFactura from './components/admin/NewFactura';
import FacturaList from './components/admin/FacturaList';
import { FacturaProvider } from './contexts/FacturaContext';

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
  <AuthProvider>
    <ProductProvider>
      <FacturaProvider>
        <RouterProvider router={router} />
      </FacturaProvider>
    </ProductProvider>
  </AuthProvider>
)
