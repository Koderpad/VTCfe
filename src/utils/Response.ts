import { IProduct } from "./interfaces";


interface ProductResponse {
  status: string;
  message: string;
  code: number;
  productDTO: IProduct;
}

export type { ProductResponse };