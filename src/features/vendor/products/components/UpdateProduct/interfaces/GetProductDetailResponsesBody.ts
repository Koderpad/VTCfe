interface AttributeDTO {
  attributeId: number;
  name: string;
  value: string;
  active: boolean;
  shopId: number;
}

interface ProductVariantDTO {
  productVariantId: number;
  sku: string;
  image: string;
  price: number;
  quantity: number;
  status: string;
  productId: number;
  productName: string;
  productImage: string;
  attributeDTOs: AttributeDTO[];
}

interface ProductDTO {
  productId: number;
  name: string;
  image: string;
  description: string;
  information: string;
  sold: number;
  status: string;
  categoryId: number;
  brandId: number | null;
  productVariantDTOs: ProductVariantDTO[];
}

interface GetProductDetailApiResponse {
  status: string;
  message: string;
  code: number;
  categoryName: string;
  shopName: string;
  rating: number;
  productDTO: ProductDTO;
}

export type {
  GetProductDetailApiResponse,
  ProductDTO,
  ProductVariantDTO,
  AttributeDTO,
};
