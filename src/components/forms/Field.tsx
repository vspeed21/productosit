import { ChangeEvent } from "react"

interface Props {
  name: string,
  htmlFor: string,
  type: string,
  id: string,
  placeholder: string,
  value: string | number,
  onChange: (state: string) => void,
  onInput?: (e: ChangeEvent<HTMLInputElement>) => void
}

function Field({ htmlFor, type, id, placeholder, value, onChange, name, onInput }:Props) {
  return (
    <div className='flex flex-col gap-2 mb-4'>
      <label htmlFor={htmlFor} className='text-gray-800 uppercase font-bold'>
        {name}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        onInput={onInput}
        className='bg-gray-100 p-1 pl-3 outline-none focus:outline-blue-600 focus:outline-2 rounded focus:shadow border border-gray-400 focus:border-none'
      />
    </div>
  )
}

export default Field