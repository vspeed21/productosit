import { useState } from "react"
import Field from "./Field";

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form>
      <Field
        htmlFor='user'
        id='user'
        name='usuario'
        placeholder='nombre de usuario'
        type='text'
        value={email}
        onChange={setEmail}
      />
      <Field
        htmlFor='password'
        id='password'
        name='password'
        placeholder='contraseña'
        type='password'
        value={password}
        onChange={setPassword}
      />

      <div className='flex justify-center md:justify-end'>
        <input
          type='submit'
          value='iniciar sesion'
          className='bg-sky-600 py-1 px-3 rounded text-white font-bold uppercase hover:cursor-pointer hover:bg-sky-800 transition-colors duration-300 w-full md:w-auto'
        />
      </div>
    </form>
  )
}

export default LoginForm