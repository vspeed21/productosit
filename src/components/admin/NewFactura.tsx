import { FormEvent, useState, useEffect, ChangeEvent } from 'react';

import Field from '../forms/Field';
import useProduct from '../../hooks/useProduct';
import { formatearCantidad } from '../../helpers';
import ProductsFactura from '../ProductsFactura';
import { Product } from '../../interfaces';


function NewFactura() {
  const [client, setClient] = useState('');
  const [factura, setFactura] = useState('');
  const [nombresP, setNombresP] = useState<string[]>([]);


  const [inputValues, setInputValues] = useState([
    { id: Date.now(), name: '', price: '', stock: 1 },
  ]);

  const { products } = useProduct();

  function findProduct() {
    for (let i = 0; i < nombresP.length; i++) {
      for (let j = 0; j < products.length; j++) {
        if(nombresP[i] === products[j].name) {
          inputValues[i].price = products[j]?.price;
          inputValues[i].stock = Number(products[j]?.stock);
        }
      }
    }
  }

  useEffect(()  => {
    findProduct();
  }, [inputValues]);

  const addInput = () => {
    setInputValues([
      ...inputValues,
      { id: Date.now(), name: '', price: '', stock: 1 }
    ]);
  }

  function revomeInput(i: number) {
    const newInputValues = [...inputValues];
    newInputValues.splice(i, 1);
    setInputValues(newInputValues);
  }

  const changeInput = (e: ChangeEvent<HTMLInputElement>, i: number) => {
    let newInputValues = [...inputValues];
    newInputValues[i] = { ...newInputValues[i], [e.target.name]: [e.target.value] };
    setInputValues(newInputValues);
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  }

  return (
    <div className='md:pt-5'>
      <h2 className='text-xl uppercase text-center md:text-start font-bold'>
        Ingresar productos
      </h2>
      <p className='text-center md:text-start mt-4'>
        Completa el formulario para generar una factura
      </p>

      <form
        onSubmit={handleSubmit}
        className='bg-white p-4 rounded shadow md:w-4/5 mx-5 mt-10 md:mx-auto'
      >

        <div className='md:flex md:items-center gap-4 justify-center'>
          <div className='md:w-1/2'>
            <Field
              htmlFor='nombre'
              id='nombre'
              name='nombre'
              placeholder='Ingresa el nombre del cliente'
              type='text'
              value={client}
              onChange={setClient}
            />
          </div>

          <div className='flex flex-col gap-3 md:w-1/2'>
            <label htmlFor='factura' className='text-gray-800 uppercase font-bold'>
              Tipo factura
            </label>

            <select
              id='factura'
              className='bg-gray-100 p-1 pl-3 outline-none focus:outline-blue-600 focus:outline-2 rounded text-center focus:shadow border border-gray-400 focus:border-none mb-4 hover:cursor-pointer'
              value={factura}
              onChange={e => setFactura(e.target.value)}
            >
              <option value=''>--Seleccione--</option>
              <option value='contaco'>Contado</option>
              <option value='credito'>Credito</option>
            </select>
          </div>
        </div>

        <button onClick={addInput} type='button'>Add</button>

        {inputValues.map((input, i) => (
          <div className='flex flex-col gap-4 mb-5' key={i}>
            <div className='flex flex-col md:flex-row gap-4 justify-around'>
              <div className='flex flex-col gap-3'>
                <label className='text-gray-800 uppercase font-bold'>
                  {`Producto ${i + 1}`}
                </label>
                <input
                  list='productos'
                  type='list'
                  name='name'
                  value={input.name || ''}
                  onChange={e => {
                    changeInput(e, i);
                    setNombresP([
                      ...nombresP,
                      e.target.value,
                    ]);
                    findProduct();
                  }}
                  className='bg-gray-100 p-1 pl-3 outline-none focus:outline-blue-600 focus:outline-2 rounded focus:shadow border border-gray-400 focus:border-none'
                />

                <datalist
                  id='productos'
                >
                  {products.length && products.map((pro, index) => (
                    <option
                      value={pro.name}
                      key={index}
                    />
                  ))}
                </datalist>
              </div>

              <div className='flex flex-col gap-3'>
                <label>price</label>
                <input
                  type='text'
                  name='price'
                  value={input.price}
                  onChange={e => changeInput(e, i)}
                  disabled={true}
                  readOnly={true}
                  className='bg-gray-100 p-1 pl-3 outline-none focus:outline-blue-600 focus:outline-2 rounded focus:shadow border border-gray-400 focus:border-none text-center'
                />
              </div>
            </div>
            <label>stock</label>
            <input
              type='number'
              name='stock'
              value={input.stock || 1}
              onChange={e => changeInput(e, i)}
              className='bg-gray-100 p-1 pl-3 outline-none focus:outline-blue-600 focus:outline-2 rounded focus:shadow border border-gray-400 focus:border-none'
            />
            {
              i >= 1 && <button onClick={() => revomeInput(i)} type='button'>remove</button>
            }
          </div>
        )
        )}


        <div className='flex justify-center md:justify-end'>
          <input
            type='submit'
            value="Generar factura"
            className='bg-sky-600 py-1 px-3 rounded text-white font-bold uppercase hover:cursor-pointer hover:bg-sky-800 transition-colors duration-300 w-full md:w-auto'
          />
        </div>
      </form>
    </div>
  )
}

export default NewFactura