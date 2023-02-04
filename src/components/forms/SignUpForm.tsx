import { FormEvent, useState } from 'react'
import Field from './Field'
import Alert from '../Alert';

function SignUpForm() {
  const [name, setName] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const [alerta, setAlerta] = useState({
    msg: '',
    error: false,
  });

  const handleSubmit = (e:FormEvent) => {
    e.preventDefault();

    if([name, user, password].includes('')) {
      setAlerta({
        msg: 'todos los campos son obligatorios',
        error: true,
      })
      setTimeout(() => {
        setAlerta({
          msg: '',
          error: false,
        })
      }, 3000);
      return;
    }
    const newUser = {
      name,
      user,
      password,
    }
    localStorage.setItem('userinfo', JSON.stringify(newUser));
    setAlerta({
      msg: 'cuenta creada correctamente. inicia sesion',
      error: false,
    })

    setTimeout(() => {
      setAlerta({
        msg: '',
        error: false,
      })
    }, 3000);

  }

  return (
    <form
      onSubmit={handleSubmit}
    >
      {alerta.msg ? <Alert msg={alerta.msg} error={alerta.error} /> : null}
      <Field
        htmlFor='name'
        id='name'
        name='Nombre'
        placeholder='nombre'
        type='text'
        value={name}
        onChange={setName}
      />
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
          value='crear cuenta'
          className='bg-sky-600 py-1 px-3 rounded text-white font-bold uppercase hover:cursor-pointer hover:bg-sky-800 transition-colors duration-300 w-full md:w-auto'
        />
      </div>
    </form>
  )
}

export default SignUpForm