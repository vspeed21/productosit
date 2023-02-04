import { Factura, Product } from "../interfaces"

export type ContextAuthProps = {
  token: string,
  loading: boolean,
  logOut: () => void
}

export type ContextProductProps = {
  products: Product[]
  handleProduct: (producto: Product) => void
  productObj: Product
  setProductObj: (producto: Product) => void
  handleDelete: (id: string) => void
  setProducts: (value: Product[]) => void
}

export type ContextFacturaProps = {
  handleFactura: (value: Factura) => void
  facturas: Factura[]
  setFacturas: (value: Factura[]) => void
  facturasFiltradas: Factura[]
  filtroName: string
  setFiltroName: (value: string) => void
}