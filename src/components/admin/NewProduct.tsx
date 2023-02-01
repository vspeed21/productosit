import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import Alert from '../Alert';
import Field from '../forms/Field'
import useProduct from '../../hooks/useProduct';

function NewProduct() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

  const [validPrice, setValidPrice] = useState(false);
  const [validStock, setValidStock] = useState(false);

  const [alerta, setAlerta] = useState({
    msg: '',
    error: false,
  });

  const { handleProduct } = useProduct();
  const navigate = useNavigate();

  const regex = /^[+0-9]*$/;
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === 'precio' && !regex.test(e.target.value)) {
      e.target.value = e.target.value.slice(0, -1);
      setValidPrice(true);
      return;
    }
    setValidPrice(false);

    if (e.target.id === 'stock' && !regex.test(e.target.value)) {
      e.target.value = e.target.value.slice(0, -1);
      setValidStock(true);
      return;
    }
    setValidStock(false);
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if([name, price, stock].includes('')) {
      setAlerta({
        msg: 'No se permiten campos vacios',
        error: true,
      });
      return;
    }

    if(!regex.test(price)) {
      setAlerta({
        msg: 'No se permiten ingresar letras',
        error: true
      });
      return;
    }

    if(!regex.test(stock)) {
      setAlerta({
        msg: 'No se permiten ingresar letras',
        error: true
      });
      return;
    }

    handleProduct({name, price, stock});
    setName('');
    setPrice('');
    setStock('');

    setAlerta({
      msg: 'Producto agregado correctamente',
      error: false,
    });

    setTimeout(() => {
      navigate('/admin/ver-productos');
    }, 2000);

  }

  return (
    <div className='md:pt-5'>
      <h2 className='text-xl uppercase text-center md:text-start font-bold'>
        Ingresar productos
      </h2>
      <p className='text-center md:text-start mt-4'>Llena el formulario para agregar nuevo producto</p>

      <form
        onSubmit={handleSubmit}
        className='bg-white p-4 rounded shadow md:w-2/3 mx-5 mt-10 md:mx-auto'
      >
        {alerta.msg ? <Alert msg={alerta.msg} error={alerta.error} /> : null}
        <Field
          htmlFor='nombre'
          id='nombre'
          name='nombre'
          placeholder='Ingresa el nombre producto'
          type='text'
          value={name}
          onChange={setName}
        />
        <Field
          htmlFor='precio'
          id='precio'
          name='precio'
          placeholder='Ingresa el precio producto'
          type='text'
          value={price}
          onChange={setPrice}
          onInput={handleInput}
        />
        {validPrice ? <Alert msg='No se permiten letras' error={true} />: null}

        <Field
          htmlFor='stock'
          id='stock'
          name='existencias'
          placeholder='Ingresa el precio producto'
          type='text'
          onInput={handleInput}
          value={stock}
          onChange={setStock}
        />
        {validStock ? <Alert msg='No se permiten letras' error={true} />: null}

        <div className='flex justify-center md:justify-end'>
        <input
          type='submit'
          value='Agregar'
          className='bg-sky-600 py-1 px-3 rounded text-white font-bold uppercase hover:cursor-pointer hover:bg-sky-800 transition-colors duration-300 w-full md:w-auto'
        />
      </div>
      </form>
    </div>
  )
}

export default NewProduct