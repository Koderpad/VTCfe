import { IProduct } from "./interfaces";

interface ProductResponse {
  status: string;
  message: string;
  code: number;
  rating?: number;
  productDTO: IProduct;
}

export type { ProductResponse };
