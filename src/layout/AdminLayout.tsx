import useAuth from "../hooks/useAuth";
import { Outlet, Navigate } from "react-router-dom";
import Aside from "../components/admin/Aside";

function AdminLayout() {
  const { token, loading } = useAuth();

  if(loading) {
    return <>loading...</>
  }

  return (
    <>
      {token ? (
        <div className="md:flex">
          <div className="md:w-1/3 lg:w-1/4">
            <Aside/>
          </div>

          <main className="md:w-2/3 lg:w-3/4">
            <Outlet/>
          </main>
        </div>
      ): <Navigate to='/auth' />}
    </>
  )
}

export default AdminLayout