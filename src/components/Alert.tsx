import React from 'react'

interface Props {
  msg: string
  error?: boolean
}

function Alert({msg, error}: Props) {
  return <p className={`border-l-4 text-center py-2 font-bold uppercase rounded text-sm my-4 ${error ? 'bg-red-100 border-red-800 text-red-700': 'bg-green-100 border-green-800 text-green-700'}`}>{msg}</p>
}

export default Alert