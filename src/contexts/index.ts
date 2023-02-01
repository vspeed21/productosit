import { Product } from "../interfaces"

export type ContextAuthProps = {
  token: string,
  loading: boolean,
}

export type ContextProductProps = {
  products: Product[]
  handleProduct: (producto: Product) => void
}