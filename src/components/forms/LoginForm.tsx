import { FormEvent, useState } from "react"
import { useNavigate } from 'react-router-dom';
import { generarToken } from '../../helpers'

import Field from "./Field";
import Alert from "../Alert";

function LoginForm() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const userExists = JSON.parse(localStorage.getItem('userinfo')!);

    if([user, password].includes('')) {
      setMessage('no se permiten campos vacios');
      setTimeout(() => {
        setMessage('');
      }, 3000);
      return;
    }

    if(user !== userExists.user) {
      setMessage('Cuenta no encontrada. Crea una');
      setTimeout(() => {
        setMessage('');
      }, 3000);
      return;
    }

    if(password !== userExists.password) {
      setMessage('Contraseña incorrecta');
      setTimeout(() => {
        setMessage('');
      }, 3000);
      return;
    }

    if(user === userExists.user && password === userExists.password) {
      localStorage.setItem('token', generarToken());
      window.location.href = '/'
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
    >
      {message ? <Alert msg={message} error={true} /> : null}
      <Field
        htmlFor='user'
        id='user'
        name='usuario'
        placeholder='nombre de usuario'
        type='text'
        value={user}
        onChange={setUser}
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