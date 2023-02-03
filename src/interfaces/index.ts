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

export interface Factura {
  client: string
  factura: string
  productoFactura: any
  numeros: Numeros
}