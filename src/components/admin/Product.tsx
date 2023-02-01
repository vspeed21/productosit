import { Product } from "../../interfaces"
import { useNavigate } from "react-router-dom";
import useProduct from "../../hooks/useProduct";

interface Props {
  product: Product
}

function ProductC({ product }: Props) {
  const { name, price, stock, id } = product;
  const { setProductObj, handleDelete } = useProduct();

  const navigate = useNavigate();

  return (
    <tr className='border-b hover:bg-gray-100 text-center'>
      <td className='p-3 capitalize'>{name}</td>
      <td className='p-3 font-bold'>{price}</td>
      <td className='p-3'>{stock}</td>
      <td className='p-3'>

        <div className='flex flex-col items-center gap-1'>
          <button
            type='button'
            className='bg-blue-600 hover:bg-blue-700 text-white w-full p-2 uppercase font-bold text-xs'
            onClick={() => {
              setProductObj(product);
              navigate('/');
            }}
          >Editar</button>
          <button
            type='button'
            className='bg-red-600 hover:bg-red-700 text-white w-full p-2 uppercase font-bold text-xs'
            onClick={() => handleDelete(id!)}
          >Eliminar</button>
        </div>
        
      </td>

    </tr>
  )
}

export default ProductC