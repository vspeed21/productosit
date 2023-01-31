import { FormEvent, useState } from 'react'
import Field from './Field'
import Alert from '../Alert';

function SignUpForm() {
  const [name, setName] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const [message, setMessage] = useState('');

  const handleSubmit = (e:FormEvent) => {
    e.preventDefault();

    if([name, user, password].includes('')) {
      setMessage('todos los campos son obligatorios');
      setTimeout(() => {
        setMessage('');
      }, 3000);
      return;
    }
    const newUser = {
      name,
      user,
      password,
    }
    localStorage.setItem('userinfo', JSON.stringify(newUser));


  }

  return (
    <form
      onSubmit={handleSubmit}
    >
      {message ? <Alert msg={message} error={true} /> : null}
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