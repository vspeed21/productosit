export interface Product {
  id?: string
  name: string
  price: string
  stock: string
}

export interface Numeros {
  subtotal: number,
  impuesto: number,
  totalPagar: number
}

export interface ProductoF {
  id: string | number
  name: string
  price: string
  stock: number
  cantidadP: number
}

export interface Factura {
  numeroFactura?: number
  client: string
  factura: string
  productoFactura: ProductoF[]
  numeros: Numeros
  fecha: number
  activa: boolean
}