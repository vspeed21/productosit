import { useState } from "react"
import LoginForm from "./forms/LoginForm";
import SignUpForm from "./forms/SignUpForm";

function Tabs() {
  const [tabNumber, setTabNumber] = useState(1);

  return (
    <div className='bg-white rounded-md h-40 p-3 w-72'>
      <h2 className="font-bold text-center text-xl my-3">{tabNumber === 1 ? 'Inicia sesión' : 'Crea una cuenta'}</h2>
      <ul className="flex flex-col md:flex-row gap-2 justify-center">
        <li
          className={`capitalize hover:bg-indigo-800 transition-colors duration-300 hover:cursor-pointer py-1 px-2 rounded ${tabNumber === 1 ? 'bg-indigo-600 text-white' : 'text-black hover:text-white'}`}
          onClick={() => setTabNumber(1)}
        >
          Iniciar sesion
        </li>
        <li
          className={`capitalize hover:bg-indigo-800 transition-colors duration-300 hover:cursor-pointer py-1 px-2 rounded ${tabNumber === 2 ? 'bg-indigo-600 text-white' : 'text-black hover:text-white'}`}
          onClick={() => setTabNumber(2)}
        >
            Crear cuenta
        </li>
      </ul>

      <div className="mt-2">
        <div className={tabNumber === 1 ? 'block' : 'hidden'}>
          <LoginForm/>
        </div>
        <div className={tabNumber === 2 ? 'block' : 'hidden'}>
          <SignUpForm/>
        </div>
      </div>

    </div>
  )
}

export default Tabs